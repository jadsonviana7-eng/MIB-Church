import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  Browsers
} from "@whiskeysockets/baileys";
import QRCode from "qrcode";
import pino from "pino";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega variáveis de .env.local / .env sem dependências extras
function loadEnvFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, "utf-8");
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const idx = line.indexOf("=");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (key && process.env[key] === undefined) {
        process.env[key] = val;
      }
    }
  } catch (_) {}
}

loadEnvFile(path.join(__dirname, ".env.local"));
loadEnvFile(path.join(__dirname, ".env"));

const PORT = Number(process.env.WA_PORT || process.env.PORT || 3001);
const AUTH_DIR = path.join(__dirname, "whatsapp_auth_session");
const BRIDGE_TABLE = "whatsapp_bridge_mib";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

let sock = null;
let connectionStatus = "starting"; // "starting" | "qr" | "connected" | "disconnected"
let currentQrDataUrl = "";
let connectedUser = null;
let isReconnecting = false;
let isProcessingBridge = false;
let authBackupTimer = null;

// ─── Backup e Restauração da Sessão do WhatsApp no Supabase (Nuvem 24h / Render) ───
async function restoreAuthSessionFromSupabase() {
  if (!supabase) return false;
  try {
    const credsPath = path.join(AUTH_DIR, "creds.json");
    if (fs.existsSync(credsPath)) return true;

    const { data: row, error } = await supabase
      .from(BRIDGE_TABLE)
      .select("auth_backup")
      .eq("id", 1)
      .maybeSingle();

    const backup = row?.auth_backup;
    if (error || !backup || typeof backup !== "object" || !backup["creds.json"]) {
      return false;
    }

    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
    }

    for (const [fileName, fileContent] of Object.entries(backup)) {
      if (!fileName.endsWith(".json") || fileName.includes("/") || fileName.includes("\\")) continue;
      fs.writeFileSync(path.join(AUTH_DIR, fileName), String(fileContent), "utf-8");
    }
    console.log("[WhatsApp MIB] Sessão restaurada automaticamente do Supabase!");
    return true;
  } catch (err) {
    console.warn("[WhatsApp MIB] Aviso ao restaurar sessão do Supabase:", err.message);
    return false;
  }
}

function scheduleAuthSessionBackupToSupabase() {
  if (!supabase) return;
  if (authBackupTimer) clearTimeout(authBackupTimer);
  authBackupTimer = setTimeout(async () => {
    try {
      const credsPath = path.join(AUTH_DIR, "creds.json");
      if (!fs.existsSync(credsPath)) return;

      const files = fs.readdirSync(AUTH_DIR).filter((f) => f.endsWith(".json"));
      const backup = {};
      for (const file of files) {
        if (file === "creds.json" || file.startsWith("app-state-sync-key") || file.startsWith("session-")) {
          backup[file] = fs.readFileSync(path.join(AUTH_DIR, file), "utf-8");
        }
      }

      if (!backup["creds.json"]) return;

      await supabase
        .from(BRIDGE_TABLE)
        .upsert({ id: 1, auth_backup: backup, updated_at: new Date().toISOString() }, { onConflict: "id" });
    } catch (_) {}
  }, 3000);
}

async function clearAuthSessionInSupabase() {
  if (!supabase) return;
  try {
    await supabase
      .from(BRIDGE_TABLE)
      .upsert({ id: 1, auth_backup: null, updated_at: new Date().toISOString() }, { onConflict: "id" });
  } catch (_) {}
}

async function syncBridgeStatusToSupabase() {
  if (!supabase) return;
  try {
    const bridgeStatus = {
      status: connectionStatus,
      connected: connectionStatus === "connected",
      qrDataUrl: currentQrDataUrl,
      user: connectedUser,
      heartbeat: Date.now()
    };

    await supabase
      .from(BRIDGE_TABLE)
      .upsert({ id: 1, bridge_status: bridgeStatus, updated_at: new Date().toISOString() }, { onConflict: "id" });
  } catch (_) {}
}

