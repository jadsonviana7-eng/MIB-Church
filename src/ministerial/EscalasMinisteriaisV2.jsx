const [eventos, setEventos] = useState([]);
const [eventoSelecionado, setEventoSelecionado] = useState(null);

const [escalas, setEscalas] = useState([]);

const [modalEvento, setModalEvento] = useState(false);
const [modalEscala, setModalEscala] = useState(false);

const [ministerios, setMinisterios] = useState([]);
const [membros, setMembros] = useState([]);
const [funcoes, setFuncoes] = useState([]);

const [novoEvento, setNovoEvento] = useState({
  titulo: '',
  descricao: '',
  local: '',
  data_evento: ''
});

const [novaEscala, setNovaEscala] = useState({
  ministerio_id: '',
  pessoa_id: '',
  funcao_id: ''
});

function statusBadge(status) {

  switch(status) {

    case 'confirmado':
      return (
        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
          Confirmado
        </span>
      );

    case 'recusado':
      return (
        <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">
          Recusado
        </span>
      );

    default:
      return (
        <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
          Pendente
        </span>
      );
  }
}

const escalasAgrupadas =
  escalas.reduce((acc, item) => {

    const ministerio =
      item.ministerios?.nome ||
      'Sem Ministério';

    if (!acc[ministerio]) {

      acc[ministerio] = [];

    }

    acc[ministerio].push(item);

    return acc;

  }, {});

  {modalEvento && (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center">

  <div className="bg-white p-6 rounded-xl w-full max-w-lg">

    <h2 className="text-xl font-bold mb-4">
      Novo Evento
    </h2>

    <div className="space-y-3">

      <input
        placeholder="Título"
        className="w-full border rounded-lg p-2"
        value={novoEvento.titulo}
        onChange={(e)=>
          setNovoEvento({
            ...novoEvento,
            titulo:e.target.value
          })
        }
      />

      <input
        type="datetime-local"
        className="w-full border rounded-lg p-2"
        value={novoEvento.data_evento}
        onChange={(e)=>
          setNovoEvento({
            ...novoEvento,
            data_evento:e.target.value
          })
        }
      />

      <input
        placeholder="Local"
        className="w-full border rounded-lg p-2"
        value={novoEvento.local}
        onChange={(e)=>
          setNovoEvento({
            ...novoEvento,
            local:e.target.value
          })
        }
      />

      <textarea
        placeholder="Descrição"
        className="w-full border rounded-lg p-2"
        value={novoEvento.descricao}
        onChange={(e)=>
          setNovoEvento({
            ...novoEvento,
            descricao:e.target.value
          })
        }
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Salvar Evento
      </button>

    </div>

  </div>

</div>

)}

{modalEscala && (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center">

  <div className="bg-white rounded-xl p-6 w-full max-w-lg">

    <h2 className="font-bold text-lg mb-4">

      Adicionar Escalado

    </h2>

    <div className="space-y-3">

      <select
        className="w-full border rounded-lg p-2"
      >
        <option>
          Ministério
        </option>
      </select>

      <select
        className="w-full border rounded-lg p-2"
      >
        <option>
          Pessoa
        </option>
      </select>

      <select
        className="w-full border rounded-lg p-2"
      >
        <option>
          Função
        </option>
      </select>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Adicionar
      </button>

    </div>

  </div>

</div>

)}

{Object.entries(escalasAgrupadas)
  .map(([ministerio, itens]) => (

<div
  key={ministerio}
  className="bg-white rounded-xl shadow p-4"
>

  <h3 className="font-bold text-lg mb-4">
    {ministerio}
  </h3>

  {itens.map((item) => (

    <div
      key={item.id}
      className="flex justify-between items-center border-b py-2"
    >

      <div>

        <p className="font-medium">
          {item.pessoas?.nome}
        </p>

        <p className="text-sm text-gray-500">
          {item.ministerio_funcoes?.nome}
        </p>

      </div>

      <div className="flex gap-2 items-center">

        {statusBadge(item.status)}

        <button
          onClick={() =>
            excluirEscala(item.id)
          }
          className="text-red-500"
        >
          Excluir
        </button>

      </div>

    </div>

  ))}

</div>

))}