import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';

export default function LeitorQRCode({ onVoltar }) {
  const [status, setStatus] = useState({ loading: false, msg: '', type: '' });

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader-geral', {
      qrbox: { width: 250, height: 250 },
      fps: 10,
    });

    scanner.render(onScanSuccess, onScanError);

    async function onScanSuccess(result) {
      // O resultado esperado é o ID da transação (UUID)
      if (result && result.length > 30 && !result.includes('|')) {
        try {
          scanner.clear();
        } catch (e) {
          console.warn("Erro ao limpar scanner:", e);
        }
        darBaixa(result);
      }
    }

    function onScanError(err) { /* Ignora erros de frame */ }

    return () => {
      try {
        scanner.clear();
      } catch (e) {}
    };
  }, []);

  async function darBaixa(id) {
    setStatus({ loading: true, msg: 'Processando pagamento...', type: 'info' });
    
    try {
      const { data: transacao, error: errorFetch } = await supabase
        .from('transacoes_financeiras')
        .select('descricao, valor, status')
        .eq('id', id)
        .single();

      if (errorFetch || !transacao) throw new Error('Transação não encontrada ou inválida.');
      
      if (transacao.status === 'pago') {
        setStatus({ loading: false, msg: `Esta parcela já foi paga anteriormente (${transacao.descricao}).`, type: 'warning' });
        return;
      }

      const { error: errorUpdate } = await supabase
        .from('transacoes_financeiras')
        .update({ status: 'pago' })
        .eq('id', id);

      if (errorUpdate) throw errorUpdate;

      setStatus({ 
        loading: false, 
        msg: `✅ Baixa realizada! R$ ${transacao.valor.toFixed(2)} - ${transacao.descricao}`, 
        type: 'success' 
      });

    } catch (err) {
      setStatus({ loading: false, msg: 'Erro: ' + err.message, type: 'error' });
    }
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto p-4">
      <PageHeader titulo="Leitor de Carnê" breadcrumb={['Utilitários', 'Leitor QR']} onNavigate={onVoltar} />
      
      <Card className="p-0 overflow-hidden shadow-2xl border-none">
        <div className="p-6">
          <div id="reader-geral" className="overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50"></div>
          
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
          
          {status.type && status.type !== 'info' && (
            <button onClick={() => window.location.reload()} className="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg transition-all cursor-pointer">
              Próxima Leitura 🔄
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}