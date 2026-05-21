import { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, AvatarCelula, uploadImagemCelula } from './ui';
import FormularioCadastro from './FormularioCadastro';
import FormularioCelula from './FormularioCelula';
import DetalhesMembro from './DetalhesMembro';
import ModalLancarReuniao from './ModalLancarReuniao';
import TelaConfiguracoes from './TelaConfiguracoes';

const meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const faixasEtarias = [
  { id: 'crianca', nome: '03 a 11 anos', curto: 'Crianças' },
  { id: 'adolescente', nome: '12 a 17 anos', curto: 'Adolescentes' },
  { id: 'jovem', nome: '18 a 29 anos', curto: 'Jovens' },
  { id: 'adulto', nome: '30 a 59 anos', curto: 'Adultos' },
  { id: 'idoso', nome: '60+ anos', curto: 'Melhor idade' },
];

const filtrosIniciais = {
  busca: '',
  genero: '',
  estadoCivil: '',
  faixaEtaria: '',
  zona: '',
  cargo: '',
  escolaridade: '',
  batizado: '',
  atuacao: '',
  permissao: '',
  relatorioCampo: '',
  relatorioValor: '',
};

const filtrosCelulaIniciais = {
  faixaEtaria: '',
  genero: '',
  diaSemana: '',
  horario: '',
};

function normalizarTexto(texto) {
  if (!texto) return '';
  return String(texto)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return null;
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  if (Number.isNaN(nascimento.getTime())) return null;

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const dMes = hoje.getMonth() - nascimento.getMonth();
  if (dMes < 0 || (dMes === 0 && hoje.getDate() < nascimento.getDate())) idade -= 1;
  return idade;
}

function faixaDaIdade(dataNascimento) {
  const idade = calcularIdade(dataNascimento);
  if (idade === null) return 'nao-informada';
  if (idade >= 3 && idade <= 11) return 'crianca';
  if (idade >= 12 && idade <= 17) return 'adolescente';
  if (idade >= 18 && idade <= 29) return 'jovem';
  if (idade >= 30 && idade <= 59) return 'adulto';
  if (idade >= 60) return 'idoso';
  return 'nao-informada';
}

function nomePessoa(pessoas, id) {
  return pessoas.find((p) => String(p.id) === String(id))?.nome || 'Não informado';
}

function nomeZona(zonas, id) {
  return zonas.find((z) => String(z.id) === String(id))?.nome || 'Sem zona';
}

function statusBatismo(pessoa) {
  if (typeof pessoa.batizado_aguas === 'boolean') return pessoa.batizado_aguas;
  return Boolean(pessoa.data_batismo);
}

const MARCADOR_METADADOS_REUNIAO = '---MIB_METADADOS---';

function montarObservacoesComMetadados(observacao, tema, nomesVisitantes) {
  const blocoMetadados = [
    MARCADOR_METADADOS_REUNIAO,
    `tema: ${tema || ''}`,
    `visitantes: ${(nomesVisitantes || []).join('|')}`,
  ].join('\n');
  const texto = (observacao || '').trim();
  return texto ? `${texto}\n\n${blocoMetadados}` : blocoMetadados;
}

function extrairMetadadosReuniao(observacoesBrutas) {
  if (!observacoesBrutas) return { observacao: '', tema: '', nomesVisitantes: [] };

  const partes = observacoesBrutas.split(MARCADOR_METADADOS_REUNIAO);
  const observacao = partes[0]?.trim() || '';
  const metadados = partes[1] || '';
  let tema = '';
  let nomesVisitantes = [];

  metadados.split('\n').forEach((linha) => {
    const trimmed = linha.trim();
    if (trimmed.startsWith('tema:')) tema = trimmed.slice(5).trim();
    if (trimmed.startsWith('visitantes:')) {
      const lista = trimmed.slice(11).trim();
      nomesVisitantes = lista ? lista.split('|').map((n) => n.trim()).filter(Boolean) : [];
    }
  });

  return { observacao, tema, nomesVisitantes };
}

function valorOfertaRelatorio(relatorio) {
  return Number(relatorio?.oferta ?? relatorio?.valor_oferta ?? 0);
}

function agrupamentoPor(lista, resolver) {
  return lista.reduce((acc, item) => {
    const chave = resolver(item) || 'Não informado';
    acc[chave] = (acc[chave] || 0) + 1;
    return acc;
  }, {});
}

