import { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from './supabaseClient';
import { uploadImagemCelula } from './ui'; // Importar a função de upload
import {
  mascaraCPF,
  mascaraTelefone,
  mascaraCEP,
  mascaraDataBR,
  dataBRparaISO,
  desmascararCPF,
  desmascararTelefone,
  desmascararCEP,
} from './mascaras';

function FormularioCadastro({ onPessoaCadastrada, listaPessoasExistentes = [], cargosLista = [], atuacoesLista = [] }) {
  const [secaoAtual, setSecaoAtual] = useState('pessoal');

  // Dados Pessoais
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('Solteiro(a)');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [profissao, setProfissao] = useState('');
  
  // Estados para Upload e Recorte da Foto
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [mostrarCortador, setMostrarCortador] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fotoFinalBlob, setFotoFinalBlob] = useState(null);

  // Contatos e Endereço
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  // Vida Espiritual e Igreja
  const [cargo, setcargo] = useState('Membro');
  const [celulaId, setCelulaId] = useState('');
  const [zonaId, setZonaId] = useState('');
  const [status, setStatus] = useState('ativo');
  const [dataConversao, setDataConversao] = useState('');
  const [dataBatismo, setDataBatismo] = useState('');
  const [batizadoAguas, setBatizadoAguas] = useState(false);
  const [atuacao, setAtuacao] = useState('');
  const [criarAcesso, setCriarAcesso] = useState(false);
  const [permissaoAcesso, setPermissaoAcesso] = useState('membro');
  const [senhaAcesso, setSenhaAcesso] = useState('');
  const [confirmarSenhaAcesso, setConfirmarSenhaAcesso] = useState('');

  // Estrutura de Família (Filhos)
  const [conjugeId, setConjugeId] = useState('');
  const [filhosSelecionados, setFilhosSelecionados] = useState([]);
  const [filtroBuscaFilho, setFiltroBuscaFilho] = useState('');

  // Carregamento de Auxiliares do Supabase
  const [celulasExistentes, setCelulasExistentes] = useState([]);
  const [zonasExistentes, setZonasExistentes] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregarDadosAuxiliares() {
      try {
        const { data: c, error: erroCelulas } = await supabase.from('celulas').select('id, nome');
        if (erroCelulas) console.warn('Tabela "celulas" não encontrada. Veja DATABASE_SCHEMA.md');
        if (c) setCelulasExistentes(c);
        
        const { data: z, error: erroZonas } = await supabase.from('zonas_moradia').select('id, nome');
        if (erroZonas) console.warn('Tabela "zonas_moradia" não encontrada. Veja DATABASE_SCHEMA.md');
        if (z) setZonasExistentes(z);
      } catch (err) {
        console.error('Erro ao carregar dados auxiliares:', err);
      }
    }
    carregarDadosAuxiliares();
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setMostrarCortador(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const criarImagemRecortada = async () => {
    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob((blob) => {
        if (!blob) return;
        setFotoFinalBlob(blob);
        setPreviewUrl(URL.createObjectURL(blob));
        setMostrarCortador(false);
      }, 'image/jpeg');
    } catch (e) {
      console.error('Erro ao recortar imagem:', e);
    }
  };

  async function handleSalvarFichaCompleta(e) {
    e.preventDefault();
    if (!nome.trim()) { alert('Por favor, informe o nome do membro.'); return; }
    if (criarAcesso && !email.trim()) { alert('Informe o e-mail para criar o acesso do membro.'); setSecaoAtual('endereco'); return; }
    if (criarAcesso && senhaAcesso.length < 6) { alert('A senha de acesso deve ter ao menos 6 caracteres.'); return; }
    if (criarAcesso && senhaAcesso !== confirmarSenhaAcesso) { alert('As senhas de acesso não coincidem.'); return; }
    setEnviando(true);

    let urlFotoPublica = '';

    if (fotoFinalBlob) {
      try {
        urlFotoPublica = await uploadImagemCelula(fotoFinalBlob, `membro-novo-${Date.now()}`); // Usar a função de upload
      } catch (error) {
        console.error('Erro ao fazer upload da foto:', error);
      }
    }

    const payload = {
      nome: nome.trim(),
      genero,
      data_nascimento: dataBRparaISO(dataNascimento),
      estado_civil: estadoCivil,
      cpf: desmascararCPF(cpf),
      rg: rg.trim() || null,
      escolaridade,
      profissao,
      foto_url: urlFotoPublica,
      email: email.trim() || null,
      telefone: desmascararTelefone(telefone),
      cep: desmascararCEP(cep),
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      cargo: cargo,
      celula_id: celulaId || null,
      zona_id: zonaId || null,
      status,
      data_conversao: dataBRparaISO(dataConversao),
      data_batismo: dataBRparaISO(dataBatismo),
      batizado_aguas: batizadoAguas,
      conjuge_id: conjugeId || null,
      atuacao: atuacao.trim() || null,
      permissao: criarAcesso ? permissaoAcesso : null,
    };

    const { data: novaPessoa, error } = await supabase.from('pessoas').insert([payload]).select();

    if (error) {
      setMensagem('❌ Erro de salvamento: ' + error.message);
    } else {
      const pessoaCriada = novaPessoa?.[0];
      if (novaPessoa && novaPessoa.length > 0 && filhosSelecionados.length > 0) {
        const paiOuMaeId = pessoaCriada.id;
        const vinculosFilhos = filhosSelecionados.map(filhoId => ({
          id_pai_mae: paiOuMaeId,
          id_filho: filhoId
        }));
        await supabase.from('relacoes_familiares').insert(vinculosFilhos);
      }
      if (criarAcesso && pessoaCriada) {
        const { error: erroAcesso } = await supabase.functions.invoke('criar-usuario-membro', {
          body: {
            pessoaId: pessoaCriada.id,
            nome: pessoaCriada.nome,
            email: email.trim().toLowerCase(),
            senha: senhaAcesso,
            permissao: permissaoAcesso,
          },
        });

        if (erroAcesso) {
          setMensagem(`Cadastro salvo, mas o acesso não foi criado: ${erroAcesso.message}`);
          setEnviando(false);
          return;
        }
      }

      setMensagem(criarAcesso ? 'Cadastro e acesso criados com sucesso!' : 'Cadastro realizado com sucesso!');
      setTimeout(() => onPessoaCadastrada(), 1500);
    }
    setEnviando(false);
  }

  function gerenciarFilho(id) {
    if (filhosSelecionados.includes(id)) {
      setFilhosSelecionados(filhosSelecionados.filter(fId => fId !== id));
    } else {
      setFilhosSelecionados([...filhosSelecionados, id]);
    }
  }

  const pessoasFiltradasParaFilhos = listaPessoasExistentes.filter(p => 
    p.nome.toLowerCase().includes(filtroBuscaFilho.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative">
      
      {mostrarCortador && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Ajustar e Enquadrar Rosto</h3>
              <p className="text-[11px] text-slate-400">Arraste e aproxime para centralizar bem o rosto no círculo</p>
            </div>
            <div className="relative h-64 w-full bg-slate-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="p-4 bg-slate-50 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Zoom</span>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setMostrarCortador(false)} className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition">Cancelar</button>
                <button type="button" onClick={criarImagemRecortada} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm">Confirmar Ajuste</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex border-b border-slate-100 mb-5 gap-2 pb-1 overflow-x-auto">
        <button type="button" onClick={() => setSecaoAtual('pessoal')} className={`text-xs font-bold pb-2 px-1 transition shrink-0 ${secaoAtual === 'pessoal' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>1. Dados Pessoais</button>
        <button type="button" onClick={() => setSecaoAtual('endereco')} className={`text-xs font-bold pb-2 px-1 transition shrink-0 ${secaoAtual === 'endereco' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>2. Endereço</button>
        <button type="button" onClick={() => setSecaoAtual('igreja')} className={`text-xs font-bold pb-2 px-1 transition shrink-0 ${secaoAtual === 'igreja' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>3. Na Igreja</button>
        <button type="button" onClick={() => setSecaoAtual('familia')} className={`text-xs font-bold pb-2 px-1 transition shrink-0 ${secaoAtual === 'familia' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>4. Família / Filhos</button>
      </div>

      <form onSubmit={handleSalvarFichaCompleta} className="space-y-4">
        
        {secaoAtual === 'pessoal' && (
          <div className="space-y-4 animation-fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center border border-slate-200 overflow-hidden shrink-0">
                {previewUrl ? <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-xl">👤</span>}
              </div>
              <div className="flex-1 w-full text-center sm:text-left">
                <label className="block text-xs font-bold text-slate-700 mb-1">Foto Perfil (Foco no Rosto)</label>
                <input type="file" accept="image/*" onChange={onFileChange} className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Nome Completo</label>
              <input type="text" required value={nome} onChange={e => setNome(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Gênero</label>
                <select value={genero} onChange={e => setGenero(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Data Nascimento</label>
                <input type="text" placeholder="DD/MM/AAAA" value={dataNascimento} onChange={e => setDataNascimento(mascaraDataBR(e.target.value))} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Estado Civil</label>
                <select value={estadoCivil} onChange={e => setEstadoCivil(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viuvo(a)">Viúvo(a)</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Profissão</label>
                <input type="text" value={profissao} onChange={e => setProfissao(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">CPF</label>
                <input type="text" placeholder="000.000.000-00" value={cpf} onChange={e => setCpf(mascaraCPF(e.target.value))} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">RG / Órgão Emissor</label>
                <input type="text" value={rg} onChange={e => setRg(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Escolaridade</label>
              <select value={escolaridade} onChange={e => setEscolaridade(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                <option value="">Selecione</option>
                <option value="Ensino Fundamental">Ensino Fundamental</option>
                <option value="Ensino Medio">Ensino Medio</option>
                <option value="Ensino Superior">Ensino Superior</option>
                <option value="Pos-graduacao">Pos-graduacao</option>
                <option value="Mestrado/Doutorado">Mestrado/Doutorado</option>
              </select>
            </div>
          </div>
        )}

        {secaoAtual === 'endereco' && (
          <div className="space-y-4 animation-fade-in">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block text-xs font-semibold text-slate-500 mb-1">CEP</label>
                <input type="text" placeholder="00000-000" value={cep} onChange={e => setCep(mascaraCEP(e.target.value))} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Logradouro / Endereço</label>
                <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Número</label>
                <input type="text" value={numero} onChange={e => setNumero(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Bairro</label>
                <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Cidade</label>
                <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Estado / UF</label>
              <input type="text" value={estado} onChange={e => setEstado(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Telefone / WhatsApp</label>
                <input type="text" placeholder="(00) 00000-0000" value={telefone} onChange={e => setTelefone(mascaraTelefone(e.target.value))} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">E-mail</label>
                <input type="email" placeholder="nome@provedor.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
            </div>
          </div>
        )}

        {secaoAtual === 'igreja' && (
          <div className="space-y-4 animation-fade-in">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Cargo / Função</label>
                <select value={cargo} onChange={e => setcargo(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                  <option value="">Selecione o cargo</option>
                  {cargosLista.map((c) => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                  {cargo && !cargosLista.some((c) => c.nome === cargo) && <option value={cargo}>{cargo}</option>}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="afastado">Afastado</option>
                  <option value="transferido">Transferido</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Célula que Frequenta</label>
                <select value={celulaId} onChange={e => setCelulaId(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                  <option value="">Sem Vínculo Específico</option>
                  {celulasExistentes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Sub-Região / Zona</label>
                <select value={zonaId} onChange={e => setZonaId(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                  <option value="">Todas as Regiões</option>
                  {zonasExistentes.map(z => <option key={z.id} value={z.id}>{z.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Data de Batismo nas Águas</label>
                <input type="text" placeholder="DD/MM/AAAA" value={dataBatismo} onChange={e => setDataBatismo(mascaraDataBR(e.target.value))} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Data de Conversão</label>
                <input type="text" placeholder="DD/MM/AAAA" value={dataConversao} onChange={e => setDataConversao(mascaraDataBR(e.target.value))} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Campo de Atuação</label>
                <select value={atuacao} onChange={e => setAtuacao(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                  <option value="">Selecione (cadastre em Configurações)</option>
                  {atuacoesLista.map((a) => <option key={a.id} value={a.nome}>{a.nome}</option>)}
                  {atuacao && !atuacoesLista.some((a) => a.nome === atuacao) && <option value={atuacao}>{atuacao}</option>}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-blue-50 border border-blue-100 rounded-xl p-3">
              <input type="checkbox" checked={batizadoAguas} onChange={e => setBatizadoAguas(e.target.checked)} className="w-4 h-4 accent-blue-600" />
              Batizado nas águas
            </label>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <label className="flex items-start gap-3 text-xs font-bold text-slate-700">
                <input type="checkbox" checked={criarAcesso} onChange={e => setCriarAcesso(e.target.checked)} className="mt-0.5 w-4 h-4 accent-blue-600" />
                <span>
                  Criar usuário e senha para este membro
                  <small className="block mt-1 font-medium text-slate-500">Usa o e-mail informado na etapa de endereço. A senha será criada no Supabase Auth.</small>
                </span>
              </label>

              {criarAcesso && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Perfil de acesso</label>
                    <select value={permissaoAcesso} onChange={e => setPermissaoAcesso(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                      <option value="admin">Admin</option>
                      <option value="pastor">Pastor</option>
                      <option value="lider-celula">Líder de Célula</option>
                      <option value="secretaria">Secretaria</option>
                      <option value="tesouraria">Tesouraria</option>
                      <option value="membro">Membro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Senha inicial</label>
                    <input type="password" value={senhaAcesso} onChange={e => setSenhaAcesso(e.target.value)} minLength={6} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Confirmar senha</label>
                    <input type="password" value={confirmarSenhaAcesso} onChange={e => setConfirmarSenhaAcesso(e.target.value)} minLength={6} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {secaoAtual === 'familia' && (
          <div className="space-y-4 animation-fade-in">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Cônjuge</label>
              <select value={conjugeId} onChange={e => setConjugeId(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800">
                <option value="">Sem cônjuge vinculado</option>
                {listaPessoasExistentes.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Pesquisar Filhos Cadastrados</label>
              <input type="text" placeholder="Digite o nome para buscar na base..." value={filtroBuscaFilho} onChange={e => setFiltroBuscaFilho(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 mb-2" />
              
              {filtroBuscaFilho && (
                <div className="border border-slate-100 rounded-xl max-h-40 overflow-y-auto divide-y divide-slate-50 p-1 bg-slate-50/50">
                  {pessoasFiltradasParaFilhos.map(p => (
                    <button key={p.id} type="button" onClick={() => gerenciarFilho(p.id)} className="w-full text-left p-2 text-xs flex justify-between items-center hover:bg-white rounded-lg transition font-medium">
                      <span>👤 {p.nome}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${filhosSelecionados.includes(p.id) ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-600'}`}>{filhosSelecionados.includes(p.id) ? '💜 Vinculado' : '+ Adicionar'}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex gap-2">
          {secaoAtual !== 'familia' ? (
            <button type="button" onClick={() => {
              if (secaoAtual === 'pessoal') setSecaoAtual('endereco');
              else if (secaoAtual === 'endereco') setSecaoAtual('igreja');
              else if (secaoAtual === 'igreja') setSecaoAtual('familia');
            }} className="w-full bg-slate-800 hover:bg-slate-950 text-white font-bold py-2.5 rounded-xl text-xs transition">
              Avançar Próxima Etapa ➔
            </button>
          ) : (
            <button type="submit" disabled={enviando} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition disabled:bg-slate-300 shadow-sm">
              {enviando ? 'Processando Ficha...' : '💾 Finalizar e Salvar Cadastro Completo'}
            </button>
          )}
        </div>
      </form>

      {mensagem && (
        <div className="mt-4 p-3 bg-slate-900 text-white text-xs font-bold text-center rounded-xl shadow-xs animate-pulse">
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default FormularioCadastro;
