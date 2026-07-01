import { useEffect, useState, useMemo } from 'react';
import { Calendar, Plus, X, Search, Check, AlertCircle, Share2, Printer, CheckCircle, XCircle, Trash2, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import { escalasService } from './services/escalasService';
import { autoEscalaService } from './services/autoEscalaService';

export default function EscalasMinisteriais({ membroLogado }) {
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

  const [notificacao, setNotificacao] = useState('');

  // Filtro de Período
  const [filtroMes, setFiltroMes] = useState(new Date().getMonth());
  const [filtroAno, setFiltroAno] = useState(new Date().getFullYear());

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

  async function selecionarEvento(evento) {
    setEventoSelecionado(evento);
    try {
      const lista = await escalasService.listarEscalas(evento.id);
      setEscalas(lista || []);
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
  async function abrirModalEscala() {
    if (!eventoSelecionado) return;
    try {
      const mins = await escalasService.listarMinisterios();
      setListaMinisterios(mins || []);
      setModalEscala(true);
    } catch (error) {
      console.error('Erro ao carregar ministérios:', error);
    }
  }

  async function handleSelecionarMinisterio(ministerioId) {
    setNovaEscala(prev => ({ ...prev, ministerio_id: ministerioId, funcao_id: '', pessoa_id: '' }));
    setVoluntarioSelecionado(null);
    setBuscaVoluntario('');
    if (!ministerioId) {
      setListaFuncoes([]);
      setListaPessoas([]);
      return;
    }
    try {
      const funcs = await escalasService.listarFuncoes(ministerioId);
      setListaFuncoes(funcs || []);
      
      const pms = await escalasService.listarPessoasMinisterio(ministerioId);
      setListaPessoas(pms || []);
    } catch (error) {
      console.error('Erro ao carregar funções/pessoas:', error);
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

  async function rodarAutoEscala(ministerioId) {
    if (!eventoSelecionado || !ministerioId) return;
    mostrarToast('⚡ Rodando AutoEscala inteligente...');
    try {
      const res = await autoEscalaService.gerarEscala({
        eventoId: eventoSelecionado.id,
        ministerioId
      });
      selecionarEvento(eventoSelecionado);
      if (res && res.length > 0) {
        mostrarToast(`✓ AutoEscala: ${res.length} voluntários escalados!`);
      } else {
        mostrarToast('AutoEscala concluída (nenhum voluntário adicional elegível).');
      }
    } catch (error) {
      console.error('Erro ao rodar AutoEscala:', error);
      alert('Erro na AutoEscala: ' + error.message);
    }
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

  // Copiar escala formatada para WhatsApp
  function copiarWhatsApp() {
    if (!eventoSelecionado || escalas.length === 0) return;
    
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

    navigator.clipboard.writeText(texto).then(() => {
      mostrarToast('✓ Escala copiada para a Área de Transferência!');
    });
  }

  return (
    <div className="space-y-6 relative">
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
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Escalas de Serviço</h2>
          <p className="text-xs text-slate-500">Configure os voluntários para os cultos e programações da igreja.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setAbaGerador('config');
              setModalGerador(true);
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider transition active:scale-95 cursor-pointer"
          >
            <Calendar size={14} strokeWidth={3} />
            Gerador Mensal
          </button>
          <button
            onClick={() => setModalEvento(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer"
          >
            <Plus size={14} strokeWidth={3} />
            Novo Evento
          </button>
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
                  onClick={() => selecionarEvento(ev)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer group ${
                    eventoSelecionado?.id === ev.id
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-xs text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Calendar Badge */}
                    <div className={`w-11 h-12 rounded-lg border flex flex-col overflow-hidden shrink-0 shadow-xs transition bg-white ${
                      eventoSelecionado?.id === ev.id ? 'border-white/20' : cores.border
                    }`}>
                      <div className={`text-[8px] font-black py-0.5 text-center tracking-wider uppercase ${
                        eventoSelecionado?.id === ev.id ? 'bg-white/20 text-white' : `${cores.bgHeader} ${cores.textHeader}`
                      }`}>
                        {diaSemanaStr}
                      </div>
                      <div className={`flex-1 flex items-center justify-center font-black text-base leading-none ${
                        eventoSelecionado?.id === ev.id ? 'text-blue-600 font-bold' : 'text-slate-800'
                      }`}>
                        {diaNum}
                      </div>
                    </div>

                    <div className="min-w-0 pr-1">
                      <h4 className={`font-bold text-xs truncate leading-snug ${
                        eventoSelecionado?.id === ev.id ? 'text-white' : 'text-slate-800 group-hover:text-blue-600 transition-colors'
                      }`}>
                        {ev.titulo}
                      </h4>
                      <p className={`text-[10px] mt-0.5 truncate flex items-center gap-1 ${
                        eventoSelecionado?.id === ev.id ? 'text-white/70' : 'text-slate-400'
                      }`}>
                        📍 {ev.local || 'Templo Sede'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-black block ${
                      eventoSelecionado?.id === ev.id ? 'text-white' : 'text-slate-700'
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
        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-100/80 p-6 shadow-sm">
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
                  <button
                    type="button"
                    onClick={copiarWhatsApp}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
                    title="Copiar texto formatado para WhatsApp"
                  >
                    <Share2 size={13} />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={abrirModalEscala}
                    className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer"
                  >
                    <Plus size={13} strokeWidth={3} />
                    Escalar
                  </button>
                </div>
              </div>

              {/* Escalas Agrupadas */}
              <div className="space-y-6">
                {Object.values(escalasAgrupadas).map((grupo) => (
                  <div key={grupo.nome} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/30">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
                          <span>🎵</span>
                          {grupo.nome}
                        </h4>
                        
                        {/* Seletor de Fardamento */}
                        {grupo.fardamentos && grupo.fardamentos.length > 0 && (
                          <div className="flex items-center gap-1.5 ml-2 bg-slate-100 py-0.5 px-2 rounded-lg border border-slate-200">
                            <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">👕 Farda:</span>
                            <select
                              value={eventoSelecionado?.fardamentos?.[grupo.id] || ''}
                              onChange={e => handleMudarFardamentoDia(grupo.id, e.target.value)}
                              className="bg-transparent text-[10px] font-bold text-slate-700 outline-none cursor-pointer border-none p-0 focus:ring-0"
                            >
                              <option value="">Nenhuma</option>
                              {grupo.fardamentos.map(f => (
                                <option key={f} value={f}>{f}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => rodarAutoEscala(grupo.id)}
                        className="text-[10px] font-black uppercase tracking-wider text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                        title="Montar escala automaticamente com base no histórico e disponibilidade."
                      >
                        ⚡ AutoEscala
                      </button>
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
                              <span className={`w-2 h-2 rounded-full inline-block ${
                                item.status === 'confirmado' ? 'bg-emerald-500' : item.status === 'recusado' ? 'bg-red-500' : 'bg-amber-400'
                              }`} title={`Status: ${item.status}`} />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              {item.ministerio_funcoes?.nome || 'Geral'}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              item.status === 'confirmado' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                              item.status === 'recusado' ? 'bg-red-50 text-red-700 border border-red-100' :
                              'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {item.status}
                            </span>
                            <button
                              type="button"
                              onClick={() => excluirEscala(item.id)}
                              className="p-1 text-slate-300 hover:text-red-600 transition cursor-pointer"
                              title="Remover da escala"
                            >
                              <X size={14} />
                            </button>
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

      {/* Modal - Novo Evento */}
      {modalEvento && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Novo Evento Ministerial
              </h3>
              <button type="button" onClick={() => setModalEvento(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
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

              <div className="grid grid-cols-2 gap-3">
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

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button type="button" onClick={() => setModalEvento(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer">
                Cancelar
              </button>
              <button type="button" onClick={salvarEvento} disabled={salvando} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition cursor-pointer">
                {salvando ? 'Salvando...' : 'Salvar Evento'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Adicionar Escalado */}
      {modalEscala && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Escalar Voluntário
              </h3>
              <button type="button" onClick={fecharModalEscala} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Selecionar Ministério */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Ministério</label>
                <select
                  value={novaEscala.ministerio_id}
                  onChange={(e) => handleSelecionarMinisterio(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 transition cursor-pointer"
                >
                  <option value="">Selecione um ministério...</option>
                  {listaMinisterios.map(m => (
                    <option key={m.id} value={m.id}>{m.nome}</option>
                  ))}
                </select>
              </div>

              {novaEscala.ministerio_id && (
                <>
                  {/* Selecionar Função */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Função</label>
                    <select
                      value={novaEscala.funcao_id}
                      onChange={(e) => setNovaEscala(prev => ({ ...prev, funcao_id: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 transition cursor-pointer"
                    >
                      <option value="">Selecione a função da escala...</option>
                      {listaFuncoes.map(f => (
                        <option key={f.id} value={f.id}>{f.nome}</option>
                      ))}
                    </select>
                  </div>

                  {/* Campo de Busca Dinâmica de Voluntário no Ministério */}
                  <div className="relative">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Pesquisar Membro da Equipe</label>
                    {voluntarioSelecionado ? (
                      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={voluntarioSelecionado.pessoas?.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(voluntarioSelecionado.pessoas?.nome)}`}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-xs font-bold text-blue-900">{voluntarioSelecionado.pessoas?.nome}</p>
                            <p className="text-[10px] text-blue-700">{voluntarioSelecionado.funcao || 'Voluntário'}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setVoluntarioSelecionado(null)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="relative">
                          <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                          <input
                            type="text"
                            value={buscaVoluntario}
                            onChange={(e) => setBuscaVoluntario(e.target.value)}
                            placeholder="Digite o nome do membro do ministério..."
                            className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30"
                          />
                        </div>
                        {/* Resultados da Busca */}
                        {buscaVoluntario.trim() !== '' && (
                          <div className="absolute z-10 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                            {voluntáriosFiltrados.map(p => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                  setVoluntarioSelecionado(p);
                                  setBuscaVoluntario('');
                                }}
                                className="w-full text-left p-3 hover:bg-slate-50 transition flex items-center gap-3 border-b border-slate-50 last:border-0 cursor-pointer"
                              >
                                <img
                                  src={p.pessoas?.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.pessoas?.nome)}`}
                                  alt=""
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div>
                                  <p className="text-xs font-bold text-slate-800">{p.pessoas?.nome}</p>
                                  <p className="text-[10px] text-slate-400">{p.funcao || 'Voluntário'}</p>
                                </div>
                              </button>
                            ))}
                            {voluntáriosFiltrados.length === 0 && (
                              <div className="p-4 text-center text-xs text-slate-400 italic">
                                Nenhum membro disponível encontrado.
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button
                type="button"
                onClick={fecharModalEscala}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={adicionarEscala}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition cursor-pointer"
              >
                Salvar Escala
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Gerador Mensal de Eventos */}
      {modalGerador && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col text-slate-800">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
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
            <div className="border-b border-slate-100 bg-white px-6 py-4 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              {/* Filtro do Período e Local */}
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="block text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">Mês</label>
                  <select
                    value={mesGeracao}
                    onChange={(e) => setMesGeracao(Number(e.target.value))}
                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-slate-50/30 outline-none focus:border-blue-500 transition cursor-pointer text-slate-700"
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
                    className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-slate-50/30 outline-none focus:border-blue-500 transition cursor-pointer text-slate-700"
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
                    className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-slate-50/30 outline-none focus:border-blue-500 transition w-36 text-slate-700"
                    placeholder="Ex: Templo Sede"
                  />
                </div>
              </div>

              {/* Botões de Abas */}
              <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/50 self-start md:self-auto gap-0.5">
                <button
                  type="button"
                  onClick={() => setAbaGerador('config')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                    abaGerador === 'config'
                      ? 'bg-[#1e3a8a] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  ⚙️ Configurar Regras
                </button>
                <button
                  type="button"
                  onClick={calcularPreviaEventos}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                    abaGerador === 'previa'
                      ? 'bg-[#1e3a8a] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  📋 Prévia e Geração
                </button>
              </div>
            </div>

            {/* Conteúdo Central */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
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
                      <div className="grid grid-cols-3 gap-2">
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
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={novoCultoPadrao.titulo}
                            onChange={(e) => setNovoCultoPadrao(prev => ({ ...prev, titulo: e.target.value }))}
                            className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs bg-white outline-none focus:border-blue-500 transition text-slate-750"
                            placeholder="Ex: Culto da Vitória, Doutrina"
                          />
                          <button
                            type="button"
                            onClick={adicionarCultoPadrao}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer shrink-0"
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
                      <div className="grid grid-cols-3 gap-2">
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
                      <div className="grid grid-cols-2 gap-2.5">
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
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={adicionarEventoCustomizado}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer"
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
                          className={`flex items-start gap-3 p-3.5 border rounded-xl transition cursor-pointer select-none ${
                            item.incluir
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
                            <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md mb-1.5 ${
                              item.isCustom 
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
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => setModalGerador(false)}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
              >
                Cancelar
              </button>

              <div className="flex gap-2">
                {abaGerador === 'config' ? (
                  <button
                    type="button"
                    onClick={calcularPreviaEventos}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
                  >
                    Gerar e Ver Prévia
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setAbaGerador('config')}
                      className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
                    >
                      Voltar e Ajustar
                    </button>
                    <button
                      type="button"
                      onClick={salvarEventosLote}
                      disabled={salvando}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 transition active:scale-95 cursor-pointer"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Editar Evento Ministerial
              </h3>
              <button type="button" onClick={() => setModalEditar(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
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

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button type="button" onClick={() => setModalEditar(false)} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer">
                Cancelar
              </button>
              <button type="button" onClick={salvarEdicaoEvento} disabled={salvando} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition cursor-pointer">
                {salvando ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}