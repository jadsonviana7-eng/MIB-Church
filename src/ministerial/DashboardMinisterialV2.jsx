import { useEffect, useState, useMemo } from 'react';
import { Users, Building2, Shield, Briefcase, CheckCircle, AlertCircle, XCircle, Award, Target, Star, Search, X } from 'lucide-react';
import { ministeriosService } from './services/ministeriosService';

function Card({ titulo, valor, Icon, corSub, desc, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm transition duration-300 flex justify-between items-center relative overflow-hidden group ${
        onClick ? 'cursor-pointer hover:scale-[1.02] hover:shadow-md hover:border-blue-200' : ''
      }`}
      title={onClick ? `Clique para visualizar o indicador ${titulo}` : ''}
    >
      <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: corSub }} />
      <div className="min-w-0 pr-2">
        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{titulo}</p>
        <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-800 tracking-tight">{valor}</h2>
        {desc && <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1 truncate">{desc}</p>}
      </div>
      <div 
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition duration-300 group-hover:scale-110 shrink-0"
        style={{ backgroundColor: corSub + '15', color: corSub }}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
    </div>
  );
}

export default function DashboardMinisterialV2({ onNavegarTab, onVerMembro, onNavegarGlobal }) {
  const [dados, setDados] = useState({
    totalMinisterios: 0,
    totalMembros: 0,
    totalFuncoes: 0,
    totalLideres: 0,
    escalasStats: { confirmadas: 0, pendentes: 0, recusadas: 0, total: 0 },
    rankingVoluntarios: [],
    rankingMinisterios: [],
    rankingLideres: []
  });

  const [rawDados, setRawDados] = useState(null);
  const [modalIndicadorAberto, setModalIndicadorAberto] = useState(null);
  const [buscaIndicador, setBuscaIndicador] = useState('');
  const [loading, setLoading] = useState(true);

  // Suporte ao botão voltar do celular para fechar o modal
  useEffect(() => {
    if (modalIndicadorAberto) {
      try {
        window.history.pushState({ modalIndicadorV2: modalIndicadorAberto }, '');
      } catch (e) {}

      const handlePop = () => {
        setModalIndicadorAberto(null);
      };

      window.addEventListener('popstate', handlePop, { once: true });
      return () => {
        window.removeEventListener('popstate', handlePop);
      };
    }
  }, [modalIndicadorAberto]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setLoading(true);
    try {
      const [resumo, consolidados] = await Promise.all([
        ministeriosService.obterDashboard(),
        ministeriosService.obterRelatoriosConsolidados()
      ]);
      setDados(resumo);
      setRawDados(consolidados);
    } catch (error) {
      console.error('Erro ao carregar dashboard ministerial V2:', error);
    } finally {
      setLoading(false);
    }
  }

  // Monta as listas exclusivas para cada indicador do Dashboard V2
  const listasIndicadores = useMemo(() => {
    if (!rawDados) return {
      voluntarios: [],
      ministerios: [],
      lideres: [],
      funcoes: [],
      confirmadas: [],
      pendentes: [],
      recusadas: [],
      total_escalados: []
    };

    const { ministerios, membros, escalas, funcoes } = rawDados;

    // 1. Lista de Voluntários Ativos (únicos - Pessoas)
    const mapaVol = new Map();
    membros.forEach(m => {
      if (m.pessoas?.nome && !mapaVol.has(m.pessoa_id)) {
        mapaVol.set(m.pessoa_id, {
          tipoItem: 'pessoa',
          id: m.id,
          pessoa_id: m.pessoa_id,
          nome: m.pessoas?.nome || 'Voluntário',
          foto_url: m.pessoas?.foto_url,
          cargo: m.pessoas?.cargo,
          telefone: m.pessoas?.telefone,
          ministerio: m.ministerios?.nome || 'Ministério',
          funcao: m.funcao || 'Voluntário',
          statusBadge: '🔵 Voluntário Ativo'
        });
      }
    });

    // 2. Lista de Ministérios (MOSTRAR APENAS OS MINISTÉRIOS)
    const mapaMemPorMin = {};
    const mapaLideresPorMin = {};

    membros.forEach(m => {
      const minId = String(m.ministerio_id);
      mapaMemPorMin[minId] = (mapaMemPorMin[minId] || 0) + 1;
      if (m.lider && m.pessoas?.nome) {
        if (!mapaLideresPorMin[minId]) mapaLideresPorMin[minId] = [];
        if (!mapaLideresPorMin[minId].includes(m.pessoas.nome)) {
          mapaLideresPorMin[minId].push(m.pessoas.nome);
        }
      }
    });

    const listaMinisteriosOnly = (ministerios || []).map(min => {
      const minId = String(min.id);
      const qtdMembros = mapaMemPorMin[minId] || 0;
      const lideresNomes = (mapaLideresPorMin[minId] || []).join(', ');

      return {
        tipoItem: 'ministerio',
        id: min.id,
        nome: min.nome,
        cor_principal: min.cor_principal || '#8b5cf6',
        lideres: lideresNomes ? `Líder: ${lideresNomes}` : 'Sem líder definido',
        totalMembros: qtdMembros,
        statusBadge: '🟣 Ministério Ativo'
      };
    }).sort((a, b) => b.totalMembros - a.totalMembros);

    // 3. Lista de Líderes / Coordenadores (Pessoas)
    const mapaLideres = new Map();
    membros.filter(m => m.lider === true && m.pessoas?.nome).forEach(m => {
      if (!mapaLideres.has(m.pessoa_id)) {
        mapaLideres.set(m.pessoa_id, {
          tipoItem: 'pessoa',
          id: m.id,
          pessoa_id: m.pessoa_id,
          nome: m.pessoas?.nome || 'Líder',
          foto_url: m.pessoas?.foto_url,
          cargo: m.pessoas?.cargo,
          telefone: m.pessoas?.telefone,
          ministerio: m.ministerios?.nome || 'Ministério',
          funcao: 'Coordenador / Líder',
          statusBadge: '🟢 Líder de Equipe'
        });
      }
    });

    // 4. Lista de Funções Ativas (MOSTRAR APENAS AS FUNÇÕES)
    const mapaContagemFuncoes = {};
    membros.forEach(m => {
      if (m.funcao) {
        const chave = `${m.funcao}__${m.ministerio_id || 'geral'}`;
        mapaContagemFuncoes[chave] = (mapaContagemFuncoes[chave] || {
          nome: m.funcao,
          ministerio: m.ministerios?.nome || 'Geral',
          ministerio_id: m.ministerio_id,
          total: 0
        });
        mapaContagemFuncoes[chave].total += 1;
      }
    });

    (funcoes || []).forEach(f => {
      const chave = `${f.nome}__${f.ministerio_id || 'geral'}`;
      if (!mapaContagemFuncoes[chave]) {
        mapaContagemFuncoes[chave] = {
          nome: f.nome,
          ministerio: f.ministerios?.nome || 'Geral',
          ministerio_id: f.ministerio_id,
          total: 0
        };
      }
    });

    const listaFuncoesOnly = Object.values(mapaContagemFuncoes).map((f, idx) => ({
      tipoItem: 'funcao',
      id: `func_${idx}_${f.nome}`,
      nome: f.nome,
      ministerio: f.ministerio,
      ministerio_id: f.ministerio_id,
      totalVoluntarios: f.total,
      statusBadge: '🟡 Função Mapeada'
    })).sort((a, b) => b.totalVoluntarios - a.totalVoluntarios);

    // 5. Escalas Confirmadas (Pessoas)
    const listaConfirmadas = escalas
      .filter(e => e.status === 'confirmado')
      .map(e => ({
        tipoItem: 'pessoa',
        id: e.id,
        pessoa_id: e.pessoa_id || e.pessoas?.id,
        nome: e.pessoas?.nome || 'Voluntário',
        foto_url: e.pessoas?.foto_url,
        cargo: e.pessoas?.cargo,
        telefone: e.pessoas?.telefone,
        ministerio: e.ministerios?.nome || 'Ministério',
        funcao: e.ministerio_funcoes?.nome || 'Geral',
        evento: e.eventos_ministeriais?.titulo || 'Culto/Evento',
        data_evento: e.eventos_ministeriais?.data_evento,
        statusBadge: '🟢 Escala Confirmada'
      }));

    // 6. Escalas Pendentes (Pessoas)
    const listaPendentes = escalas
      .filter(e => e.status === 'pendente' || !e.status)
      .map(e => ({
        tipoItem: 'pessoa',
        id: e.id,
        pessoa_id: e.pessoa_id || e.pessoas?.id,
        nome: e.pessoas?.nome || 'Voluntário',
        foto_url: e.pessoas?.foto_url,
        cargo: e.pessoas?.cargo,
        telefone: e.pessoas?.telefone,
        ministerio: e.ministerios?.nome || 'Ministério',
        funcao: e.ministerio_funcoes?.nome || 'Geral',
        evento: e.eventos_ministeriais?.titulo || 'Culto/Evento',
        data_evento: e.eventos_ministeriais?.data_evento,
        statusBadge: '🟡 Escala Pendente'
      }));

    // 7. Escalas Recusadas (Pessoas)
    const listaRecusadas = escalas
      .filter(e => e.status === 'recusado')
      .map(e => ({
        tipoItem: 'pessoa',
        id: e.id,
        pessoa_id: e.pessoa_id || e.pessoas?.id,
        nome: e.pessoas?.nome || 'Voluntário',
        foto_url: e.pessoas?.foto_url,
        cargo: e.pessoas?.cargo,
        telefone: e.pessoas?.telefone,
        ministerio: e.ministerios?.nome || 'Ministério',
        funcao: e.ministerio_funcoes?.nome || 'Geral',
        evento: e.eventos_ministeriais?.titulo || 'Culto/Evento',
        data_evento: e.eventos_ministeriais?.data_evento,
        statusBadge: '🔴 Escala Recusada'
      }));

    // 8. Total de Escalados (Pessoas)
    const listaTotalEscalados = escalas
      .filter(e => e.pessoas?.nome)
      .map(e => ({
        tipoItem: 'pessoa',
        id: e.id,
        pessoa_id: e.pessoa_id || e.pessoas?.id,
        nome: e.pessoas?.nome || 'Voluntário',
        foto_url: e.pessoas?.foto_url,
        cargo: e.pessoas?.cargo,
        telefone: e.pessoas?.telefone,
        ministerio: e.ministerios?.nome || 'Ministério',
        funcao: e.ministerio_funcoes?.nome || 'Geral',
        evento: e.eventos_ministeriais?.titulo || 'Culto/Evento',
        data_evento: e.eventos_ministeriais?.data_evento,
        statusBadge: e.status === 'confirmado' ? '🟢 Confirmado' : e.status === 'recusado' ? '🔴 Recusado' : '🟡 Pendente'
      }));

    return {
      voluntarios: Array.from(mapaVol.values()),
      ministerios: listaMinisteriosOnly,
      lideres: Array.from(mapaLideres.values()),
      funcoes: listaFuncoesOnly,
      confirmadas: listaConfirmadas,
      pendentes: listaPendentes,
      recusadas: listaRecusadas,
      total_escalados: listaTotalEscalados
    };
  }, [rawDados]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 italic">
        Carregando indicadores inteligentes...
      </div>
    );
  }

  const { escalasStats } = dados;
  const porcentagemConfirmada = escalasStats.total > 0 ? Math.round((escalasStats.confirmadas / escalasStats.total) * 100) : 0;
  const porcentagemPendente = escalasStats.total > 0 ? Math.round((escalasStats.pendentes / escalasStats.total) * 100) : 0;
  const porcentagemRecusada = escalasStats.total > 0 ? Math.round((escalasStats.recusadas / escalasStats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Painel de Indicadores
        </h1>
        <p className="text-xs text-slate-500">Métricas consolidadas de participação, voluntários e engajamento ministerial. Clique nos cartões para ver os detalhes.</p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
        <Card
          titulo="Voluntários Ativos"
          valor={dados.totalMembros}
          Icon={Users}
          corSub="#3b82f6"
          desc="Voluntários cadastrados"
          onClick={() => {
            setBuscaIndicador('');
            setModalIndicadorAberto('voluntarios');
          }}
        />

        <Card
          titulo="Ministérios"
          valor={dados.totalMinisterios}
          Icon={Building2}
          corSub="#8b5cf6"
          desc="Equipes ativas"
          onClick={() => {
            setBuscaIndicador('');
            setModalIndicadorAberto('ministerios');
          }}
        />

        <Card
          titulo="Líderes"
          valor={dados.totalLideres}
          Icon={Shield}
          corSub="#10b981"
          desc="Coordenadores de equipe"
          onClick={() => {
            setBuscaIndicador('');
            setModalIndicadorAberto('lideres');
          }}
        />

        <Card
          titulo="Funções Ativas"
          valor={dados.totalFuncoes}
          Icon={Briefcase}
          corSub="#f59e0b"
          desc="Cargos mapeados"
          onClick={() => {
            setBuscaIndicador('');
            setModalIndicadorAberto('funcoes');
          }}
        />
      </div>

      {/* Seção Central: Status das Escalas & Eficiência */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-5">
              Eficiência das Escalas
            </h3>
            <div className="space-y-4">
              {/* Confirmadas */}
              <div 
                onClick={() => {
                  setBuscaIndicador('');
                  setModalIndicadorAberto('confirmadas');
                }}
                className="cursor-pointer hover:bg-emerald-50/50 p-2 rounded-xl transition-all group"
                title="Clique para ver pessoas com escalas confirmadas"
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1 group-hover:text-emerald-600">
                  <span className="flex items-center gap-1.5"><CheckCircle className="text-emerald-500" size={14} /> Confirmadas</span>
                  <span>{escalasStats.confirmadas} ({porcentagemConfirmada}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${porcentagemConfirmada}%` }} />
                </div>
              </div>

              {/* Pendentes */}
              <div 
                onClick={() => {
                  setBuscaIndicador('');
                  setModalIndicadorAberto('pendentes');
                }}
                className="cursor-pointer hover:bg-amber-50/50 p-2 rounded-xl transition-all group"
                title="Clique para ver pessoas com escalas pendentes"
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1 group-hover:text-amber-600">
                  <span className="flex items-center gap-1.5"><AlertCircle className="text-amber-400" size={14} /> Pendentes</span>
                  <span>{escalasStats.pendentes} ({porcentagemPendente}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${porcentagemPendente}%` }} />
                </div>
              </div>

              {/* Recusadas */}
              <div 
                onClick={() => {
                  setBuscaIndicador('');
                  setModalIndicadorAberto('recusadas');
                }}
                className="cursor-pointer hover:bg-rose-50/50 p-2 rounded-xl transition-all group"
                title="Clique para ver pessoas que recusaram escalas"
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1 group-hover:text-rose-600">
                  <span className="flex items-center gap-1.5"><XCircle className="text-red-500" size={14} /> Recusadas</span>
                  <span>{escalasStats.recusadas} ({porcentagemRecusada}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${porcentagemRecusada}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div 
            onClick={() => {
              setBuscaIndicador('');
              setModalIndicadorAberto('total_escalados');
            }}
            className="pt-5 mt-5 border-t border-slate-50 flex justify-between items-center cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all"
            title="Clique para ver todas as pessoas escaladas"
          >
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total de Escalados</span>
            <strong className="text-lg font-black text-slate-700">{escalasStats.total}</strong>
          </div>
        </div>

        {/* Card Informativo / KPI de Crescimento */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/10 inline-block mb-3">
              Engajamento Inteligente
            </span>
            <h3 className="text-xl font-black tracking-tight leading-tight mt-1">
              "Reduzindo tarefas manuais da liderança e conectando a igreja através do serviço."
            </h3>
            <p className="text-xs text-slate-300/80 mt-2 max-w-md">
              A autoescala inteligente distribui as tarefas ponderando a disponibilidade declarada por cada voluntário e rotacionando as equipes de forma justa.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-white/10">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Novos Membros</span>
              <strong className="text-xl font-black text-white mt-1 block">+12</strong>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Participações</span>
              <strong className="text-xl font-black text-white mt-1 block">{escalasStats.confirmadas}</strong>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Taxa Confirmação</span>
              <strong className="text-xl font-black text-white mt-1 block">{porcentagemConfirmada}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings (Top 10) */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Ranking de Voluntários */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50 text-slate-800">
            <Award className="text-blue-500" size={18} />
            <h3 className="font-black text-xs uppercase tracking-wider">Top Voluntários</h3>
          </div>
          <div className="space-y-3">
            {dados.rankingVoluntarios.map((item, index) => (
              <div 
                key={item.nome} 
                onClick={() => {
                  if (item.pessoa_id && onVerMembro) onVerMembro(item.pessoa_id);
                }}
                className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-all ${
                  item.pessoa_id ? 'cursor-pointer hover:bg-blue-50/60' : ''
                }`}
                title={item.pessoa_id ? `Ver perfil de ${item.nome}` : ''}
              >
                <span className="flex items-center gap-2 text-slate-600 font-bold">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                  {item.nome}
                </span>
                <span className="font-black text-slate-800">{item.total} participações</span>
              </div>
            ))}
            {dados.rankingVoluntarios.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">Nenhum dado de escala disponível.</p>
            )}
          </div>
        </div>

        {/* Ranking de Ministérios */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50 text-slate-800">
            <Target className="text-purple-500" size={18} />
            <h3 className="font-black text-xs uppercase tracking-wider">Top Ministérios</h3>
          </div>
          <div className="space-y-3">
            {dados.rankingMinisterios.map((item, index) => (
              <div 
                key={item.nome} 
                onClick={() => {
                  if (item.id && onNavegarTab) onNavegarTab('config', { ministerioId: item.id });
                }}
                className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-all ${
                  item.id ? 'cursor-pointer hover:bg-purple-50/60' : ''
                }`}
                title={item.id ? `Ver ministério ${item.nome}` : ''}
              >
                <span className="flex items-center gap-2 text-slate-600 font-bold">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                  {item.nome}
                </span>
                <span className="font-black text-slate-800">{item.total} membros</span>
              </div>
            ))}
            {dados.rankingMinisterios.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">Nenhum ministério vinculado.</p>
            )}
          </div>
        </div>

        {/* Ranking de Líderes */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50 text-slate-800">
            <Star className="text-emerald-500" size={18} />
            <h3 className="font-black text-xs uppercase tracking-wider">Top Coordenadores</h3>
          </div>
          <div className="space-y-3">
            {dados.rankingLideres.map((item, index) => (
              <div 
                key={item.nome} 
                onClick={() => {
                  if (item.pessoa_id && onVerMembro) onVerMembro(item.pessoa_id);
                }}
                className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-all ${
                  item.pessoa_id ? 'cursor-pointer hover:bg-emerald-50/60' : ''
                }`}
                title={item.pessoa_id ? `Ver perfil do líder ${item.nome}` : ''}
              >
                <span className="flex items-center gap-2 text-slate-600 font-bold">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                  {item.nome}
                </span>
                <span className="font-black text-slate-800">{item.total} equipes</span>
              </div>
            ))}
            {dados.rankingLideres.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">Nenhum líder registrado.</p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE INDICADORES (DASHBOARD V2) */}
      {modalIndicadorAberto && (() => {
        let configModal = {
          titulo: '',
          subtitulo: '',
          corBadge: '',
          lista: [],
          corBordaHover: ''
        };

        if (modalIndicadorAberto === 'voluntarios') {
          configModal = {
            titulo: 'Voluntários Ativos Cadastrados',
            subtitulo: 'Listagem das pessoas ativas vinculadas a equipes ministeriais.',
            corBadge: 'bg-blue-50 text-blue-700 border-blue-100',
            corBordaHover: 'hover:border-blue-200',
            lista: listasIndicadores.voluntarios
          };
        } else if (modalIndicadorAberto === 'ministerios') {
          configModal = {
            titulo: 'Ministérios Cadastrados',
            subtitulo: 'Listagem de todas as equipes ministeriais ativas.',
            corBadge: 'bg-purple-50 text-purple-700 border-purple-100',
            corBordaHover: 'hover:border-purple-200',
            lista: listasIndicadores.ministerios
          };
        } else if (modalIndicadorAberto === 'lideres') {
          configModal = {
            titulo: 'Líderes e Coordenadores de Equipe',
            subtitulo: 'Listagem das pessoas responsáveis por coordenar as equipes ministeriais.',
            corBadge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            corBordaHover: 'hover:border-emerald-200',
            lista: listasIndicadores.lideres
          };
        } else if (modalIndicadorAberto === 'funcoes') {
          configModal = {
            titulo: 'Funções Ministeriais Mapeadas',
            subtitulo: 'Listagem de todos os cargos e funções cadastradas nos ministérios.',
            corBadge: 'bg-amber-50 text-amber-700 border-amber-100',
            corBordaHover: 'hover:border-amber-200',
            lista: listasIndicadores.funcoes
          };
        } else if (modalIndicadorAberto === 'confirmadas') {
          configModal = {
            titulo: 'Pessoas com Escalas Confirmadas',
            subtitulo: 'Voluntários com participação confirmada nas escalas.',
            corBadge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            corBordaHover: 'hover:border-emerald-200',
            lista: listasIndicadores.confirmadas
          };
        } else if (modalIndicadorAberto === 'pendentes') {
          configModal = {
            titulo: 'Pessoas com Escalas Pendentes',
            subtitulo: 'Voluntários escalados aguardando resposta/confirmação.',
            corBadge: 'bg-amber-50 text-amber-700 border-amber-100',
            corBordaHover: 'hover:border-amber-200',
            lista: listasIndicadores.pendentes
          };
        } else if (modalIndicadorAberto === 'recusadas') {
          configModal = {
            titulo: 'Pessoas que Recusaram Escalas',
            subtitulo: 'Voluntários que declararam indisponibilidade ou recusaram escalas.',
            corBadge: 'bg-rose-50 text-rose-700 border-rose-100',
            corBordaHover: 'hover:border-rose-200',
            lista: listasIndicadores.recusadas
          };
        } else if (modalIndicadorAberto === 'total_escalados') {
          configModal = {
            titulo: 'Total de Voluntários Escalados',
            subtitulo: 'Listagem geral de todas as pessoas com escalas de serviço.',
            corBadge: 'bg-slate-100 text-slate-700 border-slate-200',
            corBordaHover: 'hover:border-slate-300',
            lista: listasIndicadores.total_escalados
          };
        }

        const listaFiltrada = configModal.lista.filter(item => {
          if (!buscaIndicador) return true;
          const b = buscaIndicador.toLowerCase();
          return (
            item.nome.toLowerCase().includes(b) ||
            (item.ministerio && item.ministerio.toLowerCase().includes(b)) ||
            (item.lideres && item.lideres.toLowerCase().includes(b)) ||
            (item.evento && item.evento.toLowerCase().includes(b)) ||
            (item.funcao && item.funcao.toLowerCase().includes(b))
          );
        });

        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
              
              {/* Header */}
              <div className="bg-slate-900 p-5 text-white flex justify-between items-start shrink-0">
                <div>
                  <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                    {configModal.titulo}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {configModal.subtitulo}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalIndicadorAberto(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Subheader / Busca */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
                <div className="relative w-full sm:w-80">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Pesquisar registros..."
                    value={buscaIndicador}
                    onChange={(e) => setBuscaIndicador(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-400 font-medium text-slate-700"
                  />
                </div>
                <span className="text-xs font-black text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                  Total: <strong className="text-slate-800 font-black">{listaFiltrada.length} registros</strong>
                </span>
              </div>

              {/* Lista */}
              <div className="p-5 overflow-y-auto space-y-3 custom-scrollbar flex-1">
                {listaFiltrada.map((item, idx) => {
                  // Renderiza MINISTÉRIO
                  if (item.tipoItem === 'ministerio') {
                    return (
                      <div 
                        key={item.id || idx}
                        className="bg-white border border-slate-100 hover:border-purple-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div 
                            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-xs"
                            style={{ backgroundColor: item.cor_principal }}
                          >
                            <Building2 size={20} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-black text-slate-800 truncate">
                                {item.nome}
                              </h4>
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 bg-purple-50 text-purple-700 border-purple-100">
                                {item.statusBadge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 truncate font-medium">
                              {item.lideres}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-bold">
                              👥 {item.totalMembros} voluntários cadastrados
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50 w-full sm:w-auto justify-end">
                          {onNavegarTab && (
                            <button
                              type="button"
                              onClick={() => {
                                setModalIndicadorAberto(null);
                                onNavegarTab('config', { ministerioId: item.id });
                              }}
                              className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition cursor-pointer"
                            >
                              Ver Equipe / Configurar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // Renderiza FUNÇÃO
                  if (item.tipoItem === 'funcao') {
                    return (
                      <div 
                        key={item.id || idx}
                        className="bg-white border border-slate-100 hover:border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-lg shrink-0 border border-amber-500/20">
                            <Briefcase size={20} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-black text-slate-800 truncate">
                                {item.nome}
                              </h4>
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 bg-amber-50 text-amber-700 border-amber-100">
                                {item.statusBadge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 truncate font-medium">
                              Ministério: <strong className="text-slate-700 font-bold">{item.ministerio}</strong>
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-bold">
                              👤 {item.totalVoluntarios} voluntários nesta função
                            </p>
                          </div>
                        </div>

                        {item.ministerio_id && onNavegarTab && (
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50 w-full sm:w-auto justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                setModalIndicadorAberto(null);
                                onNavegarTab('config', { ministerioId: item.ministerio_id });
                              }}
                              className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold transition cursor-pointer"
                            >
                              Ver no Ministério
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Renderiza PESSOA (Padrão para Voluntários, Líderes e Escalas)
                  const dataInfo = item.data_evento ? new Date(item.data_evento).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : null;

                  return (
                    <div 
                      key={item.id || idx}
                      className={`bg-white border border-slate-100 ${configModal.corBordaHover} rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={item.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nome)}&background=3b82f6&color=fff`}
                          alt=""
                          className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 
                              onClick={() => {
                                setModalIndicadorAberto(null);
                                if (item.pessoa_id && onVerMembro) onVerMembro(item.pessoa_id);
                              }}
                              className="text-sm font-black text-slate-800 hover:text-blue-600 transition-colors cursor-pointer truncate"
                              title="Clique para ver a ficha completa do voluntário"
                            >
                              {item.nome}
                            </h4>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 ${configModal.corBadge}`}>
                              {item.statusBadge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 truncate font-medium">
                            <strong className="text-slate-700 font-bold">{item.ministerio}</strong> · {item.funcao}
                          </p>
                          {dataInfo && (
                            <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5 flex-wrap">
                              <span>📅 {item.evento}</span>
                              <span>· ⏰ {dataInfo}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50 w-full sm:w-auto justify-end">
                        {item.pessoa_id && onVerMembro && (
                          <button
                            type="button"
                            onClick={() => {
                              setModalIndicadorAberto(null);
                              onVerMembro(item.pessoa_id);
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            Ver Ficha
                          </button>
                        )}
                        {item.telefone && (
                          <a
                            href={`https://wa.me/55${item.telefone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1"
                          >
                            <span>💬 WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}

                {listaFiltrada.length === 0 && (
                  <div className="py-16 text-center text-slate-400 italic text-xs">
                    Nenhum registro encontrado para este indicador.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setModalIndicadorAberto(null)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Fechar
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
}