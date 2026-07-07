import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, PageHeader, Avatar } from './ui';
import {
  Calendar, Gift, Wallet, Music, Heart,
  ArrowRight, Sparkles, ChevronRight, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { normalizarTexto } from './churchUtils';

const CARGOS_ESCALA = {
  "Cultos": ["Direção", "Pregação"],
  "Intercessão": ["Porta", "Altar", "Sala Kids"],
  "Projeção": ["Operador"],
  "Introdução": ["Recepção 1", "Recepção 2"],
  "Manutenção": ["Líder", "Auxiliar 1", "Auxiliar 2", "Auxiliar 3"]
};

export default function DashboardMembro({ membroLogado, onNavigate, onVerPerfil }) {
  const [avisos, setAvisos] = useState([]);
  const [aniversariantes, setAniversariantes] = useState([]);
  const [proximasEscalas, setProximasEscalas] = useState([]);
  const [ultimasContribuicoes, setUltimasContribuicoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleResponderEscala = async (escalaId, novoStatus) => {
    try {
      const { error } = await supabase
        .from('escalas')
        .update({ status: novoStatus })
        .eq('id', escalaId);

      if (error) throw error;
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      window.alert("Erro ao responder escala: " + err.message);
    }
  };

  // Mural de Avisos Rotativo
  const [avisoAtivoIdx, setAvisoAtivoIdx] = useState(0);

  useEffect(() => {
    if (avisos.length <= 1) return;
    const interval = setInterval(() => {
      setAvisoAtivoIdx((prev) => (prev + 1) % avisos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [avisos.length]);

  useEffect(() => {
    let isMounted = true;

    async function carregarTudo() {
      if (!membroLogado?.id) return;
      setLoading(true);

      try {
        // 1. Carregar Avisos Ativos
        const hojeIso = new Date().toISOString().split('T')[0];
        const { data: avisosRaw, error: errAvisos } = await supabase
          .from('mural_avisos')
          .select('*')
          .eq('ativo', true)
          .order('prioridade', { ascending: false });

        if (errAvisos) console.error("Erro ao carregar avisos:", errAvisos);

        const avisosData = (avisosRaw || []).filter(aviso => {
          if (!aviso.data_expiracao) return true;
          return aviso.data_expiracao >= hojeIso;
        });
        // 2. Carregar Aniversariantes do Mês
        const mesAtual = new Date().getMonth() + 1; // 1-12
        const { data: pessoasData } = await supabase
          .from('pessoas')
          .select('id, nome, data_nascimento, foto_url')
          .not('data_nascimento', 'is', null)
          .eq('status', 'ativo');

        const aniversariantesMes = (pessoasData || []).filter(p => {
          if (!p.data_nascimento) return false;
          // Ignorar problemas de timezone para aniversários fazendo parse bruto
          const parts = p.data_nascimento.split('-');
          if (parts.length >= 2) {
            const m = parseInt(parts[1], 10);
            return m === mesAtual;
          }
          return false;
        }).sort((a, b) => {
          const diaA = parseInt(a.data_nascimento.split('-')[2], 10);
          const diaB = parseInt(b.data_nascimento.split('-')[2], 10);
          return diaA - diaB;
        });

        // 3. Carregar Próximas Escalas (Buscando de escalas em Gestão Ministerial)
        const { data: escalasRaw, error: errEscalas } = await supabase
          .from('escalas')
          .select(`
            id,
            eventos_ministeriais!inner(
              titulo,
              data_evento
            ),
            ministerio_funcoes(
              nome
            )
          `)
          .eq('pessoa_id', membroLogado.id)
          .gte('eventos_ministeriais.data_evento', hojeIso);

        if (errEscalas) console.error("Erro ao carregar escalas do Gestor Ministerial:", errEscalas);

        const escalasValidas = (escalasRaw || [])
          .map(esc => ({
            id: esc.id,
            data: esc.eventos_ministeriais?.data_evento,
            tipo_escala: esc.eventos_ministeriais?.titulo || 'Evento',
            funcao: esc.ministerio_funcoes?.nome || 'Voluntário'
          }))
          .sort((a, b) => new Date(a.data) - new Date(b.data))
          .slice(0, 3);

        // 4. Carregar Contribuições do Membro (todas)
        const { data: financeiroData } = await supabase
          .from('transacoes_financeiras')
          .select('id, data, valor, categoria_id, descricao, tipo')
          .eq('pessoa_id', membroLogado.id)
          .in('tipo', ['receita', 'entrada', 'RECEITA', 'ENTRADA'])
          .order('data', { ascending: false });

        if (isMounted) {
          setAvisos(avisosData || []);
          setAniversariantes(aniversariantesMes);
          setProximasEscalas(escalasValidas);
          setUltimasContribuicoes(financeiroData || []);
        }
      } catch (err) {
        console.error('Erro ao carregar painel do membro:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    carregarTudo();
    return () => { isMounted = false; };
  }, [membroLogado, refreshTrigger]);

  // Funções Utilitárias Locais
  const formatarDataLocal = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  const primeiroNome = (nome) => nome?.split(' ')[0] || 'Membro';

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500 relative">

      {/* HEADER DE BOAS VINDAS E AVISOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Banner de Boas Vindas */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] text-white p-6 md:p-8 shadow-xl flex items-center justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} />
          </div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/20 overflow-hidden shadow-lg shrink-0">
              {membroLogado?.foto_url ? (
                <img src={membroLogado.foto_url} alt={membroLogado.nome} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center font-black text-2xl">
                  {primeiroNome(membroLogado?.nome).charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-1">
                Bem-vindo(a) à sua igreja,
              </p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                {primeiroNome(membroLogado?.nome)}!
              </h2>
            </div>
          </div>
        </div>

        {/* Mural de Avisos Mini */}
        <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm relative flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3 text-slate-400">
            <ShieldAlert size={14} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Mural de Avisos</span>
          </div>

          {avisos.length > 0 ? (
            <div className="relative h-52 sm:h-60 rounded-xl overflow-hidden w-full">
              {avisos.map((aviso, idx) => {
                const hasLink = !!aviso.link_externo;
                return (
                  <div
                    key={aviso.id}
                    onClick={hasLink ? () => window.open(aviso.link_externo, '_blank', 'noopener,noreferrer') : undefined}
                    className={`absolute inset-0 transition-all duration-700 w-full h-full ${
                      idx === avisoAtivoIdx ? 'opacity-100 z-10' : 'opacity-0 -z-10'
                    } ${hasLink ? 'cursor-pointer hover:opacity-95' : ''}`}
                  >
                    {aviso.imagem_url ? (
                      <img
                        src={aviso.imagem_url}
                        alt={aviso.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 p-4 flex flex-col justify-center">
                        <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{aviso.titulo}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {aviso.subtitulo || (aviso.conteudo_html ? aviso.conteudo_html.replace(/<[^>]+>/g, '') : '')}
                        </p>
                      </div>
                    )}
                    {/* Overlay gradiente escuro na base (se for imagem) */}
                    {aviso.imagem_url && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        <h4 className="font-bold text-sm text-white line-clamp-1">{aviso.titulo}</h4>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-slate-400 text-xs italic opacity-70">
              Nenhum aviso no momento.
            </div>
          )}

          {/* Indicadores de aviso */}
          {avisos.length > 1 && (
            <div className="flex justify-center gap-1 mt-3">
              {avisos.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === avisoAtivoIdx ? 'bg-indigo-500 w-3' : 'bg-slate-200'}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACCESS GRID */}
      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Acesso Rápido</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <button
            onClick={onVerPerfil || (() => onNavigate('pessoas'))}
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-indigo-200 hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Avatar pessoa={membroLogado} tamanho="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-slate-700">Meu Perfil</span>
          </button>

          <button
            onClick={() => onNavigate('gestao', 'escalas')}
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-blue-200 hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Music size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-700 text-center leading-tight">Escalas</span>
          </button>

          <button
            onClick={() => onNavigate('utilitarios', 'pedido-oracao')}
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-purple-200 hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-700">Pedido de Oração</span>
          </button>

          <button
            onClick={() => onNavigate('utilitarios')}
            className="group bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-emerald-200 hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-slate-700">Utilitários</span>
          </button>

        </div>
      </div>

      {/* DASHBOARD CONTENT GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Coluna 1: Escalas e Finanças */}
        <div className="space-y-6">
          {/* Próximas Escalas */}
          <Card className="p-0 overflow-hidden border-slate-100 shadow-sm rounded-3xl">
            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="text-blue-600" size={18} />
                <h4 className="font-black text-xs text-slate-800 uppercase tracking-widest">Minhas Próximas Escalas</h4>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-12 bg-slate-100 rounded-xl"></div>
                  <div className="h-12 bg-slate-100 rounded-xl"></div>
                </div>
              ) : proximasEscalas.length > 0 ? (
                proximasEscalas.map(esc => (
                  <div key={esc.id} className="flex flex-col p-3 rounded-xl border border-slate-100 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[9px] font-black uppercase">{new Date(esc.data).toLocaleString('pt-BR', { month: 'short' })}</span>
                        <span className="text-sm font-black leading-none">{new Date(esc.data).getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{esc.tipo_escala}</p>
                        <div className="text-[10px] text-slate-400 truncate flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span>Função: <span className="font-bold text-slate-600">{esc.funcao || 'Voluntário'}</span></span>
                          {esc.status === 'confirmado' && (
                            <span className="text-[8px] font-black uppercase bg-emerald-50 text-emerald-600 px-1 rounded-md border border-emerald-100">Confirmado</span>
                          )}
                          {esc.status === 'recusado' && (
                            <span className="text-[8px] font-black uppercase bg-rose-50 text-rose-600 px-1 rounded-md border border-rose-100">Recusado</span>
                          )}
                          {esc.status === 'pendente' && (
                            <span className="text-[8px] font-black uppercase bg-amber-50 text-amber-600 px-1 rounded-md border border-amber-100">Pendente</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {esc.status === 'pendente' && (
                      <div className="flex gap-2 mt-3 pt-2.5 border-t border-slate-50">
                        <button
                          type="button"
                          onClick={() => handleResponderEscala(esc.id, 'confirmado')}
                          className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer text-center"
                        >
                          Confirmar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResponderEscala(esc.id, 'recusado')}
                          className="flex-1 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer text-center"
                        >
                          Recusar
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-400 italic">Você não possui escalas futuras programadas.</p>
                </div>
              )}
              {proximasEscalas.length > 0 && (
                <button
                  onClick={() => onNavigate('gestao', 'escalas')}
                  className="w-full mt-2 py-2 text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:bg-blue-50 rounded-lg transition"
                >
                  Ver todas as escalas
                </button>
              )}
            </div>
          </Card>

          {/* Minhas Contribuições */}
          <Card className="p-0 overflow-hidden border-slate-100 shadow-sm rounded-3xl">
            <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="text-emerald-600" size={18} />
                <h4 className="font-black text-xs text-slate-800 uppercase tracking-widest">Minhas Contribuições</h4>
              </div>
              {ultimasContribuicoes.length > 0 && (
                <span className="text-[10px] font-bold text-slate-400">{ultimasContribuicoes.length} registro{ultimasContribuicoes.length !== 1 ? 's' : ''}</span>
              )}
            </div>
            <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="animate-pulse h-20 bg-slate-100 rounded-xl"></div>
              ) : ultimasContribuicoes.length > 0 ? (
                ultimasContribuicoes.map(trans => (
                  <div key={trans.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{trans.descricao || 'Contribuição'}</p>
                      <p className="text-[10px] text-slate-400">{formatarDataLocal(trans.data)}</p>
                    </div>
                    <p className="text-sm font-black text-emerald-600">
                      R$ {Number(trans.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-400 italic">Nenhuma contribuição registrada.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Coluna 2: Aniversariantes */}
        <div className="space-y-6">
          <Card className="p-0 overflow-hidden border-slate-100 shadow-sm rounded-3xl h-full flex flex-col">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-rose-100 p-4 flex items-center gap-2">
              <Gift className="text-rose-500" size={18} />
              <h4 className="font-black text-xs text-rose-700 uppercase tracking-widest">Aniversariantes do Mês</h4>
            </div>

            <div className="p-4 flex-1 overflow-y-auto max-h-[500px] custom-scrollbar">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                      <div className="h-4 w-32 bg-slate-100 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : aniversariantes.length > 0 ? (
                <div className="space-y-3">
                  {aniversariantes.map(pessoa => {
                    const diaNiver = parseInt(pessoa.data_nascimento.split('-')[2], 10);
                    const diaAtual = new Date().getDate();
                    const ehHoje = diaNiver === diaAtual;

                    return (
                      <div
                        key={pessoa.id}
                        className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${ehHoje ? 'bg-rose-50 border border-rose-100' : 'hover:bg-slate-50'}`}
                      >
                        <Avatar pessoa={pessoa} tamanho="w-10 h-10" />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${ehHoje ? 'text-rose-700' : 'text-slate-800'}`}>
                            {pessoa.nome}
                          </p>
                          <p className={`text-[10px] ${ehHoje ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
                            {ehHoje ? '🎉 É HOJE!' : `Dia ${diaNiver}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Gift size={24} className="text-slate-300" />
                  </div>
                  <p className="text-sm font-bold text-slate-500">Nenhum aniversariante</p>
                  <p className="text-xs text-slate-400 mt-1">Ninguém faz aniversário neste mês.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
