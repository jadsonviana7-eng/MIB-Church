import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import TelaConfiguracoes from './TelaConfiguracoes';
import TelaLogin from './TelaLogin';
import Dashboard from './Dashboard';
import CelulasModulo from './CelulasModulo';
import PessoasModulo from './PessoasModulo';
import ModuloFinanceiro from './ModuloFinanceiro';
import EscalasModulo from './EscalasModulo';
import EscolasModulo from './EscolasModulo';
import { normalizarTexto, faixaDaIdade, meses } from './churchUtils';

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
  const [utilitariosSubmenu, setUtilitariosSubmenu] = useState('escalas');
  const [pessoas, setPessoas] = useState([]);
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

  const membroLogado = useMemo(() => {
    if (!usuarioLogado?.email || pessoas.length === 0) return null;
    return pessoas.find(p => p.email?.toLowerCase() === usuarioLogado.email.toLowerCase());
  }, [usuarioLogado, pessoas]);

  const indicadores = useMemo(() => {
    const total = pessoas.length || 1;
    const homens = pessoas.filter((p) => normalizarTexto(p.genero) === 'masculino').length;
    const mulheres = pessoas.filter((p) => normalizarTexto(p.genero) === 'feminino').length;
    return {
      totalPessoas: pessoas.length,
      homens, mulheres,
      percentualHomens: Math.round((homens / total) * 100),
      percentualMulheres: Math.round((mulheres / total) * 100),
      totalCelulas: celulas.length,
    };
  }, [pessoas, celulas]);

  const pessoasFiltradas = useMemo(() => {
    return pessoas.filter((p) => {
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

  const submenusPessoas = [
    ['todos', 'Ver todos'], 
    ['adicionar', 'Novo Cadastro'],
    ['aniversariantes', 'Aniversariantes'],
    ['cargo', 'Cargos'],
    ['zona', 'Zonas'],
    ['atuacao', 'Atuações'],
    ['relatorios', 'Relatórios']
  ];
  const submenusCelulas = [['lista', 'Lista de Células'], ['adicionar', 'Nova Célula'], ['reunioes', 'Histórico']];
  const submenusFinanceiro = [
    ['resumo', 'Resumo'], 
    ['transacoes', 'Transações'], 
    ['relatorios', 'Relatórios'], 
    ['historico', 'Histórico'], 
    ['categorias', 'Categorias'], 
    ['contas', 'Contas/Caixas'],
    ['importar', 'Importar']
  ];
  const submenusEscolas = [
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
  ];
  const submenusUtilitarios = [['escalas', 'Escalas Ministerial']];

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
        .from('relatorios_celula') // Certifique-se que esta tabela existe e tem RLS configurado
        .select('*, celulas(nome)')
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

  // Se não há usuário logado, exibe tela de login
  if (!usuarioLogado) {
    console.log('Renderizando TelaLogin - nenhum usuário logado');
    return <TelaLogin onEntrar={handleEntrar} />;
  }

  console.log('Renderizando Dashboard - usuário logado:', usuarioLogado.email);

  return (
    <div className="min-h-screen bg-[var(--surface-muted)] font-sans text-[var(--text-primary)] antialiased">

      {/* ── TOPBAR FIXA — visível apenas em desktop (md+) ── */}
      <header className="hidden md:flex print:hidden fixed top-0 inset-x-0 z-50 h-14 bg-[#1e3a8a] border-b border-white/10 items-center px-4 gap-1 shadow-md">
        {/* Logo */}
        <button type="button" onClick={() => navegar('dashboard')} className="flex items-center gap-2.5 mr-4 shrink-0">
          <img src="/logo-mib-mundau.png" alt="Logo" className="h-8 w-14 object-contain bg-white rounded-md p-0.5" />
          <span className="font-bold text-white text-sm tracking-tight hidden lg:block">MIB Church</span>
        </button>

        {/* Nav items */}
        <nav className="flex items-center gap-1 flex-1">
          {/* Dashboard */}
          <TopNavBtn ativo={moduloAtual === 'dashboard'} onClick={() => navegar('dashboard')}>
            Visão Geral
            <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{indicadores.totalPessoas}</span>
          </TopNavBtn>

          {/* Pessoas com dropdown (Ajuste as cores dos itens internos se necessário) */}
          <TopNavDropdown
            label={<>Pessoas <span className="ml-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{pessoas.length}</span></>}
            ativo={moduloAtual === 'pessoas'}
          >
            {submenusPessoas.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'pessoas' && pessoasSubmenu === id} onClick={() => navegar('pessoas', id)}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>

          {/* Células com dropdown */}
          <TopNavDropdown
            label={<>Células <span className="ml-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{celulas.length}</span></>}
            ativo={moduloAtual === 'celulas'}
          >
            {submenusCelulas.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'celulas' && celulasSubmenu === id} onClick={() => navegar('celulas', id)}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>

          {/* Financeiro com dropdown */}
          <TopNavDropdown
            label="Financeiro"
            ativo={moduloAtual === 'financeiro'}
          >
            {submenusFinanceiro.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'financeiro' && financeiroSubmenu === id} onClick={() => navegar('financeiro', id)}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>

          {/* Escolas com dropdown */}
          <TopNavDropdown
            label="Escolas"
            ativo={moduloAtual === 'escolas'}
          >
            {submenusEscolas.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'escolas' && escolasSubmenu === id} onClick={() => navegar('escolas', id)}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>

          {/* Utilitários com dropdown */}
          <TopNavDropdown
            label="Utilitários"
            ativo={moduloAtual === 'utilitarios'}
          >
            {submenusUtilitarios.map(([id, label]) => (
              <DropdownItem key={id} ativo={moduloAtual === 'utilitarios' && utilitariosSubmenu === id} onClick={() => navegar('utilitarios', id)}>
                {label}
              </DropdownItem>
            ))}
          </TopNavDropdown>

          <TopNavBtn ativo={moduloAtual === 'configuracoes'} onClick={() => navegar('configuracoes')}>
            Configurações
          </TopNavBtn>
        </nav>

        {/* Avatar do usuário com dropdown */}
        <div className="shrink-0 ml-auto border-l border-slate-700/60 pl-4">
          <UserAvatarDropdown usuarioLogado={usuarioLogado} membroLogado={membroLogado} onSair={handleSair} />
        </div>
      </header>

      {/* ── SIDEBAR LATERAL — visível apenas no mobile ── */}
      <button
        type="button"
        onClick={() => setMenuAberto(true)}
        className="fixed left-4 top-3 z-40 md:hidden print:hidden rounded-xl bg-[#1e293b] px-3 py-2 text-sm font-bold text-white shadow-lg"
      >
        ☰
      </button>
      {menuAberto && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMenuAberto(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 md:hidden print:hidden"
        />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white flex flex-col border-r border-white/5 transition-transform duration-200 md:hidden print:hidden ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-white/5 flex items-center gap-3">
          <img src="/logo-mib-mundau.png" alt="Logo" className="h-12 w-20 object-contain bg-white rounded-lg p-1" />
          <div>
            <h1 className="font-bold text-white text-base tracking-tight">MIB Church</h1>
            <p className="text-[10px] font-medium text-teal-200/70 uppercase tracking-wider">Gestão da Igreja</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-5 overflow-y-auto">
          <MenuButton ativo={moduloAtual === 'dashboard'} onClick={() => navegar('dashboard')} contador={indicadores.totalPessoas}>
            Visão Geral
          </MenuButton>
          <div>
            <MenuButton ativo={moduloAtual === 'pessoas'} onClick={() => navegar('pessoas', 'todos')} contador={pessoas.length}>
              Pessoas
            </MenuButton>
            {moduloAtual === 'pessoas' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusPessoas.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('pessoas', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${pessoasSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <MenuButton ativo={moduloAtual === 'celulas'} onClick={() => navegar('celulas', 'lista')} contador={celulas.length}>
              Células
            </MenuButton>
            {moduloAtual === 'celulas' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusCelulas.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('celulas', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${celulasSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <MenuButton ativo={moduloAtual === 'financeiro'} onClick={() => navegar('financeiro', 'resumo')}>
              Financeiro
            </MenuButton>
            {moduloAtual === 'financeiro' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusFinanceiro.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('financeiro', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${financeiroSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <MenuButton ativo={moduloAtual === 'escolas'} onClick={() => navegar('escolas', 'resumo')}>
              Escolas
            </MenuButton>
            {moduloAtual === 'escolas' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusEscolas.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('escolas', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${escolasSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <MenuButton ativo={moduloAtual === 'utilitarios'} onClick={() => navegar('utilitarios', 'escalas')}>
              Utilitários
            </MenuButton>
            {moduloAtual === 'utilitarios' && (
              <div className="mt-2 ml-2 pl-3 border-l border-white/20 space-y-1">
                {submenusUtilitarios.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('utilitarios', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${utilitariosSubmenu === id ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <MenuButton ativo={moduloAtual === 'configuracoes'} onClick={() => navegar('configuracoes')}>Configurações</MenuButton>
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

      {/* ── CONTEÚDO PRINCIPAL — offset do topbar no desktop ── */}
      <main className="min-w-0 p-4 sm:p-6 lg:px-10 lg:py-16 pt-20">
        {moduloAtual === 'dashboard' && (
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
        )}

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
          />
        )}

        {moduloAtual === 'financeiro' && <ModuloFinanceiro meses={meses} submenu={financeiroSubmenu} usuarioLogado={usuarioLogado} />}

        {moduloAtual === 'escolas' && (
          <EscolasModulo 
            submenu={escolasSubmenu} 
            onNavigate={(sub) => navegar('escolas', sub)} 
            pessoas={pessoas} 
            alunoSelecionadoParaCadernetaId={alunoSelecionadoParaCadernetaId} // Passa o ID do aluno
            setAlunoSelecionadoParaCadernetaId={setAlunoSelecionadoParaCadernetaId} // Passa o setter
          />
        )}

        {moduloAtual === 'escolas' && escolasSubmenu === 'ficha-aluno' && alunoSelecionadoParaCadernetaId && (
          <DetalhesMembro
            pessoaId={alunoSelecionadoParaCadernetaId}
            onFechar={() => navegar('escolas', 'turmas')} // Volta para a lista de turmas ou alunos
            listaPessoas={pessoas}
            onDadosAtualizados={obterDados}
            isStudentCadernetaView={true} // Indica que é a visão de caderneta do aluno
          />
        )}

        {moduloAtual === 'utilitarios' && (
          <>
            {utilitariosSubmenu === 'escalas' && <EscalasModulo usuarioLogado={usuarioLogado} />}
          </>
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
    ['bg-[#055F6D]', 'text-white'],
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

function UserAvatarDropdown({ usuarioLogado, membroLogado, onSair }) {
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

          {/* Ação de sair */}
          <div className="p-2">
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
function TopNavBtn({ ativo, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition whitespace-nowrap flex items-center ${
        ativo ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}

function TopNavDropdown({ label, ativo, children }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)}>
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition whitespace-nowrap flex items-center gap-1 ${
          ativo ? 'bg-white/15 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        {label}
        <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {aberto && (
        <div className="absolute left-0 top-full w-52 bg-[#1e3a8a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1" onClick={() => setAberto(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ ativo, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition ${
        ativo ? 'bg-[#2563eb] text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}

function MenuButton({ ativo, onClick, contador, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
        ativo ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
      }`}
    >
      <span>{children}</span>
      {contador !== undefined && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${ativo ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-slate-500'}`}>
          {contador}
        </span>
      )}
    </button>
  );
}
