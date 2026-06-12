import { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from './supabaseClient';
import { uploadImagemCelula } from './ui'; // Reutiliza a função de upload
import {
  mascaraCPF,
  mascaraCNPJ,
  mascaraTelefone,
  mascaraCEP,
  mascaraDataBR,
  dataBRparaISO,
  desmascararCPF,
  desmascararTelefone,
  desmascararCEP,
} from './mascaras';

// Componente para o formulário de cadastro público
export default function PublicRegistrationForm() {
  // Dados da Igreja para o cabeçalho
  const [dadosIgreja, setDadosIgreja] = useState(null);
  const [carregandoDadosIgreja, setCarregandoDadosIgreja] = useState(true);

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

  // Dados de Relação com a Igreja
  const [cargoSugerido, setCargoSugerido] = useState('');
  const [celulaSugerida, setCelulaSugerida] = useState('');
  const [zonaSugerida, setZonaSugerida] = useState('');
  const [dataConversao, setDataConversao] = useState('');
  const [dataBatismo, setDataBatismo] = useState('');
  const [batizadoAguas, setBatizadoAguas] = useState(false);
  const [atuacaoSugerida, setAtuacaoSugerida] = useState('');

  // Vínculos Familiares
  const [conjugeSugerido, setConjugeSugerido] = useState('');
  const [filhosSugeridos, setFilhosSugeridos] = useState(''); // Nomes dos filhos, separados por vírgula ou em textarea

  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(false);

  // Listas para os selects (carregadas do banco)
  const [listaCargos, setListaCargos] = useState([]);
  const [listaCelulas, setListaCelulas] = useState([]);
  const [listaZonas, setListaZonas] = useState([]);
  const [listaAtuacoes, setListaAtuacoes] = useState([]);

  // Carregar dados da igreja e listas auxiliares
  useEffect(() => {
    async function carregarDados() {
      setCarregandoDadosIgreja(true);

      const [resIgreja, resCargos, resCelulas, resZonas, resAtuacoes] = await Promise.all([
        supabase.from('dados_igreja').select('*').eq('id', 1).single(),
        supabase.from('cargos').select('id, nome').order('nome'),
        supabase.from('celulas').select('id, nome').order('nome'),
        supabase.from('zonas_moradia').select('id, nome').order('nome'),
        supabase.from('atuacoes').select('id, nome').order('nome')
      ]);

      if (resIgreja.data) setDadosIgreja(resIgreja.data);
      if (resCargos.data) setListaCargos(resCargos.data);
      if (resCelulas.data) setListaCelulas(resCelulas.data);
      if (resZonas.data) setListaZonas(resZonas.data);
      if (resAtuacoes.data) setListaAtuacoes(resAtuacoes.data);

      if (resIgreja.error) console.error('Erro ao carregar dados da igreja:', resIgreja.error);
      
      setCarregandoDadosIgreja(false);
    }
    carregarDados();
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) {
      setMensagem('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim() && !telefone.trim()) {
      setMensagem('Por favor, informe um e-mail ou telefone para contato.');
      return;
    }

    setEnviando(true);
    setMensagem('');
    setSucesso(false);

    let urlFotoPublica = '';

    if (fotoFinalBlob) {
      try {
        urlFotoPublica = await uploadImagemCelula(fotoFinalBlob, `publico-${Date.now()}`);
      } catch (error) {
        console.error('Erro ao fazer upload da foto:', error);
        setMensagem('Erro ao fazer upload da foto. Tente novamente.');
        setEnviando(false);
        return;
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
      cargo_sugerido: cargoSugerido.trim() || null,
      celula_sugerida: celulaSugerida.trim() || null,
      zona_sugerida: zonaSugerida.trim() || null,
      atuacao_sugerida: atuacaoSugerida.trim() || null,
      data_conversao: dataBRparaISO(dataConversao),
      data_batismo: dataBRparaISO(dataBatismo),
      batizado_aguas: batizadoAguas,
      conjuge_sugerido: conjugeSugerido.trim() || null,
      filhos_sugeridos: filhosSugeridos.trim() || null,
      status: 'ativo',
      tipo_membro: 'frequentador',
    };

    try {
      const { error } = await supabase.from('pessoas').insert([payload]);

      if (error) {
        console.error('Erro ao salvar cadastro:', error);
        setMensagem('❌ Erro ao enviar seu cadastro: ' + error.message);
      } else {
        setMensagem('🎉 Seu cadastro foi enviado com sucesso! Agradecemos seu interesse.');
        setSucesso(true);
        setNome(''); setGenero(''); setDataNascimento(''); setEstadoCivil('Solteiro(a)');
        setCpf(''); setRg(''); setEscolaridade(''); setProfissao('');
        setEmail(''); setTelefone(''); setCep(''); setEndereco(''); setNumero('');
        setBairro(''); setCidade(''); setEstado(''); setCargoSugerido('');
        setCelulaSugerida(''); setZonaSugerida(''); setDataConversao('');
        setDataBatismo(''); setBatizadoAguas(false); setAtuacaoSugerida('');
        setConjugeSugerido(''); setFilhosSugeridos('');
        setPreviewUrl(''); setFotoFinalBlob(null); setImageSrc(null);
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      setMensagem('❌ Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  }

  if (carregandoDadosIgreja) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Carregando formulário...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-0 pb-2 md:py-4 px-5">
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
                cropShape="rect"
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

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 w-full max-w-2xl">
        {/* Cabeçalho Profissional */}
        <div className="text-center mb-8 border-b pb-6 border-gray-200">
          {dadosIgreja?.logo_url ? (
            <img src={dadosIgreja.logo_url} alt="Logo da Igreja" className="h-30 mx-auto object-contain" />
          ) : (
            <img src="/logo-mib-mundau.png" alt="Logo da Igreja" className="h-30 mx-auto object-contain" />
          )}
          {dadosIgreja?.endereco && (
            <p className="text-sm text-gray-600 mt-1">{dadosIgreja.endereco}</p>
          )}
          {dadosIgreja?.cnpj && (
            <p className="text-sm text-gray-600 font-semibold">CNPJ: {mascaraCNPJ(dadosIgreja.cnpj)}</p>
          )}
          <p className="text-sm text-gray-600">{mascaraTelefone(dadosIgreja?.telefone) || 'contato:'}</p>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Cadastro de Membro</h1>
          <p className="text-xs text-gray-400 mt-1">
            Preencha o formulário abaixo para se cadastrar como membro.
            Seus dados serão tratados com toda confidencialidade.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seção de Foto */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="w-24 h-24 rounded-xl bg-slate-200 flex items-center justify-center border border-slate-300 overflow-hidden shrink-0 shadow-inner">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <img 
                  src="https://guznbiqposfhqalqjggw.supabase.co/storage/v1/object/public/fotos-membros/Avatar.svg" 
                  alt="Avatar padrão" 
                  className="w-24 h-24 object-contain opacity-60" 
                />
              )}
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <label className="block text-sm font-bold text-gray-700 mb-1">Insira Sua Foto de Perfil</label>
              <input type="file" accept="image/*" onChange={onFileChange} className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
            </div>
          </div>

          {/* Dados Pessoais */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Dados Pessoais</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Nome Completo *</label>
            <input type="text" required value={nome} onChange={e => setNome(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Gênero</label>
              <select value={genero} onChange={e => setGenero(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white">
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Data de Nascimento</label>
              <input type="text" placeholder="DD/MM/AAAA" value={dataNascimento} onChange={e => setDataNascimento(mascaraDataBR(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Estado Civil</label>
              <select value={estadoCivil} onChange={e => setEstadoCivil(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white">
                <option value="Solteiro(a)">Solteiro(a)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="Divorciado(a)">Divorciado(a)</option>
                <option value="Viuvo(a)">Viúvo(a)</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Profissão</label>
              <input type="text" value={profissao} onChange={e => setProfissao(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">CPF</label>
              <input type="text" placeholder="000.000.000-00" value={cpf} onChange={e => setCpf(mascaraCPF(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">RG</label>
              <input type="text" value={rg} onChange={e => setRg(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Escolaridade</label>
            <select value={escolaridade} onChange={e => setEscolaridade(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white">
              <option value="">Selecione</option>
              <option value="Ensino Fundamental">Ensino Fundamental</option>
              <option value="Ensino Medio">Ensino Médio</option>
              <option value="Ensino Superior">Ensino Superior</option>
              <option value="Pos-graduacao">Pós-graduação</option>
              <option value="Mestrado/Doutorado">Mestrado/Doutorado</option>
            </select>
          </div>

          {/* Contato e Endereço */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4 mt-8">Contato e Endereço</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Telefone / WhatsApp *</label>
              <input type="text" placeholder="(00) 00000-0000" value={telefone} onChange={e => setTelefone(mascaraTelefone(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">E-mail</label>
              <input type="email" placeholder="seuemail@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">CEP</label>
            <input type="text" placeholder="00000-000" value={cep} onChange={e => setCep(mascaraCEP(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-600 mb-1">Endereço (Rua, Avenida)</label>
              <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Número</label>
              <input type="text" value={numero} onChange={e => setNumero(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Bairro</label>
              <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Cidade</label>
              <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Estado (UF)</label>
              <input type="text" value={estado} onChange={e => setEstado(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
          </div>

          {/* Relação com a Igreja */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4 mt-8">Relação com a Igreja</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Cargo / Função (sugerido)</label>
              <select value={cargoSugerido} onChange={e => setCargoSugerido(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white">
                <option value="">Selecione um cargo...</option>
                {listaCargos.map(c => (
                  <option key={c.id} value={c.nome}>{c.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Célula que frequenta (sugerido)</label>
              <select value={celulaSugerida} onChange={e => setCelulaSugerida(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white">
                <option value="">Selecione uma célula...</option>
                {listaCelulas.map(c => (
                  <option key={c.id} value={c.nome}>{c.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Zona de moradia (sugerido)</label>
              <select value={zonaSugerida} onChange={e => setZonaSugerida(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white">
                <option value="">Selecione sua zona...</option>
                {listaZonas.map(z => (
                  <option key={z.id} value={z.nome}>{z.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Campo de atuação (sugerido)</label>
              <select value={atuacaoSugerida} onChange={e => setAtuacaoSugerida(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white">
                <option value="">Selecione um ministério...</option>
                {listaAtuacoes.map(a => (
                  <option key={a.id} value={a.nome}>{a.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Data de Conversão</label>
              <input type="text" placeholder="DD/MM/AAAA" value={dataConversao} onChange={e => setDataConversao(mascaraDataBR(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Data de Batismo nas Águas</label>
              <input type="text" placeholder="DD/MM/AAAA" value={dataBatismo} onChange={e => setDataBatismo(mascaraDataBR(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <input type="checkbox" checked={batizadoAguas} onChange={e => setBatizadoAguas(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            Batizado nas águas
          </label>

          {/* Vínculos Familiares */}
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4 mt-8">Vínculos Familiares</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Nome do Cônjuge (se houver)</label>
            <input type="text" value={conjugeSugerido} onChange={e => setConjugeSugerido(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base" placeholder="Nome completo do cônjuge" />
            <p className="text-xs text-gray-400 mt-1">Não se preocupe em vincular, apenas informe o nome.</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Nomes dos Filhos (se houver)</label>
            <textarea value={filhosSugeridos} onChange={e => setFilhosSugeridos(e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-base resize-y" placeholder="Ex: João Silva, Maria Silva, Pedro Silva"></textarea>
            <p className="text-xs text-gray-400 mt-1">Separe os nomes por vírgula ou liste um por linha.</p>
          </div>

          {mensagem && (
            <div className={`mt-6 p-4 rounded-xl text-sm font-semibold text-center ${sucesso ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {mensagem}
            </div>
          )}

          <button type="submit" disabled={enviando || sucesso} className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {enviando ? 'Enviando Cadastro...' : 'Enviar Meu Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
}