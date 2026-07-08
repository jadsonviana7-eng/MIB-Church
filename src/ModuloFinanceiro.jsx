import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { PageHeader, chartColors } from './ui'; 
import TransacoesFinanceiras from './TransacoesFinanceiras';
import CategoriasFinanceiras from './CategoriasFinanceiras';
import ContasFinanceiras from './ContasFinanceiras';
import RelatoriosFinanceiros from './RelatoriosFinanceiros';
import HistoricoFinanceiro from './HistoricoFinanceiro';
import { 
  ComposedChart, 
  BarChart,
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
  Settings, 
  Percent, 
  BarChart3, 
  UserSquare2, 
  Building2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Upload
} from 'lucide-react';

export default function ModuloFinanceiro({ meses, submenu, usuarioLogado, membroLogado, hasAccess, filtrosMobileAberto, setFiltrosMobileAberto, onNavigate }) {
  const [abaAtiva, setAbaAtiva] = useState(submenu || 'resumo');
  const [anoFiltro, setAnoFiltro] = useState(new Date().getFullYear().toString());
  const [mesFiltro, setMesFiltro] = useState(new Date().getMonth().toString());
  const [transacoes, setTransacoes] = useState([]);
  const [contas, setContas] = useState([]);
  const [expandidoMobile, setExpandidoMobile] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const handleMudarAba = useCallback((novaAba) => {
    setAbaAtiva(novaAba);
    if (onNavigate) {
      onNavigate(novaAba);
    }
  }, [onNavigate]);

  // Paleta de cores vibrantes e contrastantes para as barras das categorias horizontais
  const coresCategorias = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#f97316'];

  // Estados para os filtros de Transações
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

  // Sincroniza a aba ativa quando o submenu mudar pelo menu principal
  useEffect(() => {
    if (submenu) setAbaAtiva(submenu);
  }, [submenu]);

  const carregarDadosIniciais = useCallback(async () => {
    if (!hasAccess('Financeiro')) {
      setTransacoes([]);
      setContas([]);
      setCarregando(false);
      return;
    }

    setCarregando(true);
    
    const [resTransacoes, resContas] = await Promise.all([
      supabase.from('transacoes_financeiras').select('*, categorias_financeiras(nome)').eq('status', 'pago'),
      supabase.from('contas_financeiras').select('id, nome').order('nome')
    ]);
    
    if (!resTransacoes.error) setTransacoes(resTransacoes.data || []);
    if (!resContas.error) setContas(resContas.data || []);
    
    setCarregando(false);
  }, [hasAccess]);

  useEffect(() => {
    carregarDadosIniciais();
  }, [carregarDadosIniciais]);

  // Cálculos do Sumário
  const stats = useMemo(() => {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    let saldoTotal = 0;
    let receitasMes = 0;
    let despesasMes = 0;

    transacoes.forEach(t => {
      const valor = Number(t.valor) || 0;
      const dataT = new Date(t.data + 'T00:00:00');
      const isMesAtual = dataT.getMonth() === mesAtual && dataT.getFullYear() === anoAtual;

      if (t.tipo === 'receita') {
        saldoTotal += valor;
        if (isMesAtual) receitasMes += valor;
      } else if (t.tipo === 'despesa') {
        saldoTotal -= valor;
        if (isMesAtual) despesasMes += valor;
      }
    });

    return { saldoTotal, receitasMes, despesasMes };
  }, [transacoes]);

  // Cálculo de Saldo Individual por Conta
  const saldosPorConta = useMemo(() => {
    const saldos = {};
    transacoes.forEach(t => {
      const v = Number(t.valor) || 0;
      if (!saldos[t.conta_id]) saldos[t.conta_id] = 0;
      if (t.tipo === 'receita') saldos[t.conta_id] += v;
      else if (t.tipo === 'despesa') saldos[t.conta_id] -= v;
    });
    return saldos;
  }, [transacoes]);

  // Dados Reais para o Gráfico Anual
  const dadosAnuaisReais = useMemo(() => {
    const anoRef = parseInt(anoFiltro);
    const mesesAbv = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    const base = mesesAbv.map(m => ({ name: m, receitas: 0, despesas: 0, saldo: 0 }));

    transacoes.forEach(t => {
      const dataT = new Date(t.data + 'T00:00:00');
      if (dataT.getFullYear() === anoRef) {
        const mIdx = dataT.getMonth();
        const valor = Number(t.valor) || 0;
        if (t.tipo === 'receita') base[mIdx].receitas += valor;
        if (t.tipo === 'despesa') base[mIdx].despesas += valor;
      }
    });

    return base.map(item => ({ ...item, saldo: item.receitas - item.despesas }));
  }, [transacoes, anoFiltro]);

  // Dados Reais para o Gráfico Mensal (Semanas)
  const dadosMensaisReais = useMemo(() => {
    const anoRef = parseInt(anoFiltro);
    const mesRef = parseInt(mesFiltro);
    const semanas = [{ name: 'Sem 1', receitas: 0, despesas: 0 }, { name: 'Sem 2', receitas: 0, despesas: 0 }, { name: 'Sem 3', receitas: 0, despesas: 0 }, { name: 'Sem 4', receitas: 0, despesas: 0 }, { name: 'Sem 5', receitas: 0, despesas: 0 }];

    transacoes.forEach(t => {
      const dataT = new Date(t.data + 'T00:00:00');
      if (dataT.getFullYear() === anoRef && dataT.getMonth() === mesRef) {
        const sIdx = Math.min(Math.floor((dataT.getDate() - 1) / 7), 4);
        const valor = Number(t.valor) || 0;
        if (t.tipo === 'receita') semanas[sIdx].receitas += valor;
        if (t.tipo === 'despesa') semanas[sIdx].despesas += valor;
      }
    });

    return semanas.map(s => ({ ...s, saldo: s.receitas - s.despesas }));
  }, [transacoes, mesFiltro, anoFiltro]);

  // Dados Agrupados por Categoria para os Gráficos Horizontais
  const dadosCategorias = useMemo(() => {
    const receitasMap = {};
    const despesasMap = {};

    transacoes.forEach(t => {
      const valor = Number(t.valor) || 0;
      const catNome = t.categorias_financeiras?.nome || 'Sem Categoria';
      const tipo = t.tipo?.toLowerCase();

      if (tipo === 'receita') {
        receitasMap[catNome] = (receitasMap[catNome] || 0) + valor;
      } else if (tipo === 'despesa') {
        despesasMap[catNome] = (despesasMap[catNome] || 0) + valor;
      }
    });

    const receitasOrdenadas = Object.entries(receitasMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5

    const despesasOrdenadas = Object.entries(despesasMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5

    return { receitas: receitasOrdenadas, despesas: despesasOrdenadas };
  }, [transacoes]);

  const formatMoeda = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formatMoedaValor = (val) => val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (!hasAccess('Financeiro')) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-sm font-semibold text-slate-500">
        Você não possui acesso ao módulo financeiro.
      </div>
    );
  }

  return (
      <div className="space-y-6">
        {abaAtiva === 'resumo' && (
          <>
            <div className="hidden md:block">
              <PageHeader titulo="Módulo Financeiro"/>
            </div>
          <div className="space-y-6">
              
              {/* Cards de Sumário Geral com Nova Roupa Premium - Visível apenas em Desktop */}
              <div className="hidden sm:grid grid-cols-1 md:grid-cols-4 gap-4">
                <CardResumo 
                  title="Saldo Total" 
                  value={formatMoeda(stats.saldoTotal)} 
                  gradient="bg-gradient-to-br from-[#0d1e52] to-[#2563eb]" 
                  icon={Wallet} 
                />
                <CardResumo 
                  title="Contas / Caixas" 
                  value={`${contas.length} Contas`} 
                  gradient="bg-gradient-to-br from-cyan-600 to-blue-500" 
                  icon={Landmark} 
                />
                <CardResumo 
                  title="Receitas (Mês)" 
                  value={formatMoeda(stats.receitasMes)} 
                  gradient="bg-gradient-to-br from-emerald-600 to-teal-500" 
                  icon={ArrowUpRight} 
                />
                <CardResumo 
                  title="Despesas (Mês)" 
                  value={formatMoeda(stats.despesasMes)} 
                  gradient="bg-gradient-to-br from-rose-600 to-red-500" 
                  icon={ArrowDownRight} 
                />
              </div>

              {/* Sumário em Card Único com Design Atualizado - Visível apenas em Mobile */}
              <div className="sm:hidden bg-[#0d1e52] p-2 rounded-3xl border border-blue-900/40 text-white shadow-xl">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Saldo Total Geral</p>
                    <p className="text-2xl font-black mt-0.5">{formatMoeda(stats.saldoTotal)}</p>
                  </div>
                  <button 
                    onClick={() => setExpandidoMobile(!expandidoMobile)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/5 transition-transform duration-300 ${expandidoMobile ? 'rotate-180' : ''}`}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
                
                {expandidoMobile && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300 border-t border-white/10 mt-2">
                    {/* Resumo do Mês */}
                    <div className="grid grid-cols-2 divide-x divide-white/5 border-b border-white/5 py-2">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Receitas (Mês)</span>
                        </div>
                        <p className="text-base font-black text-emerald-400 leading-none">{formatMoeda(stats.receitasMes)}</p>
                      </div>
                      
                      <div className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Despesas (Mês)</span>
                          <div className="w-2 h-2 rounded-full bg-rose-400" />
                        </div>
                        <p className="text-base font-black text-rose-400 leading-none">{formatMoeda(stats.despesasMes)}</p>
                      </div>
                    </div>

                    {/* Saldos por Conta */}
                    <div className="p-4 space-y-3">
                      <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1.5">Saldos por Conta</p>
                      {contas.map(conta => (
                        <div key={conta.id} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                          <span className="text-xs font-semibold text-blue-100">{conta.nome}</span>
                          <span className={`text-xs font-black ${saldosPorConta[conta.id] >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {formatMoeda(saldosPorConta[conta.id] || 0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cards de Atalhos Rápidos com Cores Diferenciadas, em ordem dos submenus */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {hasAccess('Financeiro', 'Transações') && (
                  <CardAtalhoFinanceiro 
                    label="Transações" 
                    icon={DollarSign} 
                    gradient="from-blue-500 to-indigo-600" 
                    onClick={() => handleMudarAba('transacoes')} 
                  />
                )}
                {hasAccess('Financeiro', 'Relatórios financeiros') && (
                  <CardAtalhoFinanceiro 
                    label="Relatórios" 
                    icon={BarChart3} 
                    gradient="from-emerald-500 to-teal-600" 
                    onClick={() => handleMudarAba('relatorios')} 
                  />
                )}
                {hasAccess('Financeiro', 'Categorias') && (
                  <CardAtalhoFinanceiro 
                    label="Categorias" 
                    icon={Tag} 
                    gradient="from-amber-500 to-orange-600" 
                    onClick={() => handleMudarAba('categorias')} 
                  />
                )}
                {hasAccess('Financeiro', 'Contas') && (
                  <CardAtalhoFinanceiro 
                    label="Contas / Caixas" 
                    icon={Landmark} 
                    gradient="from-cyan-500 to-sky-600" 
                    onClick={() => handleMudarAba('contas')} 
                  />
                )}
                {hasAccess('Financeiro', 'Importar') && (
                  <CardAtalhoFinanceiro 
                    label="Importar" 
                    icon={Upload} 
                    gradient="from-purple-500 to-fuchsia-600" 
                    onClick={() => handleMudarAba('importar')} 
                  />
                )}
                {hasAccess('Financeiro', 'Logs') && (
                  <CardAtalhoFinanceiro 
                    label="Histórico / Logs" 
                    icon={History} 
                    gradient="from-violet-500 to-purple-600" 
                    onClick={() => handleMudarAba('historico')} 
                  />
                )}
              </div>

              {/* Seção de Gráficos de Tendência com Gradientes e Área Translúcida */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Gráfico Anual */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700">Resumo Anual</h3>
                    <select 
                      value={anoFiltro} 
                      onChange={(e) => setAnoFiltro(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg p-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#055F6D]"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={dadosAnuaisReais}>
                        <defs>
                          <linearGradient id="colorReceitasAnual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.85}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                          </linearGradient>
                          <linearGradient id="colorDespesasAnual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.85}/>
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.2}/>
                          </linearGradient>
                          <linearGradient id="colorSaldoAnual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{fontSize: 11}} stroke="#94a3b8" />
                        <YAxis tick={{fontSize: 11}} stroke="#94a3b8" />
                        <Tooltip />
                        <Legend wrapperStyle={{fontSize: 11}} />
                        <Bar dataKey="receitas" name="Receitas" fill="url(#colorReceitasAnual)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="despesas" name="Despesas" fill="url(#colorDespesasAnual)" radius={[4, 4, 0, 0]} />
                        <Area type="monotone" dataKey="saldo" name="Saldo Líquido" stroke="#2563eb" strokeWidth={2.5} fill="url(#colorSaldoAnual)" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Gráfico Mensal */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700">Resumo Mensal (Semanas)</h3>
                    <select 
                      value={mesFiltro} 
                      onChange={(e) => setMesFiltro(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg p-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#055F6D]"
                    >
                      {meses.map((m, idx) => (
                        <option key={idx} value={idx}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={dadosMensaisReais}>
                        <defs>
                          <linearGradient id="colorReceitasMensal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.85}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                          </linearGradient>
                          <linearGradient id="colorDespesasMensal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.85}/>
                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.2}/>
                          </linearGradient>
                          <linearGradient id="colorSaldoMensal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{fontSize: 11}} stroke="#94a3b8" />
                        <YAxis tick={{fontSize: 11}} stroke="#94a3b8" />
                        <Tooltip />
                        <Bar dataKey="receitas" fill="url(#colorReceitasMensal)" name="Receitas" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="despesas" fill="url(#colorDespesasMensal)" name="Despesas" radius={[4, 4, 0, 0]} />
                        <Area type="monotone" dataKey="saldo" stroke="#2563eb" strokeWidth={2.5} fill="url(#colorSaldoMensal)" name="Saldo Líquido" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Seção de Gráficos de Categorias Horizontais com Cores Individuais */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Categorias - Receitas */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700">Distribuição de Receitas por Categoria (Top 5)</h3>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="h-64">
                    {dadosCategorias.receitas.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-xs text-slate-400 italic">Nenhum lançamento encontrado.</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dadosCategorias.receitas} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                          <XAxis type="number" tick={{fontSize: 10}} stroke="#94a3b8" />
                          <YAxis dataKey="name" type="category" tick={{fontSize: 10}} stroke="#94a3b8" width={110} />
                          <Tooltip formatter={(value) => [`R$ ${formatMoedaValor(value)}`, 'Total']} />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {dadosCategorias.receitas.map((entry, index) => (
                              <Cell key={`cell-rec-${index}`} fill={coresCategorias[index % coresCategorias.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* Categorias - Despesas */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700">Distribuição de Despesas por Categoria (Top 5)</h3>
                    <TrendingDown className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="h-64">
                    {dadosCategorias.despesas.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-xs text-slate-400 italic">Nenhum lançamento encontrado.</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dadosCategorias.despesas} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                          <XAxis type="number" tick={{fontSize: 10}} stroke="#94a3b8" />
                          <YAxis dataKey="name" type="category" tick={{fontSize: 10}} stroke="#94a3b8" width={110} />
                          <Tooltip formatter={(value) => [`R$ ${formatMoedaValor(value)}`, 'Total']} />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {dadosCategorias.despesas.map((entry, index) => (
                              <Cell key={`cell-des-${index}`} fill={coresCategorias[index % coresCategorias.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>

          </div>
          </>
        )}

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

        {/* Mapeamento das outras sub-abas aqui */}
        {abaAtiva !== 'resumo' && (
          abaAtiva !== 'transacoes' && 
          abaAtiva !== 'categorias' && 
          abaAtiva !== 'contas' && 
          abaAtiva !== 'historico' &&
          abaAtiva !== 'relatorios' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h2 className="text-lg font-bold text-slate-700 capitalize mb-2">{abaAtiva}</h2>
              <p className="text-xs text-slate-500">Área de gerenciamento do submódulo {abaAtiva}.</p>
            </div>
          )
        )}
      </div>
  );
}

// Componentes Auxiliares Locais Premium
function CardResumo({ title, value, gradient, icon: Icon }) {
  return (
    <div className={`p-5 rounded-3xl shadow-md ${gradient} text-white flex items-center justify-between transition hover:-translate-y-1 hover:shadow-lg duration-200`}>
      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-wider opacity-80">{title}</p>
        <p className="text-xl font-black mt-1.5 tracking-tight">{value}</p>
      </div>
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md shrink-0">
          <Icon className="w-5.5 h-5.5 text-white" />
        </div>
      )}
    </div>
  );
}

function CardAtalhoFinanceiro({ label, icon: Icon, gradient, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3.5 py-3.5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-md text-left text-xs font-bold text-slate-700 transition group cursor-pointer hover:-translate-y-0.5 duration-300 overflow-hidden"
    >
      <span className={`p-2 rounded-xl bg-gradient-to-br ${gradient} text-white group-hover:scale-105 transition shrink-0`}>
        <Icon className="w-4 h-4" strokeWidth={2.2} />
      </span>
      <span className="flex-1 tracking-tight truncate">{label}</span>
    </button>
  );
}
