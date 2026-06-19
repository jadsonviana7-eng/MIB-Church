import { useEffect, useState } from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { escalasService } from './services/escalasService';

export default function EscalasMinisteriais() {

  const [eventos, setEventos] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [modalEvento, setModalEvento] = useState(false);
  const [novoEvento, setNovoEvento] = useState({
    titulo: '',
    descricao: '',
    local: '',
    data_evento: ''
  });
  const [salvando, setSalvando] = useState(false);

  const [escalas, setEscalas] = useState([]);

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {

    const dados =
      await escalasService.listarEventos();

    setEventos(dados);

  }

  async function selecionarEvento(evento) {

    setEventoSelecionado(evento);

    const lista =
      await escalasService.listarEscalas(
        evento.id
      );

    setEscalas(lista);

  }

  async function salvarEvento() {
    if (!novoEvento.titulo || !novoEvento.data_evento) {
      alert("Preencha o título e a data.");
      return;
    }
    setSalvando(true);
    try {
      await escalasService.criarEvento(novoEvento);
      setModalEvento(false);
      setNovoEvento({ titulo: '', descricao: '', local: '', data_evento: '' });
      carregarEventos();
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between">

        <h1 className="text-2xl font-bold">
          Escalas Ministeriais
        </h1>

        <button
          onClick={() => setModalEvento(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2"
        >
          <Plus size={18}/>
          Novo Evento
        </button>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-4">

          <h2 className="font-semibold mb-4">
            Eventos
          </h2>

          <div className="space-y-2">

            {eventos.map((evento) => (

              <button
                key={evento.id}
                onClick={() =>
                  selecionarEvento(evento)
                }
                className="w-full text-left p-3 rounded-lg border hover:bg-gray-50"
              >

                <div className="flex gap-2 items-center">

                  <Calendar size={16} />

                  <span>
                    {evento.titulo}
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        <div className="lg:col-span-2">

          <div className="bg-white rounded-xl shadow p-4">

            {eventoSelecionado ? (

              <>
                <h2 className="font-bold text-lg">

                  {eventoSelecionado.titulo}

                </h2>

                <div className="mt-4 space-y-2">

                  {escalas.map((item) => (

                    <div
                      key={item.id}
                      className="border rounded-lg p-3"
                    >

                      <p className="font-medium">
                        {item.pessoas?.nome}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.ministerios?.nome}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.ministerio_funcoes?.nome}
                      </p>

                    </div>

                  ))}

                </div>

              </>

            ) : (

              <div className="text-gray-500">

                Selecione um evento

              </div>

            )}

          </div>

        </div>

      </div>

      {/* Modal Novo Evento */}
      {modalEvento && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold">Novo Evento Ministerial</h3>
              <button onClick={() => setModalEvento(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Título</label>
                <input
                  className="w-full border rounded-xl p-2.5 text-sm"
                  value={novoEvento.titulo}
                  onChange={e => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                  placeholder="Ex: Culto de Domingo"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Data e Hora</label>
                <input
                  type="datetime-local"
                  className="w-full border rounded-xl p-2.5 text-sm"
                  value={novoEvento.data_evento}
                  onChange={e => setNovoEvento({ ...novoEvento, data_evento: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Local</label>
                <input
                  className="w-full border rounded-xl p-2.5 text-sm"
                  value={novoEvento.local}
                  onChange={e => setNovoEvento({ ...novoEvento, local: e.target.value })}
                  placeholder="Ex: Templo Principal"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Descrição</label>
                <textarea
                  className="w-full border rounded-xl p-2.5 text-sm resize-none"
                  rows="3"
                  value={novoEvento.descricao}
                  onChange={e => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                  placeholder="Detalhes sobre o evento, observações para a equipe..."
                />
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex gap-3">
              <button onClick={() => setModalEvento(false)} className="flex-1 py-2.5 border rounded-xl font-bold text-xs">Cancelar</button>
              <button onClick={salvarEvento} disabled={salvando} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-blue-100">
                {salvando ? 'Salvando...' : 'Salvar Evento'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}