import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient';
import { Card, PageHeader } from './ui';
import {
  Award,
  Droplets,
  Baby,
  Printer,
  ChevronLeft,
  ArrowRight,
  Eye,
  Edit3,
  UserCheck,
  Sparkles,
  Plus,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';

const STORAGE_CERT_MODELOS_KEY = 'mib_cert_modelos_custom_v1';
const STORAGE_CERT_FUNDOS_KEY = 'mib_cert_fundos_override_v1';

function lerImagemComCompressao(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler imagem'));
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      // Se já for leve (<= 1.4 MB), preserva exatamente o arquivo original
      if (dataUrl.length <= 1_400_000) {
        resolve(dataUrl);
        return;
      }
      const img = new Image();
      img.onload = () => {
        const maxW = 2000;
        const scale = img.width > maxW ? maxW / img.width : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const isPng = file.type === 'image/png';
        resolve(canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', 0.86));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

const MESES_EXTENSO = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

function dataParaExtenso(isoDate) {
  if (!isoDate) {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, '0')} de ${MESES_EXTENSO[d.getMonth()]} de ${d.getFullYear()}`;
  }
  const m = String(isoDate).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return isoDate;
  const mes = MESES_EXTENSO[Math.max(0, Math.min(11, parseInt(m[2], 10) - 1))];
  return `${m[3]} de ${mes} de ${m[1]}`;
}

const MODELOS_CERTIFICADO = [
  {
    id: 'edb-ouro',
    categoria: 'Escola / EDB',
    titulo: 'Certificado Ouro (EDB)',
    desc: 'Conclusão de curso teológico / Escola de Líderes com selo dourado.',
    icon: Award,
    cor: 'from-purple-700 via-violet-600 to-amber-500',
  },
  {
    id: 'batismo',
    categoria: 'Batismo',
    titulo: 'Certificado de Batismo',
    desc: 'Arte oficial azul com selo Parabéns e versículo do batismo nas águas.',
    icon: Droplets,
    cor: 'from-blue-700 via-sky-600 to-cyan-500',
  },
  {
    id: 'apresentacao',
    categoria: 'Infantil',
    titulo: 'Apresentação de Crianças',
    desc: 'Certificado oficial de apresentação ao Senhor (Lucas 2:22).',
    icon: Baby,
    cor: 'from-teal-500 via-emerald-500 to-amber-400',
  },
];

export default function GeradorCertificados({ pessoas = [], onVoltar = null }) {
  const [dadosIgreja, setDadosIgreja] = useState(null);
  const [modeloAtivo, setModeloAtivo] = useState('edb-ouro');
  const [mobileEditorAberto, setMobileEditorAberto] = useState(false);
  const [abaMobile, setAbaMobile] = useState('editor'); // 'editor' | 'preview'
  const [membroSelecionadoId, setMembroSelecionadoId] = useState('');
  const [incluirAssinatura, setIncluirAssinatura] = useState(true);

  // Planos de fundo personalizados (PNG/JPG) para os certificados já existentes
  const [fundosOverride, setFundosOverride] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CERT_FUNDOS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Modelos pré-prontos personalizados criados pelo usuário
  const [modelosCustom, setModelosCustom] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CERT_MODELOS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [modalNovoModeloAberto, setModalNovoModeloAberto] = useState(false);
  const [novoModeloForm, setNovoModeloForm] = useState({
    titulo: '',
    categoria: 'Personalizado',
    desc: 'Modelo pré-pronto personalizado da igreja.',
    fundoImg: '',
    textoPadrao: 'Certificamos que {{NOME}} participou com excelência e dedicação, concluindo todas as atividades propostas em {{DATA}}.',
    corNome: '#1e3a8a',
    corTexto: '#1e293b',
    posNomeY: 44,
    posTextoY: 57,
  });
  const [customForm, setCustomForm] = useState({
    nomeParticipante: '',
    texto: '',
    dataEmissao: new Date().toISOString().split('T')[0],
    cidade: 'Santana do Mundaú',
    pastorNome: 'Jadson da Silva Viana',
    pastorCargo: 'Pastor Local',
  });

  const hojeIso = new Date().toISOString().split('T')[0];

  // Formulário EDB Ouro
  const [edbForm, setEdbForm] = useState({
    nomeAluno: '',
    curso: 'FORMANDO UM LÍDER DE ÊXITO',
    complementoCurso: 'da Visão Celular no Modelo dos 12',
    periodoInicio: '06 de setembro de 2024',
    periodoFim: '12 de março de 2026',
    cargaHoraria: '160',
    anoSelo: String(new Date().getFullYear()),
    diretorNome: 'Pr. Jadson S. Viana',
    diretorCargo: 'DIRETOR DA EDB',
    coordenadorNome: 'Pra. Auriana O. Viana',
    coordenadorCargo: 'COORDENADORA DA EDB',
    cidade: 'Santana do Mundaú',
    dataEmissao: hojeIso,
  });

  // Formulário Batismo
  const [batismoForm, setBatismoForm] = useState({
    nomeBatizando: '',
    genero: 'M',
    dataBatismo: hojeIso,
    textoCustom: '',
    pastorNome: 'Jadson da Silva Viana',
    pastorCargo: 'Pastor Local',
    cidade: 'Santana do Mundaú',
  });

  // Formulário Apresentação
  const [apresentacaoForm, setApresentacaoForm] = useState({
    nomeCrianca: '',
    genero: 'M',
    dataNascimento: '',
    nomePai: '',
    nomeMae: '',
    dataApresentacao: hojeIso,
    cidade: 'Santana do Mundaú',
    pastorNome: 'Jadson da Silva Viana',
    pastorCargo: 'Pastor',
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
        const cidade = data.cidade || 'Santana do Mundaú';
        const pastor = data.pastor_responsavel || 'Jadson da Silva Viana';
        setEdbForm((prev) => ({ ...prev, cidade }));
        setBatismoForm((prev) => ({ ...prev, cidade, pastorNome: pastor }));
        setApresentacaoForm((prev) => ({ ...prev, cidade, pastorNome: pastor }));
      })
      .catch(() => {});
    return () => { ativo = false; };
  }, []);

  const pessoasAtivas = useMemo(
    () => (pessoas || []).filter((p) => p.status !== 'inativo').sort((a, b) => (a.nome || '').localeCompare(b.nome || '')),
    [pessoas]
  );

  const todosModelos = useMemo(() => {
    const customAdaptados = modelosCustom.map((mc) => ({
      ...mc,
      icon: Sparkles,
      cor: 'from-indigo-600 via-blue-600 to-cyan-600',
      isCustom: true,
    }));
    return [...MODELOS_CERTIFICADO, ...customAdaptados];
  }, [modelosCustom]);

  const modeloObj = useMemo(
    () => todosModelos.find((m) => m.id === modeloAtivo) || todosModelos[0],
    [todosModelos, modeloAtivo]
  );

  const modeloCustomAtivo = useMemo(
    () => modelosCustom.find((m) => m.id === modeloAtivo) || null,
    [modelosCustom, modeloAtivo]
  );

  const selecionarModelo = (id, abrirMobile = true) => {
    setModeloAtivo(id);
    setMembroSelecionadoId('');
    const mc = modelosCustom.find((m) => m.id === id);
    if (mc) {
      setCustomForm((prev) => ({
        ...prev,
        texto: mc.textoPadrao || '',
        cidade: dadosIgreja?.cidade || prev.cidade,
        pastorNome: dadosIgreja?.pastor_responsavel || prev.pastorNome,
      }));
    }
    if (abrirMobile) {
      setMobileEditorAberto(true);
      setAbaMobile('editor');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUploadFundoModelo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await lerImagemComCompressao(file);
      setNovoModeloForm((prev) => ({ ...prev, fundoImg: dataUrl }));
    } catch {
      // ignora
    } finally {
      e.target.value = '';
    }
  };

  const fundoAtivoPersonalizado = useMemo(() => {
    if (modeloCustomAtivo) return modeloCustomAtivo.fundoImg || '';
    return fundosOverride[modeloAtivo] || '';
  }, [modeloCustomAtivo, fundosOverride, modeloAtivo]);

  const handleAlterarFundoAtivo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await lerImagemComCompressao(file);
      if (modeloCustomAtivo) {
        const lista = modelosCustom.map((m) =>
          m.id === modeloCustomAtivo.id ? { ...m, fundoImg: dataUrl } : m
        );
        try {
          localStorage.setItem(STORAGE_CERT_MODELOS_KEY, JSON.stringify(lista));
          setModelosCustom(lista);
        } catch {
          window.alert('A imagem escolhida excede o limite do armazenamento local. Tente um arquivo JPEG/PNG mais leve.');
        }
      } else {
        const novosFundos = { ...fundosOverride, [modeloAtivo]: dataUrl };
        try {
          localStorage.setItem(STORAGE_CERT_FUNDOS_KEY, JSON.stringify(novosFundos));
          setFundosOverride(novosFundos);
        } catch {
          window.alert('A imagem escolhida excede o limite do armazenamento local. Tente um arquivo JPEG/PNG mais leve.');
        }
      }
    } catch {
      window.alert('Não foi possível carregar a imagem selecionada.');
    } finally {
      e.target.value = '';
    }
  };

  const handleRestaurarFundoAtivo = () => {
    if (modeloCustomAtivo) {
      const lista = modelosCustom.map((m) =>
        m.id === modeloCustomAtivo.id ? { ...m, fundoImg: '' } : m
      );
      setModelosCustom(lista);
      try {
        localStorage.setItem(STORAGE_CERT_MODELOS_KEY, JSON.stringify(lista));
      } catch {
        // ignora
      }
    } else {
      const novosFundos = { ...fundosOverride };
      delete novosFundos[modeloAtivo];
      setFundosOverride(novosFundos);
      try {
        localStorage.setItem(STORAGE_CERT_FUNDOS_KEY, JSON.stringify(novosFundos));
      } catch {
        // ignora
      }
    }
  };

  const handleSalvarNovoModeloCert = (e) => {
    e.preventDefault();
    if (!novoModeloForm.titulo.trim()) return;
    const novo = {
      id: `custom-cert-${Date.now()}`,
      titulo: novoModeloForm.titulo.trim(),
      categoria: novoModeloForm.categoria.trim() || 'Personalizado',
      desc: novoModeloForm.desc.trim() || 'Modelo pré-pronto personalizado.',
      fundoImg: novoModeloForm.fundoImg || '',
      textoPadrao: novoModeloForm.textoPadrao.trim(),
      corNome: novoModeloForm.corNome || '#1e3a8a',
      corTexto: novoModeloForm.corTexto || '#1e293b',
      posNomeY: Number(novoModeloForm.posNomeY) || 44,
      posTextoY: Number(novoModeloForm.posTextoY) || 57,
    };
    const lista = [...modelosCustom, novo];
    setModelosCustom(lista);
    try {
      localStorage.setItem(STORAGE_CERT_MODELOS_KEY, JSON.stringify(lista));
    } catch {
      window.alert('A imagem escolhida é muito grande para o armazenamento local. Tente uma imagem mais leve (até ~1 MB).');
      return;
    }
    setModalNovoModeloAberto(false);
    setNovoModeloForm({
      titulo: '',
      categoria: 'Personalizado',
      desc: 'Modelo pré-pronto personalizado da igreja.',
      fundoImg: '',
      textoPadrao: 'Certificamos que {{NOME}} participou com excelência e dedicação, concluindo todas as atividades propostas em {{DATA}}.',
      corNome: '#1e3a8a',
      corTexto: '#1e293b',
      posNomeY: 44,
      posTextoY: 57,
    });
    setModeloAtivo(novo.id);
    setCustomForm((prev) => ({ ...prev, texto: novo.textoPadrao }));
    setMobileEditorAberto(true);
  };

  const handleExcluirModeloCustom = (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Deseja remover este modelo pré-pronto?')) return;
    const lista = modelosCustom.filter((m) => m.id !== id);
    setModelosCustom(lista);
    try {
      localStorage.setItem(STORAGE_CERT_MODELOS_KEY, JSON.stringify(lista));
    } catch {
      // ignora
    }
    if (modeloAtivo === id) {
      setModeloAtivo('edb-ouro');
    }
  };

  const textoCustomResolvido = useMemo(() => {
    const raw = customForm.texto || modeloCustomAtivo?.textoPadrao || '';
    return raw
      .replace(/\{\{NOME\}\}/gi, customForm.nomeParticipante || 'NOME DO PARTICIPANTE')
      .replace(/\{\{DATA\}\}/gi, dataParaExtenso(customForm.dataEmissao))
      .replace(/\{\{CIDADE\}\}/gi, customForm.cidade || 'Santana do Mundaú');
  }, [customForm, modeloCustomAtivo]);

  const preencherComMembro = (idPessoa) => {
    setMembroSelecionadoId(idPessoa);
    const p = pessoasAtivas.find((item) => String(item.id) === String(idPessoa));
    if (!p) return;
    const isFem = /^f/i.test(String(p.genero || '').trim());

    if (modeloAtivo === 'edb-ouro') {
      setEdbForm((prev) => ({ ...prev, nomeAluno: p.nome || '' }));
    } else if (modeloAtivo === 'batismo') {
      setBatismoForm((prev) => ({
        ...prev,
        nomeBatizando: p.nome || '',
        genero: isFem ? 'F' : 'M',
        dataBatismo: p.data_batismo || prev.dataBatismo,
      }));
    } else if (modeloAtivo === 'apresentacao') {
      setApresentacaoForm((prev) => ({
        ...prev,
        nomeCrianca: p.nome || '',
        genero: isFem ? 'F' : 'M',
        dataNascimento: p.data_nascimento || prev.dataNascimento,
      }));
    } else if (modeloCustomAtivo) {
      setCustomForm((prev) => ({ ...prev, nomeParticipante: p.nome || '' }));
    }
  };

  // Textos dinâmicos com concordância de gênero
  const textoBatismoFinal = useMemo(() => {
    if (batismoForm.textoCustom.trim()) return batismoForm.textoCustom.trim();
    const flex = batismoForm.genero === 'F' ? 'batizada' : 'batizado';
    return `Foi ${flex} em nossa igreja no dia ${dataParaExtenso(batismoForm.dataBatismo)}, em nome do Pai, do Filho e do Espírito Santo, conforme mandamento do Senhor Jesus Cristo.`;
  }, [batismoForm]);

  const textoApresentacaoFinal = useMemo(() => {
    const isFem = apresentacaoForm.genero === 'F';
    const nasc = isFem ? 'Nascida' : 'Nascido';
    const filh = isFem ? 'filha' : 'filho';
    const apres = isFem ? 'apresentada' : 'apresentado';
    const dataNascTxt = apresentacaoForm.dataNascimento ? dataParaExtenso(apresentacaoForm.dataNascimento) : '___ de __________ de ____';
    const paisTxt =
      apresentacaoForm.nomePai && apresentacaoForm.nomeMae
        ? `${apresentacaoForm.nomePai} e ${apresentacaoForm.nomeMae}`
        : apresentacaoForm.nomePai || apresentacaoForm.nomeMae || '__________________________';
    return `${nasc} no dia ${dataNascTxt}, ${filh} de ${paisTxt}, foi oficialmente ${apres} ao SENHOR DEUS, conforme o exemplo do nosso Senhor Jesus, descrito no livro de Lucas 2:22.`;
  }, [apresentacaoForm]);

  // ── IMPRESSÃO / EXPORTAÇÃO PDF A4 PAISAGEM ISOLADA (IMUNE AO MODO ESCURO) ──
  const handleImprimirPdf = () => {
    const esc = (s) =>
      String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const origin = window.location.origin;
    const logoBetesda = `${origin}/betesda-geral.png`;
    const assinaturaUrl = `${origin}/certificados/assinatura-pastor.png`;
    const fundoApresentacaoUrl = fundosOverride['apresentacao'] || `${origin}/certificados/fundo-apresentacao.png`;
    const fundoEdbCustom = fundosOverride['edb-ouro'] || '';
    const fundoBatismoCustom = fundosOverride['batismo'] || '';
    const topoBatismoUrl = `${origin}/certificados/topo-batismo.png`;

    let htmlDoc = '';
    let tituloArquivo = 'MIB Church - Certificado';

    if (modeloAtivo === 'edb-ouro') {
      const f = edbForm;
      tituloArquivo = `Certificado EDB - ${f.nomeAluno || 'Aluno'}`;
      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(tituloArquivo)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700;800&display=swap');
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { margin: 0; padding: 0; background: #ffffff; }
    .sheet {
      width: 297mm;
      height: 210mm;
      position: relative;
      overflow: hidden;
      background: #ffffff;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    }
    .inner-border {
      position: absolute;
      inset: 7mm;
      border: 1.6pt solid #d4a23a;
      pointer-events: none;
    }
    .corner-box {
      position: absolute;
      left: 7mm;
      bottom: 7mm;
      width: 26mm;
      height: 26mm;
      border-top: 1.6pt solid #d4a23a;
      border-right: 1.6pt solid #d4a23a;
      pointer-events: none;
    }
    .corner-box-sm {
      position: absolute;
      left: 14mm;
      bottom: 14mm;
      width: 11mm;
      height: 11mm;
      border: 1.6pt solid #d4a23a;
      pointer-events: none;
    }
    .content {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      padding: 0 18mm;
    }
    .header-title {
      position: absolute;
      top: 5mm;
      left: 16mm;
      width: 165mm;
      text-align: center;
      font-family: 'Great Vibes', 'Brush Script MT', Georgia, serif;
      font-size: 56pt;
      color: #ffffff;
      line-height: 1;
      text-shadow: 0 2px 6px rgba(0,0,0,0.22);
    }
    .sub-pill {
      position: absolute;
      top: 44mm;
      left: 63mm;
      background: linear-gradient(90deg, #522382, #6f35a6);
      border: 1.6pt solid #d4a23a;
      border-radius: 999px;
      padding: 2mm 12mm;
      color: #ffffff;
      font-size: 11pt;
      font-weight: 700;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      box-shadow: 0 3px 10px rgba(82,35,130,0.3);
    }
    .kicker {
      position: absolute;
      top: 66mm;
      left: 20mm;
      width: 166mm;
      text-align: center;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.5pt;
      letter-spacing: 0.2em;
      color: #4a236b;
      text-transform: uppercase;
    }
    .student-name {
      position: absolute;
      top: 78mm;
      left: 20mm;
      width: 166mm;
      text-align: center;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 31pt;
      font-weight: 700;
      color: #5b2d8e;
      line-height: 1.1;
    }
    .gold-rule {
      position: absolute;
      top: 98mm;
      left: 22mm;
      width: 162mm;
      height: 1.5pt;
      background: linear-gradient(90deg, #c6922c, #f3d277, #c6922c);
    }
    .gold-rule::before, .gold-rule::after {
      content: '';
      position: absolute;
      top: -2.2pt;
      width: 6pt;
      height: 6pt;
      border-radius: 50%;
      background: #c6922c;
    }
    .gold-rule::before { left: -2pt; }
    .gold-rule::after { right: -2pt; }
    .course-desc {
      position: absolute;
      top: 105mm;
      left: 22mm;
      width: 162mm;
      font-size: 11.5pt;
      line-height: 1.55;
      color: #334155;
      text-align: left;
    }
    .sigs-row {
      position: absolute;
      top: 135mm;
      left: 20mm;
      width: 175mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6mm;
    }
    .sig-col {
      flex: 1;
      text-align: center;
      position: relative;
    }
    .sig-img {
      height: 22mm;
      max-width: 55mm;
      object-fit: contain;
      display: block;
      margin: 0 auto -6mm;
    }
    .sig-spacer { height: 16mm; }
    .sig-line {
      border-top: 1.4pt solid #c6922c;
      padding-top: 2mm;
      font-size: 11pt;
      font-weight: 800;
      color: #4a236b;
    }
    .sig-role {
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #6b3b94;
      text-transform: uppercase;
      margin-top: 0.8mm;
    }
    .edb-badge {
      width: 34mm;
      height: 34mm;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #8b4cc9, #4a1e78);
      border: 2.5pt solid #e3b84c;
      box-shadow: 0 4px 14px rgba(74,30,120,0.35);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      flex-shrink: 0;
    }
    .edb-badge span.cap { font-size: 16pt; line-height: 1; }
    .edb-badge span.txt { font-family: 'Playfair Display', Georgia, serif; font-size: 13pt; font-weight: 800; letter-spacing: 0.08em; margin-top: 1mm; }
    .seal-wrap {
      position: absolute;
      right: 20mm;
      top: 56mm;
      width: 56mm;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .seal-circle {
      width: 52mm;
      height: 52mm;
      border-radius: 50%;
      background: radial-gradient(circle, #7a3eb5 0%, #4b1d7a 100%);
      border: 4.5pt solid #e4b84d;
      outline: 2pt dashed #d4a23a;
      outline-offset: 2pt;
      box-shadow: 0 6px 18px rgba(75,29,122,0.35);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      position: relative;
      z-index: 2;
    }
    .seal-aprov { font-size: 10pt; font-weight: 700; letter-spacing: 0.14em; }
    .seal-year { font-family: 'Playfair Display', Georgia, serif; font-size: 23pt; font-weight: 800; line-height: 1.05; margin: 1mm 0; }
    .seal-stars { color: #f6d57a; font-size: 11pt; letter-spacing: 0.2em; }
    .seal-ribbon {
      width: 34mm;
      height: 44mm;
      margin-top: -8mm;
      background: linear-gradient(90deg, #5b2d8e 0%, #5b2d8e 18%, #e4b84d 18%, #f7dc88 50%, #e4b84d 82%, #5b2d8e 82%, #5b2d8e 100%);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
    }
    .bottom-left-logo {
      position: absolute;
      left: 38mm;
      bottom: 11mm;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .bottom-left-logo img { height: 15mm; max-width: 66mm; object-fit: contain; }
    .bottom-left-logo span { font-family: 'Great Vibes', Georgia, serif; font-size: 13pt; color: #0f172a; margin-top: -2mm; }
    .bottom-date {
      position: absolute;
      left: 122mm;
      bottom: 24mm;
      font-size: 11pt;
      color: #4a236b;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="sheet">
    ${fundoEdbCustom ? `<img src="${fundoEdbCustom}" style="position:absolute;inset:0;width:297mm;height:210mm;object-fit:cover;z-index:0;" alt="Fundo" />` : `
    <!-- Faixas Decorativas Roxo + Dourado (SVG Vetorial) -->
    <svg viewBox="0 0 297 210" width="297mm" height="210mm" style="position:absolute;inset:0;z-index:0;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gPurple" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#4e207e"/>
          <stop offset="100%" stop-color="#7c3fb8"/>
        </linearGradient>
        <linearGradient id="gGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#c6922c"/>
          <stop offset="50%" stop-color="#f6d87e"/>
          <stop offset="100%" stop-color="#c6922c"/>
        </linearGradient>
      </defs>
      <!-- Topo -->
      <polygon points="0,0 245,0 100,47 0,16" fill="url(#gPurple)"/>
      <polygon points="0,20 100,49 275,0 297,0 297,11 102,52 0,31" fill="url(#gGold)"/>
      <polygon points="0,35 102,53 297,22 297,30 102,54 0,40" fill="url(#gPurple)"/>
      <!-- Base Direita -->
      <polygon points="95,210 258,180 297,196 297,210" fill="url(#gPurple)"/>
      <polygon points="155,210 262,188 297,203 297,210" fill="url(#gGold)"/>
    </svg>

    <div class="inner-border"></div>
    <div class="corner-box"></div>
    <div class="corner-box-sm"></div>`}

    <div class="content">
      <div class="header-title">Certificado</div>
      <div class="sub-pill">DE CONCLUSÃO</div>

      <div class="kicker">CERTIFICAMOS ORGULHOSAMENTE QUE</div>
      <div class="student-name">${esc(f.nomeAluno || 'Nome do(a) Formando(a)')}</div>
      <div class="gold-rule"></div>

      <div class="course-desc">
        Concluiu com sucesso o curso teológico <strong>"${esc(f.curso)}"</strong>, ${esc(f.complementoCurso)}, de ${esc(f.periodoInicio)} a ${esc(f.periodoFim)}, cumprindo uma carga horária de ${esc(f.cargaHoraria)} horas/aulas.
      </div>

      <div class="sigs-row">
        <div class="sig-col">
          ${incluirAssinatura ? `<img src="${esc(assinaturaUrl)}" class="sig-img" alt="Assinatura" />` : `<div class="sig-spacer"></div>`}
          <div class="sig-line">${esc(f.diretorNome)}</div>
          <div class="sig-role">${esc(f.diretorCargo)}</div>
        </div>
        <div class="edb-badge">
          <span class="cap">🎓</span>
          <span class="txt">EDB</span>
        </div>
        <div class="sig-col">
          <div class="sig-spacer"></div>
          <div class="sig-line">${esc(f.coordenadorNome)}</div>
          <div class="sig-role">${esc(f.coordenadorCargo)}</div>
        </div>
      </div>

      <div class="seal-wrap">
        <div class="seal-circle">
          <span class="seal-aprov">APROVADO</span>
          <span class="seal-year">${esc(f.anoSelo)}</span>
          <span class="seal-stars">★ ★ ★</span>
        </div>
        <div class="seal-ribbon"></div>
      </div>

      <div class="bottom-left-logo">
        <img src="${esc(logoBetesda)}" alt="Betesda" />
        <span>${esc(f.cidade)}</span>
      </div>

      <div class="bottom-date">${esc(f.cidade)}, ${esc(dataParaExtenso(f.dataEmissao))}.</div>
    </div>
  </div>
</body>
</html>`;
    } else if (modeloAtivo === 'batismo') {
      const f = batismoForm;
      tituloArquivo = `Certificado de Batismo - ${f.nomeBatizando || 'Membro'}`;
      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(tituloArquivo)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700;800&display=swap');
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { margin: 0; padding: 0; background: #ffffff; }
    .sheet {
      width: 297mm;
      height: 210mm;
      background: #ffffff;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      overflow: hidden;
    }
    .top-art {
      width: 100%;
      height: 82mm;
      object-fit: cover;
      object-position: top center;
      display: block;
    }
    .body {
      flex: 1;
      padding: 2mm 24mm 12mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
    }
    .cert-label {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 16pt;
      color: #334155;
      margin-top: 2mm;
    }
    .person-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 28pt;
      font-weight: 800;
      color: #0b2d5c;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 2mm 14mm 3mm;
      border-bottom: 2pt solid #0284c7;
      margin: 2mm 0 4mm;
    }
    .desc-text {
      max-width: 225mm;
      font-size: 13.5pt;
      line-height: 1.6;
      color: #1e293b;
      margin: 0;
    }
    .bottom-row {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 6mm;
    }
    .logo-betesda {
      height: 19mm;
      max-width: 85mm;
      object-fit: contain;
    }
    .sig-box {
      text-align: center;
      min-width: 82mm;
    }
    .sig-img {
      height: 24mm;
      max-width: 64mm;
      object-fit: contain;
      display: block;
      margin: 0 auto -6mm;
    }
    .sig-line {
      border-top: 1.3pt solid #0f172a;
      padding-top: 1.5mm;
      font-size: 12pt;
      font-weight: 800;
      color: #0f172a;
    }
    .sig-role {
      font-size: 10pt;
      color: #475569;
    }
    .city-date {
      font-size: 10pt;
      color: #475569;
      margin-top: 1.5mm;
    }
  </style>
</head>
<body>
  <div class="sheet">
    ${fundoBatismoCustom
      ? `<img src="${fundoBatismoCustom}" style="position:absolute;inset:0;width:297mm;height:210mm;object-fit:cover;z-index:0;" alt="Fundo Batismo" /><div style="height:68mm;position:relative;z-index:1;"></div>`
      : `<img src="${esc(topoBatismoUrl)}" class="top-art" alt="Certificado de Batismo" />`}
    <div class="body" style="position:relative;z-index:2;">
      <div>
        <div class="cert-label">Certificamos que</div>
        <div class="person-name">${esc(f.nomeBatizando || 'NOME DO BATIZANDO')}</div>
        <p class="desc-text">${esc(textoBatismoFinal)}</p>
      </div>
      <div class="bottom-row">
        <img src="${esc(logoBetesda)}" class="logo-betesda" alt="Betesda" />
        <div class="sig-box">
          ${incluirAssinatura ? `<img src="${esc(assinaturaUrl)}" class="sig-img" alt="Assinatura" />` : `<div style="height:18mm;"></div>`}
          <div class="sig-line">${esc(f.pastorNome)}</div>
          <div class="sig-role">${esc(f.pastorCargo)}</div>
          <div class="city-date">${esc(f.cidade)}, ${esc(dataParaExtenso(f.dataBatismo))}.</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
    } else if (modeloAtivo === 'apresentacao') {
      const f = apresentacaoForm;
      tituloArquivo = `Certificado de Apresentacao - ${f.nomeCrianca || 'Crianca'}`;
      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(tituloArquivo)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;600;700;800&display=swap');
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { margin: 0; padding: 0; background: #ffffff; }
    .sheet {
      width: 297mm;
      height: 210mm;
      position: relative;
      overflow: hidden;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    }
    .bg-art {
      position: absolute;
      inset: 0;
      width: 297mm;
      height: 210mm;
      object-fit: cover;
    }
    .child-name {
      position: absolute;
      top: 88mm;
      left: 60mm;
      width: 177mm;
      height: 22mm;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24pt;
      font-weight: 800;
      color: #6b3428;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .body-text {
      position: absolute;
      top: 117mm;
      left: 48mm;
      width: 201mm;
      text-align: center;
      font-size: 13pt;
      line-height: 1.55;
      color: #3f2b22;
      font-weight: 500;
    }
    .sig-area {
      position: absolute;
      right: 32mm;
      bottom: 20mm;
      width: 105mm;
      text-align: center;
    }
    .sig-date {
      font-size: 10.5pt;
      color: #5c4338;
      margin-bottom: 1mm;
    }
    .sig-img {
      height: 22mm;
      max-width: 60mm;
      object-fit: contain;
      display: block;
      margin: 0 auto -6mm;
    }
    .sig-line {
      border-top: 1.3pt solid #5c4338;
      padding-top: 1.2mm;
      font-size: 11.5pt;
      font-weight: 800;
      color: #3f2b22;
    }
    .sig-role {
      font-size: 9.5pt;
      color: #5c4338;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <img src="${esc(fundoApresentacaoUrl)}" class="bg-art" alt="Certificado de Apresentação" />
    <div class="child-name">${esc(f.nomeCrianca || 'NOME DA CRIANÇA')}</div>
    <div class="body-text">${esc(textoApresentacaoFinal)}</div>
    <div class="sig-area">
      <div class="sig-date">${esc(f.cidade)}, ${esc(dataParaExtenso(f.dataApresentacao))}.</div>
      ${incluirAssinatura ? `<img src="${esc(assinaturaUrl)}" class="sig-img" alt="Assinatura" />` : `<div style="height:16mm;"></div>`}
      <div class="sig-line">${esc(f.pastorNome)}</div>
      <div class="sig-role">${esc(f.pastorCargo)}</div>
    </div>
  </div>
</body>
</html>`;
    } else if (modeloCustomAtivo) {
      const mc = modeloCustomAtivo;
      const f = customForm;
      tituloArquivo = `${mc.titulo} - ${f.nomeParticipante || 'Certificado'}`;
      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(tituloArquivo)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;600;700;800&display=swap');
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { margin: 0; padding: 0; background: #ffffff; }
    .sheet {
      width: 297mm;
      height: 210mm;
      position: relative;
      overflow: hidden;
      background: #ffffff;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    }
    .bg-art {
      position: absolute;
      inset: 0;
      width: 297mm;
      height: 210mm;
      object-fit: cover;
    }
    .fallback-border {
      position: absolute;
      inset: 9mm;
      border: 2pt solid #1e3a8a;
      outline: 0.8pt solid #d4a23a;
      outline-offset: -3mm;
    }
    .name-box {
      position: absolute;
      top: ${mc.posNomeY || 44}%;
      left: 12%;
      width: 76%;
      text-align: center;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 27pt;
      font-weight: 800;
      color: ${mc.corNome || '#1e3a8a'};
      text-transform: uppercase;
      line-height: 1.15;
    }
    .text-box {
      position: absolute;
      top: ${mc.posTextoY || 57}%;
      left: 14%;
      width: 72%;
      text-align: center;
      font-size: 13pt;
      line-height: 1.55;
      color: ${mc.corTexto || '#1e293b'};
    }
    .sig-area {
      position: absolute;
      right: 28mm;
      bottom: 18mm;
      width: 96mm;
      text-align: center;
    }
    .sig-date { font-size: 10pt; color: ${mc.corTexto || '#334155'}; margin-bottom: 1mm; }
    .sig-img { height: 22mm; max-width: 60mm; object-fit: contain; display: block; margin: 0 auto -6mm; }
    .sig-line { border-top: 1.3pt solid ${mc.corTexto || '#1e293b'}; padding-top: 1.2mm; font-size: 11.5pt; font-weight: 800; color: ${mc.corNome || '#0f172a'}; }
    .sig-role { font-size: 9.5pt; color: ${mc.corTexto || '#475569'}; }
    .logo-left { position: absolute; left: 22mm; bottom: 18mm; height: 16mm; max-width: 72mm; object-fit: contain; }
  </style>
</head>
<body>
  <div class="sheet">
    ${mc.fundoImg ? `<img src="${mc.fundoImg}" class="bg-art" alt="${esc(mc.titulo)}" />` : `<div class="fallback-border"></div>`}
    ${!mc.fundoImg ? `<img src="${esc(logoBetesda)}" class="logo-left" alt="Betesda" />` : ''}
    <div class="name-box">${esc(f.nomeParticipante || 'NOME DO PARTICIPANTE')}</div>
    <div class="text-box">${esc(textoCustomResolvido)}</div>
    <div class="sig-area">
      <div class="sig-date">${esc(f.cidade)}, ${esc(dataParaExtenso(f.dataEmissao))}.</div>
      ${incluirAssinatura ? `<img src="${esc(assinaturaUrl)}" class="sig-img" alt="Assinatura" />` : `<div style="height:16mm;"></div>`}
      <div class="sig-line">${esc(f.pastorNome)}</div>
      <div class="sig-role">${esc(f.pastorCargo)}</div>
    </div>
  </div>
</body>
</html>`;
    }

    const tituloAnterior = document.title;
    document.title = tituloArquivo;

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
    }, 300);
  };

  const inputCls =
    'w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#0b1329] text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30';
  const labelCls = 'block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1';

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className={mobileEditorAberto ? 'hidden lg:block' : 'block'}>
        <PageHeader
          titulo="Certificados"
          subtitulo="Emita certificados oficiais da EDB (Ouro), Batismo nas Águas e Apresentação de Crianças em A4 Paisagem."
          breadcrumb={['Utilitários', 'Certificados']}
          onNavigate={() => onVoltar && onVoltar()}
        />
      </div>

      {/* ── HUB MOBILE: CARDS QUADRADOS ESTÁTICOS ── */}
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
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selecionarModelo(m.id, true); } }}
                className="group relative aspect-square p-4 rounded-3xl bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500/70 transition-all duration-200 active:scale-[0.97] flex flex-col justify-between text-left overflow-hidden cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 w-full">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${m.cor} text-white flex items-center justify-center shrink-0 shadow-sm`}>
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
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                        title="Remover modelo"
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
                    Emitir
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}

          {/* Botão Quadrado: Adicionar Modelo Pré-Pronto (Mobile) */}
          <button
            type="button"
            onClick={() => setModalNovoModeloAberto(true)}
            className="aspect-square p-4 rounded-3xl bg-slate-50/80 dark:bg-[#131d31] border-2 border-dashed border-slate-300 dark:border-[#2b3954] hover:border-blue-500 dark:hover:border-blue-400 transition-all active:scale-[0.97] flex flex-col items-center justify-center text-center gap-2 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-600/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Plus size={22} />
            </div>
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">Novo Modelo</span>
            <span className="text-[10px] text-slate-400 leading-tight">Envie uma arte pronta</span>
          </button>
        </div>
      )}

      {/* ── BARRA DE RETORNO MOBILE ── */}
      {mobileEditorAberto && (
        <div className="lg:hidden flex items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-xs">
          <button
            type="button"
            onClick={() => {
              setMobileEditorAberto(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#131d31] border border-slate-200/80 dark:border-[#2b3954] text-slate-700 dark:text-slate-200 text-xs font-extrabold cursor-pointer shrink-0"
          >
            <ChevronLeft size={16} />
            <span>Certificados</span>
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

      {/* 1. SELETOR DE MODELOS (DESKTOP lg+) */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4">
        {todosModelos.map((m) => {
          const Icone = m.icon;
          const ativo = modeloAtivo === m.id;
          return (
            <div
              key={m.id}
              role="button"
              tabIndex={0}
              onClick={() => selecionarModelo(m.id, false)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selecionarModelo(m.id, false); } }}
              className={`relative p-4 rounded-2xl border text-left transition-all cursor-pointer active:scale-[0.98] flex items-center gap-3.5 ${
                ativo
                  ? 'bg-gradient-to-br ' + m.cor + ' text-white border-transparent shadow-lg'
                  : 'bg-white dark:bg-[#17223b] border-slate-200/80 dark:border-[#2b3954] hover:border-blue-400 dark:hover:border-blue-500/70'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                  ativo ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-[#131d31] text-blue-600 dark:text-blue-400'
                }`}
              >
                <Icone size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <span className={`text-[9px] font-black uppercase tracking-wider ${ativo ? 'text-white/85' : 'text-slate-400'}`}>
                  {m.categoria}
                </span>
                <p className={`text-sm font-extrabold leading-tight truncate ${ativo ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                  {m.titulo}
                </p>
                <p className={`text-[11px] mt-0.5 line-clamp-1 ${ativo ? 'text-white/85' : 'text-slate-500 dark:text-slate-400'}`}>
                  {m.desc}
                </p>
              </div>
              {m.isCustom && (
                <button
                  type="button"
                  onClick={(e) => handleExcluirModeloCustom(e, m.id)}
                  className={`p-1.5 rounded-lg transition cursor-pointer shrink-0 ${
                    ativo ? 'text-white/80 hover:bg-white/20' : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                  }`}
                  title="Excluir modelo pré-pronto"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          );
        })}

        {/* Card Desktop: Adicionar Modelo Pré-Pronto */}
        <button
          type="button"
          onClick={() => setModalNovoModeloAberto(true)}
          className="p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-[#2b3954] bg-slate-50/70 dark:bg-[#131d31] hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer flex items-center gap-3.5 text-left"
        >
          <div className="w-11 h-11 rounded-2xl bg-blue-600/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Plus size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Novo Modelo</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">Adicionar arte pré-pronta</p>
          </div>
        </button>
      </div>

      {/* CONTEÚDO: BARRA DE AÇÕES + EDITOR + PRÉ-VISUALIZAÇÃO */}
      <div className={`${mobileEditorAberto ? 'space-y-5' : 'hidden lg:block lg:space-y-5'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] shadow-2xs">
          <div className="flex items-center gap-3">
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
                Visualizar
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <Sparkles size={15} className="text-amber-500" />
              <span>Formato A4 Paisagem (297 × 210 mm)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-slate-50 dark:bg-[#131d31] hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition">
              <ImageIcon size={14} className="text-blue-600 dark:text-blue-400" />
              <span>{fundoAtivoPersonalizado ? 'Trocar Fundo (PNG/JPG)' : 'Alterar Fundo (PNG/JPG)'}</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleAlterarFundoAtivo}
                className="hidden"
              />
            </label>
            {fundoAtivoPersonalizado && (
              <button
                type="button"
                onClick={handleRestaurarFundoAtivo}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/35 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold cursor-pointer transition"
                title="Voltar para o plano de fundo original"
              >
                <RotateCcw size={13} />
                <span>Restaurar Fundo</span>
              </button>
            )}
            <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer px-1">
              <input
                type="checkbox"
                checked={incluirAssinatura}
                onChange={(e) => setIncluirAssinatura(e.target.checked)}
                className="rounded"
              />
              <span>Assinatura do Pastor</span>
            </label>
            <button
              type="button"
              onClick={handleImprimirPdf}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm cursor-pointer transition active:scale-95"
            >
              <Printer size={15} />
              <span>Imprimir / Salvar PDF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* EDITOR */}
          <Card className={`${abaMobile === 'editor' ? 'block' : 'hidden lg:block'} lg:col-span-5 p-5 bg-white dark:bg-[#17223b] border border-slate-200/80 dark:border-[#2b3954] space-y-4`}>
            {pessoasAtivas.length > 0 && (
              <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/35 border border-blue-200/80 dark:border-blue-800/60 space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                  <UserCheck size={13} />
                  Preencher a partir de um membro (opcional)
                </label>
                <select
                  value={membroSelecionadoId}
                  onChange={(e) => preencherComMembro(e.target.value)}
                  className={inputCls}
                >
                  <option value="">Selecionar membro cadastrado...</option>
                  {pessoasAtivas.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
            )}

            {modeloAtivo === 'edb-ouro' && (
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Nome do(a) Formando(a)</label>
                  <input value={edbForm.nomeAluno} onChange={(e) => setEdbForm({ ...edbForm, nomeAluno: e.target.value })} placeholder="Ex: Ashley Oliveira Viana" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Nome do Curso</label>
                  <input value={edbForm.curso} onChange={(e) => setEdbForm({ ...edbForm, curso: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Complemento / Visão</label>
                  <input value={edbForm.complementoCurso} onChange={(e) => setEdbForm({ ...edbForm, complementoCurso: e.target.value })} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Início do Curso</label>
                    <input value={edbForm.periodoInicio} onChange={(e) => setEdbForm({ ...edbForm, periodoInicio: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Término do Curso</label>
                    <input value={edbForm.periodoFim} onChange={(e) => setEdbForm({ ...edbForm, periodoFim: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>Carga (h)</label>
                    <input value={edbForm.cargaHoraria} onChange={(e) => setEdbForm({ ...edbForm, cargaHoraria: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Ano no Selo</label>
                    <input value={edbForm.anoSelo} onChange={(e) => setEdbForm({ ...edbForm, anoSelo: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Data Emissão</label>
                    <input type="date" value={edbForm.dataEmissao} onChange={(e) => setEdbForm({ ...edbForm, dataEmissao: e.target.value })} className={`${inputCls} dark:[color-scheme:dark]`} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Diretor(a)</label>
                    <input value={edbForm.diretorNome} onChange={(e) => setEdbForm({ ...edbForm, diretorNome: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Coordenador(a)</label>
                    <input value={edbForm.coordenadorNome} onChange={(e) => setEdbForm({ ...edbForm, coordenadorNome: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Cidade</label>
                  <input value={edbForm.cidade} onChange={(e) => setEdbForm({ ...edbForm, cidade: e.target.value })} className={inputCls} />
                </div>
              </div>
            )}

            {modeloAtivo === 'batismo' && (
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Nome do(a) Batizando(a)</label>
                  <input value={batismoForm.nomeBatizando} onChange={(e) => setBatismoForm({ ...batismoForm, nomeBatizando: e.target.value })} placeholder="Ex: KAIQUE ZACARIAS DE MORAIS" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Gênero (Concordância)</label>
                    <select value={batismoForm.genero} onChange={(e) => setBatismoForm({ ...batismoForm, genero: e.target.value })} className={inputCls}>
                      <option value="M">Masculino (batizado)</option>
                      <option value="F">Feminino (batizada)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Data do Batismo</label>
                    <input type="date" value={batismoForm.dataBatismo} onChange={(e) => setBatismoForm({ ...batismoForm, dataBatismo: e.target.value })} className={`${inputCls} dark:[color-scheme:dark]`} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Pastor Celebrante</label>
                    <input value={batismoForm.pastorNome} onChange={(e) => setBatismoForm({ ...batismoForm, pastorNome: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Cidade</label>
                    <input value={batismoForm.cidade} onChange={(e) => setBatismoForm({ ...batismoForm, cidade: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Texto Personalizado (opcional)</label>
                  <textarea
                    rows={3}
                    value={batismoForm.textoCustom}
                    onChange={(e) => setBatismoForm({ ...batismoForm, textoCustom: e.target.value })}
                    placeholder="Deixe vazio para usar o texto padrão oficial do batismo."
                    className={inputCls}
                  />
                </div>
              </div>
            )}

            {modeloAtivo === 'apresentacao' && (
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Nome da Criança</label>
                  <input value={apresentacaoForm.nomeCrianca} onChange={(e) => setApresentacaoForm({ ...apresentacaoForm, nomeCrianca: e.target.value })} placeholder="Ex: BENTO AMARO DE ALMEIDA" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Gênero</label>
                    <select value={apresentacaoForm.genero} onChange={(e) => setApresentacaoForm({ ...apresentacaoForm, genero: e.target.value })} className={inputCls}>
                      <option value="M">Masculino (Nascido / filho)</option>
                      <option value="F">Feminino (Nascida / filha)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Data de Nascimento</label>
                    <input type="date" value={apresentacaoForm.dataNascimento} onChange={(e) => setApresentacaoForm({ ...apresentacaoForm, dataNascimento: e.target.value })} className={`${inputCls} dark:[color-scheme:dark]`} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Nome do Pai</label>
                  <input value={apresentacaoForm.nomePai} onChange={(e) => setApresentacaoForm({ ...apresentacaoForm, nomePai: e.target.value })} placeholder="Ex: Josenildo Zacarias da Silva" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Nome da Mãe</label>
                  <input value={apresentacaoForm.nomeMae} onChange={(e) => setApresentacaoForm({ ...apresentacaoForm, nomeMae: e.target.value })} placeholder="Ex: Ranielle Cristine Lima Zacarias" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Data da Apresentação</label>
                    <input type="date" value={apresentacaoForm.dataApresentacao} onChange={(e) => setApresentacaoForm({ ...apresentacaoForm, dataApresentacao: e.target.value })} className={`${inputCls} dark:[color-scheme:dark]`} />
                  </div>
                  <div>
                    <label className={labelCls}>Cidade</label>
                    <input value={apresentacaoForm.cidade} onChange={(e) => setApresentacaoForm({ ...apresentacaoForm, cidade: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Pastor</label>
                  <input value={apresentacaoForm.pastorNome} onChange={(e) => setApresentacaoForm({ ...apresentacaoForm, pastorNome: e.target.value })} className={inputCls} />
                </div>
              </div>
            )}

            {modeloCustomAtivo && (
              <div className="space-y-3">
                <div>
                  <label className={labelCls}>Nome do Participante / Homenageado</label>
                  <input
                    value={customForm.nomeParticipante}
                    onChange={(e) => setCustomForm({ ...customForm, nomeParticipante: e.target.value })}
                    placeholder="Nome completo"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Texto do Certificado (use {'{{NOME}}'}, {'{{DATA}}'}, {'{{CIDADE}}'})</label>
                  <textarea
                    rows={4}
                    value={customForm.texto}
                    onChange={(e) => setCustomForm({ ...customForm, texto: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Data</label>
                    <input type="date" value={customForm.dataEmissao} onChange={(e) => setCustomForm({ ...customForm, dataEmissao: e.target.value })} className={`${inputCls} dark:[color-scheme:dark]`} />
                  </div>
                  <div>
                    <label className={labelCls}>Cidade</label>
                    <input value={customForm.cidade} onChange={(e) => setCustomForm({ ...customForm, cidade: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Assinante</label>
                    <input value={customForm.pastorNome} onChange={(e) => setCustomForm({ ...customForm, pastorNome: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Cargo</label>
                    <input value={customForm.pastorCargo} onChange={(e) => setCustomForm({ ...customForm, pastorCargo: e.target.value })} className={inputCls} />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* PRÉ-VISUALIZAÇÃO A4 PAISAGEM EM TEMPO REAL */}
          <div className={`${abaMobile === 'preview' ? 'block' : 'hidden lg:block'} lg:col-span-7`}>
            <div className="rounded-2xl bg-slate-200/80 dark:bg-[#0b1329] p-3 sm:p-4 border border-slate-300/70 dark:border-[#24334f] shadow-inner">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Pré-visualização A4 Paisagem
                </span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">297 × 210 mm</span>
              </div>

              {modeloAtivo === 'edb-ouro' && (
                <div
                  className="relative w-full aspect-[297/210] rounded-xl shadow-xl overflow-hidden select-none"
                  style={{ backgroundColor: '#ffffff', color: '#334155' }}
                >
                  {fundosOverride['edb-ouro'] ? (
                    <img
                      src={fundosOverride['edb-ouro']}
                      alt="Fundo EDB personalizado"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <svg viewBox="0 0 297 210" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="pvPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4e207e" />
                            <stop offset="100%" stopColor="#7c3fb8" />
                          </linearGradient>
                          <linearGradient id="pvGold" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c6922c" />
                            <stop offset="50%" stopColor="#f6d87e" />
                            <stop offset="100%" stopColor="#c6922c" />
                          </linearGradient>
                        </defs>
                        <polygon points="0,0 245,0 100,47 0,16" fill="url(#pvPurple)" />
                        <polygon points="0,20 100,49 275,0 297,0 297,11 102,52 0,31" fill="url(#pvGold)" />
                        <polygon points="0,35 102,53 297,22 297,30 102,54 0,40" fill="url(#pvPurple)" />
                        <polygon points="95,210 258,180 297,196 297,210" fill="url(#pvPurple)" />
                        <polygon points="155,210 262,188 297,203 297,210" fill="url(#pvGold)" />
                      </svg>
                      <div className="absolute inset-[3%] pointer-events-none" style={{ border: '1.5px solid #d4a23a' }} />
                    </>
                  )}

                  {/* Título */}
                  <div className="absolute top-[3%] left-[6%] w-[56%] text-center italic font-serif text-2xl sm:text-4xl font-bold" style={{ color: '#ffffff' }}>
                    Certificado
                  </div>
                  <div
                    className="absolute top-[20.5%] left-[21%] px-4 py-0.5 rounded-full text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.22em]"
                    style={{ background: 'linear-gradient(90deg,#522382,#6f35a6)', border: '1.5px solid #d4a23a', color: '#ffffff' }}
                  >
                    DE CONCLUSÃO
                  </div>

                  {/* Corpo */}
                  <div className="absolute top-[31%] left-[7%] w-[57%] text-center">
                    <p className="text-[7px] sm:text-[9px] font-serif uppercase tracking-[0.18em]" style={{ color: '#4a236b' }}>
                      CERTIFICAMOS ORGULHOSAMENTE QUE
                    </p>
                    <p className="font-serif text-lg sm:text-2xl font-bold mt-1 truncate" style={{ color: '#5b2d8e' }}>
                      {edbForm.nomeAluno || 'Nome do(a) Formando(a)'}
                    </p>
                    <div className="h-[1.5px] w-full my-1.5" style={{ background: 'linear-gradient(90deg,#c6922c,#f3d277,#c6922c)' }} />
                    <p className="text-[8px] sm:text-[10px] leading-snug text-left mt-1.5" style={{ color: '#334155' }}>
                      Concluiu com sucesso o curso teológico <strong>"{edbForm.curso}"</strong>, {edbForm.complementoCurso}, de {edbForm.periodoInicio} a {edbForm.periodoFim}, cumprindo uma carga horária de {edbForm.cargaHoraria} horas/aulas.
                    </p>
                  </div>

                  {/* Selo Dourado Direita */}
                  <div className="absolute right-[7%] top-[27%] flex flex-col items-center">
                    <div
                      className="w-16 h-16 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center shadow-lg z-10"
                      style={{ background: 'radial-gradient(circle,#7a3eb5,#4b1d7a)', border: '4px solid #e4b84d', color: '#ffffff' }}
                    >
                      <span className="text-[6px] sm:text-[8px] font-bold tracking-widest">APROVADO</span>
                      <span className="font-serif text-sm sm:text-xl font-extrabold leading-none">{edbForm.anoSelo}</span>
                      <span className="text-[7px] sm:text-[9px]" style={{ color: '#f6d57a' }}>★ ★ ★</span>
                    </div>
                    <div
                      className="w-10 sm:w-14 h-12 sm:h-16 -mt-3"
                      style={{
                        background: 'linear-gradient(90deg,#5b2d8e 0%,#5b2d8e 18%,#e4b84d 18%,#f7dc88 50%,#e4b84d 82%,#5b2d8e 82%,#5b2d8e 100%)',
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
                      }}
                    />
                  </div>

                  {/* Assinaturas + Selo EDB */}
                  <div className="absolute top-[65%] left-[7%] w-[58%] flex items-center justify-between gap-2">
                    <div className="flex-1 text-center">
                      {incluirAssinatura ? (
                        <img src="/certificados/assinatura-pastor.png" alt="Assinatura" className="h-7 sm:h-10 mx-auto -mb-2 object-contain" />
                      ) : <div className="h-5" />}
                      <div className="pt-0.5 text-[7.5px] sm:text-[9.5px] font-extrabold truncate" style={{ borderTop: '1px solid #c6922c', color: '#4a236b' }}>
                        {edbForm.diretorNome}
                      </div>
                      <div className="text-[6px] sm:text-[7.5px] font-bold uppercase" style={{ color: '#6b3b94' }}>
                        {edbForm.diretorCargo}
                      </div>
                    </div>
                    <div
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center shrink-0"
                      style={{ background: 'radial-gradient(circle,#8b4cc9,#4a1e78)', border: '2px solid #e3b84c', color: '#ffffff' }}
                    >
                      <span className="text-xs sm:text-sm leading-none">🎓</span>
                      <span className="font-serif text-[8px] sm:text-[10px] font-extrabold">EDB</span>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="h-5 sm:h-8" />
                      <div className="pt-0.5 text-[7.5px] sm:text-[9.5px] font-extrabold truncate" style={{ borderTop: '1px solid #c6922c', color: '#4a236b' }}>
                        {edbForm.coordenadorNome}
                      </div>
                      <div className="text-[6px] sm:text-[7.5px] font-bold uppercase" style={{ color: '#6b3b94' }}>
                        {edbForm.coordenadorCargo}
                      </div>
                    </div>
                  </div>

                  {/* Rodapé Logo + Data */}
                  <img src="/betesda-geral.png" alt="Betesda" className="absolute left-[13%] bottom-[5%] h-6 sm:h-8 w-auto object-contain" />
                  <span className="absolute left-[41%] bottom-[10%] text-[7.5px] sm:text-[9.5px] font-semibold" style={{ color: '#4a236b' }}>
                    {edbForm.cidade}, {dataParaExtenso(edbForm.dataEmissao)}.
                  </span>
                </div>
              )}

              {modeloAtivo === 'batismo' && (
                <div
                  className="relative w-full aspect-[297/210] rounded-xl shadow-xl overflow-hidden flex flex-col justify-between select-none"
                  style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
                >
                  {fundosOverride['batismo'] ? (
                    <>
                      <img
                        src={fundosOverride['batismo']}
                        alt="Fundo Batismo personalizado"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="h-[32%] shrink-0 relative z-10" />
                    </>
                  ) : (
                    <img src="/certificados/topo-batismo.png" alt="Certificado de Batismo" className="w-full h-[39%] object-cover object-top" />
                  )}
                  <div className="relative z-10 flex-1 px-6 sm:px-10 pb-4 flex flex-col items-center justify-between text-center">
                    <div className="w-full flex flex-col items-center">
                      <span className="font-serif text-xs sm:text-sm" style={{ color: '#334155' }}>Certificamos que</span>
                      <span
                        className="font-serif text-base sm:text-2xl font-extrabold uppercase tracking-wide px-4 pb-1 mt-0.5 truncate max-w-full"
                        style={{ color: '#0b2d5c', borderBottom: '2px solid #0284c7' }}
                      >
                        {batismoForm.nomeBatizando || 'NOME DO BATIZANDO'}
                      </span>
                      <p className="text-[9px] sm:text-xs leading-relaxed mt-2 max-w-[90%]" style={{ color: '#1e293b' }}>
                        {textoBatismoFinal}
                      </p>
                    </div>
                    <div className="w-full flex items-end justify-between gap-4">
                      <img src="/betesda-geral.png" alt="Betesda" className="h-7 sm:h-10 w-auto object-contain" />
                      <div className="text-center min-w-[120px] sm:min-w-[170px]">
                        {incluirAssinatura ? (
                          <img src="/certificados/assinatura-pastor.png" alt="Assinatura" className="h-8 sm:h-12 mx-auto -mb-2.5 object-contain" />
                        ) : <div className="h-6" />}
                        <div className="pt-0.5 text-[9px] sm:text-xs font-extrabold" style={{ borderTop: '1px solid #0f172a', color: '#0f172a' }}>
                          {batismoForm.pastorNome}
                        </div>
                        <div className="text-[7.5px] sm:text-[10px]" style={{ color: '#475569' }}>
                          {batismoForm.pastorCargo}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modeloAtivo === 'apresentacao' && (
                <div className="relative w-full aspect-[297/210] rounded-xl shadow-xl overflow-hidden select-none">
                  <img
                    src={fundosOverride['apresentacao'] || '/certificados/fundo-apresentacao.png'}
                    alt="Certificado de Apresentação"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-[41.8%] left-[20%] w-[60%] h-[10.8%] flex items-center justify-center text-center px-2 font-serif text-sm sm:text-xl font-extrabold uppercase truncate"
                    style={{ color: '#6b3428' }}
                  >
                    {apresentacaoForm.nomeCrianca || 'NOME DA CRIANÇA'}
                  </div>
                  <div
                    className="absolute top-[56%] left-[15%] w-[70%] text-center text-[8.5px] sm:text-xs leading-snug font-medium"
                    style={{ color: '#3f2b22' }}
                  >
                    {textoApresentacaoFinal}
                  </div>
                  <div className="absolute right-[10%] bottom-[9%] w-[36%] text-center">
                    <div className="text-[7px] sm:text-[9.5px]" style={{ color: '#5c4338' }}>
                      {apresentacaoForm.cidade}, {dataParaExtenso(apresentacaoForm.dataApresentacao)}.
                    </div>
                    {incluirAssinatura ? (
                      <img src="/certificados/assinatura-pastor.png" alt="Assinatura" className="h-7 sm:h-11 mx-auto -mb-2.5 object-contain" />
                    ) : <div className="h-5" />}
                    <div className="pt-0.5 text-[8px] sm:text-[10.5px] font-extrabold" style={{ borderTop: '1px solid #5c4338', color: '#3f2b22' }}>
                      {apresentacaoForm.pastorNome}
                    </div>
                    <div className="text-[7px] sm:text-[9px]" style={{ color: '#5c4338' }}>
                      {apresentacaoForm.pastorCargo}
                    </div>
                  </div>
                </div>
              )}

              {modeloCustomAtivo && (
                <div
                  className="relative w-full aspect-[297/210] rounded-xl shadow-xl overflow-hidden select-none"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  {modeloCustomAtivo.fundoImg ? (
                    <img src={modeloCustomAtivo.fundoImg} alt={modeloCustomAtivo.titulo} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-[3%] pointer-events-none" style={{ border: '2px solid #1e3a8a', outline: '1px solid #d4a23a', outlineOffset: '-4px' }} />
                      <img src="/betesda-geral.png" alt="Betesda" className="absolute left-[8%] bottom-[9%] h-7 sm:h-9 w-auto object-contain" />
                    </>
                  )}
                  <div
                    className="absolute left-[12%] w-[76%] text-center font-serif text-base sm:text-2xl font-extrabold uppercase truncate"
                    style={{ top: `${modeloCustomAtivo.posNomeY || 44}%`, color: modeloCustomAtivo.corNome || '#1e3a8a' }}
                  >
                    {customForm.nomeParticipante || 'NOME DO PARTICIPANTE'}
                  </div>
                  <div
                    className="absolute left-[14%] w-[72%] text-center text-[8.5px] sm:text-xs leading-relaxed"
                    style={{ top: `${modeloCustomAtivo.posTextoY || 57}%`, color: modeloCustomAtivo.corTexto || '#1e293b' }}
                  >
                    {textoCustomResolvido}
                  </div>
                  <div className="absolute right-[9%] bottom-[9%] w-[34%] text-center">
                    <div className="text-[7px] sm:text-[9px]" style={{ color: modeloCustomAtivo.corTexto || '#334155' }}>
                      {customForm.cidade}, {dataParaExtenso(customForm.dataEmissao)}.
                    </div>
                    {incluirAssinatura ? (
                      <img src="/certificados/assinatura-pastor.png" alt="Assinatura" className="h-7 sm:h-10 mx-auto -mb-2 object-contain" />
                    ) : <div className="h-5" />}
                    <div className="pt-0.5 text-[8px] sm:text-[10px] font-extrabold" style={{ borderTop: `1px solid ${modeloCustomAtivo.corTexto || '#1e293b'}`, color: modeloCustomAtivo.corNome || '#0f172a' }}>
                      {customForm.pastorNome}
                    </div>
                    <div className="text-[7px] sm:text-[8.5px]" style={{ color: modeloCustomAtivo.corTexto || '#475569' }}>
                      {customForm.pastorCargo}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL: ADICIONAR NOVO MODELO PRÉ-PRONTO DE CERTIFICADO ── */}
      {modalNovoModeloAberto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalNovoModeloAberto(false)}
          className="fixed inset-0 z-[120] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <form
            onSubmit={handleSalvarNovoModeloCert}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#17223b] border border-slate-200 dark:border-[#2b3954] shadow-2xl overflow-hidden my-auto"
          >
            <div className="px-5 py-4 bg-slate-50 dark:bg-[#131d31] border-b border-slate-200 dark:border-[#2b3954] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">Novo Modelo de Certificado</h3>
                <p className="text-[11px] text-slate-400">Cadastre uma arte pronta (Canva/PNG/JPG) para reutilizar sempre.</p>
              </div>
              <button
                type="button"
                onClick={() => setModalNovoModeloAberto(false)}
                className="w-8 h-8 rounded-full bg-white dark:bg-[#1c2b4a] border border-slate-200 dark:border-[#2b3954] text-slate-400 hover:text-rose-500 flex items-center justify-center cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-3.5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Nome do Modelo *</label>
                  <input
                    required
                    value={novoModeloForm.titulo}
                    onChange={(e) => setNovoModeloForm({ ...novoModeloForm, titulo: e.target.value })}
                    placeholder="Ex: Certificado Prata EDB"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Categoria</label>
                  <input
                    value={novoModeloForm.categoria}
                    onChange={(e) => setNovoModeloForm({ ...novoModeloForm, categoria: e.target.value })}
                    placeholder="Ex: Escola"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Arte de Fundo A4 Paisagem (PNG / JPG)</label>
                <label className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-[#2b3954] bg-slate-50 dark:bg-[#0b1329] hover:border-blue-500 cursor-pointer transition text-center">
                  {novoModeloForm.fundoImg ? (
                    <img src={novoModeloForm.fundoImg} alt="Preview fundo" className="max-h-28 rounded-lg object-contain shadow-xs" />
                  ) : (
                    <>
                      <Upload size={20} className="text-blue-500" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Clique para enviar a imagem do certificado</span>
                      <span className="text-[10px] text-slate-400">Opcional — sem imagem, usa moldura institucional padrão</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleUploadFundoModelo} className="hidden" />
                </label>
              </div>

              <div>
                <label className={labelCls}>Texto Padrão (variáveis: {'{{NOME}}'}, {'{{DATA}}'}, {'{{CIDADE}}'})</label>
                <textarea
                  rows={3}
                  value={novoModeloForm.textoPadrao}
                  onChange={(e) => setNovoModeloForm({ ...novoModeloForm, textoPadrao: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className={labelCls}>Cor do Nome</label>
                  <input type="color" value={novoModeloForm.corNome} onChange={(e) => setNovoModeloForm({ ...novoModeloForm, corNome: e.target.value })} className="w-full h-9 rounded-lg border border-slate-200 dark:border-[#2b3954] cursor-pointer" />
                </div>
                <div>
                  <label className={labelCls}>Cor do Texto</label>
                  <input type="color" value={novoModeloForm.corTexto} onChange={(e) => setNovoModeloForm({ ...novoModeloForm, corTexto: e.target.value })} className="w-full h-9 rounded-lg border border-slate-200 dark:border-[#2b3954] cursor-pointer" />
                </div>
                <div>
                  <label className={labelCls}>Altura Nome (%)</label>
                  <input type="number" min="10" max="80" value={novoModeloForm.posNomeY} onChange={(e) => setNovoModeloForm({ ...novoModeloForm, posNomeY: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Altura Texto (%)</label>
                  <input type="number" min="20" max="85" value={novoModeloForm.posTextoY} onChange={(e) => setNovoModeloForm({ ...novoModeloForm, posTextoY: e.target.value })} className={inputCls} />
                </div>
              </div>
            </div>

            <div className="px-5 py-4 bg-slate-50 dark:bg-[#131d31] border-t border-slate-200 dark:border-[#2b3954] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalNovoModeloAberto(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#2b3954] bg-white dark:bg-[#1c2b4a] text-slate-600 dark:text-slate-200 text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm cursor-pointer"
              >
                Salvar Modelo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
