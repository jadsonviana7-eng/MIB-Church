import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { PageHeader } from './ui';
import { registrarLogFinanceiro } from './financeiroUtils';

// ─── Ícones inline ──────────────────────────────────────────────────────────
const IconTag = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.595.338a18.978 18.978 0 005.185-5.184c.533-.816.361-1.896-.338-2.595L10.16 3.659A2.25 2.25 0 008.57 3H5.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);
const IconPlus = ({ size = 20 }) => (
  <svg style={{ width: size, height: size }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const IconPencil = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125L18 8.625" />
  </svg>
);
const IconTrash = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);
const IconX = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const IconArrowUp = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
  </svg>
);
const IconArrowDown = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
  </svg>
);

// ─── Estado vazio ────────────────────────────────────────────────────────────
function EmptyState({ tipo, podeEditar, onNova }) {
  const isReceita = tipo === 'receita';
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 ${isReceita ? 'bg-emerald-50' : 'bg-rose-50'}`}>
        {isReceita ? '💰' : '💸'}
      </div>
      <p className="text-sm font-bold text-slate-600 mb-1">
        Nenhuma categoria de {isReceita ? 'receita' : 'despesa'}
      </p>
      <p className="text-xs text-slate-400 mb-4">
        Crie categorias para organizar suas {isReceita ? 'entradas' : 'saídas'} financeiras.
      </p>
      {podeEditar && (
        <button
          type="button"
          onClick={() => onNova(tipo)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition active:scale-95 shadow-sm
            ${isReceita ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'}`}
        >
          <IconPlus size={14} /> Criar primeira categoria
        </button>
      )}
    </div>
  );
}

// ─── Chip / Card de uma categoria ────────────────────────────────────────────
function CategoriaCard({ cat, onEdit, onDelete, podeEditar }) {
  const isReceita = cat.tipo === 'receita';
  return (
    <div className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
      ${isReceita
        ? 'border-emerald-100 bg-emerald-50/40 hover:border-emerald-200 hover:bg-emerald-50'
        : 'border-rose-100 bg-rose-50/30 hover:border-rose-200 hover:bg-rose-50'}`}
    >
      {/* ícone */}
      <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
        ${isReceita ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
        <IconTag />
      </span>

      {/* nome + descrição */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold truncate ${isReceita ? 'text-emerald-800' : 'text-rose-800'}`}>
          {cat.nome}
        </p>
        {cat.descricao && (
          <p className="text-[11px] text-slate-400 truncate mt-0.5">{cat.descricao}</p>
        )}
      </div>

      {/* ações */}
      {podeEditar && (
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => onEdit(cat)}
            title="Editar"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
          >
            <IconPencil />
          </button>
          <button
            type="button"
            onClick={() => onDelete(cat.id)}
            title="Excluir"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          >
            <IconTrash />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Seção de lista (desktop) ────────────────────────────────────────────────
function SecaoLista({ titulo, tipo, lista, onEdit, onDelete, podeEditar, onNova }) {
  const isReceita = tipo === 'receita';
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* cabeçalho */}
      <div className={`px-5 py-4 flex items-center justify-between border-b
        ${isReceita ? 'border-emerald-100 bg-gradient-to-r from-emerald-600 to-emerald-500' : 'border-rose-100 bg-gradient-to-r from-rose-600 to-rose-500'}`}>
        <div className="flex items-center gap-2">
          <span className="text-white text-base">
            {isReceita ? <IconArrowUp /> : <IconArrowDown />}
          </span>
          <h3 className="text-sm font-black text-white tracking-wide uppercase">{titulo}</h3>
        </div>
        <span className="min-w-[28px] h-7 px-2 rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center">
          {lista.length}
        </span>
      </div>

      {/* corpo */}
      <div className="p-3 space-y-2">
        {lista.length === 0
          ? <EmptyState tipo={tipo} podeEditar={podeEditar} onNova={onNova} />
          : lista.map(cat => (
              <CategoriaCard
                key={cat.id}
                cat={cat}
                onEdit={onEdit}
                onDelete={onDelete}
                podeEditar={podeEditar}
              />
            ))
        }
      </div>
    </div>
  );
}

