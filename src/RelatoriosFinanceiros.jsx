import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { PageHeader, Card, CardHeader, Avatar } from './ui';
import { 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal, 
  Printer, 
  FileSpreadsheet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function RelatoriosFinanceiros({ onVoltar }) {
  // Estados dos Filtros
  const [dataInicio, setDataInicio] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
  });
  const [dataFim, setDataFim] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  
  const [tipo, setTipo] = useState([]);
  const [status, setStatus] = useState([]);
  const [conta, setConta] = useState([]);
  const [catReceita, setCatReceita] = useState([]);
  const [catDespesa, setCatDespesa] = useState([]);

  const [expansaoReceitas, setExpansaoReceitas] = useState(false);
  const [expansaoDespesas, setExpansaoDespesas] = useState(false);
  const [relatorioAtivo, setRelatorioAtivo] = useState(''); // Estado para o relatório selecionado
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [saldoAnterior, setSaldoAnterior] = useState(0);
  const [dadosIgreja, setDadosIgreja] = useState(null);

  // Estados do Calendário
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false);

  // Dados Auxiliares
  const [contas, setContas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const { data: c } = await supabase.from('contas_financeiras').select('id, nome').order('nome');
      if (c) setContas(c);

      const { data: cat } = await supabase.from('categorias_financeiras').select('id, nome, tipo').order('nome');
      if (cat) setCategorias(cat);

      const { data: igr } = await supabase.from('dados_igreja').select('*').eq('id', 1).single();
      if (igr) setDadosIgreja(igr);
    };
    carregarDados();
  }, []);

  const nomesRelatorios = {
    'fluxo-extrato': 'Extrato de Fluxo de Caixa',
    'fluxo-receitas-despesas': 'Demonstrativo de Receitas e Despesas',
    'fluxo-resumo-categoria': 'Resumo Geral por Categoria',
    'receitas-extrato-diario': 'Extrato Diário de Receitas',
    'receitas-por-categoria': 'Receitas por Categoria',
    'receitas-resumo-anual': 'Resumo Anual de Receitas por Categoria',
    'despesas-extrato-diario': 'Extrato Diário de Despesas',
    'despesas-a-pagar': 'Contas a Pagar',
    'despesas-por-categoria': 'Despesas por Categoria',
    'despesas-resumo-anual': 'Resumo Anual de Despesas por Categoria'
  };

  // Função para buscar dados automaticamente
  const carregarDadosRelatorio = useCallback(async () => {
    if (!relatorioAtivo) return;
    setCarregando(true);
    setSaldoAnterior(0);

    try {
      // 1. Calcular Saldo Anterior (Tudo o que foi pago ANTES da dataInicio)
      if (dataInicio) {
        let anteriorQuery = supabase
          .from('transacoes_financeiras')
          .select('tipo, valor')
          .lt('data', dataInicio)
          .eq('status', 'pago');
        
        if (conta.length > 0) anteriorQuery = anteriorQuery.in('conta_id', conta);

        const { data: anteriorData } = await anteriorQuery;
        
        const anterior = anteriorData?.reduce((acc, t) => t.tipo?.toLowerCase() === 'receita' ? acc + Number(t.valor) : acc - Number(t.valor), 0) || 0;
        setSaldoAnterior(anterior);
      }

      // 2. Buscar Transações do Período
      let query = supabase
        .from('transacoes_financeiras')
        .select('*, pessoas(nome, foto_url), categorias_financeiras(nome), contas_financeiras(nome)')
        .order('data', { ascending: true });

      if (dataInicio) query = query.gte('data', dataInicio);
      if (dataFim) query = query.lte('data', dataFim);

      if (tipo.length > 0) query = query.in('tipo', tipo.map(t => t.toLowerCase()));
      if (status.length > 0) query = query.in('status', status.map(s => s.toLowerCase()));
      if (conta.length > 0) query = query.in('conta_id', conta);
      
      const categoriasIds = [...catReceita, ...catDespesa];
      if (categoriasIds.length > 0) query = query.in('categoria_id', categoriasIds);

      if (relatorioAtivo.includes('receitas')) query = query.eq('tipo', 'receita');
      if (relatorioAtivo.includes('despesas')) query = query.eq('tipo', 'despesa');
      if (relatorioAtivo === 'despesas-a-pagar') query = query.eq('status', 'pendente');
      
      if (relatorioAtivo.startsWith('cat-')) {
        const catId = relatorioAtivo.split('-').pop();
        query = query.eq('categoria_id', catId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setTransacoes(data || []);
    } catch (err) {
      console.error('Erro ao gerar relatório:', err);
    } finally {
      setCarregando(false);
    }
  }, [relatorioAtivo, dataInicio, dataFim, tipo, status, conta, catReceita, catDespesa]);

  useEffect(() => {
    carregarDadosRelatorio();
  }, [carregarDadosRelatorio]);

  const resumoCalculado = useMemo(() => {
    return transacoes.reduce((acc, t) => {
      const v = Number(t.valor) || 0;
      const tipo = t.tipo?.toLowerCase();
      const status = t.status?.toLowerCase();

      if (tipo === 'receita' && status === 'pago') acc.receitas += v;
      if (tipo === 'despesa' && status === 'pago') acc.despesas += v;
      if (tipo === 'despesa' && status === 'pendente') acc.aPagar += v;
      
      acc.movimentacao = acc.receitas - acc.despesas;
      return acc;
    }, { receitas: 0, despesas: 0, aPagar: 0, movimentacao: 0 });
  }, [transacoes]);

  const getTituloRelatorio = () => {
    if (relatorioAtivo.startsWith('cat-')) {
      const catId = relatorioAtivo.split('-').pop();
      const nomeCat = categorias.find(c => c.id === catId)?.nome;
      const prefixo = relatorioAtivo.includes('receita') ? 'Extrato de Receitas:' : 'Extrato de Despesas:';
      return `${prefixo} ${nomeCat || 'Categoria'}`;
    }
    return nomesRelatorios[relatorioAtivo] || 'Relatório';
  };

  // Helpers de Data
  const formatarParaISO = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatarExibicao = (iso) => {
    if (!iso) return '__/__/__';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y.slice(-2)}`;
  };

  const formatarValor = (valor) => {
    const v = Number(valor) || 0;
    return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Helpers de formatação institucional
  const formatarCNPJ = (v) => v?.replace(/\D/g, '').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5") || '—';
  const formatarTelefone = (v) => v?.replace(/\D/g, '').replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3") || '—';

  const diasCalendario = useMemo(() => {
    const ano = viewDate.getFullYear();
    const mes = viewDate.getMonth();
    const primeiroDiaMes = new Date(ano, mes, 1).getDay();
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
    const dias = [];
    for (let i = 0; i < (primeiroDiaMes === 0 ? 6 : primeiroDiaMes - 1); i++) dias.push(null);
    for (let d = 1; d <= ultimoDiaMes; d++) dias.push(new Date(ano, mes, d));
    return dias;
  }, [viewDate]);

  const handleSelecionarDia = (dia) => {
    const dStr = formatarParaISO(dia);
    if (!dataInicio || (dataInicio && dataFim)) {
      setDataInicio(dStr);
      setDataFim('');
    } else {
      if (dStr < dataInicio) {
        setDataFim(dataInicio);
        setDataInicio(dStr);
      } else {
        setDataFim(dStr);
      }
      setCalendarioAberto(false);
    }
  };

  const CalendarPopup = () => (
    <div className="absolute top-full left-0 mt-2 z-[100] bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 w-72 animate-in fade-in zoom-in duration-200">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 flex items-center justify-center transition-colors">
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-bold text-slate-700 capitalize">{viewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
        <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 flex items-center justify-center transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-300 mb-2">
        {['S','T','Q','Q','S','S','D'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {diasCalendario.map((dia, i) => {
          if (!dia) return <div key={i} />;
          const dStr = formatarParaISO(dia);
          const ativo = dStr === dataInicio || dStr === dataFim;
          const noRange = dataInicio && dataFim && dStr > dataInicio && dStr < dataFim;
          return (
            <button
              key={i} type="button" onClick={() => handleSelecionarDia(dia)}
              className={`h-8 w-8 text-xs rounded-lg transition-colors ${ativo ? 'bg-[#055F6D] text-white font-bold' : noRange ? 'bg-emerald-50 text-[#055F6D]' : 'hover:bg-slate-50 text-slate-600'}`}
            >
              {dia.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl pt-0 px-0 pb-12 sm:px-6 space-y-6 mx-[-3px] sm:mx-auto">
      <div className="print:hidden mx-[3px] sm:mx-0">
        <PageHeader titulo="Relatórios Financeiros" breadcrumb={['Resumo', 'Relatórios']} onNavigate={onVoltar} />
      </div>
      
      {/* 1. Elementos de Filtros (Sem Card) */}
      <div className="space-y-3 px-[3px] sm:px-0 print:hidden">
        <div className="flex flex-col md:flex-row gap-3 items-end">
          {/* Seletor de Período Estilizado */}
          <div className="relative w-full md:w-auto md:min-w-[240px]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">Data do Relatório</label>
            <div 
              onClick={() => setCalendarioAberto(!calendarioAberto)}
              className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer transition-all shadow-sm group hover:border-slate-300"
            >
              <CalendarDays className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.8} />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <span>{formatarExibicao(dataInicio)}</span>
                <span className="text-slate-300">→</span>
                <span>{formatarExibicao(dataFim)}</span>
              </div>
            </div>
            {calendarioAberto && <CalendarPopup />}
          </div>

          {/* Toggle de Filtros Avançados para Mobile */}
          <div className="md:hidden flex gap-2 w-full">
            <button
              type="button"
              onClick={() => setMostrarFiltrosAvancados(!mostrarFiltrosAvancados)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${mostrarFiltrosAvancados ? 'bg-[#055F6D] text-white border-[#055F6D]' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
              {mostrarFiltrosAvancados ? 'Ocultar Filtros' : 'Filtros Avançados'}
            </button>
            {(tipo.length > 0 || status.length > 0 || conta.length > 0 || catReceita.length > 0 || catDespesa.length > 0) && (
              <button
                type="button"
                onClick={() => { setTipo([]); setStatus([]); setConta([]); setCatReceita([]); setCatDespesa([]); }}
                className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs font-bold transition-all shadow-sm"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Linha de Filtros Avançados */}
        <div className={`${mostrarFiltrosAvancados ? 'grid' : 'hidden'} md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-3 items-end`}>
          <MultiSelectFiltro 
            label="Tipo" 
            valor={tipo} 
            onChange={setTipo} 
            opcoes={['Receita', 'Despesa', 'Transferência']} 
          />
          
          <MultiSelectFiltro 
            label="Status" 
            valor={status} 
            onChange={setStatus} 
            opcoes={['Pago', 'Pendente', 'Cancelado']} 
          />

          <MultiSelectFiltro 
            label="Contas" 
            valor={conta} 
            onChange={setConta} 
            opcoes={contas.map(c => ({ valor: c.id, label: c.nome }))} 
          />

          <MultiSelectFiltro 
            label="Cat. Receitas" 
            valor={catReceita} 
            onChange={setCatReceita} 
            opcoes={categorias.filter(c => c.tipo === 'receita').map(c => ({ valor: c.id, label: c.nome }))} 
          />

          <MultiSelectFiltro 
            label="Cat. Despesas" 
            valor={catDespesa} 
            onChange={setCatDespesa} 
            opcoes={categorias.filter(c => c.tipo === 'despesa').map(c => ({ valor: c.id, label: c.nome }))} 
          />

          <button 
            type="button" 
            onClick={() => { setTipo([]); setStatus([]); setConta([]); setCatReceita([]); setCatDespesa([]); setRelatorioAtivo(''); setTransacoes([]); }}
            className="hidden md:block text-[9px] font-black text-rose-500 hover:bg-rose-50 border border-rose-100 rounded-xl px-2 py-2.5 transition-colors uppercase tracking-widest h-fit mb-0.5"
          >
            Limpar Filtros
          </button>
        </div>
      </div>


      {/* 2. Conteúdo Inferior - Relatório à esquerda e Painel à direita */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 items-start px-[3px] sm:px-0">
        <div className="space-y-4">
          {/* Seletor Mobile de Relatórios no Topo */}
          <div className="xl:hidden bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#055F6D]">Selecione o Relatório</label>
            <select
              value={relatorioAtivo}
              onChange={(e) => setRelatorioAtivo(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 outline-none font-bold text-slate-700"
            >
              <option value="">-- Escolha um Relatório --</option>
              <optgroup label="Fluxo de Caixa">
                <option value="fluxo-extrato">Extrato de Fluxo de Caixa</option>
                <option value="fluxo-receitas-despesas">Demonstrativo de Receitas/Despesas</option>
                <option value="fluxo-resumo-categoria">Resumo Geral por Categoria</option>
              </optgroup>
              <optgroup label="Receitas">
                <option value="receitas-extrato-diario">Extrato Diário de Receitas</option>
                <option value="receitas-resumo-anual">Resumo Anual de Receitas</option>
                {categorias.filter(c => c.tipo === 'receita').map(cat => (
                  <option key={cat.id} value={`cat-receita-${cat.id}`}>Receita: {cat.nome}</option>
                ))}
              </optgroup>
              <optgroup label="Despesas">
                <option value="despesas-extrato-diario">Extrato Diário de Despesas</option>
                <option value="despesas-a-pagar">Contas a Pagar (Pendentes)</option>
                <option value="despesas-resumo-anual">Resumo Anual de Despesas</option>
                {categorias.filter(c => c.tipo === 'despesa').map(cat => (
                  <option key={cat.id} value={`cat-despesa-${cat.id}`}>Despesa: {cat.nome}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Área de exibição do relatório selecionado */}
          {relatorioAtivo ? (
            <Card className="p-4 sm:p-8 min-h-[600px] print:p-0 print:border-none print:shadow-none print:bg-white rounded-3xl border border-slate-100 shadow-sm">
              {/* Ações de Exportação */}
              {/* Estilos de impressão para margens A4 */}
              <style>{`
                @media print {
                  @page {
                    size: A4;
                    margin: 1cm;
                  }
                  thead tr {
                    background-color: #f1f5f9 !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                  }
                }
              `}</style>

              <div className="flex justify-end gap-2 mb-6 print:hidden">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  CSV
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Excel
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  PDF / Imprimir
                </button>
              </div>

              {/* Cabeçalho de Renderização do Relatório */}
              <div className="flex flex-col items-center text-center space-y-2 mb-4 border-b border-slate-100 pb-4 print:pt-0" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <img src="/logo-mib-mundau.png" alt="Logo" className="h-16 w-auto object-contain bg-white rounded-lg p-1" />
                <div>
                  <h2 className="text-xl font-black text-slate-900/75 uppercase leading-none">{dadosIgreja?.nome_igreja || 'MIB CHURCH'}</h2>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex flex-wrap justify-center gap-x-4 mt-2">
                    <span>CNPJ: {formatarCNPJ(dadosIgreja?.cnpj)}</span>
                    <span>TEL: {formatarTelefone(dadosIgreja?.telefone)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{dadosIgreja?.endereco || '—'}</p>
                </div>
                
                <div className="pt-1 w-full">
                  <h3 className="text-lg font-normal text-[#055F6D] tracking-tight">
                    {getTituloRelatorio()}
                  </h3>
                  <p className="text-xs font-normal text-slate-500 mt-1">
                    Período: {formatarExibicao(dataInicio)} até {formatarExibicao(dataFim)}
                  </p>
                </div>
              </div>

              {carregando ? (
                <div className="py-20 text-center text-slate-400 animate-pulse font-medium">Processando dados...</div>
              ) : transacoes.length === 0 ? (
                <div className="py-20 text-center text-slate-300 italic text-sm">Nenhum lançamento encontrado para os filtros selecionados.</div>
              ) : (
                <div className="w-full print:overflow-visible print:w-full" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {/* TABELA - Visível apenas em telas maiores (Desktop) */}
                  <div className="overflow-x-auto hidden md:block">
                    <table className="table-mib">
                      <thead>
                        <tr>
                          <th className="w-[10%]">Data</th>
                          <th className="w-[42%] text-left">Descrição / Pessoa</th>
                          <th className="w-[16%] whitespace-nowrap">Categoria</th>
                          <th className="w-[16%] whitespace-nowrap">Conta</th>
                          <th className="text-right pr-6 w-[16%] whitespace-nowrap">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transacoes.map(t => (
                          <tr key={t.id}>
                            <td className="whitespace-nowrap">{t.data ? new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <Avatar pessoa={t.pessoas} tamanho="w-8 h-8" />
                                <div className="flex flex-col">
                                  <span className="font-bold text-slate-700">{t.descricao}</span>
                                  <span className="text-[10px] text-slate-400">{t.pessoas?.nome || 'Lançamento Avulso'}</span>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${t.tipo === 'receita' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                {t.categorias_financeiras?.nome}
                              </span>
                            </td>
                            <td className="text-slate-500 whitespace-nowrap">{t.contas_financeiras?.nome}</td>
                            <td className={`text-right pr-6 font-bold whitespace-nowrap ${t.tipo === 'receita' ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {t.tipo === 'receita' ? '+' : '-'} R$ {Number(t.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-slate-50/50 border-t-2 border-slate-200">
                          <td colSpan="4" className="text-right py-2 pr-4 text-[14px] font-normal text-slate-500">Saldo anterior (até {dataInicio ? new Date(new Date(dataInicio + 'T00:00:00').getTime() - 86400000).toLocaleDateString('pt-BR') : '—'}):</td>
                          <td className="text-right py-2 pr-6 font-normal text-slate-600 text-[14px]">R$ {formatarValor(saldoAnterior)}</td>
                        </tr>
                        <tr className="bg-white border-t border-slate-100">
                          <td colSpan="4" className="text-right py-2 pr-4 text-[14px] font-normal text-emerald-600">Total de receitas no período (+):</td>
                          <td className="text-right py-2 pr-6 font-normal text-emerald-600 text-[14px]">R$ {formatarValor(resumoCalculado.receitas)}</td>
                        </tr>
                        <tr className="bg-white border-t border-slate-100">
                          <td colSpan="4" className="text-right py-2 pr-4 text-[14px] font-normal text-rose-600">Total de despesas no período (-):</td>
                          <td className="text-right py-2 pr-6 font-normal text-rose-600 text-[14px]">R$ {formatarValor(resumoCalculado.despesas)}</td>
                        </tr>
                        <tr className="bg-slate-50/30 border-t border-slate-100">
                          <td colSpan="4" className="text-right py-2 pr-4 text-[14px] font-normal text-slate-900">Soma de receitas e despesas (líquido):</td>
                          <td className={`text-right py-2 pr-6 font-normal text-[14px] ${resumoCalculado.movimentacao >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            R$ {formatarValor(resumoCalculado.movimentacao)}
                          </td>
                        </tr>
                        <tr className="bg-white border-t border-slate-100">
                          <td colSpan="4" className="text-right py-2 pr-4 text-[14px] font-normal text-amber-500">Contas a pagar (pendentes):</td>
                          <td className="text-right py-2 pr-6 font-normal text-amber-500 text-[14px]">R$ {formatarValor(resumoCalculado.aPagar)}</td>
                        </tr>
                        <tr className="bg-[#055F6D]/5 border-t-2 border-[#055F6D]/20">
                          <td colSpan="4" className="text-right py-3 pr-4 text-[14px] font-bold text-[#055F6D] tracking-tighter">Saldo final em {dataFim ? new Date(dataFim + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}:</td>
                          <td className="text-right py-3 pr-6 font-bold text-[14px] text-[#055F6D]">
                            R$ {formatarValor(saldoAnterior + resumoCalculado.movimentacao)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* CARDS LIST - Visível em Mobile */}
                  <div className="md:hidden space-y-4">
                    <div className="divide-y divide-slate-100 bg-slate-50/40 rounded-2xl border border-slate-100">
                      {transacoes.map(t => {
                        const isReceita = t.tipo === 'receita';
                        return (
                          <div key={t.id} className="p-4 space-y-2.5">
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-extrabold text-slate-400">
                                {t.data ? new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}
                              </span>
                              <span className={`text-xs font-black ${isReceita ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {isReceita ? '+' : '-'} R$ {Number(t.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2.5">
                              <Avatar pessoa={t.pessoas} tamanho="w-8 h-8" />
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-slate-800 text-xs truncate">{t.descricao}</span>
                                <span className="text-[10px] text-slate-400 truncate">{t.pessoas?.nome || 'Lançamento Avulso'}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${isReceita ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                {t.categorias_financeiras?.nome || 'Sem Categoria'}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-wider">
                                {t.contas_financeiras?.nome || 'Sem Conta'}
                              </span>
                              {t.status && (
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${t.status === 'pago' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                                  {t.status}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Resumo/Totais para Mobile */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-3 text-xs shadow-sm">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Sumário do Relatório</h4>
                      
                      <div className="flex justify-between items-center text-slate-500">
                        <span className="font-medium">Saldo anterior:</span>
                        <span className="font-bold">R$ {formatarValor(saldoAnterior)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-emerald-600">
                        <span className="font-medium">Total de receitas (+):</span>
                        <span className="font-bold">R$ {formatarValor(resumoCalculado.receitas)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-rose-600">
                        <span className="font-medium">Total de despesas (-):</span>
                        <span className="font-bold">R$ {formatarValor(resumoCalculado.despesas)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-slate-700 border-t border-slate-100 pt-2 font-bold">
                        <span>Líquido do período:</span>
                        <span className={resumoCalculado.movimentacao >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                          R$ {formatarValor(resumoCalculado.movimentacao)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-amber-500">
                        <span className="font-medium">Contas a pagar (pendentes):</span>
                        <span className="font-bold">R$ {formatarValor(resumoCalculado.aPagar)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-[#055F6D] border-t-2 border-[#055F6D]/20 pt-2.5 text-sm font-black">
                        <span>Saldo final:</span>
                        <span>R$ {formatarValor(saldoAnterior + resumoCalculado.movimentacao)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-12 text-center h-[350px] sm:h-[600px] flex items-center justify-center rounded-3xl border border-slate-100 shadow-sm">
              <div className="max-w-xs mx-auto space-y-3">
                <div className="text-4xl">📊</div>
                <h3 className="font-bold text-slate-800">Selecione um relatório</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Utilize o painel de controle ao lado para escolher o tipo de demonstrativo financeiro que deseja gerar.</p>
              </div>
            </Card>
          )}
        </div>

        {/* Coluna Direita: Painel de Controle de Relatórios */}
        <div className="space-y-4 print:hidden hidden xl:block">
          <Card className="p-0 rounded-3xl border border-slate-100 shadow-sm">
            <CardHeader titulo="Painel de Controle" subtitulo="Escolha o tipo de relatório financeiro." />
            <div className="p-4 space-y-4">
              {/* Fluxo de Caixa */}
              <div className="space-y-2">
                <h4 className="text-[18px] font-black text-slate-500 uppercase border-l-2 border-[#055F6D] pl-2 mb-3">Fluxo de Caixa</h4>
                <button 
                  onClick={() => setRelatorioAtivo('fluxo-extrato')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'fluxo-extrato' ? 'bg-[#055F6D] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Extrato
                </button>
                <button 
                  onClick={() => setRelatorioAtivo('fluxo-receitas-despesas')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'fluxo-receitas-despesas' ? 'bg-[#055F6D] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Receitas / Despesas
                </button>
                <button 
                  onClick={() => setRelatorioAtivo('fluxo-resumo-categoria')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'fluxo-resumo-categoria' ? 'bg-[#055F6D] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Resumo Geral por Categoria
                </button>
              </div>

              {/* Receitas */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="text-[18px] font-black text-slate-500 uppercase border-l-2 border-emerald-600 pl-2 mb-3">Receitas</h4>
                <button 
                  onClick={() => setRelatorioAtivo('receitas-extrato-diario')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'receitas-extrato-diario' ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Extrato Diário
                </button>
                <div>
                  <button 
                    onClick={() => setExpansaoReceitas(!expansaoReceitas)} 
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition bg-slate-50 text-slate-700 hover:bg-slate-100"
                  >
                    <span>Por Categoria</span>
                    <svg className={`w-3 h-3 transform transition-transform ${expansaoReceitas ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expansaoReceitas && (
                    <div className="mt-1 ml-3 pl-2 border-l border-emerald-100 space-y-1 py-1">
                      {categorias.filter(c => c.tipo === 'receita').map(cat => (
                        <button 
                          key={cat.id}
                          onClick={() => setRelatorioAtivo(`cat-receita-${cat.id}`)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-medium transition ${relatorioAtivo === `cat-receita-${cat.id}` ? 'text-emerald-700 bg-emerald-50 font-bold' : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'}`}
                        >
                          • {cat.nome}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setRelatorioAtivo('receitas-resumo-anual')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'receitas-resumo-anual' ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Resumo Anual por Categoria
                </button>
              </div>

              {/* Despesas */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="text-[18px] font-black text-slate-500 uppercase border-l-2 border-rose-600 pl-2 mb-3">Despesas</h4>
                <button 
                  onClick={() => setRelatorioAtivo('despesas-extrato-diario')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'despesas-extrato-diario' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Extrato Diário
                </button>
                <button 
                  onClick={() => setRelatorioAtivo('despesas-a-pagar')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'despesas-a-pagar' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  A Pagar
                </button>
                <div>
                  <button 
                    onClick={() => setExpansaoDespesas(!expansaoDespesas)} 
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition bg-slate-50 text-slate-700 hover:bg-slate-100"
                  >
                    <span>Por Categoria</span>
                    <svg className={`w-3 h-3 transform transition-transform ${expansaoDespesas ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expansaoDespesas && (
                    <div className="mt-1 ml-3 pl-2 border-l border-rose-100 space-y-1 py-1">
                      {categorias.filter(c => c.tipo === 'despesa').map(cat => (
                        <button 
                          key={cat.id}
                          onClick={() => setRelatorioAtivo(`cat-despesa-${cat.id}`)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-medium transition ${relatorioAtivo === `cat-despesa-${cat.id}` ? 'text-rose-700 bg-rose-50 font-bold' : 'text-slate-500 hover:text-rose-600 hover:bg-slate-50'}`}
                        >
                          • {cat.nome}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setRelatorioAtivo('despesas-resumo-anual')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'despesas-resumo-anual' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Resumo Anual por Categoria
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MultiSelectFiltro({ label, valor, onChange, opcoes }) {
  const [aberto, setAberto] = useState(false);
  
  const toggle = (val) => {
    if (valor.includes(val)) {
      onChange(valor.filter(item => item !== val));
    } else {
      onChange([...valor, val]);
    }
  };

  return (
    <div className="relative">
      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">{label}</label>
      <div 
        onClick={() => setAberto(!aberto)}
        className="flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer transition-all shadow-sm hover:border-slate-300"
      >
        <span className="text-xs font-semibold text-slate-700 truncate">
          {valor.length === 0 ? 'Todos' : `${valor.length} selecionado(s)`}
        </span>
        <svg className={`w-3 h-3 text-slate-400 transition-transform ${aberto ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {aberto && (
        <div className="absolute top-full left-0 mt-2 z-50 w-full bg-white border border-slate-200 shadow-xl rounded-xl p-2 max-h-60 overflow-y-auto">
          {opcoes.map(o => {
            const itemValor = typeof o === 'object' ? o.valor : o;
            const itemLabel = typeof o === 'object' ? o.label : o;
            const isSelected = valor.includes(itemValor);
            return (
              <label key={itemValor} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer text-xs font-medium text-slate-600">
                <input type="checkbox" checked={isSelected} onChange={() => toggle(itemValor)} className="w-3.5 h-3.5 rounded border-slate-300 text-[#055F6D] focus:ring-[#055F6D]/20" />
                {itemLabel}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}