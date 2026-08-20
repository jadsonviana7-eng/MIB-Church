import { useEffect, useState, useMemo } from 'react';
import { Calendar, Plus, X, Search, Check, AlertCircle, Share2, Printer, CheckCircle, XCircle, Trash2, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import { escalasService } from './services/escalasService';
import { autoEscalaService } from './services/autoEscalaService';
import { supabase } from '../supabaseClient';
import { toPng } from 'html-to-image';

export default function EscalasMinisteriais({ 
  membroLogado, 
  isLiderMinisterio,
  initialFiltroMinisterioId = null,
  initialStatus = null,
  initialFiltroMes = null,
  initialFiltroAno = null
}) {
  const [eventos, setEventos] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [escalas, setEscalas] = useState([]);
  const [minhasEscalas, setMinhasEscalas] = useState([]);

  // Modais e Estados de Criação
  const [modalEvento, setModalEvento] = useState(false);
  const [novoEvento, setNovoEvento] = useState({
    titulo: '',
    descricao: '',
    local: '',
    data_evento: '',
    data_fim: ''
  });
  const [salvando, setSalvando] = useState(false);

  const [modalEscala, setModalEscala] = useState(false);
  const [novaEscala, setNovaEscala] = useState({
    ministerio_id: '',
    funcao_id: '',
    pessoa_id: ''
  });

  const [listaMinisterios, setListaMinisterios] = useState([]);
  const [listaFuncoes, setListaFuncoes] = useState([]);
  const [listaPessoas, setListaPessoas] = useState([]); // Membros do ministério selecionado
  const [buscaVoluntario, setBuscaVoluntario] = useState('');
  const [voluntarioSelecionado, setVoluntarioSelecionado] = useState(null);
  const [atribuicoesModal, setAtribuicoesModal] = useState({}); // { [funcao_id]: pessoa_id }
  const [salvandoEscalasMultiplas, setSalvandoEscalasMultiplas] = useState(false);

  const [notificacao, setNotificacao] = useState('');
  const [modalConflito, setModalConflito] = useState(null); // { pessoaNome, ministerioNome, eventoTitulo }
  const [modalAvisoMinisterio, setModalAvisoMinisterio] = useState(false);

  // Suporte ao botão voltar do celular para fechar o modal de conflito
  useEffect(() => {
    if (modalConflito) {
      try {
        window.history.pushState({ modalConflito: true }, '');
      } catch (e) {}

      const handlePop = () => {
        setModalConflito(null);
      };

      window.addEventListener('popstate', handlePop, { once: true });
      return () => {
        window.removeEventListener('popstate', handlePop);
      };
    }
  }, [modalConflito]);

  // Filtro de Período
  const [filtroMes, setFiltroMes] = useState(() => (initialFiltroMes !== null && initialFiltroMes !== undefined) ? initialFiltroMes : new Date().getMonth());
  const [filtroAno, setFiltroAno] = useState(() => (initialFiltroAno !== null && initialFiltroAno !== undefined) ? initialFiltroAno : new Date().getFullYear());
  const [filtroMinisterioId, setFiltroMinisterioId] = useState(initialFiltroMinisterioId);
  const [filtroStatus, setFiltroStatus] = useState(initialStatus);

  useEffect(() => {
    if (initialFiltroMes !== null && initialFiltroMes !== undefined) setFiltroMes(initialFiltroMes);
    if (initialFiltroAno !== null && initialFiltroAno !== undefined) setFiltroAno(initialFiltroAno);
    if (initialFiltroMinisterioId !== undefined) setFiltroMinisterioId(initialFiltroMinisterioId);
    if (initialStatus !== undefined) setFiltroStatus(initialStatus);
  }, [initialFiltroMes, initialFiltroAno, initialFiltroMinisterioId, initialStatus]);

  // Estado de Edição de Evento
  const [modalEditar, setModalEditar] = useState(false);
  const [eventoEditando, setEventoEditando] = useState({
    id: '',
    titulo: '',
    descricao: '',
    local: '',
    data_evento: '',
    data_fim: ''
  });

  // Estados do Gerador Mensal
  const [modalGerador, setModalGerador] = useState(false);
  const [abaGerador, setAbaGerador] = useState('config'); // 'config' | 'previa'
  const [mesGeracao, setMesGeracao] = useState(() => {
    const hoje = new Date();
    const prox = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 1);
    return prox.getMonth();
  });
  const [anoGeracao, setAnoGeracao] = useState(() => {
    const hoje = new Date();
    const prox = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 1);
    return prox.getFullYear();
  });
  const [localPadrao, setLocalPadrao] = useState('Templo Sede');
  const [cultosPadrao, setCultosPadrao] = useState([
    { id: 1, dayOfWeek: 0, time: '18:00', timeEnd: '20:00', titulo: 'Culto de Celebração' },
    { id: 2, dayOfWeek: 3, time: '19:30', timeEnd: '21:30', titulo: 'Culto de Doutrina' },
    { id: 3, dayOfWeek: 6, time: '19:30', timeEnd: '21:30', titulo: 'Culto dos Jovens' }
  ]);
  const [eventosCustomizados, setEventosCustomizados] = useState([]);
  const [novoCultoPadrao, setNovoCultoPadrao] = useState({
    dayOfWeek: 0,
    time: '18:00',
    timeEnd: '20:00',
    titulo: ''
  });
  const [novoEventoCustom, setNovoEventoCustom] = useState({
    date: '',
    time: '19:30',
    timeEnd: '21:30',
    titulo: '',
    local: '',
    descricao: ''
  });
  const [previaEventos, setPreviaEventos] = useState([]);

  const [modalExportarMensal, setModalExportarMensal] = useState(false);
  const [minExportarId, setMinExportarId] = useState('');
  const [dadosMensaisExportar, setDadosMensaisExportar] = useState([]);
  const [funcoesExportar, setFuncoesExportar] = useState([]);
  const [carregandoExportar, setCarregandoExportar] = useState(false);

  const permissaoLower = membroLogado?.permissao?.toLowerCase() || '';
  const isPerfilRestrito = ['membro', 'lider-celula', 'lider', 'supervisor'].includes(permissaoLower);
  const isMembroNormal = isPerfilRestrito && !isLiderMinisterio;

  const [modalGradeMobile, setModalGradeMobile] = useState(false);

  useEffect(() => {
    carregarEventos();
    carregarMinhasEscalas();
  }, [membroLogado]);

  // Selecionar o primeiro evento do mês ao alterar o filtro
  useEffect(() => {
    const filtrados = eventos.filter(ev => {
      const dataInfo = obterInfoDataBrasilia(ev.data_evento);
      return dataInfo.mesIndex === filtroMes && dataInfo.ano === filtroAno;
    });
    if (filtrados.length > 0) {
      const jaSelecionado = filtrados.find(e => e.id === eventoSelecionado?.id);
      if (!jaSelecionado) {
        selecionarEvento(filtrados[0]);
      }
    } else {
      setEventoSelecionado(null);
      setEscalas([]);
    }
  }, [filtroMes, filtroAno, eventos]);

  function retrocederMes() {
    if (filtroMes === 0) {
      setFiltroMes(11);
      setFiltroAno(prev => prev - 1);
    } else {
      setFiltroMes(prev => prev - 1);
    }
  }

  function avancarMes() {
    if (filtroMes === 11) {
      setFiltroMes(0);
      setFiltroAno(prev => prev + 1);
    } else {
      setFiltroMes(prev => prev + 1);
    }
  }

  async function carregarEventos() {
    try {
      const dados = await escalasService.listarEventos();
      setEventos(dados || []);
      if (dados && dados.length > 0 && !eventoSelecionado) {
        selecionarEvento(dados[0]);
      }
      const mins = await escalasService.listarMinisterios();
      setListaMinisterios(mins || []);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  }

  async function carregarMinhasEscalas() {
    if (!membroLogado?.id) return;
    try {
      const dados = await escalasService.listarEscalasMembro(membroLogado.id);
      // Filtrar apenas escalas pendentes para decisão do voluntário
      setMinhasEscalas(dados || []);
    } catch (error) {
      console.error('Erro ao carregar minhas escalas:', error);
    }
  }

  async function selecionarEvento(evento, fromUserClick = false) {
    setEventoSelecionado(evento);
    try {
      const lista = await escalasService.listarEscalas(evento.id);
      setEscalas(lista || []);
      if (fromUserClick && window.innerWidth < 1024) {
        setModalGradeMobile(true);
      }
    } catch (error) {
      console.error('Erro ao carregar escalas:', error);
    }
  }

  // Auxiliares para extração de horário de término e formatação (UTC-3 / Brasília)
  function parseDatabaseDate(str) {
    if (!str) return null;
    if (!str.includes('Z') && !str.match(/[+-]\d{2}(:?\d{2})?$/)) {
      const clean = str.trim().replace(' ', 'T');
      return new Date(clean + 'Z');
    }
    return new Date(str);
  }

  function obterInfoDataBrasilia(isoString) {
    if (!isoString) return { diaNum: '01', diaSemanaIndex: 0, mesIndex: 0, ano: 2026 };
    try {
      const date = parseDatabaseDate(isoString);
      const bDate = new Date(date.getTime() - 3 * 3600 * 1000);
      return {
        diaNum: String(bDate.getUTCDate()).padStart(2, '0'),
        diaSemanaIndex: bDate.getUTCDay(),
        mesIndex: bDate.getUTCMonth(),
        ano: bDate.getUTCFullYear()
      };
    } catch (e) {
      return { diaNum: '01', diaSemanaIndex: 0, mesIndex: 0, ano: 2026 };
    }
  }

  function extrairHoraFim(evento) {
    if (evento.data_fim) {
      return parseDatabaseDate(evento.data_fim);
    }
    if (evento.descricao) {
      const match = evento.descricao.match(/\[FIM:(.+?)\]/);
      if (match) {
        try {
          return parseDatabaseDate(match[1]);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  function obterDescricaoSemFim(descricao) {
    if (!descricao) return '';
    return descricao.replace(/\[FIM:(.+?)\]/, '').trim();
  }

  function obterHoraExibicao(ev) {
    if (!ev || !ev.data_evento) return '';
    const dataInicio = parseDatabaseDate(ev.data_evento);
    const dataFim = extrairHoraFim(ev);

    const formatarHora = (d) => {
      const bDate = new Date(d.getTime() - 3 * 3600 * 1000);
      const hh = String(bDate.getUTCHours()).padStart(2, '0');
      const mm = String(bDate.getUTCMinutes()).padStart(2, '0');
      return `${hh}:${mm}`;
    };

    const horaInicioStr = formatarHora(dataInicio);
    if (dataFim) {
      const horaFimStr = formatarHora(dataFim);
      return `${horaInicioStr} - ${horaFimStr}`;
    }
    return horaInicioStr;
  }

  function formatarParaInputDateTime(dateInput) {
    if (!dateInput) return '';
    try {
      const date = parseDatabaseDate(dateInput);
      const bDate = new Date(date.getTime() - 3 * 3600 * 1000);

      const YYYY = bDate.getUTCFullYear();
      const MM = String(bDate.getUTCMonth() + 1).padStart(2, '0');
      const DD = String(bDate.getUTCDate()).padStart(2, '0');
      const hh = String(bDate.getUTCHours()).padStart(2, '0');
      const mm = String(bDate.getUTCMinutes()).padStart(2, '0');
      return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
    } catch (e) {
      return '';
    }
  }

  function parseInputDateTime(str) {
    if (!str) return null;
    if (str.includes('Z') || str.match(/[+-]\d{2}(:?\d{2})?$/)) {
      return new Date(str);
    }
    try {
      const cleanStr = str.replace(' ', 'T');
      const date = new Date(cleanStr + 'Z'); // parse as UTC
      if (isNaN(date.getTime())) return new Date(str);
      const utcTime = date.getTime() + 3 * 3600 * 1000;
      return new Date(utcTime);
    } catch (e) {
      return new Date(str);
    }
  }

  function obterCorDiaSemana(diaSemanaIndex) {
    switch (diaSemanaIndex) {
      case 0:
        return {
          bgHeader: 'bg-rose-600',
          textHeader: 'text-white',
          border: 'border-rose-100 shadow-rose-50/50',
          bgBody: 'bg-rose-50/20'
        };
      case 3:
        return {
          bgHeader: 'bg-emerald-600',
          textHeader: 'text-white',
          border: 'border-emerald-100 shadow-emerald-50/50',
          bgBody: 'bg-emerald-50/20'
        };
      case 4:
        return {
          bgHeader: 'bg-amber-600',
          textHeader: 'text-white',
          border: 'border-amber-100 shadow-amber-50/50',
          bgBody: 'bg-amber-50/20'
        };
      case 6:
        return {
          bgHeader: 'bg-indigo-600',
          textHeader: 'text-white',
          border: 'border-indigo-100 shadow-indigo-50/50',
          bgBody: 'bg-indigo-50/20'
        };
      default:
        return {
          bgHeader: 'bg-slate-500',
          textHeader: 'text-white',
          border: 'border-slate-100 shadow-slate-50/50',
          bgBody: 'bg-slate-50/20'
        };
    }
  }

  async function executarCriarEvento(payload) {
    try {
      return await escalasService.criarEvento(payload);
    } catch (error) {
      const erroColuna = error.code === 'PGRST204' || (error.message && error.message.includes('data_fim'));
      if (erroColuna) {
        const { data_fim, ...rest } = payload;
        const descricaoComFim = data_fim ? `${rest.descricao || ''} [FIM:${data_fim}]`.trim() : rest.descricao;
        return await escalasService.criarEvento({
          ...rest,
          descricao: descricaoComFim
        });
      }
      throw error;
    }
  }

  async function executarCriarEventosEmLote(payloads) {
    try {
      return await escalasService.criarEventosEmLote(payloads);
    } catch (error) {
      const erroColuna = error.code === 'PGRST204' || (error.message && error.message.includes('data_fim'));
      if (erroColuna) {
        const novosPayloads = payloads.map(p => {
          const { data_fim, ...rest } = p;
          const descricaoComFim = data_fim ? `${rest.descricao || ''} [FIM:${data_fim}]`.trim() : rest.descricao;
          return { ...rest, descricao: descricaoComFim };
        });
        return await escalasService.criarEventosEmLote(novosPayloads);
      }
      throw error;
    }
  }

  async function executarAtualizarEvento(id, payload) {
    try {
      return await escalasService.atualizarEvento(id, payload);
    } catch (error) {
      const erroColuna = error.code === 'PGRST204' || (error.message && error.message.includes('data_fim'));
      if (erroColuna) {
        const { data_fim, ...rest } = payload;
        const descricaoComFim = data_fim ? `${rest.descricao || ''} [FIM:${data_fim}]`.trim() : rest.descricao;
        return await escalasService.atualizarEvento(id, {
          ...rest,
          descricao: descricaoComFim
        });
      }
      throw error;
    }
  }

  async function salvarEvento() {
    if (!novoEvento.titulo || !novoEvento.data_evento) {
      alert("Preencha o título e a data.");
      return;
    }
    setSalvando(true);
    try {
      const parsedInicio = parseInputDateTime(novoEvento.data_evento);
      const parsedFim = novoEvento.data_fim ? parseInputDateTime(novoEvento.data_fim) : null;
      const payload = {
        titulo: novoEvento.titulo,
        local: novoEvento.local,
        descricao: novoEvento.descricao,
        data_evento: parsedInicio.toISOString(),
        data_fim: parsedFim ? parsedFim.toISOString() : null
      };
      await executarCriarEvento(payload);
      setModalEvento(false);
      setNovoEvento({ titulo: '', descricao: '', local: '', data_evento: '', data_fim: '' });
      carregarEventos();
    } catch (error) {
      alert("Erro ao salvar evento: " + error.message);
    } finally {
      setSalvando(false);
    }
  }

  // Lógica do Gerador Mensal em Lote
  function calcularPreviaEventos() {
    const totalDays = new Date(anoGeracao, Number(mesGeracao) + 1, 0).getDate();
    const lista = [];

    // 1. Gerar os cultos semanais padrão
    for (let day = 1; day <= totalDays; day++) {
      const dataObj = new Date(anoGeracao, Number(mesGeracao), day);
      const dayOfWeek = dataObj.getDay();

      const configs = cultosPadrao.filter(c => Number(c.dayOfWeek) === dayOfWeek);
      configs.forEach(config => {
        const [hours, minutes] = config.time.split(':').map(Number);

        // Criar data no fuso Brasília (UTC-3)
        const dataEvento = new Date(Date.UTC(anoGeracao, Number(mesGeracao), day, hours + 3, minutes));

        let dataFim = null;
        if (config.timeEnd) {
          const [endHours, endMinutes] = config.timeEnd.split(':').map(Number);
          const dataFimObj = new Date(Date.UTC(anoGeracao, Number(mesGeracao), day, endHours + 3, endMinutes));
          if (dataFimObj < dataEvento) {
            dataFimObj.setUTCDate(dataFimObj.getUTCDate() + 1);
          }
          dataFim = dataFimObj.toISOString();
        }

        lista.push({
          id_temp: `padrao-${day}-${config.id}`,
          titulo: config.titulo,
          data_evento: dataEvento.toISOString(),
          data_fim: dataFim,
          local: localPadrao || 'Templo Sede',
          descricao: 'Culto semanal regular.',
          incluir: true,
          isCustom: false
        });
      });
    }

    // 2. Adicionar os eventos customizados do mês
    eventosCustomizados.forEach((evt, idx) => {
      if (evt.date && evt.titulo) {
        const [y, m, d] = evt.date.split('-').map(Number);
        const [hours, minutes] = evt.time.split(':').map(Number);

        const dataEvento = new Date(Date.UTC(y, m - 1, d, hours + 3, minutes));

        let dataFim = null;
        if (evt.timeEnd) {
          const [endHours, endMinutes] = evt.timeEnd.split(':').map(Number);
          const dataFimObj = new Date(Date.UTC(y, m - 1, d, endHours + 3, endMinutes));
          if (dataFimObj < dataEvento) {
            dataFimObj.setUTCDate(dataFimObj.getUTCDate() + 1);
          }
          dataFim = dataFimObj.toISOString();
        }

        lista.push({
          id_temp: `custom-${evt.id || idx}`,
          titulo: evt.titulo,
          data_evento: dataEvento.toISOString(),
          data_fim: dataFim,
          local: evt.local || localPadrao || 'Templo Sede',
          descricao: evt.descricao || 'Programação especial.',
          incluir: true,
          isCustom: true
        });
      }
    });

    lista.sort((a, b) => new Date(a.data_evento) - new Date(b.data_evento));
    setPreviaEventos(lista);
    setAbaGerador('previa');
  }

  function adicionarCultoPadrao() {
    if (!novoCultoPadrao.titulo.trim()) {
      alert('Digite o título do culto padrão.');
      return;
    }
    setCultosPadrao(prev => [
      ...prev,
      {
        id: Date.now(),
        dayOfWeek: Number(novoCultoPadrao.dayOfWeek),
        time: novoCultoPadrao.time,
        timeEnd: novoCultoPadrao.timeEnd || '20:00',
        titulo: novoCultoPadrao.titulo.trim()
      }
    ]);
    setNovoCultoPadrao(prev => ({ ...prev, titulo: '', time: '18:00', timeEnd: '20:00' }));
  }

  function removerCultoPadrao(id) {
    setCultosPadrao(prev => prev.filter(c => c.id !== id));
  }

  function adicionarEventoCustomizado() {
    if (!novoEventoCustom.titulo.trim() || !novoEventoCustom.date) {
      alert('Preencha a data e o título do evento especial.');
      return;
    }
    setEventosCustomizados(prev => [
      ...prev,
      {
        ...novoEventoCustom,
        id: Date.now()
      }
    ]);
    setNovoEventoCustom({
      date: '',
      time: '19:30',
      timeEnd: '21:30',
      titulo: '',
      local: '',
      descricao: ''
    });
  }

  function removerEventoCustomizado(id) {
    setEventosCustomizados(prev => prev.filter(e => e.id !== id));
  }

  function toggleInclusaoPrevia(idTemp) {
    setPreviaEventos(prev =>
      prev.map(item =>
        item.id_temp === idTemp ? { ...item, incluir: !item.incluir } : item
      )
    );
  }

  function formatarDataHoraLocal(isoString, dataFimIso = null) {
    const dataInfo = obterInfoDataBrasilia(isoString);
    const nomesDias = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const diaSemana = nomesDias[dataInfo.diaSemanaIndex];

    const formatarHora = (dStr) => {
      const d = parseDatabaseDate(dStr);
      const bDate = new Date(d.getTime() - 3 * 3600 * 1000);
      const hh = String(bDate.getUTCHours()).padStart(2, '0');
      const mm = String(bDate.getUTCMinutes()).padStart(2, '0');
      return `${hh}:${mm}`;
    };

    const dataStr = `${diaSemana}, ${dataInfo.diaNum}/${String(dataInfo.mesIndex + 1).padStart(2, '0')} às ${formatarHora(isoString)}`;
    if (dataFimIso) {
      return `${dataStr} - ${formatarHora(dataFimIso)}`;
    }
    return dataStr;
  }

  async function salvarEventosLote() {
    const payloads = previaEventos
      .filter(item => item.incluir)
      .map(item => ({
        titulo: item.titulo,
        data_evento: item.data_evento,
        data_fim: item.data_fim || null,
        local: item.local,
        descricao: item.descricao
      }));

    if (payloads.length === 0) {
      alert('Selecione pelo menos um evento para salvar.');
      return;
    }

    setSalvando(true);
    try {
      await executarCriarEventosEmLote(payloads);
      setModalGerador(false);
      setEventosCustomizados([]);
      setPreviaEventos([]);
      mostrarToast(`✓ Sucesso! ${payloads.length} eventos foram gerados para o mês.`);
      carregarEventos();
    } catch (error) {
      alert('Erro ao gerar eventos em lote: ' + error.message);
    } finally {
      setSalvando(false);
    }
  }

  async function excluirEventoAtual() {
    if (!eventoSelecionado) return;
    const confirmou = await window.confirmModal(
      'Excluir Evento',
      `Deseja realmente excluir o evento "${eventoSelecionado.titulo}"? Esta ação removerá permanentemente todas as escalas vinculadas a ele.`
    );
    if (!confirmou) return;

    try {
      await escalasService.excluirEvento(eventoSelecionado.id);
      mostrarToast('✓ Evento excluído com sucesso!');

      const novosEventos = await escalasService.listarEventos();
      setEventos(novosEventos || []);

      const filtrados = (novosEventos || []).filter(ev => {
        const data = new Date(ev.data_evento);
        return data.getMonth() === filtroMes && data.getFullYear() === filtroAno;
      });
      if (filtrados.length > 0) {
        setEventoSelecionado(filtrados[0]);
        const lista = await escalasService.listarEscalas(filtrados[0].id);
        setEscalas(lista || []);
      } else {
        setEventoSelecionado(null);
        setEscalas([]);
      }
    } catch (error) {
      alert('Erro ao excluir evento: ' + error.message);
    }
  }

  function abrirModalEditar(evento) {
    const dataFimObj = extrairHoraFim(evento);
    setEventoEditando({
      id: evento.id,
      titulo: evento.titulo,
      descricao: obterDescricaoSemFim(evento.descricao),
      local: evento.local || '',
      data_evento: formatarParaInputDateTime(evento.data_evento),
      data_fim: dataFimObj ? formatarParaInputDateTime(dataFimObj.toISOString()) : ''
    });
    setModalEditar(true);
  }

  async function salvarEdicaoEvento() {
    if (!eventoEditando.titulo || !eventoEditando.data_evento) {
      alert("Preencha o título e a data.");
      return;
    }
    setSalvando(true);
    try {
      const parsedInicio = parseInputDateTime(eventoEditando.data_evento);
      const parsedFim = eventoEditando.data_fim ? parseInputDateTime(eventoEditando.data_fim) : null;
      const payload = {
        titulo: eventoEditando.titulo,
        local: eventoEditando.local,
        descricao: eventoEditando.descricao,
        data_evento: parsedInicio.toISOString(),
        data_fim: parsedFim ? parsedFim.toISOString() : null
      };

      const eventoAtualizado = await executarAtualizarEvento(eventoEditando.id, payload);
      setModalEditar(false);
      mostrarToast('✓ Evento atualizado com sucesso!');

      const novosEventos = await escalasService.listarEventos();
      setEventos(novosEventos || []);

      const atualizadoNaLista = novosEventos.find(e => e.id === eventoEditando.id);
      if (atualizadoNaLista) {
        setEventoSelecionado(atualizadoNaLista);
      } else {
        selecionarEvento(eventoAtualizado);
      }
    } catch (error) {
      alert("Erro ao atualizar evento: " + error.message);
    } finally {
      setSalvando(false);
    }
  }

  // Carregar dados auxiliares ao abrir modal de escalar
  async function abrirModalEscala(ministerioId = null) {
    if (!eventoSelecionado) return;
    try {
      const mins = await escalasService.listarMinisterios();
      setListaMinisterios(mins || []);
      setModalEscala(true);
      if (ministerioId) {
        handleSelecionarMinisterio(ministerioId);
      } else {
        setNovaEscala({ ministerio_id: '', funcao_id: '', pessoa_id: '' });
      }
    } catch (error) {
      console.error('Erro ao carregar ministérios:', error);
    }
  }

  async function handleSelecionarMinisterio(ministerioId) {
    setNovaEscala(prev => ({ ...prev, ministerio_id: ministerioId, funcao_id: '', pessoa_id: '' }));
    setVoluntarioSelecionado(null);
    setBuscaVoluntario('');
    setAtribuicoesModal({});

    if (!ministerioId) {
      setListaFuncoes([]);
      setListaPessoas([]);
      return;
    }
    try {
      const funcs = await escalasService.listarFuncoes(ministerioId);
      setListaFuncoes(funcs || []);

      let pms = await escalasService.listarPessoasMinisterio(ministerioId);
      if (!pms || pms.length === 0) {
        const { data: todasp } = await supabase.from('pessoas').select('id, nome').order('nome');
        pms = (todasp || []).map(p => ({ pessoa_id: p.id, pessoas: p }));
      }
      setListaPessoas(pms || []);

      // Pré-carregar atribuições já existentes no evento para este ministério
      const jaEscalados = escalas.filter(e => String(e.ministerio_id) === String(ministerioId));
      const mapaInicial = {};
      jaEscalados.forEach(e => {
        if (e.funcao_id && e.pessoa_id) {
          mapaInicial[e.funcao_id] = String(e.pessoa_id);
        }
      });
      setAtribuicoesModal(mapaInicial);
    } catch (error) {
      console.error('Erro ao carregar funções/pessoas:', error);
    }
  }

  async function salvarEscalasMultiplas() {
    if (!novaEscala.ministerio_id || !eventoSelecionado) return;
    setSalvandoEscalasMultiplas(true);

    try {
      const minId = novaEscala.ministerio_id;
      const jaEscalados = escalas.filter(e => String(e.ministerio_id) === String(minId));
      const jaEscaladosPorFuncao = {};
      jaEscalados.forEach(e => {
        if (e.funcao_id) {
          jaEscaladosPorFuncao[e.funcao_id] = e;
        }
      });

      for (const funcao of listaFuncoes) {
        const novaPessoaId = atribuicoesModal[funcao.id];
        const itemExistente = jaEscaladosPorFuncao[funcao.id];

        if (novaPessoaId && novaPessoaId !== '') {
          if (!itemExistente) {
            await escalasService.adicionarEscala({
              evento_id: eventoSelecionado.id,
              ministerio_id: minId,
              funcao_id: funcao.id,
              pessoa_id: novaPessoaId,
              status: 'pendente'
            });
          } else if (String(itemExistente.pessoa_id) !== String(novaPessoaId)) {
            await supabase
              .from('escalas')
              .update({ pessoa_id: novaPessoaId })
              .eq('id', itemExistente.id);
          }
        } else if (itemExistente) {
          await escalasService.excluirEscala(itemExistente.id);
        }
      }

      fecharModalEscala();
      await selecionarEvento(eventoSelecionado);
      mostrarToast('✓ Escala do ministério salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar escalas do ministério:', error);
      if (error.conflito || error.message?.includes('ESTA_PESSOA_JA_ESCALADA')) {
        let conflitoObj = error.conflito;
        if (!conflitoObj && error.message) {
          const parts = error.message.split('::');
          conflitoObj = {
            pessoaNome: parts[1] || 'Esta pessoa',
            ministerioNome: parts[2] || 'outro ministério',
            eventoTitulo: parts[3] || eventoSelecionado?.titulo || 'este evento'
          };
        }
        setModalConflito(conflitoObj);
      } else {
        alert('Erro ao salvar escala: ' + error.message);
      }
    } finally {
      setSalvandoEscalasMultiplas(false);
    }
  }

  async function adicionarEscala() {
    if (!novaEscala.ministerio_id || !novaEscala.funcao_id || !voluntarioSelecionado) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      await escalasService.adicionarEscala({
        evento_id: eventoSelecionado.id,
        ministerio_id: novaEscala.ministerio_id,
        funcao_id: novaEscala.funcao_id,
        pessoa_id: voluntarioSelecionado.pessoa_id,
        status: 'pendente'
      });
      fecharModalEscala();
      selecionarEvento(eventoSelecionado);
      mostrarToast('✓ Voluntário escalado com sucesso!');
    } catch (error) {
      if (error.conflito || error.message?.includes('ESTA_PESSOA_JA_ESCALADA')) {
        let conflitoObj = error.conflito;
        if (!conflitoObj && error.message) {
          const parts = error.message.split('::');
          conflitoObj = {
            pessoaNome: parts[1] || voluntarioSelecionado?.pessoas?.nome || 'Esta pessoa',
            ministerioNome: parts[2] || 'outro ministério',
            eventoTitulo: parts[3] || eventoSelecionado?.titulo || 'este evento'
          };
        }
        setModalConflito(conflitoObj);
        return;
      }
      console.error('Erro ao escalar voluntário:', error);
      alert('Erro ao escalar: ' + error.message);
    }
  }

  async function excluirEscala(id) {
    if (!(await window.confirmModal('Remover Voluntário', 'Remover voluntário da escala?'))) return;
    try {
      await escalasService.excluirEscala(id);
      selecionarEvento(eventoSelecionado);
      mostrarToast('Voluntário removido da escala.');
    } catch (error) {
      console.error('Erro ao remover escala:', error);
    }
  }

  async function handleMudarFardamentoDia(ministerioId, fardamentoNome) {
    if (!eventoSelecionado) return;

    try {
      const fardamentosAtuais = eventoSelecionado.fardamentos || {};
      const novosFardamentos = { ...fardamentosAtuais, [ministerioId]: fardamentoNome };

      const { data, error } = await supabase
        .from('eventos_ministeriais')
        .update({ fardamentos: novosFardamentos })
        .eq('id', eventoSelecionado.id)
        .select()
        .single();

      if (error) throw error;

      setEventoSelecionado(data);
      setEventos(prev => prev.map(e => e.id === data.id ? data : e));
      mostrarToast('✓ Fardamento do dia atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar fardamento do dia:', error);
      alert('Erro ao salvar fardamento: ' + error.message);
    }
  }

  async function preencherAutoEscalaModal(minIdParam) {
    const minId = minIdParam || novaEscala.ministerio_id;
    if (!minId) {
      setModalAvisoMinisterio(true);
      return;
    }
    if (!eventoSelecionado) return;

    setSalvandoEscalasMultiplas(true);
    try {
      mostrarToast('⚡ Gerando sugestões inteligentes...');
      const sugestoes = await autoEscalaService.obterSugestoes({
        eventoId: eventoSelecionado.id,
        ministerioId: minId
      });

      if (!sugestoes || sugestoes.length === 0) {
        mostrarToast('AutoEscala: nenhum voluntário adicional elegível encontrado.');
        return;
      }

      const novoMapa = { ...atribuicoesModal };
      let cont = 0;
      sugestoes.forEach(s => {
        if (s.funcao_id && s.pessoa_id) {
          novoMapa[s.funcao_id] = String(s.pessoa_id);
          cont++;
        }
      });

      setAtribuicoesModal(novoMapa);
      mostrarToast(`⚡ AutoEscala sugeriu ${cont} voluntário(s)! Revise e clique em Salvar.`);
    } catch (error) {
      console.error('Erro ao preencher AutoEscala no modal:', error);
      mostrarToast('⚠️ Erro na AutoEscala: ' + error.message);
    } finally {
      setSalvandoEscalasMultiplas(false);
    }
  }

  async function rodarAutoEscala(ministerioId) {
    if (!ministerioId) {
      setModalAvisoMinisterio(true);
      return;
    }
    if (!eventoSelecionado) return;
    await abrirModalEscala(ministerioId);
    preencherAutoEscalaModal(ministerioId);
  }

  async function responderEscala(escalaId, status) {
    try {
      await escalasService.atualizarStatusEscala(escalaId, status);
      carregarMinhasEscalas();
      if (eventoSelecionado) {
        selecionarEvento(eventoSelecionado);
      }
      mostrarToast(status === 'confirmado' ? '✓ Presença confirmada!' : 'Escala recusada.');
    } catch (error) {
      console.error('Erro ao responder escala:', error);
    }
  }

  function fecharModalEscala() {
    setModalEscala(false);
    setNovaEscala({ ministerio_id: '', funcao_id: '', pessoa_id: '' });
    setListaFuncoes([]);
    setListaPessoas([]);
    setBuscaVoluntario('');
    setVoluntarioSelecionado(null);
  }

  function mostrarToast(msg) {
    setNotificacao(msg);
    setTimeout(() => setNotificacao(''), 4000);
  }

  // Agrupar escalas do evento atual por ministério
  const escalasAgrupadas = useMemo(() => {
    return escalas.reduce((acc, item) => {
      const minNome = item.ministerios?.nome || 'Sem Ministério';
      if (!acc[minNome]) {
        acc[minNome] = {
          id: item.ministerio_id,
          nome: minNome,
          fardamentos: item.ministerios?.fardamentos || [],
          itens: []
        };
      }
      acc[minNome].itens.push(item);
      return acc;
    }, {});
  }, [escalas]);

  // Filtrar voluntários no modal de escalação
  const voluntáriosFiltrados = useMemo(() => {
    return listaPessoas
      .filter(p => p.pessoas?.nome.toLowerCase().includes(buscaVoluntario.toLowerCase()))
      .slice(0, 5);
  }, [listaPessoas, buscaVoluntario]);

  // Filtrar eventos por período
  const eventosFiltrados = useMemo(() => {
    return eventos.filter(ev => {
      const dataInfo = obterInfoDataBrasilia(ev.data_evento);
      return dataInfo.mesIndex === filtroMes && dataInfo.ano === filtroAno;
    });
  }, [eventos, filtroMes, filtroAno]);

  // Auxiliar para copiar texto e abrir WhatsApp
  async function copiarEAbrirWhatsApp(texto, toastMsg) {
    let copiou = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(texto);
        copiou = true;
      }
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }

    if (!copiou) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copiou = true;
      } catch (_) {}
    }

    try {
      const urlWa = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
      window.open(urlWa, '_blank');
    } catch (_) {}

    mostrarToast(toastMsg);
  }

  // Copiar escala formatada para WhatsApp
  function copiarWhatsApp() {
    if (!eventoSelecionado || escalas.length === 0) {
      mostrarToast('⚠️ Nenhum voluntário escalado para este evento.');
      return;
    }

    const dataInfo = obterInfoDataBrasilia(eventoSelecionado.data_evento);
    const nomesDiasLongos = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const nomesMeses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    const diaSemanaLong = nomesDiasLongos[dataInfo.diaSemanaIndex];
    const mesNome = nomesMeses[dataInfo.mesIndex];

    const dataFormatada = `${diaSemanaLong}, ${Number(dataInfo.diaNum)} de ${mesNome}`;
    const horaFormatada = obterHoraExibicao(eventoSelecionado);

    let texto = `*MIB CHURCH — ESCALA DE VOLUNTÁRIOS*\n`;
    texto += `*EVENTO:* ${eventoSelecionado.titulo.toUpperCase()}\n`;
    texto += `*DATA:* ${dataFormatada} às ${horaFormatada}\n`;
    texto += `*LOCAL:* ${eventoSelecionado.local || 'Templo Sede'}\n\n`;

    Object.entries(escalasAgrupadas).forEach(([minNome, grupo]) => {
      const fardaSel = eventoSelecionado?.fardamentos?.[grupo.id];
      texto += `*${minNome.toUpperCase()}*${fardaSel ? ` _(Farda: ${fardaSel})_` : ''}\n`;
      grupo.itens.forEach(item => {
        const statusIcon = item.status === 'confirmado' ? '🟢' : item.status === 'recusado' ? '🔴' : '🟡';
        texto += ` • _${item.ministerio_funcoes?.nome || 'Função'}:_ *${item.pessoas?.nome}* ${statusIcon}\n`;
      });
      texto += `\n`;
    });

    copiarEAbrirWhatsApp(texto, '✓ Escala copiada e WhatsApp aberto!');
  }

  // Copiar escala de um ministério específico para WhatsApp
  function copiarWhatsAppMinisterio(grupo) {
    if (!eventoSelecionado || !grupo || grupo.itens.length === 0) {
      mostrarToast('⚠️ Nenhum voluntário escalado para este ministério.');
      return;
    }

    const dataInfo = obterInfoDataBrasilia(eventoSelecionado.data_evento);
    const nomesDiasLongos = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const nomesMeses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    const diaSemanaLong = nomesDiasLongos[dataInfo.diaSemanaIndex];
    const mesNome = nomesMeses[dataInfo.mesIndex];

    const dataFormatada = `${diaSemanaLong}, ${Number(dataInfo.diaNum)} de ${mesNome}`;
    const horaFormatada = obterHoraExibicao(eventoSelecionado);

    let texto = `*MIB CHURCH — ESCALA DE VOLUNTÁRIOS*\n`;
    texto += `*EVENTO:* ${eventoSelecionado.titulo.toUpperCase()}\n`;
    texto += `*DATA:* ${dataFormatada} às ${horaFormatada}\n`;
    texto += `*LOCAL:* ${eventoSelecionado.local || 'Templo Sede'}\n\n`;

    const fardaSel = eventoSelecionado?.fardamentos?.[grupo.id];
    texto += `*${grupo.nome.toUpperCase()}*${fardaSel ? ` _(Farda: ${fardaSel})_` : ''}\n`;
    grupo.itens.forEach(item => {
      const statusIcon = item.status === 'confirmado' ? '🟢' : item.status === 'recusado' ? '🔴' : '🟡';
      texto += ` • _${item.ministerio_funcoes?.nome || 'Função'}:_ *${item.pessoas?.nome}* ${statusIcon}\n`;
    });

    copiarEAbrirWhatsApp(texto, `✓ Escala do ${grupo.nome} copiada e WhatsApp aberto!`);
  }

  // Sincroniza dados para a exportação da escala mensal
  useEffect(() => {
    if (!modalExportarMensal || !minExportarId) {
      setDadosMensaisExportar([]);
      setFuncoesExportar([]);
      return;
    }

    async function buscarDadosMensais() {
      setCarregandoExportar(true);
      try {
        const eventIds = eventosFiltrados.map(e => e.id);
        if (eventIds.length === 0) {
          setDadosMensaisExportar([]);
          setFuncoesExportar([]);
          return;
        }
        const dados = await escalasService.listarEscalasMes(eventIds, minExportarId);
        setDadosMensaisExportar(dados || []);

        // Fetch and sort functions of the ministry to ensure fixed order/position
        const funcs = await escalasService.listarFuncoes(minExportarId);
        const funcsOrdenadas = (funcs || []).sort((a, b) => a.nome.localeCompare(b.nome));
        setFuncoesExportar(funcsOrdenadas);
      } catch (error) {
        console.error('Erro ao carregar dados da escala mensal para exportação:', error);
      } finally {
        setCarregandoExportar(false);
      }
    }

    buscarDadosMensais();
  }, [modalExportarMensal, minExportarId, filtroMes, filtroAno, eventosFiltrados]);

  // Exportar PNG da escala mensal
  async function handleExportarMensalPNG(isDownloadOnly = false) {
    if (!minExportarId) return;
    const ministerio = listaMinisterios.find(m => m.id === minExportarId);
    if (!ministerio) return;

    setCarregandoExportar(true);
    const container = document.createElement('div');
    try {
      container.style.cssText = 'position:fixed;left:-9999px;top:0;width:1080px;';
      document.body.appendChild(container);

      const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      const nomesDias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

      const cardsHTML = eventosFiltrados.map((ev) => {
        const dataInfo = obterInfoDataBrasilia(ev.data_evento);
        const diaSemanaStr = nomesDias[dataInfo.diaSemanaIndex];

        // Find volunteers for this event and this ministry
        const atribuicoes = dadosMensaisExportar.filter(item => item.evento_id === ev.id);
        const hasVolunteers = atribuicoes.length > 0;

        const assignmentsHTML = hasVolunteers ? funcoesExportar.map((func) => {
          const item = atribuicoes.find(att => att.funcao_id === func.id);
          const statusIcon = item ? (item.status === 'confirmado' ? '🟢' : item.status === 'recusado' ? '🔴' : '🟡') : '';
          const nomePessoa = item?.pessoas?.nome || '— —';
          return `
            <div style="display:flex; flex-direction:column; gap:2px; text-align:left;">
              <div style="font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em; color:#2563eb; opacity:0.85;">
                ${func.nome}
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:24px; font-weight:800; color:${item ? '#0f172a' : '#94a3b8'}; font-style:${item ? 'normal' : 'italic'};">${nomePessoa}</span>
                ${item ? `<span style="font-size:12px;">${statusIcon}</span>` : ''}
              </div>
            </div>
          `;
        }).join('') : '<div style="font-size:20px; color:#94a3b8; font-style:italic; grid-column:span 2;">Sem voluntários escalados</div>';

        const fardaSel = ev.fardamentos?.[minExportarId];
        const uniformHTML = fardaSel
          ? `<div style="display:flex; align-items:center; gap:6px; margin-top:4px; padding-top:8px; border-top:1px dashed rgba(15, 23, 42, 0.1); font-size:14px; font-weight:800; color:#475569; grid-column: span 2;">
              👕 Farda: ${fardaSel}
             </div>`
          : '';

        return `
          <div style="display:flex; align-items:center; gap:28px; background:rgba(255,255,255,0.96); border-radius:32px; padding:24px 32px; box-shadow:0 12px 35px rgba(0,0,0,0.15); border:1px solid rgba(255,255,255,0.6); width:100%; text-align:left; box-sizing:border-box;">
            <div style="width:110px; height:110px; border-radius:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; box-shadow:0 8px 20px rgba(0,0,0,0.18); flex-shrink:0; background:linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);">
              <span style="font-size:14px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em; opacity:0.8; margin-bottom:2px;">${diaSemanaStr}</span>
              <span style="font-size:50px; font-weight:900; line-height:1;">${dataInfo.diaNum}</span>
            </div>
            <div style="flex-grow:1; display:flex; flex-direction:column; gap:12px; text-align:left;">
              <div style="font-size:20px; font-weight:900; text-transform:uppercase; tracking-wide:1px; color:#0f172a; border-bottom:1px solid rgba(15,23,42,0.08); padding-bottom:4px; display:flex; justify-content:space-between; align-items:center;">
                <span>${ev.titulo}</span>
                <span style="font-size:11px; opacity:0.6; font-weight:700;">⏰ ${obterHoraExibicao(ev)}</span>
              </div>
              <div style="display:grid; gap:14px; grid-template-columns: repeat(2, 1fr); text-align:left;">
                ${assignmentsHTML || '<div style="font-size:20px; color:#94a3b8; font-style:italic; grid-column:span 2;">Sem voluntários escalados</div>'}
                ${uniformHTML}
              </div>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div style="box-sizing:border-box; width:1080px; min-height:1920px; height:auto; padding:56px 48px; font-family:'Montserrat',Arial,sans-serif; display:flex; flex-direction:column; gap:32px; position:relative; overflow:hidden; background:linear-gradient(150deg,#0f172a 0%,#1e1b4b 55%,#311042 100%);">
          <div style="border-radius:40px; padding:48px; display:flex; flex-direction:column; align-items:flex-start; gap:24px; border:1px solid rgba(255,255,255,0.12); box-shadow:0 20px 50px rgba(0,0,0,0.25); background:linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.03) 100%); z-index:2; width:100%; box-sizing:border-box;">
            <div style="font-size:16px; font-weight:900; text-transform:uppercase; letter-spacing:0.2em; padding:10px 24px; border-radius:999px; display:inline-flex; align-items:center; gap:8px; background:#3b82f6; color:#fff; box-shadow:0 4px 12px rgba(0,0,0,0.15);">${ministerio.nome}</div>
            <div style="font-size:96px; font-weight:900; line-height:0.85; letter-spacing:-2px; text-transform:uppercase; margin-top:6px; color:#ffffff; text-shadow:0 4px 16px rgba(0,0,0,0.2);">${MESES[filtroMes].toUpperCase()} ${filtroAno}</div>
          </div>
          <div style="flex:1; border-radius:40px; padding:36px 24px; display:flex; flex-direction:column; gap:24px; border:1px solid rgba(255, 255, 255, 0.12); box-shadow:0 20px 50px rgba(0, 0, 0, 0.2); z-index:2; background:linear-gradient(135deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%); width:100%; box-sizing:border-box;">
            <div style="font-size:18px; font-weight:900; text-transform:uppercase; letter-spacing:0.25em; opacity:0.55; padding:0 12px 12px; border-bottom:2px solid rgba(255, 255, 255, 0.1); margin-bottom:12px; text-align:center; color:rgba(255, 255, 255, 0.7);">Escala Mensal de Voluntários</div>
            ${cardsHTML}
          </div>
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px 0 12px; flex-shrink:0; gap:10px; z-index:2; width:100%; box-sizing:border-box;">
            <img src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/logo_betesda_branca.png" style="height:90px; object-fit:contain; filter:drop-shadow(0 8px 16px rgba(0,0,0,0.15));" crossorigin="anonymous" />
            <div style="font-size:16px; font-weight:900; letter-spacing:0.25em; text-transform:uppercase; opacity:0.6; color:#fff; margin-top:4px;">MIB CHURCH · DEPARTAMENTO DE COMUNICAÇÃO</div>
          </div>
        </div>
      `;

      // Delay to ensure rendering is complete
      await new Promise(resolve => setTimeout(resolve, 300));

      const computedHeight = container.firstElementChild.scrollHeight;
      const imgData = await toPng(container.firstElementChild, { width: 1080, height: computedHeight });

      const link = document.createElement('a');
      link.download = `Escala_Mensal_${ministerio.nome}_${MESES[filtroMes]}_${filtroAno}.png`;
      link.href = imgData;

      if (navigator.share && !isDownloadOnly) {
        const blob = await (await fetch(imgData)).blob();
        const file = new File([blob], link.download, { type: 'image/png' });
        await navigator.share({ files: [file], title: `Escala Mensal - ${ministerio.nome}` }).catch(() => link.click());
      } else {
        link.click();
      }
    } catch (e) {
      console.error('Erro ao gerar PNG da escala mensal:', e);
      alert('Erro ao gerar imagem: ' + e.message);
    } finally {
      document.body.removeChild(container);
      setCarregandoExportar(false);
    }
  }

  return (
    <div className="space-y-6 relative">
      {/* Banner de Filtro Ativo do Dashboard V3 */}
      {(filtroMinisterioId || filtroStatus) && (
        <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 text-xs text-blue-900 font-bold">
            <span className="bg-blue-600 text-white p-1.5 rounded-lg text-[10px]">📌</span>
            <span>
              Filtro ativo do Dashboard V3: {filtroMinisterioId && `Ministério ID #${filtroMinisterioId}`} {filtroStatus && `Status: ${filtroStatus}`}
            </span>
          </div>
          <button
            onClick={() => {
              setFiltroMinisterioId(null);
              setFiltroStatus(null);
            }}
            className="text-xs font-black text-blue-600 hover:text-blue-800 bg-white px-3 py-1.5 rounded-xl border border-blue-200 cursor-pointer shadow-xs"
          >
            ❌ Limpar Filtros
          </button>
        </div>
      )}

      {/* Notificação flutuante */}
      {notificacao && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
          <span className="text-sm font-bold">{notificacao}</span>
        </div>
      )}

      {/* Seção Minhas Escalas (Exclusiva do Voluntário Logado) */}
      {membroLogado?.id && minhasEscalas.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-xs">
          <h3 className="text-sm font-black text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            🔔 Minhas Escalas Pendentes
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {minhasEscalas.map(esc => {
              if (esc.status !== 'pendente') return null;
              const dataInfo = obterInfoDataBrasilia(esc.eventos_ministeriais?.data_evento);
              const dataStr = `${dataInfo.diaNum}/${String(dataInfo.mesIndex + 1).padStart(2, '0')} · ${obterHoraExibicao(esc.eventos_ministeriais)}`;
              return (
                <div key={esc.id} className="bg-white rounded-xl border border-blue-100 p-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {esc.eventos_ministeriais?.titulo}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {esc.ministerios?.nome} · <strong className="text-blue-600 font-bold">{esc.ministerio_funcoes?.nome}</strong>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      📅 {dataStr} · 📍 {esc.eventos_ministeriais?.local || 'Templo Sede'}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
                    <button
                      onClick={() => responderEscala(esc.id, 'confirmado')}
                      className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Check size={12} strokeWidth={3} /> Confirmar
                    </button>
                    <button
                      onClick={() => responderEscala(esc.id, 'recusado')}
                      className="flex-1 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1"
                    >
                      Recusar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid Principal */}
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-3 gap-2 w-full sm:flex sm:items-center sm:gap-2.5 sm:w-auto">
          {!isMembroNormal && (
            <>
              <button
                onClick={() => {
                  setAbaGerador('config');
                  setModalGerador(true);
                }}
                className="flex flex-col sm:flex-row items-center justify-center py-2.5 px-1.5 sm:px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl sm:rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-200/80 transition active:scale-95 cursor-pointer text-center sm:text-left gap-0.5 sm:gap-2"
              >
                <Calendar className="w-5 h-5 sm:w-4 sm:h-4 mb-1 sm:mb-0 shrink-0 text-indigo-100 sm:text-current" strokeWidth={2.5} />
                <span>Gerador Mensal</span>
              </button>

              <button
                onClick={() => setModalEvento(true)}
                className="flex flex-col sm:flex-row items-center justify-center py-2.5 px-1.5 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl sm:rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-blue-200/80 transition active:scale-95 cursor-pointer text-center sm:text-left gap-0.5 sm:gap-2"
              >
                <Plus className="w-5 h-5 sm:w-4 sm:h-4 mb-1 sm:mb-0 shrink-0 text-blue-100 sm:text-current" strokeWidth={3} />
                <span>Novo Evento</span>
              </button>

              <button
                onClick={() => setModalExportarMensal(true)}
                className="flex flex-col sm:flex-row items-center justify-center py-2.5 px-1.5 sm:px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl sm:rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-emerald-200/80 transition active:scale-95 cursor-pointer text-center sm:text-left gap-0.5 sm:gap-2"
              >
                <Share2 className="w-5 h-5 sm:w-4 sm:h-4 mb-1 sm:mb-0 shrink-0 text-emerald-100 sm:text-current" strokeWidth={2.5} />
                <span>Exportar Mensal</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Painel Esquerdo - Eventos */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-100/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-slate-800 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-600" size={18} />
              <h3 className="font-black text-sm uppercase tracking-wider">Eventos</h3>
            </div>
          </div>

          {/* Filtro de Período */}
          <div className="flex items-center justify-between bg-slate-50/80 border border-slate-100 rounded-xl p-2">
            <button
              onClick={retrocederMes}
              className="p-1 hover:bg-slate-200/65 rounded-lg text-slate-600 transition active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
              {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][filtroMes]} {filtroAno}
            </span>
            <button
              onClick={avancarMes}
              className="p-1 hover:bg-slate-200/65 rounded-lg text-slate-600 transition active:scale-95 cursor-pointer"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>

          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
            {eventosFiltrados.map((ev) => {
              const dataInfo = obterInfoDataBrasilia(ev.data_evento);
              const diaNum = dataInfo.diaNum;
              const diaSemanaIndex = dataInfo.diaSemanaIndex;
              const diaSemanaStr = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'][diaSemanaIndex];
              const cores = obterCorDiaSemana(diaSemanaIndex);

              return (
                <button
                  key={ev.id}
                  onClick={() => selecionarEvento(ev, true)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer group ${eventoSelecionado?.id === ev.id
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-xs text-slate-700'
                    }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Calendar Badge */}
                    <div className={`w-11 h-12 rounded-lg border flex flex-col overflow-hidden shrink-0 shadow-xs transition bg-white ${eventoSelecionado?.id === ev.id ? 'border-white/20' : cores.border
                      }`}>
                      <div className={`text-[8px] font-black py-0.5 text-center tracking-wider uppercase ${eventoSelecionado?.id === ev.id ? 'bg-white/20 text-white' : `${cores.bgHeader} ${cores.textHeader}`
                        }`}>
                        {diaSemanaStr}
                      </div>
                      <div className={`flex-1 flex items-center justify-center font-black text-base leading-none ${eventoSelecionado?.id === ev.id ? 'text-blue-600 font-bold' : 'text-slate-800'
                        }`}>
                        {diaNum}
                      </div>
                    </div>

                    <div className="min-w-0 pr-1">
                      <h4 className={`font-bold text-xs truncate leading-snug ${eventoSelecionado?.id === ev.id ? 'text-white' : 'text-slate-800 group-hover:text-blue-600 transition-colors'
                        }`}>
                        {ev.titulo}
                      </h4>
                      <p className={`text-[10px] mt-0.5 truncate flex items-center gap-1 ${eventoSelecionado?.id === ev.id ? 'text-white/70' : 'text-slate-400'
                        }`}>
                        📍 {ev.local || 'Templo Sede'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-black block ${eventoSelecionado?.id === ev.id ? 'text-white' : 'text-slate-700'
                      }`}>
                      {obterHoraExibicao(ev)}
                    </span>
                  </div>
                </button>
              );
            })}

            {eventosFiltrados.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-8">Nenhum evento neste período.</p>
            )}
          </div>
        </div>

        {/* Painel Direito - Grade da Escala */}
        <div className={`col-span-12 lg:col-span-8 ${modalGradeMobile ? 'fixed inset-0 z-50 bg-white flex flex-col p-0 lg:static lg:bg-transparent lg:p-0 lg:flex-none lg:block' : 'hidden lg:block'}`}>
          <div className={`bg-white w-full ${modalGradeMobile ? 'h-full min-h-screen rounded-none p-4 sm:p-6 overflow-y-auto relative flex flex-col flex-1' : 'rounded-2xl border border-slate-100/80 p-6 shadow-sm h-full'}`}>
            {modalGradeMobile && (
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 lg:hidden sticky top-0 bg-white/95 backdrop-blur-xs z-30 -mt-1 pt-1">
                <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span>📋</span> Detalhes do Evento
                </span>
                <button
                  type="button"
                  onClick={() => setModalGradeMobile(false)}
                  className="text-slate-600 hover:text-slate-900 cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition flex items-center gap-1 text-xs font-bold"
                >
                  <X size={16} /> Fechar
                </button>
              </div>
            )}
            {eventoSelecionado ? (
              <>
                {/* Header do Evento */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-5 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">
                      {eventoSelecionado.titulo}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-1">
                      <span>📅 {new Date(eventoSelecionado.data_evento).toLocaleDateString('pt-BR')}</span>
                      <span>· ⏰ {obterHoraExibicao(eventoSelecionado)}</span>
                      <span>· 📍 {eventoSelecionado.local || 'Templo Sede'}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {!isMembroNormal && (
                      <>
                        <button
                          type="button"
                          onClick={() => abrirModalEditar(eventoSelecionado)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
                          title="Editar este Evento"
                        >
                          <Pencil size={13} />
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={excluirEventoAtual}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
                          title="Excluir este Evento"
                        >
                          <Trash2 size={13} />
                          Excluir
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={copiarWhatsApp}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
                      title="Copiar texto formatado para WhatsApp"
                    >
                      <Share2 size={13} />
                      WhatsApp
                    </button>
                    {!isMembroNormal && (
                      <button
                        type="button"
                        onClick={abrirModalEscala}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer"
                      >
                        <Plus size={13} strokeWidth={3} />
                        Escalar
                      </button>
                    )}
                  </div>
                </div>

                {/* Escalas Agrupadas */}
                <div className="space-y-6">
                  {Object.values(escalasAgrupadas).map((grupo) => (
                    <div key={grupo.nome} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/30">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
                          <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
                            <span>🎵</span>
                            {grupo.nome}
                          </h4>

                          {/* Seletor de Fardamento */}
                          {(() => {
                            const nomeMinNorm = grupo.nome ? grupo.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
                            const eIntercessaoOuIntroducao = nomeMinNorm.includes('intercessao') || nomeMinNorm.includes('introducao');
                            const temFardamentos = grupo.fardamentos && grupo.fardamentos.length > 0;
                            if (!temFardamentos && !eIntercessaoOuIntroducao) return null;

                            const opcoesFardamento = temFardamentos 
                              ? grupo.fardamentos 
                              : ["Farda Oficial", "Camisa Preta", "Camisa Branca", "Camisa Azul", "Social"];

                            return (
                              <div className="flex items-center gap-1.5 bg-slate-100 py-0.5 px-2 rounded-lg border border-slate-200 shrink-0">
                                <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">👕 Farda:</span>
                                <select
                                  value={eventoSelecionado?.fardamentos?.[grupo.id] || ''}
                                  onChange={e => handleMudarFardamentoDia(grupo.id, e.target.value)}
                                  className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer border-none p-0 focus:ring-0"
                                >
                                  <option value="">Nenhuma</option>
                                  {opcoesFardamento.map(f => (
                                    <option key={f} value={f}>{f}</option>
                                  ))}
                                </select>
                              </div>
                            );
                          })()}
                        </div>

                        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                          {/* Linha superior no mobile: + Escalar e WhatsApp em 50% cada */}
                          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center">
                            <button
                              type="button"
                              onClick={() => abrirModalEscala(grupo.id)}
                              className="text-[10px] font-black uppercase tracking-wider text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap w-full sm:w-auto"
                              title="Escalar voluntário neste ministério"
                            >
                              <Plus size={11} /> Escalar
                            </button>
                            <button
                              type="button"
                              onClick={() => copiarWhatsAppMinisterio(grupo)}
                              className="text-[10px] font-black uppercase tracking-wider text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap w-full sm:w-auto"
                              title="Copiar escala deste ministério para WhatsApp"
                            >
                              <Share2 size={11} />
                              WhatsApp
                            </button>
                          </div>

                          {/* Linha inferior no mobile: AutoEscala em 100% da largura */}
                          <button
                            type="button"
                            onClick={() => rodarAutoEscala(grupo.id)}
                            className="w-full sm:w-auto text-[10px] font-black uppercase tracking-wider text-amber-700 hover:text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-lg hover:bg-amber-100 border border-amber-200/60 transition cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap"
                            title="Montar escala automaticamente com base no histórico e disponibilidade."
                          >
                            ⚡ AutoEscala
                          </button>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {grupo.itens.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white rounded-xl border border-slate-100 p-3 flex justify-between items-center group relative hover:border-slate-200 transition"
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="text-xs font-bold text-slate-800">
                                  {item.pessoas?.nome}
                                </p>
                                {/* Status Badge */}
                                <span className={`w-2 h-2 rounded-full inline-block ${item.status === 'confirmado' ? 'bg-emerald-500' : item.status === 'recusado' ? 'bg-red-500' : 'bg-amber-400'
                                  }`} title={`Status: ${item.status}`} />
                              </div>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {item.ministerio_funcoes?.nome || 'Geral'}
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${item.status === 'confirmado' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                  item.status === 'recusado' ? 'bg-red-50 text-red-700 border border-red-100' :
                                    'bg-amber-50 text-amber-700 border border-amber-100'
                                }`}>
                                {item.status}
                              </span>
                              {!isMembroNormal && (
                                <button
                                  type="button"
                                  onClick={() => excluirEscala(item.id)}
                                  className="p-1 text-slate-300 hover:text-red-600 transition cursor-pointer"
                                  title="Remover da escala"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {escalas.length === 0 && (
                    <div className="py-20 text-center text-slate-400 italic text-sm border-2 border-dashed border-slate-100 rounded-2xl">
                      Nenhum voluntário escalado para este evento. Clique em "Escalar" ou utilize o botão de "AutoEscala" nos ministérios para iniciar.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="py-24 text-center text-slate-400 italic">
                Selecione um evento na barra lateral para carregar sua escala de voluntários.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal - Novo Evento */}
      {modalEvento && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-none sm:rounded-2xl shadow-xl w-full h-full sm:h-auto sm:max-w-md sm:max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Novo Evento Ministerial
              </h3>
              <button type="button" onClick={() => setModalEvento(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 flex-1 overflow-y-auto">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Título do Evento</label>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30"
                  value={novoEvento.titulo}
                  onChange={e => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                  placeholder="Ex: Culto de Domingo, Vigília, Ensaio..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Data e Hora Início</label>
                  <input
                    type="datetime-local"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30 cursor-pointer"
                    value={novoEvento.data_evento}
                    onChange={e => setNovoEvento({ ...novoEvento, data_evento: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Data e Hora Término</label>
                  <input
                    type="datetime-local"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30 cursor-pointer"
                    value={novoEvento.data_fim || ''}
                    onChange={e => setNovoEvento({ ...novoEvento, data_fim: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Local</label>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30"
                  value={novoEvento.local}
                  onChange={e => setNovoEvento({ ...novoEvento, local: e.target.value })}
                  placeholder="Ex: Templo Sede, Salão Social..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Descrição</label>
                <textarea
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition resize-none bg-slate-50/30"
                  value={novoEvento.descricao}
                  onChange={e => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                  placeholder="Anotações ou orientações para a equipe..."
                  rows="3"
                />
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-100 bg-white/95 backdrop-blur-xs shrink-0 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] z-10">
              <button type="button" onClick={() => setModalEvento(false)} className="w-full sm:flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer text-center">
                Cancelar
              </button>
              <button type="button" onClick={salvarEvento} disabled={salvando} className="w-full sm:flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition cursor-pointer text-center">
                {salvando ? 'Salvando...' : 'Salvar Evento'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Adicionar Escalado */}
      {modalEscala && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-none sm:rounded-2xl shadow-xl w-full h-full sm:h-auto sm:max-w-md sm:max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Escalar Voluntário
              </h3>
              <button type="button" onClick={fecharModalEscala} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 flex-1 overflow-y-auto">
              {/* Selecionar Ministério */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Ministério</label>
                <select
                  value={novaEscala.ministerio_id}
                  onChange={(e) => handleSelecionarMinisterio(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 transition cursor-pointer font-bold text-slate-700"
                >
                  <option value="">Selecione um ministério...</option>
                  {listaMinisterios.map(m => (
                    <option key={m.id} value={m.id}>{m.nome}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                {/* Seletor de Fardamento no Modal */}
                {novaEscala.ministerio_id && (() => {
                  let minSelObj = listaMinisterios.find(m => String(m.id) === String(novaEscala.ministerio_id));
                  if (!minSelObj) {
                    const itemEscala = escalas.find(e => String(e.ministerio_id) === String(novaEscala.ministerio_id));
                    if (itemEscala?.ministerios) {
                      minSelObj = itemEscala.ministerios;
                    }
                  }

                  const nomeMinNorm = minSelObj?.nome ? minSelObj.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
                  const eIntercessaoOuIntroducao = nomeMinNorm.includes('intercessao') || nomeMinNorm.includes('introducao');
                  const temFardamentos = minSelObj?.fardamentos && Array.isArray(minSelObj.fardamentos) && minSelObj.fardamentos.length > 0;

                  if (!temFardamentos && !eIntercessaoOuIntroducao) return null;

                  const opcoesFardamento = temFardamentos 
                    ? minSelObj.fardamentos 
                    : ["Farda Oficial", "Camisa Preta", "Camisa Branca", "Camisa Azul", "Social"];

                  return (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <span>👕</span> Fardamento do Dia
                      </label>
                      <select
                        value={eventoSelecionado?.fardamentos?.[novaEscala.ministerio_id] || ''}
                        onChange={(e) => handleMudarFardamentoDia(novaEscala.ministerio_id, e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-blue-500 transition cursor-pointer font-bold text-slate-700"
                      >
                        <option value="">Nenhum / Não especificado</option>
                        {opcoesFardamento.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      <p className="text-[9px] text-slate-400">
                        Define a farda/vestimenta oficial para este ministério no dia do evento.
                      </p>
                    </div>
                  );
                })()}

                {/* Lista de Funções para Escala Multifunção */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Funções da Equipe {novaEscala.ministerio_id ? `(${listaFuncoes.length})` : ''}
                    </label>
                    <button
                      type="button"
                      onClick={() => preencherAutoEscalaModal()}
                      disabled={salvandoEscalasMultiplas}
                      className="text-[10px] font-black uppercase tracking-wider text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 active:scale-95 disabled:opacity-50"
                      title="Preencher automaticamente as funções usando histórico e disponibilidade"
                    >
                      ⚡ Sugerir com AutoEscala
                    </button>
                  </div>

                  {novaEscala.ministerio_id ? (
                    <div className="space-y-3">
                      {listaFuncoes.map(funcao => (
                        <div key={funcao.id} className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 space-y-1.5 hover:border-blue-200 transition">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                              <span className="text-blue-600">📌</span> {funcao.nome}
                            </span>
                            {atribuicoesModal[funcao.id] ? (
                              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                ✓ Selecionado
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                                Vago
                              </span>
                            )}
                          </div>

                          <select
                            value={atribuicoesModal[funcao.id] || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAtribuicoesModal(prev => ({ ...prev, [funcao.id]: val }));
                            }}
                            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs bg-white outline-none focus:border-blue-500 transition cursor-pointer font-bold text-slate-700"
                          >
                            <option value="">— Selecionar Voluntário —</option>
                            {listaPessoas.map(p => {
                              const pId = p.pessoas?.id || p.pessoa_id || p.id;
                              const pNome = p.pessoas?.nome || p.nome;
                              return (
                                <option key={pId} value={pId}>
                                  {pNome} {p.funcao ? `(${p.funcao})` : ''}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      ))}

                      {listaFuncoes.length === 0 && (
                        <div className="py-8 text-center text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                          Nenhuma função cadastrada para este ministério.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      Selecione um ministério no menu suspenso acima para carregar os voluntários da equipe.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-100 bg-white/95 backdrop-blur-xs shrink-0 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] z-10">
              <button
                type="button"
                onClick={fecharModalEscala}
                className="w-full sm:flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer text-center"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={salvarEscalasMultiplas}
                disabled={salvandoEscalasMultiplas || !novaEscala.ministerio_id}
                className="w-full sm:flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition cursor-pointer text-center disabled:opacity-50"
              >
                {salvandoEscalasMultiplas ? 'Salvando Escalas...' : 'Salvar Escalas do Ministério'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Gerador Mensal de Eventos */}
      {modalGerador && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col text-slate-800">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  🗓️ Gerador Mensal de Eventos
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Planeje e gere em lote toda a programação de cultos do mês.
                </p>
              </div>
              <button type="button" onClick={() => setModalGerador(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Abas e Barra de Controle Principal */}
            <div className="border-b border-slate-100 bg-white p-3.5 sm:px-6 sm:py-4 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 sm:gap-4">
              {/* Filtro do Período e Local */}
              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 w-full md:w-auto">
                <div>
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Mês</label>
                  <select
                    value={mesGeracao}
                    onChange={(e) => setMesGeracao(Number(e.target.value))}
                    className="w-full sm:w-auto border border-slate-200 rounded-lg px-2 py-1.5 text-xs bg-slate-50/30 outline-none focus:border-blue-500 transition cursor-pointer text-slate-700"
                  >
                    {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((mNome, idx) => (
                      <option key={idx} value={idx}>{mNome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Ano</label>
                  <select
                    value={anoGeracao}
                    onChange={(e) => setAnoGeracao(Number(e.target.value))}
                    className="w-full sm:w-auto border border-slate-200 rounded-lg px-2 py-1.5 text-xs bg-slate-50/30 outline-none focus:border-blue-500 transition cursor-pointer text-slate-700"
                  >
                    {[new Date().getFullYear(), new Date().getFullYear() + 1].map(ano => (
                      <option key={ano} value={ano}>{ano}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Local Padrão</label>
                  <input
                    type="text"
                    value={localPadrao}
                    onChange={(e) => setLocalPadrao(e.target.value)}
                    className="w-full sm:w-36 border border-slate-200 rounded-lg px-2 py-1.5 text-xs bg-slate-50/30 outline-none focus:border-blue-500 transition text-slate-700"
                    placeholder="Ex: Templo Sede"
                  />
                </div>
              </div>

              {/* Botões de Abas */}
              <div className="grid grid-cols-2 gap-1 sm:flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/50 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setAbaGerador('config')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition text-center ${abaGerador === 'config'
                      ? 'bg-[#1e3a8a] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  ⚙️ Regras
                </button>
                <button
                  type="button"
                  onClick={calcularPreviaEventos}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition text-center ${abaGerador === 'previa'
                      ? 'bg-[#1e3a8a] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  📋 Prévia
                </button>
              </div>
            </div>

            {/* Conteúdo Central */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 bg-slate-50/30">
              {abaGerador === 'config' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bloco Esquerdo: Cultos Semanais Padrão */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col space-y-4">
                    <div className="border-b border-slate-50 pb-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        🔄 Cultos Padrão Semanais
                      </h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">
                        Define os cultos recorrentes da semana (serão replicados para todo o mês selecionado).
                      </p>
                    </div>

                    {/* Lista de Cultos Padrão */}
                    <div className="flex-1 space-y-2 overflow-y-auto max-h-[220px] pr-1 custom-scrollbar">
                      {cultosPadrao.map((c) => {
                        const nomesDias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
                        return (
                          <div key={c.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-3 hover:border-slate-200 transition">
                            <div>
                              <p className="text-xs font-bold text-slate-800">{c.titulo}</p>
                              <p className="text-[10px] text-slate-550 mt-0.5">
                                📅 {nomesDias[c.dayOfWeek]} · ⏰ {c.time}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removerCultoPadrao(c.id)}
                              className="p-1.5 text-slate-350 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                              title="Remover Culto Padrão"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                      {cultosPadrao.length === 0 && (
                        <p className="text-xs text-slate-400 italic py-6 text-center">Nenhum culto semanal configurado.</p>
                      )}
                    </div>

                    {/* Formulário para Adicionar Culto Padrão */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Dia da Semana</label>
                          <select
                            value={novoCultoPadrao.dayOfWeek}
                            onChange={(e) => setNovoCultoPadrao(prev => ({ ...prev, dayOfWeek: Number(e.target.value) }))}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-white outline-none focus:border-blue-500 transition cursor-pointer text-slate-700"
                          >
                            {['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'].map((dia, idx) => (
                              <option key={idx} value={idx}>{dia}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Hora Início</label>
                          <input
                            type="time"
                            value={novoCultoPadrao.time}
                            onChange={(e) => setNovoCultoPadrao(prev => ({ ...prev, time: e.target.value }))}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-white outline-none focus:border-blue-500 transition cursor-pointer text-slate-750"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Hora Término</label>
                          <input
                            type="time"
                            value={novoCultoPadrao.timeEnd || ''}
                            onChange={(e) => setNovoCultoPadrao(prev => ({ ...prev, timeEnd: e.target.value }))}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-white outline-none focus:border-blue-500 transition cursor-pointer text-slate-750"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Título do Culto</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={novoCultoPadrao.titulo}
                            onChange={(e) => setNovoCultoPadrao(prev => ({ ...prev, titulo: e.target.value }))}
                            className="w-full sm:flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white outline-none focus:border-blue-500 transition text-slate-750"
                            placeholder="Ex: Culto da Vitória, Doutrina"
                          />
                          <button
                            type="button"
                            onClick={adicionarCultoPadrao}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer shrink-0 text-center"
                          >
                            Adicionar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bloco Direito: Eventos Customizados */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col space-y-4">
                    <div className="border-b border-slate-50 pb-2">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        ⭐ Programações e Eventos Especiais
                      </h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">
                        Acrescente congressos, seminários, rede de homens/mulheres ou outras datas pontuais.
                      </p>
                    </div>

                    {/* Lista de Eventos Customizados */}
                    <div className="flex-1 space-y-2 overflow-y-auto max-h-[220px] pr-1 custom-scrollbar">
                      {eventosCustomizados.map((e) => {
                        const dataExibicao = e.date ? new Date(`${e.date}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '';
                        return (
                          <div key={e.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl p-3 hover:border-slate-200 transition">
                            <div>
                              <p className="text-xs font-bold text-slate-800">{e.titulo}</p>
                              <p className="text-[10px] text-slate-550 mt-0.5">
                                📅 {dataExibicao} · ⏰ {e.time} {e.local && `· 📍 ${e.local}`}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removerEventoCustomizado(e.id)}
                              className="p-1.5 text-slate-350 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                              title="Remover Evento Especial"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                      {eventosCustomizados.length === 0 && (
                        <p className="text-xs text-slate-400 italic py-6 text-center">Nenhuma programação especial adicionada.</p>
                      )}
                    </div>

                    {/* Formulário para Adicionar Evento Customizado */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Data</label>
                          <input
                            type="date"
                            value={novoEventoCustom.date}
                            onChange={(e) => setNovoEventoCustom(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1 text-xs bg-white outline-none focus:border-blue-500 transition cursor-pointer text-slate-750"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Hora Início</label>
                          <input
                            type="time"
                            value={novoEventoCustom.time}
                            onChange={(e) => setNovoEventoCustom(prev => ({ ...prev, time: e.target.value }))}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-white outline-none focus:border-blue-500 transition cursor-pointer text-slate-750"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Hora Término</label>
                          <input
                            type="time"
                            value={novoEventoCustom.timeEnd || ''}
                            onChange={(e) => setNovoEventoCustom(prev => ({ ...prev, timeEnd: e.target.value }))}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-white outline-none focus:border-blue-500 transition cursor-pointer text-slate-750"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Título</label>
                          <input
                            type="text"
                            value={novoEventoCustom.titulo}
                            onChange={(e) => setNovoEventoCustom(prev => ({ ...prev, titulo: e.target.value }))}
                            className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white outline-none focus:border-blue-500 transition text-slate-750"
                            placeholder="Ex: Rede de Homens"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Local (opcional)</label>
                          <input
                            type="text"
                            value={novoEventoCustom.local}
                            onChange={(e) => setNovoEventoCustom(prev => ({ ...prev, local: e.target.value }))}
                            className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white outline-none focus:border-blue-500 transition text-slate-750"
                            placeholder="Deixar em branco para padrão"
                          />
                        </div>
                      </div>
                      <div className="flex justify-stretch sm:justify-end pt-1">
                        <button
                          type="button"
                          onClick={adicionarEventoCustomizado}
                          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer text-center"
                        >
                          Adicionar Evento Especial
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Aba: Prévia & Inserção */
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col space-y-4 h-full">
                  <div className="border-b border-slate-50 pb-2 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        📋 Prévia dos Eventos a serem Criados
                      </h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">
                        Marque ou desmarque os eventos abaixo para refinar o lote antes de salvar de fato no sistema.
                      </p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg">
                      Total Selecionado: {previaEventos.filter(p => p.incluir).length}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto max-h-[360px] pr-1 custom-scrollbar flex-1">
                    {previaEventos.map((item) => {
                      const dataFormatada = formatarDataHoraLocal(item.data_evento, item.data_fim);
                      return (
                        <label
                          key={item.id_temp}
                          className={`flex items-start gap-3 p-3.5 border rounded-xl transition cursor-pointer select-none ${item.incluir
                              ? 'bg-blue-50/40 border-blue-200 hover:bg-blue-50'
                              : 'bg-slate-50 border-slate-100 text-slate-450 hover:bg-slate-100'
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={item.incluir}
                            onChange={() => toggleInclusaoPrevia(item.id_temp)}
                            className="w-4 h-4 text-blue-600 border-slate-350 rounded focus:ring-blue-500 mt-0.5 cursor-pointer"
                          />
                          <div className="min-w-0">
                            <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md mb-1.5 ${item.isCustom
                                ? 'bg-amber-100 text-amber-800 border border-amber-200/50'
                                : 'bg-slate-200 text-slate-650'
                              }`}>
                              {item.isCustom ? 'Especial' : 'Recorrente'}
                            </span>
                            <h5 className={`text-xs font-bold truncate ${item.incluir ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                              {item.titulo}
                            </h5>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              ⏰ {dataFormatada}
                            </p>
                            <p className="text-[9px] text-slate-400 mt-0.5 truncate">
                              📍 {item.local}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                    {previaEventos.length === 0 && (
                      <div className="col-span-full py-16 text-center text-slate-400 italic text-xs">
                        Nenhum evento gerado. Volte para a aba anterior e configure alguma regra.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé do Modal */}
            <div className="p-3.5 sm:p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setModalGerador(false)}
                className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition cursor-pointer text-center"
              >
                Cancelar
              </button>

              <div className="flex flex-col-reverse sm:flex-row gap-2 w-full sm:w-auto">
                {abaGerador === 'config' ? (
                  <button
                    type="button"
                    onClick={calcularPreviaEventos}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95 cursor-pointer text-center"
                  >
                    Gerar e Ver Prévia
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setAbaGerador('config')}
                      className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition cursor-pointer text-center"
                    >
                      Voltar e Ajustar
                    </button>
                    <button
                      type="button"
                      onClick={salvarEventosLote}
                      disabled={salvando}
                      className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 transition active:scale-95 cursor-pointer text-center"
                    >
                      {salvando ? 'Salvando...' : 'Salvar Eventos'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Editar Evento */}
      {modalEditar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-none sm:rounded-2xl shadow-xl w-full h-full sm:h-auto sm:max-w-md sm:max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Editar Evento Ministerial
              </h3>
              <button type="button" onClick={() => setModalEditar(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Título do Evento</label>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30"
                  value={eventoEditando.titulo}
                  onChange={e => setEventoEditando({ ...eventoEditando, titulo: e.target.value })}
                  placeholder="Ex: Culto de Domingo, Vigília, Ensaio..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Data e Hora Início</label>
                  <input
                    type="datetime-local"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30 cursor-pointer"
                    value={eventoEditando.data_evento}
                    onChange={e => setEventoEditando({ ...eventoEditando, data_evento: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Data e Hora Término</label>
                  <input
                    type="datetime-local"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30 cursor-pointer"
                    value={eventoEditando.data_fim || ''}
                    onChange={e => setEventoEditando({ ...eventoEditando, data_fim: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Local</label>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30"
                  value={eventoEditando.local}
                  onChange={e => setEventoEditando({ ...eventoEditando, local: e.target.value })}
                  placeholder="Ex: Templo Sede, Salão Social..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Descrição</label>
                <textarea
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition resize-none bg-slate-50/30"
                  value={eventoEditando.descricao}
                  onChange={e => setEventoEditando({ ...eventoEditando, descricao: e.target.value })}
                  placeholder="Anotações ou orientações para a equipe..."
                  rows="3"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white/95 backdrop-blur-xs shrink-0 flex gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] z-10">
              <button type="button" onClick={() => setModalEditar(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer">
                Cancelar
              </button>
              <button type="button" onClick={salvarEdicaoEvento} disabled={salvando} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition cursor-pointer">
                {salvando ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Exportar Escala Mensal */}
      {modalExportarMensal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col text-slate-800">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  📲 Exportar Escala Mensal (PNG)
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase">
                  Período: {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][filtroMes]} de {filtroAno}
                </p>
              </div>
              <button type="button" onClick={() => setModalExportarMensal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Corpo */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
              {/* Seleção do Ministério */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1.5">Ministério</label>
                <select
                  value={minExportarId}
                  onChange={(e) => setMinExportarId(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-slate-50 outline-none focus:border-blue-500 transition cursor-pointer text-slate-700 font-bold"
                >
                  <option value="">— Selecione o Ministério para Exportação —</option>
                  {listaMinisterios.map(m => (
                    <option key={m.id} value={m.id}>{m.nome}</option>
                  ))}
                </select>
              </div>

              {/* Prévia */}
              <div className="border border-slate-100 rounded-2xl p-3 sm:p-4 bg-slate-50/30 flex flex-col items-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Prévia do Layout Mobile</p>

                {carregandoExportar ? (
                  <div className="py-20 text-center text-slate-500 font-bold text-sm animate-pulse">Carregando dados da escala...</div>
                ) : !minExportarId ? (
                  <div className="py-20 text-center text-slate-400 italic text-xs">Selecione um ministério acima para ver a prévia.</div>
                ) : eventosFiltrados.length === 0 ? (
                  <div className="py-20 text-center text-slate-400 italic text-xs">Nenhum evento cadastrado neste mês.</div>
                ) : (
                  <div className="w-full max-w-2xl overflow-y-auto h-[320px] sm:h-[450px] border border-slate-200 rounded-[28px] bg-slate-950 p-2 sm:p-4 relative flex justify-center shadow-inner custom-scrollbar">
                    <div className="origin-top scale-[0.38] sm:scale-[0.55] md:scale-[0.65]" style={{ width: '1080px', height: 'auto', transformOrigin: 'top center' }}>
                      <style>{`
                        .mensal-export-page { width: 1080px; height: auto; min-height: 1920px; padding: 56px 48px; font-family: 'Montserrat', sans-serif; display: flex; flex-direction: column; gap: 32px; position: relative; overflow: hidden; background: linear-gradient(150deg, #0f172a 0%, #1e1b4b 55%, #311042 100%); }
                        .mensal-export-header { border-radius: 40px; padding: 48px; display: flex; flex-direction: column; align-items: flex-start; gap: 24px; border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25); background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%); z-index: 2; width: 100%; }
                        .mensal-export-header-badge { font-size: 16px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; padding: 10px 24px; border-radius: 999px; display: inline-flex; align-items: center; gap: 8px; background: #3b82f6; color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
                        .mensal-export-title { font-size: 96px; font-weight: 900; line-height: 0.85; letter-spacing: -2px; text-transform: uppercase; margin-top: 6px; color: #ffffff; text-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); }
                        .mensal-export-list { flex: 1; border-radius: 40px; padding: 36px 24px; display: flex; flex-direction: column; gap: 24px; border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2); z-index: 2; background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%); width: 100%; }
                        .mensal-export-list-title { font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em; opacity: 0.55; padding: 0 12px 12px; border-bottom: 2px solid rgba(255, 255, 255, 0.1); margin-bottom: 12px; text-align: center; color: rgba(255, 255, 255, 0.7); }
                        .mensal-export-card { display: flex; align-items: center; gap: 28px; background: rgba(255, 255, 255, 0.96); border-radius: 32px; padding: 24px 32px; box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15); border: 1px solid rgba(255, 255, 255, 0.6); width: 100%; text-align: left; }
                        .mensal-export-date-badge { width: 110px; height: 110px; border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; box-shadow: 0 8px 20px rgba(0,0,0,0.18); flex-shrink: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); }
                        .mensal-export-date-badge-day { font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8; margin-bottom: 2px; }
                        .mensal-export-date-badge-num { font-size: 50px; font-weight: 900; line-height: 1; }
                        .mensal-export-content { flex-grow: 1; display: flex; flex-direction: column; gap: 12px; text-align: left; }
                        .mensal-export-event-title { font-size: 20px; font-weight: 900; text-transform: uppercase; tracking-wide: 1px; color: #0f172a; border-bottom: 1px solid rgba(15, 23, 42, 0.08); padding-bottom: 4px; display: flex; justify-content: space-between; align-items: center; }
                        .mensal-export-assignments-grid { display: grid; gap: 14px; grid-template-columns: repeat(2, 1fr); text-align: left; }
                        .mensal-export-assignment-cell { display: flex; flex-direction: column; gap: 2px; text-align: left; }
                        .mensal-export-assignment-role { font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #2563eb; opacity: 0.85; }
                        .mensal-export-assignment-name-row { display: flex; align-items: center; gap: 8px; }
                        .mensal-export-assignment-name { font-size: 24px; font-weight: 800; color: #0f172a; }
                        .mensal-export-assignment-name-empty { font-size: 24px; font-weight: 500; color: #94a3b8; font-style: italic; }
                        .mensal-export-uniform-badge { display: flex; align-items: center; gap: 6px; margin-top: 4px; padding-top: 8px; border-top: 1px dashed rgba(15, 23, 42, 0.1); font-size: 14px; font-weight: 800; color: #475569; grid-column: span 2; }
                        .mensal-export-footer { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 0 12px; flex-shrink: 0; gap: 10px; z-index: 2; width: 100%; }
                        .mensal-export-footer-logo { height: 90px; object-fit: contain; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.15)); }
                        .mensal-export-footer-tagline { font-size: 16px; font-weight: 900; letter-spacing: 0.25em; text-transform: uppercase; opacity: 0.6; color: #fff; margin-top: 4px; }
                      `}</style>

                      <div className="mensal-export-page">
                        <div className="mensal-export-header">
                          <div className="mensal-export-header-badge">
                            {listaMinisterios.find(m => m.id === minExportarId)?.nome || ''}
                          </div>
                          <div className="mensal-export-title">
                            {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][filtroMes].toUpperCase()} {filtroAno}
                          </div>
                        </div>

                        <div className="mensal-export-list">
                          <div className="mensal-export-list-title">Escala Mensal de Voluntários</div>

                          {eventosFiltrados.map((ev) => {
                            const dataInfo = obterInfoDataBrasilia(ev.data_evento);
                            const diaSemanaStr = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'][dataInfo.diaSemanaIndex];

                            const atribuicoes = dadosMensaisExportar.filter(item => item.evento_id === ev.id);
                            const fardaSel = ev.fardamentos?.[minExportarId];
                            const hasVolunteers = atribuicoes.length > 0;

                            return (
                              <div key={ev.id} className="mensal-export-card">
                                <div className="mensal-export-date-badge">
                                  <span className="mensal-export-date-badge-day">{diaSemanaStr}</span>
                                  <span className="mensal-export-date-badge-num">{dataInfo.diaNum}</span>
                                </div>
                                <div className="mensal-export-content">
                                  <div className="mensal-export-event-title">
                                    <span>{ev.titulo}</span>
                                    <span style={{ fontSize: '11px', opacity: 0.6 }}>⏰ {obterHoraExibicao(ev)}</span>
                                  </div>
                                  <div className="mensal-export-assignments-grid">
                                    {hasVolunteers ? funcoesExportar.map((func) => {
                                      const item = atribuicoes.find(att => att.funcao_id === func.id);
                                      const statusIcon = item ? (item.status === 'confirmado' ? '🟢' : item.status === 'recusado' ? '🔴' : '🟡') : '';
                                      const nomePessoa = item?.pessoas?.nome || '— —';

                                      return (
                                        <div key={func.id} className="mensal-export-assignment-cell">
                                          <div className="mensal-export-assignment-role" style={{ color: '#2563eb' }}>{func.nome}</div>
                                          <div className="mensal-export-assignment-name-row">
                                            <span className={item ? "mensal-export-assignment-name" : "mensal-export-assignment-name-empty"}>
                                              {nomePessoa}
                                            </span>
                                            {item && <span style={{ fontSize: '12px' }}>{statusIcon}</span>}
                                          </div>
                                        </div>
                                      );
                                    }) : (
                                      <div className="mensal-export-assignment-name-empty" style={{ gridColumn: 'span 2' }}>
                                        Sem voluntários escalados
                                      </div>
                                    )}
                                    {fardaSel && (
                                      <div className="mensal-export-uniform-badge">
                                        👕 Farda: {fardaSel}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mensal-export-footer">
                          <img src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/logo_betesda_branca.png" className="mensal-export-footer-logo" />
                          <div className="mensal-export-footer-tagline">MIB CHURCH · DEPARTAMENTO DE COMUNICAÇÃO</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rodapé */}
            <div className="p-3.5 sm:p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setModalExportarMensal(false)}
                className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition cursor-pointer text-center"
              >
                Fechar
              </button>

              <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleExportarMensalPNG(false)}
                  disabled={carregandoExportar || !minExportarId || eventosFiltrados.length === 0}
                  className="w-full sm:w-auto px-3.5 sm:px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Share2 size={13} />
                  <span>Compartilhar</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportarMensalPNG(true)}
                  disabled={carregandoExportar || !minExportarId || eventosFiltrados.length === 0}
                  className="w-full sm:w-auto px-3.5 sm:px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition active:scale-95 disabled:opacity-50 cursor-pointer text-center"
                >
                  Baixar PNG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pequeno de Notificação de Conflito de Escala */}
      {modalConflito && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md p-6 overflow-hidden text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shrink-0 shadow-inner">
              <AlertCircle size={26} />
            </div>
            
            <div>
              <h3 className="text-base font-black text-slate-800 tracking-tight">
                Conflito de Escala Detectado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2.5 font-medium">
                <strong className="text-slate-900 font-bold">{modalConflito.pessoaNome}</strong> não poderá ser escalado(a) pois já está escalado(a) no ministério <strong className="text-blue-700 font-bold">{modalConflito.ministerioNome}</strong> para o evento <strong className="text-slate-900 font-bold">{modalConflito.eventoTitulo}</strong>.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setModalConflito(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pequeno de Aviso para Selecionar Ministério */}
      {modalAvisoMinisterio && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-sm p-6 overflow-hidden text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shrink-0 shadow-inner">
              <AlertCircle size={26} />
            </div>

            <div>
              <h3 className="text-base font-black text-slate-800 tracking-tight">
                Selecione um Ministério
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2 font-medium">
                Por favor, selecione um ministério no menu suspenso antes de acionar a <strong>AutoEscala</strong>.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setModalAvisoMinisterio(false)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-100 cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}