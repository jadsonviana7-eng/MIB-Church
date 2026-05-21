import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { montarObservacoesComMetadados } from './reuniaoHelpers';

export default function ModalLancarReuniao({ celulas, pessoas, celulaInicial = '', onFechar, onSalvo }) {
  const [celulaId, setCelulaId] = useState(celulaInicial || '');
  const [dataReuniao, setDataReuniao] = useState(new Date().toISOString().split('T')[0]);
  const [oferta, setOferta] = useState(0);
  const [temaMinistrado, setTemaMinistrado] = useState('');
  const [obs, setObs] = useState('');
  const [presencas, setPresencas] = useState({});
  const [nomesVisitantes, setNomesVisitantes] = useState([]);
  const [novoVisitante, setNovoVisitante] = useState('');
  const [enviando, setEnviando] = useState(false);

  const membros = pessoas.filter((p) => String(p.celula_id || '') === String(celulaId));

  useEffect(() => {
    if (celulaId && membros.length > 0) {
      const inicia = {};
      membros.forEach((m) => { inicia[m.id] = true; });
      setPresencas(inicia);
    } else {
      setPresencas({});
    }
  }, [celulaId, pessoas]);

  async function handleSalvar(e) {
    e.preventDefault();
    if (!celulaId) {
      window.alert('Selecione a célula do encontro.');
      return;
    }
    setEnviando(true);
    try {
      const observacoesFinal = montarObservacoesComMetadados(obs, temaMinistrado, nomesVisitantes);
      const { data: relatorioCriado, error } = await supabase
        .from('relatorios_celula')
        .insert([{
          celula_id: celulaId,
          data_reuniao: dataReuniao,
          visitantes_presentes: nomesVisitantes.length,
          oferta: Number(oferta) || 0,
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

      if (onSalvo) await onSalvo();
      onFechar();
    } catch (err) {
      window.alert('Erro ao salvar reunião: ' + err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-[var(--border)] shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="card-header flex justify-between items-center">
          <h4 className="font-semibold text-[var(--text-heading)]">Lançar encontro da célula</h4>
          <button type="button" onClick={onFechar} className="text-[var(--text-muted)] font-bold">✕</button>
        </div>
        <form onSubmit={handleSalvar} className="p-5 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Célula</label>
            <select value={celulaId} onChange={(e) => setCelulaId(e.target.value)} required className="w-full px-3 py-2 border border-[var(--border)] rounded-xl text-sm bg-white">
              <option value="">Selecione a célula</option>
              {celulas.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Data</label>
              <input type="date" value={dataReuniao} onChange={(e) => setDataReuniao(e.target.value)} required className="w-full px-3 py-2 border rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Tema</label>
              <input type="text" value={temaMinistrado} onChange={(e) => setTemaMinistrado(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Oferta (R$)</label>
              <input type="number" step="0.01" min="0" value={oferta} onChange={(e) => setOferta(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
            </div>
          </div>
          <div className="bg-[var(--surface-muted)] p-3 rounded-xl border space-y-2">
            <label className="text-xs font-medium">Visitantes ({nomesVisitantes.length})</label>
            <div className="flex gap-2">
              <input type="text" value={novoVisitante} onChange={(e) => setNovoVisitante(e.target.value)} placeholder="Nome do visitante" className="flex-1 px-3 py-1.5 border rounded-xl text-xs bg-white" />
              <button type="button" onClick={() => { if (novoVisitante.trim()) { setNomesVisitantes([...nomesVisitantes, novoVisitante.trim()]); setNovoVisitante(''); } }} className="btn-primary text-xs px-3 rounded-xl">+</button>
            </div>
            <div className="flex flex-wrap gap-1">
              {nomesVisitantes.map((n, i) => (
                <span key={i} className="text-[11px] bg-white border px-2 py-0.5 rounded-lg">{n} <button type="button" onClick={() => setNomesVisitantes(nomesVisitantes.filter((_, j) => j !== i))}>×</button></span>
              ))}
            </div>
          </div>
          {membros.length > 0 && (
            <div className="border rounded-xl max-h-36 overflow-y-auto p-2">
              {membros.map((m) => (
                <div key={m.id} onClick={() => setPresencas((p) => ({ ...p, [m.id]: !p[m.id] }))} className="flex justify-between py-1.5 px-2 cursor-pointer hover:bg-[var(--surface-muted)] rounded-lg text-xs">
                  <span>{m.nome}</span>
                  <span className={presencas[m.id] ? 'text-emerald-700' : 'text-rose-600'}>{presencas[m.id] ? 'Presente' : 'Ausente'}</span>
                </div>
              ))}
            </div>
          )}
          <div>
            <label className="block text-xs font-medium mb-1">Observações</label>
            <textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={2} className="w-full px-3 py-2 border rounded-xl text-sm" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onFechar} className="px-4 py-2 text-xs border rounded-xl">Cancelar</button>
            <button type="submit" disabled={enviando} className="btn-primary text-xs font-semibold px-5 py-2 rounded-xl disabled:opacity-50">
              {enviando ? 'Gravando...' : '⛺ Concluir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
