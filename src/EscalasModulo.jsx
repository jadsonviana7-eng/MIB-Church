import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';
import html2canvas from 'html2canvas';

const PALETAS_EXPORTACAO = [
  {
    bgA: "#10231f", bgB: "#2f6f72", bgC: "#d69258",
    panel: "#e3d7c5", card: "#ffffff", ink: "#17211f",
    muted: "#66706c", accent: "#9d6235", pillA: "#223c36", pillB: "#2f6f72"
  },
  {
    bgA: "#172033", bgB: "#576cbc", bgC: "#d9a441",
    panel: "#e7eaf3", card: "#ffffff", ink: "#171b2a",
    muted: "#5e6578", accent: "#b36b2c", pillA: "#26395f", pillB: "#576cbc"
  },
  {
    bgA: "#1f2933", bgB: "#0f766e", bgC: "#f59e0b",
    panel: "#e0e7dd", card: "#ffffff", ink: "#17201f",
    muted: "#5f6b66", accent: "#b45309", pillA: "#134e4a", pillB: "#0f766e"
  },
  {
    bgA: "#251a2f", bgB: "#7c3aed", bgC: "#f97316",
    panel: "#e9ddf2", card: "#ffffff", ink: "#20162a",
    muted: "#6c6074", accent: "#c2410c", pillA: "#4c1d95", pillB: "#7c3aed"
  }
];

const exportStyles = `
  .export-page { width: 1080px; height: 1920px; padding: 42px; font-family: sans-serif; display: flex; flex-direction: column; gap: 16px; box-sizing: border-box; }
  .export-header { border-radius: 34px; padding: 60px 40px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 25px; }
  .export-logo-text { display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: 900; color: white; background: rgba(0,0,0,0.2); padding: 15px 40px; border-radius: 24px; line-height: 1; }
  .export-kicker { font-size: 32px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; }
  .export-title { font-size: 80px; font-weight: 900; margin: -10px 0 0 0; line-height: 1; }
  .export-year-pill { display: flex; align-items: center; justify-content: center; padding: 10px 30px; border-radius: 999px; color: white; font-size: 24px; font-weight: 900; line-height: 1; margin-top: -5px; }
  .export-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; }
  .export-stat-card { background: white; padding: 15px; border-radius: 15px; display: flex; flex-direction: column; }
  .export-stat-card span { font-size: 16px; font-weight: 800; text-transform: uppercase; color: #666; }
  .export-stat-card strong { font-size: 32px; color: #111; }
  .export-list { flex: 1; background: rgba(255,255,255,0.8); border-radius: 34px; padding: 25px; display: flex; flex-direction: column; gap: 12px; overflow: hidden; }
  .export-item { background: #f2f2f2 !important; border-radius: 20px; padding: 20px 30px; display: grid; grid-template-columns: 140px 1fr; align-items: center; gap: 20px; flex: 1; }
  .export-date { text-align: center; border-right: 2px solid #eee; }
  .export-date span { display: block; font-size: 16px; font-weight: 800; text-transform: uppercase; }
  .export-date strong { display: block; font-size: 55px; line-height: 1; }
  .export-roles { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .export-role-box { text-align: center; }
  .export-role-box span { display: block; font-size: 16px; font-weight: 800; text-transform: uppercase; color: #888; margin-bottom: 4px; }
  .export-role-box strong { display: block; font-size: 28px; font-weight: 900; color: #1c1c1c; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .export-footer { text-align: center; color: white; font-weight: 700; font-size: 18px; padding: 10px; }
`;

const CONFIG_ESCALAS = {
  "Cultos": ["Direção", "Pregação"],
  "Intercessão": ["Porta", "Altar", "Sala Kids"],
  "Projeção": ["Operador"],
  "Introdução": ["Recepção 1", "Recepção 2"],
  "Manutenção": ["Líder", "Auxiliar 1", "Auxiliar 2", "Auxiliar 3"]
};

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DIAS_SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta-feira", "Sexta", "Sábado"];

