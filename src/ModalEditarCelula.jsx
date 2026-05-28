import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { uploadImagemCelula } from './ui'; // Importar a função de upload

export default function ModalEditarCelula({ celula, onFechar, onSalvo }) {
  const [nome, setNome] = useState(celula.nome || '');
  const [dataAbertura, setDataAbertura] = useState(celula.data_abertura || '');
  const [liderId, setLiderId] = useState(celula.lider_id || '');
  const [coLiderId, setCoLiderId] = useState(celula.co_lider_id || '');
  const [auxiliarId, setAuxiliarId] = useState(celula.auxiliar_id || '');
  const [diaSemana, setDiaSemana] = useState(celula.dia_semana || '');
  const [horario, setHorario] = useState(celula.horario || '');
  const [faixaEtaria, setFaixaEtaria] = useState(celula.faixa_etaria || '');
  const [genero, setGenero] = useState(celula.genero || 'Mista');
  const [celulaMaeId, setCelulaMaeId] = useState(celula.celula_mae_id || '');
  const [endereco, setEndereco] = useState(celula.endereco || '');
  const [bairro, setBairro] = useState(celula.bairro || '');
  const [numero, setNumero] = useState(celula.numero || '');
  const [zonaId, setZonaId] = useState(celula.zona_id || '');
  const [anotacoes, setAnotacoes] = useState(celula.anotacoes || '');
  const [arquivoImagem, setArquivoImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState(celula.imagem_url || '');

  const [pessoasPossiveis, setPessoasPossiveis] = useState([]);
  const [celulasExistentes, setCelulasExistentes] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
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
        .neq('id', celula.id)
        .order('nome');
      if (celulas) setCelulasExistentes(celulas);
    }
    carregar();
  }, [celula.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) return;
    setSalvando(true);
    setErro('');

    try {
      let imagemUrl = celula.imagem_url || null;
      if (arquivoImagem) {
        imagemUrl = await uploadImagemCelula(arquivoImagem, celula.id);
      }

      const { error } = await supabase
        .from('celulas')
        .update({
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
          endereco: endereco || null,
          bairro: bairro || null,
          numero: numero || null,
          zona_id: zonaId || null,
          anotacoes: anotacoes || null,
          imagem_url: imagemUrl,
        })
        .eq('id', celula.id);

      if (error) throw error;

      if (onSalvo) await onSalvo();
      onFechar();
    } catch (err) {
      setErro(`Erro ao salvar: ${err.message}`);
    } finally {
      setSalvando(false);
    }
  }

  const inputCls = 'w-full px-3 py-2 border border-slate-200 rounded-xl text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#055F6D]/30 focus:border-[#055F6D]';
  const labelCls = 'block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#055F6D]/5 to-transparent shrink-0">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Editar Célula</h3>
            <p className="text-xs text-slate-400 mt-0.5">Atualize os dados da célula <span className="text-[#055F6D] font-semibold">{celula.nome}</span></p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-5">

            {/* Imagem + Nome */}
            <div className="flex gap-4 items-start">
              <div className="shrink-0">
                {previewImagem ? (
                  <img
                    src={previewImagem}
                    alt="Preview"
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-[#055F6D]/10 text-[#055F6D] flex items-center justify-center text-2xl">
                    ⛺
                  </div>
                )}
                <label className="mt-2 block text-center text-[10px] font-medium text-[#055F6D] cursor-pointer hover:underline">
                  Trocar foto
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
              </div>
              <div className="flex-1">
                <label className={labelCls}>Nome da Célula *</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={inputCls}
                  placeholder="Ex: Célula Videira..."
                />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Data de Abertura</label>
                    <input type="date" value={dataAbertura} onChange={(e) => setDataAbertura(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Célula Mãe</label>
                    <select value={celulaMaeId} onChange={(e) => setCelulaMaeId(e.target.value)} className={inputCls}>
                      <option value="">Sem célula mãe</option>
                      {celulasExistentes.map((c) => (
                        <option key={c.id} value={c.id}>{c.nome}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Liderança */}
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Equipe de Liderança</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Líder Principal</label>
                  <select value={liderId} onChange={(e) => setLiderId(e.target.value)} className={inputCls}>
                    <option value="">-- Selecione --</option>
                    {pessoasPossiveis.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Co-Líder</label>
                  <select value={coLiderId} onChange={(e) => setCoLiderId(e.target.value)} className={inputCls}>
                    <option value="">-- Opcional --</option>
                    {pessoasPossiveis.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Auxiliar</label>
                  <select value={auxiliarId} onChange={(e) => setAuxiliarId(e.target.value)} className={inputCls}>
                    <option value="">-- Opcional --</option>
                    {pessoasPossiveis.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Perfil */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className={labelCls}>Faixa Etária</label>
                <select value={faixaEtaria} onChange={(e) => setFaixaEtaria(e.target.value)} className={inputCls}>
                  <option value="">Selecione</option>
                  <option value="Criancas">Crianças</option>
                  <option value="Adolescentes">Adolescentes</option>
                  <option value="Jovens">Jovens</option>
                  <option value="Adultos">Adultos</option>
                  <option value="Mista">Mista</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Gênero</label>
                <select value={genero} onChange={(e) => setGenero(e.target.value)} className={inputCls}>
                  <option value="Mista">Mista</option>
                  <option value="Masculina">Masculina</option>
                  <option value="Feminina">Feminina</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Dia da Reunião</label>
                <select value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)} className={inputCls}>
                  <option value="">Selecione</option>
                  {['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado','Domingo'].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Horário</label>
                <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* Localização */}
            <div>
              <label className={labelCls}>Região / Zona Geográfica</label>
              <select value={zonaId} onChange={(e) => setZonaId(e.target.value)} className={inputCls}>
                <option value="">-- Selecione a Região --</option>
                {zonas.map((z) => <option key={z.id} value={z.id}>{z.nome}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className={labelCls}>Endereço</label>
                <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className={inputCls} placeholder="Rua, Av..." />
              </div>
              <div>
                <label className={labelCls}>Número</label>
                <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Bairro</label>
              <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>Anotações Pastorais</label>
              <textarea
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
                rows={3}
                className={inputCls}
                placeholder="Observações, contexto da célula, histórico..."
              />
            </div>

            {erro && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold">
                {erro}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onFechar}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando || !nome.trim()}
              className="px-5 py-2 rounded-xl bg-[#055F6D] hover:bg-[#044a56] text-white text-xs font-semibold disabled:opacity-50 transition shadow-sm"
            >
              {salvando ? 'Salvando...' : '💾 Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
