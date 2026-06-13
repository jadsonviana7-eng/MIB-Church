import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';

export default function LeitorQRCodeEvento({ onVoltar, eventoId }) {
  const [status, setStatus] = useState({ loading: false, msg: '', type: '' });

  useEffect(() => {
    // Inicializa o scanner no elemento com id 'reader-evento'
    const scanner = new Html5QrcodeScanner('reader-evento', {
      qrbox: { width: 250, height: 250 },
      fps: 10,
    });

    scanner.render(onScanSuccess, onScanError);

    async function onScanSuccess(result) {
      // O formato esperado gerado pelo CarneGenerator é: EVENTO|inscricaoId|parcelaNum
      if (result && result.startsWith('EVENTO|')) {
        try {
          scanner.clear(); // Para a câmera após a leitura
        } catch (e) {
          console.warn("Erro ao limpar scanner:", e);
        }
        
        const [_, inscricaoId, parcelaNum] = result.split('|');
        darBaixaEvento(inscricaoId, parcelaNum);
      }
    }

    function onScanError(err) { /* Ignora erros de frame */ }

    return () => {
      try {
        scanner.clear();
      } catch (e) {
        // Já limpo
      }
    };
  }, []);

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
        setStatus({ 
          loading: false, 
          msg: `A parcela ${parcelaNum} de ${dados.nome || 'participante'} já foi baixada anteriormente.`, 
          type: 'warning' 
        });
        return;
      }

      // 3. Atualiza o JSONB adicionando a nova parcela e verificando o status total
      const novasParcelas = [...parcelasPagas, parcelaNum];
      
      // Busca a quantidade total de parcelas informada no formulário dinâmico
      const totalParcelasConfiguradas = Number(Object.entries(dados).find(([k]) => k.toLowerCase().includes('parcelas'))?.[1]) || 1;
      const novoStatusPg = novasParcelas.length >= totalParcelasConfiguradas ? 'pago' : 'pendente';

      const { error: errorUpdate } = await supabase
        .from('agenda_inscricoes')
        .update({ 
          status_pagamento: novoStatusPg,
          dados_inscricao: { ...dados, parcelas_pagas: novasParcelas }
        })
        .eq('id', inscricaoId);

      if (errorUpdate) throw errorUpdate;

      setStatus({ 
        loading: false, 
        msg: `✅ Baixa realizada! Parcela ${parcelaNum} de "${inscricao.agenda_eventos.titulo}" confirmada para ${dados.nome || 'Participante'}.`, 
        type: 'success' 
      });

    } catch (err) {
      setStatus({ loading: false, msg: 'Erro: ' + err.message, type: 'error' });
    }
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto p-4">
      <PageHeader titulo="Baixa de Evento (QR)" onNavigate={onVoltar} />
      
      <Card className="p-0 overflow-hidden shadow-2xl border-none">
        <div className="p-6">
          <div id="reader-evento" className="overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50"></div>
          
          {status.msg && (
            <div className={`mt-6 p-4 rounded-2xl text-sm font-bold text-center animate-in fade-in zoom-in ${
              status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
              status.type === 'error' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
              status.type === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
              'bg-blue-50 text-blue-700 border border-blue-100'
            }`}>
              {status.msg}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}