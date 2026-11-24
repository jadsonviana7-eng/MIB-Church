import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import { Card, PageHeader } from './ui';
import {
  FileText,
  Printer,
  Bus,
  Building2,
  ClipboardList,
  ShieldCheck,
  HeartHandshake,
  Save,
  Trash2,
  Clock,
  Upload,
  Eye,
  Edit3,
  UserCheck,
  Sparkles,
  ChevronLeft,
  ArrowRight,
  Plus,
  X,
} from 'lucide-react';
import { mascaraCNPJ, mascaraCPF, mascaraTelefone } from './mascaras';

const STORAGE_HISTORICO_KEY = 'mib_docs_gerados_v1';
const STORAGE_ASSINATURA_KEY = 'mib_docs_assinatura_img';
const STORAGE_DOC_MODELOS_KEY = 'mib_doc_modelos_custom_v1';

const MESES_EXTENSO = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

function dataExtenso(isoDate) {
  if (!isoDate) {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')} de ${MESES_EXTENSO[d.getMonth()]} de ${d.getFullYear()}`;
  }
  const m = String(isoDate).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return isoDate;
  const dia = m[3];
  const mes = MESES_EXTENSO[Math.max(0, Math.min(11, parseInt(m[2], 10) - 1))];
  return `${dia} de ${mes} de ${m[1]}`;
}

function formatarDataBR(val) {
  if (!val) return '—';
  const m = String(val).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  return val;
}

const MODELOS_DOCUMENTO = [
  {
    id: 'oficio-transporte',
    categoria: 'Ofício',
    titulo: 'Solicitação de Transporte Público',
    desc: 'Pedido oficial de ônibus ou transporte para congressos e eventos.',
    icon: Bus,
    cor: 'from-blue-600 to-indigo-600',
    tipoLayout: 'timbrado',
  },
  {
    id: 'oficio-espaco',
    categoria: 'Ofício',
    titulo: 'Liberação de Espaço / Escola',
    desc: 'Solicitação de escola, quadra, auditório ou salas para eventos e cursos.',
    icon: Building2,
    cor: 'from-emerald-600 to-teal-600',
    tipoLayout: 'timbrado',
  },
  {
    id: 'oficio-livre',
    categoria: 'Ofício',
    titulo: 'Ofício Personalizado',
    desc: 'Papel timbrado oficial Betesda pronto para qualquer solicitação formal.',
    icon: FileText,
    cor: 'from-slate-700 to-slate-900',
    tipoLayout: 'timbrado',
  },
  {
    id: 'ata-reuniao',
    categoria: 'Ata',
    titulo: 'Ata de Reunião / Assembleia',
    desc: 'Registro formal de pauta, deliberações, participantes e assinaturas.',
    icon: ClipboardList,
    cor: 'from-amber-600 to-orange-600',
    tipoLayout: 'timbrado',
  },
  {
    id: 'declaracao-membresia',
    categoria: 'Declaração',
    titulo: 'Declaração de Membresia / Carta',
    desc: 'Declaração oficial preenchida automaticamente com dados de um membro.',
    icon: ShieldCheck,
    cor: 'from-cyan-600 to-blue-600',
    tipoLayout: 'timbrado',
  },
  {
    id: 'termo-casamento',
    categoria: 'Termo Civil-Religioso',
    titulo: 'Termo de Casamento Religioso',
    desc: 'Termo jurídico completo com efeitos civis (Art. 1.516 do Código Civil).',
    icon: HeartHandshake,
    cor: 'from-rose-600 to-pink-600',
    tipoLayout: 'juridico-casamento',
  },
];

function criarConteudoPadrao(modeloId, igreja) {
  const nomeIgreja = (igreja?.nome_igreja || 'IGREJA BATISTA INTERNACIONAL BETESDA').toUpperCase();
  const cnpj = igreja?.cnpj ? mascaraCNPJ(igreja.cnpj) : '09.157.067/0001-09';
  const enderecoBase = [
    igreja?.endereco || 'Quadra 15 s/n',
    igreja?.bairro ? `no ${igreja.bairro}` : 'no Residencial Jussara',
  ].filter(Boolean).join(', ');
  const cidade = igreja?.cidade || 'Santana do Mundaú';
  const hojeIso = new Date().toISOString().split('T')[0];

  if (modeloId === 'oficio-transporte') {
    return {
      data: hojeIso,
      tituloDoc: 'SOLICITAÇÃO DE TRANSPORTE PÚBLICO',
      saudacaoTopo: 'À,',
      destinatarioCargo: `Ilma. Secretária da Educação do Município de ${cidade},`,
      destinatarioNome: 'Sra. DANIELE MÁRCIA DA ROCHA MELO',
      corpo:
        `A ${nomeIgreja}, CNPJ nº ${cnpj}, situada à ${enderecoBase}, neste município, vem por meio desta, solicitar junto à Secretaria de Educação Municipal a concessão de um transporte público (ônibus), com capacidade para 30 pessoas, para o nosso Congresso anual, no município de União dos Palmares, nos dias 14 e 15 — sábado e domingo — de novembro de ${new Date().getFullYear()}, saindo às 18h, e retornando às 22h.\n\n` +
        `Renovo à Ilma. Secretária meus protestos de profundo respeito e apreço, na certeza de que buscamos sempre o que há de melhor para a nossa gente.\n\n` +
        `Certos de que podemos contar sempre com o apoio de Vossa Excelência.`,
      despedida: 'Atenciosamente,',
      assinanteNome: igreja?.pastor_responsavel || 'Jadson S. Viana',
      assinanteCargo: 'Pastor Local',
      segundoAssinanteNome: '',
      segundoAssinanteCargo: '',
    };
  }

  if (modeloId === 'oficio-espaco') {
    return {
      data: hojeIso,
      tituloDoc: 'OFÍCIO',
      saudacaoTopo: '',
      destinatarioCargo: `Ilma. Secretária da Educação do Município de ${cidade},`,
      destinatarioNome: 'Sra. DANIELE MÁRCIA DA ROCHA MELO',
      corpo:
        `A ${nomeIgreja}, CNPJ nº ${cnpj}, vem por meio deste solicitar a V.S.ª a liberação do espaço interno da ESCOLA MUNICIPAL PEQUENO PRÍNCIPE, bem como auditórios, salas de aulas, cozinha, banheiros e a quadra para realização do evento de cunho religioso, denominado "Encontro com Deus", realizado pela nossa instituição. O evento acontecerá nos dias 17, 18 e 19 de abril de ${new Date().getFullYear()}, em tempo integral. Afirmamos o nosso compromisso de deixar os ambientes utilizados em perfeito estado de organização e limpeza.\n\n` +
        `Desde então, contamos com o apoio de V.S.ª na intenção de oferecer à nossa comunidade uma resposta positiva.\n\n` +
        `Renovo a V.S.ª meus votos de profundo respeito e apreço, na certeza de que buscamos sempre o que há de melhor para a nossa gente.`,
      despedida: 'Atenciosamente,',
      assinanteNome: igreja?.pastor_responsavel || 'Jadson S. Viana',
      assinanteCargo: 'Pastor Local',
      segundoAssinanteNome: '',
      segundoAssinanteCargo: '',
    };
  }

  if (modeloId === 'ata-reuniao') {
    return {
      data: hojeIso,
      tituloDoc: 'ATA DE REUNIÃO ADMINISTRATIVA / MINISTERIAL',
      saudacaoTopo: '',
      destinatarioCargo: 'ATA Nº 01/' + new Date().getFullYear(),
      destinatarioNome: `LOCAL: SEDE DA ${nomeIgreja} — ${cidade.toUpperCase()}`,
      corpo:
        `Aos ${dataExtenso(hojeIso)}, às 19h30, reuniram-se nas dependências da ${nomeIgreja}, CNPJ nº ${cnpj}, os membros da diretoria, liderança e convocados, sob a presidência do Pastor Local, para tratar da seguinte ordem do dia:\n\n` +
        `1. Abertura com oração e devocional;\n` +
        `2. Leitura e aprovação da ata anterior;\n` +
        `3. Planejamento das atividades, eventos e prestação de contas do período;\n` +
        `4. Deliberações gerais e encaminhamentos ministeriais.\n\n` +
        `Após ampla discussão e aprovação unânime dos pontos deliberados pelos presentes, nada mais havendo a tratar, o Presidente encerrou a reunião com uma oração de gratidão, e eu, Secretário(a), lavrei a presente ata que vai assinada por mim e pelo Presidente.`,
      despedida: `${cidade}, ${dataExtenso(hojeIso)}.`,
      assinanteNome: igreja?.pastor_responsavel || 'Jadson S. Viana',
      assinanteCargo: 'Presidente / Pastor Local',
      segundoAssinanteNome: 'Secretário(a) da Reunião',
      segundoAssinanteCargo: 'Secretaria',
    };
  }

  if (modeloId === 'declaracao-membresia') {
    return {
      data: hojeIso,
      tituloDoc: 'DECLARAÇÃO DE MEMBRESIA',
      saudacaoTopo: '',
      destinatarioCargo: 'A QUEM POSSA INTERESSAR',
      destinatarioNome: '',
      corpo:
        `Declaramos, para os devidos fins que se fizerem necessários, que [SELECIONE UM MEMBRO ACIMA], portador(a) do CPF nº ___.____.___-__ e RG nº __________, é membro regularmente arrolado(a) e em plena comunhão nesta ${nomeIgreja}, inscrita no CNPJ sob o nº ${cnpj}, exercendo suas atividades cristãs com boa conduta moral e espiritual.\n\n` +
        `Por ser expressão da verdade, firmamos a presente declaração.`,
      despedida: 'Atenciosamente,',
      assinanteNome: igreja?.pastor_responsavel || 'Jadson S. Viana',
      assinanteCargo: 'Pastor Local',
      segundoAssinanteNome: '',
      segundoAssinanteCargo: '',
    };
  }

  return {
    data: hojeIso,
    tituloDoc: 'OFÍCIO',
    saudacaoTopo: 'À,',
    destinatarioCargo: 'Ilmo(a). Sr(a).',
    destinatarioNome: 'NOME DO DESTINATÁRIO',
    corpo:
      `A ${nomeIgreja}, inscrita no CNPJ nº ${cnpj}, vem respeitosamente por meio deste dirigir-se a Vossa Senhoria para tratar do seguinte assunto:\n\n` +
      `[Descreva aqui a solicitação ou comunicado oficial com datas, horários e informações relevantes.]\n\n` +
      `Renovamos nossos votos de elevada estima e consideração.`,
    despedida: 'Atenciosamente,',
    assinanteNome: igreja?.pastor_responsavel || 'Jadson S. Viana',
    assinanteCargo: 'Pastor Local',
    segundoAssinanteNome: '',
    segundoAssinanteCargo: '',
  };
}

