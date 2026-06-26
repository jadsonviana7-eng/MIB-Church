import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';

export default function HistoricoFinanceiro({ onVoltar }) {
  const [logs, setLogs] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarLogs = useCallback(async () => {
    setCarregando(true);
    try {
      const { data, error } = await supabase
        .from('logs_financeiros')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Erro ao carregar logs:', error.message);
      setErro("Não foi possível carregar os logs. Verifique se a tabela 'logs_financeiros' foi criada no Supabase.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarLogs();
  }, [carregarLogs]);

  return (
    <div className="space-y-6">
      <div className="print:hidden mx-[3px] sm:mx-0">
        <PageHeader 
          titulo="Logs de Ações" 
          breadcrumb={['Resumo', 'Logs']}
          onNavigate={onVoltar}
        />
      </div>

      <Card className="p-0">
        <CardHeader titulo="Logs de Atividade" />
        {erro && (
          <div className="p-4 m-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs font-semibold">
            {erro}
          </div>
        )}
        {carregando ? (
          <div className="p-10 text-center text-sm text-slate-400">Carregando histórico...</div>
        ) : logs.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">Nenhuma ação registrada ainda.</div>
        ) : (
          <div className="overflow-x-auto">
            {/* TABELA - Visível apenas em Desktop */}
            <table className="table-mib hidden md:table">
              <thead>
                <tr>
                  <th>Data/Hora</th>
                  <th>Usuário</th>
                  <th>Ação</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString('pt-BR')}
                    </td>
                    <td className="font-semibold text-slate-700">
                      {log.usuario_email}
                    </td>
                    <td>
                      <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                        {log.acao}
                      </span>
                    </td>
                    <td className="text-slate-500 text-xs italic">
                      {log.detalhes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* LISTA COMPACTA - Visível apenas em Mobile */}
            <div className="md:hidden divide-y divide-slate-100">
              {logs.map((log) => (
                <div key={log.id} className="p-4 space-y-2 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {new Date(log.created_at).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(log.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[9px] font-black uppercase border border-slate-200">
                      {log.acao}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{log.usuario_email}</p>
                    <p className="text-xs text-slate-500 italic mt-1 leading-relaxed">"{log.detalhes}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}