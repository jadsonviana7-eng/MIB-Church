import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, PageHeader, Avatar } from './ui';

export default function MuralOracao() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

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
      alert('Erro ao atualizar status: ' + err.message);
    }
  }

  if (carregando) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-slate-400">
        Carregando mural de orações...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader 
        titulo="Mural de Orações" 
        breadcrumb={['Admin', 'Oração']} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pedidos.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-400 italic">Nenhum pedido de oração encontrado para seu acesso.</p>
          </div>
        ) : (
          pedidos.map((p) => (
            <Card key={p.id} className={`border-t-4 ${p.urgente ? 'border-t-rose-500 shadow-rose-100' : 'border-t-purple-500'}`}>
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar pessoa={p.pessoas} />
                    <div>
                      <h4 className="text-sm font-black text-slate-800 leading-tight">
                        {p.pessoas?.nome}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {p.pessoas?.celulas?.nome || 'Sem Célula'}
                      </p>
                    </div>
                  </div>
                  {p.urgente && (
                    <span className="text-[8px] bg-rose-100 text-rose-600 px-2 py-1 rounded-full font-black uppercase">
                      Urgente
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 p-4 rounded-xl min-h-[80px]">
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{p.pedido}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase">
                    {new Date(p.created_at).toLocaleDateString('pt-BR')}
                  </span>
                  
                  <div className="flex gap-2">
                    {p.status !== 'respondido' ? (
                      <button 
                        onClick={() => atualizarStatus(p.id, 'respondido')}
                        className="text-[10px] font-black text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-colors"
                      >
                        CONCLUIR
                      </button>
                    ) : (
                      <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1">
                        ✅ CONCLUÍDO
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}