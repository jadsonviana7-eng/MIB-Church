import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { jsPDF } from 'jspdf';
import { baixarCartaoPNG, baixarCartaoPDF } from './cartaoDigital';
import { supabase } from './supabaseClient';
import { Card, PageHeader } from './ui';

export default function LeitorQRCodeEvento({ onVoltar, eventoId, onBaixaRealizada }) {
  const [status, setStatus] = useState({ loading: false, msg: '', type: '' });
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [erroCamera, setErroCamera] = useState('');
  const [recibo, setRecibo] = useState(null);

  const html5QrCodeRef = useRef(null);
  const processandoRef = useRef(false);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode('reader-evento');

    return () => {
      pararCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function pararCamera() {
    const instancia = html5QrCodeRef.current;
    if (instancia) {
      try {
        const estado = instancia.getState ? instancia.getState() : null;
        // 2 = SCANNING (constante interna da lib)
        if (estado === 2) {
          await instancia.stop();
        }
      } catch (e) {
        // Câmera já parada
      }
    }
    setCameraAtiva(false);
  }

  async function iniciarCamera() {
    setErroCamera('');
    const instancia = html5QrCodeRef.current;
    if (!instancia) return;

    try {
      // Solicita explicitamente a permissão/câmera traseira do dispositivo
      await instancia.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        onScanError
      );
      setCameraAtiva(true);
    } catch (err) {
      console.error('Erro ao iniciar câmera:', err);
      setErroCamera(
        'Não foi possível acessar a câmera. Verifique se o site está em HTTPS e se a permissão de câmera foi concedida ao navegador.'
      );
      setCameraAtiva(false);
    }
  }

  async function onScanSuccess(result) {
    if (processandoRef.current) return;

    // O formato esperado gerado pelo CarneGenerator é: EVENTO|inscricaoId|parcelaNum
    if (result && result.startsWith('EVENTO|')) {
      processandoRef.current = true;
      await pararCamera();

      const [, inscricaoId, parcelaNum] = result.split('|');
      await darBaixaEvento(inscricaoId, parcelaNum);

      processandoRef.current = false;
    }
  }

  function onScanError() {
    /* Ignora erros de frame (nenhum QR detectado neste frame) */
  }

  async function darBaixaEvento(inscricaoId, parcelaNum) {
    setStatus({ loading: true, msg: `Dando baixa na parcela ${parcelaNum}...`, type: 'info' });

    try {
      // 1. Busca os dados atuais da inscrição no evento
      const { data: inscricao, error: errorFetch } = await supabase
        .from('agenda_inscricoes')
        .select('*, agenda_eventos(titulo)')
        .eq('id', inscricaoId)
        .single();

      if (errorFetch || !inscricao) throw new Error('Inscrição não encontrada.');

      const dados = inscricao.dados_inscricao || {};
      const parcelasPagas = dados.parcelas_pagas || [];

      // 2. Verifica se esta parcela específica já consta como paga
      if (parcelasPagas.includes(parcelaNum)) {
        setRecibo(null);
        setStatus({
          loading: false,
          msg: `A parcela ${parcelaNum} de ${dados.nome || 'participante'} já foi baixada anteriormente.`,
          type: 'warning',
        });
        return;
      }

      // 3. Atualiza o JSONB adicionando a nova parcela e verificando o status total
      const novasParcelas = [...parcelasPagas, parcelaNum];

      // Busca a quantidade total de parcelas informada no formulário dinâmico
      const totalParcelasConfiguradas =
        Number(Object.entries(dados).find(([k]) => k.toLowerCase().includes('parcelas'))?.[1]) || 1;
      const novoStatusPg = novasParcelas.length >= totalParcelasConfiguradas ? 'pago' : 'pendente';

      const { error: errorUpdate } = await supabase
        .from('agenda_inscricoes')
        .update({
          status_pagamento: novoStatusPg,
          dados_inscricao: { ...dados, parcelas_pagas: novasParcelas },
        })
        .eq('id', inscricaoId);

      if (errorUpdate) throw errorUpdate;

      // Tenta identificar o valor pago (parcela ou valor total/à vista)
      const valorEntry = Object.entries(dados).find(([k]) => k.toLowerCase().includes('valor'));
      const valorPago = valorEntry ? Number(valorEntry[1]) || 0 : 0;
      const ehParcela = totalParcelasConfiguradas > 1;

      setStatus({
        loading: false,
        msg: `✅ Baixa realizada! Parcela ${parcelaNum} de "${inscricao.agenda_eventos.titulo}" confirmada para ${dados.nome || 'Participante'}.`,
        type: 'success',
      });

      // Monta os dados do recibo/cartão para gerar PDF/PNG
      setRecibo({
        inscricaoId,
        evento: inscricao.agenda_eventos?.titulo || 'Evento',
        nome: dados.nome || dados['Nome Completo'] || 'Participante',
        cpf: dados.cpf || dados['CPF'] || '',
        valor: valorPago,
        parcelaNum,
        totalParcelas: totalParcelasConfiguradas,
        ehParcela,
        statusPagamento: novoStatusPg,
        vencimento: dados.vencimento || dados[`vencimento_${parcelaNum}`] || null,
        codigoQr: `EVENTO|${inscricaoId}|${parcelaNum}`,
        data: new Date(),
      });

      // Notifica o componente pai (ex: DashboardEvento) para recarregar os dados
      if (onBaixaRealizada) onBaixaRealizada();
    } catch (err) {
      setRecibo(null);
      setStatus({ loading: false, msg: 'Erro: ' + err.message, type: 'error' });
    }
  }

  function handleProximaLeitura() {
    setStatus({ loading: false, msg: '', type: '' });
    setRecibo(null);
    iniciarCamera();
  }

  async function buscarDadosIgreja() {
    let igreja = { nome_igreja: 'Igreja', endereco: '', bairro: '', cidade: '', estado: '', telefone: '', email_contato: '' };
    try {
      const { data } = await supabase.from('dados_igreja').select('*').eq('id', 1).single();
      if (data) igreja = data;
    } catch (e) {
      // segue com valores padrão
    }
    return igreja;
  }

  async function gerarReciboPDF() {
    if (!recibo) return;

    // Busca os dados da igreja para o cabeçalho do recibo
    const igreja = await buscarDadosIgreja();

    const doc = new jsPDF({ unit: 'mm', format: 'a5' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 14;
    let y = 18;

    // Cabeçalho
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text((igreja.nome_igreja || 'Igreja').toUpperCase(), pageWidth / 2, y, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    y += 5;
    const enderecoIgreja = [igreja.endereco, igreja.bairro, igreja.cidade, igreja.estado].filter(Boolean).join(', ');
    if (enderecoIgreja) {
      doc.text(enderecoIgreja, pageWidth / 2, y, { align: 'center' });
      y += 4;
    }
    const contatoIgreja = [igreja.telefone, igreja.email_contato].filter(Boolean).join(' • ');
    if (contatoIgreja) {
      doc.text(contatoIgreja, pageWidth / 2, y, { align: 'center' });
      y += 4;
    }

    y += 4;
    doc.setLineWidth(0.3);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 8;

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('RECIBO DE PAGAMENTO', pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Corpo
    doc.setFontSize(10);
    const linha = (label, valor) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, marginX, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(valor || '—'), marginX + 32, y);
      y += 7;
    };

    linha('Evento', recibo.evento);
    linha('Participante', recibo.nome);
    if (recibo.cpf) linha('CPF', recibo.cpf);
    linha(
      'Referente a',
      recibo.ehParcela ? `Parcela ${recibo.parcelaNum}/${recibo.totalParcelas}` : 'Pagamento Integral (à vista)'
    );
    linha('Valor Pago', `R$ ${recibo.valor.toFixed(2)}`);
    linha('Data do Pagamento', recibo.data.toLocaleDateString('pt-BR'));
    linha(
      'Situação',
      recibo.statusPagamento === 'pago' ? 'Inscrição totalmente paga' : `Pendente (${recibo.totalParcelas - 1} parcela(s) restante(s))`
    );

    y += 6;
    doc.setLineWidth(0.2);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('Este recibo confirma o pagamento acima descrito.', pageWidth / 2, y, { align: 'center' });

    const nomeArquivo = `recibo_${recibo.nome.replace(/\s+/g, '_').toLowerCase()}_parcela${recibo.parcelaNum}.pdf`;
    doc.save(nomeArquivo);
  }

  async function montarDadosCartao() {
    const igreja = await buscarDadosIgreja();
    return {
      igreja,
      evento: recibo.evento,
      nome: recibo.nome,
      cpf: recibo.cpf,
      valor: recibo.valor,
      parcelaNum: recibo.parcelaNum,
      totalParcelas: recibo.totalParcelas,
      vencimento: recibo.vencimento,
      pago: true,
      codigoQr: recibo.codigoQr,
    };
  }

  async function handleBaixarCartaoPNG() {
    if (!recibo) return;
    const dadosCartao = await montarDadosCartao();
    const nomeArquivo = `cartao_${recibo.nome.replace(/\s+/g, '_').toLowerCase()}_parcela${recibo.parcelaNum}.png`;
    await baixarCartaoPNG(dadosCartao, nomeArquivo);
  }

  async function handleBaixarCartaoPDF() {
    if (!recibo) return;
    const dadosCartao = await montarDadosCartao();
    const nomeArquivo = `cartao_${recibo.nome.replace(/\s+/g, '_').toLowerCase()}_parcela${recibo.parcelaNum}.pdf`;
    await baixarCartaoPDF(dadosCartao, nomeArquivo);
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto p-4">
      <PageHeader titulo="Baixa de Evento (QR)" onNavigate={onVoltar} />

      <Card className="p-0 overflow-hidden shadow-2xl border-none">
        <div className="p-6 space-y-4">
          <div className="relative">
            <div id="reader-evento" className="overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50 min-h-[280px]"></div>

            {!cameraAtiva && !status.msg && (
              <button
                type="button"
                onClick={iniciarCamera}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 py-10 text-slate-500 hover:text-[#202046] transition cursor-pointer"
              >
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h4M3 4v4M21 4a1 1 0 00-1-1h-4M21 4v4M3 20a1 1 0 001 1h4M3 20v-4M21 20a1 1 0 01-1 1h-4M21 20v-4M7 9h2v2H7V9zm0 6h2v2H7v-2zm6-6h4v4h-4V9zm0 8h2v2h-2v-2zm4-2h2v2h-2v-2z" />
                </svg>
                <span className="font-bold text-sm">Toque para abrir a câmera</span>
              </button>
            )}
          </div>

          {erroCamera && (
            <div className="p-4 rounded-2xl text-sm font-bold text-center bg-rose-50 text-rose-700 border border-rose-100">
              {erroCamera}
            </div>
          )}

          {status.msg && (
            <div
              className={`p-4 rounded-2xl text-sm font-bold text-center animate-in fade-in zoom-in ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  : status.type === 'error'
                  ? 'bg-rose-50 text-rose-700 border border-rose-100'
                  : status.type === 'warning'
                  ? 'bg-amber-50 text-amber-700 border border-amber-100'
                  : 'bg-blue-50 text-blue-700 border border-blue-100'
              }`}
            >
              {status.msg}
            </div>
          )}

          {recibo && (
            <button
              onClick={gerarReciboPDF}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg transition-all cursor-pointer hover:opacity-90 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m-9 8h12a2 2 0 002-2V8a2 2 0 00-2-2h-3.5a1 1 0 01-.8-.4L13.2 4H10a1 1 0 00-.8.4L7.5 6H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Baixar Recibo (PDF)
            </button>
          )}

          {recibo && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleBaixarCartaoPNG}
                className="py-4 bg-[#202046] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg transition-all cursor-pointer hover:opacity-90 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Cartão (PNG)
              </button>
              <button
                onClick={handleBaixarCartaoPDF}
                className="py-4 bg-[#202046] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg transition-all cursor-pointer hover:opacity-90 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m-9 8h12a2 2 0 002-2V8a2 2 0 00-2-2h-3.5a1 1 0 01-.8-.4L13.2 4H10a1 1 0 00-.8.4L7.5 6H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Cartão (PDF)
              </button>
            </div>
          )}

          {status.type && status.type !== 'info' && (
            <button
              onClick={handleProximaLeitura}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg transition-all cursor-pointer hover:opacity-90"
            >
              Próxima Leitura 🔄
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
