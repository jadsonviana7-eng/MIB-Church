import { useEffect, useState, useMemo } from 'react';
import {
  Users, Building2, Shield, Briefcase, CheckCircle, AlertCircle, XCircle,
  Award, Target, Star, Search, X, Calendar, ChevronLeft, ChevronRight, ChevronDown, RotateCcw,
  TrendingUp, RefreshCw, Sparkles
} from 'lucide-react';
import { ministeriosService, clarearCorParaModoEscuro } from './services/ministeriosService';
import { useIsDarkMode } from './hooks/useIsDarkMode';

function Card({ titulo, valor, Icon, corSub, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#17223b] rounded-2xl border border-slate-100 dark:border-[#2b3954] p-4 sm:p-5 shadow-sm transition duration-300 flex justify-between items-center relative overflow-hidden group ${onClick ? 'cursor-pointer hover:scale-[1.02] hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/40' : ''
        }`}
      title={onClick ? `Clique para visualizar o indicador ${titulo}` : ''}
    >
      <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: corSub }} />
      <div className="min-w-0 pr-2">
        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest truncate">{titulo}</p>
        <h2 className="text-2xl sm:text-3xl font-black mt-1 text-slate-800 dark:text-white tracking-tight">{valor}</h2>
        {desc && <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-400 mt-1 truncate">{desc}</p>}
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

const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function extrairDataParts(dataStr) {
  if (!dataStr) return null;
  const clean = String(dataStr).split('T')[0].split(' ')[0];
  const parts = clean.split('-');
  if (parts.length < 3) return null;
  const ano = parseInt(parts[0], 10);
  const mes = parseInt(parts[1], 10) - 1;
  const dia = parseInt(parts[2], 10);
  if (isNaN(ano) || isNaN(mes) || isNaN(dia)) return null;
  return { ano, mes, dia };
}

function verificarEscalaNoMesAno(escala, mes, ano) {
  const dataStr = escala.eventos_ministeriais?.data_evento || escala.evento?.data_evento || escala.data_evento || escala.created_at;
  const d = extrairDataParts(dataStr);
  if (!d) return false;
  return d.ano === ano && d.mes === mes;
}

/**
 * Verifica de forma inteligente e profunda se uma escala ausente/recusada já teve substituição realizada.
 * Considera tags [SUBSTITUIDO_POR:...], colunas nativas, escalas vinculadas, pedido_substituicao: false
 * e escalas ativas preenchendo a mesma vaga no evento/função.
 */
function verificarEscalaSubstituida(escala, todasEscalas) {
  if (!escala) return { foiSubstituida: false, substitutoNome: null, substitutoId: null };

  const isAusente = escala.status === 'recusado' ||
    escala.status === 'falta' ||
    escala.status === 'falta_justificada' ||
    escala.status === 'ausente';

  // 1. Tag [SUBSTITUIDO_POR:pessoa_id] em justificativa
  const mSubPor = String(escala.justificativa || '').match(/\[SUBSTITUIDO_POR:([^\]]+)\]/);
  const tagSubstitutoId = mSubPor && mSubPor[1] ? mSubPor[1].trim() : null;

  const substitutoId = escala.substituido_por_pessoa_id || tagSubstitutoId;
  if (substitutoId) {
    const pSub = escala.substituto || (todasEscalas || []).find(x => String(x.pessoa_id) === String(substitutoId))?.pessoas;
    return {
      foiSubstituida: true,
      substitutoNome: pSub?.nome || 'Voluntário Substituto',
      substitutoId
    };
  }

  // 2. Outra escala apontando diretamente como substituta desta
  const subEscala = (todasEscalas || []).find(outro =>
    String(outro.id) !== String(escala.id) && (
      (outro.substituindo_escala_id && String(outro.substituindo_escala_id) === String(escala.id)) ||
      (outro.justificativa && outro.justificativa.includes(`[SUBSTITUINDO:${escala.id}`)) ||
      (outro.substituindo_pessoa_id && String(outro.substituindo_pessoa_id) === String(escala.pessoa_id) && String(outro.funcao_id) === String(escala.funcao_id))
    )
  );

  if (subEscala) {
    return {
      foiSubstituida: true,
      substitutoNome: subEscala.pessoas?.nome || 'Voluntário Substituto',
      substitutoId: subEscala.pessoa_id
    };
  }

  // 3. Status de pedido_substituicao desativado ou substituido_em gravado
  if (isAusente && (escala.pedido_substituicao === false || escala.substituido_em)) {
    return {
      foiSubstituida: true,
      substitutoNome: escala.substituto?.nome || 'Substituto alocado',
      substitutoId: null
    };
  }

  // 4. Detecção por slot preenchido no mesmo evento, ministério e função
  if (isAusente && escala.evento_id && escala.funcao_id) {
    const vagaPreenchida = (todasEscalas || []).find(outro =>
      String(outro.id) !== String(escala.id) &&
      String(outro.evento_id) === String(escala.evento_id) &&
      String(outro.ministerio_id) === String(escala.ministerio_id) &&
      String(outro.funcao_id) === String(escala.funcao_id) &&
      String(outro.pessoa_id) !== String(escala.pessoa_id) &&
      (outro.status === 'confirmado' || outro.status === 'pendente' || outro.status === 'presente')
    );

    if (vagaPreenchida) {
      return {
        foiSubstituida: true,
        substitutoNome: vagaPreenchida.pessoas?.nome || 'Voluntário Substituto',
        substitutoId: vagaPreenchida.pessoa_id
      };
    }
  }

  return { foiSubstituida: false, substitutoNome: null, substitutoId: null };
}

export default function DashboardMinisterialV2({ onNavegarTab, onVerMembro, onNavegarGlobal, hideHeader = false }) {
  const isDark = useIsDarkMode();
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
  const hoje = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(hoje.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(hoje.getFullYear());

  // Suporte ao botão voltar do celular para fechar o modal
  useEffect(() => {
    if (modalIndicadorAberto) {
      try {
        window.history.pushState({ modalIndicadorV2: modalIndicadorAberto }, '');
      } catch (e) { }

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

    // 5. Escalas filtradas pelo período selecionado para eficiência
    const escalasDoPeriodo = (escalas || []).filter(e => verificarEscalaNoMesAno(e, mesSelecionado, anoSelecionado));

    // 5. Escalas Confirmadas (Pessoas com presença real no período)
    const listaConfirmadas = escalasDoPeriodo
      .filter(e => {
        const st = (e.status || '').toLowerCase();
        return st === 'confirmado' || st === 'presente';
      })
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
        statusBadge: '🟢 Presença Confirmada'
      }));

    // 5.1. Faltas Justificadas
    const listaFaltasJustificadas = escalasDoPeriodo
      .filter(e => {
        const st = (e.status || '').toLowerCase();
        return st === 'falta_justificada' || st === 'ausente_justificado';
      })
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
        justificativa: e.justificativa,
        statusBadge: '🟡 Falta Justificada'
      }));

    // 5.2. Faltas Injustificadas / Negativações
    const listaFaltasInjustificadas = escalasDoPeriodo
      .filter(e => {
        const st = (e.status || '').toLowerCase();
        return st === 'falta' || st === 'falta_injustificada' || st === 'ausente';
      })
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
        justificativa: e.justificativa,
        statusBadge: '⚠️ Falta / Negativação'
      }));

    // 6. Escalas Pendentes (Pessoas no período)
    const listaPendentes = escalasDoPeriodo
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
        statusBadge: '⚪ Escala Pendente'
      }));

    // 7. Escalas Recusadas & Gestão de Substituições (Pessoas no período)
    const listaRecusadas = escalasDoPeriodo
      .filter(e => e.status === 'recusado')
      .map(e => {
        const infoSub = verificarEscalaSubstituida(e, rawDados?.escalas || escalasDoPeriodo);
        return {
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
          justificativa: e.justificativa,
          substituido_por_pessoa_id: infoSub.substitutoId,
          substituto_nome: infoSub.substitutoNome,
          foiSubstituida: infoSub.foiSubstituida,
          statusBadge: infoSub.foiSubstituida ? '🔄 Recusado (Substituído)' : '🔴 Vaga em Aberto (Sem Substituto)'
        };
      })
      .sort((a, b) => {
        if (a.foiSubstituida === b.foiSubstituida) return 0;
        return a.foiSubstituida ? 1 : -1;
      });

    // 8. Total de Escalados (Pessoas no período)
    const listaTotalEscalados = escalasDoPeriodo
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
        statusBadge: e.status === 'confirmado' || e.status === 'presente' ? '🟢 Presente' :
          e.status === 'falta_justificada' || e.status === 'ausente_justificado' ? '🟡 Falta Justificada' :
            e.status === 'falta' || e.status === 'falta_injustificada' || e.status === 'ausente' ? '⚠️ Falta / Negativação' :
              e.status === 'recusado' ? '🔴 Recusado' : '⚪ Pendente'
      }));

    return {
      voluntarios: Array.from(mapaVol.values()),
      ministerios: listaMinisteriosOnly,
      lideres: Array.from(mapaLideres.values()),
      funcoes: listaFuncoesOnly,
      confirmadas: listaConfirmadas,
      faltas_justificadas: listaFaltasJustificadas,
      faltas_injustificadas: listaFaltasInjustificadas,
      pendentes: listaPendentes,
      recusadas: listaRecusadas,
      substituicoes: listaRecusadas,
      total_escalados: listaTotalEscalados
    };
  }, [rawDados, mesSelecionado, anoSelecionado]);

  const labelPeriodo = `${NOMES_MESES[mesSelecionado]} de ${anoSelecionado}`;
  const ehMesAtual = mesSelecionado === hoje.getMonth() && anoSelecionado === hoje.getFullYear();

  function mesAnterior() {
    if (mesSelecionado === 0) {
      setMesSelecionado(11);
      setAnoSelecionado(prev => prev - 1);
    } else {
      setMesSelecionado(prev => prev - 1);
    }
  }

  function proximoMes() {
    if (mesSelecionado === 11) {
      setMesSelecionado(0);
      setAnoSelecionado(prev => prev + 1);
    } else {
      setMesSelecionado(prev => prev + 1);
    }
  }

  function irParaMesAtual() {
    const d = new Date();
    setMesSelecionado(d.getMonth());
    setAnoSelecionado(d.getFullYear());
  }

  const anosDisponiveis = useMemo(() => {
    const anoBase = new Date().getFullYear();
    const anosSet = new Set([anoBase - 2, anoBase - 1, anoBase, anoBase + 1, anoBase + 2]);
    (rawDados?.escalas || []).forEach(e => {
      const dataStr = e.eventos_ministeriais?.data_evento || e.evento?.data_evento || e.data_evento || e.created_at;
      const d = extrairDataParts(dataStr);
      if (d?.ano) anosSet.add(d.ano);
    });
    return Array.from(anosSet).sort((a, b) => a - b);
  }, [rawDados?.escalas]);

  // Escalas filtradas pelo mês e ano selecionados
  const escalasDoPeriodo = useMemo(() => {
    if (!rawDados?.escalas) return [];
    return rawDados.escalas.filter(e => verificarEscalaNoMesAno(e, mesSelecionado, anoSelecionado));
  }, [rawDados?.escalas, mesSelecionado, anoSelecionado]);

  const statsEficiencia = useMemo(() => {
    if (!rawDados?.escalas) return dados.escalasStats;

    let confirmadas = 0;
    let pendentes = 0;
    let recusadas = 0;
    let faltasJustificadas = 0;
    let faltasInjustificadas = 0;

    escalasDoPeriodo.forEach(e => {
      const st = (e.status || '').toLowerCase();
      if (st === 'confirmado' || st === 'presente') {
        confirmadas++;
      } else if (st === 'falta_justificada' || st === 'ausente_justificado') {
        faltasJustificadas++;
      } else if (st === 'falta' || st === 'falta_injustificada' || st === 'ausente') {
        faltasInjustificadas++;
      } else if (st === 'recusado') {
        recusadas++;
      } else {
        pendentes++;
      }
    });

    const total = escalasDoPeriodo.length;
    const pctConfirmada = total > 0 ? Math.round((confirmadas / total) * 100) : 0;
    const pctPendente = total > 0 ? Math.round((pendentes / total) * 100) : 0;
    const pctRecusada = total > 0 ? Math.round((recusadas / total) * 100) : 0;

    return {
      confirmadas,
      pendentes,
      recusadas,
      faltasJustificadas,
      faltasInjustificadas,
      total,
      pctConfirmada,
      pctPendente,
      pctRecusada
    };
  }, [rawDados?.escalas, escalasDoPeriodo, dados.escalasStats]);

  // 1. Ranking de Voluntários no mês/ano selecionado
  const rankingVoluntarios = useMemo(() => {
    if (!rawDados?.escalas) return dados.rankingVoluntarios || [];
    const volMap = new Map();

    escalasDoPeriodo.forEach(e => {
      const st = (e.status || '').toLowerCase();
      if (st === 'confirmado' || st === 'presente') {
        const pId = e.pessoa_id || e.pessoas?.id;
        if (!pId) return;
        const pNome = e.pessoas?.nome || 'Voluntário';
        if (!volMap.has(pId)) {
          volMap.set(pId, {
            pessoa_id: pId,
            nome: pNome,
            foto_url: e.pessoas?.foto_url,
            total: 0
          });
        }
        volMap.get(pId).total += 1;
      }
    });

    return Array.from(volMap.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [escalasDoPeriodo, rawDados?.escalas, dados.rankingVoluntarios]);

  // 2. Ranking de Ministérios no mês/ano selecionado
  const rankingMinisterios = useMemo(() => {
    if (!rawDados?.ministerios) return dados.rankingMinisterios || [];
    const minMap = new Map();

    rawDados.ministerios.forEach(m => {
      const totalMembros = (rawDados.membros || []).filter(mem => String(mem.ministerio_id) === String(m.id)).length;
      minMap.set(String(m.id), {
        id: m.id,
        nome: m.nome,
        cor_principal: m.cor_principal || '#8b5cf6',
        totalEscalas: 0,
        totalConfirmadas: 0,
        totalMembros
      });
    });

    escalasDoPeriodo.forEach(e => {
      const minId = String(e.ministerio_id);
      if (minMap.has(minId)) {
        const item = minMap.get(minId);
        item.totalEscalas += 1;
        const st = (e.status || '').toLowerCase();
        if (st === 'confirmado' || st === 'presente') {
          item.totalConfirmadas += 1;
        }
      }
    });

    return Array.from(minMap.values())
      .map(item => ({
        ...item,
        total: item.totalEscalas,
        sufixo: item.totalEscalas === 1 ? 'escala' : 'escalas'
      }))
      .sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        return b.totalMembros - a.totalMembros;
      })
      .slice(0, 10);
  }, [escalasDoPeriodo, rawDados, dados.rankingMinisterios]);

  // 3. Ranking de Coordenadores no mês/ano selecionado
  const rankingCoordenadores = useMemo(() => {
    if (!rawDados?.membros) return dados.rankingLideres || [];
    const coordMap = new Map();

    rawDados.membros.filter(m => m.lider === true && m.pessoas?.nome).forEach(m => {
      const pId = m.pessoa_id;
      if (!coordMap.has(pId)) {
        coordMap.set(pId, {
          pessoa_id: pId,
          nome: m.pessoas?.nome || 'Líder',
          foto_url: m.pessoas?.foto_url,
          ministeriosIds: new Set(),
          totalEscalasGeridas: 0,
          totalConfirmadas: 0
        });
      }
      coordMap.get(pId).ministeriosIds.add(String(m.ministerio_id));
    });

    escalasDoPeriodo.forEach(e => {
      const minId = String(e.ministerio_id);
      const st = (e.status || '').toLowerCase();
      coordMap.forEach(coord => {
        if (coord.ministeriosIds.has(minId)) {
          coord.totalEscalasGeridas += 1;
          if (st === 'confirmado' || st === 'presente') {
            coord.totalConfirmadas += 1;
          }
        }
      });
    });

    return Array.from(coordMap.values())
      .map(coord => {
        const eqCount = coord.ministeriosIds.size;
        return {
          pessoa_id: coord.pessoa_id,
          nome: coord.nome,
          foto_url: coord.foto_url,
          total: coord.totalEscalasGeridas > 0 ? coord.totalEscalasGeridas : eqCount,
          sufixo: coord.totalEscalasGeridas > 0
            ? (coord.totalEscalasGeridas === 1 ? 'escala gerenciada' : 'escalas gerenciadas')
            : (eqCount === 1 ? 'equipe' : 'equipes')
        };
      })
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [escalasDoPeriodo, rawDados, dados.rankingLideres]);

  // 4. Novos membros que entraram no mês/ano selecionado
  const novosMembrosNoPeriodo = useMemo(() => {
    if (!rawDados?.historicos) return 0;
    return rawDados.historicos.filter(h => {
      const d = extrairDataParts(h.criado_em);
      if (!d) return false;
      return d.ano === anoSelecionado && d.mes === mesSelecionado;
    }).length;
  }, [rawDados?.historicos, mesSelecionado, anoSelecionado]);

  // 4.1. Métricas complementares para o card de Engajamento Inteligente
  const engajamentoStats = useMemo(() => {
    const todasEscalas = rawDados?.escalas || escalasDoPeriodo;
    const recusasDoPeriodo = escalasDoPeriodo.filter(e => e.status === 'recusado');

    let totalSubstituidas = 0;
    let vagasPendentes = 0;

    recusasDoPeriodo.forEach(e => {
      const info = verificarEscalaSubstituida(e, todasEscalas);
      if (info.foiSubstituida) {
        totalSubstituidas++;
      } else {
        vagasPendentes++;
      }
    });

    const totalRecusas = recusasDoPeriodo.length;

    const idsVoluntarios = new Set();
    escalasDoPeriodo.forEach(e => {
      const pId = e.pessoa_id || e.pessoas?.id;
      if (pId) idsVoluntarios.add(pId);
    });
    const voluntariosUnicos = idsVoluntarios.size;
    const totalEscalas = escalasDoPeriodo.length;
    const mediaPorVoluntario = voluntariosUnicos > 0 ? (totalEscalas / voluntariosUnicos).toFixed(1) : '0';
    const pctBaseMobilizada = dados.totalMembros > 0 ? Math.round((voluntariosUnicos / dados.totalMembros) * 100) : 0;

    return {
      totalRecusas,
      totalSubstituidas,
      vagasPendentes,
      voluntariosUnicos,
      mediaPorVoluntario,
      pctBaseMobilizada
    };
  }, [escalasDoPeriodo, rawDados?.escalas, dados.totalMembros]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 italic">
        Carregando indicadores inteligentes...
      </div>
    );
  }

  const escalasStats = statsEficiencia;
  const porcentagemConfirmada = escalasStats.pctConfirmada ?? (escalasStats.total > 0 ? Math.round((escalasStats.confirmadas / escalasStats.total) * 100) : 0);
  const porcentagemPendente = escalasStats.pctPendente ?? (escalasStats.total > 0 ? Math.round((escalasStats.pendentes / escalasStats.total) * 100) : 0);
  const porcentagemRecusada = escalasStats.pctRecusada ?? (escalasStats.total > 0 ? Math.round((escalasStats.recusadas / escalasStats.total) * 100) : 0);

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Painel de Indicadores
          </h1>
          <p className="text-xs text-slate-500">Métricas consolidadas de participação, voluntários e engajamento ministerial. Clique nos cartões para ver os detalhes.</p>
        </div>
      )}

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
        <div className="bg-white dark:bg-[#17223b] rounded-2xl border border-slate-100 dark:border-[#2b3954] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-4 pb-3 border-b border-slate-100 dark:border-[#2b3954]">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                    <Calendar size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                      Eficiência das Escalas
                    </h3>
                  </div>
                </div>

                {!ehMesAtual && (
                  <button
                    type="button"
                    onClick={irParaMesAtual}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
                    title="Retornar para o mês atual"
                  >
                    <RotateCcw size={10} />
                    <span>Atual</span>
                  </button>
                )}
              </div>

              {/* Seletor de Período: Setas Horizontais para Navegar Meses e Escolha de Ano */}
              <div className="bg-slate-50/90 dark:bg-[#111a30]/80 border border-slate-200/80 dark:border-[#2b3954] rounded-2xl p-2 shadow-2xs space-y-1.5 mt-2">
                {/* Linha 1: Navegador de Meses com Setas Horizontais e Nome Completo */}
                <div className="flex items-center justify-between bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] rounded-xl px-1.5 py-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={mesAnterior}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all active:scale-90 cursor-pointer shrink-0"
                    title="Mês anterior"
                  >
                    <ChevronLeft size={16} strokeWidth={2.5} />
                  </button>

                  <div className="relative flex-1 text-center min-w-0 px-1">
                    <select
                      value={mesSelecionado}
                      onChange={(e) => setMesSelecionado(Number(e.target.value))}
                      className="appearance-none bg-transparent font-black text-xs text-slate-800 dark:text-white text-center cursor-pointer focus:outline-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-0.5 w-full text-center"
                      title="Clique para escolher o mês"
                    >
                      {NOMES_MESES.map((nome, idx) => (
                        <option key={idx} value={idx} className="bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-100">{nome}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={proximoMes}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all active:scale-90 cursor-pointer shrink-0"
                    title="Próximo mês"
                  >
                    <ChevronRight size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Linha 2: Escolha do Ano */}
                <div className="flex items-center justify-between gap-1.5 px-1 pt-0.5">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Ano:</span>
                  <div className="relative flex-1 max-w-[90px]">
                    <select
                      value={anoSelecionado}
                      onChange={(e) => setAnoSelecionado(Number(e.target.value))}
                      className="w-full appearance-none bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-[#334155] rounded-lg pl-2 pr-5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs cursor-pointer text-center"
                      title="Escolher ano"
                    >
                      {anosDisponiveis.map((ano) => (
                        <option key={ano} value={ano} className="bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-100">{ano}</option>
                      ))}
                    </select>
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-400">
                      <ChevronDown size={11} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Confirmadas */}
              <div
                onClick={() => {
                  setBuscaIndicador('');
                  setModalIndicadorAberto('confirmadas');
                }}
                className="cursor-pointer hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 p-2 rounded-xl transition-all group"
                title={`Clique para ver pessoas com escalas confirmadas (${labelPeriodo})`}
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  <span className="flex items-center gap-1.5"><CheckCircle className="text-emerald-500" size={14} /> Confirmadas</span>
                  <span>{escalasStats.confirmadas} ({porcentagemConfirmada}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${porcentagemConfirmada}%` }} />
                </div>
              </div>

              {/* Pendentes */}
              <div
                onClick={() => {
                  setBuscaIndicador('');
                  setModalIndicadorAberto('pendentes');
                }}
                className="cursor-pointer hover:bg-amber-50/50 dark:hover:bg-amber-950/30 p-2 rounded-xl transition-all group"
                title={`Clique para ver pessoas com escalas pendentes (${labelPeriodo})`}
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  <span className="flex items-center gap-1.5"><AlertCircle className="text-amber-400" size={14} /> Pendentes</span>
                  <span>{escalasStats.pendentes} ({porcentagemPendente}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${porcentagemPendente}%` }} />
                </div>
              </div>

              {/* Recusadas */}
              <div
                onClick={() => {
                  setBuscaIndicador('');
                  setModalIndicadorAberto('recusadas');
                }}
                className="cursor-pointer hover:bg-rose-50/50 dark:hover:bg-rose-950/30 p-2 rounded-xl transition-all group"
                title={`Clique para ver pessoas que recusaram escalas (${labelPeriodo})`}
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                  <span className="flex items-center gap-1.5"><XCircle className="text-red-500" size={14} /> Recusadas</span>
                  <span>{escalasStats.recusadas} ({porcentagemRecusada}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
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
            className="pt-4 mt-5 border-t border-slate-100 dark:border-[#2b3954] flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-[#1c2b4a] p-2 rounded-xl transition-all"
            title={`Clique para ver todas as pessoas escaladas (${labelPeriodo})`}
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total de Escalados</span>
              <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">{labelPeriodo}</span>
            </div>
            <strong className="text-lg font-black text-slate-700 dark:text-white">{escalasStats.total}</strong>
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

          {/* Mini-cards em Glassmorphism com Métricas Avançadas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            {/* Card 1: Rotação / Média de Carga */}
            <div className="bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-xl p-3 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Média de Carga</span>
                <TrendingUp size={14} className="text-blue-400" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <strong className="text-lg font-black text-white">{engajamentoStats.mediaPorVoluntario}</strong>
                <span className="text-[10px] text-slate-400 font-medium">escalas/vol</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-1 line-clamp-1">
                {Number(engajamentoStats.mediaPorVoluntario) <= 2.5 ? '🟢 Distribuição equilibrada' : '🟡 Carga concentrada'}
              </p>
            </div>

            {/* Card 2: Cobertura de Substituições */}
            <div
              onClick={() => {
                setBuscaIndicador('');
                setModalIndicadorAberto('substituicoes');
              }}
              className="bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-xl p-3 transition-all cursor-pointer group"
              title="Clique para ver detalhes das recusas e status de substituição"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 group-hover:text-purple-300 transition-colors">Substituições</span>
                <RefreshCw size={14} className="text-purple-400 group-hover:rotate-45 transition-transform" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <strong className="text-lg font-black text-white">
                  {engajamentoStats.vagasPendentes === 0
                    ? (engajamentoStats.totalRecusas > 0 ? '100%' : '0')
                    : engajamentoStats.vagasPendentes}
                </strong>
                <span className="text-[10px] text-slate-400 font-medium">
                  {engajamentoStats.vagasPendentes === 0
                    ? (engajamentoStats.totalRecusas > 0 ? 'cobertas' : 'pendências')
                    : (engajamentoStats.vagasPendentes === 1 ? 'vaga aberta' : 'vagas abertas')}
                </span>
              </div>
              <p className="text-[9px] text-slate-400 mt-1 line-clamp-1">
                {engajamentoStats.vagasPendentes === 0
                  ? (engajamentoStats.totalRecusas > 0
                    ? '🛡️ Todas as recusas foram cobertas'
                    : '🛡️ Nenhuma recusa no período')
                  : `⚠️ ${engajamentoStats.vagasPendentes} ${engajamentoStats.vagasPendentes === 1 ? 'vaga necessita' : 'vagas necessitam'} de substituição`}
              </p>
            </div>

            {/* Card 3: Voluntários em Ação */}
            <div
              onClick={() => {
                setBuscaIndicador('');
                setModalIndicadorAberto('total_escalados');
              }}
              className="bg-white/5 hover:bg-white/[0.08] border border-white/10 rounded-xl p-3 transition-all cursor-pointer group"
              title="Clique para ver todas as pessoas escaladas no período"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 group-hover:text-emerald-300 transition-colors">Base Ativa</span>
                <Sparkles size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <strong className="text-lg font-black text-white">{engajamentoStats.voluntariosUnicos}</strong>
                <span className="text-[10px] text-slate-400 font-medium">voluntários</span>
              </div>
              <p className="text-[9px] text-slate-400 mt-1 line-clamp-1">
                {dados.totalMembros > 0
                  ? `${engajamentoStats.pctBaseMobilizada}% da base escalada`
                  : 'Voluntários escalados'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Novos Membros</span>
              <strong className="text-xl font-black text-white mt-1 block">+{novosMembrosNoPeriodo}</strong>
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
        <div className="bg-white dark:bg-[#17223b] rounded-2xl border border-slate-100 dark:border-[#2b3954] p-5 shadow-sm space-y-4">
          <div className="flex justify-end">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-100/80 dark:border-blue-900/40 px-2 py-0.5 rounded-full shrink-0">
              {NOMES_MESES[mesSelecionado]}/{anoSelecionado}
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-50 dark:border-[#2b3954] text-slate-800 dark:text-white">
            <div className="flex items-center gap-2">
              <Award className="text-blue-500" size={18} />
              <h3 className="font-black text-xs uppercase tracking-wider">Top Voluntários</h3>
            </div>
          </div>
          <div className="space-y-3">
            {rankingVoluntarios.map((item, index) => (
              <div
                key={item.pessoa_id || item.nome}
                onClick={() => {
                  if (item.pessoa_id && onVerMembro) onVerMembro(item.pessoa_id);
                }}
                className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-all ${item.pessoa_id ? 'cursor-pointer hover:bg-blue-50/60 dark:hover:bg-blue-950/40' : ''
                  }`}
                title={item.pessoa_id ? `Ver perfil de ${item.nome}` : ''}
              >
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold truncate pr-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-[#1c2b4a] text-slate-500 dark:text-slate-400 flex items-center justify-center text-[10px] font-black shrink-0">{index + 1}</span>
                  <span className="truncate">{item.nome}</span>
                </span>
                <span className="font-black text-slate-800 dark:text-white shrink-0">{item.total} {item.total === 1 ? 'participação' : 'participações'}</span>
              </div>
            ))}
            {rankingVoluntarios.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">
                Nenhuma escala confirmada em {NOMES_MESES[mesSelecionado]}/{anoSelecionado}.
              </p>
            )}
          </div>
        </div>

        {/* Ranking de Ministérios */}
        <div className="bg-white dark:bg-[#17223b] rounded-2xl border border-slate-100 dark:border-[#2b3954] p-5 shadow-sm space-y-4">
          <div className="flex justify-end">
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border border-purple-100/80 dark:border-purple-900/40 px-2 py-0.5 rounded-full shrink-0">
              {NOMES_MESES[mesSelecionado]}/{anoSelecionado}
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-50 dark:border-[#2b3954] text-slate-800 dark:text-white">
            <div className="flex items-center gap-2">
              <Target className="text-purple-500" size={18} />
              <h3 className="font-black text-xs uppercase tracking-wider">Top Ministérios</h3>
            </div>
          </div>
          <div className="space-y-3">
            {rankingMinisterios.map((item, index) => {
              const corMin = isDark ? clarearCorParaModoEscuro(item.cor_principal) : item.cor_principal;
              return (
                <div
                  key={item.id || item.nome}
                  onClick={() => {
                    if (item.id && onNavegarTab) onNavegarTab('config', { ministerioId: item.id });
                  }}
                  className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-all ${item.id ? 'cursor-pointer hover:bg-purple-50/60 dark:hover:bg-purple-950/40' : ''
                    }`}
                  title={item.id ? `Ver ministério ${item.nome}` : ''}
                >
                  <span className="flex items-center gap-2 font-bold truncate pr-2">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                      style={{
                        backgroundColor: isDark ? `${corMin}30` : `${corMin}20`,
                        color: corMin,
                        border: isDark ? `1px solid ${corMin}50` : undefined
                      }}
                    >
                      {index + 1}
                    </span>
                    <span className="truncate nome-ministerio-contraste" style={{ color: isDark ? corMin : undefined }}>
                      {item.nome}
                    </span>
                  </span>
                  <span className="font-black text-slate-800 dark:text-white shrink-0">
                    {item.total > 0 ? `${item.total} ${item.sufixo}` : `${item.totalMembros} membros`}
                  </span>
                </div>
              );
            })}
            {rankingMinisterios.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">Nenhum ministério cadastrado.</p>
            )}
          </div>
        </div>

        {/* Ranking de Líderes */}
        <div className="bg-white dark:bg-[#17223b] rounded-2xl border border-slate-100 dark:border-[#2b3954] p-5 shadow-sm space-y-4">
          <div className="flex justify-end">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100/80 dark:border-emerald-900/40 px-2 py-0.5 rounded-full shrink-0">
              {NOMES_MESES[mesSelecionado]}/{anoSelecionado}
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-50 dark:border-[#2b3954] text-slate-800 dark:text-white">
            <div className="flex items-center gap-2">
              <Star className="text-emerald-500" size={18} />
              <h3 className="font-black text-xs uppercase tracking-wider">Top Coordenadores</h3>
            </div>
          </div>
          <div className="space-y-3">
            {rankingCoordenadores.map((item, index) => (
              <div
                key={item.pessoa_id || item.nome}
                onClick={() => {
                  if (item.pessoa_id && onVerMembro) onVerMembro(item.pessoa_id);
                }}
                className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-all ${item.pessoa_id ? 'cursor-pointer hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40' : ''
                  }`}
                title={item.pessoa_id ? `Ver perfil do líder ${item.nome}` : ''}
              >
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold truncate pr-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-[#1c2b4a] text-slate-500 dark:text-slate-400 flex items-center justify-center text-[10px] font-black shrink-0">{index + 1}</span>
                  <span className="truncate">{item.nome}</span>
                </span>
                <span className="font-black text-slate-800 dark:text-white shrink-0">{item.total} {item.sufixo}</span>
              </div>
            ))}
            {rankingCoordenadores.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">Nenhum coordenador registrado.</p>
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
            subtitulo: `Voluntários com participação confirmada nas escalas (${labelPeriodo}).`,
            corBadge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
            corBordaHover: 'hover:border-emerald-200',
            lista: listasIndicadores.confirmadas
          };
        } else if (modalIndicadorAberto === 'pendentes') {
          configModal = {
            titulo: 'Pessoas com Escalas Pendentes',
            subtitulo: `Voluntários escalados aguardando resposta/confirmação (${labelPeriodo}).`,
            corBadge: 'bg-amber-50 text-amber-700 border-amber-100',
            corBordaHover: 'hover:border-amber-200',
            lista: listasIndicadores.pendentes
          };
        } else if (modalIndicadorAberto === 'recusadas' || modalIndicadorAberto === 'substituicoes') {
          configModal = {
            titulo: modalIndicadorAberto === 'substituicoes'
              ? 'Gestão de Substituições & Vagas'
              : 'Pessoas que Recusaram Escalas',
            subtitulo: modalIndicadorAberto === 'substituicoes'
              ? `Acompanhamento de recusas, coberturas e voluntários substitutos (${labelPeriodo}).`
              : `Voluntários que declararam indisponibilidade ou recusaram escalas (${labelPeriodo}).`,
            corBadge: 'bg-rose-50 text-rose-700 border-rose-100',
            corBordaHover: 'hover:border-rose-200',
            lista: listasIndicadores.recusadas
          };
        } else if (modalIndicadorAberto === 'total_escalados') {
          configModal = {
            titulo: 'Total de Voluntários Escalados',
            subtitulo: `Listagem geral de escalas de serviço no período (${labelPeriodo}).`,
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
            <div className="bg-white dark:bg-[#17223b] rounded-3xl border border-slate-100 dark:border-[#2b3954] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">

              {/* Header */}
              <div className="bg-slate-900 dark:bg-[#0b1329] p-5 text-white flex justify-between items-start shrink-0 border-b dark:border-[#2b3954]">
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
              <div className="p-4 bg-slate-50 dark:bg-[#111a30] border-b border-slate-100 dark:border-[#2b3954] flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
                <div className="relative w-full sm:w-80">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Pesquisar registros..."
                    value={buscaIndicador}
                    onChange={(e) => setBuscaIndicador(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-[#334155] rounded-xl outline-none focus:border-blue-400 font-medium text-slate-700 dark:text-slate-200"
                  />
                </div>
                <span className="text-xs font-black text-slate-500 dark:text-slate-300 bg-white dark:bg-[#17223b] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2b3954]">
                  Total: <strong className="text-slate-800 dark:text-white font-black">{listaFiltrada.length} registros</strong>
                </span>
              </div>

              {/* Lista */}
              <div className="p-5 overflow-y-auto space-y-3 custom-scrollbar flex-1">
                {listaFiltrada.map((item, idx) => {
                  // Renderiza MINISTÉRIO
                  if (item.tipoItem === 'ministerio') {
                    const corMin = isDark ? clarearCorParaModoEscuro(item.cor_principal) : item.cor_principal;
                    return (
                      <div
                        key={item.id || idx}
                        className="bg-white dark:bg-[#111a30] border border-slate-100 dark:border-[#2b3954] hover:border-purple-200 dark:hover:border-purple-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-xs"
                            style={{
                              backgroundColor: isDark ? `${corMin}28` : item.cor_principal,
                              color: isDark ? corMin : '#ffffff',
                              border: isDark ? `2px solid ${corMin}60` : undefined
                            }}
                          >
                            <Building2 size={20} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4
                                className="text-sm font-black text-slate-800 dark:text-white truncate nome-ministerio-contraste"
                                style={{ color: isDark ? corMin : undefined }}
                              >
                                {item.nome}
                              </h4>
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-900/40">
                                {item.statusBadge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate font-medium">
                              {item.lideres}
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5 font-bold">
                              👥 {item.totalMembros} voluntários cadastrados
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50 dark:border-[#2b3954] w-full sm:w-auto justify-end">
                          {onNavegarTab && (
                            <button
                              type="button"
                              onClick={() => {
                                setModalIndicadorAberto(null);
                                onNavegarTab('config', { ministerioId: item.id });
                              }}
                              className="px-3.5 py-2 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 rounded-xl text-xs font-bold transition cursor-pointer"
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
                        className="bg-white dark:bg-[#111a30] border border-slate-100 dark:border-[#2b3954] hover:border-amber-200 dark:hover:border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-lg shrink-0 border border-amber-500/20">
                            <Briefcase size={20} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-black text-slate-800 dark:text-white truncate">
                                {item.nome}
                              </h4>
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-900/40">
                                {item.statusBadge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate font-medium">
                              Ministério: <strong className="text-slate-700 dark:text-slate-200 font-bold">{item.ministerio}</strong>
                            </p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5 font-bold">
                              👤 {item.totalVoluntarios} voluntários nesta função
                            </p>
                          </div>
                        </div>

                        {item.ministerio_id && onNavegarTab && (
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50 dark:border-[#2b3954] w-full sm:w-auto justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                setModalIndicadorAberto(null);
                                onNavegarTab('config', { ministerioId: item.ministerio_id });
                              }}
                              className="px-3.5 py-2 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 rounded-xl text-xs font-bold transition cursor-pointer"
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
                      className={`bg-white dark:bg-[#111a30] border border-slate-100 dark:border-[#2b3954] ${configModal.corBordaHover} rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md transition`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={item.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nome)}&background=3b82f6&color=fff`}
                          alt=""
                          className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 dark:border-[#2b3954] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4
                              onClick={() => {
                                setModalIndicadorAberto(null);
                                if (item.pessoa_id && onVerMembro) onVerMembro(item.pessoa_id);
                              }}
                              className="text-sm font-black text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer truncate"
                              title="Clique para ver a ficha completa do voluntário"
                            >
                              {item.nome}
                            </h4>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 ${
                              item.foiSubstituida
                                ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/40'
                                : configModal.corBadge
                            }`}>
                              {item.statusBadge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate font-medium">
                            <strong className="text-slate-700 dark:text-slate-200 font-bold">{item.ministerio}</strong> · {item.funcao}
                          </p>
                          {item.justificativa && (
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 italic mt-0.5">
                              💬 Motivo: {item.justificativa}
                            </p>
                          )}
                          {item.substituto_nome && (
                            <p className="text-[10px] text-indigo-700 dark:text-indigo-400 font-bold mt-0.5">
                              🔄 Substituído(a) por: {item.substituto_nome}
                            </p>
                          )}
                          {item.substituindo_nome && (
                            <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">
                              🤝 Substituindo: {item.substituindo_nome}
                            </p>
                          )}
                          {dataInfo && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-400 mt-1 flex items-center gap-1.5 flex-wrap">
                              <span>📅 {item.evento}</span>
                              <span>· ⏰ {dataInfo}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50 dark:border-[#2b3954] w-full sm:w-auto justify-end">
                        {item.pessoa_id && onVerMembro && (
                          <button
                            type="button"
                            onClick={() => {
                              setModalIndicadorAberto(null);
                              onVerMembro(item.pessoa_id);
                            }}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-[#1c2b4a] hover:bg-slate-200 dark:hover:bg-[#263860] text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            Ver Ficha
                          </button>
                        )}
                        {item.telefone && (
                          <a
                            href={`https://wa.me/55${item.telefone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1"
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
              <div className="p-4 bg-slate-50 dark:bg-[#111a30] border-t border-slate-100 dark:border-[#2b3954] flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setModalIndicadorAberto(null)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
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