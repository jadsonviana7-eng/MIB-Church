import { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import { Avatar, AvatarCelula } from './ui';
import { montarObservacoesComMetadados, extrairMetadadosReuniao } from './reuniaoHelpers';
import { mascaraMoeda, desmascararMoeda } from './mascaras';

export default function ModalLancarReuniao({ celulas, pessoas, celulaInicial = '', onFechar, onSalvo, reuniaoParaEditar, visitantesCadastrados: visitantesProp = null }) {
  const [celulaId, setCelulaId] = useState(celulaInicial || reuniaoParaEditar?.celula_id || '');
  const [dataReuniao, setDataReuniao] = useState(reuniaoParaEditar?.data_reuniao || new Date().toLocaleDateString('en-CA'));
  const [oferta, setOferta] = useState(reuniaoParaEditar?.oferta ? mascaraMoeda(reuniaoParaEditar.oferta * 100) : '');
  const [temaMinistrado, setTemaMinistrado] = useState('');
  const [obs, setObs] = useState('');
  const [presencas, setPresencas] = useState({});
  const [nomesVisitantes, setNomesVisitantes] = useState([]);
  const [novoVisitante, setNovoVisitante] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [visitantesCadastrados, setVisitantesCadastrados] = useState([]);
  const [visitantesCadastradosSelecionados, setVisitantesCadastradosSelecionados] = useState([]);

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

  // Carrega visitantes cadastrados da célula selecionada
  useEffect(() => {
    if (visitantesProp) {
      setVisitantesCadastrados(visitantesProp);
      return;
    }
    if (!celulaId) { setVisitantesCadastrados([]); return; }
    supabase
      .from('visitantes')
      .select('id, nome, telefone, endereco')
      .eq('celula_id', celulaId)
      .order('nome')
      .then(({ data }) => setVisitantesCadastrados(data ?? []));
  }, [celulaId, visitantesProp]);

  // Sincroniza seleção de visitantes cadastrados ao editar reunião existente
  useEffect(() => {
    if (!reuniaoParaEditar || !visitantesCadastrados.length) {
      if (!reuniaoParaEditar) setVisitantesCadastradosSelecionados([]);
      return;
    }
    const { nomesVisitantes: visitantesSalvos } = extrairMetadadosReuniao(reuniaoParaEditar.observacoes);
    const ids = visitantesCadastrados
      .filter((v) => visitantesSalvos.some((n) => n.toLowerCase() === v.nome.toLowerCase()))
      .map((v) => v.id);
    setVisitantesCadastradosSelecionados(ids);
  }, [visitantesCadastrados, reuniaoParaEditar]);

  function toggleVisitanteCadastrado(visitante) {
    const jaSelecionado = visitantesCadastradosSelecionados.includes(visitante.id);
    if (jaSelecionado) {
      setVisitantesCadastradosSelecionados((prev) => prev.filter((id) => id !== visitante.id));
      setNomesVisitantes((prev) => prev.filter((n) => n.toLowerCase() !== visitante.nome.toLowerCase()));
    } else {
      setVisitantesCadastradosSelecionados((prev) => [...prev, visitante.id]);
      if (!nomesVisitantes.some((n) => n.toLowerCase() === visitante.nome.toLowerCase())) {
        setNomesVisitantes((prev) => [...prev, visitante.nome]);
      }
    }
  }

  function removerNomeVisitante(index) {
    const nome = nomesVisitantes[index];
    setNomesVisitantes((prev) => prev.filter((_, j) => j !== index));
    const visitante = visitantesCadastrados.find((v) => v.nome.toLowerCase() === nome.toLowerCase());
    if (visitante) {
      setVisitantesCadastradosSelecionados((prev) => prev.filter((id) => id !== visitante.id));
    }
  }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm sm:p-4">
      <div className="bg-white dark:bg-[#17223b] border border-slate-100 dark:border-[#2b3954] shadow-2xl w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-xl sm:rounded-[32px] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-slate-100 dark:border-[#2b3954] bg-slate-50 dark:bg-[#131d31]">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base sm:text-lg">{tituloModal}</h4>
          <button type="button" onClick={onFechar} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-[#1c2b4a] border border-slate-200 dark:border-[#2b3954] text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition cursor-pointer">✕</button>
        </div>
        <form onSubmit={handleSalvar} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-5 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#131d31] p-3 rounded-2xl border border-slate-200 dark:border-[#24334f] shadow-sm mb-2">
              <AvatarCelula celula={celulaAtiva} tamanho="w-12 h-12" />
              <div className="min-w-0">
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Célula Selecionada</label>
                <h3 className="text-sm sm:text-base font-black text-[#055F6D] dark:text-cyan-400 truncate leading-tight">{celulaAtiva?.nome || 'Célula não identificada'}</h3>
              </div>
            </div>

            <div className="space-y-3">
              {/* Tema - No topo no mobile para ganhar espaço */}
              <div className="sm:hidden">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tema / Assunto da Reunião</label>
                <input
                  type="text"
                  value={temaMinistrado}
                  onChange={(e) => setTemaMinistrado(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-[#2b3954] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 transition"
                  placeholder="O que foi ensinado?"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="hidden sm:block">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tema</label>
                  <input
                    type="text"
                    value={temaMinistrado}
                    onChange={(e) => setTemaMinistrado(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-[#2b3954] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Data</label>
                  <input
                    type="date"
                    value={dataReuniao}
                    onChange={(e) => setDataReuniao(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-[#2b3954] text-slate-800 dark:text-slate-100 rounded-xl text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 transition dark:[color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Oferta (R$)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={oferta}
                      onChange={(e) => setOferta(mascaraMoeda(e.target.value))}
                      placeholder="R$ 0,00"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-[#2b3954] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-[#131d31] p-3.5 rounded-2xl border border-slate-200 dark:border-[#24334f] space-y-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Visitantes ({nomesVisitantes.length})</label>

              {visitantesCadastrados.length > 0 && (
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Cadastrados na célula</span>
                  <div className="max-h-36 overflow-y-auto space-y-1 border border-slate-200 dark:border-[#24334f] rounded-xl p-1.5 bg-white dark:bg-[#0b1329]">
                    {visitantesCadastrados.map((v) => {
                      const selecionado = visitantesCadastradosSelecionados.includes(v.id);
                      return (
                        <div
                          key={v.id}
                          onClick={() => toggleVisitanteCadastrado(v)}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition select-none ${
                            selecionado
                              ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60'
                              : 'hover:bg-slate-50 dark:hover:bg-[#1c2b4a]/60 border border-transparent'
                          }`}
                        >
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block truncate">{v.nome}</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={selecionado}
                            readOnly
                            className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-[#17223b] text-amber-500 focus:ring-amber-500/20 cursor-pointer shrink-0 ml-2"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Outros visitantes (nome avulso)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={novoVisitante}
                    onChange={(e) => setNovoVisitante(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdicionarVisitante(); } }}
                    placeholder="Nome(s) (use vírgula para separar)"
                    className="flex-1 px-3 py-1.5 border border-slate-200 dark:border-[#2b3954] rounded-xl text-xs bg-white dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={handleAdicionarVisitante}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm shadow-blue-500/20 border border-blue-400/30 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {nomesVisitantes.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {nomesVisitantes.map((n, i) => (
                    <span key={i} className="text-[11px] font-medium bg-white dark:bg-[#1c2b4a] border border-slate-200 dark:border-[#2b3954] text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs">
                      <span>{n}</span>
                      <button type="button" onClick={() => removerNomeVisitante(i)} className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 font-bold cursor-pointer">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {membros.length > 0 && (
              <div className="space-y-2 sm:space-y-0">
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Chamada da Célula</label>
                <div className="sm:border sm:border-slate-200 sm:dark:border-[#24334f] sm:rounded-2xl sm:p-2 sm:bg-slate-50/50 sm:dark:bg-[#131d31] sm:space-y-1">
                  {membros.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setPresencas((p) => ({ ...p, [m.id]: !p[m.id] }))}
                      className="mb-1 bg-white dark:bg-[#131d31] border border-slate-200 dark:border-[#24334f] rounded-xl p-3 shadow-2xs
                                 flex items-center justify-between cursor-pointer transition active:scale-[0.98] select-none
                                 sm:mb-0 sm:bg-transparent sm:dark:bg-transparent sm:border-transparent sm:dark:border-transparent sm:shadow-none sm:p-2 sm:hover:bg-white sm:dark:hover:bg-[#1c2b4a] sm:hover:shadow-sm sm:hover:border-slate-200 sm:dark:hover:border-[#2b3954]"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar pessoa={m} tamanho="w-8 h-8" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{m.nome}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={!!presencas[m.id]}
                        readOnly
                        className="w-5 h-5 rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0b1329] text-[#055F6D] dark:text-cyan-500 focus:ring-cyan-500/20 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Observações</label>
              <textarea
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0b1329] border border-slate-200 dark:border-[#2b3954] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 transition"
                placeholder="Anotações gerais do encontro..."
              />
            </div>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 dark:border-[#2b3954] bg-slate-50/60 dark:bg-[#131d31] flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onFechar}
              className="px-4 py-2 text-xs border border-slate-200 dark:border-[#2b3954] rounded-xl bg-white dark:bg-[#1c2b4a] text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-[#24334f] transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="px-5 py-2 text-xs font-bold rounded-xl disabled:opacity-50 transition shadow-sm cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20 border border-emerald-400/30"
            >
              {enviando ? 'Salvando...' : botaoTexto}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
