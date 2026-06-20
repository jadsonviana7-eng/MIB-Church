import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, Avatar, DoughnutCard, CombinationCard, ColumnChart, StatCard, ModalWrapper } from './ui';
import { MenuIcons } from './icons'; 
import { meses, faixasEtarias, faixaDaIdade, agrupamentoPor, nomeZona } from './churchUtils';
import PainelAprovacoes from './PainelAprovacoes';
import { 
  Users, Home, Flame, Calendar, DollarSign, Award, Sparkles,
  ChevronRight, Smile, MapPin, TrendingUp, BookOpen, AlertCircle,
  Coins, Zap, Plus, ShieldAlert, TrendingDown, Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function HomePage({ 
  onNavigate, 
  hasAccess, 
  membroLogado, 
  pessoas = [], 
  celulas = [], 
  zonas = [], 
  relatoriosCelula = [],
  onVerMembro = () => {},
  onVerReuniao = () => {},
  reunioesVistas = []
}) {
  const [abaAtiva, setAbaAtiva] = useState('visao_geral');
  
  // Estados para dados de aviso e igreja
  const [avisos, setAvisos] = useState([]);
  const [carregandoAvisos, setCarregandoAvisos] = useState(true);
  const [dadosIgreja, setDadosIgreja] = useState(null);
  const [modalAvisoAberto, setModalAvisoAberto] = useState(false);
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);
  const scrollRef = useRef(null);

  // Estados para dados financeiros (carregados sob demanda com tratamento de erro/RLS)
  const [financeLoading, setFinanceLoading] = useState(false);
  const [financeData, setFinanceData] = useState(null);
  const [hasFinanceAccess, setHasFinanceAccess] = useState(true);

  // Rolagem manual do carrossel de avisos
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Carrega avisos ativos
  useEffect(() => {
    let isMounted = true;
    async function carregarAvisos() {
      try {
        const hoje = new Date().toISOString().split('T')[0];
        const { data } = await supabase
          .from('mural_avisos')
          .select('*')
          .eq('ativo', true)
          .or(`data_expiracao.is.null,data_expiracao.gte.${hoje}`)
          .order('prioridade', { ascending: false });
        if (isMounted) {
          setAvisos(data || []);
          setCarregandoAvisos(false);
        }
      } catch (err) {
        console.warn('Erro ao carregar avisos:', err);
        if (isMounted) setCarregandoAvisos(false);
      }
    }
    carregarAvisos();
    return () => { isMounted = false; };
  }, []);

  // Carrega dados da igreja (logo, nome, etc.)
  useEffect(() => {
    async function fetchDadosIgreja() {
      try {
        const { data, error } = await supabase.from('dados_igreja').select('*').eq('id', 1).maybeSingle();
        if (!error && data) setDadosIgreja(data);
      } catch (err) {
        console.warn('Erro ao carregar dados da igreja:', err);
      }
    }
    fetchDadosIgreja();
  }, []);

  // 1. Processamento Geral de Pessoas Ativas
  const pessoasAtivas = useMemo(() => pessoas.filter(p => p.status !== 'inativo'), [pessoas]);
  const totalPessoasAtivas = pessoasAtivas.length;
  const totalCelulasAtivas = useMemo(() => celulas.length, [celulas]);

  // 2. Taxa de Batismo
  const totalBatizados = useMemo(() => pessoasAtivas.filter(p => p.batizado_aguas === true).length, [pessoasAtivas]);
  const taxaBatismo = useMemo(() => {
    if (totalPessoasAtivas === 0) return 0;
    return Math.round((totalBatizados / totalPessoasAtivas) * 100);
  }, [totalBatizados, totalPessoasAtivas]);

  // 3. Novos Convertidos (Mês Atual)
  const novosConvertidosMes = useMemo(() => {
    const hoje = new Date();
    const mesCorrente = hoje.getMonth();
    const anoCorrente = hoje.getFullYear();
    return pessoasAtivas.filter(p => {
      if (!p.data_conversao) return false;
      const d = new Date(`${p.data_conversao}T00:00:00`);
      return d.getMonth() === mesCorrente && d.getFullYear() === anoCorrente;
    }).length;
  }, [pessoasAtivas]);

  // 4. Média de Visitantes e Frequência das Células
  const totalReunioes = relatoriosCelula.length;
  const mediaVisitantes = useMemo(() => {
    if (totalReunioes === 0) return 0;
    const soma = relatoriosCelula.reduce((acc, r) => acc + Number(r.visitantes_presentes || 0), 0);
    return (soma / totalReunioes).toFixed(1);
  }, [relatoriosCelula, totalReunioes]);

  // 5. Ofertas Coletadas nas Células no Mês Atual
  const ofertasCelulasMes = useMemo(() => {
    const hoje = new Date();
    const mesCorrente = hoje.getMonth();
    const anoCorrente = hoje.getFullYear();
    return relatoriosCelula
      .filter(r => {
        if (!r.data_reuniao) return false;
        const d = new Date(`${r.data_reuniao}T00:00:00`);
        return d.getMonth() === mesCorrente && d.getFullYear() === anoCorrente;
      })
      .reduce((acc, r) => acc + Number(r.valor_oferta || 0), 0);
  }, [relatoriosCelula]);

  // 6. Dados de Localidade e Demografia
  const zonasDados = useMemo(() => agrupamentoPor(pessoasAtivas, (p) => nomeZona(zonas, p.zona_id)), [pessoasAtivas, zonas]);
  const faixasDados = useMemo(() => agrupamentoPor(pessoasAtivas, (p) => faixasEtarias.find((f) => f.id === faixaDaIdade(p.data_nascimento))?.curto || 'Não informada'), [pessoasAtivas]);
  const faixasCelulas = useMemo(() => agrupamentoPor(celulas, (c) => c.faixa_etaria || 'Não informada'), [celulas]);

  const aniversariantesMes = useMemo(() => pessoasAtivas.filter((p) => {
    if (!p.data_nascimento) return false;
    return new Date(`${p.data_nascimento}T00:00:00`).getMonth() === new Date().getMonth();
  }), [pessoasAtivas]);

  // Proporção de Gênero
  const generoStats = useMemo(() => {
    const total = totalPessoasAtivas || 1;
    const homens = pessoasAtivas.filter(p => p.genero?.toLowerCase() === 'masculino').length;
    const mulheres = pessoasAtivas.filter(p => p.genero?.toLowerCase() === 'feminino').length;
    return {
      homens,
      mulheres,
      pctHomens: Math.round((homens / total) * 100),
      pctMulheres: Math.round((mulheres / total) * 100),
    };
  }, [pessoasAtivas, totalPessoasAtivas]);

  // 7. Consulta de Finanças (Efetuada apenas se necessário / Aba ativa)
  const fetchFinanceData = useCallback(async () => {
    setFinanceLoading(true);
    try {
      const { data, error } = await supabase
        .from('transacoes_financeiras')
        .select('*')
        .eq('status', 'pago');

      if (error) {
        setHasFinanceAccess(false);
        console.warn('Acesso financeiro negado para o dashboard:', error);
      } else if (data) {
        setHasFinanceAccess(true);
        const hoje = new Date();
        const mesCorrente = hoje.getMonth();
        const anoCorrente = hoje.getFullYear();

        let receitasMes = 0;
        let despesasMes = 0;
        let saldoTotal = 0;

        data.forEach(t => {
          const valor = Number(t.valor) || 0;
          const dataT = new Date(t.data + 'T00:00:00');
          const isMesAtual = dataT.getMonth() === mesCorrente && dataT.getFullYear() === anoCorrente;

          if (t.tipo === 'receita') {
            saldoTotal += valor;
            if (isMesAtual) receitasMes += valor;
          } else if (t.tipo === 'despesa') {
            saldoTotal -= valor;
            if (isMesAtual) despesasMes += valor;
          }
        });

        // Histórico dos últimos 6 meses para o mini-gráfico
        const ultimos6Meses = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date();
          d.setMonth(hoje.getMonth() - i);
          const mesNome = meses[d.getMonth()].substring(0, 3);
          const anoRef = d.getFullYear();
          const mesIndex = d.getMonth();

          let rec = 0;
          let desp = 0;

          data.forEach(t => {
            const dataT = new Date(t.data + 'T00:00:00');
            if (dataT.getMonth() === mesIndex && dataT.getFullYear() === anoRef) {
              if (t.tipo === 'receita') rec += Number(t.valor) || 0;
              if (t.tipo === 'despesa') desp += Number(t.valor) || 0;
            }
          });

          ultimos6Meses.push({
            name: `${mesNome}/${String(anoRef).substring(2)}`,
            Receitas: rec,
            Despesas: desp,
            Saldo: rec - desp
          });
        }

        const transacoesRecentes = [...data]
          .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
          .slice(0, 5);

        setFinanceData({
          receitasMes,
          despesasMes,
          saldoMes: receitasMes - despesasMes,
          saldoTotal,
          transacoesRecentes,
          graficoData: ultimos6Meses
        });
      }
    } catch (err) {
      setHasFinanceAccess(false);
      console.warn('Erro ao carregar dados de finanças:', err);
    } finally {
      setFinanceLoading(false);
    }
  }, [meses]);

  useEffect(() => {
    if (abaAtiva === 'financas') {
      fetchFinanceData();
    }
  }, [abaAtiva, fetchFinanceData]);

  // Formatador de Moeda BRL
  const formatarBRL = (valor) => {
    return Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const abrirModalAviso = useCallback((aviso) => {
    setAvisoSelecionado(aviso);
    setModalAvisoAberto(true);
  }, []);

  const fecharModalAviso = useCallback(() => {
    setModalAvisoAberto(false);
    setAvisoSelecionado(null);
  }, []);

  const handleActionAviso = useCallback((av) => {
    if (av.link_externo) {
      window.open(av.link_externo, '_blank', 'noopener,noreferrer');
    } else {
      abrirModalAviso(av);
    }
  }, [abrirModalAviso]);

  // Grid de Módulos (Substituído Configurações por Gestor Ministerial)
  const filteredModules = useMemo(() => {
    const rawModules = [
      { id: 'pessoas', label: 'Pessoas', accessLabel: 'Pessoas', icon: MenuIcons.pessoas, submenu: 'todos', desc: 'Membros e aniversários' },
      { id: 'celulas', label: 'Células', accessLabel: 'Células', icon: MenuIcons.celulas, submenu: 'lista', desc: 'Relatórios e reuniões' },
      { id: 'financeiro', label: 'Financeiro', accessLabel: 'Financeiro', icon: MenuIcons.financeiro, submenu: 'resumo', desc: 'Fluxo e transações' },
      { id: 'escolas', label: 'Escolas', accessLabel: 'Escolas', icon: MenuIcons.escolas, submenu: 'resumo', desc: 'Ensino bíblico e turmas' },
      { id: 'agenda', label: 'Agenda', accessLabel: 'Agenda', icon: MenuIcons.agenda, submenu: 'calendario', desc: 'Eventos e compromissos' },
      { id: 'utilitarios', label: 'Utilitários', accessLabel: 'Utilitários', icon: MenuIcons.utilitarios, submenu: 'escalas', desc: 'Ferramentas e testes' },
      { id: 'gestao', label: 'Gestor Ministerial', accessLabel: 'Gestão Ministerial', icon: MenuIcons.gestaoMinisterial, submenu: 'escalas', desc: 'Equipes e escalas' },
    ];
    return rawModules.filter(mod => hasAccess(mod.accessLabel));
  }, [hasAccess]);

  const nomeUsuario = membroLogado?.nome || 'Usuário';
  const cargoUsuario = membroLogado?.tipo_membro || 'Membro';

  return (
    <div className="space-y-5 pb-6">
      
      {/* 1. CABEÇALHO MOBILE PREMIUM */}
      <div className="flex items-center justify-between p-4 bg-linear-to-r from-[#202046] to-[#2a2a6b] text-white rounded-2xl shadow-md gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {membroLogado?.foto_url ? (
            <img 
              src={membroLogado.foto_url} 
              alt={nomeUsuario} 
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-white/15 shrink-0" 
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center font-bold text-blue-200 ring-2 ring-white/15 shrink-0">
              {nomeUsuario.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <span className="block text-[9px] text-slate-300 font-bold uppercase tracking-wider">Bem-vindo</span>
            <h2 className="text-sm font-extrabold truncate text-blue-50" title={nomeUsuario}>{nomeUsuario}</h2>
          </div>
        </div>
        <div className="shrink-0">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-blue-500/25 text-blue-200 border border-blue-500/30">
            {cargoUsuario}
          </span>
        </div>
      </div>

      {/* 2. NOME DA IGREJA EM CIMA E LOGO ABAIXO MAIOR */}
      <div className="flex flex-col items-center justify-center py-2 text-center">
        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
          {dadosIgreja?.nome || 'MIB Church'}
        </span>
        <img 
          src={dadosIgreja?.logo_url || '/logo-betesda.png'} 
          alt="Logo" 
          className="h-16 sm:h-20 object-contain mt-2.5 drop-shadow-xs" 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* 3. MENU DE ABAS MOBILE (TABS NAVIGATION) */}
      <div className="flex bg-white/70 backdrop-blur-md p-1 rounded-xl shadow-xs border border-slate-200/80 overflow-x-auto scrollbar-hide gap-1">
        {[
          { id: 'visao_geral', label: 'Geral', icon: <Users size={14} /> },
          { id: 'celulas', label: 'Células', icon: <Home size={14} /> },
          { id: 'demografia', label: 'Demografia', icon: <Activity size={14} /> },
          { id: 'financas', label: 'Financeiro', icon: <Coins size={14} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAbaAtiva(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
              abaAtiva === tab.id 
                ? 'bg-[#1e3a8a] text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 4. CONTEÚDO DAS ABAS ADAPTADAS MOBILE */}
      <div className="animate-in fade-in duration-300">
        
        {/* ── ABA 1: VISÃO GERAL (INCLUI AVISOS E ATALHOS) ── */}
        {abaAtiva === 'visao_geral' && (
          <div className="space-y-5">
            {/* 3. Mini stats cards com ícones */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white rounded-xl border border-slate-100 p-2.5 text-center shadow-xs flex flex-col items-center justify-center">
                <Users size={14} className="text-blue-500 mb-1" />
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Membros</span>
                <span className="block text-sm font-black text-slate-850 mt-0.5">{totalPessoasAtivas}</span>
              </div>
              <div className="bg-white rounded-xl border border-slate-100 p-2.5 text-center shadow-xs flex flex-col items-center justify-center">
                <Home size={14} className="text-emerald-500 mb-1" />
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Células</span>
                <span className="block text-sm font-black text-slate-850 mt-0.5">{totalCelulasAtivas}</span>
              </div>
              <div className="bg-white rounded-xl border border-slate-100 p-2.5 text-center shadow-xs flex flex-col items-center justify-center">
                <Award size={14} className="text-amber-500 mb-1" />
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Batismo</span>
                <span className="block text-sm font-black text-amber-600 mt-0.5">{taxaBatismo}%</span>
              </div>
            </div>

            {/* MURAL DE AVISOS (Dynamic Carousel) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Mural de Avisos</h3>
                {avisos.length > 1 && (
                  <div className="flex gap-1">
                    <button 
                      onClick={() => scroll('left')}
                      className="w-5.5 h-5.5 bg-white border border-slate-150 rounded-md flex items-center justify-center text-slate-400 active:bg-slate-50 shadow-3xs cursor-pointer"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button 
                      onClick={() => scroll('right')}
                      className="w-5.5 h-5.5 bg-white border border-slate-150 rounded-md flex items-center justify-center text-slate-400 active:bg-slate-50 shadow-3xs cursor-pointer"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                )}
              </div>

              {carregandoAvisos ? (
                <div className="h-28 bg-white rounded-xl border border-slate-100 animate-pulse flex items-center justify-center text-[10px] text-slate-400">
                  Carregando comunicados...
                </div>
              ) : avisos.length === 0 ? (
                <div className="p-4 bg-white border border-slate-100 rounded-xl text-center text-[10px] text-slate-400 italic">
                  Nenhum aviso ativo para exibição.
                </div>
              ) : (
                <div 
                  ref={scrollRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3.5 pb-1"
                >
                  {avisos.map(av => (
                    <div 
                      key={av.id} 
                      onClick={() => handleActionAviso(av)}
                      className="snap-start shrink-0 w-full bg-white border border-slate-100 rounded-xl shadow-3xs overflow-hidden flex flex-col justify-between active:scale-[0.98] transition-all cursor-pointer"
                    >
                      {av.imagem_url && (
                        <div className="w-full h-24 overflow-hidden bg-slate-50 shrink-0">
                          <img src={av.imagem_url} className="w-full h-full object-cover" alt="" />
                        </div>
                      )}
                      <div className="p-3.5 flex flex-col justify-between flex-1 min-h-[80px]">
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-[11px] leading-snug line-clamp-1">{av.titulo}</h4>
                          <p className="text-[9px] text-slate-500 font-medium mt-0.5 line-clamp-2 leading-relaxed">{av.subtitulo}</p>
                        </div>
                        <div className="mt-2.5 pt-1.5 border-t border-slate-50 flex items-center justify-between text-[7px] font-black uppercase text-slate-400 tracking-wider">
                          <span>{new Date(av.created_at).toLocaleDateString('pt-BR')}</span>
                          {(av.link_externo || av.conteudo_html) && (
                            <span className="text-blue-600 font-bold">
                              {av.link_externo ? 'Link' : 'Ler mais'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ATALHOS DOS MÓDULOS (Settings replaced with Gestor Ministerial) */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-1">Módulos de Acesso</h3>
              <div className="grid grid-cols-2 gap-3">
                {filteredModules.map((mod, idx) => (
                  <button
                    key={mod.id}
                    onClick={() => onNavigate(mod.id, mod.submenu)}
                    className={`p-3.5 bg-white rounded-xl border border-slate-100 shadow-3xs hover:shadow-2xs active:scale-95 transition-all flex flex-col items-center justify-center text-center group cursor-pointer ${
                      idx === filteredModules.length - 1 && filteredModules.length % 2 !== 0 ? 'col-span-2' : ''
                    }`}
                  >
                    <div className="w-10 h-10 bg-linear-to-br from-[#202046]/5 to-[#2f2f80]/10 text-[#202046] rounded-lg flex items-center justify-center text-base mb-2 group-hover:scale-110 transition-transform">
                      {mod.icon}
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-[10px] leading-none tracking-tight">{mod.label}</h4>
                    <span className="block text-[8px] text-slate-400 font-medium mt-1 line-clamp-1">
                      {mod.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aniversariantes do Mês (Compacto) */}
            <div className="bg-white rounded-xl border border-slate-150 p-4 shadow-3xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <div className="flex items-center gap-1.5">
                  <Smile className="text-amber-500" size={15} />
                  <h4 className="font-bold text-slate-800 text-xs">Aniversariantes do Mês</h4>
                </div>
                <span className="text-[8px] font-black uppercase bg-amber-50 border border-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                  {aniversariantesMes.length}
                </span>
              </div>
              
              {aniversariantesMes.length === 0 ? (
                <p className="text-center text-[10px] text-slate-400 italic py-2">Nenhum aniversariante no mês.</p>
              ) : (
                <div className="max-h-[220px] overflow-y-auto pr-1 space-y-2 scrollbar-hide">
                  {aniversariantesMes.slice(0, 5).map((pessoa) => (
                    <div 
                      key={pessoa.id} 
                      onClick={() => onVerMembro(pessoa.id)}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Avatar pessoa={pessoa} tamanho="w-8 h-8" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 text-[11px] truncate max-w-[120px]">{pessoa.nome}</p>
                          <p className="text-[8px] text-slate-400 font-semibold uppercase">
                            {pessoa.celulas?.nome || 'Sem Célula'}
                          </p>
                        </div>
                      </div>
                      <div className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-black text-slate-600 shrink-0">
                        {new Date(`${pessoa.data_nascimento}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Painel de Aprovações */}
            <PainelAprovacoes onVerDetalhes={onVerMembro} onAprovado={() => {}} />
          </div>
        )}

        {/* ── ABA 2: CÉLULAS & ENGAJAMENTO (MOBILE) ── */}
        {abaAtiva === 'celulas' && (
          <div className="space-y-5">
            {/* StatCards compactas */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard 
                label="Células" 
                valor={totalCelulasAtivas} 
                detalhe="Ativas" 
                icone={<div className="p-1.5 rounded-lg bg-blue-50 border border-blue-100"><Home className="w-5 h-5 text-blue-600" /></div>}
                className="p-3 flex-col"
              />
              <StatCard 
                label="Reuniões" 
                valor={totalReunioes} 
                detalhe="Relatórios" 
                icone={<div className="p-1.5 rounded-lg bg-purple-50 border border-purple-100"><BookOpen className="w-5 h-5 text-purple-600" /></div>}
                className="p-3 flex-col"
              />
              <StatCard 
                label="Média Vis." 
                valor={mediaVisitantes} 
                detalhe="Por Reunião" 
                icone={<div className="p-1.5 rounded-lg bg-pink-50 border border-pink-100"><Users className="w-5 h-5 text-pink-600" /></div>}
                className="p-3 flex-col"
              />
              <StatCard 
                label="Ofertas" 
                valor={formatarBRL(ofertasCelulasMes)} 
                detalhe="Nas Células" 
                icone={<div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-100"><Coins className="w-5 h-5 text-emerald-600" /></div>}
                className="p-3 flex-col font-medium"
              />
            </div>

            {/* Rosca Faixa Etária Celulas */}
            <DoughnutCard titulo="Faixa etária das células" dados={faixasCelulas} />

            {/* Reuniões recentes adaptadas para mobile */}
            <div className="bg-white rounded-xl border border-slate-150 p-4 shadow-3xs space-y-3">
              <div className="border-b border-slate-50 pb-2">
                <h4 className="font-bold text-slate-800 text-xs">Reuniões Recentes</h4>
                <p className="text-[9px] text-slate-400">Toque para abrir o relatório</p>
              </div>

              {relatoriosCelula.length === 0 ? (
                <p className="text-center text-[10px] text-slate-400 italic py-6">Nenhuma reunião registrada.</p>
              ) : (
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-0.5 scrollbar-hide">
                  {relatoriosCelula.slice(0, 6).map((relatorio) => {
                    const isUsuarioPastor = ['pastor', 'admin'].includes(membroLogado?.permissao);
                    const isNovo = isUsuarioPastor && !reunioesVistas.includes(String(relatorio.id));

                    return (
                      <div 
                        key={relatorio.id} 
                        onClick={() => onVerReuniao && onVerReuniao(relatorio.id)}
                        className={`p-3 border rounded-xl space-y-2.5 active:bg-slate-100/85 transition-all cursor-pointer ${
                          isNovo 
                            ? 'bg-blue-50/30 border-blue-200/85 shadow-3xs' 
                            : 'bg-slate-50 border-slate-100'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
                            {isNovo && (
                              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
                            )}
                            {relatorio.celulas?.nome || 'Célula'}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold">
                            {relatorio.data_reuniao ? new Date(`${relatorio.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-50/60 border border-blue-100/60 shadow-3xs">
                            <span className="text-base font-black text-blue-700 leading-none">
                              {relatorio.presencas_relatorio?.[0]?.count || 0}
                            </span>
                            <span className="text-[9px] font-bold text-blue-500 uppercase mt-1.5">Membros</span>
                          </div>
                          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-purple-50/60 border border-purple-100/60 shadow-3xs">
                            <span className="text-base font-black text-purple-700 leading-none">
                              {Number(relatorio.visitantes_presentes || 0)}
                            </span>
                            <span className="text-[9px] font-bold text-purple-500 uppercase mt-1.5">Visitantes</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ABA 3: CRESCIMENTO & DEMOGRAFIA (MOBILE) ── */}
        {abaAtiva === 'demografia' && (
          <div className="space-y-5">
            <DoughnutCard titulo="Distribuição por Zona" dados={zonasDados} />
            <DoughnutCard titulo="Faixa Etária (Membros)" dados={faixasDados} />
            
            {/* Gênero e Batismo */}
            <div className="bg-white rounded-xl border border-slate-150 p-4 shadow-3xs space-y-4">
              <h4 className="font-bold text-slate-855 text-xs border-b border-slate-50 pb-2">Perfil Demográfico</h4>
              
              {/* Gênero */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                  <span>Proporção por Gênero</span>
                </div>
                <div className="flex h-4 overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200">
                  <div 
                    className="rounded-full bg-linear-to-r from-blue-400 to-blue-600" 
                    style={{ width: `${generoStats.pctHomens}%` }} 
                  />
                  <div 
                    className="rounded-full bg-linear-to-r from-rose-400 to-rose-600 ml-0.5" 
                    style={{ width: `${generoStats.pctMulheres}%` }} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="py-2 bg-blue-50/50 border border-blue-100 rounded-xl">
                    <span className="block text-base font-black text-blue-700">{generoStats.homens}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Homens ({generoStats.pctHomens}%)</span>
                  </div>
                  <div className="py-2 bg-rose-50/50 border border-rose-100 rounded-xl">
                    <span className="block text-base font-black text-rose-700">{generoStats.mulheres}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Mulheres ({generoStats.pctMulheres}%)</span>
                  </div>
                </div>
              </div>

              {/* Batismo */}
              <div className="border-t border-slate-50 pt-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">
                  <span>Membros Batizados nas Águas</span>
                  <span className="text-amber-600 font-extrabold">{taxaBatismo}%</span>
                </div>
                <div className="relative w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <div 
                    className="absolute top-0 left-0 h-full bg-linear-to-r from-amber-400 to-amber-600 rounded-full"
                    style={{ width: `${taxaBatismo}%` }}
                  />
                </div>
                <p className="text-[9px] text-slate-400 mt-2 font-medium">
                  {totalBatizados} de {totalPessoasAtivas} membros ativos batizados.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── ABA 4: PAINEL FINANCEIRO (MOBILE) ── */}
        {abaAtiva === 'financas' && (
          <div className="space-y-5">
            {!hasFinanceAccess ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 bg-white border border-slate-200 rounded-2xl text-center shadow-3xs">
                <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-3 animate-bounce">
                  <ShieldAlert size={22} />
                </div>
                <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-tight">Acesso Restrito ao Financeiro</h3>
                <p className="text-[10px] text-slate-500 mt-1 max-w-[200px] leading-relaxed">
                  Permissões insuficientes na tabela de transações.
                </p>
              </div>
            ) : financeLoading ? (
              <div className="py-12 text-center animate-pulse text-slate-400 text-xs font-medium italic">
                Carregando dados financeiros...
              </div>
            ) : financeData ? (
              <div className="space-y-5">
                {/* Stats cards compactos */}
                <div className="grid grid-cols-2 gap-3">
                  <StatCard 
                    label="Receitas (Mês)" 
                    valor={formatarBRL(financeData.receitasMes)} 
                    detalhe="Entradas" 
                    icone={<div className="p-1.5 rounded-lg bg-blue-50 border border-blue-100"><TrendingUp className="w-5 h-5 text-blue-600" /></div>}
                    className="p-3 flex-col"
                  />
                  <StatCard 
                    label="Despesas (Mês)" 
                    valor={formatarBRL(financeData.despesasMes)} 
                    detalhe="Saídas" 
                    icone={<div className="p-1.5 rounded-lg bg-rose-50 border border-rose-100"><TrendingDown className="w-5 h-5 text-rose-600" /></div>}
                    className="p-3 flex-col"
                  />
                  <StatCard 
                    label="Balanço Mês" 
                    valor={formatarBRL(financeData.saldoMes)} 
                    detalhe="Resultado" 
                    icone={<div className={`p-1.5 rounded-lg border ${financeData.saldoMes >= 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                      {financeData.saldoMes >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    </div>}
                    className={`p-3 flex-col border-transparent ${financeData.saldoMes >= 0 ? 'border-emerald-500/10' : 'border-rose-500/10'}`}
                  />
                  <StatCard 
                    label="Saldo Caixa" 
                    valor={formatarBRL(financeData.saldoTotal)} 
                    detalhe="Disponível" 
                    icone={<div className="p-1.5 rounded-lg bg-amber-50 border border-amber-100"><Coins className="w-5 h-5 text-amber-600" /></div>}
                    className="p-3 flex-col font-medium"
                  />
                </div>

                {/* Composed Chart compactado para Mobile */}
                <div className="bg-white rounded-xl border border-slate-150 p-4 shadow-3xs">
                  <div className="border-b border-slate-50 pb-2 mb-3">
                    <h4 className="font-bold text-slate-800 text-xs">Fluxo de Caixa Mensal</h4>
                    <p className="text-[9px] text-slate-400">Recomendação dos últimos 6 meses</p>
                  </div>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={financeData.graficoData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }} style={{ outline: 'none' }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{ fontSize: 8 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 8 }} axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.95)', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '8px',
                            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
                            fontSize: '9px',
                            fontFamily: "'Roboto', sans-serif"
                          }} 
                        />
                        <Legend wrapperStyle={{ fontSize: 9, pt: 5 }} />
                        <Bar dataKey="Receitas" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={10} />
                        <Bar dataKey="Despesas" fill="#f43f5e" radius={[3, 3, 0, 0]} barSize={10} />
                        <Line type="monotone" dataKey="Saldo" stroke="#eab308" strokeWidth={2.5} dot={{ r: 2.5, fill: '#eab308' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Ultimas Lançamentos */}
                <div className="bg-white rounded-xl border border-slate-150 p-4 shadow-3xs space-y-3">
                  <div className="border-b border-slate-50 pb-2">
                    <h4 className="font-bold text-slate-800 text-xs">Últimos Lançamentos</h4>
                    <p className="text-[9px] text-slate-400">Transações recentes liquidadas</p>
                  </div>

                  {financeData.transacoesRecentes.length === 0 ? (
                    <p className="text-center text-[10px] text-slate-400 italic py-4">Nenhuma transação liquidada.</p>
                  ) : (
                    <div className="space-y-2">
                      {financeData.transacoesRecentes.map((t) => (
                        <div key={t.id} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <div className="min-w-0 pr-2">
                            <p className="font-bold text-slate-800 text-xs truncate max-w-[130px]">{t.descricao}</p>
                            <span className="text-[9px] text-slate-400 font-bold block mt-0.5">
                              {new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <span className={`font-black text-xs shrink-0 ${t.tipo === 'receita' ? 'text-blue-600' : 'text-rose-600'}`}>
                            {t.tipo === 'receita' ? '+' : '-'} {formatarBRL(t.valor)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">Sem dados para exibição.</div>
            )}
          </div>
        )}

      </div>

      {/* Modal de Detalhes do Aviso */}
      {modalAvisoAberto && avisoSelecionado && (
        <ModalWrapper titulo={avisoSelecionado.titulo} onFechar={fecharModalAviso}>
          <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            {avisoSelecionado.imagem_url && (
              <img 
                src={avisoSelecionado.imagem_url} 
                alt={avisoSelecionado.titulo} 
                className="w-full rounded-xl object-cover max-h-48" 
              />
            )}
            {avisoSelecionado.subtitulo && (
              <p className="text-xs text-slate-650 font-bold leading-relaxed">{avisoSelecionado.subtitulo}</p>
            )}
            {avisoSelecionado.conteudo_html ? (
              <div 
                className="prose prose-sm text-slate-600 max-w-none text-xs leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: avisoSelecionado.conteudo_html }} 
              />
            ) : (
              <p className="text-xs text-slate-455 italic">Sem conteúdo detalhado.</p>
            )}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Postado</span>
              <span>{new Date(avisoSelecionado.created_at).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}