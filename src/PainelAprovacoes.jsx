import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import { Avatar } from './ui';

const ordenarPorCreatedAtDesc = (a, b) => {
  const tA = a?.created_at ? Date.parse(a.created_at) : NaN;
  const tB = b?.created_at ? Date.parse(b.created_at) : NaN;
  const validA = Number.isFinite(tA);
  const validB = Number.isFinite(tB);
  if (!validA && !validB) return 0;
  if (!validA) return 1;
  if (!validB) return -1;
  return tB - tA;
};

export default function PainelAprovacoes({ pessoas = null, onVerDetalhes, onAprovado }) {
  const usaDadosLocais = Array.isArray(pessoas);
  const [pendentesRemoto, setPendentesRemoto] = useState([]);
  const [recentesRemoto, setRecentesRemoto] = useState([]);
  const [carregandoRemoto, setCarregandoRemoto] = useState(!usaDadosLocais);

  useEffect(() => {
    if (usaDadosLocais) {
      setCarregandoRemoto(false);
      return;
    }
    buscarPendentes();
  }, [usaDadosLocais]);

  async function buscarPendentes() {
    setCarregandoRemoto(true);
    try {
      const { data, error } = await supabase
        .from('pessoas')
        .select('id, nome, foto_url, cargo, created_at')
        .eq('status', 'pendente')
        .order('created_at', { ascending: false, nullsFirst: false });

      if (error) {
        console.error('Erro ao buscar pendentes:', error);
        setPendentesRemoto([]);
      } else {
        setPendentesRemoto(data || []);
      }

      // Sem pendentes: mostra os 8 cadastros mais recentes já aprovados
      if (!data || data.length === 0) {
        const { data: recentData, error: recentError } = await supabase
          .from('pessoas')
          .select('id, nome, foto_url, cargo, created_at')
          .eq('status', 'ativo')
          .order('created_at', { ascending: false, nullsFirst: false })
          .limit(8);
        if (!recentError) setRecentesRemoto(recentData || []);
      } else {
        setRecentesRemoto([]);
      }
    } catch (err) {
      console.error('Erro ao buscar aprovações:', err);
    } finally {
      setCarregandoRemoto(false);
    }
  }

  const { pendentesLocais, recentesLocais } = useMemo(() => {
    if (!usaDadosLocais) {
      return { pendentesLocais: [], recentesLocais: [] };
    }
    const listaPendentes = pessoas
      .filter((p) => (p.status || '').toLowerCase() === 'pendente')
      .sort(ordenarPorCreatedAtDesc);

    if (listaPendentes.length > 0) {
      return { pendentesLocais: listaPendentes, recentesLocais: [] };
    }

    const listaRecentes = pessoas
      .filter((p) => (p.status || '').toLowerCase() === 'ativo')
      .sort(ordenarPorCreatedAtDesc)
      .slice(0, 8);

    return { pendentesLocais: [], recentesLocais: listaRecentes };
  }, [usaDadosLocais, pessoas]);

  const pendentes = usaDadosLocais ? pendentesLocais : pendentesRemoto;
  const recentes = usaDadosLocais ? recentesLocais : recentesRemoto;
  const carregando = usaDadosLocais ? false : carregandoRemoto;

  function handleClicar(pessoaId) {
    if (onVerDetalhes) onVerDetalhes(pessoaId);
  }

  if (carregando) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-pulse">
        <div className="h-3 bg-slate-100 rounded w-2/3 mb-3" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-50 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Cabeçalho */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-slate-50 dark:border-slate-800/80">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Cadastros pendentes</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {pendentes.length > 0
              ? 'Clique para revisar e aprovar'
              : 'Nenhuma pendência • últimos aprovados'}
          </p>
        </div>
        {pendentes.length > 0 && (
          <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full">
            {pendentes.length}
          </span>
        )}
      </div>

      {/* Lista */}
      <div className="px-3 pb-4 space-y-2">
        {pendentes.length > 0 ? (
          pendentes.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleClicar(p.id)}
              className="w-full text-left flex items-center gap-3 p-3 rounded-xl border border-amber-100 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-200 hover:shadow-sm transition-all group"
            >
              <Avatar pessoa={p} tamanho="w-9 h-9" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{p.nome}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {p.cargo || 'Cargo não informado'}
                </p>
              </div>
              <svg
                className="w-3.5 h-3.5 text-amber-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))
        ) : recentes.length === 0 ? (
          <p className="text-center text-[10px] text-slate-400 italic py-8">
            Nenhum cadastro recente.
          </p>
        ) : (
          recentes.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleClicar(p.id)}
              className="w-full text-left flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-blue-100 dark:hover:border-blue-900/40 hover:bg-blue-50/30 dark:hover:bg-slate-800/60 hover:shadow-sm transition-all group cursor-pointer"
            >
              <Avatar pessoa={p} tamanho="w-9 h-9" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{p.nome}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {p.cargo || ''}
                </p>
              </div>
              <svg
                className="w-3.5 h-3.5 text-slate-300 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
