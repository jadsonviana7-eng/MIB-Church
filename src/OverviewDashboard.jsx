import { useMemo, useState, useEffect, useCallback } from 'react';
import { Avatar, DoughnutCard, CombinationCard, ColumnChart, Recentes, PageHeader, StatCard } from './ui';
import { meses, faixasEtarias, faixaDaIdade, agrupamentoPor, nomeZona } from './churchUtils';
import PainelAprovacoes from './PainelAprovacoes';
import { supabase } from './supabaseClient';
import { 
  Users, Home, Calendar, DollarSign, Award, ArrowUpRight, 
  TrendingUp, TrendingDown, Target, UserCheck, Percent, 
  BookOpen, ChevronRight, Sparkles, Zap, Activity, Plus, ShieldAlert,
  Smile, Coins, HelpCircle
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
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';

export default function OverviewDashboard({ 
  pessoas = [], 
  celulas = [], 
  zonas = [], 
  relatoriosCelula = [], 
  indicadores = {}, 
  carregando = false, 
  periodoConvertidos = 'mes', 
  setPeriodoConvertidos = () => {}, 
  onVerMembro = () => {},
  onVerReuniao = () => {},
  membroLogado = null,
  usuarioLogado = null,
  onNavigate = () => {},
  hasAccess = () => false,
  reunioesVistas = [],
  abaDashboard,
  setAbaDashboard
}) {
  const [localAbaAtiva, setLocalAbaAtiva] = useState('visao_geral');
  const abaAtiva = abaDashboard !== undefined ? abaDashboard : localAbaAtiva;
  const setAbaAtiva = setAbaDashboard !== undefined ? setAbaDashboard : setLocalAbaAtiva;
  
  // Estados para dados financeiros (carregados sob demanda com tratamento de erro/RLS)
  const [financeLoading, setFinanceLoading] = useState(false);
  const [financeData, setFinanceData] = useState(null);
  const [hasFinanceAccess, setHasFinanceAccess] = useState(true);
  const podeVerFinanceiro = hasAccess('Financeiro');

  // 1. Processamento Geral de Pessoas Ativas
  const pessoasAtivas = useMemo(() => pessoas.filter(p => p.status !== 'inativo'), [pessoas]);
  const totalPessoasAtivas = pessoasAtivas.length;
  const totalCelulas = useMemo(() => celulas.length, [celulas]);

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
      .reduce((acc, r) => acc + Number(r.oferta || r.valor_oferta || 0), 0);
  }, [relatoriosCelula]);

  // 6. Dados do Usuário Logado
  const nomeUsuario = useMemo(() => {
    return membroLogado?.nome || usuarioLogado?.nome || usuarioLogado?.email?.split('@')[0] || 'Usuário';
  }, [membroLogado, usuarioLogado]);

  const cargoUsuario = useMemo(() => {
    return membroLogado?.tipo_membro || 'Membro';
  }, [membroLogado]);

  // 7. Dados Demográficos
  const zonasDados = useMemo(() => agrupamentoPor(pessoasAtivas, (p) => nomeZona(zonas, p.zona_id)), [pessoasAtivas, zonas]);
  const faixasDados = useMemo(() => agrupamentoPor(pessoasAtivas, (p) => faixasEtarias.find((f) => f.id === faixaDaIdade(p.data_nascimento))?.curto || 'Não informada'), [pessoasAtivas]);
  const faixasCelulas = useMemo(() => agrupamentoPor(celulas, (c) => c.faixa_etaria || 'Não informada'), [celulas]);

  const aniversariantesMes = useMemo(() => pessoasAtivas.filter((p) => {
    if (!p.data_nascimento) return false;
    return new Date(`${p.data_nascimento}T00:00:00`).getMonth() === new Date().getMonth();
  }), [pessoasAtivas]);

  const novosConvertidosTrend = useMemo(() => {
    const dados = agrupamentoPor(pessoas.filter(p => p.data_conversao), (p) => {
      const data = new Date(`${p.data_conversao}T00:00:00`);
      return periodoConvertidos === 'mes' ? meses[data.getMonth()] : String(data.getFullYear());
    });
    if (periodoConvertidos === 'mes') {
      return Object.fromEntries(meses.filter(m => dados[m]).map(m => [m, dados[m]]));
    }
    return dados;
  }, [pessoas, periodoConvertidos]);

  const aniversariosDados = useMemo(() => {
    const dados = agrupamentoPor(pessoas.filter(p => p.data_nascimento), (p) => {
      const data = new Date(`${p.data_nascimento}T00:00:00`);
      return meses[data.getMonth()];
    });
    return Object.fromEntries(meses.filter(m => dados[m]).map(m => [m, dados[m]]));
  }, [pessoas]);

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

  // 8. Consulta de Finanças (Efetuada apenas se necessário / Aba ativa)
  const fetchFinanceData = useCallback(async () => {
    setFinanceLoading(true);
    try {
      const { data, error } = await supabase
        .from('transacoes_financeiras')
        .select('*')
        .eq('status', 'pago');

      if (error) {
        setHasFinanceAccess(false);
        console.warn('Permissão de acesso financeiro negada ou tabela indisponível:', error);
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
    if (abaAtiva === 'financas' && podeVerFinanceiro) {
      fetchFinanceData();
    }
  }, [abaAtiva, fetchFinanceData, podeVerFinanceiro]);

  useEffect(() => {
    if (abaAtiva === 'financas' && !podeVerFinanceiro) {
      setAbaAtiva('visao_geral');
    }
  }, [abaAtiva, podeVerFinanceiro, setAbaAtiva]);

  // Formatador de Moeda BRL
  const formatarBRL = (valor) => {
    return Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      
      {/* 1. CABEÇALHO DE BOAS-VINDAS PREMIUM */}
      <div className="relative overflow-hidden rounded-b-3xl rounded-t-none bg-linear-to-r from-[#202046] via-[#2a2a6b] to-[#3b3b8c] p-6 sm:p-8 text-white shadow-xl animate-in fade-in duration-500">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 -ml-16 -mb-16 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>
        
        <div className="relative flex flex-col sm:flex-row items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            {membroLogado?.foto_url ? (
              <img 
                src={membroLogado.foto_url} 
                alt={nomeUsuario} 
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/10 shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold ring-4 ring-white/10 shadow-lg text-blue-200">
                {nomeUsuario.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Olá, {nomeUsuario}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 uppercase tracking-wider">
                Perfil: <span className="text-blue-300 font-bold">{cargoUsuario}</span> • MIB Church Dashboard
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 text-center sm:text-right border border-white/10 shadow-sm shrink-0">
            <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-widest">Data de Hoje</span>
            <span className="text-sm font-extrabold text-blue-100">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. MENU DE ABAS PREMIUM (TABS NAVIGATION) */}
      <div className="flex bg-white/70 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-200/80 overflow-x-auto scrollbar-hide gap-1.5">
        {[
          { id: 'visao_geral', label: 'Visão Geral', icon: <Users size={16} /> },
          { id: 'celulas', label: 'Células & Engajamento', icon: <Home size={16} /> },
          { id: 'demografia', label: 'Crescimento & Demografia', icon: <Activity size={16} /> },
          { id: 'financas', label: 'Painel Financeiro', icon: <Coins size={16} /> }
        ].filter(tab => tab.id !== 'financas' || podeVerFinanceiro).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAbaAtiva(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
              abaAtiva === tab.id 
                ? 'bg-[#1e3a8a] text-white shadow-md shadow-blue-900/10' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. AÇÕES RÁPIDAS (LAUNCHPAD) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Zap size={16} className="text-amber-500" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-600">Ações e Atalhos Rápidos</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Cadastrar Membro', action: () => onNavigate('pessoas', 'todos'), color: 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700', icon: <Plus size={16} className="text-blue-500" /> },
            { label: 'Lançar Reunião', action: () => onNavigate('celulas', 'reunioes'), color: 'hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700', icon: <Plus size={16} className="text-emerald-500" /> },
            { label: 'Nova Transação', action: () => onNavigate('financeiro', 'transacoes'), color: 'hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700', icon: <Plus size={16} className="text-purple-500" /> },
            { label: 'Escalas de Culto', action: () => onNavigate('gestao', 'escalas'), color: 'hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700', icon: <Calendar size={16} className="text-amber-500" /> }
          ].filter(item => item.label !== 'Nova Transação' || podeVerFinanceiro).map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className={`flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 text-left text-xs font-bold text-slate-600 shadow-2xs hover:shadow-sm cursor-pointer transition-all duration-200 active:scale-95 ${item.color}`}
            >
              <span className="truncate">{item.label}</span>
              <div className="p-1.5 rounded-lg bg-white border border-slate-100 shadow-2xs shrink-0 ml-2">
                {item.icon}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. CONTEÚDO DAS ABAS */}
      
      {carregando ? (
        <div className="py-20 text-center animate-pulse text-slate-400 font-medium italic">
          Sincronizando estatísticas da igreja...
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
          
          {/* ── ABA 1: VISÃO GERAL ── */}
          {abaAtiva === 'visao_geral' && (
            <div className="space-y-6">
              {/* StatCards para Desktop */}
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  label="Total de Pessoas" 
                  valor={totalPessoasAtivas} 
                  detalhe="Membros Ativos" 
                  icone={<div className="p-2 rounded-xl bg-blue-50 border border-blue-100"><Users className="w-6 h-6 text-blue-600" /></div>}
                />
                <StatCard 
                  label="Células" 
                  valor={totalCelulas} 
                  detalhe="Ativas" 
                  icone={<div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100"><Home className="w-6 h-6 text-emerald-600" /></div>}
                />
                <StatCard 
                  label="Novos Convertidos" 
                  valor={novosConvertidosMes} 
                  detalhe="Este Mês" 
                  icone={<div className="p-2 rounded-xl bg-purple-50 border border-purple-100"><Sparkles className="w-6 h-6 text-purple-600" /></div>}
                />
                <StatCard 
                  label="Taxa de Batismo" 
                  valor={`${taxaBatismo}%`} 
                  detalhe={`${totalBatizados} batizados`} 
                  icone={<div className="p-2 rounded-xl bg-amber-50 border border-amber-100"><Award className="w-6 h-6 text-amber-600" /></div>}
                />
              </div>

              {/* StatCards para Mobile com Cores Diferenciadas, Contraste e Ícones Maiores */}
              <div className="sm:hidden grid grid-cols-1 gap-4">
                <CardMobileIndicador
                  label="Total de Pessoas"
                  valor={totalPessoasAtivas}
                  detalhe="Membros Ativos"
                  icon={Users}
                  gradient="from-blue-600 via-blue-700 to-indigo-800"
                  shadowColor="shadow-blue-500/10"
                />
                <CardMobileIndicador
                  label="Células"
                  valor={totalCelulas}
                  detalhe="Ativas"
                  icon={Home}
                  gradient="from-emerald-600 via-emerald-700 to-teal-800"
                  shadowColor="shadow-emerald-500/10"
                />
                <CardMobileIndicador
                  label="Novos Convertidos"
                  valor={novosConvertidosMes}
                  detalhe="Este Mês"
                  icon={Sparkles}
                  gradient="from-purple-600 via-purple-700 to-fuchsia-800"
                  shadowColor="shadow-purple-500/10"
                />
                <CardMobileIndicador
                  label="Taxa de Batismo"
                  valor={`${taxaBatismo}%`}
                  detalhe={`${totalBatizados} batizados`}
                  icon={Award}
                  gradient="from-amber-500 via-amber-600 to-orange-700"
                  shadowColor="shadow-amber-500/10"
                />
              </div>

              {/* Flexbox Principal */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Coluna da Esquerda: Gráficos */}
                <div className="flex-1 min-w-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CombinationCard 
                      titulo="Novos convertidos" 
                      dados={novosConvertidosTrend} 
                      periodo={periodoConvertidos} 
                      setPeriodo={setPeriodoConvertidos} 
                    />
                    <ColumnChart 
                      titulo="Aniversariantes por mês" 
                      dados={aniversariosDados} 
                      hideLegend={true} 
                    />
                  </div>
                </div>

                {/* Coluna da Direita: Sidebar */}
                <div className="w-full lg:w-96 shrink-0 space-y-6">
                  <PainelAprovacoes onVerDetalhes={onVerMembro} onAprovado={() => {}} />
                  
                  {/* Aniversariantes do Mês Estilizado */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Smile className="text-amber-500" size={18} />
                        <h4 className="font-bold text-slate-800 text-sm">Aniversariantes do Mês</h4>
                      </div>
                      <span className="text-[10px] font-black uppercase bg-amber-50 border border-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                        {aniversariantesMes.length} Membros
                      </span>
                    </div>

                    {aniversariantesMes.length === 0 ? (
                      <p className="text-center text-xs text-slate-400 italic py-4">Sem aniversariantes no mês atual.</p>
                    ) : (
                      <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2.5 scrollbar-hide">
                        {aniversariantesMes.slice(0, 8).map((pessoa) => (
                          <div 
                            key={pessoa.id} 
                            onClick={() => onVerMembro(pessoa.id)}
                            className="flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 cursor-pointer transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar pessoa={pessoa} tamanho="w-9 h-9" />
                              <div>
                                <p className="font-bold text-slate-800 text-xs truncate max-w-[140px]">{pessoa.nome}</p>
                                <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                                  {pessoa.celulas?.nome || 'Sem Célula'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                              <span className="text-[11px] font-black text-slate-600">
                                {new Date(`${pessoa.data_nascimento}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ── ABA 2: CÉLULAS & ENGAJAMENTO ── */}
          {abaAtiva === 'celulas' && (
            <div className="space-y-6">
              {/* StatCards de Células */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  label="Total de Células" 
                  valor={totalCelulas} 
                  detalhe="Grupos Ativos" 
                  icone={<div className="p-2 rounded-xl bg-blue-50 border border-blue-100"><Home className="w-6 h-6 text-blue-600" /></div>}
                />
                <StatCard 
                  label="Reuniões Realizadas" 
                  valor={totalReunioes} 
                  detalhe="Relatórios Entregues" 
                  icone={<div className="p-2 rounded-xl bg-purple-50 border border-purple-100"><BookOpen className="w-6 h-6 text-purple-600" /></div>}
                />
                <StatCard 
                  label="Média de Visitantes" 
                  valor={mediaVisitantes} 
                  detalhe="Por Reunião" 
                  icone={<div className="p-2 rounded-xl bg-pink-50 border border-pink-100"><Users className="w-6 h-6 text-pink-600" /></div>}
                />
                <StatCard 
                  label="Ofertas Coletadas (Mês)" 
                  valor={formatarBRL(ofertasCelulasMes)} 
                  detalhe="Soma de Células" 
                  icone={<div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100"><Coins className="w-6 h-6 text-emerald-600" /></div>}
                />
              </div>

              {/* Layout da Aba Células */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Coluna da Esquerda: Gráficos e Distribuição */}
                <div className="lg:col-span-1 space-y-6">
                  <DoughnutCard titulo="Faixa etária das células" dados={faixasCelulas} />
                </div>

                {/* Coluna da Direita: Reuniões Recentes com Detalhes Ricos */}
                <div className="lg:col-span-2 space-y-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Relatório Recente de Reuniões</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Histórico recente de atividades de células</p>
                    </div>
                  </div>

                  {relatoriosCelula.length === 0 ? (
                    <p className="text-center text-xs text-slate-400 italic py-10">Nenhuma reunião registrada recentemente.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-2.5 px-3">Célula</th>
                            <th className="py-2.5 px-3 text-center">Participantes</th>
                            <th className="py-2.5 px-3 text-center">Visitantes</th>
                            <th className="py-2.5 px-3 text-right">Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          {relatoriosCelula.slice(0, 6).map((relatorio) => {
                            const isUsuarioPastor = ['pastor', 'admin'].includes(membroLogado?.permissao);
                            const isNovo = isUsuarioPastor && !reunioesVistas.includes(String(relatorio.id));

                            return (
                              <tr 
                                key={relatorio.id} 
                                onClick={() => onVerReuniao && onVerReuniao(relatorio.id)}
                                className={`border-b border-slate-50 last:border-0 transition-colors cursor-pointer ${
                                  isNovo 
                                    ? 'bg-blue-50/30 hover:bg-blue-50/50' 
                                    : 'hover:bg-slate-50/50'
                                }`}
                              >
                                <td className="py-3 px-3 font-bold text-slate-800 flex items-center gap-2">
                                  {isNovo && (
                                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" title="Não visualizado" />
                                  )}
                                  <span>{relatorio.celulas?.nome || 'Célula'}</span>
                                </td>
                                <td className="py-3 px-3 text-center shrink-0">
                                  <span className="inline-block px-3 py-1 rounded-lg font-black text-xs bg-blue-50 border border-blue-100 text-blue-700">
                                    {relatorio.presencas_relatorio?.[0]?.count || 0}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-center shrink-0">
                                  <span className="inline-block px-3 py-1 rounded-lg font-black text-xs bg-purple-50 border border-purple-100 text-purple-700">
                                    {Number(relatorio.visitantes_presentes || 0)}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-right text-slate-500 font-medium">
                                  {relatorio.data_reuniao ? new Date(`${relatorio.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ── ABA 3: CRESCIMENTO & DEMOGRAFIA ── */}
          {abaAtiva === 'demografia' && (
            <div className="space-y-6">
              
              {/* Gráficos Principais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Zona de Moradia */}
                <DoughnutCard titulo="Distribuição por Zona" dados={zonasDados} />
                
                {/* 2. Faixa Etária dos Membros */}
                <DoughnutCard titulo="Faixa Etária (Membros)" dados={faixasDados} />

                {/* 3. Proporção de Gênero Premium & Progresso de Batismo */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between min-h-[420px]">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3">Perfil Demográfico</h4>
                    
                    {/* Gênero */}
                    <div className="mt-5 space-y-4">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <span>Homens vs Mulheres</span>
                      </div>
                      <div className="flex h-5 overflow-hidden rounded-full bg-slate-100 p-1 border border-slate-200">
                        <div 
                          className="rounded-full bg-linear-to-r from-blue-400 to-blue-600 transition-all duration-500" 
                          style={{ width: `${generoStats.pctHomens}%` }} 
                        />
                        <div 
                          className="rounded-full bg-linear-to-r from-rose-400 to-rose-600 transition-all duration-500 ml-1" 
                          style={{ width: `${generoStats.pctMulheres}%` }} 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-2xl">
                          <span className="block text-2xl font-black text-blue-700">{generoStats.homens}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Homens ({generoStats.pctHomens}%)</span>
                        </div>
                        <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-2xl">
                          <span className="block text-2xl font-black text-rose-700">{generoStats.mulheres}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Mulheres ({generoStats.pctMulheres}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Batismo de águas progresso */}
                  <div className="border-t border-slate-100 pt-5 mt-5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      <span>Membros Batizados nas Águas</span>
                      <span className="text-amber-600 font-extrabold">{taxaBatismo}%</span>
                    </div>
                    <div className="relative w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div 
                        className="absolute top-0 left-0 h-full bg-linear-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
                        style={{ width: `${taxaBatismo}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">
                      Atualmente, {totalBatizados} de {totalPessoasAtivas} membros ativos já passaram pelo batismo nas águas.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ── ABA 4: PAINEL FINANCEIRO ── */}
          {abaAtiva === 'financas' && (
            <div className="space-y-6">
              {!hasFinanceAccess ? (
                /* LOCK SCREEN */
                <div className="flex flex-col items-center justify-center py-20 px-6 bg-white border border-slate-200 rounded-3xl text-center shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 animate-bounce">
                    <ShieldAlert size={28} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-tight">Acesso Restrito ao Painel Financeiro</h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed">
                    Você não tem as permissões administrativas necessárias na tabela de transações para carregar as estatísticas financeiras do dashboard.
                  </p>
                </div>
              ) : financeLoading ? (
                /* LOAD SPINNER */
                <div className="py-20 text-center animate-pulse text-slate-400 font-medium italic">
                  Carregando dados do caixa...
                </div>
              ) : financeData ? (
                /* DADOS FINANCEIROS */
                <div className="space-y-6 border-slate-100">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                      label="Receitas (Mês)" 
                      valor={formatarBRL(financeData.receitasMes)} 
                      detalhe="Entradas do período" 
                      icone={<div className="p-2 rounded-xl bg-blue-50 border border-blue-100"><TrendingUp className="w-6 h-6 text-blue-600" /></div>}
                      className="flex-col"
                    />
                    <StatCard 
                      label="Despesas (Mês)" 
                      valor={formatarBRL(financeData.despesasMes)} 
                      detalhe="Saídas do período" 
                      icone={<div className="p-2 rounded-xl bg-rose-50 border border-rose-100"><TrendingDown className="w-6 h-6 text-rose-600" /></div>}
                      className="flex-col"
                    />
                    <StatCard 
                      label="Resultado do Mês" 
                      valor={formatarBRL(financeData.saldoMes)} 
                      detalhe="Balanço mensal" 
                      icone={<div className={`p-2 rounded-xl border ${financeData.saldoMes >= 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                        {financeData.saldoMes >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                      </div>}
                      className={`flex-col ${financeData.saldoMes >= 0 ? 'border-emerald-500/20' : 'border-rose-500/20'} animate-in fade-in duration-200`}
                    />
                    <StatCard 
                      label="Saldo Geral Caixa" 
                      valor={formatarBRL(financeData.saldoTotal)} 
                      detalhe="Disponível em Contas" 
                      icone={<div className="p-2 rounded-xl bg-amber-50 border border-amber-100"><Coins className="w-6 h-6 text-amber-600" /></div>}
                      className="flex-col"
                    />
                  </div>

                  {/* Fluxo e Recentes */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Gráfico do Fluxo */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                      <div className="border-b border-slate-100 pb-3 mb-4">
                        <h4 className="font-bold text-slate-800 text-sm">Fluxo de Caixa Mensal</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Recomendação de entradas e saídas pagas nos últimos 6 meses</p>
                      </div>
                      
                      <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={financeData.graficoData} style={{ outline: 'none' }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                            <Tooltip 
                              contentStyle={{ 
                                background: 'rgba(255, 255, 255, 0.95)', 
                                border: '1px solid #e2e8f0', 
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                                fontSize: '11px',
                                fontFamily: "'Roboto', sans-serif"
                              }} 
                            />
                            <Legend wrapperStyle={{ fontSize: 10, pt: 10 }} />
                            <Bar 
                              dataKey="Receitas" 
                              fill="#3b82f6" 
                              radius={[4, 4, 0, 0]} 
                              barSize={20} 
                            />
                            <Bar 
                              dataKey="Despesas" 
                              fill="#f43f5e" 
                              radius={[4, 4, 0, 0]} 
                              barSize={20} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="Saldo" 
                              stroke="#eab308" 
                              strokeWidth={3} 
                              dot={{ r: 3, fill: '#eab308' }} 
                            />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Últimos Lançamentos */}
                    <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <h4 className="font-bold text-slate-800 text-sm">Últimos Lançamentos Pagos</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Transações liquidadas recentemente</p>
                      </div>

                      {financeData.transacoesRecentes.length === 0 ? (
                        <p className="text-center text-xs text-slate-400 italic py-10">Nenhuma transação liquidada encontrada.</p>
                      ) : (
                        <div className="space-y-3">
                          {financeData.transacoesRecentes.map((t) => (
                            <div key={t.id} className="flex justify-between items-start p-2.5 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <div className="min-w-0 pr-2">
                                <p className="font-bold text-slate-800 text-xs truncate">{t.descricao}</p>
                                <span className="block text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wide">
                                  {new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <div className="text-right shrink-0">
                                <span className={`block font-extrabold text-xs ${t.tipo === 'receita' ? 'text-blue-600' : 'text-red-600'}`}>
                                  {t.tipo === 'receita' ? '+' : '-'} {formatarBRL(t.valor)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-slate-400">Sem dados financeiros para exibir.</div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}

function CardMobileIndicador({ label, valor, detalhe, icon: Icon, gradient, shadowColor }) {
  return (
    <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-xs flex items-center gap-5 text-slate-850 animate-in fade-in slide-in-from-top-1 duration-300">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 text-white shadow-sm`}>
        <Icon className="w-8 h-8 text-white" strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none">
          {label}
        </p>
        <div className="flex items-baseline gap-2 mt-2 leading-none">
          <span className="text-3xl font-black text-slate-800 tracking-tight">
            {valor}
          </span>
          {detalhe && (
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              • {detalhe}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
