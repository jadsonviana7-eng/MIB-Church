import { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import { Avatar, AvatarCelula } from './ui';
import { montarObservacoesComMetadados, extrairMetadadosReuniao } from './reuniaoHelpers';
import { mascaraMoeda, desmascararMoeda } from './mascaras';

export default function ModalLancarReuniao({ celulas, pessoas, celulaInicial = '', onFechar, onSalvo, reuniaoParaEditar }) {
  const [celulaId, setCelulaId] = useState(celulaInicial || reuniaoParaEditar?.celula_id || '');
  const [dataReuniao, setDataReuniao] = useState(reuniaoParaEditar?.data_reuniao || new Date().toLocaleDateString('en-CA'));
  const [oferta, setOferta] = useState(reuniaoParaEditar?.oferta ? mascaraMoeda(reuniaoParaEditar.oferta * 100) : '');
  const [temaMinistrado, setTemaMinistrado] = useState('');
  const [obs, setObs] = useState('');
  const [presencas, setPresencas] = useState({});
  const [nomesVisitantes, setNomesVisitantes] = useState([]);
  const [novoVisitante, setNovoVisitante] = useState('');
  const [enviando, setEnviando] = useState(false);

  const celulaAtiva = useMemo(() => {
    return celulas.find(c => String(c.id) === String(celulaId));
  }, [celulas, celulaId]);

  const membros = useMemo(
    () => pessoas.filter((p) => String(p.celula_id || '') === String(celulaId) && p.status !== 'inativo'),
    [pessoas, celulaId]
  );
  const tituloModal = reuniaoParaEditar ? 'Editar encontro da célula' : 'Lançar encontro da célula';
  const botaoTexto = reuniaoParaEditar ? '💾 Salvar Alterações' : 'Concluir';

  useEffect(() => {
    if (reuniaoParaEditar) {
      const { observacao, tema, nomesVisitantes: visitantes } = extrairMetadadosReuniao(reuniaoParaEditar.observacoes);
      setTemaMinistrado(tema);
      setObs(observacao);
      setNomesVisitantes(visitantes);
      setCelulaId(reuniaoParaEditar.celula_id);
      setDataReuniao(reuniaoParaEditar.data_reuniao);
      setOferta(reuniaoParaEditar.oferta ? mascaraMoeda(reuniaoParaEditar.oferta * 100) : '');
    }
  }, [reuniaoParaEditar]);

  const handleAdicionarVisitante = () => {
    if (!novoVisitante.trim()) return;
    const nomes = novoVisitante.split(',')
      .map(n => {
        const trimmed = n.trim();
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase(); // Capitaliza o primeiro e o resto em minúsculas
      })
      .filter(n => n !== "");
    if (nomes.length > 0) {
      setNomesVisitantes([...nomesVisitantes, ...nomes]);
      setNovoVisitante('');
    }
  };

  useEffect(() => {
    let montado = true;
    
    async function inicializarPresencas() {
      // Se já temos presenças e não mudamos de reunião/célula, não resetamos
      if (Object.keys(presencas).length > 0 && !reuniaoParaEditar) return;

      if (reuniaoParaEditar?.id) {
        const { data } = await supabase
          .from('presencas_relatorio')
          .select('pessoa_id')
          .eq('relatorio_id', reuniaoParaEditar.id);

        if (data && montado) {
          const mapa = {};
          const presentesIds = data.map(p => String(p.pessoa_id));
          membros.forEach(m => {
            mapa[m.id] = presentesIds.includes(String(m.id));
          });
          setPresencas(mapa);
        }
      } else if (celulaId && membros.length > 0 && montado) {
        const inicia = {};
        membros.forEach((m) => { inicia[m.id] = false; });
        setPresencas(inicia);
      }
    }

    inicializarPresencas();
    return () => { montado = false; };
  }, [celulaId, reuniaoParaEditar?.id]); // Removido 'membros' da dependência para evitar resets

  async function handleSalvar(e) {
    e.preventDefault();
    if (!celulaId) {
      window.alert('Selecione a célula do encontro.');
      return;
    }
    setEnviando(true);
    try {
      const observacoesFinal = montarObservacoesComMetadados(obs, temaMinistrado, nomesVisitantes);
      
      if (reuniaoParaEditar) {
        // Modo Edição
        const { error } = await supabase
          .from('relatorios_celula')
          .update({
            celula_id: celulaId,
            data_reuniao: dataReuniao,
            visitantes_presentes: nomesVisitantes.length,
            oferta: desmascararMoeda(oferta) || 0,
            observacoes: observacoesFinal,
          })
          .eq('id', reuniaoParaEditar.id);
        
        if (error) throw error;

        await supabase.from('presencas_relatorio').delete().eq('relatorio_id', reuniaoParaEditar.id);

        const idsPresentes = Object.keys(presencas).filter((id) => presencas[id]);
        if (idsPresentes.length > 0) {
          const dadosPresenca = idsPresentes.map((idPessoa) => ({
            relatorio_id: reuniaoParaEditar.id,
            pessoa_id: idPessoa,
          }));
          const { error: erroPresenca } = await supabase.from('presencas_relatorio').insert(dadosPresenca);
          if (erroPresenca) throw erroPresenca;
        }
      } else {
        // Modo Novo
        const { data: relatorioCriado, error } = await supabase
          .from('relatorios_celula')
          .insert([{
            celula_id: celulaId,
            data_reuniao: dataReuniao,
            visitantes_presentes: nomesVisitantes.length,
            oferta: desmascararMoeda(oferta) || 0,
            observacoes: observacoesFinal,
          }])
          .select()
          .single();
        if (error) throw error;

        const idsPresentes = Object.keys(presencas).filter((id) => presencas[id]);
        if (idsPresentes.length > 0) {
          const dadosPresenca = idsPresentes.map((idPessoa) => ({
            relatorio_id: relatorioCriado.id,
            pessoa_id: idPessoa,
          }));
          const { error: erroPresenca } = await supabase.from('presencas_relatorio').insert(dadosPresenca);
          if (erroPresenca) throw erroPresenca;
        }
      }

      if (onSalvo) await onSalvo();
      onFechar();
    } catch (err) {
      window.alert('Erro ao salvar reunião: ' + err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm sm:p-4">
      <div className="bg-white shadow-xl w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-xl sm:rounded-[32px] flex flex-col overflow-hidden">
        <div className="card-header flex justify-between items-center">
          <h4 className="font-semibold text-[var(--text-heading)]">{tituloModal}</h4>
          <button type="button" onClick={onFechar} className="text-[var(--text-muted)] font-bold cursor-pointer">✕</button>
        </div>
        <form onSubmit={handleSalvar} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm mb-2">
              <AvatarCelula celula={celulaAtiva} tamanho="w-12 h-12" />
              <div className="min-w-0">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Célula Selecionada</label>
                <h3 className="text-sm sm:text-base font-black text-[#055F6D] truncate leading-tight">{celulaAtiva?.nome || 'Célula não identificada'}</h3>
              </div>
            </div>

            <div className="space-y-3">
              {/* Tema - No topo no mobile para ganhar espaço */}
              <div className="sm:hidden">
                <label className="block text-xs font-medium mb-1">Tema / Assunto da Reunião</label>
                <input type="text" value={temaMinistrado} onChange={(e) => setTemaMinistrado(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" placeholder="O que foi ensinado?" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="hidden sm:block">
                  <label className="block text-xs font-medium mb-1">Tema</label>
                  <input type="text" value={temaMinistrado} onChange={(e) => setTemaMinistrado(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Data</label>
                  <input type="date" value={dataReuniao} onChange={(e) => setDataReuniao(e.target.value)} required className="w-full px-3 py-2 border rounded-xl text-sm cursor-pointer" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Oferta (R$)</label>
                  <div className="relative">
                    <input type="text" value={oferta} onChange={(e) => setOferta(mascaraMoeda(e.target.value))} placeholder="R$ 0,00" className="w-full px-3 py-2 border rounded-xl text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--surface-muted)] p-3 rounded-xl border space-y-2">
              <label className="text-xs font-medium">Visitantes ({nomesVisitantes.length})</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={novoVisitante} 
                  onChange={(e) => setNovoVisitante(e.target.value)} 
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdicionarVisitante(); } }}
                  placeholder="Nome(s) (use vírgula para separar)" 
                  className="flex-1 px-3 py-1.5 border rounded-xl text-xs bg-white" 
                />
                <button type="button" onClick={handleAdicionarVisitante} className="btn-primary text-xs px-3 rounded-xl cursor-pointer">+</button>
              </div>
              <div className="flex flex-wrap gap-1">
                {nomesVisitantes.map((n, i) => (
                  <span key={i} className="text-[11px] bg-white border px-2 py-0.5 rounded-lg">{n} <button type="button" onClick={() => setNomesVisitantes(nomesVisitantes.filter((_, j) => j !== i))} className="cursor-pointer">×</button></span>
                ))}
              </div>
            </div>

            {membros.length > 0 && (
              <div className="space-y-2 sm:space-y-0"> {/* Remove space-y no mobile para que os itens individuais gerenciem o espaçamento */}
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chamada da Célula</label>
                <div className="sm:border sm:border-slate-100 sm:rounded-2xl sm:p-2 sm:bg-slate-50/30 sm:space-y-1"> {/* Reverte para o estilo de contêiner no desktop */}
                  {membros.map((m) => (
                    <div key={m.id} 
                      onClick={() => setPresencas((p) => ({ ...p, [m.id]: !p[m.id] }))} 
                      className="mb-1 bg-white border border-slate-100 rounded-xl p-3 shadow-sm
                                 flex items-center justify-between cursor-pointer transition active:scale-[0.98] select-none
                                 sm:mb-0 sm:bg-transparent sm:border-transparent sm:shadow-none sm:p-2 sm:hover:bg-white sm:hover:shadow-sm sm:hover:border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar pessoa={m} tamanho="w-8 h-8" />
                        <span className="text-sm font-bold text-slate-700">{m.nome}</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={!!presencas[m.id]} 
                        readOnly
                        className="w-5 h-5 rounded-md border-slate-300 text-[#055F6D] focus:ring-[#055F6D]/20 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium mb-1">Observações</label>
              <textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={2} className="w-full px-3 py-2 border rounded-xl text-sm" />
            </div>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2 shrink-0">
            <button type="button" onClick={onFechar} className="px-4 py-2 text-xs border border-slate-200 rounded-xl bg-white text-slate-600 font-semibold hover:bg-slate-100 transition cursor-pointer">Cancelar</button>
            <button type="submit" disabled={enviando} className="btn-primary text-xs font-semibold px-5 py-2 rounded-xl disabled:opacity-50 transition shadow-sm cursor-pointer">
              {enviando ? 'Salvando...' : botaoTexto}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
