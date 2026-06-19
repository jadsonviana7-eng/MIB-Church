import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { ministeriosService } from './services/ministeriosService';

export default function MinisteriosManager() {

  const [ministerios, setMinisterios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    icone: '🙏',
    cor_principal: '#2563eb',
    ativo: true
  });

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados =
      await ministeriosService.listarMinisterios();

    setMinisterios(dados);
  }

  async function salvar() {

    if (!form.nome.trim()) {
      alert('Informe o nome');
      return;
    }

    if (editing) {

      await ministeriosService.atualizarMinisterio(
        editing.id,
        form
      );

    } else {

      await ministeriosService.criarMinisterio(
        form
      );

    }

    fecharModal();
    carregar();
  }

  function fecharModal() {
    setModalOpen(false);
    setEditing(null);

    setForm({
      nome: '',
      descricao: '',
      icone: '🙏',
      cor_principal: '#2563eb',
      ativo: true
    });
  }

  function editar(ministerio) {

    setEditing(ministerio);

    setForm({
      nome: ministerio.nome,
      descricao: ministerio.descricao || '',
      icone: ministerio.icone || '🙏',
      cor_principal:
        ministerio.cor_principal || '#2563eb',
      ativo: ministerio.ativo
    });

    setModalOpen(true);
  }

  async function excluir(id) {

    if (
      !window.confirm(
        'Deseja excluir este ministério?'
      )
    ) {
      return;
    }

    await ministeriosService.excluirMinisterio(id);

    carregar();
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Ministérios
        </h2>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Ministério
        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

        {ministerios.map((m) => (

          <div
            key={m.id}
            className="bg-white rounded-xl shadow p-4"
          >

            <div className="flex justify-between">

              <div>

                <div className="text-3xl">
                  {m.icone}
                </div>

                <h3 className="font-semibold mt-2">
                  {m.nome}
                </h3>

                <p className="text-sm text-gray-500">
                  {m.descricao}
                </p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => editar(m)}
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => excluir(m.id)}
                >
                  <Trash2
                    size={18}
                    className="text-red-500"
                  />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Modal de Cadastro/Edição */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">
                {editing ? 'Editar Ministério' : 'Novo Ministério'}
              </h3>
              <button onClick={fecharModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nome do Ministério</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={e => setForm({ ...form, nome: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Ex: Louvor, Mídia, Kids..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ícone (Emoji)</label>
                  <input
                    type="text"
                    value={form.icone}
                    onChange={e => setForm({ ...form, icone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-center text-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cor Principal</label>
                  <input
                    type="color"
                    value={form.cor_principal}
                    onChange={e => setForm({ ...form, cor_principal: e.target.value })}
                    className="w-full h-[46px] border border-slate-200 rounded-xl p-1 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Descrição</label>
                <textarea
                  value={form.descricao}
                  onChange={e => setForm({ ...form, descricao: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none resize-none"
                  rows="3"
                  placeholder="Finalidade deste ministério..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button onClick={fecharModal} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition">
                Cancelar
              </button>
              <button onClick={salvar} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                {editing ? 'Salvar Alterações' : 'Criar Ministério'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}