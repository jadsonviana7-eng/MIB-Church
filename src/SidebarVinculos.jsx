import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, AvatarCelula } from './ui';

export default function SidebarVinculos({ pessoaId, pessoaData, matriculasEscolares }) {
  const [ministerios, setMinisterios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarMinisterios() {
      if (!pessoaId) return;
      setCarregando(true);
      
      // Busca na tabela de equipes quais escalas esta pessoa está vinculada
      const { data, error } = await supabase
        .from('equipes_escala')
        .select('tipo_escala')
        .eq('pessoa_id', pessoaId);
      
      if (!error && data) {
        setMinisterios(data);
      }
      setCarregando(false);
    }
    carregarMinisterios();
  }, [pessoaId]);

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-4 print:hidden">
      <Card className="p-0 overflow-hidden shadow-sm border-slate-200/60 bg-white">
        <CardHeader 
          titulo="Vínculos e Ministérios" 
          subtitulo="Conexões ativas na igreja"
        />
        <div className="p-5 space-y-6">
          {/* Célula */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Célula</label>
            <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
              <AvatarCelula celula={pessoaData?.celulas} tamanho="w-10 h-10" />
              <span className="font-bold text-slate-700 text-sm">{pessoaData?.celulas?.nome || 'Sem Célula'}</span>
            </div>
          </div>

          {/* Cargo e Atuação */}
          <div className="grid grid-cols-2 gap-4 border-y border-slate-50 py-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cargo</label>
              <p className="text-xs font-bold text-slate-600 mt-1">{pessoaData?.cargo || 'Membro'}</p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Atuação</label>
              <p className="text-xs font-bold text-slate-600 mt-1">{pessoaData?.atuacao || 'Geral'}</p>
            </div>
          </div>

          {/* Ministérios das Escalas */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ministérios Ativos</label>
            <div className="flex flex-wrap gap-2">
              {carregando ? (
                <div className="h-4 w-20 bg-slate-100 animate-pulse rounded" />
              ) : ministerios.length === 0 ? (
                <p className="text-[10px] text-slate-400 italic">Nenhum ministério vinculado nas escalas.</p>
              ) : (
                ministerios.map((m, i) => (
                  <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-[10px] font-black uppercase tracking-tight">
                    {m.tipo_escala}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Escola / Cursos */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escola / Cursos</label>
            {matriculasEscolares && matriculasEscolares.length > 0 ? (
              <div className="space-y-2">
                {matriculasEscolares.map((matricula) => (
                  <div key={matricula.id} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                    <span className="text-xl">🎓</span>
                    <div>
                      <span className="font-bold text-slate-700 text-sm">{matricula.turmas?.nome || 'Turma desconhecida'}</span>
                      <p className="text-[10px] text-slate-500">{matricula.turmas?.escolas?.nome || 'Escola desconhecida'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-slate-400 italic">Não matriculado em cursos.</p>
            )}
          </div>
        </div>
      </Card>
    </aside>
  );
}