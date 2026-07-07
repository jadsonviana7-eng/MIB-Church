import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import TelaConfiguracoes from './TelaConfiguracoes';
import TelaLogin from './TelaLogin';
import OverviewDashboard from './OverviewDashboard'; // Renomeado de Dashboard
import DashboardMembro from './DashboardMembro';
import DashboardLider from './DashboardLider';
import CelulasModulo from './CelulasModulo';
import PessoasModulo from './PessoasModulo';
import ModuloFinanceiro from './ModuloFinanceiro';
import ModuloUtilitarios from './ModuloUtilitarios';
import EscolasModulo from './EscolasModulo';
import { ConfirmModal, ModalWrapper } from './ui';
import GestaoMinisterial from './GestaoMinisterial';
import AgendaModulo from './AgendaModulo';
import PublicEventRegistration from './PublicEventRegistration';
import DetalhesMembro from './DetalhesMembro';
import HomePage from './HomePage'; // Novo componente HomePage
import PublicRegistrationForm from './PublicRegistrationForm'; // Importar o novo componente
import { MenuIcons, submenuIconKey } from './icons'; // Importa MenuIcons e submenuIconKey do novo arquivo
import { Settings, Bell } from 'lucide-react';
import { normalizarTexto, faixaDaIdade, meses, valorCampoRelatorio } from './churchUtils';

const filtrosIniciais = {
  busca: '', genero: '', estadoCivil: '', faixaEtaria: '', zona: '', cargo: '',
  atuacao: '', batizado: '', relatorioCampo: '', relatorioValor: ''
};


