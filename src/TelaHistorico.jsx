import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function TelaHistorico() {
  const [relatorios, setRelatorios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function buscarHistorico() {
    setCarregando(true);
    // Busca os relatórios trazendo o nome da célula vinculada
    const { data, error } = await supabase
      .from('relatorios_celula')
      .select('*, celulas(nome)')
      .order('data_reuniao', { ascending: false });

    if (!error && data) {
      setRelatorios(data);
    }
    setCarregando(false);
  }

  useEffect(() => {
    const carregamentoInicial = window.setTimeout(() => {
      buscarHistorico();
    }, 0);

    return () => window.clearTimeout(carregamentoInicial);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-full sm:max-w-4xl w-full px-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Histórico de Reuniões</h2>
          <p className="text-slate-400 text-xs mt-0.5">Acompanhe a frequência, ofertas e relatórios enviados pelas células.</p>
        </div>
        <button 
          onClick={buscarHistorico}
          disabled={carregando}
          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-1.5 px-3 rounded-lg transition cursor-pointer disabled:opacity-50"
        >
          {carregando ? '🔄 Atualizando...' : '🔄 Atualizar'}
        </button>
      </div>

      {carregando ? (
        <div className="text-center py-12 text-slate-400 text-sm font-medium">
          Carregando histórico de relatórios...
        </div>
      ) : relatorios.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm font-medium border border-dashed border-slate-200 rounded-2xl">
          Nenhum relatório de reunião foi lançado até o momento.
        </div>
      ) : (
        <div className="space-y-4">
          {relatorios.map((relatorio) => (
            <div 
              key={relatorio.id} 
              className="p-5 border border-slate-100 rounded-2xl bg-white shadow-xs hover:shadow-md hover:border-slate-200/80 transition duration-200 flex flex-col gap-4"
            >
              {/* Cabeçalho do Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-50 pb-3">
                <div>
                  <span className="bg-slate-950 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    ⛺ {relatorio.celulas ? relatorio.celulas.nome : 'Célula Desconhecida'}
                  </span>
                  <span className="block sm:inline sm:ml-3 text-xs font-medium text-slate-400 mt-1 sm:mt-0">
                    Encontro em: {new Date(relatorio.data_reuniao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </span>
                </div>
                
                {/* Indicadores Rápidos + Botão Inovador de Comprovante */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    👥 {relatorio.visitantes_presentes} Visitantes
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    💰 R$ {Number(relatorio.oferta).toFixed(2)}
                  </span>
                  
                  {/* INOVAÇÃO: Validação e Botão para abrir o Comprovante do Storage */}
                  {relatorio.comprovante_url && (
                    <a 
                      href={relatorio.comprovante_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full transition flex items-center gap-1 shadow-xs"
                    >
                      📎 Ver Recibo
                    </a>
                  )}
                </div>
              </div>

              {/* Observações / Testemunhos */}
              {relatorio.observacoes ? (
                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100/60">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Relato do Líder:</h4>
                  <p className="text-sm text-slate-600 italic">"{relatorio.observacoes}"</p>
                </div>
              ) : (
                <p className="text-xs text-slate-300 italic">Nenhum testemunho ou observação registrada.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TelaHistorico;