async function generatePairingCodeForPhone(rawPhone) {
  let digits = String(rawPhone || "").replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length === 10 || digits.length === 11) {
    digits = `55${digits}`;
  }

  if (!digits || digits.length < 12) {
    throw new Error("Informe o número do WhatsApp com DDD (ex: 82999999999).");
  }

  if (sock && connectionStatus !== "connected") {
    try {
      sock.ev.removeAllListeners();
      sock.ws?.close();
    } catch (_) {}
    sock = null;
  }

  try {
    fs.rmSync(AUTH_DIR, { recursive: true, force: true });
  } catch (_) {}
  await clearAuthSessionInSupabase();

  isReconnecting = false;
  await startWhatsApp(true);

  for (let i = 0; i < 25; i++) {
    if (sock && (connectionStatus === "qr" || sock.authState?.creds)) {
      break;
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  await new Promise((r) => setTimeout(r, 800));

  if (!sock) {
    throw new Error("Servidor ainda inicializando. Tente novamente em 3 segundos.");
  }

  const code = await sock.requestPairingCode(digits);
  const formattedCode = code?.length === 8 ? `${code.slice(0, 4)}-${code.slice(4)}` : code;
  console.log(`[WhatsApp MIB] Código de pareamento gerado para ${digits}: ${formattedCode}`);
  return { code: formattedCode, phone: digits };
}

function normalizeBrazilPhones(rawPhone) {
  let digits = String(rawPhone || "").replace(/\D/g, "").replace(/^0+/, "");
  if (!digits) return [];
  if (digits.length === 10 || digits.length === 11) {
    digits = "55" + digits;
  }

  const candidates = [digits];
  if (digits.startsWith("55") && digits.length === 13 && digits[4] === "9") {
    candidates.push(digits.slice(0, 4) + digits.slice(5));
  } else if (digits.startsWith("55") && digits.length === 12) {
    candidates.push(digits.slice(0, 4) + "9" + digits.slice(4));
  }
  return candidates;
}

async function resolveWhatsAppJid(rawPhone) {
  const candidates = normalizeBrazilPhones(rawPhone);
  if (!candidates.length) {
    throw new Error("Número de telefone inválido.");
  }

  for (const candidate of candidates) {
    try {
      const results = await sock.onWhatsApp(candidate);
      if (Array.isArray(results) && results.length > 0 && results[0].exists && results[0].jid) {
        return results[0].jid;
      }
    } catch (_) {}
  }

  return `${candidates[0]}@s.whatsapp.net`;
}

async function sendPdfDocumentToPhone({ phone, fileName, caption, pdfBase64, mimetype }) {
  if (connectionStatus !== "connected" || !sock) {
    throw new Error("O WhatsApp não está conectado. Vá em Configurações → WhatsApp Automático e conecte.");
  }
  if (!phone || !pdfBase64) {
    throw new Error("Telefone e arquivo PDF são obrigatórios.");
  }

  const jid = await resolveWhatsAppJid(phone);
  const cleanBase64 = String(pdfBase64).includes(",")
    ? String(pdfBase64).split(",")[1]
    : String(pdfBase64);
  const pdfBuffer = Buffer.from(cleanBase64, "base64");

  await sock.sendMessage(jid, {
    document: pdfBuffer,
    mimetype: mimetype || "application/pdf",
    fileName: fileName || "Recibo_MIB_Church.pdf",
    caption: caption || ""
  });

  console.log(`[WhatsApp MIB] Documento ${fileName || "PDF"} enviado com sucesso para ${jid}`);
  return { jid };
}

async function sendTextMessageToPhone({ phone, text }) {
  if (connectionStatus !== "connected" || !sock) {
    throw new Error("O WhatsApp não está conectado. Vá em Configurações → WhatsApp Automático e conecte.");
  }
  if (!phone || !text) {
    throw new Error("Telefone e mensagem são obrigatórios.");
  }

  const jid = await resolveWhatsAppJid(phone);
  await sock.sendMessage(jid, { text: String(text) });
  console.log(`[WhatsApp MIB] Mensagem de texto enviada com sucesso para ${jid}`);
  return { jid };
}

async function pollSupabaseBridgeCommands() {
  if (!supabase || isProcessingBridge) return;
  isProcessingBridge = true;

  try {
    const { data: row, error } = await supabase
      .from(BRIDGE_TABLE)
      .select("id, pending_cmd")
      .eq("id", 1)
      .maybeSingle();

    if (error || !row || !row.pending_cmd) return;
    const cmd = row.pending_cmd;

    if (!cmd || cmd.status !== "pending") return;

    if (cmd.createdAt && Date.now() - cmd.createdAt > 120000) {
      await supabase
        .from(BRIDGE_TABLE)
        .update({
          pending_cmd: { ...cmd, status: "error", error: "Tempo limite excedido." },
          updated_at: new Date().toISOString()
        })
        .eq("id", 1);
      return;
    }

    console.log(`[WhatsApp Bridge] Processando comando remoto: ${cmd.action}`);

    let updatedCmd;
    try {
      let resultData = {};
      if (cmd.action === "pair-code") {
        resultData = await generatePairingCodeForPhone(cmd.phone);
      } else if (cmd.action === "send-receipt" || cmd.action === "send-document") {
        resultData = await sendPdfDocumentToPhone({
          phone: cmd.phone,
          fileName: cmd.fileName,
          caption: cmd.caption,
          pdfBase64: cmd.pdfBase64,
          mimetype: cmd.mimetype
        });
      } else if (cmd.action === "send-message") {
        resultData = await sendTextMessageToPhone({
          phone: cmd.phone,
          text: cmd.text
        });
      } else if (cmd.action === "logout") {
        if (sock) await sock.logout().catch(() => {});
        fs.rmSync(AUTH_DIR, { recursive: true, force: true });
        await clearAuthSessionInSupabase();
        connectionStatus = "disconnected";
        connectedUser = null;
        currentQrDataUrl = "";
        setTimeout(() => startWhatsApp(), 1000);
        resultData = { message: "Desconectado" };
      }

      updatedCmd = {
        id: cmd.id,
        action: cmd.action,
        status: "done",
        result: resultData,
        finishedAt: Date.now()
      };
    } catch (cmdErr) {
      updatedCmd = {
        id: cmd.id,
        action: cmd.action,
        status: "error",
        error: cmdErr.message || "Erro ao processar comando no servidor WhatsApp",
        finishedAt: Date.now()
      };
    }

    const bridgeStatus = {
      status: connectionStatus,
      connected: connectionStatus === "connected",
      qrDataUrl: currentQrDataUrl,
      user: connectedUser,
      heartbeat: Date.now()
    };

    await supabase
      .from(BRIDGE_TABLE)
      .update({
        pending_cmd: updatedCmd,
        bridge_status: bridgeStatus,
        updated_at: new Date().toISOString()
      })
      .eq("id", 1);
  } catch (_) {
  } finally {
    isProcessingBridge = false;
  }
}

async function startWhatsApp(forceFresh = false) {
  if (isReconnecting && !forceFresh) return;
  isReconnecting = true;

  try {
    if (!forceFresh) {
      await restoreAuthSessionFromSupabase();
    }
    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    let version = [2, 3000, 1015901307];
    try {
      const latest = await fetchLatestBaileysVersion();
      if (latest?.version) version = latest.version;
    } catch (_) {}

    sock = makeWASocket({
      version,
      auth: state,
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      browser: Browsers.ubuntu("Chrome"),
      syncFullHistory: false,
      markOnlineOnConnect: false
    });

    sock.ev.on("creds.update", async () => {
      await saveCreds();
      scheduleAuthSessionBackupToSupabase();
    });

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        connectionStatus = "qr";
        try {
          currentQrDataUrl = await QRCode.toDataURL(qr, {
            margin: 2,
            width: 280,
            color: { dark: "#0f172a", light: "#ffffff" }
          });
          console.log("[WhatsApp MIB] Novo QR Code gerado. Escaneie em Configurações → WhatsApp Automático ou em http://localhost:" + PORT);
          syncBridgeStatusToSupabase();
        } catch (err) {
          console.error("[WhatsApp MIB] Erro ao gerar imagem do QR Code:", err);
        }
      }

      if (connection === "open") {
        connectionStatus = "connected";
        currentQrDataUrl = "";
        connectedUser = {
          id: sock.user?.id?.split(":")[0] || sock.user?.id || "",
          name: sock.user?.name || "WhatsApp MIB Church"
        };
        console.log(`[WhatsApp MIB] Conectado com sucesso como: ${connectedUser.name} (${connectedUser.id})`);
        syncBridgeStatusToSupabase();
        scheduleAuthSessionBackupToSupabase();
      }

      if (connection === "close") {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        console.log("[WhatsApp MIB] Conexão fechada. Status:", statusCode, "Reconectar:", shouldReconnect);

        connectionStatus = "disconnected";
        connectedUser = null;
        currentQrDataUrl = "";
        syncBridgeStatusToSupabase();

        if (!shouldReconnect) {
          try {
            fs.rmSync(AUTH_DIR, { recursive: true, force: true });
          } catch (_) {}
          await clearAuthSessionInSupabase();
        }

        setTimeout(() => {
          isReconnecting = false;
          startWhatsApp();
        }, 2500);
      }
    });
  } catch (err) {
    console.error("[WhatsApp MIB] Erro ao iniciar Baileys:", err);
    connectionStatus = "disconnected";
    setTimeout(() => {
      isReconnecting = false;
      startWhatsApp();
    }, 5000);
  } finally {
    isReconnecting = false;
  }
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, apikey");
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 35 * 1024 * 1024) {
        reject(new Error("Payload muito grande"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error("JSON inválido"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === "GET" && url.pathname === "/status") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        ok: true,
        status: connectionStatus,
        connected: connectionStatus === "connected",
        qrDataUrl: currentQrDataUrl,
        user: connectedUser
      })
    );
    return;
  }

  if (req.method === "POST" && url.pathname === "/pair-code") {
    try {
      const payload = await readJsonBody(req);
      const result = await generatePairingCodeForPhone(payload.phone);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, ...result }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: err.message || "Não foi possível gerar o código de pareamento." }));
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/logout") {
    try {
      if (sock) {
        await sock.logout().catch(() => {});
      }
      fs.rmSync(AUTH_DIR, { recursive: true, force: true });
      await clearAuthSessionInSupabase();
      connectionStatus = "disconnected";
      connectedUser = null;
      currentQrDataUrl = "";
      setTimeout(() => startWhatsApp(), 1000);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, message: "Sessão desconectada. Um novo QR Code será gerado." }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: err.message }));
    }
    return;
  }

  if (req.method === "POST" && (url.pathname === "/send-receipt" || url.pathname === "/send-document" || url.pathname === "/")) {
    try {
      const payload = await readJsonBody(req);
      const result = await sendPdfDocumentToPhone(payload);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, ...result }));
    } catch (err) {
      console.error("[WhatsApp MIB] Erro ao enviar documento:", err);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: err.message || "Falha ao enviar PDF no WhatsApp" }));
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/send-message") {
    try {
      const payload = await readJsonBody(req);
      const result = await sendTextMessageToPhone(payload);
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, ...result }));
    } catch (err) {
      console.error("[WhatsApp MIB] Erro ao enviar mensagem:", err);
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: err.message || "Falha ao enviar mensagem no WhatsApp" }));
    }
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="refresh" content="5">
        <title>Provedor WhatsApp — MIB Church</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0b1329; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
          .box { background: #17223b; border: 1px solid #2b3954; padding: 28px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: center; max-width: 390px; width: 100%; }
          h2 { margin: 0 0 6px; color: #ffffff; }
          .status { display: inline-block; padding: 6px 14px; border-radius: 999px; font-weight: 700; font-size: 0.85rem; margin: 12px 0; }
          .ok { background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4); }
          .wait { background: rgba(245,158,11,0.2); color: #fbbf24; border: 1px solid rgba(245,158,11,0.4); }
          img { background: #ffffff; border-radius: 14px; padding: 10px; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="box">
          <h2>Provedor WhatsApp</h2>
          <small style="color:#94a3b8;">MIB Church • Envios Automáticos</small><br>
          ${
            connectionStatus === "connected"
              ? `<div class="status ok">✅ Conectado (${connectedUser?.id || ""})</div><p style="font-size:0.9rem;color:#cbd5e1;">Pronto para enviar recibos em PDF e mensagens automaticamente!</p>`
              : currentQrDataUrl
                ? `<div class="status wait">📱 Escaneie o QR Code no WhatsApp</div><br><img src="${currentQrDataUrl}" width="240" height="240" alt="QR Code">`
                : `<div class="status wait">⏳ Gerando conexão... aguarde alguns segundos</div>`
          }
        </div>
      </body>
      </html>
    `);
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ ok: false, error: "Rota não encontrada" }));
});

const RENDER_URL = process.env.RENDER_EXTERNAL_URL || "";

server.listen(PORT, "0.0.0.0", () => {
  console.log(`====================================================`);
  console.log(`[WhatsApp MIB] Servidor Próprio rodando na porta ${PORT}`);
  console.log(`[WhatsApp MIB] Ponte Supabase: ${supabase ? "ATIVA" : "INATIVA (configure VITE_SUPABASE_URL/KEY)"}`);
  console.log(`====================================================`);
  startWhatsApp();
  if (supabase) {
    setInterval(pollSupabaseBridgeCommands, 1500);
    setInterval(syncBridgeStatusToSupabase, 12000);
  }
  if (RENDER_URL) {
    setInterval(() => {
      fetch(`${RENDER_URL}/status`).catch(() => {});
    }, 10 * 60 * 1000);
  }
});
