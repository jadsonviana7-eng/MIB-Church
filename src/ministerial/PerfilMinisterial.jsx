import { useEffect, useState } from 'react';
import { perfilMinisterialService } from '../services/perfilMinisterialService';

export default function PerfilMinisterial({
  pessoaId
}) {

  const [pessoa, setPessoa] = useState(null);
  const [ministerios, setMinisterios] = useState([]);
  const [disponibilidade, setDisponibilidade] = useState({
    domingo: true,
    segunda: false,
    terca: false,
    quarta: false,
    quinta: true,
    sexta: false,
    sabado: true
  });

  useEffect(() => {
    if (pessoaId) {
      carregar();
    }
  }, [pessoaId]);

  async function carregar() {

    const dadosPessoa =
      await perfilMinisterialService.obterPessoa(
        pessoaId
      );

    const dadosMinisterios =
      await perfilMinisterialService.obterMinisterios(
        pessoaId
      );

    const dadosDisponibilidade =
      await perfilMinisterialService.obterDisponibilidade(
        pessoaId
      );

    setPessoa(dadosPessoa);
    setMinisterios(dadosMinisterios);

    if (dadosDisponibilidade) {
      setDisponibilidade(dadosDisponibilidade);
    }
  }

  async function salvar() {

    await perfilMinisterialService.salvarDisponibilidade({
      pessoa_id: pessoaId,
      ...disponibilidade
    });

    alert('Disponibilidade salva!');
  }

  if (!pessoa) return null;

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex gap-4 items-center">

          <img
            src={
              pessoa.foto_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                pessoa.nome
              )}`
            }
            className="w-24 h-24 rounded-full object-cover"
          />

          <div>

            <h2 className="text-2xl font-bold">
              {pessoa.nome}
            </h2>

            <p className="text-gray-500">
              {pessoa.cargo}
            </p>

            <p className="text-gray-500">
              {pessoa.telefone}
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h3 className="font-semibold mb-4">
          Ministérios
        </h3>

        <div className="flex flex-wrap gap-2">

          {ministerios.map((m) => (
            <span
              key={m.id}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-700"
            >
              {m.ministerios?.nome}
            </span>
          ))}

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h3 className="font-semibold mb-4">
          Disponibilidade
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {[
            ['domingo','Domingo'],
            ['segunda','Segunda'],
            ['terca','Terça'],
            ['quarta','Quarta'],
            ['quinta','Quinta'],
            ['sexta','Sexta'],
            ['sabado','Sábado']
          ].map(([campo,label]) => (

            <label
              key={campo}
              className="flex gap-2 items-center"
            >

              <input
                type="checkbox"
                checked={disponibilidade[campo]}
                onChange={(e) =>
                  setDisponibilidade({
                    ...disponibilidade,
                    [campo]: e.target.checked
                  })
                }
              />

              {label}

            </label>

          ))}

        </div>

        <button
          onClick={salvar}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Salvar Disponibilidade
        </button>

      </div>

    </div>
  );
}