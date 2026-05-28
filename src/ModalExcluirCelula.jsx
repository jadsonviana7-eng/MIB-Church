import { useState } from 'react';
import { supabase } from './supabaseClient';

const MOTIVOS_EXCLUSAO = [
  { value: 'encerrada', label: 'Célula encerrada pelo líder' },
  { value: 'fusao', label: 'Fusão com outra célula' },
  { value: 'falta_membros', label: 'Falta de membros / desativação' },
  { value: 'transferencia', label: 'Transferência para outra região' },
  { value: 'lider_ausente', label: 'Saída do líder sem substituto' },
  { value: 'dados_duplicados', label: 'Registro duplicado no sistema' },
  { value: 'outro', label: 'Outro motivo' },
];

export default function ModalExcluirCelula({ celula, onFechar, onExcluida }) {
  const [motivo, setMotivo] = useState('');
  const [motivoCustom, setMotivoCustom] = useState('');
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState('');

  const motivoFinal = motivo === 'outro' ? motivoCustom.trim() : motivo;
  const podeContinuar = motivoFinal.length > 0;

  async function handleExcluir(e) {
    e.preventDefault();
    if (!podeContinuar) return;

    setExcluindo(true);
    setErro('');

    try {
      // Desvincular pessoas desta célula antes de excluir
      const { error: erroPessoas } = await supabase
        .from('pessoas')
        .update({ celula_id: null })
        .eq('celula_id', celula.id);

      if (erroPessoas) throw erroPessoas;

      // Excluir a célula
      const { error } = await supabase
        .from('celulas')
        .delete()
        .eq('id', celula.id);

      if (error) throw error;

      if (onExcluida) await onExcluida();
      onFechar();
    } catch (err) {
      setErro(`Erro ao excluir: ${err.message}`);
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-100 bg-rose-50/60 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg shrink-0">
            🗑️
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 text-base">Excluir Célula</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Esta ação é <span className="text-rose-600 font-semibold">irreversível</span>. Os membros vinculados serão desassociados.
            </p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-rose-100 transition text-sm font-bold shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Info da célula */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#055F6D]/10 text-[#055F6D] flex items-center justify-center text-base">
              ⛺
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{celula.nome}</p>
              <p className="text-xs text-slate-400">
                {celula.dia_semana || 'Sem dia definido'}
                {celula.horario ? ` · ${celula.horario}` : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleExcluir} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Motivo da exclusão *
            </label>
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-400"
            >
              <option value="">-- Selecione o motivo --</option>
              {MOTIVOS_EXCLUSAO.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {motivo === 'outro' && (
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Descreva o motivo *
              </label>
              <textarea
                value={motivoCustom}
                onChange={(e) => setMotivoCustom(e.target.value)}
                rows={2}
                required
                placeholder="Informe o motivo específico..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-400 resize-none"
              />
            </div>
          )}

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-800 font-medium">
              ⚠️ Ao confirmar, todos os membros desta célula serão desvinculados e os relatórios de reunião serão mantidos no histórico geral.
            </p>
          </div>

          {erro && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold">
              {erro}
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={excluindo || !podeContinuar}
              className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
            >
              {excluindo ? 'Excluindo...' : '🗑️ Confirmar Exclusão'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