const TIPO_COLORS = {
  "Cultos": "text-blue-600",
  "Intercessão": "text-indigo-600",
  "Projeção": "text-amber-600",
  "Introdução": "text-rose-600",
  "Manutenção": "text-emerald-600"
};

const TIPO_CHIP_COLORS = {
  "Cultos": "bg-blue-50 text-blue-600 border-blue-100",
  "Intercessão": "bg-indigo-50 text-indigo-600 border-indigo-100",
  "Projeção": "bg-amber-50 text-amber-600 border-amber-100",
  "Introdução": "bg-rose-50 text-rose-600 border-rose-100",
  "Manutenção": "bg-emerald-50 text-emerald-600 border-emerald-100"
};

export default function EscalasModulo() {
  const [tipo, setTipo] = useState("Cultos");
  const [mes, setMes] = useState(new Date().getMonth());
  const [ano, setAno] = useState(new Date().getFullYear());
  const [membrosSistema, setMembrosSistema] = useState([]);
  const [equipe, setEquipe] = useState([]); // Pool de membros para o TIPO atual
  const [dadosEscala, setDadosEscala] = useState({}); // Atribuições do banco
  const [status, setStatus] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarPreview, setMostrarPreview] = useState(false);
  const [paletaPreview, setPaletaPreview] = useState(PALETAS_EXPORTACAO[0]);
  
  const [isModalEquipeAberto, setIsModalEquipeAberto] = useState(false);
  const [buscaModal, setBuscaModal] = useState("");
  const [selecionadosModal, setSelecionadosModal] = useState([]);

  // Ref para evitar loops ou carregamentos desnecessários
  // Filtra membros que ainda não estão na equipe atual para o seletor
  const membrosDisponiveis = useMemo(() => {
    const idsNaEquipe = new Set(equipe.map(p => p.id));
    return membrosSistema
      .filter(p => !idsNaEquipe.has(p.id))
      .filter(p => p.nome.toLowerCase().includes(buscaModal.toLowerCase()));
  }, [membrosSistema, equipe, buscaModal]);

  // 1. Carrega todos os membros do sistema para o seletor
  useEffect(() => {
    async function carregarMembros() {
      const { data } = await supabase.from('pessoas').select('id, nome').order('nome');
      if (data) setMembrosSistema(data);
    }
    carregarMembros();
  }, []);

  // 2. Carrega a equipe específica deste tipo de escala
  const carregarEquipe = useCallback(async () => {
    const { data } = await supabase
      .from('equipes_escala')
      .select('pessoas:pessoa_id(id, nome, foto_url)')
      .eq('tipo_escala', tipo);
    
    const listaTratada = data?.map(item => item.pessoas).filter(Boolean) || [];
    setEquipe(listaTratada);
  }, [tipo]);

  // 3. Carrega as atribuições (quem está escalado) para o mês/tipo
  const carregarAtribuicoes = useCallback(async () => {
    const m = Number(mes);
    const a = Number(ano);

    setCarregando(true);
    const dataInicio = `${a}-${String(m + 1).padStart(2, '0')}-01`;
    // Calcula o último dia do mês corretamente para evitar erro de data inválida (ex: 31 de junho)
    const ultimoDia = new Date(a, m + 1, 0).getDate();
    const dataFim = `${a}-${String(m + 1).padStart(2, '0')}-${String(ultimoDia).padStart(2, '0')}`;

    const { data, error } = await supabase
      .from('escalas_atribuicoes')
      .select('data, cargo_index, pessoa_id')
      .eq('tipo_escala', tipo)
      .gte('data', dataInicio)
      .lte('data', dataFim);

    if (error) {
      console.error("Erro ao carregar atribuições:", error);
      setCarregando(false);
      return;
    }

    const mapa = {};
    data?.forEach(attr => {
      // Criamos uma chave compatível com o ID do card: tipo-ano-mes-dia
      const dia = attr.data.split('-')[2];
      const idChave = `${tipo}-${a}-${m}-${parseInt(dia)}`;
      if (!mapa[idChave]) mapa[idChave] = {};
      mapa[idChave][attr.cargo_index] = attr.pessoa_id;
    });
    setDadosEscala(mapa);
    setCarregando(false);
  }, [tipo, mes, ano]);

  useEffect(() => {
    carregarEquipe();
    carregarAtribuicoes();
  }, [carregarEquipe, carregarAtribuicoes]);

  // Calcula os dias de Quinta (4) e Domingo (0) para o mês selecionado
  const diasEscala = useMemo(() => {
    const m = Number(mes);
    const a = Number(ano);
    const totalDias = new Date(a, m + 1, 0).getDate();
    const lista = [];

    for (let d = 1; d <= totalDias; d++) {
      const data = new Date(a, m, d);
      const sem = data.getDay();
      if (sem === 0 || sem === 4) {
        lista.push({
          id: `${tipo}-${a}-${m}-${d}`,
          dia: String(d).padStart(2, "0"),
          tipoDia: DIAS_SEMANA[sem],
          semana: sem
        });
      }
    }
    return lista;
  }, [tipo, mes, ano]);

  const handleSalvarAtribuicao = async (culto, campoIndex, pessoaId) => {
    const m = Number(mes);
    const a = Number(ano);
    const dataISO = `${a}-${String(m + 1).padStart(2, '0')}-${String(culto.dia).padStart(2, '0')}`;
    
    const { error } = await supabase
      .from('escalas_atribuicoes')
      .upsert({
        data: dataISO,
        tipo_escala: tipo,
        cargo_index: campoIndex,
        pessoa_id: pessoaId || null
      }, { onConflict: 'data,tipo_escala,cargo_index' });

    if (!error) {
      setDadosEscala(prev => ({
        ...prev,
        [culto.id]: { ...(prev[culto.id] || {}), [campoIndex]: pessoaId }
      }));
      setStatus("Escala atualizada!");
      setTimeout(() => setStatus(""), 1500);
    } else {
      console.error('Erro ao salvar escala:', error);
      alert('Erro ao salvar escala: ' + error.message);
    }
  };

  const handleSalvarEscalaGeral = async () => {
    setCarregando(true);
    setStatus("Salvando alterações...");
    
    try {
      const m = Number(mes);
      const a = Number(ano);
      const registros = [];

      diasEscala.forEach(culto => {
        const atribuicoes = dadosEscala[culto.id];
        if (!atribuicoes) return;

        Object.entries(atribuicoes).forEach(([idx, pId]) => {
          if (pId) {
            const dataISO = `${a}-${String(m + 1).padStart(2, '0')}-${String(culto.dia).padStart(2, '0')}`;
            registros.push({
              data: dataISO,
              tipo_escala: tipo,
              cargo_index: parseInt(idx),
              pessoa_id: pId
            });
          }
        });
      });

      const { error } = await supabase
        .from('escalas_atribuicoes')
        .upsert(registros, { onConflict: 'data,tipo_escala,cargo_index' });

      if (error) throw error;
      setStatus("Escala salva no banco!");
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    } finally { setCarregando(false); setTimeout(() => setStatus(""), 3000); }
  };

  const handleExportarJPG = async (isDownloadOnly = false) => {
    setStatus("Gerando imagem HD...");
    setCarregando(true);
    const container = document.createElement('div');

    try {
      const paleta = PALETAS_EXPORTACAO[Math.floor(Math.random() * PALETAS_EXPORTACAO.length)];
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      
      const styleTag = document.createElement('style');
      styleTag.innerHTML = exportStyles;
      container.appendChild(styleTag);

      const content = document.createElement('div');
      content.className = 'export-page';
      content.style.background = `linear-gradient(135deg, ${paleta.bgA} 0%, ${paleta.bgB} 48%, ${paleta.bgC} 100%)`;

      const domingos = diasEscala.filter(d => d.semana === 0).length;
      const quintas = diasEscala.filter(d => d.semana === 4).length;

      content.innerHTML = `
        <div class="export-header" style="background: ${paleta.panel}">
          <div class="export-logo-text" style="background: ${paleta.pillA}">MIB CHURCH</div>
          <div>
            <div class="export-kicker" style="color: ${paleta.accent}">Escala de ${tipo}</div>
            <h1 class="export-title" style="color: ${paleta.ink}">${MESES[mes].toUpperCase()}</h1>
          </div>
          <div class="export-year-pill" style="background: linear-gradient(135deg, ${paleta.pillA}, ${paleta.pillB})">${ano}</div>
          <div class="export-stats">
            <div class="export-stat-card"><span>Datas</span><strong>${diasEscala.length}</strong></div>
            <div class="export-stat-card"><span>Dom</span><strong>${domingos}</strong></div>
            <div class="export-stat-card"><span>Qui</span><strong>${quintas}</strong></div>
          </div>
        </div>
        <div class="export-list" style="background: ${paleta.panel}CC">
          ${diasEscala.map(culto => {
            const atribuicoes = dadosEscala[culto.id] || {};
            const cargos = CONFIG_ESCALAS[tipo];
            return `
              <div class="export-item">
                <div class="export-date">
                  <span style="color: ${paleta.accent}">${culto.tipoDia}</span>
                  <strong style="color: ${paleta.ink}">${culto.dia}</strong>
                </div>
                <div class="export-roles">
                  ${cargos.map((cargo, idx) => {
                    const pId = atribuicoes[idx];
                    const pessoa = equipe.find(p => p.id === pId);
                    const partes = pessoa ? pessoa.nome.trim().split(' ') : [];
                    const nomeCurto = partes.length > 1 ? `${partes[0]} ${partes[partes.length - 1]}` : (partes[0] || '-');
                    return `
                      <div class="export-role-box">
                        <span>${cargo}</span>
                        <strong>${nomeCurto}</strong>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <div class="export-footer">MIB Church - Agenda Ministerial</div>
      `;

      container.appendChild(content);
      document.body.appendChild(container);

      const canvas = await html2canvas(content, {
        scale: 2,
        width: 1080,
        height: 1920,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Escala_${tipo}_${MESES[mes]}.png`;
      link.href = imgData;
      
      if (navigator.share && !isDownloadOnly) {
        const blob = await (await fetch(imgData)).blob();
        const file = new File([blob], link.download, { type: 'image/png' });
        await navigator.share({ files: [file], title: 'Escala Ministerial' }).catch(() => link.click());
      } else {
        link.click();
      }

      setStatus("Imagem gerada com sucesso!");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao gerar imagem");
    } finally {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setCarregando(false);
    }
  };

  const handleSalvarEquipeModal = async (e) => {
    e.preventDefault();
    if (selecionadosModal.length === 0) return;

    setCarregando(true);
    const novosRegistros = selecionadosModal.map(pessoaId => ({
      tipo_escala: tipo, 
      pessoa_id: pessoaId 
    }));
    
    const { error } = await supabase
      .from('equipes_escala')
      .insert(novosRegistros); // Usamos insert simples. Se houver duplicata, o RLS/Unique tratará.

    if (error) {
      if (error.code === '23505') setStatus("Alguns nomes já estavam na lista");
      else setStatus("Erro ao atualizar equipe");
    } else {
      await carregarEquipe();
      setIsModalEquipeAberto(false);
      setSelecionadosModal([]);
      setBuscaModal("");
      setStatus(`Equipe ${tipo} atualizada`);
    }
    setCarregando(false);
  };

  const removerMembroEquipe = async (pessoaId) => {
    if (!window.confirm("Remover este membro da equipe selecionada?")) return;
    
    const { error } = await supabase
      .from('equipes_escala')
      .delete()
      .eq('tipo_escala', tipo)
      .eq('pessoa_id', pessoaId);

    if (!error) {
      await carregarEquipe();
      setStatus("Membro removido");
      setTimeout(() => setStatus(""), 1500);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        titulo={<>Escala de <span className={TIPO_COLORS[tipo] || "text-[#2563eb]"}>{tipo}</span></>}
      />

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* ÁREA PRINCIPAL: LISTA DE DATAS */}
        <div className={`flex-1 min-w-0 grid grid-cols-1 xl:grid-cols-2 gap-4 ${carregando ? 'opacity-50 pointer-events-none' : ''}`}>
          {diasEscala.map((culto) => {
            const isDomingo = culto.semana === 0;
            const corBordaStyle = isDomingo ? '#ef4444' : '#1d8b07';
            const corTextoDia = isDomingo ? 'text-red-700' : 'text-[#1d8b07]';
            const corChip = TIPO_CHIP_COLORS[tipo] || 'bg-blue-50 text-blue-600 border-blue-100';

            return (
              <Card key={culto.id} className="p-4 shadow-sm" style={{ borderLeft: `4px solid ${corBordaStyle}` }}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-baseline gap-2">
                  <strong className="text-3xl text-slate-800 tracking-tighter">{culto.dia}</strong>
                  <span className={`text-xs font-black uppercase ${corTextoDia}`}>{culto.tipoDia}</span>
                </div>
                <span className={`text-[10px] ${corChip} px-2 py-0.5 rounded-full font-black uppercase border`}>{tipo}</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {CONFIG_ESCALAS[tipo].map((cargo, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cargo}</label>
                    <select 
                      value={dadosEscala[culto.id]?.[idx] || ""}
                      onChange={(e) => handleSalvarAtribuicao(culto, idx, e.target.value)}
                      className={`w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold bg-slate-50 text-slate-700 outline-none ${isDomingo ? 'focus:border-red-500' : 'focus:border-[#1d8b07]'} focus:bg-white transition-all cursor-pointer`}
                    >
                      <option value="">- Selecionar -</option>
                      {equipe.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </Card>
            );
          })}
        </div>

        {/* PAINEL DE CONTROLE (DIREITA) */}
        <aside className="w-full lg:w-[300px] shrink-0 space-y-4 lg:sticky lg:top-24">
          <Card className="p-0 overflow-hidden shadow-md">
            <CardHeader titulo="Configurações" />
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Tipo de Escala</label>
                <select value={tipo} onChange={e => setTipo(e.target.value)} className={`w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-[#2563eb]/20 font-bold ${TIPO_COLORS[tipo] || 'text-[#1e3a8a]'} cursor-pointer shadow-sm`}>
                  {Object.keys(CONFIG_ESCALAS).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Mês</label>
                  <select value={mes} onChange={e => setMes(parseInt(e.target.value))} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white outline-none cursor-pointer text-slate-600 font-medium">{MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}</select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Ano</label>
                  <select value={ano} onChange={e => setAno(parseInt(e.target.value))} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white outline-none cursor-pointer text-slate-600 font-medium">{[2024, 2025, 2026, 2027].map(a => <option key={a} value={a}>{a}</option>)}</select>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-0 overflow-hidden shadow-md">
            <CardHeader titulo={`Equipe: ${tipo}`} subtitulo="Pool de nomes autorizados." />
            <div className="p-4 space-y-3">
              <button 
                type="button" 
                onClick={() => setIsModalEquipeAberto(true)}
                className={`w-full py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 text-[9px] font-black uppercase hover:bg-slate-50 transition flex items-center justify-center gap-2 hover:border-[#2563eb] hover:text-[#2563eb]`}
              >
                + Gerenciar Lista
              </button>

              <div className="flex flex-wrap gap-1.5 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                {equipe.length === 0 && <p className="text-[10px] text-slate-400 italic py-2">Nenhum membro vinculado.</p>}
                {equipe.map(p => (
                  <span key={p.id} className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 shadow-xs group transition hover:border-rose-300">
                    {p.nome}
                    <button type="button" onClick={() => removerMembroEquipe(p.id)} className="text-slate-300 hover:text-rose-600 transition">✕</button>
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5 text-center space-y-4 bg-gradient-to-br from-white to-blue-50/30 shadow-md">
            <button onClick={handleSalvarEscalaGeral} disabled={carregando} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">💾 Salvar Escala no Banco</button>
            <div className="h-px bg-slate-200 my-2" />
            <div className="space-y-2">
              <button onClick={() => handleExportarJPG(false)} disabled={carregando} className="w-full py-3 rounded-xl bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                <span>📲</span> Compartilhar PNG HD
              </button>
              <button onClick={() => handleExportarJPG(true)} disabled={carregando} className="w-full py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-black text-[10px] uppercase tracking-wider transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                <span>📥</span> Baixar para o Dispositivo
              </button>
            </div>
            <button onClick={() => window.print()} className="w-full py-2 text-slate-400 text-[10px] font-bold uppercase hover:text-slate-600 transition">Ou Imprimir em PDF</button>
            <button onClick={() => setMostrarPreview(!mostrarPreview)} className={`w-full py-2 text-[10px] font-black uppercase transition-all ${mostrarPreview ? 'text-rose-500' : 'text-blue-500 hover:underline'}`}>{mostrarPreview ? '🙈 Esconder Preview' : '👁️ Visualizar Layout'}</button>
            {status && <p className="mt-3 text-[10px] font-black text-[#2563eb] animate-pulse uppercase">{status}</p>}
          </Card>
        </aside>
      </div>

      {/* MODO PREVIEW PARA AJUSTE DE LAYOUT */}
      {mostrarPreview && (
        <div className="mt-10 p-6 md:p-10 bg-slate-900 rounded-[40px] border border-slate-800 flex flex-col items-center shadow-2xl">
          <div className="mb-8 flex flex-col md:flex-row items-center gap-6 w-full max-w-4xl justify-between">
            <div>
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Visualização de Design</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase">Proporção Real 1080x1920 (Visualizando em escala reduzida)</p>
            </div>
            <div className="flex gap-3 bg-slate-800 p-2 rounded-2xl border border-slate-700">
              {PALETAS_EXPORTACAO.map((p, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setPaletaPreview(p)} 
                  className={`w-8 h-8 rounded-full border-2 transition-transform active:scale-90 ${paletaPreview === p ? 'border-white scale-110' : 'border-transparent opacity-50'}`}
                  style={{ background: `linear-gradient(135deg, ${p.bgA}, ${p.bgC})` }}
                />
              ))}
            </div>
          </div>
          
          <style>{exportStyles}</style>
          
          {/* O container abaixo simula o Story do Instagram */}
          <div className="relative shadow-[0_0_100px_rgba(0,0,0,0.5)] border-[12px] border-slate-800 rounded-[60px] overflow-hidden origin-top scale-[0.3] sm:scale-[0.4] md:scale-[0.5]" style={{ width: '1080px', height: '1920px' }}>
            <div className="export-page" style={{ background: `linear-gradient(135deg, ${paletaPreview.bgA} 0%, ${paletaPreview.bgB} 48%, ${paletaPreview.bgC} 100%)`, height: '100%', width: '100%' }}>
              <div className="export-header" style={{ background: paletaPreview.panel }}>
                <div className="export-logo-text" style={{ background: paletaPreview.pillA }}>MIB CHURCH</div>
                <div>
                  <div className="export-kicker" style={{ color: paletaPreview.accent }}>Escala de {tipo}</div>
                  <h1 className="export-title" style={{ color: paletaPreview.ink }}>{MESES[mes].toUpperCase()}</h1>
                </div>
                <div className="export-year-pill" style={{ background: `linear-gradient(135deg, ${paletaPreview.pillA}, ${paletaPreview.pillB})` }}>{ano}</div>
                <div className="export-stats">
                  <div className="export-stat-card"><span>Datas</span><strong>{diasEscala.length}</strong></div>
                  <div className="export-stat-card"><span>Dom</span><strong>{diasEscala.filter(d => d.semana === 0).length}</strong></div>
                  <div className="export-stat-card"><span>Qui</span><strong>{diasEscala.filter(d => d.semana === 4).length}</strong></div>
                </div>
              </div>
              <div className="export-list" style={{ background: paletaPreview.panel + 'CC' }}>
                {diasEscala.map(culto => {
                  const atribuicoes = dadosEscala[culto.id] || {};
                  const cargos = CONFIG_ESCALAS[tipo];
                  return (
                    <div key={culto.id} className="export-item">
                      <div className="export-date">
                        <span style={{ color: paletaPreview.accent }}>{culto.tipoDia}</span>
                        <strong style={{ color: paletaPreview.ink }}>{culto.dia}</strong>
                      </div>
                      <div className="export-roles">
                        {cargos.map((cargo, idx) => {
                          const pId = atribuicoes[idx];
                          const pessoa = equipe.find(p => p.id === pId);
                          const partes = pessoa ? pessoa.nome.trim().split(' ') : [];
                          const nomeCurto = partes.length > 1 ? `${partes[0]} ${partes[partes.length - 1]}` : (partes[0] || '-');
                          return (
                            <div key={idx} className="export-role-box">
                              <span>{cargo}</span>
                              <strong>{nomeCurto}</strong>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="export-footer">MIB Church - Agenda Ministerial</div>
            </div>
          </div>
          <p className="text-slate-600 text-[10px] mt-[-400px] md:mt-[-450px] font-bold uppercase">Fim da visualização</p>
        </div>
      )}

      {/* MODAL DE VÍNCULO DE EQUIPE (ESTILO CÉLULAS) */}
      {isModalEquipeAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h4 className="font-semibold text-slate-950 text-base tracking-tight">Vincular Membros</h4>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Adicionando à Equipe de: <span className={TIPO_COLORS[tipo]}>{tipo}</span></p>
              </div>
              <button type="button" onClick={() => { setIsModalEquipeAberto(false); setSelecionadosModal([]); setBuscaModal(""); }} className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm">✕</button>
            </div>

            <div className="p-4 bg-white border-b border-slate-100">
              <input 
                type="text"
                placeholder="Buscar membro na base..."
                value={buscaModal}
                onChange={(e) => setBuscaModal(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2563eb]/20"
              />
            </div>

            <form onSubmit={handleSalvarEquipeModal} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 overflow-y-auto space-y-2 flex-1 max-h-80 custom-scrollbar">
                {membrosDisponiveis.length === 0 ? (
                  <p className="text-center py-10 text-xs text-slate-400 italic">Nenhum membro disponível para vincular.</p>
                ) : (
                  membrosDisponiveis.map((p) => {
                    const marcado = selecionadosModal.includes(p.id);
                    return (
                      <label 
                        key={p.id} 
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${marcado ? 'bg-blue-50 border-blue-200 text-blue-900 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'}`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={marcado}
                            onChange={() => setSelecionadosModal(prev => marcado ? prev.filter(id => id !== p.id) : [...prev, p.id])}
                            className="h-4 w-4 rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]" 
                          />
                          <span className="text-xs font-bold">{p.nome}</span>
                        </div>
                        {marcado && <span className="text-[9px] font-black text-blue-500 uppercase">Selecionado</span>}
                      </label>
                    );
                  })
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase">
                  {selecionadosModal.length} selecionado(s)
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => { setIsModalEquipeAberto(false); setSelecionadosModal([]); setBuscaModal(""); }} 
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={carregando || selecionadosModal.length === 0} 
                    className="bg-[#2563eb] hover:bg-[#1e40af] text-white font-black text-[10px] uppercase px-5 py-2.5 rounded-xl transition disabled:opacity-50 shadow-md shadow-blue-200"
                  >
                    {carregando ? 'Salvando...' : 'Vincular à Equipe'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