function valorCampoRelatorio(pessoa, campo, zonas = []) {
  const mapa = {
    Cargos: pessoa.tipo_membro || 'Não informado',
    'Faixa etaria': faixasEtarias.find((f) => f.id === faixaDaIdade(pessoa.data_nascimento))?.curto || 'Não informada',
    Aniversarios: pessoa.data_nascimento ? meses[new Date(`${pessoa.data_nascimento}T00:00:00`).getMonth()] : 'Sem data',
    Sexo: pessoa.genero || 'Não informado',
    'Estado civil': pessoa.estado_civil || 'Não informado',
    Batismo: statusBatismo(pessoa) ? 'Batizado' : 'Não batizado',
    'Data de conversao': pessoa.data_conversao ? String(new Date(`${pessoa.data_conversao}T00:00:00`).getFullYear()) : 'Sem data',
    Bairro: pessoa.bairro || 'Não informado',
    'Campo de Atuacao': pessoa.atuacao || 'Não informado',
    Permissoes: pessoa.permissao || pessoa.tipo_membro || 'Membro',
    'Zona de moradia': nomeZona(zonas, pessoa.zona_id),
  };
  return mapa[campo] || 'Não informado';
}

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    try {
      const sessaoSalva = localStorage.getItem('mibChurchSessao');
      return sessaoSalva ? JSON.parse(sessaoSalva) : null;
    } catch {
      localStorage.removeItem('mibChurchSessao');
      return null;
    }
  });

  const [isModalRelatorioGeralAberto, setIsModalRelatorioGeralAberto] = useState(false);

  const [moduloAtual, setModuloAtual] = useState('dashboard');
  const [menuAberto, setMenuAberto] = useState(false);
  const [pessoasSubmenu, setPessoasSubmenu] = useState('todos');
  const [celulasSubmenu, setCelulasSubmenu] = useState('lista');
  const [pessoas, setPessoas] = useState([]);
  const [celulas, setCelulas] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [cargosLista, setCargosLista] = useState([]);
  const [atuacoesLista, setAtuacoesLista] = useState([]);
  const [relatoriosCelula, setRelatoriosCelula] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [membroSelecionadoId, setMembroSelecionadoId] = useState(null);
  const [celulaSelecionadaId, setCelulaSelecionadaId] = useState(null);
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [filtrosCelula, setFiltrosCelula] = useState(filtrosCelulaIniciais);
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [periodoConvertidos, setPeriodoConvertidos] = useState('mes');
  const [relatorioSelecionado, setRelatorioSelecionado] = useState('Cargos');
  const [novoItem, setNovoItem] = useState('');
  const [itensLocais, setItensLocais] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mibChurchListasAuxiliares')) || {
        cargos: [],
        atuacoes: [],
      };
    } catch {
      return { cargos: [], atuacoes: [] };
    }
  });

  async function obterDados() {
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
      if (erroCargos) console.warn('Tabela "cargos" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosCargos) setCargosLista(dadosCargos);

      const { data: dadosAtuacoes, error: erroAtuacoes } = await supabase.from('atuacoes').select('*').order('nome');
      if (erroAtuacoes) console.warn('Tabela "atuacoes" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosAtuacoes) setAtuacoesLista(dadosAtuacoes);

      const { data: dadosCelulas, error: erroCelulas } = await supabase.from('celulas').select('*').order('nome');
      if (erroCelulas) console.warn('Tabela "celulas" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosCelulas) setCelulas(dadosCelulas);

      const { data: dadosZonas, error: erroZonas } = await supabase.from('zonas_moradia').select('*').order('nome');
      if (erroZonas) console.warn('Tabela "zonas_moradia" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosZonas) setZonas(dadosZonas);

      const { data: dadosRelatorios, error: erroRelatorios } = await supabase
        .from('relatorios_celula')
        .select('*, celulas(nome)')
        .order('data_reuniao', { ascending: false });
      if (erroRelatorios) console.warn('Tabela "relatorios_celula" não encontrada. Veja DATABASE_SCHEMA.md');
      if (dadosRelatorios) setRelatoriosCelula(dadosRelatorios);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (!usuarioLogado) return undefined;
    const carregamentoInicial = window.setTimeout(obterDados, 0);
    return () => window.clearTimeout(carregamentoInicial);
  }, [usuarioLogado]);

  useEffect(() => {
    localStorage.setItem('mibChurchListasAuxiliares', JSON.stringify(itensLocais));
  }, [itensLocais]);

  function handleEntrar(sessao) {
    setUsuarioLogado(sessao);
    if (sessao.lembrarAcesso) localStorage.setItem('mibChurchSessao', JSON.stringify(sessao));
    else localStorage.removeItem('mibChurchSessao');
  }

  async function handleSair() {
    try { await supabase.auth.signOut(); } catch (_) { /* ignora erro de rede */ }
    localStorage.removeItem('mibChurchSessao');
    setUsuarioLogado(null);
    setModuloAtual('dashboard');
    setMembroSelecionadoId(null);
    setCelulaSelecionadaId(null);
  }

  function navegar(modulo, submenu = null) {
    setModuloAtual(modulo);
    setMenuAberto(false);
    setMembroSelecionadoId(null);
    setCelulaSelecionadaId(null);
    setGrupoSelecionado(null);
    if (submenu) {
      if (modulo === 'pessoas') setPessoasSubmenu(submenu);
      if (modulo === 'celulas') setCelulasSubmenu(submenu);
    }
  }

  const cargosDisponiveis = useMemo(() => {
    const doBanco = cargosLista.map((c) => c.nome);
    const derivados = pessoas.map((p) => p.tipo_membro).filter(Boolean);
    return [...new Set([...doBanco, ...derivados, ...itensLocais.cargos])].sort();
  }, [pessoas, cargosLista, itensLocais.cargos]);

  const atuacoesDisponiveis = useMemo(() => {
    const doBanco = atuacoesLista.map((a) => a.nome);
    const derivados = pessoas.map((p) => p.atuacao).filter(Boolean);
    return [...new Set([...doBanco, ...derivados, ...itensLocais.atuacoes])].sort();
  }, [pessoas, atuacoesLista, itensLocais.atuacoes]);

  const escolaridadesDisponiveis = useMemo(
    () => [...new Set(pessoas.map((p) => p.escolaridade).filter(Boolean))].sort(),
    [pessoas]
  );

  const pessoasFiltradas = useMemo(() => {
    return pessoas.filter((pessoa) => {
      const busca = normalizarTexto(filtros.busca);
      if (busca) {
        const alvo = normalizarTexto(
          `${pessoa.nome || ''} ${pessoa.email || ''} ${pessoa.telefone || ''} ${pessoa.cpf || ''} ${pessoa.bairro || ''}`
        );
        if (!alvo.includes(busca)) return false;
      }
      if (filtros.genero && normalizarTexto(pessoa.genero) !== normalizarTexto(filtros.genero)) return false;
      if (filtros.estadoCivil && normalizarTexto(pessoa.estado_civil) !== normalizarTexto(filtros.estadoCivil)) return false;
      if (filtros.faixaEtaria && faixaDaIdade(pessoa.data_nascimento) !== filtros.faixaEtaria) return false;
      if (filtros.zona && String(pessoa.zona_id || '') !== String(filtros.zona)) return false;
      if (filtros.cargo && normalizarTexto(pessoa.tipo_membro) !== normalizarTexto(filtros.cargo)) return false;
      if (filtros.atuacao && normalizarTexto(pessoa.atuacao) !== normalizarTexto(filtros.atuacao)) return false;
      if (filtros.permissao && normalizarTexto(pessoa.permissao || pessoa.tipo_membro) !== normalizarTexto(filtros.permissao)) return false;
      if (filtros.escolaridade && normalizarTexto(pessoa.escolaridade) !== normalizarTexto(filtros.escolaridade)) return false;
      if (filtros.batizado === 'sim' && !statusBatismo(pessoa)) return false;
      if (filtros.batizado === 'nao' && statusBatismo(pessoa)) return false;
      if (filtros.relatorioCampo) {
        const valor = valorCampoRelatorio(pessoa, filtros.relatorioCampo, zonas);
        if (normalizarTexto(valor) !== normalizarTexto(filtros.relatorioValor)) return false;
      }
      return true;
    });
  }, [pessoas, filtros, zonas]);

  const celulasFiltradas = useMemo(() => {
    return celulas.filter((celula) => {
      if (filtrosCelula.faixaEtaria && normalizarTexto(celula.faixa_etaria) !== normalizarTexto(filtrosCelula.faixaEtaria)) return false;
      if (filtrosCelula.genero && normalizarTexto(celula.genero) !== normalizarTexto(filtrosCelula.genero)) return false;
      if (filtrosCelula.diaSemana && normalizarTexto(celula.dia_semana) !== normalizarTexto(filtrosCelula.diaSemana)) return false;
      if (filtrosCelula.horario && String(celula.horario || '') !== filtrosCelula.horario) return false;
      return true;
    });
  }, [celulas, filtrosCelula]);

  const indicadores = useMemo(() => {
    const total = pessoas.length || 1;
    const homens = pessoas.filter((p) => normalizarTexto(p.genero) === 'masculino').length;
    const mulheres = pessoas.filter((p) => normalizarTexto(p.genero) === 'feminino').length;
    return {
      totalPessoas: pessoas.length,
      homens,
      mulheres,
      percentualHomens: Math.round((homens / total) * 100),
      percentualMulheres: Math.round((mulheres / total) * 100),
      totalCelulas: celulas.length,
    };
  }, [pessoas, celulas]);

  function alterarFiltro(campo, valor) {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  }

  function abrirPessoasFiltradas(novosFiltros) {
    setFiltros({ ...filtrosIniciais, ...novosFiltros });
    setModuloAtual('pessoas');
    setPessoasSubmenu('todos');
    setMembroSelecionadoId(null);
    setGrupoSelecionado(null);
    setMenuAberto(false);
  }

  function alterarFiltroCelula(campo, valor) {
    setFiltrosCelula((prev) => ({ ...prev, [campo]: valor }));
  }

  function exportarCSV() {
    const colunas = ['id', 'nome', 'email', 'telefone', 'genero', 'tipo_membro', 'estado_civil', 'bairro', 'cidade', 'status'];
    const linhas = pessoasFiltradas.map((p) =>
      colunas.map((c) => `"${String(p[c] || '').replace(/"/g, '""')}"`).join(',')
    );
    const csv = [colunas.join(','), ...linhas].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mib-church-pessoas.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportarPDF() {
    window.print();
  }

  async function criarItemAuxiliar(tipo) {
    const nome = novoItem.trim();
    if (!nome) return;
    if (tipo === 'zonas') {
      const { error } = await supabase.from('zonas_moradia').insert([{ nome }]);
      if (!error) {
        setNovoItem('');
        obterDados();
      }
      return;
    }
    if (tipo === 'cargos') {
      const { error } = await supabase.from('cargos').insert([{ nome }]);
      if (!error) {
        setNovoItem('');
        obterDados();
      } else {
        window.alert('Erro ao cadastrar cargo: ' + error.message);
      }
      return;
    }
    if (tipo === 'atuacoes') {
      const { error } = await supabase.from('atuacoes').insert([{ nome }]);
      if (!error) {
        setNovoItem('');
        obterDados();
      } else {
        window.alert('Erro ao cadastrar atuação: ' + error.message);
      }
      return;
    }
    setNovoItem('');
  }

  // Submenus de Pessoas e Células para o dropdown da topbar
  const submenusPessoas = [
    ['todos', 'Ver todos'],
    ['adicionar', 'Adicionar Pessoa'],
    ['aniversariantes', 'Aniversariantes'],
    ['cargo', 'Cargo'],
    ['zona', 'Zona de Moradia'],
    ['atuacao', 'Campo de Atuação'],
    ['relatorios', 'Relatórios'],
  ];
  const submenusCelulas = [
    ['lista', 'Ver células'],
    ['adicionar', 'Adicionar Nova Célula'],
    ['reunioes', 'Reuniões realizadas'],
  ];

  return (
    <div className="min-h-screen bg-[var(--surface-muted)] font-sans text-[var(--text-primary)] antialiased">

      {/* ── TOPBAR FIXA — visível apenas em desktop (md+) ── */}
      <header className="hidden md:flex print:hidden fixed top-0 inset-x-0 z-50 h-14 bg-[#1e293b] border-b border-slate-700/60 items-center px-4 gap-1 shadow-md">
        {/* Logo */}
        <button type="button" onClick={() => navegar('dashboard')} className="flex items-center gap-2.5 mr-4 shrink-0">
          <img src="/logo-mib-mundau.png" alt="MIB Church" className="h-8 w-14 object-contain bg-white rounded-md p-0.5" />
          <span className="font-bold text-white text-sm tracking-tight hidden lg:block">MIB Church</span>
        </button>

        {/* Nav items */}
        <nav className="flex items-center gap-1 flex-1">
          {/* Dashboard */}
          <TopNavBtn ativo={moduloAtual === 'dashboard'} onClick={() => navegar('dashboard')}>
            Visão Geral
            <span className="ml-1.5 text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">{indicadores.totalPessoas}</span>
          </TopNavBtn>

          {/* Pessoas com dropdown */}
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

          <TopNavBtn ativo={moduloAtual === 'configuracoes'} onClick={() => navegar('configuracoes')}>
            Configurações
          </TopNavBtn>
        </nav>

        {/* Usuário + Sair */}
        <div className="flex items-center gap-3 shrink-0 ml-auto border-l border-slate-700/60 pl-4">
          <div className="text-right hidden lg:block">
            <p className="text-[11px] font-semibold text-slate-200 leading-tight">{usuarioLogado?.perfil?.nome || 'Usuário'}</p>
            <p className="text-[10px] text-slate-500 truncate max-w-[160px]">{usuarioLogado?.email || ''}</p>
          </div>
          <button type="button" onClick={handleSair} className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition">
            Sair
          </button>
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
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1e293b] text-slate-200 flex flex-col border-r border-slate-700/50 transition-transform duration-200 md:hidden print:hidden ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-600/50 flex items-center gap-3">
          <img src="/logo-mib-mundau.png" alt="MIB Church" className="h-12 w-20 object-contain bg-white rounded-lg p-1" />
          <div>
            <h1 className="font-bold text-white text-base tracking-tight">MIB Church</h1>
            <p className="text-[10px] font-medium text-teal-200/70 uppercase tracking-wider">Gestão de Membresia</p>
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
              <div className="mt-2 ml-2 pl-3 border-l border-[#055F6D]/40 space-y-1">
                {submenusPessoas.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('pessoas', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${pessoasSubmenu === id ? 'bg-[#055F6D] text-white' : 'text-slate-400 hover:text-white hover:bg-[#044a56]'}`}>
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
              <div className="mt-2 ml-2 pl-3 border-l border-[#055F6D]/40 space-y-1">
                {submenusCelulas.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navegar('celulas', id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition ${celulasSubmenu === id ? 'bg-[#0d9488] text-white' : 'text-slate-400 hover:text-white hover:bg-[#044a56]'}`}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <MenuButton ativo={moduloAtual === 'configuracoes'} onClick={() => navegar('configuracoes')}>Configurações</MenuButton>
        </nav>
        <div className="p-4 border-t border-[#055F6D]/30 space-y-3">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Acesso atual</p>
            <p className="text-xs font-semibold text-slate-200 truncate">{usuarioLogado?.perfil?.nome || 'Usuário'}</p>
            <p className="text-[10px] text-slate-500 truncate">{usuarioLogado?.email || 'Sem e-mail'}</p>
          </div>
          <button type="button" onClick={handleSair} className="w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition">
            Sair
          </button>
        </div>
      </aside>

      {/* ── CONTEÚDO PRINCIPAL — offset do topbar no desktop ── */}
      <main className="min-w-0 p-4 sm:p-6 lg:p-8 md:pt-20">
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
            cargosLista={cargosLista}
            atuacoesLista={atuacoesLista}
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
            exportarCSV={exportarCSV}
            exportarPDF={exportarPDF}
            mesSelecionado={mesSelecionado}
            setMesSelecionado={setMesSelecionado}
            grupoSelecionado={grupoSelecionado}
            setGrupoSelecionado={setGrupoSelecionado}
            abrirPessoasFiltradas={abrirPessoasFiltradas}
            relatorioSelecionado={relatorioSelecionado}
            setRelatorioSelecionado={setRelatorioSelecionado}
            novoItem={novoItem}
            setNovoItem={setNovoItem}
            criarItemAuxiliar={criarItemAuxiliar}
          />
        )}

        {moduloAtual === 'celulas' && (
          <CelulasModulo
            submenu={celulasSubmenu}
            celulas={celulas}
            celulasFiltradas={celulasFiltradas}
            filtrosCelula={filtrosCelula}
            alterarFiltroCelula={alterarFiltroCelula}
            limparFiltros={() => setFiltrosCelula(filtrosCelulaIniciais)}
            pessoas={pessoas}
            zonas={zonas}
            relatoriosCelula={relatoriosCelula}
            celulaSelecionadaId={celulaSelecionadaId}
            setCelulaSelecionadaId={setCelulaSelecionadaId}
            obterDados={obterDados}
          />
        )}

        {moduloAtual === 'configuracoes' && <TelaConfiguracoes onFechar={() => navegar('dashboard')} />}
      </main>
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
    <div className="relative" onMouseLeave={() => setAberto(false)}>
      <button
        type="button"
        onMouseEnter={() => setAberto(true)}
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
        <div className="absolute left-0 top-full mt-1 w-52 bg-[#1e293b] border border-slate-700/60 rounded-xl shadow-2xl overflow-hidden z-50 py-1">
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
        ativo ? 'bg-[#055F6D] text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
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
        ativo ? 'bg-white text-[var(--text-heading)] shadow-sm' : 'text-slate-300 hover:text-white hover:bg-[#044a56]'
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

function PageHeader({ titulo, subtitulo, children }) {
  return (
    <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#055F6D]">MIB Church</p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-[var(--text-heading)] tracking-tight">{titulo}</h2>
        {subtitulo && <p className="mt-2 text-sm text-[var(--text-muted)] max-w-3xl">{subtitulo}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

const opacaColors = ['#7C9EC9','#A8C5A0','#E8A87C','#C9A0DC','#F5A0A0','#80C9C9','#F0C878','#8BA8C8'];

function DoughnutCard({ titulo, dados }) {
  const entradas = Object.entries(dados).sort((a, b) => b[1] - a[1]);
  const total = entradas.reduce((sum, [, valor]) => sum + valor, 0);
  let acumulado = 0;
  const gradient = total
    ? entradas
        .map(([, valor], index) => {
          const inicio = (acumulado / total) * 100;
          acumulado += valor;
          const fim = (acumulado / total) * 100;
          return `${opacaColors[index % opacaColors.length]} ${inicio}% ${fim}%`;
        })
        .join(', ')
    : '#e5e7eb 0% 100%';

  return (
    <Card className="p-0">
      <CardHeader titulo={titulo} />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-center min-h-[340px]">
        <div className="relative h-52 w-52 mx-auto lg:mx-0 rounded-full shrink-0" style={{ background: `conic-gradient(${gradient})` }}>
          <div className="absolute inset-10 rounded-full bg-white flex items-center justify-center text-4xl font-semibold text-[var(--text-heading)]">{total}</div>
        </div>
        <div className="space-y-3">
          {entradas.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">Sem dados cadastrados.</p>
          ) : (
            entradas.map(([label, valor], index) => (
              <div key={label} className="flex items-center justify-between gap-3 text-sm font-medium">
                <span className="flex items-center gap-2.5 text-[var(--text-primary)]">
                  <span className="h-3 w-3 rounded-full" style={{ background: opacaColors[index % opacaColors.length] }} />
                  {label}
                </span>
                <span className="text-[var(--text-heading)] font-semibold text-lg">{valor}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}

function CombinationCard({ titulo, dados, periodo, setPeriodo }) {
  const entradas = Object.entries(dados);
  const maximo = Math.max(...entradas.map(([, valor]) => valor), 1);
  const largura = Math.max(entradas.length * 96, 480);
  const alturaGrafico = 320;
  const baseY = alturaGrafico - 48;
  const pontos = entradas.map(([, valor], index) => {
    const x = 48 + index * 84;
    const y = baseY - (valor / maximo) * 220;
    return `${x},${y}`;
  }).join(' ');

  return (
    <Card className="p-0">
      <CardHeader
        titulo={titulo}
        children={(
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-primary)] bg-white">
            <option value="semana">Semana</option>
            <option value="mes">Meses</option>
            <option value="ano">Ano</option>
          </select>
        )}
      />
      <div className="p-4 overflow-x-auto">
        <svg width={largura} height={alturaGrafico} role="img" aria-label={titulo} className="min-w-full">
          <line x1="36" y1={baseY} x2={largura - 24} y2={baseY} stroke="#dde4ec" strokeWidth="2" />
          {entradas.map(([label, valor], index) => {
            const x = 48 + index * 84;
            const altura = (valor / maximo) * 220;
            return (
              <g key={label}>
                <rect x={x - 20} y={baseY - altura} width="40" height={altura} rx="8" fill={opacaColors[0]} opacity="0.88" />
                <text x={x} y={baseY + 28} textAnchor="middle" fontSize="11" fill="#7b8da3">{label}</text>
                <text x={x} y={baseY - altura - 10} textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">{valor}</text>
              </g>
            );
          })}
          {pontos && <polyline points={pontos} fill="none" stroke={opacaColors[2]} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      </div>
    </Card>
  );
}

function ColumnChart({ titulo, dados }) {
  // Paleta opaca/pastel para os gráficos
  const colorsOpacas = ['#7C9EC9','#A8C5A0','#E8A87C','#C9A0DC','#F5A0A0','#80C9C9','#F0C878','#8BA8C8'];
  const entradas = Object.entries(dados);
  const maximo = Math.max(...entradas.map(([, valor]) => valor), 1);
  return (
    <Card className="p-0">
      <CardHeader titulo={titulo} />
      <div className="p-6 flex h-80 items-end gap-3 overflow-x-auto">
        {entradas.map(([label, valor], index) => (
          <div key={label} className="min-w-[4.5rem] flex-1 flex flex-col items-center gap-2">
            <span className="text-sm font-semibold text-[var(--text-heading)]">{valor}</span>
            <div className="w-full rounded-t-xl min-h-[12px]" style={{ height: `${Math.max((valor / maximo) * 260, 12)}px`, background: colorsOpacas[index % colorsOpacas.length] }} />
            <span className="text-[11px] font-medium text-[var(--text-muted)]">{label.slice(0, 3)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DashboardStats({ indicadores }) {
  return (
    <Card>
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
        <IndicadorHorizontal label="Total de pessoas" valor={indicadores.totalPessoas} detalhe="Membresia" icone="∑" cor="text-[#055F6D] bg-[var(--brand-light)]" />
        <IndicadorHorizontal label="Homens" valor={indicadores.homens} detalhe={`${indicadores.percentualHomens}%`} icone="♂" cor="text-[#0d9488] bg-teal-50" />
        <IndicadorHorizontal label="Mulheres" valor={indicadores.mulheres} detalhe={`${indicadores.percentualMulheres}%`} icone="♀" cor="text-[#38bdf8] bg-sky-50" />
        <IndicadorHorizontal label="Células" valor={indicadores.totalCelulas} detalhe="Ativas" icone="⌂" cor="text-[#055F6D] bg-[var(--brand-light)]" />
      </div>
    </Card>
  );
}

function IndicadorHorizontal({ label, valor, detalhe, icone, cor }) {
  return (
    <div className="flex items-center gap-4 px-4 py-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl font-semibold ${cor}`}>{icone}</span>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-[var(--text-heading)]">{valor}</span>
          <span className="text-xs font-medium text-[var(--text-muted)]">{detalhe}</span>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ pessoas, celulas, zonas, relatoriosCelula, indicadores, carregando, periodoConvertidos, setPeriodoConvertidos }) {
  const zonasDados = agrupamentoPor(pessoas, (p) => nomeZona(zonas, p.zona_id));
  const faixasDados = agrupamentoPor(pessoas, (p) => faixasEtarias.find((f) => f.id === faixaDaIdade(p.data_nascimento))?.curto || 'Não informada');
  const faixasCelulas = agrupamentoPor(celulas, (c) => c.faixa_etaria || 'Não informada');
  const aniversariantesMes = pessoas.filter((p) => {
    if (!p.data_nascimento) return false;
    return new Date(`${p.data_nascimento}T00:00:00`).getMonth() === new Date().getMonth();
  });
  const aniversariosDados = meses.reduce((acc, mes, index) => {
    acc[mes] = pessoas.filter((p) => p.data_nascimento && new Date(`${p.data_nascimento}T00:00:00`).getMonth() === index).length;
    return acc;
  }, {});
  
  const novosConvertidos = useMemo(() => {
    return agrupamentoPor(pessoas.filter(p => p.data_conversao), (p) => {
      if (periodoConvertidos === 'mes') {
        return meses[new Date(`${p.data_conversao}T00:00:00`).getMonth()];
      }
      return String(new Date(`${p.data_conversao}T00:00:00`).getFullYear());
    });
  }, [pessoas, periodoConvertidos]);

  return (
    <>
      <PageHeader titulo="Visão Geral" subtitulo="Gráficos estruturais, demografia automática e atualizações rápidas das células." />
      {carregando && <div className="py-3 text-sm font-medium text-[#055F6D]">Carregando dados do Supabase...</div>}
      <DashboardStats indicadores={indicadores} />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoughnutCard titulo="Zona de moradia" dados={zonasDados} />
        <DoughnutCard titulo="Faixa etária das pessoas" dados={faixasDados} />
        <CombinationCard titulo="Novos convertidos" dados={novosConvertidos} periodo={periodoConvertidos} setPeriodo={setPeriodoConvertidos} />
        <DoughnutCard titulo="Faixa etária das células" dados={faixasCelulas} />
        <ColumnChart titulo="Aniversariantes por mês" dados={aniversariosDados} />
      </div>
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Recentes titulo="Reuniões recentes das células" itens={relatoriosCelula.slice(0, 6)} render={(relatorio) => (
          <>
            <span className="font-bold text-slate-900">{relatorio.celulas?.nome || 'Célula'}</span>
            <span className="text-slate-400">{relatorio.data_reuniao ? new Date(`${relatorio.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}</span>
            <span className="text-emerald-700 font-bold">{Number(relatorio.visitantes_presentes || 0)} visitantes</span>
          </>
        )} />
        <Recentes titulo="Aniversariantes do mês" itens={aniversariantesMes.slice(0, 8)} render={(pessoa) => (
          <>
            <Avatar pessoa={pessoa} />
            <span className="font-bold text-slate-900">{pessoa.nome}</span>
            <span className="text-slate-400">{new Date(`${pessoa.data_nascimento}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
          </>
        )} />
      </div>
    </>
  );
}

function Recentes({ titulo, itens, render }) {
  return (
    <Card className="p-0">
      <CardHeader titulo={titulo} />
      {itens.length === 0 ? (
        <p className="py-6 px-5 text-sm text-[var(--text-muted)]">Nenhum registro encontrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-mib">
            <tbody>
              {itens.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="flex items-center gap-3 flex-wrap">{render(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function PessoasModulo(props) {
  const {
    submenu,
    pessoas,
    pessoasFiltradas,
    filtros,
    alterarFiltro,
    limparFiltros,
    zonas,
    cargosDisponiveis,
    atuacoesDisponiveis,
    escolaridadesDisponiveis,
    carregando,
    membroSelecionadoId,
    setMembroSelecionadoId,
    setSubmenu,
    obterDados,
    exportarCSV,
    exportarPDF,
    mesSelecionado,
    setMesSelecionado,
    grupoSelecionado,
    setGrupoSelecionado,
    abrirPessoasFiltradas,
    relatorioSelecionado,
    setRelatorioSelecionado,
    novoItem,
    setNovoItem,
    criarItemAuxiliar,
    cargosLista = [],
    atuacoesLista = [],
  } = props;

  if (membroSelecionadoId) {
    return (
      <DetalhesMembro
        pessoaId={membroSelecionadoId}
        onFechar={() => setMembroSelecionadoId(null)}
        listaPessoas={pessoas}
        cargosLista={cargosLista}
        atuacoesLista={atuacoesLista}
        onDadosAtualizados={obterDados}
      />
    );
  }

  if (submenu === 'adicionar') {
    return (
      <>
        <PageHeader titulo="Adicionar Pessoa"/>
        <FormularioCadastro onPessoaCadastrada={obterDados} listaPessoasExistentes={pessoas} cargosLista={cargosLista} atuacoesLista={atuacoesLista} />
      </>
    );
  }

  if (submenu === 'aniversariantes') {
    return <AniversariantesPessoas pessoas={pessoas} mesSelecionado={mesSelecionado} setMesSelecionado={setMesSelecionado} />;
  }

  if (submenu === 'cargo') {
    return (
      <AgrupamentoPessoas
        titulo="Cargos e Funções"
        criarTitulo="Criar Novo Cargo"
        tipo="cargos"
        campo="tipo_membro"
        itens={cargosLista.length ? cargosLista : cargosDisponiveis.map((n) => ({ id: n, nome: n }))}
        pessoas={pessoas}
        abrirPessoasFiltradas={abrirPessoasFiltradas}
        novoItem={novoItem}
        setNovoItem={setNovoItem}
        criarItemAuxiliar={criarItemAuxiliar}
      />
    );
  }

  if (submenu === 'zona') {
    return (
      <AgrupamentoPessoas
        titulo="Zonas de Moradia"
        criarTitulo="Criar Nova Zona de Moradia"
        tipo="zonas"
        campo="zona_id"
        itens={zonas}
        pessoas={pessoas}
        zonas={zonas}
        grupoSelecionado={grupoSelecionado}
        setGrupoSelecionado={setGrupoSelecionado}
        novoItem={novoItem}
        setNovoItem={setNovoItem}
        criarItemAuxiliar={criarItemAuxiliar}
        setMembroSelecionadoId={setMembroSelecionadoId}
        abrirPessoasFiltradas={abrirPessoasFiltradas}
      />
    );
  }

  if (submenu === 'atuacao') {
    return (
      <AgrupamentoPessoas
        titulo="Campo de Atuação"
        criarTitulo="Criar Campo de Atuação"
        tipo="atuacoes"
        campo="atuacao"
        itens={atuacoesLista.length ? atuacoesLista : atuacoesDisponiveis.map((n) => ({ id: n, nome: n }))}
        pessoas={pessoas}
        abrirPessoasFiltradas={abrirPessoasFiltradas}
        novoItem={novoItem}
        setNovoItem={setNovoItem}
        criarItemAuxiliar={criarItemAuxiliar}
      />
    );
  }

  if (submenu === 'relatorios') {
    return <RelatoriosPessoas pessoas={pessoas} zonas={zonas} abrirPessoasFiltradas={abrirPessoasFiltradas} relatorioSelecionado={relatorioSelecionado} setRelatorioSelecionado={setRelatorioSelecionado} />;
  }

  return (
    <>
      <PageHeader titulo="Pessoas">
        <button type="button" onClick={exportarCSV} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm">
          Exportar CSV
        </button>
        <button type="button" onClick={exportarPDF} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm">
          Exportar PDF
        </button>
        <button type="button" onClick={() => setSubmenu('adicionar')} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm">
          Adicionar Pessoa
        </button>
      </PageHeader>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        <Card className="p-0">
          <CardHeader
            titulo={`${pessoasFiltradas.length} membros cadastrados`}
            children={(
              <input type="search" value={filtros.busca} onChange={(e) => alterarFiltro('busca', e.target.value)} placeholder="Pesquisar pessoas" className="w-full md:w-72 rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#055F6D]/20" />
            )}
          />
          {carregando ? (
            <div className="p-10 text-center text-sm text-slate-400">Buscando dados no banco...</div>
          ) : (
            <TabelaPessoas pessoas={pessoasFiltradas} onSelecionar={setMembroSelecionadoId} />
          )}
        </Card>
        <FiltrosPessoas filtros={filtros} alterarFiltro={alterarFiltro} limparFiltros={limparFiltros} zonas={zonas} cargosDisponiveis={cargosDisponiveis} escolaridadesDisponiveis={escolaridadesDisponiveis} atuacoesDisponiveis={atuacoesDisponiveis} />
      </div>
    </>
  );
}

function TabelaPessoas({ pessoas, onSelecionar }) {
  if (!pessoas || pessoas.length === 0) {
    return <div className="p-10 text-center text-sm text-slate-400">Nenhuma pessoa corresponde aos filtros ativos.</div>;
  }

  const obterIniciais = (nome) => {
    if (!nome || typeof nome !== 'string') return '?';
    const partes = nome.trim().split(/\s+/);
    if (partes.length > 1) {
      return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
    }
    return partes[0] ? partes[0][0].toUpperCase() : '?';
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-mib">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo / Função</th>
            <th>Contato</th>
            <th>Célula</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => {
            if (!pessoa) return null;
            return (
              <tr 
                key={pessoa.id} 
                onClick={() => onSelecionar && onSelecionar(pessoa.id)}
                className="cursor-pointer"
              >
                <td>
                  <div className="flex items-center gap-3">
                    {/* Alteração aqui: Se haze foto_url, mostra a imagem; senão, mostra as iniciais */}
                    {pessoa.foto_url ? (
                      <img 
                        src={pessoa.foto_url} 
                        alt={pessoa.nome} 
                        className="h-9 w-9 shrink-0 rounded-xl object-cover border border-slate-100"
                        onError={(e) => { 
                          // Fallback caso o link da imagem quebre
                          e.target.style.display = 'none'; 
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    <div 
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600 uppercase"
                      style={{ display: pessoa.foto_url ? 'none' : 'flex' }}
                    >
                      {obterIniciais(pessoa.nome)}
                    </div>

                    <div>
                      <p className="font-semibold text-[var(--text-heading)]">{pessoa.nome || 'Sem nome cadastrado'}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">{pessoa.email || 'Sem e-mail'}</p>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-primary)]">
                    {pessoa.tipo_membro || 'Membro'}
                  </span>
                </td>

                <td className="text-xs font-medium text-[var(--text-muted)]">
                  {pessoa.telefone || 'Sem telefone'}
                </td>

                <td>
                  <span className={`text-xs font-semibold ${pessoa.celulas?.nome ? 'text-[#055F6D]' : 'text-[var(--text-muted)]'}`}>
                    {pessoa.celulas?.nome || '⛺ Sem Célula'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Avatar({ pessoa, tamanho = 'w-10 h-10' }) {
  return pessoa.foto_url ? (
    <img src={pessoa.foto_url} alt={pessoa.nome} className={`${tamanho} rounded-full object-cover border border-slate-200 bg-slate-100 shrink-0`} />
  ) : (
    <div className={`${tamanho} rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-300 shrink-0`}>
      {pessoa.nome ? pessoa.nome.charAt(0).toUpperCase() : '?'}
    </div>
  );
}

function FiltrosPessoas({ filtros, alterarFiltro, limparFiltros, zonas, cargosDisponiveis, escolaridadesDisponiveis, atuacoesDisponiveis }) {
  return (
    <Card className="p-5 space-y-4 h-fit">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <h3 className="font-semibold text-sm text-[var(--text-heading)] uppercase tracking-wider">Filtros</h3>
        <button type="button" onClick={limparFiltros} className="text-xs font-medium text-[#055F6D]">Limpar</button>
      </div>
      <SelectFiltro label="Gênero" valor={filtros.genero} onChange={(v) => alterarFiltro('genero', v)} opcoes={['Masculino', 'Feminino']} />
      <SelectFiltro label="Estado civil" valor={filtros.estadoCivil} onChange={(v) => alterarFiltro('estadoCivil', v)} opcoes={['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'Outro']} />
      <SelectFiltro label="Faixa etária" valor={filtros.faixaEtaria} onChange={(v) => alterarFiltro('faixaEtaria', v)} opcoes={faixasEtarias.map((f) => ({ valor: f.id, label: f.nome }))} />
      <SelectFiltro label="Zona de moradia" valor={filtros.zona} onChange={(v) => alterarFiltro('zona', v)} opcoes={zonas.map((z) => ({ valor: z.id, label: z.nome }))} />
      <SelectFiltro label="Cargo" valor={filtros.cargo} onChange={(v) => alterarFiltro('cargo', v)} opcoes={cargosDisponiveis} />
      <SelectFiltro label="Escolaridade" valor={filtros.escolaridade} onChange={(v) => alterarFiltro('escolaridade', v)} opcoes={escolaridadesDisponiveis} />
      <SelectFiltro label="Campo de Atuação" valor={filtros.atuacao} onChange={(v) => alterarFiltro('atuacao', v)} opcoes={atuacoesDisponiveis} />
      <SelectFiltro label="Batizado nas Águas?" valor={filtros.batizado} onChange={(v) => alterarFiltro('batizado', v)} opcoes={[{ valor: 'sim', label: 'Sim' }, { valor: 'nao', label: 'Não' }]} />
    </Card>
  );
}

function SelectFiltro({ label, valor, onChange, opcoes }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>
      <select value={valor} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 bg-white">
        <option value="">Todos</option>
        {opcoes.map((o) => {
          const itemValor = typeof o === 'object' ? o.valor : o;
          const itemLabel = typeof o === 'object' ? o.label : o;
          return <option key={itemValor} value={itemValor}>{itemLabel}</option>;
        })}
      </select>
    </div>
  );
}

function AniversariantesPessoas({ pessoas, mesSelecionado, setMesSelecionado }) {
  const contagemMeses = meses.map((_, index) =>
    pessoas.filter((p) => p.data_nascimento && new Date(`${p.data_nascimento}T00:00:00`).getMonth() === index).length
  );
  const aniversariantes = useMemo(() => {
    return pessoas.filter((p) => p.data_nascimento && new Date(`${p.data_nascimento}T00:00:00`).getMonth() === mesSelecionado)
      .sort((a, b) => new Date(`${a.data_nascimento}T00:00:00`).getDate() - new Date(`${b.data_nascimento}T00:00:00`).getDate());
  }, [pessoas, mesSelecionado]);

  return (
    <>
      <PageHeader titulo="Aniversariantes" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {meses.map((mes, index) => (
          <button key={mes} type="button" onClick={() => setMesSelecionado(index)} className={`rounded-2xl border p-4 text-left shadow-sm transition ${mesSelecionado === index ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-200'}`}>
            <span className="block text-xs font-semibold uppercase tracking-wider opacity-70">{mes}</span>
            <span className="block mt-2 text-2xl font-bold">{contagemMeses[index]}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-100">
        {aniversariantes.length === 0 ? (
          <div className="p-8 text-sm text-slate-400">Nenhum aniversariante neste mês.</div>
        ) : (
          aniversariantes.map((pessoa) => (
            <div key={pessoa.id} className="p-4 flex items-center gap-3">
              <Avatar pessoa={pessoa} />
              <div>
                <p className="font-bold text-slate-900">{pessoa.nome}</p>
                <p className="text-xs text-slate-400">{new Date(`${pessoa.data_nascimento}T00:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function AgrupamentoPessoas({ titulo, criarTitulo, tipo, campo, itens, pessoas, novoItem, setNovoItem, criarItemAuxiliar, abrirPessoasFiltradas }) {
  const lista = itens.map((item) => (typeof item === 'object' ? item : { id: item, nome: item }));
  const filtroDoItem = (item) => {
    if (campo === 'zona_id') return { zona: item.id };
    if (campo === 'atuacao') return { atuacao: item.nome };
    return { cargo: item.nome };
  };

  return (
    <>
      <PageHeader titulo={titulo} subtitulo="Cadastre itens e consulte quantas pessoas estão vinculadas a cada um.">
        <div className="flex w-full max-w-lg gap-2">
          <input
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
            placeholder={criarTitulo}
            className="min-w-0 flex-1 rounded-xl border border-[var(--border)] px-3 py-2 text-sm"
          />
          <button type="button" onClick={() => criarItemAuxiliar(tipo)} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl shrink-0">
            ＋ Cadastrar
          </button>
        </div>
      </PageHeader>
      <Card className="p-0 overflow-hidden">
        {lista.length === 0 ? (
          <p className="p-10 text-center text-sm text-[var(--text-muted)]">Nenhum item cadastrado. Use o campo acima para adicionar.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-mib">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Vinculados</th>
                  <th className="text-right">Ação</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item) => {
                  const contagem = pessoas.filter((p) => String(p[campo] || '') === String(item.id || item.nome)).length;
                  return (
                    <tr key={item.id || item.nome}>
                      <td className="font-medium text-[var(--text-heading)]">{item.nome}</td>
                      <td>{contagem}</td>
                      <td className="text-right">
                        <button type="button" onClick={() => abrirPessoasFiltradas(filtroDoItem(item))} className="text-xs font-medium text-[#055F6D] hover:underline">
                          Ver pessoas
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}

function RelatoriosPessoas({ pessoas, zonas, abrirPessoasFiltradas, relatorioSelecionado, setRelatorioSelecionado }) {
  const botoes = [
    'Cargos',
    'Faixa etaria',
    'Aniversarios',
    'Sexo',
    'Estado civil',
    'Batismo',
    'Data de conversao',
    'Bairro',
    'Campo de Atuacao',
    'Permissoes',
    'Zona de moradia'
  ];
  const dados = agrupamentoPor(pessoas, (p) => valorCampoRelatorio(p, relatorioSelecionado, zonas));
  const pessoasComPermissao = pessoas.filter((p) => p.permissao || ['admin', 'pastor', 'lider', 'secretaria', 'tesouraria'].includes(normalizarTexto(p.tipo_membro)));

  return (
    <>
      <PageHeader titulo="Relatórios de Pessoas" subtitulo="Escolha uma categoria para ver o resumo, a tabela e abrir a lista filtrada de pessoas." />
      <div className="mb-5 flex flex-wrap gap-2">
        {botoes.map((botao) => (
          <button key={botao} type="button" onClick={() => setRelatorioSelecionado(botao)} className={`rounded-xl px-4 py-2 text-xs font-medium transition ${relatorioSelecionado === botao ? 'bg-[#055F6D] text-white' : 'bg-white text-[var(--text-primary)] shadow-sm hover:bg-[var(--surface-muted)]'}`} >
            {botao}
          </button>
        ))}
      </div>
      {relatorioSelecionado === 'Permissoes' ? (
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Pessoas com permissões ao sistema</h3>
          <div className="mt-4 divide-y divide-slate-100">
            {pessoasComPermissao.length === 0 ? (
              <p className="py-6 text-sm text-slate-400">Nenhuma permissão identificada.</p>
            ) : (
              pessoasComPermissao.map((pessoa) => (
                <div key={pessoa.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar pessoa={pessoa} />
                    <div>
                      <p className="font-bold text-slate-900">{pessoa.nome}</p>
                      <p className="text-xs text-slate-400">{pessoa.permissao || pessoa.tipo_membro || 'Membro'}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => abrirPessoasFiltradas({ relatorioCampo: 'Permissoes', relatorioValor: pessoa.permissao || pessoa.tipo_membro || 'Membro' })} className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                    Ver pessoas
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 items-start">
          <ColumnChart titulo={`Indicadores: ${relatorioSelecionado}`} dados={dados} />
          <Card className="p-0 overflow-hidden">
            <CardHeader titulo="Detalhamento por classificação" />
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead>
                  <tr>
                    <th>Classificação</th>
                    <th>Cadastrados</th>
                    <th className="text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(dados).sort((a, b) => b[1] - a[1]).map(([label, valor]) => (
                    <tr key={label}>
                      <td className="font-medium text-[var(--text-heading)]">{label}</td>
                      <td className="text-[var(--text-muted)]">{valor} pessoas</td>
                      <td className="text-right">
                        <button type="button" onClick={() => abrirPessoasFiltradas({ relatorioCampo: relatorioSelecionado, relatorioValor: label })} className="text-xs font-medium text-[#055F6D] hover:underline">Ver lista</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

function ReunioesCelulas({ celulas, pessoas, relatoriosCelula, obterDados }) {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <PageHeader titulo="Reuniões realizadas" subtitulo="Histórico de encontros cadastrados pelas células.">
        <button type="button" onClick={() => setModalAberto(true)} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl">
          + Adicionar Reunião
        </button>
      </PageHeader>
      <Card className="p-0 overflow-hidden">
        <CardHeader titulo={`${relatoriosCelula.length} reuniões no histórico`} />
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="table-mib">
            <thead>
              <tr>
                <th>Data</th>
                <th>Célula</th>
                <th>Visitantes</th>
                <th>Oferta</th>
              </tr>
            </thead>
            <tbody>
              {relatoriosCelula.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-[var(--text-muted)] italic">Nenhuma reunião cadastrada.</td>
                </tr>
              ) : (
                relatoriosCelula.map((r) => (
                  <tr key={r.id}>
                    <td className="font-medium">{r.data_reuniao ? new Date(`${r.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : '—'}</td>
                    <td>{r.celulas?.nome || '—'}</td>
                    <td>{Number(r.visitantes_presentes || 0)}</td>
                    <td>R$ {valorOfertaRelatorio(r).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      {modalAberto && (
        <ModalLancarReuniao celulas={celulas} pessoas={pessoas} onFechar={() => setModalAberto(false)} onSalvo={obterDados} />
      )}
    </>
  );
}

function CelulasModulo({ submenu, celulas, celulasFiltradas, filtrosCelula, alterarFiltroCelula, limparFiltros, pessoas, zonas, relatoriosCelula, celulaSelecionadaId, setCelulaSelecionadaId, obterDados }) {
  if (celulaSelecionadaId) {
    const celula = celulas.find((item) => String(item.id) === String(celulaSelecionadaId));
    return (
      <DetalhesCelula celula={celula} pessoas={pessoas} zonas={zonas} relatoriosCelula={relatoriosCelula} onFechar={() => setCelulaSelecionadaId(null)} obterDados={obterDados} />
    );
  }

  if (submenu === 'adicionar') {
    return (
      <>
        <PageHeader titulo="Adicionar Nova Célula" subtitulo="Cadastro da célula com liderança, agenda, endereço, zona e anotações." />
        <FormularioCelula onCelulaCadastrada={obterDados} />
      </>
    );
  }

  if (submenu === 'reunioes') {
    return (
      <ReunioesCelulas
        celulas={celulas}
        pessoas={pessoas}
        relatoriosCelula={relatoriosCelula}
        obterDados={obterDados}
      />
    );
  }

  return (
    <>
      <PageHeader titulo="Células"/>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        <Card className="p-0">
          <CardHeader
            titulo={`${celulasFiltradas.length} células cadastradas`}
          />
          {celulasFiltradas.length === 0 ? (
            <div className="p-10 text-center text-sm text-[var(--text-muted)]">Nenhuma célula encontrada.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead>
                  <tr>
                    <th>Célula</th>
                    <th>Líder</th>
                    <th>Agenda</th>
                    <th>Membros</th>
                  </tr>
                </thead>
                <tbody>
                  {celulasFiltradas.map((celula) => {
                    const membros = pessoas.filter((p) => String(p.celula_id || '') === String(celula.id));
                    return (
                      <tr key={celula.id} onClick={() => setCelulaSelecionadaId(celula.id)} className="cursor-pointer">
                        <td>
                          <div className="flex items-center gap-3">
                            <AvatarCelula celula={celula} />
                            <span className="font-semibold text-[var(--text-heading)]">{celula.nome}</span>
                          </div>
                        </td>
                        <td>{nomePessoa(pessoas, celula.lider_id)}</td>
                        <td className="text-[var(--text-muted)]">{celula.dia_semana || 'Sem dia'} · {celula.horario || '—'}</td>
                        <td><span className="text-xs font-semibold text-[#055F6D]">{membros.length} vinculados</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        <Card className="p-5 space-y-4 h-fit">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h3 className="font-semibold text-sm text-[var(--text-heading)] uppercase tracking-wider">Filtros</h3>
            <button type="button" onClick={limparFiltros} className="text-xs font-medium text-[#055F6D]">Limpar</button>
          </div>
          <SelectFiltro label="Perfil / Público" valor={filtrosCelula.faixaEtaria} onChange={(v) => alterarFiltroCelula('faixaEtaria', v)} opcoes={['Mista', 'Adultos', 'Jovens', 'Adolescentes', 'Crianças', 'Casais', 'Empresarial']} />
          <SelectFiltro label="Gênero" valor={filtrosCelula.genero} onChange={(v) => alterarFiltroCelula('genero', v)} opcoes={['Mista', 'Masculina', 'Feminina']} />
          <SelectFiltro label="Dia da semana" valor={filtrosCelula.diaSemana} onChange={(v) => alterarFiltroCelula('diaSemana', v)} opcoes={['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']} />
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Horário</label>
            <input type="time" value={filtrosCelula.horario} onChange={(e) => alterarFiltroCelula('horario', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
          </div>
        </Card>
      </div>
    </>
  );
}


function DetalhesCelula({ celula, pessoas, zonas, relatoriosCelula, onFechar, obterDados }) {
  if (!celula) return <div className="p-8 bg-white rounded-2xl border border-slate-200">Celula nao encontrada.</div>;

  // Estados de Controle Geral e Membros
  const [pessoasSelecionadas, setPessoasSelecionadas] = useState([]);
  const [salvandoModal, setSalvandoModal] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);
  const [listaAberta, setListaAberta] = useState(true); 
  const [isModalAberto, setIsModalAberto] = useState(false);
  const [isModalVerReuniaoAberto, setIsModalVerReuniaoAberto] = useState(false);
  const [reuniaoSelecionada, setReuniaoSelecionada] = useState(null); 

  // ESTADOS DO MODAL: LANÇAR ENCONTRO
  const [isModalReuniaoAberto, setIsModalReuniaoAberto] = useState(false);
  const [dataReuniao, setDataReuniao] = useState(new Date().toISOString().split('T')[0]);
  const [oferta, setOferta] = useState(0);
  const [temaMinistrado, setTemaMinistrado] = useState(''); // NOVO ESTADO PARA O TEMA
  const [obs, setObs] = useState('');
  const [presencas, setPresencas] = useState({}); // Mapeia { membroId: true/false }
  const [enviandoReuniao, setEnviandoReuniao] = useState(false);

  // ESTADOS PARA VISITANTES DINÂMICOS
  const [nomesVisitantes, setNomesVisitantes] = useState([]);
  const [novoVisitante, setNovoVisitante] = useState('');

  // Estados do modal de edição (Histórico de Reuniões)
  const [editData, setEditData] = useState('');
  const [editOferta, setEditOferta] = useState(0);
  const [editTema, setEditTema] = useState('');
  const [editObservacoes, setEditObservacoes] = useState('');
  const [editPresencas, setEditPresencas] = useState({});
  const [editNomesVisitantes, setEditNomesVisitantes] = useState([]);
  const [editNovoVisitante, setEditNovoVisitante] = useState('');
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  const [imagemPreview, setImagemPreview] = useState(celula.imagem_url || '');
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [salvandoImagem, setSalvandoImagem] = useState(false);

  const membros = pessoas.filter((pessoa) => String(pessoa.celula_id || '') === String(celula.id));
  const relatorios = relatoriosCelula.filter((relatorio) => String(relatorio.celula_id || '') === String(celula.id));
  const celulasFilhas = [];

  // Lista de pessoas disponíveis para o primeiro modal (Vincular Membros)
  const pessoasDisponiveis = useMemo(() => {
    return pessoas.filter((pessoa) => String(pessoa.celula_id || '') !== String(celula.id));
  }, [pessoas, celula.id]);

  // Inicializa os presenças marcadas como 'true' por padrão
  useEffect(() => {
    if (isModalReuniaoAberto) {
      const iniciaPresencas = {};
      membros.forEach(m => {
        iniciaPresencas[m.id] = true;
      });
      setPresencas(iniciaPresencas);
      setNomesVisitantes([]); 
      setNovoVisitante('');
      setTemaMinistrado(''); // Reseta o tema ao abrir o modal
    }
  }, [isModalReuniaoAberto]);

  function handleAdicionarVisitante() {
    const nome = novoVisitante.trim();
    if (!nome) return;
    setNomesVisitantes((prev) => [...prev, nome]);
    setNovoVisitante('');
  }

  function handleRemoverVisitanteLista(index) {
    setNomesVisitantes((prev) => prev.filter((_, i) => i !== index));
  }

  function togglePresencaMembro(membroId) {
    setPresencas((prev) => ({ ...prev, [membroId]: !prev[membroId] }));
  }

  function handleAdicionarVisitanteEdicao() {
    const nome = editNovoVisitante.trim();
    if (!nome) return;
    setEditNomesVisitantes((prev) => [...prev, nome]);
    setEditNovoVisitante('');
  }

  function handleRemoverVisitanteEdicao(index) {
    setEditNomesVisitantes((prev) => prev.filter((_, i) => i !== index));
  }

  function togglePresencaEdicao(membroId) {
    setEditPresencas((prev) => ({ ...prev, [membroId]: !prev[membroId] }));
  }

  async function handleVerReuniao(relatorio) {
    setReuniaoSelecionada(relatorio);

    const { observacao, tema, nomesVisitantes } = extrairMetadadosReuniao(relatorio.observacoes);
    setEditData(relatorio.data_reuniao || '');
    setEditOferta(valorOfertaRelatorio(relatorio));
    setEditTema(tema);
    setEditObservacoes(observacao);
    setEditNomesVisitantes(nomesVisitantes);
    setEditNovoVisitante('');

    const presencasIniciais = {};
    membros.forEach((m) => {
      presencasIniciais[m.id] = false;
    });

    const { data: presencasSalvas, error: erroPresencas } = await supabase
      .from('presencas_relatorio')
      .select('pessoa_id')
      .eq('relatorio_id', relatorio.id);

    if (!erroPresencas && presencasSalvas?.length > 0) {
      presencasSalvas.forEach((p) => {
        presencasIniciais[p.pessoa_id] = true;
      });
    } else {
      membros.forEach((m) => {
        presencasIniciais[m.id] = true;
      });
    }

    setEditPresencas(presencasIniciais);
    setIsModalVerReuniaoAberto(true);
  }

  async function handleAtualizarReuniao(e) {
    e.preventDefault();
    if (!reuniaoSelecionada) return;

    setSalvandoEdicao(true);
    try {
      const observacoesFinal = montarObservacoesComMetadados(editObservacoes, editTema, editNomesVisitantes);
      const { error } = await supabase
        .from('relatorios_celula')
        .update({
          data_reuniao: editData,
          visitantes_presentes: editNomesVisitantes.length,
          oferta: Number(editOferta) || 0,
          observacoes: observacoesFinal,
        })
        .eq('id', reuniaoSelecionada.id);

      if (error) throw error;

      await supabase.from('presencas_relatorio').delete().eq('relatorio_id', reuniaoSelecionada.id);

      const idsPresentes = Object.keys(editPresencas).filter((id) => editPresencas[id]);
      if (idsPresentes.length > 0) {
        const dadosPresenca = idsPresentes.map((idPessoa) => ({
          relatorio_id: reuniaoSelecionada.id,
          pessoa_id: idPessoa,
        }));
        const { error: erroPresenca } = await supabase.from('presencas_relatorio').insert(dadosPresenca);
        if (erroPresenca) throw erroPresenca;
      }

      if (obterDados) await obterDados();
      setIsModalVerReuniaoAberto(false);
      setReuniaoSelecionada(null);
    } catch (error) {
      console.error(error);
      window.alert(`Erro ao atualizar reunião: ${error.message}`);
    } finally {
      setSalvandoEdicao(false);
    }
  }

  async function handleSalvarReuniao(e) {
    e.preventDefault();
    setEnviandoReuniao(true);

    try {
      const observacoesFinal = montarObservacoesComMetadados(obs, temaMinistrado, nomesVisitantes);
      const { data: relatorioCriado, error } = await supabase
        .from('relatorios_celula')
        .insert([
          {
            celula_id: celula.id,
            data_reuniao: dataReuniao,
            visitantes_presentes: nomesVisitantes.length,
            oferta: Number(oferta) || 0,
            observacoes: observacoesFinal,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const idsPresentes = Object.keys(presencas).filter((id) => presencas[id]);
      if (idsPresentes.length > 0) {
        const dadosPresenca = idsPresentes.map((idPessoa) => ({
          relatorio_id: relatorioCriado.id,
          pessoa_id: idPessoa,
        }));
        const { error: erroPresenca } = await supabase.from('presencas_relatorio').insert(dadosPresenca);
        if (erroPresenca) throw erroPresenca;
      }

      if (obterDados) await obterDados();
      setIsModalReuniaoAberto(false);
      setDataReuniao(new Date().toISOString().split('T')[0]);
      setOferta(0);
      setTemaMinistrado('');
      setObs('');
      setNomesVisitantes([]);
      setNovoVisitante('');
    } catch (error) {
      console.error(error);
      window.alert(`Erro ao salvar reunião: ${error.message}`);
    } finally {
      setEnviandoReuniao(false);
    }
  }

  async function handleSalvarMembrosModal(e) {
    e.preventDefault();
    if (pessoasSelecionadas.length === 0) return;

    setSalvandoModal(true);
    try {
      const { error } = await supabase.from('pessoas').update({ celula_id: celula.id }).in('id', pessoasSelecionadas);
      if (error) throw error;
      if (obterDados) await obterDados();
      setIsModalAberto(false);
      setPessoasSelecionadas([]);
    } catch (error) {
      console.error(error);
      window.alert(`Erro ao vincular membros: ${error.message}`);
    } finally {
      setSalvandoModal(false);
    }
  }

  const handleCheckboxChange = (pessoaId) => {
    setPessoasSelecionadas((prev) => prev.includes(pessoaId) ? prev.filter((id) => id !== pessoaId) : [...prev, pessoaId]);
  };

  async function handleRemoverPessoa(pessoaId, nomePessoa) {
    if (!window.confirm(`Tem certeza que deseja remover ${nomePessoa} desta célula?`)) return;
    setExcluindoId(pessoaId);
    try {
      const { error } = await supabase.from('pessoas').update({ celula_id: null }).eq('id', pessoaId);
      if (error) throw error;
      if (obterDados) await obterDados();
    } catch (error) {
      console.error(error);
    } finally {
      setExcluindoId(null);
    }
  }

  function handleSelecionarImagem(e) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    setArquivoImagem(arquivo);
    setImagemPreview(URL.createObjectURL(arquivo));
  }

  async function handleSalvarImagemCelula() {
    if (!arquivoImagem) return;
    setSalvandoImagem(true);
    try {
      let url;
      try {
        url = await uploadImagemCelula(arquivoImagem, celula.id);
      } catch (erroStorage) {
        throw new Error(`Upload no Storage: ${erroStorage.message}`);
      }

      const { error } = await supabase.from('celulas').update({ imagem_url: url }).eq('id', celula.id);
      if (error) {
        throw new Error(
          error.message?.includes('row-level security')
            ? `Banco (tabela celulas): ${error.message}. Execute supabase/politicas-imagem-celula.sql no Supabase.`
            : `Banco (tabela celulas): ${error.message}`
        );
      }

      setImagemPreview(url);
      setArquivoImagem(null);
      if (obterDados) await obterDados();
    } catch (error) {
      console.error(error);
      window.alert(`Erro ao salvar imagem: ${error.message}`);
    } finally {
      setSalvandoImagem(false);
    }
  }

  return (
    <>
      <PageHeader titulo={celula.nome} subtitulo="Ficha completa da celula com lideranca, membros, reunioes e geracoes.">
        <button type="button" onClick={onFechar} className="px-4 py-2 rounded-xl btn-primary text-xs font-semibold">Voltar</button>
      </PageHeader>
      
      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-5">
        <aside className="space-y-4">
          <Card className="p-0">
            <CardHeader titulo="Identidade da célula" />
            <div className="p-5 space-y-4">
              <div className="flex justify-center">
                {imagemPreview ? (
                  <img src={imagemPreview} alt={celula.nome} className="w-28 h-28 rounded-2xl object-cover border border-[var(--border)]" />
                ) : (
                  <AvatarCelula celula={celula} tamanho="w-28 h-28" />
                )}
              </div>
              <label className="block w-full text-center text-xs font-medium text-[#055F6D] cursor-pointer hover:underline">
                {arquivoImagem ? 'Trocar imagem selecionada' : 'Adicionar ou alterar imagem'}
                <input type="file" accept="image/*" onChange={handleSelecionarImagem} className="hidden" />
              </label>
              {arquivoImagem && (
                <button
                  type="button"
                  onClick={handleSalvarImagemCelula}
                  disabled={salvandoImagem}
                  className="w-full py-2 rounded-xl btn-primary text-xs font-semibold disabled:opacity-50"
                >
                  {salvandoImagem ? 'Salvando imagem...' : 'Salvar imagem da célula'}
                </button>
              )}
            </div>
          </Card>

          <Card className="p-0">
            <CardHeader titulo="Lideranca" />
            <div className="p-5 space-y-3 text-sm">
              <InfoLinha label="Lider" valor={nomePessoa(pessoas, celula.lider_id)} />
              <InfoLinha label="Co-Lider" valor={nomePessoa(pessoas, celula.co_lider_id)} />
              <InfoLinha label="Auxiliar" valor={nomePessoa(pessoas, celula.auxiliar_id)} />
            </div>
          </Card>

          <Card className="p-0">
            <CardHeader titulo="Agenda e Local" />
            <div className="p-5 space-y-3 text-sm">
              <InfoLinha label="Dia da Semana" valor={celula.dia_semana || 'Nao informado'} />
              <InfoLinha label="Horario" valor={celula.horario || 'Nao informado'} />
              <InfoLinha label="Zona" valor={nomeZona(zonas, celula.zona_id)} />
              <InfoLinha label="Bairro" valor={celula.bairro || 'Nao informado'} />
              <InfoLinha label="Endereco" valor={`${celula.endereco || ''}, ${celula.numero || ''}`} />
            </div>
          </Card>
        </aside>

        <section className="space-y-5">
          <Card className="p-0">
            <CardHeader
              titulo={(
                <span className="flex items-center gap-2 cursor-pointer" onClick={() => setListaAberta(!listaAberta)} onKeyDown={() => {}} role="button" tabIndex={0}>
                  Pessoas na célula
                  <span className="text-xs bg-[var(--brand-light)] text-[#055F6D] px-2 py-0.5 rounded-full font-medium">{membros.length}</span>
                  <span className="text-[var(--text-muted)] text-xs font-normal">{listaAberta ? '▲' : '▼'}</span>
                </span>
              )}
              subtitulo="Gerenciamento de membros vinculados diretamente."
              children={pessoasDisponiveis.length > 0 ? (
                <button type="button" onClick={() => setIsModalAberto(true)} className="btn-primary text-xs font-semibold px-3 py-1.5 rounded-xl shrink-0 whitespace-nowrap">
                  + Adicionar Pessoas
                </button>
              ) : null}
            />

            {listaAberta && (
              <div className="overflow-x-auto max-h-60">
                {membros.length === 0 ? (
                  <p className="p-5 text-sm text-[var(--text-muted)] italic">Nenhum membro vinculado a esta célula ainda.</p>
                ) : (
                  <table className="table-mib">
                    <thead>
                      <tr>
                        <th>Membro</th>
                        <th>Função</th>
                        <th className="text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {membros.map((membro) => (
                        <tr key={membro.id} className="group">
                          <td>
                            <div className="flex items-center gap-3">
                              <Avatar pessoa={membro} tamanho="w-8 h-8" />
                              <span className="font-medium text-[var(--text-heading)] text-sm">{membro.nome}</span>
                            </div>
                          </td>
                          <td className="text-[var(--text-muted)] text-xs">{membro.tipo_membro || 'Membro'}</td>
                          <td className="text-right">
                            <button
                              type="button"
                              disabled={excluindoId === membro.id}
                              onClick={() => handleRemoverPessoa(membro.id, membro.nome)}
                              className="p-1.5 text-[var(--text-muted)] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition disabled:opacity-50"
                              title="Remover da célula"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </Card>

          <Card className="p-0">
            <CardHeader
              titulo="Histórico de reuniões"
              subtitulo="Relatórios de encontros anteriores desta célula."
              children={(
                <button type="button" onClick={() => setIsModalReuniaoAberto(true)} className="btn-primary text-xs font-semibold px-3 py-1.5 rounded-xl shrink-0 whitespace-nowrap">
                  📅 Nova Reunião
                </button>
              )}
            />

            <div className="max-h-80 overflow-y-auto">
              {relatorios.length === 0 ? (
                <p className="p-5 text-sm text-[var(--text-muted)] italic">Nenhum relatório enviado para esta célula.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table-mib">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Visitantes</th>
                        <th>Oferta</th>
                        <th className="text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {relatorios.map((relatorio) => (
                        <tr 
                          key={relatorio.id} 
                          onClick={() => handleVerReuniao(relatorio)}
                          className="hover:bg-slate-50 cursor-pointer transition"
                        >
                          <td className="font-medium text-[var(--text-heading)]">
                            {relatorio.data_reuniao ? new Date(`${relatorio.data_reuniao}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}
                          </td>
                          <td>
                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                              {Number(relatorio.visitantes_presentes || 0)} visitantes
                            </span>
                          </td>
                          <td className="text-[var(--text-primary)]">
                            R$ {valorOfertaRelatorio(relatorio).toFixed(2)}
                          </td>
                          <td className="text-right">
                            <button 
                              type="button" 
                              className="text-xs font-bold text-blue-600 hover:text-blue-800"
                              onClick={(e) => {
                                e.stopPropagation(); 
                                handleVerReuniao(relatorio);
                              }}
                            >
                              Visualizar e Editar 🔍
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-0">
            <CardHeader titulo="Celulas filhas" />
            <p className="p-5 text-sm text-[var(--text-muted)]">{celulasFilhas.length ? `${celulasFilhas.length} geracoes cadastradas.` : 'Nenhuma geracao vinculada a esta celula.'}</p>
          </Card>
        </section>
      </div>

      {/* MODAL 1: SELEÇÃO E VÍNCULO DE MEMBROS */}
      {isModalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h4 className="font-semibold text-slate-950 text-base">Vincular Pessoas</h4>
                <p className="text-xs text-slate-400">Selecione os membros que deseja trazer para a célula <strong>{celula.nome}</strong>.</p>
              </div>
              <button type="button" onClick={() => { setIsModalAberto(false); setPessoasSelecionadas([]); }} className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm">✕</button>
            </div>
            <form onSubmit={handleSalvarMembrosModal} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-5 overflow-y-auto space-y-2 flex-1 max-h-64">
                {pessoasDisponiveis.map((p) => {
                  const estaMarcado = pessoasSelecionadas.includes(p.id);
                  return (
                    <label key={p.id} className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold cursor-pointer select-none transition ${estaMarcado ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={estaMarcado} onChange={() => handleCheckboxChange(p.id)} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                        <span>{p.nome}</span>
                      </div>
                      {p.celulas?.nome && <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md font-normal">vindo de: {p.celulas.nome}</span>}
                    </label>
                  );
                })}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => { setIsModalAberto(false); setPessoasSelecionadas([]); }} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700">Cancelar</button>
                <button type="submit" disabled={salvandoModal || pessoasSelecionadas.length === 0} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition disabled:bg-slate-200 disabled:text-slate-400 shadow-sm">
                  Salvar e Vincular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR REUNIÃO DO HISTÓRICO (mesmos campos do formulário Nova Reunião) */}
      {isModalVerReuniaoAberto && reuniaoSelecionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h4 className="font-semibold text-slate-950 text-base">Editar Reunião do Histórico</h4>
                <p className="text-xs text-slate-400">
                  Ajuste os dados do encontro da célula <strong className="text-emerald-700">{celula.nome}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setIsModalVerReuniaoAberto(false); setReuniaoSelecionada(null); }}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAtualizarReuniao} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-5 overflow-y-auto space-y-4 flex-1">

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Data da Reunião</label>
                    <input
                      type="date"
                      value={editData}
                      onChange={(e) => setEditData(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Tema / Assunto</label>
                    <input
                      type="text"
                      value={editTema}
                      onChange={(e) => setEditTema(e.target.value)}
                      placeholder="Ex: Fruto do Espírito"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Valor da Oferta (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editOferta}
                      onChange={(e) => setEditOferta(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Visitantes Presentes
                      <span className="ml-2 bg-amber-500 text-white font-semibold px-2 py-0.5 rounded-md text-[10px]">
                        Contagem: {editNomesVisitantes.length}
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editNovoVisitante}
                        onChange={(e) => setEditNovoVisitante(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdicionarVisitanteEdicao(); } }}
                        placeholder="Digite o nome completo do visitante"
                        className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-slate-800 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={handleAdicionarVisitanteEdicao}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition shrink-0"
                      >
                        + Adicionar
                      </button>
                    </div>
                  </div>

                  {editNomesVisitantes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {editNomesVisitantes.map((nome, index) => (
                        <div key={index} className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 shadow-sm">
                          👤 {nome}
                          <button type="button" onClick={() => handleRemoverVisitanteEdicao(index)} className="text-slate-400 hover:text-rose-500 font-bold text-[12px] pl-0.5">×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lista de Presença dos Membros</label>
                  <div className="border border-slate-100 rounded-xl divide-y divide-slate-50 max-h-40 overflow-y-auto p-2 bg-slate-50/50">
                    {membros.length === 0 ? (
                      <p className="text-xs text-slate-400 italic p-2">Nenhum membro vinculado para fazer a chamada.</p>
                    ) : (
                      membros.map((m) => {
                        const isPresente = !!editPresencas[m.id];
                        return (
                          <div
                            key={m.id}
                            onClick={() => togglePresencaEdicao(m.id)}
                            className="flex items-center justify-between py-2 px-3 hover:bg-white rounded-lg cursor-pointer transition select-none"
                          >
                            <span className="text-xs font-semibold text-slate-800">{m.nome}</span>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md tracking-wider ${isPresente ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                              {isPresente ? '✅ PRESENTE' : '❌ AUSENTE'}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Observações / Testemunhos</label>
                  <textarea
                    value={editObservacoes}
                    onChange={(e) => setEditObservacoes(e.target.value)}
                    rows="2"
                    placeholder="Escreva como foi o mover de Deus na célula, decisões..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setIsModalVerReuniaoAberto(false); setReuniaoSelecionada(null); }}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvandoEdicao}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition disabled:bg-slate-300 shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  {salvandoEdicao ? 'Salvando...' : '💾 Salvar Alterações'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 2: LANÇAR ENCONTRO DA CÉLULA */}
      {isModalReuniaoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h4 className="font-semibold text-slate-950 text-base">Lançar Encontro da Célula</h4>
                <p className="text-xs text-slate-400">Preencha os dados da reunião para a célula: <strong className="text-emerald-700">{celula.nome}</strong></p>
              </div>
              <button type="button" onClick={() => setIsModalReuniaoAberto(false)} className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm">✕</button>
            </div>

            <form onSubmit={handleSalvarReuniao} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Data da Reunião</label>
                    <input 
                      type="date" 
                      value={dataReuniao} 
                      onChange={e => setDataReuniao(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    />
                  </div>
                  
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Tema / Assunto</label>
                    <input 
                      type="text" 
                      value={temaMinistrado} 
                      onChange={e => setTemaMinistrado(e.target.value)}
                      placeholder="Ex: Fruto do Espírito"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Valor da Oferta (R$)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="0"
                      value={oferta} 
                      onChange={e => setOferta(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Visitantes Presentes 
                      <span className="ml-2 bg-amber-500 text-white font-semibold px-2 py-0.5 rounded-md text-[10px]">
                        Contagem: {nomesVisitantes.length}
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={novoVisitante} 
                        onChange={e => setNovoVisitante(e.target.value)}
                        placeholder="Digite o nome completo do visitante"
                        className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-slate-800 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                      />
                      <button
                        type="button"
                        onClick={handleAdicionarVisitante}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition shrink-0"
                      >
                        + Adicionar
                      </button>
                    </div>
                  </div>

                  {nomesVisitantes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {nomesVisitantes.map((nome, index) => (
                        <div key={index} className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 shadow-sm">
                          👤 {nome}
                          <button type="button" onClick={() => handleRemoverVisitanteLista(index)} className="text-slate-400 hover:text-rose-500 font-bold text-[12px] pl-0.5">×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lista de Presença dos Membros</label>
                  <div className="border border-slate-100 rounded-xl divide-y divide-slate-50 max-h-40 overflow-y-auto p-2 bg-slate-50/50">
                    {membros.length === 0 ? (
                      <p className="text-xs text-slate-400 italic p-2">Nenhum membro vinculado para fazer a chamada.</p>
                    ) : (
                      membros.map(m => {
                        const isPresente = !!presencas[m.id];
                        return (
                          <div 
                            key={m.id} 
                            onClick={() => togglePresencaMembro(m.id)}
                            className="flex items-center justify-between py-2 px-3 hover:bg-white rounded-lg cursor-pointer transition select-none"
                          >
                            <span className="text-xs font-semibold text-slate-800">{m.nome}</span>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md tracking-wider ${isPresente ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                              {isPresente ? '✅ PRESENTE' : '❌ AUSENTE'}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Observações / Testemunhos</label>
                  <textarea 
                    value={obs} 
                    onChange={e => setObs(e.target.value)} 
                    rows="2" 
                    placeholder="Escreva como foi o mover de Deus na célula, decisões..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>

              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setIsModalReuniaoAberto(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 rounded-xl transition">Cancelar</button>
                <button
                  type="submit"
                  disabled={enviandoReuniao}
                  className="btn-primary text-xs font-semibold px-5 py-2.5 rounded-xl transition disabled:opacity-50 shadow-sm"
                >
                  {enviandoReuniao ? 'Gravando Encontro...' : '⛺ Concluir'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}

function InfoLinha({ label, valor }) {
  return (
    <div className="rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] p-2.5 flex items-center justify-between gap-4">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">{label}</span>
      <span className="font-medium text-[var(--text-heading)] text-right truncate max-w-44">{valor || '---'}</span>
    </div>
  );
}