import { useState, useEffect } from 'react';
// Exemplo de import com recharts (Instale via: npm install recharts)
import { PageHeader, chartColors } from './ui'; 
import TransacoesFinanceiras from './TransacoesFinanceiras';
import CategoriasFinanceiras from './CategoriasFinanceiras';
import ContasFinanceiras from './ContasFinanceiras';
import RelatoriosFinanceiros from './RelatoriosFinanceiros';
import HistoricoFinanceiro from './HistoricoFinanceiro';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ModuloFinanceiro({ meses, submenu, usuarioLogado }) {
  const [abaAtiva, setAbaAtiva] = useState(submenu || 'resumo');
  const [anoFiltro, setAnoFiltro] = useState(new Date().getFullYear().toString());
  const [mesFiltro, setMesFiltro] = useState(new Date().getMonth().toString());

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

  // Dados fictícios para demonstração dos gráficos de combinação
  const dadosAnuaisExemplo = [
    { name: 'Jan', receitas: 4000, despesas: 2400, saldo: 1600 },
    { name: 'Fev', receitas: 3000, despesas: 1398, saldo: 1602 },
    { name: 'Mar', receitas: 2000, despesas: 9800, saldo: -7800 },
    // ... outros meses
  ];

  return (
      <div className="space-y-6">
        {abaAtiva === 'resumo' && (
          <>
            <PageHeader titulo="Módulo Financeiro" subtitulo="Visão geral das finanças da igreja." />
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
            
            {/* Bloco da Esquerda: Sumário e Gráficos (Ocupa 3 colunas no desktop) */}
            <div className="space-y-6">
              
              {/* Cards de Sumário Geral */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <CardResumo title="Saldo Atual" value="R$ 15.420,00" color="text-slate-800" bg="bg-white" />
                <CardResumo title="Disponível em Caixas" value="R$ 4.200,00" color="text-blue-600" bg="bg-white" />
                <CardResumo title="Receitas (Mês)" value="R$ 18.900,00" color="text-emerald-600" bg="bg-emerald-50/50" />
                <CardResumo title="Despesas (Mês)" value="R$ 7.680,00" color="text-rose-600" bg="bg-rose-50/50" />
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
                      <ComposedChart data={dadosAnuaisExemplo}>
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
                      <ComposedChart data={dadosAnuaisExemplo}>
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
          />
        )}

        {abaAtiva === 'categorias' && (
          <CategoriasFinanceiras usuarioLogado={usuarioLogado} />
        )}

        {abaAtiva === 'contas' && (
          <ContasFinanceiras usuarioLogado={usuarioLogado} />
        )}

        {abaAtiva === 'relatorios' && <RelatoriosFinanceiros />}

        {abaAtiva === 'historico' && <HistoricoFinanceiro />}

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
      <span className="text-slate-300 group-hover:text-emerald-500 transition">→</span>
    </button>
  );
}