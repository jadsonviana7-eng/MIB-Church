import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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

    </div>
  );
}