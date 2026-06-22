import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader, Avatar } from './ui';
import { Heart, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PedidoOracao({ usuarioLogado }) {
  const [pedido, setPedido] = useState('');
  const [urgente, setUrgente] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [membroLogado, setMembroLogado] = useState(null);
  const [statusEnvio, setStatusEnvio] = useState(null); // { type: 'success' | 'error', message: '...' }

  const carregarDados = useCallback(async () => {
    if (!usuarioLogado?.email) return;
    
    // 1. Buscar ID do membro logado
    const { data: p } = await supabase.from('pessoas').select('id, nome, celula_id, foto_url').eq('email', usuarioLogado.email).single();
    if (p) {
      setMembroLogado(p);
      // 2. Buscar histórico
      const { data: h } = await supabase.from('pedidos_oracao').select('*').eq('pessoa_id', p.id).order('created_at', { ascending: false }).limit(5);
      setHistorico(h || []);
    }
  }, [usuarioLogado]);

  useEffect(() => { carregarDados(); }, [carregarDados]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!pedido.trim() || !membroLogado) return;

    setEnviando(true);
    setStatusEnvio(null);
    try {
      const { error } = await supabase.from('pedidos_oracao').insert([{
        pessoa_id: membroLogado.id,
        pedido: pedido.trim(),
        urgente
      }]);

      if (error) throw error;

      setPedido('');
      setUrgente(false);
      setStatusEnvio({
        type: 'success',
        message: 'Seu pedido foi enviado e os líderes serão notificados. Estamos orando por você!'
      });
      carregarDados();
    } catch (err) {
      setStatusEnvio({
        type: 'error',
        message: 'Erro ao enviar: ' + err.message
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto pt-0 px-0 pb-12 sm:px-6 space-y-6 mx-[-3px] sm:mx-auto">
      <div className="mx-[3px] sm:mx-0">
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        <Card className="p-0 overflow-hidden rounded-3xl border border-slate-100 shadow-md">
          <CardHeader titulo="Como podemos clamar por você?" subtitulo="Seu pedido será compartilhado de forma segura com seus líderes." />
          
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
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl border border-slate-100 hover:border-rose-100 hover:bg-rose-50/20 transition-all select-none">
                <input 
                  type="checkbox" 
                  checked={urgente} 
                  onChange={e => setUrgente(e.target.checked)} 
                  className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500/20 transition-all cursor-pointer" 
                />
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-slate-700 group-hover:text-rose-600 transition-colors">Este é um pedido urgente</span>
                  <span className="text-[10px] text-slate-400 font-medium">Requer atenção imediata dos líderes</span>
                </div>
              </label>

              <button
                type="submit"
                disabled={enviando || !pedido.trim()}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-purple-200 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer h-fit shrink-0"
              >
                {enviando ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Enviar Pedido
                  </>
                )}
              </button>
            </div>
          </form>
        </Card>

        <aside className="space-y-4">
          <Card className="p-0 overflow-hidden rounded-3xl border border-slate-100 shadow-md">
            <CardHeader titulo="Meus Pedidos Recentes" />
            <div className="p-6 space-y-6 relative before:absolute before:left-7.5 before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-100">
              {historico.length === 0 ? (
                <p className="py-2 text-center text-xs text-slate-400 italic">Você ainda não realizou pedidos.</p>
              ) : (
                historico.map(h => (
                  <div key={h.id} className="relative pl-10 space-y-2 group">
                    {/* Timeline Dot */}
                    <div className={`absolute left-1 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-white transition-all duration-300 z-10 ${
                      h.status === 'pendente' 
                        ? (h.urgente ? 'border-rose-500 ring-4 ring-rose-500/20' : 'border-amber-500 ring-4 ring-amber-500/20')
                        : 'border-emerald-500 ring-4 ring-emerald-500/20'
                    }`} />
                    
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        {new Date(h.created_at).toLocaleDateString('pt-BR')}
                      </span>
                      {h.urgente && (
                        <span className="text-[8px] bg-rose-50 border border-rose-200 text-rose-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse">
                          Urgente
                        </span>
                      )}
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 relative group-hover:bg-slate-100/50 transition-colors">
                      <p className="text-xs text-slate-600 italic leading-relaxed">
                        "{h.pedido}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1.5 pl-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${h.status === 'pendente' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                      <span className={`text-[10px] font-bold ${h.status === 'pendente' ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {h.status === 'pendente' ? 'Aguardando' : 'Em Oração'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}