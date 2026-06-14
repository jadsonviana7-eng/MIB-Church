import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import TelaConfiguracoes from './TelaConfiguracoes';
import TelaLogin from './TelaLogin';
import OverviewDashboard from './OverviewDashboard'; // Renomeado de Dashboard
import CelulasModulo from './CelulasModulo';
import PessoasModulo from './PessoasModulo';
import ModuloFinanceiro from './ModuloFinanceiro';
import ModuloUtilitarios from './ModuloUtilitarios';
import EscolasModulo from './EscolasModulo';
import AgendaModulo from './AgendaModulo';
import PublicEventRegistration from './PublicEventRegistration';
import DetalhesMembro from './DetalhesMembro';
import HomePage from './HomePage'; // Novo componente HomePage
import PublicRegistrationForm from './PublicRegistrationForm'; // Importar o novo componente
import { MenuIcons, submenuIconKey } from './icons'; // Importa MenuIcons e submenuIconKey do novo arquivo
import { normalizarTexto, faixaDaIdade, meses, valorCampoRelatorio } from './churchUtils';

const filtrosIniciais = {
  busca: '', genero: '', estadoCivil: '', faixaEtaria: '', zona: '', cargo: '', 
  atuacao: '', batizado: '', relatorioCampo: '', relatorioValor: ''
};


