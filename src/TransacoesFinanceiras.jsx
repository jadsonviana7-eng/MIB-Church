import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { PageHeader, Card, CardHeader, SelectFiltro } from './ui';
import { registrarLogFinanceiro } from './financeiroUtils';

export default function TransacoesFinanceiras({
  dataInicioFiltro, setDataInicioFiltro,
  dataFimFiltro, setDataFimFiltro,
  tipoTransacaoFiltro, setTipoTransacaoFiltro,
  statusTransacaoFiltro, setStatusTransacaoFiltro,
  contaFiltro, setContaFiltro,
  categoriaFiltro, setCategoriaFiltro,
  usuarioLogado,
}) {
  const [modalTransacao, setModalTransacao] = useState({ aberto: false, tipo: 'receita', dados: null });
  const [calendarioAberto, setCalendarioAberto] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [contasDisponiveis, setContasDisponiveis] = useState([]);
  const [categoriasDisponiveis, setCategoriasDisponiveis] = useState([]);
  const [pessoasDisponiveis, setPessoasDisponiveis] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const abrirModal = (tipo, transacao = null) => {
    setModalTransacao({ aberto: true, tipo, dados: transacao });
  };

  // Helper para evitar problemas de fuso horário ao converter para YYYY-MM-DD
  const formatarParaISO = (date) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Fecha o calendário ao clicar fora
  useEffect(() => {
    if (!calendarioAberto) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.datepicker-container')) {
        setCalendarioAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [calendarioAberto]);

  // Lógica para gerar os dias do calendário
  const diasCalendario = useMemo(() => {
    const ano = viewDate.getFullYear();
    const mes = viewDate.getMonth();
    const primeiroDiaMes = new Date(ano, mes, 1).getDay();
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
    
    const dias = [];
    // Dias vazios para alinhar o início da semana (ajustado para começar na segunda ou domingo conforme preferência)
    for (let i = 0; i < (primeiroDiaMes === 0 ? 6 : primeiroDiaMes - 1); i++) {
      dias.push(null);
    }
    for (let d = 1; d <= ultimoDiaMes; d++) {
      dias.push(new Date(ano, mes, d));
    }
    return dias;
  }, [viewDate]);

  const handleSelecionarDia = (data) => {
    const dataStr = formatarParaISO(data);
    
    if (!dataInicioFiltro || (dataInicioFiltro && dataFimFiltro)) {
      setDataInicioFiltro(dataStr);
      setDataFimFiltro('');
    } else {
      if (dataStr < dataInicioFiltro) {
        setDataFimFiltro(dataInicioFiltro);
        setDataInicioFiltro(dataStr);
      } else {
        setDataFimFiltro(dataStr);
      }
      setCalendarioAberto(false);
    }
  };

  const estaNoRange = (data) => {
    if (!data || !dataInicioFiltro || !dataFimFiltro) return false;
    const d = formatarParaISO(data);
    return d >= dataInicioFiltro && d <= dataFimFiltro;
  };

  const mesNome = viewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  const CalendarPopup = () => (
    <div className="absolute top-full left-0 mt-2 z-[100] bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 w-72 animate-in fade-in zoom-in duration-200">
      <div className="flex items-center justify-between mb-4">
        <button 
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} 
          className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-sm font-normal text-slate-700">{mesNome}</span>
        <button 
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} 
          className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => (
          <div key={i} className="text-sm font-normal text-slate-300 text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {diasCalendario.map((dia, i) => {
          if (!dia) return <div key={`empty-${i}`} />;
          const dStr = formatarParaISO(dia);
          const isInicio = dStr === dataInicioFiltro;
          const isFim = dStr === dataFimFiltro;
          const isRange = estaNoRange(dia);
          const isHoje = dStr === formatarParaISO(new Date());

          return (
            <button
              key={dStr}
              onClick={() => handleSelecionarDia(dia)}
              className={`
                h-9 w-9 text-sm font-normal rounded-lg transition-all border border-transparent
                ${isInicio || isFim ? 'bg-[#1e3a8a] text-white shadow-md !font-bold' : 
                  isRange ? 'bg-blue-50 text-[#2563eb]' : 
                  isHoje ? 'text-[#2563eb] border border-blue-200' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              {dia.getDate()}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between gap-2">
        <button 
          onClick={() => { setDataInicioFiltro(''); setDataFimFiltro(''); setCalendarioAberto(false); }}
          className="text-sm font-normal text-rose-500 hover:underline"
        >
          Limpar
        </button>
        <button 
          onClick={() => setCalendarioAberto(false)}
          className="text-sm font-normal text-slate-400 hover:text-slate-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );

  const formatarDataExibicao = (iso) => {
    if (!iso) return '__/__/__';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y.slice(-2)}`;
  };

  // Função principal para carregar transações com filtros
  const carregarTransacoes = useCallback(async () => {
    setCarregando(true);
    try {
      let query = supabase
        .from('transacoes_financeiras')
        .select('*, pessoas(nome), categorias_financeiras(nome), contas_financeiras(nome)')
        .order('data', { ascending: false });

      if (dataInicioFiltro) query = query.gte('data', dataInicioFiltro);
      if (dataFimFiltro) query = query.lte('data', dataFimFiltro);
      if (tipoTransacaoFiltro) query = query.eq('tipo', tipoTransacaoFiltro.toLowerCase());
      if (statusTransacaoFiltro) query = query.eq('status', statusTransacaoFiltro.toLowerCase());
      if (contaFiltro) query = query.eq('conta_id', contaFiltro);
      if (categoriaFiltro) query = query.eq('categoria_id', categoriaFiltro);

      const { data, error } = await query;
      if (error) throw error;

      setTransacoes(data.map(t => ({
        ...t,
        contribuinte: t.pessoas?.nome,
        categoria: t.categorias_financeiras?.nome,
        conta: t.contas_financeiras?.nome
      })));
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setCarregando(false);
    }
  }, [dataInicioFiltro, dataFimFiltro, tipoTransacaoFiltro, statusTransacaoFiltro, contaFiltro, categoriaFiltro]);

  useEffect(() => {
    // Carrega dados auxiliares apenas uma vez ao montar o componente
    const carregarAuxiliares = async () => {
      try {
        const { data: contas, error: erroContas } = await supabase
          .from('contas_financeiras')
          .select('id, nome')
          .order('nome');
        if (erroContas) console.warn('Erro ao carregar contas financeiras:', erroContas.message);
        if (contas) setContasDisponiveis(contas);

        const { data: categorias, error: erroCategorias } = await supabase
          .from('categorias_financeiras')
          .select('id, nome, tipo')
          .order('nome');
        if (erroCategorias) console.warn('Erro ao carregar categorias financeiras:', erroCategorias.message);
        if (categorias) setCategoriasDisponiveis(categorias);

        const { data: pessoas, error: erroPessoas } = await supabase
          .from('pessoas')
          .select('id, nome')
          .neq('status', 'excluido')
          .order('nome');
        if (erroPessoas) console.warn('Erro ao carregar pessoas:', erroPessoas.message);
        if (pessoas) setPessoasDisponiveis(pessoas);
      } catch (error) {
        console.error('Erro ao carregar dados financeiros:', error);
      }
    };

    carregarAuxiliares();
  }, []); // Array de dependência vazio para rodar apenas uma vez

  // Carrega as transações sempre que o callback de busca mudar (filtros alterados)
  useEffect(() => {
    carregarTransacoes();
  }, [carregarTransacoes]);

  // Funções de atalho para o seletor de data (inspirado no ngb-datepicker)
  const setPeriodoRapido = (tipo) => {
    const hoje = new Date();
    let inicio = new Date();
    let fim = new Date();

    switch (tipo) {
      case 'hoje': break;
      case 'ontem':
        inicio.setDate(hoje.getDate() - 1);
        fim.setDate(hoje.getDate() - 1);
        break;
      case '7dias':
        inicio.setDate(hoje.getDate() - 7);
        break;
      case '30dias':
        inicio.setDate(hoje.getDate() - 30);
        break;
      case 'mes_atual':
        inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        break;
      case 'mes_anterior':
        inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
        fim = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
        break;
      case 'limpar':
        setDataInicioFiltro('');
        setDataFimFiltro('');
        return;
    }
    setDataInicioFiltro(formatarParaISO(inicio));
    setDataFimFiltro(formatarParaISO(fim));
  };

  // Filtra as categorias com base no tipo selecionado
  const categoriasFiltradas = useMemo(() => {
    const tipoBusca = tipoTransacaoFiltro?.toLowerCase();
    if (tipoBusca === 'receita') return categoriasDisponiveis.filter(c => c.tipo === 'receita');
    if (tipoBusca === 'despesa') return categoriasDisponiveis.filter(c => c.tipo === 'despesa');
    return categoriasDisponiveis;
  }, [categoriasDisponiveis, tipoTransacaoFiltro]);

  // Cálculo do sumário baseado nas transações filtradas
  const resumoMensal = useMemo(() => {
    return transacoes.reduce((acc, t) => {
      const tipo = t.tipo?.toLowerCase();
      const status = t.status?.toLowerCase();
      const valor = Number(t.valor) || 0;

      if (tipo === 'receita' && status === 'pago') acc.recebido += valor;
      if (tipo === 'despesa' && status === 'pago') acc.pago += valor;
      if (tipo === 'despesa' && status === 'pendente') acc.aPagar += valor;
      return acc;
    }, { recebido: 0, pago: 0, aPagar: 0 });
  }, [transacoes]);

  // Efeito para limpar a categoria selecionada se ela não pertencer mais ao tipo escolhido
  useEffect(() => {
    if (categoriaFiltro && tipoTransacaoFiltro) {
      const tipoAtual = tipoTransacaoFiltro.toLowerCase();
      const categoriaPertenceAoTipo = categoriasDisponiveis.find(c => c.id === categoriaFiltro)?.tipo === tipoAtual;
      if (!categoriaPertenceAoTipo && (tipoAtual === 'receita' || tipoAtual === 'despesa')) {
        setCategoriaFiltro('');
      }
    }
  }, [tipoTransacaoFiltro, categoriasDisponiveis, categoriaFiltro, setCategoriaFiltro]);

  return (
    <div className="space-y-6">
      <PageHeader titulo="Transações Financeiras" breadcrumb={['Financeiro', 'Transações']} />

      {/* Seção de Filtros em Linha Única */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[240px] relative datepicker-container">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Período Selecionado</label>
            <div 
              onClick={() => setCalendarioAberto(!calendarioAberto)}
              className={`flex items-center gap-3 px-3 py-2.5 bg-white border rounded-xl cursor-pointer transition-all shadow-sm group ${calendarioAberto ? 'border-[#1e3a8a] ring-2 ring-[#1e3a8a]/10' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex items-center gap-1.5 text-sm font-normal text-slate-700 tracking-tight">
                <span>{formatarDataExibicao(dataInicioFiltro)}</span>
                <span className="text-slate-300 font-medium">→</span>
                <span>{formatarDataExibicao(dataFimFiltro)}</span>
              </div>
            </div>
            {calendarioAberto && <CalendarPopup />}
          </div>
          <div className="flex-1 min-w-[120px]"><SelectFiltro label="Tipo" valor={tipoTransacaoFiltro} onChange={setTipoTransacaoFiltro} opcoes={['Receita', 'Despesa', 'Transferência']} /></div>
          <div className="flex-1 min-w-[120px]"><SelectFiltro label="Status" valor={statusTransacaoFiltro} onChange={setStatusTransacaoFiltro} opcoes={['Pago', 'Pendente', 'Cancelado']} /></div>
          <div className="flex-1 min-w-[140px]"><SelectFiltro label="Conta" valor={contaFiltro} onChange={setContaFiltro} opcoes={contasDisponiveis.map(c => ({ valor: c.id, label: c.nome }))} /></div>
          <div className="flex-1 min-w-[140px]"><SelectFiltro label="Categoria" valor={categoriaFiltro} onChange={setCategoriaFiltro} opcoes={categoriasFiltradas.map(c => ({ valor: c.id, label: c.nome }))} /></div>
        </div>

        {/* Atalhos de Período e Ações */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
          <div className="flex flex-wrap gap-1.5">
            <BtnAtalho label="Hoje" onClick={() => setPeriodoRapido('hoje')} />
            <BtnAtalho label="Ontem" onClick={() => setPeriodoRapido('ontem')} />
            <BtnAtalho label="7 Dias" onClick={() => setPeriodoRapido('7dias')} />
            <BtnAtalho label="30 Dias" onClick={() => setPeriodoRapido('30dias')} />
            <BtnAtalho label="Mês Atual" onClick={() => setPeriodoRapido('mes_atual')} />
            <BtnAtalho label="Mês Anterior" onClick={() => setPeriodoRapido('mes_anterior')} />
            <BtnAtalho label="Todo o período" onClick={() => setPeriodoRapido('limpar')} destaque />
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => abrirModal('receita')}
              className="min-w-[140px] justify-center px-8 py-1.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition shadow-sm flex items-center gap-2"
            >
              <span className="text-base font-bold">+</span> Receita
            </button>
            <button 
              type="button" 
              onClick={() => abrirModal('despesa')}
              className="min-w-[140px] justify-center px-8 py-1.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition shadow-sm flex items-center gap-2"
            >
              <span className="text-base font-bold">+</span> Despesa
            </button>
          </div>
        </div>
      </div>

      {/* Sumário de Transações (Baseado no filtro atual) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <img src="https://raw.githubusercontent.com/jadsonviana7-eng/Icones/refs/heads/main/Recebido.svg" alt="Recebido" className="w-10 h-10 shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Recebido</p>
            <p className="text-2xl font-black text-emerald-600">R$ {resumoMensal.recebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <img src="https://raw.githubusercontent.com/jadsonviana7-eng/Icones/refs/heads/main/pago.svg" alt="Pago" className="w-10 h-10 shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Pago</p>
            <p className="text-2xl font-black text-rose-600">R$ {resumoMensal.pago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <img src="https://raw.githubusercontent.com/jadsonviana7-eng/Icones/refs/heads/main/a%20pagar.svg" alt="A Pagar" className="w-10 h-10 shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total a Pagar</p>
            <p className="text-2xl font-black text-amber-500">R$ {resumoMensal.aPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {/* Tabela de Transações Recentes Abaixo */}
      <Card className="p-0">
        <CardHeader titulo="Transações Recentes" />
        {carregando ? (
          <div className="p-10 text-center text-sm text-slate-400">Carregando transações...</div>
        ) : transacoes.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">Nenhuma transação encontrada com os filtros.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-mib">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Contribuinte</th>
                  <th>Tipo</th>
                  <th>Categoria</th>
                  <th>Conta</th>
                  <th>Status</th>
                  <th className="text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map(t => {
                  const tipoNormalizado = t.tipo?.toLowerCase() === 'receita' ? 'receita' : 'despesa';
                  return (
                    <tr key={t.id} onClick={() => abrirModal(tipoNormalizado, t)} className="cursor-pointer hover:bg-slate-50 transition">
                    <td>{t.data ? new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR') : '—'}</td>
                    <td className="text-slate-600 font-normal">{t.descricao}</td>
                    <td className="font-medium text-slate-900">{t.contribuinte || '—'}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        t.tipo === 'Receita' ? 'bg-emerald-100 text-emerald-800' :
                        t.tipo === 'Despesa' ? 'bg-rose-100 text-rose-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {t.tipo}
                      </span>
                    </td>
                    <td>{t.categoria}</td>
                    <td>{t.conta}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        t.status === 'Pago' ? 'bg-green-100 text-green-800' :
                        t.status === 'Pendente' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="text-right font-bold">{`R$ ${t.valor.toFixed(2)}`}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {modalTransacao.aberto && (
        <ModalLancarTransacao 
          tipo={modalTransacao.tipo} 
          transacaoParaEditar={modalTransacao.dados}
          onFechar={() => setModalTransacao({ aberto: false, tipo: 'receita', dados: null })}
          contas={contasDisponiveis}
          categorias={categoriasDisponiveis.filter(c => c.tipo === modalTransacao.tipo)}
          pessoas={pessoasDisponiveis}
          usuarioLogado={usuarioLogado}
          onSucesso={() => {
            setModalTransacao({ aberto: false, tipo: 'receita', dados: null });
            carregarTransacoes();
          }}
        />
      )}
    </div>
  );
}

export function ModalLancarTransacao({ tipo, onFechar, contas, categorias, pessoas, onSucesso, pessoaIdInicial = '', transacaoParaEditar = null, usuarioLogado }) {
  const [data, setData] = useState(transacaoParaEditar?.data || new Date().toISOString().split('T')[0]);
  const [descricao, setDescricao] = useState(transacaoParaEditar?.descricao || '');
  const [valor, setValor] = useState(transacaoParaEditar?.valor || '');
  const [status, setStatus] = useState(transacaoParaEditar?.status?.toLowerCase() || 'pago'); // 'pago' ou 'pendente'
  const [pessoaId, setPessoaId] = useState(transacaoParaEditar?.pessoa_id || pessoaIdInicial);
  const [categoriaId, setCategoriaId] = useState(transacaoParaEditar?.categoria_id || '');
  const [contaId, setContaId] = useState(transacaoParaEditar?.conta_id || '');
  const [tipoLancamento, setTipoLancamento] = useState('unico'); // 'unico' ou 'repetido'
  const [frequencia, setFrequencia] = useState('mensal');
  const [repeticoes, setRepeticoes] = useState(2);
  const [diaVencimento, setDiaVencimento] = useState(() => {
    if (transacaoParaEditar?.data) {
      return new Date(transacaoParaEditar.data + 'T00:00:00').getDate();
    }
    return new Date().getDate();
  });
  const [anotacoes, setAnotacoes] = useState(transacaoParaEditar?.anotacoes || '');
  const [enviando, setEnviando] = useState(false);

  const corPrincipal = tipo === 'receita' ? 'emerald' : 'rose';
  const labelStatus = tipo === 'receita' ? (status === 'pago' ? 'Recebido' : 'Pendente') : (status === 'pago' ? 'Pago' : 'Pendente');

  async function handleExcluir() {
    if (!transacaoParaEditar?.id) return;
    if (!window.confirm('Tem certeza que deseja excluir este lançamento permanentemente?')) return;

    setEnviando(true);
    try {
      const { error } = await supabase
        .from('transacoes_financeiras')
        .delete()
        .eq('id', transacaoParaEditar.id);
      if (error) throw error;
      await registrarLogFinanceiro(
        usuarioLogado?.email, 
        'Exclusão de Transação', 
        `Removeu ${tipo}: ${transacaoParaEditar.descricao} (R$ ${transacaoParaEditar.valor})`
      );
      onSucesso();
    } catch (err) {
      alert('Erro ao excluir lançamento: ' + err.message);
    } finally {
      setEnviando(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);

    const payloadBase = {
      tipo,
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      status: (tipoLancamento === 'repetido' && !transacaoParaEditar) ? 'pendente' : status,
      pessoa_id: pessoaId || null,
      categoria_id: categoriaId || null,
      conta_id: contaId || null,
      anotacoes: anotacoes.trim()
    };

    try {
      if (transacaoParaEditar) {
        const compStr = data.slice(0, 7);
        const { error } = await supabase.from('transacoes_financeiras').update({ ...payloadBase, data, competencia: compStr }).eq('id', transacaoParaEditar.id);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Edição de Transação', `Editou ${tipo}: ${descricao} (R$ ${valor})`);
      } else if (tipoLancamento === 'unico') {
        const compStr = data.slice(0, 7);
        const { error } = await supabase.from('transacoes_financeiras').insert([{ ...payloadBase, data, competencia: compStr }]);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Criação de Transação', `Lançou ${tipo}: ${descricao} (R$ ${valor})`);
      } else {
        // Lançamento Repetido (Recorrência)
        const items = [];
        let dataRef = new Date(data + 'T00:00:00');
        let compRef = new Date(data.slice(0, 7) + '-01T00:00:00');

        for (let i = 0; i < repeticoes; i++) {
          const d = new Date(dataRef);
          const c = new Date(compRef);

          if (frequencia === 'semanal') {
            d.setDate(dataRef.getDate() + (i * 7));
          } else if (frequencia === 'mensal') {
            d.setMonth(dataRef.getMonth() + i);
            c.setMonth(compRef.getMonth() + i);
          } else if (frequencia === 'anual') {
            d.setFullYear(dataRef.getFullYear() + i);
            c.setFullYear(compRef.getFullYear() + i);
          }

          // Ajusta o dia para o dia de vencimento escolhido (respeitando o limite do mês)
          if (frequencia === 'mensal' || frequencia === 'anual') {
            const ultimoDiaDoMes = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
            d.setDate(Math.min(diaVencimento, ultimoDiaDoMes));
          }

          const dataFinal = d.toISOString().split('T')[0];
          items.push({
            ...payloadBase,
            data: dataFinal,
            competencia: dataFinal.slice(0, 7),
            descricao: repeticoes > 1 ? `${payloadBase.descricao} (${i + 1}/${repeticoes})` : payloadBase.descricao
          });
        }
        const { error } = await supabase.from('transacoes_financeiras').insert(items);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Criação de Recorrência', `Lançou ${repeticoes}x ${tipo}: ${descricao}`);
      }
      onSucesso();
    } catch (err) {
      console.error('Erro ao salvar transação:', err);
      alert('Erro ao salvar transação: ' + err.message);
    } finally {
      setEnviando(false);
    }
  }

  // Definição das variáveis de estilo dinâmico que estavam causando erros de referência
  const corBtn = tipo === 'receita' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700';
  const corShadow = tipo === 'receita' ? 'shadow-emerald-200' : 'shadow-rose-200';
  const corHeader = tipo === 'receita' ? 'bg-emerald-50/30' : 'bg-rose-50/30';

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[98vh] sm:max-h-[95vh]">
        <div className={`p-3 sm:p-4 border-b border-slate-100 flex items-center justify-between ${corHeader}`}>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-tight">{transacaoParaEditar ? 'Editar' : 'Nova'} {tipo}</h3>
            
          </div>
          <button type="button" onClick={onFechar} className="text-slate-400 hover:text-slate-600 font-bold p-2 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-3">
              <label className="block text-sm font-bold text-slate-500 mb-1">Data</label>
              <input type="date" required value={data} onChange={e => setData(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:ring-2 focus:ring-[#2563eb]/20 outline-none" />
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm font-bold text-slate-500 mb-1">Descrição</label>
              <input type="text" required placeholder="Ex: Oferta de domingo, Manutenção..." value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:ring-2 focus:ring-[#055F6D]/20 outline-none" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-bold text-slate-500 mb-1">Valor (R$)</label>
              <input type="number" step="0.01" required placeholder="0,00" value={valor} onChange={e => setValor(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#055F6D]/20 outline-none" />
            </div>
          </div>

          {!transacaoParaEditar && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Tipo de Lançamento</label>
                <select value={tipoLancamento} onChange={e => setTipoLancamento(e.target.value)} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm bg-white outline-none">
                  <option value="unico">Lançamento Único</option>
                  <option value="repetido">Repetido / Fixo</option>
                </select>
              </div>

              {tipoLancamento === 'repetido' && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-1">Dia Venc.</label>
                    <select 
                      value={diaVencimento} 
                      onChange={e => setDiaVencimento(parseInt(e.target.value))}
                      className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm bg-white outline-none"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-1">Frequência</label>
                    <select value={frequencia} onChange={e => setFrequencia(e.target.value)} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm bg-white outline-none">
                      <option value="semanal">Semanal</option>
                      <option value="mensal">Mensal</option>
                      <option value="anual">Anual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-1">Repetições</label>
                    <select value={repeticoes} onChange={e => setRepeticoes(parseInt(e.target.value))} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm bg-white outline-none">
                      {Array.from({ length: 35 }, (_, i) => i + 2).map(n => <option key={n} value={n}>{n}x</option>)}
                    </select>
                  </div>
                </div>
              )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5">
              <label className="block text-sm font-bold text-slate-500 mb-1">{tipo === 'despesa' ? 'Pago à' : 'Membro'}</label>
              <select value={pessoaId} onChange={e => setPessoaId(e.target.value)} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm font-normal bg-white outline-none">
                <option value="">Selecione um membro (opcional)</option>
                {pessoas.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-bold text-slate-500 mb-1">Categoria</label>
              <select required value={categoriaId} onChange={e => setCategoriaId(e.target.value)} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm font-normal bg-white outline-none">
                <option value="">Selecione...</option>
                {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-500 mb-1">Conta / Caixa</label>
              <select required value={contaId} onChange={e => setContaId(e.target.value)} className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm font-normal bg-white outline-none">
                <option value="">Selecione...</option>
                {contas.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-500 mb-1">Status</label>
              <button 
                type="button" 
                onClick={() => setStatus(status === 'pago' ? 'pendente' : 'pago')}
                className={`w-full py-2 rounded-xl border text-sm font-bold transition flex items-center justify-center gap-2 ${
                  status === 'pago' 
                    ? `bg-${corPrincipal}-600 border-${corPrincipal}-600 text-white shadow-md shadow-${corPrincipal}-200` 
                    : 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-200'
                }`}
              >
                {status === 'pago' ? '✓' : '○'} {labelStatus}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-500 mb-1">Anotações Internas</label>
            <textarea 
              rows="1" 
              value={anotacoes} 
              onChange={e => setAnotacoes(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:ring-2 focus:ring-[#2563eb]/20 outline-none resize-none" 
              placeholder="Detalhes adicionais sobre este lançamento..."
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
            {transacaoParaEditar && (
              <button
                type="button"
                onClick={handleExcluir}
                disabled={enviando}
                className="w-full sm:w-auto px-4 py-2 text-sm font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition sm:mr-auto order-3 sm:order-first"
              >
                🗑️ Excluir Registro
              </button>
            )}

            <button type="button" onClick={onFechar} className="w-full sm:w-auto px-5 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition order-2 sm:order-1">Cancelar</button>
            <button 
              type="submit" 
              disabled={enviando}
              className={`
                fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-[120] 
                sm:static sm:w-auto sm:h-auto sm:px-10 sm:py-2.5 sm:rounded-2xl sm:shadow-lg
                ${corBtn} text-white text-sm font-bold transition ${corShadow} disabled:opacity-50 order-1 sm:order-1
              `}
            >
              {enviando ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              ) : (
                <>
                  <span className="sm:hidden text-2xl leading-none">✓</span>
                  <span className="hidden sm:inline">{transacaoParaEditar ? 'Salvar Alterações' : `Confirmar ${tipo}`}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BtnAtalho({ label, onClick, destaque }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-1.5 rounded-lg text-sm font-normal transition ${
        destaque 
          ? 'bg-[#1e3a8a] text-white hover:bg-[#1e40af]' 
          : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
      }`}
    >
      {label}
    </button>
  );
}
