import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, Users, CheckCircle2, Clock, XCircle, Share2,
  Send, Copy, Check, ChevronLeft, ChevronRight, Search,
  Sparkles, AlertCircle, Phone, ExternalLink, Filter,
  Layers, List, ArrowRight, MessageSquare, Shield
} from 'lucide-react';
import { escalasService } from '../services/escalasService';
import { supabase } from '../../supabaseClient';

const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const NOMES_DIAS_SEMANA = [
  'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
];

export default function MinistryMonthlyOverview({ ministerio, onVoltar }) {
  const agora = new Date();
  const [filtroMes, setFiltroMes] = useState(agora.getMonth());
  const [filtroAno, setFiltroAno] = useState(agora.getFullYear());

  const [eventosDoMes, setEventosDoMes] = useState([]);
  const [escalasDoMes, setEscalasDoMes] = useState([]);
  const [funcoes, setFuncoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos'); // 'todos' | 'pendente' | 'confirmado' | 'recusado'
  const [modoVisualizacao, setModoVisualizacao] = useState('membros'); // 'membros' | 'eventos'

  // Modal de Disparo em Lote
  const [modalDisparoAberto, setModalDisparoAberto] = useState(false);
  const [pessoasSelecionadasLote, setPessoasSelecionadasLote] = useState(new Set());
  const [statusEnviosLote, setStatusEnviosLote] = useState({}); // { [pessoaId]: boolean }
  const [disparandoLote, setDisparandoLote] = useState(false);
  const [progressoLote, setProgressoLote] = useState({ atual: 0, total: 0, nome: '' });
  const cancelarLoteRef = React.useRef(false);
  const [toastNotificacao, setToastNotificacao] = useState(null);
  const [copiadoId, setCopiadoId] = useState(null);

  const corPrincipal = ministerio?.cor_principal || '#2563eb';

  const mostrarToast = (msg) => {
    setToastNotificacao(msg);
    setTimeout(() => setToastNotificacao(null), 3500);
  };

  // Carregar eventos e escalas do mês
  useEffect(() => {
    if (!ministerio?.id) return;
    carregarDadosMensais();
  }, [ministerio?.id, filtroMes, filtroAno]);

  async function carregarDadosMensais() {
    setCarregando(true);
    try {
      // 1. Definir datas início e fim do mês
      const dataInicioMes = new Date(Date.UTC(filtroAno, filtroMes, 1, 0, 0, 0)).toISOString();
      const dataFimMes = new Date(Date.UTC(filtroAno, filtroMes + 1, 0, 23, 59, 59, 999)).toISOString();

      // 2. Buscar eventos do mês
      const { data: eventos, error: errEv } = await supabase
        .from('eventos_ministeriais')
        .select('*')
        .gte('data_evento', dataInicioMes)
        .lte('data_evento', dataFimMes)
        .order('data_evento', { ascending: true });

      if (errEv) throw errEv;
      const evs = eventos || [];
      setEventosDoMes(evs);

      const eventoIds = evs.map(e => e.id);
      if (eventoIds.length === 0) {
        setEscalasDoMes([]);
        setCarregando(false);
        return;
      }

      // 3. Buscar escalas e funções
      const [escalasData, funcsData] = await Promise.all([
        escalasService.listarEscalasMes(eventoIds, ministerio.id),
        escalasService.listarFuncoes(ministerio.id)
      ]);

      // Mapear eventos dentro de cada escala para facilitar acesso
      const mapaEv = new Map(evs.map(e => [e.id, e]));
      const escalasHidratadas = (escalasData || []).map(esc => ({
        ...esc,
        eventos_ministeriais: esc.eventos_ministeriais || mapaEv.get(esc.evento_id)
      }));

      setEscalasDoMes(escalasHidratadas);
      setFuncoes(funcsData || []);
    } catch (error) {
      console.error('Erro ao carregar escalas mensais:', error);
      mostrarToast('⚠️ Erro ao carregar dados do mês: ' + error.message);
    } finally {
      setCarregando(false);
    }
  }

  // Agrupar escalas por voluntário (membro)
  const dadosPorMembro = useMemo(() => {
    const mapa = new Map();

    escalasDoMes.forEach(esc => {
      const pessoa = esc.pessoas;
      const pessoaId = esc.pessoa_id || pessoa?.id;
      if (!pessoaId) return;

      if (!mapa.has(pessoaId)) {
        mapa.set(pessoaId, {
          pessoaId,
          nome: pessoa?.nome || 'Voluntário',
          telefone: pessoa?.telefone || '',
          fotoUrl: pessoa?.foto_url || '',
          escalas: []
        });
      }

      const item = mapa.get(pessoaId);
      item.escalas.push(esc);
    });

    // Ordenar escalas de cada pessoa por data do evento
    const lista = Array.from(mapa.values()).map(membro => {
      membro.escalas.sort((a, b) => {
        const tA = a.eventos_ministeriais?.data_evento ? new Date(a.eventos_ministeriais.data_evento).getTime() : 0;
        const tB = b.eventos_ministeriais?.data_evento ? new Date(b.eventos_ministeriais.data_evento).getTime() : 0;
        return tA - tB;
      });

      const total = membro.escalas.length;
      const confirmados = membro.escalas.filter(e => e.status === 'confirmado' || e.status === 'presente').length;
      const pendentes = membro.escalas.filter(e => !e.status || e.status === 'pendente').length;
      const recusados = membro.escalas.filter(e => e.status === 'recusado' || e.status === 'ausente' || e.status === 'falta' || e.status === 'falta_justificada' || e.status === 'falta_injustificada').length;

      return {
        ...membro,
        totalEscalas: total,
        totalConfirmados: confirmados,
        totalPendentes: pendentes,
        totalRecusados: recusados,
        statusGeral: recusados > 0 ? 'recusado' : pendentes > 0 ? 'pendente' : 'confirmado'
      };
    });

    // Ordenar alfabeticamente por nome do voluntário
    lista.sort((a, b) => a.nome.localeCompare(b.nome));
    return lista;
  }, [escalasDoMes]);

  // Estatísticas gerais do mês
  const metricas = useMemo(() => {
    const totalVoluntarios = dadosPorMembro.length;
    const totalEscalas = escalasDoMes.length;
    const totalConfirmados = escalasDoMes.filter(e => e.status === 'confirmado' || e.status === 'presente').length;
    const totalPendentes = escalasDoMes.filter(e => !e.status || e.status === 'pendente').length;
    const totalRecusados = escalasDoMes.filter(e => e.status === 'recusado' || e.status === 'ausente' || e.status === 'falta' || e.status === 'falta_justificada' || e.status === 'falta_injustificada').length;
    const taxaConfirmacao = totalEscalas > 0 ? Math.round((totalConfirmados / totalEscalas) * 100) : 0;

    return {
      totalVoluntarios,
      totalEscalas,
      totalConfirmados,
      totalPendentes,
      totalRecusados,
      taxaConfirmacao
    };
  }, [dadosPorMembro, escalasDoMes]);

  // Filtragem dos membros
  const membrosFiltrados = useMemo(() => {
    return dadosPorMembro.filter(m => {
      const bateBusca = busca.trim() === '' || m.nome.toLowerCase().includes(busca.toLowerCase());
      if (!bateBusca) return false;

      if (filtroStatus === 'todos') return true;
      if (filtroStatus === 'confirmado') return m.totalConfirmados === m.totalEscalas && m.totalEscalas > 0;
      if (filtroStatus === 'pendente') return m.totalPendentes > 0;
      if (filtroStatus === 'recusado') return m.totalRecusados > 0;
      return true;
    });
  }, [dadosPorMembro, busca, filtroStatus]);

  // Navegação de Meses
  const retrocederMes = () => {
    if (filtroMes === 0) {
      setFiltroMes(11);
      setFiltroAno(prev => prev - 1);
    } else {
      setFiltroMes(prev => prev - 1);
    }
  };

  const avancarMes = () => {
    if (filtroMes === 11) {
      setFiltroMes(0);
      setFiltroAno(prev => prev + 1);
    } else {
      setFiltroMes(prev => prev + 1);
    }
  };

  const irParaMesAtual = () => {
    const hoje = new Date();
    setFiltroMes(hoje.getMonth());
    setFiltroAno(hoje.getFullYear());
  };

  // Gerar link público de confirmação para um voluntário
  const gerarLinkPublico = (pessoaId, escalaId = null) => {
    const base = window.location.origin;
    if (escalaId) {
      return `${base}/confirmar-escala?id=${escalaId}&pessoa=${pessoaId}&mes=${filtroMes}&ano=${filtroAno}`;
    }
    return `${base}/confirmar-escala?pessoa=${pessoaId}&mes=${filtroMes}&ano=${filtroAno}`;
  };

  // Formatar texto personalizado para WhatsApp de um voluntário
  const gerarTextoWhatsApp = (membro) => {
    const mesNome = NOMES_MESES[filtroMes];
    const linkConfirmacao = gerarLinkPublico(membro.pessoaId, membro.escalas[0]?.id);

    let texto = `Olá, *${membro.nome}*! 🙌\n\n`;
    texto += `Você foi escalado(a) para servir no ministério *${ministerio?.nome}* na *MIB Church* em *${mesNome}/${filtroAno}* (${membro.escalas.length} ${membro.escalas.length === 1 ? 'escala' : 'escalas'}):\n\n`;

    membro.escalas.forEach((esc, idx) => {
      const ev = esc.eventos_ministeriais;
      const dataEv = ev?.data_evento ? new Date(ev.data_evento) : null;
      let dataStr = '';
      let horaStr = '';
      let diaSemanaStr = '';

      if (dataEv) {
        const bDate = new Date(dataEv.getTime() - 3 * 3600 * 1000);
        dataStr = `${String(bDate.getUTCDate()).padStart(2, '0')}/${String(bDate.getUTCMonth() + 1).padStart(2, '0')}`;
        horaStr = `${String(bDate.getUTCHours()).padStart(2, '0')}:${String(bDate.getUTCMinutes()).padStart(2, '0')}`;
        diaSemanaStr = NOMES_DIAS_SEMANA[bDate.getUTCDay()];
      }

      const funcNome = esc.ministerio_funcoes?.nome || 'Voluntário';
      const fardaSel = ev?.fardamentos?.[ministerio?.id];
      const statusIcon = (esc.status === 'confirmado' || esc.status === 'presente') ? '✅' : (esc.status === 'recusado' ? '❌' : '⏳');

      texto += `🗓️ *${idx + 1}. ${diaSemanaStr ? diaSemanaStr.toUpperCase() : ''}, ${dataStr} às ${horaStr}* ${statusIcon}\n`;
      texto += ` • Evento: ${ev?.titulo || 'Culto'}\n`;
      texto += ` • Função: ${funcNome}\n`;
      if (fardaSel) texto += ` • Fardamento: ${fardaSel}\n`;
      if (ev?.local) texto += ` • Local: ${ev.local}\n`;
      texto += `\n`;
    });

    texto += `👉 *Por favor, confirme suas escalas no link oficial abaixo:*\n`;
    texto += `${linkConfirmacao}\n\n`;
    texto += `_Que Deus abençoe seu ministério!_ 🙏`;

    return texto;
  };

  // Enviar WhatsApp individual
  const enviarWhatsAppIndividual = (membro) => {
    const texto = gerarTextoWhatsApp(membro);
    const telLimpo = membro.telefone ? String(membro.telefone).replace(/\D/g, '') : '';

    if (telLimpo && telLimpo.length >= 10) {
      const url = `https://wa.me/55${telLimpo}?text=${encodeURIComponent(texto)}`;
      try {
        navigator.clipboard?.writeText?.(texto).catch(() => { });
      } catch (_) { }
      window.open(url, '_blank');
      mostrarToast(`✓ WhatsApp aberto para ${membro.nome}!`);
    } else {
      copiarTexto(texto, `✓ Link e mensagem de ${membro.nome} copiados! (Sem telefone cadastrado)`);
    }
  };

  const copiarTexto = (texto, mensagemSucesso = 'Copiado para a área de transferência!') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(texto)
        .then(() => mostrarToast(mensagemSucesso))
        .catch(() => alert('Não foi possível copiar automaticamente.'));
    } else {
      mostrarToast(mensagemSucesso);
    }
  };

  const copiarLinkVoluntario = (membro) => {
    const link = gerarLinkPublico(membro.pessoaId, membro.escalas[0]?.id);
    copiarTexto(link, `✓ Link de confirmação de ${membro.nome} copiado!`);
    setCopiadoId(membro.pessoaId);
    setTimeout(() => setCopiadoId(null), 2500);
  };

  // Copiar resumo geral do ministério para WhatsApp
  const copiarResumoGeralMinisterio = () => {
    const mesNome = NOMES_MESES[filtroMes];
    let texto = `*📋 ESCALA MENSAL - ${ministerio?.nome?.toUpperCase()}*\n`;
    texto += `*MIB Church · ${mesNome}/${filtroAno}*\n`;
    texto += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    eventosDoMes.forEach((ev) => {
      const escalasEv = escalasDoMes.filter(e => e.evento_id === ev.id);
      if (escalasEv.length === 0) return;

      const dataEv = ev.data_evento ? new Date(ev.data_evento) : null;
      let dataStr = '';
      let horaStr = '';
      let diaSemanaStr = '';

      if (dataEv) {
        const bDate = new Date(dataEv.getTime() - 3 * 3600 * 1000);
        dataStr = `${String(bDate.getUTCDate()).padStart(2, '0')}/${String(bDate.getUTCMonth() + 1).padStart(2, '0')}`;
        horaStr = `${String(bDate.getUTCHours()).padStart(2, '0')}:${String(bDate.getUTCMinutes()).padStart(2, '0')}`;
        diaSemanaStr = NOMES_DIAS_SEMANA[bDate.getUTCDay()];
      }

      const farda = ev.fardamentos?.[ministerio?.id];

      texto += `📅 *${diaSemanaStr ? diaSemanaStr.toUpperCase() : ''}, ${dataStr} às ${horaStr}*\n`;
      texto += `🏛️ *${ev.titulo}*\n`;
      if (farda) texto += `👕 *Farda:* ${farda}\n`;
      texto += `👥 *Equipe Escalada:*\n`;

      escalasEv.forEach(esc => {
        const funcNome = esc.ministerio_funcoes?.nome || 'Geral';
        const pNome = esc.pessoas?.nome || 'Voluntário';
        const st = (esc.status === 'confirmado' || esc.status === 'presente') ? '✅' : (esc.status === 'recusado' ? '❌' : '⏳');
        texto += `  • ${funcNome}: *${pNome}* ${st}\n`;
      });

      texto += `\n`;
    });

    texto += `━━━━━━━━━━━━━━━━━━━━\n`;
    texto += `_Escala oficial gerada pelo Gestor Ministerial MIB Church._`;

    copiarTexto(texto, '✓ Grade completa do mês copiada para WhatsApp!');
  };

  // Abrir Modal de Disparo em Lote
  const abrirModalDisparoLote = () => {
    // Por padrão, seleciona todas as pessoas que têm telefone
    const todosIds = new Set(dadosPorMembro.map(m => m.pessoaId));
    setPessoasSelecionadasLote(todosIds);
    setModalDisparoAberto(true);
  };

  const alternarSelecaoPessoaLote = (pessoaId) => {
    setPessoasSelecionadasLote(prev => {
      const novo = new Set(prev);
      if (novo.has(pessoaId)) {
        novo.delete(pessoaId);
      } else {
        novo.add(pessoaId);
      }
      return novo;
    });
  };

  const alternarSelecionarTodosLote = () => {
    if (pessoasSelecionadasLote.size === dadosPorMembro.length) {
      setPessoasSelecionadasLote(new Set());
    } else {
      setPessoasSelecionadasLote(new Set(dadosPorMembro.map(m => m.pessoaId)));
    }
  };

  // Disparar envio individual dentro do modal de lote
  const dispararItemLote = (membro) => {
    enviarWhatsAppIndividual(membro);
    setStatusEnviosLote(prev => ({ ...prev, [membro.pessoaId]: true }));
  };

  // Iniciar disparo automático sequencial de todos os membros marcados
  const iniciarDisparoTodosMarcados = async () => {
    const listaMarcados = dadosPorMembro.filter(m => pessoasSelecionadasLote.has(m.pessoaId));
    if (listaMarcados.length === 0) {
      alert('Selecione ao menos um voluntário para disparar.');
      return;
    }

    const comTelefone = listaMarcados.filter(m => {
      const tel = m.telefone ? String(m.telefone).replace(/\D/g, '') : '';
      return tel.length >= 10;
    });

    if (comTelefone.length === 0) {
      alert('Nenhum dos voluntários selecionados possui telefone válido cadastrado para envio via WhatsApp.');
      return;
    }

    setDisparandoLote(true);
    cancelarLoteRef.current = false;

    let enviados = 0;
    for (let i = 0; i < comTelefone.length; i++) {
      if (cancelarLoteRef.current) break;
      const membro = comTelefone[i];
      setProgressoLote({
        atual: i + 1,
        total: comTelefone.length,
        nome: membro.nome
      });

      enviarWhatsAppIndividual(membro);
      setStatusEnviosLote(prev => ({ ...prev, [membro.pessoaId]: true }));
      enviados++;

      if (i < comTelefone.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1400));
      }
    }

    setDisparandoLote(false);
    if (!cancelarLoteRef.current) {
      mostrarToast(`✓ Disparo finalizado: ${enviados} voluntário(s) notificado(s)!`);
    } else {
      mostrarToast(`Disparo pausado (${enviados} enviados).`);
    }
  };

  const pararDisparoLote = () => {
    cancelarLoteRef.current = true;
    setDisparandoLote(false);
  };

  // Copiar todas as mensagens formatadas dos membros marcados
  const copiarTodasMensagensMarcadas = () => {
    const listaMarcados = dadosPorMembro.filter(m => pessoasSelecionadasLote.has(m.pessoaId));
    if (listaMarcados.length === 0) {
      alert('Selecione ao menos um voluntário para copiar.');
      return;
    }

    let textoGeral = '';
    listaMarcados.forEach((m) => {
      textoGeral += `━━━━━━━━━━━━━━━━━━━━\n`;
      textoGeral += `👤 *DESTINATÁRIO:* ${m.nome} (Tel: ${m.telefone || 'Sem telefone'})\n`;
      textoGeral += `━━━━━━━━━━━━━━━━━━━━\n`;
      textoGeral += gerarTextoWhatsApp(m);
      textoGeral += `\n\n`;
    });

    copiarTexto(textoGeral, `✓ Todas as ${listaMarcados.length} mensagens marcadas foram copiadas!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast de Notificação */}
      {toastNotificacao && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4.5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-300">
          <Sparkles size={16} className="text-emerald-400" />
          <span className="text-xs sm:text-sm font-bold">{toastNotificacao}</span>
        </div>
      )}

      {/* CABEÇALHO / NAVEGAÇÃO DO MÊS */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white" style={{ backgroundColor: corPrincipal }}>
                Escala Mensal
              </span>
              <span className="text-xs font-bold text-slate-400">
                {ministerio?.nome}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-1 flex items-center gap-2">
              <span>🗓️</span> {NOMES_MESES[filtroMes]} de {filtroAno}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Visão geral de todos os voluntários escalados e disparos de confirmação via WhatsApp.
            </p>
          </div>

          {/* Controles de Mês/Ano */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={retrocederMes}
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition active:scale-95 cursor-pointer"
                title="Mês anterior"
              >
                <ChevronLeft size={16} />
              </button>

              <select
                value={filtroMes}
                onChange={(e) => setFiltroMes(Number(e.target.value))}
                className="bg-transparent text-xs font-black uppercase text-slate-700 px-2 outline-none cursor-pointer"
              >
                {NOMES_MESES.map((m, idx) => (
                  <option key={m} value={idx}>{m}</option>
                ))}
              </select>

              <select
                value={filtroAno}
                onChange={(e) => setFiltroAno(Number(e.target.value))}
                className="bg-transparent text-xs font-black text-slate-700 px-2 outline-none cursor-pointer border-l border-slate-200"
              >
                {[2025, 2026, 2027, 2028].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <button
                type="button"
                onClick={avancarMes}
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition active:scale-95 cursor-pointer"
                title="Próximo mês"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={irParaMesAtual}
              className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition active:scale-95 cursor-pointer"
            >
              Mês Atual
            </button>

            {/* BOTÃO PRINCIPAL: DISPARO EM LOTE WHATSAPP */}
            <button
              type="button"
              onClick={abrirModalDisparoLote}
              disabled={dadosPorMembro.length === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/25 border border-emerald-400/30 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Send size={14} strokeWidth={2.5} />
              <span>Avisar no WhatsApp ({dadosPorMembro.length})</span>
            </button>

            {/* BOTÃO: COPIAR RESUMO GERAL */}
            <button
              type="button"
              onClick={copiarResumoGeralMinisterio}
              disabled={escalasDoMes.length === 0}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition active:scale-95 disabled:opacity-50 cursor-pointer"
              title="Copiar grade completa do mês formatada para WhatsApp"
            >
              <Copy size={14} />
              <span className="hidden sm:inline">Copiar Grade</span>
            </button>
          </div>
        </div>
      </div>

      {/* METRICAS DO MÊS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Escalados</span>
            <Users size={16} className="text-blue-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-slate-800">{metricas.totalVoluntarios}</span>
            <span className="text-[10px] text-slate-400 font-bold ml-1.5">membros</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Total de Escalas</span>
            <Calendar size={16} className="text-indigo-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-slate-800">{metricas.totalEscalas}</span>
            <span className="text-[10px] text-slate-400 font-bold ml-1.5">vagas nos cultos</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Confirmados</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-emerald-600">{metricas.totalConfirmados}</span>
            <span className="text-[10px] text-slate-400 font-bold ml-1.5">confirmaram</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Pendentes</span>
            <Clock size={16} className="text-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-amber-600">{metricas.totalPendentes}</span>
            <span className="text-[10px] text-slate-400 font-bold ml-1.5">aguardando</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Confirmação</span>
            <span className="text-xs font-black text-slate-700">{metricas.taxaConfirmacao}%</span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${metricas.taxaConfirmacao}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
              <span>{metricas.totalConfirmados}/{metricas.totalEscalas}</span>
              {metricas.totalRecusados > 0 && <span className="text-rose-500">{metricas.totalRecusados} recusa(s)</span>}
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE FILTRO E ALTERNÂNCIA DE MODO */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar voluntário na escala..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Filtro de Status */}
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'pendente', label: 'Pendentes' },
              { id: 'confirmado', label: 'Confirmados' },
              { id: 'recusado', label: 'Recusados' }
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltroStatus(f.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition ${filtroStatus === f.id
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Alternador de Modo de Visualização */}
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setModoVisualizacao('membros')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition ${modoVisualizacao === 'membros'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <Users size={13} />
              <span>Por Voluntário</span>
            </button>
            <button
              type="button"
              onClick={() => setModoVisualizacao('eventos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition ${modoVisualizacao === 'eventos'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <Calendar size={13} />
              <span>Por Culto</span>
            </button>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      {carregando ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 italic">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mb-3" />
          <p className="text-xs font-bold">Carregando escalas do mês...</p>
        </div>
      ) : dadosPorMembro.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-400 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
            📅
          </div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">
            Nenhuma escala cadastrada para este ministério em {NOMES_MESES[filtroMes]}/{filtroAno}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Utilize a aba "Escalas" do Gestor Ministerial para criar eventos e escalar a equipe, ou utilize a AutoEscala inteligente.
          </p>
        </div>
      ) : modoVisualizacao === 'membros' ? (
        /* VISUALIZAÇÃO POR VOLUNTÁRIO (CARDS) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {membrosFiltrados.map(membro => {
            const telLimpo = membro.telefone ? String(membro.telefone).replace(/\D/g, '') : '';
            const temTelefone = telLimpo && telLimpo.length >= 10;

            return (
              <div
                key={membro.pessoaId}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Cabeçalho do Card */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black flex items-center justify-center shrink-0 shadow-xs overflow-hidden text-sm">
                        {membro.fotoUrl ? (
                          <img src={membro.fotoUrl} alt={membro.nome} className="w-full h-full object-cover" />
                        ) : (
                          membro.nome.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm text-slate-800 truncate" title={membro.nome}>
                          {membro.nome}
                        </h4>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                          <Phone size={11} />
                          {membro.telefone || 'Sem telefone cadastrado'}
                        </p>
                      </div>
                    </div>

                    {/* Badge do Status Geral */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      {membro.statusGeral === 'confirmado' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={12} /> Confirmado
                        </span>
                      ) : membro.statusGeral === 'recusado' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle size={12} /> Recusou
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock size={12} /> Pendente
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Lista de Escalas do Voluntário no Mês */}
                  <div className="p-4 space-y-2.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Escalas no Mês ({membro.escalas.length}):
                    </span>

                    <div className="space-y-2">
                      {membro.escalas.map((esc) => {
                        const ev = esc.eventos_ministeriais;
                        const dataEv = ev?.data_evento ? new Date(ev.data_evento) : null;
                        let dataStr = 'Data indefinida';
                        let horaStr = '';
                        let diaSemanaStr = '';

                        if (dataEv) {
                          const bDate = new Date(dataEv.getTime() - 3 * 3600 * 1000);
                          dataStr = `${String(bDate.getUTCDate()).padStart(2, '0')}/${String(bDate.getUTCMonth() + 1).padStart(2, '0')}`;
                          horaStr = `${String(bDate.getUTCHours()).padStart(2, '0')}:${String(bDate.getUTCMinutes()).padStart(2, '0')}`;
                          diaSemanaStr = NOMES_DIAS_SEMANA[bDate.getUTCDay()];
                        }

                        const funcNome = esc.ministerio_funcoes?.nome || 'Voluntário';
                        const farda = ev?.fardamentos?.[ministerio?.id];
                        const isConf = esc.status === 'confirmado' || esc.status === 'presente';
                        const isRec = esc.status === 'recusado' || esc.status === 'ausente' || esc.status === 'falta';

                        return (
                          <div
                            key={esc.id}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs transition ${isConf
                              ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-900'
                              : isRec
                                ? 'bg-rose-50/50 border-rose-200/80 text-rose-900'
                                : 'bg-slate-50 border-slate-200/70 text-slate-800'
                              }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 font-black">
                                <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px]">
                                  {diaSemanaStr ? diaSemanaStr.slice(0, 3).toUpperCase() : ''} · {dataStr}
                                </span>
                                <span className="truncate">{ev?.titulo || 'Culto'}</span>
                                {horaStr && <span className="text-[10px] opacity-75">({horaStr})</span>}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                                <span>📌 <strong>Função:</strong> {funcNome}</span>
                                {farda && <span>👕 <strong>Farda:</strong> {farda}</span>}
                              </div>
                            </div>

                            <div className="shrink-0 text-right">
                              {isConf ? (
                                <span className="text-emerald-600 font-black text-[10px] flex items-center gap-1">
                                  <CheckCircle2 size={12} /> Confirmado
                                </span>
                              ) : isRec ? (
                                <span className="text-rose-600 font-black text-[10px] flex items-center gap-1">
                                  <XCircle size={12} /> Recusado
                                </span>
                              ) : (
                                <span className="text-amber-600 font-black text-[10px] flex items-center gap-1">
                                  <Clock size={12} /> Aguardando
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Rodapé de Ações do Voluntário */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => enviarWhatsAppIndividual(membro)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-xs cursor-pointer"
                    title={temTelefone ? 'Abrir conversa no WhatsApp' : 'Copiar texto para WhatsApp'}
                  >
                    <Send size={13} strokeWidth={2.5} />
                    <span>Enviar WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => copiarLinkVoluntario(membro)}
                    className="flex items-center justify-center gap-1 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs"
                    title="Copiar link público mensal do voluntário"
                  >
                    {copiadoId === membro.pessoaId ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span className="hidden xs:inline">Link</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VISUALIZAÇÃO POR CULTO / EVENTO */
        <div className="space-y-4">
          {eventosDoMes.map(ev => {
            const escalasEv = escalasDoMes.filter(e => e.evento_id === ev.id);
            const dataEv = ev.data_evento ? new Date(ev.data_evento) : null;
            let dataStr = '';
            let horaStr = '';
            let diaSemanaStr = '';

            if (dataEv) {
              const bDate = new Date(dataEv.getTime() - 3 * 3600 * 1000);
              dataStr = `${String(bDate.getUTCDate()).padStart(2, '0')}/${String(bDate.getUTCMonth() + 1).padStart(2, '0')}/${bDate.getUTCFullYear()}`;
              horaStr = `${String(bDate.getUTCHours()).padStart(2, '0')}:${String(bDate.getUTCMinutes()).padStart(2, '0')}`;
              diaSemanaStr = NOMES_DIAS_SEMANA[bDate.getUTCDay()];
            }

            const farda = ev.fardamentos?.[ministerio?.id];

            return (
              <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                {/* Header do Evento */}
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center shrink-0">
                      {diaSemanaStr ? diaSemanaStr.slice(0, 3).toUpperCase() : '📅'}
                    </span>
                    <div>
                      <h4 className="font-black text-sm text-slate-800">
                        {ev.titulo}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        📅 {dataStr} · ⏰ {horaStr} {ev.local ? `· 📍 ${ev.local}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {farda && (
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200/60">
                        👕 Farda: {farda}
                      </span>
                    )}
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-200/80 text-slate-700 px-2.5 py-1 rounded-lg">
                      👥 {escalasEv.length} escalado(s)
                    </span>
                  </div>
                </div>

                {/* Tabela de Funções Escaladas no Evento */}
                <div className="p-4">
                  {escalasEv.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">
                      Nenhum voluntário escalado neste culto para {ministerio?.nome}.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {escalasEv.map(esc => {
                        const isConf = esc.status === 'confirmado' || esc.status === 'presente';
                        const isRec = esc.status === 'recusado' || esc.status === 'ausente';
                        const funcNome = esc.ministerio_funcoes?.nome || 'Voluntário';
                        const pNome = esc.pessoas?.nome || 'Voluntário';

                        return (
                          <div
                            key={esc.id}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${isConf
                              ? 'bg-emerald-50/50 border-emerald-200/60 text-emerald-950'
                              : isRec
                                ? 'bg-rose-50/50 border-rose-200/60 text-rose-950'
                                : 'bg-slate-50 border-slate-200/70 text-slate-900'
                              }`}
                          >
                            <div className="min-w-0">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                                {funcNome}
                              </span>
                              <strong className="text-xs font-bold block truncate" title={pNome}>
                                {pNome}
                              </strong>
                            </div>

                            <div className="shrink-0">
                              {isConf ? (
                                <span className="text-emerald-600 text-xs" title="Confirmado">✅</span>
                              ) : isRec ? (
                                <span className="text-rose-600 text-xs" title="Recusado">❌</span>
                              ) : (
                                <span className="text-amber-600 text-xs" title="Pendente">⏳</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE DISPARO EM LOTE (WHATSAPP) */}
      {modalDisparoAberto && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header do Modal */}
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">
                  📲
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider">
                    Avisar Equipe no WhatsApp
                  </h3>
                  <p className="text-xs text-emerald-100 font-medium">
                    {ministerio?.nome} · {NOMES_MESES[filtroMes]}/{filtroAno} ({dadosPorMembro.length} voluntários)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (disparandoLote) pararDisparoLote();
                  setModalDisparoAberto(false);
                }}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Corpo do Modal */}
            <div className="p-4 sm:p-6 space-y-4 flex-1 overflow-y-auto">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
                <Sparkles size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">Como funciona o aviso em lote?</p>
                  <p className="text-emerald-800 font-medium">
                    Cada voluntário receberá uma mensagem personalizada no WhatsApp com todas as suas datas, funções, fardamentos e o <strong>link público exclusivo</strong> para confirmar a presença no mês.
                  </p>
                </div>
              </div>

              {/* Status de Disparo Ativo */}
              {disparandoLote && (
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3.5 rounded-xl shadow-md space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Disparando WhatsApp para: {progressoLote.nome}
                    </span>
                    <span>{progressoLote.atual} de {progressoLote.total}</span>
                  </div>
                  <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-white h-full transition-all duration-300"
                      style={{ width: `${(progressoLote.atual / progressoLote.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Controles de Seleção */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={alternarSelecionarTodosLote}
                    disabled={disparandoLote}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer disabled:opacity-50"
                  >
                    {pessoasSelecionadasLote.size === dadosPorMembro.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
                  </button>

                  <span className="text-slate-300">·</span>

                  <button
                    type="button"
                    onClick={() => {
                      const pendentes = new Set(dadosPorMembro.filter(m => m.totalPendentes > 0).map(m => m.pessoaId));
                      setPessoasSelecionadasLote(pendentes);
                    }}
                    disabled={disparandoLote}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 transition cursor-pointer disabled:opacity-50"
                  >
                    Marcar Apenas Pendentes
                  </button>
                </div>

                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  {pessoasSelecionadasLote.size} de {dadosPorMembro.length} selecionados
                </span>
              </div>

              {/* Lista dos Voluntários para Disparo */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {dadosPorMembro.map(membro => {
                  const selecionado = pessoasSelecionadasLote.has(membro.pessoaId);
                  const jaEnviado = statusEnviosLote[membro.pessoaId];
                  const telLimpo = membro.telefone ? String(membro.telefone).replace(/\D/g, '') : '';
                  const temTel = telLimpo && telLimpo.length >= 10;

                  return (
                    <div
                      key={membro.pessoaId}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${jaEnviado
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : selecionado
                          ? 'bg-slate-50 border-slate-300'
                          : 'bg-white border-slate-200 opacity-60'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={selecionado}
                          onChange={() => alternarSelecaoPessoaLote(membro.pessoaId)}
                          disabled={disparandoLote}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
                        />

                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-slate-800 truncate">
                            {membro.nome}
                          </h5>
                          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <span>📱 {membro.telefone || 'Sem telefone'}</span>
                            <span>· 🗓️ {membro.escalas.length} {membro.escalas.length === 1 ? 'escala' : 'escalas'}</span>
                            {membro.totalPendentes > 0 && <span className="text-amber-600 font-bold">({membro.totalPendentes} pendente)</span>}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {jaEnviado ? (
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Check size={12} /> Enviado
                          </span>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => dispararItemLote(membro)}
                          disabled={disparandoLote}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <Send size={12} />
                          <span>Enviar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rodapé do Modal com BOTÃO PRINCIPAL DE DISPARAR DE UMA SÓ VEZ */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (disparandoLote) pararDisparoLote();
                    setModalDisparoAberto(false);
                  }}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition active:scale-95 cursor-pointer text-center"
                >
                  Concluir
                </button>

                <button
                  type="button"
                  onClick={copiarTodasMensagensMarcadas}
                  className="py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Copiar mensagens de todos os voluntários selecionados"
                >
                  <Copy size={13} />
                  <span className="hidden sm:inline">Copiar Mensagens</span>
                </button>
              </div>

              {/* BOTÃO OFICIAL DE ENVIAR P/ TODOS */}
              <button
                type="button"
                onClick={disparandoLote ? pararDisparoLote : iniciarDisparoTodosMarcados}
                disabled={pessoasSelecionadasLote.size === 0}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-lg cursor-pointer ${disparandoLote
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30 ring-2 ring-amber-500/20'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-600 text-white shadow-emerald-600/30 border border-emerald-400/30 ring-2 ring-emerald-500/20'
                  }`}
              >
                {disparandoLote ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Pausar Disparo ({progressoLote.atual}/{progressoLote.total})</span>
                  </>
                ) : (
                  <>
                    <Send size={15} strokeWidth={2.5} />
                    <span>Enviar P/ Todos ({pessoasSelecionadasLote.size} Marcados)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