function criarCasamentoPadrao(igreja, membroLogado) {
  const sede = [
    igreja?.endereco ? `${igreja.endereco}${igreja.numero ? `, número ${igreja.numero}` : ''}` : 'Rua Tavares Bastos, número 125',
    igreja?.bairro || 'Centro',
    igreja?.cidade && igreja?.estado ? `${igreja.cidade}/${igreja.estado}` : 'Santana do Mundaú/AL',
    igreja?.cep ? `CEP: ${igreja.cep}` : 'CEP: 57840-000',
  ].filter(Boolean).join(', ');

  return {
    // Nubente 1 (Habilitante Masculino)
    n1Nome: '',
    n1Nacionalidade: 'brasileira',
    n1Profissao: '',
    n1EstadoCivil: 'solteiro',
    n1Idade: '',
    n1Naturalidade: '',
    n1DataNasc: '',
    n1Pai: '',
    n1Mae: '',
    // Nubente 2 (Habilitante Feminino)
    n2Nome: '',
    n2Nacionalidade: 'brasileira',
    n2Profissao: '',
    n2EstadoCivil: 'solteira',
    n2Idade: '',
    n2Naturalidade: '',
    n2DataNasc: '',
    n2Pai: '',
    n2Mae: '',
    // Testemunha 1
    t1Nome: '',
    t1Cpf: '',
    t1Nacionalidade: 'brasileiro',
    t1EstadoCivil: 'casado',
    t1Profissao: '',
    t1Endereco: '',
    // Testemunha 2
    t2Nome: '',
    t2Cpf: '',
    t2Nacionalidade: 'brasileira',
    t2EstadoCivil: 'casada',
    t2Profissao: '',
    t2Endereco: '',
    // Registro Civil
    cartorio: 'REGISTRO CIVIL DOS CASAMENTOS E NOTAS',
    validadeAte: '',
    regimeBens: 'comunhão parcial de bens',
    alteracaoNomes: 'Em virtude do casamento o habilitante continuará a usar o mesmo nome e a habilitante continuará a usar o mesmo nome.',
    // Ato Religioso
    dataCerimoniaExtenso: dataExtenso(new Date().toISOString().split('T')[0]),
    localEvento: '',
    enderecoEvento: '',
    praticaReligiosa: 'Protestantismo',
    nomeIgreja: igreja?.nome_igreja || 'Igreja Batista Internacional Betesda',
    sedeIgreja: sede,
    cnpjIgreja: igreja?.cnpj ? mascaraCNPJ(igreja.cnpj) : '09.157.067/0001-09',
    telefoneEmailIgreja: `${igreja?.telefone ? mascaraTelefone(igreja.telefone) : '(82) 98228-9108'} / ${igreja?.email_contato || ''}`,
    celebranteNome: igreja?.pastor_responsavel || membroLogado?.nome || '',
    celebranteCpf: membroLogado?.cpf ? mascaraCPF(membroLogado.cpf) : '',
    celebranteCargo: 'Pastor',
  };
}

