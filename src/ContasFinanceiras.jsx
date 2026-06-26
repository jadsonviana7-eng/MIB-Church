import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';
import { registrarLogFinanceiro } from './financeiroUtils';

export default function ContasFinanceiras({ usuarioLogado, membroLogado, hasAccess, onVoltar }) {
  const podeEditar = hasAccess('Financeiro', 'Contas/Caixas', 'editar');
  const [contas, setContas] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const carregarContas = useCallback(async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from('contas_financeiras')
      .select('*')
      .order('nome');
    if (error) console.error('Erro ao carregar contas:', error.message);
    if (data) setContas(data);
    setCarregando(false);
  }, []);

  useEffect(() => {
    carregarContas();
  }, [carregarContas]);

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
      setNome('');
      setDescricao('');
      setEditandoId(null);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 mx-2">
      <div className="print:hidden mx-[3px] sm:mx-0">
        <PageHeader titulo="Contas" breadcrumb={['Resumo', 'Contas']} onNavigate={onVoltar} />
      </div>

      <div className={podeEditar ? "grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start" : "grid grid-cols-1 gap-6 items-start"}>
        {/* Coluna Esquerda: Cadastro */}
        {podeEditar && (
          <div className="space-y-4">
            <Card className="p-0">
              <CardHeader
                titulo={editandoId ? "Editar Conta" : "Nova Conta"}
                className="!bg-blue-50/50 !border-[#1e3a8a]"
              />
              <form onSubmit={handleSalvar} className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Nome da Conta</label>
                  <input
                    type="text" required placeholder="Ex: Caixa Geral, Bradesco..."
                    value={nome} onChange={e => setNome(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:ring-2 focus:ring-[#2563eb]/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Descrição</label>
                  <input
                    type="text" placeholder="Finalidade ou detalhes da conta..."
                    value={descricao} onChange={e => setDescricao(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:ring-2 focus:ring-[#2563eb]/20 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <button type="submit" disabled={carregando}
                    className="w-full py-2.5 rounded-xl bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-bold transition shadow-sm disabled:opacity-50">
                    {carregando ? 'Processando...' : editandoId ? '💾 Atualizar' : '+ Adicionar'}
                  </button>
                  {editandoId && (
                    <button type="button" onClick={() => { setEditandoId(null); setNome(''); setDescricao(''); }} className="w-full py-2 text-slate-400 text-xs font-bold hover:text-slate-600">
                      Cancelar Edição
                    </button>
                  )}
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Coluna Direita: Lista */}
        <div className="space-y-6">
          <Card className="p-0">
            <CardHeader titulo="Contas Cadastradas" />
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead><tr><th>Conta / Descrição</th>{podeEditar && <th className="text-right">Ação</th>}</tr></thead>
                <tbody>
                  {contas.length === 0 ? (
                    <tr><td colSpan={podeEditar ? "2" : "1"} className="p-10 text-center text-sm text-slate-400 italic font-normal">Nenhuma conta cadastrada.</td></tr>
                  ) : (
                    contas.map(conta => (
                      <tr key={conta.id}>
                        <td className="py-3">
                          <p className="font-bold text-sm text-slate-700">{conta.nome}</p>
                          {conta.descricao && <p className="text-[11px] text-slate-400 font-normal">{conta.descricao}</p>}
                        </td>
                        {podeEditar && (
                          <td className="text-right pr-6">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => prepararEdicao(conta)} className="text-[#1e3a8a] hover:text-[#1e40af] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" title="Editar Conta">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button onClick={() => removerConta(conta.id)} className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer" title="Remover Conta">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
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
        </div>
      </div>
    </div>
  );
}