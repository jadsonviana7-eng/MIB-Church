import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader } from './ui';
import { registrarLogFinanceiro } from './financeiroUtils';

// Cache em memória para abertura instantânea ao trocar de aba
let cacheContasMemoria = null;

export default function ContasFinanceiras({
  usuarioLogado,
  membroLogado,
  hasAccess,
  contasIniciais,
  onContasAtualizadas,
  onVoltar
}) {
  const podeEditar = hasAccess('Financeiro', 'Contas/Caixas', 'editar');
  const listaInicial = (Array.isArray(contasIniciais) && contasIniciais.length > 0)
    ? contasIniciais
    : (cacheContasMemoria || []);

  const [contas, setContas] = useState(listaInicial);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  // Sincroniza se as contas iniciais chegarem do pai antes do fetch local
  useEffect(() => {
    if (Array.isArray(contasIniciais) && contasIniciais.length > 0) {
      cacheContasMemoria = contasIniciais;
      setContas((atual) => (atual.length === 0 ? contasIniciais : atual));
    }
  }, [contasIniciais]);

  const carregarContas = useCallback(async ({ silencioso = false } = {}) => {
    if (!silencioso && !cacheContasMemoria?.length) {
      setCarregando(true);
    }
    const { data, error } = await supabase
      .from('contas_financeiras')
      .select('*')
      .order('nome');
    if (error) console.error('Erro ao carregar contas:', error.message);
    if (data) {
      cacheContasMemoria = data;
      setContas(data);
      if (onContasAtualizadas) onContasAtualizadas(data);
    }
    setCarregando(false);
  }, [onContasAtualizadas]);

  useEffect(() => {
    carregarContas({ silencioso: true });
  }, [carregarContas]);

  const abrirNovaConta = useCallback(() => {
    setEditandoId(null);
    setNome('');
    setDescricao('');
    setModalAberto(true);
  }, []);

  const fecharModal = () => {
    setModalAberto(false);
    setEditandoId(null);
    setNome('');
    setDescricao('');
  };

  // Escuta clique do botão fixo "+ Nova Conta" abaixo do painel lateral direito (Desktop)
  useEffect(() => {
    const onNovaConta = () => {
      if (!podeEditar) return;
      abrirNovaConta();
    };
    window.addEventListener('mib-financeiro-nova-conta', onNovaConta);
    return () => window.removeEventListener('mib-financeiro-nova-conta', onNovaConta);
  }, [podeEditar, abrirNovaConta]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return;

    setCarregando(true);
    const payload = { nome: nome.trim(), descricao: descricao.trim() };

    try {
      if (editandoId) {
        const { error } = await supabase
          .from('contas_financeiras')
          .update(payload)
          .eq('id', editandoId);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Edição de Conta', `Editou a conta: ${nome}`);
      } else {
        const { error } = await supabase
          .from('contas_financeiras')
          .insert([payload]);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Criação de Conta', `Criou a conta: ${nome}`);
      }
      fecharModal();
      await carregarContas();
    } catch (err) {
      alert('Erro ao processar conta: ' + err.message);
    } finally {
      setCarregando(false);
    }
  };

  const removerConta = async (id) => {
    if (!(await window.confirmModal('Excluir Conta', 'Excluir esta conta permanentemente?'))) return;
    setCarregando(true);
    try {
      const { error } = await supabase.from('contas_financeiras').delete().eq('id', id);
      if (error) throw error;
      const nomeConta = contas.find(c => c.id === id)?.nome || id;
      await registrarLogFinanceiro(
        usuarioLogado?.email,
        'Exclusão de Conta',
        `Removeu a conta/caixa: ${nomeConta}`
      );
      await carregarContas();
    } catch (err) {
      alert('Erro ao excluir conta: ' + err.message);
    } finally {
      setCarregando(false);
    }
  };

  const prepararEdicao = (conta) => {
    setEditandoId(conta.id);
    setNome(conta.nome);
    setDescricao(conta.descricao || '');
    setModalAberto(true);
  };

  return (
    <div className="space-y-4">
      {/* Botão Mobile / Tablet (< lg) — no Desktop (lg+) o botão fica fixo abaixo do menu lateral direito */}
      {podeEditar && (
        <div className="flex lg:hidden justify-end">
          <button
            type="button"
            onClick={abrirNovaConta}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-md cursor-pointer transition active:scale-95"
          >
            <span className="text-sm font-black leading-none">+</span>
            <span>Nova Conta</span>
          </button>
        </div>
      )}

      {/* Lista em largura total */}
      <Card className="p-0">
        <CardHeader titulo="Contas Cadastradas" className="dark:!bg-[#1c2b4a] dark:!border-[#2b3954]" />
        <div className="overflow-x-auto">
          <table className="table-mib">
            <thead><tr><th>Conta / Descrição</th>{podeEditar && <th className="text-right">Ação</th>}</tr></thead>
            <tbody>
              {contas.length === 0 ? (
                <tr><td colSpan={podeEditar ? "2" : "1"} className="p-10 text-center text-sm text-slate-400 dark:text-slate-500 italic font-normal">Nenhuma conta cadastrada.</td></tr>
              ) : (
                contas.map(conta => (
                  <tr key={conta.id}>
                    <td className="py-3">
                      <p className="font-bold text-sm text-slate-700 dark:text-slate-100">{conta.nome}</p>
                      {conta.descricao && <p className="text-[11px] text-slate-400 dark:text-slate-400 font-normal">{conta.descricao}</p>}
                    </td>
                    {podeEditar && (
                      <td className="text-right pr-6">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => prepararEdicao(conta)} className="text-[#1e3a8a] dark:text-blue-400 hover:text-[#1e40af] dark:hover:text-blue-300 transition p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" title="Editar Conta">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button onClick={() => removerConta(conta.id)} className="text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 transition p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer" title="Remover Conta">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de Nova / Editar Conta */}
      {modalAberto && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => { if (e.target === e.currentTarget) fecharModal(); }}
        >
          <div className="bg-white dark:bg-[#17223b] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-transparent dark:border-[#2b3954] animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="px-6 py-4 flex items-center justify-between border-b border-blue-100 dark:border-[#2b3954] bg-blue-50/70 dark:bg-[#1c2b4a]">
              <div>
                <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
                  {editandoId ? 'Editar Conta / Caixa' : 'Nova Conta / Caixa'}
                </h3>
                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  Organize bancos, cofres e caixas da igreja
                </p>
              </div>
              <button
                type="button"
                onClick={fecharModal}
                className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSalvar} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Nome da Conta <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Ex: Caixa Geral, Bradesco..."
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Descrição <span className="text-slate-300 dark:text-slate-500 normal-case">(opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Finalidade ou detalhes da conta..."
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={carregando || !nome.trim()}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-black transition shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {carregando ? 'Salvando...' : editandoId ? '💾 Atualizar' : '+ Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}