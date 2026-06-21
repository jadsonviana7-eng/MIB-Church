import { useEffect, useState, useCallback, useMemo } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from './supabaseClient';
import { Card, CardHeader, CampoLinha, CampoInput, uploadImagemCelula } from './ui';
import SidebarVinculos from './SidebarVinculos';
import { calcularIdade } from './churchUtils';
import { ModalLancarTransacao } from './TransacoesFinanceiras';
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ), // Ícone de pessoas
  adicionais: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ), // Ícone de adição
  escola: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ), // Ícone de escolas
  frequencia: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ), // Ícone de calendário
  financeiro: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ), // Ícone de finanças
  permissoes: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ), // Ícone de configurações/permissões
  caderneta: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ), // Ícone de caderneta (documento)
  faltas: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
    </svg>
  ), // Ícone de proibido/falta
  crescimento: (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ), // Ícone de gráfico de barras
};

function vinculosPermissaoMembro(membro) {
  // Prioriza permissões manuais se existirem no JSONB
  if (membro?.permissoes_json && Object.keys(membro.permissoes_json).length > 0) {
    const list = [];
    const entries = Object.entries(membro.permissoes_json).filter(([_, v]) => v === true);
    if (entries.length === 0) return calcularPermissoesPorCargo(membro);
    
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

  return calcularPermissoesPorCargo(membro);
}

function calcularPermissoesPorCargo(membro) {
  const chave = String(membro?.permissao || membro?.cargo || 'membro').toLowerCase();
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

  if (chave.includes('secretaria')) {
    push('Pessoas', ['Ver todos', 'Adicionar pessoa', 'Aniversariantes', 'Relatórios', 'Ficha do membro']);
    push('Células', ['Lista de células', 'Nova célula']);
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
    return itens;
  }

  if (chave.includes('membro')) {
    push('Utilitários', ['Escalas Ministerial', 'Calculadora de Tributos', 'Teste de Temperamento', 'Pedido de Oração']);
    push('Pessoas', ['Ver todos', 'Aniversariantes']);
    push('Células', ['Lista de células']);
    return itens;
  }

  push('Pessoas', ['Ficha pessoal (própria)']);
  return itens;
}

function DetalhesMembro({ pessoaId: propPessoaId, onFechar, listaPessoas = [], onDadosAtualizados, cargosLista = [], atuacoesLista = [], isStudentCadernetaView = false, membroLogado, hasAccess }) {
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
        className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/50 hover:border-slate-300 hover:shadow-sm hover:scale-[1.02] active:scale-98 transition-all duration-200 text-left w-full sm:w-auto min-w-[240px] group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 flex items-center justify-center">
          {foto ? (
            <img src={foto} alt={parente.nome} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-bold text-[#055F6D]">{inicial}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {infoRelacao.icon}
            <span className="text-[9px] font-bold text-[#055F6D] uppercase tracking-wider">{infoRelacao.label}</span>
          </div>
          <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-[#055F6D] transition-colors">{parente.nome}</p>
          <span className="text-[10px] text-slate-400 capitalize">{parente.cargo || 'Membro'}</span>
        </div>
        <span className="text-slate-300 group-hover:text-[#055F6D] group-hover:translate-x-1 transition-all text-sm font-bold shrink-0 pr-1">
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
  const [cargos, setCargos] = useState([]);
  const [atuacoes, setAtuacoes] = useState([]);
  const [contribuicoes, setContribuicoes] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('informacoes');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [salvando, setSalvando] = useState(false);
  
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
  const [cargo, setCargo] = useState('membro');
  const [celulaId, setCelulaId] = useState('');
  const [zonaId, setZonaId] = useState('');
  const [dataBatismo, setDataBatismo] = useState('');
  const [dataConversao, setDataConversao] = useState('');
  const [status, setStatus] = useState('ativo');
  const [batizadoAguas, setBatizadoAguas] = useState(false);
  const [atuacao, setAtuacao] = useState([]);
  const [permissao, setPermissao] = useState('');
  const [senhaNovoAcesso, setSenhaNovoAcesso] = useState('');
  const [confirmarSenhaNovoAcesso, setConfirmarSenhaNovoAcesso] = useState('');
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
  const [perfilPensante, setPerfilPensante] = useState('');
  const [perfilRazao, setPerfilRazao] = useState('');
  const [perfilEmocao, setPerfilEmocao] = useState('');
  const [perfilAtuante, setPerfilAtuante] = useState('');
  const [testePersonalidade, setTestePersonalidade] = useState(null);
  const [permissoesJson, setPermissoesJson] = useState({});
  const [modulosExpandidos, setModulosExpandidos] = useState({});

  const isMembro = membroLogado?.permissao === 'membro';
  const [historicoPresenca, setHistoricoPresenca] = useState([]);
  const [carregandoPresenca, setCarregandoPresenca] = useState(false);
  
  // Estados para Gestão Escolar
  const [turmasDisponiveis, setTurmasDisponiveis] = useState([]);
  const [matriculasMembro, setMatriculasMembro] = useState([]);

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [mostrarCortador, setMostrarCortador] = useState(false);
  const [previewNovaFotoUrl, setPreviewNovaFotoUrl] = useState('');
  const [fotoFinalBlob, setFotoFinalBlob] = useState(null);

  // Estados para dados acadêmicos (se isStudentCadernetaView for true)
  const [cadernetaDados, setCadernetaDados] = useState(null);
  const [faltasDados, setFaltasDados] = useState(null);
  const [carregandoAcademicos, setCarregandoAcademicos] = useState(false);
  const [crescimentoDados, setCrescimentoDados] = useState(null);
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

  const carregarDadosEscolares = useCallback(async () => {
    if (!pessoaId) return;
    
    setMatriculasMembro([]); // Limpa antes de buscar novos dados
    try {
      // 1. Carregar turmas abertas (Escolas)
      const { data: listTurmas } = await supabase
        .from('turmas')
        .select('id, nome, escolas(nome)')
        .eq('ativa', true);
      if (listTurmas) setTurmasDisponiveis(listTurmas);

      // 2. Carregar matrículas atuais do membro
      const { data: alunoData } = await supabase.from('alunos').select('id').eq('pessoa_id', pessoaId).maybeSingle();
      
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
    }
  }, [abaAtiva, carregarFinanceiro]);

  useEffect(() => {
    if (abaAtiva === 'frequencia') {
      carregarHistoricoPresenca();
    }
  }, [abaAtiva, carregarHistoricoPresenca]);

  const carregarDadosAcademicos = useCallback(async () => {
    if (!pessoaId || !isStudentCadernetaView) return;
    setCarregandoAcademicos(true);
    try {
      // Dados simulados conforme a regra de 3 módulos e 3 avaliações
      const criarModulo = (nome, n1, n2, n3, faltas) => ({
        nome,
        avaliacoes: [{ tipo: 'Avaliação 1', nota: n1 }, { tipo: 'Avaliação 2', nota: n2 }, { tipo: 'Avaliação 3', nota: n3 }],
        media: (n1 + n2 + n3) / 3,
        faltas
      });

      setCadernetaDados({
        modulos: [
          criarModulo('Módulo 1 - Vida Cristã Genuína', 8, 7.5, 9, 2),
          criarModulo('Módulo 2 - Compreendendo o Modelo dos "12"', 6, 7, 6.5, 1),
          criarModulo('Módulo 3', 10, 9, 8.5, 0)
        ],
      });
      setFaltasDados({
        modulos: [{ nome: 'Módulo 1', faltas: 2 }, { nome: 'Módulo 2', faltas: 1 }, { nome: 'Módulo 3', faltas: 0 }],
        total: 3,
      });
      setCrescimentoDados({ observacoes: 'Aluno muito participativo e dedicado. Demonstra grande potencial de liderança.' });
    } catch (error) {
      console.error('Erro ao carregar dados acadêmicos:', error);
    } finally {
      setCarregandoAcademicos(false);
    }
  }, [pessoaId, isStudentCadernetaView]);

  const handleNotaChange = (moduloIdx, avalIdx, valor) => {
    const nota = parseFloat(valor) || 0;
    setCadernetaDados(prev => {
      if (!prev) return prev;
      const modulos = [...prev.modulos];
      const avaliacoes = [...modulos[moduloIdx].avaliacoes];
      avaliacoes[avalIdx] = { ...avaliacoes[avalIdx], nota };
      const media = avaliacoes.reduce((acc, a) => acc + a.nota, 0) / avaliacoes.length;
      modulos[moduloIdx] = { ...modulos[moduloIdx], avaliacoes, media };
      return { ...prev, modulos };
    });
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
    setCargo(p.cargo || 'membro');
    setCelulaId(p.celula_id || '');
    setZonaId(p.zona_id || '');
    setDataBatismo(dataISOparaBR(p.data_batismo));
    setDataConversao(dataISOparaBR(p.data_conversao));
    setStatus(p.status || 'ativo');
    setBatizadoAguas(Boolean(p.batizado_aguas));
    setAtuacao(p.atuacao ? p.atuacao.split(',').map(s => s.trim()) : []);
    setPermissao(p.permissao || '');
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

  const [carregandoMembro, setCarregandoMembro] = useState(true);
  useEffect(() => {
    async function carregarFichaDoMembro() {
      if (!pessoaId) return;
      setCarregandoMembro(true);
      setTestePersonalidade(null); // Limpa o teste anterior antes de buscar o novo

      try {
        const { data: p, error: erroPessoa } = await supabase
          .from('pessoas')
          .select('*, celulas(nome, imagem_url)')
          .eq('id', pessoaId).single();
        if (erroPessoa) console.warn('Erro ao carregar pessoa:', erroPessoa);
        if (p) preencherFormulario(p);
        if (p?.status === 'pendente') setModoEdicao(true); // Cadastro pendente: abre direto para revisão e aprovação

        // Busca teste de personalidade mais recente
        if (p?.auth_user_id) {
          const { data: testePers } = await supabase
            .from('personality_tests')
            .select('*')
            .eq('member_id', p.auth_user_id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          if (testePers) setTestePersonalidade(testePers);
          setTestePersonalidade(testePers || null);
        } else {
          setTestePersonalidade(null);
        }

        const { data: relacoes, error: erroRelacoes } = await supabase.from('relacoes_familiares').select('id_filho').eq('id_pai_mae', pessoaId);
        if (erroRelacoes) console.warn('Tabela "relacoes_familiares" não encontrada. Veja DATABASE_SCHEMA.md');
        if (relacoes?.length > 0) {
          const idsFilhos = relacoes.map((r) => r.id_filho);
          setIdsFilhosEdit(idsFilhos);
          setFilhos(listaPessoas.filter((item) => idsFilhos.includes(item.id)));
        } else {
          setIdsFilhosEdit([]);
          setFilhos([]);
        }

        const { data: relacoesPais, error: erroRelacoesPais } = await supabase.from('relacoes_familiares').select('id_pai_mae').eq('id_filho', pessoaId);
        let idsPais = [];
        if (relacoesPais?.length > 0) {
          idsPais = relacoesPais.map((r) => r.id_pai_mae);
          setIdsPaisEdit(idsPais);
          setPais(listaPessoas.filter((item) => idsPais.includes(item.id)));
        } else {
          setIdsPaisEdit([]);
          setPais([]);
        }

        if (idsPais.length > 0) {
          const { data: relacoesIrmaos } = await supabase
            .from('relacoes_familiares')
            .select('id_filho')
            .in('id_pai_mae', idsPais);
          
          if (relacoesIrmaos?.length > 0) {
            const idsIrmaosFiltrados = relacoesIrmaos
              .map((r) => r.id_filho)
              .filter((id) => String(id) !== String(pessoaId));
            const idsIrmaosUnicos = [...new Set(idsIrmaosFiltrados)];
            setIrmaos(listaPessoas.filter((item) => idsIrmaosUnicos.includes(item.id)));
          } else {
            setIrmaos([]);
          }
        } else {
          setIrmaos([]);
        }

        const { data: c, error: erroCelulas } = await supabase.from('celulas').select('id, nome');
        if (erroCelulas) console.warn('Tabela "celulas" não encontrada. Veja DATABASE_SCHEMA.md');
        if (c) setCelulas(c);

        const { data: z, error: erroZonas } = await supabase.from('zonas_moradia').select('id, nome');
        if (erroZonas) console.warn('Tabela "zonas_moradia" não encontrada. Veja DATABASE_SCHEMA.md');
        if (z) setZonas(z);

        // Busca a lista de cargos para os selects
        const { data: listCargos } = await supabase.from('cargos').select('id, nome').order('nome');
        if (listCargos) setCargos(listCargos);

        // Busca a lista de atuações para os checkboxes
        const { data: listAtuacoes } = await supabase.from('atuacoes').select('id, nome').order('nome');
        if (listAtuacoes) setAtuacoes(listAtuacoes);

        await carregarFinanceiro();

        const { data: cFin } = await supabase.from('contas_financeiras').select('id, nome').order('nome');
        if (cFin) setContasFinanceiras(cFin);

        const { data: catFin } = await supabase.from('categorias_financeiras').select('id, nome, tipo').order('nome');
        if (catFin) setCategoriasFinanceiras(catFin);
      } catch (err) {
        console.error('Erro ao carregar ficha do membro:', err);
      } finally {
      setCarregandoMembro(false); // Já estava correto, mas mantendo para revisão
      }
    }
    carregarFichaDoMembro();
  }, [pessoaId, listaPessoas, carregarFinanceiro, isStudentCadernetaView]);

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
    () => (membro ? vinculosPermissaoMembro({ ...membro, permissao, cargo: cargo, permissoes_json: permissoesJson }) : []),
    [membro, permissao, cargo, permissoesJson]
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
      cargo: cargo,
      celula_id: celulaId || null,
      zona_id: zonaId || null,
      data_batismo: dataBRparaISO(dataBatismo),
      data_conversao: dataBRparaISO(dataConversao),
      status: membro?.status === 'pendente' ? 'ativo' : status,
      tipo_membro: membro?.status === 'pendente' ? 'membro' : membro?.tipo_membro,
      batizado_aguas: batizadoAguas,
      atuacao: Array.isArray(atuacao) ? (atuacao.join(', ') || null) : (atuacao || null),
      permissao: permissao.trim() || null,
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
      const msg = error.message?.includes('column')
        ? `${error.message}\n\nExecute o SQL em supabase/schema-ficha-membro.sql no Supabase e recarregue o schema cache (Settings → API).`
        : error.message;
      window.alert('Erro ao atualizar: ' + msg);
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

    const perfilAcesso = permissao.trim() || cargo || 'membro';
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
      {modalExclusaoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white rounded-2xl border shadow-xl w-full max-w-md p-5 space-y-4">
            <h3 className="font-semibold text-[var(--text-heading)]">Inativar Cadastro de {nome}</h3>
            <p className="text-sm text-[var(--text-muted)]">O membro será movido para a lista de inativos. Você poderá reativá-lo a qualquer momento.</p>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Motivo da inativação</label>
              <select value={motivoExclusao} onChange={(e) => setMotivoExclusao(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-white">
                <option value="">Selecione o motivo</option>
                {MOTIVOS_EXCLUSAO.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setModalExclusaoAberto(false)} className="px-4 py-2 text-xs border rounded-xl">Cancelar</button>
              <button type="button" onClick={confirmarInativacaoCadastro} disabled={excluindoCadastro} className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 text-white disabled:opacity-50">
                {excluindoCadastro ? 'Processando...' : 'Confirmar inativação'}
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarCortador && ( // Modal de recorte de imagem
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text-heading)] text-sm">Recortar foto de perfil</h3>
            </div>
            <div className="relative h-64 w-full bg-slate-900">
              <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={1} cropShape="round" showGrid={false} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} />
            </div>
            <div className="p-4 bg-[var(--surface-muted)] flex gap-2">
              <button type="button" onClick={() => setMostrarCortador(false)} className="flex-1 py-2 bg-slate-200 text-xs font-medium rounded-xl">Cancelar</button>
              <button type="button" onClick={criarImagemRecortada} className="flex-1 py-2 btn-primary text-xs font-semibold rounded-xl">Confirmar</button>
            </div>
          </div>
        </div>
      )}
      <div className="member-header flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full">
            <div className="relative shrink-0 w-28 h-28 rounded-2xl border-2 border-[var(--border)] overflow-hidden bg-[var(--surface-muted)] shadow-sm">
              {fotoExibir ? (
                <img src={fotoExibir} alt={nome} className="w-full h-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-4xl font-semibold text-[var(--text-muted)]">{nome.charAt(0).toUpperCase()}</span>
              )}
              {modoEdicao && (
                <label className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center text-[10px] font-medium text-white cursor-pointer">
                  Alterar foto
                  <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                </label>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-bold tracking-tight text-slate-400 mb-1">
                {historicoNavegacao.length > 0 ? (
                  <button
                    type="button"
                    onClick={voltarMembroAnterior}
                    className="flex items-center gap-1 text-[#055F6D] hover:text-[#044c57] font-bold bg-[#055F6D]/5 hover:bg-[#055F6D]/10 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    ← Voltar para {listaPessoas.find(p => String(p.id) === String(historicoNavegacao[historicoNavegacao.length - 1]))?.nome || 'anterior'}
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={() => onFechar()} className="hover:text-slate-600">Pessoas</button>
                    <span className="text-slate-200">/</span>
                    <span className="text-[#055F6D]">Ficha</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-semibold text-[var(--text-heading)] tracking-tight leading-tight">{nome}</h1>
              
              {/* Info Detalhada: Oculta em mobile (hidden), visível em telas pequenas+ (sm:grid) */}
              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm mt-4">
                <p><span className="text-[var(--text-muted)] font-semibold uppercase text-[10px] tracking-wider block mb-0.5">Zona de moradia</span> <span className="font-medium text-[var(--text-heading)]">{nomeZona}</span></p>
                <p><span className="text-[var(--text-muted)] font-semibold uppercase text-[10px] tracking-wider block mb-0.5">Célula</span> 
                  <span className="font-medium text-[#055F6D]">
                    {nomeCelula} 
                  </span>
                </p>
                <p><span className="text-[var(--text-muted)] font-semibold uppercase text-[10px] tracking-wider block mb-0.5">Cargo</span> <span className="font-medium text-[var(--text-heading)] capitalize">{cargo || 'Membro'}</span></p>
                <p><span className="text-[var(--text-muted)] font-semibold uppercase text-[10px] tracking-wider block mb-0.5">Telefone</span> <span className="font-medium text-[var(--text-heading)]">{telefone || '—'}</span></p>
                <p className="sm:col-span-2"><span className="text-[var(--text-muted)]">Endereço:</span> <span className="font-medium text-[var(--text-heading)]">{enderecoCompleto}</span></p>
              </div>

              {/* Status Minimalista: Visível apenas em mobile (sm:hidden) */}
              <div className="flex flex-wrap justify-center gap-2 mt-2 sm:hidden">
                {celulaId && (
                  <span className="text-[9px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-100 font-black uppercase">Ativo</span>
                )}
                <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-bold capitalize">{cargo || 'Membro'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0 w-full lg:w-auto justify-center lg:justify-end">
            {!modoEdicao ? (
              <>
                {hasAccess && hasAccess('Pessoas', 'Ficha do membro', 'editar') && (
                  <button 
                    type="button" 
                    onClick={() => setModoEdicao(true)} 
                    className="flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-xs font-semibold p-2.5 sm:px-4 sm:py-2 rounded-xl transition shadow-sm"
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
                      className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold p-2.5 sm:px-4 sm:py-2 rounded-xl transition shadow-sm"
                      title="Inativar Membro"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <span className="hidden sm:block">Inativar</span>
                    </button>
                    <button type="button" onClick={handleExcluirPermanente} className="px-2 text-slate-400 hover:text-rose-600 transition-colors" title="Excluir Permanentemente">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </>
                )}
                <button type="button" onClick={onFechar} className="px-4 py-2 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--text-primary)]">Fechar</button>
              </>
            ) : (
              <span className="text-xs text-amber-700 font-medium px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
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
              className={`tab-item flex items-center gap-3 px-4 py-3 text-xs font-semibold transition-all whitespace-nowrap ${
                abaAtiva === aba.id 
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
                <div className="p-5 bg-amber-50 border border-amber-200 rounded-[24px] flex gap-4 animate-in slide-in-from-top-2 duration-300">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h4 className="text-sm font-black text-amber-900 uppercase tracking-tight">Análise de Novo Cadastro</h4>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">Este membro se cadastrou pelo formulário público. Verifique as sugestões abaixo e preencha os dados oficiais antes de aprovar.</p>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      <p className="text-[10px] font-bold text-amber-800 uppercase">Cargo Escolhido: <span className="text-slate-900">{membro.cargo || 'Não informado'}</span></p>
                      <p className="text-[10px] font-bold text-amber-800 uppercase">Célula Vinculada: <span className="text-slate-900">{nomeCelula !== '—' ? nomeCelula : 'Nenhuma'}</span></p>
                      <p className="text-[10px] font-bold text-amber-800 uppercase">Zona Vinculada: <span className="text-slate-900">{nomeZona !== '—' ? nomeZona : 'Nenhuma'}</span></p>
                      {membro.atuacao && <p className="text-[10px] font-bold text-amber-800 uppercase">Aptidão/Ministério: <span className="text-slate-900">{membro.atuacao}</span></p>}
                      {membro.conjuge_sugerido && <p className="text-[10px] font-bold text-amber-800 uppercase">Cônjuge sugerido: <span className="text-slate-900">{membro.conjuge_sugerido}</span>{!conjugeId && <span className="text-amber-600 font-normal italic ml-1">— confirme em Vínculo Familiar</span>}</p>}
                      {membro.filhos_sugeridos && <p className="text-[10px] font-bold text-amber-800 uppercase">Filhos sugeridos: <span className="text-slate-900">{membro.filhos_sugeridos}</span><span className="text-amber-600 font-normal italic ml-1">— busque e vincule em Vínculo Familiar</span></p>}
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
                      <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Estado civil</label>
                      <select disabled={dis} value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
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
                      <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Escolaridade</label>
                      <select value={escolaridade} onChange={(e) => setEscolaridade(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
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
                      <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Status</label>
                      <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-1.5 text-xs font-medium border border-[var(--border)] rounded-xl bg-white focus:outline-none">
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
                <div className="section-body grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {!dis ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Cargo</label>
                        <select value={cargo} onChange={(e) => setCargo(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
                          <option value="">Selecione o cargo</option>
                          {cargos.map((c) => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                          {cargo && !cargos.some((c) => c.nome === cargo) && <option value={cargo}>{cargo}</option>}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Célula</label>
                        <select value={celulaId} onChange={(e) => setCelulaId(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
                          <option value="">Nenhuma</option>
                          {celulas.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Zona</label>
                        <select value={zonaId} onChange={(e) => setZonaId(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
                          <option value="">Nenhuma</option>
                          {zonas.map((z) => <option key={z.id} value={z.id}>{z.nome}</option>)}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <CampoLinha label="Cargo" valor={cargo} />
                      <CampoLinha label="Célula" valor={nomeCelula} />
                      <CampoLinha label="Zona" valor={nomeZona} />
                    </>
                  )}
                  <CampoInput label="Data de conversão" value={dataConversao} onChange={setDataConversao} disabled={dis} mask={mascaraDataBR} />
                  <CampoInput label="Data de batismo" value={dataBatismo} onChange={setDataBatismo} disabled={dis} mask={mascaraDataBR} />
                  {!dis ? (
                    <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] pt-5">
                      <input type="checkbox" checked={batizadoAguas} onChange={(e) => setBatizadoAguas(e.target.checked)} className="rounded" />
                      Batizado nas águas
                    </label>
                  ) : (
                    <CampoLinha label="Batizado nas águas" valor={batizadoAguas ? 'Sim' : 'Não'} />
                  )}
                </div>
              </div>

              <div className="section-group !bg-gradient-to-br !from-[#055F6D] !to-[#034c57] border border-[#034c57] shadow-lg">
                <h3 className="section-title !text-white !border-b !border-white/10">Vínculo Familiar</h3>
                <div className="section-body space-y-3">
                  {!dis ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-semibold text-teal-100 mb-0.5">Cônjuge</label>
                        <select value={conjugeId} onChange={(e) => setConjugeId(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded-xl bg-white">
                          <option value="">Sem cônjuge vinculado</option>
                          {listaPessoas.filter((p) => String(p.id) !== String(pessoaId)).map((p) => (
                            <option key={p.id} value={p.id}>{p.nome}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[11px] font-semibold text-teal-100 mb-0.5">Pais / Responsáveis</label>
                        <input type="text" value={filtroBuscaPai} onChange={(e) => setFiltroBuscaPai(e.target.value)} placeholder="Buscar pai/mãe na base..." className="w-full px-3 py-1.5 text-xs border rounded-xl mb-1 bg-white text-slate-800" />
                        {filtroBuscaPai && (
                          <div className="border rounded-xl max-h-32 overflow-y-auto divide-y bg-white shadow-sm text-slate-800">
                            {pessoasParaPais.slice(0, 8).map((p) => (
                              <button key={p.id} type="button" onClick={() => { togglePaiMae(p.id); setFiltroBuscaPai(''); }} className="w-full text-left px-3 py-2 text-xs hover:bg-[var(--surface-muted)] flex justify-between">
                                <span>{p.nome}</span>
                                <span className={idsPaisEdit.includes(p.id) ? 'text-[#055F6D] font-bold' : ''}>
                                  {idsPaisEdit.includes(p.id) ? '✓ Vinculado' : '+ Adicionar'}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {pais.map((p) => (
                            <span key={p.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-slate-200/50 text-xs bg-white/95 text-slate-800">
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
                        <label className="block text-[11px] font-semibold text-teal-100 mb-0.5">Filhos</label>
                        <input type="text" value={filtroBuscaFilho} onChange={(e) => setFiltroBuscaFilho(e.target.value)} placeholder="Buscar filho na base..." className="w-full px-3 py-1.5 text-xs border rounded-xl mb-1 bg-white text-slate-800" />
                        {filtroBuscaFilho && (
                          <div className="border rounded-xl max-h-32 overflow-y-auto divide-y bg-white shadow-sm text-slate-800">
                            {pessoasParaFilhos.slice(0, 8).map((p) => (
                              <button key={p.id} type="button" onClick={() => { toggleFilho(p.id); setFiltroBuscaFilho(''); }} className="w-full text-left px-3 py-2 text-xs hover:bg-[var(--surface-muted)] flex justify-between">
                                <span>{p.nome}</span>
                                <span className={idsFilhosEdit.includes(p.id) ? 'text-[#055F6D] font-bold' : ''}>
                                  {idsFilhosEdit.includes(p.id) ? '✓ Vinculado' : '+ Adicionar'}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {filhos.map((p) => (
                            <span key={p.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-slate-200/50 text-xs bg-white/95 text-slate-800">
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
              {/* Novo Ambiente: Perfil Comportamental */}
              <div className="section-group">
                <div><h3 className="section-title">Perfil Comportamental</h3><p className="section-subtitle">Valores numéricos baseados no teste de perfil (0 a 100).</p></div>
                <div className="section-body grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 bg-blue-50/30">
                    <span className="text-xl">🦅</span>
                    <span className="font-bold text-slate-700 text-sm flex-1">Águia</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={perfilAguia}
                      onChange={(e) => setPerfilAguia(e.target.value)}
                      disabled={dis}
                      className="w-20 px-2 py-1 border border-blue-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-purple-100 bg-purple-50/30">
                    <span className="text-xl">🐈</span>
                    <span className="font-bold text-slate-700 text-sm flex-1">Gato</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={perfilGato}
                      onChange={(e) => setPerfilGato(e.target.value)}
                      disabled={dis}
                      className="w-20 px-2 py-1 border border-purple-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-purple-500/20 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/30">
                    <span className="text-xl">🐺</span>
                    <span className="font-bold text-slate-700 text-sm flex-1">Lobo</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={perfilLobo}
                      onChange={(e) => setPerfilLobo(e.target.value)}
                      disabled={dis}
                      className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-gray-500/20 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-red-100 bg-red-50/30">
                    <span className="text-xl">🦈</span>
                    <span className="font-bold text-slate-700 text-sm flex-1">Tubarão</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={perfilTubarao}
                      onChange={(e) => setPerfilTubarao(e.target.value)}
                      disabled={dis}
                      className="w-20 px-2 py-1 border border-red-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-red-500/20 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Novo Ambiente: Personalidade (Temperamentos) */}
              <div className="section-group">
                <div><h3 className="section-title">Personalidade</h3><p className="section-subtitle">Temperamentos baseados no último teste realizado (Escala 7-35).</p></div>
                <div className="section-body">
                  {testePersonalidade ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-red-100 bg-red-50/30">
                          <span className="text-xl">🔥</span>
                          <span className="font-bold text-slate-700 text-sm flex-1">Colérico</span>
                          <span className="text-lg font-black text-red-600">{testePersonalidade.colerico}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-purple-100 bg-purple-50/30">
                          <span className="text-xl">📋</span>
                          <span className="font-bold text-slate-700 text-sm flex-1">Melancólico</span>
                          <span className="text-lg font-black text-purple-600">{testePersonalidade.melancolico}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-100 bg-amber-50/30">
                          <span className="text-xl">☀️</span>
                          <span className="font-bold text-slate-700 text-sm flex-1">Sanguíneo</span>
                          <span className="text-lg font-black text-amber-600">{testePersonalidade.sanguineo}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-cyan-100 bg-cyan-50/30">
                          <span className="text-xl">💧</span>
                          <span className="font-bold text-slate-700 text-sm flex-1">Fleumático</span>
                          <span className="text-lg font-black text-cyan-600">{testePersonalidade.fleumatico}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-[#055F6D]/5 rounded-xl border border-[#055F6D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Perfil Dominante:</span>
                          <span className="text-xs font-black text-[#055F6D] uppercase">{testePersonalidade.dominant} + {testePersonalidade.secondary}</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold">Realizado em: {new Date(testePersonalidade.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 italic py-4 text-center">Nenhum teste de personalidade registrado para este membro.</p>
                  )}
                </div>
              </div>

              {/* Novo Ambiente: Atividade Cerebral */}
              <div className="section-group">
                <div><h3 className="section-title">Atividade Cerebral</h3><p className="section-subtitle">Valores numéricos para os quadrantes cerebrais (0 a 100).</p></div>
                <div className="section-body flex flex-col items-center justify-center gap-3">
                  {/* Pensante (Topo) */}
                  <div className="flex flex-col items-center gap-2 w-full max-w-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pensante</span>
                    <div className="flex items-center gap-2 p-2 rounded-xl border border-blue-100 bg-blue-50/30 w-full">
                      <span className="text-xl">🧠</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={perfilPensante}
                        onChange={(e) => setPerfilPensante(e.target.value)}
                        disabled={dis}
                        className="flex-1 px-2 py-1 border border-blue-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                      />
                    </div>
                  </div>

                  {/* Razão (Esquerda) e Emoção (Direita) */}
                  <div className="flex items-center justify-between w-full max-w-md gap-4">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Razão</span>
                      <div className="flex items-center gap-2 p-2 rounded-xl border border-green-100 bg-green-50/30 w-full">
                        <span className="text-xl">⚖️</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={perfilRazao}
                          onChange={(e) => setPerfilRazao(e.target.value)}
                          disabled={dis}
                          className="flex-1 px-2 py-1 border border-green-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-green-500/20 outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Emoção</span>
                      <div className="flex items-center gap-2 p-2 rounded-xl border border-red-100 bg-red-50/30 w-full">
                        <span className="text-xl">❤️</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={perfilEmocao}
                          onChange={(e) => setPerfilEmocao(e.target.value)}
                          disabled={dis}
                          className="flex-1 px-2 py-1 border border-red-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-red-500/20 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Atuante (Inferior) */}
                  <div className="flex flex-col items-center gap-2 w-full max-w-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Atuante</span>
                    <div className="flex items-center gap-2 p-2 rounded-xl border border-yellow-100 bg-yellow-50/30 w-full">
                      <span className="text-xl">💪</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={perfilAtuante}
                        onChange={(e) => setPerfilAtuante(e.target.value)}
                        disabled={dis}
                        className="flex-1 px-2 py-1 border border-yellow-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-yellow-500/20 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

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
                          className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                            selecionado 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900 ring-2 ring-emerald-500/10' 
                              : 'bg-white border-slate-200 hover:border-emerald-200 text-slate-600'
                          } ${dis ? 'cursor-default opacity-80' : 'cursor-pointer hover:shadow-sm'}`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selecionado ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-slate-300'}`}>
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
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Avaliações da Escola de Discípulos</label>
                    <textarea disabled={dis} value={avaliacaoEscola} onChange={(e) => setAvaliacaoEscola(e.target.value)} rows={4} className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-xl disabled:bg-[var(--surface-muted)]" placeholder="Registros de avaliação, módulos concluídos..." />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Atividade cerebral</label>
                    <textarea disabled={dis} value={atividadeCerebral} onChange={(e) => setAtividadeCerebral(e.target.value)} rows={3} className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-xl disabled:bg-[var(--surface-muted)]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {abaAtiva === 'escola' && !isStudentCadernetaView && (
            <div className="space-y-6">
              <div className="section-group">
                <div><h3 className="section-title">Matrículas Ativas</h3><p className="section-subtitle">Cursos e turmas que o membro está frequentando.</p></div>
                <div className="section-body">
                  {matriculasMembro.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">Este membro não possui matrículas ativas.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {matriculasMembro.map(m => {
                        const isDesistente = m.status === 'desistente';
                        return (
                          <div key={m.id} className={`p-3 rounded-xl border flex justify-between items-center ${
                            isDesistente ? 'border-rose-100 bg-rose-50/30' : 'border-emerald-100 bg-emerald-50/30'
                          }`}>
                            <div>
                              <p className={`text-[10px] font-bold uppercase ${
                                isDesistente ? 'text-rose-600' : 'text-emerald-600'
                              }`}>{m.turmas?.escolas?.nome}</p>
                              <p className="text-sm font-bold text-slate-700">{m.turmas?.nome}</p>
                            </div>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                              isDesistente ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {m.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

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
                          className="text-left p-3 rounded-xl border border-slate-200 hover:border-[#055F6D] hover:bg-slate-50 transition group cursor-pointer"
                        >
                          <p className="text-[9px] font-bold text-slate-400 uppercase">{turma.escolas?.nome}</p>
                          <p className="text-xs font-bold text-slate-700 group-hover:text-[#055F6D]">{turma.nome}</p>
                          <p className="text-[10px] text-[#055F6D] mt-2 font-bold">+ Matricular agora</p>
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
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Histórico Contribuitivo</h4>
                  <p className="text-xs text-emerald-600 mt-0.5">Lançamentos vinculados a este membro no ano corrente.</p>
                </div>
                {!isMembro && (
                  <button
                    type="button"
                    onClick={() => setIsModalReceitaAberto(true)}
                    className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
                  >
                    + Nova Receita
                  </button>
                )}
              </div>

              {/* Tabela de Transações do Membro */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="p-3">Data</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Descrição</th>
                      <th className="p-3 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {contribuicoes.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-slate-400 italic">Nenhum lançamento vinculado a este membro.</td></tr>
                    ) : (
                      contribuicoes.map((t) => (
                        <tr key={t.id}>
                          <td className="p-3 font-medium">{new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.tipo === 'receita' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                              {t.categorias_financeiras?.nome || '—'}
                            </span>
                          </td>
                          <td className="p-3">{t.descricao || '—'}</td>
                          <td className={`p-3 text-right font-bold ${t.tipo === 'receita' ? 'text-emerald-600' : 'text-rose-600'}`}>
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
            <div className="section-group">
              <div><h3 className="section-title">Caderneta Escolar</h3><p className="section-subtitle">Notas e desempenho do aluno nos módulos do curso.</p></div>
                  <div className="section-body">
                {carregandoAcademicos ? (
                  <p className="text-sm text-slate-400 italic">Carregando caderneta...</p>
                ) : cadernetaDados?.modulos?.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">Nenhuma avaliação registrada ainda.</p>
                ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cadernetaDados?.modulos?.map((modulo, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2">{modulo.nome}</h4>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-500 uppercase font-semibold">
                            <th className="py-1">Avaliação</th>
                            <th className="py-1 text-right">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modulo.avaliacoes.map((aval, aIdx) => (
                            <tr key={aIdx}>
                              <td className="py-1">{aval.tipo}</td>
                                    <td className="py-1 text-right font-bold text-slate-700">
                                      {modoEdicao ? (
                                        <input
                                          type="number"
                                          min="0"
                                          max="10"
                                          step="0.1"
                                          value={aval.nota}
                                          onChange={(e) => handleNotaChange(idx, aIdx, e.target.value)}
                                          className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-[#055F6D]/20 outline-none"
                                        />
                                      ) : (
                                        aval.nota.toFixed(1)
                                      )}
                                    </td>
                            </tr>
                          ))}
                          <tr className={`font-bold border-t border-slate-200 ${modulo.media < 7 ? 'text-rose-600' : 'text-[#055F6D]'}`}>
                            <td className="py-1">Média do Módulo</td>
                            <td className="py-1 text-right">{modulo.media.toFixed(1)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                      </div>
                )}
              </div>
            </div>
          )}

          {abaAtiva === 'faltas' && (
            <div className="section-group">
              <div><h3 className="section-title">Registro de Faltas</h3><p className="section-subtitle">Controle de ausências do aluno por módulo.</p></div>
              <div className="section-body space-y-4">
                {carregandoAcademicos ? (
                  <p className="text-sm text-slate-400 italic">Carregando faltas...</p>
                ) : faltasDados?.modulos?.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">Nenhuma falta registrada.</p>
                ) : (
                  <>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2">Faltas por Módulo</h4>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-500 uppercase font-semibold">
                            <th className="py-1">Módulo</th>
                            <th className="py-1 text-right">Faltas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faltasDados?.modulos?.map((modulo, idx) => (
                            <tr key={idx}>
                              <td className="py-1">{modulo.nome}</td>
                                    <td className="py-1 text-right font-bold text-rose-600">
                                      {modoEdicao ? (
                                        <input
                                          type="number"
                                          min="0"
                                          value={modulo.faltas}
                                          onChange={(e) => handleFaltasChange(idx, e.target.value)}
                                          className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-right bg-white text-xs focus:ring-2 focus:ring-rose-500/20 outline-none"
                                        />
                                      ) : (
                                        modulo.faltas
                                      )}
                                    </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-sm font-bold text-rose-700">
                      Total de Faltas: {faltasDados?.total}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {abaAtiva === 'crescimento' && (
            <div className="section-group">
              <div><h3 className="section-title">Avaliação de Crescimento</h3><p className="section-subtitle">Observações sobre o desenvolvimento do aluno na escola.</p></div>
              <div className="section-body space-y-4">
                {carregandoAcademicos ? (
                  <p className="text-sm text-slate-400 italic">Carregando avaliação...</p>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">Observações do Professor</h4>
                    <textarea
                      value={crescimentoDados?.observacoes || ''}
                      onChange={(e) => setCrescimentoDados({ ...crescimentoDados, observacoes: e.target.value })}
                      rows="5"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Registre aqui as observações sobre o crescimento e desenvolvimento do aluno..."
                      disabled={!modoEdicao} // Apenas editável em modo de edição
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {abaAtiva === 'permissoes' && !isStudentCadernetaView && !isMembro && (
            <div className="section-group">
              <CardHeader
                titulo="Permissões"
                subtitulo={`Módulos vinculados ao perfil ${permissao || cargo || 'membro'}.`}
              />
              <div className="section-body space-y-3">
              {!dis && (
                <AcessoSistemaPanel
                  membro={membro}
                  email={email}
                  permissao={permissao}
                  setPermissao={setPermissao}
                  senhaNovoAcesso={senhaNovoAcesso}
                  setSenhaNovoAcesso={setSenhaNovoAcesso}
                  confirmarSenhaNovoAcesso={confirmarSenhaNovoAcesso}
                  setConfirmarSenhaNovoAcesso={setConfirmarSenhaNovoAcesso}
                  criandoAcesso={criandoAcesso}
                  mensagemAcesso={mensagemAcesso}
                  onCriarAcesso={handleCriarAcessoSistema}
                />
              )}
              
              {membroLogado?.permissao === 'admin' && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mt-4">
                  <h4 className="text-sm font-black text-slate-800 uppercase mb-4 tracking-tight flex items-center gap-2">
                    <span className="text-lg">🛡️</span> Gerenciamento Manual de Acessos
                  </h4>
                  <p className="text-xs text-slate-500 mb-6">Como administrador, você pode ligar/desligar módulos específicos para este membro, ignorando o perfil padrão.</p>
                  
                  <div className="space-y-3">
                    {MODULOS_SISTEMA.map((m) => {
                      const isOpen = !!modulosExpandidos[m.modulo];
                      const blocosAtivosCount = m.blocos.filter(bloco => permissoesJson[`${m.modulo}|${bloco}`] === true).length;
                      
                      return (
                        <div key={m.modulo} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200">
                          {/* Cabeçalho do Acordeão */}
                          <button
                            type="button"
                            onClick={() => setModulosExpandidos(prev => ({ ...prev, [m.modulo]: !isOpen }))}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors text-left focus:outline-none"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-extrabold text-slate-800 tracking-tight">{m.modulo}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${blocosAtivosCount > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
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
                            <div className="p-4 border-t border-slate-100 bg-slate-50/30 animate-in fade-in duration-200">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {m.blocos.map((bloco) => {
                                  const keyBase = `${m.modulo}|${bloco}`;
                                  const ativo = permissoesJson[keyBase] === true;
                                  return (
                                    <div key={bloco} className={`p-3 rounded-xl border transition-all duration-200 ${ativo ? 'bg-white border-emerald-200 shadow-xs' : 'bg-white border-slate-200'}`}>
                                      <div className="flex items-center justify-between">
                                        <span className={`text-[11px] font-bold ${ativo ? 'text-slate-800' : 'text-slate-400'}`}>{bloco}</span>
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
                                          className={`w-10 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${ativo ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                        >
                                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-xs transition-all duration-200 ${ativo ? 'right-1' : 'left-1'}`} />
                                        </button>
                                      </div>
                                      
                                      {ativo && (
                                        <div className="flex gap-1 pt-3 border-t border-slate-100 mt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                                          {['ver', 'editar', 'excluir'].map(action => {
                                            const subKey = `${keyBase}|${action}`;
                                            const subAtivo = permissoesJson[subKey] === true;
                                            
                                            let activeClass = '';
                                            let inactiveClass = 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600';
                                            
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
                        <td colSpan={2} className="text-center py-6 text-[var(--text-muted)]">Nenhum vínculo de permissão definido.</td>
                      </tr>
                    ) : (
                      permissoesVinculadas.map((item, idx) => (
                        <tr key={`${item.modulo}-${item.bloco}-${idx}`}>
                          <td className="font-medium text-[var(--text-heading)]">{item.modulo}</td>
                          <td>{item.bloco}</td>
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
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium shadow-lg hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvando}
                  className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-xs font-semibold px-6 py-2.5 rounded-xl disabled:opacity-50 shadow-xl transition"
                >
                  {salvando ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
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
  criandoAcesso,
  mensagemAcesso,
  onCriarAcesso,
}) {
  const acessoAtivo = Boolean(membro?.auth_user_id || membro?.acesso_ativo);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Perfil de permissão (sistema)</label>
        <select value={permissao} onChange={(e) => setPermissao(e.target.value)} className="w-full max-w-md px-3 py-2 text-sm border border-[var(--border)] rounded-xl bg-white">
          <option value="">Usar cargo do membro</option>
          <option value="admin">Admin</option>
          <option value="pastor">Pastor</option>
          <option value="lider-celula">Líder de Célula</option>
          <option value="secretaria">Secretaria</option>
          <option value="tesouraria">Tesouraria</option>
          <option value="membro">Membro</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">Acesso ao sistema</p>
            <p className="text-xs text-slate-500">
              {acessoAtivo
                ? 'Este membro já possui usuário vinculado ao Supabase Auth.'
                : 'Crie um usuário e senha para este membro acessar o painel.'}
            </p>
          </div>
          {acessoAtivo && (
            <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
              Acesso ativo
            </span>
          )}
        </div>

        {!acessoAtivo && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Senha inicial</label>
              <input type="password" value={senhaNovoAcesso} onChange={(e) => setSenhaNovoAcesso(e.target.value)} minLength={6} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Confirmar senha</label>
              <input type="password" value={confirmarSenhaNovoAcesso} onChange={(e) => setConfirmarSenhaNovoAcesso(e.target.value)} minLength={6} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800" />
            </div>
            <button type="button" onClick={onCriarAcesso} disabled={criandoAcesso} className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50">
              {criandoAcesso ? 'Criando...' : 'Criar usuário'}
            </button>
          </div>
        )}

        {!email.trim() && (
          <p className="text-xs font-semibold text-amber-700">Informe um e-mail na aba Dados Pessoais antes de criar o acesso.</p>
        )}
        {mensagemAcesso && (
          <p className={`text-xs font-semibold ${mensagemAcesso.startsWith('Acesso') ? 'text-emerald-700' : 'text-rose-700'}`}>
            {mensagemAcesso}
          </p>
        )}
      </div>
      </div>
  );
}

export default DetalhesMembro;