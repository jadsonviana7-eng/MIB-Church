import React, { useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from './supabaseClient';
import { utilitariosCache } from './utilitariosCache';
import { Card, PageHeader } from './ui';
import PainelAjusteLayoutCertificado from './PainelAjusteLayoutCertificado';
import {
  STORAGE_CERT_LAYOUTS_KEY,
  PT_TO_CQW,
  getDefaultLayout,
  mesclarLayout,
  getFonteInfo,
  estiloTextoPreview,
  estiloTextoPrint,
  gerarFontFacesPrintCss,
} from './certificadoLayoutConfig';
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
  SlidersHorizontal,
} from 'lucide-react';

const STORAGE_CERT_MODELOS_KEY = 'mib_cert_modelos_custom_v1';
const STORAGE_CERT_FUNDOS_KEY = 'mib_cert_fundos_override_v1';
const STORAGE_CERT_ELEMENTOS_IMG_KEY = 'mib_cert_elementos_img_v1';

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

const PREPOSICOES_NOME = new Set(['da', 'de', 'do', 'das', 'dos', 'e']);

function abreviarNomeMeio(nome, maxChars = 26) {
  const limpo = String(nome || '').trim().replace(/\s+/g, ' ');
  if (!limpo || limpo.length <= maxChars) return limpo;
  const partes = limpo.split(' ');
  if (partes.length <= 2) return limpo;

  const resultado = [...partes];
  for (let i = 1; i < resultado.length - 1; i++) {
    if (resultado.join(' ').length <= maxChars) break;
    const palavra = resultado[i];
    if (PREPOSICOES_NOME.has(palavra.toLowerCase()) || palavra.length <= 2) continue;
    resultado[i] = `${palavra[0].toUpperCase()}.`;
  }
  return resultado.join(' ');
}

function formatarVersaleteHtml(texto, escFn) {
  return Array.from(String(texto || ''))
    .map((ch) => {
      const ehMinuscula = ch !== ch.toUpperCase() && ch === ch.toLowerCase();
      if (ehMinuscula) {
        return `<span style="font-size:0.78em;">${escFn(ch.toUpperCase())}</span>`;
      }
      return escFn(ch);
    })
    .join('');
}

