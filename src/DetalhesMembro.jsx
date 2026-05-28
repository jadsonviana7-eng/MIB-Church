import { useEffect, useState, useCallback, useMemo } from 'react';
import Cropper from 'react-easy-crop';
import { supabase } from './supabaseClient';
import { Card, CardHeader, CampoLinha, CampoInput, uploadImagemCelula } from './ui';
import { ModalLancarTransacao } from './TransacoesFinanceiras';
import {
  mascaraCPF,
  mascaraTelefone,
  mascaraCEP,
  mascaraDataBR,
  dataISOparaBR,
  dataBRparaISO,
  desmascararCPF,
  desmascararTelefone,
  desmascararCEP,
} from './mascaras';

const MOTIVOS_EXCLUSAO = [
  'Transferência para outra igreja',
  'Falecimento',
  'Pedido do próprio membro',
  'Cadastro duplicado',
  'Inatividade prolongada',
  'Outro motivo',
];

const ABAS = [
  { id: 'informacoes', label: 'Informações' },
  { id: 'adicionais', label: 'Informações Adicionais' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'permissoes', label: 'Permissões' },
];

function vinculosPermissaoMembro(membro) {
  const chave = String(membro?.permissao || membro?.cargo || 'membro').toLowerCase();
  const itens = [];

  const push = (modulo, blocos) => {
    blocos.forEach((bloco) => itens.push({ modulo, bloco }));
  };

  if (chave.includes('admin')) {
    push('Visão Geral', ['Dashboard', 'Indicadores e gráficos']);
    push('Pessoas', ['Ver todos', 'Adicionar pessoa', 'Aniversariantes', 'Relatórios', 'Ficha do membro']);
    push('Células', ['Lista de células', 'Nova célula', 'Reuniões', 'Detalhes da célula']);
    push('Configurações', ['Listas auxiliares', 'Preferências do sistema']);
    push('Financeiro', ['Receitas', 'Contribuições', 'Relatórios financeiros']);
    return itens;
  }

  if (chave.includes('pastor')) {
    push('Visão Geral', ['Dashboard', 'Indicadores e gráficos']);
    push('Pessoas', ['Ver todos', 'Relatórios', 'Ficha do membro']);
    push('Células', ['Lista de células', 'Reuniões', 'Detalhes da célula']);
    return itens;
  }

  if (chave.includes('secretaria')) {
    push('Pessoas', ['Ver todos', 'Adicionar pessoa', 'Aniversariantes', 'Relatórios', 'Ficha do membro']);
    push('Células', ['Lista de células', 'Nova célula']);
    return itens;
  }

  if (chave.includes('tesouraria') || chave.includes('financeiro')) {
    push('Financeiro', ['Receitas', 'Contribuições', 'Relatórios financeiros']);
    push('Pessoas', ['Ver todos', 'Ficha do membro']);
    return itens;
  }

  if (chave.includes('lider') || chave.includes('supervisor')) {
    push('Células', ['Lista de células', 'Reuniões', 'Detalhes da célula', 'Membros da célula']);
    push('Pessoas', ['Ficha do membro']);
    return itens;
  }

  push('Pessoas', ['Ficha pessoal (própria)']);
  return itens;
}

