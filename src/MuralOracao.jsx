import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, PageHeader, Avatar } from './ui';
import { Clock, CheckCircle2, Heart } from 'lucide-react';

export default function MuralOracao() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState('todos'); // 'todos' | 'pendente' | 'urgente' | 'respondido'

  const carregarPedidos = useCallback(async () => {
    setCarregando(true);
    try {
      // O RLS cuidará de filtrar os pedidos que o usuário logado tem permissão para ver.
      // Pastores/Admins verão tudo, Líderes verão apenas membros de sua célula.
      const { data, error } = await supabase
        .from('pedidos_oracao')
        .select(`
          *,
          pessoas(
            nome,
            foto_url,
            celula_id,
            celulas(nome)
          )
        `)
        .order('urgente', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPedidos(data || []);
    } catch (err) {
      console.error('Erro ao carregar mural:', err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  async function atualizarStatus(id, novoStatus) {
    try {
      const { error } = await supabase
        .from('pedidos_oracao')
        .update({ status: novoStatus })
        .eq('id', id);

      if (error) throw error;
      carregarPedidos();
    } catch (err) {
      console.error('Erro ao atualizar status:', err.message);
    }
  }

  const pedidosFiltrados = pedidos.filter(p => {
    if (filtro === 'pendente') return p.status === 'pendente';
    if (filtro === 'urgente') return p.urgente && p.status === 'pendente';
    if (filtro === 'respondido') return p.status === 'respondido';
    return true;
  });

  if (carregando) {
    return (
      <div className="max-w-6xl mx-auto pt-0 px-4 pb-12 sm:pt-0 sm:px-6 space-y-6 text-center py-20">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mb-4" />
        <p className="text-slate-500 font-bold text-sm">Carregando mural de orações...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-0 px-0 pb-12 sm:px-6 space-y-6 mx-[-3px] sm:mx-auto">
      <div className="mx-[3px] sm:mx-0">
        <PageHeader 
          titulo="Mural de Orações" 
          breadcrumb={['Admin', 'Oração']} 
        />
      </div>

      {/* Intro Banner */}
      <div className="relative rounded-[24px] overflow-hidden p-6 md:p-8 bg-gradient-to-br from-indigo-950 via-[#1e1b4b] to-[#0f172a] text-white shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full border border-indigo-400/20">
            Painel de Intercessão
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Clamor pelos Nossos Irmãos</h2>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
            Acompanhe as necessidades da igreja. Interceda, ore e marque os pedidos como concluídos quando a resposta chegar, fortalecendo a nossa fé comunitária.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shrink-0 text-center md:text-right max-w-[260px]">
          <p className="text-xs italic text-indigo-200 font-medium leading-relaxed">
            "Antes de tudo, recomendo que se façam súplicas, orações, intercessões e ações de graças por todos os homens."
          </p>
          <span className="text-[10px] font-bold text-indigo-300 uppercase block mt-2 tracking-widest">— 1 Timóteo 2:1</span>
        </div>
      </div>

      {/* Filtros em Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 backdrop-blur-md rounded-2xl w-fit border border-slate-200/50">
        {[
          { id: 'todos', label: 'Todos os Pedidos', count: pedidos.length },
          { id: 'pendente', label: 'Pendentes', count: pedidos.filter(p => p.status === 'pendente').length },
          { id: 'urgente', label: 'Urgentes', count: pedidos.filter(p => p.urgente && p.status === 'pendente').length },
          { id: 'respondido', label: 'Concluídos', count: pedidos.filter(p => p.status === 'respondido').length }
        ].map((tab) => {
          const ativo = filtro === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFiltro(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-xl text-[8px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 select-none ${
                ativo 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black transition-colors ${
                ativo 
                  ? (tab.id === 'urgente' && tab.count > 0 ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-700') 
                  : 'bg-slate-200/60 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de Pedidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pedidosFiltrados.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 italic text-sm">Nenhum pedido de oração encontrado nesta categoria.</p>
          </div>
        ) : (
          pedidosFiltrados.map((p) => {
            const isUrgent = p.urgente && p.status === 'pendente';
            const isDone = p.status === 'respondido';
            
            return (
              <Card 
                key={p.id} 
                className={`p-0 overflow-hidden rounded-3xl border border-slate-100/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full bg-white border-t-4 ${
                  isDone 
                    ? 'border-t-emerald-500 bg-gradient-to-b from-emerald-50/10 to-white' 
                    : (isUrgent ? 'border-t-rose-500 bg-gradient-to-b from-rose-50/10 to-white shadow-rose-100/50' : 'border-t-purple-500 bg-gradient-to-b from-purple-50/10 to-white')
                }`}
              >
                <div className="p-5 flex flex-col gap-4 flex-1">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-xl transition-all ${
                        isDone
                          ? 'ring-2 ring-emerald-500/20'
                          : (isUrgent ? 'ring-2 ring-rose-500/30 shadow-lg shadow-rose-500/10' : 'ring-2 ring-purple-500/20')
                      }`}>
                        <Avatar pessoa={p.pessoas} tamanho="w-10 h-10" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-800 leading-tight">
                          {p.pessoas?.nome}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                          {p.pessoas?.celulas?.nome || 'Sem Célula'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Pulsing indicator tag */}
                    <div className="flex items-center gap-2">
                      {isUrgent && (
                        <span className="text-[8px] bg-rose-50 border border-rose-200 text-rose-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse shrink-0" />
                          Urgente
                        </span>
                      )}
                      {isDone && (
                        <span className="text-[8px] bg-emerald-50 border border-emerald-200 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                          Concluído
                        </span>
                      )}
                      {!isUrgent && !isDone && (
                        <span className="text-[8px] bg-purple-50 border border-purple-200 text-purple-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse shrink-0" />
                          Pendente
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quote Block */}
                  <div className={`relative p-4 rounded-2xl min-h-[90px] border flex-1 flex flex-col justify-center ${
                    isDone
                      ? 'bg-emerald-50/20 border-emerald-100/50'
                      : (isUrgent ? 'bg-rose-50/20 border-rose-100/50' : 'bg-purple-50/20 border-purple-100/50')
                  }`}>
                    {/* Left border accent */}
                    <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-lg ${
                      isDone ? 'bg-emerald-400' : (isUrgent ? 'bg-rose-400' : 'bg-purple-400')
                    }`} />
                    
                    {/* Quote mark */}
                    <span className={`absolute right-3 top-2 text-2xl font-serif select-none opacity-20 font-black leading-none ${
                      isDone ? 'text-emerald-500' : (isUrgent ? 'text-rose-500' : 'text-purple-500')
                    }`}>
                      “
                    </span>
                    
                    <p className="text-xs text-slate-600 font-medium italic leading-relaxed pl-2 pr-4 break-words">
                      {p.pedido}
                    </p>
                  </div>

                  {/* Date & Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100/80">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-300" />
                      {new Date(p.created_at).toLocaleDateString('pt-BR')}
                    </span>
                    
                    <div className="flex gap-2">
                      {!isDone ? (
                        <button 
                          onClick={() => atualizarStatus(p.id, 'respondido')}
                          className="text-[10px] font-black text-emerald-600 hover:bg-emerald-50 border border-emerald-100 hover:border-emerald-200 px-3 py-1.5 rounded-xl transition-all active:scale-95 flex items-center gap-1 cursor-pointer select-none"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          CONCLUIR
                        </button>
                      ) : (
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1 select-none">
                          <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                          EM ORAÇÃO
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}