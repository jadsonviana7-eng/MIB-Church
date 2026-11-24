import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from './supabaseClient';
import { Card, CardHeader, CampoLinha, CampoInput, uploadImagemCelula } from './ui';
import { Eye, EyeOff, X, Sparkles, CheckCircle2, TrendingUp, Flame, Compass, ChevronRight, Brain, Target, History, CreditCard } from 'lucide-react';
import CarteirinhaMembroModal from './CarteirinhaMembroModal';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import SidebarVinculos from './SidebarVinculos';
import { calcularIdade } from './churchUtils';
import { ModalLancarTransacao } from './TransacoesFinanceiras';
import { PERFIS_INFO } from './TestePerfilComportamental';
import { ATIVIDADE_CEREBRAL_INFO, TEMPERAMENTOS_INFO, gerarAnaliseInteligente } from './perfilInteligenteUtils';
import {
  mascaraCPF,
  mascaraCNPJ,
  mascaraTelefone,
  mascaraCEP,
  mascaraDataBR,
  dataISOparaBR,
  dataBRparaISO,
  desmascararCPF,
  desmascararTelefone,
  desmascararCEP,
} from './mascaras';
import {
  verificarDuplicidadeLocal,
  buscarDuplicidadeBanco,
  interpretarErroDuplicidadeBanco,
} from './duplicateUtils';


const MOTIVOS_EXCLUSAO = [
  'Transferência para outra igreja',
  'Falecimento',
  'Pedido do próprio membro',
  'Cadastro duplicado',
  'Inatividade prolongada',
  'Outro motivo',
];

const MODULOS_SISTEMA = [
  { modulo: 'Visão Geral', blocos: ['Dashboard', 'Indicadores e gráficos'] },
  { modulo: 'Pessoas', blocos: ['Ver todos', 'Adicionar pessoa', 'Aniversariantes', 'Relatórios', 'Ficha do membro'] },
  { modulo: 'Células', blocos: ['Lista de células', 'Nova célula', 'Reuniões', 'Detalhes da célula', 'Membros da célula'] },
  { modulo: 'Financeiro', blocos: ['Resumo', 'Transações', 'Receitas', 'Contribuições', 'Relatórios financeiros', 'Categorias', 'Contas/Caixas', 'Importar', 'Gestor financeiro'] },
  { modulo: 'Escolas', blocos: ['Visão Geral', 'Cursos', 'Turmas', 'Disciplinas', 'Professores', 'Alunos', 'Aulas', 'Avaliações', 'Inscrições Públicas'] },
  { modulo: 'Agenda', blocos: ['Calendário', 'Eventos'] },
  { modulo: 'Utilitários', blocos: ['Escalas Ministerial', 'Relatório Semanal', 'Calculadora de Tributos', 'Teste de Temperamento', 'Pedido de Oração', 'Mural de Orações'] },
  { modulo: 'Gestão Ministerial', blocos: ['Dashboard', 'Equipes', 'Escalas', 'Histórico', 'Relatórios', 'Configurações'] },
  { modulo: 'Configurações', blocos: ['Listas auxiliares', 'Preferências do sistema'] },
];

// Importar MenuIcons do icons.jsx para reutilizar SVGs
import { MenuIcons } from './icons';
import './DetalhesMembro.css';

// Mapeamento de ícones para as abas
const TabIcons = {
  informacoes: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ), // Ícone de pessoas
  adicionais: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ), // Ícone de adição
  escola: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ), // Ícone de escolas
  frequencia: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ), // Ícone de calendário
  financeiro: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ), // Ícone de finanças
  permissoes: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ), // Ícone de configurações/permissões
  caderneta: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ), // Ícone de caderneta (documento)
  faltas: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ), // Ícone de proibido/falta
  crescimento: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ), // Ícone de gráfico de barras
};

function vinculosPermissaoMembro(membro) {
  // Prioriza permissões manuais se existirem no JSONB
  if (membro?.permissoes_json && Object.keys(membro.permissoes_json).length > 0) {
    const list = [];
    const entries = Object.entries(membro.permissoes_json).filter(([_, v]) => v === true);
    if (entries.length === 0) return calcularPermissoesPorPerfil(membro);

    // Agrupa por módulo e bloco para exibir na tabela de resumo de forma legível
    const groups = {};
    entries.forEach(([key]) => {
      const parts = key.split('|');
      if (parts.length < 2) return;
      const mod = parts[0];
      const blc = parts[1];
      const act = parts[2]; // ver, editar, excluir (opcional)

      const groupKey = `${mod}|${blc}`;
      if (!groups[groupKey]) groups[groupKey] = [];
      if (act) groups[groupKey].push(act);
    });

    Object.entries(groups).forEach(([groupKey, actions]) => {
      const [modulo, bloco] = groupKey.split('|');
      const suffix = actions.length > 0 ? ` [${actions.join(', ')}]` : '';
      list.push({ modulo, bloco: `${bloco}${suffix}` });
    });

    return list;
  }

  return calcularPermissoesPorPerfil(membro);
}

function calcularPermissoesPorPerfil(membro) {
  const chave = String(membro?.permissao || 'membro').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const itens = [];

  const push = (modulo, blocos) => {
    blocos.forEach((bloco) => itens.push({ modulo, bloco }));
  };

  if (chave.includes('admin')) {
    push('Visão Geral', ['Dashboard', 'Indicadores e gráficos']);
    push('Pessoas', ['Ver todos', 'Adicionar pessoa', 'Aniversariantes', 'Relatórios', 'Ficha do membro']);
    push('Células', ['Lista de células', 'Nova célula', 'Reuniões', 'Detalhes da célula']);
    push('Configurações', ['Listas auxiliares', 'Preferências do sistema']);
    push('Financeiro', ['Receitas', 'Contribuições', 'Relatórios financeiros', 'Gestor financeiro']);
    push('Gestão Ministerial', ['Dashboard', 'Equipes', 'Escalas', 'Histórico', 'Relatórios', 'Configurações']);
    return itens;
  }

  if (chave.includes('pastor')) {
    push('Visão Geral', ['Dashboard', 'Indicadores e gráficos']);
    push('Pessoas', ['Ver todos', 'Adicionar pessoa', 'Aniversariantes', 'Relatórios', 'Ficha do membro']);
    push('Células', ['Lista de células', 'Nova célula', 'Reuniões', 'Detalhes da célula', 'Membros da célula']);
    push('Financeiro', ['Resumo', 'Transações', 'Receitas', 'Contribuições', 'Relatórios financeiros', 'Categorias', 'Contas/Caixas', 'Importar', 'Gestor financeiro']);
    push('Escolas', ['Visão Geral', 'Cursos', 'Turmas', 'Disciplinas', 'Professores', 'Alunos', 'Aulas', 'Avaliações', 'Inscrições Públicas']);
    push('Utilitários', ['Escalas Ministerial', 'Relatório Semanal', 'Calculadora de Tributos', 'Teste de Temperamento', 'Pedido de Oração', 'Mural de Orações']);
    push('Gestão Ministerial', ['Dashboard', 'Equipes', 'Escalas', 'Histórico', 'Relatórios', 'Configurações']);
    return itens;
  }

  if (chave.includes('secretar')) {
    push('Visão Geral', ['Dashboard', 'Indicadores e gráficos']);
    push('Pessoas', ['Ver todos', 'Adicionar pessoa', 'Aniversariantes', 'Relatórios', 'Ficha do membro']);
    push('Células', ['Lista de células', 'Nova célula', 'Reuniões', 'Detalhes da célula', 'Membros da célula']);
    push('Financeiro', ['Minhas Contribuições']);
    push('Escolas', ['Visão Geral', 'Cursos', 'Turmas', 'Disciplinas', 'Professores', 'Alunos', 'Aulas', 'Avaliações', 'Inscrições Públicas']);
    push('Agenda', ['Eventos', 'Calendário', 'Mural de Avisos', 'Inscrições']);
    push('Utilitários', ['Escalas Ministerial', 'Relatório Semanal', 'Calculadora de Tributos', 'Teste de Temperamento', 'Pedido de Oração', 'Mural de Orações', 'Gerador de Carnê', 'Leitor de Carnê']);
    push('Gestão Ministerial', ['Dashboard', 'Equipes', 'Escalas', 'Histórico', 'Relatórios']);
    return itens;
  }

  if (chave.includes('tesouraria') || chave.includes('financeiro')) {
    push('Financeiro', ['Receitas', 'Contribuições', 'Relatórios financeiros']);
    push('Pessoas', ['Ver todos', 'Ficha do membro']);
    return itens;
  }

  if (chave.includes('lider') || chave.includes('supervisor')) {
    push('Células', ['Lista de células', 'Reuniões', 'Detalhes da célula', 'Membros da célula']);
    push('Pessoas', ['Ficha do membro']);
    push('Gestão Ministerial', ['Escalas (Minhas Escalas / Escalar se for Líder de Ministério)']);
    return itens;
  }

  if (chave.includes('membro')) {
    push('Utilitários', ['Escalas Ministerial', 'Calculadora de Tributos', 'Teste de Temperamento', 'Pedido de Oração']);
    push('Pessoas', ['Ver todos', 'Aniversariantes']);
    push('Células', ['Lista de células']);
    push('Gestão Ministerial', ['Escalas (Minhas Escalas / Escalar se for Líder de Ministério)']);
    return itens;
  }

  push('Pessoas', ['Ficha pessoal (própria)']);
  return itens;
}

