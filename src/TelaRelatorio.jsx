import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function TelaRelatorio() {
  const [celulas, setCelulas] = useState([]);
  const [celulaSelecionada, setCelulaSelecionada] = useState('');
  const [membros, setMembros] = useState([]);
  const [presencas, setPresencas] = useState({});
  const [dataReuniao, setDataReuniao] = useState(new Date().toISOString().split('T')[0]);
  const [visitantes, setVisitantes] = useState(0);
  const [oferta, setOferta] = useState(0);
  const [obs, setObs] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [comprovanteFile, setComprovanteFile] = useState(null);

  useEffect(() => {
    async function carregarCelulas() {
      const { data } = await supabase.from('celulas').select('*').order('nome');
      if (data) setCelulas(data);
    }
    carregarCelulas();
  }, []);

  useEffect(() => {
    async function carregarMembrosDaCelula() {
      if (!celulaSelecionada) {
        setMembros([]);
        return;
      }
      const { data } = await supabase.from('pessoas').select('id, nome').eq('celula_id', celulaSelecionada).eq('status', 'ativo');
      if (data) {
        setMembros(data);
        const listaInicial = {};
        data.forEach(m => listaInicial[m.id] = true);
        setPresencas(listaInicial);
      }
    }
    carregarMembrosDaCelula();
  }, [celulaSelecionada]);

  const alternarPresenca = (id) => {
    setPresencas(anterior => ({ ...anterior, [id]: !anterior[id] }));
  };

  async function enviarRelatorio(e) {
    e.preventDefault();
    if (!celulaSelecionada) return;
    setEnviando(true);
    setMensagem('');

    try {
      const { data: relatorioCriado, error: erroRelatorio } = await supabase
        .from('relatorios_celula')
        .insert([{ celula_id: celulaSelecionada, data_reuniao: dataReuniao, visitantes_presentes: Number(visitantes), oferta: Number(oferta), observacoes: obs }])
        .select().single();

      if (erroRelatorio) throw erroRelatorio;

      const idsPresentes = Object.keys(presencas).filter(id => presencas[id] === true);
      if (idsPresentes.length > 0) {
        const dadosPresenca = idsPresentes.map(idPessoa => ({ relatorio_id: relatorioCriado.id, pessoa_id: idPessoa }));
        const { error: erroPresenca } = await supabase.from('presencas_relatorio').insert(dadosPresenca);
        if (erroPresenca) throw erroPresenca;
      }

      setMensagem('🎉 Relatório enviado com sucesso!');
      setCelulaSelecionada(''); setVisitantes(0); setOferta(0); setObs('');
    } catch (error) {
      setMensagem(`❌ Erro: ${error.message}`);
    } finally {
      setEnviando(false);
    }
  }

  return (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-xl w-full">
    <h2 className="text-xl font-bold text-slate-800 mb-5">Lançar Encontro de Célula</h2>
    
    <form onSubmit={enviarRelatorio} className="space-y-5">
      {/* Seleção da Célula */}
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">Qual é a Célula?</label>
        <select 
          value={celulaSelecionada} 
          onChange={e => setCelulaSelecionada(e.target.value)} 
          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800 text-sm"
        >
          <option value="">-- Selecione a Célula --</option>
          {celulas.map(c => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
      </div>

      {/* Lista de Presença de Membros */}
      {membros.length > 0 && (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <h4 className="text-sm font-bold text-slate-700 mb-3">Lista de Presença:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {membros.map(m => (
              <button
                type="button"
                key={m.id}
                onClick={() => alternarPresenca(m.id)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left text-sm font-medium transition duration-150 ${
                  presencas[m.id] 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                    : 'bg-white border-slate-200 text-slate-500 line-through decoration-slate-300'
                }`}
              >
                {m.nome}
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold ${presencas[m.id] ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  {presencas[m.id] ? '✓' : ''}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid de Informações: Data, Visitantes e Oferta */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Data</label>
          <input 
            type="date" 
            value={dataReuniao} 
            onChange={e => setDataReuniao(e.target.value)} 
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Nº Visitantes</label>
          <input 
            type="number" 
            min="0" 
            value={visitantes} 
            onChange={e => setVisitantes(e.target.value)} 
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Oferta (R$)</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 text-sm">R$</span>
            <input 
              type="number" 
              step="0.01" 
              min="0" 
              value={oferta} 
              onChange={e => setOferta(e.target.value)} 
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800" 
              placeholder="0,00"
            />
          </div>
        </div>
      </div>

      {/* Upload de Comprovante */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
        <div>
          <span className="block text-xs font-bold text-slate-700">Comprovante do Pix/Depósito</span>
          <span className="text-[11px] text-slate-400">
            {comprovanteFile ? `Arquivo: ${comprovanteFile.name}` : "Anexe a foto do recibo da oferta"}
          </span>
        </div>
        <label className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer shadow-sm transition">
          {comprovanteFile ? "✓ Modificar" : "📎 Anexar"}
          <input 
            type="file" 
            accept="image/*,application/pdf" 
            onChange={e => setComprovanteFile(e.target.files[0])} 
            className="hidden" 
          />
        </label>
      </div>

      {/* Observações */}
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">Observações / Testemunhos</label>
        <textarea 
          value={obs} 
          onChange={e => setObs(e.target.value)} 
          rows="3" 
          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500" 
          placeholder="Escreva como foi o mover de Deus na célula..."
        />
      </div>

      {/* Botão de Envio */}
      <button 
        type="submit" 
        disabled={enviando || !celulaSelecionada} 
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 disabled:bg-slate-300 text-sm shadow-sm shadow-emerald-200 cursor-pointer disabled:cursor-not-allowed"
      >
        {enviando ? 'Enviando...' : 'Concluir e Enviar Relatório'}
      </button>
    </form>

    {/* Mensagem de Feedback */}
    {mensagem && (
      <div className={`mt-4 p-3 rounded-xl text-sm font-medium text-center ${mensagem.includes('❌') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
        {mensagem}
      </div>
    )}
  </div>
);
}

export default TelaRelatorio;