function DetalhesMembro({ pessoaId, onFechar, listaPessoas = [], onDadosAtualizados, cargosLista = [], atuacoesLista = [] }) {
  const [membro, setMembro] = useState(null);
  const [filhos, setFilhos] = useState([]);
  const [celulas, setCelulas] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [contribuicoes, setContribuicoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('informacoes');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [salvando, setSalvando] = useState(false);
  
  const [isModalReceitaAberto, setIsModalReceitaAberto] = useState(false);
  const [contasFinanceiras, setContasFinanceiras] = useState([]);
  const [categoriasFinanceiras, setCategoriasFinanceiras] = useState([]);

  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('Solteiro(a)');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [profissao, setProfissao] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [cargo, setCargo] = useState('membro');
  const [celulaId, setCelulaId] = useState('');
  const [zonaId, setZonaId] = useState('');
  const [dataBatismo, setDataBatismo] = useState('');
  const [dataConversao, setDataConversao] = useState('');
  const [status, setStatus] = useState('ativo');
  const [batizadoAguas, setBatizadoAguas] = useState(false);
  const [atuacao, setAtuacao] = useState('');
  const [permissao, setPermissao] = useState('');
  const [senhaNovoAcesso, setSenhaNovoAcesso] = useState('');
  const [confirmarSenhaNovoAcesso, setConfirmarSenhaNovoAcesso] = useState('');
  const [criandoAcesso, setCriandoAcesso] = useState(false);
  const [mensagemAcesso, setMensagemAcesso] = useState('');
  const [avaliacaoEscola, setAvaliacaoEscola] = useState('');
  const [perfilComportamental, setPerfilComportamental] = useState('');
  const [atividadeCerebral, setAtividadeCerebral] = useState('');
  const [conjugeId, setConjugeId] = useState('');
  const [idsFilhosEdit, setIdsFilhosEdit] = useState([]);
  const [filtroBuscaFilho, setFiltroBuscaFilho] = useState('');
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [motivoExclusao, setMotivoExclusao] = useState('');
  const [excluindoCadastro, setExcluindoCadastro] = useState(false);

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [mostrarCortador, setMostrarCortador] = useState(false);
  const [previewNovaFotoUrl, setPreviewNovaFotoUrl] = useState('');
  const [fotoFinalBlob, setFotoFinalBlob] = useState(null);

  // Estados para dados acadêmicos (se isStudentCadernetaView for true)
  const [cadernetaDados, setCadernetaDados] = useState(null);
  const [faltasDados, setFaltasDados] = useState(null);
  const [crescimentoDados, setCrescimentoDados] = useState(null);
  const carregarFinanceiro = useCallback(async () => {
    if (!pessoaId) return;
    const { data: transacoes, error } = await supabase
      .from('transacoes_financeiras')
      .select('*, categorias_financeiras(nome), contas_financeiras(nome)')
      .eq('pessoa_id', pessoaId)
      .order('data', { ascending: false });
    
    if (!error && transacoes) {
      setContribuicoes(transacoes);
    } else if (error) {
      console.warn('Erro ao carregar transações do membro:', error.message);
    }
  }, [pessoaId]);

  const carregarDadosAcademicos = useCallback(async () => {
    if (!pessoaId || !isStudentCadernetaView) return;
    setCarregando(true);
    try {
      // Dados simulados conforme a regra de 3 módulos e 3 avaliações
      const criarModulo = (nome, n1, n2, n3, faltas) => ({
        nome,
        avaliacoes: [{ tipo: 'Avaliação 1', nota: n1 }, { tipo: 'Avaliação 2', nota: n2 }, { tipo: 'Avaliação 3', nota: n3 }],
        media: (n1 + n2 + n3) / 3,
        faltas
      });

      setCadernetaDados({
        modulos: [
          criarModulo('Módulo 1', 8, 7.5, 9, 2),
          criarModulo('Módulo 2', 6, 7, 6.5, 1),
          criarModulo('Módulo 3', 10, 9, 8.5, 0)
        ],
      });
      setFaltasDados({
        modulos: [{ nome: 'Módulo 1', faltas: 2 }, { nome: 'Módulo 2', faltas: 1 }, { nome: 'Módulo 3', faltas: 0 }],
        total: 3,
      });
      setCrescimentoDados({ observacoes: 'Aluno muito participativo e dedicado. Demonstra grande potencial de liderança.' });
    } catch (error) {
      console.error('Erro ao carregar dados acadêmicos:', error);
    } finally {
      setCarregando(false);
    }
  }, [pessoaId, isStudentCadernetaView]);

  function preencherFormulario(p) {
    setMembro(p);
    setNome(p.nome || '');
    setGenero(p.genero || '');
    setDataNascimento(dataISOparaBR(p.data_nascimento));
    setEstadoCivil(p.estado_civil || 'Solteiro(a)');
    setCpf(mascaraCPF(p.cpf || ''));
    setRg(p.rg || '');
    setEscolaridade(p.escolaridade || '');
    setProfissao(p.profissao || '');
    setEmail(p.email || '');
    setTelefone(mascaraTelefone(p.telefone || ''));
    setCep(mascaraCEP(p.cep || ''));
    setCidade(p.cidade || '');
    setEndereco(p.endereco || '');
    setNumero(p.numero || '');
    setBairro(p.bairro || '');
    setEstado(p.estado || '');
    setCargo(p.cargo || 'membro');
    setCelulaId(p.celula_id || '');
    setZonaId(p.zona_id || '');
    setDataBatismo(dataISOparaBR(p.data_batismo));
    setDataConversao(dataISOparaBR(p.data_conversao));
    setStatus(p.status || 'ativo');
    setBatizadoAguas(Boolean(p.batizado_aguas));
    setAtuacao(p.atuacao || '');
    setPermissao(p.permissao || '');
    setSenhaNovoAcesso('');
    setConfirmarSenhaNovoAcesso('');
    setMensagemAcesso('');
    setAvaliacaoEscola(p.avaliacao_escola_discipulos || '');
    setPerfilComportamental(p.perfil_comportamental || '');
    setAtividadeCerebral(p.atividade_cerebral || '');
    setConjugeId(p.conjuge_id || '');
    setPreviewNovaFotoUrl('');
    setFotoFinalBlob(null);
  }

  useEffect(() => {
    async function carregarFichaDoMembro() {
      if (!pessoaId) return;
      setCarregando(true);

      try {
        const { data: p, error: erroPessoa } = await supabase.from('pessoas').select('*').eq('id', pessoaId).single();
        if (erroPessoa) console.warn('Erro ao carregar pessoa:', erroPessoa);
        if (p) preencherFormulario(p);

        const { data: relacoes, error: erroRelacoes } = await supabase.from('relacoes_familiares').select('id_filho').eq('id_pai_mae', pessoaId);
        if (erroRelacoes) console.warn('Tabela "relacoes_familiares" não encontrada. Veja DATABASE_SCHEMA.md');
        if (relacoes?.length > 0) {
          const idsFilhos = relacoes.map((r) => r.id_filho);
          setIdsFilhosEdit(idsFilhos);
          setFilhos(listaPessoas.filter((item) => idsFilhos.includes(item.id)));
        } else {
          setIdsFilhosEdit([]);
          setFilhos([]);
        }

        const { data: c, error: erroCelulas } = await supabase.from('celulas').select('id, nome');
        if (erroCelulas) console.warn('Tabela "celulas" não encontrada. Veja DATABASE_SCHEMA.md');
        if (c) setCelulas(c);

        const { data: z, error: erroZonas } = await supabase.from('zonas_moradia').select('id, nome');
        if (erroZonas) console.warn('Tabela "zonas_moradia" não encontrada. Veja DATABASE_SCHEMA.md');
        if (z) setZonas(z);

        await carregarFinanceiro();

        const { data: cFin } = await supabase.from('contas_financeiras').select('id, nome').order('nome');
        if (cFin) setContasFinanceiras(cFin);

        const { data: catFin } = await supabase.from('categorias_financeiras').select('id, nome, tipo').order('nome');
        if (catFin) setCategoriasFinanceiras(catFin);
      } catch (err) {
        console.error('Erro ao carregar ficha do membro:', err);
      } finally {
        setCarregando(false);
      }
    }
    if (!isStudentCadernetaView) { // Carrega dados normais se não for caderneta
      carregarFichaDoMembro();
    }
  }, [pessoaId, listaPessoas, carregarFinanceiro, isStudentCadernetaView]);

  useEffect(() => {
    if (isStudentCadernetaView) {
      carregarDadosAcademicos();
    }
  }, [isStudentCadernetaView, carregarDadosAcademicos]);

  const nomeZona = useMemo(() => zonas.find((z) => String(z.id) === String(zonaId))?.nome || '—', [zonas, zonaId]);
  const nomeCelula = useMemo(() => celulas.find((c) => String(c.id) === String(celulaId))?.nome || '—', [celulas, celulaId]);
  const enderecoCompleto = useMemo(() => {
    const partes = [endereco, numero && `nº ${numero}`, bairro, cidade, estado].filter(Boolean);
    return partes.length ? partes.join(', ') : '—';
  }, [endereco, numero, bairro, cidade, estado]);

  const permissoesVinculadas = useMemo(
    () => (membro ? vinculosPermissaoMembro({ ...membro, permissao, cargo: cargo }) : []),
    [membro, permissao, cargo]
  );

  const onFileChange = async (e) => {
    if (e.target.files?.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setMostrarCortador(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
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
        setPreviewNovaFotoUrl(URL.createObjectURL(blob));
        setMostrarCortador(false);
      }, 'image/jpeg');
    } catch (e) {
      console.error(e);
    }
  };

  async function handleSalvarEdicao(e) {
    e.preventDefault();
    setSalvando(true);

    let urlFotoPublica = membro.foto_url;
    if (fotoFinalBlob) {
      try {
        urlFotoPublica = await uploadImagemCelula(fotoFinalBlob, `membro_${pessoaId}`);
      } catch (err) {
        console.error('Erro no upload da foto:', err);
      }
    }

    const atualizacoes = {
      nome: nome.trim(),
      genero,
      data_nascimento: dataBRparaISO(dataNascimento),
      estado_civil: estadoCivil,
      cpf: desmascararCPF(cpf),
      rg: rg.trim() || null,
      escolaridade,
      profissao,
      email: email.trim() || null,
      telefone: desmascararTelefone(telefone),
      cep: desmascararCEP(cep),
      cidade,
      endereco,
      numero,
      bairro,
      estado,
      cargo: cargo,
      celula_id: celulaId || null,
      zona_id: zonaId || null,
      data_batismo: dataBRparaISO(dataBatismo),
      data_conversao: dataBRparaISO(dataConversao),
      status,
      batizado_aguas: batizadoAguas,
      atuacao: atuacao.trim() || null,
      permissao: permissao.trim() || null,
      avaliacao_escola_discipulos: avaliacaoEscola.trim() || null,
      perfil_comportamental: perfilComportamental.trim() || null,
      atividade_cerebral: atividadeCerebral.trim() || null,
      foto_url: urlFotoPublica,
      conjuge_id: conjugeId || null,
    };

    const { error } = await supabase.from('pessoas').update(atualizacoes).eq('id', pessoaId);
    if (!error) {
      await supabase.from('relacoes_familiares').delete().eq('id_pai_mae', pessoaId);
      if (idsFilhosEdit.length > 0) {
        await supabase.from('relacoes_familiares').insert(
          idsFilhosEdit.map((idFilho) => ({ id_pai_mae: pessoaId, id_filho: idFilho }))
        );
      }
      setModoEdicao(false);
      const { data: atualizado } = await supabase.from('pessoas').select('*').eq('id', pessoaId).single();
      if (atualizado) preencherFormulario(atualizado);
      onDadosAtualizados();
    } else {
      const msg = error.message?.includes('column')
        ? `${error.message}\n\nExecute o SQL em supabase/schema-ficha-membro.sql no Supabase e recarregue o schema cache (Settings → API).`
        : error.message;
      window.alert('Erro ao atualizar: ' + msg);
    }
    setSalvando(false);
  }

  async function handleCriarAcessoSistema() {
    if (!email.trim()) {
      window.alert('Informe o e-mail do membro antes de criar o acesso.');
      return;
    }
    if (senhaNovoAcesso.length < 6) {
      window.alert('A senha deve ter ao menos 6 caracteres.');
      return;
    }
    if (senhaNovoAcesso !== confirmarSenhaNovoAcesso) {
      window.alert('As senhas não coincidem.');
      return;
    }

    setCriandoAcesso(true);
    setMensagemAcesso('');

    const perfilAcesso = permissao.trim() || cargo || 'membro';
    const { error } = await supabase.functions.invoke('criar-usuario-membro', {
      body: {
        pessoaId,
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senhaNovoAcesso,
        permissao: perfilAcesso,
        foto_url: membro.foto_url,
      },
    });

    if (error) {
      let msgErro = error.message;
      if (error.context) {
        try {
          const body = await error.context.json();
          if (body.error) msgErro = body.error;
        } catch (e) { /* corpo não é JSON */ }
      }
      console.error('Erro detalhado da Edge Function:', error);
      setMensagemAcesso(`Não foi possível criar o acesso: ${msgErro}`);
    } else {
      setMensagemAcesso('Acesso criado com sucesso.');
      setSenhaNovoAcesso('');
      setConfirmarSenhaNovoAcesso('');
      const { data: atualizado } = await supabase.from('pessoas').select('*').eq('id', pessoaId).single();
      if (atualizado) preencherFormulario(atualizado);
      if (onDadosAtualizados) onDadosAtualizados();
    }

    setCriandoAcesso(false);
  }

  function toggleFilho(id) {
    setIdsFilhosEdit((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      setFilhos(listaPessoas.filter((p) => next.includes(p.id)));
      return next;
    });
  }

  async function confirmarExclusaoCadastro() {
    if (!motivoExclusao) {
      window.alert('Selecione o motivo da exclusão.');
      return;
    }
    setExcluindoCadastro(true);
    const { error } = await supabase
      .from('pessoas')
      .update({ status: 'excluido', motivo_exclusao: motivoExclusao })
      .eq('id', pessoaId);
    setExcluindoCadastro(false);
    if (!error) {
      setModalExclusaoAberto(false);
      onDadosAtualizados();
      onFechar();
    } else {
      window.alert('Erro ao excluir: ' + error.message);
    }
  }

  const pessoasParaFilhos = listaPessoas.filter(
    (p) => String(p.id) !== String(pessoaId) && p.nome?.toLowerCase().includes(filtroBuscaFilho.toLowerCase())
  );

  if (carregando) {
    return <div className="text-center py-12 text-sm text-[var(--text-muted)] font-medium">Buscando ficha do membro...</div>;
  }
  if (!membro) {
    return <div className="text-center py-12 text-sm text-red-500">Membro não localizado.</div>;
  }

  const fotoExibir = previewNovaFotoUrl || membro.foto_url;
  const dis = !modoEdicao;

  return (
    <div className="w-full space-y-0">
      {modalExclusaoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white rounded-2xl border shadow-xl w-full max-w-md p-5 space-y-4">
            <h3 className="font-semibold text-[var(--text-heading)]">Excluir Cadastro de {nome}</h3>
            <p className="text-sm text-[var(--text-muted)]">O cadastro será marcado como excluído (não aparece mais nas listas).</p>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Motivo da exclusão</label>
              <select value={motivoExclusao} onChange={(e) => setMotivoExclusao(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-white">
                <option value="">Selecione o motivo</option>
                {MOTIVOS_EXCLUSAO.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setModalExclusaoAberto(false)} className="px-4 py-2 text-xs border rounded-xl">Cancelar</button>
              <button type="button" onClick={confirmarExclusaoCadastro} disabled={excluindoCadastro} className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 text-white disabled:opacity-50">
                {excluindoCadastro ? 'Excluindo...' : 'Confirmar exclusão'}
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarCortador && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text-heading)] text-sm">Recortar foto de perfil</h3>
            </div>
            <div className="relative h-64 w-full bg-slate-900">
              <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={1} cropShape="round" showGrid={false} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} />
            </div>
            <div className="p-4 bg-[var(--surface-muted)] flex gap-2">
              <button type="button" onClick={() => setMostrarCortador(false)} className="flex-1 py-2 bg-slate-200 text-xs font-medium rounded-xl">Cancelar</button>
              <button type="button" onClick={criarImagemRecortada} className="flex-1 py-2 btn-primary text-xs font-semibold rounded-xl">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      <Card className="p-0 w-full">
        <div className="card-body-full flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start w-full">
            <div className="relative shrink-0 w-28 h-28 rounded-2xl border-2 border-[var(--border)] overflow-hidden bg-[var(--surface-muted)] shadow-sm">
              {fotoExibir ? (
                <img src={fotoExibir} alt={nome} className="w-full h-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-4xl font-semibold text-[var(--text-muted)]">{nome.charAt(0).toUpperCase()}</span>
              )}
              {modoEdicao && (
                <label className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center text-[10px] font-medium text-white cursor-pointer">
                  Alterar foto
                  <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                </label>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-bold tracking-tight text-slate-400 mb-1">
                <button type="button" onClick={() => onFechar()} className="hover:text-slate-600">Pessoas</button>
                <span className="text-slate-300">/</span>
                <span className="text-[#055F6D]">Ficha</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--text-heading)] tracking-tight leading-tight">{nome}</h1>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <p><span className="text-[var(--text-muted)]">Zona de moradia:</span> <span className="font-medium text-[var(--text-heading)]">{nomeZona}</span></p>
                <p><span className="text-[var(--text-muted)]">Cargo:</span> <span className="font-medium text-[var(--text-heading)] capitalize">{cargo || 'Membro'}</span></p>
                <p><span className="text-[var(--text-muted)]">Telefone:</span> <span className="font-medium text-[var(--text-heading)]">{telefone || '—'}</span></p>
                <p className="sm:col-span-2"><span className="text-[var(--text-muted)]">Endereço:</span> <span className="font-medium text-[var(--text-heading)]">{enderecoCompleto}</span></p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0 w-full lg:w-auto justify-center lg:justify-end">
            {!modoEdicao ? (
              <>
                <button type="button" onClick={() => setModoEdicao(true)} className="btn-primary text-xs font-semibold px-4 py-2 rounded-xl">✏️ Editar</button>
                <button type="button" onClick={() => setModalExclusaoAberto(true)} className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 text-xs font-semibold bg-rose-50">Excluir Cadastro</button>
                <button type="button" onClick={onFechar} className="px-4 py-2 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--text-primary)]">Fechar</button>
              </>
            ) : (
              <span className="text-xs text-amber-700 font-medium px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">Modo edição</span>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-0 w-full mt-4">
        <nav className="tabs-nav" aria-label="Abas da ficha">
          {ABAS.map((aba) => (
            <button
              key={aba.id}
              type="button"
              onClick={() => setAbaAtiva(aba.id)}
              className={`tab-btn ${abaAtiva === aba.id ? 'tabs-active' : ''}`}
            >
              {aba.label}
            </button>
          ))}
        </nav>

        <form onSubmit={handleSalvarEdicao} className="card-body-full">
          {abaAtiva === 'informacoes' && (
            <div className="space-y-4">
              <Card className="p-0">
                <CardHeader titulo="Dados Pessoais" />
                <div className="card-body-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <CampoInput label="Nome completo" value={nome} onChange={setNome} disabled={dis} />
                  <CampoInput label="Gênero" value={genero} onChange={setGenero} disabled={dis} />
                  {!dis ? (
                    <div>
                      <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Estado civil</label>
                      <select disabled={dis} value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Viuvo(a)">Viúvo(a)</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  ) : (
                    <CampoLinha label="Estado civil" valor={estadoCivil} />
                  )}
                  <CampoInput label="Data de nascimento" value={dataNascimento} onChange={setDataNascimento} disabled={dis} mask={mascaraDataBR} />
                  <CampoInput label="CPF" value={cpf} onChange={setCpf} disabled={dis} mask={mascaraCPF} />
                  <CampoInput label="RG" value={rg} onChange={setRg} disabled={dis} />
                  {!dis ? (
                    <div>
                      <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Escolaridade</label>
                      <select value={escolaridade} onChange={(e) => setEscolaridade(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
                        <option value="">Selecione</option>
                        <option value="Ensino Medio">Ensino Medio</option>
                        <option value="Ensino Superior">Ensino Superior</option>
                        <option value="Pos-graduacao">Pos-graduacao</option>
                        <option value="Mestrado/Doutorado">Mestrado/Doutorado</option>
                      </select>
                    </div>
                  ) : (
                    <CampoLinha label="Escolaridade" valor={escolaridade} />
                  )}
                  <CampoInput label="Profissão" value={profissao} onChange={setProfissao} disabled={dis} />
                  <CampoInput label="E-mail" value={email} onChange={setEmail} disabled={dis} />
                  <CampoInput label="Telefone" value={telefone} onChange={setTelefone} disabled={dis} mask={mascaraTelefone} />
                  <CampoInput label="Status" value={status} onChange={setStatus} disabled={dis} />
                </div>
              </Card>

              <Card className="p-0">
                <CardHeader titulo="Endereço" />
                <div className="card-body-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <CampoInput label="CEP" value={cep} onChange={setCep} disabled={dis} mask={mascaraCEP} />
                  <CampoInput label="Logradouro" value={endereco} onChange={setEndereco} disabled={dis} />
                  <CampoInput label="Número" value={numero} onChange={setNumero} disabled={dis} />
                  <CampoInput label="Bairro" value={bairro} onChange={setBairro} disabled={dis} />
                  <CampoInput label="Cidade" value={cidade} onChange={setCidade} disabled={dis} />
                  <CampoInput label="UF" value={estado} onChange={setEstado} disabled={dis} />
                </div>
              </Card>

              <Card className="p-0">
                <CardHeader titulo="Vida na Igreja" />
                <div className="card-body-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {!dis ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Cargo</label>
                        <select value={cargo} onChange={(e) => setCargo(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
                          <option value="">Selecione o cargo</option>
                          {cargosLista.map((c) => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                          {cargo && !cargosLista.some((c) => c.nome === cargo) && <option value={cargo}>{cargo}</option>}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Célula</label>
                        <select value={celulaId} onChange={(e) => setCelulaId(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
                          <option value="">Nenhuma</option>
                          {celulas.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Zona</label>
                        <select value={zonaId} onChange={(e) => setZonaId(e.target.value)} className="w-full px-3 py-1.5 text-sm border border-[var(--border)] rounded-xl bg-white">
                          <option value="">Nenhuma</option>
                          {zonas.map((z) => <option key={z.id} value={z.id}>{z.nome}</option>)}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <CampoLinha label="Cargo" valor={cargo} />
                      <CampoLinha label="Célula" valor={nomeCelula} />
                      <CampoLinha label="Zona" valor={nomeZona} />
                    </>
                  )}
                  <CampoInput label="Data de conversão" value={dataConversao} onChange={setDataConversao} disabled={dis} mask={mascaraDataBR} />
                  <CampoInput label="Data de batismo" value={dataBatismo} onChange={setDataBatismo} disabled={dis} mask={mascaraDataBR} />
                  {!dis ? (
                    <label className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] pt-5">
                      <input type="checkbox" checked={batizadoAguas} onChange={(e) => setBatizadoAguas(e.target.checked)} className="rounded" />
                      Batizado nas águas
                    </label>
                  ) : (
                    <CampoLinha label="Batizado nas águas" valor={batizadoAguas ? 'Sim' : 'Não'} />
                  )}
                </div>
              </Card>

              <Card className="p-0">
                <CardHeader titulo="Vínculo Familiar" />
                <div className="card-body-full space-y-3">
                  {!dis ? (
                    <>
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Cônjuge</label>
                        <select value={conjugeId} onChange={(e) => setConjugeId(e.target.value)} className="w-full px-3 py-1.5 text-sm border rounded-xl bg-white">
                          <option value="">Sem cônjuge vinculado</option>
                          {listaPessoas.filter((p) => String(p.id) !== String(pessoaId)).map((p) => (
                            <option key={p.id} value={p.id}>{p.nome}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Filhos</label>
                        <input type="text" value={filtroBuscaFilho} onChange={(e) => setFiltroBuscaFilho(e.target.value)} placeholder="Buscar filho na base..." className="w-full px-3 py-1.5 text-xs border rounded-xl mb-2" />
                        {filtroBuscaFilho && (
                          <div className="border rounded-xl max-h-32 overflow-y-auto divide-y">
                            {pessoasParaFilhos.slice(0, 8).map((p) => (
                              <button key={p.id} type="button" onClick={() => toggleFilho(p.id)} className="w-full text-left px-3 py-2 text-xs hover:bg-[var(--surface-muted)] flex justify-between">
                                <span>{p.nome}</span>
                                <span className={idsFilhosEdit.includes(p.id) ? 'text-[#055F6D]' : ''}>{idsFilhosEdit.includes(p.id) ? '✓ Vinculado' : '+ Adicionar'}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <CampoLinha label="Cônjuge" valor={listaPessoas.find((p) => String(p.id) === String(conjugeId))?.nome || '—'} />
                      <div>
                        <p className="text-[10px] font-medium uppercase text-[var(--text-muted)] mb-1">Filhos</p>
                        <div className="flex flex-wrap gap-2">
                          {filhos.length === 0 ? <span className="text-sm text-[var(--text-muted)]">Nenhum filho vinculado.</span> : filhos.map((filho) => (
                            <span key={filho.id} className="px-3 py-1 rounded-xl border text-xs bg-white">👶 {filho.nome}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          )}

          {abaAtiva === 'adicionais' && (
            <Card className="p-0">
              <CardHeader titulo="Informações Adicionais" subtitulo="Atuação vem de Configurações → Campos de atuação." />
              <div className="card-body-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Avaliações da Escola de Discípulos</label>
                  <textarea disabled={dis} value={avaliacaoEscola} onChange={(e) => setAvaliacaoEscola(e.target.value)} rows={4} className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-xl disabled:bg-[var(--surface-muted)]" placeholder="Registros de avaliação, módulos concluídos..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Perfil comportamental</label>
                  <textarea disabled={dis} value={perfilComportamental} onChange={(e) => setPerfilComportamental(e.target.value)} rows={4} className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-xl disabled:bg-[var(--surface-muted)]" placeholder="Ex: comunicador, analítico, executor..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Atividade cerebral</label>
                  <textarea disabled={dis} value={atividadeCerebral} onChange={(e) => setAtividadeCerebral(e.target.value)} rows={3} className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-xl disabled:bg-[var(--surface-muted)]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Campo de atuação</label>
                  {!dis ? (
                    <select value={atuacao} onChange={(e) => setAtuacao(e.target.value)} className="w-full px-3 py-2 text-sm font-normal border rounded-xl bg-white">
                      <option value="">Selecione</option>
                      {atuacoesLista.map((a) => <option key={a.id} value={a.nome}>{a.nome}</option>)}
                      {atuacao && !atuacoesLista.some((a) => a.nome === atuacao) && <option value={atuacao}>{atuacao}</option>}
                    </select>
                  ) : (
                    <p className="mt-0.5 text-sm font-medium text-[var(--text-heading)]">{atuacao || '—'}</p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {abaAtiva === 'financeiro' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Histórico Contribuitivo</h4>
                  <p className="text-xs text-emerald-600 mt-0.5">Lançamentos vinculados a este membro no ano corrente.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalReceitaAberto(true)}
                  className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
                >
                  + Nova Receita
                </button>
              </div>

              {/* Tabela de Transações do Membro */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="p-3">Data</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Conta/Caixa</th>
                      <th className="p-3">Descrição</th>
                      <th className="p-3 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {contribuicoes.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-slate-400 italic">Nenhum lançamento vinculado a este membro.</td></tr>
                    ) : (
                      contribuicoes.map((t) => (
                        <tr key={t.id}>
                          <td className="p-3 font-medium">{new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.tipo === 'receita' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                              {t.categorias_financeiras?.nome || '—'}
                            </span>
                          </td>
                          <td className="p-3">{t.contas_financeiras?.nome || '—'}</td>
                          <td className="p-3">{t.descricao || '—'}</td>
                          <td className={`p-3 text-right font-bold ${t.tipo === 'receita' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            R$ {Number(t.valor).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {isStudentCadernetaView && abaAtiva === 'caderneta' && (
            <Card className="p-0">
              <CardHeader titulo="Caderneta Escolar" subtitulo="Notas e desempenho do aluno nos módulos do curso." />
              <div className="card-body-full space-y-4">
                {carregando ? (
                  <p className="text-sm text-slate-400 italic">Carregando caderneta...</p>
                ) : cadernetaDados?.modulos?.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">Nenhuma avaliação registrada ainda.</p>
                ) : (
                  cadernetaDados?.modulos.map((modulo, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2">{modulo.nome}</h4>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-500 uppercase font-semibold">
                            <th className="py-1">Avaliação</th>
                            <th className="py-1 text-right">Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modulo.avaliacoes.map((aval, aIdx) => (
                            <tr key={aIdx}>
                              <td className="py-1">{aval.tipo}</td>
                              <td className="py-1 text-right font-bold text-slate-700">{aval.nota.toFixed(1)}</td>
                            </tr>
                          ))}
                          <tr className={`font-bold border-t border-slate-200 ${modulo.media < 7 ? 'text-rose-600' : 'text-[#055F6D]'}`}>
                            <td className="py-1">Média do Módulo</td>
                            <td className="py-1 text-right">{modulo.media.toFixed(1)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))
                )}
              </div>
            </Card>
          )}

          {isStudentCadernetaView && abaAtiva === 'faltas' && (
            <Card className="p-0">
              <CardHeader titulo="Registro de Faltas" subtitulo="Controle de ausências do aluno por módulo." />
              <div className="card-body-full space-y-4">
                {carregando ? (
                  <p className="text-sm text-slate-400 italic">Carregando faltas...</p>
                ) : faltasDados?.modulos?.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">Nenhuma falta registrada.</p>
                ) : (
                  <>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-2">Faltas por Módulo</h4>
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-500 uppercase font-semibold">
                            <th className="py-1">Módulo</th>
                            <th className="py-1 text-right">Faltas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faltasDados?.modulos.map((modulo, idx) => (
                            <tr key={idx}>
                              <td className="py-1">{modulo.nome}</td>
                              <td className="py-1 text-right font-bold text-rose-600">{modulo.faltas}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-sm font-bold text-rose-700">
                      Total de Faltas: {faltasDados?.total}
                    </div>
                  </>
                )}
              </div>
            </Card>
          )}

          {isStudentCadernetaView && abaAtiva === 'crescimento' && (
            <Card className="p-0">
              <CardHeader titulo="Avaliação de Crescimento" subtitulo="Observações sobre o desenvolvimento do aluno na escola." />
              <div className="card-body-full space-y-4">
                {carregando ? (
                  <p className="text-sm text-slate-400 italic">Carregando avaliação...</p>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">Observações do Professor</h4>
                    <textarea
                      value={crescimentoDados?.observacoes || ''}
                      onChange={(e) => setCrescimentoDados({ ...crescimentoDados, observacoes: e.target.value })}
                      rows="5"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Registre aqui as observações sobre o crescimento e desenvolvimento do aluno..."
                      disabled={!modoEdicao} // Apenas editável em modo de edição
                    />
                  </div>
                )}
              </div>
            </Card>
          )}

          {abaAtiva === 'permissoes' && (
            <Card className="p-0">
              <CardHeader
                titulo="Permissões"
                subtitulo={`Módulos vinculados ao perfil ${permissao || cargo || 'membro'}.`}
              />
              <div className="card-body-full space-y-3">
              {!dis && (
                <AcessoSistemaPanel
                  membro={membro}
                  email={email}
                  permissao={permissao}
                  setPermissao={setPermissao}
                  senhaNovoAcesso={senhaNovoAcesso}
                  setSenhaNovoAcesso={setSenhaNovoAcesso}
                  confirmarSenhaNovoAcesso={confirmarSenhaNovoAcesso}
                  setConfirmarSenhaNovoAcesso={setConfirmarSenhaNovoAcesso}
                  criandoAcesso={criandoAcesso}
                  mensagemAcesso={mensagemAcesso}
                  onCriarAcesso={handleCriarAcessoSistema}
                />
              )}
              <div className="overflow-x-auto">
                <table className="table-mib">
                  <thead>
                    <tr>
                      <th>Módulo</th>
                      <th>Bloco / recurso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissoesVinculadas.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="text-center py-6 text-[var(--text-muted)]">Nenhum vínculo de permissão definido.</td>
                      </tr>
                    ) : (
                      permissoesVinculadas.map((item, idx) => (
                        <tr key={`${item.modulo}-${item.bloco}-${idx}`}>
                          <td className="font-medium text-[var(--text-heading)]">{item.modulo}</td>
                          <td>{item.bloco}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              </div>
            </Card>
          )}

          {modoEdicao && (
            <>
              {/* Botão flutuante — visível em qualquer posição da página */}
              <div className="fixed bottom-6 right-6 z-50 flex gap-2 items-center print:hidden">
                <button
                  type="button"
                  onClick={() => { setModoEdicao(false); preencherFormulario(membro); }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium shadow-lg hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvando}
                  className="btn-primary text-xs font-semibold px-6 py-2.5 rounded-xl disabled:opacity-50 shadow-xl flex items-center gap-2 ring-2 ring-[var(--brand)] ring-offset-2 transition"
                >
                  {salvando ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                      Salvando...
                    </>
                  ) : (
                    <>💾 Salvar Alterações</>
                  )}
                </button>
              </div>
              {/* Espaço no rodapé para não sobrepor conteúdo */}
              <div className="h-20" />
            </>
          )}
        </form>
      </Card>

      {isModalReceitaAberto && (
        <ModalLancarTransacao
          tipo="receita"
          onFechar={() => setIsModalReceitaAberto(false)}
          contas={contasFinanceiras}
          categorias={categoriasFinanceiras.filter(c => c.tipo === 'receita')}
          pessoas={listaPessoas}
          pessoaIdInicial={pessoaId}
          onSucesso={() => {
            setIsModalReceitaAberto(false);
            carregarFinanceiro();
          }}
        />
      )}
    </div>
  );
}

function AcessoSistemaPanel({
  membro,
  email,
  permissao,
  setPermissao,
  senhaNovoAcesso,
  setSenhaNovoAcesso,
  confirmarSenhaNovoAcesso,
  setConfirmarSenhaNovoAcesso,
  criandoAcesso,
  mensagemAcesso,
  onCriarAcesso,
}) {
  const acessoAtivo = Boolean(membro?.auth_user_id || membro?.acesso_ativo);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-medium text-[var(--text-muted)] mb-0.5">Perfil de permissão (sistema)</label>
        <select value={permissao} onChange={(e) => setPermissao(e.target.value)} className="w-full max-w-md px-3 py-2 text-sm border border-[var(--border)] rounded-xl bg-white">
          <option value="">Usar cargo do membro</option>
          <option value="admin">Admin</option>
          <option value="pastor">Pastor</option>
          <option value="lider-celula">Líder de Célula</option>
          <option value="secretaria">Secretaria</option>
          <option value="tesouraria">Tesouraria</option>
          <option value="membro">Membro</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">Acesso ao sistema</p>
            <p className="text-xs text-slate-500">
              {acessoAtivo
                ? 'Este membro já possui usuário vinculado ao Supabase Auth.'
                : 'Crie um usuário e senha para este membro acessar o painel.'}
            </p>
          </div>
          {acessoAtivo && (
            <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
              Acesso ativo
            </span>
          )}
        </div>

        {!acessoAtivo && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Senha inicial</label>
              <input type="password" value={senhaNovoAcesso} onChange={(e) => setSenhaNovoAcesso(e.target.value)} minLength={6} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Confirmar senha</label>
              <input type="password" value={confirmarSenhaNovoAcesso} onChange={(e) => setConfirmarSenhaNovoAcesso(e.target.value)} minLength={6} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white text-slate-800" />
            </div>
            <button type="button" onClick={onCriarAcesso} disabled={criandoAcesso} className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50">
              {criandoAcesso ? 'Criando...' : 'Criar usuário'}
            </button>
          </div>
        )}

        {!email.trim() && (
          <p className="text-xs font-semibold text-amber-700">Informe um e-mail na aba Dados Pessoais antes de criar o acesso.</p>
        )}
        {mensagemAcesso && (
          <p className={`text-xs font-semibold ${mensagemAcesso.startsWith('Acesso') ? 'text-emerald-700' : 'text-rose-700'}`}>
            {mensagemAcesso}
          </p>
        )}
      </div>
    </div>
  );
}

export default DetalhesMembro;
