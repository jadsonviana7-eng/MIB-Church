import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { utilitariosCache } from './utilitariosCache';
import { Card, CardHeader, PageHeader, Avatar } from './ui';
import { Heart, Send, CheckCircle2, AlertCircle, Pencil, Trash2, X } from 'lucide-react';

export default function PedidoOracao({ usuarioLogado }) {
  const emailChave = usuarioLogado?.email || '';
  const cacheInicial = emailChave ? utilitariosCache.pedidoOracaoPorEmail[emailChave] : null;
  const [pedido, setPedido] = useState('');
  const [urgente, setUrgente] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);
  const [historico, setHistorico] = useState(() => cacheInicial?.historico || []);
  const [membroLogado, setMembroLogado] = useState(() => cacheInicial?.membro || null);
  const [statusEnvio, setStatusEnvio] = useState(null); // { type: 'success' | 'error', message: '...' }

  const carregarDados = useCallback(async () => {
    if (!usuarioLogado?.email) return;
    
    // 1. Buscar ID do membro logado
    const { data: p } = await supabase.from('pessoas').select('id, nome, celula_id, foto_url').eq('email', usuarioLogado.email).single();
    if (p) {
      setMembroLogado(p);
      // 2. Buscar histórico
      const { data: h } = await supabase.from('pedidos_oracao').select('*').eq('pessoa_id', p.id).order('created_at', { ascending: false }).limit(10);
      const hist = h || [];
      utilitariosCache.pedidoOracaoPorEmail[usuarioLogado.email] = { membro: p, historico: hist };
      setHistorico(hist);
    }
  }, [usuarioLogado]);

  useEffect(() => { carregarDados(); }, [carregarDados]);

  function iniciarEdicao(item) {
    setEditandoId(item.id);
    setPedido(item.pedido || '');
    setUrgente(Boolean(item.urgente));
    setStatusEnvio(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setPedido('');
    setUrgente(false);
  }

  async function handleExcluir(item) {
    const confirmado = window.confirmModal
      ? await window.confirmModal('Excluir Pedido de Oração', 'Tem certeza que deseja excluir este pedido de oração permanentemente?')
      : window.confirm('Tem certeza que deseja excluir este pedido de oração permanentemente?');
    if (!confirmado) return;

    setExcluindoId(item.id);
    setStatusEnvio(null);
    try {
      const { error } = await supabase
        .from('pedidos_oracao')
        .delete()
        .eq('id', item.id);

      if (error) throw error;

      if (editandoId === item.id) {
        cancelarEdicao();
      }
      utilitariosCache.muralOracao = null;
      setHistorico((prev) => {
        const atualizado = prev.filter((x) => x.id !== item.id);
        if (usuarioLogado?.email && membroLogado) {
          utilitariosCache.pedidoOracaoPorEmail[usuarioLogado.email] = { membro: membroLogado, historico: atualizado };
        }
        return atualizado;
      });
      setStatusEnvio({
        type: 'success',
        message: 'Pedido de oração excluído com sucesso.'
      });
      carregarDados();
    } catch (err) {
      setStatusEnvio({
        type: 'error',
        message: 'Erro ao excluir pedido: ' + err.message
      });
    } finally {
      setExcluindoId(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!pedido.trim() || !membroLogado) return;

    setEnviando(true);
    setStatusEnvio(null);
    try {
      if (editandoId) {
        const { error } = await supabase
          .from('pedidos_oracao')
          .update({
            pedido: pedido.trim(),
            urgente
          })
          .eq('id', editandoId);

        if (error) throw error;

        cancelarEdicao();
        utilitariosCache.muralOracao = null;
        setStatusEnvio({
          type: 'success',
          message: 'Pedido de oração atualizado com sucesso!'
        });
      } else {
        const { error } = await supabase.from('pedidos_oracao').insert([{
          pessoa_id: membroLogado.id,
          pedido: pedido.trim(),
          urgente
        }]);

        if (error) throw error;

        setPedido('');
        setUrgente(false);
        utilitariosCache.muralOracao = null;
        setStatusEnvio({
          type: 'success',
          message: 'Seu pedido foi enviado e os líderes serão notificados. Estamos orando por você!'
        });
      }
      carregarDados();
    } catch (err) {
      setStatusEnvio({
        type: 'error',
        message: 'Erro ao salvar: ' + err.message
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="w-full pt-0 pb-12 space-y-6">
      <div>
        <PageHeader titulo="Pedido de Oração" breadcrumb={['Utilitários', 'Oração']} />
      </div>

      {/* Intro card banner */}
      <div className="relative rounded-[24px] overflow-hidden p-6 md:p-8 bg-gradient-to-br from-indigo-950 via-[#2e1065] to-[#172554] text-white shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full border border-purple-400/20">
            Espaço de Clamor
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">O Poder da Oração em Comunidade</h2>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
            Deus ouve o seu clamor. Escreva o seu pedido com fé e confiança. Suas petições são encaminhadas diretamente aos líderes da sua célula e aos pastores da MIB Church.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shrink-0 text-center md:text-right max-w-[260px]">
          <p className="text-xs italic text-purple-200 font-medium leading-relaxed">
            "Não andeis ansiosos por coisa alguma; antes em tudo apresentai as vossas petições a Deus pela oração e súplica, com ações de graças."
          </p>
          <span className="text-[10px] font-bold text-purple-300 uppercase block mt-2 tracking-widest">— Filipenses 4:6</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-6 items-start">
        <Card className="p-0 overflow-hidden rounded-3xl border border-slate-100 dark:border-[#2b3954] shadow-md min-w-0">
          <CardHeader
            titulo={editandoId ? 'Editar Pedido de Oração' : 'Como podemos clamar por você?'}
            subtitulo={editandoId ? 'Altere o texto ou a prioridade do seu pedido abaixo.' : 'Seu pedido será compartilhado de forma segura com seus líderes.'}
          />
          
          {membroLogado && (
            <div className="flex items-center gap-3 px-6 pt-4 pb-1">
              <Avatar pessoa={membroLogado} tamanho="w-9 h-9" />
              <div>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Apresentado por</p>
                <h4 className="text-xs font-black text-slate-800 leading-tight">{membroLogado.nome}</h4>
              </div>
            </div>
          )}

          {statusEnvio && (
            <div className={`mx-6 mt-4 p-4 rounded-2xl flex items-start gap-3 border animate-in fade-in duration-200 ${
              statusEnvio.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <div className="shrink-0 mt-0.5">
                {statusEnvio.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                )}
              </div>
              <div className="flex-1 text-xs font-semibold leading-relaxed">
                {statusEnvio.message}
              </div>
              <button 
                type="button" 
                onClick={() => setStatusEnvio(null)}
                className={`text-[10px] font-bold hover:opacity-75 transition-opacity px-2 py-1 rounded-lg border h-fit shrink-0 ${
                  statusEnvio.type === 'success' ? 'border-emerald-300 bg-white text-emerald-700' : 'border-rose-300 bg-white text-rose-700'
                }`}
              >
                Fechar
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="relative">
              <textarea
                required
                rows="5"
                value={pedido}
                onChange={(e) => {
                  setPedido(e.target.value);
                  if (statusEnvio) setStatusEnvio(null);
                }}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none resize-none text-sm text-slate-800 transition-all placeholder:text-slate-400"
                placeholder="Escreva aqui sua necessidade, agradecimento ou motivo de oração..."
              />
            </div>
            
            <div className="flex flex-col gap-3 pt-1">
              <label className="w-full flex items-center gap-3 cursor-pointer group p-3.5 rounded-xl border border-slate-200/80 dark:border-[#24334f] bg-slate-50/50 dark:bg-[#0f172a]/50 hover:border-rose-200 dark:hover:border-rose-800/60 hover:bg-rose-50/30 dark:hover:bg-rose-950/20 transition-all select-none">
                <input 
                  type="checkbox" 
                  checked={urgente} 
                  onChange={e => setUrgente(e.target.checked)} 
                  className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500/20 transition-all cursor-pointer shrink-0" 
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">Este é um pedido urgente</span>
                  <span className="text-[11px] text-slate-400 font-medium">Requer atenção imediata dos líderes</span>
                </div>
              </label>

              <div className="flex flex-wrap items-center justify-end gap-2.5">
                {editandoId && (
                  <button
                    type="button"
                    onClick={cancelarEdicao}
                    className="px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#131d31] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1c2b4a] transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={enviando || !pedido.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:via-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest border border-indigo-400/30 shadow-md shadow-indigo-600/25 dark:shadow-indigo-950/60 hover:shadow-lg hover:shadow-indigo-600/35 dark:hover:shadow-indigo-950/80 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:shadow-none disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {enviando ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      {editandoId ? 'Salvando...' : 'Enviando...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      {editandoId ? 'Salvar Alterações' : 'Enviar Pedido'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </Card>

        <aside className="space-y-4">
          <Card className="p-0 overflow-hidden rounded-3xl border border-slate-100 dark:border-[#2b3954] shadow-md">
            <CardHeader titulo="Meus Pedidos Recentes" />
            <div className="p-6 space-y-6 relative before:absolute before:left-7.5 before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-100 dark:before:bg-[#24334f]">
              {historico.length === 0 ? (
                <p className="py-2 text-center text-xs text-slate-400 italic">Você ainda não realizou pedidos.</p>
              ) : (
                historico.map(h => {
                  const emEdicao = editandoId === h.id;
                  return (
                  <div key={h.id} className="relative pl-10 space-y-2 group">
                    {/* Timeline Dot */}
                    <div className={`absolute left-1 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-white dark:bg-[#17223b] transition-all duration-300 z-10 ${
                      h.status === 'pendente' 
                        ? (h.urgente ? 'border-rose-500 ring-4 ring-rose-500/20' : 'border-amber-500 ring-4 ring-amber-500/20')
                        : 'border-emerald-500 ring-4 ring-emerald-500/20'
                    }`} />
                    
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        {new Date(h.created_at).toLocaleDateString('pt-BR')}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {h.urgente && (
                          <span className="text-[8px] bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-300 px-2 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse">
                            Urgente
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => iniciarEdicao(h)}
                          title="Editar pedido"
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            emEdicao
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50'
                          }`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={excluindoId === h.id}
                          onClick={() => handleExcluir(h)}
                          title="Excluir pedido"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer disabled:opacity-40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className={`rounded-2xl p-3 relative transition-colors border ${
                      emEdicao
                        ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-300 dark:border-blue-600/60'
                        : 'bg-slate-50 dark:bg-[#0f172a]/80 border-slate-100 dark:border-[#24334f] group-hover:bg-slate-100/50 dark:group-hover:bg-[#131d31]'
                    }`}>
                      <p className="text-xs text-slate-600 dark:text-slate-200 italic leading-relaxed break-words">
                        "{h.pedido}"
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pl-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${h.status === 'pendente' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span className={`text-[10px] font-bold ${h.status === 'pendente' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {h.status === 'pendente' ? 'Aguardando' : 'Em Oração'}
                        </span>
                      </div>
                      {emEdicao && (
                        <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          Editando...
                        </span>
                      )}
                    </div>
                  </div>
                  );
                })
              )}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}