import { useEffect, useState } from 'react';
import { Clock, Filter, User, BookOpen } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function HistoricoMinisterial() {
  const [logs, setLogs] = useState([]);
  const [filtroAcao, setFiltroAcao] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarLogs();
  }, [filtroAcao]);

  async function carregarLogs() {
    setLoading(true);
    try {
      let query = supabase
        .from('historico_ministerial')
        .select(`
          id,
          acao,
          detalhes,
          criado_em,
          pessoas (
            nome,
            cargo
          ),
          ministerios (
            nome
          )
        `)
        .order('criado_em', { ascending: false });

      if (filtroAcao) {
        query = query.eq('acao', filtroAcao);
      }

      const { data, error } = await query;
      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  }

  function getAcaoBadge(acao) {
    switch (acao) {
      case 'ENTRADA_MINISTERIO':
        return <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 border border-green-100 text-[9px] font-black uppercase tracking-wider">Entrada</span>;
      case 'SAIDA_MINISTERIO':
        return <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-100 text-[9px] font-black uppercase tracking-wider">Saída</span>;
      case 'PARTICIPACAO_ESCALA':
        return <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 text-[9px] font-black uppercase tracking-wider">Escala</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-100 text-[9px] font-black uppercase tracking-wider">Alteração</span>;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Histórico Ministerial</h2>
          <p className="text-xs text-slate-500">Rastreabilidade completa de movimentações, escalas e promoções de voluntários.</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={14} className="text-slate-400" />
          <select
            value={filtroAcao}
            onChange={(e) => setFiltroAcao(e.target.value)}
            className="w-full sm:w-auto border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white outline-none font-bold text-slate-600 cursor-pointer"
          >
            <option value="">Filtrar todos os eventos...</option>
            <option value="ENTRADA_MINISTERIO">Entrada em Ministério</option>
            <option value="SAIDA_MINISTERIO">Saída de Ministério</option>
            <option value="PARTICIPACAO_ESCALA">Participação em Escala</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 italic">
            Buscando linha do tempo ministerial...
          </div>
        ) : logs.length === 0 ? (
          <div className="py-16 text-center text-slate-400 italic text-sm">
            Nenhum evento registrado no histórico ministerial.
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-100 pl-6 ml-4 space-y-6">
            {logs.map((log) => {
              const data = new Date(log.criado_em).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div key={log.id} className="relative group">
                  {/* Ponto na timeline */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-500 group-hover:scale-125 transition-transform" />
                  
                  <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl p-4 transition">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {getAcaoBadge(log.acao)}
                        <h4 className="font-bold text-sm text-slate-800">
                          {log.pessoas?.nome || 'Voluntário'}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        {data}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2">
                      {log.detalhes} {log.ministerios && <>no ministério <strong className="text-slate-800 font-bold">{log.ministerios.nome}</strong></>}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