export default function App() {
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => {
    window.confirmModal = (titulo, mensagem) => {
      return new Promise((resolve) => {
        setConfirmDialog({ titulo, mensagem, resolve });
      });
    };
  }, []);
  // Filtros para Células
  const filtrosCelulaIniciais = {
    busca: '', faixaEtaria: '', genero: '', diaSemana: '', horario: '',
  };

  const [filtrosCelula, setFiltrosCelula] = useState(filtrosCelulaIniciais);
  const [celulaSelecionadaId, setCelulaSelecionadaId] = useState(null);
  const [turmaSelecionadaId, setTurmaSelecionadaId] = useState(null);
  const [filtroCursoTurmas, setFiltroCursoTurmas] = useState('');
  const escolaridadesDisponiveis = ['Ensino Fundamental', 'Ensino Médio', 'Ensino Superior', 'Pós-graduação', 'Mestrado/Doutorado'];

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    try {
      const sessaoSalva = localStorage.getItem('mibChurchSessao');
      const usuario = sessaoSalva ? JSON.parse(sessaoSalva) : null;
      console.log('Sessão carregada do localStorage:', usuario);
      return usuario;
    } catch (err) {
      console.error('Erro ao carregar sessão:', err);
      localStorage.removeItem('mibChurchSessao');
      return null;
    }
  });

  const [moduloAtual, setModuloAtual] = useState('dashboard');
  const [menuAberto, setMenuAberto] = useState(false);
  const [pessoasSubmenu, setPessoasSubmenu] = useState('todos');
  const [celulasSubmenu, setCelulasSubmenu] = useState('painel');
  const [financeiroSubmenu, setFinanceiroSubmenu] = useState('resumo');
  const [escolasSubmenu, setEscolasSubmenu] = useState('resumo'); // Novo estado para o submenu de Escolas
  const [gestaoMinisterialSubmenu, setGestaoMinisterialSubmenu] = useState('escalas');
  const [agendaSubmenu, setAgendaSubmenu] = useState('calendario');
  const [utilitariosSubmenu, setUtilitariosSubmenu] = useState('resumo');

  // ── Busca Global ─────────────────────────────────────────────────────────
  const [buscaGlobal, setBuscaGlobal] = useState('');
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [buscaMobileAberta, setBuscaMobileAberta] = useState(false);
  const [buscaMobile, setBuscaMobile] = useState('');
  const [filtrosFinanceiroAberto, setFiltrosFinanceiroAberto] = useState(false); // Novo estado para filtros financeiros mobile
  const [pessoas, setPessoas] = useState([]);
  const [filtrosPessoasAberto, setFiltrosPessoasAberto] = useState(false);
  const [celulas, setCelulas] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [cargosDisponiveis, setCargosDisponiveis] = useState([]);
  const [atuacoesDisponiveis, setAtuacoesDisponiveis] = useState([]);
  const [relatoriosCelula, setRelatoriosCelula] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Estados de navegação e filtros restaurados
  const [membroSelecionadoId, setMembroSelecionadoId] = useState(null);
  const [reuniaoSelecionadaId, setReuniaoSelecionadaId] = useState(null);
  const [abaDashboard, setAbaDashboard] = useState('visao_geral');
  const [origemVerReuniao, setOrigemVerReuniao] = useState(null);

  const handleSetReuniaoSelecionadaId = (id) => {
    setReuniaoSelecionadaId(id);
    if (id === null && origemVerReuniao === 'dashboard') {
      setOrigemVerReuniao(null);
      setModuloAtual('dashboard');
      setAbaDashboard('celulas');
    }
  };

  const [alunoSelecionadoParaCadernetaId, setAlunoSelecionadoParaCadernetaId] = useState(null);
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [periodoConvertidos, setPeriodoConvertidos] = useState('mes');

  // Estado para controlar dropdowns no menu mobile
  const [mobileDropdownAberto, setMobileDropdownAberto] = useState(null);
  const toggleMobileDropdown = (mod) => setMobileDropdownAberto(prev => prev === mod ? null : mod);

  // Sincroniza o dropdown aberto com o módulo atual ao abrir o menu mobile
  useEffect(() => {
    if (menuAberto) setMobileDropdownAberto(moduloAtual);
  }, [menuAberto, moduloAtual]);

  const membroLogado = useMemo(() => {
    if (!usuarioLogado?.email || pessoas.length === 0) return null;
    return pessoas.find(p => p.email?.toLowerCase() === usuarioLogado.email.toLowerCase());
  }, [usuarioLogado, pessoas]);

  const [reunioesVistas, setReunioesVistas] = useState([]);
  const [isLiderMinisterio, setIsLiderMinisterio] = useState(false);

  useEffect(() => {
    async function verificarLiderMinisterio() {
      if (!membroLogado?.id) {
        setIsLiderMinisterio(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('ministerio_membros')
          .select('id')
          .eq('pessoa_id', membroLogado.id)
          .eq('lider', true)
          .limit(1);
        
        if (error) {
          console.warn('Erro ao verificar liderança ministerial:', error);
          setIsLiderMinisterio(false);
        } else {
          setIsLiderMinisterio(data && data.length > 0);
        }
      } catch (err) {
        console.error('Erro ao consultar liderança ministerial:', err);
        setIsLiderMinisterio(false);
      }
    }
    verificarLiderMinisterio();
  }, [membroLogado]);

  useEffect(() => {
    if (membroLogado) {
      const vistas = localStorage.getItem(`mib_reunioes_vistas_${membroLogado.id}`);
      if (vistas) {
        try {
          setReunioesVistas(JSON.parse(vistas));
        } catch (e) {
          setReunioesVistas([]);
        }
      } else {
        setReunioesVistas([]);
      }
    }
  }, [membroLogado]);

  const marcarReuniaoComoVista = useCallback((id) => {
    if (!membroLogado) return;
    setReunioesVistas((prev) => {
      const idStr = String(id);
      if (prev.includes(idStr)) return prev;
      const novo = [...prev, idStr];
      localStorage.setItem(`mib_reunioes_vistas_${membroLogado.id}`, JSON.stringify(novo));
      return novo;
    });
  }, [membroLogado]);

  const [notificacoes, setNotificacoes] = useState([]);
  const [carregandoNotificacoes, setCarregandoNotificacoes] = useState(false);
  const [notificacoesAberto, setNotificacoesAberto] = useState(false);
  const [notificacoesLidas, setNotificacoesLidas] = useState([]);

  useEffect(() => {
    if (membroLogado) {
      const salvas = localStorage.getItem(`mib_notificacoes_lidas_${membroLogado.id}`);
      if (salvas) {
        try {
          setNotificacoesLidas(JSON.parse(salvas));
        } catch (e) {
          setNotificacoesLidas([]);
        }
      } else {
        setNotificacoesLidas([]);
      }
    }
  }, [membroLogado]);

  const marcarNotificacaoComoLida = useCallback((id) => {
    if (!membroLogado) return;
    setNotificacoesLidas((prev) => {
      const idStr = String(id);
      if (prev.includes(idStr)) return prev;
      const nova = [...prev, idStr];
      localStorage.setItem(`mib_notificacoes_lidas_${membroLogado.id}`, JSON.stringify(nova));
      return nova;
    });
  }, [membroLogado]);

  const marcarTodasComoLidas = useCallback(() => {
    if (!membroLogado) return;
    const ids = notificacoes.map(n => String(n.id));
    setNotificacoesLidas((prev) => {
      const nova = [...new Set([...prev, ...ids])];
      localStorage.setItem(`mib_notificacoes_lidas_${membroLogado.id}`, JSON.stringify(nova));
      return nova;
    });
  }, [membroLogado, notificacoes]);

  const findNameInDadosInscricao = (dados) => {
    if (!dados) return 'Participante';
    for (const k of Object.keys(dados)) {
      const kLower = k.toLowerCase();
      if (kLower.includes('nome') || kLower.includes('completo')) {
        return dados[k];
      }
    }
    return 'Participante';
  };

  const carregarNotificacoes = useCallback(async () => {
    if (!membroLogado) return;
    setCarregandoNotificacoes(true);
    try {
      const limiteDias = new Date();
      limiteDias.setDate(limiteDias.getDate() - 3); // 3 dias atrás
      const limiteDiasStr = limiteDias.toISOString().split('T')[0];

      const lista = [];

      // 1. Aniversariantes do dia
      const hoje = new Date();
      const mesHoje = hoje.getMonth() + 1;
      const diaHoje = hoje.getDate();
      const hojeStr = hoje.toISOString().split('T')[0];

      pessoas.forEach(p => {
        if (p.data_nascimento && p.status !== 'inativo') {
          const parts = p.data_nascimento.split('-');
          if (parts.length === 3) {
            const mes = Number(parts[1]);
            const dia = Number(parts[2]);
            if (mes === mesHoje && dia === diaHoje) {
              lista.push({
                id: `aniv_${p.id}_${hojeStr}`,
                tipo: 'aniversario',
                titulo: `🎉 Hoje é aniversário de ${p.nome}!`,
                descricao: `Membro faz aniversário hoje. Envie os parabéns!`,
                dados: { idMembro: p.id },
                created_at: new Date().toISOString()
              });
            }
          }
        }
      });

      const isPastorOuAdmin = ['pastor', 'admin'].includes(membroLogado.permissao);

      if (isPastorOuAdmin) {
        // 2. Novos cadastros
        pessoas.forEach(p => {
          if (p.created_at && p.status !== 'inativo') {
            const created = new Date(p.created_at);
            if (created >= limiteDias) {
              lista.push({
                id: `cadastro_${p.id}`,
                tipo: 'novo_cadastro',
                titulo: `👤 Novo cadastro realizado`,
                descricao: `${p.nome} se cadastrou no sistema.`,
                dados: { idMembro: p.id },
                created_at: p.created_at
              });
            }
          }
        });

        // 3. Novas inscrições em eventos (Supabase query)
        try {
          const { data: inscricoesEventos, error: errInsc } = await supabase
            .from('agenda_inscricoes')
            .select('id, created_at, dados_inscricao, agenda_eventos(titulo)')
            .gte('created_at', limiteDias.toISOString())
            .order('created_at', { ascending: false });

          if (!errInsc && inscricoesEventos) {
            inscricoesEventos.forEach(i => {
              const nome = findNameInDadosInscricao(i.dados_inscricao);
              const eventTitle = i.agenda_eventos?.titulo || 'Evento';
              lista.push({
                id: `insc_evento_${i.id}`,
                tipo: 'inscricao_evento',
                titulo: `🎟️ Nova inscrição em evento`,
                descricao: `${nome} se inscreveu no evento "${eventTitle}".`,
                dados: { modulo: 'agenda', tab: 'eventos' },
                created_at: i.created_at
              });
            });
          }
        } catch (e) {
          console.warn('Erro ao carregar inscrições de eventos para notificações:', e);
        }

        // 4. Novas candidaturas em turmas / cursos (Supabase query)
        try {
          const { data: inscricoesCursos, error: errInscCur } = await supabase
            .from('inscricoes_publicas')
            .select('id, created_at, nome_candidato, status_analise, turmas(nome)')
            .eq('status_analise', 'pendente')
            .gte('created_at', limiteDias.toISOString())
            .order('created_at', { ascending: false });

          if (!errInscCur && inscricoesCursos) {
            inscricoesCursos.forEach(i => {
              const turmaNome = i.turmas?.nome || 'Turma';
              lista.push({
                id: `insc_curso_${i.id}`,
                tipo: 'inscricao_curso',
                titulo: `📚 Nova inscrição pendente de curso`,
                descricao: `${i.nome_candidato} se inscreveu para a turma "${turmaNome}".`,
                dados: { modulo: 'escolas', tab: 'resumo' },
                created_at: i.created_at
              });
            });
          }
        } catch (e) {
          console.warn('Erro ao carregar inscrições de cursos para notificações:', e);
        }
      }

      // 5. Escalas Pendentes para o Usuário Logado
      try {
        const { data: escalasUsuario, error: errEsc } = await supabase
          .from('escalas')
          .select('id, status, created_at, eventos_ministeriais(titulo, data_evento), ministerios(nome), ministerio_funcoes(nome)')
          .eq('pessoa_id', membroLogado.id)
          .eq('status', 'pendente');

        if (!errEsc && escalasUsuario) {
          escalasUsuario.forEach(esc => {
            const eventTitle = esc.eventos_ministeriais?.titulo || 'Evento';
            const ministerioNome = esc.ministerios?.nome || 'Ministério';
            const funcaoNome = esc.ministerio_funcoes?.nome || 'Função';
            const dataEvento = esc.eventos_ministeriais?.data_evento
              ? new Date(esc.eventos_ministeriais.data_evento).toLocaleDateString('pt-BR')
              : 'Sem data';

            lista.push({
              id: `escala_${esc.id}`,
              tipo: 'escala_pendente',
              titulo: `📅 Nova escala pendente!`,
              descricao: `Você foi escalado como ${funcaoNome} no evento "${eventTitle}" (${dataEvento}) para o ministério ${ministerioNome}.`,
              dados: { modulo: 'gestao', tab: 'escalas' },
              created_at: esc.created_at || new Date().toISOString()
            });
          });
        }
      } catch (e) {
        console.warn('Erro ao carregar escalas para notificações:', e);
      }

      // 6. Novas pessoas adicionadas à célula liderada pelo usuário
      const celulasLideradas = celulas.filter(c => String(c.lider_id) === String(membroLogado.id));
      if (celulasLideradas.length > 0) {
        const cellIds = celulasLideradas.map(c => String(c.id));
        pessoas.forEach(p => {
          if (p.celula_id && cellIds.includes(String(p.celula_id)) && p.created_at) {
            const created = new Date(p.created_at);
            if (created >= limiteDias) {
              lista.push({
                id: `celula_membro_${p.id}`,
                tipo: 'novo_membro_celula',
                titulo: `🏡 Novo membro na sua Célula`,
                descricao: `${p.nome} foi adicionado à célula "${celulasLideradas.find(c => String(c.id) === String(p.celula_id))?.nome || 'Célula'}".`,
                dados: { modulo: 'celulas', tab: 'lista' },
                created_at: p.created_at
              });
            }
          }
        });
      }

      // Sort notifications by date (newest first)
      lista.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setNotificacoes(lista);
    } catch (err) {
      console.warn('Erro ao carregar notificações:', err);
    } finally {
      setCarregandoNotificacoes(false);
    }
  }, [membroLogado, pessoas, celulas]);

  useEffect(() => {
    if (membroLogado) {
      carregarNotificacoes();
      const interval = setInterval(carregarNotificacoes, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [membroLogado, carregarNotificacoes]);

  const notificacoesAtivas = useMemo(() => {
    return notificacoes.filter(n => !notificacoesLidas.includes(String(n.id)));
  }, [notificacoes, notificacoesLidas]);

  // Indica se o membro logado possui alguma atuação/ministério vinculado
  // (usado para liberar o acesso a "Escalas Ministeriais" mesmo para membros comuns)
  const temVinculoEscala = useMemo(() => {
    if (!membroLogado) return false;
    const atuacoes = membroLogado.atuacoes || membroLogado.ministerios || [];
    return Array.isArray(atuacoes) ? atuacoes.length > 0 : Boolean(atuacoes);
  }, [membroLogado]);

  const perfilAtual = membroLogado?.permissao?.toLowerCase() || '';
  const isPerfilLiderCelula = ['lider-celula', 'lider', 'supervisor'].includes(perfilAtual);

  const celulasDoLider = useMemo(() => {
    if (!isPerfilLiderCelula || !membroLogado?.id) return [];
    return celulas.filter(c =>
      String(c.lider_id || '') === String(membroLogado.id) ||
      String(c.co_lider_id || '') === String(membroLogado.id)
    );
  }, [celulas, isPerfilLiderCelula, membroLogado?.id]);

  const idsCelulasDoLider = useMemo(
    () => new Set(celulasDoLider.map(c => String(c.id))),
    [celulasDoLider]
  );

  const pessoasVisiveis = useMemo(() => {
    if (!isPerfilLiderCelula) return pessoas;
    return pessoas.filter(p =>
      String(p.id) === String(membroLogado?.id) ||
      (p.celula_id && idsCelulasDoLider.has(String(p.celula_id)))
    );
  }, [pessoas, isPerfilLiderCelula, membroLogado?.id, idsCelulasDoLider]);

  const celulasVisiveis = useMemo(
    () => (isPerfilLiderCelula ? celulasDoLider : celulas),
    [isPerfilLiderCelula, celulasDoLider, celulas]
  );

  const relatoriosCelulaVisiveis = useMemo(() => {
    if (!isPerfilLiderCelula) return relatoriosCelula;
    return relatoriosCelula.filter(r => idsCelulasDoLider.has(String(r.celula_id)));
  }, [relatoriosCelula, isPerfilLiderCelula, idsCelulasDoLider]);

  /**
   * Verifica se o membro logado tem acesso a um módulo ou bloco específico.
   */
  const hasAccess = useCallback((modulo, bloco = null, acao = null) => {
    if (!membroLogado) return false;
    if (membroLogado.permissao === 'admin') return true;

    const json = membroLogado.permissoes_json || {};
    const temManual = Object.keys(json).length > 0;

    // Se possui permissão manual configurada, ela é ADITIVA (se conceder acesso retorna true, caso contrário segue o fallback)
    if (temManual) {
      if (modulo === 'Financeiro' && (json['Financeiro|Gestor financeiro'] === true || json['Financeiro|Gestor financeiro|ver'] === true)) {
        return true;
      }

      if (bloco) {
        if (acao) {
          const key = `${modulo}|${bloco}|${acao}`;
          if (json[key] === true) return true;
        } else {
          const key = `${modulo}|${bloco}`;
          if (json[key] === true || json[`${key}|ver`] === true) return true;
        }
      } else {
        if (Object.keys(json).some(k => k.startsWith(`${modulo}|`) && json[k] === true)) return true;
      }
    }

    // Segue as regras padrões de cargo/perfil (Aditivo/Fallback)
    const p = membroLogado.permissao?.toLowerCase() || '';

    if (p === 'membro') {
      if (modulo === 'Gestão Ministerial') {
        if (isLiderMinisterio) {
          return !bloco || ['Escalas', 'Dashboard'].includes(bloco);
        }
        if (!bloco) return true;
        return ['Escalas'].includes(bloco);
      }
      // Membros comuns nunca podem editar, excluir ou adicionar em outros módulos
      if (acao && (acao === 'editar' || acao === 'excluir' || acao === 'adicionar')) return false;

      if (modulo === 'Utilitários') {
        if (!bloco) return true;
        return ['Calculadora de Tributos', 'Teste de Temperamento', 'Pedido de Oração'].includes(bloco);
      }
      if (modulo === 'Pessoas') {
        if (!bloco) return true;
        return ['Aniversariantes'].includes(bloco);
      }
      return false;
    }

    if (p === 'pastor') {
      return true;
    }

    if (p === 'secretaria' && ['Pessoas', 'Células', 'Utilitários', 'Agenda'].includes(modulo)) {
      if (modulo === 'Utilitários' && bloco) {
        return !['Gerador de Carnê', 'Leitor de Carnê'].includes(bloco);
      }
      return true;
    }
    if ((p === 'tesouraria' || p === 'financeiro') && ['Financeiro', 'Pessoas', 'Utilitários', 'Agenda'].includes(modulo)) {
      if (modulo === 'Utilitários' && bloco) {
        return bloco !== 'Gerador de Carnê';
      }
      return true;
    }
    if (p === 'lider-celula' || p === 'lider' || p === 'supervisor') {
      if (modulo === 'Agenda') {
        if (!bloco) return true;
        return bloco === 'Mural de Avisos';
      }
      if (modulo === 'Pessoas') {
        if (acao === 'excluir') return false; // NUNCA excluir
        if (acao === 'editar' || acao === 'adicionar') return true; // VER E ATUALIZAR (INCLUIR PARTICIPANTE)
        return !bloco || ['Ver todos', 'Aniversariantes', 'Ficha do membro', 'Adicionar pessoa'].includes(bloco);
      }
      if (modulo === 'Células') {
        if (acao === 'excluir') return false; // NUNCA excluir célula
        if (acao === 'editar' || acao === 'adicionar') return true; // ATUALIZAR DADOS DA CÉLULA / SALVAR REUNIÃO
        return !bloco || ['Lista de células', 'Reuniões', 'Relatórios', 'Painel Geral'].includes(bloco);
      }
      if (modulo === 'Financeiro') return false; // RESTRIÇÃO TOTAL
      if (modulo === 'Utilitários') {
        if (!bloco) return true;
        return !['Relatório Semanal', 'Gerador de Carnê', 'Leitor de Carnê'].includes(bloco); // RESTRIÇÃO UTILITÁRIOS
      }
      if (modulo === 'Gestão Ministerial') {
        if (isLiderMinisterio) {
          return !bloco || ['Escalas', 'Dashboard'].includes(bloco); // PERMITIR VISUALIZAR/ATUALIZAR ESCALAS
        }
        if (!bloco) return true;
        return ['Escalas'].includes(bloco); // PERMITIR VER E CONFIRMAR PRÓPRIAS ESCALAS
      }
      return false;
    }

    return false;
  }, [membroLogado, isLiderMinisterio]);

  const indicadores = useMemo(() => {
    const ativas = pessoasVisiveis.filter(p => normalizarTexto(p.status) !== 'inativo');
    const total = ativas.length || 1;
    const homens = ativas.filter((p) => normalizarTexto(p.genero) === 'masculino').length;
    const mulheres = ativas.filter((p) => normalizarTexto(p.genero) === 'feminino').length;
    return {
      totalPessoas: ativas.length,
      homens, mulheres,
      percentualHomens: Math.round((homens / total) * 100),
      percentualMulheres: Math.round((mulheres / total) * 100),
      totalCelulas: celulasVisiveis.length,
    };
  }, [pessoasVisiveis, celulasVisiveis]);

  const pessoasFiltradas = useMemo(() => {
    return pessoasVisiveis.filter((p) => {
      if (normalizarTexto(p.status) === 'inativo') return false;

      // Aplica o filtro específico vindo dos relatórios (botão Ver Lista)
      if (filtros.relatorioCampo && filtros.relatorioValor) {
        if (valorCampoRelatorio(p, filtros.relatorioCampo, zonas) !== filtros.relatorioValor) return false;
      }

      const busca = normalizarTexto(filtros.busca);
      if (busca && !normalizarTexto(p.nome).includes(busca)) return false;
      if (filtros.genero && p.genero !== filtros.genero) return false;
      if (filtros.faixaEtaria && faixaDaIdade(p.data_nascimento) !== filtros.faixaEtaria) return false;
      if (filtros.zona && String(p.zona_id) !== String(filtros.zona)) return false;
      if (filtros.cargo && p.cargo !== filtros.cargo) return false;
      if (filtros.atuacao) {
        const roles = p.atuacao ? p.atuacao.split(',').map(s => s.trim().toLowerCase()) : [];
        if (!roles.includes(filtros.atuacao.toLowerCase())) return false;
      }
      return true;
    });
  }, [pessoasVisiveis, filtros]);

  const celulasFiltradas = useMemo(() => {
    return celulasVisiveis.filter((c) => {
      const busca = normalizarTexto(filtrosCelula.busca);
      if (busca && !normalizarTexto(c.nome).includes(busca)) return false;
      if (filtrosCelula.faixaEtaria && c.faixa_etaria !== filtrosCelula.faixaEtaria) return false;
      if (filtrosCelula.genero && c.genero !== filtrosCelula.genero) return false;
      if (filtrosCelula.diaSemana && c.dia_semana !== filtrosCelula.diaSemana) return false;
      if (filtrosCelula.horario && c.horario !== filtrosCelula.horario) return false;
      return true;
    });
  }, [celulasVisiveis, filtrosCelula]);

  const alterarFiltroCelula = (campo, valor) => setFiltrosCelula(prev => ({ ...prev, [campo]: valor }));

  const alterarFiltro = (campo, valor) => setFiltros(prev => ({ ...prev, [campo]: valor }));

  const submenusPessoas = useMemo(() => [
    ['todos', 'Ver todos'],
    ['adicionar', 'Adicionar pessoa'],
    ['link_publico', 'Link de Autocadastro'],
    ['inativos', 'Membros Inativos'],
    ['aniversariantes', 'Aniversariantes'],
    ['cargo', 'Cargos'],
    ['zona', 'Zonas'],
    ['atuacao', 'Atuações'],
    ['relatorios', 'Relatórios']
  ].filter(([id, label]) => hasAccess('Pessoas', label)), [hasAccess]);

  const submenusCelulas = useMemo(() => [
    ['painel', 'Painel Geral'],
    ['lista', 'Lista de células'],
    ['adicionar', 'Nova célula'],
    ['reunioes', 'Reuniões'],
    ['relatorios', 'Relatórios']
  ].filter(([id, label]) => hasAccess('Células', label)), [hasAccess]);

  const submenusFinanceiro = useMemo(() => [
    ['resumo', 'Resumo'],
    ['transacoes', 'Transações'],
    ['relatorios', 'Relatórios financeiros'],
    ['categorias', 'Categorias'],
    ['contas', 'Contas'],
    ['importar', 'Importar'],
    ['historico', 'Logs']
  ].filter(([id, label]) => hasAccess('Financeiro', label)), [hasAccess]);

  const submenusEscolas = useMemo(() => [
    ['resumo', 'Visão Geral'],
    ['cursos', 'Cursos'],
    ['turmas', 'Turmas'],
    ['disciplinas', 'Disciplinas'],
    ['professores', 'Professores'],
    ['alunos', 'Alunos'],
    ['aulas', 'Aulas'],
    ['avaliacoes', 'Avaliações'],
    ['ficha-aluno', 'Ficha do Aluno'], // Novo submenu para caderneta
    ['inscricoes', 'Inscrições Públicas'],
  ].filter(([id, label]) => hasAccess('Escolas', label)), [hasAccess]);

  const submenusGestao = useMemo(() => [
    ['dashboard', 'Dashboard'],
    ['equipes', 'Equipes'],
    ['escalas', 'Escalas'],
    ['historico', 'Histórico'],
    ['relatorios', 'Relatórios'],
    ['config', 'Configurações']
  ].filter(([id, label]) => hasAccess('Gestão Ministerial', label)), [hasAccess]);

  const submenusAgenda = useMemo(() => [
    ['calendario', 'Calendário'],
    ['eventos', 'Eventos'],
    ['mural', 'Mural de Avisos'],
  ].filter(([id, label]) => hasAccess('Agenda', label)), [hasAccess]);

  const submenusUtilitarios = useMemo(() => [
    ['resumo', 'Visão Geral'],
    ['escalas', 'Escalas Ministerial'],
    ['relatorio-semanal', 'Relatório Semanal'],
    ['visitante-recepcao', 'Ficha de Visitante'],
    ['calculadora', 'Calculadora de Tributos'],
    ['quiz', 'Teste de Temperamento'],
    ['carne-generator', 'Gerador de Carnê'], // New item
    ['leitor-carne', 'Leitor de Carnê'],
    ['pedido-oracao', 'Pedido de Oração'],
    ['mural-oracao', 'Mural de Orações']
  ].filter(([id, label]) => hasAccess('Utilitários', label)), [hasAccess]);

  const obterDados = useCallback(async () => {
    setCarregando(true);
    try {
      const { data: dadosPessoas, error: erroPessoas } = await supabase
        .from('pessoas')
        .select('*, celulas(nome)')
        .order('nome', { ascending: true });
      if (erroPessoas) console.warn('Erro ao carregar pessoas:', erroPessoas);
      if (dadosPessoas) {
        setPessoas(dadosPessoas.filter((p) => normalizarTexto(p.status) !== 'excluido'));
      }

      const { data: dadosCargos, error: erroCargos } = await supabase.from('cargos').select('*').order('nome');
      if (erroCargos) console.warn('Erro ao carregar cargos:', erroCargos);
      if (dadosCargos) setCargosDisponiveis(dadosCargos);

      const { data: dadosAtuacoes, error: erroAtuacoes } = await supabase.from('atuacoes').select('*').order('nome');
      if (erroAtuacoes) console.warn('Tabela "atuacoes" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosAtuacoes) setAtuacoesDisponiveis(dadosAtuacoes);

      const { data: dadosCelulas, error: erroCelulas } = await supabase.from('celulas').select('*').order('nome');
      if (erroCelulas) console.warn('Erro ao carregar células:', erroCelulas);
      if (dadosCelulas) setCelulas(dadosCelulas);

      const { data: dadosZonas, error: erroZonas } = await supabase.from('zonas_moradia').select('*').order('nome');
      if (erroZonas) console.warn('Tabela "zonas_moradia" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosZonas) setZonas(dadosZonas);

      const { data: dadosRelatorios, error: erroRelatorios } = await supabase
        .from('relatorios_celula')
        .select('*, celulas(nome), presencas_relatorio(count)')
        .order('data_reuniao', { ascending: false });
      if (erroRelatorios) console.warn('Tabela "relatorios_celula" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosRelatorios) setRelatoriosCelula(dadosRelatorios);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (usuarioLogado) {
      obterDados();
    }
  }, [usuarioLogado, obterDados]);

  // Garante que a visualização sempre volte ao topo ao mudar de módulo, submenu ou abrir detalhes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [
    moduloAtual,
    pessoasSubmenu,
    celulasSubmenu,
    financeiroSubmenu,
    escolasSubmenu,
    agendaSubmenu,
    utilitariosSubmenu,
    membroSelecionadoId,
    celulaSelecionadaId,
    alunoSelecionadoParaCadernetaId
  ]);

  // Sistema de Sessões e Heartbeats (Logs de tempo de permanência)
  useEffect(() => {
    if (!usuarioLogado || !membroLogado?.id) return;

    let activeSessaoId = sessionStorage.getItem('mibHeartbeatSessaoId');
    let intervalId = null;

    const iniciarSessao = async () => {
      try {
        if (activeSessaoId) return;

        // 1. Criar entrada na tabela sessoes_sistema
        const { data, error } = await supabase
          .from('sessoes_sistema')
          .insert([{
            usuario_id: membroLogado.id,
            usuario_email: membroLogado.email || usuarioLogado.email,
            usuario_nome: membroLogado.nome
          }])
          .select('id')
          .single();

        if (!error && data?.id) {
          activeSessaoId = data.id;
          sessionStorage.setItem('mibHeartbeatSessaoId', data.id);

          // 2. Registrar evento de LOGIN em logs_sistema
          await supabase.from('logs_sistema').insert([{
            usuario_id: membroLogado.id,
            usuario_email: membroLogado.email || usuarioLogado.email,
            usuario_nome: membroLogado.nome,
            acao: 'LOGIN',
            detalhes: { agent: navigator.userAgent, sessao_id: data.id }
          }]);
        }
      } catch (err) {
        console.warn('Erro ao inicializar sessão para log:', err);
      }
    };

    const runHeartbeat = async () => {
      if (!activeSessaoId) return;
      try {
        await supabase.rpc('incrementar_duracao_sessao', {
          sessao_uuid: activeSessaoId,
          incrementosegundos: 30
        });
      } catch (err) {
        // Fallback simples se RPC não estiver disponível (só atualiza timestamp)
        try {
          await supabase.from('sessoes_sistema').update({
            ultimo_heartbeat: new Date().toISOString()
          }).eq('id', activeSessaoId);
        } catch { /* ignora falha silenciosamente */ }
      }
    };

    iniciarSessao().then(() => {
      intervalId = setInterval(runHeartbeat, 30000);
    });

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [usuarioLogado, membroLogado]);

  async function handleSair() {
    try {
      const activeSessaoId = sessionStorage.getItem('mibHeartbeatSessaoId');
      if (membroLogado && activeSessaoId) {
        // Registrar LOGOUT em logs_sistema
        await supabase.from('logs_sistema').insert([{
          usuario_id: membroLogado.id,
          usuario_email: membroLogado.email || usuarioLogado.email,
          usuario_nome: membroLogado.nome,
          acao: 'LOGOUT',
          detalhes: { sessao_id: activeSessaoId }
        }]);
        sessionStorage.removeItem('mibHeartbeatSessaoId');
      }
    } catch (e) {
      console.warn('Erro ao registrar log de logout:', e);
    }

    try { await supabase.auth.signOut(); } catch { /* ignora erro de rede */ }
    localStorage.removeItem('mibChurchSessao');
    setUsuarioLogado(null);
    setModuloAtual('dashboard');
  }

  function navegar(modulo, submenu = null) {
    setModuloAtual(modulo);
    setMenuAberto(false);
    // Limpa estados de seleção ao navegar para garantir que submenus abram corretamente
    // Isso evita que a ficha de um membro impeça a abertura de outra tela do mesmo módulo
    setMembroSelecionadoId(null);
    setCelulaSelecionadaId(null);
    setReuniaoSelecionadaId(null);
    setOrigemVerReuniao(null);
    setTurmaSelecionadaId(null);
    setFiltroCursoTurmas('');

    if (submenu !== 'ficha-aluno') {
      setAlunoSelecionadoParaCadernetaId(null);
    }

    if (submenu) {
      if (modulo === 'pessoas') setPessoasSubmenu(submenu);
      if (modulo === 'celulas') setCelulasSubmenu(submenu);
      if (modulo === 'financeiro') setFinanceiroSubmenu(submenu);
      if (modulo === 'escolas') setEscolasSubmenu(submenu);
      if (modulo === 'gestao') setGestaoMinisterialSubmenu(submenu);
      if (modulo === 'agenda') setAgendaSubmenu(submenu);
      if (modulo === 'utilitarios') setUtilitariosSubmenu(submenu);
    }
  }

  function abrirPessoasFiltradas(novosFiltros) {
    setFiltros({ ...filtrosIniciais, ...novosFiltros });
    navegar('pessoas', 'todos');
  }

  function handleEntrar(usuario) {
    localStorage.setItem('mibChurchSessao', JSON.stringify(usuario));
    setUsuarioLogado(usuario);
  }

  useEffect(() => {
    const moduloParaPermissao = {
      pessoas: 'Pessoas',
      celulas: 'Células',
      financeiro: 'Financeiro',
      escolas: 'Escolas',
      gestao: 'Gestão Ministerial',
      agenda: 'Agenda',
      utilitarios: 'Utilitários',
      configuracoes: 'Configurações',
    };

    const moduloPermissao = moduloParaPermissao[moduloAtual];
    if (moduloPermissao && !hasAccess(moduloPermissao)) {
      navegar('dashboard');
      return;
    }

    if (moduloAtual === 'agenda' && agendaSubmenu === 'eventos' && !hasAccess('Agenda', 'Eventos')) {
      navegar('agenda', 'calendario');
    }

    if (moduloAtual === 'utilitarios' && utilitariosSubmenu === 'relatorio-semanal' && !hasAccess('Utilitários', 'Relatório Semanal')) {
      navegar('utilitarios', 'resumo');
    }
  }, [moduloAtual, agendaSubmenu, utilitariosSubmenu, hasAccess]);

  // Verifica se a URL é para o formulário público e renderiza sem autenticação
  if (window.location.pathname === '/cadastro-publico') {
    return <PublicRegistrationForm />;
  }

  if (window.location.pathname.startsWith('/inscricao-evento/')) {
    return <PublicEventRegistration />;
  }

  // Se não há usuário logado, exibe tela de login
  if (!usuarioLogado) {
    console.log('Renderizando TelaLogin - nenhum usuário logado');
    return <TelaLogin onEntrar={handleEntrar} />;
  }
  console.log('Renderizando Dashboard - usuário logado:', usuarioLogado.email);

  const getModuloTitle = (modulo) => {
    switch (modulo) {
      case 'dashboard': return 'Visão Geral';
      case 'pessoas': return 'Pessoas';
      case 'celulas': return 'Células';
      case 'financeiro': return 'Financeiro';
      case 'escolas': return 'Escolas';
      case 'gestao': return 'Gestor Ministerial';
      case 'agenda': return 'Agenda';
      case 'utilitarios': return 'Utilitários';
      case 'configuracoes': return 'Configurações';
      default: return '';
    }
  };

  const mostrarBotaoVoltarMobile =
    (moduloAtual === 'pessoas' && !!(filtros.cargo || filtros.zona || filtros.atuacao || filtros.relatorioCampo)) ||
    (moduloAtual === 'celulas' && !!celulaSelecionadaId) ||
    (moduloAtual === 'financeiro' && financeiroSubmenu !== 'resumo') ||
    (moduloAtual === 'escolas' && (escolasSubmenu !== 'resumo' || !!turmaSelecionadaId || !!filtroCursoTurmas || !!alunoSelecionadoParaCadernetaId)) ||
    (moduloAtual === 'utilitarios' && utilitariosSubmenu !== 'resumo');

  const handleVoltarMobile = () => {
    if (moduloAtual === 'pessoas') {
      if (filtros.cargo) {
        alterarFiltro('cargo', '');
        navegar('pessoas', 'cargo');
      } else if (filtros.zona) {
        alterarFiltro('zona', '');
        navegar('pessoas', 'zona');
      } else if (filtros.atuacao) {
        alterarFiltro('atuacao', '');
        navegar('pessoas', 'atuacao');
      } else if (filtros.relatorioCampo) {
        setFiltros(prev => ({ ...prev, relatorioCampo: '', relatorioValor: '' }));
        navegar('pessoas', 'relatorios');
      }
    } else if (moduloAtual === 'celulas') {
      if (reuniaoSelecionadaId) {
        handleSetReuniaoSelecionadaId(null);
      } else {
        setCelulaSelecionadaId(null);
      }
    } else if (moduloAtual === 'escolas') {
      if (escolasSubmenu === 'ficha-aluno') {
        setAlunoSelecionadoParaCadernetaId(null);
        navegar('escolas', 'turmas');
      } else if (turmaSelecionadaId) {
        setTurmaSelecionadaId(null);
      } else if (filtroCursoTurmas) {
        setFiltroCursoTurmas('');
        navegar('escolas', 'cursos');
      } else {
        navegar('escolas', 'resumo');
      }
    } else if (moduloAtual === 'financeiro') {
      navegar('financeiro', 'resumo');
    } else if (moduloAtual === 'utilitarios') {
      navegar('utilitarios', 'resumo');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-muted)] font-sans text-[var(--text-primary)] antialiased">
      {/* ── CABEÇALHO SUPERIOR PREMIUM — visível apenas em desktop (md+) ── */}
      <header className="hidden md:flex print:hidden fixed top-0 inset-x-0 z-50 h-14 bg-gradient-to-r from-[#0d1e52] via-[#14296b] to-[#0d1e52] border-b border-blue-900/40 items-center justify-between px-6 shadow-sm backdrop-blur-md gap-4">
        {/* Logo e Nome do Sistema */}
        <button type="button" onClick={() => navegar('dashboard')} className="flex items-center gap-3 transition hover:opacity-90 shrink-0">
          <img src="/logo-mib-mundau.png" alt="Logo" className="h-10 w-10 object-contain bg-white rounded-xl p-1.5 shadow-md shadow-blue-950/20 border border-blue-900/10" />
          <div className="text-left">
            <span className="font-extrabold text-white text-sm tracking-tight block">MIB Church</span>
            <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block -mt-1">Sistema de Gestão</span>
          </div>
        </button>

        {/* ── BUSCA GLOBAL ──────────────────────────────────────────────────── */}
        <BuscaGlobal
          pessoas={pessoasVisiveis}
          celulas={celulasVisiveis}
          buscaGlobal={buscaGlobal}
          setBuscaGlobal={setBuscaGlobal}
          buscaAberta={buscaAberta}
          setBuscaAberta={setBuscaAberta}
          onSelecionarPessoa={(id) => {
            setBuscaGlobal('');
            setBuscaAberta(false);
            setFiltros(filtrosIniciais);
            navegar('pessoas', 'todos');
            setMembroSelecionadoId(id);
          }}
          onSelecionarCelula={(id) => {
            setBuscaGlobal('');
            setBuscaAberta(false);
            navegar('celulas', 'lista');
            setCelulaSelecionadaId(id);
          }}
          normalizarTexto={normalizarTexto}
        />

        {/* Configurações e Perfil do Usuário */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Central de Notificações */}
          <button
            type="button"
            onClick={() => setNotificacoesAberto(true)}
            className="p-1.5 rounded-xl transition cursor-pointer flex items-center justify-center border border-transparent text-slate-400 hover:text-white hover:bg-slate-800 relative"
            title="Alertas e Notificações"
          >
            <Bell size={18} />
            {notificacoesAtivas.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white font-extrabold text-[9px] flex items-center justify-center shadow-md animate-pulse">
                {notificacoesAtivas.length}
              </span>
            )}
          </button>

          {hasAccess('Configurações') && (
            <button
              type="button"
              onClick={() => navegar('configuracoes')}
              className={`p-1.5 rounded-xl transition cursor-pointer flex items-center justify-center border ${moduloAtual === 'configuracoes'
                ? 'bg-blue-600/10 border-blue-500/20 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              title="Configurações do Sistema"
            >
              <Settings size={18} />
            </button>
          )}

          <div className="border-l border-slate-800 pl-4 h-8 flex items-center">
            <UserAvatarDropdown
              usuarioLogado={usuarioLogado}
              membroLogado={membroLogado}
              onSair={handleSair}
              onVerPerfil={() => { 
                if (membroLogado?.permissao === 'membro') {
                  setModuloAtual('dashboard');
                  setMembroSelecionadoId(membroLogado?.id);
                } else {
                  setModuloAtual('pessoas'); 
                  setPessoasSubmenu('todos'); 
                  setMembroSelecionadoId(membroLogado?.id); 
                }
              }}
            />
          </div>
        </div>
      </header>


      {/* ── SIDEBAR LATERAL DESKTOP — ícones + nomes retraída ── */}
      <aside className="hidden md:flex print:hidden fixed left-0 top-14 bottom-0 z-40 w-16 flex-col bg-slate-200 border-r border-slate-300 overflow-visible">
        <nav className="flex-1 flex flex-col items-center py-2 gap-0.5 px-1">
          {hasAccess('Visão Geral') && (
            <SideNavBtn ativo={moduloAtual === 'dashboard'} onClick={() => navegar('dashboard')} icon={MenuIcons.dashboard} label="Visão Geral" />
          )}
          {hasAccess('Pessoas') && (
            <SideNavBtn
              ativo={moduloAtual === 'pessoas'}
              onClick={() => { setFiltros(filtrosIniciais); navegar('pessoas', hasAccess('Pessoas', 'Ver todos') ? 'todos' : 'aniversariantes'); }}
              icon={MenuIcons.pessoas}
              label="Pessoas"
              submenu={submenusPessoas}
              submenuAtivo={pessoasSubmenu}
              onSubmenuClick={(id) => { if (id === 'todos') setFiltros(filtrosIniciais); navegar('pessoas', id); }}
              moduloAtual={moduloAtual}
              moduloKey="pessoas"
            />
          )}
          {hasAccess('Células') && (
            <SideNavBtn
              ativo={moduloAtual === 'celulas'}
              onClick={() => navegar('celulas', hasAccess('Células', 'Painel Geral') ? 'painel' : 'lista')}
              icon={MenuIcons.celulas}
              label="Células"
              submenu={submenusCelulas}
              submenuAtivo={celulasSubmenu}
              onSubmenuClick={(id) => navegar('celulas', id)}
              moduloAtual={moduloAtual}
              moduloKey="celulas"
            />
          )}
          {hasAccess('Financeiro') && (
            <SideNavBtn
              ativo={moduloAtual === 'financeiro'}
              onClick={() => navegar('financeiro', 'resumo')}
              icon={MenuIcons.financeiro}
              label="Financeiro"
              submenu={submenusFinanceiro}
              submenuAtivo={financeiroSubmenu}
              onSubmenuClick={(id) => navegar('financeiro', id)}
              moduloAtual={moduloAtual}
              moduloKey="financeiro"
            />
          )}
          {hasAccess('Gestão Ministerial') && (
            <SideNavBtn
              ativo={moduloAtual === 'gestao'}
              onClick={() => navegar('gestao', 'escalas')}
              icon={MenuIcons.gestaoMinisterial}
              label="Ministerial"
              submenu={submenusGestao}
              submenuAtivo={gestaoMinisterialSubmenu}
              onSubmenuClick={(id) => navegar('gestao', id)}
              moduloAtual={moduloAtual}
              moduloKey="gestao"
            />
          )}
          {hasAccess('Escolas') && (
            <SideNavBtn
              ativo={moduloAtual === 'escolas'}
              onClick={() => navegar('escolas', 'resumo')}
              icon={MenuIcons.escolas}
              label="Escolas"
              submenu={submenusEscolas}
              submenuAtivo={escolasSubmenu}
              onSubmenuClick={(id) => navegar('escolas', id)}
              moduloAtual={moduloAtual}
              moduloKey="escolas"
            />
          )}
          {hasAccess('Agenda') && (
            <SideNavBtn
              ativo={moduloAtual === 'agenda'}
              onClick={() => navegar('agenda', 'calendario')}
              icon={MenuIcons.agenda}
              label="Agenda"
              submenu={submenusAgenda}
              submenuAtivo={agendaSubmenu}
              onSubmenuClick={(id) => navegar('agenda', id)}
              moduloAtual={moduloAtual}
              moduloKey="agenda"
            />
          )}
          {hasAccess('Utilitários') && (
            <SideNavBtn
              ativo={moduloAtual === 'utilitarios'}
              onClick={() => navegar('utilitarios', 'resumo')}
              icon={MenuIcons.utilitarios}
              label="Utilitários"
              submenu={submenusUtilitarios}
              submenuAtivo={utilitariosSubmenu}
              onSubmenuClick={(id) => navegar('utilitarios', id)}
              moduloAtual={moduloAtual}
              moduloKey="utilitarios"
            />
          )}
        </nav>
      </aside>


      {/* ── SIDEBAR LATERAL — visível apenas no mobile ── */}
      {/* Mobile Header */}
      <div className="fixed top-0 inset-x-0 z-40 h-14 bg-[#1e3a8a] text-white flex items-center px-4 md:hidden print:hidden shadow-md"> {/* <--- Altere bg-[#hex] aqui para o Mobile */}
        {mostrarBotaoVoltarMobile ? (
          <button
            type="button"
            onClick={handleVoltarMobile}
            className="w-12 h-12 flex items-center justify-start active:scale-95 transition-transform text-white/90 hover:text-white cursor-pointer"
            aria-label="Voltar"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        ) : (
          <div className="w-12" />
        )}
        <span className="flex-1 text-center text-sm font-bold uppercase tracking-wide">
          {getModuloTitle(moduloAtual)}
        </span>
        <div className="flex items-center gap-1.5">
          {/* 🔔 Sino de Notificações no Mobile */}
          <button
            onClick={() => setNotificacoesAberto(true)}
            className="p-1.5 active:scale-95 transition-transform relative text-white cursor-pointer"
            title="Alertas e Notificações"
          >
            <Bell size={20} />
            {notificacoesAtivas.length > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white font-extrabold text-[8px] flex items-center justify-center shadow-md animate-pulse">
                {notificacoesAtivas.length}
              </span>
            )}
          </button>

          {/* Botão de Filtros exclusivo para o módulo Pessoas em mobile */}
          {moduloAtual === 'pessoas' && !membroSelecionadoId && (
            <button
              type="button"
              onClick={() => setFiltrosPessoasAberto(true)}
              className="p-1.5 active:scale-95 transition-transform text-white cursor-pointer"
              aria-label="Abrir filtros"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
            </button>
          )}

          {/* Botão de Filtros exclusivo para Transações Financeiras em mobile */}
          {moduloAtual === 'financeiro' && financeiroSubmenu === 'transacoes' && (
            <button
              type="button"
              onClick={() => setFiltrosFinanceiroAberto(true)}
              className="p-1.5 active:scale-95 transition-transform text-white cursor-pointer"
              aria-label="Abrir filtros"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
            </button>
          )}

          {/* Avatar clicável no mobile */}
          <button
            onClick={() => { setModuloAtual('pessoas'); setPessoasSubmenu('todos'); setMembroSelecionadoId(membroLogado?.id); }}
            className="p-1 active:scale-95 transition-transform"
            title="Meu Perfil"
          >
            <UserAvatarImg usuarioLogado={usuarioLogado} membroLogado={membroLogado} tamanho="w-8 h-8" />
          </button>
        </div>
      </div>
      {/* 🔍 Overlay de Busca Mobile */}
      {buscaMobileAberta && (
        <BuscaMobileOverlay
          pessoas={pessoasVisiveis}
          celulas={celulasVisiveis}
          busca={buscaMobile}
          setBusca={setBuscaMobile}
          onFechar={() => setBuscaMobileAberta(false)}
          onSelecionarPessoa={(id) => {
            setBuscaMobileAberta(false);
            setBuscaMobile('');
            setFiltros(filtrosIniciais);
            navegar('pessoas', 'todos');
            setMembroSelecionadoId(id);
          }}
          onSelecionarCelula={(id) => {
            setBuscaMobileAberta(false);
            setBuscaMobile('');
            navegar('celulas', 'lista');
            setCelulaSelecionadaId(id);
          }}
          normalizarTexto={normalizarTexto}
        />
      )}

      {/* Original mobile menu toggle button removed */}
      {menuAberto && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden print:hidden"
        />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white flex flex-col border-r border-white/5 transition-transform duration-200 md:hidden print:hidden ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}> {/* <--- Altere o gradiente aqui */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo-mib-mundau.png" alt="Logo" className="h-12 w-20 object-contain bg-white rounded-lg p-1" />
            <div>
              <h1 className="font-bold text-white text-base tracking-tight">MIB Church</h1>
              <p className="text-[10px] font-medium text-teal-200/70 uppercase tracking-wider">Gestão da Igreja</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMenuAberto(false)}
            className="p-2 -mr-2 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar menu"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 py-0 space-y-0 overflow-y-auto">
          {hasAccess('Visão Geral') && ( /* Removido o div wrapper */
            <MenuButton ativo={moduloAtual === 'dashboard'} onClick={() => navegar('dashboard')} icon={MenuIcons.dashboard}>
              Visão Geral
            </MenuButton>
          )}

          {hasAccess('Pessoas') && (
            <div>
              <MenuButton
                ativo={moduloAtual === 'pessoas'}
                onClick={() => { setFiltros(filtrosIniciais); navegar('pessoas', hasAccess('Pessoas', 'Ver todos') ? 'todos' : 'aniversariantes'); }}
                icon={MenuIcons.pessoas}
                hasSubmenu={submenusPessoas.length > 0}
                expanded={mobileDropdownAberto === 'pessoas'}
                onToggle={() => toggleMobileDropdown('pessoas')}
              >
                Pessoas
              </MenuButton>
              {mobileDropdownAberto === 'pessoas' && (
                <div className="bg-white/5 py-2 px-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {submenusPessoas.map(([id, label]) => (
                    <button key={id} type="button" onClick={() => { if (id === 'todos') setFiltros(filtrosIniciais); navegar('pessoas', id); }}
                      className={`block w-full text-left px-3 py-2 text-sm font-bold transition flex items-center gap-2 ${moduloAtual === 'pessoas' && pessoasSubmenu === id ? 'bg-[#1e3a8a] text-white' : 'text-slate-300 hover:text-white hover:bg-[#1e3a8a]/30'}`}>
                      {MenuIcons[submenuIconKey.pessoas[id]]} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {hasAccess('Células') && (
            <div>
              <MenuButton
                ativo={moduloAtual === 'celulas'}
                onClick={() => navegar('celulas', hasAccess('Células', 'Painel Geral') ? 'painel' : 'lista')}
                icon={MenuIcons.celulas}
                hasSubmenu={submenusCelulas.length > 0}
                expanded={mobileDropdownAberto === 'celulas'}
                onToggle={() => toggleMobileDropdown('celulas')}
              >
                Células
              </MenuButton>
              {mobileDropdownAberto === 'celulas' && (
                <div className="bg-white/5 py-2 px-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {submenusCelulas.map(([id, label]) => (
                    <button key={id} type="button" onClick={() => navegar('celulas', id)}
                      className={`block w-full text-left px-3 py-2 text-sm font-bold transition flex items-center gap-2 ${moduloAtual === 'celulas' && celulasSubmenu === id ? 'bg-[#1e3a8a] text-white' : 'text-slate-300 hover:text-white hover:bg-[#1e3a8a]/30'}`}>
                      {MenuIcons[submenuIconKey.celulas[id]]} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {hasAccess('Financeiro') && (
            <div>
              <MenuButton
                ativo={moduloAtual === 'financeiro'}
                onClick={() => navegar('financeiro', 'resumo')}
                icon={MenuIcons.financeiro}
                hasSubmenu={submenusFinanceiro.length > 0}
                expanded={mobileDropdownAberto === 'financeiro'}
                onToggle={() => toggleMobileDropdown('financeiro')}
              >
                Financeiro
              </MenuButton>
              {mobileDropdownAberto === 'financeiro' && (
                <div className="bg-white/5 py-2 px-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {submenusFinanceiro.map(([id, label]) => (
                    <button key={id} type="button" onClick={() => navegar('financeiro', id)}
                      className={`block w-full text-left px-3 py-2 text-sm font-bold transition flex items-center gap-2 ${moduloAtual === 'financeiro' && financeiroSubmenu === id ? 'bg-[#1e3a8a] text-white' : 'text-slate-300 hover:text-white hover:bg-[#1e3a8a]/30'}`}>
                      {MenuIcons[submenuIconKey.financeiro[id]]} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {hasAccess('Gestão Ministerial') && (
            <div>
              <MenuButton
                ativo={moduloAtual === 'gestao'}
                onClick={() => navegar('gestao', 'escalas')}
                icon={MenuIcons.gestaoMinisterial}
                hasSubmenu={submenusGestao.length > 0}
                expanded={mobileDropdownAberto === 'gestao'}
                onToggle={() => toggleMobileDropdown('gestao')}
              >
                Gestor Ministerial
              </MenuButton>
              {mobileDropdownAberto === 'gestao' && (
                <div className="bg-white/5 py-2 px-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {submenusGestao.map(([id, label]) => (
                    <button key={id} type="button" onClick={() => navegar('gestao', id)}
                      className={`block w-full text-left px-3 py-2 text-sm font-bold transition flex items-center gap-2 ${moduloAtual === 'gestao' && gestaoMinisterialSubmenu === id ? 'bg-[#1e3a8a] text-white' : 'text-slate-300 hover:text-white hover:bg-[#1e3a8a]/30'}`}>
                      {MenuIcons[submenuIconKey.gestao[id]]} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {hasAccess('Escolas') && (
            <div>
              <MenuButton
                ativo={moduloAtual === 'escolas'}
                onClick={() => navegar('escolas', 'resumo')}
                icon={MenuIcons.escolas}
                hasSubmenu={submenusEscolas.length > 0}
                expanded={mobileDropdownAberto === 'escolas'}
                onToggle={() => toggleMobileDropdown('escolas')}
              >
                Escolas
              </MenuButton>
              {mobileDropdownAberto === 'escolas' && (
                <div className="bg-white/5 py-2 px-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {submenusEscolas.map(([id, label]) => (
                    <button key={id} type="button" onClick={() => navegar('escolas', id)}
                      className={`block w-full text-left px-3 py-2 text-sm font-bold transition flex items-center gap-2 ${moduloAtual === 'escolas' && escolasSubmenu === id ? 'bg-[#1e3a8a] text-white' : 'text-slate-300 hover:text-white hover:bg-[#1e3a8a]/30'}`}>
                      {MenuIcons[submenuIconKey.escolas[id]]} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {hasAccess('Agenda') && (
            <div>
              <MenuButton
                ativo={moduloAtual === 'agenda'}
                onClick={() => navegar('agenda', 'calendario')}
                icon={MenuIcons.agenda}
                hasSubmenu={submenusAgenda.length > 0}
                expanded={mobileDropdownAberto === 'agenda'}
                onToggle={() => toggleMobileDropdown('agenda')}
              >
                Agenda
              </MenuButton>
              {mobileDropdownAberto === 'agenda' && (
                <div className="bg-white/5 py-2 px-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {submenusAgenda.map(([id, label]) => (
                    <button key={id} type="button" onClick={() => navegar('agenda', id)}
                      className={`block w-full text-left px-3 py-2 text-sm font-bold transition flex items-center gap-2 ${moduloAtual === 'agenda' && agendaSubmenu === id ? 'bg-[#1e3a8a] text-white' : 'text-slate-300 hover:text-white hover:bg-[#1e3a8a]/30'}`}>
                      {MenuIcons[submenuIconKey.agenda[id]]} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {hasAccess('Utilitários') && (
            <div>
              <MenuButton
                ativo={moduloAtual === 'utilitarios'}
                onClick={() => navegar('utilitarios', 'resumo')}
                icon={MenuIcons.utilitarios}
                hasSubmenu={submenusUtilitarios.length > 0}
                expanded={mobileDropdownAberto === 'utilitarios'}
                onToggle={() => toggleMobileDropdown('utilitarios')}
              >
                Utilitários
              </MenuButton>
              {mobileDropdownAberto === 'utilitarios' && (
                <div className="bg-white/5 py-2 px-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {submenusUtilitarios.map(([id, label]) => (
                    <button key={id} type="button" onClick={() => navegar('utilitarios', id)}
                      className={`block w-full text-left px-3 py-2 text-sm font-bold transition flex items-center gap-2 ${moduloAtual === 'utilitarios' && utilitariosSubmenu === id ? 'bg-[#1e3a8a] text-white' : 'text-slate-300 hover:text-white hover:bg-[#1e3a8a]/30'}`}>
                      {MenuIcons[submenuIconKey.utilitarios[id]]} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <UserAvatarImg usuarioLogado={usuarioLogado} membroLogado={membroLogado} tamanho="w-9 h-9" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{membroLogado?.nome || usuarioLogado?.nome || usuarioLogado?.user_metadata?.nome || usuarioLogado?.email?.split('@')[0] || 'Usuário'}</p>
              <p className="text-[10px] text-slate-400 truncate">{usuarioLogado?.email || 'Sem e-mail'}</p>
            </div>
          </div>
          <button type="button" onClick={handleSair} className="w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition">
            Sair
          </button>
        </div>
      </aside>

      {/* ── BOTTOM NAVIGATION — visível apenas no mobile ── */}
      <nav className="fixed bottom-0 inset-x-0 z-40 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-4 md:hidden print:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {/* Botão Menu (Canto Esquerdo) */}
        <button onClick={() => setMenuAberto(true)} className="flex flex-col items-center gap-1 text-slate-400 active:scale-95 transition-transform">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-tight">Menu</span>
        </button>

        {/* Botão Início (Casinha no meio) */}
        <button onClick={() => navegar('dashboard')} className={`flex flex-col items-center gap-1 transition-colors ${moduloAtual === 'dashboard' ? 'text-[#1e3a8a]' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 0 0 1.061 1.06l8.69-8.69Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.25 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-tight">Início</span>
        </button>

        {/* Botão Busca */}
        {membroLogado?.permissao !== 'membro' && (
        <button
          onClick={() => { setBuscaMobile(''); setBuscaMobileAberta(true); }}
          className="flex flex-col items-center gap-1 text-slate-400 relative active:scale-95 transition-transform cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-tight">Busca</span>
        </button>
        )}

        {/* Botão Configurações */}
        {hasAccess('Configurações') && (
        <button onClick={() => navegar('configuracoes')} className={`flex flex-col items-center gap-1 transition-colors ${moduloAtual === 'configuracoes' ? 'text-[#1e3a8a]' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.11-.414.03L6.463 5.01a1.875 1.875 0 0 0-2.652 0l-.825.825a1.875 1.875 0 0 0 0 2.652l.828.828c.08.08.084.248-.03.414a7.446 7.446 0 0 0-.57.986c-.088.182-.228.277-.348.297L1.817 11.078a1.875 1.875 0 0 0-1.567 1.85v1.144c0 .917.663 1.699 1.567 1.85l1.051.176c.12.02.26.115.348.297.252.522.583 1.008.986 1.45a.447.447 0 0 1 .03.415l-.828.828a1.875 1.875 0 0 0 0 2.652l.825.825a1.875 1.875 0 0 0 2.652 0l.828-.828c.08-.08.248-.084.415-.03.442.403.928.734 1.45.986.182.088.277.228.297.348l.176 1.051a1.875 1.875 0 0 0 1.85 1.567h1.144a1.875 1.875 0 0 0 1.85-1.567l.176-1.051c.02-.12.115-.26.297-.348a7.493 7.493 0 0 0 .986-.57c.166-.115.334-.11.414-.03l.828.828a1.875 1.875 0 0 0 2.652 0l.825-.825a1.875 1.875 0 0 0 0-2.652l-.828-.828c-.08-.08-.084-.248.03-.414a7.446 7.446 0 0 0 .57-.986c.088-.182.228-.277.348-.297l1.051-.176a1.875 1.875 0 0 0 1.567-1.85v-1.144a1.875 1.875 0 0 0-1.567-1.85l-1.051-.176c-.12-.02-.26-.115-.348-.297a7.446 7.446 0 0 0-.57-.986.447.447 0 0 1-.03-.414l.828-.828a1.875 1.875 0 0 0 0-2.652l-.825-.825a1.875 1.875 0 0 0-2.652 0l-.828.828c-.08.08-.248.084-.414.03a7.493 7.493 0 0 0-1.45-.986c-.182-.088-.277-.228-.297-.348l-.176-1.051a1.875 1.875 0 0 0-1.85-1.567h-1.144ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-tight">Ajustes</span>
        </button>
        )}
      </nav>

      {/* ── CONTEÚDO PRINCIPAL — offset do header + sidebar ── */}
      <main className="min-w-0 px-2 pb-20 pt-14 sm:px-6 sm:pb-6 md:pl-20 md:pr-6 md:pt-16 lg:pl-20 lg:pr-10 lg:pt-16 lg:pb-8 flex-1 overflow-y-auto">
        {/* Nova HomePage como a tela principal do dashboard */}
        {moduloAtual === 'dashboard' && (
          <>
            {['lider', 'lider-celula', 'supervisor'].includes(membroLogado?.permissao?.toLowerCase()) ? (
              membroSelecionadoId ? (
                <DetalhesMembro
                  pessoaId={membroSelecionadoId}
                  onFechar={() => setMembroSelecionadoId(null)}
                  listaPessoas={pessoasVisiveis}
                  onDadosAtualizados={obterDados}
                  cargosLista={cargosDisponiveis}
                  atuacoesLista={atuacoesDisponiveis}
                  membroLogado={membroLogado}
                  hasAccess={hasAccess}
                />
              ) : (
                <DashboardLider
                  membroLogado={membroLogado}
                  pessoas={pessoasVisiveis}
                  celulas={celulasVisiveis}
                  relatoriosCelula={relatoriosCelulaVisiveis}
                  reunioesVistas={reunioesVistas}
                  onNavigate={navegar}
                  isLiderMinisterio={isLiderMinisterio}
                  obterDados={obterDados}
                  onVerMembro={(id) => { setModuloAtual('pessoas'); setPessoasSubmenu('todos'); setMembroSelecionadoId(id); }}
                  onVerPerfil={() => setMembroSelecionadoId(membroLogado.id)}
                />
              )
            ) : membroLogado?.permissao === 'membro' ? (
              membroSelecionadoId ? (
                <DetalhesMembro
                  pessoaId={membroSelecionadoId}
                  onFechar={() => setMembroSelecionadoId(null)}
                  listaPessoas={pessoasVisiveis}
                  onDadosAtualizados={obterDados}
                  cargosLista={cargosDisponiveis}
                  atuacoesLista={atuacoesDisponiveis}
                  membroLogado={membroLogado}
                  hasAccess={hasAccess}
                />
              ) : (
                <DashboardMembro 
                  membroLogado={membroLogado} 
                  onNavigate={navegar} 
                  onVerPerfil={() => setMembroSelecionadoId(membroLogado.id)} 
                />
              )
            ) : (
              <>
                {/* Mobile: Exibe os cartões de navegação rápida */}
                <div className="md:hidden">
                  <HomePage
                onNavigate={navegar}
                hasAccess={hasAccess}
                membroLogado={membroLogado}
                pessoas={pessoasVisiveis}
                celulas={celulasVisiveis}
                zonas={zonas}
                relatoriosCelula={relatoriosCelulaVisiveis}
                reunioesVistas={reunioesVistas}
                onVerMembro={(id) => { setModuloAtual('pessoas'); setPessoasSubmenu('todos'); setMembroSelecionadoId(id); }}
                onVerReuniao={(id) => {
                  marcarReuniaoComoVista(id);
                  setOrigemVerReuniao('dashboard');
                  setModuloAtual('celulas');
                  setCelulasSubmenu('reunioes');
                  handleSetReuniaoSelecionadaId(id);
                }}
                abaDashboard={abaDashboard}
                setAbaDashboard={setAbaDashboard}
              />
            </div>

            {/* Desktop: Exibe os indicadores estatísticos (Dashboard de outrora) */}
            <div className="hidden md:block">
              <OverviewDashboard
                pessoas={pessoasVisiveis}
                celulas={celulasVisiveis}
                zonas={zonas}
                relatoriosCelula={relatoriosCelulaVisiveis}
                indicadores={indicadores}
                carregando={carregando}
                periodoConvertidos={periodoConvertidos}
                setPeriodoConvertidos={setPeriodoConvertidos}
                reunioesVistas={reunioesVistas}
                onVerMembro={(id) => { setModuloAtual('pessoas'); setPessoasSubmenu('todos'); setMembroSelecionadoId(id); }}
                onVerReuniao={(id) => {
                  marcarReuniaoComoVista(id);
                  setOrigemVerReuniao('dashboard');
                  setModuloAtual('celulas');
                  setCelulasSubmenu('reunioes');
                  handleSetReuniaoSelecionadaId(id);
                }}
                membroLogado={membroLogado}
                usuarioLogado={usuarioLogado}
                hasAccess={hasAccess}
                onNavigate={navegar}
                />
              </div>
            </>
            )}
          </>
        )}

        {moduloAtual === 'pessoas' && (
          <PessoasModulo
            submenu={pessoasSubmenu}
            pessoas={pessoasVisiveis}
            pessoasFiltradas={pessoasFiltradas}
            filtros={filtros}
            alterarFiltro={alterarFiltro}
            limparFiltros={() => setFiltros(filtrosIniciais)}
            zonas={zonas}
            cargosDisponiveis={cargosDisponiveis}
            atuacoesDisponiveis={atuacoesDisponiveis}
            escolaridadesDisponiveis={escolaridadesDisponiveis}
            carregando={carregando}
            membroSelecionadoId={membroSelecionadoId}
            setMembroSelecionadoId={setMembroSelecionadoId}
            setSubmenu={setPessoasSubmenu}
            obterDados={obterDados}
            onNavigate={(sub) => navegar('pessoas', sub)}
            abrirPessoasFiltradas={abrirPessoasFiltradas}
            membroLogado={membroLogado}
            hasAccess={hasAccess}
            filtrosMobileAberto={filtrosPessoasAberto}
            setFiltrosMobileAberto={setFiltrosPessoasAberto}
          />
        )}

        {moduloAtual === 'celulas' && (
          <CelulasModulo
            submenu={celulasSubmenu}
            celulas={celulasVisiveis}
            celulasFiltradas={celulasFiltradas}
            filtrosCelula={filtrosCelula} // Passa o estado de filtros
            alterarFiltroCelula={alterarFiltroCelula} // Passa a função para alterar filtros
            limparFiltros={() => setFiltrosCelula(filtrosCelulaIniciais)} // Passa a função para limpar filtros
            pessoas={pessoasVisiveis}
            zonas={zonas}
            relatoriosCelula={relatoriosCelulaVisiveis}
            celulaSelecionadaId={celulaSelecionadaId} // Passa o ID da célula selecionada
            setCelulaSelecionadaId={setCelulaSelecionadaId} // Passa a função para definir a célula selecionada
            reuniaoSelecionadaId={reuniaoSelecionadaId}
            setReuniaoSelecionadaId={handleSetReuniaoSelecionadaId}
            obterDados={obterDados} // Passa a função para recarregar dados
            onNavigate={(sub) => navegar('celulas', sub)}
            membroLogado={membroLogado}
            hasAccess={hasAccess}
            onMarcarReuniaoComoVista={marcarReuniaoComoVista}
          />
        )}

        {moduloAtual === 'financeiro' && (
          <ModuloFinanceiro
            meses={meses}
            submenu={financeiroSubmenu}
            usuarioLogado={usuarioLogado}
            membroLogado={membroLogado}
            hasAccess={hasAccess}
            filtrosMobileAberto={filtrosFinanceiroAberto}
            setFiltrosMobileAberto={setFiltrosFinanceiroAberto}
            onNavigate={(sub) => setFinanceiroSubmenu(sub)}
          />
        )}

        {moduloAtual === 'gestao' && (
          <GestaoMinisterial
            submenu={gestaoMinisterialSubmenu}
            onNavigate={(sub) => navegar('gestao', sub)}
            membroLogado={membroLogado}
            usuarioLogado={usuarioLogado}
            hasAccess={hasAccess}
            pessoas={pessoasVisiveis}
            isLiderMinisterio={isLiderMinisterio}
          />
        )}

        {moduloAtual === 'escolas' && escolasSubmenu !== 'ficha-aluno' && (
          <EscolasModulo
            submenu={escolasSubmenu}
            onNavigate={(sub) => navegar('escolas', sub)}
            pessoas={pessoasVisiveis}
            alunoSelecionadoParaCadernetaId={alunoSelecionadoParaCadernetaId} // Passa o ID do aluno
            setAlunoSelecionadoParaCadernetaId={setAlunoSelecionadoParaCadernetaId} // Passa o setter
            membroLogado={membroLogado}
            hasAccess={hasAccess}
            turmaSelecionadaId={turmaSelecionadaId}
            setTurmaSelecionadaId={setTurmaSelecionadaId}
            filtroCursoTurmas={filtroCursoTurmas}
            setFiltroCursoTurmas={setFiltroCursoTurmas}
          />
        )}

        {moduloAtual === 'escolas' && escolasSubmenu === 'ficha-aluno' && alunoSelecionadoParaCadernetaId && (
          <div className="escolas-root">
            <style>{`
              .escolas-root, .escolas-root * { 
                font-family: 'Segoe UI', system-ui, -apple-system, sans-serif !important; 
                -webkit-font-smoothing: antialiased;
              }
              /* Ajusta o peso das abas da ficha para Segoe Black */
              .escolas-root .tab-btn { font-weight: 900 !important; }
            `}</style>
            <DetalhesMembro
              pessoaId={alunoSelecionadoParaCadernetaId}
              onFechar={() => navegar('escolas', 'turmas')} // Volta para a lista de turmas ou alunos
              listaPessoas={pessoasVisiveis}
              onDadosAtualizados={obterDados}
              isStudentCadernetaView={true} // Indica que é a visão de caderneta do aluno
              membroLogado={membroLogado}
              hasAccess={hasAccess}
            />
          </div>
        )}

        {moduloAtual === 'agenda' && (
          <AgendaModulo
            submenu={agendaSubmenu}
            onNavigate={(sub) => navegar('agenda', sub)}
            membroLogado={membroLogado}
            hasAccess={hasAccess}
            pessoas={pessoasVisiveis}
          />
        )}

        {moduloAtual === 'utilitarios' && (
          <ModuloUtilitarios
            submenu={utilitariosSubmenu}
            onNavigate={(sub) => navegar('utilitarios', sub)}
            usuarioLogado={usuarioLogado}
            membroLogado={membroLogado}
            hasAccess={hasAccess}
            temVinculoEscala={temVinculoEscala}
          />
        )}

        {moduloAtual === 'configuracoes' && <TelaConfiguracoes membroLogado={membroLogado} onFechar={() => navegar('dashboard')} />}
        {confirmDialog && (
          <ConfirmModal
            titulo={confirmDialog.titulo}
            mensagem={confirmDialog.mensagem}
            onConfirm={() => {
              confirmDialog.resolve(true);
              setConfirmDialog(null);
            }}
            onCancel={() => {
              confirmDialog.resolve(false);
              setConfirmDialog(null);
            }}
          />
        )}

        {notificacoesAberto && (
          <ModalWrapper
            titulo="Central de Notificações"
            onFechar={() => setNotificacoesAberto(false)}
          >
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {notificacoesAtivas.length === 0
                    ? 'Nenhum alerta pendente'
                    : `${notificacoesAtivas.length} alerta(s) pendente(s)`}
                </span>
                {notificacoesAtivas.length > 0 && (
                  <button
                    type="button"
                    onClick={marcarTodasComoLidas}
                    className="text-xs font-extrabold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </div>
              <div className="p-4 overflow-y-auto space-y-3 flex-1 max-h-[60vh]">
                {notificacoesAtivas.length === 0 ? (
                  <div className="text-center py-12 px-4 space-y-3 animate-fade-in">
                    <span className="text-4xl block">🔔</span>
                    <h4 className="font-bold text-slate-700 text-sm">Tudo em dia por aqui!</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Você não tem novas notificações no momento.
                    </p>
                  </div>
                ) : (
                  notificacoesAtivas.map((n) => {
                    let icon = '🔔';
                    let badgeColor = 'bg-blue-50 border-blue-100 text-blue-700';
                    if (n.tipo === 'aniversario') {
                      icon = '🎉';
                      badgeColor = 'bg-pink-50 border-pink-100 text-pink-700';
                    } else if (n.tipo === 'novo_cadastro') {
                      icon = '👤';
                      badgeColor = 'bg-emerald-50 border-emerald-100 text-emerald-700';
                    } else if (n.tipo === 'inscricao_evento') {
                      icon = '🎟️';
                      badgeColor = 'bg-purple-50 border-purple-100 text-purple-700';
                    } else if (n.tipo === 'inscricao_curso') {
                      icon = '📚';
                      badgeColor = 'bg-amber-50 border-amber-100 text-amber-700';
                    } else if (n.tipo === 'escala_pendente') {
                      icon = '📅';
                      badgeColor = 'bg-indigo-50 border-indigo-100 text-indigo-700';
                    } else if (n.tipo === 'novo_membro_celula') {
                      icon = '🏡';
                      badgeColor = 'bg-teal-50 border-teal-100 text-teal-700';
                    }

                    const handleNotifClick = () => {
                      marcarNotificacaoComoLida(n.id);
                      setNotificacoesAberto(false);
                      if (n.tipo === 'aniversario' || n.tipo === 'novo_cadastro') {
                        setModuloAtual('pessoas');
                        setPessoasSubmenu('todos');
                        setMembroSelecionadoId(n.dados.idMembro);
                      } else if (n.tipo === 'inscricao_evento') {
                        setModuloAtual('agenda');
                        setAgendaSubmenu('eventos');
                      } else if (n.tipo === 'inscricao_curso') {
                        setModuloAtual('escolas');
                        setEscolasSubmenu('resumo');
                      } else if (n.tipo === 'escala_pendente') {
                        setModuloAtual('gestao');
                        setGestaoMinisterialSubmenu('escalas');
                      } else if (n.tipo === 'novo_membro_celula') {
                        setModuloAtual('celulas');
                        setCelulasSubmenu('lista');
                      }
                    };

                    return (
                      <div
                        key={n.id}
                        className="flex gap-3 p-3 rounded-xl border border-slate-100 bg-white shadow-2xs hover:bg-slate-50 transition active:scale-[0.99] group cursor-pointer relative animate-fade-in"
                        onClick={handleNotifClick}
                      >
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg shrink-0 ${badgeColor}`}>
                          {icon}
                        </div>
                        <div className="flex-1 min-w-0 pr-6">
                          <h5 className="font-bold text-slate-800 text-xs truncate leading-snug group-hover:text-blue-700 transition">
                            {n.titulo}
                          </h5>
                          <p className="text-slate-500 text-[11px] font-medium leading-relaxed mt-0.5 whitespace-pre-wrap">
                            {n.descricao}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            marcarNotificacaoComoLida(n.id);
                          }}
                          className="absolute right-3 top-3 w-5 h-5 flex items-center justify-center rounded-full bg-slate-50 border text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition text-[9px] cursor-pointer"
                          title="Dispensar"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </ModalWrapper>
        )}
      </main>
    </div>
  );
}

/* ── Avatar e Dropdown do usuário logado ── */

function UserAvatarImg({ usuarioLogado, membroLogado, tamanho = 'w-8 h-8' }) {
  const email = usuarioLogado?.email || '';
  const meta = usuarioLogado?.user_metadata || {};
  // Tenta obter o nome de várias fontes, caindo no prefixo do email antes de um fallback genérico
  const nome = membroLogado?.nome || usuarioLogado?.nome || meta.nome || meta.full_name || email.split('@')[0] || '?';
  const inicial = nome.charAt(0).toUpperCase();
  // Busca a URL da foto em campos comuns do metadado do Supabase
  const fotoUrl = membroLogado?.foto_url || usuarioLogado?.foto_url || meta.foto_url || meta.avatar_url || null;

  if (fotoUrl) {
    return (
      <img
        src={fotoUrl}
        alt={nome}
        className={`${tamanho} rounded-full object-cover ring-2 ring-white/20 shrink-0`}
      />
    );
  }

  // Gera cor determinística baseada no email
  const hash = email.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const cores = [
    ['bg-[#202046]', 'text-white'],
    ['bg-violet-600', 'text-white'],
    ['bg-amber-500', 'text-white'],
    ['bg-rose-500', 'text-white'],
    ['bg-emerald-600', 'text-white'],
    ['bg-sky-600', 'text-white'],
  ];
  const [bg, fg] = cores[hash % cores.length];

  return (
    <div className={`${tamanho} ${bg} rounded-full flex items-center justify-center shrink-0 ring-2 ring-white/20`}>
      <span className={`text-xs font-bold ${fg}`}>{inicial}</span>
    </div>
  );
}

function UserAvatarDropdown({ usuarioLogado, membroLogado, onSair, onVerPerfil }) {
  const [aberto, setAberto] = useState(false);
  const meta = usuarioLogado?.user_metadata || {};

  const email = usuarioLogado?.email || '';
  // Prioriza o nome real para exibição principal
  const nome = membroLogado?.nome || usuarioLogado?.nome || meta.nome || meta.full_name || email.split('@')[0] || 'Usuário';
  const perfilNome = meta.permissao || usuarioLogado?.perfil?.nome || 'Membro';
  const perfilDescricao = usuarioLogado?.perfil?.descricao || '';

  return (
    <div className="relative" onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)}>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="flex items-center gap-2 rounded-xl p-1 hover:bg-white/10 transition duration-150 group"
        aria-label="Menu do usuário"
      >
        <UserAvatarImg usuarioLogado={usuarioLogado} membroLogado={membroLogado} tamanho="w-8 h-8" />
        <svg
          className={`w-3 h-3 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 ${aberto ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {aberto && (
        <div className="absolute right-0 top-full w-72 bg-[#1e3a8a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          {/* Cabeçalho do dropdown */}
          <div className="p-4 border-b border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex items-center gap-3">
              <UserAvatarImg usuarioLogado={usuarioLogado} membroLogado={membroLogado} tamanho="w-12 h-12" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight truncate">{nome}</p>
                <p className="text-[11px] text-slate-300 truncate mt-0.5">{email}</p>
                <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-[10px] font-semibold text-blue-200 uppercase tracking-wider">
                  {perfilNome}
                </span>
              </div>
            </div>
            {perfilDescricao && (
              <p className="mt-3 text-[10px] text-slate-500 leading-relaxed border-t border-slate-700/40 pt-2.5">
                {perfilDescricao}
              </p>
            )}
          </div>

          <div className="p-2 space-y-1">
            {/* Link para o Perfil */}
            <button
              type="button"
              onClick={() => { setAberto(false); onVerPerfil(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-blue-100 hover:bg-white/10 text-xs font-semibold transition duration-150 group"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Meu Perfil
            </button>

            {/* Ação de sair */}
            <button
              type="button"
              onClick={() => { setAberto(false); onSair(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-xs font-semibold transition duration-150 group"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sair da conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Componentes da topbar ── */
function TopNavBtn({ ativo, onClick, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${ativo ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      {children}
    </button>
  );
}

function TopNavDropdown({ label, ativo, icon, children }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)}>
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${ativo ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
      >
        {icon && <span className="opacity-80">{icon}</span>}{label}
      </button>
      {aberto && (
        <div className="absolute left-0 top-full w-52 bg-[#1e3a8a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1" onClick={() => setAberto(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ ativo, onClick, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3 py-2 text-xs font-semibold transition cursor-pointer flex items-center gap-2.5 ${ativo ? 'bg-[#2563eb] text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
    >
      {icon && <span className={`shrink-0 ${ativo ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`}>{icon}</span>}
      {children}
    </button>
  );
}

/* ── Sidebar item: ícone + nome pequeno + flyout de submenu ao hover ── */
function SideNavBtn({ ativo, onClick, icon, label, submenu, submenuAtivo, onSubmenuClick, moduloAtual, moduloKey }) {
  const temSubmenu = submenu && submenu.length > 0;
  const [hovered, setHovered] = React.useState(false);
  const [abreParaCima, setAbreParaCima] = React.useState(false);
  const containerRef = React.useRef(null);

  function handleMouseEnter() {
    if (temSubmenu && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const alturaEstimada = (submenu.length * 36) + 48; // ~36px/item + header
      const espacoAbaixo = window.innerHeight - rect.bottom;
      setAbreParaCima(espacoAbaixo < alturaEstimada);
    }
    setHovered(true);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={onClick}
        className={`w-full flex flex-col items-center gap-1 px-1 py-2.5 rounded-xl transition-all
          ${ativo
            ? 'bg-slate-400/30 text-slate-900'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-300/60'
          }`}
      >
        <span className="leading-none">{icon}</span>
        <span className="text-[7px] font-normal uppercase tracking-tight leading-tight text-center w-full truncate px-0.5">{label}</span>
      </button>

      {/* Flyout de submenu — abre para cima ou para baixo conforme espaço disponível */}
      {temSubmenu && hovered && (
        <div className={`absolute left-full z-50 pl-1 ${abreParaCima ? 'bottom-0' : 'top-0'}`}>
          <div className="w-48 bg-slate-200 border border-slate-300 rounded-xl shadow-2xl overflow-hidden py-1">
            <p className="px-3 pt-2 pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            {submenu.map(([id, lbl]) => (
              <button
                key={id}
                type="button"
                onClick={() => onSubmenuClick(id)}
                className={`w-full text-left px-3 py-2 text-xs font-semibold transition cursor-pointer flex items-center gap-2
                  ${moduloAtual === moduloKey && submenuAtivo === id
                    ? 'bg-[#2563eb] text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/60'
                  }`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


function MenuButton({ ativo, onClick, contador, icon, children, hasSubmenu, expanded, onToggle }) {
  return (
    <div className={`group flex flex-col w-full transition-all duration-200 ${expanded ? 'bg-white/5' : ''}`}>
      <div className={`w-full flex items-center justify-between px-6 py-4 text-xl font-bold transition-all cursor-pointer ${ // Removida a borda inferior
        ativo ? 'bg-[#1e3a8a] text-white' : 'text-slate-200 hover:bg-[#1e3a8a]/30 hover:text-white'
        }`}
      >
        <button type="button" onClick={onClick} className="flex flex-1 items-center gap-4 text-left outline-none">
          {icon && <span className={`shrink-0 [&_svg]:w-6 [&_svg]:h-6 ${ativo ? 'opacity-100' : 'opacity-60'}`}>{icon}</span>}
          <span className="truncate tracking-tight">{children}</span>
        </button>
        {hasSubmenu && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className={`p-2 ml-1 transition-all duration-300 outline-none ${expanded ? 'rotate-180' : ''} ${ativo ? 'text-white/70' : 'text-slate-500 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ── Busca Global ──────────────────────────────────────────────────────────────
function BuscaGlobal({ pessoas, celulas, buscaGlobal, setBuscaGlobal, buscaAberta, setBuscaAberta, onSelecionarPessoa, onSelecionarCelula, normalizarTexto }) {
  const inputRef = React.useRef(null);
  const wrapperRef = React.useRef(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setBuscaAberta(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setBuscaAberta]);

  // Resultados calculados
  const resultados = useMemo(() => {
    const q = normalizarTexto(buscaGlobal.trim());
    if (q.length < 2) return { pessoas: [], celulas: [] };

    const rPessoas = pessoas
      .filter(p => normalizarTexto(p.status) !== 'inativo' && normalizarTexto(p.nome).includes(q))
      .slice(0, 6);

    const rCelulas = celulas
      .filter(c => normalizarTexto(c.nome).includes(q))
      .slice(0, 4);

    return { pessoas: rPessoas, celulas: rCelulas };
  }, [buscaGlobal, pessoas, celulas, normalizarTexto]);

  const temResultados = resultados.pessoas.length > 0 || resultados.celulas.length > 0;
  const semResultados = buscaGlobal.trim().length >= 2 && !temResultados;

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setBuscaAberta(false);
      setBuscaGlobal('');
      inputRef.current?.blur();
    }
    if (e.key === 'Enter' && resultados.pessoas.length > 0) {
      onSelecionarPessoa(resultados.pessoas[0].id);
    }
  };

  return (
    <div ref={wrapperRef} className="flex-1 max-w-md relative">
      {/* Campo */}
      <div className="relative">
        {/* ícone lupa moderno */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="text"
          value={buscaGlobal}
          onChange={e => { setBuscaGlobal(e.target.value); setBuscaAberta(true); }}
          onFocus={() => setBuscaAberta(true)}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar pessoas, células..."
          className="w-full pl-9 pr-8 py-2 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder-slate-400 outline-none focus:bg-white/15 focus:border-white/30 focus:ring-0 transition"
        />

        {/* X limpar */}
        {buscaGlobal && (
          <button
            type="button"
            onClick={() => { setBuscaGlobal(''); setBuscaAberta(false); inputRef.current?.focus(); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {buscaAberta && (buscaGlobal.trim().length >= 2) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2 duration-150">

          {semResultados && (
            <div className="px-4 py-6 text-center">
              <p className="text-sm font-bold text-slate-500">Nenhum resultado para</p>
              <p className="text-xs text-slate-400 mt-0.5">"{buscaGlobal}"</p>
            </div>
          )}

          {/* Pessoas */}
          {resultados.pessoas.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pessoas</span>
                <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-full">{resultados.pessoas.length}</span>
              </div>
              {resultados.pessoas.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelecionarPessoa(p.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition text-left group cursor-pointer"
                >
                  {/* avatar inicial */}
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black shrink-0 uppercase">
                    {p.nome?.charAt(0) || '?'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800 truncate">{p.nome}</p>
                    {(p.cargo || p.celulas?.nome) && (
                      <p className="text-[11px] text-slate-400 truncate">
                        {[p.cargo, p.celulas?.nome].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-500 shrink-0 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Células */}
          {resultados.celulas.length > 0 && (
            <div className={resultados.pessoas.length > 0 ? 'border-t border-slate-100' : ''}>
              <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Células</span>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{resultados.celulas.length}</span>
              </div>
              {resultados.celulas.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelecionarCelula(c.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition text-left group cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0">
                    🏠
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800 truncate">{c.nome}</p>
                    {c.dia_semana && (
                      <p className="text-[11px] text-slate-400">{c.dia_semana}{c.horario ? ` · ${c.horario}` : ''}</p>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-500 shrink-0 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* dica teclado */}
          {temResultados && (
            <div className="px-4 py-2.5 border-t border-slate-50 flex items-center gap-3">
              <span className="text-[10px] text-slate-300 font-medium">
                <kbd className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-mono">↵</kbd> seleciona · <kbd className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-mono">Esc</kbd> fecha
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Busca Mobile — Overlay full-screen ──────────────────────────────────────
function BuscaMobileOverlay({ pessoas, celulas, busca, setBusca, onFechar, onSelecionarPessoa, onSelecionarCelula, normalizarTexto }) {
  const inputRef = React.useRef(null);

  // autofocus ao abrir
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  // fechar com Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onFechar(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onFechar]);

  const resultados = useMemo(() => {
    const q = normalizarTexto(busca.trim());
    if (q.length < 2) return { pessoas: [], celulas: [] };
    return {
      pessoas: pessoas.filter(p => normalizarTexto(p.status) !== 'inativo' && normalizarTexto(p.nome).includes(q)).slice(0, 8),
      celulas: celulas.filter(c => normalizarTexto(c.nome).includes(q)).slice(0, 5),
    };
  }, [busca, pessoas, celulas, normalizarTexto]);

  const temResultados = resultados.pessoas.length > 0 || resultados.celulas.length > 0;
  const semResultados = busca.trim().length >= 2 && !temResultados;

  return (
    <div className="md:hidden fixed inset-0 z-[300] bg-[#1e3a8a] flex flex-col animate-in slide-in-from-top-2 duration-200">

      {/* barra de busca */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-white/10 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white/50 shrink-0">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Pesquisar pessoas, células..."
          className="flex-1 bg-transparent text-white placeholder-white/40 text-base outline-none"
        />
        <button
          type="button"
          onClick={onFechar}
          className="text-white/70 hover:text-white text-sm font-bold px-1 py-1 shrink-0 cursor-pointer transition"
        >
          Cancelar
        </button>
      </div>

      {/* resultados */}
      <div className="flex-1 overflow-y-auto bg-white">

        {/* estado inicial — dica */}
        {busca.trim().length < 2 && (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <span className="text-4xl mb-4">🔍</span>
            <p className="text-sm font-bold text-slate-500">Digite para pesquisar</p>
            <p className="text-xs text-slate-400 mt-1">Busque por nome de pessoas ou células</p>
          </div>
        )}

        {/* sem resultados */}
        {semResultados && (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <span className="text-4xl mb-4">😕</span>
            <p className="text-sm font-bold text-slate-500">Nenhum resultado</p>
            <p className="text-xs text-slate-400 mt-1">Nada encontrado para "{busca}"</p>
          </div>
        )}

        {/* Pessoas */}
        {resultados.pessoas.length > 0 && (
          <div>
            <div className="px-4 pt-4 pb-2 flex items-center gap-2 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pessoas</span>
              <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-full">{resultados.pessoas.length}</span>
            </div>
            {resultados.pessoas.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelecionarPessoa(p.id)}
                className="w-full flex items-center gap-4 px-4 py-3.5 border-b border-slate-50 active:bg-slate-50 transition text-left cursor-pointer"
              >
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-base font-black shrink-0 uppercase">
                  {p.nome?.charAt(0) || '?'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800 truncate">{p.nome}</p>
                  {(p.cargo || p.celulas?.nome) && (
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {[p.cargo, p.celulas?.nome].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* Células */}
        {resultados.celulas.length > 0 && (
          <div className={resultados.pessoas.length > 0 ? 'mt-2' : ''}>
            <div className="px-4 pt-4 pb-2 flex items-center gap-2 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Células</span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{resultados.celulas.length}</span>
            </div>
            {resultados.celulas.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelecionarCelula(c.id)}
                className="w-full flex items-center gap-4 px-4 py-3.5 border-b border-slate-50 active:bg-slate-50 transition text-left cursor-pointer"
              >
                <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shrink-0">
                  🏠
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800 truncate">{c.nome}</p>
                  {c.dia_semana && (
                    <p className="text-xs text-slate-400 mt-0.5">{c.dia_semana}{c.horario ? ` · ${c.horario}` : ''}</p>
                  )}
                </div>
                <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
