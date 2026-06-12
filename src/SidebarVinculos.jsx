import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, AvatarCelula } from './ui';

export default function SidebarVinculos({ pessoaId, pessoaData, matriculasEscolares, listaPessoas = [], onAbrirMembro }) {
  const [ministerios, setMinisterios] = useState([]);
  const [inscricoes, setInscricoes] = useState([]);
  const [docencias, setDocencias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Função para normalizar strings (remover acentos, espaços e ignorar case)
  const normalizar = useCallback((str) => 
    String(str || '')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único espaço
      .trim(), []);

  useEffect(() => {
    async function carregarVinculos() {
      if (!pessoaId || !pessoaData) return;
      setCarregando(true);
      
      // Reseta estados para evitar que dados de um membro apareçam na ficha de outro
      setMinisterios([]);
      setDocencias([]);
      setInscricoes([]);
      
      try {
        // 1. Busca escalas ministeriais
        const { data: dataEscalas, error: errEscalas } = await supabase
          .from('equipes_escala')
          .select('tipo_escala')
          .eq('pessoa_id', pessoaId);
        
        if (!errEscalas && dataEscalas) setMinisterios(dataEscalas);

        // 2. Busca docências (vínculo como professor no módulo Escolas)
        const { data: profData } = await supabase
          .from('professores')
          .select('id')
          .eq('pessoa_id', pessoaId)
          .maybeSingle();

        if (profData) {
          const { data: dataDocencias } = await supabase
            .from('turmas_disciplinas')
            .select(`
              id,
              disciplinas ( nome ),
              turmas ( nome, escolas ( nome ) )
            `)
            .eq('professor_id', profData.id);
          if (dataDocencias) setDocencias(dataDocencias);
        }

        // 3. Busca inscrições em eventos (cruzamento por nome ou email dentro do JSONB)
        const { data: dataInscricoes, error: errIns } = await supabase
          .from('agenda_inscricoes')
          .select('*, agenda_eventos(titulo, data_inicio)');

        if (errIns) console.error('[SidebarVinculos] Erro ao buscar inscrições:', errIns);

        if (dataInscricoes) {
          const emailMembro = normalizar(pessoaData?.email);
          const nomeMembro  = normalizar(pessoaData?.nome);

          const extrairCampo = (dados, termosExatos, termosParciais, excluir = []) => {
            if (!dados) return '';
            const entries = Object.entries(dados);
            const exato = entries.find(([k]) => termosExatos.includes(normalizar(k)));
            if (exato) return String(exato[1] || '');
            const parcial = entries.find(([k]) => {
              const key = normalizar(k);
              return termosParciais.some(t => key.includes(t)) && !excluir.some(ex => key.includes(ex));
            });
            return String(parcial?.[1] || '');
          };

          const filtradas = dataInscricoes.filter(ins => {
            const dados = ins.dados_inscricao || {};
            const emailIns = normalizar(extrairCampo(dados, ['email', 'e-mail', 'e_mail'], ['email', 'mail'], []));
            const nomeIns = normalizar(extrairCampo(dados, ['nome', 'nome completo', 'participante'], ['nome', 'completo', 'participante'], ['celula', 'lider', 'pai', 'mae', 'sobrenome']));

            const bateEmail = !!(emailMembro && emailIns && emailIns === emailMembro);

            // Comparação de nome por palavras significativas (ignora preposições)
            const palavrasIgnoradas = new Set(['da', 'de', 'do', 'dos', 'das', 'e']);
            const getPalavras = (str) => str.split(' ').filter(p => p.length > 1 && !palavrasIgnoradas.has(p));
            const pMembro = getPalavras(nomeMembro || '');
            const pIns    = getPalavras(nomeIns || '');

            // Regras: primeiro nome DEVE coincidir + ao menos 70% das palavras significativas batem
            const primeiroNomeBate = pMembro[0] && pIns[0] && pMembro[0] === pIns[0];
            const coincidentes = pMembro.filter(p => pIns.includes(p));
            const percentual = pMembro.length > 0 ? coincidentes.length / pMembro.length : 0;
            const bateNome = !!(
              nomeMembro && nomeIns &&
              pMembro.length >= 2 && pIns.length >= 2 &&
              primeiroNomeBate &&
              percentual >= 0.7
            );

            return bateEmail || bateNome;
          });

          setInscricoes(filtradas);
        }
      } catch (err) {
        console.error("Erro ao carregar vínculos da sidebar:", err);
      } finally {
        setCarregando(false);
      }
    }

    carregarVinculos();
  }, [pessoaId, pessoaData, normalizar]);

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-4 print:hidden">
      <Card className="p-0 overflow-hidden shadow-sm border-slate-200/60 bg-white">
        <CardHeader titulo="Vínculos e Ministérios" subtitulo="Conexões ativas na igreja" />
        <div className="p-5 space-y-6">
          {/* Célula */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Célula</label>
            <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
              <AvatarCelula celula={pessoaData?.celulas} tamanho="w-10 h-10" />
              <span className="font-bold text-slate-700 text-sm">{pessoaData?.celulas?.nome || 'Sem Célula'}</span>
            </div>
          </div>

          {/* Atuação como Professor */}
          {docencias.length > 0 && (
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Atuação como Professor</label>
              <div className="space-y-2">
                {docencias.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                    <span className="text-xl">👨‍🏫</span>
                    <div>
                      <span className="font-bold text-slate-700 text-xs block leading-tight">{d.disciplinas?.nome}</span>
                      <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">
                        {d.turmas?.nome} · {d.turmas?.escolas?.nome}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ministérios das Escalas */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ministérios (Escalas)</label>
            <div className="flex flex-wrap gap-2">
              {carregando ? (
                <div className="h-4 w-20 bg-slate-100 animate-pulse rounded" />
              ) : ministerios.length === 0 ? (
                <p className="text-[10px] text-slate-400 italic">Nenhum vínculo em escalas.</p>
              ) : (
                ministerios.map((m, i) => (
                  <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-[10px] font-black uppercase tracking-tight">
                    {m.tipo_escala}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Escola / Cursos (Como Aluno) */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Escola / Cursos</label>
            {matriculasEscolares && matriculasEscolares.length > 0 ? (
              <div className="space-y-2">
                {matriculasEscolares.map((matricula) => (
                  <div key={matricula.id} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                    <span className="text-xl">🎓</span>
                    <div>
                      <span className="font-bold text-slate-700 text-xs block leading-tight">{matricula.turmas?.nome}</span>
                      <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">{matricula.turmas?.escolas?.nome}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-slate-400 italic">Não matriculado como aluno.</p>
            )}
          </div>

          {/* Eventos / Inscrições */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Eventos e Inscrições</label>
            {inscricoes.length > 0 ? (
              <div className="space-y-2">
                {inscricoes.map((ins) => (
                  <div key={ins.id} className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🎟️</span>
                      <div>
                        <span className="font-bold text-slate-700 text-xs block leading-tight">{ins.agenda_eventos?.titulo}</span>
                        <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">
                          {new Date(ins.agenda_eventos?.data_inicio).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md ${ins.status_pagamento === 'pago' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {ins.status_pagamento || 'pendente'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-slate-400 italic">Nenhuma inscrição identificada.</p>
            )}
          </div>
        </div>
      </Card>
    </aside>
  );
}