import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';
import { registrarLogFinanceiro } from './financeiroUtils';

export default function ContasFinanceiras({ usuarioLogado }) {
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
    if (!window.confirm('Excluir esta conta permanentemente?')) return;
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
    <div className="space-y-6">
      <PageHeader titulo="Contas e Caixas" breadcrumb={['Financeiro', 'Contas e Caixas']} subtitulo="Gerencie as contas bancárias e caixas físicos da igreja." />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        {/* Coluna Esquerda: Cadastro */}
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

        {/* Coluna Direita: Lista */}
        <div className="space-y-6">
          <Card className="p-0">
            <CardHeader titulo="Contas Cadastradas" />
            <div className="overflow-x-auto">
              <table className="table-mib">
                <thead><tr><th>Conta / Descrição</th><th className="text-right">Ação</th></tr></thead>
                <tbody>
                  {contas.length === 0 ? (
                    <tr><td colSpan="2" className="p-10 text-center text-sm text-slate-400 italic font-normal">Nenhuma conta cadastrada.</td></tr>
                  ) : (
                    contas.map(conta => (
                      <tr key={conta.id}>
                        <td className="py-3">
                          <p className="font-bold text-sm text-slate-700">{conta.nome}</p>
                          {conta.descricao && <p className="text-[11px] text-slate-400 font-normal">{conta.descricao}</p>}
                        </td>
                        <td className="text-right">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => prepararEdicao(conta)} className="text-blue-500 hover:text-blue-700 text-xs font-bold">Editar</button>
                            <button onClick={() => removerConta(conta.id)} className="text-rose-400 hover:text-rose-600 text-xs font-bold">Remover</button>
                          </div>
                        </td>
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