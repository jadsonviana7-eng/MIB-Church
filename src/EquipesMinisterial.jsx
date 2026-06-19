import { useEffect, useState } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { ministeriosService } from './services/ministeriosService';

export default function EquipesMinisterial() {
  const [ministerios, setMinisterios] = useState([]);
  const [ministerioSelecionado, setMinisterioSelecionado] = useState(null);
  const [membros, setMembros] = useState([]);
  const [pessoas, setPessoas] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState('');
  const [funcao, setFuncao] = useState('');
  const [lider, setLider] = useState(false);

  useEffect(() => {
    carregarMinisterios();
    carregarPessoas();
  }, []);

  async function carregarMinisterios() {
    try {
      const data = await ministeriosService.listarMinisterios();

      setMinisterios(data);

      if (data.length > 0) {
        selecionarMinisterio(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function carregarPessoas() {
    try {
      const data = await ministeriosService.listarPessoas();
      setPessoas(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function selecionarMinisterio(ministerio) {
    setMinisterioSelecionado(ministerio);

    try {
      const data = await ministeriosService.listarMembros(ministerio.id);
      setMembros(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function adicionarMembro() {
    if (!pessoaSelecionada) return;

    try {
      await ministeriosService.adicionarMembro({
        ministerio_id: ministerioSelecionado.id,
        pessoa_id: pessoaSelecionada,
        funcao,
        lider
      });

      setShowModal(false);
      setPessoaSelecionada('');
      setFuncao('');
      setLider(false);

      selecionarMinisterio(ministerioSelecionado);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function removerMembro(id) {
    const confirmar = window.confirm(
      'Deseja remover este membro do ministério?'
    );

    if (!confirmar) return;

    try {
      await ministeriosService.removerMembro(id);

      selecionarMinisterio(ministerioSelecionado);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar */}

      <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users size={18} />
          <h2 className="font-semibold">Ministérios</h2>
        </div>

        <div className="space-y-2">
          {ministerios.map((ministerio) => (
            <button
              key={ministerio.id}
              onClick={() => selecionarMinisterio(ministerio)}
              className={`w-full text-left p-3 rounded-lg transition ${
                ministerioSelecionado?.id === ministerio.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {ministerio.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}

      <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow p-6">
        {ministerioSelecionado && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {ministerioSelecionado.nome}
                </h2>

                <p className="text-sm text-gray-500">
                  {membros.length} membros vinculados
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <Plus size={16} />
                Adicionar Membro
              </button>
            </div>

            <div className="space-y-3">
              {membros.map((membro) => (
                <div
                  key={membro.id}
                  className="flex justify-between items-center border rounded-xl p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        membro.pessoas?.foto_url ||
                        'https://ui-avatars.com/api/?name=' +
                          encodeURIComponent(
                            membro.pessoas?.nome || 'Membro'
                          )
                      }
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-medium">
                        {membro.pessoas?.nome}
                      </p>

                      <p className="text-sm text-gray-500">
                        {membro.funcao || 'Sem função'}
                      </p>

                      {membro.lider && (
                        <span className="text-xs text-blue-600 font-semibold">
                          Líder
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => removerMembro(membro.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Adicionar Membro
            </h3>

            <div className="space-y-4">
              <select
                value={pessoaSelecionada}
                onChange={(e) =>
                  setPessoaSelecionada(e.target.value)
                }
                className="w-full border rounded-lg p-2"
              >
                <option value="">
                  Selecione uma pessoa
                </option>

                {pessoas.map((pessoa) => (
                  <option
                    key={pessoa.id}
                    value={pessoa.id}
                  >
                    {pessoa.nome}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Função"
                value={funcao}
                onChange={(e) =>
                  setFuncao(e.target.value)
                }
                className="w-full border rounded-lg p-2"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={lider}
                  onChange={(e) =>
                    setLider(e.target.checked)
                  }
                />

                Líder do Ministério
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={adicionarMembro}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}