function DetalhesMembro({ pessoaId: propPessoaId, turmaId: propTurmaId, onFechar, listaPessoas = [], onDadosAtualizados, cargosLista = [], atuacoesLista = [], isStudentCadernetaView = false, membroLogado, hasAccess }) {
  const [pessoaId, setPessoaId] = useState(propPessoaId);
  const [historicoNavegacao, setHistoricoNavegacao] = useState([]);

  useEffect(() => {
    setPessoaId(propPessoaId);
    setHistoricoNavegacao([]);
  }, [propPessoaId]);

  const navegarParaOutroMembro = (id) => {
    if (!id) return;
    setHistoricoNavegacao((prev) => [...prev, pessoaId]);
    setPessoaId(id);
    setAbaAtiva('informacoes');
    setModoEdicao(false);
  };

  const voltarMembroAnterior = () => {
    if (historicoNavegacao.length === 0) return;
    const anterior = historicoNavegacao[historicoNavegacao.length - 1];
    setHistoricoNavegacao((prev) => prev.slice(0, -1));
    setPessoaId(anterior);
    setAbaAtiva('informacoes');
    setModoEdicao(false);
  };

  const RenderCardParente = ({ parente, relacao }) => {
    if (!parente) return null;
    const foto = parente.foto_url;
    const inicial = parente.nome ? parente.nome.charAt(0).toUpperCase() : '?';

    // SVG Icons
    const iconRings = (
      <svg className="w-3.5 h-3.5 shrink-0 text-[#055F6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="12" r="5" />
        <circle cx="16" cy="12" r="5" />
      </svg>
    );

    const iconPai = (
      <svg className="w-3.5 h-3.5 shrink-0 text-[#055F6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );

    const iconMae = (
      <svg className="w-3.5 h-3.5 shrink-0 text-[#055F6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 21a6 6 0 0 0-12 0" />
        <circle cx="12" cy="10" r="4" />
        <path d="M12 2v2M12 18h.01" />
      </svg>
    );

    const iconFilho = (
      <svg className="w-3.5 h-3.5 shrink-0 text-[#055F6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    );

    const iconFilha = (
      <svg className="w-3.5 h-3.5 shrink-0 text-[#055F6D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
        <path d="M12 2a4 4 0 0 1 4 4" />
      </svg>
    );

    const obterRelacaoPorGenero = (relacaoBase, generoStr) => {
      const gen = String(generoStr || '').toLowerCase();
      const isFem = gen.startsWith('f') || gen === 'mulher' || gen === 'female';
      const isMasc = gen.startsWith('m') || gen === 'homem' || gen === 'male';

      if (relacaoBase === 'Cônjuge') {
        if (isFem) return { label: 'Esposa', icon: iconRings };
        if (isMasc) return { label: 'Marido', icon: iconRings };
        return { label: 'Cônjuge', icon: iconRings };
      }
      if (relacaoBase === 'Pai / Responsável') {
        if (isFem) return { label: 'Mãe', icon: iconMae };
        if (isMasc) return { label: 'Pai', icon: iconPai };
        return { label: 'Responsável', icon: iconPai };
      }
      if (relacaoBase === 'Filho(a)') {
        if (isFem) return { label: 'Filha', icon: iconFilha };
        if (isMasc) return { label: 'Filho', icon: iconFilho };
        return { label: 'Filho(a)', icon: iconFilho };
      }
      if (relacaoBase === 'Irmão(a)') {
        if (isFem) return { label: 'Irmã', icon: iconFilha };
        if (isMasc) return { label: 'Irmão', icon: iconFilho };
        return { label: 'Irmão(a)', icon: iconFilho };
      }
      return { label: relacaoBase, icon: iconPai };
    };

    const infoRelacao = obterRelacaoPorGenero(relacao, parente.genero);

    return (
      <button
        type="button"
        onClick={() => navegarParaOutroMembro(parente.id)}
        className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-750/70 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm hover:scale-[1.02] active:scale-98 transition-all duration-200 text-left w-full sm:w-auto min-w-[240px] group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0 border border-slate-200 dark:border-slate-600 flex items-center justify-center">
          {foto ? (
            <img src={foto} alt={parente.nome} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-[#055F6D] dark:text-teal-300">{inicial}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {infoRelacao.icon}
            <span className="text-[9px] font-bold text-[#055F6D] dark:text-teal-300 uppercase tracking-wider">{infoRelacao.label}</span>
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-[#055F6D] dark:group-hover:text-teal-300 transition-colors">{parente.nome}</p>
          <span className="text-[10px] text-slate-400 dark:text-slate-400 capitalize">{parente.cargo || 'Membro'}</span>
        </div>
        <span className="text-slate-300 dark:text-slate-600 group-hover:text-[#055F6D] dark:group-hover:text-teal-300 group-hover:translate-x-1 transition-all text-sm font-bold shrink-0 pr-1">
          →
        </span>
      </button>
    );
  };

  const [membro, setMembro] = useState(null);
  const [filhos, setFilhos] = useState([]);
  const [pais, setPais] = useState([]);
  const [irmaos, setIrmaos] = useState([]);
  const [celulas, setCelulas] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [cargos, setCargos] = useState(() => cargosLista || []);
  const [atuacoes, setAtuacoes] = useState(() => atuacoesLista || []);
  const [contribuicoes, setContribuicoes] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('informacoes');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const listaPessoasRef = useRef(listaPessoas);
  listaPessoasRef.current = listaPessoas;
  const cargosListaRef = useRef(cargosLista);
  cargosListaRef.current = cargosLista;
  const atuacoesListaRef = useRef(atuacoesLista);
  atuacoesListaRef.current = atuacoesLista;
  const modoEdicaoRef = useRef(false);
  modoEdicaoRef.current = modoEdicao;

  const [isModalReceitaAberto, setIsModalReceitaAberto] = useState(false);
  const [contasFinanceiras, setContasFinanceiras] = useState([]);
  const [categoriasFinanceiras, setCategoriasFinanceiras] = useState([]);

  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('Solteiro(a)');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [profissao, setProfissao] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [cargosSelecionados, setCargosSelecionados] = useState([]);
  const [novoCargoPersonalizado, setNovoCargoPersonalizado] = useState('');
  const cargo = useMemo(() => (cargosSelecionados.length > 0 ? cargosSelecionados.join(', ') : 'Membro'), [cargosSelecionados]);
  const [celulaId, setCelulaId] = useState('');
  const [zonaId, setZonaId] = useState('');
  const [dataBatismo, setDataBatismo] = useState('');
  const [dataConversao, setDataConversao] = useState('');
  const [status, setStatus] = useState('ativo');
  const [batizadoAguas, setBatizadoAguas] = useState(false);
  const [atuacao, setAtuacao] = useState([]);
  const [permissao, setPermissao] = useState('membro');
  const [senhaNovoAcesso, setSenhaNovoAcesso] = useState('');
  const [confirmarSenhaNovoAcesso, setConfirmarSenhaNovoAcesso] = useState('');
  const [mostrarSenhaNovoAcesso, setMostrarSenhaNovoAcesso] = useState(false);
  const [criandoAcesso, setCriandoAcesso] = useState(false);
  const [mensagemAcesso, setMensagemAcesso] = useState('');
  const [avaliacaoEscola, setAvaliacaoEscola] = useState('');
  const [perfilComportamental, setPerfilComportamental] = useState('');
  const [atividadeCerebral, setAtividadeCerebral] = useState('');
  const [conjugeId, setConjugeId] = useState('');
  const [idsFilhosEdit, setIdsFilhosEdit] = useState([]);
  const [filtroBuscaFilho, setFiltroBuscaFilho] = useState('');
  const [idsPaisEdit, setIdsPaisEdit] = useState([]);
  const [filtroBuscaPai, setFiltroBuscaPai] = useState('');
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [motivoExclusao, setMotivoExclusao] = useState('');
  const [excluindoCadastro, setExcluindoCadastro] = useState(false);
  const [perfilAguia, setPerfilAguia] = useState('');
  const [perfilGato, setPerfilGato] = useState('');
  const [perfilLobo, setPerfilLobo] = useState('');
  const [perfilTubarao, setPerfilTubarao] = useState('');
  const [perfilModalAberto, setPerfilModalAberto] = useState(null); // 'I' | 'C' | 'O' | 'A' | null
  const [cerebralModalAberto, setCerebralModalAberto] = useState(null); // 'pensante' | 'razao' | 'emocao' | 'atuante' | null
  const [temperamentoModalAberto, setTemperamentoModalAberto] = useState(null); // 'colerico' | 'melancolico' | 'sanguineo' | 'fleumatico' | null

  useEffect(() => {
    if (!perfilModalAberto && !cerebralModalAberto && !temperamentoModalAberto) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setPerfilModalAberto(null);
        setCerebralModalAberto(null);
        setTemperamentoModalAberto(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [perfilModalAberto, cerebralModalAberto, temperamentoModalAberto]);
  const [perfilPensante, setPerfilPensante] = useState('');
  const [perfilRazao, setPerfilRazao] = useState('');
  const [perfilEmocao, setPerfilEmocao] = useState('');
  const [perfilAtuante, setPerfilAtuante] = useState('');
  const [testePersonalidade, setTestePersonalidade] = useState(null);
  const [historicoPerfil, setHistoricoPerfil] = useState([]);
  const [carteirinhaAberta, setCarteirinhaAberta] = useState(false);
  const [permissoesJson, setPermissoesJson] = useState({});

  const analiseInteligente = useMemo(
    () =>
      gerarAnaliseInteligente({
        nome,
        perfilAguia,
        perfilGato,
        perfilLobo,
        perfilTubarao,
        perfilPensante,
        perfilRazao,
        perfilEmocao,
        perfilAtuante,
        testePersonalidade,
      }),
    [
      nome,
      perfilAguia,
      perfilGato,
      perfilLobo,
      perfilTubarao,
      perfilPensante,
      perfilRazao,
      perfilEmocao,
      perfilAtuante,
      testePersonalidade,
    ]
  );
  const [modulosExpandidos, setModulosExpandidos] = useState({});

  const isMembro = membroLogado?.permissao === 'membro';
  const [historicoPresenca, setHistoricoPresenca] = useState([]);
  const [carregandoPresenca, setCarregandoPresenca] = useState(false);

  // Estados para Gestão Escolar
  const [turmasDisponiveis, setTurmasDisponiveis] = useState([]);
  const [matriculasMembro, setMatriculasMembro] = useState([]);
  const [turmaBoletimSelecionadaId, setTurmaBoletimSelecionadaId] = useState(null);
  const [boletimEscola, setBoletimEscola] = useState(null);
  const [carregandoBoletimEscola, setCarregandoBoletimEscola] = useState(false);

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [mostrarCortador, setMostrarCortador] = useState(false);
  const [previewNovaFotoUrl, setPreviewNovaFotoUrl] = useState('');
  const [fotoFinalBlob, setFotoFinalBlob] = useState(null);

  // Estados para dados acadêmicos (se isStudentCadernetaView for true)
  const [alunoId, setAlunoId] = useState(null);
  const [turmasDoAluno, setTurmasDoAluno] = useState([]);
  const [turmaSelecionadaAcademica, setTurmaSelecionadaAcademica] = useState(propTurmaId || null);
  const [disciplinasAcademicas, setDisciplinasAcademicas] = useState([]);
  const [cadernetaDados, setCadernetaDados] = useState(null);
  const [faltasDados, setFaltasDados] = useState(null);
  const [carregandoAcademicos, setCarregandoAcademicos] = useState(false);
  const [crescimentoDados, setCrescimentoDados] = useState(null);
  const [salvandoNotasAluno, setSalvandoNotasAluno] = useState(false);
  const [mensagemSucessoNotas, setMensagemSucessoNotas] = useState('');
  const carregarFinanceiro = useCallback(async () => {
    if (!pessoaId) return;
    const { data: transacoes, error } = await supabase
      .from('transacoes_financeiras')
      .select('*, categorias_financeiras(nome), contas_financeiras(nome)')
      .eq('pessoa_id', pessoaId)
      .order('data', { ascending: false });

    if (!error && transacoes) {
      setContribuicoes(transacoes);
    } else if (error) {
      console.warn('Erro ao carregar transações do membro:', error.message);
    }
  }, [pessoaId]);

  const carregarHistoricoPresenca = useCallback(async () => {
    if (!pessoaId || !membro?.celula_id) {
      setHistoricoPresenca([]); // Limpa a lista se não houver vínculo
      return;
    }
    setCarregandoPresenca(true);
    try {
      const { data: reunioes } = await supabase
        .from('relatorios_celula')
        .select('id, data_reuniao')
        .eq('celula_id', membro.celula_id)
        .order('data_reuniao', { ascending: false });

      if (!reunioes || reunioes.length === 0) {
        setHistoricoPresenca([]);
        return;
      }

      const { data: presencas } = await supabase
        .from('presencas_relatorio')
        .select('relatorio_id')
        .eq('pessoa_id', pessoaId)
        .in('relatorio_id', reunioes.map(r => r.id));

      const idsPresentes = new Set(presencas?.map(p => p.relatorio_id) || []);

      setHistoricoPresenca(reunioes.map(r => ({
        id: r.id,
        data: r.data_reuniao,
        presente: idsPresentes.has(r.id)
      })));
    } catch (err) {
      console.error('Erro ao carregar histórico de presença:', err);
    } finally {
      setCarregandoPresenca(false);
    }
  }, [pessoaId, membro?.celula_id]);

  const carregarAuxiliaresFinanceiro = useCallback(async () => {
    if (contasFinanceiras.length > 0 && categoriasFinanceiras.length > 0) return;
    try {
      const [{ data: cFin }, { data: catFin }] = await Promise.all([
        supabase.from('contas_financeiras').select('id, nome').order('nome'),
        supabase.from('categorias_financeiras').select('id, nome, tipo').order('nome')
      ]);
      if (cFin) setContasFinanceiras(cFin);
      if (catFin) setCategoriasFinanceiras(catFin);
    } catch (err) {
      console.warn('Erro ao carregar contas/categorias financeiras:', err?.message);
    }
  }, [contasFinanceiras.length, categoriasFinanceiras.length]);

  const carregarDadosEscolares = useCallback(async () => {
    if (!pessoaId) return;

    setMatriculasMembro([]); // Limpa antes de buscar novos dados
    try {
      const [{ data: listTurmas }, { data: alunoData }] = await Promise.all([
        supabase.from('turmas').select('id, nome, escolas(nome)').eq('ativa', true),
        supabase.from('alunos').select('id').eq('pessoa_id', pessoaId).maybeSingle()
      ]);
      if (listTurmas) setTurmasDisponiveis(listTurmas);

      if (alunoData) {
        const { data: matriculas } = await supabase
          .from('alunos_turmas')
          .select('id, status, turmas(id, nome, escolas(nome))')
          .eq('aluno_id', alunoData.id);
        setMatriculasMembro(matriculas || []);
      } else {
        setMatriculasMembro([]);
      }
    } catch (err) {
      console.warn('Erro ao carregar dados escolares:', err.message);
    }
  }, [pessoaId]);

  useEffect(() => {
    carregarDadosEscolares();
  }, [carregarDadosEscolares]);

  useEffect(() => {
    if (abaAtiva === 'financeiro') {
      carregarFinanceiro();
      carregarAuxiliaresFinanceiro();
    }
  }, [abaAtiva, carregarFinanceiro, carregarAuxiliaresFinanceiro]);

  useEffect(() => {
    if (isModalReceitaAberto) {
      carregarAuxiliaresFinanceiro();
    }
  }, [isModalReceitaAberto, carregarAuxiliaresFinanceiro]);

  useEffect(() => {
    if (abaAtiva === 'frequencia') {
      carregarHistoricoPresenca();
    }
  }, [abaAtiva, carregarHistoricoPresenca]);

  const carregarBoletimEscola = useCallback(async (turmaIdOverride = null) => {
    if (!pessoaId || isStudentCadernetaView) return;
    const turmasEnroladas = (matriculasMembro || []).filter(m => m.turmas?.id);
    if (turmasEnroladas.length === 0) {
      setBoletimEscola(null);
      setTurmaBoletimSelecionadaId(null);
      return;
    }

    const alvoId = turmaIdOverride
      || (turmaBoletimSelecionadaId && turmasEnroladas.some(m => m.turmas.id === turmaBoletimSelecionadaId) ? turmaBoletimSelecionadaId : turmasEnroladas[0].turmas.id);

    setTurmaBoletimSelecionadaId(alvoId);
    setCarregandoBoletimEscola(true);
    try {
      const [{ data: alunoData }, { data: turmasDiscs }] = await Promise.all([
        supabase.from('alunos').select('id, matricula').eq('pessoa_id', pessoaId).maybeSingle(),
        supabase
          .from('turmas_disciplinas')
          .select('id, turma_id, disciplina_id, disciplinas(id, nome), professores(pessoas(nome))')
          .eq('turma_id', alvoId),
      ]);

      if (!alunoData) {
        setBoletimEscola(null);
        return;
      }

      const tdList = turmasDiscs || [];
      const tdIds = tdList.map(td => td.id);
      const mapTdNome = Object.fromEntries(tdList.map(td => [td.id, td.disciplinas?.nome || 'Disciplina']));

      let dataAvaliacoes = [];
      let dataAulas = [];
      if (tdIds.length > 0) {
        const [resAv, resAulas] = await Promise.all([
          supabase.from('avaliacoes').select('*').eq('aluno_id', alunoData.id).in('turma_disciplina_id', tdIds),
          supabase.from('aulas').select('id, turma_disciplina_id, data_aula, titulo, presencas').in('turma_disciplina_id', tdIds).order('data_aula', { ascending: false }),
        ]);
        dataAvaliacoes = resAv.data || [];
        dataAulas = resAulas.data || [];
      }

      const mapNotas = {};
      const mapObs = {};
      dataAvaliacoes.forEach(av => {
        mapNotas[av.turma_disciplina_id] = av.nota !== null && av.nota !== undefined ? Number(av.nota) : null;
        mapObs[av.turma_disciplina_id] = av.observacao || '';
      });

      const mapFaltas = {};
      const mapTotalAulas = {};
      const historicoAulas = [];

      dataAulas.forEach(aula => {
        const tdId = aula.turma_disciplina_id;
        mapTotalAulas[tdId] = (mapTotalAulas[tdId] || 0) + 1;
        let pObj = aula.presencas || {};
        if (typeof pObj === 'string') {
          try { pObj = JSON.parse(pObj); } catch (_) { pObj = {}; }
        }
        const presente = pObj[alunoData.id] === true || pObj[pessoaId] === true;
        if (!presente) {
          mapFaltas[tdId] = (mapFaltas[tdId] || 0) + 1;
        }
        historicoAulas.push({
          id: aula.id,
          data: aula.data_aula,
          disciplina: mapTdNome[tdId] || 'Disciplina',
          titulo: aula.titulo || '',
          presente,
        });
      });

      const disciplinas = tdList.map(td => {
        const nota = mapNotas[td.id] !== undefined ? mapNotas[td.id] : null;
        const totalAulas = mapTotalAulas[td.id] || 0;
        const faltas = mapFaltas[td.id] || 0;
        const presencas = Math.max(0, totalAulas - faltas);
        const frequencia = totalAulas > 0 ? Math.round((presencas / totalAulas) * 100) : null;

        let situacao = 'Em andamento';
        if (nota !== null && (frequencia === null || frequencia >= 75)) {
          situacao = nota >= 7 ? 'Aprovado' : nota >= 5 ? 'Recuperação' : 'Reprovado';
        } else if (frequencia !== null && frequencia < 75) {
          situacao = 'Baixa Frequência';
        }

        return {
          id: td.id,
          nome: td.disciplinas?.nome || 'Disciplina',
          professor: td.professores?.pessoas?.nome || 'Não atribuído',
          nota,
          observacao: mapObs[td.id] || '',
          totalAulas,
          presencas,
          faltas,
          frequencia,
          situacao,
        };
      });

      const notasValidas = disciplinas.filter(d => d.nota !== null).map(d => d.nota);
      const mediaGeral = notasValidas.length > 0
        ? notasValidas.reduce((acc, n) => acc + n, 0) / notasValidas.length
        : null;
      const totalAulasGeral = disciplinas.reduce((acc, d) => acc + d.totalAulas, 0);
      const totalPresencasGeral = disciplinas.reduce((acc, d) => acc + d.presencas, 0);
      const totalFaltasGeral = disciplinas.reduce((acc, d) => acc + d.faltas, 0);
      const frequenciaGeral = totalAulasGeral > 0
        ? Math.round((totalPresencasGeral / totalAulasGeral) * 100)
        : null;

      const matAtual = turmasEnroladas.find(m => m.turmas.id === alvoId);

      setBoletimEscola({
        turmaId: alvoId,
        turmaNome: matAtual?.turmas?.nome || 'Turma',
        escolaNome: matAtual?.turmas?.escolas?.nome || 'Escola',
        matriculaCodigo: alunoData.matricula || null,
        statusMatricula: matAtual?.status || 'ativo',
        mediaGeral,
        frequenciaGeral,
        totalAulasGeral,
        totalPresencasGeral,
        totalFaltasGeral,
        disciplinas,
        historicoAulas: historicoAulas.slice(0, 12),
      });
    } catch (err) {
      console.warn('Erro ao carregar boletim escolar do membro:', err.message);
      setBoletimEscola(null);
    } finally {
      setCarregandoBoletimEscola(false);
    }
  }, [pessoaId, isStudentCadernetaView, matriculasMembro, turmaBoletimSelecionadaId]);

  useEffect(() => {
    if (abaAtiva === 'escola' && !isStudentCadernetaView) {
      carregarBoletimEscola();
    }
  }, [abaAtiva, isStudentCadernetaView, matriculasMembro, carregarBoletimEscola]);

  const carregarDadosAcademicos = useCallback(async (turmaIdOverride) => {
    if (!pessoaId || !isStudentCadernetaView) return;
    setCarregandoAcademicos(true);
    try {
      // 1. Obter registro do aluno a partir do pessoa_id
      let { data: alunoData } = await supabase
        .from('alunos')
        .select('id, matricula')
        .eq('pessoa_id', pessoaId)
        .maybeSingle();

      if (!alunoData) {
        const { data: novoAluno, error: errCriar } = await supabase
          .from('alunos')
          .insert([{ pessoa_id: pessoaId }])
          .select('id, matricula')
          .single();
        if (!errCriar && novoAluno) {
          alunoData = novoAluno;
        }
      }

      if (!alunoData) {
        setCadernetaDados({ modulos: [] });
        setFaltasDados({ modulos: [], total: 0 });
        return;
      }

      setAlunoId(alunoData.id);

      // 2. Buscar turmas nas quais o aluno está matriculado
      const { data: matriculas } = await supabase
        .from('alunos_turmas')
        .select('id, turma_id, status, turmas(id, nome, escola_id, escolas(nome))')
        .eq('aluno_id', alunoData.id);

      const listaTurmas = (matriculas || []).map(m => ({
        id: m.turmas?.id,
        nome: m.turmas?.nome || 'Turma sem nome',
        escolaNome: m.turmas?.escolas?.nome || 'Curso',
        status: m.status || 'ativo',
        matriculaTurmaId: m.id
      })).filter(t => !!t.id);

      setTurmasDoAluno(listaTurmas);

      // Escolhe a turma alvo
      let turmaAlvoId = turmaIdOverride || turmaSelecionadaAcademica || propTurmaId;
      if (!turmaAlvoId || !listaTurmas.some(t => t.id === turmaAlvoId)) {
        turmaAlvoId = listaTurmas[0]?.id || propTurmaId || null;
      }

      setTurmaSelecionadaAcademica(turmaAlvoId);

      if (!turmaAlvoId) {
        setCadernetaDados({ modulos: [] });
        setFaltasDados({ modulos: [], total: 0 });
        setCrescimentoDados({ observacoes: avaliacaoEscola || '' });
        return;
      }

      // 3. Buscar disciplinas da turma selecionada
      const { data: turmasDiscs } = await supabase
        .from('turmas_disciplinas')
        .select('id, turma_id, disciplina_id, disciplinas(id, nome), professores(pessoas(nome))')
        .eq('turma_id', turmaAlvoId);

      const tdList = turmasDiscs || [];
      const tdIds = tdList.map(td => td.id);

      // 4. Buscar avaliações já lançadas para esse aluno nessas disciplinas
      let mapNotas = {};
      let mapObs = {};
      if (tdIds.length > 0) {
        const { data: dataAvaliacoes } = await supabase
          .from('avaliacoes')
          .select('*')
          .eq('aluno_id', alunoData.id)
          .in('turma_disciplina_id', tdIds);

        (dataAvaliacoes || []).forEach(av => {
          mapNotas[av.turma_disciplina_id] = av.nota !== null && av.nota !== undefined ? Number(av.nota) : null;
          mapObs[av.turma_disciplina_id] = av.observacao || '';
        });
      }

      // 5. Buscar aulas para calcular presenças e faltas reais
      let mapFaltas = {};
      let mapTotalAulas = {};
      if (tdIds.length > 0) {
        const { data: dataAulas } = await supabase
          .from('aulas')
          .select('id, turma_disciplina_id, data_aula, presencas')
          .in('turma_disciplina_id', tdIds);

        (dataAulas || []).forEach(aula => {
          const tdId = aula.turma_disciplina_id;
          mapTotalAulas[tdId] = (mapTotalAulas[tdId] || 0) + 1;
          let pObj = aula.presencas || {};
          if (typeof pObj === 'string') {
            try { pObj = JSON.parse(pObj); } catch (e) { pObj = {}; }
          }
          const presente = pObj[alunoData.id] === true || pObj[pessoaId] === true;
          if (!presente) {
            mapFaltas[tdId] = (mapFaltas[tdId] || 0) + 1;
          }
        });
      }

      // 6. Montar a estrutura de disciplinas/módulos
      const modulosFormatados = tdList.map(td => {
        const discNome = td.disciplinas?.nome || 'Disciplina';
        const profNome = td.professores?.pessoas?.nome || 'Não atribuído';
        const nota = mapNotas[td.id] !== undefined ? mapNotas[td.id] : null;
        const obs = mapObs[td.id] || '';
        const totalAulas = mapTotalAulas[td.id] || 0;
        const totalFaltas = mapFaltas[td.id] || 0;
        const totalPresencas = Math.max(0, totalAulas - totalFaltas);
        const freq = totalAulas > 0 ? Math.round((totalPresencas / totalAulas) * 100) : 100;

        return {
          turmaDisciplinaId: td.id,
          nome: discNome,
          professor: profNome,
          nota: nota,
          notaInput: nota !== null ? String(nota) : '',
          observacao: obs,
          totalAulas,
          faltas: totalFaltas,
          presencas: totalPresencas,
          frequencia: freq,
          avaliacoes: [{ tipo: 'Avaliação Geral', nota: nota !== null ? nota : 0 }],
          media: nota !== null ? nota : 0
        };
      });

      setDisciplinasAcademicas(modulosFormatados);

      const notasValidas = modulosFormatados.filter(m => m.nota !== null).map(m => m.nota);
      const mediaGeral = notasValidas.length > 0
        ? (notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length)
        : null;

      const totalFaltasTurma = modulosFormatados.reduce((acc, m) => acc + m.faltas, 0);

      setCadernetaDados({
        turmaId: turmaAlvoId,
        mediaGeral,
        modulos: modulosFormatados
      });

      setFaltasDados({
        modulos: modulosFormatados.map(m => ({ nome: m.nome, faltas: m.faltas, totalAulas: m.totalAulas, freq: m.frequencia })),
        total: totalFaltasTurma
      });

      setCrescimentoDados({
        observacoes: avaliacaoEscola || ''
      });

    } catch (error) {
      console.error('Erro ao carregar dados acadêmicos:', error);
    } finally {
      setCarregandoAcademicos(false);
    }
  }, [pessoaId, isStudentCadernetaView, propTurmaId, turmaSelecionadaAcademica, avaliacaoEscola]);

  const handleNotaChange = (discIdx, valor) => {
    setDisciplinasAcademicas(prev => {
      const novaLista = [...prev];
      if (!novaLista[discIdx]) return prev;
      novaLista[discIdx] = {
        ...novaLista[discIdx],
        notaInput: valor,
        nota: valor !== '' ? (parseFloat(String(valor).replace(',', '.')) || 0) : null
      };
      return novaLista;
    });
  };

  const handleObsDisciplinaChange = (discIdx, obs) => {
    setDisciplinasAcademicas(prev => {
      const novaLista = [...prev];
      if (!novaLista[discIdx]) return prev;
      novaLista[discIdx] = {
        ...novaLista[discIdx],
        observacao: obs
      };
      return novaLista;
    });
  };

  const handleSalvarNotasAcademico = async () => {
    if (!alunoId || disciplinasAcademicas.length === 0) return;
    setSalvandoNotasAluno(true);
    setMensagemSucessoNotas('');
    try {
      const registros = disciplinasAcademicas
        .filter(d => d.turmaDisciplinaId)
        .map(d => {
          let n = null;
          if (d.notaInput !== '' && d.notaInput !== null && d.notaInput !== undefined) {
            const parsed = parseFloat(String(d.notaInput).replace(',', '.'));
            if (!isNaN(parsed)) n = Math.min(10, Math.max(0, parsed));
          } else if (d.nota !== null && d.nota !== undefined) {
            n = d.nota;
          }
          return {
            turma_disciplina_id: d.turmaDisciplinaId,
            aluno_id: alunoId,
            nota: n,
            observacao: d.observacao || null
          };
        });

      if (registros.length > 0) {
        const { error } = await supabase
          .from('avaliacoes')
          .upsert(registros, { onConflict: 'turma_disciplina_id,aluno_id' });
        if (error) throw error;
      }

      if (crescimentoDados?.observacoes !== undefined) {
        await supabase
          .from('pessoas')
          .update({ avaliacao_escola_discipulos: crescimentoDados.observacoes || null })
          .eq('id', pessoaId);
      }

      setMensagemSucessoNotas('✓ Notas e avaliações salvas com sucesso!');
      setTimeout(() => setMensagemSucessoNotas(''), 4000);
      if (onDadosAtualizados) onDadosAtualizados();
      await carregarDadosAcademicos(turmaSelecionadaAcademica);
    } catch (err) {
      console.error('Erro ao salvar avaliações do aluno:', err);
      window.alert('Erro ao salvar notas: ' + err.message);
    } finally {
      setSalvandoNotasAluno(false);
    }
  };

  const handleFaltasChange = (moduloIdx, valor) => {
    const faltas = parseInt(valor) || 0;
    setFaltasDados(prev => {
      if (!prev) return prev;
      const modulos = [...prev.modulos];
      modulos[moduloIdx] = { ...modulos[moduloIdx], faltas };
      const total = modulos.reduce((acc, m) => acc + m.faltas, 0);
      return { ...prev, modulos, total };
    });
  };

  // Tenta casar um nome sugerido pelo cadastro público (cônjuge) com uma pessoa já existente na base, pelo nome exato.
  // Não vincula automaticamente filhos (podem ser várias pessoas) — isso fica para a busca manual na aba Vínculo Familiar.
  function buscarIdPorNomeSugerido(status, nomeSugerido) {
    if (status !== 'pendente' || !nomeSugerido) return '';
    const alvo = nomeSugerido.trim().toLowerCase();
    return listaPessoas.find((lp) => lp.nome?.trim().toLowerCase() === alvo)?.id || '';
  }

  function preencherFormulario(p) {
    setMembro(p);
    setNome(p.nome || '');
    setGenero(p.genero || '');
    setDataNascimento(dataISOparaBR(p.data_nascimento));
    setEstadoCivil(p.estado_civil || 'Solteiro(a)');
    setCpf(mascaraCPF(p.cpf || ''));
    setRg(p.rg || '');
    setEscolaridade(p.escolaridade || '');
    setProfissao(p.profissao || '');
    setEmail(p.email || '');
    setTelefone(mascaraTelefone(p.telefone || ''));
    setCep(mascaraCEP(p.cep || ''));
    setCidade(p.cidade || '');
    setEndereco(p.endereco || '');
    setNumero(p.numero || '');
    setBairro(p.bairro || '');
    setEstado(p.estado || '');
    const cargosArr = p.cargo
      ? p.cargo.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    setCargosSelecionados(cargosArr.length > 0 ? cargosArr : ['Membro']);
    setCelulaId(p.celula_id || '');
    setZonaId(p.zona_id || '');
    setDataBatismo(dataISOparaBR(p.data_batismo));
    setDataConversao(dataISOparaBR(p.data_conversao));
    setStatus(p.status || 'ativo');
    setBatizadoAguas(Boolean(p.batizado_aguas));
    setAtuacao(p.atuacao ? p.atuacao.split(',').map(s => s.trim()) : []);
    setPermissao(p.permissao || 'membro');
    setSenhaNovoAcesso('');
    setConfirmarSenhaNovoAcesso('');
    setMensagemAcesso('');
    setAvaliacaoEscola(p.avaliacao_escola_discipulos || '');
    setPerfilComportamental(p.perfil_comportamental || '');
    setAtividadeCerebral(p.atividade_cerebral || '');
    setPerfilAguia(p.perfil_aguia || '');
    setPerfilGato(p.perfil_gato || '');
    setPerfilLobo(p.perfil_lobo || '');
    setPerfilPensante(p.perfil_pensante || '');
    setPerfilRazao(p.perfil_razao || '');
    setPerfilEmocao(p.perfil_emocao || '');
    setPerfilAtuante(p.perfil_atuante || '');
    setPerfilTubarao(p.perfil_tubarao || '');
    setConjugeId(p.conjuge_id || buscarIdPorNomeSugerido(p.status, p.conjuge_sugerido));
    setPermissoesJson(p.permissoes_json || {});
    setPreviewNovaFotoUrl('');
    setFotoFinalBlob(null);
  }

  const [carregandoMembro, setCarregandoMembro] = useState(() => {
    const local = propPessoaId ? listaPessoas.find((lp) => String(lp.id) === String(propPessoaId)) : null;
    return !local;
  });

  useEffect(() => {
    let ativo = true;
    async function carregarFichaDoMembro() {
      if (!pessoaId) return;

      const pessoasAtuais = listaPessoasRef.current || [];
      const membroLocal = pessoasAtuais.find((lp) => String(lp.id) === String(pessoaId)) || null;

      if (membroLocal) {
        preencherFormulario(membroLocal);
        if (membroLocal.status === 'pendente') setModoEdicao(true);
        setCarregandoMembro(false);
      } else {
        setCarregandoMembro(true);
      }
      setTestePersonalidade(null);
      setHistoricoPerfil([]);

      try {
        const authIdInicial = membroLocal?.auth_user_id || null;
        const precisaCargos = !cargosListaRef.current || cargosListaRef.current.length === 0;
        const precisaAtuacoes = !atuacoesListaRef.current || atuacoesListaRef.current.length === 0;

        const [
          resPessoa,
          resRelacoesFilhos,
          resRelacoesPais,
          resCelulas,
          resZonas,
          resCargos,
          resAtuacoes,
          resTesteInicial,
        ] = await Promise.all([
          supabase.from('pessoas').select('*, celulas(nome, imagem_url)').eq('id', pessoaId).single(),
          supabase.from('relacoes_familiares').select('id_filho').eq('id_pai_mae', pessoaId),
          supabase.from('relacoes_familiares').select('id_pai_mae').eq('id_filho', pessoaId),
          supabase.from('celulas').select('id, nome'),
          supabase.from('zonas_moradia').select('id, nome'),
          precisaCargos ? supabase.from('cargos').select('id, nome').order('nome') : Promise.resolve({ data: cargosListaRef.current }),
          precisaAtuacoes ? supabase.from('atuacoes').select('id, nome').order('nome') : Promise.resolve({ data: atuacoesListaRef.current }),
          authIdInicial
            ? supabase.from('personality_tests').select('*').eq('member_id', authIdInicial).order('created_at', { ascending: false }).limit(1).maybeSingle()
            : Promise.resolve({ data: null }),
        ]);

        if (!ativo) return;

        const { data: p, error: erroPessoa } = resPessoa;
        if (erroPessoa) console.warn('Erro ao carregar pessoa:', erroPessoa);
        if (p) {
          if (!membroLocal || !modoEdicaoRef.current) {
            preencherFormulario(p);
          } else {
            setMembro(p);
          }
          if (p.status === 'pendente' && !membroLocal) setModoEdicao(true);
        }

        const listaRef = listaPessoasRef.current || [];

        const { data: relacoes, error: erroRelacoes } = resRelacoesFilhos;
        if (erroRelacoes) console.warn('Tabela "relacoes_familiares" não encontrada. Veja DATABASE_SCHEMA.md');
        if (relacoes?.length > 0) {
          const idsFilhos = relacoes.map((r) => r.id_filho);
          setIdsFilhosEdit(idsFilhos);
          setFilhos(listaRef.filter((item) => idsFilhos.includes(item.id)));
        } else {
          setIdsFilhosEdit([]);
          setFilhos([]);
        }

        const { data: relacoesPais } = resRelacoesPais;
        const idsPais = relacoesPais?.length > 0 ? relacoesPais.map((r) => r.id_pai_mae) : [];
        if (idsPais.length > 0) {
          setIdsPaisEdit(idsPais);
          setPais(listaRef.filter((item) => idsPais.includes(item.id)));
        } else {
          setIdsPaisEdit([]);
          setPais([]);
        }

        if (resCelulas.error) console.warn('Tabela "celulas" não encontrada. Veja DATABASE_SCHEMA.md');
        if (resCelulas.data) setCelulas(resCelulas.data);

        if (resZonas.error) console.warn('Tabela "zonas_moradia" não encontrada. Veja DATABASE_SCHEMA.md');
        if (resZonas.data) setZonas(resZonas.data);

        if (resCargos.data) setCargos(resCargos.data);
        if (resAtuacoes.data) setAtuacoes(resAtuacoes.data);

        if (authIdInicial) {
          setTestePersonalidade(resTesteInicial?.data || null);
        }

        // Consultas dependentes executadas em paralelo apenas se necessárias
        const extraPromises = [];
        if (idsPais.length > 0) {
          extraPromises.push(
            supabase.from('relacoes_familiares').select('id_filho').in('id_pai_mae', idsPais).then(({ data }) => {
              if (!ativo) return;
              if (data?.length > 0) {
                const idsIrmaosUnicos = [...new Set(data.map((r) => r.id_filho).filter((id) => String(id) !== String(pessoaId)))];
                setIrmaos((listaPessoasRef.current || []).filter((item) => idsIrmaosUnicos.includes(item.id)));
              } else {
                setIrmaos([]);
              }
            })
          );
        } else {
          setIrmaos([]);
        }

        if (!authIdInicial && p?.auth_user_id) {
          extraPromises.push(
            supabase.from('personality_tests').select('*').eq('member_id', p.auth_user_id).order('created_at', { ascending: false }).limit(1).maybeSingle().then(({ data }) => {
              if (ativo) setTestePersonalidade(data || null);
            })
          );
        }

        if (pessoaId) {
          extraPromises.push(
            supabase
              .from('historico_perfil_comportamental')
              .select('*')
              .eq('pessoa_id', pessoaId)
              .order('created_at', { ascending: false })
              .then(({ data, error }) => {
                if (ativo && !error && Array.isArray(data)) {
                  setHistoricoPerfil(data);
                }
              })
              .catch(() => {})
          );
        }

        if (extraPromises.length > 0) {
          await Promise.all(extraPromises);
        }
      } catch (err) {
        console.error('Erro ao carregar ficha do membro:', err);
      } finally {
        if (ativo) setCarregandoMembro(false);
      }
    }
    carregarFichaDoMembro();
    return () => { ativo = false; };
  }, [pessoaId]);

  const listaCargosUnicos = useMemo(() => {
    const base = (cargos && cargos.length > 0 ? cargos : (cargosLista || []))
      .map((c) => (typeof c === 'string' ? c : c.nome))
      .filter(Boolean);

    const padrao = [
      'Pastor(a)',
      'Presbítero(a)',
      'Diácono/Diaconisa',
      'Líder de Célula',
      'Co-líder',
      'Discipulador(a)',
      'Missionário(a)',
      'Evangelista',
      'Cooperador(a)',
      'Voluntário(a)',
      'Membro'
    ];

    const unicos = new Set([...base, ...padrao, ...cargosSelecionados]);
    return Array.from(unicos);
  }, [cargos, cargosLista, cargosSelecionados]);

  const toggleCargo = (nomeCargo) => {
    if (!nomeCargo) return;
    const nomeLimpo = nomeCargo.trim();
    setCargosSelecionados((prev) => {
      const existe = prev.some((c) => c.toLowerCase() === nomeLimpo.toLowerCase());
      if (existe) {
        return prev.filter((c) => c.toLowerCase() !== nomeLimpo.toLowerCase());
      } else {
        return [...prev, nomeLimpo];
      }
    });
  };

  // Dynamic ABAS
  const dynamicAbas = useMemo(() => {
    if (isStudentCadernetaView) {
      return [
        { id: 'informacoes', label: 'Informações Pessoais', icon: TabIcons.informacoes },
        { id: 'caderneta', label: 'Caderneta Escolar', icon: TabIcons.caderneta },
        { id: 'faltas', label: 'Registro de Faltas', icon: TabIcons.faltas },
        { id: 'crescimento', label: 'Avaliação de Crescimento', icon: TabIcons.crescimento },
      ];
    }
    const list = [
      { id: 'informacoes', label: 'Informações', icon: TabIcons.informacoes },
      { id: 'adicionais', label: 'Informações Adicionais', icon: TabIcons.adicionais },
      { id: 'escola', label: 'Escola', icon: TabIcons.escola },
      { id: 'frequencia', label: 'Frequência', icon: TabIcons.frequencia },
      { id: 'financeiro', label: 'Financeiro', icon: TabIcons.financeiro },
    ];
    if (!isMembro) list.push({ id: 'permissoes', label: 'Permissões', icon: TabIcons.permissoes });
    return list;
  }, [isStudentCadernetaView, isMembro]);

  // Initialize abaAtiva based on isStudentCadernetaView
  useEffect(() => {
    if (isStudentCadernetaView) {
      setAbaAtiva('caderneta');
    } else {
      setAbaAtiva('informacoes');
    }
  }, [isStudentCadernetaView]);

  useEffect(() => {
    if (isStudentCadernetaView) {
      carregarDadosAcademicos();
    }
  }, [isStudentCadernetaView, carregarDadosAcademicos]);

  const nomeZona = useMemo(() => zonas.find((z) => String(z.id) === String(zonaId))?.nome || '—', [zonas, zonaId]);
  const nomeCelula = useMemo(() => celulas.find((c) => String(c.id) === String(celulaId))?.nome || '—', [celulas, celulaId]);
  const enderecoCompleto = useMemo(() => {
    const partes = [endereco, numero && `nº ${numero}`, bairro, cidade, estado].filter(Boolean);
    return partes.length ? partes.join(', ') : '—';
  }, [endereco, numero, bairro, cidade, estado]);

  const permissoesVinculadas = useMemo(
    () => (membro ? vinculosPermissaoMembro({ ...membro, permissao, permissoes_json: permissoesJson }) : []),
    [membro, permissao, permissoesJson]
  );

  const onFileChange = async (e) => {
    if (e.target.files?.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setMostrarCortador(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const criarImagemRecortada = async () => {
    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => (image.onload = resolve));
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      canvas.toBlob((blob) => {
        if (!blob) return;
        setFotoFinalBlob(blob);
        setPreviewNovaFotoUrl(URL.createObjectURL(blob));
        setMostrarCortador(false);
      }, 'image/jpeg');
    } catch (e) {
      console.error(e);
    }
  };

  async function handleSalvarEdicao(e) {
    e.preventDefault();
    setSalvando(true);

    let urlFotoPublica = membro.foto_url;
    if (fotoFinalBlob) {
      try {
        urlFotoPublica = await uploadImagemCelula(fotoFinalBlob, `membro_${pessoaId}`);
      } catch (err) {
        console.error('Erro no upload da foto:', err);
      }
    }

    const atualizacoes = {
      nome: nome.trim(),
      genero,
      data_nascimento: dataBRparaISO(dataNascimento),
      estado_civil: estadoCivil,
      cpf: desmascararCPF(cpf),
      rg: rg.trim() || null,
      escolaridade,
      profissao,
      email: email.trim() || null,
      telefone: desmascararTelefone(telefone),
      cep: desmascararCEP(cep),
      cidade,
      endereco,
      numero,
      bairro,
      estado,
      cargo: cargosSelecionados.length > 0 ? cargosSelecionados.join(', ') : 'Membro',
      celula_id: celulaId || null,
      zona_id: zonaId || null,
      data_batismo: dataBRparaISO(dataBatismo),
      data_conversao: dataBRparaISO(dataConversao),
      status: membro?.status === 'pendente' ? 'ativo' : status,
      tipo_membro: membro?.status === 'pendente' ? 'membro' : membro?.tipo_membro,
      batizado_aguas: batizadoAguas,
      atuacao: Array.isArray(atuacao) ? (atuacao.join(', ') || null) : (atuacao || null),
      permissao: permissao || 'membro',
      avaliacao_escola_discipulos: avaliacaoEscola.trim() || null,
      perfil_comportamental: perfilComportamental.trim() || null,
      atividade_cerebral: atividadeCerebral.trim() || null,
      perfil_aguia: perfilAguia || null,
      perfil_gato: perfilGato || null,
      perfil_lobo: perfilLobo || null,
      perfil_pensante: perfilPensante || null,
      perfil_razao: perfilRazao || null,
      perfil_emocao: perfilEmocao || null,
      perfil_atuante: perfilAtuante || null,
      perfil_tubarao: perfilTubarao || null,
      foto_url: urlFotoPublica,
      conjuge_id: conjugeId || null,
      permissoes_json: permissoesJson,
    };

    // 1. Verificação prévia de duplicidade contra outros membros
    const duplicadoLocal = verificarDuplicidadeLocal(atualizacoes, listaPessoas, pessoaId);
    if (duplicadoLocal) {
      if (window.modalDuplicidade) {
        await window.modalDuplicidade({
          titulo: 'Conflito de Informações',
          subtitulo: 'As novas informações informadas já pertencem a outro cadastro.',
          mensagem: duplicadoLocal.motivo,
          campo: duplicadoLocal.campo,
          valorConflito: duplicadoLocal.valorConflito,
          pessoaExistente: duplicadoLocal.pessoaExistente,
        });
      } else {
        window.alert(duplicadoLocal.motivo);
      }
      setSalvando(false);
      return;
    }

    const duplicadoBanco = await buscarDuplicidadeBanco(atualizacoes, pessoaId);
    if (duplicadoBanco) {
      if (window.modalDuplicidade) {
        await window.modalDuplicidade({
          titulo: 'Conflito de Informações',
          subtitulo: 'As novas informações informadas já pertencem a outro cadastro no banco de dados.',
          mensagem: duplicadoBanco.motivo,
          campo: duplicadoBanco.campo,
          valorConflito: duplicadoBanco.valorConflito,
          pessoaExistente: duplicadoBanco.pessoaExistente,
        });
      } else {
        window.alert(duplicadoBanco.motivo);
      }
      setSalvando(false);
      return;
    }

    const { error } = await supabase.from('pessoas').update(atualizacoes).eq('id', pessoaId);
    if (!error) {
      // 1. Atualizar relações onde esta pessoa é Pai/Mãe (Filhos)
      await supabase.from('relacoes_familiares').delete().eq('id_pai_mae', pessoaId);
      if (idsFilhosEdit.length > 0) {
        await supabase.from('relacoes_familiares').insert(
          idsFilhosEdit.map((idFilho) => ({ id_pai_mae: pessoaId, id_filho: idFilho }))
        );
      }

      // 2. Atualizar relações onde esta pessoa é Filho (Pais)
      await supabase.from('relacoes_familiares').delete().eq('id_filho', pessoaId);
      if (idsPaisEdit.length > 0) {
        await supabase.from('relacoes_familiares').insert(
          idsPaisEdit.map((idPai) => ({ id_pai_mae: idPai, id_filho: pessoaId }))
        );
      }

      // 3. Sincronizar cônjuge de forma bidirecional no Supabase
      // Primeiro limpa qualquer cônjuge anterior que apontava para mim
      await supabase.from('pessoas').update({ conjuge_id: null }).eq('conjuge_id', pessoaId);
      if (conjugeId) {
        // Vincula a outra pessoa a mim
        await supabase.from('pessoas').update({ conjuge_id: pessoaId }).eq('id', conjugeId);
      }

      // Atualiza os estados locais
      setFilhos(listaPessoas.filter((p) => idsFilhosEdit.includes(p.id)));
      setPais(listaPessoas.filter((p) => idsPaisEdit.includes(p.id)));

      setModoEdicao(false);
      const { data: atualizado } = await supabase
        .from('pessoas')
        .select('*, celulas(nome, imagem_url)')
        .eq('id', pessoaId).single();
      if (atualizado) preencherFormulario(atualizado);
      onDadosAtualizados();
    } else {
      const erroDup = interpretarErroDuplicidadeBanco(error, atualizacoes, listaPessoas);
      if (erroDup && window.modalDuplicidade) {
        await window.modalDuplicidade(erroDup);
      } else {
        const msg = error.message?.includes('column')
          ? `${error.message}\n\nExecute o SQL em supabase/schema-ficha-membro.sql no Supabase e recarregue o schema cache (Settings → API).`
          : error.message;
        window.alert('Erro ao atualizar: ' + msg);
      }
    }
    setSalvando(false);
  }


  async function handleCriarAcessoSistema() {
    if (!email.trim()) {
      window.alert('Informe o e-mail do membro antes de criar o acesso.');
      return;
    }
    if (senhaNovoAcesso.length < 6) {
      window.alert('A senha deve ter ao menos 6 caracteres.');
      return;
    }
    if (senhaNovoAcesso !== confirmarSenhaNovoAcesso) {
      window.alert('As senhas não coincidem.');
      return;
    }

    setCriandoAcesso(true);
    setMensagemAcesso('');

    const perfilAcesso = permissao || 'membro';
    const { error } = await supabase.functions.invoke('criar-usuario-membro', {
      body: {
        pessoaId,
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senhaNovoAcesso,
        permissao: perfilAcesso,
        foto_url: membro.foto_url,
      },
    });

    if (error) {
      let msgErro = error.message;
      if (error.context) {
        try {
          const body = await error.context.json();
          if (body.error) msgErro = body.error;
        } catch (e) { /* corpo não é JSON */ }
      }
      console.error('Erro detalhado da Edge Function:', error);
      setMensagemAcesso(`Não foi possível criar o acesso: ${msgErro}`);
    } else {
      setMensagemAcesso('Acesso criado com sucesso.');
      setSenhaNovoAcesso('');
      setConfirmarSenhaNovoAcesso('');
      const { data: atualizado } = await supabase
        .from('pessoas')
        .select('*, celulas(nome, imagem_url)')
        .eq('id', pessoaId).single();
      if (atualizado) preencherFormulario(atualizado);
      if (onDadosAtualizados) onDadosAtualizados();
    }

    setCriandoAcesso(false);
  }

  function toggleFilho(id) {
    setIdsFilhosEdit((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      setFilhos(listaPessoas.filter((p) => next.includes(p.id)));
      return next;
    });
  }

  function togglePaiMae(id) {
    setIdsPaisEdit((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      setPais(listaPessoas.filter((p) => next.includes(p.id)));
      return next;
    });
  }

  async function handleMatricularEmTurma(turmaId) {
    if (!(await window.confirmModal('Matricular em Turma', 'Deseja matricular este membro nesta turma?'))) return;

    setSalvando(true);
    try {
      // 1. Garantir que a pessoa existe na tabela de alunos
      let { data: aluno } = await supabase.from('alunos').select('id').eq('pessoa_id', pessoaId).maybeSingle();

      if (!aluno) {
        const { data: novoAluno, error: errA } = await supabase.from('alunos').insert([{ pessoa_id: pessoaId }]).select().single();
        if (errA) throw errA;
        aluno = novoAluno;
      }

      // 2. Inserir na turma
      const { error: errT } = await supabase.from('alunos_turmas').insert([{
        aluno_id: aluno.id,
        turma_id: turmaId,
        status: 'ativo'
      }]);

      if (errT) throw errT;

      await carregarDadosEscolares();
      window.alert('Matrícula realizada com sucesso!');
    } catch (err) {
      window.alert('Erro ao matricular: ' + err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function confirmarInativacaoCadastro() {
    if (!motivoExclusao) {
      window.alert('Selecione o motivo da inativação.');
      return;
    }
    setExcluindoCadastro(true);
    const { error } = await supabase
      .from('pessoas')
      .update({ status: 'inativo', motivo_exclusao: motivoExclusao })
      .eq('id', pessoaId);
    setExcluindoCadastro(false);
    if (!error) {
      setModalExclusaoAberto(false);
      onDadosAtualizados();
      onFechar();
    } else {
      window.alert('Erro ao inativar: ' + error.message);
    }
  }

  async function handleExcluirPermanente() {
    const confirmacao = await window.confirmModal(
      'Excluir Permanentemente',
      `⚠️ ATENÇÃO: Você está prestes a excluir PERMANENTEMENTE o cadastro de ${nome}.\n\nEsta ação não pode ser desfeita e removerá todos os vínculos (familiares, históricos, etc) desta pessoa.\n\nDeseja continuar?`
    );
    if (!confirmacao) return;

    setSalvando(true);
    try {
      // Remove relações familiares vinculadas antes de deletar a pessoa
      await supabase.from('relacoes_familiares').delete().or(`id_pai_mae.eq.${pessoaId},id_filho.eq.${pessoaId}`);

      const { error } = await supabase.from('pessoas').delete().eq('id', pessoaId);
      if (error) throw error;

      if (onDadosAtualizados) onDadosAtualizados();
      onFechar();
    } catch (err) {
      window.alert('Erro ao excluir permanentemente: ' + err.message);
    } finally {
      setSalvando(false);
    }
  }

  const pessoasParaFilhos = listaPessoas.filter(
    (p) => String(p.id) !== String(pessoaId) && p.nome?.toLowerCase().includes(filtroBuscaFilho.toLowerCase())
  );

  const pessoasParaPais = listaPessoas.filter(
    (p) => String(p.id) !== String(pessoaId) && p.nome?.toLowerCase().includes(filtroBuscaPai.toLowerCase())
  );

  if (carregandoMembro) {
    return <div className="text-center py-12 text-sm text-[var(--text-muted)] font-medium">Buscando ficha do membro...</div>;
  }
  if (!membro) {
    return <div className="text-center py-12 text-sm text-red-500">Membro não localizado.</div>;
  }

  const fotoExibir = previewNovaFotoUrl || membro.foto_url;
  const dis = !modoEdicao;
  const conjugeObj = listaPessoas.find((p) => String(p.id) === String(conjugeId));

  return (
    <div className="w-full space-y-5 max-w-[1600px] mx-auto px-2 md:px-4">
      {/* Modal Moderno e Interativo de Detalhes do Perfil Comportamental */}
      {perfilModalAberto && PERFIS_INFO[perfilModalAberto] && (() => {
        const info = PERFIS_INFO[perfilModalAberto];
        const valoresMapa = {
          I: perfilAguia,
          C: perfilGato,
          O: perfilLobo,
          A: perfilTubarao,
        };
        const valorAtual = valoresMapa[perfilModalAberto];
        const temValor = valorAtual !== '' && valorAtual !== null && valorAtual !== undefined;
        const pctNum = Math.min(100, Math.max(0, Number(valorAtual) || 0));

        return (
          <div
            onClick={() => setPerfilModalAberto(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#131d33] rounded-3xl border border-slate-200/80 dark:border-[#2b3954] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            >
              {/* Cabeçalho Hero com Gradiente do Arquétipo */}
              <div className={`relative overflow-hidden bg-gradient-to-br ${info.corGrad} p-5 sm:p-6 text-white shrink-0`}>
                <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/15 blur-3xl pointer-events-none" />
                <div className="absolute left-1/4 -bottom-14 w-36 h-36 rounded-full bg-black/15 blur-2xl pointer-events-none" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-4xl shadow-lg shrink-0">
                      {info.emoji}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-black/20 px-2.5 py-0.5 rounded-full">
                          <Sparkles size={11} />
                          {info.eixo}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                          "{info.lema}"
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                        Perfil {info.nome}
                      </h3>
                      <p className="text-xs text-white/90 font-semibold mt-0.5 truncate">
                        {nome ? `${nome} • ` : ''}
                        {temValor ? `Pontuação atual: ${valorAtual}%` : 'Ainda não avaliado neste arquétipo'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPerfilModalAberto(null)}
                    className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition cursor-pointer shrink-0"
                    aria-label="Fechar modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Barra de pontuação do membro + Seletor rápido dos 4 perfis */}
                <div className="relative mt-5 space-y-3">
                  {temValor && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                        <span>Intensidade em {info.nome}</span>
                        <span className="font-black">{pctNum}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-black/25 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-white transition-all duration-500"
                          style={{ width: `${pctNum}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    {['I', 'C', 'O', 'A'].map((cod) => {
                      const item = PERFIS_INFO[cod];
                      const ativo = perfilModalAberto === cod;
                      const v = valoresMapa[cod];
                      return (
                        <button
                          key={cod}
                          type="button"
                          onClick={() => setPerfilModalAberto(cod)}
                          className={`px-2 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer flex items-center justify-center gap-1 border ${ativo
                              ? 'bg-white text-slate-900 border-white shadow-sm'
                              : 'bg-black/15 hover:bg-black/25 text-white/90 border-white/15'
                            }`}
                        >
                          <span>{item.emoji}</span>
                          <span className="hidden sm:inline truncate">{item.nome}</span>
                          {v !== '' && v !== null && v !== undefined && (
                            <span className={`text-[10px] font-black ${ativo ? 'text-blue-700' : 'text-white/80'}`}>
                              {v}%
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Conteúdo Rolável */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                {/* Sobre o Perfil */}
                <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#17223b] border border-slate-200/70 dark:border-[#2b3954] space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Visão Geral do Arquétipo
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {info.descricaoCompleta}
                  </p>
                </div>

                {/* Comportamentos em Pills */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Compass size={15} className="text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                      Comportamentos Característicos
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {info.comportamentos.map((comp) => (
                      <span
                        key={comp}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-[#1c2b4a] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-[#2b3954]"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Grid Bento: Pontos Fortes, Melhoria e Motivações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 space-y-2.5">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={16} />
                      <h4 className="text-xs font-black uppercase tracking-wider">Pontos Fortes</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {info.pontosFortes.map((pt) => (
                        <li key={pt} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-snug">
                          <span className="text-emerald-600 dark:text-emerald-400 font-black mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 space-y-2.5">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                      <TrendingUp size={16} />
                      <h4 className="text-xs font-black uppercase tracking-wider">Pontos de Melhoria</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {info.pontosMelhoria.map((pt) => (
                        <li key={pt} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-snug">
                          <span className="text-amber-600 dark:text-amber-400 font-black mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Motivações */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/50 space-y-2.5">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                    <Flame size={16} />
                    <h4 className="text-xs font-black uppercase tracking-wider">O que Motiva esse Perfil</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {info.motivacoes.map((mot) => (
                      <div key={mot} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-snug">
                        <span className="text-indigo-600 dark:text-indigo-400 font-black mt-0.5">✦</span>
                        <span>{mot}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Valores Principais */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1e3a8a]/10 via-blue-500/10 to-indigo-500/10 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/70 dark:border-blue-800/50 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 dark:text-blue-300 block">
                      Valores Principais
                    </span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                      {info.valores}
                    </p>
                  </div>
                  <span className="text-2xl shrink-0">{info.emoji}</span>
                </div>
              </div>

              {/* Rodapé */}
              <div className="px-5 py-3.5 border-t border-slate-100 dark:border-[#2b3954] bg-slate-50/70 dark:bg-[#0f172a]/70 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setPerfilModalAberto(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 dark:bg-blue-600 hover:bg-slate-700 dark:hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Modal Interativo de Atividade Cerebral */}
      {cerebralModalAberto && ATIVIDADE_CEREBRAL_INFO[cerebralModalAberto] && (() => {
        const info = ATIVIDADE_CEREBRAL_INFO[cerebralModalAberto];
        const valoresMapa = {
          pensante: perfilPensante,
          razao: perfilRazao,
          emocao: perfilEmocao,
          atuante: perfilAtuante,
        };
        const valorAtual = valoresMapa[cerebralModalAberto];
        const temValor = valorAtual !== '' && valorAtual !== null && valorAtual !== undefined;
        const pctNum = Math.min(100, Math.max(0, Number(valorAtual) || 0));

        return (
          <div
            onClick={() => setCerebralModalAberto(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#131d33] rounded-3xl border border-slate-200/80 dark:border-[#2b3954] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            >
              <div className={`relative overflow-hidden bg-gradient-to-br ${info.corGrad} p-5 sm:p-6 text-white shrink-0`}>
                <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/15 blur-3xl pointer-events-none" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-4xl shadow-lg shrink-0">
                      {info.emoji}
                    </div>
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-black/20 px-2.5 py-0.5 rounded-full mb-1">
                        <Brain size={11} />
                        {info.subtitulo}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                        Atividade Cerebral: {info.nome}
                      </h3>
                      <p className="text-xs text-white/90 font-semibold mt-0.5 truncate">
                        {nome ? `${nome} • ` : ''}
                        {temValor ? `Índice atual: ${valorAtual}%` : 'Sem pontuação informada'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCerebralModalAberto(null)}
                    className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition cursor-pointer shrink-0"
                    aria-label="Fechar modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative mt-5 space-y-3">
                  {temValor && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold text-white/90">
                        <span>Dominância em {info.nome}</span>
                        <span className="font-black">{pctNum}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-black/25 overflow-hidden">
                        <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${pctNum}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    {['pensante', 'razao', 'emocao', 'atuante'].map((k) => {
                      const item = ATIVIDADE_CEREBRAL_INFO[k];
                      const ativo = cerebralModalAberto === k;
                      const v = valoresMapa[k];
                      return (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setCerebralModalAberto(k)}
                          className={`px-2 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer flex items-center justify-center gap-1 border ${ativo
                              ? 'bg-white text-slate-900 border-white shadow-sm'
                              : 'bg-black/15 hover:bg-black/25 text-white/90 border-white/15'
                            }`}
                        >
                          <span>{item.emoji}</span>
                          <span className="hidden sm:inline truncate">{item.nome}</span>
                          {v !== '' && v !== null && v !== undefined && (
                            <span className={`text-[10px] font-black ${ativo ? 'text-blue-700' : 'text-white/80'}`}>{v}%</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#17223b] border border-slate-200/70 dark:border-[#2b3954] space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sobre este Quadrante</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{info.descricaoCompleta}</p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Compass size={15} className="text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">Características Principais</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {info.caracteristicas.map((c) => (
                      <span key={c} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-[#1c2b4a] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-[#2b3954]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 space-y-2.5">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={16} />
                      <h4 className="text-xs font-black uppercase tracking-wider">Pontos Fortes</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {info.pontosFortes.map((pt) => (
                        <li key={pt} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-snug">
                          <span className="text-emerald-600 dark:text-emerald-400 font-black mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 space-y-2.5">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                      <TrendingUp size={16} />
                      <h4 className="text-xs font-black uppercase tracking-wider">Pontos de Atenção</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {info.pontosAtencao.map((pt) => (
                        <li key={pt} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-snug">
                          <span className="text-amber-600 dark:text-amber-400 font-black mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/50 space-y-2.5">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                    <Target size={16} />
                    <h4 className="text-xs font-black uppercase tracking-wider">Aptidões Ministeriais Sugeridas</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {info.aptidoes.map((ap) => (
                      <span key={ap} className="px-3 py-1 rounded-xl text-xs font-bold bg-white/80 dark:bg-slate-900/70 text-indigo-800 dark:text-indigo-200 border border-indigo-200/70 dark:border-indigo-800/60">
                        ✦ {ap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-slate-100 dark:border-[#2b3954] bg-slate-50/70 dark:bg-[#0f172a]/70 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setCerebralModalAberto(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 dark:bg-blue-600 hover:bg-slate-700 dark:hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Modal Interativo de Temperamento / Personalidade */}
      {temperamentoModalAberto && TEMPERAMENTOS_INFO[temperamentoModalAberto] && (() => {
        const info = TEMPERAMENTOS_INFO[temperamentoModalAberto];
        const valAtual = testePersonalidade ? Number(testePersonalidade[temperamentoModalAberto]) || 0 : 0;
        const pctEscala = Math.min(100, Math.round((valAtual / 35) * 100));

        return (
          <div
            onClick={() => setTemperamentoModalAberto(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#131d33] rounded-3xl border border-slate-200/80 dark:border-[#2b3954] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            >
              <div className={`relative overflow-hidden bg-gradient-to-br ${info.corGrad} p-5 sm:p-6 text-white shrink-0`}>
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-4xl shadow-lg shrink-0">
                      {info.emoji}
                    </div>
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-black/20 px-2.5 py-0.5 rounded-full mb-1">
                        <Sparkles size={11} />
                        Temperamento • Escala 7–35
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                        Temperamento {info.nome}
                      </h3>
                      <p className="text-xs text-white/90 font-semibold mt-0.5 truncate">
                        {nome ? `${nome} • ` : ''}Pontuação: {valAtual} / 35 ({pctEscala}%)
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTemperamentoModalAberto(null)}
                    className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition cursor-pointer shrink-0"
                    aria-label="Fechar modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative mt-4 grid grid-cols-4 gap-1.5">
                  {['colerico', 'melancolico', 'sanguineo', 'fleumatico'].map((k) => {
                    const item = TEMPERAMENTOS_INFO[k];
                    const ativo = temperamentoModalAberto === k;
                    const v = testePersonalidade ? testePersonalidade[k] : null;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setTemperamentoModalAberto(k)}
                        className={`px-2 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer flex items-center justify-center gap-1 border ${ativo
                            ? 'bg-white text-slate-900 border-white shadow-sm'
                            : 'bg-black/15 hover:bg-black/25 text-white/90 border-white/15'
                          }`}
                      >
                        <span>{item.emoji}</span>
                        <span className="hidden sm:inline truncate">{item.nome}</span>
                        {v !== null && v !== undefined && (
                          <span className={`text-[10px] font-black ${ativo ? 'text-blue-700' : 'text-white/80'}`}>{v}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#17223b] border border-slate-200/70 dark:border-[#2b3954] space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sobre este Temperamento</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{info.descricaoCompleta}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 space-y-2.5">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 size={16} />
                      <h4 className="text-xs font-black uppercase tracking-wider">Pontos Fortes</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {info.pontosFortes.map((pt) => (
                        <li key={pt} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-snug">
                          <span className="text-emerald-600 dark:text-emerald-400 font-black mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 space-y-2.5">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                      <TrendingUp size={16} />
                      <h4 className="text-xs font-black uppercase tracking-wider">Pontos de Melhoria</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {info.pontosMelhoria.map((pt) => (
                        <li key={pt} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-snug">
                          <span className="text-amber-600 dark:text-amber-400 font-black mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/50 space-y-2.5">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                    <Target size={16} />
                    <h4 className="text-xs font-black uppercase tracking-wider">Aptidões Ministeriais</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {info.aptidoes.map((ap) => (
                      <span key={ap} className="px-3 py-1 rounded-xl text-xs font-bold bg-white/80 dark:bg-slate-900/70 text-indigo-800 dark:text-indigo-200 border border-indigo-200/70 dark:border-indigo-800/60">
                        ✦ {ap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-slate-100 dark:border-[#2b3954] bg-slate-50/70 dark:bg-[#0f172a]/70 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setTemperamentoModalAberto(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 dark:bg-blue-600 hover:bg-slate-700 dark:hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {modalExclusaoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-md p-5 space-y-4">
            <h3 className="font-semibold text-[var(--text-heading)] dark:text-white">Inativar Cadastro de {nome}</h3>
            <p className="text-sm text-[var(--text-muted)] dark:text-slate-400">O membro será movido para a lista de inativos. Você poderá reativá-lo a qualquer momento.</p>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] dark:text-slate-400 mb-1">Motivo da inativação</label>
              <select value={motivoExclusao} onChange={(e) => setMotivoExclusao(e.target.value)} className="w-full px-3 py-2 border dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-950 dark:text-slate-100">
                <option value="">Selecione o motivo</option>
                {MOTIVOS_EXCLUSAO.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setModalExclusaoAberto(false)} className="px-4 py-2 text-xs border dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 rounded-xl cursor-pointer">Cancelar</button>
              <button type="button" onClick={confirmarInativacaoCadastro} disabled={excluindoCadastro} className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 cursor-pointer">
                {excluindoCadastro ? 'Processando...' : 'Confirmar inativação'}
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarCortador && ( // Modal de recorte de imagem
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md overflow-hidden shadow-xl dark:border dark:border-slate-800">
            <div className="p-4 border-b border-[var(--border)] dark:border-slate-800">
              <h3 className="font-semibold text-[var(--text-heading)] dark:text-white text-sm">Recortar foto de perfil</h3>
            </div>
            <div className="relative h-64 w-full bg-slate-900">
              <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={1} cropShape="round" showGrid={false} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} />
            </div>
            <div className="p-4 bg-[var(--surface-muted)] dark:bg-slate-850 flex gap-2">
              <button type="button" onClick={() => setMostrarCortador(false)} className="flex-1 py-2 bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750 text-xs font-medium rounded-xl cursor-pointer">Cancelar</button>
              <button type="button" onClick={criarImagemRecortada} className="flex-1 py-2 btn-primary text-xs font-semibold rounded-xl cursor-pointer">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {carteirinhaAberta && (
        <CarteirinhaMembroModal
          pessoa={{
            ...(membro || {}),
            id: pessoaId || membro?.id,
            nome,
            cpf,
            rg,
            cidade,
            estado,
            cargo,
            genero,
            foto_url: fotoExibir || membro?.foto_url,
            data_batismo: dataBatismo || membro?.data_batismo,
            permissao: membro?.permissao,
            created_at: membro?.created_at,
          }}
          onFechar={() => setCarteirinhaAberta(false)}
        />
      )}
      <div className="member-header flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full">
          <div className="relative shrink-0 w-36 h-36 rounded-2xl border-2 border-[var(--border)] dark:border-slate-700 overflow-hidden bg-[var(--surface-muted)] dark:bg-slate-800 shadow-sm">
            {fotoExibir ? (
              <img src={fotoExibir} alt={nome} className="w-full h-full object-cover" />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-4xl font-semibold text-[var(--text-muted)] dark:text-slate-400">{nome.charAt(0).toUpperCase()}</span>
            )}
            {modoEdicao && (
              <label className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center text-[10px] font-medium text-white cursor-pointer">
                Alterar foto
                <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
              </label>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="hidden sm:flex items-center justify-start gap-2 text-[11px] font-bold tracking-tight text-slate-400 mb-1">
              {historicoNavegacao.length > 0 ? (
                <button
                  type="button"
                  onClick={voltarMembroAnterior}
                  className="flex items-center gap-1 text-[#055F6D] dark:text-teal-400 hover:text-[#044c57] dark:hover:text-teal-300 font-bold bg-[#055F6D]/5 dark:bg-teal-950/30 hover:bg-[#055F6D]/10 dark:hover:bg-teal-900/40 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  ← Voltar para {listaPessoas.find(p => String(p.id) === String(historicoNavegacao[historicoNavegacao.length - 1]))?.nome || 'anterior'}
                </button>
              ) : (
                <>
                  <button type="button" onClick={() => onFechar()} className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">Pessoas</button>
                  <span className="text-slate-200 dark:text-slate-700">/</span>
                  <span className="text-[#055F6D] dark:text-blue-400">Ficha</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-semibold text-[var(--text-heading)] dark:text-white tracking-tight leading-tight">{nome}</h1>

            {/* Info Detalhada: Oculta em mobile (hidden), visível em telas pequenas+ (sm:grid) */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm mt-4">
              <p><span className="text-[var(--text-muted)] dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider block mb-0.5">Zona de moradia</span> <span className="font-medium text-[var(--text-heading)] dark:text-slate-100">{nomeZona}</span></p>
              <p><span className="text-[var(--text-muted)] dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider block mb-0.5">Célula</span>
                <span className="font-medium text-[#055F6D] dark:text-blue-400">
                  {nomeCelula}
                </span>
              </p>
              <p><span className="text-[var(--text-muted)] dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider block mb-0.5">{cargosSelecionados.length > 1 ? 'Cargos' : 'Cargo'}</span> <span className="font-medium text-[var(--text-heading)] dark:text-slate-100 capitalize">{cargo || 'Membro'}</span></p>
              <p><span className="text-[var(--text-muted)] dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider block mb-0.5">Telefone</span> <span className="font-medium text-[var(--text-heading)] dark:text-slate-100">{telefone || '—'}</span></p>
              <p className="sm:col-span-2"><span className="text-[var(--text-muted)] dark:text-slate-400">Endereço:</span> <span className="font-medium text-[var(--text-heading)] dark:text-slate-100">{enderecoCompleto}</span></p>
            </div>

            {/* Status Minimalista: Visível apenas em mobile (sm:hidden) */}
            <div className="flex flex-wrap justify-center gap-2 mt-2 sm:hidden">
              {celulaId && (
                <span className="text-[9px] bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 px-1.5 py-0.5 rounded border border-teal-100 dark:border-teal-800 font-black uppercase">Ativo</span>
              )}
              {cargosSelecionados.length > 0 ? (
                cargosSelecionados.map((c) => (
                  <span key={c} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-bold capitalize">{c}</span>
                ))
              ) : (
                <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-bold capitalize">Membro</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0 w-full lg:w-auto justify-center lg:justify-end">
          {!modoEdicao ? (
            <>
              <button
                type="button"
                onClick={() => setCarteirinhaAberta(true)}
                className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm cursor-pointer"
                title="Visualizar e imprimir carteirinha de membro"
              >
                <CreditCard size={16} />
                <span>Carteirinha</span>
              </button>
              {hasAccess && (hasAccess('Pessoas', 'Ficha do membro', 'editar') || String(membroLogado?.id) === String(pessoaId)) && (
                <button
                  type="button"
                  onClick={() => setModoEdicao(true)}
                  className="flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold p-2.5 sm:px-4 sm:py-2 rounded-xl transition shadow-sm cursor-pointer"
                  title="Editar Membro"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="hidden sm:block">Editar</span>
                </button>
              )}
              {hasAccess && hasAccess('Pessoas', 'Ficha do membro', 'excluir') && (
                <>
                  <button
                    type="button"
                    onClick={() => setModalExclusaoAberto(true)}
                    className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold p-2.5 sm:px-4 sm:py-2 rounded-xl transition shadow-sm cursor-pointer"
                    title="Inativar Membro"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <span className="hidden sm:block">Inativar</span>
                  </button>
                  <button type="button" onClick={handleExcluirPermanente} className="px-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer" title="Excluir Permanentemente">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </>
              )}
              <button type="button" onClick={onFechar} className="px-4 py-2 rounded-xl border border-[var(--border)] dark:border-slate-700 text-xs font-medium text-[var(--text-primary)] dark:text-slate-200 dark:hover:bg-slate-800 transition cursor-pointer">Fechar</button>
            </>
          ) : (
            <span className="text-xs text-amber-700 dark:text-amber-300 font-medium px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50">
              {membro?.status === 'pendente' ? 'Revisando para aprovação' : 'Modo edição'}
            </span>
          )}
        </div>
      </div>
      <div className="ficha-layout">
        <nav className="tabs-sidebar" aria-label="Abas da ficha">
          {dynamicAbas.map((aba) => (
            <button
              key={aba.id}
              type="button"
              onClick={() => setAbaAtiva(aba.id)}
              className={`tab-item flex items-center gap-3 px-4 py-3 text-xs font-semibold transition-all whitespace-nowrap ${abaAtiva === aba.id
                ? 'tab-item-active'
                : 'tab-item-inactive'
                }`}
            >
              <span className="tab-icon shrink-0">{aba.icon}</span>
              <span className="tab-label">{aba.label}</span>
            </button>
          ))}
        </nav>
        <div className="ficha-body">
          <form onSubmit={handleSalvarEdicao} className="ficha-content w-full space-y-4">
            {abaAtiva === 'informacoes' && (
              <div className="space-y-4">
                {membro.status === 'pendente' && (
                  <div className="p-5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-[24px] flex gap-4 animate-in slide-in-from-top-2 duration-300">
                    <span className="text-2xl">📋</span>
                    <div>
                      <h4 className="text-sm font-black text-amber-900 dark:text-amber-200 uppercase tracking-tight">Análise de Novo Cadastro</h4>
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 leading-relaxed">Este membro se cadastrou pelo formulário público. Verifique as sugestões abaixo e preencha os dados oficiais antes de aprovar.</p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">Cargo Escolhido: <span className="text-slate-900 dark:text-slate-100">{membro.cargo || 'Não informado'}</span></p>
                        <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">Célula Vinculada: <span className="text-slate-900 dark:text-slate-100">{nomeCelula !== '—' ? nomeCelula : 'Nenhuma'}</span></p>
                        <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">Zona Vinculada: <span className="text-slate-900 dark:text-slate-100">{nomeZona !== '—' ? nomeZona : 'Nenhuma'}</span></p>
                        {membro.atuacao && <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">Aptidão/Ministério: <span className="text-slate-900 dark:text-slate-100">{membro.atuacao}</span></p>}
                        {membro.conjuge_sugerido && <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">Cônjuge sugerido: <span className="text-slate-900 dark:text-slate-100">{membro.conjuge_sugerido}</span>{!conjugeId && <span className="text-amber-600 dark:text-amber-400 font-normal italic ml-1">— confirme em Vínculo Familiar</span>}</p>}
                        {membro.filhos_sugeridos && <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase">Filhos sugeridos: <span className="text-slate-900 dark:text-slate-100">{membro.filhos_sugeridos}</span><span className="text-amber-600 dark:text-amber-400 font-normal italic ml-1">— busque e vincule em Vínculo Familiar</span></p>}
                      </div>
                    </div>
                  </div>
                )}
                <div className="section-group">
                  <h3 className="section-title">Dados Pessoais</h3>
                  <div className="section-body grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <CampoInput label="Nome completo" value={nome} onChange={setNome} disabled={dis} />
                    <CampoInput label="Gênero" value={genero} onChange={setGenero} disabled={dis} />
                    {!dis ? (
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] dark:text-slate-400 mb-0.5">Estado civil</label>
                        <select disabled={dis} value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100">
                          <option value="Solteiro(a)">Solteiro(a)</option>
                          <option value="Casado(a)">Casado(a)</option>
                          <option value="Divorciado(a)">Divorciado(a)</option>
                          <option value="Viuvo(a)">Viúvo(a)</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>
                    ) : (
                      <CampoLinha label="Estado civil" valor={estadoCivil} />
                    )}
                    {!dis ? (
                      <CampoInput label="Data de nascimento" value={dataNascimento} onChange={setDataNascimento} disabled={dis} mask={mascaraDataBR} />
                    ) : (
                      <CampoLinha
                        label="Data de nascimento"
                        valor={dataNascimento ? `${dataNascimento} (${calcularIdade(membro?.data_nascimento)} anos)` : '—'}
                      />
                    )}
                    <CampoInput label="CPF" value={cpf} onChange={setCpf} disabled={dis} mask={mascaraCPF} />
                    <CampoInput label="RG" value={rg} onChange={setRg} disabled={dis} />
                    {!dis ? (
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] dark:text-slate-400 mb-0.5">Escolaridade</label>
                        <select value={escolaridade} onChange={(e) => setEscolaridade(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100">
                          <option value="">Selecione</option>
                          <option value="Ensino Medio">Ensino Fundamental</option>
                          <option value="Ensino Medio">Ensino Medio</option>
                          <option value="Ensino Superior">Ensino Superior</option>
                          <option value="Ensino Superior">Superior Técnico</option>
                          <option value="Pos-graduacao">Pos-graduacao</option>
                          <option value="Mestrado/Doutorado">Mestrado/Doutorado</option>
                        </select>
                      </div>
                    ) : (
                      <CampoLinha label="Escolaridade" valor={escolaridade} />
                    )}
                    <CampoInput label="Profissão" value={profissao} onChange={setProfissao} disabled={dis} />
                    <CampoInput label="E-mail" value={email} onChange={setEmail} disabled={dis} />
                    <CampoInput label="Telefone" value={telefone} onChange={setTelefone} disabled={dis} mask={mascaraTelefone} />
                    {!dis ? (
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] dark:text-slate-400 mb-0.5">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-1.5 text-xs font-medium border border-[var(--border)] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100 focus:outline-none">
                          <option value="ativo">Ativo</option>
                          <option value="inativo">Inativo</option>
                          <option value="afastado">Afastado</option>
                          <option value="transferido">Transferido</option>
                        </select>
                      </div>
                    ) : (
                      <CampoLinha label="Status" valor={status} />
                    )}
                  </div>
                </div>

                <div className="section-group">
                  <h3 className="section-title">Endereço</h3>
                  <div className="section-body grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <CampoInput label="CEP" value={cep} onChange={setCep} disabled={dis} mask={mascaraCEP} />
                    <CampoInput label="Logradouro" value={endereco} onChange={setEndereco} disabled={dis} />
                    <CampoInput label="Número" value={numero} onChange={setNumero} disabled={dis} />
                    <CampoInput label="Bairro" value={bairro} onChange={setBairro} disabled={dis} />
                    <CampoInput label="Cidade" value={cidade} onChange={setCidade} disabled={dis} />
                    <CampoInput label="UF" value={estado} onChange={setEstado} disabled={dis} />
                  </div>
                </div>

                <div className="section-group">
                  <h3 className="section-title">Vida na Igreja</h3>
                  <div className="section-body space-y-4">
                    {/* Seleção de Múltiplos Cargos */}
                    {!dis ? (
                      <div className="p-3.5 bg-slate-50/60 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                            Cargos e Funções Eclesiásticas
                          </label>
                          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                            {cargosSelecionados.length === 0 ? 'Nenhum cargo selecionado' : `${cargosSelecionados.length} selecionado(s)`}
                          </span>
                        </div>

                        {/* Chips de Cargos Selecionados */}
                        {cargosSelecionados.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {cargosSelecionados.map((c) => (
                              <span
                                key={c}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#055F6D] dark:bg-blue-600 text-white shadow-xs animate-in fade-in"
                              >
                                <span>{c}</span>
                                <button
                                  type="button"
                                  onClick={() => toggleCargo(c)}
                                  className="w-4 h-4 rounded-full hover:bg-white/20 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer text-sm leading-none"
                                  title={`Remover ${c}`}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Lista de Chips clicáveis para alternar cargos */}
                        <div className="pt-1">
                          <p className="text-[10px] text-slate-400 font-medium mb-1.5">Clique para selecionar ou desmarcar cargos:</p>
                          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                            {listaCargosUnicos.map((cNome) => {
                              const selecionado = cargosSelecionados.some((s) => s.toLowerCase() === cNome.toLowerCase());
                              return (
                                <button
                                  key={cNome}
                                  type="button"
                                  onClick={() => toggleCargo(cNome)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border cursor-pointer ${selecionado
                                      ? 'bg-teal-50 dark:bg-blue-950/60 border-[#055F6D] dark:border-blue-500 text-[#055F6D] dark:text-blue-300 font-bold shadow-xs'
                                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100/70 dark:hover:bg-slate-800'
                                    }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${selecionado ? 'bg-[#055F6D] dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'}`} />
                                  {cNome}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Adicionar Cargo Personalizado */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            placeholder="Outro cargo (digite e pressione Enter ou clique em +)"
                            value={novoCargoPersonalizado}
                            onChange={(e) => setNovoCargoPersonalizado(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (novoCargoPersonalizado.trim()) {
                                  toggleCargo(novoCargoPersonalizado.trim());
                                  setNovoCargoPersonalizado('');
                                }
                              }
                            }}
                            className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#055F6D] dark:focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (novoCargoPersonalizado.trim()) {
                                toggleCargo(novoCargoPersonalizado.trim());
                                setNovoCargoPersonalizado('');
                              }
                            }}
                            disabled={!novoCargoPersonalizado.trim()}
                            className="px-3 py-1.5 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 rounded-xl text-slate-700 dark:text-slate-200 transition cursor-pointer"
                          >
                            + Adicionar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="sm:col-span-2 lg:col-span-3">
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] dark:text-slate-400 mb-1">Cargos / Funções</label>
                        <div className="flex flex-wrap gap-1.5">
                          {cargosSelecionados.length > 0 ? (
                            cargosSelecionados.map((c) => (
                              <span
                                key={c}
                                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                              >
                                {c}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Membro</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Célula, Zona e outros campos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {!dis ? (
                        <>
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-muted)] dark:text-slate-400 mb-0.5">Célula</label>
                            <select value={celulaId} onChange={(e) => setCelulaId(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100">
                              <option value="">Nenhuma</option>
                              {celulas.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium text-[var(--text-muted)] dark:text-slate-400 mb-0.5">Zona</label>
                            <select value={zonaId} onChange={(e) => setZonaId(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100">
                              <option value="">Nenhuma</option>
                              {zonas.map((z) => <option key={z.id} value={z.id}>{z.nome}</option>)}
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <CampoLinha label="Célula" valor={nomeCelula} />
                          <CampoLinha label="Zona" valor={nomeZona} />
                        </>
                      )}
                      <CampoInput label="Data de conversão" value={dataConversao} onChange={setDataConversao} disabled={dis} mask={mascaraDataBR} />
                      <CampoInput label="Data de batismo" value={dataBatismo} onChange={setDataBatismo} disabled={dis} mask={mascaraDataBR} />
                      {!dis ? (
                        <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] dark:text-slate-200 pt-5">
                          <input type="checkbox" checked={batizadoAguas} onChange={(e) => setBatizadoAguas(e.target.checked)} className="rounded" />
                          Batizado nas águas
                        </label>
                      ) : (
                        <CampoLinha label="Batizado nas águas" valor={batizadoAguas ? 'Sim' : 'Não'} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="section-group !bg-gradient-to-br !from-[#055F6D] !to-[#034c57] dark:!from-[#17223b] dark:!to-[#1c2b4a] border border-[#034c57] dark:border-[#2b3954] shadow-lg">
                  <h3 className="section-title !text-white !border-b !border-white/10 dark:!border-white/10">Vínculo Familiar</h3>
                  <div className="section-body space-y-3">
                    {!dis ? (
                      <>
                        <div>
                          <label className="block text-[11px] font-semibold text-teal-100 dark:text-slate-300 mb-0.5">Cônjuge</label>
                          <select value={conjugeId} onChange={(e) => setConjugeId(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 dark:text-slate-100">
                            <option value="">Sem cônjuge vinculado</option>
                            {listaPessoas.filter((p) => String(p.id) !== String(pessoaId)).map((p) => (
                              <option key={p.id} value={p.id}>{p.nome}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[11px] font-semibold text-teal-100 dark:text-slate-300 mb-0.5">Pais / Responsáveis</label>
                          <input type="text" value={filtroBuscaPai} onChange={(e) => setFiltroBuscaPai(e.target.value)} placeholder="Buscar pai/mãe na base..." className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl mb-1 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />
                          {filtroBuscaPai && (
                            <div className="border border-slate-200 dark:border-slate-700 rounded-xl max-h-32 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 shadow-sm text-slate-800 dark:text-slate-100">
                              {pessoasParaPais.slice(0, 8).map((p) => (
                                <button key={p.id} type="button" onClick={() => { togglePaiMae(p.id); setFiltroBuscaPai(''); }} className="w-full text-left px-3 py-2 text-xs hover:bg-[var(--surface-muted)] dark:hover:bg-slate-800 flex justify-between">
                                  <span>{p.nome}</span>
                                  <span className={idsPaisEdit.includes(p.id) ? 'text-[#055F6D] dark:text-blue-400 font-bold' : ''}>
                                    {idsPaisEdit.includes(p.id) ? '✓ Vinculado' : '+ Adicionar'}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mt-1">
                            {pais.map((p) => (
                              <span key={p.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-slate-200/50 dark:border-slate-700 text-xs bg-white/95 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
                                {String(p.genero || '').toLowerCase().startsWith('f') ? (
                                  <svg className="w-3.5 h-3.5 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 21a6 6 0 0 0-12 0" />
                                    <circle cx="12" cy="10" r="4" />
                                    <path d="M12 2v2M12 18h.01" />
                                  </svg>
                                ) : (
                                  <svg className="w-3.5 h-3.5 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                  </svg>
                                )}
                                <span>{p.nome}</span>
                                <button type="button" onClick={() => togglePaiMae(p.id)} className="text-slate-400 hover:text-red-500 font-bold ml-1 cursor-pointer">✕</button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[11px] font-semibold text-teal-100 dark:text-slate-300 mb-0.5">Filhos</label>
                          <input type="text" value={filtroBuscaFilho} onChange={(e) => setFiltroBuscaFilho(e.target.value)} placeholder="Buscar filho na base..." className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl mb-1 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />
                          {filtroBuscaFilho && (
                            <div className="border border-slate-200 dark:border-slate-700 rounded-xl max-h-32 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 shadow-sm text-slate-800 dark:text-slate-100">
                              {pessoasParaFilhos.slice(0, 8).map((p) => (
                                <button key={p.id} type="button" onClick={() => { toggleFilho(p.id); setFiltroBuscaFilho(''); }} className="w-full text-left px-3 py-2 text-xs hover:bg-[var(--surface-muted)] dark:hover:bg-slate-800 flex justify-between">
                                  <span>{p.nome}</span>
                                  <span className={idsFilhosEdit.includes(p.id) ? 'text-[#055F6D] dark:text-blue-400 font-bold' : ''}>
                                    {idsFilhosEdit.includes(p.id) ? '✓ Vinculado' : '+ Adicionar'}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mt-1">
                            {filhos.map((p) => (
                              <span key={p.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-slate-200/50 dark:border-slate-700 text-xs bg-white/95 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
                                {String(p.genero || '').toLowerCase().startsWith('f') ? (
                                  <svg className="w-3.5 h-3.5 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                    <path d="M12 2a4 4 0 0 1 4 4" />
                                  </svg>
                                ) : (
                                  <svg className="w-3.5 h-3.5 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                  </svg>
                                )}
                                <span>{p.nome}</span>
                                <button type="button" onClick={() => toggleFilho(p.id)} className="text-slate-400 hover:text-red-500 font-bold ml-1 cursor-pointer">✕</button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4 pt-1">
                        {conjugeObj && (
                          <div>
                            <p className="text-[10px] font-bold uppercase text-teal-200 tracking-wider mb-2">Cônjuge</p>
                            <div className="flex flex-wrap gap-3">
                              <RenderCardParente parente={conjugeObj} relacao="Cônjuge" />
                            </div>
                          </div>
                        )}

                        {pais.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold uppercase text-teal-200 tracking-wider mb-2">Pais / Responsáveis</p>
                            <div className="flex flex-wrap gap-3">
                              {pais.map((p) => (
                                <RenderCardParente key={p.id} parente={p} relacao="Pai / Responsável" />
                              ))}
                            </div>
                          </div>
                        )}

                        {irmaos.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold uppercase text-teal-200 tracking-wider mb-2">Irmãos</p>
                            <div className="flex flex-wrap gap-3">
                              {irmaos.map((irm) => (
                                <RenderCardParente key={irm.id} parente={irm} relacao="Irmão(a)" />
                              ))}
                            </div>
                          </div>
                        )}

                        {filhos.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold uppercase text-teal-200 tracking-wider mb-2">Filhos</p>
                            <div className="flex flex-wrap gap-3">
                              {filhos.map((f) => (
                                <RenderCardParente key={f.id} parente={f} relacao="Filho(a)" />
                              ))}
                            </div>
                          </div>
                        )}

                        {!conjugeObj && pais.length === 0 && irmaos.length === 0 && filhos.length === 0 && (
                          <div className="text-sm text-teal-200/70 italic py-2">
                            Nenhum vínculo familiar cadastrado.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {abaAtiva === 'adicionais' && !isStudentCadernetaView && (
              <div className="space-y-6">
                {/* Novo Ambiente: Perfil Comportamental (Cards clicáveis com modal detalhado) */}
                <div className="section-group">
                  <div>
                    <h3 className="section-title">Perfil Comportamental</h3>
                    <p className="section-subtitle">Clique em qualquer arquétipo para explorar comportamentos, pontos fortes, melhorias e motivações.</p>
                  </div>
                  <div className="section-body grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        codigo: 'I',
                        nome: 'Águia',
                        subtitulo: 'Idealização • Fazer Diferente',
                        emoji: '🦅',
                        valor: perfilAguia,
                        setter: setPerfilAguia,
                        barCor: '#10b981',
                        cardCls: 'border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/25 hover:border-emerald-400 dark:hover:border-emerald-500/70',
                        inputCls: 'border-emerald-200 dark:border-emerald-800/70 focus:ring-emerald-500/20',
                        badgeCls: 'text-emerald-700 dark:text-emerald-300',
                      },
                      {
                        codigo: 'C',
                        nome: 'Gato',
                        subtitulo: 'Comunicação • Fazer Junto',
                        emoji: '🐈',
                        valor: perfilGato,
                        setter: setPerfilGato,
                        barCor: '#f59e0b',
                        cardCls: 'border-amber-200/80 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/25 hover:border-amber-400 dark:hover:border-amber-500/70',
                        inputCls: 'border-amber-200 dark:border-amber-800/70 focus:ring-amber-500/20',
                        badgeCls: 'text-amber-700 dark:text-amber-300',
                      },
                      {
                        codigo: 'O',
                        nome: 'Lobo',
                        subtitulo: 'Organização • Fazer Certo',
                        emoji: '🐺',
                        valor: perfilLobo,
                        setter: setPerfilLobo,
                        barCor: '#3b82f6',
                        cardCls: 'border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/25 hover:border-blue-400 dark:hover:border-blue-500/70',
                        inputCls: 'border-blue-200 dark:border-blue-800/70 focus:ring-blue-500/20',
                        badgeCls: 'text-blue-700 dark:text-blue-300',
                      },
                      {
                        codigo: 'A',
                        nome: 'Tubarão',
                        subtitulo: 'Ação • Fazer Rápido',
                        emoji: '🦈',
                        valor: perfilTubarao,
                        setter: setPerfilTubarao,
                        barCor: '#ef4444',
                        cardCls: 'border-rose-200/80 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/25 hover:border-rose-400 dark:hover:border-rose-500/70',
                        inputCls: 'border-rose-200 dark:border-rose-800/70 focus:ring-rose-500/20',
                        badgeCls: 'text-rose-700 dark:text-rose-300',
                      },
                    ].map((card) => {
                      const pctNum = Math.min(100, Math.max(0, Number(card.valor) || 0));
                      return (
                        <div
                          key={card.codigo}
                          role="button"
                          tabIndex={0}
                          onClick={() => setPerfilModalAberto(card.codigo)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setPerfilModalAberto(card.codigo);
                            }
                          }}
                          title={`Ver perfil detalhado de ${card.nome}`}
                          className={`group relative overflow-hidden p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] ${card.cardCls}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl shrink-0 transition-transform duration-200 group-hover:scale-110">{card.emoji}</span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-tight">{card.nome}</span>
                                <ChevronRight size={14} className={`opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ${card.badgeCls}`} />
                              </div>
                              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate mt-0.5">{card.subtitulo}</p>
                            </div>

                            {dis ? (
                              <span className={`text-lg font-black tabular-nums shrink-0 ${card.badgeCls}`}>
                                {card.valor !== '' && card.valor !== null && card.valor !== undefined ? `${card.valor}%` : '—'}
                              </span>
                            ) : (
                              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={card.valor}
                                  onChange={(e) => card.setter(e.target.value)}
                                  className={`w-16 px-2 py-1 border rounded-lg text-right bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-bold focus:ring-2 outline-none ${card.inputCls}`}
                                />
                                <span className="text-[11px] font-bold text-slate-400">%</span>
                              </div>
                            )}
                          </div>

                          {/* Barra de intensidade sutil + dica clicável */}
                          <div className="mt-3 flex items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-slate-200/80 dark:bg-slate-800/90 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${pctNum}%`, backgroundColor: card.barCor }}
                              />
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity ${card.badgeCls}`}>
                              Ver perfil
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Novo Ambiente: Personalidade (Temperamentos clicáveis) */}
                <div className="section-group">
                  <div>
                    <h3 className="section-title">Temperamentos</h3>
                    <p className="section-subtitle">Clique em um temperamento para ver detalhes, forças e aptidões (Escala 7–35).</p>
                  </div>
                  <div className="section-body">
                    {testePersonalidade ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { chave: 'colerico', nome: 'Colérico', emoji: '🔥', val: testePersonalidade.colerico, cor: '#dc2626', cardCls: 'border-red-200/80 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/25 hover:border-red-400 dark:hover:border-red-500/70', txtCls: 'text-red-600 dark:text-red-400' },
                            { chave: 'melancolico', nome: 'Melancólico', emoji: '📋', val: testePersonalidade.melancolico, cor: '#9333ea', cardCls: 'border-purple-200/80 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/25 hover:border-purple-400 dark:hover:border-purple-500/70', txtCls: 'text-purple-600 dark:text-purple-400' },
                            { chave: 'sanguineo', nome: 'Sanguíneo', emoji: '☀️', val: testePersonalidade.sanguineo, cor: '#d97706', cardCls: 'border-amber-200/80 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/25 hover:border-amber-400 dark:hover:border-amber-500/70', txtCls: 'text-amber-600 dark:text-amber-400' },
                            { chave: 'fleumatico', nome: 'Fleumático', emoji: '💧', val: testePersonalidade.fleumatico, cor: '#0891b2', cardCls: 'border-cyan-200/80 dark:border-cyan-900/60 bg-cyan-50/40 dark:bg-cyan-950/25 hover:border-cyan-400 dark:hover:border-cyan-500/70', txtCls: 'text-cyan-600 dark:text-cyan-400' },
                          ].map((t) => {
                            const pct = Math.min(100, Math.round(((Number(t.val) || 0) / 35) * 100));
                            return (
                              <div
                                key={t.chave}
                                role="button"
                                tabIndex={0}
                                onClick={() => setTemperamentoModalAberto(t.chave)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setTemperamentoModalAberto(t.chave);
                                  }
                                }}
                                className={`group p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] ${t.cardCls}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl transition-transform group-hover:scale-110">{t.emoji}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                      <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">{t.nome}</span>
                                      <ChevronRight size={14} className={`opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ${t.txtCls}`} />
                                    </div>
                                    <span className="text-[10px] font-semibold text-slate-400">Clique para detalhes</span>
                                  </div>
                                  <span className={`text-lg font-black tabular-nums ${t.txtCls}`}>{t.val}</span>
                                </div>
                                <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-200/80 dark:bg-slate-800/90 overflow-hidden">
                                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: t.cor }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="p-3 bg-[#055F6D]/5 dark:bg-slate-800/60 rounded-xl border border-[#055F6D]/10 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Perfil Dominante:</span>
                            <span className="text-xs font-black text-[#055F6D] dark:text-blue-400 uppercase">{testePersonalidade.dominant} + {testePersonalidade.secondary}</span>
                          </div>
                          <span className="text-[9px] text-slate-400 font-bold">Realizado em: {new Date(testePersonalidade.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 italic py-4 text-center">Nenhum teste de personalidade registrado para este membro.</p>
                    )}
                  </div>
                </div>

                {/* Novo Ambiente: Atividade Cerebral (Quadrantes clicáveis) */}
                <div className="section-group">
                  <div>
                    <h3 className="section-title">Atividade Cerebral</h3>
                    <p className="section-subtitle">Clique em qualquer quadrante cerebral para ver análise detalhada e aptidões (0 a 100).</p>
                  </div>
                  <div className="section-body flex flex-col items-center justify-center gap-3">
                    {(() => {
                      const renderCardCerebral = ({ chave, titulo, subtitulo, emoji, valor, setter, barCor, cardCls, inputCls, badgeCls }) => {
                        const pctNum = Math.min(100, Math.max(0, Number(valor) || 0));
                        return (
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setCerebralModalAberto(chave)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setCerebralModalAberto(chave);
                              }
                            }}
                            title={`Ver análise completa de ${titulo}`}
                            className={`group w-full p-3 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] ${cardCls}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl shrink-0 transition-transform group-hover:scale-110">{emoji}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider truncate">{titulo}</span>
                                  <ChevronRight size={13} className={`opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ${badgeCls}`} />
                                </div>
                                <span className="block text-[9px] font-semibold text-slate-400 truncate">{subtitulo}</span>
                              </div>
                              {dis ? (
                                <span className={`text-base font-black tabular-nums shrink-0 ${badgeCls}`}>
                                  {valor !== '' && valor !== null && valor !== undefined ? `${valor}%` : '—'}
                                </span>
                              ) : (
                                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={valor}
                                    onChange={(e) => setter(e.target.value)}
                                    className={`w-14 px-2 py-1 border rounded-lg text-right bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs font-bold focus:ring-2 outline-none ${inputCls}`}
                                  />
                                  <span className="text-[10px] font-bold text-slate-400">%</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-2.5 flex items-center gap-2">
                              <div className="h-1.5 flex-1 rounded-full bg-slate-200/80 dark:bg-slate-800/90 overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pctNum}%`, backgroundColor: barCor }} />
                              </div>
                              <span className={`text-[9px] font-black uppercase tracking-wider opacity-70 group-hover:opacity-100 ${badgeCls}`}>
                                Análise
                              </span>
                            </div>
                          </div>
                        );
                      };

                      return (
                        <>
                          {/* Pensante (Topo) */}
                          <div className="w-full max-w-xs">
                            {renderCardCerebral({
                              chave: 'pensante',
                              titulo: 'Pensante',
                              subtitulo: 'Anterior • O + I',
                              emoji: '🧠',
                              valor: perfilPensante,
                              setter: setPerfilPensante,
                              barCor: '#3b82f6',
                              cardCls: 'border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/25 hover:border-blue-400 dark:hover:border-blue-500/70',
                              inputCls: 'border-blue-200 dark:border-blue-800/70 focus:ring-blue-500/20',
                              badgeCls: 'text-blue-700 dark:text-blue-300',
                            })}
                          </div>

                          {/* Razão (Esquerda) e Emoção (Direita) */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-lg gap-3">
                            {renderCardCerebral({
                              chave: 'razao',
                              titulo: 'Razão',
                              subtitulo: 'Esquerdo • A + O',
                              emoji: '⚖️',
                              valor: perfilRazao,
                              setter: setPerfilRazao,
                              barCor: '#10b981',
                              cardCls: 'border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/25 hover:border-emerald-400 dark:hover:border-emerald-500/70',
                              inputCls: 'border-emerald-200 dark:border-emerald-800/70 focus:ring-emerald-500/20',
                              badgeCls: 'text-emerald-700 dark:text-emerald-300',
                            })}
                            {renderCardCerebral({
                              chave: 'emocao',
                              titulo: 'Emoção',
                              subtitulo: 'Direito • I + C',
                              emoji: '❤️',
                              valor: perfilEmocao,
                              setter: setPerfilEmocao,
                              barCor: '#e11d48',
                              cardCls: 'border-rose-200/80 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/25 hover:border-rose-400 dark:hover:border-rose-500/70',
                              inputCls: 'border-rose-200 dark:border-rose-800/70 focus:ring-rose-500/20',
                              badgeCls: 'text-rose-700 dark:text-rose-300',
                            })}
                          </div>

                          {/* Atuante (Inferior) */}
                          <div className="w-full max-w-xs">
                            {renderCardCerebral({
                              chave: 'atuante',
                              titulo: 'Atuante',
                              subtitulo: 'Posterior • C + A',
                              emoji: '💪',
                              valor: perfilAtuante,
                              setter: setPerfilAtuante,
                              barCor: '#f59e0b',
                              cardCls: 'border-amber-200/80 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/25 hover:border-amber-400 dark:hover:border-amber-500/70',
                              inputCls: 'border-amber-200 dark:border-amber-800/70 focus:ring-amber-500/20',
                              badgeCls: 'text-amber-700 dark:text-amber-300',
                            })}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Novo Ambiente: Consideração Inteligente & Aptidão Ministerial (Cruzamento dos 3 Testes) */}
                {analiseInteligente && (
                  <div className="section-group">
                    <div>
                      <h3 className="section-title flex items-center gap-2">
                        <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                        Consideração Inteligente &amp; Aptidão Ministerial
                      </h3>
                      <p className="section-subtitle">
                        Leitura integrada combinando os resultados disponíveis ({analiseInteligente.fontesAtivas.join(' + ')}).
                      </p>
                    </div>
                    <div className="section-body space-y-5">
                      {/* Cabeçalho da Síntese Integrada */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a8a] via-indigo-800 to-slate-900 p-5 text-white shadow-md border border-white/10">
                        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
                        <div className="relative space-y-2.5">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {analiseInteligente.fontesAtivas.map((f) => (
                              <span key={f} className="text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 text-blue-100 border border-white/15">
                                ✓ {f}
                              </span>
                            ))}
                          </div>
                          <h4 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                            {analiseInteligente.tituloSintese}
                          </h4>
                          {analiseInteligente.paragrafosSintese.map((p, idx) => (
                            <p key={idx} className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Leitura Inteligente da Atividade Cerebral */}
                      {(analiseInteligente.hemisferioDominante || analiseInteligente.eixoAcaoDominante) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {analiseInteligente.hemisferioDominante && (
                            <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                                <span>{analiseInteligente.hemisferioDominante.emoji}</span>
                                {analiseInteligente.hemisferioDominante.titulo}
                              </span>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {analiseInteligente.hemisferioDominante.desc}
                              </p>
                            </div>
                          )}
                          {analiseInteligente.eixoAcaoDominante && (
                            <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                <span>{analiseInteligente.eixoAcaoDominante.emoji}</span>
                                {analiseInteligente.eixoAcaoDominante.titulo}
                              </span>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {analiseInteligente.eixoAcaoDominante.desc}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Aptidões Ministeriais Ranqueadas */}
                      {analiseInteligente.aptidoesRanqueadas.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Target size={15} className="text-emerald-600 dark:text-emerald-400" />
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                              Aptidões Ministeriais com Maior Afinidade
                            </h4>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {analiseInteligente.aptidoesRanqueadas.map((ap, i) => (
                              <div
                                key={ap.nome}
                                className="p-3.5 rounded-2xl bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-2 shadow-2xs"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2 min-w-0">
                                    <span className="text-base shrink-0">{ap.icone}</span>
                                    <span className="truncate">{ap.nome}</span>
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${i === 0
                                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                                      : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                                    }`}>
                                    {ap.afinidade}% afinidade
                                  </span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                    style={{ width: `${ap.afinidade}%` }}
                                  />
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                                  {ap.motivo}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recomendações de Pastoreio/Liderança + Pontos de Equilíbrio */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {analiseInteligente.recomendacoesLideranca.length > 0 && (
                          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/25 border border-emerald-200/70 dark:border-emerald-800/50 space-y-2">
                            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                              <CheckCircle2 size={15} />
                              <h4 className="text-[11px] font-black uppercase tracking-wider">Como Potencializar &amp; Motivar</h4>
                            </div>
                            <ul className="space-y-1.5">
                              {analiseInteligente.recomendacoesLideranca.map((rec) => (
                                <li key={rec} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-snug">
                                  <span className="text-emerald-600 dark:text-emerald-400 font-black mt-0.5">•</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {analiseInteligente.pontosEquilibrio.length > 0 && (
                          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/25 border border-amber-200/70 dark:border-amber-800/50 space-y-2">
                            <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                              <TrendingUp size={15} />
                              <h4 className="text-[11px] font-black uppercase tracking-wider">Pontos de Atenção &amp; Discipulado</h4>
                            </div>
                            <ul className="space-y-1.5">
                              {analiseInteligente.pontosEquilibrio.map((pt) => (
                                <li key={pt} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 leading-snug">
                                  <span className="text-amber-600 dark:text-amber-400 font-black mt-0.5">•</span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Evolução Histórica do Perfil Comportamental */}
                {historicoPerfil.length > 0 && (
                  <div className="section-group">
                    <div>
                      <h3 className="section-title flex items-center gap-2">
                        <History size={16} className="text-indigo-600 dark:text-indigo-400" />
                        Evolução do Perfil Comportamental
                      </h3>
                      <p className="section-subtitle">
                        Histórico de {historicoPerfil.length} {historicoPerfil.length === 1 ? 'avaliação registrada' : 'avaliações registradas'} ao longo do tempo.
                      </p>
                    </div>
                    <div className="section-body space-y-4">
                      {historicoPerfil.length >= 2 && (() => {
                        const dadosEvolucao = [...historicoPerfil].reverse().map((h) => ({
                          data: h.created_at
                            ? new Date(h.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
                            : '—',
                          Águia: Number(h.perfil_aguia) || 0,
                          Gato: Number(h.perfil_gato) || 0,
                          Lobo: Number(h.perfil_lobo) || 0,
                          Tubarão: Number(h.perfil_tubarao) || 0,
                        }));
                        return (
                          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Curva de Evolução dos 4 Arquétipos (%)
                              </span>
                              <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold">
                                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Águia</span>
                                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Gato</span>
                                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Lobo</span>
                                <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Tubarão</span>
                              </div>
                            </div>
                            <div className="h-52 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dadosEvolucao} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b833" />
                                  <XAxis dataKey="data" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                                  <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                                  <Tooltip formatter={(val) => [`${val}%`]} />
                                  <Line type="monotone" dataKey="Águia" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                                  <Line type="monotone" dataKey="Gato" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
                                  <Line type="monotone" dataKey="Lobo" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
                                  <Line type="monotone" dataKey="Tubarão" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        );
                      })()}

                      <div className="space-y-2.5">
                        {historicoPerfil.map((reg, idx) => {
                          const anterior = historicoPerfil[idx + 1] || null;
                          const dataFmt = reg.created_at
                            ? new Date(reg.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
                            : '—';
                          const renderDelta = (atual, prev) => {
                            if (prev === null || prev === undefined) return null;
                            const diff = (Number(atual) || 0) - (Number(prev) || 0);
                            if (diff === 0) return null;
                            return (
                              <span className={`ml-1 text-[10px] font-black ${diff > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                                ({diff > 0 ? `+${diff}%` : `${diff}%`})
                              </span>
                            );
                          };
                          return (
                            <div
                              key={reg.id}
                              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                                    {reg.dominante || 'Perfil'}{reg.secundario ? ` / ${reg.secundario}` : ''}
                                  </span>
                                  {idx === 0 && (
                                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                      Atual
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] font-semibold text-slate-400">{dataFmt}</span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                                <div className="px-2.5 py-1.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300">
                                  🦅 Águia: {reg.perfil_aguia}%{renderDelta(reg.perfil_aguia, anterior?.perfil_aguia)}
                                </div>
                                <div className="px-2.5 py-1.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50 text-amber-700 dark:text-amber-300">
                                  🐈 Gato: {reg.perfil_gato}%{renderDelta(reg.perfil_gato, anterior?.perfil_gato)}
                                </div>
                                <div className="px-2.5 py-1.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/50 text-blue-700 dark:text-blue-300">
                                  🐺 Lobo: {reg.perfil_lobo}%{renderDelta(reg.perfil_lobo, anterior?.perfil_lobo)}
                                </div>
                                <div className="px-2.5 py-1.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/50 text-rose-700 dark:text-rose-300">
                                  🦈 Tubarão: {reg.perfil_tubarao}%{renderDelta(reg.perfil_tubarao, anterior?.perfil_tubarao)}
                                </div>
                              </div>

                              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex flex-wrap gap-x-3 gap-y-1">
                                <span>🧠 Pensante: <strong>{reg.perfil_pensante}%</strong></span>
                                <span>💪 Atuante: <strong>{reg.perfil_atuante}%</strong></span>
                                <span>⚖️ Razão: <strong>{reg.perfil_razao}%</strong></span>
                                <span>❤️ Emoção: <strong>{reg.perfil_emocao}%</strong></span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Novo Ambiente: Área de Atuação */}
                <div className="section-group">
                  <div><h3 className="section-title">Área de Atuação</h3><p className="section-subtitle">Selecione os ministérios e departamentos onde o membro serve ou tem aptidão.</p></div>
                  <div className="section-body">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {atuacoes.map((a) => {
                        const selecionado = Array.isArray(atuacao) && atuacao.includes(a.nome);
                        return (
                          <button
                            key={a.id}
                            type="button"
                            disabled={dis}
                            onClick={() => {
                              const novaLista = selecionado
                                ? atuacao.filter(item => item !== a.nome)
                                : [...atuacao, a.nome];
                              setAtuacao(novaLista);
                            }}
                            className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${selecionado
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-300 ring-2 ring-emerald-500/10'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-700 text-slate-600 dark:text-slate-300'
                              } ${dis ? 'cursor-default opacity-80' : 'cursor-pointer hover:shadow-sm'}`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selecionado ? 'bg-emerald-600 border-emerald-600' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'}`}>
                              {selecionado && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <span className="text-xs font-bold">{a.nome}</span>
                          </button>
                        );
                      })}
                      {atuacoes.length === 0 && (
                        <p className="col-span-full text-center text-sm text-slate-400 italic py-4">Nenhuma atuação cadastrada nas configurações.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="section-group">
                  <h3 className="section-title">Observações Acadêmicas e Perfil</h3>
                  <div className="section-body grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] dark:text-slate-400 mb-1">Avaliações da Escola de Discípulos</label>
                      <textarea disabled={dis} value={avaliacaoEscola} onChange={(e) => setAvaliacaoEscola(e.target.value)} rows={4} className="w-full px-3 py-2 text-sm border border-[var(--border)] dark:border-slate-700 rounded-xl disabled:bg-[var(--surface-muted)] dark:disabled:bg-slate-800/40 dark:bg-slate-900 dark:text-slate-100" placeholder="Registros de avaliação, módulos concluídos..." />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] dark:text-slate-400 mb-1">Atividade cerebral</label>
                      <textarea disabled={dis} value={atividadeCerebral} onChange={(e) => setAtividadeCerebral(e.target.value)} rows={3} className="w-full px-3 py-2 text-sm border border-[var(--border)] dark:border-slate-700 rounded-xl disabled:bg-[var(--surface-muted)] dark:disabled:bg-slate-800/40 dark:bg-slate-900 dark:text-slate-100" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {abaAtiva === 'escola' && !isStudentCadernetaView && (
              <div className="space-y-6">
                <div className="section-group">
                  <div>
                    <h3 className="section-title">Matrículas Ativas</h3>
                    <p className="section-subtitle">Clique em uma turma para visualizar o boletim, notas e frequência detalhada.</p>
                  </div>
                  <div className="section-body">
                    {matriculasMembro.length === 0 ? (
                      <p className="text-sm text-slate-400 italic">Este membro não possui matrículas ativas.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {matriculasMembro.map(m => {
                          const isDesistente = m.status === 'desistente';
                          const selecionada = m.turmas?.id && turmaBoletimSelecionadaId === m.turmas.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => m.turmas?.id && carregarBoletimEscola(m.turmas.id)}
                              className={`text-left p-3.5 rounded-2xl border flex justify-between items-center gap-3 transition-all cursor-pointer ${selecionada
                                  ? 'ring-2 ring-blue-500/40 border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-sm'
                                  : isDesistente
                                    ? 'border-rose-100 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/30 hover:border-rose-300'
                                    : 'border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-700'
                                }`}
                            >
                              <div className="min-w-0">
                                <p className={`text-[10px] font-bold uppercase truncate ${isDesistente ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                  {m.turmas?.escolas?.nome}
                                </p>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{m.turmas?.nome}</p>
                                {selecionada && (
                                  <span className="inline-block text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-0.5">
                                    ● Exibindo boletim
                                  </span>
                                )}
                              </div>
                              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shrink-0 ${isDesistente ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300' : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'}`}>
                                {m.status}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Boletim Escolar, Notas e Frequência */}
                {matriculasMembro.length > 0 && (
                  <div className="section-group">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="section-title">Boletim &amp; Frequência Escolar</h3>
                        <p className="section-subtitle">
                          {boletimEscola
                            ? `${boletimEscola.escolaNome} • ${boletimEscola.turmaNome}${boletimEscola.matriculaCodigo ? ` (Matrícula: ${boletimEscola.matriculaCodigo})` : ''}`
                            : 'Desempenho acadêmico e presença nas aulas do módulo Escolas.'}
                        </p>
                      </div>
                    </div>

                    <div className="section-body space-y-5">
                      {carregandoBoletimEscola ? (
                        <p className="text-sm text-slate-400 italic py-6 text-center animate-pulse">
                          Carregando boletim e histórico de frequência...
                        </p>
                      ) : !boletimEscola ? (
                        <p className="text-sm text-slate-400 italic py-6 text-center">
                          Nenhum dado acadêmico encontrado para esta turma.
                        </p>
                      ) : (
                        <>
                          {/* 4 Cards Resumo Acadêmico */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/35 border border-blue-200/70 dark:border-blue-800/50">
                              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
                                Média Geral
                              </span>
                              <p className="text-2xl font-black text-blue-700 dark:text-blue-300 mt-1 leading-none">
                                {boletimEscola.mediaGeral !== null ? boletimEscola.mediaGeral.toFixed(1) : '—'}
                              </p>
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
                                Escala 0 a 10
                              </span>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/35 border border-emerald-200/70 dark:border-emerald-800/50">
                              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                                Frequência
                              </span>
                              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1 leading-none">
                                {boletimEscola.frequenciaGeral !== null ? `${boletimEscola.frequenciaGeral}%` : '—'}
                              </p>
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
                                {boletimEscola.totalAulasGeral > 0
                                  ? `${boletimEscola.totalPresencasGeral}/${boletimEscola.totalAulasGeral} aulas`
                                  : 'Sem aulas lançadas'}
                              </span>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/35 border border-rose-200/70 dark:border-rose-800/50">
                              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300 block">
                                Faltas
                              </span>
                              <p className="text-2xl font-black text-rose-700 dark:text-rose-300 mt-1 leading-none">
                                {boletimEscola.totalFaltasGeral}
                              </p>
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
                                {boletimEscola.totalFaltasGeral === 1 ? 'ausência registrada' : 'ausências registradas'}
                              </span>
                            </div>

                            <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/35 border border-indigo-200/70 dark:border-indigo-800/50">
                              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                                Situação
                              </span>
                              <p className="text-base font-black text-indigo-700 dark:text-indigo-300 mt-1.5 leading-tight">
                                {boletimEscola.frequenciaGeral !== null && boletimEscola.frequenciaGeral < 75
                                  ? 'Atenção Freq.'
                                  : boletimEscola.mediaGeral !== null
                                    ? boletimEscola.mediaGeral >= 7
                                      ? 'Bom Desempenho'
                                      : 'Em Recuperação'
                                    : 'Em Andamento'}
                              </p>
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
                                {boletimEscola.disciplinas.length} {boletimEscola.disciplinas.length === 1 ? 'disciplina' : 'disciplinas'}
                              </span>
                            </div>
                          </div>

                          {/* Tabela do Boletim por Disciplina */}
                          {boletimEscola.disciplinas.length === 0 ? (
                            <p className="text-xs text-slate-400 italic py-4 text-center">
                              Nenhuma disciplina vinculada a esta turma até o momento.
                            </p>
                          ) : (
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden">
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                  <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                      <th className="p-3">Disciplina</th>
                                      <th className="p-3 text-center">Nota</th>
                                      <th className="p-3 text-center">Frequência</th>
                                      <th className="p-3 text-center">Faltas</th>
                                      <th className="p-3 text-right">Situação</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                                    {boletimEscola.disciplinas.map((d) => {
                                      const notaCls =
                                        d.nota === null
                                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                          : d.nota >= 7
                                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                                            : d.nota >= 5
                                              ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300'
                                              : 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300';

                                      const sitCls =
                                        d.situacao === 'Aprovado'
                                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                                          : d.situacao === 'Baixa Frequência' || d.situacao === 'Reprovado'
                                            ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300'
                                            : d.situacao === 'Recuperação'
                                              ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300'
                                              : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300';

                                      return (
                                        <tr key={d.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                                          <td className="p-3">
                                            <p className="font-bold text-slate-800 dark:text-slate-100">{d.nome}</p>
                                            <p className="text-[10px] text-slate-400">Prof.: {d.professor}</p>
                                            {d.observacao && (
                                              <p className="text-[10px] italic text-blue-600 dark:text-blue-400 mt-0.5">
                                                Obs.: {d.observacao}
                                              </p>
                                            )}
                                          </td>
                                          <td className="p-3 text-center">
                                            <span className={`inline-block px-2.5 py-1 rounded-lg font-black tabular-nums ${notaCls}`}>
                                              {d.nota !== null ? d.nota.toFixed(1) : '—'}
                                            </span>
                                          </td>
                                          <td className="p-3 text-center">
                                            {d.frequencia !== null ? (
                                              <div className="inline-flex flex-col items-center gap-1 min-w-[72px]">
                                                <span className={`font-black text-xs ${d.frequencia >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                                  {d.frequencia}%
                                                </span>
                                                <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                                  <div
                                                    className={`h-full rounded-full ${d.frequencia >= 75 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                                    style={{ width: `${d.frequencia}%` }}
                                                  />
                                                </div>
                                              </div>
                                            ) : (
                                              <span className="text-slate-400">—</span>
                                            )}
                                          </td>
                                          <td className="p-3 text-center font-bold text-slate-600 dark:text-slate-300">
                                            {d.faltas}
                                          </td>
                                          <td className="p-3 text-right">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${sitCls}`}>
                                              {d.situacao}
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* Histórico Recente de Aulas */}
                          {boletimEscola.historicoAulas.length > 0 && (
                            <div className="space-y-2.5">
                              <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Últimas Aulas Registradas ({boletimEscola.historicoAulas.length})
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {boletimEscola.historicoAulas.map((aula) => (
                                  <div
                                    key={aula.id}
                                    className="px-3.5 py-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2"
                                  >
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                                        {aula.disciplina}
                                      </p>
                                      <p className="text-[10px] text-slate-400 truncate">
                                        {aula.data ? new Date(`${String(aula.data).split('T')[0]}T00:00:00`).toLocaleDateString('pt-BR') : 'Sem data'}
                                        {aula.titulo ? ` • ${aula.titulo}` : ''}
                                      </p>
                                    </div>
                                    <span
                                      className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 uppercase ${aula.presente
                                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                                          : 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300'
                                        }`}
                                    >
                                      {aula.presente ? 'Presente' : 'Falta'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="section-group">
                  <div><h3 className="section-title">Nova Matrícula</h3><p className="section-subtitle">Vincular membro a uma turma aberta.</p></div>
                  <div className="section-body">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {turmasDisponiveis
                        .filter(t => !matriculasMembro.some(m => m.turmas?.id === t.id))
                        .map(turma => (
                          <button
                            key={turma.id}
                            type="button"
                            onClick={() => handleMatricularEmTurma(turma.id)}
                            className="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/40 hover:border-[#055F6D] dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition group cursor-pointer"
                          >
                            <p className="text-[9px] font-bold text-slate-400 uppercase">{turma.escolas?.nome}</p>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#055F6D] dark:group-hover:text-blue-400">{turma.nome}</p>
                            <p className="text-[10px] text-[#055F6D] dark:text-blue-400 mt-2 font-bold">+ Matricular agora</p>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {abaAtiva === 'frequencia' && (
              <div className="section-group">
                <div><h3 className="section-title">Minha Frequência na Célula</h3><p className="section-subtitle">Histórico de presença nos encontros de célula.</p></div>
                <div className="section-body">
                  {carregandoPresenca ? (
                    <p className="text-sm text-slate-400 italic">Carregando histórico...</p>
                  ) : historicoPresenca.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">Nenhum registro de reunião para sua célula encontrado no sistema.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="table-mib">
                        <thead>
                          <tr>
                            <th>Data da Reunião</th>
                            <th className="text-right pr-6">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {historicoPresenca.map(item => (
                            <tr key={item.id}>
                              <td className="font-medium text-slate-700">
                                {new Date(item.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                              </td>
                              <td className="text-right pr-6">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.presente ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                  {item.presente ? '✅ PRESENTE' : '❌ AUSENTE'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {abaAtiva === 'financeiro' && !isStudentCadernetaView && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 p-4 rounded-2xl">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">Histórico Contribuitivo</h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Lançamentos vinculados a este membro no ano corrente.</p>
                  </div>
                  {!isMembro && (
                    <button
                      type="button"
                      onClick={() => setIsModalReceitaAberto(true)}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                    >
                      + Nova Receita
                    </button>
                  )}
                </div>

                {/* Tabela de Transações do Membro */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="p-3">Data</th>
                        <th className="p-3">Categoria</th>
                        <th className="p-3">Descrição</th>
                        <th className="p-3 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-200">
                      {contribuicoes.length === 0 ? (
                        <tr><td colSpan={4} className="p-8 text-center text-slate-400 italic">Nenhum lançamento vinculado a este membro.</td></tr>
                      ) : (
                        contribuicoes.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                            <td className="p-3 font-medium">{new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.tipo === 'receita' ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300'}`}>
                                {t.categorias_financeiras?.nome || '—'}
                              </span>
                            </td>
                            <td className="p-3">{t.descricao || '—'}</td>
                            <td className={`p-3 text-right font-bold ${t.tipo === 'receita' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                              R$ {Number(t.valor).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {abaAtiva === 'caderneta' && (
              <div className="section-group space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="section-title">Caderneta Escolar</h3>
                    <p className="section-subtitle">Notas e avaliações oficiais registradas por disciplina.</p>
                  </div>

                  {/* Seletor de Turma se o aluno estiver em mais de uma */}
                  {turmasDoAluno.length > 1 && (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Turma:</span>
                      <select
                        value={turmaSelecionadaAcademica || ''}
                        onChange={(e) => {
                          const novaT = e.target.value;
                          setTurmaSelecionadaAcademica(novaT);
                          carregarDadosAcademicos(novaT);
                        }}
                        className="px-3 py-1.5 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-[#055F6D] dark:text-blue-400 outline-none"
                      >
                        {turmasDoAluno.map(t => (
                          <option key={t.id} value={t.id}>{t.escolaNome} - {t.nome}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Banner de Feedback de Salvamento */}
                {mensagemSucessoNotas && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center justify-between animate-in fade-in">
                    <span>{mensagemSucessoNotas}</span>
                    <button type="button" onClick={() => setMensagemSucessoNotas('')} className="text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300">✕</button>
                  </div>
                )}

                <div className="section-body">
                  {carregandoAcademicos ? (
                    <div className="text-center py-10 text-sm text-slate-400 italic">Carregando caderneta do aluno...</div>
                  ) : disciplinasAcademicas.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 italic text-sm">
                      Nenhuma disciplina ou matrícula vinculada a este aluno no curso.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Métricas Resumidas do Aluno */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-150 dark:border-slate-700">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Média Geral</p>
                          <p className={`text-xl font-black ${cadernetaDados?.mediaGeral === null ? 'text-slate-400' :
                              cadernetaDados.mediaGeral >= 7.0 ? 'text-emerald-600 dark:text-emerald-400' :
                                cadernetaDados.mediaGeral >= 5.0 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'
                            }`}>
                            {cadernetaDados?.mediaGeral !== null ? cadernetaDados.mediaGeral.toFixed(1) : '---'}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-150 dark:border-slate-700">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Disciplinas</p>
                          <p className="text-xl font-black text-slate-700 dark:text-slate-100">
                            {disciplinasAcademicas.filter(d => d.nota !== null).length} <span className="text-xs text-slate-400 font-bold">/ {disciplinasAcademicas.length}</span>
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-150 dark:border-slate-700">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Frequência</p>
                          <p className="text-xl font-black text-teal-700 dark:text-teal-400">
                            {disciplinasAcademicas.length > 0
                              ? Math.round(disciplinasAcademicas.reduce((acc, d) => acc + d.frequencia, 0) / disciplinasAcademicas.length)
                              : 100}%
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-150 dark:border-slate-700">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Situação</p>
                          <p className="text-sm font-black mt-1">
                            {cadernetaDados?.mediaGeral === null ? (
                              <span className="text-slate-400 uppercase">Em Andamento</span>
                            ) : cadernetaDados.mediaGeral >= 7.0 ? (
                              <span className="text-emerald-600 dark:text-emerald-400 uppercase">✓ Aprovado</span>
                            ) : cadernetaDados.mediaGeral >= 5.0 ? (
                              <span className="text-amber-600 dark:text-amber-400 uppercase">Em Atenção</span>
                            ) : (
                              <span className="text-rose-600 dark:text-rose-400 uppercase">Reprovado</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Tabela de Lançamento e Visualização de Notas */}
                      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                        <table className="w-full text-left text-xs bg-white dark:bg-slate-900">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-black uppercase text-[10px] tracking-wider">
                              <th className="p-3">Disciplina</th>
                              <th className="p-3 hidden sm:table-cell">Professor</th>
                              <th className="p-3 text-center w-28">Nota (0 - 10)</th>
                              <th className="p-3">Observação da Avaliação</th>
                              <th className="p-3 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                            {disciplinasAcademicas.map((d, idx) => {
                              const nNum = d.notaInput !== '' && d.notaInput !== null
                                ? parseFloat(String(d.notaInput).replace(',', '.'))
                                : d.nota;

                              let estiloNota = 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 dark:bg-slate-950 focus:border-[#055F6D] dark:focus:border-blue-500';
                              if (nNum !== null && !isNaN(nNum)) {
                                if (nNum >= 7.0) estiloNota = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-extrabold';
                                else if (nNum >= 5.0) estiloNota = 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 font-extrabold';
                                else estiloNota = 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300 font-extrabold';
                              }

                              return (
                                <tr key={d.turmaDisciplinaId || idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition">
                                  <td className="p-3 font-bold text-slate-800 dark:text-slate-100">
                                    {d.nome}
                                    <div className="sm:hidden text-[10px] text-slate-400 font-normal">{d.professor}</div>
                                  </td>
                                  <td className="p-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{d.professor}</td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="text"
                                      inputMode="decimal"
                                      placeholder="-"
                                      value={d.notaInput !== undefined ? d.notaInput : (d.nota !== null ? String(d.nota) : '')}
                                      onChange={(e) => handleNotaChange(idx, e.target.value)}
                                      onBlur={() => {
                                        if (d.notaInput) {
                                          const num = parseFloat(String(d.notaInput).replace(',', '.'));
                                          if (!isNaN(num)) {
                                            const clamped = Math.min(10, Math.max(0, num));
                                            handleNotaChange(idx, String(clamped));
                                          }
                                        }
                                      }}
                                      className={`w-16 px-2 py-1.5 text-center text-xs border rounded-xl outline-none transition ${estiloNota}`}
                                    />
                                  </td>
                                  <td className="p-3">
                                    <input
                                      type="text"
                                      placeholder="Adicionar observação..."
                                      value={d.observacao || ''}
                                      onChange={(e) => handleObsDisciplinaChange(idx, e.target.value)}
                                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#055F6D] dark:focus:border-blue-500"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    {nNum === null || isNaN(nNum) ? (
                                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-400">Pendente</span>
                                    ) : nNum >= 7.0 ? (
                                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">Aprovado</span>
                                    ) : nNum >= 5.0 ? (
                                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">Recuperação</span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">Reprovado</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Botão de Salvar Alterações */}
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={handleSalvarNotasAcademico}
                          disabled={salvandoNotasAluno}
                          className="px-5 py-2.5 bg-[#055F6D] dark:bg-blue-600 hover:bg-[#034c57] dark:hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {salvandoNotasAluno ? (
                            <>
                              <span className="animate-spin">⏳</span>
                              <span>Gravando Notas...</span>
                            </>
                          ) : (
                            <>
                              <span>💾</span>
                              <span>Salvar Notas da Caderneta</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {abaAtiva === 'faltas' && (
              <div className="section-group">
                <div><h3 className="section-title">Registro de Faltas e Frequência</h3><p className="section-subtitle">Detalhamento das aulas ministradas e presença do aluno.</p></div>
                <div className="section-body space-y-4">
                  {carregandoAcademicos ? (
                    <p className="text-sm text-slate-400 italic">Carregando faltas...</p>
                  ) : disciplinasAcademicas.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">Nenhum registro de faltas ou aulas encontrado.</p>
                  ) : (
                    <>
                      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                        <table className="w-full text-left text-xs bg-white dark:bg-slate-900">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px]">
                              <th className="p-3">Disciplina</th>
                              <th className="p-3 text-center">Aulas Ministradas</th>
                              <th className="p-3 text-center">Presenças</th>
                              <th className="p-3 text-center">Faltas</th>
                              <th className="p-3 text-right pr-4">Frequência (%)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                            {disciplinasAcademicas.map((d, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="p-3 font-bold text-slate-800 dark:text-slate-100">{d.nome}</td>
                                <td className="p-3 text-center text-slate-500 dark:text-slate-400">{d.totalAulas}</td>
                                <td className="p-3 text-center font-semibold text-emerald-600 dark:text-emerald-400">{d.presencas}</td>
                                <td className="p-3 text-center font-semibold text-rose-600 dark:text-rose-400">{d.faltas}</td>
                                <td className="p-3 text-right pr-4">
                                  <span className={`font-black ${d.frequencia >= 75 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                                    {d.frequencia}%
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-150 dark:border-slate-750 text-xs">
                        <span className="font-bold text-slate-600 dark:text-slate-300">
                          Total de Faltas Acumuladas: <strong className="text-rose-600 dark:text-rose-400">{faltasDados?.total || 0}</strong>
                        </span>
                        <span className="text-slate-400 italic">
                          * Presenças calculadas automaticamente a partir das aulas lançadas na turma.
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {abaAtiva === 'crescimento' && (
              <div className="section-group space-y-4">
                <div>
                  <h3 className="section-title">Avaliação de Crescimento e Desenvolvimento</h3>
                  <p className="section-subtitle">Parecer pedagógico, observações pastorais e progresso do aluno.</p>
                </div>
                <div className="section-body space-y-4">
                  {carregandoAcademicos ? (
                    <p className="text-sm text-slate-400 italic">Carregando avaliação...</p>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                        Observações e Histórico de Desenvolvimento
                      </label>
                      <textarea
                        value={crescimentoDados?.observacoes || ''}
                        onChange={(e) => setCrescimentoDados({ ...crescimentoDados, observacoes: e.target.value })}
                        rows="6"
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#055F6D] dark:focus:ring-blue-500"
                        placeholder="Registre aqui as observações sobre o crescimento, discipulado, dedicação e pontos de atenção do aluno..."
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleSalvarNotasAcademico}
                          disabled={salvandoNotasAluno}
                          className="px-4 py-2 bg-[#055F6D] dark:bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-[#034c57] dark:hover:bg-blue-700 transition shadow-xs cursor-pointer disabled:opacity-50"
                        >
                          {salvandoNotasAluno ? 'Salvando...' : 'Salvar Parecer / Observação'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {abaAtiva === 'permissoes' && !isStudentCadernetaView && !isMembro && (
              <div className="section-group">
                <CardHeader
                  titulo="Permissões"
                  subtitulo={`Módulos vinculados ao perfil ${permissao || 'membro'}.`}
                />
                <div className="section-body space-y-3">
                  <AcessoSistemaPanel
                    membro={membro}
                    email={email}
                    permissao={permissao}
                    setPermissao={setPermissao}
                    senhaNovoAcesso={senhaNovoAcesso}
                    setSenhaNovoAcesso={setSenhaNovoAcesso}
                    confirmarSenhaNovoAcesso={confirmarSenhaNovoAcesso}
                    setConfirmarSenhaNovoAcesso={setConfirmarSenhaNovoAcesso}
                    mostrarSenhaNovoAcesso={mostrarSenhaNovoAcesso}
                    setMostrarSenhaNovoAcesso={setMostrarSenhaNovoAcesso}
                    criandoAcesso={criandoAcesso}
                    mensagemAcesso={mensagemAcesso}
                    onCriarAcesso={handleCriarAcessoSistema}
                    dis={dis}
                  />

                  {membroLogado?.permissao === 'admin' && (
                    <div className="bg-slate-50 dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-750 mt-4">
                      <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase mb-4 tracking-tight flex items-center gap-2">
                        <span className="text-lg">🛡️</span> Gerenciamento Manual de Acessos
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Como administrador, você pode ligar/desligar módulos específicos para este membro, ignorando o perfil padrão.</p>

                      <div className="space-y-3">
                        {MODULOS_SISTEMA.map((m) => {
                          const isOpen = !!modulosExpandidos[m.modulo];
                          const blocosAtivosCount = m.blocos.filter(bloco => permissoesJson[`${m.modulo}|${bloco}`] === true).length;

                          return (
                            <div key={m.modulo} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200">
                              {/* Cabeçalho do Acordeão */}
                              <button
                                type="button"
                                onClick={() => setModulosExpandidos(prev => ({ ...prev, [m.modulo]: !isOpen }))}
                                className="w-full flex items-center justify-between p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors text-left focus:outline-none"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">{m.modulo}</span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${blocosAtivosCount > 0 ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'}`}>
                                    {blocosAtivosCount > 0 ? `🟢 ${blocosAtivosCount} ativo(s)` : '⚪ inativo'}
                                  </span>
                                </div>
                                <svg
                                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                              </button>

                              {/* Corpo do Acordeão */}
                              {isOpen && (
                                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/40 animate-in fade-in duration-200">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {m.blocos.map((bloco) => {
                                      const keyBase = `${m.modulo}|${bloco}`;
                                      const ativo = permissoesJson[keyBase] === true;
                                      return (
                                        <div key={bloco} className={`p-3 rounded-xl border transition-all duration-200 ${ativo ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-700 shadow-xs' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                                          <div className="flex items-center justify-between">
                                            <span className={`text-[11px] font-bold ${ativo ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}`}>{bloco}</span>
                                            <button
                                              type="button"
                                              disabled={dis}
                                              onClick={() => setPermissoesJson(prev => {
                                                const novoEstado = !ativo;
                                                const next = { ...prev, [keyBase]: novoEstado };
                                                if (!novoEstado) {
                                                  // Limpa sub-permissões ao desativar o bloco
                                                  delete next[`${keyBase}|ver`];
                                                  delete next[`${keyBase}|editar`];
                                                  delete next[`${keyBase}|excluir`];
                                                } else {
                                                  // Ativa 'ver' por padrão ao ligar o bloco
                                                  next[`${keyBase}|ver`] = true;
                                                }
                                                return next;
                                              })}
                                              className={`w-10 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${ativo ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                                            >
                                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-200 shadow-xs transition-all duration-200 ${ativo ? 'right-1' : 'left-1'}`} />
                                            </button>
                                          </div>

                                          {ativo && (
                                            <div className="flex gap-1 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                                              {['ver', 'editar', 'excluir'].map(action => {
                                                const subKey = `${keyBase}|${action}`;
                                                const subAtivo = permissoesJson[subKey] === true;

                                                let activeClass = '';
                                                let inactiveClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-600 dark:hover:text-slate-300';

                                                if (action === 'ver') {
                                                  activeClass = 'bg-blue-500 border-blue-500 text-white shadow-xs shadow-blue-500/20';
                                                } else if (action === 'editar') {
                                                  activeClass = 'bg-amber-500 border-amber-500 text-white shadow-xs shadow-amber-500/20';
                                                } else if (action === 'excluir') {
                                                  activeClass = 'bg-rose-500 border-rose-500 text-white shadow-xs shadow-rose-500/20';
                                                }

                                                return (
                                                  <button
                                                    key={action}
                                                    type="button"
                                                    disabled={dis}
                                                    onClick={() => setPermissoesJson(p => ({ ...p, [subKey]: !subAtivo }))}
                                                    className={`flex-1 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wider transition-all duration-150 ${subAtivo ? activeClass : inactiveClass}`}
                                                  >
                                                    {action}
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="table-mib">
                      <thead>
                        <tr>
                          <th>Módulo</th>
                          <th>Bloco / recurso</th>
                        </tr>
                      </thead>
                      <tbody>
                        {permissoesVinculadas.length === 0 ? (
                          <tr>
                            <td colSpan={2} className="text-center py-6 text-[var(--text-muted)] dark:text-slate-400">Nenhum vínculo de permissão definido.</td>
                          </tr>
                        ) : (
                          permissoesVinculadas.map((item, idx) => (
                            <tr key={`${item.modulo}-${item.bloco}-${idx}`}>
                              <td className="font-medium text-[var(--text-heading)] dark:text-slate-100">{item.modulo}</td>
                              <td className="dark:text-slate-300">{item.bloco}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {modoEdicao && (
              <>
                {/* Botão flutuante — visível em qualquer posição da página */}
                <div className="fixed bottom-6 right-6 z-50 flex gap-2 items-center print:hidden">
                  <button
                    type="button"
                    onClick={() => { setModoEdicao(false); preencherFormulario(membro); }}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium shadow-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={salvando}
                    className="flex items-center gap-2 bg-[#1e3a8a] dark:bg-blue-600 hover:bg-[#1e40af] dark:hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-xl disabled:opacity-50 shadow-xl transition"
                  >
                    {salvando ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                        {membro?.status === 'pendente' ? 'Aprovando...' : 'Salvando...'}
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {membro?.status === 'pendente' ? 'Aprovar Cadastro' : 'Salvar Alterações'}
                      </>
                    )}
                  </button>
                </div>
                {/* Espaço no rodapé para não sobrepor conteúdo */}
                <div className="h-20" />
              </>
            )}
          </form>
          <div className="vinculos-sidebar hidden lg:block">
            <SidebarVinculos
              pessoaId={pessoaId}
              pessoaData={membro}
              matriculasEscolares={matriculasMembro}
              listaPessoas={listaPessoas}
              onAbrirMembro={onFechar ? (id) => { onFechar(); setTimeout(() => onDadosAtualizados?.(id), 50); } : undefined}
            />
          </div>
        </div>
      </div>

      {isModalReceitaAberto && (
        <ModalLancarTransacao
          tipo="receita"
          onFechar={() => setIsModalReceitaAberto(false)}
          contas={contasFinanceiras}
          categorias={categoriasFinanceiras.filter(c => c.tipo === 'receita')}
          pessoas={listaPessoas}
          pessoaIdInicial={pessoaId}
          onSucesso={() => {
            setIsModalReceitaAberto(false);
            carregarFinanceiro();
          }}
        />
      )}
    </div>
  );
}

function AcessoSistemaPanel({
  membro,
  email,
  permissao,
  setPermissao,
  senhaNovoAcesso,
  setSenhaNovoAcesso,
  confirmarSenhaNovoAcesso,
  setConfirmarSenhaNovoAcesso,
  mostrarSenhaNovoAcesso,
  setMostrarSenhaNovoAcesso,
  criandoAcesso,
  mensagemAcesso,
  onCriarAcesso,
  dis = false,
}) {
  const acessoAtivo = Boolean(membro?.auth_user_id || membro?.acesso_ativo);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-medium text-[var(--text-muted)] dark:text-slate-400 mb-0.5">Perfil de permissão (sistema)</label>
        <select
          value={permissao || 'membro'}
          onChange={(e) => setPermissao(e.target.value)}
          disabled={dis}
          className="w-full max-w-md px-3 py-2 text-sm border border-[var(--border)] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-600 dark:disabled:text-slate-400 cursor-pointer disabled:cursor-not-allowed font-medium"
        >
          <option value="membro">Membro</option>
          <option value="lider-celula">Líder de Célula</option>
          <option value="secretaria">Secretaria</option>
          <option value="tesouraria">Tesouraria</option>
          <option value="pastor">Pastor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 p-4 space-y-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Acesso ao sistema</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {acessoAtivo
                ? 'Este membro já possui usuário vinculado ao Supabase Auth.'
                : 'Crie um usuário e senha para este membro acessar o painel.'}
            </p>
          </div>
          {acessoAtivo && (
            <span className="w-fit rounded-full bg-emerald-100 dark:bg-emerald-950/70 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
              Acesso ativo
            </span>
          )}
        </div>

        {!acessoAtivo && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Senha inicial</label>
              <div className="relative flex items-center">
                <input
                  type={mostrarSenhaNovoAcesso ? "text" : "password"}
                  value={senhaNovoAcesso}
                  onChange={(e) => setSenhaNovoAcesso(e.target.value)}
                  disabled={dis}
                  minLength={6}
                  className="w-full pl-3 pr-9 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenhaNovoAcesso(!mostrarSenhaNovoAcesso)}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                  title={mostrarSenhaNovoAcesso ? "Ocultar senha" : "Visualizar senha"}
                  aria-label={mostrarSenhaNovoAcesso ? "Ocultar senha" : "Visualizar senha"}
                >
                  {mostrarSenhaNovoAcesso ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Confirmar senha</label>
              <div className="relative flex items-center">
                <input
                  type={mostrarSenhaNovoAcesso ? "text" : "password"}
                  value={confirmarSenhaNovoAcesso}
                  onChange={(e) => setConfirmarSenhaNovoAcesso(e.target.value)}
                  disabled={dis}
                  minLength={6}
                  className="w-full pl-3 pr-9 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenhaNovoAcesso(!mostrarSenhaNovoAcesso)}
                  className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                  title={mostrarSenhaNovoAcesso ? "Ocultar senha" : "Visualizar senha"}
                  aria-label={mostrarSenhaNovoAcesso ? "Ocultar senha" : "Visualizar senha"}
                >
                  {mostrarSenhaNovoAcesso ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="button" onClick={onCriarAcesso} disabled={criandoAcesso || dis} className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50">
              {criandoAcesso ? 'Criando...' : 'Criar usuário'}
            </button>
          </div>
        )}

        {!email.trim() && (
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">Informe um e-mail na aba Dados Pessoais antes de criar o acesso.</p>
        )}
        {mensagemAcesso && (
          <p className={`text-xs font-semibold ${mensagemAcesso.startsWith('Acesso') ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
            {mensagemAcesso}
          </p>
        )}
      </div>
    </div>
  );
}

export default DetalhesMembro;