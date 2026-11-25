import React from 'react';
import {
  Move,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  SlidersHorizontal,
  ImagePlus,
  Trash2,
  Minus,
  Plus,
} from 'lucide-react';
import { FONTES_CERTIFICADO } from './certificadoLayoutConfig';

export default function PainelAjusteLayoutCertificado({
  layout,
  elementoSelecionadoId,
  onSelecionarElemento,
  onAtualizarElemento,
  onRestaurarLayout,
  possuiPersonalizacao,
  onAdicionarImagemExtra,
  onRemoverImagemExtra,
}) {
  const elementos = Object.values(layout || {});
  const el = layout?.[elementoSelecionadoId] || elementos[0] || null;

  const inputCls =
    'w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#0b1329] text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30';
  const labelCls = 'block text-[9.5px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1';

  const mover = (dx, dy) => {
    if (!el) return;
    onAtualizarElemento(el.id, {
      x: Number(Math.max(0, Math.min(95, (Number(el.x) || 0) + dx)).toFixed(1)),
      y: Number(Math.max(0, Math.min(95, (Number(el.y) || 0) + dy)).toFixed(1)),
    });
  };

  return (
    <div className="mt-4 rounded-2xl bg-white dark:bg-[#17223b] border-2 border-blue-500/40 dark:border-blue-500/50 shadow-sm p-4 space-y-4 animate-in fade-in duration-200">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-[#24334f]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
            <SlidersHorizontal size={14} />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800 dark:text-slate-100">
              Ajuste Manual de Layout e Tipografia
            </h4>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400">
              Arraste os blocos direto na pré-visualização acima ou ajuste no milímetro abaixo.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onAdicionarImagemExtra && (
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold shadow-xs cursor-pointer transition">
              <ImagePlus size={13} />
              <span>Inserir Imagem (PNG/JPG)</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={onAdicionarImagemExtra}
                className="hidden"
              />
            </label>
          )}
          {possuiPersonalizacao && (
            <button
              type="button"
              onClick={onRestaurarLayout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/35 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[11px] font-bold cursor-pointer transition"
            >
              <RotateCcw size={12} />
              <span>Restaurar Layout Padrão</span>
            </button>
          )}
        </div>
      </div>

      {/* Seletor rápido de elementos */}
      <div className="flex flex-wrap gap-1.5">
        {elementos.map((item) => {
          const ativo = el?.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelecionarElemento(item.id)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition cursor-pointer ${ativo
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : item.hidden
                  ? 'bg-slate-100 dark:bg-[#0b1329] text-slate-400 border-dashed border-slate-300 dark:border-[#24334f] line-through'
                  : 'bg-slate-50 dark:bg-[#131d31] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#2b3954] hover:border-blue-400'
                }`}
            >
              <Move size={11} className={ativo ? 'text-white' : 'text-slate-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Controles do elemento selecionado */}
      {el && (
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200/80 dark:border-[#24334f] space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-wide">
              Editando: {el.label}
            </span>

            <div className="flex items-center gap-1.5">
              {/* Setas de ajuste fino (±0.4%) */}
              <div className="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-[#2b3954]">
                <button
                  type="button"
                  onClick={() => mover(-0.4, 0)}
                  className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-600 dark:text-slate-300 cursor-pointer"
                  title="Mover esquerda (-0.4%)"
                >
                  <ArrowLeft size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => mover(0, -0.4)}
                  className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-600 dark:text-slate-300 cursor-pointer"
                  title="Mover cima (-0.4%)"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => mover(0, 0.4)}
                  className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-600 dark:text-slate-300 cursor-pointer"
                  title="Mover baixo (+0.4%)"
                >
                  <ArrowDown size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => mover(0.4, 0)}
                  className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-600 dark:text-slate-300 cursor-pointer"
                  title="Mover direita (+0.4%)"
                >
                  <ArrowRight size={12} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onAtualizarElemento(el.id, { hidden: !el.hidden })}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer transition ${el.hidden
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                  : 'bg-white dark:bg-[#0b1329] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#2b3954] hover:border-slate-300'
                  }`}
                title={el.hidden ? 'Mostrar elemento' : 'Ocultar elemento'}
              >
                {el.hidden ? <EyeOff size={12} /> : <Eye size={12} />}
                <span>{el.hidden ? 'Oculto' : 'Visível'}</span>
              </button>

              {el.isExtraImage && onRemoverImagemExtra && (
                <button
                  type="button"
                  onClick={() => onRemoverImagemExtra(el.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/50 cursor-pointer transition"
                  title="Remover esta imagem do certificado"
                >
                  <Trash2 size={12} />
                  <span>Remover</span>
                </button>
              )}
            </div>
          </div>

          {/* Linha 1: Posição e Dimensão */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            <div>
              <label className={labelCls}>Posição X (%)</label>
              <input
                type="number"
                step="0.2"
                min="0"
                max="95"
                value={el.x ?? 0}
                onChange={(e) => onAtualizarElemento(el.id, { x: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Posição Y (%)</label>
              <input
                type="number"
                step="0.2"
                min="0"
                max="95"
                value={el.y ?? 0}
                onChange={(e) => onAtualizarElemento(el.id, { y: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Largura (%)</label>
              <input
                type="number"
                step="0.5"
                min="5"
                max="100"
                value={el.w ?? 30}
                onChange={(e) => onAtualizarElemento(el.id, { w: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
            {el.isImage ? (
              <div>
                <label className={labelCls}>Altura (%)</label>
                <input
                  type="number"
                  step="0.5"
                  min="2"
                  max="50"
                  value={el.h ?? 8}
                  onChange={(e) => onAtualizarElemento(el.id, { h: Number(e.target.value) })}
                  className={inputCls}
                />
              </div>
            ) : (
              <div>
                <label className={labelCls}>Tamanho (pt)</label>
                <input
                  type="number"
                  step="0.5"
                  min="6"
                  max="120"
                  value={el.fontSize ?? 12}
                  onChange={(e) => onAtualizarElemento(el.id, { fontSize: Number(e.target.value) })}
                  className={inputCls}
                />
              </div>
            )}
          </div>

          {/* Linha 2: Tipografia (somente para blocos de texto) */}
          {!el.isImage && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="col-span-2">
                  <label className={labelCls}>Fonte</label>
                  <select
                    value={el.font || 'inter'}
                    onChange={(e) => onAtualizarElemento(el.id, { font: e.target.value })}
                    className={inputCls}
                  >
                    {FONTES_CERTIFICADO.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Tracking (Caracteres)</label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        onAtualizarElemento(el.id, {
                          tracking: Math.max(-50, (Number(el.tracking) || 0) - 10),
                        })
                      }
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#0b1329] hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-600 dark:text-slate-300 cursor-pointer shrink-0"
                      title="Diminuir espaçamento (-10)"
                    >
                      <Minus size={12} />
                    </button>
                    <input
                      type="number"
                      step="10"
                      min="-50"
                      max="500"
                      value={el.tracking ?? 0}
                      onChange={(e) => onAtualizarElemento(el.id, { tracking: Number(e.target.value) })}
                      className={`${inputCls} text-center px-1`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onAtualizarElemento(el.id, {
                          tracking: Math.min(500, (Number(el.tracking) || 0) + 10),
                        })
                      }
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#0b1329] hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-600 dark:text-slate-300 cursor-pointer shrink-0"
                      title="Aumentar espaçamento (+10)"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="400"
                    step="5"
                    value={el.tracking ?? 0}
                    onChange={(e) => onAtualizarElemento(el.id, { tracking: Number(e.target.value) })}
                    className="w-full h-1.5 mt-1.5 accent-blue-600 cursor-pointer"
                  />
                </div>
                <div>
                  <label className={labelCls}>Cor</label>
                  <input
                    type="color"
                    value={el.color || '#1e293b'}
                    onChange={(e) => onAtualizarElemento(el.id, { color: e.target.value })}
                    className="w-full h-[31px] rounded-lg border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#0b1329] p-0.5 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-start gap-2.5 pt-1">
                {/* Alinhamento */}
                <div className="inline-flex items-center p-0.5 rounded-lg bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-[#2b3954]">
                  {[
                    { id: 'left', icon: AlignLeft, title: 'Alinhar à esquerda' },
                    { id: 'center', icon: AlignCenter, title: 'Centralizar' },
                    { id: 'right', icon: AlignRight, title: 'Alinhar à direita' },
                    { id: 'justify', icon: AlignJustify, title: 'Justificar texto' },
                  ].map((al) => {
                    const Icone = al.icon;
                    const ativo = (el.align || 'center') === al.id;
                    return (
                      <button
                        key={al.id}
                        type="button"
                        onClick={() => onAtualizarElemento(el.id, { align: al.id })}
                        title={al.title}
                        className={`p-1.5 rounded-md cursor-pointer transition ${ativo
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1c2b4a]'
                          }`}
                      >
                        <Icone size={13} />
                      </button>
                    );
                  })}
                </div>

                {/* Formatação: Negrito, Maiúsculas, Versalete */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onAtualizarElemento(el.id, { bold: !el.bold })}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer transition ${el.bold
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-[#0b1329] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#2b3954]'
                      }`}
                  >
                    Negrito
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onAtualizarElemento(el.id, {
                        uppercase: !el.uppercase,
                        versalete: !el.uppercase ? false : el.versalete,
                      })
                    }
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer transition ${el.uppercase && !el.versalete
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-[#0b1329] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#2b3954]'
                      }`}
                  >
                    MAIÚSCULAS
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onAtualizarElemento(el.id, {
                        versalete: !el.versalete,
                        uppercase: !el.versalete ? false : el.uppercase,
                      })
                    }
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer transition ${el.versalete
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-[#0b1329] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#2b3954]'
                      }`}
                  >
                    Versalete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
