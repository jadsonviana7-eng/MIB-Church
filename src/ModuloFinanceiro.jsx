import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { PageHeader, SelectFiltro } from './ui';
import TransacoesFinanceiras from './TransacoesFinanceiras';
import CategoriasFinanceiras from './CategoriasFinanceiras';
import ContasFinanceiras from './ContasFinanceiras';
import RelatoriosFinanceiros from './RelatoriosFinanceiros';
import HistoricoFinanceiro from './HistoricoFinanceiro';
import { extrairDataInfo, extrairValorNumerico, classificarTransacao, normalizarTexto } from './churchUtils';
import {
  ComposedChart,
  BarChart,
  PieChart,
  Pie,
  Bar,
  Line,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  History,
  Tag,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Upload,
  Filter,
  Search,
  Calendar,
  RefreshCw,
  X,
  PieChart as PieIcon,
  Layers,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from 'lucide-react';

export default function ModuloFinanceiro({ meses, submenu, usuarioLogado, membroLogado, hasAccess, filtrosMobileAberto, setFiltrosMobileAberto, onNavigate }) {
  const [abaAtiva, setAbaAtiva] = useState(submenu || 'resumo');
  const [transacoes, setTransacoes] = useState([]);
  const [contas, setContas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtrosPainelExpandidos, setFiltrosPainelExpandidos] = useState(false);

  // Paleta de cores sólidas, modernas e vibrantes para os gráficos (sem degradê)
  const coresSolidas = ['#2563eb', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#f97316', '#6366f1'];

  // Estados para os filtros compartilhados de Transações e Gráficos
  const [dataInicioFiltro, setDataInicioFiltro] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
  });
  const [dataFimFiltro, setDataFimFiltro] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  const [tipoTransacaoFiltro, setTipoTransacaoFiltro] = useState('');
  const [statusTransacaoFiltro, setStatusTransacaoFiltro] = useState('');
  const [contaFiltro, setContaFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [buscaNome, setBuscaNome] = useState('');

  const handleMudarAba = useCallback((novaAba) => {
    setAbaAtiva(novaAba);
    if (onNavigate) {
      onNavigate(novaAba);
    }
  }, [onNavigate]);

  // Sincroniza a aba ativa quando o submenu mudar pelo menu principal
  useEffect(() => {
    if (submenu) setAbaAtiva(submenu);
  }, [submenu]);

  const carregarDadosIniciais = useCallback(async () => {
    if (!hasAccess('Financeiro')) {
      setTransacoes([]);
      setContas([]);
      setCategorias([]);
      setCarregando(false);
      return;
    }

    setCarregando(true);
    try {
      const [resTransacoes, resContas, resCategorias] = await Promise.all([
        supabase.from('transacoes_financeiras').select('*, pessoas(nome), categorias_financeiras(nome), contas_financeiras(nome)').order('data', { ascending: false }),
        supabase.from('contas_financeiras').select('id, nome').order('nome'),
        supabase.from('categorias_financeiras').select('id, nome, tipo').order('nome')
      ]);

      if (!resTransacoes.error) setTransacoes(resTransacoes.data || []);
      if (!resContas.error) setContas(resContas.data || []);
      if (!resCategorias.error) setCategorias(resCategorias.data || []);
    } catch (err) {
      console.error('Erro ao carregar dados do módulo financeiro:', err);
    } finally {
      setCarregando(false);
    }
  }, [hasAccess]);

  useEffect(() => {
    carregarDadosIniciais();
  }, [carregarDadosIniciais]);

  // Atalhos Rápidos de Filtro de Período
  const aplicarAtalhoPeriodo = (preset) => {
    const hoje = new Date();
    const y = hoje.getFullYear();
    const m = hoje.getMonth();

    if (preset === 'este_mes') {
      const uDia = new Date(y, m + 1, 0).getDate();
      setDataInicioFiltro(`${y}-${String(m + 1).padStart(2, '0')}-01`);
      setDataFimFiltro(`${y}-${String(m + 1).padStart(2, '0')}-${String(uDia).padStart(2, '0')}`);
    } else if (preset === 'mes_anterior') {
      const mAnt = m === 0 ? 11 : m - 1;
      const yAnt = m === 0 ? y - 1 : y;
      const uDia = new Date(yAnt, mAnt + 1, 0).getDate();
      setDataInicioFiltro(`${yAnt}-${String(mAnt + 1).padStart(2, '0')}-01`);
      setDataFimFiltro(`${yAnt}-${String(mAnt + 1).padStart(2, '0')}-${String(uDia).padStart(2, '0')}`);
    } else if (preset === 'este_ano') {
      setDataInicioFiltro(`${y}-01-01`);
      setDataFimFiltro(`${y}-12-31`);
    } else if (preset === 'todos') {
      setDataInicioFiltro('');
      setDataFimFiltro('');
    } else if (preset === 'limpar') {
      setDataInicioFiltro('');
      setDataFimFiltro('');
      setTipoTransacaoFiltro('');
      setStatusTransacaoFiltro('');
      setContaFiltro('');
      setCategoriaFiltro('');
      setBuscaNome('');
    }
  };

  // Conjunto de Transações FILTRADAS dinamicamente com base nos parâmetros selecionados
  const transacoesFiltradas = useMemo(() => {
    return transacoes.filter(t => {
      const c = classificarTransacao(t);
      if (c.isCancelado || !c.infoData) return false;

      // Data Início
      if (dataInicioFiltro) {
        const infoInicio = extrairDataInfo(dataInicioFiltro);
        if (infoInicio) {
          const tTime = new Date(c.infoData.ano, c.infoData.mes, c.infoData.dia).getTime();
          const iniTime = new Date(infoInicio.ano, infoInicio.mes, infoInicio.dia).getTime();
          if (tTime < iniTime) return false;
        }
      }

      // Data Fim
      if (dataFimFiltro) {
        const infoFim = extrairDataInfo(dataFimFiltro);
        if (infoFim) {
          const tTime = new Date(c.infoData.ano, c.infoData.mes, c.infoData.dia).getTime();
          const fimTime = new Date(infoFim.ano, infoFim.mes, infoFim.dia).getTime();
          if (tTime > fimTime) return false;
        }
      }

      // Tipo (receita / despesa)
      if (tipoTransacaoFiltro) {
        if (c.tipo !== tipoTransacaoFiltro.toLowerCase()) return false;
      }

      // Status (pago / pendente)
      if (statusTransacaoFiltro) {
        if (c.status !== statusTransacaoFiltro.toLowerCase()) return false;
      }

      // Conta
      if (contaFiltro) {
        if (t.conta_id !== contaFiltro) return false;
      }

      // Categoria
      if (categoriaFiltro) {
        if (t.categoria_id !== categoriaFiltro) return false;
      }

      // Pesquisa por Nome / Descrição / Contribuinte / Anotações
      if (buscaNome && buscaNome.trim() !== '') {
        const buscaNorm = normalizarTexto(buscaNome);
        const descNorm = normalizarTexto(t.descricao || '');
        const catNorm = normalizarTexto(t.categorias_financeiras?.nome || t.categoria || '');
        const contaNorm = normalizarTexto(t.contas_financeiras?.nome || t.conta || '');
        const pessoaNorm = normalizarTexto(t.pessoas?.nome || t.contribuinte || '');
        const anotNorm = normalizarTexto(t.anotacoes || '');

        const bateu = descNorm.includes(buscaNorm) ||
          catNorm.includes(buscaNorm) ||
          contaNorm.includes(buscaNorm) ||
          pessoaNorm.includes(buscaNorm) ||
          anotNorm.includes(buscaNorm);

        if (!bateu) return false;
      }

      return true;
    });
  }, [transacoes, dataInicioFiltro, dataFimFiltro, tipoTransacaoFiltro, statusTransacaoFiltro, contaFiltro, categoriaFiltro, buscaNome]);

  // Metric Cards em tempo real das transações filtradas
  const statsFiltradas = useMemo(() => {
    let totalReceitas = 0;
    let totalDespesas = 0;
    let totalPendentes = 0;
    let qtdTransacoes = transacoesFiltradas.length;

    transacoesFiltradas.forEach(t => {
      const c = classificarTransacao(t);
      const isPago = c.status === 'pago' || c.status === 'recebido' || !c.status;

      if (isPago) {
        if (c.tipo === 'receita') totalReceitas += c.valor;
        else if (c.tipo === 'despesa') totalDespesas += c.valor;
      } else if (c.status === 'pendente') {
        totalPendentes += c.valor;
      }
    });

    return {
      totalReceitas,
      totalDespesas,
      saldoLiquido: totalReceitas - totalDespesas,
      totalPendentes,
      qtdTransacoes
    };
  }, [transacoesFiltradas]);

  // Gráfico 1: Evolução Temporal do Fluxo de Caixa no Período Filtrado
  const dadosEvolucaoTemporal = useMemo(() => {
    if (transacoesFiltradas.length === 0) return [];

    const datas = transacoesFiltradas.map(t => {
      const c = classificarTransacao(t);
      return c.infoData ? new Date(c.infoData.ano, c.infoData.mes, c.infoData.dia).getTime() : null;
    }).filter(Boolean);

    if (datas.length === 0) return [];

    const minTime = Math.min(...datas);
    const maxTime = Math.max(...datas);
    const diffDias = Math.max(1, Math.ceil((maxTime - minTime) / (1000 * 60 * 60 * 24)));

    const agrupamento = {};

    transacoesFiltradas.forEach(t => {
      const c = classificarTransacao(t);
      if (!c.infoData) return;

      let chave;
      let labelExibicao;

      if (diffDias <= 45) {
        // Por Dia (DD/MM)
        const d = String(c.infoData.dia).padStart(2, '0');
        const m = String(c.infoData.mes + 1).padStart(2, '0');
        chave = `${c.infoData.ano}-${m}-${d}`;
        labelExibicao = `${d}/${m}`;
      } else {
        // Por Mês (MMM/YY)
        const mNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const m = String(c.infoData.mes + 1).padStart(2, '0');
        chave = `${c.infoData.ano}-${m}`;
        labelExibicao = `${mNames[c.infoData.mes]}/${String(c.infoData.ano).slice(-2)}`;
      }

      if (!agrupamento[chave]) {
        agrupamento[chave] = { chave, name: labelExibicao, receitas: 0, despesas: 0 };
      }

      if (c.tipo === 'receita') agrupamento[chave].receitas += c.valor;
      if (c.tipo === 'despesa') agrupamento[chave].despesas += c.valor;
    });

    const ordenados = Object.values(agrupamento).sort((a, b) => a.chave.localeCompare(b.chave));

    return ordenados.map(item => ({
      ...item,
      receitas: Number(item.receitas.toFixed(2)),
      despesas: Number(item.despesas.toFixed(2)),
      saldo: Number((item.receitas - item.despesas).toFixed(2))
    }));
  }, [transacoesFiltradas]);

  // Gráfico 2: Top Categorias por Tipo
  const dadosCategoriasFiltradas = useMemo(() => {
    const receitasMap = {};
    const despesasMap = {};

    transacoesFiltradas.forEach(t => {
      const c = classificarTransacao(t);
      const catNome = t.categorias_financeiras?.nome || t.categoria || 'Sem Categoria';

      if (c.tipo === 'receita') {
        receitasMap[catNome] = (receitasMap[catNome] || 0) + c.valor;
      } else if (c.tipo === 'despesa') {
        despesasMap[catNome] = (despesasMap[catNome] || 0) + c.valor;
      }
    });

    const receitas = Object.entries(receitasMap)
      .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const despesas = Object.entries(despesasMap)
      .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return { receitas, despesas };
  }, [transacoesFiltradas]);

  // Gráfico 3: Proporção Status (Pago vs Pendente)
  const dadosStatusPie = useMemo(() => {
    let pago = 0;
    let pendente = 0;

    transacoesFiltradas.forEach(t => {
      const c = classificarTransacao(t);
      if (c.status === 'pendente') pendente += c.valor;
      else pago += c.valor;
    });

    if (pago === 0 && pendente === 0) return [];

    return [
      { name: 'Pago / Recebido', value: Number(pago.toFixed(2)), fill: '#10b981' },
      { name: 'Pendente', value: Number(pendente.toFixed(2)), fill: '#f59e0b' }
    ];
  }, [transacoesFiltradas]);

  // Gráfico 4: Movimentação por Conta / Caixa
  const dadosSaldosContas = useMemo(() => {
    const contasMap = {};

    transacoesFiltradas.forEach(t => {
      const c = classificarTransacao(t);
      const contaNome = t.contas_financeiras?.nome || t.conta || 'Sem Conta';

      if (!contasMap[contaNome]) {
        contasMap[contaNome] = { name: contaNome, receitas: 0, despesas: 0 };
      }

      if (c.tipo === 'receita') contasMap[contaNome].receitas += c.valor;
      if (c.tipo === 'despesa') contasMap[contaNome].despesas += c.valor;
    });

    return Object.values(contasMap).map(item => ({
      ...item,
      receitas: Number(item.receitas.toFixed(2)),
      despesas: Number(item.despesas.toFixed(2))
    }));
  }, [transacoesFiltradas]);

  const formatMoeda = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formatMoedaValor = (val) => val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const temFiltroAtivo = Boolean(dataInicioFiltro || dataFimFiltro || tipoTransacaoFiltro || statusTransacaoFiltro || contaFiltro || categoriaFiltro || buscaNome);

  if (!hasAccess('Financeiro')) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-sm font-semibold text-slate-500">
        Você não possui acesso ao módulo financeiro.
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-12">

      {/* CONTEINER DO TÍTULO DA PÁGINA (PAGE HEADER) NO TOPO */}
      <PageHeader
        titulo={
          abaAtiva === 'resumo' ? 'Visão Geral & Gráficos' :
            abaAtiva === 'transacoes' ? 'Transações Financeiras' :
              abaAtiva === 'categorias' ? 'Categorias Financeiras' :
                abaAtiva === 'contas' ? 'Contas & Caixas' :
                  abaAtiva === 'relatorios' ? 'Relatórios Financeiros' :
                    'Histórico & Logs'
        }

        breadcrumb={
          abaAtiva === 'transacoes' ? ['Financeiro', 'Transações'] :
            abaAtiva === 'categorias' ? ['Financeiro', 'Categorias'] :
              abaAtiva === 'contas' ? ['Financeiro', 'Contas'] :
                abaAtiva === 'relatorios' ? ['Financeiro', 'Relatórios'] :
                  ['Financeiro', 'Histórico']
        }
        onNavigate={abaAtiva !== 'resumo' ? () => handleMudarAba('resumo') : undefined}
      />

      {/* NAVEGAÇÃO SUPERIOR DE SUBMÓDULOS - EXIBIDO APENAS NA PÁGINA RESUMO */}
      {abaAtiva === 'resumo' && (
        <>
          {/* 1. VERSÃO DESKTOP (Mantida intacta e elegante) */}
          <div className="hidden sm:flex bg-white border border-slate-200 rounded-2xl p-2 shadow-xs items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 shrink-0">
              <button
                onClick={() => handleMudarAba('resumo')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${abaAtiva === 'resumo'
                  ? 'bg-[#0f172a] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>Visão Geral & Gráficos</span>
              </button>

              {hasAccess('Financeiro', 'Transações') && (
                <button
                  onClick={() => handleMudarAba('transacoes')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${abaAtiva === 'transacoes'
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span>Transações</span>
                </button>
              )}

              {hasAccess('Financeiro', 'Categorias') && (
                <button
                  onClick={() => handleMudarAba('categorias')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${abaAtiva === 'categorias'
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span>Categorias</span>
                </button>
              )}

              {hasAccess('Financeiro', 'Contas') && (
                <button
                  onClick={() => handleMudarAba('contas')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${abaAtiva === 'contas'
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Landmark className="w-4 h-4 text-cyan-500" />
                  <span>Contas & Caixas</span>
                </button>
              )}

              {hasAccess('Financeiro', 'Relatórios financeiros') && (
                <button
                  onClick={() => handleMudarAba('relatorios')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${abaAtiva === 'relatorios'
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <span>Relatórios</span>
                </button>
              )}

              {hasAccess('Financeiro', 'Logs') && (
                <button
                  onClick={() => handleMudarAba('historico')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 shrink-0 ${abaAtiva === 'historico'
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <History className="w-4 h-4 text-slate-400" />
                  <span>Histórico</span>
                </button>
              )}
            </div>

            <button
              onClick={carregarDadosIniciais}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition shrink-0"
              title="Recarregar Dados"
            >
              <RefreshCw className={`w-4 h-4 ${carregando ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>

          {/* 2. VERSÃO MOBILE (Compacta de 1 linha sem desestruturar o layout) */}
          <div className="sm:hidden bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 animate-pulse" />
              <span className="text-xs font-black text-slate-800 truncate">
                {abaAtiva === 'resumo' && 'Visão Geral & Gráficos'}
                {abaAtiva === 'transacoes' && 'Transações Financeiras'}
                {abaAtiva === 'categorias' && 'Categorias Financeiras'}
                {abaAtiva === 'contas' && 'Contas & Caixas'}
                {abaAtiva === 'relatorios' && 'Relatórios Financeiros'}
                {abaAtiva === 'historico' && 'Histórico & Logs'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <select
                value={abaAtiva}
                onChange={(e) => handleMudarAba(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="resumo">📊 Visão Geral & Gráficos</option>
                {hasAccess('Financeiro', 'Transações') && <option value="transacoes">💵 Transações</option>}
                {hasAccess('Financeiro', 'Categorias') && <option value="categorias">🏷️ Categorias</option>}
                {hasAccess('Financeiro', 'Contas') && <option value="contas">🏛️ Contas & Caixas</option>}
                {hasAccess('Financeiro', 'Relatórios financeiros') && <option value="relatorios">📈 Relatórios</option>}
                {hasAccess('Financeiro', 'Logs') && <option value="historico">📜 Histórico / Logs</option>}
              </select>

              <button
                onClick={carregarDadosIniciais}
                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition shrink-0"
                title="Recarregar Dados"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${carregando ? 'animate-spin text-blue-600' : ''}`} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ABA: VISÃO GERAL COM PAINEL DE FILTROS E NOVOS GRÁFICOS DINÂMICOS */}
      {abaAtiva === 'resumo' && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">

          {/* BARRA DE FILTROS DINÂMICOS - COMPACTA E EXPANDÍVEL EM MOBILE */}
          <div className="bg-[#0f172a] p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white shadow-md border border-slate-800 space-y-3 sm:space-y-4">

            {/* Cabeçalho do Filtro com Toggle Mobile */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 sm:pb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <div>
                  <h2 className="text-sm sm:text-base font-black text-white leading-tight">
                    Filtros dos Gráficos
                  </h2>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium hidden sm:block">
                    Altere os filtros para atualizar instantaneamente todos os gráficos e métricas.
                  </p>
                </div>
              </div>

              {/* Controles Mobile */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFiltrosPainelExpandidos(!filtrosPainelExpandidos)}
                  className="sm:hidden px-2.5 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-1"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                  <span>{filtrosPainelExpandidos ? 'Ocultar' : 'Filtrar'}</span>
                  {filtrosPainelExpandidos ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {/* Botões de Atalhos Rápidos para Desktop */}
                <div className="hidden sm:flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => aplicarAtalhoPeriodo('este_mes')}
                    className="px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-xs font-bold text-slate-200 transition border border-slate-700"
                  >
                    Este Mês
                  </button>
                  <button
                    onClick={() => aplicarAtalhoPeriodo('mes_anterior')}
                    className="px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-xs font-bold text-slate-200 transition border border-slate-700"
                  >
                    Mês Anterior
                  </button>
                  <button
                    onClick={() => aplicarAtalhoPeriodo('este_ano')}
                    className="px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-xs font-bold text-slate-200 transition border border-slate-700"
                  >
                    Ano Atual
                  </button>
                  <button
                    onClick={() => aplicarAtalhoPeriodo('todos')}
                    className="px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-xs font-bold text-slate-200 transition border border-slate-700"
                  >
                    Todo o Período
                  </button>
                  <button
                    onClick={() => aplicarAtalhoPeriodo('limpar')}
                    className="px-3 py-1.5 rounded-lg bg-[#881337] hover:bg-[#9f1239] text-xs font-bold text-rose-200 transition border border-rose-900 flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    Limpar
                  </button>
                </div>
              </div>
            </div>

            {/* Atalhos Rápidos Horizontais para Mobile */}
            <div className="sm:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => aplicarAtalhoPeriodo('este_mes')}
                className="px-2.5 py-1 rounded-md bg-[#1e293b] text-[11px] font-bold text-slate-200 border border-slate-700 shrink-0"
              >
                Este Mês
              </button>
              <button
                onClick={() => aplicarAtalhoPeriodo('mes_anterior')}
                className="px-2.5 py-1 rounded-md bg-[#1e293b] text-[11px] font-bold text-slate-200 border border-slate-700 shrink-0"
              >
                Mês Ant.
              </button>
              <button
                onClick={() => aplicarAtalhoPeriodo('este_ano')}
                className="px-2.5 py-1 rounded-md bg-[#1e293b] text-[11px] font-bold text-slate-200 border border-slate-700 shrink-0"
              >
                Ano Atual
              </button>
              <button
                onClick={() => aplicarAtalhoPeriodo('todos')}
                className="px-2.5 py-1 rounded-md bg-[#1e293b] text-[11px] font-bold text-slate-200 border border-slate-700 shrink-0"
              >
                Todos
              </button>
              {temFiltroAtivo && (
                <button
                  onClick={() => aplicarAtalhoPeriodo('limpar')}
                  className="px-2.5 py-1 rounded-md bg-[#881337] text-[11px] font-bold text-rose-200 border border-rose-900 shrink-0 flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Limpar
                </button>
              )}
            </div>

            {/* Form de Filtros (Expandível em Mobile, Sempre visível em Desktop) */}
            <div className={`space-y-3 ${filtrosPainelExpandidos ? 'block' : 'hidden sm:block'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 pt-1">

                {/* Campo Busca Nome - Alinhamento Perfeito */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Pesquisar Lançamentos</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={buscaNome}
                      onChange={(e) => setBuscaNome(e.target.value)}
                      placeholder="Nome, fornecedor, nota..."
                      className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 pl-9 pr-8 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    {buscaNome && (
                      <button onClick={() => setBuscaNome('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Data Início */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Data Início</label>
                  <input
                    type="date"
                    value={dataInicioFiltro}
                    onChange={(e) => setDataInicioFiltro(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  />
                </div>

                {/* Data Fim */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Data Fim</label>
                  <input
                    type="date"
                    value={dataFimFiltro}
                    onChange={(e) => setDataFimFiltro(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Tipo</label>
                  <select
                    value={tipoTransacaoFiltro}
                    onChange={(e) => setTipoTransacaoFiltro(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  >
                    <option value="">Todos Tipos</option>
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Status</label>
                  <select
                    value={statusTransacaoFiltro}
                    onChange={(e) => setStatusTransacaoFiltro(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  >
                    <option value="">Todos Status</option>
                    <option value="pago">Pago / Recebido</option>
                    <option value="pendente">Pendente</option>
                  </select>
                </div>

              </div>

              {/* Linha Secundária de Filtros: Conta e Categoria */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-slate-800">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Conta / Caixa</label>
                  <select
                    value={contaFiltro}
                    onChange={(e) => setContaFiltro(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  >
                    <option value="">Todas as Contas</option>
                    {contas.map(c => (
                      <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Categoria</label>
                  <select
                    value={categoriaFiltro}
                    onChange={(e) => setCategoriaFiltro(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-[38px]"
                  >
                    <option value="">Todas as Categorias</option>
                    {categorias.map(c => (
                      <option key={c.id} value={c.id}>{c.nome} ({c.tipo})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Badge de Indicador do Filtro Ativo */}
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 pt-1">
              <span className="font-semibold">
                Exibindo <strong className="text-white font-black">{statsFiltradas.qtdTransacoes}</strong> lançamentos
              </span>
              {temFiltroAtivo && (
                <span className="bg-blue-600/30 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                  Filtros Ativos
                </span>
              )}
            </div>

          </div>

          {/* METRIC CARDS OTIMIZADOS PARA MOBILE (GRID 2x2 EM SMARTPHONES) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">

            {/* Card Receitas - Verde Sólido */}
            <div className="bg-[#059669] p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl text-white shadow-sm flex items-center justify-between transition hover:-translate-y-0.5 duration-200">
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-100 truncate">Total Recebido</p>
                <p className="text-sm sm:text-2xl font-black mt-0.5 sm:mt-1 tracking-tight truncate">{formatMoeda(statsFiltradas.totalReceitas)}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shrink-0 ml-1">
                <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>

            {/* Card Despesas - Vermelho Sólido */}
            <div className="bg-[#e11d48] p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl text-white shadow-sm flex items-center justify-between transition hover:-translate-y-0.5 duration-200">
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-rose-100 truncate">Total Pago</p>
                <p className="text-sm sm:text-2xl font-black mt-0.5 sm:mt-1 tracking-tight truncate">{formatMoeda(statsFiltradas.totalDespesas)}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shrink-0 ml-1">
                <ArrowDownRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>

            {/* Card Saldo Líquido - Azul / Âmbar Sólido */}
            <div className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl text-white shadow-sm flex items-center justify-between transition hover:-translate-y-0.5 duration-200 ${statsFiltradas.saldoLiquido >= 0
              ? 'bg-[#2563eb]'
              : 'bg-[#d97706]'
              }`}>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider opacity-90 truncate">Saldo Líquido</p>
                <p className="text-sm sm:text-2xl font-black mt-0.5 sm:mt-1 tracking-tight truncate">{formatMoeda(statsFiltradas.saldoLiquido)}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shrink-0 ml-1">
                <Wallet className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>

            {/* Card Pendentes - Âmbar Sólido */}
            <div className="bg-[#d97706] p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl text-white shadow-sm flex items-center justify-between transition hover:-translate-y-0.5 duration-200">
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-100 truncate">Pendentes</p>
                <p className="text-sm sm:text-2xl font-black mt-0.5 sm:mt-1 tracking-tight truncate">{formatMoeda(statsFiltradas.totalPendentes)}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shrink-0 ml-1">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>

          </div>

          {/* GRÁFICO PRINCIPAL: EVOLUÇÃO TEMPORAL COM RESPONSIVIDADE MOBILE */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6 border-b border-slate-100 pb-3 sm:pb-4">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  Fluxo de Caixa no Período
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Evolução das entradas, saídas e saldo filtrados.
                </p>
              </div>

              <div className="flex items-center gap-2.5 text-[11px] font-bold">
                <span className="flex items-center gap-1 text-[#10b981]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] inline-block" /> Receitas
                </span>
                <span className="flex items-center gap-1 text-[#f43f5e]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] inline-block" /> Despesas
                </span>
                <span className="flex items-center gap-1 text-[#2563eb]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] inline-block" /> Saldo
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-80 w-full">
              {dadosEvolucaoTemporal.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs gap-2 italic">
                  <BarChart3 className="w-8 h-8 opacity-30 text-slate-400" />
                  Nenhum lançamento no filtro.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={dadosEvolucaoTemporal} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      formatter={(val, name) => [`R$ ${formatMoedaValor(val)}`, name]}
                      contentStyle={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '14px',
                        boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)',
                        fontSize: '11px'
                      }}
                    />
                    <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
                    <Bar dataKey="despesas" name="Despesas" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={28} />
                    <Area type="monotone" dataKey="saldo" name="Saldo Líquido" stroke="#2563eb" strokeWidth={2.5} fill="#3b82f6" fillOpacity={0.12} />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* GRID DE GRÁFICOS SECUNDÁRIOS: CATEGORIAS DE RECEITA & DESPESA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

            {/* Top Categorias - Receita */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-800">Top Categorias de Receita</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Principais entradas filtradas</p>
                </div>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>

              <div className="h-52 sm:h-64 w-full">
                {dadosCategoriasFiltradas.receitas.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
                    Sem receitas no filtro.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dadosCategoriasFiltradas.receitas} layout="vertical" margin={{ left: 0, right: 20, top: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#334155' }} width={95} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(val) => [`R$ ${formatMoedaValor(val)}`, 'Total']} />
                      <Bar dataKey="value" name="Total R$" radius={[0, 4, 4, 0]}>
                        {dadosCategoriasFiltradas.receitas.map((entry, index) => (
                          <Cell key={`cell-rec-${index}`} fill={coresSolidas[index % coresSolidas.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Top Categorias - Despesa */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-800">Top Categorias de Despesa</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Principais saídas filtradas</p>
                </div>
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
              </div>

              <div className="h-52 sm:h-64 w-full">
                {dadosCategoriasFiltradas.despesas.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
                    Sem despesas no filtro.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dadosCategoriasFiltradas.despesas} layout="vertical" margin={{ left: 0, right: 20, top: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#334155' }} width={95} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(val) => [`R$ ${formatMoedaValor(val)}`, 'Total']} />
                      <Bar dataKey="value" name="Total R$" radius={[0, 4, 4, 0]}>
                        {dadosCategoriasFiltradas.despesas.map((entry, index) => (
                          <Cell key={`cell-des-${index}`} fill={['#f43f5e', '#e11d48', '#d97706', '#8b5cf6', '#ef4444'][index % 5]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

          </div>

          {/* GRID DE GRÁFICOS: PROPORÇÃO DE STATUS & MOVIMENTAÇÃO POR CONTA */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Gráfico Donut de Status (Pago vs Pendente) */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between">
              <div className="border-b border-slate-100 pb-2.5 mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-800">Proporção de Status</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Pago vs Pendente</p>
                </div>
                <PieIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              </div>

              <div className="h-48 sm:h-56 w-full flex items-center justify-center">
                {dadosStatusPie.length === 0 ? (
                  <div className="text-slate-400 text-xs italic">Sem dados no filtro.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dadosStatusPie}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {dadosStatusPie.map((entry, index) => (
                          <Cell key={`pie-cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val) => [`R$ ${formatMoedaValor(val)}`, 'Valor']} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Gráfico de Contas / Caixas */}
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between">
              <div className="border-b border-slate-100 pb-2.5 mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-800">Movimentação por Conta / Caixa</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">Totais de entradas e saídas por conta financeira</p>
                </div>
                <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
              </div>

              <div className="h-48 sm:h-56 w-full">
                {dadosSaldosContas.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
                    Sem dados por conta no filtro.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dadosSaldosContas} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(val, name) => [`R$ ${formatMoedaValor(val)}`, name]} />
                      <Legend wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={26} />
                      <Bar dataKey="despesas" name="Despesas" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={26} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* OUTRAS SUB-ABAS DO MÓDULO FINANCEIRO */}
      {abaAtiva === 'transacoes' && (
        <TransacoesFinanceiras
          dataInicioFiltro={dataInicioFiltro}
          setDataInicioFiltro={setDataInicioFiltro}
          dataFimFiltro={dataFimFiltro}
          setDataFimFiltro={setDataFimFiltro}
          tipoTransacaoFiltro={tipoTransacaoFiltro}
          setTipoTransacaoFiltro={setTipoTransacaoFiltro}
          statusTransacaoFiltro={statusTransacaoFiltro}
          setStatusTransacaoFiltro={setStatusTransacaoFiltro}
          contaFiltro={contaFiltro}
          setContaFiltro={setContaFiltro}
          categoriaFiltro={categoriaFiltro}
          setCategoriaFiltro={setCategoriaFiltro}
          usuarioLogado={usuarioLogado}
          membroLogado={membroLogado}
          hasAccess={hasAccess}
          filtrosMobileAberto={filtrosMobileAberto}
          setFiltrosMobileAberto={setFiltrosMobileAberto}
          onVoltar={() => handleMudarAba('resumo')}
        />
      )}

      {abaAtiva === 'categorias' && (
        <CategoriasFinanceiras usuarioLogado={usuarioLogado} membroLogado={membroLogado} hasAccess={hasAccess} onVoltar={() => handleMudarAba('resumo')} />
      )}

      {abaAtiva === 'contas' && (
        <ContasFinanceiras usuarioLogado={usuarioLogado} membroLogado={membroLogado} hasAccess={hasAccess} onVoltar={() => handleMudarAba('resumo')} />
      )}

      {abaAtiva === 'relatorios' && <RelatoriosFinanceiros onVoltar={() => handleMudarAba('resumo')} />}

      {abaAtiva === 'historico' && <HistoricoFinanceiro onVoltar={() => handleMudarAba('resumo')} />}

    </div>
  );
}