function renderVersaleteJsx(texto, fontClass = 'font-bebas-neue') {
  return Array.from(String(texto || '')).map((ch, idx) => {
    const ehMinuscula = ch !== ch.toUpperCase() && ch === ch.toLowerCase();
    if (ehMinuscula) {
      return (
        <span key={idx} className={fontClass} style={{ fontSize: '0.78em' }}>
          {ch.toUpperCase()}
        </span>
      );
    }
    return <React.Fragment key={idx}>{ch}</React.Fragment>;
  });
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
  const [abreviarNomesLongos, setAbreviarNomesLongos] = useState(true);

  const formatarNomeExibicao = (nome, fallback) => {
    const base = String(nome || '').trim() || fallback;
    return abreviarNomesLongos ? abreviarNomeMeio(base, 26) : base;
  };

  // Planos de fundo personalizados (PNG/JPG) para os certificados já existentes
  const [fundosOverride, setFundosOverride] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CERT_FUNDOS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Editor manual de layout (arrastar e soltar + ajuste fino por elemento)
  const [modoLayout, setModoLayout] = useState(false);
  const [elementoSelecionadoId, setElementoSelecionadoId] = useState('nome');
  const [arrastando, setArrastando] = useState(false);
  const [layoutsSalvos, setLayoutsSalvos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CERT_LAYOUTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  // Elementos de imagem extras (PNG/JPG: assinaturas, selos, logotipos) inseridos pelo usuário
  const [elementosImgSalvos, setElementosImgSalvos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CERT_ELEMENTOS_IMG_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const previewSheetRef = useRef(null);
  const dragStateRef = useRef(null);

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
    const aplicarDadosIgreja = (data) => {
      if (!ativo || !data) return;
      setDadosIgreja(data);
      const cidade = data.cidade || 'Santana do Mundaú';
      const pastor = data.pastor_responsavel || 'Jadson da Silva Viana';
      setEdbForm((prev) => ({ ...prev, cidade }));
      setBatismoForm((prev) => ({ ...prev, cidade, pastorNome: pastor }));
      setApresentacaoForm((prev) => ({ ...prev, cidade, pastorNome: pastor }));
    };
    if (utilitariosCache.dadosIgreja) {
      aplicarDadosIgreja(utilitariosCache.dadosIgreja);
    }
    supabase
      .from('dados_igreja')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (!ativo || !data) return;
        utilitariosCache.dadosIgreja = data;
        aplicarDadosIgreja(data);
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

  const layoutPadrao = useMemo(
    () => getDefaultLayout(modeloAtivo, modeloCustomAtivo),
    [modeloAtivo, modeloCustomAtivo]
  );

  const elementosImgAtivos = useMemo(
    () => elementosImgSalvos[modeloAtivo] || [],
    [elementosImgSalvos, modeloAtivo]
  );

  const layoutAtivo = useMemo(() => {
    const base = mesclarLayout(layoutPadrao, layoutsSalvos[modeloAtivo]);
    for (const imgEl of elementosImgAtivos) {
      base[imgEl.id] = imgEl;
    }
    return base;
  }, [layoutPadrao, layoutsSalvos, modeloAtivo, elementosImgAtivos]);

  const possuiLayoutPersonalizado = Boolean(layoutsSalvos[modeloAtivo]) || elementosImgAtivos.length > 0;

  const atualizarElementoLayout = (elId, patch) => {
    if (String(elId).startsWith('img-extra-')) {
      setElementosImgSalvos((prev) => {
        const listaAtual = prev[modeloAtivo] || [];
        const novaLista = listaAtual.map((item) =>
          item.id === elId ? { ...item, ...patch } : item
        );
        const proximo = { ...prev, [modeloAtivo]: novaLista };
        try {
          localStorage.setItem(STORAGE_CERT_ELEMENTOS_IMG_KEY, JSON.stringify(proximo));
        } catch {
          // ignora
        }
        return proximo;
      });
      return;
    }
    setLayoutsSalvos((prev) => {
      const atualModelo = prev[modeloAtivo] || {};
      const baseEl = layoutPadrao[elId] || {};
      const novoEl = { ...baseEl, ...(atualModelo[elId] || {}), ...patch };
      const proximo = {
        ...prev,
        [modeloAtivo]: {
          ...atualModelo,
          [elId]: novoEl,
        },
      };
      try {
        localStorage.setItem(STORAGE_CERT_LAYOUTS_KEY, JSON.stringify(proximo));
      } catch {
        // ignora
      }
      return proximo;
    });
  };

  const handleAdicionarImagemExtra = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await lerImagemComCompressao(file);
      const nomeLimpo = file.name.replace(/\.[^.]+$/, '').slice(0, 20) || 'Imagem';
      const novoEl = {
        id: `img-extra-${Date.now()}`,
        label: `Img: ${nomeLimpo}`,
        src: dataUrl,
        x: 40,
        y: 62,
        w: 18,
        h: 12,
        isImage: true,
        isExtraImage: true,
        hidden: false,
      };
      setElementosImgSalvos((prev) => {
        const listaAtual = prev[modeloAtivo] || [];
        const proximo = { ...prev, [modeloAtivo]: [...listaAtual, novoEl] };
        try {
          localStorage.setItem(STORAGE_CERT_ELEMENTOS_IMG_KEY, JSON.stringify(proximo));
        } catch {
          window.alert('A imagem excede o limite do armazenamento local. Tente um arquivo PNG/JPG mais leve.');
          return prev;
        }
        return proximo;
      });
      setModoLayout(true);
      setAbaMobile('preview');
      setElementoSelecionadoId(novoEl.id);
    } catch {
      window.alert('Não foi possível carregar a imagem selecionada.');
    } finally {
      e.target.value = '';
    }
  };

  const handleRemoverImagemExtra = (elId) => {
    setElementosImgSalvos((prev) => {
      const listaAtual = prev[modeloAtivo] || [];
      const proximo = { ...prev, [modeloAtivo]: listaAtual.filter((item) => item.id !== elId) };
      try {
        localStorage.setItem(STORAGE_CERT_ELEMENTOS_IMG_KEY, JSON.stringify(proximo));
      } catch {
        // ignora
      }
      return proximo;
    });
    if (elementoSelecionadoId === elId) {
      setElementoSelecionadoId('nome');
    }
  };

  const restaurarLayoutAtivo = () => {
    setLayoutsSalvos((prev) => {
      const proximo = { ...prev };
      delete proximo[modeloAtivo];
      try {
        localStorage.setItem(STORAGE_CERT_LAYOUTS_KEY, JSON.stringify(proximo));
      } catch {
        // ignora
      }
      return proximo;
    });
  };

  const iniciarArrasteElemento = (e, elId) => {
    if (!modoLayout) return;
    e.stopPropagation();
    e.preventDefault();
    setElementoSelecionadoId(elId);
    const sheet = previewSheetRef.current;
    const el = layoutAtivo[elId];
    if (!sheet || !el) return;
    const rect = sheet.getBoundingClientRect();
    dragStateRef.current = {
      elId,
      startX: e.clientX,
      startY: e.clientY,
      origX: Number(el.x) || 0,
      origY: Number(el.y) || 0,
      rectW: rect.width || 1,
      rectH: rect.height || 1,
    };
    setArrastando(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignora
    }
  };

  const moverArrasteElemento = (e) => {
    const st = dragStateRef.current;
    if (!st) return;
    const dxPct = ((e.clientX - st.startX) / st.rectW) * 100;
    const dyPct = ((e.clientY - st.startY) / st.rectH) * 100;
    const nx = Number(Math.max(0, Math.min(95, st.origX + dxPct)).toFixed(1));
    const ny = Number(Math.max(0, Math.min(95, st.origY + dyPct)).toFixed(1));
    atualizarElementoLayout(st.elId, { x: nx, y: ny });
  };

  const finalizarArrasteElemento = () => {
    if (!dragStateRef.current) return;
    dragStateRef.current = null;
    setArrastando(false);
  };

  const getPropsArraste = (elId) => {
    if (!modoLayout) return {};
    const selecionado = elementoSelecionadoId === elId;
    return {
      onPointerDown: (e) => iniciarArrasteElemento(e, elId),
      onPointerMove: moverArrasteElemento,
      onPointerUp: finalizarArrasteElemento,
      onPointerCancel: finalizarArrasteElemento,
      style: {
        cursor: 'move',
        touchAction: 'none',
        outline: selecionado ? '2px solid #2563eb' : '1px dashed rgba(37,99,235,0.55)',
        outlineOffset: '2px',
        backgroundColor: selecionado ? 'rgba(37,99,235,0.08)' : 'transparent',
        borderRadius: '4px',
        zIndex: selecionado ? 30 : 20,
      },
      title: `Arraste para mover: ${layoutAtivo[elId]?.label || elId}`,
    };
  };

  const renderTextoFormatadoJsx = (texto, el) => {
    const fonte = getFonteInfo(el?.font);
    if (el?.versalete) {
      return renderVersaleteJsx(texto, fonte.className);
    }
    return texto;
  };

  const renderImagensExtrasPreview = () =>
    elementosImgAtivos
      .filter((imgEl) => !imgEl.hidden)
      .map((imgEl) => {
        const drag = getPropsArraste(imgEl.id);
        return (
          <img
            key={imgEl.id}
            {...drag}
            src={imgEl.src}
            alt={imgEl.label}
            draggable={false}
            className="absolute object-contain"
            style={{
              left: `${imgEl.x}%`,
              top: `${imgEl.y}%`,
              width: `${imgEl.w}%`,
              height: `${imgEl.h}%`,
              zIndex: 15,
              ...(drag.style || {}),
            }}
          />
        );
      });

  const formatarTextoPrint = (texto, el, escFn) => {
    if (el?.versalete) return formatarVersaleteHtml(texto, escFn);
    return escFn(texto);
  };

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
    const fontFacesLocaisCss = gerarFontFacesPrintCss(origin);
    const imagensExtrasPrintHtml = elementosImgAtivos
      .filter((imgEl) => !imgEl.hidden)
      .map(
        (imgEl) =>
          `<img src="${imgEl.src}" style="position:absolute;left:${imgEl.x}%;top:${imgEl.y}%;width:${imgEl.w}%;height:${imgEl.h}%;object-fit:contain;z-index:15;" alt="${esc(imgEl.label)}" />`
      )
      .join('');
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
      const lay = layoutAtivo;
      tituloArquivo = `Certificado EDB - ${f.nomeAluno || 'Aluno'}`;
      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(tituloArquivo)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=David+Libre:wght@400;500;700&family=Great+Vibes&family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700;800&display=swap');
    ${fontFacesLocaisCss}
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
      ${fundoEdbCustom ? `
      ${!lay.subtitulo.hidden ? `<div style="${estiloTextoPrint(lay.subtitulo)}white-space:nowrap;">${formatarTextoPrint('DE CONCLUSÃO', lay.subtitulo, esc)}</div>` : ''}

      ${!lay.kicker.hidden ? `<div style="${estiloTextoPrint(lay.kicker)}white-space:nowrap;">${formatarTextoPrint('CERTIFICAMOS ORGULHOSAMENTE QUE', lay.kicker, esc)}</div>` : ''}
      ${!lay.nome.hidden ? `<div style="${estiloTextoPrint(lay.nome)}white-space:nowrap;">${formatarTextoPrint(formatarNomeExibicao(f.nomeAluno, 'Nome do(a) Formando(a)'), lay.nome, esc)}</div>` : ''}

      ${!lay.descricao.hidden ? `<div style="${estiloTextoPrint(lay.descricao)}line-height:1.55;">
        Concluiu com sucesso o curso teológico <strong>"${esc(f.curso)}"</strong>, ${esc(f.complementoCurso)}, de ${esc(f.periodoInicio)} a ${esc(f.periodoFim)}, cumprindo uma carga horária de ${esc(f.cargaHoraria)} horas/aulas.
      </div>` : ''}

      ${incluirAssinatura && !lay.assinaturaImg.hidden ? `<img src="${esc(assinaturaUrl)}" style="position:absolute;left:${lay.assinaturaImg.x}%;top:${lay.assinaturaImg.y}%;width:${lay.assinaturaImg.w}%;height:${lay.assinaturaImg.h}%;object-fit:contain;" alt="Assinatura" />` : ''}
      ${!lay.diretor.hidden ? `<div style="${estiloTextoPrint(lay.diretor)}">
        <div>${esc(f.diretorNome)}</div>
        <div style="font-size:${(lay.diretor.fontSize * 0.76).toFixed(1)}pt;font-weight:700;letter-spacing:0.08em;color:#6b3b94;text-transform:uppercase;margin-top:0.6mm;">${esc(f.diretorCargo)}</div>
      </div>` : ''}

      ${!lay.coordenador.hidden ? `<div style="${estiloTextoPrint(lay.coordenador)}">
        <div>${esc(f.coordenadorNome)}</div>
        <div style="font-size:${(lay.coordenador.fontSize * 0.76).toFixed(1)}pt;font-weight:700;letter-spacing:0.08em;color:#6b3b94;text-transform:uppercase;margin-top:0.6mm;">${esc(f.coordenadorCargo)}</div>
      </div>` : ''}

      ${!lay.seloAprovado.hidden ? `<div style="${estiloTextoPrint(lay.seloAprovado)}white-space:nowrap;">${formatarTextoPrint('APROVADO', lay.seloAprovado, esc)}</div>` : ''}
      ${!lay.seloAno.hidden ? `<div style="${estiloTextoPrint(lay.seloAno)}line-height:0.95;">${esc(f.anoSelo)}</div>` : ''}

      ${!lay.logo.hidden ? `<img src="${esc(logoBetesda)}" style="position:absolute;left:${lay.logo.x}%;top:${lay.logo.y}%;height:${lay.logo.h}%;max-width:${lay.logo.w}%;object-fit:contain;" alt="Betesda" />` : ''}

      ${!lay.data.hidden ? `<div style="${estiloTextoPrint(lay.data)}">${esc(f.cidade)}, ${esc(dataParaExtenso(f.dataEmissao))}.</div>` : ''}
      ` : `
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
      `}
      ${imagensExtrasPrintHtml}
    </div>
  </div>
</body>
</html>`;
    } else if (modeloAtivo === 'batismo') {
      const f = batismoForm;
      const lay = layoutAtivo;
      tituloArquivo = `Certificado de Batismo - ${f.nomeBatizando || 'Membro'}`;
      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(tituloArquivo)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=David+Libre:wght@400;500;700&family=Great+Vibes&family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700;800&display=swap');
    ${fontFacesLocaisCss}
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { margin: 0; padding: 0; background: #ffffff; }
    .sheet { width: 297mm; height: 210mm; background: #ffffff; position: relative; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; overflow: hidden; }
    .top-art { position: absolute; top: 0; left: 0; width: 100%; height: 82mm; object-fit: cover; object-position: top center; display: block; z-index: 0; }
    .bg-art { position: absolute; inset: 0; width: 297mm; height: 210mm; object-fit: cover; z-index: 0; }
  </style>
</head>
<body>
  <div class="sheet">
    ${fundoBatismoCustom
      ? `<img src="${fundoBatismoCustom}" class="bg-art" alt="Fundo Batismo" />`
      : `<img src="${esc(topoBatismoUrl)}" class="top-art" alt="Certificado de Batismo" />`}
    ${!lay.kicker.hidden ? `<div style="${estiloTextoPrint(lay.kicker)}z-index:2;">${formatarTextoPrint('Certificamos que', lay.kicker, esc)}</div>` : ''}
    ${!lay.nome.hidden ? `<div style="${estiloTextoPrint(lay.nome)}z-index:2;border-bottom:${fundoBatismoCustom ? 'none' : '2pt solid #0284c7'};padding-bottom:2mm;">${formatarTextoPrint(formatarNomeExibicao(f.nomeBatizando, 'NOME DO BATIZANDO'), lay.nome, esc)}</div>` : ''}
    ${!lay.descricao.hidden ? `<div style="${estiloTextoPrint(lay.descricao)}z-index:2;line-height:1.55;">${esc(textoBatismoFinal)}</div>` : ''}
    ${!lay.logo.hidden ? `<img src="${esc(logoBetesda)}" style="position:absolute;left:${lay.logo.x}%;top:${lay.logo.y}%;height:${lay.logo.h}%;max-width:${lay.logo.w}%;object-fit:contain;z-index:2;" alt="Betesda" />` : ''}
    ${incluirAssinatura && !lay.assinaturaImg.hidden ? `<img src="${esc(assinaturaUrl)}" style="position:absolute;left:${lay.assinaturaImg.x}%;top:${lay.assinaturaImg.y}%;width:${lay.assinaturaImg.w}%;height:${lay.assinaturaImg.h}%;object-fit:contain;z-index:2;" alt="Assinatura" />` : ''}
    ${!lay.pastor.hidden ? `<div style="${estiloTextoPrint(lay.pastor)}z-index:2;border-top:1.3pt solid ${lay.pastor.color || '#0f172a'};padding-top:1.5mm;">
      <div>${formatarTextoPrint(f.pastorNome, lay.pastor, esc)}</div>
      <div style="font-size:${(lay.pastor.fontSize * 0.85).toFixed(1)}pt;font-weight:500;opacity:0.85;">${esc(f.pastorCargo)}</div>
    </div>` : ''}
    ${lay.data && !lay.data.hidden ? `<div style="${estiloTextoPrint(lay.data)}z-index:2;">${formatarTextoPrint(`${f.cidade}, ${dataParaExtenso(f.dataBatismo)}.`, lay.data, esc)}</div>` : ''}
    ${imagensExtrasPrintHtml}
  </div>
</body>
</html>`;
    } else if (modeloAtivo === 'apresentacao') {
      const f = apresentacaoForm;
      const lay = layoutAtivo;
      tituloArquivo = `Certificado de Apresentacao - ${f.nomeCrianca || 'Crianca'}`;
      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(tituloArquivo)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=David+Libre:wght@400;500;700&family=Great+Vibes&family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700;800&display=swap');
    ${fontFacesLocaisCss}
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { margin: 0; padding: 0; background: #ffffff; }
    .sheet { width: 297mm; height: 210mm; position: relative; overflow: hidden; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; }
    .bg-art { position: absolute; inset: 0; width: 297mm; height: 210mm; object-fit: cover; z-index: 0; }
  </style>
</head>
<body>
  <div class="sheet">
    <img src="${esc(fundoApresentacaoUrl)}" class="bg-art" alt="Certificado de Apresentação" />
    ${!lay.nome.hidden ? `<div style="${estiloTextoPrint(lay.nome)}z-index:2;">${formatarTextoPrint(formatarNomeExibicao(f.nomeCrianca, 'NOME DA CRIANÇA'), lay.nome, esc)}</div>` : ''}
    ${!lay.descricao.hidden ? `<div style="${estiloTextoPrint(lay.descricao)}z-index:2;line-height:1.55;">${esc(textoApresentacaoFinal)}</div>` : ''}
    ${lay.data && !lay.data.hidden ? `<div style="${estiloTextoPrint(lay.data)}z-index:2;">${formatarTextoPrint(`${f.cidade}, ${dataParaExtenso(f.dataApresentacao)}.`, lay.data, esc)}</div>` : ''}
    ${incluirAssinatura && !lay.assinaturaImg.hidden ? `<img src="${esc(assinaturaUrl)}" style="position:absolute;left:${lay.assinaturaImg.x}%;top:${lay.assinaturaImg.y}%;width:${lay.assinaturaImg.w}%;height:${lay.assinaturaImg.h}%;object-fit:contain;z-index:2;" alt="Assinatura" />` : ''}
    ${!lay.pastor.hidden ? `<div style="${estiloTextoPrint(lay.pastor)}z-index:2;border-top:1.3pt solid ${lay.pastor.color || '#5c4338'};padding-top:1.2mm;">
      <div>${formatarTextoPrint(f.pastorNome, lay.pastor, esc)}</div>
      <div style="font-size:${(lay.pastor.fontSize * 0.85).toFixed(1)}pt;font-weight:500;opacity:0.85;">${esc(f.pastorCargo)}</div>
    </div>` : ''}
    ${imagensExtrasPrintHtml}
  </div>
</body>
</html>`;
    } else if (modeloCustomAtivo) {
      const mc = modeloCustomAtivo;
      const f = customForm;
      const lay = layoutAtivo;
      tituloArquivo = `${mc.titulo} - ${f.nomeParticipante || 'Certificado'}`;
      htmlDoc = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>${esc(tituloArquivo)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=David+Libre:wght@400;500;700&family=Great+Vibes&family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700;800&display=swap');
    ${fontFacesLocaisCss}
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { margin: 0; padding: 0; background: #ffffff; }
    .sheet { width: 297mm; height: 210mm; position: relative; overflow: hidden; background: #ffffff; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; }
    .bg-art { position: absolute; inset: 0; width: 297mm; height: 210mm; object-fit: cover; z-index: 0; }
    .fallback-border { position: absolute; inset: 9mm; border: 2pt solid #1e3a8a; outline: 0.8pt solid #d4a23a; outline-offset: -3mm; z-index: 0; }
    .logo-left { position: absolute; left: 22mm; bottom: 18mm; height: 16mm; max-width: 72mm; object-fit: contain; z-index: 1; }
  </style>
</head>
<body>
  <div class="sheet">
    ${mc.fundoImg ? `<img src="${mc.fundoImg}" class="bg-art" alt="${esc(mc.titulo)}" />` : `<div class="fallback-border"></div>`}
    ${!mc.fundoImg ? `<img src="${esc(logoBetesda)}" class="logo-left" alt="Betesda" />` : ''}
    ${!lay.nome.hidden ? `<div style="${estiloTextoPrint(lay.nome)}z-index:2;">${formatarTextoPrint(formatarNomeExibicao(f.nomeParticipante, 'NOME DO PARTICIPANTE'), lay.nome, esc)}</div>` : ''}
    ${!lay.descricao.hidden ? `<div style="${estiloTextoPrint(lay.descricao)}z-index:2;line-height:1.55;">${esc(textoCustomResolvido)}</div>` : ''}
    ${lay.data && !lay.data.hidden ? `<div style="${estiloTextoPrint(lay.data)}z-index:2;">${formatarTextoPrint(`${f.cidade}, ${dataParaExtenso(f.dataEmissao)}.`, lay.data, esc)}</div>` : ''}
    ${incluirAssinatura && !lay.assinaturaImg.hidden ? `<img src="${esc(assinaturaUrl)}" style="position:absolute;left:${lay.assinaturaImg.x}%;top:${lay.assinaturaImg.y}%;width:${lay.assinaturaImg.w}%;height:${lay.assinaturaImg.h}%;object-fit:contain;z-index:2;" alt="Assinatura" />` : ''}
    ${!lay.pastor.hidden ? `<div style="${estiloTextoPrint(lay.pastor)}z-index:2;border-top:1.3pt solid ${lay.pastor.color || '#1e293b'};padding-top:1.2mm;">
      <div>${formatarTextoPrint(f.pastorNome, lay.pastor, esc)}</div>
      <div style="font-size:${(lay.pastor.fontSize * 0.85).toFixed(1)}pt;font-weight:500;opacity:0.85;">${esc(f.pastorCargo)}</div>
    </div>` : ''}
    ${imagensExtrasPrintHtml}
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
            <button
              type="button"
              onClick={() => {
                const novoEstado = !modoLayout;
                setModoLayout(novoEstado);
                if (novoEstado) {
                  setAbaMobile('preview');
                  const primeiroId = Object.keys(layoutAtivo)[0] || 'nome';
                  if (!layoutAtivo[elementoSelecionadoId]) setElementoSelecionadoId(primeiroId);
                }
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-extrabold cursor-pointer transition ${
                modoLayout
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'border-slate-200 dark:border-[#2b3954] bg-slate-50 dark:bg-[#131d31] hover:bg-slate-100 dark:hover:bg-[#1c2b4a] text-slate-700 dark:text-slate-200'
              }`}
            >
              <SlidersHorizontal size={14} className={modoLayout ? 'text-white' : 'text-blue-600 dark:text-blue-400'} />
              <span>{modoLayout ? 'Concluir Layout' : 'Ajustar Layout'}</span>
            </button>
            <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/35 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold cursor-pointer transition">
              <Plus size={14} />
              <span>Inserir Imagem</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleAdicionarImagemExtra}
                className="hidden"
              />
            </label>
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
                checked={abreviarNomesLongos}
                onChange={(e) => setAbreviarNomesLongos(e.target.checked)}
                className="rounded"
              />
              <span>Abreviar Nomes Longos</span>
            </label>
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
                  ref={previewSheetRef}
                  className="relative w-full aspect-[297/210] rounded-xl shadow-xl overflow-hidden select-none"
                  style={{ backgroundColor: '#ffffff', color: '#334155', containerType: 'inline-size' }}
                >
                  {modoLayout && arrastando && (
                    <>
                      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-blue-500/50 pointer-events-none z-40" />
                      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/50 pointer-events-none z-40" />
                    </>
                  )}
                  {fundosOverride['edb-ouro'] ? (
                    <img
                      src={fundosOverride['edb-ouro']}
                      alt="Fundo EDB personalizado"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <>
                      <svg viewBox="0 0 297 210" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
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

                  {fundosOverride['edb-ouro'] ? (
                    <>
                      {/* Blocos editáveis e arrastáveis sobre a arte de fundo personalizada */}
                      {!layoutAtivo.subtitulo.hidden && (() => {
                        const drag = getPropsArraste('subtitulo');
                        const fonte = getFonteInfo(layoutAtivo.subtitulo.font);
                        return (
                          <div
                            {...drag}
                            className={`${fonte.className} absolute whitespace-nowrap`}
                            style={{ ...estiloTextoPreview(layoutAtivo.subtitulo), ...(drag.style || {}) }}
                          >
                            {renderTextoFormatadoJsx('DE CONCLUSÃO', layoutAtivo.subtitulo)}
                          </div>
                        );
                      })()}

                      {!layoutAtivo.kicker.hidden && (() => {
                        const drag = getPropsArraste('kicker');
                        const fonte = getFonteInfo(layoutAtivo.kicker.font);
                        return (
                          <div
                            {...drag}
                            className={`${fonte.className} absolute whitespace-nowrap`}
                            style={{ ...estiloTextoPreview(layoutAtivo.kicker), ...(drag.style || {}) }}
                          >
                            {renderTextoFormatadoJsx('CERTIFICAMOS ORGULHOSAMENTE QUE', layoutAtivo.kicker)}
                          </div>
                        );
                      })()}

                      {!layoutAtivo.nome.hidden && (() => {
                        const drag = getPropsArraste('nome');
                        const fonte = getFonteInfo(layoutAtivo.nome.font);
                        return (
                          <div
                            {...drag}
                            className={`${fonte.className} absolute whitespace-nowrap`}
                            style={{ ...estiloTextoPreview(layoutAtivo.nome), ...(drag.style || {}) }}
                          >
                            {renderTextoFormatadoJsx(formatarNomeExibicao(edbForm.nomeAluno, 'Nome do(a) Formando(a)'), layoutAtivo.nome)}
                          </div>
                        );
                      })()}

                      {!layoutAtivo.descricao.hidden && (() => {
                        const drag = getPropsArraste('descricao');
                        const fonte = getFonteInfo(layoutAtivo.descricao.font);
                        return (
                          <div
                            {...drag}
                            className={`${fonte.className} absolute leading-snug`}
                            style={{ ...estiloTextoPreview(layoutAtivo.descricao), ...(drag.style || {}) }}
                          >
                            Concluiu com sucesso o curso teológico <strong>"{edbForm.curso}"</strong>, {edbForm.complementoCurso}, de {edbForm.periodoInicio} a {edbForm.periodoFim}, cumprindo uma carga horária de {edbForm.cargaHoraria} horas/aulas.
                          </div>
                        );
                      })()}

                      {!layoutAtivo.seloAprovado.hidden && (() => {
                        const drag = getPropsArraste('seloAprovado');
                        const fonte = getFonteInfo(layoutAtivo.seloAprovado.font);
                        return (
                          <div
                            {...drag}
                            className={`${fonte.className} absolute whitespace-nowrap`}
                            style={{ ...estiloTextoPreview(layoutAtivo.seloAprovado), ...(drag.style || {}) }}
                          >
                            {renderTextoFormatadoJsx('APROVADO', layoutAtivo.seloAprovado)}
                          </div>
                        );
                      })()}

                      {!layoutAtivo.seloAno.hidden && (() => {
                        const drag = getPropsArraste('seloAno');
                        const fonte = getFonteInfo(layoutAtivo.seloAno.font);
                        return (
                          <div
                            {...drag}
                            className={`${fonte.className} absolute`}
                            style={{ ...estiloTextoPreview(layoutAtivo.seloAno), lineHeight: 0.95, ...(drag.style || {}) }}
                          >
                            {edbForm.anoSelo}
                          </div>
                        );
                      })()}

                      {incluirAssinatura && !layoutAtivo.assinaturaImg.hidden && (() => {
                        const drag = getPropsArraste('assinaturaImg');
                        return (
                          <img
                            {...drag}
                            src="/certificados/assinatura-pastor.png"
                            alt="Assinatura"
                            draggable={false}
                            className="absolute object-contain"
                            style={{
                              left: `${layoutAtivo.assinaturaImg.x}%`,
                              top: `${layoutAtivo.assinaturaImg.y}%`,
                              width: `${layoutAtivo.assinaturaImg.w}%`,
                              height: `${layoutAtivo.assinaturaImg.h}%`,
                              ...(drag.style || {}),
                            }}
                          />
                        );
                      })()}

                      {!layoutAtivo.diretor.hidden && (() => {
                        const drag = getPropsArraste('diretor');
                        const fonte = getFonteInfo(layoutAtivo.diretor.font);
                        return (
                          <div
                            {...drag}
                            className={`${fonte.className} absolute`}
                            style={{ ...estiloTextoPreview(layoutAtivo.diretor), ...(drag.style || {}) }}
                          >
                            <div className="truncate">{edbForm.diretorNome}</div>
                            <div
                              className="font-bold uppercase"
                              style={{ color: '#6b3b94', fontSize: `${(layoutAtivo.diretor.fontSize * 0.76 * PT_TO_CQW).toFixed(3)}cqw` }}
                            >
                              {edbForm.diretorCargo}
                            </div>
                          </div>
                        );
                      })()}

                      {!layoutAtivo.coordenador.hidden && (() => {
                        const drag = getPropsArraste('coordenador');
                        const fonte = getFonteInfo(layoutAtivo.coordenador.font);
                        return (
                          <div
                            {...drag}
                            className={`${fonte.className} absolute`}
                            style={{ ...estiloTextoPreview(layoutAtivo.coordenador), ...(drag.style || {}) }}
                          >
                            <div className="truncate">{edbForm.coordenadorNome}</div>
                            <div
                              className="font-bold uppercase"
                              style={{ color: '#6b3b94', fontSize: `${(layoutAtivo.coordenador.fontSize * 0.76 * PT_TO_CQW).toFixed(3)}cqw` }}
                            >
                              {edbForm.coordenadorCargo}
                            </div>
                          </div>
                        );
                      })()}

                      {!layoutAtivo.logo.hidden && (() => {
                        const drag = getPropsArraste('logo');
                        return (
                          <img
                            {...drag}
                            src="/betesda-geral.png"
                            alt="Betesda"
                            draggable={false}
                            className="absolute object-contain"
                            style={{
                              left: `${layoutAtivo.logo.x}%`,
                              top: `${layoutAtivo.logo.y}%`,
                              height: `${layoutAtivo.logo.h}%`,
                              maxWidth: `${layoutAtivo.logo.w}%`,
                              ...(drag.style || {}),
                            }}
                          />
                        );
                      })()}

                      {!layoutAtivo.data.hidden && (() => {
                        const drag = getPropsArraste('data');
                        const fonte = getFonteInfo(layoutAtivo.data.font);
                        return (
                          <div
                            {...drag}
                            className={`${fonte.className} absolute`}
                            style={{ ...estiloTextoPreview(layoutAtivo.data), ...(drag.style || {}) }}
                          >
                            {edbForm.cidade}, {dataParaExtenso(edbForm.dataEmissao)}.
                          </div>
                        );
                      })()}
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                  {renderImagensExtrasPreview()}
                </div>
              )}

              {modeloAtivo === 'batismo' && (
                <div
                  ref={previewSheetRef}
                  className="relative w-full aspect-[297/210] rounded-xl shadow-xl overflow-hidden select-none"
                  style={{ backgroundColor: '#ffffff', color: '#0f172a', containerType: 'inline-size' }}
                >
                  {modoLayout && arrastando && (
                    <>
                      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-blue-500/50 pointer-events-none z-40" />
                      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/50 pointer-events-none z-40" />
                    </>
                  )}
                  {fundosOverride['batismo'] ? (
                    <img
                      src={fundosOverride['batismo']}
                      alt="Fundo Batismo personalizado"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <img src="/certificados/topo-batismo.png" alt="Certificado de Batismo" className="absolute top-0 left-0 w-full h-[39%] object-cover object-top pointer-events-none" />
                  )}

                  {!layoutAtivo.kicker.hidden && (() => {
                    const drag = getPropsArraste('kicker');
                    const fonte = getFonteInfo(layoutAtivo.kicker.font);
                    return (
                      <div {...drag} className={`${fonte.className} absolute`} style={{ ...estiloTextoPreview(layoutAtivo.kicker), ...(drag.style || {}) }}>
                        {renderTextoFormatadoJsx('Certificamos que', layoutAtivo.kicker)}
                      </div>
                    );
                  })()}

                  {!layoutAtivo.nome.hidden && (() => {
                    const drag = getPropsArraste('nome');
                    const fonte = getFonteInfo(layoutAtivo.nome.font);
                    return (
                      <div
                        {...drag}
                        className={`${fonte.className} absolute pb-1`}
                        style={{
                          ...estiloTextoPreview(layoutAtivo.nome),
                          borderBottom: fundosOverride['batismo'] ? 'none' : '2px solid #0284c7',
                          ...(drag.style || {}),
                        }}
                      >
                        {renderTextoFormatadoJsx(formatarNomeExibicao(batismoForm.nomeBatizando, 'NOME DO BATIZANDO'), layoutAtivo.nome)}
                      </div>
                    );
                  })()}

                  {!layoutAtivo.descricao.hidden && (() => {
                    const drag = getPropsArraste('descricao');
                    const fonte = getFonteInfo(layoutAtivo.descricao.font);
                    return (
                      <div {...drag} className={`${fonte.className} absolute leading-relaxed`} style={{ ...estiloTextoPreview(layoutAtivo.descricao), ...(drag.style || {}) }}>
                        {textoBatismoFinal}
                      </div>
                    );
                  })()}

                  {!layoutAtivo.logo.hidden && (() => {
                    const drag = getPropsArraste('logo');
                    return (
                      <img
                        {...drag}
                        src="/betesda-geral.png"
                        alt="Betesda"
                        draggable={false}
                        className="absolute object-contain"
                        style={{ left: `${layoutAtivo.logo.x}%`, top: `${layoutAtivo.logo.y}%`, height: `${layoutAtivo.logo.h}%`, maxWidth: `${layoutAtivo.logo.w}%`, ...(drag.style || {}) }}
                      />
                    );
                  })()}

                  {incluirAssinatura && !layoutAtivo.assinaturaImg.hidden && (() => {
                    const drag = getPropsArraste('assinaturaImg');
                    return (
                      <img
                        {...drag}
                        src="/certificados/assinatura-pastor.png"
                        alt="Assinatura"
                        draggable={false}
                        className="absolute object-contain"
                        style={{ left: `${layoutAtivo.assinaturaImg.x}%`, top: `${layoutAtivo.assinaturaImg.y}%`, width: `${layoutAtivo.assinaturaImg.w}%`, height: `${layoutAtivo.assinaturaImg.h}%`, ...(drag.style || {}) }}
                      />
                    );
                  })()}

                  {!layoutAtivo.pastor.hidden && (() => {
                    const drag = getPropsArraste('pastor');
                    const fonte = getFonteInfo(layoutAtivo.pastor.font);
                    return (
                      <div
                        {...drag}
                        className={`${fonte.className} absolute pt-0.5`}
                        style={{ ...estiloTextoPreview(layoutAtivo.pastor), borderTop: `1px solid ${layoutAtivo.pastor.color || '#0f172a'}`, ...(drag.style || {}) }}
                      >
                        <div>{renderTextoFormatadoJsx(batismoForm.pastorNome, layoutAtivo.pastor)}</div>
                        <div style={{ fontSize: `${(layoutAtivo.pastor.fontSize * 0.85 * PT_TO_CQW).toFixed(3)}cqw`, fontWeight: 500, opacity: 0.85 }}>
                          {batismoForm.pastorCargo}
                        </div>
                      </div>
                    );
                  })()}

                  {layoutAtivo.data && !layoutAtivo.data.hidden && (() => {
                    const drag = getPropsArraste('data');
                    const fonte = getFonteInfo(layoutAtivo.data.font);
                    return (
                      <div {...drag} className={`${fonte.className} absolute`} style={{ ...estiloTextoPreview(layoutAtivo.data), ...(drag.style || {}) }}>
                        {renderTextoFormatadoJsx(`${batismoForm.cidade}, ${dataParaExtenso(batismoForm.dataBatismo)}.`, layoutAtivo.data)}
                      </div>
                    );
                  })()}
                  {renderImagensExtrasPreview()}
                </div>
              )}

              {modeloAtivo === 'apresentacao' && (
                <div
                  ref={previewSheetRef}
                  className="relative w-full aspect-[297/210] rounded-xl shadow-xl overflow-hidden select-none"
                  style={{ containerType: 'inline-size' }}
                >
                  {modoLayout && arrastando && (
                    <>
                      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-blue-500/50 pointer-events-none z-40" />
                      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/50 pointer-events-none z-40" />
                    </>
                  )}
                  <img
                    src={fundosOverride['apresentacao'] || '/certificados/fundo-apresentacao.png'}
                    alt="Certificado de Apresentação"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />

                  {!layoutAtivo.nome.hidden && (() => {
                    const drag = getPropsArraste('nome');
                    const fonte = getFonteInfo(layoutAtivo.nome.font);
                    return (
                      <div {...drag} className={`${fonte.className} absolute`} style={{ ...estiloTextoPreview(layoutAtivo.nome), ...(drag.style || {}) }}>
                        {renderTextoFormatadoJsx(formatarNomeExibicao(apresentacaoForm.nomeCrianca, 'NOME DA CRIANÇA'), layoutAtivo.nome)}
                      </div>
                    );
                  })()}

                  {!layoutAtivo.descricao.hidden && (() => {
                    const drag = getPropsArraste('descricao');
                    const fonte = getFonteInfo(layoutAtivo.descricao.font);
                    return (
                      <div {...drag} className={`${fonte.className} absolute leading-snug`} style={{ ...estiloTextoPreview(layoutAtivo.descricao), ...(drag.style || {}) }}>
                        {textoApresentacaoFinal}
                      </div>
                    );
                  })()}

                  {layoutAtivo.data && !layoutAtivo.data.hidden && (() => {
                    const drag = getPropsArraste('data');
                    const fonte = getFonteInfo(layoutAtivo.data.font);
                    return (
                      <div {...drag} className={`${fonte.className} absolute`} style={{ ...estiloTextoPreview(layoutAtivo.data), ...(drag.style || {}) }}>
                        {renderTextoFormatadoJsx(`${apresentacaoForm.cidade}, ${dataParaExtenso(apresentacaoForm.dataApresentacao)}.`, layoutAtivo.data)}
                      </div>
                    );
                  })()}

                  {incluirAssinatura && !layoutAtivo.assinaturaImg.hidden && (() => {
                    const drag = getPropsArraste('assinaturaImg');
                    return (
                      <img
                        {...drag}
                        src="/certificados/assinatura-pastor.png"
                        alt="Assinatura"
                        draggable={false}
                        className="absolute object-contain"
                        style={{ left: `${layoutAtivo.assinaturaImg.x}%`, top: `${layoutAtivo.assinaturaImg.y}%`, width: `${layoutAtivo.assinaturaImg.w}%`, height: `${layoutAtivo.assinaturaImg.h}%`, ...(drag.style || {}) }}
                      />
                    );
                  })()}

                  {!layoutAtivo.pastor.hidden && (() => {
                    const drag = getPropsArraste('pastor');
                    const fonte = getFonteInfo(layoutAtivo.pastor.font);
                    return (
                      <div
                        {...drag}
                        className={`${fonte.className} absolute pt-0.5`}
                        style={{ ...estiloTextoPreview(layoutAtivo.pastor), borderTop: `1px solid ${layoutAtivo.pastor.color || '#5c4338'}`, ...(drag.style || {}) }}
                      >
                        <div>{renderTextoFormatadoJsx(apresentacaoForm.pastorNome, layoutAtivo.pastor)}</div>
                        <div style={{ fontSize: `${(layoutAtivo.pastor.fontSize * 0.85 * PT_TO_CQW).toFixed(3)}cqw`, fontWeight: 500, opacity: 0.85 }}>
                          {apresentacaoForm.pastorCargo}
                        </div>
                      </div>
                    );
                  })()}
                  {renderImagensExtrasPreview()}
                </div>
              )}

              {modeloCustomAtivo && (
                <div
                  ref={previewSheetRef}
                  className="relative w-full aspect-[297/210] rounded-xl shadow-xl overflow-hidden select-none"
                  style={{ backgroundColor: '#ffffff', containerType: 'inline-size' }}
                >
                  {modoLayout && arrastando && (
                    <>
                      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-blue-500/50 pointer-events-none z-40" />
                      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/50 pointer-events-none z-40" />
                    </>
                  )}
                  {modeloCustomAtivo.fundoImg ? (
                    <img src={modeloCustomAtivo.fundoImg} alt={modeloCustomAtivo.titulo} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                  ) : (
                    <>
                      <div className="absolute inset-[3%] pointer-events-none" style={{ border: '2px solid #1e3a8a', outline: '1px solid #d4a23a', outlineOffset: '-4px' }} />
                      <img src="/betesda-geral.png" alt="Betesda" className="absolute left-[8%] bottom-[9%] h-7 sm:h-9 w-auto object-contain pointer-events-none" />
                    </>
                  )}

                  {!layoutAtivo.nome.hidden && (() => {
                    const drag = getPropsArraste('nome');
                    const fonte = getFonteInfo(layoutAtivo.nome.font);
                    return (
                      <div {...drag} className={`${fonte.className} absolute`} style={{ ...estiloTextoPreview(layoutAtivo.nome), ...(drag.style || {}) }}>
                        {renderTextoFormatadoJsx(formatarNomeExibicao(customForm.nomeParticipante, 'NOME DO PARTICIPANTE'), layoutAtivo.nome)}
                      </div>
                    );
                  })()}

                  {!layoutAtivo.descricao.hidden && (() => {
                    const drag = getPropsArraste('descricao');
                    const fonte = getFonteInfo(layoutAtivo.descricao.font);
                    return (
                      <div {...drag} className={`${fonte.className} absolute leading-relaxed`} style={{ ...estiloTextoPreview(layoutAtivo.descricao), ...(drag.style || {}) }}>
                        {textoCustomResolvido}
                      </div>
                    );
                  })()}

                  {layoutAtivo.data && !layoutAtivo.data.hidden && (() => {
                    const drag = getPropsArraste('data');
                    const fonte = getFonteInfo(layoutAtivo.data.font);
                    return (
                      <div {...drag} className={`${fonte.className} absolute`} style={{ ...estiloTextoPreview(layoutAtivo.data), ...(drag.style || {}) }}>
                        {renderTextoFormatadoJsx(`${customForm.cidade}, ${dataParaExtenso(customForm.dataEmissao)}.`, layoutAtivo.data)}
                      </div>
                    );
                  })()}

                  {incluirAssinatura && !layoutAtivo.assinaturaImg.hidden && (() => {
                    const drag = getPropsArraste('assinaturaImg');
                    return (
                      <img
                        {...drag}
                        src="/certificados/assinatura-pastor.png"
                        alt="Assinatura"
                        draggable={false}
                        className="absolute object-contain"
                        style={{ left: `${layoutAtivo.assinaturaImg.x}%`, top: `${layoutAtivo.assinaturaImg.y}%`, width: `${layoutAtivo.assinaturaImg.w}%`, height: `${layoutAtivo.assinaturaImg.h}%`, ...(drag.style || {}) }}
                      />
                    );
                  })()}

                  {!layoutAtivo.pastor.hidden && (() => {
                    const drag = getPropsArraste('pastor');
                    const fonte = getFonteInfo(layoutAtivo.pastor.font);
                    return (
                      <div
                        {...drag}
                        className={`${fonte.className} absolute pt-0.5`}
                        style={{ ...estiloTextoPreview(layoutAtivo.pastor), borderTop: `1px solid ${layoutAtivo.pastor.color || '#1e293b'}`, ...(drag.style || {}) }}
                      >
                        <div>{renderTextoFormatadoJsx(customForm.pastorNome, layoutAtivo.pastor)}</div>
                        <div style={{ fontSize: `${(layoutAtivo.pastor.fontSize * 0.85 * PT_TO_CQW).toFixed(3)}cqw`, fontWeight: 500, opacity: 0.85 }}>
                          {customForm.pastorCargo}
                        </div>
                      </div>
                    );
                  })()}
                  {renderImagensExtrasPreview()}
                </div>
              )}
              {/* PAINEL INTERATIVO DE AJUSTE MANUAL DE LAYOUT */}
              {modoLayout && (
                <PainelAjusteLayoutCertificado
                  layout={layoutAtivo}
                  elementoSelecionadoId={elementoSelecionadoId}
                  onSelecionarElemento={setElementoSelecionadoId}
                  onAtualizarElemento={atualizarElementoLayout}
                  onRestaurarLayout={restaurarLayoutAtivo}
                  possuiPersonalizacao={possuiLayoutPersonalizado}
                  onAdicionarImagemExtra={handleAdicionarImagemExtra}
                  onRemoverImagemExtra={handleRemoverImagemExtra}
                />
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
