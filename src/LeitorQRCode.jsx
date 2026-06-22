import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { supabase } from './supabaseClient';
import { Card, PageHeader } from './ui';
import './LeitorQRCode.css';
import { 
  Camera, QrCode, CheckCircle, AlertCircle, 
  RefreshCw, Loader2
} from 'lucide-react';

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
        'Não foi possível acessar a câmera. Verifique se o site está rodando em HTTPS e se a permissão de câmera foi concedida no navegador.'
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
    setStatus({ loading: true, msg: 'Processando pagamento da parcela...', type: 'info' });

    try {
      const { data: transacao, error: errorFetch } = await supabase
        .from('transacoes_financeiras')
        .select('descricao, valor, status')
        .eq('id', id)
        .single();

      if (errorFetch || !transacao) throw new Error('Transação/parcela não encontrada ou inválida no sistema.');

      if (transacao.status === 'pago') {
        setStatus({ loading: false, msg: `Esta parcela já consta como paga anteriormente (${transacao.descricao}).`, type: 'warning' });
        return;
      }

      const { error: errorUpdate } = await supabase
        .from('transacoes_financeiras')
        .update({ status: 'pago' })
        .eq('id', id);

      if (errorUpdate) throw errorUpdate;

      setStatus({
        loading: false,
        msg: `Baixa realizada com sucesso! Parcela no valor de R$ ${transacao.valor.toFixed(2)} (${transacao.descricao}) confirmada.`,
        type: 'success',
      });
    } catch (err) {
      setStatus({ loading: false, msg: 'Erro ao registrar baixa: ' + err.message, type: 'error' });
    }
  }

  function handleProximaLeitura() {
    setStatus({ loading: false, msg: '', type: '' });
    iniciarCamera();
  }

  return (
    <div className="max-w-xl mx-auto pt-0 px-0 pb-12 sm:px-6 space-y-6 mx-[-3px] sm:mx-auto">
      <div className="mx-[3px] sm:mx-0">
        <PageHeader titulo="Leitor de Carnê" breadcrumb={['Utilitários', 'Leitor QR']} onNavigate={onVoltar} />
      </div>

      <Card className="p-0 overflow-hidden shadow-xl border border-slate-100 rounded-[28px] bg-white">
        <div className="p-6 space-y-6">
          {/* Scanner Viewport Container */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
            <div 
              id="reader-geral" 
              className={`overflow-hidden rounded-2xl bg-slate-950 min-h-[300px] flex items-center justify-center transition-all ${
                cameraAtiva ? 'scanner-viewport-active' : ''
              }`}
            >
              {!cameraAtiva && !status.msg && (
                <div className="flex flex-col items-center text-center p-8 space-y-4">
                  <div className="w-16 h-16 bg-slate-800/50 text-slate-400 rounded-2xl flex items-center justify-center border border-slate-700/50">
                    <QrCode size={32} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider">Câmera Desativada</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[240px] leading-relaxed">
                      Ative o leitor para escanear o QR Code de pagamento impresso no cupom.
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
            </div>

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
                  Aponte para o QR Code
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
          {status.msg && (
            <div className="animate-in fade-in zoom-in duration-255">
              {status.loading ? (
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{status.msg}</p>
                </div>
              ) : (
                <div 
                  className={`p-6 rounded-2xl border flex flex-col items-center text-center space-y-4 ${
                    status.type === 'success'
                      ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800'
                      : status.type === 'error'
                      ? 'bg-rose-50/50 border-rose-100 text-rose-800'
                      : 'bg-amber-50/50 border-amber-100 text-amber-800'
                  }`}
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${
                      status.type === 'success'
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

          {/* Action buttons */}
          {status.type && !status.loading && (
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
