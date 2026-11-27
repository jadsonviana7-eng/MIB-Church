import React, { useEffect, useState, useCallback } from 'react';
import { Card } from './ui';
import {
  MessageCircle,
  RefreshCw,
  LogOut,
  Send,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Smartphone,
  Save,
  Wifi,
  WifiOff,
  Loader2,
  Sparkles,
  Server
} from 'lucide-react';
import {
  obterConfigWhatsApp,
  carregarConfigWhatsAppRemota,
  salvarConfigWhatsApp,
  consultarStatusWhatsApp,
  solicitarCodigoPareamento,
  desconectarWhatsApp,
  enviarMensagemWhatsApp
} from './services/whatsappServerService';

export default function PainelWhatsAppConfig() {
  const [config, setConfig] = useState(() => obterConfigWhatsApp());
  const [statusInfo, setStatusInfo] = useState({
    loading: true,
    status: 'offline',
    connected: false,
    qrDataUrl: '',
    user: null,
    viaBridge: false
  });
  const [telefonePareamento, setTelefonePareamento] = useState('');
  const [codigoPareamento, setCodigoPareamento] = useState('');
  const [gerandoCodigo, setGerandoCodigo] = useState(false);

  const [telefoneTeste, setTelefoneTeste] = useState('');
  const [enviandoTeste, setEnviandoTeste] = useState(false);

  const [salvandoCfg, setSalvandoCfg] = useState(false);
  const [desconectando, setDesconectando] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', msg }

  const atualizarStatus = useCallback(async ({ silencioso = false } = {}) => {
    if (!silencioso) {
      setStatusInfo((prev) => ({ ...prev, loading: true }));
    }
    const res = await consultarStatusWhatsApp();
    setStatusInfo({
      loading: false,
      status: res.status || (res.connected ? 'connected' : 'offline'),
      connected: Boolean(res.connected),
      qrDataUrl: res.qrDataUrl || '',
      user: res.user || null,
      viaBridge: Boolean(res.viaBridge)
    });
  }, []);

  useEffect(() => {
    carregarConfigWhatsAppRemota().then((cfg) => setConfig(cfg));
    atualizarStatus();
  }, [atualizarStatus]);

  // Atualiza QR/status automaticamente a cada 5s enquanto não estiver conectado
  useEffect(() => {
    if (statusInfo.connected) return;
    const timer = setInterval(() => {
      atualizarStatus({ silencioso: true });
    }, 5000);
    return () => clearInterval(timer);
  }, [statusInfo.connected, atualizarStatus]);

  async function handleSalvarConfig(e) {
    if (e) e.preventDefault();
    setSalvandoCfg(true);
    setFeedback(null);
    try {
      const salvo = await salvarConfigWhatsApp(config);
      setConfig(salvo);
      setFeedback({ type: 'success', msg: 'Configurações do WhatsApp Automático salvas com sucesso!' });
      atualizarStatus({ silencioso: true });
    } catch (err) {
      setFeedback({ type: 'error', msg: 'Erro ao salvar configurações: ' + err.message });
    } finally {
      setSalvandoCfg(false);
    }
  }

  async function handleGerarCodigo() {
    if (!telefonePareamento.trim()) {
      setFeedback({ type: 'error', msg: 'Informe o número com DDD (ex: 82999999999).' });
      return;
    }
    setGerandoCodigo(true);
    setCodigoPareamento('');
    setFeedback(null);
    try {
      const res = await solicitarCodigoPareamento(telefonePareamento);
      setCodigoPareamento(res.code || '');
      setFeedback({
        type: 'success',
        msg: 'Código gerado! No celular, abra WhatsApp → Aparelhos Conectados → Conectar com número de telefone e digite o código abaixo.'
      });
    } catch (err) {
      setFeedback({ type: 'error', msg: err.message || 'Não foi possível gerar o código de pareamento.' });
    } finally {
      setGerandoCodigo(false);
    }
  }

  async function handleDesconectar() {
    const ok = window.confirmModal
      ? await window.confirmModal('Desconectar WhatsApp', 'Deseja encerrar a sessão atual do WhatsApp no servidor?')
      : window.confirm('Deseja encerrar a sessão atual do WhatsApp no servidor?');
    if (!ok) return;

    setDesconectando(true);
    setFeedback(null);
    try {
      await desconectarWhatsApp();
      setCodigoPareamento('');
      setFeedback({ type: 'success', msg: 'Sessão encerrada. Um novo QR Code será gerado em instantes.' });
      setTimeout(() => atualizarStatus(), 1500);
    } catch (err) {
      setFeedback({ type: 'error', msg: err.message || 'Erro ao desconectar.' });
    } finally {
      setDesconectando(false);
    }
  }

  async function handleEnviarTeste(e) {
    e.preventDefault();
    if (!telefoneTeste.trim()) {
      setFeedback({ type: 'error', msg: 'Informe um número de WhatsApp para o teste.' });
      return;
    }
    setEnviandoTeste(true);
    setFeedback(null);
    try {
      await enviarMensagemWhatsApp({
        phone: telefoneTeste,
        text: '✅ *MIB Church — WhatsApp Automático*\n\nConexão validada com sucesso! O servidor próprio está pronto para enviar recibos em PDF e mensagens automáticas.'
      });
      setFeedback({ type: 'success', msg: 'Mensagem de teste enviada com sucesso!' });
    } catch (err) {
      setFeedback({ type: 'error', msg: err.message || 'Falha ao enviar mensagem de teste.' });
    } finally {
      setEnviandoTeste(false);
    }
  }

  return (
    <div className="space-y-5">
      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 text-xs font-semibold ${
            feedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
          )}
          <span className="flex-1 leading-relaxed">{feedback.msg}</span>
        </div>
      )}

      {/* 1. Status e Conexão do Servidor */}
      <Card className="p-5 sm:p-6 rounded-2xl border border-slate-100 dark:border-[#2b3954] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-[#24334f] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                Servidor Próprio de WhatsApp
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Envio automático de recibos em PDF e mensagens via Baileys + Ponte Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${
                statusInfo.connected
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                  : statusInfo.status === 'qr'
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {statusInfo.connected ? <Wifi size={12} /> : <WifiOff size={12} />}
              {statusInfo.connected
                ? `Conectado${statusInfo.viaBridge ? ' (Nuvem)' : ''}`
                : statusInfo.status === 'qr'
                  ? 'Aguardando Pareamento'
                  : 'Servidor Offline'}
            </span>

            <button
              type="button"
              onClick={() => atualizarStatus()}
              disabled={statusInfo.loading}
              className="p-2 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#131d31] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1c2b4a] transition cursor-pointer"
              title="Atualizar status"
            >
              <RefreshCw size={14} className={statusInfo.loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Estado Conectado vs Pareamento */}
        {statusInfo.connected ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-emerald-900 dark:text-emerald-200">
                  {statusInfo.user?.name || 'WhatsApp MIB Church'}
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                  {statusInfo.user?.id || 'Sessão ativa'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDesconectar}
              disabled={desconectando}
              className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-800/60 bg-white dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/50 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition"
            >
              <LogOut size={14} />
              {desconectando ? 'Saindo...' : 'Desconectar'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Opção 1: QR Code */}
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#24334f] bg-slate-50/60 dark:bg-[#0f172a]/70 flex flex-col items-center text-center justify-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                <QrCode size={15} className="text-blue-600 dark:text-blue-400" />
                Conectar via QR Code
              </div>
              {statusInfo.qrDataUrl ? (
                <div
                  className="p-2.5 rounded-2xl border border-slate-200 shadow-sm inline-block"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <img src={statusInfo.qrDataUrl} alt="QR Code WhatsApp" className="w-48 h-48 block" />
                </div>
              ) : (
                <div className="w-48 h-48 rounded-2xl border border-dashed border-slate-300 dark:border-[#2b3954] flex flex-col items-center justify-center p-4 text-center gap-2">
                  <Server size={24} className="text-slate-400" />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Inicie o servidor com <code className="font-mono font-bold text-blue-600 dark:text-blue-400">npm run whatsapp</code> ou hospede no Render para exibir o QR Code aqui.
                  </p>
                </div>
              )}
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                WhatsApp → Aparelhos Conectados → Conectar aparelho
              </p>
            </div>

            {/* Opção 2: Código de Pareamento */}
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#24334f] bg-slate-50/60 dark:bg-[#0f172a]/70 flex flex-col justify-between gap-3">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  <Smartphone size={15} className="text-emerald-600 dark:text-emerald-400" />
                  Conectar por Número de Telefone
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Ideal para conectar direto do celular sem precisar ler QR Code com outro aparelho.
                </p>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    WhatsApp com DDD
                  </label>
                  <input
                    type="text"
                    value={telefonePareamento}
                    onChange={(e) => setTelefonePareamento(e.target.value)}
                    placeholder="Ex: 82999999999"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#131d31] text-slate-800 dark:text-slate-100 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleGerarCodigo}
                  disabled={gerandoCodigo}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {gerandoCodigo ? <Loader2 size={14} className="animate-spin" /> : <Smartphone size={14} />}
                  {gerandoCodigo ? 'Gerando Código...' : 'Gerar Código de Pareamento'}
                </button>
              </div>

              {codigoPareamento && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                    Seu Código de Pareamento
                  </p>
                  <p className="text-2xl font-black tracking-[0.2em] text-emerald-800 dark:text-emerald-200 font-mono mt-1">
                    {codigoPareamento}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* 2. Configurações do Servidor e Disparos Automáticos */}
      <form onSubmit={handleSalvarConfig} className="space-y-5">
        <Card className="p-5 sm:p-6 rounded-2xl border border-slate-100 dark:border-[#2b3954] space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-[#24334f] pb-3">
            <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">
              Disparos Automáticos & Endereço do Servidor
            </h4>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
              URL do Servidor WhatsApp (Local ou Render)
            </label>
            <input
              type="url"
              value={config.serverUrl || ''}
              onChange={(e) => setConfig((prev) => ({ ...prev, serverUrl: e.target.value }))}
              placeholder="http://localhost:3001 ou https://mib-church-whatsapp-api.onrender.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-slate-50 dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Se a URL direta não responder (ex.: acessando pelo celular), o sistema usa automaticamente a <strong>Ponte Supabase</strong>.
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/80 dark:border-[#24334f] bg-slate-50/50 dark:bg-[#0f172a]/50 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(config.autoEnviarReciboQuitacao)}
                onChange={(e) => setConfig((prev) => ({ ...prev, autoEnviarReciboQuitacao: e.target.checked }))}
                className="mt-0.5 w-4 h-4 rounded text-emerald-600 cursor-pointer"
              />
              <div>
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                  Enviar Recibo Especial em PDF ao quitar inscrição de evento
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Sempre que um pagamento de evento for confirmado como quitado (manualmente ou pelo Leitor de QR Code), o participante recebe o Recibo Especial em PDF com QR Code de entrada automaticamente.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/80 dark:border-[#24334f] bg-slate-50/50 dark:bg-[#0f172a]/50 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(config.autoEnviarBoasVindasEvento)}
                onChange={(e) => setConfig((prev) => ({ ...prev, autoEnviarBoasVindasEvento: e.target.checked }))}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 cursor-pointer"
              />
              <div>
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                  Enviar mensagem automática de boas-vindas ao inscrever em evento
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Assim que uma nova inscrição é concluída no formulário público do evento, o inscrito recebe uma mensagem de boas-vindas no WhatsApp.
                </p>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
              Modelo Personalizado de Boas-Vindas (Opcional)
            </label>
            <textarea
              rows={3}
              value={config.mensagemBoasVindasTemplate || ''}
              onChange={(e) => setConfig((prev) => ({ ...prev, mensagemBoasVindasTemplate: e.target.value }))}
              placeholder="Deixe vazio para usar o modelo padrão. Variáveis disponíveis: {{NOME}}, {{PRIMEIRO_NOME}}, {{EVENTO}}, {{DATA}}, {{LOCAL}}"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-slate-50 dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={salvandoCfg}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider shadow-sm transition cursor-pointer flex items-center gap-2 disabled:opacity-60"
            >
              <Save size={14} />
              {salvandoCfg ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </div>
        </Card>
      </form>

      {/* 3. Teste Rápido de Envio */}
      <Card className="p-5 sm:p-6 rounded-2xl border border-slate-100 dark:border-[#2b3954] space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">
          Testar Envio de Mensagem
        </h4>
        <form onSubmit={handleEnviarTeste} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={telefoneTeste}
            onChange={(e) => setTelefoneTeste(e.target.value)}
            placeholder="Digite o WhatsApp com DDD (ex: 82999999999)"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-slate-50 dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 text-xs font-semibold outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
          <button
            type="submit"
            disabled={enviandoTeste}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 shrink-0"
          >
            {enviandoTeste ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            {enviandoTeste ? 'Enviando...' : 'Enviar Teste'}
          </button>
        </form>
      </Card>
    </div>
  );
}