export default function App() {
  // Filtros para Células
  const filtrosCelulaIniciais = {
    busca: '', faixaEtaria: '', genero: '', diaSemana: '', horario: '',
  };

  const [filtrosCelula, setFiltrosCelula] = useState(filtrosCelulaIniciais);
  const [celulaSelecionadaId, setCelulaSelecionadaId] = useState(null);
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
  const [celulasSubmenu, setCelulasSubmenu] = useState('lista');
  const [financeiroSubmenu, setFinanceiroSubmenu] = useState('resumo');
  const [escolasSubmenu, setEscolasSubmenu] = useState('resumo'); // Novo estado para o submenu de Escolas
  const [agendaSubmenu, setAgendaSubmenu] = useState('calendario');
  const [utilitariosSubmenu, setUtilitariosSubmenu] = useState('resumo');
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

  /**
   * Verifica se o membro logado tem acesso a um módulo ou bloco específico.
   */
  const hasAccess = useCallback((modulo, bloco = null) => {
    if (!membroLogado) return false;
    if (membroLogado.permissao === 'admin') return true;

    // 1. Prioridade: Permissões Manuais (JSON do banco)
    const json = membroLogado.permissoes_json || {};
    if (bloco) {
      const key = `${modulo}|${bloco}`;
      if (json[key] === true || json[`${key}|ver`] === true) return true;
    } else {
      const hasAnyBlock = Object.keys(json).some(k => k.startsWith(`${modulo}|`) && json[k] === true);
      if (hasAnyBlock) return true;
    }

    // 2. Permissões Padrão por Perfil
    const p = membroLogado.permissao?.toLowerCase() || '';

    if (p === 'membro') {
      if (modulo === 'Agenda') return true;
      if (modulo === 'Utilitários') {
        if (!bloco) return true;
        return !['Relatório Semanal', 'Mural de Orações'].includes(bloco);
      } else if (bloco === 'Gerador de Carnê') return false; // Membros não acessam gerador de carnê
      if (modulo === 'Pessoas') {
        if (!bloco) return true;
        // Membros podem ver a listagem e aniversariantes (o RLS do banco filtrará os dados)
        return ['Ver todos', 'Aniversariantes'].includes(bloco);
      }
      if (modulo === 'Células') {
        if (!bloco) return true;
        return ['Lista de células'].includes(bloco);
      }
      return false; 
    }

    if (p === 'pastor') {
      return true; // Pastor visualiza todos os módulos e submenus, incluindo Gerador de Carnê
    }
    
    if (p === 'secretaria' && ['Pessoas', 'Células', 'Utilitários', 'Agenda'].includes(modulo)) return true;
    if ((p === 'tesouraria' || p === 'financeiro') && ['Financeiro', 'Pessoas', 'Utilitários', 'Agenda'].includes(modulo)) return true;
    if (p === 'lider-celula' || p === 'supervisor') {
      if (modulo === 'Agenda') return true;
      if (modulo === 'Pessoas') {
        return !bloco || ['Ver todos', 'Aniversariantes'].includes(bloco);
      }
      if (modulo === 'Células') {
        return !bloco || ['Lista de células', 'Reuniões'].includes(bloco);
      }
      if (modulo === 'Utilitários') {
        return !bloco || bloco !== 'Relatório Semanal';
      }
      return false;
    }

    return false;
  }, [membroLogado]);

  const indicadores = useMemo(() => {
    const ativas = pessoas.filter(p => normalizarTexto(p.status) !== 'inativo');
    const total = ativas.length || 1;
    const homens = ativas.filter((p) => normalizarTexto(p.genero) === 'masculino').length;
    const mulheres = ativas.filter((p) => normalizarTexto(p.genero) === 'feminino').length;
    return {
      totalPessoas: ativas.length,
      homens, mulheres,
      percentualHomens: Math.round((homens / total) * 100),
      percentualMulheres: Math.round((mulheres / total) * 100),
      totalCelulas: celulas.length,
    };
  }, [pessoas, celulas]);

  const pessoasFiltradas = useMemo(() => {
    return pessoas.filter((p) => {
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
      if (filtros.atuacao && p.atuacao !== filtros.atuacao) return false;
      return true;
    });
  }, [pessoas, filtros]);

  const celulasFiltradas = useMemo(() => {
    return celulas.filter((c) => {
      const busca = normalizarTexto(filtrosCelula.busca);
      if (busca && !normalizarTexto(c.nome).includes(busca)) return false;
      if (filtrosCelula.faixaEtaria && c.faixa_etaria !== filtrosCelula.faixaEtaria) return false;
      if (filtrosCelula.genero && c.genero !== filtrosCelula.genero) return false;
      if (filtrosCelula.diaSemana && c.dia_semana !== filtrosCelula.diaSemana) return false;
      if (filtrosCelula.horario && c.horario !== filtrosCelula.horario) return false;
      return true;
    });
  }, [celulas, filtrosCelula]);

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
    ['lista', 'Lista de células'], 
    ['adicionar', 'Nova célula'], 
    ['reunioes', 'Reuniões'], 
    ['relatorios', 'Relatórios']
  ].filter(([id, label]) => hasAccess('Células', label)), [hasAccess]);

  const submenusFinanceiro = useMemo(() => [
    ['resumo', 'Resumo'], 
    ['transacoes', 'Transações'], 
    ['relatorios', 'Relatórios financeiros'], 
    ['historico', 'Histórico'], 
    ['categorias', 'Categorias'], 
    ['contas', 'Contas/Caixas'],
    ['importar', 'Importar']
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

  const submenusAgenda = useMemo(() => [
    ['calendario', 'Calendário'],
    ['eventos', 'Eventos'],
  ].filter(([id, label]) => hasAccess('Agenda', label)), [hasAccess]);

  const submenusUtilitarios = useMemo(() => [
    ['resumo', 'Visão Geral'],
    ['escalas', 'Escalas Ministerial'], 
    ['relatorio-semanal', 'Relatório Semanal'],
    ['calculadora', 'Calculadora de Tributos'],
    ['quiz', 'Teste de Temperamento'], 
    ['carne-generator', 'Gerador de Carnê'], // New item
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
    if (!usuarioLogado) return undefined;
    const carregamentoInicial = window.setTimeout(() => obterDados(), 0);
    return () => window.clearTimeout(carregamentoInicial);
  }, [usuarioLogado, obterDados]);

  async function handleSair() {
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
    
    if (submenu !== 'ficha-aluno') {
      setAlunoSelecionadoParaCadernetaId(null);
    }

    if (submenu) {
      if (modulo === 'pessoas') setPessoasSubmenu(submenu);
      if (modulo === 'celulas') setCelulasSubmenu(submenu);
      if (modulo === 'financeiro') setFinanceiroSubmenu(submenu);
      if (modulo === 'escolas') setEscolasSubmenu(submenu);
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
      case 'agenda': return 'Agenda';
      case 'utilitarios': return 'Utilitários';
      case 'configuracoes': return 'Configurações';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-muted)] font-sans text-[var(--text-primary)] antialiased">
      {/* ── TOPBAR FIXA — visível apenas em desktop (md+) ── */}
      <header className="hidden md:flex print:hidden fixed top-0 inset-x-0 z-50 h-14 bg-[#1e3a8a] border-b border-white/10 items-center px-4 gap-1 shadow-md"> {/* <--- Altere bg-[#hex] aqui para o Desktop */}
        {/* Logo */}
        <button type="button" onClick={() => navegar('dashboard')} className="flex items-center gap-2.5 mr-4 shrink-0">
          <img src="/logo-mib-mundau.png" alt="Logo" className="h-8 w-14 object-contain bg-white rounded-md p-0.5" />
          <span className="font-bold text-white text-sm tracking-tight hidden lg:block">MIB Church</span>
        </button>

        {/* Nav items */}
        <nav className="flex items-center gap-1 flex-1">
          {/* Dashboard */}
          {hasAccess('Visão Geral') && (
          <TopNavBtn ativo={moduloAtual === 'dashboard'} onClick={() => navegar('dashboard')} icon={MenuIcons.dashboard}>
            Visão Geral
            <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{indicadores.totalPessoas}</span>
          </TopNavBtn>
          )}

          {/* Pessoas com dropdown (Ajuste as cores dos itens internos se necessário) */}
          {hasAccess('Pessoas') && (
          <TopNavDropdown
            icon={MenuIcons.pessoas}
            label={<>Pessoas <span className="ml-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{pessoas.length}</span></>}
            ativo={moduloAtual === 'pessoas'}
          >
            {submenusPessoas.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'pessoas' && pessoasSubmenu === id} onClick={() => navegar('pessoas', id)} icon={MenuIcons[submenuIconKey.pessoas[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Células com dropdown */}
          {hasAccess('Células') && (
          <TopNavDropdown
            icon={MenuIcons.celulas}
            label={<>Células <span className="ml-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{celulas.length}</span></>}
            ativo={moduloAtual === 'celulas'}
          >
            {submenusCelulas.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'celulas' && celulasSubmenu === id} onClick={() => navegar('celulas', id)} icon={MenuIcons[submenuIconKey.celulas[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Financeiro com dropdown */}
          {hasAccess('Financeiro') && (
          <TopNavDropdown
            icon={MenuIcons.financeiro}
            label="Financeiro"
            ativo={moduloAtual === 'financeiro'}
          >
            {submenusFinanceiro.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'financeiro' && financeiroSubmenu === id} onClick={() => navegar('financeiro', id)} icon={MenuIcons[submenuIconKey.financeiro[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Escolas com dropdown */}
          {hasAccess('Escolas') && (
          <TopNavDropdown
            icon={MenuIcons.escolas}
            label="Escolas"
            ativo={moduloAtual === 'escolas'}
          >
            {submenusEscolas.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'escolas' && escolasSubmenu === id} onClick={() => navegar('escolas', id)} icon={MenuIcons[submenuIconKey.escolas[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Agenda com dropdown */}
          {hasAccess('Agenda') && (
          <TopNavDropdown
            icon={MenuIcons.agenda}
            label="Agenda"
            ativo={moduloAtual === 'agenda'}
          >
            {submenusAgenda.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'agenda' && agendaSubmenu === id} onClick={() => navegar('agenda', id)} icon={MenuIcons[submenuIconKey.agenda[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {/* Utilitários com dropdown */}
          {hasAccess('Utilitários') && (
          <TopNavDropdown
            icon={MenuIcons.utilitarios}
            label="Utilitários"
            ativo={moduloAtual === 'utilitarios'}
          >
            {submenusUtilitarios.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'utilitarios' && utilitariosSubmenu === id} onClick={() => navegar('utilitarios', id)} icon={MenuIcons[submenuIconKey.utilitarios[id]]}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>
          )}

          {hasAccess('Configurações') && (
          <TopNavBtn ativo={moduloAtual === 'configuracoes'} onClick={() => navegar('configuracoes')} icon={MenuIcons.configuracoes}>
            Configurações
          </TopNavBtn>
          )}
        </nav>

        {/* Avatar do usuário com dropdown */}
        <div className="shrink-0 ml-auto border-l border-slate-700/60 pl-4">
          <UserAvatarDropdown 
            usuarioLogado={usuarioLogado} 
            membroLogado={membroLogado} 
            onSair={handleSair} 
            onVerPerfil={() => { setModuloAtual('pessoas'); setPessoasSubmenu('todos'); setMembroSelecionadoId(membroLogado?.id); }}
          />
        </div>
      </header>

      {/* ── SIDEBAR LATERAL — visível apenas no mobile ── */}
      {/* Mobile Header */}
      <div className="fixed top-0 inset-x-0 z-40 h-14 bg-[#1e3a8a] text-white flex items-center px-4 md:hidden print:hidden shadow-md"> {/* <--- Altere bg-[#hex] aqui para o Mobile */}
        <div className="w-12" /> {/* Espaço para equilibrar o layout do título centralizado */}
        <span className="flex-1 text-center text-sm font-bold uppercase tracking-wide">
          {getModuloTitle(moduloAtual)}
        </span>
        <div className="flex items-center gap-1">
          {/* Avatar clicável no mobile */}
          <button 
            onClick={() => { setModuloAtual('pessoas'); setPessoasSubmenu('todos'); setMembroSelecionadoId(membroLogado?.id); }}
            className="p-1 active:scale-95 transition-transform"
            title="Meu Perfil"
          >
            <UserAvatarImg usuarioLogado={usuarioLogado} membroLogado={membroLogado} tamanho="w-8 h-8" />
          </button>

        {/* Botão de Filtros exclusivo para o módulo Pessoas em mobile */}
        {moduloAtual === 'pessoas' && !membroSelecionadoId && (
          <button
            type="button"
            onClick={() => setFiltrosPessoasAberto(true)}
            className="p-2 -mr-1 active:opacity-50 transition-opacity"
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
            className="p-2 -mr-1 active:opacity-50 transition-opacity"
            aria-label="Abrir filtros"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          </button>
        )}
        </div>
      </div>
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
              onClick={() => navegar('pessoas', 'todos')} 
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
                  <button key={id} type="button" onClick={() => navegar('pessoas', id)}
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
              onClick={() => navegar('celulas', 'lista')} 
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
              onClick={() => navegar('utilitarios', 'escalas')} 
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

          {hasAccess('Configurações') && (
          <MenuButton ativo={moduloAtual === 'configuracoes'} onClick={() => navegar('configuracoes')} icon={MenuIcons.configuracoes}>Configurações</MenuButton>
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

        {/* Botão Notificações */}
        <button className="flex flex-col items-center gap-1 text-slate-400 relative active:scale-95 transition-transform">
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
             <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
           </svg>
           <span className="text-[10px] font-bold uppercase tracking-tight">Alertas</span>
        </button>       

        {/* Botão Configurações */}
        <button onClick={() => navegar('configuracoes')} className={`flex flex-col items-center gap-1 transition-colors ${moduloAtual === 'configuracoes' ? 'text-[#1e3a8a]' : 'text-slate-400'}`}>
           <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
             <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.11-.414.03L6.463 5.01a1.875 1.875 0 0 0-2.652 0l-.825.825a1.875 1.875 0 0 0 0 2.652l.828.828c.08.08.084.248-.03.414a7.446 7.446 0 0 0-.57.986c-.088.182-.228.277-.348.297L1.817 11.078a1.875 1.875 0 0 0-1.567 1.85v1.144c0 .917.663 1.699 1.567 1.85l1.051.176c.12.02.26.115.348.297.252.522.583 1.008.986 1.45a.447.447 0 0 1 .03.415l-.828.828a1.875 1.875 0 0 0 0 2.652l.825.825a1.875 1.875 0 0 0 2.652 0l.828-.828c.08-.08.248-.084.415-.03.442.403.928.734 1.45.986.182.088.277.228.297.348l.176 1.051a1.875 1.875 0 0 0 1.85 1.567h1.144a1.875 1.875 0 0 0 1.85-1.567l.176-1.051c.02-.12.115-.26.297-.348a7.493 7.493 0 0 0 .986-.57c.166-.115.334-.11.414-.03l.828.828a1.875 1.875 0 0 0 2.652 0l.825-.825a1.875 1.875 0 0 0 0-2.652l-.828-.828c-.08-.08-.084-.248.03-.414a7.446 7.446 0 0 0 .57-.986c.088-.182.228-.277.348-.297l1.051-.176a1.875 1.875 0 0 0 1.567-1.85v-1.144a1.875 1.875 0 0 0-1.567-1.85l-1.051-.176c-.12-.02-.26-.115-.348-.297a7.446 7.446 0 0 0-.57-.986.447.447 0 0 1-.03-.414l.828-.828a1.875 1.875 0 0 0 0-2.652l-.825-.825a1.875 1.875 0 0 0-2.652 0l-.828.828c-.08.08-.248.084-.414.03a7.493 7.493 0 0 0-1.45-.986c-.182-.088-.277-.228-.297-.348l-.176-1.051a1.875 1.875 0 0 0-1.85-1.567h-1.144ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
           </svg>
           <span className="text-[10px] font-bold uppercase tracking-tight">Ajustes</span>
        </button>
      </nav>

      {/* ── CONTEÚDO PRINCIPAL — offset do topbar no desktop ── */}
      <main className="min-w-0 px-2 pb-20 pt-14 sm:px-6 sm:pb-6 md:pt-14 lg:px-10 lg:pb-8 lg:pt-[80px]">
        {/* Nova HomePage como a tela principal do dashboard */}
        {moduloAtual === 'dashboard' && (
          <HomePage onNavigate={navegar} hasAccess={hasAccess} membroLogado={membroLogado} />
        )}

        {/* O OverviewDashboard (antigo Dashboard) pode ser acessado como um submenu da HomePage, se necessário. */}
        {/* Por exemplo, se a HomePage tivesse um botão "Ver Dashboard de Indicadores" */}
        {/* Por enquanto, o OverviewDashboard não é renderizado diretamente aqui. */}
        {/* Se for preciso, podemos criar um submenu para ele dentro da HomePage ou de "Visão Geral" */}
        {/* {moduloAtual === 'dashboard' && dashboardSubmenu === 'overview' && (
          <Dashboard
            pessoas={pessoas}
            celulas={celulas}
            zonas={zonas}
            relatoriosCelula={relatoriosCelula}
            indicadores={indicadores}
            carregando={carregando}
            periodoConvertidos={periodoConvertidos}
            setPeriodoConvertidos={setPeriodoConvertidos}
          />
        )} */}

        {moduloAtual === 'pessoas' && (
          <PessoasModulo
            submenu={pessoasSubmenu}
            pessoas={pessoas}
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
            filtrosMobileAberto={filtrosPessoasAberto}
            setFiltrosMobileAberto={setFiltrosPessoasAberto}
          />
        )}

        {moduloAtual === 'celulas' && (
          <CelulasModulo
            submenu={celulasSubmenu}
            celulas={celulas}
            celulasFiltradas={celulasFiltradas}
            filtrosCelula={filtrosCelula} // Passa o estado de filtros
            alterarFiltroCelula={alterarFiltroCelula} // Passa a função para alterar filtros
            limparFiltros={() => setFiltrosCelula(filtrosCelulaIniciais)} // Passa a função para limpar filtros
            pessoas={pessoas}
            zonas={zonas}
            relatoriosCelula={relatoriosCelula}
            celulaSelecionadaId={celulaSelecionadaId} // Passa o ID da célula selecionada
            setCelulaSelecionadaId={setCelulaSelecionadaId} // Passa a função para definir a célula selecionada
            obterDados={obterDados} // Passa a função para recarregar dados
            onNavigate={(sub) => navegar('celulas', sub)}
            membroLogado={membroLogado}
          />
        )}

        {moduloAtual === 'financeiro' && (
          <ModuloFinanceiro 
            meses={meses} 
            submenu={financeiroSubmenu} 
            usuarioLogado={usuarioLogado} 
            filtrosMobileAberto={filtrosFinanceiroAberto}
            setFiltrosMobileAberto={setFiltrosFinanceiroAberto}
          />
        )}

        {moduloAtual === 'escolas' && escolasSubmenu !== 'ficha-aluno' && (
          <EscolasModulo 
            submenu={escolasSubmenu} 
            onNavigate={(sub) => navegar('escolas', sub)} 
            pessoas={pessoas} 
            alunoSelecionadoParaCadernetaId={alunoSelecionadoParaCadernetaId} // Passa o ID do aluno
            setAlunoSelecionadoParaCadernetaId={setAlunoSelecionadoParaCadernetaId} // Passa o setter
            membroLogado={membroLogado}
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
            listaPessoas={pessoas}
            onDadosAtualizados={obterDados}
            isStudentCadernetaView={true} // Indica que é a visão de caderneta do aluno
            membroLogado={membroLogado}
          />
          </div>
        )}

        {moduloAtual === 'agenda' && (
          <AgendaModulo
            submenu={agendaSubmenu}
            onNavigate={(sub) => navegar('agenda', sub)}
            membroLogado={membroLogado}
            pessoas={pessoas}
          />
        )}

        {moduloAtual === 'utilitarios' && (
          <ModuloUtilitarios 
            submenu={utilitariosSubmenu} 
            onNavigate={(sub) => navegar('utilitarios', sub)}
            usuarioLogado={usuarioLogado}
            membroLogado={membroLogado}
          />
        )}

        {moduloAtual === 'configuracoes' && <TelaConfiguracoes onFechar={() => navegar('dashboard')} />}
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
      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
        ativo ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
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
        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
          ativo ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
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
      className={`w-full text-left px-3 py-2 text-xs font-semibold transition cursor-pointer flex items-center gap-2.5 ${
        ativo ? 'bg-[#2563eb] text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon && <span className={`shrink-0 ${ativo ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`}>{icon}</span>}
      {children}
    </button>
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
        {icon && <span className={`shrink-0 scale-[1.1] ${ativo ? 'opacity-100' : 'opacity-60'}`}>{icon}</span>}
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
