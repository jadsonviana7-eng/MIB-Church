import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  Music,
  Calendar,
  Search,
  Plus,
  Trash2,
  Pencil,
  FileSpreadsheet,
  Download,
  Share2,
  Printer,
  Sparkles,
  Flame,
  Clock,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  X,
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Menu,
  Info,
  Copy,
  Check,
  Disc3,
  Mic2,
  ListMusic,
  HeartHandshake,
  BookOpen,
  Folder,
  FolderPlus,
  FolderSymlink,
  Tag,
  User,
  Users,
  LayoutGrid,
  List,
  Save,
  MapPin,
  Loader2,
  Play,
  Pause
} from 'lucide-react';
import { repertorioService } from './services/repertorioService';
import { normalizarTexto } from './churchUtils';
import { buscarSugestoesMusica } from './services/musicaBuscaService';

const TONS_DISPONIVEIS = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B',
  'Cm', 'C#m', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bbm', 'Bm'
];

function IconYouTube({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconWhatsApp({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.05 7.42C8.87 7.42 8.59 7.49 8.35 7.75C8.11 8.01 7.44 8.64 7.44 9.91C7.44 11.18 8.37 12.4 8.5 12.57C8.63 12.74 10.3 15.32 12.87 16.43C13.48 16.69 13.96 16.85 14.33 16.97C14.94 17.16 15.5 17.13 15.94 17.07C16.43 17 17.45 16.45 17.66 15.86C17.87 15.27 17.87 14.76 17.81 14.66C17.75 14.56 17.58 14.5 17.33 14.38C17.08 14.26 15.86 13.66 15.63 13.58C15.4 13.5 15.23 13.46 15.06 13.71C14.89 13.96 14.41 14.52 14.26 14.69C14.11 14.86 13.96 14.88 13.71 14.76C13.46 14.64 12.66 14.38 11.71 13.53C10.97 12.87 10.47 12.06 10.33 11.81C10.18 11.56 10.31 11.43 10.44 11.3C10.55 11.19 10.69 11.01 10.82 10.86C10.95 10.71 10.99 10.61 11.07 10.44C11.15 10.27 11.11 10.12 11.05 10C10.99 9.88 10.49 8.66 10.28 8.16C10.08 7.67 9.88 7.74 9.72 7.73C9.57 7.72 9.4 7.72 9.23 7.72L9.05 7.42Z" />
    </svg>
  );
}

export default function RepertorioLouvor({ onVoltar, hideHeader = false, hideSidebar = false }) {
  const [abaAtiva, setAbaAtiva] = useState('cultos'); // 'cultos' | 'biblioteca' | 'estatisticas'
  const [colunaRecolhida, setColunaRecolhida] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dados
  const [musicas, setMusicas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [mapaRepertorios, setMapaRepertorios] = useState({});
  const [eventoSelecionadoId, setEventoSelecionadoId] = useState(null);

  // Seleção Múltipla de Músicas na Biblioteca (Exclusão e Transferência em Lote)
  const [musicasSelecionadas, setMusicasSelecionadas] = useState([]);
  const [modalTransferirAberto, setModalTransferirAberto] = useState(false);
  const [pastaDestinoTransferencia, setPastaDestinoTransferencia] = useState('');
  const [ajustarVozTransferencia, setAjustarVozTransferencia] = useState(true);
  const [transferindoLote, setTransferindoLote] = useState(false);

  // Estados de Bibliotecas / Pastas de Repertório
  const [bibliotecas, setBibliotecas] = useState([]);
  const [bibliotecaSelecionada, setBibliotecaSelecionada] = useState('todas');
  const [modoVisualizacao, setModoVisualizacao] = useState(() => {
    try {
      return localStorage.getItem('mib_repertorio_view_mode') || 'cards';
    } catch (e) {
      return 'cards';
    }
  });

  function trocarModoVisualizacao(modo) {
    setModoVisualizacao(modo);
    try {
      localStorage.setItem('mib_repertorio_view_mode', modo);
    } catch (e) { }
  }

  // Ordenação da Biblioteca e Destaque
  const [ordenacaoBiblioteca, setOrdenacaoBiblioteca] = useState('alfabetica'); // 'alfabetica'
  const [musicaRecemSalvaId, setMusicaRecemSalvaId] = useState(null);
  const [adicionarAoRepertorioAoSalvar, setAdicionarAoRepertorioAoSalvar] = useState(false);

  const [modalBibliotecaAberto, setModalBibliotecaAberto] = useState(false);
  const [bibliotecaEmEdicao, setBibliotecaEmEdicao] = useState(null);
  const [formBiblioteca, setFormBiblioteca] = useState({
    nome: '',
    descricao: '',
    cor: '#ec4899',
    tipo: 'Geral',
    voz: 'Feminino'
  });

  // Estados do Repertório Selecionado
  const [repertorioAtual, setRepertorioAtual] = useState({
    musicas: [],
    tema_culto: '',
    observacoes_gerais: ''
  });
  const [salvandoRepertorio, setSalvandoRepertorio] = useState(false);
  const [toastNotificacao, setToastNotificacao] = useState(null);

  // Modais
  const [modalMusicaAberto, setModalMusicaAberto] = useState(false);
  const [musicaEmEdicao, setMusicaEmEdicao] = useState(null);
  const [formMusica, setFormMusica] = useState({
    titulo: '',
    artista: '',
    tipo: 'Adoração',
    biblioteca: 'Celebração Feminina',
    voz: 'Feminino',
    tom: 'G',
    bpm: '',
    link: '',
    observacoes: ''
  });

  // Estados de Busca e Sugestões Inteligentes de Músicas (Catálogo e Acervo)
  const [sugestoesMusica, setSugestoesMusica] = useState([]);
  const [buscandoSugestoes, setBuscandoSugestoes] = useState(false);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [musicaSelecionadaInfo, setMusicaSelecionadaInfo] = useState(null);
  const [tocandoAudioPreview, setTocandoAudioPreview] = useState(false);
  const audioPreviewRef = useRef(null);
  const timeoutBuscaMusicaRef = useRef(null);

  // Modal Importar Planilha
  const [modalImportarAberto, setModalImportarAberto] = useState(false);
  const [arquivoPlanilha, setArquivoPlanilha] = useState(null);
  const [musicasPreviaImportacao, setMusicasPreviaImportacao] = useState([]);
  const [importandoPlanilha, setImportandoPlanilha] = useState(false);
  const fileInputRef = useRef(null);

  // Drawer / Modal Adicionar Música ao Repertório
  const [modalAdicionarRepertorioAberto, setModalAdicionarRepertorioAberto] = useState(false);
  const [categoriaAdicionar, setCategoriaAdicionar] = useState('Celebração');
  const [filtroBibliotecaAdicionar, setFiltroBibliotecaAdicionar] = useState('todas');
  const [buscaModalAdicionar, setBuscaModalAdicionar] = useState('');
  const [buscaBiblioteca, setBuscaBiblioteca] = useState('');
  const [filtroTipoBiblioteca, setFiltroTipoBiblioteca] = useState('todos');
  const [modoVisualizacaoRepertorio, setModoVisualizacaoRepertorio] = useState('sequencia'); // 'sequencia' | 'blocos'

  // Modal de Visualização do Repertório Salvo do Culto (com envio direto para WhatsApp)
  const [modalVisualizarCulto, setModalVisualizarCulto] = useState(null);
  // Alternância no modo mobile (< lg) entre a lista de cultos e o editor
  const [subAbaMobileCultos, setSubAbaMobileCultos] = useState('lista'); // 'lista' | 'editor'

  // Filtros de Eventos
  const [buscaEvento, setBuscaEvento] = useState('');
  const [filtroStatusEvento, setFiltroStatusEvento] = useState('todos'); // 'todos' | 'com_repertorio' | 'sem_repertorio'
  const [filtroMesEvento, setFiltroMesEvento] = useState(() => {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
  });

  // Mês atual em formato YYYY-MM
  const mesAtualStr = useMemo(() => {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
  }, []);

  // Meses disponíveis para o filtro baseados nos eventos
  const mesesDisponiveis = useMemo(() => {
    const mapaMeses = new Map();

    // Garante presença do mês atual no dropdown
    mapaMeses.set(mesAtualStr, { anoMes: mesAtualStr, total: 0 });

    eventos.forEach(e => {
      if (!e.data_evento) return;
      try {
        const d = new Date(e.data_evento);
        if (!isNaN(d.getTime())) {
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          if (!mapaMeses.has(key)) {
            mapaMeses.set(key, { anoMes: key, total: 0 });
          }
          mapaMeses.get(key).total += 1;
        }
      } catch (err) { }
    });

    const lista = Array.from(mapaMeses.values()).map(item => {
      const [ano, mes] = item.anoMes.split('-').map(Number);
      const dataRef = new Date(ano, mes - 1, 1);
      const nomeMes = dataRef.toLocaleDateString('pt-BR', { month: 'long' });
      const nomeFormatado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

      return {
        anoMes: item.anoMes,
        label: `${nomeFormatado} ${ano}`,
        total: item.total
      };
    });

    lista.sort((a, b) => a.anoMes.localeCompare(b.anoMes));
    return lista;
  }, [eventos, mesAtualStr]);

  function navegarMes(direcao) {
    if (filtroMesEvento === 'todos') {
      setFiltroMesEvento(mesAtualStr);
      return;
    }
    try {
      const [ano, mes] = filtroMesEvento.split('-').map(Number);
      const novaData = new Date(ano, mes - 1 + direcao, 1);
      const novoMes = `${novaData.getFullYear()}-${String(novaData.getMonth() + 1).padStart(2, '0')}`;
      setFiltroMesEvento(novoMes);
    } catch (e) {
      setFiltroMesEvento(mesAtualStr);
    }
  }

  // Estatísticas calculadas
  const [estatisticas, setEstatisticas] = useState(null);

  // Status do Banco de Dados (Supabase)
  const [statusBanco, setStatusBanco] = useState(null);
  const [modalSqlAberto, setModalSqlAberto] = useState(false);
  const [copiadoSql, setCopiadoSql] = useState(false);

  const mostrarToast = (msg) => {
    setToastNotificacao(msg);
    setTimeout(() => setToastNotificacao(null), 3500);
  };

  // Carregamento Inicial
  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    setLoading(true);
    try {
      const [listaMus, listaEv, todosReps, stats, statusDb, listaBibs] = await Promise.all([
        repertorioService.listarMusicas(),
        repertorioService.listarEventosMinisteriais(),
        repertorioService.listarTodosRepertorios(),
        repertorioService.calcularEstatisticasMusicas(),
        repertorioService.verificarConexaoBanco(),
        repertorioService.listarBibliotecas()
      ]);

      setMusicas(listaMus || []);
      setEventos(listaEv || []);
      setMapaRepertorios(todosReps || {});
      setEstatisticas(stats);
      setStatusBanco(statusDb);
      setBibliotecas(listaBibs || []);

      // Auto-seleciona o primeiro evento futuro ou recente se houver
      if (!eventoSelecionadoId && listaEv && listaEv.length > 0) {
        const hojeIso = new Date().toISOString();
        const proximo = listaEv.find(e => e.data_evento >= hojeIso) || listaEv[0];
        if (proximo) {
          selecionarEvento(proximo.id, todosReps);
          if (proximo.data_evento) {
            try {
              const d = new Date(proximo.data_evento);
              if (!isNaN(d.getTime())) {
                const mesProximo = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                setFiltroMesEvento(mesProximo);
              }
            } catch (err) { }
          }
        }
      }
    } catch (e) {
      console.error('Erro ao carregar dados do repertório:', e);
    } finally {
      setLoading(false);
    }
  }

  function selecionarEvento(eventoId, mapReps = mapaRepertorios) {
    setEventoSelecionadoId(eventoId);
    const repExistente = mapReps[String(eventoId)];
    if (repExistente) {
      setRepertorioAtual({
        id: repExistente.id,
        musicas: Array.isArray(repExistente.musicas) ? [...repExistente.musicas] : [],
        tema_culto: repExistente.tema_culto || '',
        observacoes_gerais: repExistente.observacoes_gerais || ''
      });
    } else {
      setRepertorioAtual({
        musicas: [],
        tema_culto: '',
        observacoes_gerais: ''
      });
    }
  }

  const eventoAtualObj = useMemo(() => {
    if (!eventoSelecionadoId) return null;
    return eventos.find(e => String(e.id) === String(eventoSelecionadoId)) || null;
  }, [eventoSelecionadoId, eventos]);

  // Repertório exibido no modal de visualização rápida do culto
  const repModalVisualizado = useMemo(() => {
    if (!modalVisualizarCulto) return null;
    if (String(eventoSelecionadoId) === String(modalVisualizarCulto.id) && repertorioAtual?.musicas?.length > 0) {
      return repertorioAtual;
    }
    return mapaRepertorios[String(modalVisualizarCulto.id)] || { musicas: [], tema_culto: '', observacoes_gerais: '' };
  }, [modalVisualizarCulto, eventoSelecionadoId, repertorioAtual, mapaRepertorios]);

  // Formatar Data e Hora amigável
  function formatarDataHoraEvento(dataIso) {
    if (!dataIso) return { dataFormatada: 'Data a definir', horaFormatada: '--:--', diaSemana: '' };
    try {
      const d = new Date(dataIso);
      const dia = String(d.getDate()).padStart(2, '0');
      const mes = String(d.getMonth() + 1).padStart(2, '0');
      const ano = d.getFullYear();
      const hora = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const diaSemana = diasSemana[d.getDay()];

      return {
        dataFormatada: `${dia}/${mes}/${ano}`,
        horaFormatada: `${hora}:${min}`,
        diaSemana
      };
    } catch (e) {
      return { dataFormatada: dataIso, horaFormatada: '', diaSemana: '' };
    }
  }

  // ── AÇÕES DO REPERTÓRIO DO CULTO ──
  async function salvarRepertorio() {
    if (!eventoSelecionadoId) return;
    setSalvandoRepertorio(true);
    try {
      const payload = {
        ...repertorioAtual,
        evento_id: eventoSelecionadoId,
        evento_titulo: eventoAtualObj?.titulo || 'Culto/Evento',
        evento_data: eventoAtualObj?.data_evento || new Date().toISOString()
      };

      const salvo = await repertorioService.salvarRepertorioCulto(eventoSelecionadoId, payload);
      setMapaRepertorios(prev => ({
        ...prev,
        [String(eventoSelecionadoId)]: salvo
      }));

      // Recalcula métricas
      const stats = await repertorioService.calcularEstatisticasMusicas();
      setEstatisticas(stats);

      if (salvo?._salvoNoBanco) {
        mostrarToast('Repertório do culto salvo no Banco de Dados (Supabase)!');
      } else {
        mostrarToast(`Repertório salvo localmente${salvo?._erroBanco ? ` (${salvo._erroBanco})` : ''}.`);
      }
    } catch (e) {
      console.error(e);
      alert('Erro ao salvar repertório: ' + e.message);
    } finally {
      setSalvandoRepertorio(false);
    }
  }

  function adicionarMusicaAoRepertorio(musica, tipoSobrescrito = null) {
    const tipoFinal = (tipoSobrescrito && tipoSobrescrito !== 'todos') ? tipoSobrescrito : (musica.tipo || 'Adoração');
    const novaMusicaItem = {
      musica_id: musica.id,
      titulo: musica.titulo,
      artista: musica.artista || '',
      tipo: tipoFinal,
      tom: musica.tom || 'G',
      ordem: repertorioAtual.musicas.length + 1,
      observacao: ''
    };

    setRepertorioAtual(prev => ({
      ...prev,
      musicas: [...prev.musicas, novaMusicaItem]
    }));

    mostrarToast(`"${musica.titulo}" adicionada como ${tipoFinal}!`);
  }

  function abrirModalAdicionarPorTipo(tipo = 'Adoração') {
    setCategoriaAdicionar(tipo);
    setFiltroBibliotecaAdicionar('todas');
    setBuscaModalAdicionar('');
    setModalAdicionarRepertorioAberto(true);
  }

  function atualizarTipoMusicaRepertorio(index, novoTipo) {
    setRepertorioAtual(prev => {
      const novaLista = [...prev.musicas];
      if (novaLista[index]) {
        novaLista[index] = { ...novaLista[index], tipo: novoTipo };
      }
      return { ...prev, musicas: novaLista };
    });
  }

  function removerMusicaDoRepertorio(index) {
    setRepertorioAtual(prev => {
      const novaLista = prev.musicas.filter((_, idx) => idx !== index);
      // Reordena
      return {
        ...prev,
        musicas: novaLista.map((item, idx) => ({ ...item, ordem: idx + 1 }))
      };
    });
  }

  function moverMusicaRepertorio(index, direcao) {
    const novoIndex = index + direcao;
    if (novoIndex < 0 || novoIndex >= repertorioAtual.musicas.length) return;

    setRepertorioAtual(prev => {
      const novaLista = [...prev.musicas];
      const temp = novaLista[index];
      novaLista[index] = novaLista[novoIndex];
      novaLista[novoIndex] = temp;
      return {
        ...prev,
        musicas: novaLista.map((item, idx) => ({ ...item, ordem: idx + 1 }))
      };
    });
  }

  function atualizarTomMusicaRepertorio(index, novoTom) {
    setRepertorioAtual(prev => {
      const novaLista = [...prev.musicas];
      novaLista[index] = { ...novaLista[index], tom: novoTom };
      return { ...prev, musicas: novaLista };
    });
  }

  function atualizarObsMusicaRepertorio(index, novaObs) {
    setRepertorioAtual(prev => {
      const novaLista = [...prev.musicas];
      novaLista[index] = { ...novaLista[index], observacao: novaObs };
      return { ...prev, musicas: novaLista };
    });
  }

  async function handleGerarSugestaoInteligente() {
    if (repertorioAtual.musicas.length > 0) {
      if (!window.confirm('Substituir as músicas atuais pela sugestão inteligente calculada?')) {
        return;
      }
    }

    const sugestao = await repertorioService.gerarSugestaoRepertorioAutomatico({
      qtdCelebracao: 2,
      qtdAdoracao: 2,
      qtdPosPregacao: 1
    });

    if (sugestao.length === 0) {
      alert('Cadastre ou importe músicas na biblioteca para gerar sugestões automáticas.');
      return;
    }

    setRepertorioAtual(prev => ({
      ...prev,
      musicas: sugestao
    }));

    mostrarToast('Repertório equilibrado sugerido automaticamente!');
  }

  function enviarWhatsAppCulto(ev = null, repParam = null) {
    const evento = ev || eventoAtualObj;
    if (!evento) {
      mostrarToast('Selecione um culto para compartilhar o repertório.');
      return;
    }

    const repertorio = repParam ||
      (String(eventoSelecionadoId) === String(evento.id) && repertorioAtual?.musicas?.length > 0
        ? repertorioAtual
        : (mapaRepertorios[String(evento.id)] || { musicas: [], tema_culto: '', observacoes_gerais: '' }));

    const { dataFormatada, horaFormatada, diaSemana } = formatarDataHoraEvento(evento.data_evento);

    let texto = `🎶 *REPERTÓRIO DE LOUVOR · MIB CHURCH*\n`;
    texto += `📌 *${evento.titulo}*\n`;
    texto += `📅 ${diaSemana}, ${dataFormatada}${horaFormatada !== '--:--' ? ` às ${horaFormatada}` : ''}\n`;
    if (evento.pregador) texto += `📖 Palavra: ${evento.pregador}\n`;
    if (evento.local) texto += `📍 Local: ${evento.local}\n`;
    if (repertorio.tema_culto) texto += `🎯 Tema: ${repertorio.tema_culto}\n`;
    texto += `\n─────────────────────\n`;

    const musicasLista = Array.isArray(repertorio.musicas) ? repertorio.musicas : [];
    if (musicasLista.length > 0) {
      texto += `\n📋 *ORDEM DO LOUVOR NO CULTO (${musicasLista.length} músicas):*\n\n`;
      musicasLista.forEach((m, idx) => {
        const emoji = m.tipo === 'Celebração' ? '⚡' : m.tipo === 'Pós pregação' ? '🕊️' : '🙏';
        const pastaNome = m.biblioteca || m.pasta || '';
        const pastaInfo = pastaNome ? ` [${pastaNome}]` : '';
        const tomInfo = m.tom ? `Tom: *${m.tom}*` : 'Tom: *N/A*';
        const bpmInfo = m.bpm ? ` | BPM: *${m.bpm}*` : '';
        const tipoInfo = m.tipo ? ` | Tipo: *${m.tipo}*` : '';

        texto += `${idx + 1}. ${emoji} *${m.titulo}* - ${m.artista || 'Geral'}\n`;
        texto += `   ↳ ${tomInfo}${tipoInfo}${bpmInfo}${pastaInfo}\n`;
        if (m.observacao) {
          texto += `   ↳ 📝 _Obs: ${m.observacao}_\n`;
        }
      });
    } else {
      texto += `\n(Nenhuma música definida ainda no repertório)\n`;
    }

    if (repertorio.observacoes_gerais) {
      texto += `\n📝 *Observações:* ${repertorio.observacoes_gerais}\n`;
    }

    texto += `\n🔥 _"Cantai-lhe um cântico novo; tocai bem e com júbilo." (Sl 33:3)_`;

    // Também copia para a área de transferência silenciosamente como backup
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).catch(() => { });
      }
    } catch (_) { }

    // Abre diretamente o WhatsApp com o texto formatado para envio
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    mostrarToast('Abrindo WhatsApp com o repertório...');
  }

  const enviarParaWhatsApp = () => enviarWhatsAppCulto(eventoAtualObj, repertorioAtual);
  const copiarParaWhatsApp = enviarParaWhatsApp;

  function imprimirRepertorio() {
    window.print();
  }

  // ── FUNÇÕES DE BUSCA E AUTOCOMPLETE INTELIGENTE ──
  function pararAudioPreview() {
    if (audioPreviewRef.current) {
      try {
        audioPreviewRef.current.pause();
      } catch (_) { }
      audioPreviewRef.current = null;
    }
    setTocandoAudioPreview(false);
  }

  function toggleAudioPreview(url) {
    if (!url) return;
    if (tocandoAudioPreview) {
      pararAudioPreview();
    } else {
      pararAudioPreview();
      try {
        const audio = new Audio(url);
        audio.volume = 0.7;
        audio.onended = () => setTocandoAudioPreview(false);
        audio.onerror = () => setTocandoAudioPreview(false);
        audio.play().catch(() => setTocandoAudioPreview(false));
        audioPreviewRef.current = audio;
        setTocandoAudioPreview(true);
      } catch (err) {
        setTocandoAudioPreview(false);
      }
    }
  }

  function handleTituloChange(valor) {
    setFormMusica(prev => ({ ...prev, titulo: valor }));

    if (musicaSelecionadaInfo && valor !== musicaSelecionadaInfo.tituloOriginal) {
      setMusicaSelecionadaInfo(null);
    }

    if (!valor || valor.trim().length < 2) {
      setSugestoesMusica([]);
      setMostrarSugestoes(false);
      setBuscandoSugestoes(false);
      if (timeoutBuscaMusicaRef.current) clearTimeout(timeoutBuscaMusicaRef.current);
      return;
    }

    setBuscandoSugestoes(true);
    setMostrarSugestoes(true);

    if (timeoutBuscaMusicaRef.current) clearTimeout(timeoutBuscaMusicaRef.current);
    timeoutBuscaMusicaRef.current = setTimeout(async () => {
      try {
        const resultados = await buscarSugestoesMusica(valor, musicas);
        setSugestoesMusica(resultados);
      } catch (err) {
        console.error('Erro ao buscar sugestões:', err);
      } finally {
        setBuscandoSugestoes(false);
      }
    }, 320);
  }

  function aplicarSugestaoMusica(sug) {
    pararAudioPreview();
    setFormMusica(prev => {
      const tomFinal = sug.tom && TONS_DISPONIVEIS.includes(sug.tom) ? sug.tom : prev.tom;
      const bpmFinal = sug.bpm || prev.bpm;
      const tipoFinal = sug.tipo || prev.tipo;
      const linkFinal = sug.linkCifra || sug.linkYoutube || prev.link;

      // Alinhamento inteligente da pasta/biblioteca com o tipo da música e a classificação vocal
      let bibFinal = prev.biblioteca;
      const achada = bibliotecas.find(b =>
        normalizarTexto(b.tipo || '') === normalizarTexto(tipoFinal) &&
        (!prev.voz || normalizarTexto(b.voz || '') === normalizarTexto(prev.voz))
      );
      if (achada) {
        bibFinal = achada.nome;
      }

      return {
        ...prev,
        titulo: sug.titulo,
        artista: sug.artista,
        tom: tomFinal,
        bpm: bpmFinal,
        tipo: tipoFinal,
        biblioteca: bibFinal,
        link: linkFinal
      };
    });

    setMusicaSelecionadaInfo({
      tituloOriginal: sug.titulo,
      capa: sug.capa,
      album: sug.album,
      ano: sug.ano,
      genero: sug.genero,
      origem: sug.origem,
      previewAudio: sug.previewAudio,
      linkCifra: sug.linkCifra,
      linkYoutube: sug.linkYoutube,
      tomSugerido: sug.tom,
      bpmSugerido: sug.bpm
    });

    setMostrarSugestoes(false);
  }

  // ── AÇÕES DA BIBLIOTECA DE MÚSICAS ──
  function abrirModalNovaMusica(tipoPredefinido = 'Adoração', bibliotecaPredefinida = null) {
    pararAudioPreview();
    setMusicaSelecionadaInfo(null);
    setSugestoesMusica([]);
    setMostrarSugestoes(false);
    setMusicaEmEdicao(null);
    if (!adicionarAoRepertorioAoSalvar) {
      setAdicionarAoRepertorioAoSalvar(false);
    }
    let bibFinal = bibliotecaPredefinida || (bibliotecaSelecionada !== 'todas' ? bibliotecaSelecionada : '');
    let vozFinal = 'Feminino';

    if (bibFinal) {
      const achada = bibliotecas.find(b => normalizarTexto(b.nome) === normalizarTexto(bibFinal));
      if (achada) {
        vozFinal = achada.voz || 'Feminino';
      }
    } else {
      bibFinal = 'Celebração Feminina';
    }

    setFormMusica({
      titulo: '',
      artista: '',
      tipo: tipoPredefinido,
      biblioteca: bibFinal,
      voz: vozFinal,
      tom: 'G',
      bpm: '',
      link: '',
      observacoes: ''
    });
    setModalMusicaAberto(true);
  }

  function abrirModalEditarMusica(musica) {
    pararAudioPreview();
    setMusicaSelecionadaInfo(null);
    setSugestoesMusica([]);
    setMostrarSugestoes(false);
    setMusicaEmEdicao(musica);
    setFormMusica({
      titulo: musica.titulo || '',
      artista: musica.artista || '',
      tipo: musica.tipo || 'Adoração',
      biblioteca: musica.biblioteca || 'Geral',
      voz: musica.voz || 'Misto',
      tom: musica.tom || 'G',
      bpm: musica.bpm || '',
      link: musica.link || '',
      observacoes: musica.observacoes || ''
    });
    setModalMusicaAberto(true);
  }

  async function salvarMusicaForm(e) {
    e.preventDefault();
    if (!formMusica.titulo.trim()) {
      alert('Informe o título da música.');
      return;
    }

    try {
      const payload = {
        ...(musicaEmEdicao || {}),
        ...formMusica
      };

      const salvo = await repertorioService.salvarMusica(payload);
      const listaAtualizada = await repertorioService.listarMusicas();
      setMusicas(listaAtualizada);

      const stats = await repertorioService.calcularEstatisticasMusicas();
      setEstatisticas(stats);

      pararAudioPreview();
      setModalMusicaAberto(false);

      // Limpar busca e filtro para a música ficar 100% visível na tela sem bloqueios
      setBuscaBiblioteca('');
      setFiltroTipoBiblioteca('todos');

      if (adicionarAoRepertorioAoSalvar) {
        adicionarMusicaAoRepertorio(salvo, categoriaAdicionar);
        setAdicionarAoRepertorioAoSalvar(false);
      } else {
        // Redireciona para a aba Biblioteca para ver a música imediatamente
        setAbaAtiva('biblioteca');
        // Se a música foi cadastrada numa pasta específica, navega até ela para exibi-la imediatamente
        if (salvo?.biblioteca && salvo.biblioteca !== 'Geral') {
          setBibliotecaSelecionada(salvo.biblioteca);
        }
        if (salvo?.id) {
          setMusicaRecemSalvaId(salvo.id);
          setTimeout(() => setMusicaRecemSalvaId(null), 25000);
        }
      }

      const nomePasta = salvo?.biblioteca || 'Geral';
      if (salvo?._salvoNoBanco) {
        mostrarToast(musicaEmEdicao ? 'Música atualizada no Banco de Dados!' : `🎵 "${salvo.titulo}" salva na pasta "${nomePasta}"!`);
      } else {
        mostrarToast(musicaEmEdicao ? 'Música atualizada no cache local!' : `🎵 "${salvo.titulo}" salva na pasta "${nomePasta}" (local)!`);
      }
    } catch (err) {
      alert('Erro ao salvar música: ' + err.message);
    }
  }

  // ── AÇÕES DE BIBLIOTECAS (PASTAS) ──
  async function salvarBibliotecaForm(e) {
    e.preventDefault();
    if (!formBiblioteca.nome.trim()) {
      alert('Informe o nome da biblioteca.');
      return;
    }

    try {
      const payload = {
        ...(bibliotecaEmEdicao || {}),
        ...formBiblioteca
      };

      const salva = await repertorioService.salvarBiblioteca(payload);
      const listaAtualizada = await repertorioService.listarBibliotecas();
      setBibliotecas(listaAtualizada);
      setModalBibliotecaAberto(false);
      setBibliotecaSelecionada(salva.nome);
      mostrarToast(`Pasta "${salva.nome}" salva com sucesso!`);
    } catch (err) {
      alert('Erro ao salvar biblioteca: ' + err.message);
    }
  }

  async function excluirBibliotecaItem(bib) {
    if (!window.confirm(`Deseja excluir a pasta de biblioteca "${bib.nome}"? As músicas cadastradas continuarão salvas no acervo.`)) return;
    try {
      await repertorioService.excluirBiblioteca(bib.id, bib.nome);
      const listaAtualizada = await repertorioService.listarBibliotecas();
      setBibliotecas(listaAtualizada);
      if (bibliotecaSelecionada === bib.nome) {
        setBibliotecaSelecionada('todas');
      }
      mostrarToast(`Pasta "${bib.nome}" removida.`);
    } catch (e) {
      alert('Erro ao excluir biblioteca: ' + e.message);
    }
  }

  async function excluirMusicaItem(id, titulo) {
    if (!window.confirm(`Deseja excluir a música "${titulo}" da biblioteca?`)) return;

    try {
      await repertorioService.excluirMusica(id);
      setMusicas(prev => prev.filter(m => m.id !== id));
      setMusicasSelecionadas(prev => prev.filter(item => item !== id));
      const stats = await repertorioService.calcularEstatisticasMusicas();
      setEstatisticas(stats);
      mostrarToast('Música removida da biblioteca.');
    } catch (e) {
      alert('Erro ao excluir música: ' + e.message);
    }
  }

  // ── SELEÇÃO MÚLTIPLA E EXCLUSÃO EM LOTE ──
  function toggleSelecionarMusica(id) {
    setMusicasSelecionadas(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }

  function toggleSelecionarTodasVisiveis() {
    const idsVisiveis = musicasFiltradas.map(m => m.id);
    const todasMarcadas = idsVisiveis.length > 0 && idsVisiveis.every(id => musicasSelecionadas.includes(id));
    if (todasMarcadas) {
      setMusicasSelecionadas(prev => prev.filter(id => !idsVisiveis.includes(id)));
    } else {
      setMusicasSelecionadas(prev => Array.from(new Set([...prev, ...idsVisiveis])));
    }
  }

  async function handleExcluirSelecionadas() {
    const total = musicasSelecionadas.length;
    if (total === 0) return;

    const mensagem = total === 1
      ? 'Deseja realmente excluir a música selecionada da biblioteca?'
      : `Deseja realmente excluir as ${total} músicas selecionadas da biblioteca? Esta ação não pode ser desfeita.`;

    if (!window.confirm(mensagem)) return;

    setLoading(true);
    try {
      await repertorioService.excluirMusicasEmLote(musicasSelecionadas);
      setMusicas(prev => prev.filter(m => !musicasSelecionadas.includes(m.id)));
      setMusicasSelecionadas([]);
      const stats = await repertorioService.calcularEstatisticasMusicas();
      setEstatisticas(stats);
      mostrarToast(`${total} ${total === 1 ? 'música excluída' : 'músicas excluídas'} com sucesso!`);
    } catch (e) {
      alert('Erro ao excluir músicas selecionadas: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  function abrirModalTransferir() {
    if (musicasSelecionadas.length === 0) return;
    const outra = bibliotecasDisponiveis.find(b => b.nome !== bibliotecaSelecionada)?.nome || bibliotecasDisponiveis[0]?.nome || 'Geral';
    setPastaDestinoTransferencia(outra);
    setAjustarVozTransferencia(true);
    setModalTransferirAberto(true);
  }

  async function handleConfirmarTransferencia() {
    if (!pastaDestinoTransferencia || musicasSelecionadas.length === 0) return;
    const total = musicasSelecionadas.length;

    setTransferindoLote(true);
    try {
      await repertorioService.transferirMusicasEmLote(
        musicasSelecionadas,
        pastaDestinoTransferencia,
        ajustarVozTransferencia
      );
      const atualizadas = await repertorioService.listarMusicas();
      setMusicas(atualizadas);
      const stats = await repertorioService.calcularEstatisticasMusicas();
      setEstatisticas(stats);
      mostrarToast(`${total} ${total === 1 ? 'música transferida' : 'músicas transferidas'} para a pasta "${pastaDestinoTransferencia}"!`);
      setMusicasSelecionadas([]);
      setModalTransferirAberto(false);
    } catch (e) {
      alert('Erro ao transferir músicas: ' + e.message);
    } finally {
      setTransferindoLote(false);
    }
  }

  async function handleCarregarSeed() {
    if (!window.confirm('Deseja carregar 25 músicas populares de celebração e adoração na sua biblioteca?')) return;
    setLoading(true);
    try {
      const atualizados = await repertorioService.carregarSeedPadrao();
      setMusicas(atualizados);
      const stats = await repertorioService.calcularEstatisticasMusicas();
      setEstatisticas(stats);
      mostrarToast('25 músicas populares adicionadas com sucesso!');
    } finally {
      setLoading(false);
    }
  }

  // ── IMPORTAÇÃO DE PLANILHA (XLSX / XLS / CSV) ──
  function handleSelecionarArquivoPlanilha(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setArquivoPlanilha(file);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (!json || json.length < 2) {
          alert('A planilha selecionada não contém linhas de dados suficientes.');
          return;
        }

        // Mapeia colunas do cabeçalho
        const headerRow = json[0].map(col => normalizarTexto(String(col || '')));
        let idxTitulo = headerRow.findIndex(c => c.includes('titul') || c.includes('music') || c.includes('nome') || c.includes('song'));
        if (idxTitulo === -1) idxTitulo = 0; // Primeira coluna como fallback

        const idxArtista = headerRow.findIndex(c => c.includes('artist') || c.includes('cantor') || c.includes('banda') || c.includes('minist'));
        const idxTipo = headerRow.findIndex(c => c.includes('tipo') || c.includes('categ'));
        const idxBiblioteca = headerRow.findIndex(c => c.includes('bibliot') || c.includes('pasta') || c.includes('coletan') || c.includes('colec'));
        const idxVoz = headerRow.findIndex(c => c.includes('voz') || c.includes('vocal') || c.includes('genero'));
        const idxTom = headerRow.findIndex(c => c.includes('tom') || c.includes('key'));
        const idxBpm = headerRow.findIndex(c => c.includes('bpm') || c.includes('andament') || c.includes('tempo'));
        const idxLink = headerRow.findIndex(c => c.includes('link') || c.includes('cifra') || c.includes('video') || c.includes('youtube'));

        const parsed = [];
        for (let r = 1; r < json.length; r++) {
          const row = json[r];
          if (!row || row.length === 0) continue;

          const rawTitulo = String(row[idxTitulo] || '').trim();
          if (!rawTitulo) continue;

          parsed.push({
            titulo: rawTitulo,
            artista: idxArtista !== -1 && row[idxArtista] ? String(row[idxArtista]).trim() : '',
            tipo: idxTipo !== -1 && row[idxTipo] ? String(row[idxTipo]).trim() : 'Adoração',
            biblioteca: idxBiblioteca !== -1 && row[idxBiblioteca] ? String(row[idxBiblioteca]).trim() : '',
            voz: idxVoz !== -1 && row[idxVoz] ? String(row[idxVoz]).trim() : '',
            tom: idxTom !== -1 && row[idxTom] ? String(row[idxTom]).trim() : 'G',
            bpm: idxBpm !== -1 && row[idxBpm] ? String(row[idxBpm]).trim() : '',
            link: idxLink !== -1 && row[idxLink] ? String(row[idxLink]).trim() : ''
          });
        }

        setMusicasPreviaImportacao(parsed);
      } catch (err) {
        console.error('Erro ao ler planilha:', err);
        alert('Não foi possível ler o arquivo. Certifique-se de que é um .xlsx, .xls ou .csv válido.');
      }
    };

    reader.readAsBinaryString(file);
  }

  async function confirmarImportacaoPlanilha() {
    if (musicasPreviaImportacao.length === 0) return;
    setImportandoPlanilha(true);
    try {
      const combinadas = await repertorioService.importarMusicasEmLote(musicasPreviaImportacao);
      setMusicas(combinadas);
      const stats = await repertorioService.calcularEstatisticasMusicas();
      setEstatisticas(stats);

      mostrarToast(`${musicasPreviaImportacao.length} músicas importadas com sucesso!`);
      setModalImportarAberto(false);
      setArquivoPlanilha(null);
      setMusicasPreviaImportacao([]);
    } catch (e) {
      alert('Erro ao importar: ' + e.message);
    } finally {
      setImportandoPlanilha(false);
    }
  }

  function baixarModeloPlanilha() {
    const dadosExemplo = [
      { 'Título': 'A Ele a Glória', 'Artista': 'Gabriela Rocha', 'Tipo': 'Celebração', 'Biblioteca': 'Celebração Feminina', 'Vocal': 'Feminino', 'Tom': 'C', 'BPM': 120, 'Link Cifra': 'https://cifraclub.com.br' },
      { 'Título': 'É Tudo Sobre Você', 'Artista': 'Morada', 'Tipo': 'Celebração', 'Biblioteca': 'Celebração Masculina', 'Vocal': 'Masculino', 'Tom': 'D', 'BPM': 128, 'Link Cifra': 'https://cifraclub.com.br' },
      { 'Título': 'Lugar Secreto', 'Artista': 'Gabriela Rocha', 'Tipo': 'Adoração', 'Biblioteca': 'Adoração Feminina', 'Vocal': 'Feminino', 'Tom': 'C', 'BPM': 68, 'Link Cifra': '' },
      { 'Título': 'A Casa É Sua', 'Artista': 'Casa Worship', 'Tipo': 'Adoração', 'Biblioteca': 'Adoração Masculina', 'Vocal': 'Masculino', 'Tom': 'G', 'BPM': 72, 'Link Cifra': '' },
      { 'Título': 'Ruja o Leão', 'Artista': 'Talita Catanzaro', 'Tipo': 'Pós pregação', 'Biblioteca': 'Pós Pregação', 'Vocal': 'Feminino', 'Tom': 'A', 'BPM': 70, 'Link Cifra': '' }
    ];

    const ws = XLSX.utils.json_to_sheet(dadosExemplo);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Modelo_Musicas');
    XLSX.writeFile(wb, 'Modelo_Importacao_Musicas_MIB.xlsx');
  }

  // Função auxiliar para verificar se a música pertence a uma biblioteca/pasta
  function pertenceABiblioteca(m, b) {
    if (!b || b === 'todas') return true;
    const nomeB = typeof b === 'string' ? b : b?.nome;
    const bibObj = typeof b === 'string' ? bibliotecas.find(item => item.nome === b || item.id === b) : b;

    const normB = normalizarTexto(nomeB || '');
    const normMusBib = normalizarTexto(m?.biblioteca || '');

    // 1. Match direto pelo nome da biblioteca
    if (normMusBib && (normMusBib === normB || normMusBib.includes(normB) || normB.includes(normMusBib))) {
      return true;
    }
    if (m?.biblioteca_id && bibObj && m.biblioteca_id === bibObj.id) {
      return true;
    }

    // 2. Fallback por tipo e voz se a música não tiver biblioteca definida explicitamente ou for "Geral"
    if (!m?.biblioteca || m.biblioteca === 'Geral') {
      if (bibObj) {
        const matchTipo = !bibObj.tipo || bibObj.tipo === 'Geral' || normalizarTexto(m?.tipo || '') === normalizarTexto(bibObj.tipo);
        const matchVoz = !bibObj.voz || bibObj.voz === 'Geral' || normalizarTexto(m?.voz || '') === normalizarTexto(bibObj.voz);
        if (matchTipo && matchVoz && bibObj.tipo !== 'Geral') {
          return true;
        }
      }
    }

    return false;
  }

  // Filtragem e Ordenação da Biblioteca
  const musicasFiltradas = useMemo(() => {
    const termo = normalizarTexto(buscaBiblioteca);

    const filtradas = musicas.filter(m => {
      const matchesBusca = !termo ||
        normalizarTexto(m.titulo).includes(termo) ||
        normalizarTexto(m.artista || '').includes(termo) ||
        normalizarTexto(m.biblioteca || '').includes(termo);

      // Se o usuário digitou uma busca por texto, pesquisa no acervo inteiro sem bloqueio por pasta:
      const matchesBiblioteca = termo ? true : pertenceABiblioteca(m, bibliotecaSelecionada);

      return matchesBusca && matchesBiblioteca;
    });

    return filtradas.sort((a, b) => {
      return (a.titulo || '').localeCompare(b.titulo || '', 'pt-BR', { sensitivity: 'base' });
    });
  }, [musicas, buscaBiblioteca, bibliotecaSelecionada, bibliotecas]);

  // Indicador de todas as músicas visíveis selecionadas
  const todasVisiveisSelecionadas = useMemo(() => {
    if (musicasFiltradas.length === 0) return false;
    return musicasFiltradas.every(m => musicasSelecionadas.includes(m.id));
  }, [musicasFiltradas, musicasSelecionadas]);

  // Lista de objetos das músicas selecionadas
  const musicasSelecionadasObjs = useMemo(() => {
    const setIds = new Set(musicasSelecionadas);
    return musicas.filter(m => setIds.has(m.id));
  }, [musicas, musicasSelecionadas]);

  // Bibliotecas disponíveis para transferência
  const bibliotecasDisponiveis = useMemo(() => {
    const list = [...bibliotecas];
    const temGeral = list.some(b => normalizarTexto(b.nome) === 'geral');
    if (!temGeral) {
      list.unshift({
        id: 'geral-padrao',
        nome: 'Geral',
        descricao: 'Acervo principal sem classificação de voz ou ritmo',
        cor: '#3b82f6',
        tipo: 'Geral',
        voz: 'Misto'
      });
    }
    return list;
  }, [bibliotecas]);

  // Pastas correspondentes ao momento clicado no modal "Adicionar ao Repertório"
  const pastasModalAdicionar = useMemo(() => {
    const musicasDoMomento = musicas.filter(m =>
      !categoriaAdicionar || categoriaAdicionar === 'todos' || m.tipo === categoriaAdicionar
    );

    const countTodas = musicasDoMomento.length;
    const countMasc = musicasDoMomento.filter(m =>
      m.voz === 'Masculino' || normalizarTexto(m.biblioteca || '').includes('masculin')
    ).length;
    const countFem = musicasDoMomento.filter(m =>
      m.voz === 'Feminino' || normalizarTexto(m.biblioteca || '').includes('feminin')
    ).length;
    const countMisto = musicasDoMomento.filter(m =>
      m.voz === 'Misto' || (!normalizarTexto(m.biblioteca || '').includes('masculin') && !normalizarTexto(m.biblioteca || '').includes('feminin') && (m.voz === 'Misto' || !m.voz))
    ).length;

    const prefixo = categoriaAdicionar && categoriaAdicionar !== 'todos' ? categoriaAdicionar : '';

    const cards = [
      {
        id: 'todas',
        label: prefixo ? `Todas (${prefixo})` : 'Todas as Pastas',
        sub: prefixo ? `Acervo de ${prefixo}` : 'Acervo Geral',
        count: countTodas,
        icon: Disc3,
        iconBadgeClass: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
        activeClass: 'bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 text-white border-blue-600 ring-2 ring-blue-400/40',
        textClass: 'text-slate-800',
        subClass: 'text-slate-400',
        countClass: 'bg-slate-100 text-slate-700',
        bgCard: 'bg-white hover:bg-slate-50 border-slate-200/90'
      },
      {
        id: 'masculino',
        label: 'Masculino',
        sub: prefixo ? `${prefixo} Masc.` : 'Tons masculinos',
        count: countMasc,
        icon: User,
        iconBadgeClass: 'bg-blue-50 text-blue-600 border border-blue-200/60',
        activeClass: 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white border-blue-600 ring-2 ring-blue-400/40',
        textClass: 'text-blue-700 font-black',
        subClass: 'text-blue-500 font-medium',
        countClass: 'bg-blue-100 text-blue-700 font-bold',
        bgCard: 'bg-white hover:bg-blue-50/40 border-blue-200/80'
      },
      {
        id: 'feminino',
        label: 'Feminino',
        sub: prefixo ? `${prefixo} Fem.` : 'Tons femininos',
        count: countFem,
        icon: User,
        iconBadgeClass: 'bg-pink-50 text-pink-600 border border-pink-200/60',
        activeClass: 'bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 text-white border-pink-600 ring-2 ring-pink-400/40',
        textClass: 'text-pink-700 font-black',
        subClass: 'text-pink-500 font-medium',
        countClass: 'bg-pink-100 text-pink-700 font-bold',
        bgCard: 'bg-white hover:bg-pink-50/40 border-pink-200/80'
      },
      {
        id: 'misto',
        label: 'Misto',
        sub: prefixo ? `${prefixo} Mista` : 'Ambos / Duetos',
        count: countMisto,
        icon: Users,
        iconBadgeClass: 'bg-purple-50 text-purple-600 border border-purple-200/60',
        activeClass: 'bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 text-white border-purple-600 ring-2 ring-purple-400/40',
        textClass: 'text-purple-700 font-black',
        subClass: 'text-purple-500 font-medium',
        countClass: 'bg-purple-100 text-purple-700 font-bold',
        bgCard: 'bg-white hover:bg-purple-50/40 border-purple-200/80'
      }
    ];

    // Se houver pastas extras customizadas cadastradas especificamente para este momento
    if (categoriaAdicionar && categoriaAdicionar !== 'todos') {
      const normCat = normalizarTexto(categoriaAdicionar);
      const bibsExtras = bibliotecas.filter(b => {
        const normB = normalizarTexto(b.nome || '');
        const normTipo = normalizarTexto(b.tipo || '');
        return (normTipo === normCat || normB.includes(normCat)) &&
          !normB.includes('masculin') && !normB.includes('feminin') && !normB.includes('misto') && normB !== 'geral';
      });

      bibsExtras.forEach(b => {
        const c = musicasDoMomento.filter(m => pertenceABiblioteca(m, b)).length;
        const estilo = getEstiloPasta(b.nome, b.voz);
        cards.push({
          id: b.nome,
          label: b.nome,
          sub: b.descricao || 'Pasta personalizada',
          count: c,
          icon: Folder,
          iconBadgeClass: estilo.iconBadgeClass,
          activeClass: 'bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 text-white border-blue-600 ring-2 ring-blue-400/40',
          textClass: estilo.textClass,
          subClass: estilo.subClass,
          countClass: estilo.countClass,
          bgCard: estilo.bgCard
        });
      });
    }

    return cards;
  }, [musicas, categoriaAdicionar, bibliotecas]);

  // Filtragem de Músicas no Modal de Adicionar ao Repertório do Culto
  const musicasParaAdicionar = useMemo(() => {
    return musicas.filter(m => {
      const termo = normalizarTexto(buscaModalAdicionar);
      const matchesBusca = !termo ||
        normalizarTexto(m.titulo).includes(termo) ||
        normalizarTexto(m.artista || '').includes(termo) ||
        normalizarTexto(m.biblioteca || '').includes(termo) ||
        normalizarTexto(m.tom || '').includes(termo);

      // Quando o dirigente digita o nome de uma música, pesquisa em todo o acervo sem bloqueio de categoria
      if (termo) {
        return matchesBusca;
      }

      // 1. Momento correspondente ao botão clicado (ou selecionado na aba)
      const matchesCategoria = (!categoriaAdicionar || categoriaAdicionar === 'todos' || m.tipo === categoriaAdicionar);
      if (!matchesCategoria) return false;

      // 2. Pasta selecionada dentro do modal (Masculino, Feminino, Misto, Todas ou Custom)
      let matchesPasta = true;
      if (filtroBibliotecaAdicionar && filtroBibliotecaAdicionar !== 'todas') {
        const normFiltro = normalizarTexto(filtroBibliotecaAdicionar);
        if (normFiltro === 'masculino' || normFiltro.includes('masculin')) {
          matchesPasta = m.voz === 'Masculino' || normalizarTexto(m.biblioteca || '').includes('masculin');
        } else if (normFiltro === 'feminino' || normFiltro.includes('feminin')) {
          matchesPasta = m.voz === 'Feminino' || normalizarTexto(m.biblioteca || '').includes('feminin');
        } else if (normFiltro === 'misto') {
          matchesPasta = m.voz === 'Misto' || (!normalizarTexto(m.biblioteca || '').includes('masculin') && !normalizarTexto(m.biblioteca || '').includes('feminin'));
        } else {
          matchesPasta = pertenceABiblioteca(m, filtroBibliotecaAdicionar);
        }
      }

      return matchesBusca && matchesPasta;
    });
  }, [musicas, buscaModalAdicionar, categoriaAdicionar, filtroBibliotecaAdicionar, bibliotecas]);

  // Filtragem de Eventos
  const eventosFiltrados = useMemo(() => {
    return eventos.filter(e => {
      const termo = normalizarTexto(buscaEvento);
      const matchesBusca = !termo ||
        normalizarTexto(e.titulo).includes(termo) ||
        normalizarTexto(e.pregador || '').includes(termo) ||
        normalizarTexto(e.local || '').includes(termo);

      const temRep = Boolean(mapaRepertorios[String(e.id)]?.musicas?.length > 0);
      const matchesStatus =
        filtroStatusEvento === 'todos' ||
        (filtroStatusEvento === 'com_repertorio' && temRep) ||
        (filtroStatusEvento === 'sem_repertorio' && !temRep);

      let matchesMes = true;
      if (filtroMesEvento !== 'todos' && e.data_evento) {
        try {
          const d = new Date(e.data_evento);
          if (!isNaN(d.getTime())) {
            const anoMes = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            matchesMes = (anoMes === filtroMesEvento);
          }
        } catch (err) {
          matchesMes = true;
        }
      }

      return matchesBusca && matchesStatus && matchesMes;
    });
  }, [eventos, buscaEvento, filtroStatusEvento, filtroMesEvento, mapaRepertorios]);

  const abas = [
    {
      id: 'cultos',
      label: 'Cultos & Repertório',
      desc: 'Montar e planejar louvor por culto',
      icon: Calendar
    },
    {
      id: 'biblioteca',
      label: 'Biblioteca de Músicas',
      desc: 'Acervo e pastas por vocal',
      icon: ListMusic,
      badge: musicas.length
    },
    {
      id: 'estatisticas',
      label: 'Sugestões & IA',
      desc: 'Músicas mais e menos tocadas',
      icon: Sparkles
    }
  ];

  const abaAtual = abas.find(a => a.id === abaAtiva) || abas[0];
  const IconeAbaAtual = abaAtual.icon;

  function handleNavegarTab(novaAba) {
    setAbaAtiva(novaAba);
  }

  function isPastaMasculina(b) {
    if (!b) return false;
    const n = normalizarTexto(typeof b === 'string' ? b : b.nome || '');
    const v = normalizarTexto(typeof b === 'object' ? b.voz || '' : '');
    return n.includes('masculin') || v === 'masculino';
  }

  function isPastaFeminina(b) {
    if (!b) return false;
    const n = normalizarTexto(typeof b === 'string' ? b : b.nome || '');
    const v = normalizarTexto(typeof b === 'object' ? b.voz || '' : '');
    return n.includes('feminin') || v === 'feminino';
  }

  function getEstiloPasta(nomeBib, voz = null) {
    const n = normalizarTexto(nomeBib || '');
    const v = normalizarTexto(voz || '');
    const bibObj = bibliotecas.find(b => normalizarTexto(b.nome || '') === n);
    const vBib = normalizarTexto(bibObj?.voz || '');

    const isMasc = n.includes('masculin') || v === 'masculino' || vBib === 'masculino';
    const isFem = n.includes('feminin') || v === 'feminino' || vBib === 'feminino';

    if (isMasc) {
      return {
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/80',
        iconClass: 'text-blue-600',
        textClass: 'text-blue-700',
        subClass: 'text-blue-500',
        bgCard: 'bg-white hover:bg-blue-50/40 text-blue-900 border-blue-200/80 hover:border-blue-300',
        countClass: 'bg-blue-100 text-blue-700',
        iconBadgeClass: 'bg-blue-50 text-blue-600 border border-blue-200/60',
        icon: Folder
      };
    }

    if (isFem) {
      return {
        badgeClass: 'bg-pink-50 text-pink-700 border-pink-200/80',
        iconClass: 'text-pink-600',
        textClass: 'text-pink-700',
        subClass: 'text-pink-500',
        bgCard: 'bg-white hover:bg-pink-50/40 text-pink-900 border-pink-200/80 hover:border-pink-300',
        countClass: 'bg-pink-100 text-pink-700',
        iconBadgeClass: 'bg-pink-50 text-pink-600 border border-pink-200/60',
        icon: Folder
      };
    }

    return {
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      iconClass: 'text-slate-500',
      textClass: 'text-slate-800',
      subClass: 'text-slate-400',
      bgCard: 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 hover:border-slate-300',
      countClass: 'bg-slate-100 text-slate-700',
      iconBadgeClass: 'bg-slate-100 text-slate-600 border border-slate-200/60',
      icon: Folder
    };
  }

  function getIconeBiblioteca(b, ativo) {
    if (!b || b === 'todas') {
      return <Disc3 size={15} strokeWidth={2.5} className={ativo ? 'text-white' : 'text-indigo-600'} />;
    }

    const nome = normalizarTexto(b.nome || '');
    const tipo = normalizarTexto(b.tipo || '');
    const voz = normalizarTexto(b.voz || '');

    if (nome.includes('celebracao') || tipo === 'celebracao') {
      return <Flame size={15} strokeWidth={2.5} className={ativo ? 'text-white' : 'text-amber-500'} />;
    }
    if (nome.includes('adoracao') || tipo === 'adoracao') {
      return <HeartHandshake size={15} strokeWidth={2.5} className={ativo ? 'text-white' : 'text-purple-500'} />;
    }
    if (nome.includes('pos pregacao') || tipo === 'pos pregacao') {
      return <BookOpen size={15} strokeWidth={2.5} className={ativo ? 'text-white' : 'text-emerald-500'} />;
    }
    if (nome.includes('masculin') || voz === 'masculino') {
      return <Mic2 size={15} strokeWidth={2.5} className={ativo ? 'text-white' : 'text-blue-600'} />;
    }
    if (nome.includes('feminin') || voz === 'feminino') {
      return <Mic2 size={15} strokeWidth={2.5} className={ativo ? 'text-white' : 'text-pink-600'} />;
    }
    return <Folder size={15} strokeWidth={2.5} className={ativo ? 'text-white' : 'text-blue-500'} />;
  }

  function getSubtituloBiblioteca(b) {
    if (b.voz === 'Feminino') return 'Vocal Fem';
    if (b.voz === 'Masculino') return 'Vocal Masc';
    if (b.voz === 'Misto') return 'Vocal Misto';
    return b.tipo || 'Geral';
  }

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      {/* ── TOAST FLUTUANTE ── */}
      {toastNotificacao && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-300">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-xs sm:text-sm font-bold">{toastNotificacao}</span>
        </div>
      )}

      {/* ── HEADER DA APLICAÇÃO ── */}
      {!hideHeader && (
        <>
          {/* Card Branco de Título no Mobile (Mesma largura dos elementos da página) */}
          {/* Card Branco de Título no Mobile (Mesma largura dos elementos da página) */}
          <div className="md:hidden w-full mb-4 bg-white px-4 py-3.5 rounded-b-2xl sm:rounded-b-3xl rounded-t-none border border-t-0 border-slate-200/90 shadow-2xs flex items-center justify-between">
            <div className="w-8 shrink-0" />
            <h1 className="text-sm font-black uppercase tracking-wider text-slate-800 text-center truncate">
              Repertório de Louvor
            </h1>
            <div className="w-8 shrink-0 flex justify-end">
              {statusBanco && !statusBanco.conectado && (
                <button
                  type="button"
                  onClick={() => setModalSqlAberto(true)}
                  className="p-1 rounded-lg bg-amber-500/10 text-amber-700 text-[10px] font-bold border border-amber-300/60"
                  title="Configurar Banco"
                >
                  SQL
                </button>
              )}
            </div>
          </div>

          {/* Header Desktop */}
          <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div className="flex items-center gap-3.5">
              {onVoltar && (
                <button
                  type="button"
                  onClick={onVoltar}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 shadow-xs transition cursor-pointer shrink-0 active:scale-95"
                  title="Voltar"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
              )}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/25 shrink-0">
                <Music size={24} strokeWidth={2.5} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                    Repertório de Louvor
                  </h1>
                  {statusBanco && !statusBanco.conectado && (
                    <button
                      type="button"
                      onClick={() => setModalSqlAberto(true)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition cursor-pointer shadow-2xs active:scale-95"
                      title="Clique para ver o script SQL para criar as tabelas no Supabase"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      Salvar no Banco (Script SQL)
                    </button>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Planejamento musical dos cultos com biblioteca de músicas e sugestões inteligentes.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── NAVEGAÇÃO DE ABAS (MOBILE: 3 BOTÕES QUADRADOS COM ÍCONE ACIMA E NOME ABAIXO) ── */}
      <div className={`${hideSidebar ? 'flex' : 'flex lg:hidden'} flex-col gap-2.5 pb-3 border-b border-slate-150 w-full`}>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
          {abas.map((a) => {
            const Icon = a.icon;
            const ativo = abaAtiva === a.id;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => handleNavegarTab(a.id)}
                className={`relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl transition-all duration-200 cursor-pointer active:scale-95 group text-center min-h-[82px] sm:min-h-[92px] ${ativo
                  ? 'bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-800 text-white shadow-lg shadow-blue-700/25 border border-blue-400/40'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
              >
                {a.badge !== undefined && (
                  <span className={`absolute top-1.5 right-1.5 text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-2xs ${ativo ? 'bg-white text-blue-800' : 'bg-blue-100 text-blue-700'
                    }`}>
                    {a.badge}
                  </span>
                )}
                <span className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-1.5 transition-all ${ativo
                  ? 'bg-white/20 text-white shadow-inner'
                  : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                  }`}>
                  <Icon size={20} strokeWidth={ativo ? 2.5 : 2} />
                </span>
                <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-tight leading-tight line-clamp-2 ${ativo ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'
                  }`}>
                  {a.label}
                </span>
              </button>
            );
          })}
        </div>

        {statusBanco && !statusBanco.conectado && (
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setModalSqlAberto(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition cursor-pointer shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Configurar Banco
            </button>
          </div>
        )}
      </div>

      {/* ── ESTRUTURA PRINCIPAL ── */}
      <div className={`relative flex flex-col ${hideSidebar ? '' : 'lg:flex-row'} gap-4 lg:gap-5 items-start w-full min-w-0`}>
        {/* ── CONTEÚDO PRINCIPAL (OCUPA A ESQUERDA OU LARGURA TOTAL) ── */}
        <div className="flex-1 min-w-0 w-full animate-in fade-in duration-300">

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ── ABA 1: CULTOS & REPERTÓRIO ─────────────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {abaAtiva === 'cultos' && (
            <div className="space-y-3 w-full min-w-0">
              {/* Segmented Control no Mobile (< lg) para alternar entre lista de cultos e editor */}
              <div className="lg:hidden flex items-center p-1 bg-slate-200/80 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => setSubAbaMobileCultos('lista')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${subAbaMobileCultos === 'lista'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <Calendar size={14} />
                  <span>Cultos ({eventosFiltrados.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubAbaMobileCultos('editor')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${subAbaMobileCultos === 'editor'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <ListMusic size={14} />
                  <span>Editor {repertorioAtual.musicas.length > 0 ? `(${repertorioAtual.musicas.length})` : ''}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start w-full min-w-0">
                {/* COLUNA ESQUERDA: LISTA DE EVENTOS DAS ESCALAS (4 colunas) */}
                <div className={`${subAbaMobileCultos === 'lista' ? 'block' : 'hidden lg:block'} lg:col-span-4 xl:col-span-4 space-y-4 min-w-0 w-full`}>
                  <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <Calendar size={16} className="text-blue-600" />
                        Cultos Agendados
                      </h3>
                      <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {eventosFiltrados.length} {eventosFiltrados.length === 1 ? 'culto' : 'cultos'}
                      </span>
                    </div>

                    {/* Navegador e Filtro Mensal */}
                    <div className="bg-slate-50/90 rounded-2xl p-2.5 border border-slate-200/90 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <button
                          type="button"
                          onClick={() => navegarMes(-1)}
                          title="Mês anterior"
                          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-2xs transition active:scale-95 cursor-pointer"
                        >
                          <ChevronLeft size={15} />
                        </button>

                        <div className="flex-1 relative">
                          <select
                            value={filtroMesEvento}
                            onChange={(e) => setFiltroMesEvento(e.target.value)}
                            className="w-full text-center appearance-none bg-white font-black text-xs text-slate-800 py-1.5 px-3 rounded-lg border border-slate-200/80 shadow-2xs focus:border-blue-500 outline-none cursor-pointer pr-6"
                          >
                            <option value="todos">Todos os meses</option>
                            {mesesDisponiveis.map(m => (
                              <option key={m.anoMes} value={m.anoMes}>
                                {m.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                            <ChevronRight size={12} className="rotate-90" />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => navegarMes(1)}
                          title="Próximo mês"
                          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-2xs transition active:scale-95 cursor-pointer"
                        >
                          <ChevronRight size={15} />
                        </button>
                      </div>

                      {/* Atalhos Rápidos: Mês Atual vs Ver Todos */}
                      <div className="flex items-center justify-between gap-1 text-[10px] font-bold">
                        <button
                          type="button"
                          onClick={() => setFiltroMesEvento(mesAtualStr)}
                          className={`px-2 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${filtroMesEvento === mesAtualStr
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
                            }`}
                        >
                          <Calendar size={11} />
                          Mês Atual
                        </button>

                        <button
                          type="button"
                          onClick={() => setFiltroMesEvento(filtroMesEvento === 'todos' ? mesAtualStr : 'todos')}
                          className={`px-2 py-1 rounded-md transition cursor-pointer flex items-center gap-1 ${filtroMesEvento === 'todos'
                            ? 'bg-slate-800 text-white shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                          {filtroMesEvento === 'todos' && <Check size={11} strokeWidth={2.5} />}
                          <span>Todos os meses</span>
                        </button>
                      </div>
                    </div>

                    {/* Busca de eventos */}
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Filtrar culto, pregador..."
                        value={buscaEvento}
                        onChange={e => setBuscaEvento(e.target.value)}
                        className="w-full pl-8.5 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                      />
                    </div>

                    {/* Filtro de status */}
                    <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-wider text-center">
                      <button
                        type="button"
                        onClick={() => setFiltroStatusEvento('todos')}
                        className={`py-1.5 rounded-lg transition cursor-pointer ${filtroStatusEvento === 'todos' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        Todos
                      </button>
                      <button
                        type="button"
                        onClick={() => setFiltroStatusEvento('com_repertorio')}
                        className={`py-1.5 rounded-lg transition cursor-pointer ${filtroStatusEvento === 'com_repertorio' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        Prontos
                      </button>
                      <button
                        type="button"
                        onClick={() => setFiltroStatusEvento('sem_repertorio')}
                        className={`py-1.5 rounded-lg transition cursor-pointer ${filtroStatusEvento === 'sem_repertorio' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        Pendentes
                      </button>
                    </div>

                    {/* Lista de cards de eventos */}
                    <div className="space-y-2">
                      {eventosFiltrados.length === 0 ? (
                        <div className="py-8 px-3 text-center text-slate-400 text-xs bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 space-y-2">
                          <Calendar size={22} className="mx-auto text-slate-300" />
                          <p className="font-semibold text-slate-500">
                            Nenhum culto encontrado {filtroMesEvento !== 'todos' ? 'neste mês' : ''}.
                          </p>
                          {filtroMesEvento !== 'todos' && (
                            <button
                              type="button"
                              onClick={() => setFiltroMesEvento('todos')}
                              className="text-[11px] font-black text-blue-600 hover:text-blue-700 underline cursor-pointer"
                            >
                              Ver cultos de todos os meses
                            </button>
                          )}
                        </div>
                      ) : (
                        eventosFiltrados.map((ev) => {
                          const selecionado = String(ev.id) === String(eventoSelecionadoId);
                          const rep = mapaRepertorios[String(ev.id)];
                          const qtdMusicas = rep?.musicas?.length || 0;
                          const { dataFormatada, horaFormatada, diaSemana } = formatarDataHoraEvento(ev.data_evento);

                          return (
                            <div
                              key={ev.id}
                              onClick={() => {
                                selecionarEvento(ev.id);
                                setModalVisualizarCulto(ev);
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group active:scale-[0.99] ${selecionado
                                ? 'bg-blue-50/70 border-blue-400 shadow-sm ring-2 ring-blue-500/20'
                                : 'bg-white border-slate-200/70 hover:border-blue-200 hover:bg-slate-50/60'
                                }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                                    {diaSemana} · {dataFormatada} {horaFormatada !== '--:--' && `às ${horaFormatada}`}
                                  </p>
                                  <h4 className="font-black text-slate-800 text-xs mt-0.5 line-clamp-1">
                                    {ev.titulo}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {qtdMusicas > 0 ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          enviarWhatsAppCulto(ev, rep);
                                        }}
                                        title="Enviar repertório diretamente para o WhatsApp"
                                        className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 transition active:scale-90 cursor-pointer shadow-2xs"
                                      >
                                        <IconWhatsApp size={12} />
                                      </button>
                                      <span className="shrink-0 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <CheckCircle2 size={11} /> {qtdMusicas}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="shrink-0 bg-amber-50 text-amber-700 border border-amber-200/80 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                      Pendente
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                                <span className="truncate flex items-center gap-1.5">
                                  {ev.pregador ? (
                                    <>
                                      <BookOpen size={11} className="shrink-0 text-slate-400" />
                                      <span className="truncate">{ev.pregador}</span>
                                    </>
                                  ) : (
                                    <>
                                      <MapPin size={11} className="shrink-0 text-slate-400" />
                                      <span className="truncate">{ev.local || 'Templo Sede'}</span>
                                    </>
                                  )}
                                </span>
                                <span className="text-[10px] font-bold text-blue-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
                                  Ver repertório
                                  <ChevronRight size={12} />
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* COLUNA DIREITA: MONTAGEM DO REPERTÓRIO (8 colunas) */}
                <div className={`${subAbaMobileCultos === 'editor' ? 'block' : 'hidden lg:block'} lg:col-span-8 xl:col-span-8 space-y-4 min-w-0 w-full`}>
                  {/* Banner no Mobile para voltar para a lista de cultos */}
                  <div className="lg:hidden flex items-center justify-between p-2.5 bg-blue-50/90 border border-blue-200 rounded-2xl shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setSubAbaMobileCultos('lista')}
                      className="text-xs font-black text-blue-700 flex items-center gap-1.5 active:scale-95 transition cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                      <span>Voltar para Lista de Cultos</span>
                    </button>
                    {eventoAtualObj && (
                      <button
                        type="button"
                        onClick={() => setModalVisualizarCulto(eventoAtualObj)}
                        className="text-[10px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-xl border border-emerald-300 flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
                        title="Ver prévia e enviar no WhatsApp"
                      >
                        <IconWhatsApp size={12} />
                        <span>Ver / WhatsApp</span>
                      </button>
                    )}
                  </div>

                  {!eventoAtualObj ? (
                    <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm">
                      <Music size={40} className="mx-auto text-slate-300 mb-3" />
                      <h3 className="text-base font-black text-slate-700">Selecione um culto ao lado</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        Escolha um evento na lista de escalas para montar, salvar e compartilhar o repertório de louvor.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-sm space-y-4 min-w-0">
                      {/* Cabeçalho do Culto Selecionado */}
                      <div className="pb-3.5 border-b border-slate-100 space-y-2.5 min-w-0">
                        {/* Linha 1: Nome do Evento alinhado aos Botões de Ação */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
                          <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight break-words min-w-0 flex-1">
                            {eventoAtualObj.titulo}
                          </h2>

                          {/* Ações Rápidas do Topo */}
                          <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                            <button
                              type="button"
                              onClick={handleGerarSugestaoInteligente}
                              title="Gerar sugestão automática de músicas equilibradas"
                              className="px-2.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-[11px] font-black uppercase tracking-wider shadow-xs transition active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
                            >
                              <Sparkles size={13} />
                              <span>Sugestão Automática</span>
                            </button>

                            <button
                              type="button"
                              onClick={enviarParaWhatsApp}
                              title="Enviar repertório para o WhatsApp"
                              className="p-1.5 border border-emerald-300 text-emerald-600 hover:bg-emerald-50 rounded-xl transition cursor-pointer shrink-0"
                            >
                              <IconWhatsApp size={15} />
                            </button>

                            <button
                              type="button"
                              onClick={imprimirRepertorio}
                              title="Imprimir repertório"
                              className="p-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition cursor-pointer shrink-0"
                            >
                              <Printer size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Linha 2: Informações de calendário (dia, data, hora, local) na linha abaixo com largura total sem cortes */}
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg shadow-2xs">
                            <Calendar size={12} className="text-blue-600 shrink-0" />
                            <span className="font-black text-blue-700 uppercase tracking-wide">
                              {formatarDataHoraEvento(eventoAtualObj.data_evento).diaSemana}, {formatarDataHoraEvento(eventoAtualObj.data_evento).dataFormatada}
                              {formatarDataHoraEvento(eventoAtualObj.data_evento).horaFormatada !== '--:--' && ` às ${formatarDataHoraEvento(eventoAtualObj.data_evento).horaFormatada}`}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-600 font-medium flex items-center gap-1">
                              <MapPin size={11} className="text-slate-400" />
                              <span>{eventoAtualObj.local || 'Templo Sede'}</span>
                            </span>
                          </div>

                          {eventoAtualObj.pregador && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-lg font-medium">
                              <BookOpen size={11} className="text-slate-400" />
                              <span>Palavra:</span>
                              <strong className="text-slate-700 font-bold">{eventoAtualObj.pregador}</strong>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Tema e Observações Gerais do Culto */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/70">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                            Tema do Culto / Mensagem (Opcional)
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Família, Fé e Milagres, Santidade..."
                            value={repertorioAtual.tema_culto}
                            onChange={e => setRepertorioAtual(prev => ({ ...prev, tema_culto: e.target.value }))}
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                            Observação Geral da Equipe (Opcional)
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Ensaio 30 min antes, traje preto e branco..."
                            value={repertorioAtual.observacoes_gerais}
                            onChange={e => setRepertorioAtual(prev => ({ ...prev, observacoes_gerais: e.target.value }))}
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                          />
                        </div>
                      </div>

                      {/* ── BARRA DE ADICIONAR MÚSICAS POR MOMENTO DO CULTO ── */}
                      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-5 rounded-2xl border border-indigo-900/60 shadow-lg text-white space-y-3.5">
                        {/* Descrição movida para cima */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-indigo-900/40 pb-2.5">
                          <div>
                            <h4 className="text-xs sm:text-sm font-black tracking-wide flex items-center gap-2 text-white">
                              <Music size={16} className="text-indigo-400" />
                              <span>Adicionar Músicas por Tipo</span>
                            </h4>
                            <p className="text-[11px] text-indigo-200/80 mt-0.5">
                              Escolha o momento litúrgico para abrir o culto ou dar continuidade à ordem do louvor:
                            </p>
                          </div>
                          <span className="text-[10px] text-indigo-300/70 font-semibold uppercase tracking-wider self-start sm:self-auto">
                          </span>
                        </div>

                        {/* Botões quadrados com SVG profissional acima e nome abaixo */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
                          {/* Botão Adoração */}
                          <button
                            type="button"
                            onClick={() => abrirModalAdicionarPorTipo('Adoração')}
                            className="group p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-blue-600/30 to-blue-900/40 hover:from-blue-600/50 hover:to-blue-800/60 border border-blue-500/40 hover:border-blue-400 text-white transition-all duration-200 cursor-pointer active:scale-95 flex flex-col items-center justify-center text-center gap-2 sm:gap-2.5 shadow-sm aspect-square"
                            title="Abrir modal para escolher música de Adoração"
                          >
                            <div className="w-11 h-11 rounded-2xl bg-blue-500/20 group-hover:bg-blue-500 text-blue-300 group-hover:text-white flex items-center justify-center border border-blue-400/30 group-hover:border-blue-300 shadow-inner transition-all duration-200">
                              <HeartHandshake size={24} strokeWidth={2.2} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider block text-white group-hover:text-blue-100">
                                + Adoração
                              </span>
                              <span className="text-[9.5px] sm:text-[10px] text-blue-200/70 font-medium block leading-tight mt-0.5 truncate">
                                Intimidade & Louvor
                              </span>
                            </div>
                          </button>

                          {/* Botão Celebração */}
                          <button
                            type="button"
                            onClick={() => abrirModalAdicionarPorTipo('Celebração')}
                            className="group p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-amber-600/30 to-amber-900/40 hover:from-amber-600/50 hover:to-amber-800/60 border border-amber-500/40 hover:border-amber-400 text-white transition-all duration-200 cursor-pointer active:scale-95 flex flex-col items-center justify-center text-center gap-2 sm:gap-2.5 shadow-sm aspect-square"
                            title="Abrir modal para escolher música de Celebração"
                          >
                            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 group-hover:bg-amber-500 text-amber-300 group-hover:text-slate-950 flex items-center justify-center border border-amber-400/30 group-hover:border-amber-300 shadow-inner transition-all duration-200">
                              <Flame size={24} strokeWidth={2.2} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider block text-white group-hover:text-amber-100">
                                + Celebração
                              </span>
                              <span className="text-[9.5px] sm:text-[10px] text-amber-200/70 font-medium block leading-tight mt-0.5 truncate">
                                Júbilo & Abertura
                              </span>
                            </div>
                          </button>

                          {/* Botão Pós Pregação */}
                          <button
                            type="button"
                            onClick={() => abrirModalAdicionarPorTipo('Pós pregação')}
                            className="group p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-purple-600/30 to-purple-900/40 hover:from-purple-600/50 hover:to-purple-800/60 border border-purple-500/40 hover:border-purple-400 text-white transition-all duration-200 cursor-pointer active:scale-95 flex flex-col items-center justify-center text-center gap-2 sm:gap-2.5 shadow-sm aspect-square"
                            title="Abrir modal para escolher música de Pós pregação"
                          >
                            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 group-hover:bg-purple-500 text-purple-300 group-hover:text-white flex items-center justify-center border border-purple-400/30 group-hover:border-purple-300 shadow-inner transition-all duration-200">
                              <BookOpen size={24} strokeWidth={2.2} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider block text-white group-hover:text-purple-100">
                                + Pós Pregação
                              </span>
                              <span className="text-[9.5px] sm:text-[10px] text-purple-200/70 font-medium block leading-tight mt-0.5 truncate">
                                Ministração & Apelo
                              </span>
                            </div>
                          </button>

                          {/* Botão Todas as Músicas */}
                          <button
                            type="button"
                            onClick={() => abrirModalAdicionarPorTipo('todos')}
                            className="group p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/60 hover:from-slate-700/60 hover:to-slate-800/70 border border-slate-700/60 hover:border-slate-500 text-white transition-all duration-200 cursor-pointer active:scale-95 flex flex-col items-center justify-center text-center gap-2 sm:gap-2.5 shadow-sm aspect-square"
                            title="Ver todas as músicas da biblioteca"
                          >
                            <div className="w-11 h-11 rounded-2xl bg-slate-700/40 group-hover:bg-slate-600 text-slate-300 group-hover:text-white flex items-center justify-center border border-slate-600/40 group-hover:border-slate-400 shadow-inner transition-all duration-200">
                              <Disc3 size={24} strokeWidth={2.2} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider block text-white group-hover:text-slate-100">
                                Todas
                              </span>
                              <span className="text-[9.5px] sm:text-[10px] text-slate-400 font-medium block leading-tight mt-0.5 truncate">
                                Acervo Completo
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Alternador de Modo de Visualização do Repertório e Contador */}
                      <div className="flex items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <ListMusic size={14} className="text-blue-600" />
                            Ordem das Músicas ({repertorioAtual.musicas.length})
                          </span>
                          {repertorioAtual.musicas.length > 0 && (
                            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                              (Mova as músicas para montar o fluxo litúrgico exato)
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
                          <button
                            type="button"
                            onClick={() => setModoVisualizacaoRepertorio('sequencia')}
                            className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${modoVisualizacaoRepertorio === 'sequencia'
                              ? 'bg-white text-slate-900 shadow-2xs font-black'
                              : 'text-slate-500 hover:text-slate-800'
                              }`}
                            title="Exibir em ordem sequencial do culto (1º, 2º, 3º...)"
                          >
                            <List size={13} />
                            <span>Sequência do Culto</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setModoVisualizacaoRepertorio('blocos')}
                            className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${modoVisualizacaoRepertorio === 'blocos'
                              ? 'bg-white text-slate-900 shadow-2xs font-black'
                              : 'text-slate-500 hover:text-slate-800'
                              }`}
                            title="Exibir agrupado por momentos litúrgicos"
                          >
                            <LayoutGrid size={13} />
                            <span>Por Blocos</span>
                          </button>
                        </div>
                      </div>

                      {/* ── MODO 1: SEQUÊNCIA CRONOLÓGICA DO CULTO (SETLIST #1, #2, #3...) ── */}
                      {modoVisualizacaoRepertorio === 'sequencia' ? (
                        repertorioAtual.musicas.length === 0 ? (
                          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 sm:p-10 bg-slate-50/50 text-center space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
                              <Music size={24} />
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-slate-800">
                                Nenhuma música no repertório ainda
                              </h4>
                              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                                Por qual momento você deseja abrir este culto? Escolha uma das opções abaixo para abrir a biblioteca e selecionar a primeira música:
                              </p>
                            </div>

                            <div className="flex items-center justify-center gap-2.5 flex-wrap pt-1">
                              <button
                                type="button"
                                onClick={() => abrirModalAdicionarPorTipo('Adoração')}
                                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-2"
                              >
                                <HeartHandshake size={15} strokeWidth={2.2} />
                                <span>Abrir com Adoração</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => abrirModalAdicionarPorTipo('Celebração')}
                                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-2"
                              >
                                <Flame size={15} strokeWidth={2.2} />
                                <span>Abrir com Celebração</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => abrirModalAdicionarPorTipo('Pós pregação')}
                                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-2"
                              >
                                <BookOpen size={15} strokeWidth={2.2} />
                                <span>Pós Pregação</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2.5">
                            {repertorioAtual.musicas.map((item, globalIndex) => {
                              const tipoBadge =
                                item.tipo === 'Celebração'
                                  ? { bg: 'bg-amber-50 text-amber-800 border-amber-200' }
                                  : item.tipo === 'Pós pregação'
                                    ? { bg: 'bg-purple-50 text-purple-800 border-purple-200' }
                                    : { bg: 'bg-blue-50 text-blue-800 border-blue-200' };

                              return (
                                <div
                                  key={globalIndex}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-3.5 bg-white hover:bg-slate-50/80 border border-slate-200/80 rounded-2xl transition shadow-2xs group"
                                >
                                  <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <span className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-2xs">
                                      {item.ordem}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-xs font-black text-slate-800 truncate">
                                          {item.titulo}
                                        </p>
                                        {/* Seletor de Tipo / Momento na música */}
                                        <select
                                          value={item.tipo}
                                          onChange={e => atualizarTipoMusicaRepertorio(globalIndex, e.target.value)}
                                          className={`text-[10px] font-black px-2 py-0.5 rounded-lg border outline-none cursor-pointer ${tipoBadge.bg}`}
                                          title="Alterar o momento desta música no culto"
                                        >
                                          <option value="Adoração">Adoração</option>
                                          <option value="Celebração">Celebração</option>
                                          <option value="Pós pregação">Pós pregação</option>
                                        </select>
                                      </div>
                                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                        {item.artista || 'Geral'}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
                                    {/* Seletor de Tom do Culto */}
                                    <div className="flex items-center gap-1 shrink-0">
                                      <span className="text-[10px] font-black text-slate-400 uppercase">Tom:</span>
                                      <select
                                        value={item.tom || 'G'}
                                        onChange={e => atualizarTomMusicaRepertorio(globalIndex, e.target.value)}
                                        className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-blue-700 outline-none cursor-pointer"
                                      >
                                        {TONS_DISPONIVEIS.map(t => (
                                          <option key={t} value={t}>{t}</option>
                                        ))}
                                      </select>
                                    </div>

                                    {/* Nota rápida */}
                                    <input
                                      type="text"
                                      placeholder="Obs (ex: violão)..."
                                      value={item.observacao || ''}
                                      onChange={e => atualizarObsMusicaRepertorio(globalIndex, e.target.value)}
                                      className="w-24 sm:w-28 md:w-32 text-[10px] px-2 py-1 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                                    />

                                    {/* Reordenação */}
                                    <div className="flex items-center gap-0.5 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => moverMusicaRepertorio(globalIndex, -1)}
                                        disabled={globalIndex === 0}
                                        title="Subir na ordem do culto"
                                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                                      >
                                        <ArrowUp size={14} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => moverMusicaRepertorio(globalIndex, 1)}
                                        disabled={globalIndex === repertorioAtual.musicas.length - 1}
                                        title="Descer na ordem do culto"
                                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                                      >
                                        <ArrowDown size={14} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => removerMusicaDoRepertorio(globalIndex)}
                                        title="Remover do repertório"
                                        className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            {/* Botões rápidos ao final da lista para adicionar a próxima */}
                            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-[11px] font-bold text-slate-500">
                                + Adicionar próxima música à sequência:
                              </span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <button
                                  type="button"
                                  onClick={() => abrirModalAdicionarPorTipo('Adoração')}
                                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-[10px] font-black uppercase tracking-wider transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                                >
                                  <HeartHandshake size={13} strokeWidth={2.2} />
                                  <span>+ Adoração</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => abrirModalAdicionarPorTipo('Celebração')}
                                  className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-[10px] font-black uppercase tracking-wider transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                                >
                                  <Flame size={13} strokeWidth={2.2} />
                                  <span>+ Celebração</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => abrirModalAdicionarPorTipo('Pós pregação')}
                                  className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-[10px] font-black uppercase tracking-wider transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                                >
                                  <BookOpen size={13} strokeWidth={2.2} />
                                  <span>+ Pós Pregação</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        /* ── MODO 2: AGRUPADO POR BLOCOS LITÚRGICOS ── */
                        <div className="space-y-4">
                          {[
                            { tipo: 'Celebração', Icon: Flame, cor: 'amber', iconColor: 'text-amber-500', desc: 'Louvor festivo e celebração congregacional' },
                            { tipo: 'Adoração', Icon: HeartHandshake, cor: 'blue', iconColor: 'text-blue-500', desc: 'Comunhão, quebrantamento e intimidade' },
                            { tipo: 'Pós pregação', Icon: BookOpen, cor: 'purple', iconColor: 'text-purple-500', desc: 'Ministração da palavra, apelo e encerramento' }
                          ].map(bloco => {
                            const musicasDoBloco = repertorioAtual.musicas.filter(m => m.tipo === bloco.tipo);

                            return (
                              <div key={bloco.tipo} className="border border-slate-200/80 rounded-2xl p-4 bg-white shadow-2xs space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                                      <bloco.Icon size={16} className={bloco.iconColor} strokeWidth={2.2} />
                                    </div>
                                    <div>
                                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                        {bloco.tipo}
                                      </h4>
                                      <p className="text-[10px] text-slate-400">{bloco.desc}</p>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => abrirModalAdicionarPorTipo(bloco.tipo)}
                                    title={`Adicionar música em ${bloco.tipo}`}
                                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-600 border border-slate-200/90 hover:border-blue-300 rounded-lg text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
                                  >
                                    <Plus size={11} strokeWidth={2.5} />
                                    <span>Adicionar</span>
                                  </button>
                                </div>

                                {musicasDoBloco.length === 0 ? (
                                  <div className="py-4 text-center border-2 border-dashed border-slate-100 rounded-xl text-xs text-slate-400 italic">
                                    Nenhuma música de {bloco.tipo} selecionada para este culto.
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    {musicasDoBloco.map((item) => {
                                      const globalIndex = repertorioAtual.musicas.findIndex(m => m === item);

                                      return (
                                        <div
                                          key={globalIndex}
                                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50/80 hover:bg-slate-50 border border-slate-200/70 rounded-xl transition"
                                        >
                                          <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black shrink-0">
                                              {item.ordem}
                                            </span>
                                            <div className="min-w-0">
                                              <p className="text-xs font-black text-slate-800 truncate">
                                                {item.titulo}
                                              </p>
                                              <p className="text-[10px] text-slate-500 truncate">
                                                {item.artista || 'Geral'}
                                              </p>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
                                            {/* Seletor de Tom do Culto */}
                                            <div className="flex items-center gap-1 shrink-0">
                                              <span className="text-[10px] font-black text-slate-400 uppercase">Tom:</span>
                                              <select
                                                value={item.tom || 'G'}
                                                onChange={e => atualizarTomMusicaRepertorio(globalIndex, e.target.value)}
                                                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-blue-700 outline-none cursor-pointer"
                                              >
                                                {TONS_DISPONIVEIS.map(t => (
                                                  <option key={t} value={t}>{t}</option>
                                                ))}
                                              </select>
                                            </div>

                                            {/* Nota rápida otimizada */}
                                            <input
                                              type="text"
                                              placeholder="Obs (ex: violão)..."
                                              value={item.observacao || ''}
                                              onChange={e => atualizarObsMusicaRepertorio(globalIndex, e.target.value)}
                                              className="w-24 sm:w-28 md:w-32 text-[10px] px-2 py-1 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                                            />

                                            {/* Reordenação */}
                                            <div className="flex items-center gap-0.5">
                                              <button
                                                type="button"
                                                onClick={() => moverMusicaRepertorio(globalIndex, -1)}
                                                disabled={globalIndex === 0}
                                                title="Subir ordem"
                                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                                              >
                                                <ArrowUp size={14} />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => moverMusicaRepertorio(globalIndex, 1)}
                                                disabled={globalIndex === repertorioAtual.musicas.length - 1}
                                                title="Descer ordem"
                                                className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                                              >
                                                <ArrowDown size={14} />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => removerMusicaDoRepertorio(globalIndex)}
                                                title="Remover do repertório"
                                                className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer ml-1"
                                              >
                                                <Trash2 size={14} />
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Botão de Salvar no Rodapé */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-500">
                          Total: <strong className="text-slate-800">{repertorioAtual.musicas.length} músicas</strong> no repertório
                        </span>

                        <button
                          type="button"
                          onClick={salvarRepertorio}
                          disabled={salvandoRepertorio}
                          className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-700/25 transition active:scale-95 cursor-pointer disabled:opacity-50"
                        >
                          {salvandoRepertorio ? 'Salvando...' : 'Salvar Repertório'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ── ABA 2: BIBLIOTECA DE MÚSICAS ───────────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {abaAtiva === 'biblioteca' && (
            <div className="space-y-5">
              {/* Barra de Ações da Biblioteca */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Barra de Busca */}
                  <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar por título ou artista..."
                      value={buscaBiblioteca}
                      onChange={e => setBuscaBiblioteca(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  {/* Botões de Ação */}
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                    {musicas.length === 0 && (
                      <button
                        type="button"
                        onClick={handleCarregarSeed}
                        className="col-span-2 sm:col-span-1 px-3 py-2.5 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
                      >
                        <Sparkles size={14} />
                        <span>Carregar Populares</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setModalImportarAberto(true)}
                      className="px-2.5 sm:px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
                    >
                      <FileSpreadsheet size={15} />
                      <span>Importar XLS / CSV</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => abrirModalNovaMusica('Adoração')}
                      className="px-2.5 sm:px-4 py-2.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-blue-700/20 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
                    >
                      <Plus size={15} strokeWidth={2.5} />
                      <span>Nova Música</span>
                    </button>
                  </div>
                </div>

                {/* SELETOR DE PASTAS / BIBLIOTECAS EM CARDS (SEM BARRA DESLIZANTE) */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                      <Folder size={13} className="text-blue-500" /> Pastas & Bibliotecas Temáticas:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setBibliotecaEmEdicao(null);
                        setFormBiblioteca({ nome: '', descricao: '', cor: '#ec4899', tipo: 'Geral', voz: 'Feminino' });
                        setModalBibliotecaAberto(true);
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition"
                    >
                      <Plus size={13} strokeWidth={2.5} />
                      <span>Nova Pasta</span>
                    </button>
                  </div>

                  {/* Grid Responsivo de Cards de Pastas com Ícones Específicos e Fonte Menor */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
                    {/* Card: Todas as Pastas */}
                    <button
                      type="button"
                      onClick={() => setBibliotecaSelecionada('todas')}
                      className={`p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-95 flex flex-col justify-between gap-2 ${bibliotecaSelecionada === 'todas'
                        ? 'bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 text-white border-blue-600 shadow-md shadow-blue-700/25 ring-2 ring-blue-400/40'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 hover:border-slate-300 shadow-2xs'
                        }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${bibliotecaSelecionada === 'todas'
                            ? 'bg-white/20 text-white shadow-inner'
                            : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                            }`}
                        >
                          <Disc3 size={15} strokeWidth={2.5} />
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${bibliotecaSelecionada === 'todas' ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                          {musicas.length}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`text-[11px] font-black leading-tight truncate ${bibliotecaSelecionada === 'todas' ? 'text-white' : 'text-slate-800'
                            }`}
                        >
                          Todas as Pastas
                        </p>
                        <p
                          className={`text-[9px] leading-tight mt-0.5 font-medium truncate ${bibliotecaSelecionada === 'todas' ? 'text-blue-100' : 'text-slate-400'
                            }`}
                        >
                          Acervo Geral
                        </p>
                      </div>
                    </button>

                    {/* Cards das Bibliotecas Cadastradas */}
                    {bibliotecas.map(b => {
                      const count = musicas.filter(m => normalizarTexto(m.biblioteca || '') === normalizarTexto(b.nome)).length;
                      const ativa = bibliotecaSelecionada === b.nome;
                      const iconEl = getIconeBiblioteca(b, ativa);
                      const sub = getSubtituloBiblioteca(b);
                      const estilo = getEstiloPasta(b.nome, b.voz);

                      return (
                        <button
                          key={b.id || b.nome}
                          type="button"
                          onClick={() => setBibliotecaSelecionada(b.nome)}
                          className={`p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-95 flex flex-col justify-between gap-2 ${ativa
                            ? 'bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 text-white border-blue-600 shadow-md shadow-blue-700/25 ring-2 ring-blue-400/40'
                            : `${estilo.bgCard} shadow-2xs`
                            }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${ativa
                                ? 'bg-white/20 text-white shadow-inner'
                                : estilo.iconBadgeClass
                                }`}
                              style={!ativa && !isPastaMasculina(b) && !isPastaFeminina(b) && b.cor ? { borderColor: `${b.cor}40`, backgroundColor: `${b.cor}15` } : {}}
                            >
                              {iconEl}
                            </span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${ativa ? 'bg-white/25 text-white' : estilo.countClass
                                }`}
                            >
                              {count}
                            </span>
                          </div>

                          <div className="min-w-0">
                            <p
                              className={`text-[11px] font-black leading-tight truncate ${ativa ? 'text-white' : estilo.textClass
                                }`}
                              title={b.nome}
                            >
                              {b.nome}
                            </p>
                            <p
                              className={`text-[9px] leading-tight mt-0.5 font-medium truncate ${ativa ? 'text-blue-100' : estilo.subClass
                                }`}
                            >
                              {sub}
                            </p>
                          </div>
                        </button>
                      );
                    })}

                    {/* Card de Ação: + Nova Pasta */}
                    <button
                      type="button"
                      onClick={() => {
                        setBibliotecaEmEdicao(null);
                        setFormBiblioteca({ nome: '', descricao: '', cor: '#ec4899', tipo: 'Geral', voz: 'Feminino' });
                        setModalBibliotecaAberto(true);
                      }}
                      className="p-2.5 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 text-left transition-all duration-200 cursor-pointer active:scale-95 flex flex-col justify-between gap-2 group"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-blue-100 text-slate-400 group-hover:text-blue-600 flex items-center justify-center transition">
                          <Plus size={15} strokeWidth={2.5} />
                        </span>
                        <span className="text-[10px] text-slate-300 font-bold group-hover:text-blue-500">+</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black leading-tight text-slate-600 group-hover:text-blue-700 truncate">
                          Nova Pasta
                        </p>
                        <p className="text-[9px] leading-tight mt-0.5 font-medium text-slate-400 truncate">
                          Criar biblioteca
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Banner da Pasta Ativa quando uma biblioteca está selecionada */}
                  {bibliotecaSelecionada !== 'todas' && (() => {
                    const bibAtiva = bibliotecas.find(b => b.nome === bibliotecaSelecionada);
                    const isMasc = isPastaMasculina(bibAtiva);
                    const isFem = isPastaFeminina(bibAtiva);
                    const bannerClasses = isMasc
                      ? 'bg-gradient-to-r from-blue-50/90 to-sky-50/60 border-blue-200/80'
                      : isFem
                        ? 'bg-gradient-to-r from-pink-50/90 to-rose-50/60 border-pink-200/80'
                        : 'bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border-blue-200/60';
                    const titleClasses = isMasc ? 'text-blue-900' : isFem ? 'text-pink-900' : 'text-slate-800';
                    const dotColor = isMasc ? '#2563eb' : isFem ? '#ec4899' : (bibAtiva?.cor || '#3b82f6');
                    return (
                      <div className={`flex items-center justify-between p-3 border rounded-2xl animate-in fade-in ${bannerClasses}`}>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: dotColor }} />
                          <div className="min-w-0">
                            <h4 className={`text-xs font-black truncate ${titleClasses}`}>
                              Pasta: {bibliotecaSelecionada}
                            </h4>
                            <p className="text-[10px] text-slate-500 truncate">
                              {bibAtiva?.descricao || 'Músicas organizadas nesta pasta'} · {bibAtiva?.voz ? `Classificação: Vocal ${bibAtiva.voz}` : ''}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {bibAtiva && (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setBibliotecaEmEdicao(bibAtiva);
                                  setFormBiblioteca({
                                    nome: bibAtiva.nome,
                                    descricao: bibAtiva.descricao || '',
                                    cor: bibAtiva.cor || '#ec4899',
                                    tipo: bibAtiva.tipo || 'Geral',
                                    voz: bibAtiva.voz || 'Feminino'
                                  });
                                  setModalBibliotecaAberto(true);
                                }}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/80 transition"
                                title="Editar pasta"
                              >
                                <Pencil size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={() => excluirBibliotecaItem(bibAtiva)}
                                className="p-1 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-50 transition"
                                title="Excluir pasta"
                              >
                                <Trash2 size={12} />
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            onClick={() => abrirModalNovaMusica(bibAtiva?.tipo || 'Adoração', bibliotecaSelecionada)}
                            className="ml-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition"
                          >
                            + Adicionar nesta Pasta
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Barra de Contagem e Seletor de Modo (Cards / Lista) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="text-[11px] font-bold text-slate-600">
                      {musicasFiltradas.length} {musicasFiltradas.length === 1 ? 'música' : 'músicas'}
                      {bibliotecaSelecionada !== 'todas' ? ` na pasta "${bibliotecaSelecionada}"` : ' no acervo total'}
                    </span>
                  </div>

                  {/* Botões de Alternância Cards / Lista e Seleção Múltipla */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={toggleSelecionarTodasVisiveis}
                      title={todasVisiveisSelecionadas ? "Desmarcar todas as músicas" : "Selecionar todas as músicas visíveis"}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer active:scale-95 shadow-2xs ${todasVisiveisSelecionadas
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-black'
                        : musicasSelecionadas.length > 0
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-black'
                          : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200/90'
                        }`}
                    >
                      <Check size={14} strokeWidth={2.5} className={musicasSelecionadas.length > 0 ? 'text-indigo-600' : 'text-slate-400'} />
                      <span>{todasVisiveisSelecionadas ? 'Desmarcar' : 'Selecionar'}</span>
                      {musicasSelecionadas.length > 0 && (
                        <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-black bg-indigo-600 text-white">
                          {musicasSelecionadas.length}
                        </span>
                      )}
                    </button>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                      <button
                        type="button"
                        onClick={() => trocarModoVisualizacao('cards')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 ${modoVisualizacao === 'cards'
                          ? 'bg-white text-slate-900 shadow-2xs font-black'
                          : 'text-slate-500 hover:text-slate-800'
                          }`}
                        title="Visualizar em formato de Cards"
                      >
                        <LayoutGrid size={14} />
                        <span>Cards</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => trocarModoVisualizacao('lista')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 ${modoVisualizacao === 'lista'
                          ? 'bg-white text-slate-900 shadow-2xs font-black'
                          : 'text-slate-500 hover:text-slate-800'
                          }`}
                        title="Visualizar em formato de Lista"
                      >
                        <List size={14} />
                        <span>Lista</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* BARRA FLUTUANTE DE AÇÕES EM LOTE (QUANDO HÁ MÚSICAS SELECIONADAS) */}
              {musicasSelecionadas.length > 0 && (
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/60 rounded-2xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 shadow-xl shadow-slate-900/20 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-black text-xs shadow-md shadow-indigo-500/30 shrink-0">
                      {musicasSelecionadas.length}
                    </span>
                    <div>
                      <p className="text-xs font-black text-white">
                        {musicasSelecionadas.length === 1
                          ? '1 música selecionada'
                          : `${musicasSelecionadas.length} músicas selecionadas`}
                      </p>
                      <p className="text-[10px] text-indigo-200/80 font-medium">
                        Ações em lote: transferir entre pastas ou excluir da biblioteca
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={toggleSelecionarTodasVisiveis}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition cursor-pointer active:scale-95"
                    >
                      {todasVisiveisSelecionadas ? 'Desmarcar Todas' : `Selecionar Visíveis (${musicasFiltradas.length})`}
                    </button>

                    <button
                      type="button"
                      onClick={abrirModalTransferir}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-600/30 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                      title="Mover músicas selecionadas para outra pasta da biblioteca"
                    >
                      <FolderSymlink size={14} />
                      <span>Transferir Pasta ({musicasSelecionadas.length})</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExcluirSelecionadas}
                      className="px-3 py-1.5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-rose-600/20 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                      title="Excluir músicas selecionadas da biblioteca"
                    >
                      <Trash2 size={13} />
                      <span>Excluir</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMusicasSelecionadas([])}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer ml-1"
                      title="Cancelar seleção"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Músicas da Biblioteca: Vazio / Cards / Lista */}
              {musicasFiltradas.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm space-y-3">
                  <Music size={40} className="mx-auto text-slate-300" />
                  <h3 className="text-base font-black text-slate-700">Nenhuma música encontrada</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {bibliotecaSelecionada !== 'todas'
                      ? `Nenhuma música encontrada na pasta "${bibliotecaSelecionada}".`
                      : 'Cadastre suas músicas ou importe uma planilha com seus títulos e artistas.'}
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => abrirModalNovaMusica('Adoração', bibliotecaSelecionada !== 'todas' ? bibliotecaSelecionada : null)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-700 transition cursor-pointer"
                    >
                      + Cadastrar Nova Música
                    </button>
                    {musicas.length === 0 && (
                      <button
                        type="button"
                        onClick={handleCarregarSeed}
                        className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-purple-100 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles size={14} className="text-purple-600" />
                        <span>Carregar 25 Músicas Populares</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : modoVisualizacao === 'cards' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {musicasFiltradas.map(m => {
                    const tipoBadge =
                      m.tipo === 'Celebração'
                        ? { bg: 'bg-amber-50 text-amber-800 border-amber-200', Icon: Flame, iconColor: 'text-amber-600' }
                        : m.tipo === 'Pós pregação'
                          ? { bg: 'bg-purple-50 text-purple-800 border-purple-200', Icon: BookOpen, iconColor: 'text-purple-600' }
                          : { bg: 'bg-blue-50 text-blue-800 border-blue-200', Icon: HeartHandshake, iconColor: 'text-blue-600' };

                    const selecionada = musicasSelecionadas.includes(m.id);

                    const recemSalva = m.id === musicaRecemSalvaId;

                    return (
                      <div
                        key={m.id}
                        className={`bg-white rounded-2xl border p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3 group relative ${recemSalva
                          ? 'border-emerald-400 bg-emerald-50/20 ring-2 ring-emerald-400/70 shadow-md shadow-emerald-500/10'
                          : selecionada
                            ? 'border-indigo-400 bg-indigo-50/25 ring-2 ring-indigo-400/40 shadow-indigo-100'
                            : 'border-slate-200/80 hover:border-slate-300'
                          }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {recemSalva && (
                                <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs animate-pulse">
                                  <Sparkles size={10} /> Adicionada Agora
                                </span>
                              )}
                              {/* Checkbox de seleção da música */}
                              <button
                                type="button"
                                onClick={() => toggleSelecionarMusica(m.id)}
                                title={selecionada ? "Desmarcar música" : "Selecionar música"}
                                className={`w-5 h-5 rounded-md flex items-center justify-center transition cursor-pointer shrink-0 ${selecionada
                                  ? 'bg-indigo-600 text-white shadow-2xs'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-400 border border-slate-200/80'
                                  }`}
                              >
                                {selecionada ? (
                                  <Check size={11} strokeWidth={3} />
                                ) : (
                                  <div className="w-2 h-2 rounded-xs border border-slate-300" />
                                )}
                              </button>

                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${tipoBadge.bg}`}>
                                <tipoBadge.Icon size={11} className={tipoBadge.iconColor} strokeWidth={2.2} />
                                <span>{m.tipo || 'Adoração'}</span>
                              </span>
                              {m.biblioteca && m.biblioteca !== 'Geral' && (() => {
                                const pEstilo = getEstiloPasta(m.biblioteca, m.voz);
                                const FolderIcon = pEstilo.icon;
                                return (
                                  <span className={`text-[10px] font-bold border px-1.5 py-0.5 rounded-md flex items-center gap-1 ${pEstilo.badgeClass}`}>
                                    <FolderIcon size={10} className={pEstilo.iconClass} />
                                    <span>{m.biblioteca}</span>
                                  </span>
                                );
                              })()}
                              {m.voz && (
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                  {m.voz === 'Feminino' ? (
                                    <>
                                      <User size={10} className="text-pink-500" />
                                      <span>Fem</span>
                                    </>
                                  ) : m.voz === 'Masculino' ? (
                                    <>
                                      <User size={10} className="text-blue-500" />
                                      <span>Masc</span>
                                    </>
                                  ) : (
                                    <>
                                      <Users size={10} className="text-purple-500" />
                                      <span>Misto</span>
                                    </>
                                  )}
                                </span>
                              )}
                            </div>

                            {m.tom && (
                              <span className="text-[11px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                                Tom: {m.tom}
                              </span>
                            )}
                          </div>

                          <h4 className="font-black text-slate-800 text-sm line-clamp-1 group-hover:text-blue-700 transition-colors">
                            {m.titulo}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                            {m.artista || 'Artista não informado'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                          <div className="flex items-center gap-2 text-slate-400">
                            {m.bpm && <span>⏱️ {m.bpm} BPM</span>}
                            {m.link && (
                              <a
                                href={m.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-0.5 font-bold"
                              >
                                Cifra <ExternalLink size={10} />
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => abrirModalEditarMusica(m)}
                              title="Editar música"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => excluirMusicaItem(m.id, m.titulo)}
                              title="Excluir música"
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden animate-in fade-in">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50/90 border-b border-slate-200/80 text-[10px] font-black uppercase tracking-wider text-slate-500">
                          <th className="py-3 px-3 text-center w-10">
                            <button
                              type="button"
                              onClick={toggleSelecionarTodasVisiveis}
                              title={todasVisiveisSelecionadas ? "Desmarcar todas" : "Selecionar todas"}
                              className={`w-4.5 h-4.5 mx-auto rounded-md flex items-center justify-center transition cursor-pointer ${todasVisiveisSelecionadas
                                ? 'bg-rose-600 text-white shadow-2xs'
                                : 'bg-white border border-slate-300 hover:border-slate-400'
                                }`}
                            >
                              {todasVisiveisSelecionadas && <Check size={11} strokeWidth={3} />}
                            </button>
                          </th>
                          <th className="py-3 px-4">Música & Artista</th>
                          <th className="py-3 px-3">Momento</th>
                          <th className="py-3 px-3">Pasta / Biblioteca</th>
                          <th className="py-3 px-3">Vocal</th>
                          <th className="py-3 px-3 text-center">Tom</th>
                          <th className="py-3 px-3 text-center">BPM</th>
                          <th className="py-3 px-3 text-center">Cifra</th>
                          <th className="py-3 px-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {musicasFiltradas.map(m => {
                          const tipoBadge =
                            m.tipo === 'Celebração'
                              ? { bg: 'bg-amber-50 text-amber-800 border-amber-200', Icon: Flame, iconColor: 'text-amber-600' }
                              : m.tipo === 'Pós pregação'
                                ? { bg: 'bg-purple-50 text-purple-800 border-purple-200', Icon: BookOpen, iconColor: 'text-purple-600' }
                                : { bg: 'bg-blue-50 text-blue-800 border-blue-200', Icon: HeartHandshake, iconColor: 'text-blue-600' };

                          const selecionada = musicasSelecionadas.includes(m.id);
                          const recemSalva = m.id === musicaRecemSalvaId;

                          return (
                            <tr key={m.id} className={`transition group ${recemSalva ? 'bg-emerald-50/70 border-y border-emerald-200' : selecionada ? 'bg-indigo-50/50' : 'hover:bg-blue-50/40'}`}>
                              <td className="py-3 px-3 text-center w-10">
                                <button
                                  type="button"
                                  onClick={() => toggleSelecionarMusica(m.id)}
                                  title={selecionada ? "Desmarcar música" : "Selecionar música"}
                                  className={`w-4.5 h-4.5 mx-auto rounded-md flex items-center justify-center transition cursor-pointer ${selecionada
                                    ? 'bg-indigo-600 text-white shadow-2xs'
                                    : 'bg-white border border-slate-300 hover:border-slate-400 group-hover:border-slate-400'
                                    }`}
                                >
                                  {selecionada && <Check size={11} strokeWidth={3} />}
                                </button>
                              </td>
                              <td className="py-3 px-4 font-medium">
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition shadow-2xs ${recemSalva ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                                    <Music size={14} />
                                  </div>
                                  <div className="min-w-0 max-w-[200px] sm:max-w-xs">
                                    <p className="font-black text-slate-800 text-xs truncate group-hover:text-blue-700 flex items-center gap-1.5">
                                      <span>{m.titulo}</span>
                                      {recemSalva && (
                                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-emerald-600 text-white animate-pulse">
                                          NOVA
                                        </span>
                                      )}
                                    </p>
                                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                                      {m.artista || 'Geral / Desconhecido'}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border inline-flex items-center gap-1 ${tipoBadge.bg}`}>
                                  <tipoBadge.Icon size={11} className={tipoBadge.iconColor} strokeWidth={2.2} />
                                  <span>{m.tipo || 'Adoração'}</span>
                                </span>
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap">
                                {m.biblioteca && m.biblioteca !== 'Geral' ? (() => {
                                  const pEstilo = getEstiloPasta(m.biblioteca, m.voz);
                                  const FolderIcon = pEstilo.icon;
                                  return (
                                    <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${pEstilo.badgeClass}`}>
                                      <FolderIcon size={11} className={pEstilo.iconClass} />
                                      <span>{m.biblioteca}</span>
                                    </span>
                                  );
                                })() : (
                                  <span className="text-[10px] text-slate-400 font-medium">Geral</span>
                                )}
                              </td>

                              <td className="py-3 px-3 whitespace-nowrap">
                                {m.voz ? (
                                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                                    {m.voz === 'Feminino' ? (
                                      <>
                                        <User size={10} className="text-pink-500" />
                                        <span>Fem</span>
                                      </>
                                    ) : m.voz === 'Masculino' ? (
                                      <>
                                        <User size={10} className="text-blue-500" />
                                        <span>Masc</span>
                                      </>
                                    ) : (
                                      <>
                                        <Users size={10} className="text-purple-500" />
                                        <span>Misto</span>
                                      </>
                                    )}
                                  </span>
                                ) : (
                                  <span className="text-slate-300">-</span>
                                )}
                              </td>

                              <td className="py-3 px-3 text-center whitespace-nowrap">
                                <span className="text-[11px] font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                                  {m.tom || '-'}
                                </span>
                              </td>

                              <td className="py-3 px-3 text-center whitespace-nowrap font-mono text-[11px] text-slate-500">
                                {m.bpm ? `${m.bpm}` : '-'}
                              </td>

                              <td className="py-3 px-3 text-center whitespace-nowrap">
                                {m.link ? (
                                  <a
                                    href={m.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 hover:underline font-bold"
                                  >
                                    <span>Cifra</span>
                                    <ExternalLink size={11} />
                                  </a>
                                ) : (
                                  <span className="text-slate-300 text-[10px]">-</span>
                                )}
                              </td>

                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() => abrirModalEditarMusica(m)}
                                    title="Editar música"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                                  >
                                    <Pencil size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => excluirMusicaItem(m.id, m.titulo)}
                                    title="Excluir música"
                                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-50 transition cursor-pointer"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ── ABA 3: SUGESTÕES INTELIGENTES & ESTATÍSTICAS ────────────── */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {abaAtiva === 'estatisticas' && (
            <div className="space-y-6">
              {/* Cards de Métricas Principais */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Biblioteca Total</span>
                  <p className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">{musicas.length}</p>
                  <span className="text-[10px] text-slate-400">Músicas cadastradas</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 flex items-center gap-1">
                    <Flame size={12} className="text-amber-500" strokeWidth={2.2} />
                    <span>Celebração</span>
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">
                    {musicas.filter(m => m.tipo === 'Celebração').length}
                  </p>
                  <span className="text-[10px] text-slate-400">Músicas animadas</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 flex items-center gap-1">
                    <HeartHandshake size={12} className="text-blue-500" strokeWidth={2.2} />
                    <span>Adoração</span>
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">
                    {musicas.filter(m => m.tipo === 'Adoração').length}
                  </p>
                  <span className="text-[10px] text-slate-400">Intimidade e adoração</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 flex items-center gap-1">
                    <BookOpen size={12} className="text-purple-500" strokeWidth={2.2} />
                    <span>Pós Pregação</span>
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-purple-700 mt-1">
                    {musicas.filter(m => m.tipo === 'Pós pregação').length}
                  </p>
                  <span className="text-[10px] text-slate-400">Ministração e apelo</span>
                </div>
              </div>

              {/* Destaque Inteligente */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-xl">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[10px] font-black uppercase tracking-wider border border-blue-400/20">
                    Sugestor Automático Ativo
                  </span>
                  <h3 className="text-lg sm:text-xl font-black">
                    Monte repertórios balanceados sem repetições cansativas
                  </h3>
                  <p className="text-xs text-blue-100/80 leading-relaxed font-medium">
                    O algoritmo analisa o histórico de cultos salvos e sugere automaticamente músicas conhecidas pela igreja intercaladas com canções que não são cantadas há semanas.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAbaAtiva('cultos');
                    handleGerarSugestaoInteligente();
                  }}
                  className="px-5 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-rose-500/30 transition active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-2"
                >
                  <Sparkles size={15} strokeWidth={2.2} />
                  <span>Gerar Para o Próximo Culto</span>
                </button>
              </div>

              {/* Grid de Rankings: Mais Tocadas vs Menos Tocadas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bloco 1: Mais Tocadas */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                      <Flame size={16} className="text-rose-500" />
                      Músicas Mais Tocadas
                    </h4>
                    <span className="text-[10px] text-slate-400 font-bold">Top execuções</span>
                  </div>

                  {!estatisticas?.maisTocadas || estatisticas.maisTocadas.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs italic">
                      Ainda não há dados suficientes. Conforme você salva repertórios nos cultos, o ranking é montado automaticamente!
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                      {estatisticas.maisTocadas.slice(0, 10).map((m, idx) => (
                        <div
                          key={m.id}
                          className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/60"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${idx === 0 ? 'bg-amber-400 text-white' : idx === 1 ? 'bg-slate-300 text-slate-700' : idx === 2 ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
                              }`}>
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-black text-slate-800 truncate">{m.titulo}</p>
                              <p className="text-[10px] text-slate-400 truncate">{m.artista} · {m.tipo}</p>
                            </div>
                          </div>
                          <span className="shrink-0 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black px-2 py-0.5 rounded-full">
                            {m.vezesTocada}x
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bloco 2: Menos Tocadas / Na Gaveta */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-500" />
                      Músicas Pouco ou Nunca Tocadas
                    </h4>
                    <span className="text-[10px] text-slate-400 font-bold">Para renovar</span>
                  </div>

                  {!estatisticas?.menosTocadas || estatisticas.menosTocadas.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs italic">
                      Cadastre músicas na biblioteca para ver recomendações de canções pouco exploradas.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                      {estatisticas.menosTocadas.slice(0, 10).map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/60"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black text-slate-800 truncate">{m.titulo}</p>
                            <p className="text-[10px] text-slate-400 truncate">{m.artista} · {m.tipo}</p>
                          </div>
                          <span className="shrink-0 bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {m.vezesTocada === 0 ? 'Nunca tocada' : `${m.vezesTocada}x`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>


        {/* ── COLUNA FIXA/STICKY À DIREITA (DESKTOP) (QUANDO NÃO EMBUTIDO) ── */}
        {!hideSidebar && (
          <aside
            className={`hidden lg:block shrink-0 transition-all duration-300 lg:sticky lg:top-4 z-20 ${colunaRecolhida ? 'lg:w-16' : 'lg:w-60 xl:w-64'
              }`}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-sm p-3.5 space-y-3">
              {/* Header da Coluna Lateral */}
              {colunaRecolhida ? (
                <div className="flex flex-col items-center pb-2 border-b border-slate-100 gap-2">
                  <div
                    className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs"
                    title="Repertório de Louvor"
                  >
                    <Music size={20} strokeWidth={2.5} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setColunaRecolhida(false)}
                    title="Expandir menu"
                    className="p-1 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 px-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                      <Music size={18} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 truncate">
                        Repertório
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold truncate">Menu de Navegação</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setColunaRecolhida(true)}
                    title="Recolher menu para ícones"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer shrink-0"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Navegação de Abas */}
              {colunaRecolhida ? (
                <nav className="space-y-2">
                  {abas.map((a) => {
                    const Icon = a.icon;
                    const ativo = abaAtiva === a.id;
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => handleNavegarTab(a.id)}
                        title={`${a.label} — ${a.desc}`}
                        className={`w-full flex items-center justify-center p-3 rounded-2xl transition-all duration-200 group cursor-pointer active:scale-95 relative ${ativo
                          ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-lg shadow-blue-700/25 border border-blue-400/30'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                          }`}
                      >
                        <Icon size={20} strokeWidth={ativo ? 2.5 : 2} />
                        {ativo && (
                          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-5 rounded-r bg-blue-500 shadow-sm" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              ) : (
                <nav className="space-y-1.5">
                  {abas.map((a) => {
                    const Icon = a.icon;
                    const ativo = abaAtiva === a.id;
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => handleNavegarTab(a.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all duration-200 group cursor-pointer active:scale-95 ${ativo
                          ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-lg shadow-blue-700/25 border border-blue-400/30'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                          }`}
                      >
                        <span
                          className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-all duration-200 ${ativo
                            ? 'bg-white/20 text-white shadow-inner'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-700'
                            }`}
                        >
                          <Icon size={18} strokeWidth={ativo ? 2.5 : 2} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs font-black uppercase tracking-wider leading-tight truncate ${ativo ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'
                            }`}>
                            {a.label}
                          </p>
                          <p className={`text-[10px] leading-tight truncate mt-0.5 font-medium ${ativo ? 'text-blue-100' : 'text-slate-400'
                            }`}>
                            {a.desc}
                          </p>
                        </div>
                        {a.badge !== undefined && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ml-auto shrink-0 ${ativo ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                            {a.badge}
                          </span>
                        )}
                        {ativo && (
                          <span className="w-1.5 h-6 rounded-full bg-white ml-1 shrink-0 shadow-xs" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              )}

              {/* Widget / Atalho do Banco de Dados no Menu */}
              {!colunaRecolhida && (
                <div className="pt-2 border-t border-slate-100">
                  {statusBanco && !statusBanco.conectado ? (
                    <button
                      type="button"
                      onClick={() => setModalSqlAberto(true)}
                      className="w-full p-2.5 rounded-2xl border text-left transition cursor-pointer flex items-center gap-2.5 bg-amber-50/70 border-amber-200/80 hover:bg-amber-100/60 mb-2"
                    >
                      <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 bg-amber-100 text-amber-700">
                        <Save size={14} strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-black text-amber-900 truncate">Configurar Banco</p>
                        <p className="text-[9px] text-amber-700 truncate">Executar script SQL</p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    </button>
                  ) : null}

                  <div className="pt-1 px-1 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <button
                      type="button"
                      onClick={() => setModalSqlAberto(true)}
                      className="hover:text-slate-600 transition flex items-center gap-1.5 cursor-pointer"
                      title="Configuração do Banco / SQL"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusBanco?.conectado ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span>Supabase</span>
                    </button>
                    <span className="text-slate-400 font-bold">MIB Church</span>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── MODAL: CADASTRAR / EDITAR MÚSICA ───────────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {modalMusicaAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in" onClick={() => { pararAudioPreview(); setModalMusicaAberto(false); }} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 animate-in zoom-in-95 duration-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Music size={16} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-800 leading-tight">
                    {musicaEmEdicao ? 'Editar Música' : 'Nova Música na Biblioteca'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {musicaEmEdicao ? 'Altere as informações da música' : 'Digite o nome para buscar sugestões automáticas'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { pararAudioPreview(); setModalMusicaAberto(false); }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={salvarMusicaForm} className="space-y-4">
              {/* Campo Título com Busca e Autocomplete Automático */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Título da Música *
                  </label>
                  <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles size={11} className="text-blue-500" /> Sugestões em tempo real
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Digite para buscar: Ex: Lugar Secreto, Ruja o Leão, Bondade..."
                    value={formMusica.titulo}
                    onChange={e => handleTituloChange(e.target.value)}
                    onFocus={() => {
                      if (sugestoesMusica.length > 0) setMostrarSugestoes(true);
                    }}
                    className="w-full pl-3 pr-9 py-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium transition"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {buscandoSugestoes ? (
                      <Loader2 size={15} className="animate-spin text-blue-500" />
                    ) : (
                      <Search size={14} className="text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Dropdown de Sugestões de Músicas */}
                {mostrarSugestoes && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMostrarSugestoes(false)}
                    />
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-500 flex items-center justify-between">
                        <span>Selecione para preencher tudo automaticamente:</span>
                        {buscandoSugestoes && (
                          <span className="text-blue-600 flex items-center gap-1">
                            <Loader2 size={10} className="animate-spin" /> Buscando catálogo...
                          </span>
                        )}
                      </div>

                      {sugestoesMusica.length === 0 && !buscandoSugestoes ? (
                        <div className="p-4 text-center text-xs text-slate-400">
                          Nenhuma sugestão encontrada. Você pode preencher manualmente!
                        </div>
                      ) : (
                        sugestoesMusica.map(sug => (
                          <div
                            key={sug.id}
                            onClick={() => aplicarSugestaoMusica(sug)}
                            className="p-2.5 hover:bg-blue-50/70 transition cursor-pointer flex items-center justify-between gap-3 group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {sug.capa ? (
                                <img
                                  src={sug.capa}
                                  alt={sug.titulo}
                                  className="w-9 h-9 rounded-lg object-cover shadow-2xs border border-slate-200 shrink-0"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                  <Music size={16} />
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600">
                                  {sug.titulo}
                                </div>
                                <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
                                  <span>{sug.artista}</span>
                                  {sug.ano && <span className="text-slate-400">• {sug.ano}</span>}
                                  {sug.origem && (
                                    <span className={`text-[9px] px-1 py-0.2 rounded font-semibold ${sug.origem.includes('Biblioteca') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                      }`}>
                                      {sug.origem}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {sug.tom && (
                                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded-md">
                                  {sug.tom}
                                </span>
                              )}
                              {sug.bpm && (
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md">
                                  {sug.bpm} bpm
                                </span>
                              )}
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-100 group-hover:bg-blue-600 group-hover:text-white px-2 py-1 rounded-lg transition">
                                Usar
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}

                {/* Card de Informações da Música Selecionada com Preview de Áudio e Atalhos */}
                {musicaSelecionadaInfo && (
                  <div className="mt-2.5 p-3 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 rounded-2xl border border-blue-100 flex items-center justify-between gap-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {musicaSelecionadaInfo.capa ? (
                        <img
                          src={musicaSelecionadaInfo.capa}
                          alt="Capa"
                          className="w-10 h-10 rounded-xl object-cover shadow-xs border border-blue-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <CheckCircle2 size={18} />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-extrabold text-blue-600 bg-blue-100 px-1.5 py-0.2 rounded-md">
                            Preenchido Online
                          </span>
                          {musicaSelecionadaInfo.ano && (
                            <span className="text-[10px] text-slate-500">{musicaSelecionadaInfo.ano}</span>
                          )}
                        </div>
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {musicaSelecionadaInfo.tituloOriginal} — <span className="text-slate-600 font-normal">{formMusica.artista}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Botão de Preview de Áudio de 30s */}
                      {musicaSelecionadaInfo.previewAudio && (
                        <button
                          type="button"
                          onClick={() => toggleAudioPreview(musicaSelecionadaInfo.previewAudio)}
                          title={tocandoAudioPreview ? "Pausar prévia" : "Ouvir trecho de 30s"}
                          className={`p-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${tocandoAudioPreview
                            ? 'bg-rose-500 text-white shadow-xs animate-pulse'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                          {tocandoAudioPreview ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
                          <span className="text-[10px] hidden sm:inline">{tocandoAudioPreview ? 'Pausar' : 'Ouvir'}</span>
                        </button>
                      )}

                      {/* Atalho Cifra Club */}
                      {musicaSelecionadaInfo.linkCifra && (
                        <a
                          href={musicaSelecionadaInfo.linkCifra}
                          target="_blank"
                          rel="noreferrer"
                          title="Abrir no Cifra Club"
                          className="p-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <ExternalLink size={12} />
                          <span className="hidden sm:inline">Cifra</span>
                        </a>
                      )}

                      {/* Atalho YouTube */}
                      {musicaSelecionadaInfo.linkYoutube && (
                        <a
                          href={musicaSelecionadaInfo.linkYoutube}
                          target="_blank"
                          rel="noreferrer"
                          title="Abrir no YouTube"
                          className="p-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <IconYouTube size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Artista / Banda / Ministério
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Morada, Gabriela Rocha..."
                    value={formMusica.artista}
                    onChange={e => setFormMusica(prev => ({ ...prev, artista: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tipo de Música *
                  </label>
                  <select
                    value={formMusica.tipo}
                    onChange={e => {
                      const novoTipo = e.target.value;
                      const pastaCorrespondente = bibliotecas.find(b =>
                        normalizarTexto(b.tipo || '') === normalizarTexto(novoTipo) &&
                        (!formMusica.voz || normalizarTexto(b.voz || '') === normalizarTexto(formMusica.voz))
                      );
                      setFormMusica(prev => ({
                        ...prev,
                        tipo: novoTipo,
                        biblioteca: pastaCorrespondente?.nome || prev.biblioteca
                      }));
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-bold bg-white cursor-pointer"
                  >
                    <option value="Celebração">Celebração</option>
                    <option value="Adoração">Adoração</option>
                    <option value="Pós pregação">Pós pregação</option>
                  </select>
                </div>
              </div>

              {/* Biblioteca / Pasta e Classificação Vocal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Pasta / Biblioteca *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setBibliotecaEmEdicao(null);
                        setFormBiblioteca({
                          nome: '',
                          descricao: '',
                          cor: '#ec4899',
                          tipo: formMusica.tipo,
                          voz: formMusica.voz || 'Feminino'
                        });
                        setModalBibliotecaAberto(true);
                      }}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
                    >
                      <Plus size={11} strokeWidth={2.5} /> Nova Pasta
                    </button>
                  </div>
                  <select
                    value={formMusica.biblioteca}
                    onChange={e => {
                      const selBib = e.target.value;
                      const achada = bibliotecas.find(b => b.nome === selBib);
                      setFormMusica(prev => ({
                        ...prev,
                        biblioteca: selBib,
                        voz: achada?.voz || prev.voz,
                        tipo: achada?.tipo && achada.tipo !== 'Geral' ? achada.tipo : prev.tipo
                      }));
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-bold bg-white cursor-pointer"
                  >
                    {bibliotecas.length === 0 ? (
                      <option value="Geral">Geral</option>
                    ) : (
                      bibliotecas.map(b => (
                        <option key={b.id || b.nome} value={b.nome}>
                          {b.nome} {b.voz ? `(${b.voz})` : ''}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Classificação Vocal (Tom)
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'Feminino', label: 'Feminino', Icon: User, iconColor: 'text-pink-600', activeClass: 'border-pink-300 text-pink-700 bg-pink-100/70 ring-2 ring-pink-400' },
                      { id: 'Masculino', label: 'Masculino', Icon: User, iconColor: 'text-blue-600', activeClass: 'border-blue-300 text-blue-700 bg-blue-100/70 ring-2 ring-blue-400' },
                      { id: 'Misto', label: 'Misto', Icon: Users, iconColor: 'text-purple-600', activeClass: 'border-purple-300 text-purple-700 bg-purple-100/70 ring-2 ring-purple-400' }
                    ].map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          const novaVoz = v.id;
                          const pastaCorrespondente = bibliotecas.find(b =>
                            normalizarTexto(b.tipo || '') === normalizarTexto(formMusica.tipo) &&
                            normalizarTexto(b.voz || '') === normalizarTexto(novaVoz)
                          );
                          setFormMusica(prev => ({
                            ...prev,
                            voz: novaVoz,
                            biblioteca: pastaCorrespondente?.nome || prev.biblioteca
                          }));
                        }}
                        className={`py-1.5 px-1 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${formMusica.voz === v.id
                          ? `${v.activeClass} font-black shadow-2xs`
                          : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-100 font-semibold'
                          }`}
                      >
                        <v.Icon size={14} className={formMusica.voz === v.id ? 'currentColor' : v.iconColor} strokeWidth={2.2} />
                        <span className="text-[10px] leading-tight">{v.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tom Padrão
                  </label>
                  <select
                    value={formMusica.tom}
                    onChange={e => setFormMusica(prev => ({ ...prev, tom: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-bold bg-white cursor-pointer"
                  >
                    {TONS_DISPONIVEIS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    BPM (Opcional)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 72, 128..."
                    value={formMusica.bpm}
                    onChange={e => setFormMusica(prev => ({ ...prev, bpm: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Link de Cifra ou Vídeo (Opcional)
                  </label>
                  {formMusica.titulo && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const query = `${formMusica.titulo} ${formMusica.artista || ''}`.trim();
                          setFormMusica(prev => ({
                            ...prev,
                            link: `https://www.cifraclub.com.br/?q=${encodeURIComponent(query)}`
                          }));
                        }}
                        className="text-[10px] font-bold text-orange-600 hover:text-orange-800 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded cursor-pointer transition"
                      >
                        + Cifra Club
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const query = `${formMusica.titulo} ${formMusica.artista || ''}`.trim();
                          setFormMusica(prev => ({
                            ...prev,
                            link: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
                          }));
                        }}
                        className="text-[10px] font-bold text-red-600 hover:text-red-800 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded cursor-pointer transition"
                      >
                        + YouTube
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formMusica.link}
                  onChange={e => setFormMusica(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { pararAudioPreview(); setModalMusicaAberto(false); }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Salvar Música
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── MODAL: IMPORTAR PLANILHA (XLSX / CSV) ──────────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {modalImportarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in" onClick={() => setModalImportarAberto(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={20} className="text-emerald-600" />
                <h3 className="text-base font-black text-slate-800">
                  Importar Biblioteca de Músicas (.xlsx, .csv)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalImportarAberto(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dica e Modelo */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-600">
                <p className="font-bold text-slate-800">Colunas reconhecidas automaticamente:</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Título, Artista, Tipo (Celebração/Adoração/Pós pregação), Tom, BPM, Link.</p>
              </div>
              <button
                type="button"
                onClick={baixarModeloPlanilha}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0"
              >
                <Download size={13} />
                <span>Baixar Modelo (.xlsx)</span>
              </button>
            </div>

            {/* Upload Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/20 transition-all space-y-2"
            >
              <FileSpreadsheet size={32} className="mx-auto text-slate-400" />
              <p className="text-xs font-black text-slate-700">
                {arquivoPlanilha ? arquivoPlanilha.name : 'Clique para selecionar seu arquivo .xlsx ou .csv'}
              </p>
              <p className="text-[10px] text-slate-400">
                Suporta planilhas exportadas do Excel, Google Planilhas ou arquivos CSV
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleSelecionarArquivoPlanilha}
                className="hidden"
              />
            </div>

            {/* Prévia das Músicas Detectadas */}
            {musicasPreviaImportacao.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-slate-800">
                    Prévia: <strong className="text-emerald-600">{musicasPreviaImportacao.length} músicas</strong> detectadas
                  </span>
                  <span className="text-[11px] text-slate-400">Exibindo primeiras 5</span>
                </div>

                <div className="border border-slate-200 rounded-xl max-h-44 overflow-y-auto divide-y divide-slate-100 text-xs">
                  {musicasPreviaImportacao.slice(0, 5).map((m, idx) => (
                    <div key={idx} className="p-2.5 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{m.titulo}</p>
                        <p className="text-[10px] text-slate-400">{m.artista || 'Sem artista'} · Tom: {m.tom || 'N/A'}</p>
                      </div>
                      <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded">
                        {m.tipo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ações */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setModalImportarAberto(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarImportacaoPlanilha}
                disabled={musicasPreviaImportacao.length === 0 || importandoPlanilha}
                className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 cursor-pointer disabled:opacity-40"
              >
                {importandoPlanilha ? 'Importando...' : `Confirmar Importação (${musicasPreviaImportacao.length})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── MODAL: SELECIONAR MÚSICA DA BIBLIOTECA PARA O REPERTÓRIO ── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {modalAdicionarRepertorioAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in" onClick={() => setModalAdicionarRepertorioAberto(false)} />
          <div className="relative w-full max-w-2xl lg:max-w-3xl bg-white rounded-3xl shadow-2xl p-5 sm:p-6 border border-slate-100 z-10 animate-in zoom-in-95 duration-200 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div>
                <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <span>Adicionar ao Repertório</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-black border inline-flex items-center gap-1.5 ${categoriaAdicionar === 'Celebração'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : categoriaAdicionar === 'Pós pregação'
                      ? 'bg-purple-100 text-purple-800 border-purple-200'
                      : categoriaAdicionar === 'todos'
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-blue-100 text-blue-800 border-blue-200'
                    }`}>
                    {categoriaAdicionar === 'Celebração' && <Flame size={12} strokeWidth={2.5} />}
                    {categoriaAdicionar === 'Pós pregação' && <BookOpen size={12} strokeWidth={2.5} />}
                    {categoriaAdicionar === 'todos' && <Disc3 size={12} strokeWidth={2.5} />}
                    {categoriaAdicionar === 'Adoração' && <HeartHandshake size={12} strokeWidth={2.5} />}
                    <span>
                      {categoriaAdicionar === 'Celebração'
                        ? 'Celebração'
                        : categoriaAdicionar === 'Pós pregação'
                          ? 'Pós pregação'
                          : categoriaAdicionar === 'todos'
                            ? 'Qualquer Momento'
                            : 'Adoração'}
                    </span>
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  {categoriaAdicionar === 'Adoração'
                    ? 'Selecione uma música de intimidade e adoração para abrir ou compor este momento'
                    : categoriaAdicionar === 'Celebração'
                      ? 'Selecione uma música alegre e festiva para a celebração do culto'
                      : categoriaAdicionar === 'Pós pregação'
                        ? 'Selecione uma música de resposta, quebrantamento e apelo após a mensagem'
                        : 'Escolha uma música da biblioteca para adicionar à lista deste culto'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalAdicionarRepertorioAberto(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* SELETOR DE PASTAS / BIBLIOTECAS EM CARDS (SEM BARRA DESLIZANTE) */}
            <div className="space-y-2 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Folder size={12} className="text-blue-500" />
                  {categoriaAdicionar === 'todos' ? 'Pastas da Biblioteca:' : `Pastas de ${categoriaAdicionar}:`}
                </span>
                <span className="text-[10px] text-slate-500 font-bold">
                  {filtroBibliotecaAdicionar === 'todas'
                    ? 'Visualizando Todas as Pastas'
                    : `Pasta: ${pastasModalAdicionar.find(p => p.id === filtroBibliotecaAdicionar)?.label || filtroBibliotecaAdicionar}`}
                </span>
              </div>

              {/* Grid Responsivo de Cards de Pastas com Ícones Específicos e Cores Padronizadas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {pastasModalAdicionar.map(card => {
                  const ativo = filtroBibliotecaAdicionar === card.id;
                  const IconComp = card.icon;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        if (filtroBibliotecaAdicionar === card.id) {
                          setFiltroBibliotecaAdicionar('todas');
                        } else {
                          setFiltroBibliotecaAdicionar(card.id);
                        }
                      }}
                      className={`p-2 rounded-xl border text-left transition-all duration-200 cursor-pointer active:scale-95 flex flex-col justify-between gap-1.5 ${ativo
                        ? `${card.activeClass} shadow-sm`
                        : `${card.bgCard} shadow-2xs`
                        }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${ativo
                            ? 'bg-white/20 text-white shadow-inner'
                            : card.iconBadgeClass
                            }`}
                        >
                          <IconComp size={13} strokeWidth={2.5} />
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${ativo ? 'bg-white/25 text-white' : card.countClass
                            }`}
                        >
                          {card.count}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`text-[10px] font-black leading-tight truncate ${ativo ? 'text-white' : card.textClass
                            }`}
                          title={card.label}
                        >
                          {card.label}
                        </p>
                        <p
                          className={`text-[9px] leading-tight mt-0.5 font-medium truncate ${ativo ? 'text-blue-100' : card.subClass
                            }`}
                        >
                          {card.sub}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Barra de Busca */}
              <div className="pt-1">
                <div className="relative w-full">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Buscar por título, artista, tom ou pasta..."
                    value={buscaModalAdicionar}
                    onChange={e => setBuscaModalAdicionar(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                  />
                  {buscaModalAdicionar && (
                    <button
                      type="button"
                      onClick={() => setBuscaModalAdicionar('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Lista com scroll */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px]">
              {musicasParaAdicionar.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs italic space-y-2">
                  <p>Nenhuma música encontrada com os filtros selecionados.</p>
                  <p className="text-[11px] text-slate-400">Tente buscar por outro termo ou selecione "Todas as Pastas".</p>
                </div>
              ) : (
                musicasParaAdicionar.map(m => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/60 border border-slate-200/60 rounded-xl transition group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h5 className="font-black text-slate-800 text-xs truncate group-hover:text-blue-700">
                          {m.titulo}
                        </h5>
                        {m.biblioteca && m.biblioteca !== 'Geral' && (() => {
                          const pEstilo = getEstiloPasta(m.biblioteca, m.voz);
                          const FolderIcon = pEstilo.icon;
                          return (
                            <span className={`text-[9px] font-bold border px-1.5 py-0.5 rounded-md inline-flex items-center gap-1 ${pEstilo.badgeClass}`}>
                              <FolderIcon size={10} className={pEstilo.iconClass} />
                              <span>{m.biblioteca}</span>
                            </span>
                          );
                        })()}
                        {m.voz && (
                          <span className="text-[9px] font-bold bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded-md inline-flex items-center gap-1">
                            {m.voz === 'Feminino' ? (
                              <>
                                <User size={10} className="text-pink-500" />
                                <span>Fem</span>
                              </>
                            ) : m.voz === 'Masculino' ? (
                              <>
                                <User size={10} className="text-blue-500" />
                                <span>Masc</span>
                              </>
                            ) : (
                              <>
                                <Users size={10} className="text-purple-500" />
                                <span>Misto</span>
                              </>
                            )}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {m.artista || 'Geral'} · Tom sugerido: <strong>{m.tom || 'G'}</strong>
                        {m.bpm ? ` · ${m.bpm} BPM` : ''}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        adicionarMusicaAoRepertorio(m, categoriaAdicionar);
                        setModalAdicionarRepertorioAberto(false);
                      }}
                      title={`Adicionar "${m.titulo}"`}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200/90 hover:border-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-150 active:scale-95 cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                    >
                      <Plus size={11} strokeWidth={2.5} />
                      <span>Escolher</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Rodapé rápido para criar uma música caso não ache */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs shrink-0">
              <span className="text-slate-400 text-[11px]">Não encontrou a música desejada?</span>
              <button
                type="button"
                onClick={() => {
                  setModalAdicionarRepertorioAberto(false);
                  setAdicionarAoRepertorioAoSalvar(true);
                  abrirModalNovaMusica(categoriaAdicionar);
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                + Cadastrar Nova Música
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* ── MODAL: CRIAR / EDITAR BIBLIOTECA (PASTA) ───────────────── */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {modalBibliotecaAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setModalBibliotecaAberto(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FolderPlus size={20} className="text-blue-600" />
                <h3 className="text-base font-black text-slate-800">
                  {bibliotecaEmEdicao ? 'Editar Pasta de Músicas' : 'Nova Pasta / Biblioteca'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalBibliotecaAberto(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={salvarBibliotecaForm} className="space-y-4 pt-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nome da Pasta / Biblioteca *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Celebração Feminina, Adoração Masculina..."
                  value={formBiblioteca.nome}
                  onChange={e => setFormBiblioteca(prev => ({ ...prev, nome: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Classificação Vocal
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Feminino', label: 'Feminino', Icon: User, iconColor: 'text-pink-600', desc: 'Tons femininos', cor: 'border-pink-300 text-pink-700 bg-pink-50 ring-pink-400' },
                    { id: 'Masculino', label: 'Masculino', Icon: User, iconColor: 'text-blue-600', desc: 'Tons masculinos', cor: 'border-blue-300 text-blue-700 bg-blue-50 ring-blue-400' },
                    { id: 'Misto', label: 'Misto', Icon: Users, iconColor: 'text-purple-600', desc: 'Ambos / Duetos', cor: 'border-purple-300 text-purple-700 bg-purple-50 ring-purple-400' }
                  ].map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setFormBiblioteca(prev => ({
                        ...prev,
                        voz: v.id,
                        cor: v.id === 'Masculino' ? '#2563eb' : v.id === 'Feminino' ? '#ec4899' : prev.cor
                      }))}
                      className={`p-2 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${formBiblioteca.voz === v.id
                        ? `${v.cor} ring-2 ring-offset-1 font-black shadow-2xs`
                        : 'border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100'
                        }`}
                    >
                      <v.Icon size={16} className={formBiblioteca.voz === v.id ? 'currentColor' : v.iconColor} strokeWidth={2.2} />
                      <span className="text-xs font-bold leading-none">{v.label}</span>
                      <span className="text-[9px] opacity-75">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Momento Predominante
                  </label>
                  <select
                    value={formBiblioteca.tipo}
                    onChange={e => setFormBiblioteca(prev => ({ ...prev, tipo: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-bold bg-white cursor-pointer"
                  >
                    <option value="Geral">Geral (Todos)</option>
                    <option value="Celebração">Celebração</option>
                    <option value="Adoração">Adoração</option>
                    <option value="Pós pregação">Pós pregação</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Cor Identificadora
                  </label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[
                      { cor: '#ec4899', nome: 'Rosa' },
                      { cor: '#3b82f6', nome: 'Azul' },
                      { cor: '#8b5cf6', nome: 'Roxo' },
                      { cor: '#10b981', nome: 'Verde' },
                      { cor: '#f59e0b', nome: 'Âmbar' },
                      { cor: '#64748b', nome: 'Cinza' }
                    ].map(c => (
                      <button
                        key={c.cor}
                        type="button"
                        onClick={() => setFormBiblioteca(prev => ({ ...prev, cor: c.cor }))}
                        className={`w-6 h-6 rounded-full transition cursor-pointer ${formBiblioteca.cor === c.cor ? 'ring-2 ring-offset-2 ring-slate-800 scale-110' : 'opacity-70 hover:opacity-100'
                          }`}
                        style={{ backgroundColor: c.cor }}
                        title={c.nome}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Descrição (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Músicas arranjadas para ministras com voz feminina"
                  value={formBiblioteca.descricao}
                  onChange={e => setFormBiblioteca(prev => ({ ...prev, descricao: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalBibliotecaAberto(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  {bibliotecaEmEdicao ? 'Salvar Alterações' : 'Criar Pasta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL TRANSFERIR MÚSICAS DE PASTA (EM LOTE) ── */}
      {modalTransferirAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => !transferindoLote && setModalTransferirAberto(false)}
          />

          <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            {/* Cabeçalho */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 text-white flex items-start justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shadow-inner shrink-0">
                  <FolderSymlink size={20} />
                </div>
                <div>
                  <h3 className="font-black text-base leading-tight">
                    Transferir Músicas de Pasta
                  </h3>
                  <p className="text-xs text-indigo-200/80">
                    Mover {musicasSelecionadas.length} {musicasSelecionadas.length === 1 ? 'música selecionada' : 'músicas selecionadas'} para outra biblioteca
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={transferindoLote}
                onClick={() => setModalTransferirAberto(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition disabled:opacity-50 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Conteúdo rolável */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Músicas Selecionadas Prévia */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Music size={13} className="text-indigo-600" />
                    Músicas Selecionadas ({musicasSelecionadasObjs.length})
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Origem: {bibliotecaSelecionada === 'todas' ? 'Várias pastas' : bibliotecaSelecionada}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 max-h-36 overflow-y-auto divide-y divide-slate-100 space-y-1">
                  {musicasSelecionadasObjs.map(m => (
                    <div key={m.id} className="pt-1.5 first:pt-0 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-black text-slate-800 text-[11px] truncate">
                          {m.titulo}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {m.artista || 'Geral'} {m.tom ? `• Tom ${m.tom}` : ''}
                        </p>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-md text-[9px] font-bold bg-white border border-slate-200 text-slate-600">
                        {m.biblioteca || 'Geral'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escolha da Pasta Destino */}
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block mb-2">
                  Escolha a Pasta de Destino:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {bibliotecasDisponiveis.map(b => {
                    const selecionada = pastaDestinoTransferencia === b.nome;
                    const count = musicas.filter(m => normalizarTexto(m.biblioteca || '') === normalizarTexto(b.nome)).length;
                    const iconEl = getIconeBiblioteca(b, selecionada);
                    const estilo = getEstiloPasta(b.nome, b.voz);

                    return (
                      <button
                        key={b.id || b.nome}
                        type="button"
                        onClick={() => setPastaDestinoTransferencia(b.nome)}
                        className={`p-3 rounded-2xl border text-left transition-all duration-150 cursor-pointer flex items-center justify-between gap-2.5 ${selecionada
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25 ring-2 ring-indigo-400/50'
                          : `${estilo.bgCard}`
                          }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition ${selecionada
                              ? 'bg-white/20 text-white'
                              : estilo.iconBadgeClass
                              }`}
                          >
                            {iconEl}
                          </span>
                          <div className="min-w-0">
                            <p className={`font-black text-xs leading-tight truncate ${selecionada ? 'text-white' : estilo.textClass}`}>
                              {b.nome}
                            </p>
                            <p className={`text-[10px] truncate ${selecionada ? 'text-indigo-100' : estilo.subClass}`}>
                              {b.tipo || 'Geral'} {b.voz && b.voz !== 'Geral' ? `• ${b.voz}` : ''}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${selecionada ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                            {count}
                          </span>
                          {selecionada && <Check size={14} strokeWidth={3} className="text-white shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sincronização de Voz */}
              <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl flex items-start gap-3">
                <input
                  type="checkbox"
                  id="check-ajustar-voz"
                  checked={ajustarVozTransferencia}
                  onChange={e => setAjustarVozTransferencia(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="check-ajustar-voz" className="text-xs text-slate-700 cursor-pointer select-none">
                  <span className="font-bold block text-slate-800">
                    Ajustar vocal da música automaticamente
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                    Se a pasta de destino for especificada como Feminina ou Masculina, ajusta o campo de voz da música para manter as buscas de escala afinadas.
                  </span>
                </label>
              </div>
            </div>

            {/* Rodapé / Ações */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                {musicasSelecionadas.length} {musicasSelecionadas.length === 1 ? 'música será movida' : 'músicas serão movidas'} para <strong>"{pastaDestinoTransferencia}"</strong>
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  disabled={transferindoLote}
                  onClick={() => setModalTransferirAberto(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer transition disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={transferindoLote || !pastaDestinoTransferencia}
                  onClick={handleConfirmarTransferencia}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-600/25 cursor-pointer flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
                >
                  {transferindoLote ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transferindo...</span>
                    </>
                  ) : (
                    <>
                      <FolderSymlink size={14} />
                      <span>Transferir Agora</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: VISUALIZAR REPERTÓRIO SALVO DO CULTO (COM BOTÃO WHATSAPP) ── */}
      {modalVisualizarCulto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setModalVisualizarCulto(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh] overflow-hidden">
            {/* Topo do Modal */}
            <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-white border-b border-slate-150 flex items-start justify-between gap-3 shrink-0">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="font-black uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <Calendar size={12} />
                    {formatarDataHoraEvento(modalVisualizarCulto.data_evento).diaSemana}, {formatarDataHoraEvento(modalVisualizarCulto.data_evento).dataFormatada}
                    {formatarDataHoraEvento(modalVisualizarCulto.data_evento).horaFormatada !== '--:--' && ` às ${formatarDataHoraEvento(modalVisualizarCulto.data_evento).horaFormatada}`}
                  </span>
                  <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg font-medium flex items-center gap-1">
                    <MapPin size={11} className="text-slate-400" />
                    {modalVisualizarCulto.local || 'Templo Sede'}
                  </span>
                  {modalVisualizarCulto.pregador && (
                    <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg font-medium flex items-center gap-1">
                      <BookOpen size={11} className="text-slate-400" />
                      {modalVisualizarCulto.pregador}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-800 tracking-tight break-words">
                  {modalVisualizarCulto.titulo}
                </h3>
                {repModalVisualizado?.tema_culto && (
                  <p className="text-xs text-indigo-700 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    Tema: <span className="font-semibold text-slate-700">{repModalVisualizado.tema_culto}</span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setModalVisualizarCulto(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conteúdo do Repertório */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 min-h-0 bg-slate-50/50">
              {!repModalVisualizado || !repModalVisualizado.musicas || repModalVisualizado.musicas.length === 0 ? (
                <div className="py-12 px-4 text-center bg-white rounded-2xl border border-dashed border-slate-200 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
                    <Music size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm">Nenhum repertório salvo ainda</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Este culto ainda não possui músicas salvas no repertório. Você pode escolher músicas por tipo litúrgico ou gerar uma sugestão inteligente.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      selecionarEvento(modalVisualizarCulto.id);
                      setSubAbaMobileCultos('editor');
                      setModalVisualizarCulto(null);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xs transition active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Montar Repertório Agora</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Barra de resumo */}
                  <div className="flex items-center justify-between gap-2 px-1">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <ListMusic size={14} className="text-blue-600" />
                      Ordem do Louvor ({repModalVisualizado.musicas.length} {repModalVisualizado.musicas.length === 1 ? 'música' : 'músicas'})
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Sequência do culto
                    </span>
                  </div>

                  {/* Lista de Músicas do Culto */}
                  <div className="space-y-2">
                    {repModalVisualizado.musicas.map((m, idx) => {
                      const musicaOriginal = musicas.find(orig => String(orig.id) === String(m.musica_id));
                      const pastaNome = m.biblioteca || m.pasta || musicaOriginal?.biblioteca || musicaOriginal?.pasta || '';
                      const pastaLower = pastaNome.toLowerCase();
                      const isMasculino = pastaLower.includes('masculin') || m.voz === 'Masculino';
                      const isFeminino = pastaLower.includes('feminin') || m.voz === 'Feminino';

                      return (
                        <div
                          key={idx}
                          className="p-3 sm:p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-slate-300 transition"
                        >
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex items-start gap-2.5 min-w-0">
                              {/* Número na ordem */}
                              <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </div>

                              <div className="min-w-0">
                                <h4 className="font-black text-slate-800 text-xs sm:text-sm tracking-tight truncate">
                                  {m.titulo}
                                </h4>
                                <p className="text-[11px] text-slate-500 font-medium truncate">
                                  {m.artista || 'Geral'}
                                </p>
                              </div>
                            </div>

                            {/* Tom e Momento */}
                            <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                              <span className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-black text-[11px]">
                                Tom: {m.tom || 'N/A'}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${m.tipo === 'Celebração'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : m.tipo === 'Pós pregação'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : 'bg-blue-50 text-blue-700 border-blue-200'
                                  }`}
                              >
                                {m.tipo || 'Adoração'}
                              </span>
                            </div>
                          </div>

                          {/* Linha secundária: Pasta e Observação */}
                          <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-slate-100 text-[11px]">
                            <div className="flex items-center gap-2 flex-wrap">
                              {pastaNome && (
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${isMasculino
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : isFeminino
                                      ? 'bg-pink-50 text-pink-700 border-pink-200'
                                      : 'bg-slate-50 text-slate-600 border-slate-200'
                                    }`}
                                >
                                  📁 {pastaNome}
                                </span>
                              )}
                              {m.bpm && (
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  {m.bpm} BPM
                                </span>
                              )}
                            </div>

                            {/* Links rápidos para áudio ou cifra */}
                            {(m.link || musicaOriginal?.link) && (
                              <a
                                href={m.link || musicaOriginal?.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline ml-auto"
                              >
                                <ExternalLink size={10} />
                                <span>Ouvir / Cifra</span>
                              </a>
                            )}
                          </div>

                          {m.observacao && (
                            <div className="text-[11px] text-slate-600 bg-amber-50/70 border border-amber-200/80 px-2.5 py-1 rounded-lg italic flex items-center gap-1.5">
                              <Info size={11} className="text-amber-600 shrink-0" />
                              <span>{m.observacao}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Observações Gerais */}
                  {repModalVisualizado.observacoes_gerais && (
                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Observações Gerais do Culto
                      </span>
                      <p className="text-xs text-slate-700 font-medium whitespace-pre-line">
                        {repModalVisualizado.observacoes_gerais}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Rodapé Fixo do Modal com Ações */}
            <div className="p-3.5 sm:p-4 bg-white border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
              {/* Botão WhatsApp em destaque */}
              <button
                type="button"
                onClick={() => enviarWhatsAppCulto(modalVisualizarCulto, repModalVisualizado)}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition cursor-pointer"
                title="Enviar repertório diretamente para o WhatsApp"
              >
                <IconWhatsApp size={16} />
                <span>Enviar no WhatsApp</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => {
                    selecionarEvento(modalVisualizarCulto.id);
                    setSubAbaMobileCultos('editor');
                    setModalVisualizarCulto(null);
                  }}
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <Pencil size={13} />
                  <span>Editar Repertório</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalVisualizarCulto(null)}
                  className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL INSTRUÇÕES DO BANCO DE DADOS (SUPABASE) ── */}
      {modalSqlAberto && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="bg-slate-900 p-5 text-white flex justify-between items-start shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-500/30">
                  <Save size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-black text-base">Salvar Músicas, Pastas e Repertório no Banco de Dados</h3>
                  <p className="text-xs text-slate-400">Criar tabelas no Supabase (Dashboard &gt; SQL Editor)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalSqlAberto(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 space-y-2">
                <p className="font-bold text-sm flex items-center gap-2">
                  <span>ℹ️</span> Instruções Rápidas:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-amber-800 leading-relaxed font-medium">
                  <li>Acesse o painel do seu projeto no <strong>Supabase</strong>.</li>
                  <li>No menu lateral esquerdo, clique em <strong>SQL Editor</strong>.</li>
                  <li>Cole o código SQL abaixo e clique no botão <strong>Run</strong> (Executar).</li>
                  <li>Volte aqui e clique em <strong>Verificar Conexão</strong> para ativar a sincronização na nuvem!</li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Código SQL de Criação</span>
                  <span className="text-[10px] text-slate-400">Arquivo salvo em: supabase/add-tabelas-repertorio-louvor.sql</span>
                </div>
                <pre className="bg-slate-950 text-emerald-400 p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-56 leading-relaxed border border-slate-800 select-all">
                  {`-- MIB CHURCH - TABELAS DE REPERTÓRIO, BIBLIOTECAS E MÚSICAS
CREATE TABLE IF NOT EXISTS public.repertorio_bibliotecas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT,
    cor TEXT DEFAULT '#3b82f6',
    tipo TEXT DEFAULT 'Geral',
    voz TEXT DEFAULT 'Misto',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.repertorio_musicas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    artista TEXT,
    tipo TEXT NOT NULL DEFAULT 'Adoração',
    biblioteca TEXT DEFAULT 'Geral',
    biblioteca_id UUID REFERENCES public.repertorio_bibliotecas(id) ON DELETE SET NULL,
    voz TEXT DEFAULT 'Misto',
    tom TEXT,
    bpm TEXT,
    link TEXT,
    observacoes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.repertorio_cultos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evento_id TEXT NOT NULL,
    tema_culto TEXT,
    observacoes_gerais TEXT,
    musicas JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT uq_repertorio_cultos_evento UNIQUE (evento_id)
);

ALTER TABLE public.repertorio_bibliotecas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repertorio_musicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repertorio_cultos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "repertorio_bibliotecas_all" ON public.repertorio_bibliotecas FOR ALL TO authenticated, anon USING (true) WITH CHECK (true);
CREATE POLICY "repertorio_musicas_all" ON public.repertorio_musicas FOR ALL TO authenticated, anon USING (true) WITH CHECK (true);
CREATE POLICY "repertorio_cultos_all" ON public.repertorio_cultos FOR ALL TO authenticated, anon USING (true) WITH CHECK (true);

INSERT INTO public.repertorio_bibliotecas (nome, descricao, cor, tipo, voz) VALUES
  ('Celebração Feminina', 'Músicas animadas de celebração com tons adaptados para vocal feminino', '#ec4899', 'Celebração', 'Feminino'),
  ('Celebração Masculina', 'Músicas animadas de celebração com tons adaptados para vocal masculino', '#2563eb', 'Celebração', 'Masculino'),
  ('Adoração Feminina', 'Músicas de adoração e quebrantamento congregacional em tons femininos', '#a855f7', 'Adoração', 'Feminino'),
  ('Adoração Masculina', 'Músicas de adoração e quebrantamento congregacional em tons masculinos', '#1d4ed8', 'Adoração', 'Masculino'),
  ('Pós Pregação', 'Músicas de resposta à palavra, ministração e apelo', '#f59e0b', 'Pós pregação', 'Misto')
ON CONFLICT (nome) DO NOTHING;`}
                </pre>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const sql = `-- MIB CHURCH - TABELAS DE REPERTÓRIO, BIBLIOTECAS E MÚSICAS\nCREATE TABLE IF NOT EXISTS public.repertorio_bibliotecas (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    nome TEXT NOT NULL UNIQUE,\n    descricao TEXT,\n    cor TEXT DEFAULT '#3b82f6',\n    tipo TEXT DEFAULT 'Geral',\n    voz TEXT DEFAULT 'Misto',\n    created_at TIMESTAMPTZ DEFAULT now(),\n    updated_at TIMESTAMPTZ DEFAULT now()\n);\n\nCREATE TABLE IF NOT EXISTS public.repertorio_musicas (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    titulo TEXT NOT NULL,\n    artista TEXT,\n    tipo TEXT NOT NULL DEFAULT 'Adoração',\n    biblioteca TEXT DEFAULT 'Geral',\n    biblioteca_id UUID REFERENCES public.repertorio_bibliotecas(id) ON DELETE SET NULL,\n    voz TEXT DEFAULT 'Misto',\n    tom TEXT,\n    bpm TEXT,\n    link TEXT,\n    observacoes TEXT,\n    created_at TIMESTAMPTZ DEFAULT now(),\n    updated_at TIMESTAMPTZ DEFAULT now()\n);\n\nCREATE TABLE IF NOT EXISTS public.repertorio_cultos (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    evento_id TEXT NOT NULL,\n    tema_culto TEXT,\n    observacoes_gerais TEXT,\n    musicas JSONB NOT NULL DEFAULT '[]'::jsonb,\n    created_at TIMESTAMPTZ DEFAULT now(),\n    updated_at TIMESTAMPTZ DEFAULT now(),\n    CONSTRAINT uq_repertorio_cultos_evento UNIQUE (evento_id)\n);\n\nALTER TABLE public.repertorio_bibliotecas ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.repertorio_musicas ENABLE ROW LEVEL SECURITY;\nALTER TABLE public.repertorio_cultos ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY "repertorio_bibliotecas_all" ON public.repertorio_bibliotecas FOR ALL TO authenticated, anon USING (true) WITH CHECK (true);\nCREATE POLICY "repertorio_musicas_all" ON public.repertorio_musicas FOR ALL TO authenticated, anon USING (true) WITH CHECK (true);\nCREATE POLICY "repertorio_cultos_all" ON public.repertorio_cultos FOR ALL TO authenticated, anon USING (true) WITH CHECK (true);\n\nINSERT INTO public.repertorio_bibliotecas (nome, descricao, cor, tipo, voz) VALUES\n  ('Celebração Feminina', 'Músicas animadas de celebração com tons adaptados para vocal feminino', '#ec4899', 'Celebração', 'Feminino'),\n  ('Celebração Masculina', 'Músicas animadas de celebração com tons adaptados para vocal masculino', '#2563eb', 'Celebração', 'Masculino'),\n  ('Adoração Feminina', 'Músicas de adoração e quebrantamento congregacional em tons femininos', '#a855f7', 'Adoração', 'Feminino'),\n  ('Adoração Masculina', 'Músicas de adoração e quebrantamento congregacional em tons masculinos', '#1d4ed8', 'Adoração', 'Masculino'),\n  ('Pós Pregação', 'Músicas de resposta à palavra, ministração e apelo', '#f59e0b', 'Pós pregação', 'Misto')\nON CONFLICT (nome) DO NOTHING;`;
                  navigator.clipboard.writeText(sql);
                  setCopiadoSql(true);
                  setTimeout(() => setCopiadoSql(false), 3000);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer shadow-sm"
              >
                {copiadoSql ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiadoSql ? 'Código SQL Copiado!' : 'Copiar Código SQL'}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={async () => {
                    await carregarTudo();
                    const st = await repertorioService.verificarConexaoBanco();
                    if (st.conectado) {
                      mostrarToast('Banco de Dados Conectado com sucesso!');
                      setModalSqlAberto(false);
                    } else {
                      mostrarToast('Tabelas ainda não detectadas. Verifique se clicou em Run no Supabase.');
                    }
                  }}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition active:scale-95 cursor-pointer"
                >
                  Verificar Conexão
                </button>
                <button
                  type="button"
                  onClick={() => setModalSqlAberto(false)}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
