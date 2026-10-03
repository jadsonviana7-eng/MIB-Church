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
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export default function PublicConfirmarEscala() {
  const [escalaId, setEscalaId] = useState(null);
  const [escala, setEscala] = useState(null);
  const [dadosIgreja, setDadosIgreja] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(null);

  // Feedback e justificação
  const [mostrarJustificativa, setMostrarJustificativa] = useState(false);
  const [justificativa, setJustificativa] = useState('');
  const [sucessoMensagem, setSucessoMensagem] = useState(null);

  // 1. Extrair ID da escala a partir da URL
  useEffect(() => {
    let id = null;

    // A. Query Params (?id=xxx ou ?escala=xxx ou ?escala_id=xxx)
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id') || urlParams.get('escala') || urlParams.get('escala_id');

    // B. Pathname (/confirmar-escala/xxx)
    if (!id) {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length >= 2 && parts[0] === 'confirmar-escala') {
        id = parts[1];
      }
    }

    // C. Hash (#/confirmar-escala?id=xxx ou #/confirmar-escala/xxx)
    if (!id && window.location.hash) {
      const hashStr = window.location.hash.replace(/^#\/?/, '');
      const hashParams = new URLSearchParams(hashStr.includes('?') ? hashStr.split('?')[1] : '');
      id = hashParams.get('id') || hashParams.get('escala') || hashParams.get('escala_id');

      if (!id && hashStr.startsWith('confirmar-escala/')) {
        id = hashStr.split('/')[1];
      }
    }

    if (id) {
      setEscalaId(id);
      carregarDados(id);
    } else {
      setCarregando(false);
      setErro('Link de confirmação inválido ou incompleto. Verifique a mensagem recebida no WhatsApp.');
    }
  }, []);

  async function carregarDados(id) {
    setCarregando(true);
    setErro(null);
    try {
      const resEscala = await escalasService.obterEscalaPublica(id);

      if (!resEscala) {
        throw new Error('Escala não encontrada no sistema ou link expirado.');
      }

      setEscala(resEscala);
      if (resEscala.justificativa) {
        setJustificativa(resEscala.justificativa);
      }

      try {
        const { data: igrData } = await supabase.from('dados_igreja').select('*').limit(1);
        if (igrData && igrData.length > 0) {
          setDadosIgreja(igrData[0]);
        }
      } catch (igrErr) {
        console.warn('Não foi possível carregar dados da igreja:', igrErr);
      }
    } catch (err) {
      console.error('Erro ao carregar escala pública:', err);
      setErro(err.message || 'Não foi possível carregar os detalhes desta escala.');
    } finally {
      setCarregando(false);
    }
  }

  async function handleResponder(novoStatus, motivo = null) {
    if (!escalaId) return;
    setSalvando(true);
    setSucessoMensagem(null);
    try {
      await escalasService.atualizarStatusEscala(escalaId, novoStatus, motivo);

      setEscala(prev => ({
        ...prev,
        status: novoStatus,
        justificativa: motivo
      }));

      if (novoStatus === 'confirmado') {
        setSucessoMensagem('Sua presença foi confirmada com sucesso! Deus abençoe!');
        setMostrarJustificativa(false);
      } else if (novoStatus === 'recusado') {
        setSucessoMensagem('Agradecemos pelo aviso. O líder ministerial já foi notificado.');
        setMostrarJustificativa(false);
      }
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Erro ao enviar sua resposta. Tente novamente: ' + err.message);
    } finally {
      setSalvando(false);
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
      dataStr: `${diaSemana}, ${dia} de ${mes} de ${ano}`,
      horaStr: obterHoraExibicao(evento),
      diaNum: dia,
      mesAbrev: meses[bDate.getUTCMonth()].slice(0, 3).toUpperCase()
    };
  }

  function gerarLinkGoogleAgenda() {
    if (!escala?.eventos_ministeriais?.data_evento) return '#';
    const ev = escala.eventos_ministeriais;
    const dataInicio = parseDatabaseDate(ev.data_evento);
    const dataFim = extrairHoraFim(ev) || new Date(dataInicio.getTime() + 2 * 60 * 60 * 1000);

    const formatGDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const title = encodeURIComponent(`Escala: ${escala.ministerios?.nome || 'Ministério'} - ${ev.titulo}`);
    const details = encodeURIComponent(
      `Escala de Serviço na ${dadosIgreja?.nome || 'Igreja'}\n\nFunção: ${escala.ministerio_funcoes?.nome || 'Voluntário'}\nMinistério: ${escala.ministerios?.nome || ''}\nLocal: ${ev.local || 'Templo Sede'}`
    );
    const location = encodeURIComponent(ev.local || dadosIgreja?.endereco || 'Templo Sede');
    const dates = `${formatGDate(dataInicio)}/${formatGDate(dataFim)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }

  const ev = escala?.eventos_ministeriais;
  const min = escala?.ministerios;
  const func = escala?.ministerio_funcoes;
  const pessoa = escala?.pessoas;
  const dataInfo = formatarDataCompleta(ev);

  const corMin = min?.cor_principal || '#1e3a8a';
  const iconeMin = min?.icone || 'Scroll';

  // Obter fardamento configurado para o evento neste ministério
  const fardaDefinida = ev?.fardamentos?.[escala?.ministerio_id] || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white font-sans">
      {/* Background Glow Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[130px]"
          style={{ backgroundColor: corMin }}
        />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600 opacity-10 blur-[120px]" />
      </div>

      {/* Conteúdo Central */}
      <main className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">

        {/* Cabeçalho da Igreja */}
        <header className="text-center mb-6 animate-in fade-in slide-from-top-4 duration-500">
          <img
            src="/logo-betesda-mundau.png"
            alt={dadosIgreja?.nome || 'MIB Church'}
            className="h-16 sm:h-20 w-auto max-w-[220px] mx-auto object-contain mb-3 drop-shadow-md"
          />
          <h1 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
            {dadosIgreja?.nome || 'MIB Church'}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Confirmação de Escala de Servos
          </p>
        </header>

        {/* Card Principal */}
        {carregando ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center space-y-4 animate-pulse">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 mx-auto" />
            <div className="h-5 bg-slate-800 rounded-lg w-3/4 mx-auto" />
            <div className="h-4 bg-slate-800/60 rounded-lg w-1/2 mx-auto" />
            <p className="text-xs font-bold text-slate-400 pt-2">Carregando dados da sua escala...</p>
          </div>
        ) : erro ? (
          <div className="bg-slate-900/90 border border-rose-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-2xl mx-auto shadow-inner">
              ⚠️
            </div>
            <h2 className="text-lg font-black text-white">Não foi possível carregar a escala</h2>
            <p className="text-sm text-slate-400">{erro}</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => escalaId && carregarDados(escalaId)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : escala ? (
          <div className="bg-slate-900/90 border border-slate-800/90 rounded-[28px] overflow-hidden backdrop-blur-2xl shadow-2xl shadow-black/60 animate-in zoom-in-95 duration-400">

            {/* Faixa Superior com Identidade do Ministério */}
            <div
              className="p-5 sm:p-6 border-b border-slate-800/80 relative overflow-hidden flex items-center justify-between gap-4"
              style={{
                background: `linear-gradient(135deg, ${corMin}30 0%, ${corMin}10 100%)`
              }}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-md transition-transform hover:scale-105"
                  style={{
                    backgroundColor: `${corMin}30`,
                    borderColor: `${corMin}60`,
                    color: corMin
                  }}
                >
                  <MinistryIcon icone={iconeMin} size={24} style={{ color: corMin }} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-slate-300 border border-white/10 inline-block mb-1">
                    {min?.nome || 'Ministério'}
                  </span>
                  <h2 className="text-lg font-black text-white truncate tracking-tight">
                    {func?.nome || 'Função Ministerial'}
                  </h2>
                </div>
              </div>

              {/* Status Atual */}
              <div className="shrink-0 text-right">
                {escala.status === 'confirmado' || escala.status === 'presente' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider shadow-sm">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Confirmado
                  </span>
                ) : escala.status === 'recusado' || escala.status === 'falta' || escala.status === 'falta_justificada' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black uppercase tracking-wider shadow-sm">
                    <XCircle size={14} className="text-rose-400" />
                    Não Comparece
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider shadow-sm animate-pulse">
                    <Sparkles size={14} className="text-amber-400" />
                    Pendente
                  </span>
                )}
              </div>
            </div>

            {/* Corpo do Card */}
            <div className="p-5 sm:p-7 space-y-6">

              {/* Mensagem de Saudação Personalizada */}
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 font-black text-sm">
                  {pessoa?.foto_url ? (
                    <img src={pessoa.foto_url} alt={pessoa.nome} className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    <User size={18} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">Servo(a) Escalado(a):</p>
                  <h3 className="text-sm font-black text-white truncate">
                    {pessoa?.nome || 'Irmão(ã) em Cristo'}
                  </h3>
                </div>
              </div>

              {/* Informações do Culto / Evento */}
              <div className="space-y-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/70 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-0.5">
                      Culto / Evento
                    </span>
                    <h4 className="text-base font-black text-white">
                      {ev?.titulo || 'Culto de Celebração'}
                    </h4>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Calendar size={16} className="text-blue-400 shrink-0" />
                    <span>{dataInfo.dataStr}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Clock size={16} className="text-blue-400 shrink-0" />
                    <span>Horário: <strong className="text-white font-black">{dataInfo.horaStr}</strong></span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <MapPin size={16} className="text-blue-400 shrink-0" />
                    <span className="truncate">{ev?.local || 'Templo Sede'}</span>
                  </div>

                  {ev?.pregador && (
                    <div className="flex items-center gap-2.5 text-slate-300">
                      <Mic size={16} className="text-amber-400 shrink-0" />
                      <span className="truncate">Palavra: <strong className="text-white font-bold">{ev.pregador}</strong></span>
                    </div>
                  )}

                  {fardaDefinida && (
                    <div className="flex items-center gap-2.5 text-slate-300 sm:col-span-2 bg-slate-900/90 py-1.5 px-3 rounded-xl border border-slate-800">
                      <Shirt size={16} className="text-indigo-400 shrink-0" />
                      <span>Farda / Traje: <strong className="text-indigo-300 font-black">{fardaDefinida}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner de Feedback / Notificação */}
              {sucessoMensagem && (
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-3 animate-in fade-in duration-300 shadow-md">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>{sucessoMensagem}</span>
                </div>
              )}

              {/* Bloco de Ações e Confirmação */}
              {escala.status === 'confirmado' || escala.status === 'presente' ? (
                <div className="space-y-3 pt-2">
                  <div className="text-center p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-2xl">
                    <span className="text-3xl block mb-1">🎉</span>
                    <h4 className="text-sm font-black text-emerald-300 uppercase tracking-wider">
                      Presença Confirmada!
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Sua escala está confirmada. Contamos com sua pontualidade e dedicação!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <a
                      href={gerarLinkGoogleAgenda()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95"
                    >
                      <ExternalLink size={14} />
                      Adicionar ao Google Agenda
                    </a>

                    <button
                      type="button"
                      onClick={() => setMostrarJustificativa(true)}
                      className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      Alterar Resposta
                    </button>
                  </div>
                </div>
              ) : escala.status === 'recusado' && !mostrarJustificativa ? (
                <div className="space-y-3 pt-2">
                  <div className="text-center p-4 bg-rose-950/30 border border-rose-900/40 rounded-2xl">
                    <span className="text-2xl block mb-1">🤝</span>
                    <h4 className="text-sm font-black text-rose-300 uppercase tracking-wider">
                      Você informou que não poderá comparecer
                    </h4>
                    {escala.justificativa && (
                      <p className="text-xs text-slate-400 mt-1 italic">
                        Motivo: "{escala.justificativa}"
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleResponder('confirmado')}
                    disabled={salvando}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 size={16} />
                    Mudei de ideia: Confirmar Minha Presença
                  </button>
                </div>
              ) : !mostrarJustificativa ? (
                /* Botões de Ação Principal (Status Pendente) */
                <div className="space-y-3 pt-2">
                  <p className="text-xs text-center text-slate-400 font-medium">
                    Por favor, informe abaixo se você poderá servir nesta data:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleResponder('confirmado')}
                      disabled={salvando}
                      className="w-full py-4 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                      {salvando ? 'Salvando...' : 'Confirmar Presença'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setMostrarJustificativa(true)}
                      disabled={salvando}
                      className="w-full py-4 px-4 bg-slate-800 hover:bg-rose-900/30 hover:border-rose-500/50 text-slate-300 hover:text-rose-200 border border-slate-700/80 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <XCircle size={18} strokeWidth={2.5} />
                      Não Poderei Ir
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Formulário de Justificativa / Recusa */}
              {mostrarJustificativa && (
                <div className="space-y-3.5 pt-2 p-4 bg-slate-950/80 border border-rose-500/30 rounded-2xl animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle size={14} /> Informar Impossibilidade de Comparecimento
                    </span>
                    <button
                      type="button"
                      onClick={() => setMostrarJustificativa(false)}
                      className="text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Se desejar, informe o motivo para que a liderança possa providenciar sua substituição a tempo:
                  </p>

                  <textarea
                    rows={2}
                    value={justificativa}
                    onChange={(e) => setJustificativa(e.target.value)}
                    placeholder="Ex: Estarei em viagem de trabalho, consulta médica, etc. (Opcional)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-rose-500 transition resize-none"
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleResponder('recusado', justificativa.trim() || null)}
                      disabled={salvando}
                      className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-md shadow-rose-600/30 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <Send size={13} />
                      {salvando ? 'Enviando...' : 'Enviar Recusa'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMostrarJustificativa(false)}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : null}

      </main>

      {/* Rodapé Simples */}
      <footer className="relative z-10 py-6 text-center text-[11px] text-slate-600 font-medium">
        © {new Date().getFullYear()} {dadosIgreja?.nome || 'Igreja'} · Todos os direitos reservados.
      </footer>
    </div>
  );
}
