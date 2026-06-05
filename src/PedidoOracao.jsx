import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader, Avatar } from './ui';

export default function PedidoOracao({ usuarioLogado }) {
  const [pedido, setPedido] = useState('');
  const [urgente, setUrgente] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [membroLogado, setMembroLogado] = useState(null);

  const carregarDados = useCallback(async () => {
    if (!usuarioLogado?.email) return;
    
    // 1. Buscar ID do membro logado
    const { data: p } = await supabase.from('pessoas').select('id, nome, celula_id').eq('email', usuarioLogado.email).single();
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
    try {
      const { error } = await supabase.from('pedidos_oracao').insert([{
        pessoa_id: membroLogado.id,
        pedido: pedido.trim(),
        urgente
      }]);

      if (error) throw error;

      // Nota: O disparo da mensagem push deve ser feito via Edge Function no Supabase
      // escutando o gatilho de INSERT nesta tabela para garantir entrega offline.

      setPedido('');
      setUrgente(false);
      alert('Seu pedido foi enviado e os líderes serão notificados. Estamos orando por você!');
      carregarDados();
    } catch (err) {
      alert('Erro ao enviar: ' + err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader titulo="Pedido de Oração" breadcrumb={['Utilitários', 'Oração']} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        <Card className="p-0 overflow-hidden">
          <CardHeader titulo="Como podemos clamar por você?" subtitulo="Seu pedido será compartilhado com seu líder de célula e pastores." />
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <textarea
              required
              rows="5"
              value={pedido}
              onChange={(e) => setPedido(e.target.value)}
              className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500/20 outline-none resize-none text-sm"
              placeholder="Escreva aqui sua necessidade, agradecimento ou motivo de oração..."
            />
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={urgente} onChange={e => setUrgente(e.target.checked)} className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500" />
                <span className="text-xs font-bold text-slate-600 group-hover:text-rose-600 transition-colors">Este é um pedido urgente</span>
              </label>

              <button
                type="submit"
                disabled={enviando || !pedido.trim()}
                className="px-8 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {enviando ? 'Enviando...' : '🙏 Enviar Pedido'}
              </button>
            </div>
          </form>
        </Card>

        <aside className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <CardHeader titulo="Meus Pedidos Recentes" />
            <div className="divide-y divide-slate-50">
              {historico.length === 0 ? (
                <p className="p-6 text-center text-xs text-slate-400 italic">Você ainda não realizou pedidos.</p>
              ) : (
                historico.map(h => (
                  <div key={h.id} className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black text-slate-400 uppercase">{new Date(h.created_at).toLocaleDateString('pt-BR')}</span>
                      {h.urgente && <span className="text-[8px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full font-black uppercase">Urgente</span>}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 italic">"{h.pedido}"</p>
                    <span className={`text-[10px] font-bold ${h.status === 'pendente' ? 'text-amber-500' : 'text-emerald-500'}`}>
                      ● {h.status === 'pendente' ? 'Aguardando' : 'Em Oração'}
                    </span>
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