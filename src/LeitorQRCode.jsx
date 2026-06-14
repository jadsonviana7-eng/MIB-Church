import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { supabase } from './supabaseClient';
import { Card, PageHeader } from './ui';

export default function LeitorQRCode({ onVoltar }) {
  const [status, setStatus] = useState({ loading: false, msg: '', type: '' });
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [erroCamera, setErroCamera] = useState('');

  const html5QrCodeRef = useRef(null);
  const processandoRef = useRef(false);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode('reader-geral');

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

    // O resultado esperado é o ID da transação (UUID)
    if (result && result.length > 30 && !result.includes('|')) {
      processandoRef.current = true;
      await pararCamera();

      await darBaixa(result);

      processandoRef.current = false;
    }
  }

  function onScanError() {
    /* Ignora erros de frame (nenhum QR detectado neste frame) */
  }

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
        type: 'success',
      });
    } catch (err) {
      setStatus({ loading: false, msg: 'Erro: ' + err.message, type: 'error' });
    }
  }

  function handleProximaLeitura() {
    setStatus({ loading: false, msg: '', type: '' });
    iniciarCamera();
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto p-4">
      <PageHeader titulo="Leitor de Carnê" breadcrumb={['Utilitários', 'Leitor QR']} onNavigate={onVoltar} />

      <Card className="p-0 overflow-hidden shadow-2xl border-none">
        <div className="p-6 space-y-4">
          <div className="relative">
            <div id="reader-geral" className="overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50 min-h-[280px]"></div>

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
