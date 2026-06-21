import { useState, useEffect, useMemo, useCallback } from 'react';
// Exemplo de import com recharts (Instale via: npm install recharts)
import { supabase } from './supabaseClient';
import { PageHeader, chartColors } from './ui'; 
import TransacoesFinanceiras from './TransacoesFinanceiras';
import CategoriasFinanceiras from './CategoriasFinanceiras';
import ContasFinanceiras from './ContasFinanceiras';
import RelatoriosFinanceiros from './RelatoriosFinanceiros';
import HistoricoFinanceiro from './HistoricoFinanceiro';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ModuloFinanceiro({ meses, submenu, usuarioLogado, membroLogado, hasAccess, filtrosMobileAberto, setFiltrosMobileAberto }) {
  const [abaAtiva, setAbaAtiva] = useState(submenu || 'resumo');
  const [anoFiltro, setAnoFiltro] = useState(new Date().getFullYear().toString());
  const [mesFiltro, setMesFiltro] = useState(new Date().getMonth().toString());
  const [transacoes, setTransacoes] = useState([]);
  const [contas, setContas] = useState([]);
  const [expandidoMobile, setExpandidoMobile] = useState(false);
  const [carregando, setCarregando] = useState(true);

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
    setCarregando(true);
    
    const [resTransacoes, resContas] = await Promise.all([
      supabase.from('transacoes_financeiras').select('*').eq('status', 'pago'),
      supabase.from('contas_financeiras').select('id, nome').order('nome')
    ]);
    
    if (!resTransacoes.error) setTransacoes(resTransacoes.data || []);
    if (!resContas.error) setContas(resContas.data || []);
    
    setCarregando(false);
  }, []);

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

  const formatMoeda = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
      <div className="space-y-6">
        {abaAtiva === 'resumo' && (
          <>
            <div className="hidden md:block">
              <PageHeader titulo="Módulo Financeiro"/>
            </div>
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
            
            {/* Bloco da Esquerda: Sumário e Gráficos (Ocupa 3 colunas no desktop) */}
            <div className="space-y-6">
              
              {/* Cards de Sumário Geral - Visível apenas em Desktop */}
              <div className="hidden sm:grid grid-cols-4 gap-4">
                <CardResumo title="Saldo Total" value={formatMoeda(stats.saldoTotal)} color="text-slate-800" bg="bg-white" />
                <CardResumo title="Contas / Caixas" value={formatMoeda(stats.saldoTotal)} color="text-blue-600" bg="bg-white" />
                <CardResumo title="Receitas (Mês)" value={formatMoeda(stats.receitasMes)} color="text-emerald-600" bg="bg-emerald-50/50" />
                <CardResumo title="Despesas (Mês)" value={formatMoeda(stats.despesasMes)} color="text-rose-600" bg="bg-rose-50/50" />
              </div>

              {/* Sumário em Card Único - Visível apenas em Mobile */}
              <div className="sm:hidden bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo Total</p>
                    <p className="text-2xl font-black text-slate-800">{formatMoeda(stats.saldoTotal)}</p>
                  </div>
                  <button 
                    onClick={() => setExpandidoMobile(!expandidoMobile)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 transition-transform duration-300 ${expandidoMobile ? 'rotate-180' : ''}`}
                  >
                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
                
                {expandidoMobile && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Resumo do Mês */}
                    <div className="grid grid-cols-2 divide-x divide-slate-50 border-t border-slate-50">
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receitas (Mês)</span>
                        </div>
                        <p className="text-base font-black text-emerald-600 leading-none">{formatMoeda(stats.receitasMes)}</p>
                      </div>
                      
                      <div className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Despesas (Mês)</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        </div>
                        <p className="text-base font-black text-rose-600 leading-none">{formatMoeda(stats.despesasMes)}</p>
                      </div>
                    </div>

                    {/* Saldos por Conta */}
                    <div className="p-4 border-t border-slate-50 space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Saldos por Conta</p>
                      {contas.map(conta => (
                        <div key={conta.id} className="flex justify-between items-center py-1">
                          <span className="text-xs font-bold text-slate-600">{conta.nome}</span>
                          <span className={`text-xs font-black ${saldosPorConta[conta.id] >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
                            {formatMoeda(saldosPorConta[conta.id] || 0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Seção de Gráficos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Gráfico Anual */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700">Resumo Anual</h3>
                    <select 
                      value={anoFiltro} 
                      onChange={(e) => setAnoFiltro(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg p-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={dadosAnuaisReais}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{fontSize: 11}} stroke="#94a3b8" />
                        <YAxis tick={{fontSize: 11}} stroke="#94a3b8" />
                        <Tooltip />
                        <Legend wrapperStyle={{fontSize: 11}} />
                        <Bar dataKey="receitas" name="Receitas" fill={chartColors[1]} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="despesas" name="Despesas" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="saldo" name="Saldo Líquido" stroke={chartColors[0]} strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Gráfico Mensal */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700">Resumo Mensal (Semanas)</h3>
                    <select 
                      value={mesFiltro} 
                      onChange={(e) => setMesFiltro(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg p-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {meses.map((m, idx) => (
                        <option key={idx} value={idx}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="h-64">
                    {/* Estrutura idêntica alterando os dados para semanas do mês selecionado */}
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={dadosMensaisReais}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{fontSize: 11}} stroke="#94a3b8" />
                        <YAxis tick={{fontSize: 11}} stroke="#94a3b8" />
                        <Tooltip />
                        <Bar dataKey="receitas" fill={chartColors[1]} name="Receitas" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="despesas" fill="#f43f5e" name="Despesas" radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="saldo" stroke={chartColors[0]} strokeWidth={2} name="Saldo Líquido" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>

            {/* Coluna Lateral Direita: Atalhos Rápidos */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 h-fit">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Atalhos Rápidos</h3>
              <BotaoAtalho label="Transações" icon="💸" onClick={() => setAbaAtiva('transacoes')} />
              <BotaoAtalho label="Histórico de Ações" icon="⏳" onClick={() => setAbaAtiva('historico')} />
              <BotaoAtalho label="Orçamentos Anuais" icon="📊" onClick={() => {}} />
              <BotaoAtalho label="Categorias" icon="🏷️" onClick={() => setAbaAtiva('categorias')} />
              <BotaoAtalho label="Contas / Caixas" icon="🏦" onClick={() => setAbaAtiva('contas')} />
              <BotaoAtalho label="Contatos / Favorecidos" icon="👤" onClick={() => {}} />
              <BotaoAtalho label="Centros de Custos" icon="🏢" onClick={() => {}} />
              <BotaoAtalho label="Relatórios" icon="📈" onClick={() => setAbaAtiva('relatorios')} />
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
            onVoltar={() => setAbaAtiva('resumo')}
          />
        )}

        {abaAtiva === 'categorias' && (
          <CategoriasFinanceiras usuarioLogado={usuarioLogado} membroLogado={membroLogado} hasAccess={hasAccess} onVoltar={() => setAbaAtiva('resumo')} />
        )}

        {abaAtiva === 'contas' && (
          <ContasFinanceiras usuarioLogado={usuarioLogado} membroLogado={membroLogado} hasAccess={hasAccess} onVoltar={() => setAbaAtiva('resumo')} />
        )}

        {abaAtiva === 'relatorios' && <RelatoriosFinanceiros onVoltar={() => setAbaAtiva('resumo')} />}

        {abaAtiva === 'historico' && <HistoricoFinanceiro onVoltar={() => setAbaAtiva('resumo')} />}

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

// Componentes Auxiliares Locais
function CardResSummary({ title, value, color, bg }) {
  return (
    <div className={`p-4 rounded-xl border border-slate-200 shadow-sm ${bg}`}>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
      <p className={`text-base font-black mt-1 ${color}`}>{value}</p>
    </div>
  );
}
// Renomeado internamente para evitar colisões
const CardResumo = CardResSummary;

function BotaoAtalho({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 text-left text-xs font-semibold text-slate-700 transition group"
    >
      <span className="text-sm group-hover:scale-110 transition">{icon}</span>
      <span className="flex-1">{label}</span>
    </button>
  );
}