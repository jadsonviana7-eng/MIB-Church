import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';
import { toPng } from 'html-to-image';

// ─── CONFIGURAÇÃO DE MINISTÉRIOS ────────────────────────────────────────────
// Cada ministério tem: cargos, diasSemana, cores e ícone SVG.
// Para ícones personalizados externos, defina iconUrl com a URL da imagem.
const CONFIG_ESCALAS_DEFAULT = {
  "Cultos": {
    cargos: ["Direção", "Pregação"],
    diasSemana: [0, 4],
    cor: { bg: "#1e3a8a", accent: "#3b82f6", light: "#eff6ff", text: "#1e3a8a", chipBg: "bg-blue-50", chipText: "text-blue-700", chipBorder: "border-blue-100" },
    iconUrl: null,
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  },
  "Intercessão": {
    cargos: ["Porta", "Altar", "Sala Kids"],
    diasSemana: [0, 4],
    cor: { bg: "#4c1d95", accent: "#8b5cf6", light: "#f5f3ff", text: "#4c1d95", chipBg: "bg-violet-50", chipText: "text-violet-700", chipBorder: "border-violet-100" },
    iconUrl: null,
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
    opcoesUniforme: ["Fardamento (1)", "Fardamento (2)", "Fardamento (3)", "Camisa Preta", "Camisa Branca"],
  },
  "Projeção": {
    cargos: ["Operador"],
    diasSemana: [0, 4],
    cor: { bg: "#92400e", accent: "#f59e0b", light: "#fffbeb", text: "#92400e", chipBg: "bg-amber-50", chipText: "text-amber-700", chipBorder: "border-amber-100" },
    iconUrl: null,
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  },
  "Introdução": {
    cargos: ["Recepção 1", "Recepção 2"],
    diasSemana: [0, 4],
    cor: { bg: "#9f1239", accent: "#f43f5e", light: "#fff1f2", text: "#9f1239", chipBg: "bg-rose-50", chipText: "text-rose-700", chipBorder: "border-rose-100" },
    iconUrl: null,
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
  "Manutenção": {
    cargos: ["Líder", "Auxiliar 1", "Auxiliar 2", "Auxiliar 3"],
    diasSemana: [0, 4],
    cor: { bg: "#064e3b", accent: "#10b981", light: "#ecfdf5", text: "#064e3b", chipBg: "bg-emerald-50", chipText: "text-emerald-700", chipBorder: "border-emerald-100" },
    iconUrl: null,
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  }
};

const DIAS_SEMANA_NOMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DIAS_SEMANA_FULL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// ─── PALETAS DO PNG POR MINISTÉRIO ──────────────────────────────────────────
const PALETAS_MINISTERIO = {
  "Cultos":     { bgA: "#0f172a", bgB: "#1e3a8a", bgC: "#2563eb", panel: "#e0f2fe", ink: "#0f172a", accent: "#1d4ed8", pillA: "#0f172a", pillB: "#1e3a8a" },
  "Intercessão":{ bgA: "#1e1b4b", bgB: "#4c1d95", bgC: "#7c3aed", panel: "#ede9fe", ink: "#1e1b4b", accent: "#6d28d9", pillA: "#1e1b4b", pillB: "#4c1d95" },
  "Projeção":   { bgA: "#451a03", bgB: "#92400e", bgC: "#b45309", panel: "#fef3c7", ink: "#451a03", accent: "#d97706", pillA: "#451a03", pillB: "#92400e" },
  "Introdução": { bgA: "#4c0519", bgB: "#9f1239", bgC: "#e11d48", panel: "#ffe4e6", ink: "#4c0519", accent: "#be123c", pillA: "#4c0519", pillB: "#9f1239" },
  "Manutenção": { bgA: "#022c22", bgB: "#064e3b", bgC: "#065f46", panel: "#d1fae5", ink: "#022c22", accent: "#059669", pillA: "#022c22", pillB: "#064e3b" },
};

// ─── ESTILOS DE EXPORTAÇÃO PNG ───────────────────────────────────────────────
const exportStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .export-page { width: 1080px; height: 1920px; padding: 48px; font-family: 'Montserrat', sans-serif; display: flex; flex-direction: column; gap: 24px; position: relative; overflow: hidden; }
  
  /* Glowing background blobs */
  .export-glow-top { position: absolute; top: -150px; right: -150px; width: 600px; height: 600px; border-radius: 50%; filter: blur(160px); opacity: 0.25; pointer-events: none; z-index: 0; }
  .export-glow-bottom { position: absolute; bottom: -150px; left: -150px; width: 650px; height: 650px; border-radius: 50%; filter: blur(180px); opacity: 0.25; pointer-events: none; z-index: 0; }
  
  .export-header { border-radius: 40px; padding: 48px 48px 42px; display: flex; flex-direction: column; align-items: flex-start; gap: 20px; overflow: hidden; position: relative; border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15); z-index: 2; }
  .export-header-badge { font-size: 16px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; padding: 10px 24px; border-radius: 999px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
  .export-header-icon { width: 28px; height: 28px; display: inline-block; vertical-align: middle; }
  .export-title-row { display: flex; flex-direction: column; gap: 4px; width: 100%; }
  .export-kicker { font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3em; opacity: 0.8; }
  .export-title { font-size: 104px; font-weight: 900; line-height: 0.85; letter-spacing: -3px; text-transform: uppercase; margin-top: 6px; }
  .export-year { font-size: 28px; font-weight: 900; letter-spacing: 0.1em; }

  .export-stats { display: flex; gap: 16px; width: 100%; margin-top: 8px; }
  .export-stat-card { flex: 1; padding: 20px 24px; border-radius: 24px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 6px; border: 1px solid rgba(255, 255, 255, 0.1); }
  .export-stat-label { font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; }
  .export-stat-value { font-size: 46px; font-weight: 900; line-height: 1; }

  .export-list { flex: 1; border-radius: 40px; padding: 32px 20px; display: flex; flex-direction: column; gap: 16px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15); z-index: 2; }
  .export-list-title { font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em; opacity: 0.55; padding: 0 12px 12px; border-bottom: 2px solid rgba(255, 255, 255, 0.1); margin-bottom: 8px; text-align: center; }
  .export-list-grid { display: flex; flex-direction: column; gap: 20px; width: 100%; }
  
  .export-table { width: 100%; border-collapse: collapse; margin-top: 12px; z-index: 2; position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12); }
  .export-th { font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255, 255, 255, 0.9); padding: 22px 20px; background: rgba(15, 23, 42, 0.55); border-bottom: 2px solid rgba(255, 255, 255, 0.1); text-align: center; }
  .export-tr { border-bottom: 1px solid rgba(0, 0, 0, 0.05); background: rgba(255, 255, 255, 0.96); }
  .export-tr-alt { border-bottom: 1px solid rgba(0, 0, 0, 0.05); background: rgba(248, 250, 252, 0.96); }
  .export-tr:last-child, .export-tr-alt:last-child { border-bottom: none; }
  .export-td { padding: 22px 20px; font-size: 24px; font-weight: 800; color: #0f172a; vertical-align: middle; text-align: center; }
  .export-td-date { width: 90px; text-align: center; }
  .export-date-cell { display: block; text-align: center; line-height: 1; }
  .export-date-cell-day { font-size: 13px; font-weight: 900; opacity: 0.6; text-transform: uppercase; color: #475569; display: block; text-align: center; margin-bottom: 2px; }
  .export-date-cell-num { font-size: 38px; font-weight: 900; line-height: 1; display: block; text-align: center; }
  .export-name-empty { opacity: 0.35; font-weight: 500; color: #94a3b8; letter-spacing: 1px; }
  .export-td-uniform { font-style: italic; font-weight: 700; }

  .export-footer { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 0 12px; flex-shrink: 0; gap: 10px; z-index: 2; }
  .export-footer-logo { height: 90px; object-fit: contain; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15)); }
  .export-footer-tagline { font-size: 16px; font-weight: 900; letter-spacing: 0.25em; text-transform: uppercase; opacity: 0.6; color: #fff; margin-top: 4px; }
`;

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────────────
export default function EscalasMinisterial() {
  // Permite que o usuário adicione escalas personalizadas em runtime
  const [configEscalas, setConfigEscalas] = useState(() => {
    try {
      const salvo = localStorage.getItem('configEscalasCustom');
      if (salvo) return { ...CONFIG_ESCALAS_DEFAULT, ...JSON.parse(salvo) };
    } catch {}
    return CONFIG_ESCALAS_DEFAULT;
  });

  const [tipo, setTipo] = useState(Object.keys(configEscalas)[0]);
  const [mes, setMes] = useState(new Date().getMonth());
  const [ano, setAno] = useState(new Date().getFullYear());
  const [membrosSistema, setMembrosSistema] = useState([]);
  const [equipe, setEquipe] = useState([]);
  const [dadosEscala, setDadosEscala] = useState({});
  const [uniformes, setUniformes] = useState({});
  const [opcoesUniformeInput, setOpcoesUniformeInput] = useState("");
  const [status, setStatus] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarPreview, setMostrarPreview] = useState(false);

  // Modal de configurações mobile (bottom sheet)
  const [isModalConfigAberto, setIsModalConfigAberto] = useState(false);

  // Edição inline de cores da escala atual
  const [editCores, setEditCores] = useState({ corBg: '', corAccent: '' });

  const intercessaoKey = useMemo(() => {
    return Object.keys(configEscalas).find(k => k.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === 'intercessao') || 'Intercessão';
  }, [configEscalas]);

  const isIntercessao = useMemo(() => {
    return tipo && tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === 'intercessao';
  }, [tipo]);

  // Sincroniza uniformes com localStorage
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(`escalas_uniformes_${tipo}_${ano}_${mes}`);
      setUniformes(salvo ? JSON.parse(salvo) : {});
    } catch (_) {
      setUniformes({});
    }
  }, [tipo, mes, ano]);

  const handleSalvarUniforme = (cultoId, valor) => {
    const novos = { ...uniformes, [cultoId]: valor };
    setUniformes(novos);
    try {
      localStorage.setItem(`escalas_uniformes_${tipo}_${ano}_${mes}`, JSON.stringify(novos));
    } catch (_) {}
  };

  // Sincroniza input de opções de uniforme
  useEffect(() => {
    if (isIntercessao) {
      const opts = configEscalas[intercessaoKey]?.opcoesUniforme || [];
      setOpcoesUniformeInput(Array.isArray(opts) ? opts.join(', ') : opts);
    } else {
      setOpcoesUniformeInput("");
    }
  }, [isIntercessao, configEscalas, intercessaoKey]);

  // Sincroniza editCores sempre que o tipo muda
  useEffect(() => {
    const c = configEscalas[tipo]?.cor;
    if (c) setEditCores({ corBg: c.bg, corAccent: c.accent });
  }, [tipo, configEscalas]);

  // Modal: Vincular membros
  const [isModalEquipeAberto, setIsModalEquipeAberto] = useState(false);
  const [buscaModal, setBuscaModal] = useState("");
  const [selecionadosModal, setSelecionadosModal] = useState([]);

  // Modal: Criar nova escala
  const [isModalNovaEscala, setIsModalNovaEscala] = useState(false);
  const [novaEscala, setNovaEscala] = useState({
    nome: "",
    cargos: [""],
    diasSemana: [0, 4],
    corBg: "#1e3a8a",
    corAccent: "#3b82f6",
    iconUrl: "",
  });
  const [erroCriar, setErroCriar] = useState("");

  // Paleta dinâmica baseada no ministério atual
  const corAtual = configEscalas[tipo]?.cor || CONFIG_ESCALAS_DEFAULT["Cultos"].cor;
  const paleta = PALETAS_MINISTERIO[tipo] || PALETAS_MINISTERIO["Cultos"];



  // ── Membros disponíveis para o modal ────────────────────────────────────
  const membrosDisponiveis = useMemo(() => {
    const idsNaEquipe = new Set(equipe.map(p => p.id));
    return membrosSistema
      .filter(p => !idsNaEquipe.has(p.id))
      .filter(p => p.nome.toLowerCase().includes(buscaModal.toLowerCase()));
  }, [membrosSistema, equipe, buscaModal]);

  // ── Carregar membros do sistema ──────────────────────────────────────────
  useEffect(() => {
    async function carregarMembros() {
      const { data } = await supabase.from('pessoas').select('id, nome').order('nome');
      if (data) setMembrosSistema(data);
    }
    carregarMembros();
  }, []);

  // ── Carregar equipe do tipo atual ────────────────────────────────────────
  const carregarEquipe = useCallback(async () => {
    const { data } = await supabase
      .from('equipes_escala')
      .select('pessoas:pessoa_id(id, nome, foto_url)')
      .eq('tipo_escala', tipo);
    setEquipe(data?.map(item => item.pessoas).filter(Boolean) || []);
  }, [tipo]);

  // ── Carregar atribuições ─────────────────────────────────────────────────
  const carregarAtribuicoes = useCallback(async () => {
    const m = Number(mes), a = Number(ano);
    setCarregando(true);
    const dataInicio = `${a}-${String(m + 1).padStart(2, '0')}-01`;
    const ultimoDia = new Date(a, m + 1, 0).getDate();
    const dataFim = `${a}-${String(m + 1).padStart(2, '0')}-${String(ultimoDia).padStart(2, '0')}`;

    const { data, error } = await supabase
      .from('escalas_atribuicoes')
      .select('data, cargo_index, pessoa_id')
      .eq('tipo_escala', tipo)
      .gte('data', dataInicio)
      .lte('data', dataFim);

    if (!error) {
      const mapa = {};
      data?.forEach(attr => {
        const dia = attr.data.split('-')[2];
        const idChave = `${tipo}-${a}-${m}-${parseInt(dia)}`;
        if (!mapa[idChave]) mapa[idChave] = {};
        mapa[idChave][attr.cargo_index] = attr.pessoa_id;
      });
      setDadosEscala(mapa);
    }
    setCarregando(false);
  }, [tipo, mes, ano]);

  useEffect(() => {
    carregarEquipe();
    carregarAtribuicoes();
  }, [carregarEquipe, carregarAtribuicoes]);

  // ── Dias da escala ───────────────────────────────────────────────────────
  const diasEscala = useMemo(() => {
    const m = Number(mes), a = Number(ano);
    const totalDias = new Date(a, m + 1, 0).getDate();
    const configAtual = configEscalas[tipo] || { diasSemana: [0, 4] };
    const lista = [];
    for (let d = 1; d <= totalDias; d++) {
      const data = new Date(a, m, d);
      const sem = data.getDay();
      if (configAtual.diasSemana.includes(sem)) {
        lista.push({ id: `${tipo}-${a}-${m}-${d}`, dia: String(d).padStart(2, "0"), tipoDia: DIAS_SEMANA_FULL[sem], semana: sem });
      }
    }
    return lista;
  }, [tipo, mes, ano, configEscalas]);

  // ── Salvar atribuição individual ─────────────────────────────────────────
  const handleSalvarAtribuicao = async (culto, campoIndex, pessoaId) => {
    const m = Number(mes), a = Number(ano);
    const dataISO = `${a}-${String(m + 1).padStart(2, '0')}-${String(culto.dia).padStart(2, '0')}`;
    const { error } = await supabase.from('escalas_atribuicoes').upsert(
      { data: dataISO, tipo_escala: tipo, cargo_index: campoIndex, pessoa_id: pessoaId || null },
      { onConflict: 'data,tipo_escala,cargo_index' }
    );
    if (!error) {
      setDadosEscala(prev => ({ ...prev, [culto.id]: { ...(prev[culto.id] || {}), [campoIndex]: pessoaId } }));
      setStatus("✓ Atualizado");
      setTimeout(() => setStatus(""), 1500);
    } else alert('Erro ao salvar: ' + error.message);
  };

  // ── Salvar escala geral ──────────────────────────────────────────────────
  const handleSalvarEscalaGeral = async () => {
    setCarregando(true);
    setStatus("Salvando...");
    try {
      const m = Number(mes), a = Number(ano);
      const registros = [];
      diasEscala.forEach(culto => {
        const atribuicoes = dadosEscala[culto.id];
        if (!atribuicoes) return;
        (configEscalas[tipo]?.cargos || []).forEach((_, idx) => {
          const pId = atribuicoes[idx];
          if (pId) registros.push({ data: `${a}-${String(m + 1).padStart(2, '0')}-${String(culto.dia).padStart(2, '0')}`, tipo_escala: tipo, cargo_index: parseInt(idx), pessoa_id: pId });
        });
      });
      const { error } = await supabase.from('escalas_atribuicoes').upsert(registros, { onConflict: 'data,tipo_escala,cargo_index' });
      if (error) throw error;
      setStatus("✓ Escala salva!");
    } catch (err) { alert("Erro: " + err.message); }
    finally { setCarregando(false); setTimeout(() => setStatus(""), 3000); }
  };

  // ── Exportar PNG ─────────────────────────────────────────────────────────
  const handleExportarPNG = async (isDownloadOnly = false) => {
    setStatus("Gerando imagem...");
    setCarregando(true);
    const container = document.createElement('div');
    try {
      const p = paleta;
      container.style.cssText = 'position:fixed;left:-9999px;top:0;width:1080px;';
      document.body.appendChild(container);

      const totalCultos = diasEscala.length;
      const domsCount  = diasEscala.filter(d => d.semana === 0).length;
      const quiCount   = diasEscala.filter(d => d.semana === 4).length;
      const outrosCount = totalCultos - domsCount - quiCount;
      const cargos = configEscalas[tipo]?.cargos || [];

      // ── helpers de estilo inline ──────────────────────────────────────
      const S = {
        page:      `box-sizing:border-box;width:1080px;min-height:1920px;height:auto;padding:48px;font-family:'Montserrat',Arial,sans-serif;display:flex;flex-direction:column;gap:24px;background:linear-gradient(150deg,${p.bgA} 0%,${p.bgB} 55%,${p.bgC} 100%);position:relative;overflow:hidden;`,
        header:    `box-sizing:border-box;border-radius:40px;padding:48px 48px 42px;display:flex;flex-direction:column;align-items:flex-start;gap:20px;overflow:hidden;position:relative;border:1px solid rgba(255,255,255,0.15);box-shadow:0 20px 50px rgba(0,0,0,0.15);z-index:2;`,
        badge:     `box-sizing:border-box;font-size:16px;font-weight:900;text-transform:uppercase;letter-spacing:0.2em;padding:10px 24px;border-radius:999px;display:inline-flex;align-items:center;gap:8px;background:${p.accent};color:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.1);`,
        titleRow:  `box-sizing:border-box;display:flex;flex-direction:column;gap:4px;width:100%;`,
        kicker:    `box-sizing:border-box;font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;opacity:0.8;color:rgba(255,255,255,0.6);`,
        title:     `box-sizing:border-box;font-size:104px;font-weight:900;line-height:0.85;letter-spacing:-3px;text-transform:uppercase;margin-top:6px;color:#ffffff;text-shadow:0 4px 16px rgba(0,0,0,0.15);`,
        stats:     `box-sizing:border-box;display:flex;gap:16px;width:100%;margin-top:8px;`,
        statCard:  `box-sizing:border-box;flex:1;padding:20px 24px;border-radius:24px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:6px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;`,
        statLabel: `box-sizing:border-box;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;opacity:0.6;color:rgba(255,255,255,0.6);`,
        statValue: `box-sizing:border-box;font-size:46px;font-weight:900;line-height:1;color:#ffffff;`,
        list:      `box-sizing:border-box;border-radius:40px;padding:32px 20px;display:flex;flex-direction:column;gap:16px;border:1px solid rgba(255,255,255,0.15);box-shadow:0 20px 50px rgba(0,0,0,0.15);z-index:2;background:linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.03) 100%);`,
        listTitle: `box-sizing:border-box;font-size:18px;font-weight:900;text-transform:uppercase;letter-spacing:0.25em;opacity:0.55;padding:0 12px 12px;border-bottom:2px solid rgba(255,255,255,0.1);margin-bottom:8px;text-align:center;color:rgba(255,255,255,0.7);`,
        table:     `box-sizing:border-box;width:100%;border-collapse:collapse;margin-top:12px;border-radius:24px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.12);`,
        th:        `box-sizing:border-box;font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.9);padding:22px 20px;background:rgba(15,23,42,0.55);border-bottom:2px solid rgba(255,255,255,0.1);text-align:center;`,
        tr:        `box-sizing:border-box;border-bottom:1px solid rgba(0,0,0,0.05);background:rgba(255,255,255,0.96);`,
        trAlt:     `box-sizing:border-box;border-bottom:1px solid rgba(0,0,0,0.05);background:rgba(248,250,252,0.96);`,
        td:        `box-sizing:border-box;padding:22px 20px;font-size:24px;font-weight:800;color:#0f172a;vertical-align:middle;text-align:center;`,
        tdDate:    `box-sizing:border-box;width:90px;text-align:center;`,
        dateCell:  `box-sizing:border-box;display:block;text-align:center;line-height:1;`,
        dateCellDay:`box-sizing:border-box;font-size:13px;font-weight:900;opacity:0.6;text-transform:uppercase;color:#475569;line-height:1;display:block;text-align:center;margin-bottom:2px;`,
        dateCellNum:`box-sizing:border-box;font-size:38px;font-weight:900;color:${p.accent};line-height:1;display:block;text-align:center;`,
        nameEmpty: `box-sizing:border-box;opacity:0.35;font-weight:500;color:#94a3b8;`,
        tdUniform: `box-sizing:border-box;font-style:italic;font-weight:700;color:${p.accent};font-size:22px;`,
        footer:    `box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 0 12px;flex-shrink:0;gap:10px;z-index:2;`,
        footerImg: `height:90px;object-fit:contain;filter:drop-shadow(0 8px 16px rgba(0,0,0,0.15));`,
      };

      // ── stats HTML ────────────────────────────────────────────────────
      const statsHTML = [
        { label: 'Cultos', val: totalCultos },
        domsCount  > 0 ? { label: 'Domingos', val: domsCount  } : null,
        quiCount   > 0 ? { label: 'Quintas',  val: quiCount   } : null,
        outrosCount > 0 ? { label: 'Outros',  val: outrosCount } : null,
      ].filter(Boolean).map(s =>
        `<div style="${S.statCard}"><div style="${S.statLabel}">${s.label}</div><div style="${S.statValue}">${s.val}</div></div>`
      ).join('');

      // ── icon HTML ─────────────────────────────────────────────────────
      const iconHtml = configEscalas[tipo]?.iconUrl
        ? `<img src="${configEscalas[tipo].iconUrl}" style="width:26px;height:26px;object-fit:contain;" />`
        : configEscalas[tipo]?.iconSvg
          ? `<span style="width:24px;height:24px;display:inline-block;">${configEscalas[tipo].iconSvg}</span>`
          : '';

      // Otimização de fontes baseada no número de colunas da tabela
      const numColunas = cargos.length + (isIntercessao ? 1 : 0);
      const fontSizeNomes = numColunas >= 4 ? '18px' : numColunas === 3 ? '20px' : '22px';

      // ── cabeçalho da tabela ───────────────────────────────────────────
      const thsHTML = cargos.map(cargo => `<th style="${S.th}" align="center">${cargo}</th>`).join('');
      const thUniformHTML = isIntercessao ? `<th style="${S.th}" align="center">Uniforme</th>` : '';
      const headerRowHTML = `<tr>
        <th style="${S.th};width:90px;text-align:center;" align="center">Data</th>
        ${thsHTML}
        ${thUniformHTML}
      </tr>`;

      // ── linhas da tabela ──────────────────────────────────────────────
      const rowsHTML = diasEscala.map((culto, rowIndex) => {
        const atribuicoes = dadosEscala[culto.id] || {};
        const isAlt = rowIndex % 2 === 1;
        const rowStyle = isAlt ? S.trAlt : S.tr;

        const tdsHTML = cargos.map((cargo, idx) => {
          const pId = atribuicoes[idx];
          const pessoa = equipe.find(pp => pp.id === pId);
          const partes = pessoa ? pessoa.nome.trim().split(' ') : [];
          const nomeCurto = partes.length > 1
            ? `${partes[0]} ${partes[partes.length - 1]}`
            : (partes[0] || '');

          return `<td style="${S.td};font-size:${fontSizeNomes};" align="center">
            ${nomeCurto
              ? `<span>${nomeCurto}</span>`
              : `<span style="${S.nameEmpty}">— —</span>`}
          </td>`;
        }).join('');

        const tdUniformHTML = isIntercessao
          ? `<td style="${S.td};${S.tdUniform};font-size:${fontSizeNomes};" align="center">
              ${uniformes[culto.id]
                ? `<span>${uniformes[culto.id]}</span>`
                : `<span style="${S.nameEmpty}">— —</span>`}
             </td>`
          : '';

        const diaSemanaStr = culto.tipoDia.slice(0, 3).toUpperCase();
        const badgeBg = diaSemanaStr === 'DOM' ? '#ef4444' : diaSemanaStr === 'QUI' ? '#facc15' : 'transparent';
        const badgeColor = diaSemanaStr === 'DOM' ? '#ffffff' : diaSemanaStr === 'QUI' ? '#0f172a' : '#475569';
        const extraSpanStyle = diaSemanaStr === 'DOM' || diaSemanaStr === 'QUI'
          ? `background-color:${badgeBg};color:${badgeColor};padding:2px 8px;border-radius:6px;font-size:11px;font-weight:900;display:inline-block;margin-bottom:2px;opacity:1;`
          : '';

        return `<tr style="${rowStyle}">
          <td style="${S.td};${S.tdDate}" align="center">
            <div style="${S.dateCell}">
              <span style="${S.dateCellDay};${extraSpanStyle}">${diaSemanaStr}</span>
              <span style="${S.dateCellNum}">${culto.dia}</span>
            </div>
          </td>
          ${tdsHTML}
          ${tdUniformHTML}
        </tr>`;
      }).join('');

      // ── monta o HTML final ────────────────────────────────────────────
      container.innerHTML = `<div style="${S.page}">
        <div style="position:absolute;top:-150px;right:-150px;width:600px;height:600px;border-radius:50%;filter:blur(160px);opacity:0.25;background:${p.accent};z-index:0;pointer-events:none;"></div>
        <div style="position:absolute;bottom:-150px;left:-150px;width:650px;height:650px;border-radius:50%;filter:blur(180px);opacity:0.25;background:${p.accent};z-index:0;pointer-events:none;"></div>
        
        <div style="${S.header}">
          <div style="${S.badge}">${iconHtml} Ministério de ${tipo}</div>
          <div style="${S.titleRow}">
            <div style="${S.kicker}">${ano}</div>
            <div style="${S.title}">${MESES[mes].toUpperCase()}</div>
          </div>
          <div style="${S.stats}">${statsHTML}</div>
        </div>
        <div style="${S.list}">
          <div style="${S.listTitle}">Escala do mês — ${tipo}</div>
          <table style="${S.table}">
            <thead>${headerRowHTML}</thead>
            <tbody>${rowsHTML}</tbody>
          </table>
        </div>
        <div style="${S.footer}">
          <img src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/logo_betesda_branca.png" style="${S.footerImg}" crossorigin="anonymous" />
          <div style="font-size:16px;font-weight:900;letter-spacing:0.25em;text-transform:uppercase;opacity:0.6;color:#fff;margin-top:4px;">MIB CHURCH · DEPARTAMENTO DE COMUNICAÇÃO</div>
        </div>
      </div>`;

      const content = container.firstElementChild;
      
      // Delay de 250ms para garantir que a renderização no DOM e o recuo do navegador estejam concluídos
      await new Promise(resolve => setTimeout(resolve, 250));
      
      const computedHeight = content.scrollHeight;
      const imgData = await toPng(content, {
        width: 1080,
        height: computedHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: '1080px',
          height: `${computedHeight}px`
        },
        useCORS: true,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `Escala_${tipo}_${MESES[mes]}_${ano}.png`;
      link.href = imgData;

      if (navigator.share && !isDownloadOnly) {
        const blob = await (await fetch(imgData)).blob();
        const file = new File([blob], link.download, { type: 'image/png' });
        await navigator.share({ files: [file], title: `Escala ${tipo}` }).catch(() => link.click());
      } else {
        link.click();
      }
      setStatus("✓ Imagem gerada!");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao gerar imagem");
    } finally {
      if (document.body.contains(container)) document.body.removeChild(container);
      setCarregando(false);
    }
  };

  // ── Vincular membros à equipe ────────────────────────────────────────────
  const handleSalvarEquipeModal = async (e) => {
    e.preventDefault();
    if (!selecionadosModal.length) return;
    setCarregando(true);
    const { error } = await supabase.from('equipes_escala').insert(selecionadosModal.map(id => ({ tipo_escala: tipo, pessoa_id: id })));
    if (error) setStatus(error.code === '23505' ? "Alguns já estavam na lista" : "Erro ao vincular");
    else { await carregarEquipe(); setStatus("✓ Equipe atualizada"); }
    setIsModalEquipeAberto(false); setSelecionadosModal([]); setBuscaModal("");
    setCarregando(false);
  };

  const removerMembroEquipe = async (pessoaId) => {
    if (!(await window.confirmModal("Remover Membro", "Remover este membro?"))) return;
    const { error } = await supabase.from('equipes_escala').delete().eq('tipo_escala', tipo).eq('pessoa_id', pessoaId);
    if (!error) { await carregarEquipe(); setStatus("Membro removido"); setTimeout(() => setStatus(""), 1500); }
  };

  // ── Criar nova escala ────────────────────────────────────────────────────
  const handleCriarEscala = () => {
    const nome = novaEscala.nome.trim();
    if (!nome) { setErroCriar("Informe o nome do ministério."); return; }
    if (configEscalas[nome]) { setErroCriar("Já existe uma escala com este nome."); return; }
    const cargosLimpos = novaEscala.cargos.map(c => c.trim()).filter(Boolean);
    if (!cargosLimpos.length) { setErroCriar("Informe ao menos um cargo."); return; }
    if (!novaEscala.diasSemana.length) { setErroCriar("Selecione ao menos um dia."); return; }

    const nova = {
      cargos: cargosLimpos,
      diasSemana: novaEscala.diasSemana,
      cor: {
        bg: novaEscala.corBg, accent: novaEscala.corAccent,
        light: novaEscala.corBg + "11", text: novaEscala.corBg,
        chipBg: "bg-slate-50", chipText: "text-slate-700", chipBorder: "border-slate-100"
      },
      iconUrl: novaEscala.iconUrl || null,
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    };

    const novaConfig = { ...configEscalas, [nome]: nova };
    setConfigEscalas(novaConfig);
    // Persiste as novas escalas (somente as personalizadas) no localStorage
    const custom = Object.fromEntries(
      Object.entries(novaConfig).filter(([k]) => !CONFIG_ESCALAS_DEFAULT[k])
    );
    try { localStorage.setItem('configEscalasCustom', JSON.stringify(custom)); } catch {}

    // Adiciona paleta de exportação genérica para o novo ministério
    PALETAS_MINISTERIO[nome] = {
      bgA: novaEscala.corBg, bgB: novaEscala.corBg + "cc", bgC: novaEscala.corAccent,
      panel: "#f8fafc", ink: "#0f172a", accent: novaEscala.corAccent, pillA: novaEscala.corBg, pillB: novaEscala.corAccent
    };

    setTipo(nome);
    setIsModalNovaEscala(false);
    setNovaEscala({ nome: "", cargos: [""], diasSemana: [0, 4], corBg: "#1e3a8a", corAccent: "#3b82f6", iconUrl: "" });
    setErroCriar("");
    setStatus(`✓ Escala "${nome}" criada!`);
  };

  // ── Editar cores da escala atual ─────────────────────────────────────────
  const handleSalvarCores = () => {
    const novaConfig = {
      ...configEscalas,
      [tipo]: {
        ...configEscalas[tipo],
        cor: {
          ...configEscalas[tipo].cor,
          bg: editCores.corBg,
          accent: editCores.corAccent,
          light: editCores.corBg + '15',
          text: editCores.corBg,
        },
        ...(isIntercessao ? {
          opcoesUniforme: opcoesUniformeInput.split(',').map(s => s.trim()).filter(Boolean)
        } : {})
      }
    };
    setConfigEscalas(novaConfig);
    // Persiste se for escala customizada ou se for a de Intercessão customizada
    const custom = Object.fromEntries(
      Object.entries(novaConfig).filter(([k]) => !CONFIG_ESCALAS_DEFAULT[k] || k.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === 'intercessao')
    );
    if (Object.keys(custom).length) {
      try { localStorage.setItem('configEscalasCustom', JSON.stringify(custom)); } catch {}
    }
    // Atualiza paleta de exportação
    PALETAS_MINISTERIO[tipo] = {
      ...PALETAS_MINISTERIO[tipo],
      bgA: editCores.corBg,
      bgB: editCores.corBg + 'cc',
      bgC: editCores.corAccent,
      accent: editCores.corAccent,
      pillA: editCores.corBg,
      pillB: editCores.corAccent,
    };
    setStatus('✓ Cores atualizadas!');
    setTimeout(() => setStatus(''), 2000);
  };

  // ─── RENDER ──────────────────────────────────────────────────────────────
  const config = configEscalas[tipo];
  const cor = config?.cor || CONFIG_ESCALAS_DEFAULT["Cultos"].cor;

  return (
    <div className="space-y-6 pb-36 lg:pb-6 w-full">

      {/* ── CABEÇALHO DINÂMICO ───────────────────────────────────────────── */}
      <div
        className="rounded-2xl px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 shadow-lg"
        style={{ background: `linear-gradient(135deg, ${cor.bg}, ${cor.accent})` }}
      >
        {config?.iconUrl ? (
          <img src={config.iconUrl} alt={tipo} className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-xl bg-white/10 p-2 flex-shrink-0" />
        ) : config?.iconSvg ? (
          <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center p-2.5 text-white flex-shrink-0"
            dangerouslySetInnerHTML={{ __html: config.iconSvg }} />
        ) : null}

        <div className="flex-1 min-w-0">
          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Ministério</p>
          <h1 className="text-white text-xl sm:text-2xl font-black tracking-tight leading-none">{tipo}</h1>
        </div>

        <span className="text-white/40 text-xs font-bold uppercase hidden sm:block">{MESES[mes]} · {ano}</span>

        {/* Ícones de ação — visíveis apenas em mobile (lg:hidden) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setIsModalEquipeAberto(true)}
            title="Gerenciar Equipe"
            className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsModalConfigAberto(true)}
            title="Configurações"
            className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── SELETOR DE MINISTÉRIO — apenas mobile (select nativo, sem scroll) ── */}
      <div className="lg:hidden">
        <select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold bg-white outline-none cursor-pointer shadow-sm"
          style={{ color: cor.bg }}
        >
          {Object.keys(configEscalas).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-start w-full">

        {/* ── PAINEL ESQUERDO — oculto em mobile ───────────────────────── */}
        <aside className="hidden lg:flex w-full lg:w-[300px] shrink-0 flex-col gap-4 lg:sticky lg:top-24">

          {/* Seletor de escala + mês/ano */}
          <Card className="p-0 overflow-hidden shadow-md">
            <CardHeader titulo="Configurações" />
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Tipo de Escala</label>
                <select
                  value={tipo}
                  onChange={e => setTipo(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white outline-none font-bold cursor-pointer shadow-sm"
                  style={{ color: cor.bg }}
                >
                  {Object.keys(configEscalas).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Mês</label>
                  <select value={mes} onChange={e => setMes(parseInt(e.target.value))} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white outline-none cursor-pointer text-slate-600 font-medium">
                    {MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Ano</label>
                  <select value={ano} onChange={e => setAno(parseInt(e.target.value))} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white outline-none cursor-pointer text-slate-600 font-medium">
                    {[2024, 2025, 2026, 2027].map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              {/* Criar nova escala */}
              <button
                type="button"
                onClick={() => setIsModalNovaEscala(true)}
                className="w-full py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 text-[9px] font-black uppercase hover:bg-slate-50 transition flex items-center justify-center gap-2 hover:border-emerald-400 hover:text-emerald-600"
              >
                + Criar Nova Escala
              </button>
            </div>
          </Card>

          {/* Edição de cores — desktop */}
          <Card className="p-4 space-y-3 shadow-md">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cores de {tipo}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Principal</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={editCores.corBg}
                    onChange={e => setEditCores(prev => ({ ...prev, corBg: e.target.value }))}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
                  <span className="text-[10px] font-mono text-slate-400">{editCores.corBg}</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Destaque</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={editCores.corAccent}
                    onChange={e => setEditCores(prev => ({ ...prev, corAccent: e.target.value }))}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
                  <span className="text-[10px] font-mono text-slate-400">{editCores.corAccent}</span>
                </div>
              </div>
            </div>
            {/* Preview da cor */}
            <div className="h-8 rounded-lg transition-all" style={{ background: `linear-gradient(135deg, ${editCores.corBg}, ${editCores.corAccent})` }} />
            
            {isIntercessao && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Opções de Uniforme (separadas por vírgula)</label>
                <input
                  type="text"
                  value={opcoesUniformeInput}
                  onChange={e => setOpcoesUniformeInput(e.target.value)}
                  placeholder="Ex: Fardamento (1), Fardamento (2), Camisa Preta"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold bg-slate-50 text-slate-700 outline-none focus:bg-white transition-all"
                />
              </div>
            )}

            <button
              type="button"
              onClick={handleSalvarCores}
              className="w-full py-2 rounded-xl text-white text-[10px] font-black uppercase tracking-wider transition active:scale-95"
              style={{ background: `linear-gradient(135deg, ${editCores.corBg}, ${editCores.corAccent})` }}
            >Salvar Configurações</button>
          </Card>

          {/* Indicadores compactos */}
          <Card className="p-4 space-y-2 shadow-md">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Resumo do Mês</p>
            {[
              { label: "Total de datas", value: diasEscala.length },
              { label: "Domingos", value: diasEscala.filter(d => d.semana === 0).length },
              { label: "Quintas", value: diasEscala.filter(d => d.semana === 4).length },
              { label: "Cargos por data", value: config?.cargos?.length || 0 },
            ].filter(i => i.value > 0).map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                <span className="text-xs font-semibold text-slate-500">{label}</span>
                <strong className="text-sm font-black" style={{ color: cor.bg }}>{value}</strong>
              </div>
            ))}
          </Card>

          {/* Equipe */}
          <Card className="p-0 overflow-hidden shadow-md">
            <CardHeader titulo={`Equipe: ${tipo}`} subtitulo="Pool de nomes autorizados." />
            <div className="p-4 space-y-3">
              <button type="button" onClick={() => setIsModalEquipeAberto(true)}
                className="w-full py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 text-[9px] font-black uppercase hover:bg-slate-50 transition flex items-center justify-center gap-2"
                onMouseEnter={e => { e.currentTarget.style.borderColor = cor.accent; e.currentTarget.style.color = cor.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = ''; }}
              >
                + Gerenciar Lista
              </button>
              <div className="flex flex-wrap gap-1.5 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
                {equipe.length === 0 && <p className="text-[10px] text-slate-400 italic py-2">Nenhum membro vinculado.</p>}
                {equipe.map(p => (
                  <span key={p.id} className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 shadow-xs hover:border-rose-300 transition">
                    {p.nome}
                    <button type="button" onClick={() => removerMembroEquipe(p.id)} className="text-slate-300 hover:text-rose-600 transition">✕</button>
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Ações */}
          <Card className="p-5 space-y-3 shadow-md" style={{ background: `linear-gradient(135deg, white, ${cor.light})` }}>
            <button onClick={handleSalvarEscalaGeral} disabled={carregando}
              className="w-full py-3 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${cor.bg}, ${cor.accent})` }}
            >💾 Salvar Escala</button>
            <div className="h-px bg-slate-200" />
            <button onClick={() => handleExportarPNG(false)} disabled={carregando}
              className="w-full py-3 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: cor.bg }}
            >📲 Compartilhar PNG</button>
            <button onClick={() => handleExportarPNG(true)} disabled={carregando}
              className="w-full py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-black text-[10px] uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >📥 Baixar para o Dispositivo</button>
            <button onClick={() => window.print()} className="w-full py-2 text-slate-400 text-[10px] font-bold uppercase hover:text-slate-600 transition">Ou Imprimir PDF</button>
            <div className="flex items-center justify-between pt-1 px-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visualizar Layout</span>
              <button type="button" onClick={() => setMostrarPreview(!mostrarPreview)}
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
                style={{ background: mostrarPreview ? cor.bg : '#e2e8f0' }}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${mostrarPreview ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            {status && <p className="text-[11px] font-black animate-pulse uppercase text-center" style={{ color: cor.accent }}>{status}</p>}
          </Card>
        </aside>

        {/* ── GRID DE DATAS ─────────────────────────────────────────────── */}
        <div className={`flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 order-2 ${carregando ? 'opacity-50 pointer-events-none' : ''}`}>
          {diasEscala.length === 0 && (
            <div className="xl:col-span-3 text-center py-20 text-slate-400 text-sm italic">
              Nenhum dia configurado para este ministério neste mês.
            </div>
          )}
          {diasEscala.map((culto) => (
            <Card key={culto.id} className="p-4 shadow-sm" style={{ borderLeft: `4px solid ${cor.accent}` }}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-baseline gap-2">
                  <strong className="text-3xl text-slate-800 tracking-tighter">{culto.dia}</strong>
                  <span className="text-xs font-black uppercase" style={{ color: cor.accent }}>{culto.tipoDia}</span>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-black uppercase border"
                  style={{ background: cor.light, color: cor.bg, borderColor: cor.accent + '40' }}
                >{tipo}</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {(config?.cargos || []).map((cargo, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cargo}</label>
                    <select
                      value={dadosEscala[culto.id]?.[idx] || ""}
                      onChange={(e) => handleSalvarAtribuicao(culto, idx, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold bg-slate-50 text-slate-700 outline-none focus:bg-white transition-all cursor-pointer"
                      onFocus={e => e.target.style.borderColor = cor.accent}
                      onBlur={e => e.target.style.borderColor = ''}
                    >
                      <option value="">— Selecionar —</option>
                      {equipe.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                  </div>
                ))}

                {/* Uniforme do dia (apenas na Intercessão) */}
                {isIntercessao && (
                  <div className="flex flex-col gap-0.5 pt-2 border-t border-slate-100/80">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uniforme / Farda</label>
                    <select
                      value={uniformes[culto.id] || ""}
                      onChange={(e) => handleSalvarUniforme(culto.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold bg-slate-50 text-slate-700 outline-none focus:bg-white transition-all focus:border-slate-300 cursor-pointer"
                    >
                      <option value="">— Sem Uniforme —</option>
                      {(config?.opcoesUniforme || ["Fardamento (1)", "Fardamento (2)", "Fardamento (3)", "Camisa Preta", "Camisa Branca"]).map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── BARRA DE AÇÕES FIXADA — apenas mobile ────────────────────────── */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <button
          onClick={handleSalvarEscalaGeral}
          disabled={carregando}
          className="flex-1 py-3 rounded-xl text-white font-black text-xs uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
          style={{ background: `linear-gradient(135deg, ${cor.bg}, ${cor.accent})` }}
        >💾 Salvar</button>
        <button
          onClick={() => handleExportarPNG(false)}
          disabled={carregando}
          className="flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50"
        >📲 Exportar</button>
        <button
          onClick={() => handleExportarPNG(true)}
          disabled={carregando}
          className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition flex-shrink-0"
          title="Baixar PNG"
        >📥</button>
      </div>{/* fim flex col/row */}

      {/* ── PREVIEW DO PNG — sempre no corpo da página, abaixo do grid ─── */}
      {mostrarPreview && (
        <div className="mt-4 p-6 md:p-10 bg-slate-900 rounded-[40px] border border-slate-800 flex flex-col items-center shadow-2xl">
          <div className="mb-6 w-full max-w-4xl flex items-center justify-between">
            <div>
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Prévia do PNG</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase">Formato 1080×1920 · Escala reduzida</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setMostrarPreview(false);
                setTimeout(() => setMostrarPreview(true), 100);
              }}
              className="text-slate-500 hover:text-white transition font-bold text-lg px-3 py-1"
            >✕ Fechar</button>
          </div>
          <style>{exportStyles}</style>
          
          <div className="w-full max-w-4xl overflow-y-auto h-[750px] border border-slate-800 rounded-[36px] bg-slate-950/60 p-4 relative flex justify-center shadow-inner custom-scrollbar">
            <div className="origin-top scale-[0.35] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.8]" style={{ width: '1080px', height: 'auto', minHeight: '1920px', transformOrigin: 'top center' }}>
              <div className="export-page" style={{ background: `linear-gradient(150deg, ${paleta.bgA} 0%, ${paleta.bgB} 55%, ${paleta.bgC} 100%)`, height: 'auto', minHeight: '100%', width: '100%' }}>
                <div className="export-glow-top" style={{ background: paleta.accent }} />
                <div className="export-glow-bottom" style={{ background: paleta.accent }} />
                
                <div className="export-header" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)' }}>
                  <div className="export-header-badge" style={{ background: paleta.accent, color: '#fff' }}>
                    Ministério de {tipo}
                  </div>
                  <div className="export-title-row">
                    <div className="export-kicker" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{ano}</div>
                    <div className="export-title" style={{ color: '#ffffff', textShadow: '0 4px 16px rgba(0, 0, 0, 0.15)' }}>{MESES[mes].toUpperCase()}</div>
                  </div>
                  <div className="export-stats">
                    {[
                      { label: "Cultos", val: diasEscala.length },
                      { label: "Domingos", val: diasEscala.filter(d => d.semana === 0).length },
                      { label: "Quintas", val: diasEscala.filter(d => d.semana === 4).length },
                    ].filter(s => s.val > 0).map(s => (
                      <div key={s.label} className="export-stat-card" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff' }}>
                        <div className="export-stat-label" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{s.label}</div>
                        <div className="export-stat-value" style={{ color: '#ffffff' }}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="export-list" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)' }}>
                  <div className="export-list-title" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Escala do mês — {tipo}</div>
                  <table className="export-table">
                    <thead>
                      <tr>
                        <th className="export-th" style={{ width: '90px', textAlign: 'center' }} align="center">Data</th>
                        {(config?.cargos || []).map(cargo => (
                          <th key={cargo} className="export-th" style={{ textAlign: 'center' }} align="center">{cargo}</th>
                        ))}
                        {isIntercessao && <th className="export-th" style={{ textAlign: 'center' }} align="center">Uniforme</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {diasEscala.map((culto, rowIndex) => {
                        const atribuicoes = dadosEscala[culto.id] || {};
                        const cargos = config?.cargos || [];
                        const numColunas = cargos.length + (isIntercessao ? 1 : 0);
                        const fontSizeNomes = numColunas >= 4 ? '18px' : numColunas === 3 ? '20px' : '22px';
                        const isAlt = rowIndex % 2 === 1;
                        const rowClass = isAlt ? "export-tr-alt" : "export-tr";

                        return (
                          <tr key={culto.id} className={rowClass}>
                            <td className="export-td export-td-date" align="center">
                              <div className="export-date-cell">
                                {(() => {
                                  const diaSemanaStr = culto.tipoDia.slice(0, 3).toUpperCase();
                                  const isDomOrQui = diaSemanaStr === 'DOM' || diaSemanaStr === 'QUI';
                                  const badgeBg = diaSemanaStr === 'DOM' ? '#ef4444' : diaSemanaStr === 'QUI' ? '#facc15' : 'transparent';
                                  const badgeColor = diaSemanaStr === 'DOM' ? '#ffffff' : diaSemanaStr === 'QUI' ? '#0f172a' : '#475569';
                                  return (
                                    <span
                                      className="export-date-cell-day"
                                      style={isDomOrQui ? {
                                        backgroundColor: badgeBg,
                                        color: badgeColor,
                                        padding: '2px 8px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        fontWeight: '900',
                                        display: 'inline-block',
                                        marginBottom: '2px',
                                        opacity: 1
                                      } : {}}
                                    >
                                      {diaSemanaStr}
                                    </span>
                                  );
                                })()}
                                <span className="export-date-cell-num" style={{ color: paleta.accent }}>{culto.dia}</span>
                              </div>
                            </td>
                            {cargos.map((cargo, idx) => {
                              const pId = atribuicoes[idx];
                              const pessoa = equipe.find(p => p.id === pId);
                              const partes = pessoa ? pessoa.nome.trim().split(' ') : [];
                              const nomeCurto = partes.length > 1 ? `${partes[0]} ${partes[partes.length - 1]}` : (partes[0] || '');
                              return (
                                <td key={idx} className="export-td" style={{ fontSize: fontSizeNomes, textAlign: 'center' }} align="center">
                                  {nomeCurto ? <span>{nomeCurto}</span> : <span className="export-name-empty">— —</span>}
                                </td>
                              );
                            })}
                            {isIntercessao && (
                              <td className="export-td export-td-uniform" style={{ color: paleta.accent, fontSize: fontSizeNomes, textAlign: 'center' }} align="center">
                                {uniformes[culto.id] ? <span>{uniformes[culto.id]}</span> : <span className="export-name-empty">— —</span>}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="export-footer">
                  <img src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/logo_betesda_branca.png" className="export-footer-logo" />
                  <div className="export-footer-tagline">MIB CHURCH · DEPARTAMENTO DE COMUNICAÇÃO</div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-[10px] mt-4 font-bold uppercase tracking-wider">↑ Role a prévia para visualizar a escala completa</p>
        </div>
      )}

      {/* ── MODAL CONFIGURAÇÕES — bottom sheet mobile ────────────────────── */}
      {isModalConfigAberto && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Handle + header */}
            <div className="flex flex-col items-center pt-3 pb-2 border-b border-slate-100 px-5">
              <div className="w-10 h-1 rounded-full bg-slate-200 mb-3" />
              <div className="w-full flex items-center justify-between">
                <div>
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">Configurações</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{tipo}</p>
                </div>
                <button type="button" onClick={() => setIsModalConfigAberto(false)} className="text-slate-400 hover:text-slate-600 font-bold p-1 text-lg">✕</button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-5 space-y-5">
              {/* Mês e Ano */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mês</label>
                  <select value={mes} onChange={e => setMes(parseInt(e.target.value))} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white outline-none cursor-pointer text-slate-700 font-semibold">
                    {MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Ano</label>
                  <select value={ano} onChange={e => setAno(parseInt(e.target.value))} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white outline-none cursor-pointer text-slate-700 font-semibold">
                    {[2024, 2025, 2026, 2027].map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {/* Resumo do mês */}
              <div className="rounded-xl p-3 space-y-1.5" style={{ background: cor.light }}>
                {[
                  { label: "Total de datas", value: diasEscala.length },
                  { label: "Domingos", value: diasEscala.filter(d => d.semana === 0).length },
                  { label: "Quintas", value: diasEscala.filter(d => d.semana === 4).length },
                ].filter(i => i.value > 0).map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">{label}</span>
                    <strong className="text-sm font-black" style={{ color: cor.bg }}>{value}</strong>
                  </div>
                ))}
              </div>

              {/* Cores da escala */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cores de {tipo}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Principal</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={editCores.corBg}
                        onChange={e => setEditCores(prev => ({ ...prev, corBg: e.target.value }))}
                        className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5 flex-shrink-0" />
                      <span className="text-[10px] font-mono text-slate-400 break-all">{editCores.corBg}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Destaque</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={editCores.corAccent}
                        onChange={e => setEditCores(prev => ({ ...prev, corAccent: e.target.value }))}
                        className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5 flex-shrink-0" />
                      <span className="text-[10px] font-mono text-slate-400 break-all">{editCores.corAccent}</span>
                    </div>
                  </div>
                </div>
                {/* Preview barra de cor */}
                <div className="h-8 rounded-xl transition-all" style={{ background: `linear-gradient(135deg, ${editCores.corBg}, ${editCores.corAccent})` }} />

                {isIntercessao && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Opções de Uniforme (separadas por vírgula)</label>
                    <input
                      type="text"
                      value={opcoesUniformeInput}
                      onChange={e => setOpcoesUniformeInput(e.target.value)}
                      placeholder="Ex: Fardamento (1), Fardamento (2), Camisa Preta"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold bg-slate-50 text-slate-700 outline-none focus:bg-white transition-all"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => { handleSalvarCores(); setIsModalConfigAberto(false); }}
                  className="w-full py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${editCores.corBg}, ${editCores.corAccent})` }}
                >Salvar Configurações</button>
              </div>

              {/* Equipe compacta */}
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Equipe de {tipo}</p>
                <div className="flex flex-wrap gap-1.5">
                  {equipe.length === 0 && <p className="text-[10px] text-slate-400 italic">Nenhum membro vinculado.</p>}
                  {equipe.map(p => (
                    <span key={p.id} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">
                      {p.nome}
                      <button type="button" onClick={() => removerMembroEquipe(p.id)} className="text-slate-300 hover:text-rose-500 transition ml-0.5">✕</button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => { setIsModalConfigAberto(false); setIsModalEquipeAberto(true); }}
                  className="w-full py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 text-[9px] font-black uppercase transition flex items-center justify-center gap-1"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = cor.accent; e.currentTarget.style.color = cor.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = ''; }}
                >+ Gerenciar Lista</button>
              </div>

              {/* Preview e imprimir */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setMostrarPreview(v => !v); setIsModalConfigAberto(false); }}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition flex items-center justify-center gap-2"
                >
                  {mostrarPreview ? '✕ Ocultar Prévia do PNG' : '👁 Visualizar Prévia do PNG'}
                </button>
                <button onClick={() => window.print()} className="w-full py-2 text-slate-400 text-[10px] font-bold uppercase hover:text-slate-600 transition">Imprimir PDF</button>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button
                type="button"
                onClick={() => setIsModalConfigAberto(false)}
                className="w-full py-3 rounded-xl bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider transition active:scale-95"
              >Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: VINCULAR MEMBROS ─────────────────────────────────────── */}
      {isModalEquipeAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 py-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between" style={{ background: cor.light }}>
              <div>
                <h4 className="font-semibold text-slate-950 text-base">Vincular Membros</h4>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Adicionando à Equipe de: <span style={{ color: cor.bg }}>{tipo}</span></p>
              </div>
              <button type="button" onClick={() => { setIsModalEquipeAberto(false); setSelecionadosModal([]); setBuscaModal(""); }} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
            </div>
            <div className="p-4 bg-white border-b border-slate-100">
              <input type="text" placeholder="Buscar membro..." value={buscaModal} onChange={e => setBuscaModal(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none" />
            </div>
            <form onSubmit={handleSalvarEquipeModal} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 overflow-y-auto space-y-2 flex-1 max-h-72 custom-scrollbar">
                {membrosDisponiveis.length === 0
                  ? <p className="text-center py-10 text-xs text-slate-400 italic">Nenhum disponível.</p>
                  : membrosDisponiveis.map(p => {
                    const marcado = selecionadosModal.includes(p.id);
                    return (
                      <label key={p.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${marcado ? 'border-blue-200 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'}`}
                        style={marcado ? { background: cor.light, borderColor: cor.accent + '66' } : {}}>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={marcado}
                            onChange={() => setSelecionadosModal(prev => marcado ? prev.filter(id => id !== p.id) : [...prev, p.id])}
                            className="h-4 w-4 rounded border-slate-300" />
                          <span className="text-xs font-bold" style={marcado ? { color: cor.bg } : {}}>{p.nome}</span>
                        </div>
                        {marcado && <span className="text-[9px] font-black uppercase" style={{ color: cor.accent }}>Selecionado</span>}
                      </label>
                    );
                  })}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase">{selecionadosModal.length} selecionado(s)</div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setIsModalEquipeAberto(false); setSelecionadosModal([]); setBuscaModal(""); }} className="px-4 py-2 text-xs font-bold text-slate-500">Cancelar</button>
                  <button type="submit" disabled={carregando || !selecionadosModal.length}
                    className="text-white font-black text-[10px] uppercase px-5 py-2.5 rounded-xl transition disabled:opacity-50 shadow-md"
                    style={{ background: cor.bg }}>
                    {carregando ? 'Salvando...' : 'Vincular'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: CRIAR NOVA ESCALA ────────────────────────────────────── */}
      {isModalNovaEscala && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 py-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header do modal */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-emerald-50">
              <div>
                <h4 className="font-black text-slate-950 text-base tracking-tight">Nova Escala Ministerial</h4>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Configure o novo ministério</p>
              </div>
              <button type="button" onClick={() => { setIsModalNovaEscala(false); setErroCriar(""); }} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 custom-scrollbar flex-1">
              {/* Nome */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Nome do Ministério *</label>
                <input
                  type="text" placeholder="Ex: Louvor, Dízimo, Áudio..."
                  value={novaEscala.nome}
                  onChange={e => setNovaEscala(prev => ({ ...prev, nome: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition"
                />
              </div>

              {/* Cargos */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cargos / Funções *</label>
                {novaEscala.cargos.map((cargo, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text" placeholder={`Cargo ${i + 1}`}
                      value={cargo}
                      onChange={e => {
                        const c = [...novaEscala.cargos]; c[i] = e.target.value;
                        setNovaEscala(prev => ({ ...prev, cargos: c }));
                      }}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-emerald-400 transition"
                    />
                    {novaEscala.cargos.length > 1 && (
                      <button type="button" onClick={() => setNovaEscala(prev => ({ ...prev, cargos: prev.cargos.filter((_, j) => j !== i) }))}
                        className="text-rose-400 hover:text-rose-600 font-bold text-sm px-2">✕</button>
                    )}
                  </div>
                ))}
                <button type="button"
                  onClick={() => setNovaEscala(prev => ({ ...prev, cargos: [...prev.cargos, ""] }))}
                  className="text-[10px] font-black text-emerald-600 uppercase hover:text-emerald-700 flex items-center gap-1 mt-1">
                  + Adicionar cargo
                </button>
              </div>

              {/* Dias da semana */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Dias dos Cultos *</label>
                <div className="flex flex-wrap gap-2">
                  {DIAS_SEMANA_NOMES.map((d, i) => {
                    const marcado = novaEscala.diasSemana.includes(i);
                    return (
                      <button key={i} type="button"
                        onClick={() => setNovaEscala(prev => ({
                          ...prev,
                          diasSemana: marcado ? prev.diasSemana.filter(x => x !== i) : [...prev.diasSemana, i]
                        }))}
                        className="px-3 py-1.5 rounded-lg text-xs font-black uppercase border transition"
                        style={marcado ? { background: novaEscala.corBg, color: '#fff', borderColor: novaEscala.corBg } : { background: '#f8fafc', color: '#64748b', borderColor: '#e2e8f0' }}
                      >{d}</button>
                    );
                  })}
                </div>
              </div>

              {/* Cores */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cor Principal</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={novaEscala.corBg}
                      onChange={e => setNovaEscala(prev => ({ ...prev, corBg: e.target.value }))}
                      className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
                    <span className="text-xs font-mono text-slate-500">{novaEscala.corBg}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cor de Destaque</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={novaEscala.corAccent}
                      onChange={e => setNovaEscala(prev => ({ ...prev, corAccent: e.target.value }))}
                      className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
                    <span className="text-xs font-mono text-slate-500">{novaEscala.corAccent}</span>
                  </div>
                </div>
              </div>

              {/* URL de ícone */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">URL do Ícone (opcional)</label>
                <input
                  type="url" placeholder="https://... (PNG ou SVG)"
                  value={novaEscala.iconUrl}
                  onChange={e => setNovaEscala(prev => ({ ...prev, iconUrl: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-emerald-400 transition"
                />
                {novaEscala.iconUrl && (
                  <img src={novaEscala.iconUrl} alt="preview" className="w-10 h-10 mt-1 rounded-lg object-contain border border-slate-200 bg-slate-50 p-1" onError={e => { e.target.style.display = 'none'; }} />
                )}
              </div>

              {/* Preview */}
              {novaEscala.nome && (
                <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${novaEscala.corBg}, ${novaEscala.corAccent})` }}>
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    {novaEscala.iconUrl
                      ? <img src={novaEscala.iconUrl} className="w-6 h-6 object-contain" onError={e => { e.target.style.display = 'none'; }} />
                      : <span className="text-white text-lg font-black">{novaEscala.nome[0]}</span>}
                  </div>
                  <div>
                    <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">Ministério</p>
                    <p className="text-white font-black text-sm">{novaEscala.nome}</p>
                  </div>
                </div>
              )}

              {erroCriar && <p className="text-rose-500 text-xs font-bold">{erroCriar}</p>}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" onClick={() => { setIsModalNovaEscala(false); setErroCriar(""); }} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700">Cancelar</button>
              <button type="button" onClick={handleCriarEscala}
                className="text-white font-black text-[10px] uppercase px-6 py-2.5 rounded-xl transition shadow-md"
                style={{ background: `linear-gradient(135deg, ${novaEscala.corBg}, ${novaEscala.corAccent})` }}>
                ✓ Criar Escala
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}