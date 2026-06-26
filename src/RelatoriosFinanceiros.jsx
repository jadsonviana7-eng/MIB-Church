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
  DollarSign,
  Search
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
  const [busca, setBusca] = useState(''); // Estado para busca rápida

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

  // Função helper para mudar de relatório limpando filtros antigos incompatíveis
  const handleSelecionarRelatorio = (nomeRelatorio) => {
    setRelatorioAtivo(nomeRelatorio);
    setTipo([]);
    setStatus([]);
    setConta([]);
    setCatReceita([]);
    setCatDespesa([]);
    setBusca('');
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

      if (relatorioAtivo.startsWith('receitas') || relatorioAtivo.startsWith('cat-receita')) {
        query = query.eq('tipo', 'receita');
      } else if (relatorioAtivo.startsWith('despesas') || relatorioAtivo.startsWith('cat-despesa') || relatorioAtivo === 'despesas-a-pagar') {
        query = query.eq('tipo', 'despesa');
      }
      if (relatorioAtivo === 'despesas-a-pagar') {
        query = query.eq('status', 'pendente');
      }
      
      if (relatorioAtivo.startsWith('cat-')) {
        const catId = relatorioAtivo.replace('cat-receita-', '').replace('cat-despesa-', '');
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

  // 3. Filtragem cliente-side para busca rápida e confortável
  const transacoesFiltradas = useMemo(() => {
    if (!busca) return transacoes;
    const b = busca.toLowerCase();
    return transacoes.filter(t => 
      t.descricao?.toLowerCase().includes(b) || 
      t.pessoas?.nome?.toLowerCase().includes(b) ||
      t.categorias_financeiras?.nome?.toLowerCase().includes(b) ||
      t.contas_financeiras?.nome?.toLowerCase().includes(b) ||
      String(t.valor).includes(b)
    );
  }, [transacoes, busca]);

  // 4. Cálculos dos resumos baseados nos resultados filtrados
  const resumoCalculado = useMemo(() => {
    return transacoesFiltradas.reduce((acc, t) => {
      const v = Number(t.valor) || 0;
      const tipo = t.tipo?.toLowerCase();
      const status = t.status?.toLowerCase();

      if (tipo === 'receita' && status === 'pago') acc.receitas += v;
      if (tipo === 'despesa' && status === 'pago') acc.despesas += v;
      if (tipo === 'despesa' && status === 'pendente') acc.aPagar += v;
      
      acc.movimentacao = acc.receitas - acc.despesas;
      return acc;
    }, { receitas: 0, despesas: 0, aPagar: 0, movimentacao: 0 });
  }, [transacoesFiltradas]);

  // 5. Cálculos específicos para o DRE (Demonstrativo de Receitas e Despesas)
  const dreDados = useMemo(() => {
    const receitasMap = {};
    const despesasMap = {};
    let totalReceitas = 0;
    let totalDespesas = 0;

    transacoesFiltradas.forEach(t => {
      const v = Number(t.valor) || 0;
      const catNome = t.categorias_financeiras?.nome || 'Sem Categoria';
      const tipo = t.tipo?.toLowerCase();
      const status = t.status?.toLowerCase();

      if (status === 'pago') {
        if (tipo === 'receita') {
          receitasMap[catNome] = (receitasMap[catNome] || 0) + v;
          totalReceitas += v;
        } else if (tipo === 'despesa') {
          despesasMap[catNome] = (despesasMap[catNome] || 0) + v;
          totalDespesas += v;
        }
      }
    });

    return {
      receitas: Object.entries(receitasMap).map(([categoria, valor]) => ({ categoria, valor })),
      despesas: Object.entries(despesasMap).map(([categoria, valor]) => ({ categoria, valor })),
      totalReceitas,
      totalDespesas,
      resultadoLiquido: totalReceitas - totalDespesas
    };
  }, [transacoesFiltradas]);

  // 6. Cálculos específicos para Resumo por Categoria
  const resumoCategoriasDados = useMemo(() => {
    const categoriasMap = {};
    let totalGeral = 0;

    transacoesFiltradas.forEach(t => {
      const v = Number(t.valor) || 0;
      const catNome = t.categorias_financeiras?.nome || 'Sem Categoria';
      const tipo = t.tipo?.toLowerCase();
      
      if (!categoriasMap[catNome]) {
        categoriasMap[catNome] = { nome: catNome, tipo: t.tipo, qtd: 0, total: 0 };
      }
      categoriasMap[catNome].qtd += 1;
      categoriasMap[catNome].total += v;
      
      if (tipo === 'receita') totalGeral += v;
      else if (tipo === 'despesa') totalGeral -= v;
    });

    return {
      lista: Object.values(categoriasMap).sort((a, b) => b.total - a.total),
      totalGeral
    };
  }, [transacoesFiltradas]);

  const getTituloRelatorio = () => {
    if (relatorioAtivo.startsWith('cat-')) {
      const catId = relatorioAtivo.replace('cat-receita-', '').replace('cat-despesa-', '');
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

  // Exportação de dados formatados em planilha (CSV / Excel XLS)
  const exportarPlanilha = (formato = 'csv') => {
    let headers = [];
    let linhas = [];
    const divisor = formato === 'xls' ? '\t' : ',';
    const extensao = formato === 'xls' ? 'xls' : 'csv';
    const mimeType = formato === 'xls' ? 'application/vnd.ms-excel' : 'text/csv';

    if (relatorioAtivo === 'fluxo-receitas-despesas') {
      headers = ['Categoria', 'Tipo', 'Valor'];
      dreDados.receitas.forEach(r => {
        linhas.push([r.categoria, 'Receita', r.valor.toFixed(2)]);
      });
      linhas.push(['Subtotal Receitas', '', dreDados.totalReceitas.toFixed(2)]);
      dreDados.despesas.forEach(d => {
        linhas.push([d.categoria, 'Despesa', d.valor.toFixed(2)]);
      });
      linhas.push(['Subtotal Despesas', '', dreDados.totalDespesas.toFixed(2)]);
      linhas.push(['Resultado Líquido do Período', '', dreDados.resultadoLiquido.toFixed(2)]);
    } else if (relatorioAtivo === 'fluxo-resumo-categoria' || relatorioAtivo === 'receitas-resumo-anual' || relatorioAtivo === 'despesas-resumo-anual') {
      headers = ['Categoria', 'Tipo', 'Lançamentos', 'Total Acumulado'];
      resumoCategoriasDados.lista.forEach(c => {
        linhas.push([c.nome, c.tipo, c.qtd, c.total.toFixed(2)]);
      });
      linhas.push(['Saldo Líquido Total', '', '', resumoCategoriasDados.totalGeral.toFixed(2)]);
    } else {
      headers = ['Data', 'Descrição', 'Pessoa', 'Categoria', 'Conta', 'Valor', 'Tipo', 'Status'];
      transacoesFiltradas.forEach(t => {
        linhas.push([
          t.data ? new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR') : '',
          t.descricao || '',
          t.pessoas?.nome || 'Lançamento Avulso',
          t.categorias_financeiras?.nome || 'Sem Categoria',
          t.contas_financeiras?.nome || 'Sem Conta',
          Number(t.valor).toFixed(2),
          t.tipo || '',
          t.status || ''
        ]);
      });
      linhas.push(['Saldo Anterior', '', '', '', '', saldoAnterior.toFixed(2), '', '']);
      linhas.push(['Total Receitas', '', '', '', '', resumoCalculado.receitas.toFixed(2), '', '']);
      linhas.push(['Total Despesas', '', '', '', '', resumoCalculado.despesas.toFixed(2), '', '']);
      linhas.push(['Saldo Final', '', '', '', '', (saldoAnterior + resumoCalculado.movimentacao).toFixed(2), '', '']);
    }

    const contentString = [headers.join(divisor), ...linhas.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(divisor))].join('\n');
    const blob = new Blob(["\uFEFF" + contentString], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const nomeArquivo = `${getTituloRelatorio().toLowerCase().replace(/[^a-z0-9]/g, '-')}-${dataInicio}-a-${dataFim}.${extensao}`;
    link.href = url;
    link.setAttribute("download", nomeArquivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // Renderização das tabelas com o novo layout do resumo no final dos relatórios (balancete contábil)
  const renderTabelaResultados = () => {
    if (relatorioAtivo === 'fluxo-receitas-despesas') {
      // Layout DRE
      return (
        <div className="printable-table-container overflow-x-auto">
          <table className="table-mib printable-table">
            <thead>
              <tr>
                <th className="py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-left bg-slate-100/80">Categoria</th>
                <th className="py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-100/80 w-[20%]">Tipo</th>
                <th className="py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right pr-6 bg-slate-100/80 w-[25%]">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Seção Receitas */}
              <tr className="bg-emerald-50/50 font-bold border-t border-slate-200">
                <td colSpan="3" className="py-2 px-4 text-emerald-800 uppercase tracking-wider text-[11px] font-black">1. Receitas</td>
              </tr>
              {dreDados.receitas.length === 0 ? (
                <tr className="border-b border-slate-100">
                  <td colSpan="3" className="py-2 px-6 text-slate-400 text-xs italic">Nenhuma receita registrada no período.</td>
                </tr>
              ) : (
                dreDados.receitas.map(({ categoria, valor }) => (
                  <tr key={categoria} className="border-b border-slate-100 hover:bg-slate-50/60 even:bg-slate-50/20 transition duration-150">
                    <td className="py-2.5 px-6 text-slate-700 font-bold text-xs">{categoria}</td>
                    <td className="py-2.5 px-4 text-center text-xs text-slate-500 font-medium">Receita</td>
                    <td className="py-2.5 px-4 pr-6 text-right text-emerald-600 font-bold text-xs">+ R$ {formatarValor(valor)}</td>
                  </tr>
                ))
              )}
              <tr className="bg-white border-t border-slate-200 font-bold">
                <td colSpan="2" className="py-2 px-6 text-right text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Subtotal Receitas (+):</td>
                <td className="py-2 px-4 pr-6 text-right text-emerald-700 text-xs font-extrabold">R$ {formatarValor(dreDados.totalReceitas)}</td>
              </tr>

              {/* Seção Despesas */}
              <tr className="bg-rose-50/50 font-bold border-t-2 border-slate-200">
                <td colSpan="3" className="py-2 px-4 text-rose-800 uppercase tracking-wider text-[11px] font-black">2. Despesas</td>
              </tr>
              {dreDados.despesas.length === 0 ? (
                <tr className="border-b border-slate-100">
                  <td colSpan="3" className="py-2 px-6 text-slate-400 text-xs italic">Nenhuma despesa registrada no período.</td>
                </tr>
              ) : (
                dreDados.despesas.map(({ categoria, valor }) => (
                  <tr key={categoria} className="border-b border-slate-100 hover:bg-slate-50/60 even:bg-slate-50/20 transition duration-150">
                    <td className="py-2.5 px-6 text-slate-700 font-bold text-xs">{categoria}</td>
                    <td className="py-2.5 px-4 text-center text-xs text-slate-500 font-medium">Despesa</td>
                    <td className="py-2.5 px-4 pr-6 text-right text-rose-600 font-bold text-xs">- R$ {formatarValor(valor)}</td>
                  </tr>
                ))
              )}
              <tr className="bg-white border-t border-slate-200 font-bold">
                <td colSpan="2" className="py-2 px-6 text-right text-[10px] font-bold text-rose-700 uppercase tracking-widest">Subtotal Despesas (-):</td>
                <td className="py-2 px-4 pr-6 text-right text-rose-700 text-xs font-extrabold">R$ {formatarValor(dreDados.totalDespesas)}</td>
              </tr>
            </tbody>
            <tfoot>
              {/* Novo rodapé de balanço contábil formal */}
              <tr className="border-t-2 border-b-2 border-double border-slate-400 bg-slate-100/50 font-black">
                <td colSpan="2" className="py-3 px-6 text-right text-xs font-black text-slate-800 uppercase tracking-widest">Resultado Líquido do Período:</td>
                <td className={`py-3 px-4 pr-6 text-right text-sm font-black ${dreDados.resultadoLiquido >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  R$ {formatarValor(dreDados.resultadoLiquido)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }

    if (relatorioAtivo === 'fluxo-resumo-categoria' || relatorioAtivo === 'receitas-resumo-anual' || relatorioAtivo === 'despesas-resumo-anual') {
      // Resumo Geral por Categoria
      return (
        <div className="printable-table-container overflow-x-auto">
          <table className="table-mib printable-table">
            <thead>
              <tr>
                <th className="py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-left bg-slate-100/80">Categoria</th>
                <th className="py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-100/80 w-[20%]">Tipo</th>
                <th className="py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-100/80 w-[20%]">Lançamentos</th>
                <th className="py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right pr-6 bg-slate-100/80 w-[25%]">Total Acumulado</th>
              </tr>
            </thead>
            <tbody>
              {resumoCategoriasDados.lista.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400 text-xs italic">Nenhum lançamento encontrado para os filtros selecionados.</td>
                </tr>
              ) : (
                resumoCategoriasDados.lista.map(c => {
                  const isReceita = c.tipo?.toLowerCase() === 'receita';
                  return (
                    <tr key={c.nome} className="border-b border-slate-100 hover:bg-slate-50/60 even:bg-slate-50/20 transition duration-150">
                      <td className="py-2.5 px-4 text-slate-700 font-bold text-xs">{c.nome}</td>
                      <td className="py-2.5 px-4 text-center text-xs">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${isReceita ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {c.tipo}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-center text-xs text-slate-500 font-semibold">{c.qtd}</td>
                      <td className={`py-2.5 px-4 pr-6 text-right font-bold text-xs ${isReceita ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isReceita ? '+' : '-'} R$ {formatarValor(c.total)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              {/* Novo rodapé de balanço contábil formal */}
              <tr className="border-t-2 border-b-2 border-double border-slate-400 bg-slate-100/50 font-black">
                <td colSpan="3" className="py-3 px-4 text-right text-xs font-black text-slate-800 uppercase tracking-widest">Saldo Líquido Geral:</td>
                <td className={`py-3 px-4 pr-6 text-right text-sm font-black ${resumoCategoriasDados.totalGeral >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  R$ {formatarValor(resumoCategoriasDados.totalGeral)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }

    // Extrato Detalhado Padrão
    return (
      <div className="printable-table-container overflow-x-auto">
        <table className="table-mib printable-table">
          <thead>
            <tr>
              <th className="w-[12%] py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-left bg-slate-100/80">Data</th>
              <th className="py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-left bg-slate-100/80">Descrição / Pessoa</th>
              <th className="w-[18%] py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-left bg-slate-100/80">Categoria</th>
              <th className="w-[18%] py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-left bg-slate-100/80">Conta</th>
              <th className="text-right pr-6 w-[20%] py-2.5 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100/80">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoesFiltradas.map(t => {
              const isReceita = t.tipo?.toLowerCase() === 'receita';
              return (
                <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50/60 even:bg-slate-50/20 transition duration-150">
                  <td className="whitespace-nowrap py-3 px-4 text-slate-600 text-xs font-medium">
                    {t.data ? new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 print:gap-0">
                      {/* Oculta imagem de avatar no PDF */}
                      <div className="print:hidden">
                        <Avatar pessoa={t.pessoas} tamanho="w-7 h-7" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-700 text-xs print:text-[11px] print:font-semibold truncate">{t.descricao}</span>
                        <span className="text-[10px] text-slate-400 print:text-[9px] truncate">{t.pessoas?.nome || 'Lançamento Avulso'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${isReceita ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {t.categorias_financeiras?.nome || 'Sem Categoria'}
                    </span>
                  </td>
                  <td className="text-slate-500 py-3 px-4 text-xs font-medium">{t.contas_financeiras?.nome || 'Sem Conta'}</td>
                  <td className={`text-right pr-6 font-bold text-xs whitespace-nowrap ${isReceita ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isReceita ? '+' : '-'} R$ {formatarValor(t.valor)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {/* Novo rodapé de balanço contábil formal (resumo mais profissional no final) */}
            <tr className="border-t-2 border-slate-300">
              <td colSpan="3" className="py-2.5 px-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo anterior (acumulado):</td>
              <td colSpan="2" className="py-2.5 px-4 pr-6 text-right text-xs font-bold text-slate-600">R$ {formatarValor(saldoAnterior)}</td>
            </tr>
            <tr className="border-t border-slate-100 bg-emerald-50/20">
              <td colSpan="3" className="py-2.5 px-4 text-right text-[10px] font-bold text-emerald-600/80 uppercase tracking-widest">Total de receitas no período (+):</td>
              <td colSpan="2" className="py-2.5 px-4 pr-6 text-right text-xs font-bold text-emerald-600">R$ {formatarValor(resumoCalculado.receitas)}</td>
            </tr>
            <tr className="border-t border-slate-100 bg-rose-50/20">
              <td colSpan="3" className="py-2.5 px-4 text-right text-[10px] font-bold text-rose-600/80 uppercase tracking-widest">Total de despesas no período (-):</td>
              <td colSpan="2" className="py-2.5 px-4 pr-6 text-right text-xs font-bold text-rose-600">R$ {formatarValor(resumoCalculado.despesas)}</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td colSpan="3" className="py-2.5 px-4 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resultado Líquido do Período:</td>
              <td colSpan="2" className={`py-2.5 px-4 pr-6 text-right text-xs font-bold ${resumoCalculado.movimentacao >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
                R$ {formatarValor(resumoCalculado.movimentacao)}
              </td>
            </tr>
            {resumoCalculado.aPagar > 0 && (
              <tr className="border-t border-slate-100 bg-amber-50/10">
                <td colSpan="3" className="py-2.5 px-4 text-right text-[10px] font-bold text-amber-600/80 uppercase tracking-widest">Contas a pagar (pendentes):</td>
                <td colSpan="2" className="py-2.5 px-4 pr-6 text-right text-xs font-bold text-amber-600">R$ {formatarValor(resumoCalculado.aPagar)}</td>
              </tr>
            )}
            <tr className="border-t-2 border-b-2 border-double border-slate-400 bg-slate-100/50 font-black">
              <td colSpan="3" className="py-3 px-4 text-right text-xs font-black text-slate-800 uppercase tracking-widest">Saldo Final Consolidado:</td>
              <td colSpan="2" className="py-3 px-4 pr-6 text-right text-sm font-black text-slate-900">
                R$ {formatarValor(saldoAnterior + resumoCalculado.movimentacao)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-6xl pt-0 px-0 pb-12 sm:px-6 space-y-6 mx-[-3px] sm:mx-auto">
      <div className="print:hidden mx-[3px] sm:mx-0">
        <PageHeader titulo="Relatórios Financeiros" breadcrumb={['Resumo', 'Relatórios']} onNavigate={onVoltar} />
      </div>
      
      {/* 1. Elementos de Filtros em Card Integrado (Oculto na Impressão) - !overflow-visible adicionado para evitar corte do calendário */}
      <Card className="p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-sm print:hidden space-y-4 !overflow-visible">
        <div className="flex flex-col lg:flex-row gap-4 items-end justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-end w-full lg:w-auto">
            {/* Seletor de Período Estilizado */}
            <div className="relative w-full sm:w-auto sm:min-w-[240px]">
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#055F6D] mb-1.5 pl-1">Data do Relatório</label>
              <div 
                onClick={() => setCalendarioAberto(!calendarioAberto)}
                className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer transition-all hover:border-[#055F6D]/50 hover:bg-slate-50/80 group"
              >
                <CalendarDays className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.8} />
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <span>{formatarExibicao(dataInicio)}</span>
                  <span className="text-slate-300">→</span>
                  <span>{formatarExibicao(dataFim)}</span>
                </div>
              </div>
              {calendarioAberto && <CalendarPopup />}
            </div>

            {/* Campo de Busca Rápida */}
            <div className="relative w-full sm:w-72">
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#055F6D] mb-1.5 pl-1">Buscar transação</label>
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4.5 h-4.5 text-slate-400 pointer-events-none" strokeWidth={1.8} />
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar descrição, categoria..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#055F6D] focus:bg-white transition placeholder-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Toggles e Limpeza */}
          <div className="flex gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setMostrarFiltrosAvancados(!mostrarFiltrosAvancados)}
              className={`flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-black transition-all ${mostrarFiltrosAvancados ? 'bg-[#055F6D] text-white border-[#055F6D]' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
              {mostrarFiltrosAvancados ? 'Ocultar Filtros' : 'Filtros Avançados'}
            </button>
            
            {(tipo.length > 0 || status.length > 0 || conta.length > 0 || catReceita.length > 0 || catDespesa.length > 0 || busca !== '') && (
              <button
                type="button"
                onClick={() => { setTipo([]); setStatus([]); setConta([]); setCatReceita([]); setCatDespesa([]); setBusca(''); }}
                className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs font-black hover:bg-rose-100 transition shadow-sm"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Filtros Avançados Expansíveis */}
        {mostrarFiltrosAvancados && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
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
          </div>
        )}
      </Card>

      {/* 2. Conteúdo Inferior - Relatório à esquerda e Painel à direita */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 items-start px-[3px] sm:px-0">
        <div className="space-y-4 w-full">
          {/* Seletor Mobile de Relatórios no Topo */}
          <div className="xl:hidden bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2 print:hidden">
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#055F6D]">Selecione o Relatório</label>
            <select
              value={relatorioAtivo}
              onChange={(e) => handleSelecionarRelatorio(e.target.value)}
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
            <Card className="p-4 sm:p-8 min-h-[600px] print:p-0 print:border-none print:shadow-none print:bg-white rounded-3xl border border-slate-100 shadow-sm printable-report">
              {/* Estilos de impressão para margens A4 e layout de tabela limpa */}
              <style>{`
                @media print {
                  @page {
                    size: A4;
                    margin: 1.2cm 1cm;
                  }
                  aside, header, nav, footer, .print-hidden, .print\:hidden, button, select, input, .lucide {
                    display: none !important;
                  }
                  body, .max-w-6xl, .grid, .space-y-6, .space-y-4, .p-4, .p-8, .Card, .card, .bg-white {
                    max-width: 100% !important;
                    width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    border: none !important;
                    box-shadow: none !important;
                    background: white !important;
                    color: black !important;
                    display: block !important;
                  }
                  .printable-table-container {
                    display: block !important;
                    visibility: visible !important;
                    width: 100% !important;
                    overflow: visible !important;
                  }
                  .printable-table {
                    display: table !important;
                    width: 100% !important;
                    border-collapse: collapse !important;
                    margin-top: 15px !important;
                  }
                  .printable-table th, .printable-table td {
                    border: 1px solid #cbd5e1 !important;
                    padding: 6px 8px !important;
                    font-size: 10px !important;
                    color: #000 !important;
                    background: transparent !important;
                  }
                  .printable-table th {
                    background-color: #f1f5f9 !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    font-weight: bold !important;
                  }
                  .printable-table tr {
                    page-break-inside: avoid !important;
                  }
                  .printable-cards-container {
                    display: none !important;
                  }
                }
              `}</style>

              {/* Ações de Exportação */}
              <div className="flex justify-end gap-2 mb-6 print:hidden">
                <button onClick={() => exportarPlanilha('csv')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  CSV
                </button>
                <button onClick={() => exportarPlanilha('xls')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition uppercase tracking-wider">
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
                <img src="/logo-mib-mundau.png" alt="Logo" className="h-16 w-auto object-contain bg-white rounded-lg p-1 print:hidden" />
                <div className="print:hidden">
                  <h2 className="text-xl font-black text-slate-900/75 uppercase leading-none">{dadosIgreja?.nome_igreja || 'MIB CHURCH'}</h2>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex flex-wrap justify-center gap-x-4 mt-2">
                    <span>CNPJ: {formatarCNPJ(dadosIgreja?.cnpj)}</span>
                    <span>TEL: {formatarTelefone(dadosIgreja?.telefone)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{dadosIgreja?.endereco || '—'}</p>
                </div>
                
                <div className="pt-1 w-full print:text-left print:border-b print:border-slate-300 print:pb-2">
                  <h3 className="text-lg font-bold text-[#055F6D] print:text-slate-800 tracking-tight print:text-base">
                    {getTituloRelatorio()}
                  </h3>
                  <p className="text-xs font-normal text-slate-500 print:text-slate-600 mt-1">
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
                  
                  {/* TABELA - Visível em desktop e também na impressão (PDF) para qualquer dispositivo */}
                  <div className="hidden md:block printable-table-container">
                    {renderTabelaResultados()}
                  </div>

                  {/* LISTA DE CARDS - Visível em Mobile apenas na tela */}
                  <div className="md:hidden space-y-4 printable-cards-container print:hidden">
                    <div className="divide-y divide-slate-100 bg-slate-50/40 rounded-2xl border border-slate-100">
                      {transacoesFiltradas.map(t => {
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

                    {/* Resumo/Totais para Mobile na tela (Novo Rodapé Contábil Simulado) */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 text-xs shadow-sm">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Resumo Financeiro Consolidado</h4>
                      
                      <div className="flex justify-between items-center text-slate-500">
                        <span className="font-semibold">Saldo anterior (acumulado):</span>
                        <span className="font-bold text-slate-700">R$ {formatarValor(saldoAnterior)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-emerald-600 bg-emerald-50/20 px-2 py-1 rounded-lg">
                        <span className="font-semibold">Total de receitas no período (+):</span>
                        <span className="font-bold">R$ {formatarValor(resumoCalculado.receitas)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-rose-600 bg-rose-50/20 px-2 py-1 rounded-lg">
                        <span className="font-semibold">Total de despesas no período (-):</span>
                        <span className="font-bold">R$ {formatarValor(resumoCalculado.despesas)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-slate-700 border-t border-slate-100 pt-2">
                        <span className="font-semibold">Resultado Líquido do Período:</span>
                        <span className={`font-bold ${resumoCalculado.movimentacao >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
                          R$ {formatarValor(resumoCalculado.movimentacao)}
                        </span>
                      </div>
                      
                      {resumoCalculado.aPagar > 0 && (
                        <div className="flex justify-between items-center text-amber-600 bg-amber-50/10 px-2 py-1 rounded-lg">
                          <span className="font-semibold">Contas a pagar (pendentes):</span>
                          <span className="font-bold">R$ {formatarValor(resumoCalculado.aPagar)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center text-slate-900 border-t-2 border-b-2 border-double border-slate-400 bg-slate-50/60 p-2.5 text-sm font-black rounded-lg">
                        <span>Saldo Final Consolidado:</span>
                        <span>R$ {formatarValor(saldoAnterior + resumoCalculado.movimentacao)}</span>
                      </div>
                    </div>
                  </div>

                  {/* TABELA DE IMPRESSÃO (PDF) EM MOBILE - Oculta na tela e visível apenas em print */}
                  <div className="md:hidden hidden print:block printable-table-container">
                    {renderTabelaResultados()}
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
                <h4 className="text-[14px] font-black text-slate-400 uppercase border-l-2 border-[#055F6D] pl-2 mb-3 tracking-widest">Fluxo de Caixa</h4>
                <button 
                  onClick={() => handleSelecionarRelatorio('fluxo-extrato')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'fluxo-extrato' ? 'bg-[#055F6D] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Extrato
                </button>
                <button 
                  onClick={() => handleSelecionarRelatorio('fluxo-receitas-despesas')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'fluxo-receitas-despesas' ? 'bg-[#055F6D] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Receitas / Despesas
                </button>
                <button 
                  onClick={() => handleSelecionarRelatorio('fluxo-resumo-categoria')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'fluxo-resumo-categoria' ? 'bg-[#055F6D] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Resumo Geral por Categoria
                </button>
              </div>

              {/* Receitas */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="text-[14px] font-black text-slate-400 uppercase border-l-2 border-emerald-600 pl-2 mb-3 tracking-widest">Receitas</h4>
                <button 
                  onClick={() => handleSelecionarRelatorio('receitas-extrato-diario')} 
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
                          onClick={() => handleSelecionarRelatorio(`cat-receita-${cat.id}`)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-medium transition ${relatorioAtivo === `cat-receita-${cat.id}` ? 'text-emerald-700 bg-emerald-50 font-bold' : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'}`}
                        >
                          • {cat.nome}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleSelecionarRelatorio('receitas-resumo-anual')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'receitas-resumo-anual' ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Resumo Anual por Categoria
                </button>
              </div>

              {/* Despesas */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="text-[14px] font-black text-slate-400 uppercase border-l-2 border-rose-600 pl-2 mb-3 tracking-widest">Despesas</h4>
                <button 
                  onClick={() => handleSelecionarRelatorio('despesas-extrato-diario')} 
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${relatorioAtivo === 'despesas-extrato-diario' ? 'bg-rose-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  Extrato Diário
                </button>
                <button 
                  onClick={() => handleSelecionarRelatorio('despesas-a-pagar')} 
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
                          onClick={() => handleSelecionarRelatorio(`cat-despesa-${cat.id}`)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-medium transition ${relatorioAtivo === `cat-despesa-${cat.id}` ? 'text-rose-700 bg-rose-50 font-bold' : 'text-slate-500 hover:text-rose-600 hover:bg-slate-50'}`}
                        >
                          • {cat.nome}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleSelecionarRelatorio('despesas-resumo-anual')} 
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
      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#055F6D] mb-1.5 pl-1">{label}</label>
      <div 
        onClick={() => setAberto(!aberto)}
        className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer transition-all shadow-sm hover:border-[#055F6D]/50 hover:bg-white"
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