export default function GeradorDocumentos({ pessoas = [], membroLogado = null, onVoltar = null }) {
  const [dadosIgreja, setDadosIgreja] = useState(null);
  const [modeloAtivo, setModeloAtivo] = useState('oficio-transporte');
  const [docForm, setDocForm] = useState(() => criarConteudoPadrao('oficio-transporte', null));
  const [casamentoForm, setCasamentoForm] = useState(() => criarCasamentoPadrao(null, membroLogado));
  const [membroDeclaracaoId, setMembroDeclaracaoId] = useState('');
  const [mobileEditorAberto, setMobileEditorAberto] = useState(false);
  const [abaMobile, setAbaMobile] = useState('editor'); // 'editor' | 'preview'
  const [assinaturaImg, setAssinaturaImg] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_ASSINATURA_KEY) || '';
    } catch {
      return '';
    }
  });
  const [mostrarAssinaturaImg, setMostrarAssinaturaImg] = useState(true);
  const [historicoDocs, setHistoricoDocs] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_HISTORICO_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [msgSalvo, setMsgSalvo] = useState('');
  const [modelosCustom, setModelosCustom] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_DOC_MODELOS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [modalNovoModeloAberto, setModalNovoModeloAberto] = useState(false);
  const [novoModeloDocForm, setNovoModeloDocForm] = useState({
    titulo: '',
    categoria: 'Ofício',
    desc: '',
    tituloDoc: 'OFÍCIO',
    saudacaoTopo: 'À,',
    destinatarioCargo: '',
    destinatarioNome: '',
    corpo: '',
    despedida: 'Atenciosamente,',
    assinanteCargo: 'Pastor Local',
    segundoAssinanteNome: '',
    segundoAssinanteCargo: '',
  });

  useEffect(() => {
    let ativo = true;
    supabase
      .from('dados_igreja')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (!ativo || !data) return;
        setDadosIgreja(data);
        setDocForm(criarConteudoPadrao('oficio-transporte', data));
        setCasamentoForm(criarCasamentoPadrao(data, membroLogado));
      })
      .catch(() => {});
    return () => { ativo = false; };
  }, [membroLogado]);

  const todosModelos = useMemo(() => {
    const customAdaptados = modelosCustom.map((m) => ({
      ...m,
      icon: FileText,
      cor: 'from-violet-600 to-purple-600',
      tipoLayout: 'timbrado',
      isCustom: true,
    }));
    return [...MODELOS_DOCUMENTO, ...customAdaptados];
  }, [modelosCustom]);

  const modeloObj = useMemo(
    () => todosModelos.find((m) => m.id === modeloAtivo) || todosModelos[0],
    [modeloAtivo, todosModelos]
  );

  const selecionarModelo = (id, abrirMobile = true) => {
    setModeloAtivo(id);
    if (id === 'termo-casamento') {
      setCasamentoForm(criarCasamentoPadrao(dadosIgreja, membroLogado));
    } else {
      const custom = modelosCustom.find((m) => m.id === id);
      if (custom) {
        const hojeIso = new Date().toISOString().split('T')[0];
        setDocForm({
          data: hojeIso,
          tituloDoc: custom.tituloDoc || custom.titulo || 'OFÍCIO',
          saudacaoTopo: custom.saudacaoTopo || '',
          destinatarioCargo: custom.destinatarioCargo || '',
          destinatarioNome: custom.destinatarioNome || '',
          corpo: custom.corpo || '',
          despedida: custom.despedida || 'Atenciosamente,',
          assinanteNome: dadosIgreja?.pastor_responsavel || 'Jadson S. Viana',
          assinanteCargo: custom.assinanteCargo || 'Pastor Local',
          segundoAssinanteNome: custom.segundoAssinanteNome || '',
          segundoAssinanteCargo: custom.segundoAssinanteCargo || '',
        });
      } else {
        setDocForm(criarConteudoPadrao(id, dadosIgreja));
      }
      setMembroDeclaracaoId('');
    }
    if (abrirMobile) {
      setMobileEditorAberto(true);
      setAbaMobile('editor');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const abrirModalNovoModelo = (usarAtual = false) => {
    if (usarAtual && modeloAtivo !== 'termo-casamento') {
      setNovoModeloDocForm({
        titulo: '',
        categoria: modeloObj?.categoria || 'Ofício',
        desc: '',
        tituloDoc: docForm.tituloDoc || 'OFÍCIO',
        saudacaoTopo: docForm.saudacaoTopo || '',
        destinatarioCargo: docForm.destinatarioCargo || '',
        destinatarioNome: docForm.destinatarioNome || '',
        corpo: docForm.corpo || '',
        despedida: docForm.despedida || 'Atenciosamente,',
        assinanteCargo: docForm.assinanteCargo || 'Pastor Local',
        segundoAssinanteNome: docForm.segundoAssinanteNome || '',
        segundoAssinanteCargo: docForm.segundoAssinanteCargo || '',
      });
    } else {
      setNovoModeloDocForm({
        titulo: '',
        categoria: 'Ofício',
        desc: '',
        tituloDoc: 'OFÍCIO',
        saudacaoTopo: 'À,',
        destinatarioCargo: '',
        destinatarioNome: '',
        corpo: '',
        despedida: 'Atenciosamente,',
        assinanteCargo: 'Pastor Local',
        segundoAssinanteNome: '',
        segundoAssinanteCargo: '',
      });
    }
    setModalNovoModeloAberto(true);
  };

  const handleSalvarNovoModeloDoc = (e) => {
    e.preventDefault();
    if (!novoModeloDocForm.titulo.trim()) return;
    const novo = {
      id: `doc-custom-${Date.now()}`,
      titulo: novoModeloDocForm.titulo.trim(),
      categoria: novoModeloDocForm.categoria.trim() || 'Personalizado',
      desc: novoModeloDocForm.desc.trim() || 'Modelo pré-pronto personalizado da igreja.',
      tituloDoc: novoModeloDocForm.tituloDoc.trim() || novoModeloDocForm.titulo.trim().toUpperCase(),
      saudacaoTopo: novoModeloDocForm.saudacaoTopo,
      destinatarioCargo: novoModeloDocForm.destinatarioCargo,
      destinatarioNome: novoModeloDocForm.destinatarioNome,
      corpo: novoModeloDocForm.corpo,
      despedida: novoModeloDocForm.despedida,
      assinanteCargo: novoModeloDocForm.assinanteCargo || 'Pastor Local',
      segundoAssinanteNome: novoModeloDocForm.segundoAssinanteNome,
      segundoAssinanteCargo: novoModeloDocForm.segundoAssinanteCargo,
    };
    const novaLista = [...modelosCustom, novo];
    setModelosCustom(novaLista);
    try {
      localStorage.setItem(STORAGE_DOC_MODELOS_KEY, JSON.stringify(novaLista));
    } catch {
      // ignora
    }
    setModalNovoModeloAberto(false);
    setModeloAtivo(novo.id);
    setDocForm({
      data: new Date().toISOString().split('T')[0],
      tituloDoc: novo.tituloDoc,
      saudacaoTopo: novo.saudacaoTopo,
      destinatarioCargo: novo.destinatarioCargo,
      destinatarioNome: novo.destinatarioNome,
      corpo: novo.corpo,
      despedida: novo.despedida,
      assinanteNome: dadosIgreja?.pastor_responsavel || 'Jadson S. Viana',
      assinanteCargo: novo.assinanteCargo,
      segundoAssinanteNome: novo.segundoAssinanteNome,
      segundoAssinanteCargo: novo.segundoAssinanteCargo,
    });
    setMsgSalvo('Modelo pré-pronto salvo!');
    setTimeout(() => setMsgSalvo(''), 3000);
  };

  const handleExcluirModeloCustom = (e, id) => {
    e.stopPropagation();
    const novaLista = modelosCustom.filter((m) => m.id !== id);
    setModelosCustom(novaLista);
    try {
      localStorage.setItem(STORAGE_DOC_MODELOS_KEY, JSON.stringify(novaLista));
    } catch {
      // ignora
    }
    if (modeloAtivo === id) {
      selecionarModelo('oficio-transporte', false);
    }
  };

  const preencherDeclaracaoComMembro = (idPessoa) => {
    setMembroDeclaracaoId(idPessoa);
    const p = pessoas.find((item) => String(item.id) === String(idPessoa));
    if (!p) return;
    const nomeIgreja = (dadosIgreja?.nome_igreja || 'IGREJA BATISTA INTERNACIONAL BETESDA').toUpperCase();
    const cnpj = dadosIgreja?.cnpj ? mascaraCNPJ(dadosIgreja.cnpj) : '09.157.067/0001-09';
    const cpfTxt = p.cpf ? mascaraCPF(p.cpf) : 'não informado';
    const rgTxt = p.rg || 'não informado';
    const filiado = formatarDataBR(p.data_batismo || p.created_at);
    const cargoTxt = p.cargo ? `, exercendo a função de ${p.cargo}` : '';

    setDocForm((prev) => ({
      ...prev,
      corpo:
        `Declaramos, para os devidos fins que se fizerem necessários, que ${p.nome.toUpperCase()}, portador(a) do CPF nº ${cpfTxt} e RG nº ${rgTxt}, é membro regularmente arrolado(a) e em plena comunhão nesta ${nomeIgreja}, inscrita no CNPJ sob o nº ${cnpj}, desde ${filiado}${cargoTxt}, mantendo conduta cristã ilibada.\n\n` +
        `Por ser expressão da verdade, firmamos a presente declaração.`,
    }));
  };

  const handleUploadAssinatura = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      setAssinaturaImg(dataUrl);
      setMostrarAssinaturaImg(true);
      try {
        localStorage.setItem(STORAGE_ASSINATURA_KEY, dataUrl);
      } catch {
        // storage cheio
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSalvarRascunho = () => {
    const novo = {
      id: Date.now().toString(),
      modeloId: modeloAtivo,
      categoria: modeloObj.categoria,
      titulo:
        modeloAtivo === 'termo-casamento'
          ? `Casamento: ${casamentoForm.n1Nome || 'Nubente 1'} e ${casamentoForm.n2Nome || 'Nubente 2'}`
          : `${docForm.tituloDoc || modeloObj.titulo}${docForm.destinatarioNome ? ` — ${docForm.destinatarioNome}` : ''}`,
      criadoEm: new Date().toISOString(),
      payload: modeloAtivo === 'termo-casamento' ? casamentoForm : docForm,
    };
    const novaLista = [novo, ...historicoDocs].slice(0, 20);
    setHistoricoDocs(novaLista);
    try {
      localStorage.setItem(STORAGE_HISTORICO_KEY, JSON.stringify(novaLista));
    } catch {
      // ignora
    }
    setMsgSalvo('Documento salvo em "Recentes"!');
    setTimeout(() => setMsgSalvo(''), 3000);
  };

  const carregarRascunho = (item) => {
    setModeloAtivo(item.modeloId);
    if (item.modeloId === 'termo-casamento') {
      setCasamentoForm(item.payload);
    } else {
      setDocForm(item.payload);
    }
    setMobileEditorAberto(true);
    setAbaMobile('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const excluirRascunho = (id) => {
    const novaLista = historicoDocs.filter((h) => h.id !== id);
    setHistoricoDocs(novaLista);
    try {
      localStorage.setItem(STORAGE_HISTORICO_KEY, JSON.stringify(novaLista));
    } catch {
      // ignora
    }
  };

  // Dados institucionais formatados para o Papel Timbrado
  const timbrado = useMemo(() => {
    const nome = (dadosIgreja?.nome_igreja || 'IGREJA BATISTA INTERNACIONAL BETESDA').toUpperCase();
    const cnpj = dadosIgreja?.cnpj ? mascaraCNPJ(dadosIgreja.cnpj) : '09.157.067/0001-09';
    const tel = dadosIgreja?.telefone ? mascaraTelefone(dadosIgreja.telefone) : '(82) 98228-9108';
    const cidade = dadosIgreja?.cidade || 'Santana do Mundaú';
    const uf = dadosIgreja?.estado || 'AL';
    const cep = dadosIgreja?.cep || '57840-000';
    const endLinha1 = [
      dadosIgreja?.endereco || 'CJ. Residencial Santana do Mundaú s/n',
      dadosIgreja?.numero ? `nº ${dadosIgreja.numero}` : '',
      dadosIgreja?.bairro ? `- ${dadosIgreja.bairro}` : '- Bairro Urbano',
    ].filter(Boolean).join(' ');
    const endLinha2 = `${cidade} - ${uf} - CEP: ${cep}`;
    return { nome, cnpj, tel, cidade, uf, endLinha1, endLinha2 };
  }, [dadosIgreja]);

  // ── IMPRESSÃO / EXPORTAÇÃO PDF A4 ISOLADA (IMUNE AO MODO ESCURO) ──
  const handleImprimirPdf = () => {
    const esc = (s) =>
      String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const logoUrl = `${window.location.origin}/betesda-geral.png`;
    let htmlDoc = '';
    let nomeArquivo = 'MIB Church - Documento';

    if (modeloAtivo === 'termo-casamento') {
      const c = casamentoForm;
      nomeArquivo = `Termo de Casamento - ${c.n1Nome || 'Nubentes'}`;
      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(nomeArquivo)}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm 18mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #000000;
      font-family: 'Times New Roman', Georgia, serif;
      font-size: 10.8pt;
      line-height: 1.36;
    }
    h1 {
      text-align: center;
      font-size: 12.5pt;
      font-weight: 700;
      text-transform: uppercase;
      margin: 0 0 10pt;
      letter-spacing: 0.02em;
    }
    h2 {
      font-size: 10.8pt;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
      margin: 10pt 0 6pt;
    }
    .sec-left {
      text-align: left;
      text-decoration: underline;
      margin: 9pt 0 4pt;
    }
    p {
      margin: 0 0 6pt;
      text-align: justify;
    }
    .ato-list p {
      margin: 0 0 2.5pt;
      text-align: left;
    }
    .sigs {
      margin-top: 14pt;
      font-size: 10.2pt;
    }
    .sigs p {
      margin: 0 0 9pt;
      text-align: left;
    }
    .aviso-final {
      margin-top: 12pt;
      font-size: 9.2pt;
      font-weight: 700;
      text-align: justify;
      line-height: 1.3;
    }
  </style>
</head>
<body>
  <h1>TERMO DE CELEBRAÇÃO DE CASAMENTO RELIGIOSO</h1>

  <p><strong><u>NUBENTES:</u></strong> Os habilitantes <strong>${esc((c.n1Nome || '____________________').toUpperCase())}</strong> e <strong>${esc((c.n2Nome || '____________________').toUpperCase())}</strong></p>

  <p>O habilitante, de nacionalidade ${esc(c.n1Nacionalidade)}, de profissão ${esc(c.n1Profissao || '________')}, de estado civil ${esc(c.n1EstadoCivil)}, de ${esc(c.n1Idade || '__')} anos de idade, nascido em ${esc(c.n1Naturalidade || '________')}, no dia ${esc(c.n1DataNasc || '__/__/____')}. Filho(a) de <strong>${esc((c.n1Pai || '________________').toUpperCase())}</strong> e <strong>${esc((c.n1Mae || '________________').toUpperCase())}</strong>.</p>

  <p>A habilitante, de nacionalidade ${esc(c.n2Nacionalidade)}, de profissão ${esc(c.n2Profissao || '________')}, de estado civil ${esc(c.n2EstadoCivil)}, de ${esc(c.n2Idade || '__')} anos de idade, nascida em ${esc(c.n2Naturalidade || '________')}, no dia ${esc(c.n2DataNasc || '__/__/____')}. Filho(a) de <strong>${esc((c.n2Pai || '________________').toUpperCase())}</strong> e <strong>${esc((c.n2Mae || '________________').toUpperCase())}</strong>.</p>

  <h2 class="sec-left">TESTEMUNHAS</h2>
  <p><strong>1ª Testemunha</strong><br/>
  ${esc((c.t1Nome || '________________________').toUpperCase())}, CPF: ${esc(c.t1Cpf || '___.___.___-__')}, de nacionalidade ${esc(c.t1Nacionalidade)}, de estado civil ${esc(c.t1EstadoCivil)}, de profissão ${esc(c.t1Profissao || '________')}, residente na(o) ${esc(c.t1Endereco || '________________________')}.</p>

  <p><strong>2ª Testemunha</strong><br/>
  ${esc((c.t2Nome || '________________________').toUpperCase())}, CPF: ${esc(c.t2Cpf || '___.___.___-__')}, de nacionalidade ${esc(c.t2Nacionalidade)}, de estado civil ${esc(c.t2EstadoCivil)}, de profissão ${esc(c.t2Profissao || '________')}, residente na(o) ${esc(c.t2Endereco || '________________________')}.</p>

  <h2>INFORMAÇÕES PARA REGISTRO E EFEITOS CIVIS DO CASAMENTO RELIGIOSO</h2>
  <p><strong>CERTIFICADO HABILITAÇÃO</strong> / ${esc(c.cartorio.toUpperCase())}, VÁLIDO POR 90 DIAS${c.validadeAte ? `, ATÉ O DIA ${esc(c.validadeAte)}` : ''} - <strong>REGIME DE BENS ADOTADO:</strong> ${esc(c.regimeBens)}.</p>
  <p>${esc(c.alteracaoNomes)}</p>

  <h2><u>ATO RELIGIOSO</u></h2>
  <div class="ato-list">
    <p><strong>LOCAL DO EVENTO:</strong> ${esc(c.localEvento || '____________________')}</p>
    <p><strong>ENDEREÇO / EVENTO:</strong> ${esc(c.enderecoEvento || '____________________')}</p>
    <p><strong>PRÁTICA RELIGIOSA:</strong> ${esc(c.praticaReligiosa)}</p>
    <p><strong>NOME DA IGREJA:</strong> ${esc(c.nomeIgreja)}, com SEDE na ${esc(c.sedeIgreja)}, inscrita no CNPJ: ${esc(c.cnpjIgreja)}.</p>
    <p><strong>TELEFONE / EMAIL:</strong> ${esc(c.telefoneEmailIgreja)}</p>
    <p><strong>AUTORIDADE RELIGIOSA CELEBRANTE:</strong> ${esc(c.celebranteNome)}</p>
    <p><strong>CPF DO CELEBRANTE:</strong> ${esc(c.celebranteCpf || '___.___.___-__')}</p>
    <p><strong>CARGO/INVESTIDURA:</strong> ${esc(c.celebranteCargo)}</p>
  </div>

  <p style="margin-top:8pt;">
    No dia ${esc(c.dataCerimoniaExtenso)}, foi realizada a CERIMÔNIA RELIGIOSA DE CASAMENTO DOS NUBENTES qualificados neste termo, os quais, ao final, afirmaram que pretendiam se casar por livre e espontânea vontade, recebendo, um ao outro, como marido e mulher. A autoridade celebrante declarou os nubentes casados, dando por encerrado o ato religioso. Para constar, lavrei o presente TERMO DE CASAMENTO que segue assinado pela autoridade religiosa celebrante, pelos cônjuges e as testemunhas, todos presentes, cujo termo deverá ser apresentado no ${esc(c.cartorio)}, para cumprimento das formalidades legais e o devido registro, para que possa surtir os efeitos civis a partir da data da celebração. (§§ 1º e 2º do art. 1.516 c/c art. 1.525 e seguintes do Código Civil).
  </p>

  <div class="sigs">
    <p>Autoridade religiosa celebrante: __________________________________________________</p>
    <p>Nubente 01: ____________________________________________________________________</p>
    <p>Nubente 02: ____________________________________________________________________</p>
    <p>Testemunha 01: _________________________________________________________________</p>
    <p>Testemunha 02: _________________________________________________________________</p>
  </div>

  <div class="aviso-final">
    (OBRIGATÓRIO O RECONHECIMENTO DE FIRMA DA AUTORIDADE RELIGIOSA CELEBRANTE)<br/>
    (SOMENTE O CELEBRANTE OU OS NOIVOS PODEM REGISTRAR ESSE TERMO) <em>OBS.: EM CASO DE ALTERAÇÃO DE NOME, NESTE TERMO AINDA ASSINARÁ O NOME DE SOLTEIRO(A).</em>
  </div>
</body>
</html>`;
    } else {
      nomeArquivo = `${docForm.tituloDoc || 'Oficio'} - ${timbrado.cidade}`;
      const paragrafosHtml = String(docForm.corpo || '')
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p class="body-p">${esc(p).replace(/\n/g, '<br/>')}</p>`)
        .join('');

      const assinaturaImgHtml =
        assinaturaImg && mostrarAssinaturaImg
          ? `<img src="${assinaturaImg}" alt="Assinatura" class="sig-img" />`
          : `<div class="sig-spacer"></div>`;

      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(nomeArquivo)}</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #1e293b;
      font-family: 'Segoe UI', 'Calibri', Inter, Arial, sans-serif;
    }
    .a4-sheet {
      width: 210mm;
      min-height: 297mm;
      position: relative;
      display: flex;
      background: #ffffff;
      overflow: hidden;
    }
    /* Faixa lateral escura fiel ao timbrado Betesda */
    .left-bar {
      width: 22mm;
      background: #2b2d34;
      position: relative;
      flex-shrink: 0;
    }
    .left-notch {
      position: absolute;
      top: 17mm;
      right: -5mm;
      width: 10mm;
      height: 10mm;
      background: #2b2d34;
      transform: rotate(45deg);
    }
    .left-icons {
      position: absolute;
      bottom: 11mm;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-right: 0;
      gap: 6mm;
    }
    .icon-diamond {
      width: 11mm;
      height: 11mm;
      background: #2b2d34;
      border: 1.4pt solid #ffffff;
      transform: rotate(45deg);
      margin-right: -5.5mm;
    }
    .icon-pin-wrap {
      width: 12mm;
      height: 12mm;
      border-radius: 50%;
      background: #2b2d34;
      border: 1.4pt solid #ffffff;
      margin-right: -6mm;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 13pt;
    }
    /* Área Principal */
    .main-area {
      flex: 1;
      padding: 13mm 16mm 11mm 14mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .watermark {
      position: absolute;
      top: 0;
      right: 0;
      width: 105mm;
      height: 62mm;
      background: linear-gradient(135deg, transparent 42%, #f1f5f9 42%, #f1f5f9 72%, #e2e8f0 72%);
      opacity: 0.55;
      pointer-events: none;
    }
    .top-header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8mm;
      padding-bottom: 5mm;
      border-bottom: 1.3pt solid #0f172a;
    }
    .logo-col {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .logo-col img {
      height: 15mm;
      max-width: 82mm;
      object-fit: contain;
    }
    .logo-city {
      font-family: 'Brush Script MT', 'Segoe Script', Georgia, serif;
      font-size: 11.5pt;
      color: #0f172a;
      margin-top: -1.5mm;
      align-self: flex-end;
      padding-right: 2mm;
    }
    .pastor-col {
      border-left: 1.2pt solid #334155;
      padding-left: 5mm;
      font-size: 9.5pt;
      line-height: 1.35;
      color: #334155;
      min-width: 48mm;
    }
    .pastor-name { font-weight: 800; color: #0f172a; font-size: 10.5pt; }
    .date-line {
      text-align: right;
      font-size: 10pt;
      color: #475569;
      margin-top: 6mm;
    }
    .doc-title {
      text-align: center;
      font-size: 15pt;
      font-weight: 800;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin: 10mm 0 11mm;
    }
    .dest-block {
      margin-bottom: 8mm;
      font-size: 11pt;
      line-height: 1.5;
      color: #1e293b;
    }
    .dest-cargo { font-weight: 700; }
    .body-p {
      font-size: 11pt;
      line-height: 1.62;
      text-align: justify;
      text-indent: 12mm;
      margin: 0 0 5.5mm;
      color: #1e293b;
    }
    .closing-block {
      margin-top: 10mm;
    }
    .despedida {
      font-size: 11pt;
      color: #1e293b;
      margin-bottom: 2mm;
    }
    .sig-row {
      display: flex;
      justify-content: center;
      gap: 18mm;
      margin-top: 2mm;
    }
    .sig-col {
      text-align: center;
      min-width: 62mm;
    }
    .sig-img {
      height: 18mm;
      max-width: 56mm;
      object-fit: contain;
      display: block;
      margin: 0 auto -3mm;
    }
    .sig-spacer { height: 14mm; }
    .sig-name { font-size: 10.5pt; font-weight: 800; color: #0f172a; }
    .sig-role { font-size: 9.2pt; color: #475569; }
    .doc-footer {
      margin-top: auto;
      padding-top: 10mm;
      display: flex;
      flex-direction: column;
      gap: 5.5mm;
    }
    .foot-item {
      border-left: 1.2pt solid #334155;
      padding-left: 4mm;
      font-size: 9.5pt;
      line-height: 1.38;
      color: #334155;
    }
    .foot-item strong { color: #0f172a; }
  </style>
</head>
<body>
  <div class="a4-sheet">
    <div class="left-bar">
      <div class="left-notch"></div>
      <div class="left-icons">
        <div class="icon-diamond"></div>
        <div class="icon-pin-wrap">📍</div>
      </div>
    </div>

    <div class="main-area">
      <div class="watermark"></div>
      <div>
        <div class="top-header">
          <div class="logo-col">
            <img src="${esc(logoUrl)}" alt="${esc(timbrado.nome)}" />
            <span class="logo-city">${esc(timbrado.cidade)}</span>
          </div>
          <div class="pastor-col">
            <div class="pastor-name">${esc(docForm.assinanteNome || 'Jadson S. Viana')}</div>
            <div>${esc(docForm.assinanteCargo || 'Pastor Local')}</div>
            <div style="margin-top:3mm;">Contato:</div>
            <div>${esc(timbrado.tel)}</div>
          </div>
        </div>

        <div class="date-line">Data, ${esc(dataExtenso(docForm.data))}.</div>
        <div class="doc-title">${esc(docForm.tituloDoc)}</div>

        ${(docForm.saudacaoTopo || docForm.destinatarioCargo || docForm.destinatarioNome) ? `
          <div class="dest-block">
            ${docForm.saudacaoTopo ? `<div>${esc(docForm.saudacaoTopo)}</div>` : ''}
            ${docForm.destinatarioCargo ? `<div class="dest-cargo">${esc(docForm.destinatarioCargo)}</div>` : ''}
            ${docForm.destinatarioNome ? `<div>${esc(docForm.destinatarioNome)}</div>` : ''}
          </div>
        ` : ''}

        ${paragrafosHtml}

        <div class="closing-block">
          ${docForm.despedida ? `<div class="despedida">${esc(docForm.despedida)}</div>` : ''}
          <div class="sig-row">
            <div class="sig-col">
              ${assinaturaImgHtml}
              <div class="sig-name">${esc(docForm.assinanteNome)}</div>
              <div class="sig-role">${esc(docForm.assinanteCargo)}</div>
            </div>
            ${docForm.segundoAssinanteNome ? `
              <div class="sig-col">
                <div class="sig-spacer"></div>
                <div class="sig-name">${esc(docForm.segundoAssinanteNome)}</div>
                <div class="sig-role">${esc(docForm.segundoAssinanteCargo)}</div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <div class="doc-footer">
        <div class="foot-item">
          <strong>${esc(timbrado.nome)}</strong><br/>
          CNPJ: ${esc(timbrado.cnpj)}
        </div>
        <div class="foot-item">
          ${esc(timbrado.endLinha1)}<br/>
          ${esc(timbrado.endLinha2)}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
    }

    const tituloAnterior = document.title;
    document.title = nomeArquivo;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      document.body.removeChild(iframe);
      document.title = tituloAnterior;
      return;
    }

    doc.open();
    doc.write(htmlDoc);
    doc.close();

    const limpar = () => {
      document.title = tituloAnterior;
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    };

    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.onafterprint = limpar;
        iframe.contentWindow.print();
      } catch {
        limpar();
      }
      setTimeout(limpar, 2500);
    }, 250);
  };

  const pessoasAtivas = useMemo(
    () => (pessoas || []).filter((p) => p.status !== 'inativo').sort((a, b) => (a.nome || '').localeCompare(b.nome || '')),
    [pessoas]
  );

  const inputCls =
    'w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#0b1329] text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30';
  const labelCls = 'block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1';

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className={mobileEditorAberto ? 'hidden lg:block' : 'block'}>
        <PageHeader
          titulo="Gerador de Documentos"
          subtitulo="Emita ofícios timbrados, atas, declarações e termos de casamento religioso prontos para impressão ou PDF."
          breadcrumb={['Utilitários', 'Gerador de Documentos']}
          onNavigate={() => onVoltar && onVoltar()}
        />
      </div>

      {/* ── HUB MOBILE: CARDS QUADRADOS ESTÁTICOS PARA CADA TIPO DE DOCUMENTO ── */}
      {!mobileEditorAberto && (
        <div className="lg:hidden grid grid-cols-2 gap-3.5 animate-in fade-in duration-200">
          {todosModelos.map((m) => {
            const Icone = m.icon;
            return (
              <div
                key={m.id}
                role="button"
                tabIndex={0}
                onClick={() => selecionarModelo(m.id, true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') selecionarModelo(m.id, true);
                }}
                className="group relative aspect-square p-4 rounded-3xl bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500/70 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between text-left overflow-hidden cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 w-full">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${m.cor} text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icone size={20} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#131d31] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-[#2b3954] truncate max-w-[70px]">
                      {m.categoria}
                    </span>
                    {m.isCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleExcluirModeloCustom(e, m.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 cursor-pointer"
                        title="Excluir modelo"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 leading-tight line-clamp-2">
                    {m.titulo}
                  </h3>
                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                    {m.desc}
                  </p>
                </div>

                <div className="flex items-center justify-end w-full pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Criar
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}

          {/* Card Mobile: Adicionar Modelo Pré-Pronto */}
          <button
            type="button"
            onClick={() => abrirModalNovoModelo(false)}
            className="group aspect-square p-4 rounded-3xl border-2 border-dashed border-slate-300 dark:border-[#334669] bg-slate-50/70 dark:bg-[#131d31]/60 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-900/20 transition-all duration-200 active:scale-[0.97] flex flex-col items-center justify-center text-center gap-2.5 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Plus size={22} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                Novo Modelo
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Salvar texto pré-pronto
              </p>
            </div>
          </button>
        </div>
      )}

      {/* ── BARRA DE RETORNO MOBILE (QUANDO UM DOCUMENTO ESTÁ ABERTO PARA EDIÇÃO) ── */}
      {mobileEditorAberto && (
        <div className="lg:hidden flex items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-xs animate-in fade-in duration-200">
          <button
            type="button"
            onClick={() => {
              setMobileEditorAberto(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#131d31] hover:bg-slate-200/80 dark:hover:bg-[#1c2b4a] border border-slate-200/80 dark:border-[#2b3954] text-slate-700 dark:text-slate-200 text-xs font-extrabold transition active:scale-95 cursor-pointer shrink-0"
          >
            <ChevronLeft size={16} />
            <span>Modelos</span>
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${modeloObj.cor} text-white flex items-center justify-center shrink-0`}>
              <modeloObj.icon size={15} />
            </div>
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
              {modeloObj.titulo}
            </span>
          </div>
        </div>
      )}

      {/* 1. SELETOR DE MODELOS (APENAS DESKTOP lg+) */}
      <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {todosModelos.map((m) => {
          const Icone = m.icon;
          const ativo = modeloAtivo === m.id;
          return (
            <div
              key={m.id}
              role="button"
              tabIndex={0}
              onClick={() => selecionarModelo(m.id, false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') selecionarModelo(m.id, false);
              }}
              className={`group p-3.5 rounded-2xl border text-left transition-all cursor-pointer active:scale-[0.98] flex flex-col justify-between gap-2.5 ${
                ativo
                  ? 'bg-gradient-to-br ' + m.cor + ' text-white border-transparent shadow-lg'
                  : 'bg-white dark:bg-[#17223b] border-slate-200/80 dark:border-[#2b3954] hover:border-blue-400 dark:hover:border-blue-500/70'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    ativo
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-[#131d31] text-blue-600 dark:text-blue-400'
                  }`}
                >
                  <Icone size={18} />
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full truncate max-w-[78px] ${
                      ativo
                        ? 'bg-black/20 text-white'
                        : 'bg-slate-100 dark:bg-[#131d31] text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {m.categoria}
                  </span>
                  {m.isCustom && (
                    <button
                      type="button"
                      onClick={(e) => handleExcluirModeloCustom(e, m.id)}
                      className={`p-1 rounded-lg transition cursor-pointer ${
                        ativo
                          ? 'text-white/80 hover:text-white hover:bg-black/20'
                          : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30'
                      }`}
                      title="Excluir modelo"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
              <div>
                <p className={`text-xs font-extrabold leading-tight ${ativo ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                  {m.titulo}
                </p>
                <p className={`text-[10px] mt-1 leading-snug line-clamp-2 ${ativo ? 'text-white/85' : 'text-slate-500 dark:text-slate-400'}`}>
                  {m.desc}
                </p>
              </div>
            </div>
          );
        })}

        {/* Card Desktop: Adicionar Modelo Pré-Pronto */}
        <button
          type="button"
          onClick={() => abrirModalNovoModelo(false)}
          className="group p-3.5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-[#334669] bg-slate-50/70 dark:bg-[#131d31]/60 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-900/20 text-left transition-all cursor-pointer active:scale-[0.98] flex flex-col justify-between gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Plus size={18} />
          </div>
          <div>
            <p className="text-xs font-extrabold leading-tight text-slate-800 dark:text-slate-100">
              Novo Modelo
            </p>
            <p className="text-[10px] mt-1 leading-snug text-slate-500 dark:text-slate-400">
              Criar ofício, ata ou declaração pré-pronta.
            </p>
          </div>
        </button>
      </div>

      {/* BARRA DE AÇÕES + EDITOR / PRÉ-VISUALIZAÇÃO (no mobile só aparece após clicar em um card) */}
      <div className={`${mobileEditorAberto ? 'space-y-5' : 'hidden lg:block lg:space-y-5'}`}>
        {/* BARRA DE AÇÕES + ALTERNADOR MOBILE (EDITOR / PRÉ-VISUALIZAÇÃO) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="inline-flex lg:hidden p-1 rounded-xl bg-slate-100 dark:bg-[#131d31] border border-slate-200 dark:border-[#2b3954]">
            <button
              type="button"
              onClick={() => setAbaMobile('editor')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                abaMobile === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Edit3 size={13} />
              Editar
            </button>
            <button
              type="button"
              onClick={() => setAbaMobile('preview')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                abaMobile === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Eye size={13} />
              Visualizar A4
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <Sparkles size={15} className="text-blue-500" />
            <span>
              Modelo ativo: <strong className="text-slate-800 dark:text-slate-100">{modeloObj.titulo}</strong>
            </span>
          </div>
          {msgSalvo && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{msgSalvo}</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {modeloAtivo !== 'termo-casamento' && (
            <>
              <button
                type="button"
                onClick={() => abrirModalNovoModelo(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-violet-200 dark:border-violet-800/70 bg-violet-50 dark:bg-violet-950/40 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-bold cursor-pointer transition"
                title="Salvar este documento como um modelo reutilizável"
              >
                <Plus size={14} />
                <span>Salvar como Modelo</span>
              </button>
              <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-slate-50 dark:bg-[#131d31] hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition">
                <Upload size={14} />
                <span>{assinaturaImg ? 'Trocar Assinatura' : 'Carregar Assinatura'}</span>
                <input type="file" accept="image/*" onChange={handleUploadAssinatura} className="hidden" />
              </label>
            </>
          )}
          <button
            type="button"
            onClick={handleSalvarRascunho}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#1c2b4a] hover:bg-slate-50 dark:hover:bg-[#24375c] text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition"
          >
            <Save size={14} />
            <span>Salvar</span>
          </button>
          <button
            type="button"
            onClick={handleImprimirPdf}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm cursor-pointer transition active:scale-95"
          >
            <Printer size={15} />
            <span>Imprimir / Gerar PDF</span>
          </button>
        </div>
      </div>

      {/* 2. ÁREA PRINCIPAL: EDITOR + PRÉ-VISUALIZAÇÃO A4 EM TEMPO REAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* COLUNA ESQUERDA: FORMULÁRIO */}
        <Card className={`${abaMobile === 'editor' ? 'block' : 'hidden lg:block'} lg:col-span-6 p-5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-4`}>
          {modeloAtivo === 'termo-casamento' ? (
            /* ── FORMULÁRIO: TERMO DE CASAMENTO RELIGIOSO ── */
            <div className="space-y-5">
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 border-b border-slate-100 dark:border-[#24334f] pb-1.5">
                  1. Nubente 01 (Noivo / Habilitante)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Nome Completo</label>
                    <input value={casamentoForm.n1Nome} onChange={(e) => setCasamentoForm({ ...casamentoForm, n1Nome: e.target.value })} placeholder="Ex: JOSÉ RONALDO VIANA DE OLIVEIRA" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Profissão</label>
                    <input value={casamentoForm.n1Profissao} onChange={(e) => setCasamentoForm({ ...casamentoForm, n1Profissao: e.target.value })} placeholder="Ex: motorista" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Estado Civil</label>
                    <input value={casamentoForm.n1EstadoCivil} onChange={(e) => setCasamentoForm({ ...casamentoForm, n1EstadoCivil: e.target.value })} placeholder="Ex: solteiro / divorciado de..." className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Idade</label>
                    <input value={casamentoForm.n1Idade} onChange={(e) => setCasamentoForm({ ...casamentoForm, n1Idade: e.target.value })} placeholder="Ex: 32" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Naturalidade (Cidade/UF)</label>
                    <input value={casamentoForm.n1Naturalidade} onChange={(e) => setCasamentoForm({ ...casamentoForm, n1Naturalidade: e.target.value })} placeholder="Ex: Maceió/AL" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Data de Nascimento (extenso)</label>
                    <input value={casamentoForm.n1DataNasc} onChange={(e) => setCasamentoForm({ ...casamentoForm, n1DataNasc: e.target.value })} placeholder="Ex: 03 de maio de 1994" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Nacionalidade</label>
                    <input value={casamentoForm.n1Nacionalidade} onChange={(e) => setCasamentoForm({ ...casamentoForm, n1Nacionalidade: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Nome do Pai</label>
                    <input value={casamentoForm.n1Pai} onChange={(e) => setCasamentoForm({ ...casamentoForm, n1Pai: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Nome da Mãe</label>
                    <input value={casamentoForm.n1Mae} onChange={(e) => setCasamentoForm({ ...casamentoForm, n1Mae: e.target.value })} className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 border-b border-slate-100 dark:border-[#24334f] pb-1.5">
                  2. Nubente 02 (Noiva / Habilitante)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Nome Completo</label>
                    <input value={casamentoForm.n2Nome} onChange={(e) => setCasamentoForm({ ...casamentoForm, n2Nome: e.target.value })} placeholder="Ex: MARIA ELIENE DANTAS VIEIRA" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Profissão</label>
                    <input value={casamentoForm.n2Profissao} onChange={(e) => setCasamentoForm({ ...casamentoForm, n2Profissao: e.target.value })} placeholder="Ex: professora" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Estado Civil</label>
                    <input value={casamentoForm.n2EstadoCivil} onChange={(e) => setCasamentoForm({ ...casamentoForm, n2EstadoCivil: e.target.value })} placeholder="Ex: solteira" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Idade</label>
                    <input value={casamentoForm.n2Idade} onChange={(e) => setCasamentoForm({ ...casamentoForm, n2Idade: e.target.value })} placeholder="Ex: 29" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Naturalidade (Cidade/UF)</label>
                    <input value={casamentoForm.n2Naturalidade} onChange={(e) => setCasamentoForm({ ...casamentoForm, n2Naturalidade: e.target.value })} placeholder="Ex: Penedo/AL" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Data de Nascimento (extenso)</label>
                    <input value={casamentoForm.n2DataNasc} onChange={(e) => setCasamentoForm({ ...casamentoForm, n2DataNasc: e.target.value })} placeholder="Ex: 03 de agosto de 1997" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Nacionalidade</label>
                    <input value={casamentoForm.n2Nacionalidade} onChange={(e) => setCasamentoForm({ ...casamentoForm, n2Nacionalidade: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Nome do Pai</label>
                    <input value={casamentoForm.n2Pai} onChange={(e) => setCasamentoForm({ ...casamentoForm, n2Pai: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Nome da Mãe</label>
                    <input value={casamentoForm.n2Mae} onChange={(e) => setCasamentoForm({ ...casamentoForm, n2Mae: e.target.value })} className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-slate-100 dark:border-[#24334f] pb-1.5">
                  3. Testemunhas (1ª e 2ª)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>1ª Testemunha — Nome</label>
                    <input value={casamentoForm.t1Nome} onChange={(e) => setCasamentoForm({ ...casamentoForm, t1Nome: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>1ª Testemunha — CPF</label>
                    <input value={casamentoForm.t1Cpf} onChange={(e) => setCasamentoForm({ ...casamentoForm, t1Cpf: mascaraCPF(e.target.value) })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Profissão</label>
                    <input value={casamentoForm.t1Profissao} onChange={(e) => setCasamentoForm({ ...casamentoForm, t1Profissao: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Endereço Completo</label>
                    <input value={casamentoForm.t1Endereco} onChange={(e) => setCasamentoForm({ ...casamentoForm, t1Endereco: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>2ª Testemunha — Nome</label>
                    <input value={casamentoForm.t2Nome} onChange={(e) => setCasamentoForm({ ...casamentoForm, t2Nome: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>2ª Testemunha — CPF</label>
                    <input value={casamentoForm.t2Cpf} onChange={(e) => setCasamentoForm({ ...casamentoForm, t2Cpf: mascaraCPF(e.target.value) })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Profissão</label>
                    <input value={casamentoForm.t2Profissao} onChange={(e) => setCasamentoForm({ ...casamentoForm, t2Profissao: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Endereço Completo</label>
                    <input value={casamentoForm.t2Endereco} onChange={(e) => setCasamentoForm({ ...casamentoForm, t2Endereco: e.target.value })} className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-[#24334f] pb-1.5">
                  4. Registro Civil e Ato Religioso
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Cartório de Registro Civil</label>
                    <input value={casamentoForm.cartorio} onChange={(e) => setCasamentoForm({ ...casamentoForm, cartorio: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Validade da Habilitação até</label>
                    <input value={casamentoForm.validadeAte} onChange={(e) => setCasamentoForm({ ...casamentoForm, validadeAte: e.target.value })} placeholder="Ex: 16/12/2026" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Regime de Bens</label>
                    <input value={casamentoForm.regimeBens} onChange={(e) => setCasamentoForm({ ...casamentoForm, regimeBens: e.target.value })} className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Alteração de Nome dos Nubentes</label>
                    <input value={casamentoForm.alteracaoNomes} onChange={(e) => setCasamentoForm({ ...casamentoForm, alteracaoNomes: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Data da Cerimônia (por extenso)</label>
                    <input value={casamentoForm.dataCerimoniaExtenso} onChange={(e) => setCasamentoForm({ ...casamentoForm, dataCerimoniaExtenso: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Local do Evento</label>
                    <input value={casamentoForm.localEvento} onChange={(e) => setCasamentoForm({ ...casamentoForm, localEvento: e.target.value })} placeholder="Ex: Templo Sede / Fama Festas" className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Endereço do Evento</label>
                    <input value={casamentoForm.enderecoEvento} onChange={(e) => setCasamentoForm({ ...casamentoForm, enderecoEvento: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Autoridade Celebrante</label>
                    <input value={casamentoForm.celebranteNome} onChange={(e) => setCasamentoForm({ ...casamentoForm, celebranteNome: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>CPF do Celebrante</label>
                    <input value={casamentoForm.celebranteCpf} onChange={(e) => setCasamentoForm({ ...casamentoForm, celebranteCpf: mascaraCPF(e.target.value) })} className={inputCls} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ── FORMULÁRIO: OFÍCIOS, ATAS E DECLARAÇÕES (PAPEL TIMBRADO BETESDA) ── */
            <div className="space-y-4">
              {modeloAtivo === 'declaracao-membresia' && pessoasAtivas.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/35 border border-blue-200/80 dark:border-blue-800/60 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <UserCheck size={13} />
                    Preencher automaticamente com um membro
                  </label>
                  <select
                    value={membroDeclaracaoId}
                    onChange={(e) => preencherDeclaracaoComMembro(e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Selecione um membro...</option>
                    {pessoasAtivas.map((p) => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Título do Documento</label>
                  <input
                    type="text"
                    value={docForm.tituloDoc}
                    onChange={(e) => setDocForm({ ...docForm, tituloDoc: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Data</label>
                  <input
                    type="date"
                    value={docForm.data}
                    onChange={(e) => setDocForm({ ...docForm, data: e.target.value })}
                    className={`${inputCls} dark:[color-scheme:dark]`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className={labelCls}>Vocativo</label>
                  <input
                    type="text"
                    value={docForm.saudacaoTopo}
                    onChange={(e) => setDocForm({ ...docForm, saudacaoTopo: e.target.value })}
                    placeholder="Ex: À,"
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className={labelCls}>Cargo / Órgão Destinatário</label>
                  <input
                    type="text"
                    value={docForm.destinatarioCargo}
                    onChange={(e) => setDocForm({ ...docForm, destinatarioCargo: e.target.value })}
                    placeholder="Ex: Ilma. Secretária da Educação..."
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Nome do Destinatário (opcional)</label>
                <input
                  type="text"
                  value={docForm.destinatarioNome}
                  onChange={(e) => setDocForm({ ...docForm, destinatarioNome: e.target.value })}
                  placeholder="Ex: Sra. DANIELE MÁRCIA DA ROCHA MELO"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Corpo do Documento (separe parágrafos com linha em branco)</label>
                <textarea
                  rows={9}
                  value={docForm.corpo}
                  onChange={(e) => setDocForm({ ...docForm, corpo: e.target.value })}
                  className={`${inputCls} leading-relaxed resize-y`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Fecho / Despedida</label>
                  <input
                    type="text"
                    value={docForm.despedida}
                    onChange={(e) => setDocForm({ ...docForm, despedida: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Assinante Principal</label>
                  <input
                    type="text"
                    value={docForm.assinanteNome}
                    onChange={(e) => setDocForm({ ...docForm, assinanteNome: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Cargo do Assinante</label>
                  <input
                    type="text"
                    value={docForm.assinanteCargo}
                    onChange={(e) => setDocForm({ ...docForm, assinanteCargo: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              {modeloAtivo === 'ata-reuniao' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>2º Assinante (Secretário)</label>
                    <input
                      type="text"
                      value={docForm.segundoAssinanteNome}
                      onChange={(e) => setDocForm({ ...docForm, segundoAssinanteNome: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Cargo do 2º Assinante</label>
                    <input
                      type="text"
                      value={docForm.segundoAssinanteCargo}
                      onChange={(e) => setDocForm({ ...docForm, segundoAssinanteCargo: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>
              )}

              {assinaturaImg && (
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200 dark:border-[#24334f]">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mostrarAssinaturaImg}
                      onChange={(e) => setMostrarAssinaturaImg(e.target.checked)}
                      className="rounded"
                    />
                    <span>Incluir imagem da assinatura no documento</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAssinaturaImg('');
                      localStorage.removeItem(STORAGE_ASSINATURA_KEY);
                    }}
                    className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* COLUNA DIREITA: PRÉ-VISUALIZAÇÃO A4 EM TEMPO REAL */}
        <div className={`${abaMobile === 'preview' ? 'block' : 'hidden lg:block'} lg:col-span-6`}>
          <div className="rounded-2xl bg-slate-200/80 dark:bg-[#0b1329] p-3 sm:p-4 border border-slate-300/70 dark:border-[#24334f] shadow-inner">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Pré-visualização A4 (Fiel à Impressão)
              </span>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">210 × 297 mm</span>
            </div>

            {modeloAtivo === 'termo-casamento' ? (
              /* Preview Jurídico Casamento */
              <div
                className="w-full aspect-[210/297] rounded-xl shadow-xl overflow-y-auto p-6 sm:p-8 space-y-2.5 text-[10px] sm:text-[11px] leading-snug"
                style={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: "'Times New Roman', Georgia, serif" }}
              >
                <h3 className="text-center font-bold text-xs sm:text-sm uppercase mb-2" style={{ color: '#000000' }}>
                  TERMO DE CELEBRAÇÃO DE CASAMENTO RELIGIOSO
                </h3>
                <p style={{ color: '#000000' }}>
                  <strong><u>NUBENTES:</u></strong> Os habilitantes <strong>{(casamentoForm.n1Nome || '____________________').toUpperCase()}</strong> e <strong>{(casamentoForm.n2Nome || '____________________').toUpperCase()}</strong>
                </p>
                <p className="text-justify" style={{ color: '#000000' }}>
                  O habilitante, de nacionalidade {casamentoForm.n1Nacionalidade}, de profissão {casamentoForm.n1Profissao || '________'}, de estado civil {casamentoForm.n1EstadoCivil}, de {casamentoForm.n1Idade || '__'} anos de idade, nascido em {casamentoForm.n1Naturalidade || '________'}, no dia {casamentoForm.n1DataNasc || '__/__/____'}. Filho(a) de <strong>{(casamentoForm.n1Pai || '________').toUpperCase()}</strong> e <strong>{(casamentoForm.n1Mae || '________').toUpperCase()}</strong>.
                </p>
                <p className="text-justify" style={{ color: '#000000' }}>
                  A habilitante, de nacionalidade {casamentoForm.n2Nacionalidade}, de profissão {casamentoForm.n2Profissao || '________'}, de estado civil {casamentoForm.n2EstadoCivil}, de {casamentoForm.n2Idade || '__'} anos de idade, nascida em {casamentoForm.n2Naturalidade || '________'}, no dia {casamentoForm.n2DataNasc || '__/__/____'}. Filho(a) de <strong>{(casamentoForm.n2Pai || '________').toUpperCase()}</strong> e <strong>{(casamentoForm.n2Mae || '________').toUpperCase()}</strong>.
                </p>
                <p className="font-bold underline pt-1" style={{ color: '#000000' }}>TESTEMUNHAS</p>
                <p style={{ color: '#000000' }}>
                  <strong>1ª Testemunha:</strong> {(casamentoForm.t1Nome || '________________').toUpperCase()}, CPF: {casamentoForm.t1Cpf || '___.___.___-__'}, {casamentoForm.t1Profissao || '________'}, residente em {casamentoForm.t1Endereco || '________________'}.
                </p>
                <p style={{ color: '#000000' }}>
                  <strong>2ª Testemunha:</strong> {(casamentoForm.t2Nome || '________________').toUpperCase()}, CPF: {casamentoForm.t2Cpf || '___.___.___-__'}, {casamentoForm.t2Profissao || '________'}, residente em {casamentoForm.t2Endereco || '________________'}.
                </p>
                <p className="text-center font-bold uppercase pt-1" style={{ color: '#000000' }}>
                  INFORMAÇÕES PARA REGISTRO E EFEITOS CIVIS
                </p>
                <p className="text-justify" style={{ color: '#000000' }}>
                  <strong>CERTIFICADO HABILITAÇÃO</strong> / {casamentoForm.cartorio.toUpperCase()} {casamentoForm.validadeAte ? `— VÁLIDO ATÉ ${casamentoForm.validadeAte}` : ''} — <strong>REGIME DE BENS:</strong> {casamentoForm.regimeBens}. {casamentoForm.alteracaoNomes}
                </p>
                <p className="text-center font-bold underline uppercase pt-1" style={{ color: '#000000' }}>ATO RELIGIOSO</p>
                <div className="space-y-0.5" style={{ color: '#000000' }}>
                  <p><strong>LOCAL:</strong> {casamentoForm.localEvento || '____________'} • <strong>ENDEREÇO:</strong> {casamentoForm.enderecoEvento || '____________'}</p>
                  <p><strong>IGREJA:</strong> {casamentoForm.nomeIgreja} • <strong>CNPJ:</strong> {casamentoForm.cnpjIgreja}</p>
                  <p><strong>CELEBRANTE:</strong> {casamentoForm.celebranteNome} • <strong>CPF:</strong> {casamentoForm.celebranteCpf || '___.___.___-__'} ({casamentoForm.celebranteCargo})</p>
                </div>
                <p className="text-justify pt-1" style={{ color: '#000000' }}>
                  No dia {casamentoForm.dataCerimoniaExtenso}, foi realizada a CERIMÔNIA RELIGIOSA DE CASAMENTO DOS NUBENTES... (§§ 1º e 2º do art. 1.516 c/c art. 1.525 e seguintes do Código Civil).
                </p>
                <div className="pt-3 space-y-2 text-[9.5px]" style={{ color: '#000000' }}>
                  <p>Autoridade celebrante: _____________________________________</p>
                  <p>Nubente 01: _______________________________________________</p>
                  <p>Nubente 02: _______________________________________________</p>
                  <p>Testemunha 01: ____________________________________________</p>
                  <p>Testemunha 02: ____________________________________________</p>
                </div>
              </div>
            ) : (
              /* Preview Papel Timbrado Betesda */
              <div
                className="w-full aspect-[210/297] rounded-xl shadow-xl overflow-hidden flex"
                style={{ backgroundColor: '#ffffff', color: '#1e293b', fontFamily: "'Segoe UI', Inter, Arial, sans-serif" }}
              >
                {/* Faixa Lateral Escura */}
                <div className="w-[10.5%] relative shrink-0" style={{ backgroundColor: '#2b2d34' }}>
                  <div
                    className="absolute right-[-7px] top-[7%] w-3.5 h-3.5 rotate-45"
                    style={{ backgroundColor: '#2b2d34' }}
                  />
                  <div className="absolute bottom-5 right-0 flex flex-col items-end gap-3.5">
                    <div
                      className="w-5 h-5 rotate-45 -mr-2.5"
                      style={{ backgroundColor: '#2b2d34', border: '1.5px solid #ffffff' }}
                    />
                    <div
                      className="w-6 h-6 rounded-full -mr-3 flex items-center justify-center text-[10px]"
                      style={{ backgroundColor: '#2b2d34', border: '1.5px solid #ffffff', color: '#ffffff' }}
                    >
                      📍
                    </div>
                  </div>
                </div>

                {/* Conteúdo Timbrado */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-2.5" style={{ borderBottom: '1.5px solid #0f172a' }}>
                      <div className="flex flex-col">
                        <img src="/betesda-geral.png" alt="Betesda" className="h-8 sm:h-10 max-w-[170px] w-auto object-contain object-left" />
                        <span className="text-[9px] italic self-end -mt-0.5" style={{ color: '#0f172a' }}>{timbrado.cidade}</span>
                      </div>
                      <div className="pl-2.5 text-[8px] sm:text-[9px] leading-tight shrink-0" style={{ borderLeft: '1px solid #334155', color: '#334155' }}>
                        <p className="font-extrabold" style={{ color: '#0f172a' }}>{docForm.assinanteNome}</p>
                        <p>{docForm.assinanteCargo}</p>
                        <p className="mt-1">Contato:</p>
                        <p>{timbrado.tel}</p>
                      </div>
                    </div>

                    <p className="text-right text-[8.5px] sm:text-[9.5px] mt-2.5" style={{ color: '#475569' }}>
                      Data, {dataExtenso(docForm.data)}.
                    </p>

                    <h3 className="text-center font-extrabold text-xs sm:text-sm uppercase tracking-wide my-4" style={{ color: '#334155' }}>
                      {docForm.tituloDoc}
                    </h3>

                    {(docForm.saudacaoTopo || docForm.destinatarioCargo || docForm.destinatarioNome) && (
                      <div className="mb-3 text-[9px] sm:text-[10.5px] leading-snug" style={{ color: '#1e293b' }}>
                        {docForm.saudacaoTopo && <p>{docForm.saudacaoTopo}</p>}
                        {docForm.destinatarioCargo && <p className="font-bold">{docForm.destinatarioCargo}</p>}
                        {docForm.destinatarioNome && <p>{docForm.destinatarioNome}</p>}
                      </div>
                    )}

                    <div className="space-y-2.5 text-[9px] sm:text-[10.5px] leading-relaxed text-justify" style={{ color: '#1e293b' }}>
                      {String(docForm.corpo || '')
                        .split(/\n\s*\n/)
                        .filter((p) => p.trim())
                        .map((par, idx) => (
                          <p key={idx} style={{ textIndent: '1.5rem', color: '#1e293b' }}>
                            {par}
                          </p>
                        ))}
                    </div>

                    <div className="mt-5">
                      {docForm.despedida && <p className="text-[9px] sm:text-[10.5px]" style={{ color: '#1e293b' }}>{docForm.despedida}</p>}
                      <div className="flex justify-center gap-6 mt-2">
                        <div className="text-center">
                          {assinaturaImg && mostrarAssinaturaImg ? (
                            <img src={assinaturaImg} alt="Assinatura" className="h-10 max-w-[120px] object-contain mx-auto -mb-1" />
                          ) : (
                            <div className="h-7" />
                          )}
                          <p className="text-[9.5px] font-extrabold" style={{ color: '#0f172a' }}>{docForm.assinanteNome}</p>
                          <p className="text-[8.5px]" style={{ color: '#475569' }}>{docForm.assinanteCargo}</p>
                        </div>
                        {docForm.segundoAssinanteNome && (
                          <div className="text-center">
                            <div className="h-7" />
                            <p className="text-[9.5px] font-extrabold" style={{ color: '#0f172a' }}>{docForm.segundoAssinanteNome}</p>
                            <p className="text-[8.5px]" style={{ color: '#475569' }}>{docForm.segundoAssinanteCargo}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rodapé Institucional */}
                  <div className="pt-4 mt-4 space-y-2 text-[8px] sm:text-[9px] leading-tight" style={{ color: '#334155' }}>
                    <div className="pl-2" style={{ borderLeft: '1.5px solid #334155' }}>
                      <p className="font-bold" style={{ color: '#0f172a' }}>{timbrado.nome}</p>
                      <p>CNPJ: {timbrado.cnpj}</p>
                    </div>
                    <div className="pl-2" style={{ borderLeft: '1.5px solid #334155' }}>
                      <p>{timbrado.endLinha1}</p>
                      <p>{timbrado.endLinha2}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* 3. DOCUMENTOS RECENTES SALVOS (no mobile aparece no hub inicial) */}
      {historicoDocs.length > 0 && (
        <div className={mobileEditorAberto ? 'hidden lg:block' : 'block'}>
          <Card className="p-5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
            <Clock size={15} className="text-blue-500" />
            <span>Documentos Salvos Recentemente ({historicoDocs.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {historicoDocs.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#131d31] border border-slate-200/80 dark:border-[#24334f] flex items-center justify-between gap-2"
              >
                <button
                  type="button"
                  onClick={() => carregarRascunho(item)}
                  className="min-w-0 text-left flex-1 cursor-pointer"
                >
                  <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    {item.categoria} • {new Date(item.criadoEm).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block truncate">
                    {item.titulo}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => excluirRascunho(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg cursor-pointer shrink-0"
                  title="Excluir rascunho"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          </Card>
        </div>
      )}

      {/* MODAL: NOVO MODELO PRÉ-PRONTO DE DOCUMENTO */}
      {modalNovoModeloAberto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalNovoModeloAberto(false)}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#17223b] border border-slate-200 dark:border-[#2b3954] shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-[#24334f] pb-3">
              <div>
                <h3 className="text-base font-black text-slate-800 dark:text-slate-100">
                  Novo Modelo Pré-Pronto
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Salve um modelo de ofício, ata ou declaração no papel timbrado oficial para reutilizar sempre que precisar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalNovoModeloAberto(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131d31] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSalvarNovoModeloDoc} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Nome do Modelo *</label>
                  <input
                    required
                    value={novoModeloDocForm.titulo}
                    onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, titulo: e.target.value })}
                    placeholder="Ex: Carta de Recomendação"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Categoria</label>
                  <select
                    value={novoModeloDocForm.categoria}
                    onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, categoria: e.target.value })}
                    className={inputCls}
                  >
                    <option value="Ofício">Ofício</option>
                    <option value="Ata">Ata</option>
                    <option value="Declaração">Declaração</option>
                    <option value="Carta">Carta</option>
                    <option value="Personalizado">Personalizado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Descrição Curta (no card)</label>
                <input
                  value={novoModeloDocForm.desc}
                  onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, desc: e.target.value })}
                  placeholder="Ex: Carta oficial de recomendação de membro para outra igreja."
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Título no Documento</label>
                  <input
                    value={novoModeloDocForm.tituloDoc}
                    onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, tituloDoc: e.target.value })}
                    placeholder="Ex: CARTA DE RECOMENDAÇÃO"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Saudação Topo (opcional)</label>
                  <input
                    value={novoModeloDocForm.saudacaoTopo}
                    onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, saudacaoTopo: e.target.value })}
                    placeholder="Ex: À,"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Destinatário / Cargo (padrão)</label>
                  <input
                    value={novoModeloDocForm.destinatarioCargo}
                    onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, destinatarioCargo: e.target.value })}
                    placeholder="Ex: A QUEM POSSA INTERESSAR"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Nome do Destinatário (padrão)</label>
                  <input
                    value={novoModeloDocForm.destinatarioNome}
                    onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, destinatarioNome: e.target.value })}
                    placeholder="Opcional"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Texto Padrão do Documento</label>
                <textarea
                  rows={5}
                  value={novoModeloDocForm.corpo}
                  onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, corpo: e.target.value })}
                  placeholder="Escreva o texto padrão. Use linhas em branco para separar parágrafos."
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Despedida</label>
                  <input
                    value={novoModeloDocForm.despedida}
                    onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, despedida: e.target.value })}
                    placeholder="Atenciosamente,"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Cargo do Assinante</label>
                  <input
                    value={novoModeloDocForm.assinanteCargo}
                    onChange={(e) => setNovoModeloDocForm({ ...novoModeloDocForm, assinanteCargo: e.target.value })}
                    placeholder="Pastor Local"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#24334f]">
                <button
                  type="button"
                  onClick={() => setModalNovoModeloAberto(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#2b3954] text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-[#131d31] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm cursor-pointer transition active:scale-95"
                >
                  <Save size={14} />
                  <span>Salvar Modelo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