// ─── Modal de criação / edição ───────────────────────────────────────────────
function ModalCategoria({ aberto, editando, tipoInicial, onFechar, onSalvo, usuarioLogado }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState(tipoInicial || 'receita');
  const [salvando, setSalvando] = useState(false);

  // sincroniza quando muda o item em edição ou o tipo inicial
  useEffect(() => {
    if (editando) {
      setNome(editando.nome);
      setDescricao(editando.descricao || '');
      setTipo(editando.tipo);
    } else {
      setNome('');
      setDescricao('');
      setTipo(tipoInicial || 'receita');
    }
  }, [editando, tipoInicial, aberto]);

  if (!aberto) return null;

  const isReceita = tipo === 'receita';

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    setSalvando(true);
    const payload = { nome: nome.trim(), descricao: descricao.trim(), tipo };
    try {
      if (editando) {
        const { error } = await supabase.from('categorias_financeiras').update(payload).eq('id', editando.id);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Edição de Categoria', `Editou a categoria ${tipo}: ${nome}`);
      } else {
        const { error } = await supabase.from('categorias_financeiras').insert([payload]);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Criação de Categoria', `Criou a categoria ${tipo}: ${nome}`);
      }
      onSalvo();
      onFechar();
    } catch (err) {
      alert('Erro ao salvar categoria: ' + err.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onFechar(); }}
    >
      {/* sheet */}
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">

        {/* handle mobile */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        {/* header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b
          ${isReceita ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}>
          <div>
            <h3 className="text-base font-black text-slate-800">
              {editando ? 'Editar Categoria' : 'Nova Categoria'}
            </h3>
            <p className={`text-[11px] font-bold mt-0.5 ${isReceita ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isReceita ? '↑ Receita (Entrada)' : '↓ Despesa (Saída)'}
            </p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <IconX />
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSalvar} className="p-6 space-y-4">

          {/* tipo — pill toggle */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setTipo('receita')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-black transition-all
                ${tipo === 'receita'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'text-slate-500 hover:text-emerald-600'}`}
            >
              <IconArrowUp /> Receita
            </button>
            <button
              type="button"
              onClick={() => setTipo('despesa')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-black transition-all
                ${tipo === 'despesa'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                  : 'text-slate-500 hover:text-rose-600'}`}
            >
              <IconArrowDown /> Despesa
            </button>
          </div>

          {/* nome */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Nome <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder={isReceita ? 'Ex: Dízimos, Ofertas, Doações...' : 'Ex: Aluguel, Energia, Eventos...'}
              value={nome}
              onChange={e => setNome(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm font-medium bg-white outline-none transition
                focus:ring-2 ${isReceita ? 'border-slate-200 focus:border-emerald-400 focus:ring-emerald-100' : 'border-slate-200 focus:border-rose-400 focus:ring-rose-100'}`}
            />
          </div>

          {/* descrição */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Descrição <span className="text-slate-300">(opcional)</span>
            </label>
            <input
              type="text"
              placeholder="Finalidade ou observação..."
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium bg-white outline-none transition focus:ring-2 focus:border-slate-300 focus:ring-slate-100"
            />
          </div>

          {/* ações */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando || !nome.trim()}
              className={`flex-1 py-3 rounded-xl text-sm font-black text-white transition shadow-sm active:scale-95 disabled:opacity-60
                ${isReceita ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'}`}
            >
              {salvando ? 'Salvando...' : editando ? '💾 Atualizar' : '+ Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Formulário lateral (desktop) ────────────────────────────────────────────
function FormularioLateral({ editando, onCancelarEdicao, onSalvo, usuarioLogado }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('receita');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (editando) {
      setNome(editando.nome);
      setDescricao(editando.descricao || '');
      setTipo(editando.tipo);
    } else {
      setNome(''); setDescricao(''); setTipo('receita');
    }
  }, [editando]);

  const isReceita = tipo === 'receita';

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    setSalvando(true);
    const payload = { nome: nome.trim(), descricao: descricao.trim(), tipo };
    try {
      if (editando) {
        const { error } = await supabase.from('categorias_financeiras').update(payload).eq('id', editando.id);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Edição de Categoria', `Editou a categoria ${tipo}: ${nome}`);
      } else {
        const { error } = await supabase.from('categorias_financeiras').insert([payload]);
        if (error) throw error;
        await registrarLogFinanceiro(usuarioLogado?.email, 'Criação de Categoria', `Criou a categoria ${tipo}: ${nome}`);
      }
      setNome(''); setDescricao(''); setTipo('receita');
      onCancelarEdicao();
      onSalvo();
    } catch (err) {
      alert('Erro ao salvar categoria: ' + err.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden sticky top-4">
      {/* cabeçalho colorido por tipo */}
      <div className={`px-5 py-4 border-b transition-colors duration-300
        ${isReceita ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 border-emerald-500' : 'bg-gradient-to-r from-rose-600 to-rose-500 border-rose-500'}`}>
        <h3 className="text-sm font-black text-white tracking-wide uppercase">
          {editando ? '✏️ Editando categoria' : '+ Nova Categoria'}
        </h3>
        {editando && (
          <p className="text-[11px] text-white/70 mt-0.5 truncate">{editando.nome}</p>
        )}
      </div>

      <form onSubmit={handleSalvar} className="p-5 space-y-4">
        {/* tipo — pill toggle */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button type="button" onClick={() => setTipo('receita')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-black transition-all
              ${tipo === 'receita' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' : 'text-slate-500 hover:text-emerald-600'}`}>
            <IconArrowUp /> Receita
          </button>
          <button type="button" onClick={() => setTipo('despesa')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-black transition-all
              ${tipo === 'despesa' ? 'bg-rose-600 text-white shadow-md shadow-rose-200' : 'text-slate-500 hover:text-rose-600'}`}>
            <IconArrowDown /> Despesa
          </button>
        </div>

        {/* nome */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Nome <span className="text-rose-500">*</span>
          </label>
          <input
            type="text" required
            placeholder={isReceita ? 'Ex: Dízimos, Doações...' : 'Ex: Aluguel, Eventos...'}
            value={nome} onChange={e => setNome(e.target.value)}
            className={`w-full px-3 py-2.5 border rounded-xl text-sm font-medium bg-white outline-none transition
              focus:ring-2 ${isReceita ? 'border-slate-200 focus:border-emerald-400 focus:ring-emerald-100' : 'border-slate-200 focus:border-rose-400 focus:ring-rose-100'}`}
          />
        </div>

        {/* descrição */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Descrição <span className="text-slate-300 normal-case">(opcional)</span>
          </label>
          <input
            type="text" placeholder="Finalidade ou observação..."
            value={descricao} onChange={e => setDescricao(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium bg-white outline-none focus:ring-2 focus:ring-slate-100 transition"
          />
        </div>

        {/* botões */}
        <div className="space-y-2 pt-1">
          <button type="submit" disabled={salvando || !nome.trim()}
            className={`w-full py-2.5 rounded-xl text-sm font-black text-white transition shadow-sm active:scale-95 disabled:opacity-60
              ${isReceita ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>
            {salvando ? 'Salvando...' : editando ? '💾 Atualizar' : '+ Adicionar'}
          </button>
          {editando && (
            <button type="button"
              onClick={() => { onCancelarEdicao(); setNome(''); setDescricao(''); setTipo('receita'); }}
              className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition cursor-pointer">
              Cancelar edição
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function CategoriasFinanceiras({ usuarioLogado, membroLogado, hasAccess, onVoltar }) {
  const podeEditar = hasAccess('Financeiro', 'Categorias', 'editar');

  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editandoDesktop, setEditandoDesktop] = useState(null);

  // modal mobile
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEditando, setModalEditando] = useState(null);
  const [modalTipoInicial, setModalTipoInicial] = useState('receita');

  // aba mobile
  const [abaMobile, setAbaMobile] = useState('receita');

  const carregarCategorias = useCallback(async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from('categorias_financeiras')
      .select('*')
      .order('nome');
    if (error) console.error('Erro ao carregar categorias:', error.message);
    if (data) setCategorias(data);
    setCarregando(false);
  }, []);

  useEffect(() => { carregarCategorias(); }, [carregarCategorias]);

  const removerCategoria = async (id) => {
    if (!(await window.confirmModal('Excluir Categoria', 'Excluir esta categoria permanentemente?'))) return;
    try {
      const cat = categorias.find(c => c.id === id);
      const { error } = await supabase.from('categorias_financeiras').delete().eq('id', id);
      if (error) throw error;
      await registrarLogFinanceiro(usuarioLogado?.email, 'Exclusão de Categoria', `Removeu a categoria: ${cat?.nome} (${cat?.tipo})`);
      carregarCategorias();
    } catch (err) {
      alert('Erro ao excluir categoria: ' + err.message);
    }
  };

  // edição desktop: preenche formulário lateral
  const abrirEdicaoDesktop = (cat) => {
    setEditandoDesktop(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // edição mobile: abre modal
  const abrirEdicaoMobile = (cat) => {
    setModalEditando(cat);
    setModalTipoInicial(cat.tipo);
    setModalAberto(true);
  };

  // nova categoria mobile
  const abrirNovaMobile = (tipo = abaMobile) => {
    setModalEditando(null);
    setModalTipoInicial(tipo);
    setModalAberto(true);
  };

  const receitas = categorias.filter(c => c.tipo === 'receita');
  const despesas = categorias.filter(c => c.tipo === 'despesa');

  return (
    <div className="space-y-4">
      <div className="print:hidden mx-[3px] sm:mx-0">
        <PageHeader
          titulo="Categorias Financeiras"
          breadcrumb={['Resumo', 'Categorias']}
          onNavigate={onVoltar}
        />
      </div>

      {/* ── DESKTOP ─────────────────────────────────────────────────────────── */}
      <div className={`hidden md:grid gap-6 items-start ${podeEditar ? 'grid-cols-[300px_1fr]' : 'grid-cols-1'}`}>

        {/* formulário lateral */}
        {podeEditar && (
          <FormularioLateral
            editando={editandoDesktop}
            onCancelarEdicao={() => setEditandoDesktop(null)}
            onSalvo={carregarCategorias}
            usuarioLogado={usuarioLogado}
          />
        )}

        {/* listas */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {carregando
            ? <div className="col-span-2 py-20 text-center text-sm text-slate-400">Carregando categorias...</div>
            : <>
                <SecaoLista
                  titulo="Receitas" tipo="receita" lista={receitas}
                  onEdit={abrirEdicaoDesktop} onDelete={removerCategoria}
                  podeEditar={podeEditar}
                  onNova={(t) => { setEditandoDesktop(null); /* foco no form */ }}
                />
                <SecaoLista
                  titulo="Despesas" tipo="despesa" lista={despesas}
                  onEdit={abrirEdicaoDesktop} onDelete={removerCategoria}
                  podeEditar={podeEditar}
                  onNova={() => { setEditandoDesktop(null); }}
                />
              </>
          }
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────────── */}
      <div className="md:hidden space-y-4">

        {/* pill seletor de aba */}
        <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-sm">
          {[
            { id: 'receita', label: 'Receitas', count: receitas.length },
            { id: 'despesa', label: 'Despesas', count: despesas.length },
          ].map(({ id, label, count }) => (
            <button
              key={id}
              type="button"
              onClick={() => setAbaMobile(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                ${abaMobile === id
                  ? id === 'receita'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                    : 'bg-rose-600 text-white shadow-lg shadow-rose-100'
                  : 'text-slate-400 hover:text-slate-600'}`}
            >
              {id === 'receita' ? <IconArrowUp /> : <IconArrowDown />}
              {label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black
                ${abaMobile === id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* lista da aba ativa */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {carregando ? (
            <div className="py-16 text-center text-sm text-slate-400">Carregando...</div>
          ) : (
            <div className="p-3 space-y-2">
              {(abaMobile === 'receita' ? receitas : despesas).length === 0
                ? <EmptyState tipo={abaMobile} podeEditar={podeEditar} onNova={abrirNovaMobile} />
                : (abaMobile === 'receita' ? receitas : despesas).map(cat => (
                    <CategoriaCard
                      key={cat.id}
                      cat={cat}
                      onEdit={abrirEdicaoMobile}
                      onDelete={removerCategoria}
                      podeEditar={podeEditar}
                    />
                  ))
              }
            </div>
          )}
        </div>
      </div>

      {/* ── FAB mobile ───────────────────────────────────────────────────────── */}
      {podeEditar && (
        <button
          type="button"
          onClick={() => abrirNovaMobile()}
          className={`md:hidden fixed bottom-6 right-5 z-50 flex items-center gap-2 px-5 py-3.5 rounded-2xl shadow-xl font-black text-sm text-white transition-all active:scale-95
            ${abaMobile === 'receita'
              ? 'bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700'
              : 'bg-rose-600 shadow-rose-200 hover:bg-rose-700'}`}
        >
          <IconPlus size={18} />
          Nova Categoria
        </button>
      )}

      {/* ── Modal (mobile + possível desktop) ────────────────────────────────── */}
      <ModalCategoria
        aberto={modalAberto}
        editando={modalEditando}
        tipoInicial={modalTipoInicial}
        onFechar={() => { setModalAberto(false); setModalEditando(null); }}
        onSalvo={carregarCategorias}
        usuarioLogado={usuarioLogado}
      />
    </div>
  );
}