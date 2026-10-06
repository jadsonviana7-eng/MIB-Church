import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { escalasService } from './ministerial/services/escalasService';
import { MinistryIcon } from './ui';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  User,
  Sparkles,
  AlertCircle,
  Send,
  ExternalLink,
  Shirt,
  Mic,
  RotateCcw,
  CheckCheck
} from 'lucide-react';

export default function PublicConfirmarEscala() {
  const [parametrosBusca, setParametrosBusca] = useState(null);
  const [dadosMes, setDadosMes] = useState(null); // { pessoa, mesInfo, escalas }
  const [dadosIgreja, setDadosIgreja] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvandoId, setSalvandoId] = useState(null); // 'all' ou ID de escala
  const [erro, setErro] = useState(null);

  // Controle de justificativa por escala
  const [justificativaAbertaId, setJustificativaAbertaId] = useState(null); // 'all' ou escalaId
  const [justificativasPorEscala, setJustificativasPorEscala] = useState({});
  const [sucessoMensagem, setSucessoMensagem] = useState(null);

  // 1. Extrair parâmetros da URL
  useEffect(() => {
    let id = null;
    let pessoaId = null;
    let mes = null;
    let ano = null;

    // A. Query Params (?id=xxx&pessoa=yyy&mes=z&ano=w)
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id') || urlParams.get('escala') || urlParams.get('escala_id');
    pessoaId = urlParams.get('pessoa') || urlParams.get('pessoa_id');
    mes = urlParams.get('mes');
    ano = urlParams.get('ano');

    // B. Pathname (/confirmar-escala/xxx)
    if (!id) {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length >= 2 && parts[0] === 'confirmar-escala') {
        id = parts[1];
      }
    }

    // C. Hash (#/confirmar-escala?id=xxx...)
    if ((!id && !pessoaId) && window.location.hash) {
      const hashStr = window.location.hash.replace(/^#\/?/, '');
      const hashParams = new URLSearchParams(hashStr.includes('?') ? hashStr.split('?')[1] : '');
      id = hashParams.get('id') || hashParams.get('escala') || hashParams.get('escala_id');
      pessoaId = hashParams.get('pessoa') || hashParams.get('pessoa_id');
      mes = hashParams.get('mes');
      ano = hashParams.get('ano');

      if (!id && hashStr.startsWith('confirmar-escala/')) {
        id = hashStr.split('/')[1];
      }
    }

    const cleanId = id ? String(id).trim().replace(/\/$/, '') : null;
    const cleanPessoaId = pessoaId ? String(pessoaId).trim() : null;

    if (cleanId || cleanPessoaId) {
      const params = {
        escalaId: cleanId,
        pessoaId: cleanPessoaId,
        mes,
        ano
      };
      setParametrosBusca(params);
      carregarDados(params);
    } else {
      setCarregando(false);
      setErro('Link de confirmação inválido ou incompleto. Verifique a mensagem recebida no WhatsApp.');
    }
  }, []);

  async function carregarDados(params) {
    setCarregando(true);
    setErro(null);
    try {
      const res = await escalasService.obterEscalasPublicasDoMes(params);

      if (!res || !res.escalas || res.escalas.length === 0) {
        throw new Error('Nenhuma escala encontrada para este voluntário no período selecionado.');
      }

      setDadosMes(res);

      // Preencher justificativas existentes
      const justMap = {};
      res.escalas.forEach(e => {
        if (e.justificativa) justMap[e.id] = e.justificativa;
      });
      setJustificativasPorEscala(justMap);

      try {
        const { data: igrData } = await supabase.from('dados_igreja').select('*').limit(1);
        if (igrData && igrData.length > 0) {
          setDadosIgreja(igrData[0]);
        }
      } catch (igrErr) {
        console.warn('Não foi possível carregar dados da igreja:', igrErr);
      }
    } catch (err) {
      console.error('Erro ao carregar escalas públicas:', err);
      setErro(err.message || 'Não foi possível carregar as escalas.');
    } finally {
      setCarregando(false);
    }
  }

  // Responder a uma escala individual
  async function handleResponderIndividual(escalaId, novoStatus, motivo = null) {
    if (!escalaId) return;
    setSalvandoId(escalaId);
    setSucessoMensagem(null);
    try {
      await escalasService.atualizarStatusEscala(escalaId, novoStatus, motivo);

      setDadosMes(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          escalas: prev.escalas.map(e => {
            if (e.id === escalaId) {
              return { ...e, status: novoStatus, justificativa: motivo };
            }
            return e;
          })
        };
      });

      if (novoStatus === 'confirmado') {
        setSucessoMensagem('Presença nesta escala confirmada com sucesso! Deus abençoe!');
      } else if (novoStatus === 'recusado') {
        setSucessoMensagem('Agradecemos pelo aviso. A liderança ministerial foi notificada.');
      }
      setJustificativaAbertaId(null);
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Erro ao enviar sua resposta. Tente novamente: ' + err.message);
    } finally {
      setSalvandoId(null);
    }
  }

  // Confirmar todas as escalas pendentes de uma só vez
  async function handleConfirmarTodas() {
    if (!dadosMes?.escalas) return;
    const escalasParaConfirmar = dadosMes.escalas.filter(e => e.status !== 'confirmado');
    if (escalasParaConfirmar.length === 0) return;

    setSalvandoId('all');
    setSucessoMensagem(null);
    try {
      const ids = escalasParaConfirmar.map(e => e.id);
      await escalasService.atualizarStatusMultiplasEscalas(ids, 'confirmado');

      setDadosMes(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          escalas: prev.escalas.map(e => ({ ...e, status: 'confirmado' }))
        };
      });

      setSucessoMensagem(`Todas as suas ${dadosMes.escalas.length} presenças foram confirmadas com sucesso! 🎉`);
      setJustificativaAbertaId(null);
    } catch (err) {
      console.error('Erro ao confirmar todas as escalas:', err);
      alert('Erro ao confirmar escalas: ' + err.message);
    } finally {
      setSalvandoId(null);
    }
  }

  // Recusar todas as escalas do mês
  async function handleRecusarTodas(motivo = null) {
    if (!dadosMes?.escalas) return;
    setSalvandoId('all');
    setSucessoMensagem(null);
    try {
      const ids = dadosMes.escalas.map(e => e.id);
      await escalasService.atualizarStatusMultiplasEscalas(ids, 'recusado', motivo);

      setDadosMes(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          escalas: prev.escalas.map(e => ({ ...e, status: 'recusado', justificativa: motivo }))
        };
      });

      setSucessoMensagem('Aviso de ausência registrado para todas as escalas do mês. Obrigado por nos avisar!');
      setJustificativaAbertaId(null);
    } catch (err) {
      console.error('Erro ao recusar escalas:', err);
      alert('Erro ao enviar justificativa: ' + err.message);
    } finally {
      setSalvandoId(null);
    }
  }

  // Auxiliares de Formatação de Data / Horário (Fuso Brasília UTC-3)
  function parseDatabaseDate(str) {
    if (!str) return null;
    if (!str.includes('Z') && !str.match(/[+-]\d{2}(:?\d{2})?$/)) {
      const clean = str.trim().replace(' ', 'T');
      return new Date(clean + 'Z');
    }
    return new Date(str);
  }

  function extrairHoraFim(evento) {
    if (!evento) return null;
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

  function obterHoraExibicao(evento) {
    if (!evento || !evento.data_evento) return 'Horário a definir';
    const dataInicio = parseDatabaseDate(evento.data_evento);
    const dataFim = extrairHoraFim(evento);

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

  function formatarDataCompleta(evento) {
    if (!evento || !evento.data_evento) return { dataStr: 'Data a definir', horaStr: 'Horário a definir' };
    const date = parseDatabaseDate(evento.data_evento);
    const bDate = new Date(date.getTime() - 3 * 3600 * 1000);

    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const diaSemana = dias[bDate.getUTCDay()];
    const dia = String(bDate.getUTCDate()).padStart(2, '0');
    const mes = meses[bDate.getUTCMonth()];
    const ano = bDate.getUTCFullYear();

    return {
      dataStr: `${diaSemana}, ${dia} de ${mes}`,
      anoStr: String(ano),
      horaStr: obterHoraExibicao(evento),
      diaNum: dia,
      diaSemanaCurto: dias[bDate.getUTCDay()].slice(0, 3).toUpperCase(),
      mesAbrev: meses[bDate.getUTCMonth()].slice(0, 3).toUpperCase()
    };
  }

  function gerarLinkGoogleAgenda(escalaItem) {
    if (!escalaItem?.eventos_ministeriais?.data_evento) return '#';
    const ev = escalaItem.eventos_ministeriais;
    const dataInicio = parseDatabaseDate(ev.data_evento);
    const dataFim = extrairHoraFim(ev) || new Date(dataInicio.getTime() + 2 * 60 * 60 * 1000);

    const formatGDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const title = encodeURIComponent(`Escala: ${escalaItem.ministerios?.nome || 'Ministério'} - ${ev.titulo}`);
    const details = encodeURIComponent(
      `Escala de Serviço na ${dadosIgreja?.nome || 'Igreja'}\n\nFunção: ${escalaItem.ministerio_funcoes?.nome || 'Voluntário'}\nMinistério: ${escalaItem.ministerios?.nome || ''}\nLocal: ${ev.local || 'Templo Sede'}`
    );
    const location = encodeURIComponent(ev.local || dadosIgreja?.endereco || 'Templo Sede');
    const dates = `${formatGDate(dataInicio)}/${formatGDate(dataFim)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }

  const pessoa = dadosMes?.pessoa;
  const mesInfo = dadosMes?.mesInfo;
  const escalas = dadosMes?.escalas || [];

  const totalEscalas = escalas.length;
  const totalConfirmadas = escalas.filter(e => e.status === 'confirmado' || e.status === 'presente').length;
  const totalPendentes = escalas.filter(e => e.status !== 'confirmado' && e.status !== 'presente' && e.status !== 'recusado' && e.status !== 'falta' && e.status !== 'falta_justificada').length;
  const totalRecusadas = escalas.filter(e => e.status === 'recusado' || e.status === 'falta' || e.status === 'falta_justificada').length;

  const todasConfirmadas = totalEscalas > 0 && totalConfirmadas === totalEscalas;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white font-sans">
      {/* Background Glow Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />
      </div>

      {/* Conteúdo Central */}
      <main className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">

        {/* Cabeçalho da Igreja */}
        <header className="text-center mb-6 animate-in fade-in slide-from-top-4 duration-500">
          <img
            src="/logo-betesda-mundau.png"
            alt={dadosIgreja?.nome || 'MIB Church'}
            className="h-14 sm:h-18 w-auto max-w-[200px] mx-auto object-contain mb-3 drop-shadow-md"
          />
          <h1 className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-slate-400">
            {dadosIgreja?.nome || 'MIB Church'}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Confirmação de Escala Ministerial
          </p>
        </header>

        {/* Estado de Carregamento */}
        {carregando ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center space-y-4 animate-pulse">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 mx-auto" />
            <div className="h-5 bg-slate-800 rounded-lg w-3/4 mx-auto" />
            <div className="h-4 bg-slate-800/60 rounded-lg w-1/2 mx-auto" />
            <p className="text-xs font-bold text-slate-400 pt-2">Carregando suas escalas do mês...</p>
          </div>
        ) : erro ? (
          <div className="bg-slate-900/90 border border-rose-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl mx-auto shadow-inner">
              ⚠️
            </div>
            <h2 className="text-lg font-black text-white">Não foi possível carregar as escalas</h2>
            <p className="text-sm text-slate-400">{erro}</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => parametrosBusca && carregarDados(parametrosBusca)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : dadosMes ? (
          <div className="space-y-5 animate-in zoom-in-95 duration-400">

            {/* Card do Voluntário & Resumo do Mês */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-black/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 font-black shadow-inner overflow-hidden">
                    {pessoa?.foto_url ? (
                      <img src={pessoa.foto_url} alt={pessoa.nome} className="w-full h-full object-cover" />
                    ) : (
                      <User size={22} />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Servo(a) Escalado(a)
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-white truncate">
                      {pessoa?.nome || 'Voluntário'}
                    </h2>
                  </div>
                </div>

                {/* Badge do Mês e Contadores */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-wider">
                    📅 {mesInfo?.mesNome} / {mesInfo?.ano}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    {totalConfirmadas > 0 && (
                      <span className="px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                        ✓ {totalConfirmadas}
                      </span>
                    )}
                    {totalPendentes > 0 && (
                      <span className="px-2 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 animate-pulse">
                        ⏳ {totalPendentes}
                      </span>
                    )}
                    {totalRecusadas > 0 && (
                      <span className="px-2 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300">
                        ✕ {totalRecusadas}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Banner de Sucesso / Feedback Geral */}
              {sucessoMensagem && (
                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-3 animate-in fade-in duration-300 shadow-md">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>{sucessoMensagem}</span>
                </div>
              )}

              {/* Botão de Ação Rápida em Lote (Confirmar Todas) */}
              {totalPendentes > 0 ? (
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-slate-400 text-center sm:text-left">
                    Você tem <strong>{totalPendentes}</strong> escala(s) aguardando confirmação neste mês.
                  </p>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleConfirmarTodas}
                      disabled={salvandoId !== null}
                      className="flex-1 sm:flex-none px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <CheckCheck size={16} />
                      {salvandoId === 'all' ? 'Confirmando...' : `Confirmar Todas (${totalEscalas})`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setJustificativaAbertaId('all')}
                      disabled={salvandoId !== null}
                      className="px-3.5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-300 border border-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                      title="Informar ausência para todas as escalas do mês"
                    >
                      Recusar Todas
                    </button>
                  </div>
                </div>
              ) : todasConfirmadas ? (
                <div className="mt-4 pt-4 border-t border-slate-800/80 text-center text-xs font-bold text-emerald-400 flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Todas as suas presenças para este mês estão confirmadas! Deus abençoe!</span>
                </div>
              ) : null}

              {/* Modal / Justificativa para Recusar Todas */}
              {justificativaAbertaId === 'all' && (
                <div className="mt-4 p-4 bg-slate-950 border border-rose-500/30 rounded-2xl space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle size={14} /> Informar Impossibilidade em Todas as Escalas
                    </span>
                    <button
                      type="button"
                      onClick={() => setJustificativaAbertaId(null)}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={justificativasPorEscala['all'] || ''}
                    onChange={(e) => setJustificativasPorEscala(prev => ({ ...prev, all: e.target.value }))}
                    placeholder="Informe o motivo para que a liderança possa organizar substitutos a tempo (Opcional)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-rose-500 transition resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleRecusarTodas(justificativasPorEscala['all']?.trim() || null)}
                      disabled={salvandoId !== null}
                      className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-md shadow-rose-600/30 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <Send size={13} />
                      {salvandoId === 'all' ? 'Enviando...' : 'Confirmar Ausência em Todas'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setJustificativaAbertaId(null)}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Lista de Escalas do Mês */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Suas Escalas ({totalEscalas})
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">
                  Confirme ou ajuste cada data individualmente abaixo
                </span>
              </div>

              {escalas.map((item, index) => {
                const ev = item.eventos_ministeriais;
                const min = item.ministerios;
                const func = item.ministerio_funcoes;
                const dataInfo = formatarDataCompleta(ev);

                const corMin = min?.cor_principal || '#1e3a8a';
                const iconeMin = min?.icone || 'Scroll';
                const fardaDefinida = ev?.fardamentos?.[item.ministerio_id] || null;

                const isConfirmado = item.status === 'confirmado' || item.status === 'presente';
                const isRecusado = item.status === 'recusado' || item.status === 'falta' || item.status === 'falta_justificada';
                const isPendente = !isConfirmado && !isRecusado;

                const justAberta = justificativaAbertaId === item.id;
                const salvandoEste = salvandoId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`bg-slate-900/90 border rounded-3xl overflow-hidden backdrop-blur-xl shadow-lg transition-all ${
                      isConfirmado 
                        ? 'border-emerald-500/30 shadow-emerald-950/20' 
                        : isRecusado 
                        ? 'border-rose-500/30 opacity-90' 
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Faixa do Ministério com Status */}
                    <div
                      className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between gap-3"
                      style={{
                        background: `linear-gradient(135deg, ${corMin}25 0%, ${corMin}08 100%)`
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm"
                          style={{
                            backgroundColor: `${corMin}30`,
                            borderColor: `${corMin}60`,
                            color: corMin
                          }}
                        >
                          <MinistryIcon icone={iconeMin} size={20} style={{ color: corMin }} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-slate-300 border border-white/10 inline-block mb-0.5">
                            {min?.nome || 'Ministério'}
                          </span>
                          <h4 className="text-sm sm:text-base font-black text-white truncate">
                            {func?.nome || 'Função'}
                          </h4>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="shrink-0">
                        {isConfirmado ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider">
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            Confirmado
                          </span>
                        ) : isRecusado ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase tracking-wider">
                            <XCircle size={12} className="text-rose-400" />
                            Não Comparece
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider animate-pulse">
                            <Sparkles size={12} className="text-amber-400" />
                            Pendente
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Detalhes do Evento */}
                    <div className="p-4 sm:p-5 space-y-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 block mb-0.5">
                            Culto / Evento
                          </span>
                          <h5 className="text-sm font-black text-white">
                            {ev?.titulo || 'Culto de Celebração'}
                          </h5>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md shrink-0">
                          Escala #{index + 1}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-blue-400 shrink-0" />
                          <span><strong className="text-white">{dataInfo.dataStr}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-blue-400 shrink-0" />
                          <span>Horário: <strong className="text-white font-bold">{dataInfo.horaStr}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-blue-400 shrink-0" />
                          <span className="truncate">{ev?.local || 'Templo Sede'}</span>
                        </div>

                        {ev?.pregador && (
                          <div className="flex items-center gap-2">
                            <Mic size={14} className="text-amber-400 shrink-0" />
                            <span className="truncate">Palavra: <strong className="text-white font-medium">{ev.pregador}</strong></span>
                          </div>
                        )}

                        {fardaDefinida && (
                          <div className="flex items-center gap-2 sm:col-span-2 bg-slate-950/60 py-1.5 px-2.5 rounded-xl border border-slate-800 text-[11px]">
                            <Shirt size={13} className="text-indigo-400 shrink-0" />
                            <span>Farda / Traje: <strong className="text-indigo-300">{fardaDefinida}</strong></span>
                          </div>
                        )}
                      </div>

                      {/* Ações da Escala Individual */}
                      <div className="pt-2 border-t border-slate-800/60">
                        {isConfirmado ? (
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                            <a
                              href={gerarLinkGoogleAgenda(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto px-3.5 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                            >
                              <ExternalLink size={12} />
                              Adicionar ao Google Agenda
                            </a>

                            <button
                              type="button"
                              onClick={() => setJustificativaAbertaId(item.id)}
                              className="w-full sm:w-auto px-3 py-1.5 text-xs text-slate-400 hover:text-white transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <RotateCcw size={11} />
                              Alterar Resposta
                            </button>
                          </div>
                        ) : isRecusado && !justAberta ? (
                          <div className="space-y-2">
                            {item.justificativa && (
                              <p className="text-xs text-slate-400 italic bg-slate-950/40 p-2 rounded-lg border border-slate-800">
                                Motivo: "{item.justificativa}"
                              </p>
                            )}
                            <button
                              type="button"
                              onClick={() => handleResponderIndividual(item.id, 'confirmado')}
                              disabled={salvandoEste}
                              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                            >
                              <CheckCircle2 size={14} />
                              {salvandoEste ? 'Salvando...' : 'Mudei de ideia: Confirmar Presença'}
                            </button>
                          </div>
                        ) : !justAberta ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => handleResponderIndividual(item.id, 'confirmado')}
                              disabled={salvandoEste}
                              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                            >
                              <CheckCircle2 size={15} />
                              {salvandoEste ? 'Salvando...' : 'Confirmar Presença'}
                            </button>

                            <button
                              type="button"
                              onClick={() => setJustificativaAbertaId(item.id)}
                              disabled={salvandoEste}
                              className="py-2.5 px-3 bg-slate-800 hover:bg-rose-950/40 hover:border-rose-500/40 text-slate-300 hover:text-rose-200 border border-slate-700/80 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <XCircle size={15} />
                              Não Poderei Ir
                            </button>
                          </div>
                        ) : null}

                        {/* Formulário Inline de Justificativa */}
                        {justAberta && (
                          <div className="mt-2.5 p-3.5 bg-slate-950 border border-rose-500/30 rounded-2xl space-y-2.5 animate-in fade-in duration-200">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black text-rose-300 uppercase tracking-wider flex items-center gap-1">
                                <AlertCircle size={12} /> Motivo da Ausência (Opcional)
                              </span>
                              <button
                                type="button"
                                onClick={() => setJustificativaAbertaId(null)}
                                className="text-xs text-slate-400 hover:text-white cursor-pointer"
                              >
                                Cancelar
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={justificativasPorEscala[item.id] || ''}
                              onChange={(e) => setJustificativasPorEscala(prev => ({ ...prev, [item.id]: e.target.value }))}
                              placeholder="Ex: Viagem, compromisso de trabalho, etc."
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-rose-500 transition resize-none"
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleResponderIndividual(item.id, 'recusado', justificativasPorEscala[item.id]?.trim() || null)}
                                disabled={salvandoEste}
                                className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center justify-center gap-1 disabled:opacity-50"
                              >
                                <Send size={12} />
                                {salvandoEste ? 'Enviando...' : 'Enviar Recusa'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setJustificativaAbertaId(null)}
                                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                              >
                                Voltar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ) : null}

      </main>

      {/* Rodapé */}
      <footer className="relative z-10 py-6 text-center text-[11px] text-slate-600 font-medium">
        © {new Date().getFullYear()} {dadosIgreja?.nome || 'Igreja'} · Módulo de Gestão Ministerial
      </footer>
    </div>
  );
}
