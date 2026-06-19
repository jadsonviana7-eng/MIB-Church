import { useEffect, useState, useMemo } from 'react';
import { Plus, Trash2, Users, Search, Shield, ShieldCheck, Mail, Phone, X, Pencil } from 'lucide-react';
import { ministeriosService } from './services/ministeriosService';
import { MinistryIcon } from '../ui';
import MembroHistoricoModal from './components/MembroHistoricoModal';
import { supabase } from '../supabaseClient';
import { escalasService } from './services/escalasService';

export default function EquipesMinisterial() {
  const [ministerios, setMinisterios] = useState([]);
  const [ministerioSelecionado, setMinisterioSelecionado] = useState(null);
  const [membros, setMembros] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [funcoesMinisterio, setFuncoesMinisterio] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [buscaPessoa, setBuscaPessoa] = useState('');
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);
  const [funcaoSelecionada, setFuncaoSelecionada] = useState('');
  const [lider, setLider] = useState(false);
  const [editingMembro, setEditingMembro] = useState(null);
  const [funcoesSelecionadas, setFuncoesSelecionadas] = useState([]);
  const [customFuncaoInput, setCustomFuncaoInput] = useState('');
  const [modalHistoricoAberto, setModalHistoricoAberto] = useState(false);
  const [membroSelecionadoHistorico, setMembroSelecionadoHistorico] = useState(null);

  // States para Disponibilidade e Bloqueios
  const [dispDomingo, setDispDomingo] = useState(true);
  const [dispSegunda, setDispSegunda] = useState(true);
  const [dispTerca, setDispTerca] = useState(true);
  const [dispQuarta, setDispQuarta] = useState(true);
  const [dispQuinta, setDispQuinta] = useState(true);
  const [dispSexta, setDispSexta] = useState(true);
  const [dispSabado, setDispSabado] = useState(true);
  
  const [bloqueiosMembro, setBloqueiosMembro] = useState([]);
  const [blqInicio, setBlqInicio] = useState('');
  const [blqFim, setBlqFim] = useState('');
  const [blqJustificativa, setBlqJustificativa] = useState('');

  const formatarDataCurta = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      const YYYY = date.getUTCFullYear();
      const MM = String(date.getUTCMonth() + 1).padStart(2, '0');
      const DD = String(date.getUTCDate()).padStart(2, '0');
      return `${DD}/${MM}/${YYYY}`;
    } catch (e) {
      return '';
    }
  };

  const carregarDisponibilidadeEBloqueios = async (pessoaId) => {
    try {
      const { data, error } = await supabase
        .from('disponibilidade_ministerial')
        .select('*')
        .eq('pessoa_id', pessoaId)
        .maybeSingle();

      if (!error && data) {
        setDispDomingo(data.domingo ?? true);
        setDispSegunda(data.segunda ?? true);
        setDispTerca(data.terca ?? true);
        setDispQuarta(data.quarta ?? true);
        setDispQuinta(data.quinta ?? true);
        setDispSexta(data.sexta ?? true);
        setDispSabado(data.sabado ?? true);
      } else {
        setDispDomingo(true);
        setDispSegunda(true);
        setDispTerca(true);
        setDispQuarta(true);
        setDispQuinta(true);
        setDispSexta(true);
        setDispSabado(true);
      }

      const blq = await escalasService.obterBloqueiosMembro(pessoaId);
      setBloqueiosMembro(blq || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (pessoaSelecionada?.id) {
      carregarDisponibilidadeEBloqueios(pessoaSelecionada.id);
    } else {
      setDispDomingo(true);
      setDispSegunda(true);
      setDispTerca(true);
      setDispQuarta(true);
      setDispQuinta(true);
      setDispSexta(true);
      setDispSabado(true);
      setBloqueiosMembro([]);
    }
  }, [pessoaSelecionada]);

  const handleAdicionarBloqueioLocal = () => {
    if (!blqInicio || !blqFim) {
      alert('Selecione as datas de início e fim do bloqueio.');
      return;
    }
    if (new Date(blqFim) < new Date(blqInicio)) {
      alert('A data de término do bloqueio não pode ser anterior à data de início.');
      return;
    }
    const novoBlq = {
      id: Date.now(), // ID temporário
      data_inicio: new Date(blqInicio + 'T00:00:00Z').toISOString(),
      data_fim: new Date(blqFim + 'T23:59:59Z').toISOString(),
      justificativa: blqJustificativa.trim() || 'Férias'
    };
    setBloqueiosMembro(prev => [...prev, novoBlq]);
    setBlqInicio('');
    setBlqFim('');
    setBlqJustificativa('');
  };

  const handleRemoverBloqueioLocal = (id) => {
    setBloqueiosMembro(prev => prev.filter(b => b.id !== id));
  };

  const abrirHistoricoMembro = (membro) => {
    setMembroSelecionadoHistorico(membro.pessoas);
    setModalHistoricoAberto(true);
  };

  useEffect(() => {
    carregarMinisterios();
    carregarPessoas();
  }, []);

  async function carregarMinisterios() {
    try {
      const data = await ministeriosService.listarMinisterios();
      setMinisterios(data || []);
      if (data && data.length > 0) {
        selecionarMinisterio(data[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar ministérios:', error);
    }
  }

  async function carregarPessoas() {
    try {
      const data = await ministeriosService.listarPessoas();
      setPessoas(data || []);
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    }
  }

  async function selecionarMinisterio(ministerio) {
    setMinisterioSelecionado(ministerio);
    try {
      const dataMembros = await ministeriosService.listarMembros(ministerio.id);
      setMembros(dataMembros || []);
      
      const dataFuncoes = await ministeriosService.listarFuncoes(ministerio.id);
      setFuncoesMinisterio(dataFuncoes || []);
    } catch (error) {
      console.error('Erro ao selecionar ministério:', error);
    }
  }

  async function adicionarMembro() {
    if (!pessoaSelecionada) {
      alert('Selecione uma pessoa');
      return;
    }

    try {
      const funcaoFinal = funcoesSelecionadas.filter(Boolean).join(', ');
      
      // 1. Salvar o vínculo do membro no ministério
      if (editingMembro) {
        await ministeriosService.atualizarMembro(editingMembro.id, {
          pessoa_id: pessoaSelecionada.id,
          ministerio_id: ministerioSelecionado.id,
          funcao: funcaoFinal || null,
          lider: lider
        });
      } else {
        await ministeriosService.adicionarMembro({
          ministerio_id: ministerioSelecionado.id,
          pessoa_id: pessoaSelecionada.id,
          funcao: funcaoFinal || null,
          lider: lider,
          ativo: true
        });
      }

      // 2. Salvar Disponibilidade
      const { error: errDisp } = await supabase
        .from('disponibilidade_ministerial')
        .upsert({
          pessoa_id: pessoaSelecionada.id,
          domingo: dispDomingo,
          segunda: dispSegunda,
          terca: dispTerca,
          quarta: dispQuarta,
          quinta: dispQuinta,
          sexta: dispSexta,
          sabado: dispSabado
        }, { onConflict: 'pessoa_id' });

      if (errDisp) throw errDisp;

      // 3. Salvar Bloqueios
      await escalasService.salvarBloqueiosMembro(pessoaSelecionada.id, bloqueiosMembro);

      fecharModal();
      selecionarMinisterio(ministerioSelecionado);
    } catch (error) {
      console.error('Erro ao salvar membro:', error);
      alert('Erro ao vincular membro: ' + error.message);
    }
  }

  async function removerMembro(id) {
    const confirmar = await window.confirmModal('Remover Membro', 'Deseja remover este membro do ministério?');
    if (!confirmar) return;

    try {
      await ministeriosService.removerMembro(id);
      selecionarMinisterio(ministerioSelecionado);
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      alert('Erro ao remover: ' + error.message);
    }
  }

  function abrirEditarMembro(membro) {
    setEditingMembro(membro);
    setPessoaSelecionada(membro.pessoas);
    const arr = membro.funcao ? membro.funcao.split(',').map(s => s.trim()) : [];
    setFuncoesSelecionadas(arr);
    setLider(membro.lider);
    setShowModal(true);
  }

  function fecharModal() {
    setShowModal(false);
    setEditingMembro(null);
    setBuscaPessoa('');
    setPessoaSelecionada(null);
    setFuncoesSelecionadas([]);
    setCustomFuncaoInput('');
    setLider(false);
    setDispDomingo(true);
    setDispSegunda(true);
    setDispTerca(true);
    setDispQuarta(true);
    setDispQuinta(true);
    setDispSexta(true);
    setDispSabado(true);
    setBloqueiosMembro([]);
    setBlqInicio('');
    setBlqFim('');
    setBlqJustificativa('');
  }

  function toggleFuncaoSelecionada(nomeFuncao) {
    setFuncoesSelecionadas(prev => 
      prev.includes(nomeFuncao) 
        ? prev.filter(f => f !== nomeFuncao) 
        : [...prev, nomeFuncao]
    );
  }

  function handleAddCustomFuncao() {
    const val = customFuncaoInput.trim();
    if (!val) return;
    if (!funcoesSelecionadas.includes(val)) {
      setFuncoesSelecionadas(prev => [...prev, val]);
    }
    setCustomFuncaoInput('');
  }

  // Filtrar pessoas no modal para busca dinâmica (remover quem já é membro deste ministério)
  const pessoasFiltradas = useMemo(() => {
    const idsMembrosAtuais = new Set(membros.map(m => m.pessoas?.id).filter(Boolean));
    return pessoas
      .filter(p => !idsMembrosAtuais.has(p.id))
      .filter(p => p.nome.toLowerCase().includes(buscaPessoa.toLowerCase()))
      .slice(0, 5); // Limitar a 5 resultados para ficar limpo
  }, [pessoas, membros, buscaPessoa]);

  return (
    <div className="grid grid-cols-12 gap-6 items-start">
      {/* Sidebar - Lista de Ministérios */}
      <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-100/80 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-800 pb-3 border-b border-slate-50">
          <Users className="text-blue-600" size={18} />
          <h2 className="font-black text-sm uppercase tracking-wider">Ministérios</h2>
        </div>

        <div className="space-y-1.5 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
          {ministerios.map((m) => (
            <button
              key={m.id}
              onClick={() => selecionarMinisterio(m)}
              className={`w-full text-left p-3.5 rounded-xl transition flex items-center justify-between group cursor-pointer ${
                ministerioSelecionado?.id === m.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    ministerioSelecionado?.id === m.id ? 'bg-white/20 text-white' : 'bg-slate-200/50'
                  }`}
                  style={ministerioSelecionado?.id !== m.id ? { color: m.cor_principal } : {}}
                >
                  <MinistryIcon icone={m.icone} size={16} />
                </div>
                <span className="font-bold text-sm">{m.nome}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                ministerioSelecionado?.id === m.id ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-500'
              }`}>
                {m.nome === ministerioSelecionado?.nome ? membros.length : 'Ver'}
              </span>
            </button>
          ))}
          {ministerios.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-4">Nenhum ministério cadastrado.</p>
          )}
        </div>
      </div>

      {/* Conteúdo - Membros do Ministério Selecionado */}
      <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-100/80 p-6 shadow-sm">
        {ministerioSelecionado ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-50">
              <div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm text-white"
                    style={{ backgroundColor: ministerioSelecionado.cor_principal }}
                  >
                    <MinistryIcon icone={ministerioSelecionado.icone} size={22} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                    {ministerioSelecionado.nome}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {membros.length} voluntários vinculados a este ministério
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer w-full sm:w-auto justify-center"
              >
                <Plus size={14} strokeWidth={3} />
                Adicionar Membro
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {membros.map((membro) => (
                <div
                  key={membro.id}
                  className="bg-slate-50/50 rounded-xl border border-slate-100 p-4 flex justify-between items-center group relative hover:border-slate-200 hover:shadow-xs transition"
                >
                  <div
                    onClick={() => abrirHistoricoMembro(membro)}
                    className="flex items-center gap-3.5 cursor-pointer hover:opacity-80 transition active:scale-98"
                    title="Ver Histórico de Serviços"
                  >
                    <img
                      src={
                        membro.pessoas?.foto_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          membro.pessoas?.nome || 'Membro'
                        )}&background=f1f5f9&color=64748b&bold=true`
                      }
                      alt=""
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                    />

                    <div>
                      <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                        {membro.pessoas?.nome}
                        {membro.lider && (
                          <span className="inline-flex" title="Líder do Ministério">
                            <ShieldCheck size={15} className="text-blue-600" />
                          </span>
                        )}
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {membro.funcao ? (
                          membro.funcao.split(',').map((f, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded text-[9px] font-black uppercase tracking-wider text-slate-500"
                            >
                              {f.trim()}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Sem função</span>
                        )}
                      </div>
                      {membro.pessoas?.telefone && (
                        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <Phone size={10} />
                          {membro.pessoas.telefone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => abrirEditarMembro(membro)}
                      className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                      title="Editar Vínculo"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removerMembro(membro.id)}
                      className="p-2 hover:bg-red-50 text-slate-350 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      title="Remover Membro"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {membros.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-400 italic text-sm">
                  Nenhum voluntário vinculado a este ministério. Clique em "Adicionar Membro" para vincular o primeiro!
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-24 text-center text-slate-400 italic">
            Selecione um ministério na barra lateral para gerenciar sua equipe.
          </div>
        )}
      </div>

      {/* Modal - Vincular Membro */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                {editingMembro ? 'Editar Vínculo do Membro' : 'Adicionar Membro ao Ministério'}
              </h3>
              <button type="button" onClick={fecharModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
              {/* Campo de Busca Dinâmica */}
              <div className="relative">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Pesquisar Voluntário</label>
                {editingMembro ? (
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-150 rounded-xl p-3">
                    <img
                      src={pessoaSelecionada.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(pessoaSelecionada.nome)}`}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover shadow-sm border border-white"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{pessoaSelecionada.nome}</p>
                      <p className="text-[10px] text-slate-400">{pessoaSelecionada.cargo || 'Membro'}</p>
                    </div>
                  </div>
                ) : pessoaSelecionada ? (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={pessoaSelecionada.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(pessoaSelecionada.nome)}`}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-blue-900">{pessoaSelecionada.nome}</p>
                        <p className="text-[10px] text-blue-700">{pessoaSelecionada.cargo || 'Membro'}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPessoaSelecionada(null)}
                      className="text-blue-500 hover:text-blue-700 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                      <input
                        type="text"
                        value={buscaPessoa}
                        onChange={(e) => setBuscaPessoa(e.target.value)}
                        placeholder="Digite o nome da pessoa..."
                        className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30"
                      />
                    </div>
                    {/* Resultados da Busca */}
                    {buscaPessoa.trim() !== '' && (
                      <div className="absolute z-10 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                        {pessoasFiltradas.map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setPessoaSelecionada(p);
                              setBuscaPessoa('');
                            }}
                            className="w-full text-left p-3 hover:bg-slate-50 transition flex items-center gap-3 border-b border-slate-50 last:border-0 cursor-pointer"
                          >
                            <img
                              src={p.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.nome)}`}
                              alt=""
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-xs font-bold text-slate-800">{p.nome}</p>
                              <p className="text-[10px] text-slate-400">{p.cargo || 'Membro'}</p>
                            </div>
                          </button>
                        ))}
                        {pessoasFiltradas.length === 0 && (
                          <div className="p-4 text-center text-xs text-slate-400 italic">
                            Nenhuma pessoa disponível encontrada.
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
 
              {/* Escolher Funções (Múltiplas) */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Funções no Ministério</label>
                <div className="space-y-2 p-3 bg-slate-50 border border-slate-200/60 rounded-xl max-h-[140px] overflow-y-auto">
                  {funcoesMinisterio.map(f => {
                    const isChecked = funcoesSelecionadas.includes(f.nome);
                    return (
                      <label key={f.id} className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleFuncaoSelecionada(f.nome)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        {f.nome}
                      </label>
                    );
                  })}
                  {funcoesMinisterio.length === 0 && (
                    <p className="text-[10px] text-slate-450 italic">Nenhuma função especial cadastrada.</p>
                  )}
                </div>
                
                {/* Adicionar função customizada */}
                <div className="mt-2.5 flex gap-2">
                  <input
                    type="text"
                    value={customFuncaoInput}
                    onChange={(e) => setCustomFuncaoInput(e.target.value)}
                    placeholder="Adicionar outra função..."
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-blue-500 transition bg-slate-50/30"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomFuncao}
                    className="bg-slate-250 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Definir Líder */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="text-slate-400" size={16} />
                  <div>
                    <label className="text-xs font-bold text-slate-800 cursor-pointer" htmlFor="check-lider">
                      Líder do Ministério
                    </label>
                    <p className="text-[9px] text-slate-400">Atribui cargo de coordenação ministerial.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="check-lider"
                  checked={lider}
                  onChange={(e) => setLider(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {/* Disponibilidade */}
              {pessoaSelecionada && (
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                      🗓️ Dias de Disponibilidade
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3.5 border border-slate-200/60 rounded-xl">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dispDomingo}
                          onChange={(e) => setDispDomingo(e.target.checked)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        Domingo
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dispQuinta}
                          onChange={(e) => setDispQuinta(e.target.checked)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        Quinta-feira
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dispSabado}
                          onChange={(e) => setDispSabado(e.target.checked)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        Sábado
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-450 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dispSegunda}
                          onChange={(e) => setDispSegunda(e.target.checked)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        Segunda
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-450 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dispTerca}
                          onChange={(e) => setDispTerca(e.target.checked)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        Terça
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-450 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dispQuarta}
                          onChange={(e) => setDispQuarta(e.target.checked)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        Quarta
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-450 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={dispSexta}
                          onChange={(e) => setDispSexta(e.target.checked)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        Sexta
                      </label>
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium mt-1.5 block">
                      * A escala automática só considera voluntários marcados como disponíveis.
                    </span>
                  </div>

                  {/* Bloqueios / Férias */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      🚫 Bloqueios / Períodos de Ausência
                    </label>

                    {/* Lista de bloqueios atuais */}
                    <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
                      {bloqueiosMembro.map((b) => (
                        <div key={b.id} className="flex justify-between items-center bg-rose-50/50 border border-rose-100/50 rounded-lg px-2.5 py-1.5 text-xs text-rose-800">
                          <div>
                            <span className="font-extrabold">{b.justificativa}</span>: {formatarDataCurta(b.data_inicio)} a {formatarDataCurta(b.data_fim)}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoverBloqueioLocal(b.id)}
                            className="text-rose-500 hover:text-rose-700 font-bold ml-2 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {bloqueiosMembro.length === 0 && (
                        <p className="text-[10px] text-slate-450 italic py-1">Nenhum bloqueio cadastrado para este voluntário.</p>
                      )}
                    </div>

                    {/* Formulário rápido para adicionar bloqueio */}
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Início</label>
                          <input
                            type="date"
                            value={blqInicio}
                            onChange={(e) => setBlqInicio(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Término</label>
                          <input
                            type="date"
                            value={blqFim}
                            onChange={(e) => setBlqFim(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none bg-white"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Motivo / Justificativa</label>
                          <input
                            type="text"
                            placeholder="Ex: Férias, Trabalho, Viagem..."
                            value={blqJustificativa}
                            onChange={(e) => setBlqJustificativa(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none bg-white font-bold"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAdicionarBloqueioLocal}
                          className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-lg cursor-pointer h-[32px] flex items-center justify-center"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button
                type="button"
                onClick={fecharModal}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={adicionarMembro}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition cursor-pointer"
              >
                Salvar Membro
              </button>
            </div>
          </div>
        </div>
      )}

      <MembroHistoricoModal
        isOpen={modalHistoricoAberto}
        onClose={() => setModalHistoricoAberto(false)}
        pessoa={membroSelecionadoHistorico}
      />
    </div>
  );
}