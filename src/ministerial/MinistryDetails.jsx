import { useEffect, useState, useMemo } from 'react';
import {
  Users,
  Shield,
  Settings,
  Plus,
  Trash2,
  X,
  Pencil,
  ChevronLeft
} from 'lucide-react';

import { supabase } from '../supabaseClient';
import FuncoesMinisteriais from './FuncoesMinisteriais';
import { MinistryIcon } from '../ui';
import MembroHistoricoModal from './components/MembroHistoricoModal';
import { escalasService } from './services/escalasService';

export default function MinistryDetails({ ministerioId, onVoltar }) {
  const [aba, setAba] = useState('equipe');
  const [ministerio, setMinisterio] = useState(null);
  const [membros, setMembros] = useState([]);
  const [funcoes, setFuncoes] = useState([]);
  const [loading, setLoading] = useState(true);

  // States para gerenciar equipe
  const [showModalMembro, setShowModalMembro] = useState(false);
  const [buscaPessoa, setBuscaPessoa] = useState('');
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);
  const [funcoesSelecionadas, setFuncoesSelecionadas] = useState([]);
  const [customFuncaoInput, setCustomFuncaoInput] = useState('');
  const [lider, setLider] = useState(false);
  const [pessoas, setPessoas] = useState([]);
  const [editingMembro, setEditingMembro] = useState(null);
  const [modalHistoricoAberto, setModalHistoricoAberto] = useState(false);
  const [membroSelecionadoHistorico, setMembroSelecionadoHistorico] = useState(null);
  const [novoFardamento, setNovoFardamento] = useState('');

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

  const abrirHistoricoMembro = (membro) => {
    setMembroSelecionadoHistorico(membro.pessoas);
    setModalHistoricoAberto(true);
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

  const handleAdicionarFardamento = async (e) => {
    e.preventDefault();
    if (!novoFardamento.trim()) return;

    try {
      const fardamentosAtuais = ministerio?.fardamentos || [];
      if (fardamentosAtuais.includes(novoFardamento.trim())) {
        alert('Este fardamento já está cadastrado.');
        return;
      }

      const novosFardamentos = [...fardamentosAtuais, novoFardamento.trim()];

      const { data, error } = await supabase
        .from('ministerios')
        .update({ fardamentos: novosFardamentos })
        .eq('id', ministerioId)
        .select()
        .single();

      if (error) throw error;

      setMinisterio(data);
      setNovoFardamento('');
    } catch (err) {
      console.error('Erro ao adicionar fardamento:', err);
      alert('Erro ao adicionar fardamento: ' + err.message);
    }
  };

  const handleExcluirFardamento = async (fardamentoNome) => {
    if (!window.confirm(`Deseja excluir o fardamento "${fardamentoNome}"?`)) return;

    try {
      const fardamentosAtuais = ministerio?.fardamentos || [];
      const novosFardamentos = fardamentosAtuais.filter(f => f !== fardamentoNome);

      const { data, error } = await supabase
        .from('ministerios')
        .update({ fardamentos: novosFardamentos })
        .eq('id', ministerioId)
        .select()
        .single();

      if (error) throw error;

      setMinisterio(data);
    } catch (err) {
      console.error('Erro ao excluir fardamento:', err);
      alert('Erro ao excluir fardamento: ' + err.message);
    }
  };

  useEffect(() => {
    if (ministerioId) {
      carregar();
    }
  }, [ministerioId]);

  async function carregar() {
    setLoading(true);
    try {
      const { data: ministerioData } = await supabase
        .from('ministerios')
        .select('*')
        .eq('id', ministerioId)
        .single();

      const { data: membrosData } = await supabase
        .from('ministerio_membros')
        .select(`
          *,
          pessoas (
            id,
            nome,
            telefone,
            foto_url,
            cargo
          )
        `)
        .eq('ministerio_id', ministerioId);

      const { data: funcoesData } = await supabase
        .from('ministerio_funcoes')
        .select('*')
        .eq('ministerio_id', ministerioId)
        .order('nome');

      const { data: pessoasData } = await supabase
        .from('pessoas')
        .select('id, nome, cargo, foto_url, telefone')
        .eq('status', 'ativo')
        .order('nome');

      setMinisterio(ministerioData);
      setMembros(membrosData || []);
      setFuncoes(funcoesData || []);
      setPessoas(pessoasData || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function adicionarMembro() {
    if (!pessoaSelecionada) {
      alert('Selecione uma pessoa');
      return;
    }

    try {
      const funcaoFinal = funcoesSelecionadas.filter(Boolean).join(', ');
      if (editingMembro) {
        const { error } = await supabase
          .from('ministerio_membros')
          .update({
            funcao: funcaoFinal || null,
            lider: lider
          })
          .eq('id', editingMembro.id);

        if (error) throw error;

        // Registrar histórico
        await supabase.from('historico_ministerial').insert([{
          pessoa_id: pessoaSelecionada.id,
          ministerio_id: ministerioId,
          acao: 'ALTERACAO_VINCULO',
          detalhes: `Vínculo atualizado para Função: ${funcaoFinal || 'Sem Função'} · Líder: ${lider ? 'Sim' : 'Não'}`
        }]);
      } else {
        const { error } = await supabase.from('ministerio_membros').insert([{
          ministerio_id: ministerioId,
          pessoa_id: pessoaSelecionada.id,
          funcao: funcaoFinal || null,
          lider: lider,
          ativo: true
        }]);

        if (error) throw error;

        // Registrar histórico
        await supabase.from('historico_ministerial').insert([{
          pessoa_id: pessoaSelecionada.id,
          ministerio_id: ministerioId,
          acao: 'ENTRADA_MINISTERIO',
          detalhes: `Entrou no ministério como ${funcaoFinal || 'Sem Função'}`
        }]);
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

      fecharModalMembro();
      carregar();
    } catch (error) {
      console.error('Erro ao adicionar/editar membro:', error);
      alert('Erro ao vincular membro: ' + error.message);
    }
  }

  async function removerMembro(id, pessoaId) {
    const confirmar = await window.confirmModal('Remover Membro', 'Deseja remover este membro do ministério?');
    if (!confirmar) return;

    try {
      const { error } = await supabase.from('ministerio_membros').delete().eq('id', id);
      if (error) throw error;

      // Registrar histórico
      await supabase.from('historico_ministerial').insert([{
        pessoa_id: pessoaId,
        ministerio_id: ministerioId,
        acao: 'SAIDA_MINISTERIO',
        detalhes: 'Saiu do ministério'
      }]);

      carregar();
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      alert('Erro ao remover: ' + error.message);
    }
  }

  function abrirNovoMembro() {
    setPessoaSelecionada(null);
    setBuscaPessoa('');
    setFuncoesSelecionadas([]);
    setCustomFuncaoInput('');
    setLider(false);
    setShowModalMembro(true);
  }

  function abrirEditarMembro(membro) {
    setEditingMembro(membro);
    setPessoaSelecionada(membro.pessoas);
    const arr = membro.funcao ? membro.funcao.split(',').map(s => s.trim()) : [];
    setFuncoesSelecionadas(arr);
    setLider(membro.lider);
    setShowModalMembro(true);
  }

  function fecharModalMembro() {
    setShowModalMembro(false);
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
      .slice(0, 5); // Limitar a 5 resultados
  }, [pessoas, membros, buscaPessoa]);

  if (loading) {
    return (
      <div className="p-6 text-slate-500 italic">
        Carregando...
      </div>
    );
  }

  if (!ministerio) {
    return (
      <div className="p-6 text-red-500 font-bold">
        Ministério não encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-4">
          {onVoltar && (
            <button
              onClick={onVoltar}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer shrink-0"
              title="Voltar para Ministérios"
            >
              <ChevronLeft size={20} strokeWidth={3} />
            </button>
          )}

          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-md shadow-slate-200 shrink-0"
            style={{
              backgroundColor: ministerio.cor_principal || '#2563eb'
            }}
          >
            <MinistryIcon icone={ministerio.icone} size={28} style={{ color: '#ffffff' }} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {ministerio.nome}
            </h1>
            <p className="text-gray-500">
              {ministerio.descricao || 'Sem descrição.'}
            </p>
          </div>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white rounded-xl shadow p-3 md:p-4 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 text-slate-400 text-center sm:text-left">
            <Users size={16} className="shrink-0" />
            <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider">Membros</span>
          </div>
          <p className="text-lg sm:text-2xl font-black text-slate-800 mt-1 text-center sm:text-left">
            {membros.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-3 md:p-4 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 text-slate-400 text-center sm:text-left">
            <Shield size={16} className="shrink-0" />
            <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider">Líderes</span>
          </div>
          <p className="text-lg sm:text-2xl font-black text-slate-800 mt-1 text-center sm:text-left">
            {membros.filter((m) => m.lider).length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-3 md:p-4 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 text-slate-400 text-center sm:text-left">
            <Settings size={16} className="shrink-0" />
            <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider">Funções</span>
          </div>
          <p className="text-lg sm:text-2xl font-black text-slate-800 mt-1 text-center sm:text-left">
            {funcoes.length}
          </p>
        </div>
      </div>

      {/* ABAS */}
      <div className="flex gap-2">
        <button
          onClick={() => setAba('equipe')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
            aba === 'equipe'
              ? 'bg-[#1e3a8a] text-white shadow-md shadow-blue-100'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          Equipe
        </button>

        <button
          onClick={() => setAba('funcoes')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
            aba === 'funcoes'
              ? 'bg-[#1e3a8a] text-white shadow-md shadow-blue-100'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          Funções
        </button>

        <button
          onClick={() => setAba('fardamentos')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
            aba === 'fardamentos'
              ? 'bg-[#1e3a8a] text-white shadow-md shadow-blue-100'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          Fardamentos
        </button>
      </div>

      {/* EQUIPE */}
      {aba === 'equipe' && (
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-50">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Membros da Equipe</h3>
            <button
              type="button"
              onClick={abrirNovoMembro}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer"
            >
              <Plus size={14} strokeWidth={3} />
              Adicionar Membro
            </button>
          </div>

          <div className="space-y-2">
            {membros.map((membro) => (
              <div
                key={membro.id}
                className="flex justify-between items-center border border-slate-100 rounded-2xl p-4 hover:shadow-sm transition"
              >
                <div
                  onClick={() => abrirHistoricoMembro(membro)}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition active:scale-98"
                  title="Ver Histórico de Serviços"
                >
                  <img
                    src={
                      membro.pessoas?.foto_url ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        membro.pessoas?.nome || ''
                      )}`
                    }
                    className="w-12 h-12 rounded-full object-cover border border-slate-100 shadow-sm"
                  />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      {membro.pessoas?.nome}
                    </p>
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
                        <span className="text-[10px] text-slate-450 italic">Sem função</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {membro.lider && (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      Líder
                    </span>
                  )}
                  <button
                    onClick={() => abrirEditarMembro(membro)}
                    className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-700 transition cursor-pointer"
                    title="Editar Vínculo"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => removerMembro(membro.id, membro.pessoas?.id)}
                    className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    title="Remover Membro"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}

            {membros.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-8 border border-dashed border-slate-200 rounded-xl">
                Nenhum voluntário vinculado. Adicione o primeiro no botão acima!
              </p>
            )}
          </div>
        </div>
      )}

      {/* FUNÇÕES */}
      {aba === 'funcoes' && (
        <FuncoesMinisteriais ministerioId={ministerioId} />
      )}

      {/* FARDAMENTO */}
      {aba === 'fardamentos' && (
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <div className="pb-2 border-b border-slate-50">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Configuração de Fardamentos</h3>
            <p className="text-xs text-slate-400 mt-1">Configure os tipos de fardamento que este ministério utiliza.</p>
          </div>

          <form onSubmit={handleAdicionarFardamento} className="flex gap-2">
            <input
              type="text"
              placeholder="Digite o nome do fardamento (Ex: Camisa Preta, Farda Oficial)..."
              value={novoFardamento}
              onChange={e => setNovoFardamento(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none text-xs font-medium"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={14} strokeWidth={3} />
              Adicionar
            </button>
          </form>

          <div className="space-y-2">
            {(!ministerio?.fardamentos || ministerio.fardamentos.length === 0) ? (
              <p className="text-xs text-slate-400 italic text-center py-8 border border-dashed border-slate-200 rounded-xl">
                Nenhum fardamento cadastrado. Adicione o primeiro no campo acima!
              </p>
            ) : (
              (ministerio.fardamentos || []).map((fardamento, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border border-slate-100 rounded-xl p-3 bg-slate-50/20"
                >
                  <span className="text-xs font-bold text-slate-700">{fardamento}</span>
                  <button
                    type="button"
                    onClick={() => handleExcluirFardamento(fardamento)}
                    className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    title="Excluir Fardamento"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODAL ADICIONAR MEMBRO */}
      {showModalMembro && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                {editingMembro ? 'Editar Vínculo' : 'Adicionar Membro'}
              </h3>
              <button onClick={fecharModalMembro} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
              {/* Pesquisa de Pessoas */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Pesquisar Pessoa</label>
                {editingMembro ? (
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-150 rounded-xl p-3">
                    <img
                      src={pessoaSelecionada.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(pessoaSelecionada.nome)}`}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{pessoaSelecionada.nome}</p>
                      <p className="text-[10px] text-slate-400">{pessoaSelecionada.cargo || 'Membro'}</p>
                    </div>
                  </div>
                ) : !pessoaSelecionada ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Digite o nome..."
                      value={buscaPessoa}
                      onChange={(e) => setBuscaPessoa(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition bg-slate-50/30"
                    />
                    
                    {buscaPessoa.trim() !== '' && (
                      <div className="border border-slate-150 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white shadow-sm max-h-[200px] overflow-y-auto">
                        {pessoasFiltradas.map(p => (
                          <div
                            key={p.id}
                            onClick={() => setPessoaSelecionada(p)}
                            className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer transition"
                          >
                            <img
                              src={p.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.nome)}`}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-xs font-bold text-slate-800">{p.nome}</p>
                              <p className="text-[10px] text-slate-400">{p.cargo || 'Membro'}</p>
                            </div>
                          </div>
                        ))}
                        {pessoasFiltradas.length === 0 && (
                          <p className="text-xs text-slate-400 italic p-3 text-center">Nenhuma pessoa encontrada.</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-blue-50/40 border border-blue-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img
                        src={pessoaSelecionada.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(pessoaSelecionada.nome)}`}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{pessoaSelecionada.nome}</p>
                        <p className="text-[10px] text-slate-400">{pessoaSelecionada.cargo || 'Membro'}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPessoaSelecionada(null)}
                      className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Alterar
                    </button>
                  </div>
                )}
              </div>

              {/* Escolher Funções (Múltiplas) */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Funções no Ministério</label>
                <div className="space-y-2 p-3 bg-slate-50 border border-slate-200/60 rounded-xl max-h-[140px] overflow-y-auto">
                  {funcoes.map(f => {
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
                  {funcoes.length === 0 && (
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

              {/* Liderança */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="checkbox-lider"
                  checked={lider}
                  onChange={(e) => setLider(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-350 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="checkbox-lider" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                  Definir este membro como Líder do Ministério
                </label>
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
                onClick={fecharModalMembro}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={adicionarMembro}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100 transition active:scale-95 cursor-pointer"
              >
                {editingMembro ? 'Salvar Alterações' : 'Vincular Membro'}
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