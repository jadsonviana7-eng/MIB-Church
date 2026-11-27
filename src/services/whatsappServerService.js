import { supabase } from '../supabaseClient';
import { gerarReciboQuitacaoPDF, obterMensagemBoasVindasEvento } from '../utils/reciboQuitacaoPdf';

const STORAGE_KEY = 'mib_whatsapp_server_config_v1';
const BRIDGE_TABLE = 'whatsapp_bridge_mib';

export const DEFAULT_WHATSAPP_CONFIG = {
  serverUrl: 'http://localhost:3001',
  autoEnviarReciboQuitacao: true,
  autoEnviarBoasVindasEvento: true,
  mensagemBoasVindasTemplate: ''
};

export function obterConfigWhatsApp() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_WHATSAPP_CONFIG };
    return { ...DEFAULT_WHATSAPP_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_WHATSAPP_CONFIG };
  }
}

export async function carregarConfigWhatsAppRemota() {
  const local = obterConfigWhatsApp();
  try {
    const { data, error } = await supabase
      .from(BRIDGE_TABLE)
      .select('config')
      .eq('id', 1)
      .maybeSingle();
    if (!error && data?.config && typeof data.config === 'object') {
      const merged = { ...DEFAULT_WHATSAPP_CONFIG, ...local, ...data.config };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (_) {}
  return local;
}

export async function salvarConfigWhatsApp(novaConfig) {
  const merged = { ...obterConfigWhatsApp(), ...novaConfig };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (_) {}
  try {
    await supabase
      .from(BRIDGE_TABLE)
      .upsert({ id: 1, config: merged, updated_at: new Date().toISOString() }, { onConflict: 'id' });
  } catch (_) {}
  return merged;
}

function limparBaseUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

async function fetchComTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function lerStatusBridgeSupabase() {
  try {
    const { data, error } = await supabase
      .from(BRIDGE_TABLE)
      .select('bridge_status')
      .eq('id', 1)
      .maybeSingle();
    if (error || !data?.bridge_status) return null;
    const bridge = data.bridge_status;
    // Considera ponte ativa se heartbeat ocorreu nos últimos 60 segundos
    const ativo = bridge.heartbeat && (Date.now() - bridge.heartbeat) < 60000;
    return {
      ok: ativo,
      viaBridge: true,
      status: ativo ? (bridge.status || 'disconnected') : 'offline',
      connected: Boolean(ativo && bridge.connected),
      qrDataUrl: ativo ? (bridge.qrDataUrl || '') : '',
      user: ativo ? (bridge.user || null) : null,
      heartbeat: bridge.heartbeat || null
    };
  } catch {
    return null;
  }
}

async function executarComandoBridgeSupabase(payload, timeoutMs = 30000) {
  const cmdId = `cmd_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const cmdObj = {
    id: cmdId,
    ...payload,
    status: 'pending',
    createdAt: Date.now()
  };

  const { error: upErr } = await supabase
    .from(BRIDGE_TABLE)
    .upsert({ id: 1, pending_cmd: cmdObj, updated_at: new Date().toISOString() }, { onConflict: 'id' });

  if (upErr) {
    throw new Error('Tabela whatsapp_bridge_mib não encontrada no Supabase. Execute o SQL whatsapp_bridge_mib.sql.');
  }

  const inicio = Date.now();
  while (Date.now() - inicio < timeoutMs) {
    await new Promise((r) => setTimeout(r, 1200));
    const { data: checkRow } = await supabase
      .from(BRIDGE_TABLE)
      .select('pending_cmd')
      .eq('id', 1)
      .maybeSingle();

    const current = checkRow?.pending_cmd;
    if (current && current.id === cmdId) {
      if (current.status === 'done') {
        return { ok: true, viaBridge: true, ...(current.result || {}) };
      }
      if (current.status === 'error') {
        throw new Error(current.error || 'Erro ao processar comando no servidor WhatsApp.');
      }
    }
  }

  throw new Error('Servidor WhatsApp não respondeu a tempo. Verifique se o servidor está rodando (npm run whatsapp ou Render).');
}

export async function consultarStatusWhatsApp() {
  const cfg = obterConfigWhatsApp();
  const baseUrl = limparBaseUrl(cfg.serverUrl);

  if (baseUrl) {
    try {
      const res = await fetchComTimeout(`${baseUrl}/status`, { method: 'GET' }, 4000);
      if (res.ok) {
        const data = await res.json();
        return { ...data, viaBridge: false };
      }
    } catch (_) {
      // Fallback para Ponte Supabase
    }
  }

  const bridgeStatus = await lerStatusBridgeSupabase();
  if (bridgeStatus) return bridgeStatus;

  return {
    ok: false,
    status: 'offline',
    connected: false,
    qrDataUrl: '',
    user: null,
    viaBridge: false
  };
}

export async function solicitarCodigoPareamento(phone) {
  const cfg = obterConfigWhatsApp();
  const baseUrl = limparBaseUrl(cfg.serverUrl);

  if (baseUrl) {
    try {
      const res = await fetchComTimeout(
        `${baseUrl}/pair-code`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone })
        },
        25000
      );
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Falha ao gerar código.');
      return data;
    } catch (err) {
      if (err?.name !== 'AbortError' && !String(err?.message || '').includes('Failed to fetch')) {
        throw err;
      }
    }
  }

  return executarComandoBridgeSupabase({ action: 'pair-code', phone }, 35000);
}

export async function desconectarWhatsApp() {
  const cfg = obterConfigWhatsApp();
  const baseUrl = limparBaseUrl(cfg.serverUrl);

  if (baseUrl) {
    try {
      const res = await fetchComTimeout(`${baseUrl}/logout`, { method: 'POST' }, 8000);
      if (res.ok) return await res.json();
    } catch (_) {}
  }

  return executarComandoBridgeSupabase({ action: 'logout' }, 20000);
}

export async function enviarDocumentoWhatsApp({ phone, fileName, caption, pdfBase64, mimetype = 'application/pdf' }) {
  const cfg = obterConfigWhatsApp();
  const baseUrl = limparBaseUrl(cfg.serverUrl);
  const payload = { phone, fileName, caption, pdfBase64, mimetype };

  if (baseUrl) {
    try {
      const res = await fetchComTimeout(
        `${baseUrl}/send-document`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        },
        25000
      );
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Falha ao enviar documento.');
      return { ...data, viaBridge: false };
    } catch (err) {
      if (err?.name !== 'AbortError' && !String(err?.message || '').includes('Failed to fetch')) {
        throw err;
      }
    }
  }

  return executarComandoBridgeSupabase({ action: 'send-document', ...payload }, 35000);
}

export async function enviarMensagemWhatsApp({ phone, text }) {
  const cfg = obterConfigWhatsApp();
  const baseUrl = limparBaseUrl(cfg.serverUrl);
  const payload = { phone, text };

  if (baseUrl) {
    try {
      const res = await fetchComTimeout(
        `${baseUrl}/send-message`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        },
        20000
      );
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Falha ao enviar mensagem.');
      return { ...data, viaBridge: false };
    } catch (err) {
      if (err?.name !== 'AbortError' && !String(err?.message || '').includes('Failed to fetch')) {
        throw err;
      }
    }
  }

  return executarComandoBridgeSupabase({ action: 'send-message', ...payload }, 30000);
}

/**
 * Dispara automaticamente o Recibo Especial de Quitação em PDF com QR Code
 * para o WhatsApp do inscrito quando o pagamento do evento é quitado.
 */
export async function dispararReciboQuitacaoAutomatico({
  evento,
  inscrito,
  pessoas = [],
  obterZonaParticipante,
  forcar = false
}) {
  const cfg = obterConfigWhatsApp();
  if (!forcar && !cfg.autoEnviarReciboQuitacao) {
    return { skipped: true, reason: 'Envio automático de recibo desativado nas configurações.' };
  }

  const { pdfBase64, nomeArquivo, caption, info } = await gerarReciboQuitacaoPDF({
    evento,
    inscrito,
    pessoas,
    obterZonaParticipante
  });

  if (!info.rawPhone) {
    return { skipped: true, reason: 'Participante sem telefone/WhatsApp cadastrado.' };
  }

  const res = await enviarDocumentoWhatsApp({
    phone: info.rawPhone,
    fileName: nomeArquivo,
    caption,
    pdfBase64
  });

  return { ok: true, ...res, codigoRecibo: info.codigoRecibo, nome: info.nome };
}

/**
 * Dispara automaticamente mensagem de boas-vindas ao evento quando há nova inscrição.
 */
export async function dispararBoasVindasEventoAutomatico({
  evento,
  nome,
  telefone,
  forcar = false
}) {
  const cfg = obterConfigWhatsApp();
  if (!forcar && !cfg.autoEnviarBoasVindasEvento) {
    return { skipped: true, reason: 'Envio automático de boas-vindas desativado nas configurações.' };
  }

  if (!telefone) {
    return { skipped: true, reason: 'Participante sem telefone/WhatsApp cadastrado.' };
  }

  const text = obterMensagemBoasVindasEvento({
    evento,
    nome,
    templateCustom: cfg.mensagemBoasVindasTemplate
  });

  const res = await enviarMensagemWhatsApp({ phone: telefone, text });
  return { ok: true, ...res };
}
