import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';

export default function HistoricoFinanceiro() {
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
      <PageHeader 
        titulo="Histórico de Ações" 
        breadcrumb={['Financeiro', 'Histórico']}
      />

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
            <table className="table-mib">
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
          </div>
        )}
      </Card>
    </div>
  );
}