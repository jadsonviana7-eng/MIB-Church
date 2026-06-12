import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';
import html2canvas from 'html2canvas';

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
  .export-page { width: 1080px; height: 1920px; padding: 48px; font-family: 'Montserrat', sans-serif; display: flex; flex-direction: column; gap: 18px; }
  
  .export-header { border-radius: 36px; padding: 42px 40px 36px; display: flex; flex-direction: column; align-items: flex-start; gap: 18px; overflow: hidden; position: relative; }
  .export-header-badge { font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.18em; padding: 6px 18px; border-radius: 999px; display: inline-flex; align-items: center; gap: 8px; }
  .export-header-icon { width: 28px; height: 28px; display: inline-block; vertical-align: middle; }
  .export-title-row { display: flex; flex-direction: column; gap: 4px; width: 100%; }
  .export-kicker { font-size: 22px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.65; }
  .export-title { font-size: 88px; font-weight: 900; line-height: 0.9; letter-spacing: -2px; }
  .export-year { font-size: 28px; font-weight: 900; letter-spacing: 0.1em; }

  .export-stats { display: flex; gap: 12px; width: 100%; margin-top: 4px; }
  .export-stat-card { flex: 1; padding: 16px 20px; border-radius: 20px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .export-stat-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; opacity: 0.55; }
  .export-stat-value { font-size: 34px; font-weight: 900; line-height: 1; }

  .export-list { flex: 1; border-radius: 36px; padding: 22px 20px; display: flex; flex-direction: column; gap: 12px; overflow: hidden; }
  .export-list-title { font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; opacity: 0.45; padding: 0 8px 6px; border-bottom: 1px solid rgba(0,0,0,0.08); margin-bottom: 4px; }
  
  .export-item { border-radius: 22px; padding: 18px 22px; display: grid; grid-template-columns: 100px 1fr; align-items: center; gap: 14px; min-height: 100px; }
  .export-date { text-align: center; padding-right: 14px; border-right: 1.5px solid rgba(0,0,0,0.1); flex-shrink: 0; }
  .export-date-day { font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; }
  .export-date-num { font-size: 58px; font-weight: 900; line-height: 0.95; margin-top: 2px; }
  
  .export-roles { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; padding-left: 18px; }
  .export-role-box { display: flex; flex-direction: column; gap: 2px; padding-left: 12px; border-left: 2px solid rgba(0,0,0,0.1); }
  .export-role-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.45; }
  .export-role-name { font-size: 20px; font-weight: 900; line-height: 1.1; color: #111; overflow-wrap: break-word; }
  .export-role-empty { font-size: 18px; font-weight: 700; opacity: 0.25; }

  .export-footer { display: flex; align-items: center; justify-content: center; padding: 28px 0 8px; flex-shrink: 0; }
  .export-footer-logo { height: 100px; object-fit: contain; }
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
  const [status, setStatus] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarPreview, setMostrarPreview] = useState(false);

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
      container.style.cssText = 'position:fixed;left:-9999px;top:0;';
      const styleTag = document.createElement('style');
      styleTag.innerHTML = exportStyles;
      container.appendChild(styleTag);

      const totalCultos = diasEscala.length;
      const domsCount = diasEscala.filter(d => d.semana === 0).length;
      const quiCount = diasEscala.filter(d => d.semana === 4).length;
      const outrosCount = totalCultos - domsCount - quiCount;

      const cargos = configEscalas[tipo]?.cargos || [];

      const statsHTML = [
        `<div class="export-stat-card" style="background:rgba(0,0,0,0.12)">
          <div class="export-stat-label" style="color:${p.ink}">Cultos</div>
          <div class="export-stat-value" style="color:${p.ink}">${totalCultos}</div>
        </div>`,
        domsCount > 0 ? `<div class="export-stat-card" style="background:rgba(0,0,0,0.12)">
          <div class="export-stat-label" style="color:${p.ink}">Domingos</div>
          <div class="export-stat-value" style="color:${p.ink}">${domsCount}</div>
        </div>` : '',
        quiCount > 0 ? `<div class="export-stat-card" style="background:rgba(0,0,0,0.12)">
          <div class="export-stat-label" style="color:${p.ink}">Quintas</div>
          <div class="export-stat-value" style="color:${p.ink}">${quiCount}</div>
        </div>` : '',
        outrosCount > 0 ? `<div class="export-stat-card" style="background:rgba(0,0,0,0.12)">
          <div class="export-stat-label" style="color:${p.ink}">Outros</div>
          <div class="export-stat-value" style="color:${p.ink}">${outrosCount}</div>
        </div>` : '',
      ].join('');

      const iconHtml = configEscalas[tipo]?.iconUrl
        ? `<img src="${configEscalas[tipo].iconUrl}" style="width:28px;height:28px;object-fit:contain;vertical-align:middle;" />`
        : (configEscalas[tipo]?.iconSvg ? `<span style="width:24px;height:24px;display:inline-block;vertical-align:middle;color:${p.accent}">${configEscalas[tipo].iconSvg}</span>` : '');

      const itensHTML = diasEscala.map(culto => {
        const atribuicoes = dadosEscala[culto.id] || {};
        const rolesHTML = cargos.map((cargo, idx) => {
          const pId = atribuicoes[idx];
          const pessoa = equipe.find(pp => pp.id === pId);
          const partes = pessoa ? pessoa.nome.trim().split(' ') : [];
          const nomeCurto = partes.length > 1 ? `${partes[0]} ${partes[partes.length - 1]}` : (partes[0] || '');
          return `<div class="export-role-box">
            <div class="export-role-label" style="color:${p.accent}">${cargo}</div>
            ${nomeCurto
              ? `<div class="export-role-name">${nomeCurto}</div>`
              : `<div class="export-role-empty">— —</div>`}
          </div>`;
        }).join('');
        return `<div class="export-item" style="background:rgba(255,255,255,0.88)">
          <div class="export-date">
            <div class="export-date-day" style="color:${p.accent}">${culto.tipoDia.slice(0,3).toUpperCase()}</div>
            <div class="export-date-num" style="color:${p.ink}">${culto.dia}</div>
          </div>
          <div class="export-roles">${rolesHTML}</div>
        </div>`;
      }).join('');

      const content = document.createElement('div');
      content.className = 'export-page';
      content.style.background = `linear-gradient(150deg, ${p.bgA} 0%, ${p.bgB} 55%, ${p.bgC} 100%)`;
      content.innerHTML = `
        <div class="export-header" style="background:${p.panel}CC">
          <div class="export-header-badge" style="background:${p.bgA};color:${p.panel}">
            ${iconHtml} Ministério de ${tipo}
          </div>
          <div class="export-title-row">
            <div class="export-kicker" style="color:${p.accent}">${ano}</div>
            <div class="export-title" style="color:${p.ink}">${MESES[mes].toUpperCase()}</div>
          </div>
          <div class="export-stats">${statsHTML}</div>
        </div>
        <div class="export-list" style="background:${p.panel}CC">
          <div class="export-list-title" style="color:${p.ink}">Escala do mês — ${tipo}</div>
          ${itensHTML}
        </div>
        <div class="export-footer">
          <img src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/logo_betesda_branca.png" class="export-footer-logo" />
        </div>
      `;
      container.appendChild(content);
      document.body.appendChild(container);

      const canvas = await html2canvas(content, { scale: 2, width: 1080, height: 1920, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Escala_${tipo}_${MESES[mes]}_${ano}.png`;
      link.href = imgData;

      if (navigator.share && !isDownloadOnly) {
        const blob = await (await fetch(imgData)).blob();
        const file = new File([blob], link.download, { type: 'image/png' });
        await navigator.share({ files: [file], title: `Escala ${tipo}` }).catch(() => link.click());
      } else { link.click(); }
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
    if (!window.confirm("Remover este membro?")) return;
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

  // ─── RENDER ──────────────────────────────────────────────────────────────
  const config = configEscalas[tipo];
  const cor = config?.cor || CONFIG_ESCALAS_DEFAULT["Cultos"].cor;

  return (
    <div className="space-y-6">
      {/* CABEÇALHO DINÂMICO */}
      <div
        className="rounded-2xl px-6 py-5 flex items-center gap-4 shadow-lg"
        style={{ background: `linear-gradient(135deg, ${cor.bg}, ${cor.accent})` }}
      >
        {config?.iconUrl ? (
          <img src={config.iconUrl} alt={tipo} className="w-12 h-12 object-contain rounded-xl bg-white/10 p-2" />
        ) : config?.iconSvg ? (
          <span className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center p-2.5 text-white flex-shrink-0"
            dangerouslySetInnerHTML={{ __html: config.iconSvg }} />
        ) : null}
        <div className="flex-1 min-w-0">
          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Ministério</p>
          <h1 className="text-white text-2xl font-black tracking-tight leading-none">{tipo}</h1>
        </div>
        <span className="text-white/40 text-xs font-bold uppercase hidden sm:block">{MESES[mes]} · {ano}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── PAINEL ESQUERDO ────────────────────────────────────────── */}
        <aside className="w-full lg:w-[300px] shrink-0 space-y-4 lg:sticky lg:top-24 order-2 lg:order-1">

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
                style={{ '--hover-color': cor.accent }}
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

        {/* ── GRID DE DATAS ───────────────────────────────────────────── */}
        <div className={`flex-1 min-w-0 grid grid-cols-1 xl:grid-cols-3 gap-4 order-1 lg:order-2 ${carregando ? 'opacity-50 pointer-events-none' : ''}`}>
          {diasEscala.length === 0 && (
            <div className="xl:col-span-3 text-center py-20 text-slate-400 text-sm italic">
              Nenhum dia configurado para este ministério neste mês.
            </div>
          )}
          {diasEscala.map((culto) => {
            return (
              <Card key={culto.id} className="p-4 shadow-sm" style={{ borderLeft: `4px solid ${cor.accent}` }}>
                {/* Cabeçalho compacto do card */}
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
                        style={{ '--tw-ring-color': cor.accent }}
                        onFocus={e => e.target.style.borderColor = cor.accent}
                        onBlur={e => e.target.style.borderColor = ''}
                      >
                        <option value="">— Selecionar —</option>
                        {equipe.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ── PREVIEW DO PNG ─────────────────────────────────────────────── */}
      {mostrarPreview && (
        <div className="mt-10 p-6 md:p-10 bg-slate-900 rounded-[40px] border border-slate-800 flex flex-col items-center shadow-2xl">
          <div className="mb-6 w-full max-w-xl">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Prévia do PNG</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase">Formato 1080×1920 · Escala reduzida</p>
          </div>
          <style>{exportStyles}</style>
          <div className="relative shadow-[0_0_100px_rgba(0,0,0,0.5)] border-[12px] border-slate-800 rounded-[60px] overflow-hidden origin-top scale-[0.3] sm:scale-[0.4] md:scale-[0.5]" style={{ width: '1080px', height: '1920px' }}>
            <div className="export-page" style={{ background: `linear-gradient(150deg, ${paleta.bgA} 0%, ${paleta.bgB} 55%, ${paleta.bgC} 100%)`, height: '100%', width: '100%' }}>
              <div className="export-header" style={{ background: paleta.panel + 'CC' }}>
                <div className="export-header-badge" style={{ background: paleta.bgA, color: paleta.panel }}>
                  Ministério de {tipo}
                </div>
                <div className="export-title-row">
                  <div className="export-kicker" style={{ color: paleta.accent }}>{ano}</div>
                  <div className="export-title" style={{ color: paleta.ink }}>{MESES[mes].toUpperCase()}</div>
                </div>
                <div className="export-stats">
                  {[
                    { label: "Cultos", val: diasEscala.length },
                    { label: "Domingos", val: diasEscala.filter(d => d.semana === 0).length },
                    { label: "Quintas", val: diasEscala.filter(d => d.semana === 4).length },
                  ].filter(s => s.val > 0).map(s => (
                    <div key={s.label} className="export-stat-card" style={{ background: 'rgba(0,0,0,0.1)' }}>
                      <div className="export-stat-label" style={{ color: paleta.ink }}>{s.label}</div>
                      <div className="export-stat-value" style={{ color: paleta.ink }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="export-list" style={{ background: paleta.panel + 'CC' }}>
                <div className="export-list-title" style={{ color: paleta.ink }}>Escala do mês — {tipo}</div>
                {diasEscala.map(culto => {
                  const atribuicoes = dadosEscala[culto.id] || {};
                  const cargos = config?.cargos || [];
                  return (
                    <div key={culto.id} className="export-item" style={{ background: 'rgba(255,255,255,0.88)' }}>
                      <div className="export-date">
                        <div className="export-date-day" style={{ color: paleta.accent }}>{culto.tipoDia.slice(0, 3).toUpperCase()}</div>
                        <div className="export-date-num" style={{ color: paleta.ink }}>{culto.dia}</div>
                      </div>
                      <div className="export-roles">
                        {cargos.map((cargo, idx) => {
                          const pId = atribuicoes[idx];
                          const pessoa = equipe.find(p => p.id === pId);
                          const partes = pessoa ? pessoa.nome.trim().split(' ') : [];
                          const nomeCurto = partes.length > 1 ? `${partes[0]} ${partes[partes.length - 1]}` : (partes[0] || '');
                          return (
                            <div key={idx} className="export-role-box">
                              <div className="export-role-label" style={{ color: paleta.accent }}>{cargo}</div>
                              {nomeCurto ? <div className="export-role-name">{nomeCurto}</div> : <div className="export-role-empty">— —</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="export-footer">
                <img src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/logo_betesda_branca.png" className="export-footer-logo" />
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-[10px] mt-[-400px] md:mt-[-450px] font-bold uppercase">↑ Fim da Prévia</p>
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