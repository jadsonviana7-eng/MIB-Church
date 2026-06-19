import React, { useState, useEffect } from 'react';
import { X, Calendar, Award, UserCheck, Loader2, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { escalasService } from '../services/escalasService';

export default function MembroHistoricoModal({ isOpen, onClose, pessoa }) {
  const [loading, setLoading] = useState(false);
  const [escalas, setEscalas] = useState([]);
  const [stats, setStats] = useState({
    totalServidos: 0,
    funcoes: [],
    ultimaData: null,
    recentes: [],
    convocado: 0,
    compareceu: 0,
    faltou: 0,
    frequencia: 100
  });

  useEffect(() => {
    if (isOpen && pessoa?.id) {
      carregarHistorico();
    }
  }, [isOpen, pessoa]);

  async function carregarHistorico() {
    setLoading(true);
    try {
      const data = await escalasService.listarEscalasMembro(pessoa.id);
      setEscalas(data || []);
      calcularEstatisticas(data || []);
    } catch (error) {
      console.error('Erro ao carregar histórico do membro:', error);
    } finally {
      setLoading(false);
    }
  }

  function calcularEstatisticas(listaEscalas) {
    const agora = new Date();

    // Consideramos como servido se a escala foi confirmada ou se continua pendente mas o evento já aconteceu no passado
    const scalesServidos = listaEscalas.filter(esc => {
      const dataEventoStr = esc.eventos_ministeriais?.data_evento;
      if (!dataEventoStr) return false;
      
      const dataEvento = new Date(dataEventoStr);
      const isConfirmado = esc.status === 'confirmado';
      const isPendentePassado = esc.status === 'pendente' && dataEvento < agora;
      
      return isConfirmado || isPendentePassado;
    });

    // 1. Total servidos
    const totalServidos = scalesServidos.length;

    // 2. Agrupamento por funções
    const contagemFuncoes = {};
    scalesServidos.forEach(esc => {
      const nomeFuncao = esc.ministerio_funcoes?.nome || 'Geral/Outros';
      contagemFuncoes[nomeFuncao] = (contagemFuncoes[nomeFuncao] || 0) + 1;
    });

    // Converter para array ordenado
    const funcoesArray = Object.entries(contagemFuncoes)
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade);

    // 3. Última escala (mais recente no passado)
    let ultimaData = null;
    const eventosPassados = scalesServidos
      .map(esc => new Date(esc.eventos_ministeriais.data_evento))
      .sort((a, b) => b - a);

    if (eventosPassados.length > 0) {
      ultimaData = eventosPassados[0];
    }

    // 4. Últimas 5 escalas gerais (podem incluir pendentes futuras)
    // Ordenamos pela data do evento decrescente
    const ordenadasGerais = [...listaEscalas].sort((a, b) => {
      const dateA = a.eventos_ministeriais?.data_evento ? new Date(a.eventos_ministeriais.data_evento) : 0;
      const dateB = b.eventos_ministeriais?.data_evento ? new Date(b.eventos_ministeriais.data_evento) : 0;
      return dateB - dateA;
    });
    const recentes = ordenadasGerais.slice(0, 5);

    // 5. Cálculo de Frequência e Presença (apenas para eventos passados)
    const pastScales = listaEscalas.filter(esc => {
      const dataEventoStr = esc.eventos_ministeriais?.data_evento;
      if (!dataEventoStr) return false;
      return new Date(dataEventoStr) < agora;
    });

    const convocado = pastScales.length;
    const compareceu = pastScales.filter(esc => esc.status === 'confirmado' || esc.status === 'pendente').length;
    const faltou = pastScales.filter(esc => esc.status === 'recusado').length;
    const frequencia = convocado > 0 ? Math.round((compareceu / convocado) * 100) : 100;

    setStats({
      totalServidos,
      funcoes: funcoesArray,
      ultimaData,
      recentes,
      convocado,
      compareceu,
      faltou,
      frequencia
    });
  }

  function formatarDataBrasilia(dateObj) {
    if (!dateObj) return 'Nenhuma registrada';
    const YYYY = dateObj.getUTCFullYear();
    const MM = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const DD = String(dateObj.getUTCDate()).padStart(2, '0');
    return `${DD}/${MM}/${YYYY}`;
  }

  function formatarDataString(isoString) {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      // Ajustar para fuso Brasília
      const bDate = new Date(date.getTime() - 3 * 3600 * 1000);
      const YYYY = bDate.getUTCFullYear();
      const MM = String(bDate.getUTCMonth() + 1).padStart(2, '0');
      const DD = String(bDate.getUTCDate()).padStart(2, '0');
      const hh = String(bDate.getUTCHours()).padStart(2, '0');
      const mm = String(bDate.getUTCMinutes()).padStart(2, '0');
      return `${DD}/${MM}/${YYYY} às ${hh}:${mm}`;
    } catch (e) {
      return '';
    }
  }

  function renderStatusBadge(status, dataEventoStr) {
    const agora = new Date();
    const dataEvento = dataEventoStr ? new Date(dataEventoStr) : null;
    const noPassado = dataEvento && dataEvento < agora;

    if (status === 'confirmado') {
      return (
        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">
          <CheckCircle size={10} /> Confirmado
        </span>
      );
    }
    if (status === 'recusado') {
      return (
        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-100">
          <XCircle size={10} /> Recusado
        </span>
      );
    }
    
    // Pendente
    if (noPassado) {
      return (
        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-650 border border-slate-200">
          <CheckCircle size={10} /> Servido
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-100 animate-pulse">
        <Clock size={10} /> Pendente
      </span>
    );
  }

  if (!isOpen) return null;

  // Obter as iniciais se não houver foto
  const obterIniciais = (nome) => {
    if (!nome) return '?';
    return nome
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="bg-white border border-slate-100 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transform scale-100 transition-all duration-300">
        
        {/* Cabeçalho */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3.5">
            {pessoa?.foto_url ? (
              <img
                src={pessoa.foto_url}
                alt={pessoa.nome}
                className="w-12 h-12 rounded-full object-cover border border-slate-205 shadow-xs"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-black shadow-md shadow-blue-100">
                {obterIniciais(pessoa?.nome)}
              </div>
            )}
            <div>
              <h3 className="font-black text-sm text-slate-800 tracking-wide uppercase">
                {pessoa?.nome || 'Membro'}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Histórico Ministerial
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-650 hover:bg-slate-105 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-5 overflow-y-auto custom-scrollbar flex-1 space-y-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <Loader2 className="text-blue-600 animate-spin" size={32} />
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Carregando histórico...
              </p>
            </div>
          ) : (
            <>
              {/* Cards de Resumo */}
              <div className="grid grid-cols-2 gap-4">
                {/* Card Cultos Servidos */}
                <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Award size={18} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Cultos Servidos
                    </span>
                    <span className="text-xl font-black text-slate-850 block mt-0.5 leading-none">
                      {stats.totalServidos}
                    </span>
                  </div>
                </div>

                {/* Card Última Escala */}
                <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Última Escala
                    </span>
                    <span className="text-xs font-black text-slate-700 block mt-1 leading-none truncate max-w-[140px]">
                      {stats.ultimaData ? formatarDataBrasilia(stats.ultimaData) : 'Nenhuma'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Seção de Frequência */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  📈 Frequência e Presença
                </h4>
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Anel de Percentual */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <svg className="w-16 h-16 transform -rotate-90">
                        {/* Track */}
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          className="text-slate-100 stroke-current"
                          strokeWidth="5"
                          fill="transparent"
                        />
                        {/* Bar */}
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          className={`stroke-current ${
                            stats.frequencia >= 85 
                              ? 'text-emerald-500' 
                              : stats.frequencia >= 60 
                                ? 'text-amber-500' 
                                : 'text-rose-500'
                          }`}
                          strokeWidth="5"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 26}
                          strokeDashoffset={2 * Math.PI * 26 * (1 - stats.frequencia / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-sm font-black text-slate-800">
                        {stats.frequencia}%
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">
                        Frequência Geral
                      </span>
                      <span className="text-[10px] text-slate-450 font-bold block">
                        Calculada com base nas escalas passadas.
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-between sm:justify-end w-full sm:w-auto text-right border-t sm:border-t-0 border-slate-150/40 pt-3 sm:pt-0">
                    <div>
                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        Convocado
                      </span>
                      <span className="text-sm font-black text-slate-750">
                        {stats.convocado}
                      </span>
                    </div>
                    <div className="border-l border-slate-205/60 pl-4">
                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest text-emerald-600">
                        Compareceu
                      </span>
                      <span className="text-sm font-black text-emerald-600">
                        {stats.compareceu}
                      </span>
                    </div>
                    <div className="border-l border-slate-205/60 pl-4">
                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest text-rose-600">
                        Faltou
                      </span>
                      <span className="text-sm font-black text-rose-600">
                        {stats.faltou}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalhe das Funções */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <UserCheck size={12} /> Distribuição de Funções
                </h4>
                
                {stats.funcoes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">
                    Nenhuma escala confirmada para este voluntário ainda.
                  </p>
                ) : (
                  <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 space-y-3.5">
                    {stats.funcoes.map((f, idx) => {
                      const maxQtde = stats.funcoes[0].quantidade;
                      const percentual = maxQtde > 0 ? (f.quantidade / maxQtde) * 100 : 0;

                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-slate-700">{f.nome}</span>
                            <span className="text-slate-850 font-extrabold">{f.quantidade} {f.quantidade === 1 ? 'culto' : 'cultos'}</span>
                          </div>
                          <div className="w-full bg-slate-200/50 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${percentual}%` }}
                              className="bg-blue-600 h-full rounded-full transition-all duration-500"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Escalas Recentes */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Clock size={12} /> Últimas Escalas no Sistema
                </h4>

                {stats.recentes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">
                    Nenhum registro de escala encontrado no sistema.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {stats.recentes.map((esc) => {
                      const ev = esc.eventos_ministeriais;
                      const dataFormatada = formatarDataString(ev?.data_evento);
                      const funcaoNome = esc.ministerio_funcoes?.nome || 'Geral/Outros';
                      const minNome = esc.ministerios?.nome || 'Ministério';

                      return (
                        <div
                          key={esc.id}
                          className="bg-white border border-slate-100 rounded-xl p-3.5 hover:shadow-xs transition duration-200 flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h5 className="text-xs font-bold text-slate-800 truncate">
                                {ev?.titulo || 'Sem título'}
                              </h5>
                              <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-650 shrink-0">
                                {minNome}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">
                              Fez <span className="font-extrabold text-slate-650">{funcaoNome}</span> em {dataFormatada}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            {renderStatusBadge(esc.status, ev?.data_evento)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black transition active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
