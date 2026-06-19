import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardHeader, PageHeader } from './ui';
import { registrarLogFinanceiro } from './financeiroUtils';

export default function CategoriasFinanceiras({ usuarioLogado, onVoltar }) {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('receita');
  const [carregando, setCarregando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [abaAtivaMobile, setAbaAtivaMobile] = useState('receita');

  const carregarCategorias = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from('categorias_financeiras')
      .select('*')
      .order('nome');
    if (error) console.error('Erro ao carregar categorias:', error.message);
    if (data) setCategorias(data);
    setCarregando(false);
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return;

    setCarregando(true);
    const payload = { nome: nome.trim(), descricao: descricao.trim(), tipo };

    try {
      if (editandoId) {
        const { error } = await supabase
          .from('categorias_financeiras')
          .update(payload)
          .eq('id', editandoId);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Edição de Categoria', `Editou a categoria ${tipo}: ${nome}`);
      } else {
        const { error } = await supabase
          .from('categorias_financeiras')
          .insert([payload]);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Criação de Categoria', `Criou a categoria ${tipo}: ${nome}`);
      }
      setNome('');
      setDescricao('');
      setEditandoId(null);
      carregarCategorias();
    } catch (err) {
      alert('Erro ao processar categoria: ' + err.message);
    } finally {
      setCarregando(false);
    }
  };

  const removerCategoria = async (id) => {
    if (!(await window.confirmModal('Excluir Categoria', 'Excluir esta categoria permanentemente?'))) return;
    try {
      const cat = categorias.find(c => c.id === id);
      const { error } = await supabase.from('categorias_financeiras').delete().eq('id', id);
      if (error) throw error;
      
      await registrarLogFinanceiro(usuarioLogado?.email, 'Exclusão de Categoria', `Removeu a categoria: ${cat?.nome} (${cat?.tipo})`);
      await carregarCategorias();
    } catch (err) {
      alert('Erro ao excluir categoria: ' + err.message);
    }
  };

  const prepararEdicao = (cat) => {
    setEditandoId(cat.id);
    setNome(cat.nome);
    setDescricao(cat.descricao || '');
    setTipo(cat.tipo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 mx-2">
      <div className="hidden md:block">
        <PageHeader titulo="Categorias Financeiras" subtitulo="Classifique suas receitas e despesas para relatórios mais precisos." breadcrumb={['Resumo', 'Categorias']} onNavigate={onVoltar} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        {/* Coluna Esquerda: Cadastro */}
        <div className="space-y-4">
          <Card className="p-0">
            <CardHeader 
              titulo={editandoId ? "Editar Categoria" : "Nova Categoria"} 
              className={tipo === 'receita' ? '!bg-emerald-50 !border-emerald-600' : '!bg-rose-50 !border-rose-600'}
            />
            <form onSubmit={handleSalvar} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Nome</label>
                <input 
                  type="text" required placeholder="Ex: Dízimos, Aluguel..."
                  value={nome} onChange={e => setNome(e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:ring-2 focus:ring-[#202046]/20 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Descrição</label>
                <input 
                  type="text" placeholder="Finalidade desta categoria..."
                  value={descricao} onChange={e => setDescricao(e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:ring-2 focus:ring-[#202046]/20 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-500 mb-1">Tipo</label>
                <select 
                  value={tipo} onChange={e => setTipo(e.target.value)} 
                  className="w-full px-2 py-2 border border-slate-200 rounded-xl text-sm font-normal bg-white outline-none cursor-pointer"
                >
                  <option value="receita">Receita (Entrada)</option>
                  <option value="despesa">Despesa (Saída)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button type="submit" disabled={carregando}
                  className={`w-full py-2.5 rounded-xl text-white text-sm font-bold transition shadow-sm ${tipo === 'receita' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>
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

        {/* Coluna Direita: Listas */}
        <div className="space-y-4">
          {/* Seletor de Abas Mobile */}
          <div className="flex md:hidden bg-white p-1 rounded-2xl border border-slate-100 gap-1 shadow-sm">
            <button
              type="button"
              onClick={() => setAbaAtivaMobile('receita')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                abaAtivaMobile === 'receita' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Receitas
            </button>
            <button
              type="button"
              onClick={() => setAbaAtivaMobile('despesa')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                abaAtivaMobile === 'despesa' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Despesas
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
            <Card className={`p-0 ${abaAtivaMobile !== 'receita' ? 'hidden md:block' : 'block'}`}>
              <CardHeader titulo="Categorias de Receitas" className="!bg-emerald-50 !border-emerald-600" />
              <TabelaSimples lista={categorias.filter(c => c.tipo === 'receita')} onEdit={prepararEdicao} onDelete={removerCategoria} cor="emerald" />
            </Card>
            <Card className={`p-0 ${abaAtivaMobile !== 'despesa' ? 'hidden md:block' : 'block'}`}>
              <CardHeader titulo="Categorias de Despesas" className="!bg-rose-50 !border-rose-600" />
              <TabelaSimples lista={categorias.filter(c => c.tipo === 'despesa')} onEdit={prepararEdicao} onDelete={removerCategoria} cor="rose" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabelaSimples({ lista, onEdit, onDelete, cor }) {
  if (lista.length === 0) return <div className="p-10 text-center text-sm text-slate-400 italic font-normal">Nenhuma categoria cadastrada.</div>;
  return (
    <div className="overflow-x-auto">
      <table className="table-mib">
        <thead><tr><th>Nome / Descrição</th><th className="text-right">Ação</th></tr></thead>
        <tbody>
          {lista.map(cat => (
            <tr key={cat.id}>
              <td className="py-3">
                <p className={`font-bold text-sm text-${cor}-700`}>{cat.nome}</p>
                {cat.descricao && <p className="text-[11px] text-slate-400 font-normal">{cat.descricao}</p>}
              </td>
              <td className="text-right pr-6">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(cat)} className="text-[#202046] hover:text-[#2F2F80] transition p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer" title="Editar Categoria">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => onDelete(cat.id)} className="text-rose-500 hover:text-rose-700 transition p-1.5 rounded-lg hover:bg-rose-50 cursor-pointer" title="Remover Categoria">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}