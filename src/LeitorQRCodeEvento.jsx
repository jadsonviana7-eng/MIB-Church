import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { jsPDF } from 'jspdf';
import { baixarCartaoPNG, baixarCartaoPDF } from './cartaoDigital';
import { supabase } from './supabaseClient';
import { Card, PageHeader } from './ui';
import './LeitorQRCode.css';
import {
  Camera, QrCode, CheckCircle, AlertCircle,
  RefreshCw, Loader2, Download, Share2,
  User, Calendar, DollarSign, Tag, Info, Clock
} from 'lucide-react';

export default function LeitorQRCodeEvento({ onVoltar, eventoId, onBaixaRealizada }) {
  const [status, setStatus] = useState({ loading: false, msg: '', type: '' });
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [erroCamera, setErroCamera] = useState('');
  const [recibo, setRecibo] = useState(null);

  const html5QrCodeRef = useRef(null);
  const processandoRef = useRef(false);
  const desmontadoRef = useRef(false);

  useEffect(() => {
    desmontadoRef.current = false;
    const scanner = new Html5Qrcode('reader-evento');
    html5QrCodeRef.current = scanner;

    return () => {
      desmontadoRef.current = true;
      (async () => {
        try {
          const estado = scanner.getState ? scanner.getState() : null;
          if (estado === 2) {
            await scanner.stop();
          }
          await scanner.clear();
        } catch (_) {
          // Ignora erros de cleanup
        }
      })();
    };
  }, []);

  async function pararCamera() {
    const instancia = html5QrCodeRef.current;
    if (instancia) {
      try {
        const estado = instancia.getState ? instancia.getState() : null;
        if (estado === 2) {
          await instancia.stop();
        }
      } catch (e) {
        // Câmera já parada
      }
    }
    if (!desmontadoRef.current) setCameraAtiva(false);
  }

  async function iniciarCamera() {
    if (desmontadoRef.current) return;
    setErroCamera('');
    const instancia = html5QrCodeRef.current;
    if (!instancia) return;

    try {
      await instancia.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        onScanError
      );
      if (!desmontadoRef.current) setCameraAtiva(true);
    } catch (err) {
      console.error('Erro ao iniciar câmera:', err);
      if (!desmontadoRef.current) {
        setErroCamera(
          'Não foi possível acessar a câmera. Verifique se o site está rodando em HTTPS e se a permissão de câmera foi concedida no navegador.'
        );
        setCameraAtiva(false);
      }
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

      if (errorFetch || !inscricao) throw new Error('Inscrição do evento não encontrada.');

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
      let valorPagoTotal = 0;
      if (valorEntry) {
        const valStr = String(valorEntry[1]);
        const valorLimpo = valStr
          .replace(/[^\d,.-]/g, '') // remove "R$" e caracteres não numéricos/separadores
          .replace(/\./g, '')       // remove pontos de milhar
          .replace(',', '.');       // substitui vírgula por ponto
        valorPagoTotal = Number(valorLimpo) || 0;
      }
      const ehParcela = totalParcelasConfiguradas > 1;
      const valorPago = ehParcela ? (valorPagoTotal / totalParcelasConfiguradas) : valorPagoTotal;

      setStatus({
        loading: false,
        msg: `Baixa realizada com sucesso! Parcela ${parcelaNum} de "${inscricao.agenda_eventos.titulo}" confirmada para ${dados.nome || 'Participante'}.`,
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
      setStatus({ loading: false, msg: 'Erro ao dar baixa: ' + err.message, type: 'error' });
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

  function montarDocRecibo(igreja) {
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

    return doc;
  }

  async function gerarReciboPDFBlob() {
    const igreja = await buscarDadosIgreja();
    const doc = montarDocRecibo(igreja);
    return doc.output('blob');
  }

  // Renderiza o recibo em alta resolução para envio/visualização como imagem
  async function gerarReciboPNGBlob() {
    const igreja = await buscarDadosIgreja();

    // A5 = 148mm x 210mm. Renderiza em alta resolução (~360dpi)
    const DPI = 360;
    const MM_TO_PX = DPI / 25.4;
    const pageWidthMm = 148;
    const pageHeightMm = 210;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(pageWidthMm * MM_TO_PX);
    canvas.height = Math.round(pageHeightMm * MM_TO_PX);
    const ctx = canvas.getContext('2d');

    const mm = (v) => v * MM_TO_PX; // converte mm -> px no canvas
    const pt = (v) => v * MM_TO_PX * 0.3528; // converte pt -> px (1pt = 0.3528mm)

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';

    const marginX = mm(14);
    let y = mm(18);

    ctx.fillStyle = '#0f172a';
    ctx.font = `bold ${pt(14)}px Helvetica, Arial, sans-serif`;
    ctx.fillText((igreja.nome_igreja || 'Igreja').toUpperCase(), canvas.width / 2, y);

    ctx.font = `${pt(8)}px Helvetica, Arial, sans-serif`;
    ctx.fillStyle = '#64748b';
    y += mm(5);
    const enderecoIgreja = [igreja.endereco, igreja.bairro, igreja.cidade, igreja.estado].filter(Boolean).join(', ');
    if (enderecoIgreja) {
      ctx.fillText(enderecoIgreja, canvas.width / 2, y);
      y += mm(4);
    }
    const contatoIgreja = [igreja.telefone, igreja.email_contato].filter(Boolean).join(' • ');
    if (contatoIgreja) {
      ctx.fillText(contatoIgreja, canvas.width / 2, y);
      y += mm(4);
    }

    y += mm(4);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = mm(0.3);
    ctx.beginPath();
    ctx.moveTo(marginX, y);
    ctx.lineTo(canvas.width - marginX, y);
    ctx.stroke();
    y += mm(8);

    ctx.fillStyle = '#0f172a';
    ctx.font = `bold ${pt(13)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('RECIBO DE PAGAMENTO', canvas.width / 2, y);
    y += mm(10);

    ctx.textAlign = 'left';
    const linha = (label, valor) => {
      ctx.font = `bold ${pt(10)}px Helvetica, Arial, sans-serif`;
      ctx.fillStyle = '#64748b';
      ctx.fillText(`${label}:`, marginX, y);
      ctx.font = `${pt(10)}px Helvetica, Arial, sans-serif`;
      ctx.fillStyle = '#0f172a';
      ctx.fillText(String(valor || '—'), marginX + mm(32), y);
      y += mm(7);
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

    y += mm(6);
    ctx.strokeStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(marginX, y);
    ctx.lineTo(canvas.width - marginX, y);
    ctx.stroke();
    y += mm(8);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';
    ctx.font = `italic ${pt(9)}px Helvetica, Arial, sans-serif`;
    ctx.fillText('Este recibo confirma o pagamento acima descrito.', canvas.width / 2, y);

    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  }

  function baixarBlob(blob, nomeArquivo) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Compartilha o arquivo via menu nativo (WhatsApp, e-mail, etc.) com fallback para download
  async function compartilharOuBaixar(blob, nomeArquivo, mimeType, tituloShare) {
    try {
      const file = new File([blob], nomeArquivo, { type: mimeType });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: tituloShare,
          text: tituloShare,
        });
        return;
      }
    } catch (err) {
      if (err?.name === 'AbortError') return;
      console.warn('Compartilhamento nativo não suportado, baixando arquivo:', err);
    }
    // Fallback: download direto
    baixarBlob(blob, nomeArquivo);
  }

  async function handleEnviarReciboPDF() {
    if (!recibo) return;
    const blob = await gerarReciboPDFBlob();
    const nomeArquivo = `recibo_${recibo.nome.replace(/\s+/g, '_').toLowerCase()}_parcela${recibo.parcelaNum}.pdf`;
    await compartilharOuBaixar(blob, nomeArquivo, 'application/pdf', `Recibo - ${recibo.evento}`);
  }

  async function handleEnviarReciboPNG() {
    if (!recibo) return;
    const blob = await gerarReciboPNGBlob();
    const nomeArquivo = `recibo_${recibo.nome.replace(/\s+/g, '_').toLowerCase()}_parcela${recibo.parcelaNum}.png`;
    await compartilharOuBaixar(blob, nomeArquivo, 'image/png', `Recibo - ${recibo.evento}`);
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
    <div className="max-w-xl mx-auto pt-0 px-0 pb-12 sm:px-6 space-y-6 mx-[-3px] sm:mx-auto">
      <div className="mx-[3px] sm:mx-0">
        <PageHeader titulo="Baixa de Evento (QR)" onNavigate={onVoltar} />
      </div>

      <Card className="p-0 overflow-hidden shadow-xl border border-slate-100 rounded-[28px] bg-white">
        <div className="p-6 space-y-6">
          {/* Scanner Viewport Container */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner min-h-[300px]">
            {/* Container exclusivo da lib — React não deve renderizar filhos aqui */}
            <div
              id="reader-evento"
              className={`overflow-hidden rounded-2xl bg-slate-950 min-h-[300px] transition-all ${
                cameraAtiva ? 'scanner-viewport-active' : ''
              }`}
            />

            {!cameraAtiva && !status.msg && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 space-y-4 bg-slate-950">
                <div className="w-16 h-16 bg-slate-800/50 text-slate-400 rounded-2xl flex items-center justify-center border border-slate-700/50">
                  <QrCode size={32} />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider">Câmera Desativada</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-[240px] leading-relaxed">
                    Ative o leitor para escanear o QR Code de baixa impresso no cartão digital.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={iniciarCamera}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-2"
                >
                  <Camera size={14} />
                  Ativar Câmera
                </button>
              </div>
            )}

            {/* HUD / Scanning Overlay when camera active */}
            {cameraAtiva && (
              <>
                <div className="scanner-hud-corner scanner-hud-tl" />
                <div className="scanner-hud-corner scanner-hud-tr" />
                <div className="scanner-hud-corner scanner-hud-bl" />
                <div className="scanner-hud-corner scanner-hud-br" />
                <div className="scanner-laser" />

                {/* Status indicator floating */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm border border-emerald-400/20 z-10 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                  Scanner de Eventos Ativo
                </div>
              </>
            )}
          </div>

          {/* Camera Error Message */}
          {erroCamera && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div className="font-semibold leading-relaxed">{erroCamera}</div>
            </div>
          )}

          {/* Scanning status / Baixa Feedback details */}
          {status.msg && !recibo && (
            <div className="animate-in fade-in zoom-in duration-200">
              {status.loading ? (
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{status.msg}</p>
                </div>
              ) : (
                <div
                  className={`p-6 rounded-2xl border flex flex-col items-center text-center space-y-4 ${status.type === 'success'
                      ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800'
                      : status.type === 'error'
                        ? 'bg-rose-50/50 border-rose-100 text-rose-800'
                        : 'bg-amber-50/50 border-amber-100 text-amber-800'
                    }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${status.type === 'success'
                        ? 'bg-emerald-100 text-emerald-600'
                        : status.type === 'error'
                          ? 'bg-rose-100 text-rose-600'
                          : 'bg-amber-100 text-amber-600'
                      }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle size={24} />
                    ) : (
                      <AlertCircle size={24} />
                    )}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wider">
                      {status.type === 'success'
                        ? 'Baixa Processada'
                        : status.type === 'error'
                          ? 'Erro na Leitura'
                          : 'Aviso de Registro'}
                    </h4>
                    <p className="text-xs font-semibold mt-1.5 leading-relaxed max-w-[280px]">
                      {status.msg}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recibo Ticket Visually Structured */}
          {recibo && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-300">

              <div className="relative border border-slate-150 bg-slate-50/40 rounded-3xl p-5 space-y-4 overflow-hidden shadow-inner">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Comprovante de Inscrição</h4>
                    <p className="text-[9px] text-slate-400 font-medium font-semibold">Baixa realizada via QR Code</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5"><User size={13} /> Participante</span>
                    <span className="font-extrabold text-slate-800">{recibo.nome}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5"><Calendar size={13} /> Evento</span>
                    <span className="font-bold text-slate-800 truncate max-w-[200px]">{recibo.evento}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5"><Tag size={13} /> Referência</span>
                    <span className="font-bold text-slate-800">
                      {recibo.ehParcela ? `Parcela ${recibo.parcelaNum} de ${recibo.totalParcelas}` : 'Pagamento Integral'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5"><DollarSign size={13} /> Valor da Parcela</span>
                    <span className="font-extrabold text-emerald-600">R$ {recibo.valor.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5"><Clock size={13} /> Data de Baixa</span>
                    <span className="font-semibold text-slate-600">{recibo.data.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5"><Info size={13} /> Situação</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${recibo.statusPagamento === 'pago'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                      }`}>
                      {recibo.statusPagamento === 'pago' ? 'Quitado' : 'Pendente'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Share Actions */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
                  Compartilhar Recibo
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleEnviarReciboPDF}
                    className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black uppercase text-[10px] tracking-wider shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 size={13} />
                    Recibo (PDF)
                  </button>
                  <button
                    onClick={handleEnviarReciboPNG}
                    className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black uppercase text-[10px] tracking-wider shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 size={13} />
                    Recibo (Imagem)
                  </button>
                </div>
              </div>

              {/* Download Actions */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
                  Download do Cartão Digital
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleBaixarCartaoPNG}
                    className="py-3 bg-[#202046] hover:bg-[#2e2e5e] text-white rounded-xl font-black uppercase text-[10px] tracking-wider shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={13} />
                    Cartão (PNG)
                  </button>
                  <button
                    onClick={handleBaixarCartaoPDF}
                    className="py-3 bg-[#202046] hover:bg-[#2e2e5e] text-white rounded-xl font-black uppercase text-[10px] tracking-wider shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={13} />
                    Cartão (PDF)
                  </button>
                </div>
              </div>

              <p className="text-[9px] text-slate-400 text-center font-medium leading-relaxed">
                Em celulares, as opções de envio abrem o menu de compartilhamento do WhatsApp/sistema para envio direto.
              </p>
            </div>
          )}

          {/* Action buttons */}
          {status.type && status.type !== 'info' && (
            <button
              onClick={handleProximaLeitura}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} />
              Próxima Leitura
            </button>
          )}

          {cameraAtiva && (
            <button
              type="button"
              onClick={pararCamera}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-xl font-bold text-xs transition cursor-pointer"
            >
              Desligar Câmera
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
