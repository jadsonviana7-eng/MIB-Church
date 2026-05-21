import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { uploadImagemCelula } from './ui';

function FormularioCelula({ onCelulaCadastrada }) {
  const [nome, setNome] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [liderId, setLiderId] = useState('');
  const [coLiderId, setCoLiderId] = useState(''); // Novo
  const [auxiliarId, setAuxiliarId] = useState(''); // Novo
  const [diaSemana, setDiaSemana] = useState('');
  const [horario, setHorario] = useState('');
  const [faixaEtaria, setFaixaEtaria] = useState('');
  const [genero, setGenero] = useState('Mista');
  const [celulaMaeId, setCelulaMaeId] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [zonaId, setZonaId] = useState('');
  const [anotacoes, setAnotacoes] = useState('');
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState('');
  
  const [pessoasPossiveis, setPessoasPossiveis] = useState([]);
  const [celulasExistentes, setCelulasExistentes] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregarDadosIniciais() {
      const { data: pessoas } = await supabase
        .from('pessoas')
        .select('id, nome')
        .eq('status', 'ativo')
        .order('nome');
      if (pessoas) setPessoasPossiveis(pessoas);

      const { data: dadosZonas } = await supabase
        .from('zonas_moradia')
        .select('*')
        .order('nome');
      if (dadosZonas) setZonas(dadosZonas);

      const { data: celulas } = await supabase
        .from('celulas')
        .select('id, nome')
        .order('nome');
      if (celulas) setCelulasExistentes(celulas);
    }
    carregarDadosIniciais();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    setEnviando(true);
    setMensagem('');

    try {
      let imagemUrl = null;
      if (arquivoImagem) {
        imagemUrl = await uploadImagemCelula(arquivoImagem, `nova-${Date.now()}`);
      }

      const { error } = await supabase
        .from('celulas')
        .insert([{
          nome: nome.trim(),
          data_abertura: dataAbertura || null,
          lider_id: liderId || null,
          co_lider_id: coLiderId || null,
          auxiliar_id: auxiliarId || null,
          dia_semana: diaSemana || null,
          horario: horario || null,
          faixa_etaria: faixaEtaria || null,
          genero: genero || null,
          celula_mae_id: celulaMaeId || null,
          endereco,
          bairro,
          numero,
          zona_id: zonaId || null,
          anotacoes,
          imagem_url: imagemUrl,
        }]);

      if (error) throw error;

      setMensagem('🎉 Nova célula aberta com sucesso!');
      setNome('');
      setDataAbertura('');
      setLiderId('');
      setCoLiderId('');
      setAuxiliarId('');
      setDiaSemana('');
      setHorario('');
      setFaixaEtaria('');
      setGenero('Mista');
      setCelulaMaeId('');
      setEndereco('');
      setBairro('');
      setNumero('');
      setZonaId('');
      setAnotacoes('');
      setArquivoImagem(null);
      setPreviewImagem('');

      if (onCelulaCadastrada) onCelulaCadastrada();
    } catch (err) {
      setMensagem(`❌ Erro ao cadastrar célula: ${err.message}`);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="card max-w-xl w-full p-0 overflow-hidden">
      <div className="card-header">
        <h2 className="text-base font-semibold text-[var(--text-heading)]">Multiplicar / Criar Nova Célula</h2>
        <p className="text-[var(--text-muted)] text-xs mt-0.5">Registre a liderança e dados oficiais da nova célula.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="shrink-0">
            {previewImagem ? (
              <img src={previewImagem} alt="Preview" className="w-24 h-24 rounded-2xl object-cover border border-[var(--border)]" />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-[var(--brand-light)] text-[#055F6D] flex items-center justify-center text-2xl">⛺</div>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">Imagem da célula</label>
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border)] text-xs font-medium text-[#055F6D] cursor-pointer hover:bg-[var(--surface-muted)]">
              📷 Escolher imagem
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const arquivo = e.target.files?.[0];
                  if (!arquivo) return;
                  setArquivoImagem(arquivo);
                  setPreviewImagem(URL.createObjectURL(arquivo));
                }}
              />
            </label>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">Opcional. Ajuda a identificar a célula na lista.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">Nome da Célula</label>
          <input 
            type="text" 
            required 
            placeholder="Ex: Célula Videira..." 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Data de Abertura</label>
            <input type="date" value={dataAbertura} onChange={e => setDataAbertura(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Célula de Origem (Mãe)</label>
            <select value={celulaMaeId} onChange={e => setCelulaMaeId(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white">
              <option value="">Sem célula mãe</option>
              {celulasExistentes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
        </div>

        {/* Liderança Tripartite */}
        <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Equipe de Liderança</p>
          
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Líder Principal</label>
            <select value={liderId} onChange={e => setLiderId(e.target.value)} className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs bg-white">
              <option value="">-- Selecione o Líder --</option>
              {pessoasPossiveis.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Co-Líder</label>
            <select value={coLiderId} onChange={e => setCoLiderId(e.target.value)} className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs bg-white">
              <option value="">-- Selecione o Co-Líder (Opcional) --</option>
              {pessoasPossiveis.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Auxiliar de Célula</label>
            <select value={auxiliarId} onChange={e => setAuxiliarId(e.target.value)} className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs bg-white">
              <option value="">-- Selecione o Auxiliar (Opcional) --</option>
              {pessoasPossiveis.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Faixa Etária</label>
            <select value={faixaEtaria} onChange={e => setFaixaEtaria(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white">
              <option value="">Selecione</option>
              <option value="Criancas">Crianças</option>
              <option value="Adolescentes">Adolescentes</option>
              <option value="Jovens">Jovens</option>
              <option value="Adultos">Adultos</option>
              <option value="Mista">Mista</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Gênero</label>
            <select value={genero} onChange={e => setGenero(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white">
              <option value="Mista">Mista</option>
              <option value="Masculina">Masculina</option>
              <option value="Feminina">Feminina</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Dia da Reunião</label>
            <select value={diaSemana} onChange={e => setDiaSemana(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white">
              <option value="">Selecione o dia</option>
              <option value="Segunda-feira">Segunda-feira</option>
              <option value="Terça-feira">Terça-feira</option>
              <option value="Quarta-feira">Quarta-feira</option>
              <option value="Quinta-feira">Quinta-feira</option>
              <option value="Sexta-feira">Sexta-feira</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Horário</label>
            <input type="time" value={horario} onChange={e => setHorario(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Região / Zona Geográfica</label>
          <select value={zonaId} onChange={e => setZonaId(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white">
            <option value="">-- Selecione a Região --</option>
            {zonas.map(z => <option key={z.id} value={z.id}>{z.nome}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Endereço</label>
            <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Número</label>
            <input type="text" value={numero} onChange={e => setNumero(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Bairro</label>
          <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Anotações</label>
          <textarea value={anotacoes} onChange={e => setAnotacoes(e.target.value)} rows="3" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white" placeholder="Observações pastorais, detalhes do local ou contexto da multiplicação" />
        </div>

        <button type="submit" disabled={enviando || !nome.trim()} className="w-full btn-primary py-2.5 rounded-xl text-xs font-semibold transition disabled:opacity-50 cursor-pointer">
          {enviando ? 'Gravando...' : '⛺ Confirmar Abertura da Célula'}
        </button>
      </form>

      {mensagem && (
        <div className={`mt-4 p-3 rounded-xl text-xs font-bold text-center ${mensagem.includes('Erro') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default FormularioCelula;
