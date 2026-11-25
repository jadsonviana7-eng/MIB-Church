// Configuração e persistência do editor manual de layout dos certificados (A4 Paisagem 297x210mm)

export const STORAGE_CERT_LAYOUTS_KEY = 'mib_cert_layouts_v1';

// Fator exato: 1pt em folha A4 Paisagem (297mm = 841.89pt) equivale a 0.11878% da largura (cqw)
export const PT_TO_CQW = 0.11878;

export const FONTES_CERTIFICADO = [
  {
    id: 'bebas-neue',
    label: 'Bebas Neue Rounded (Regular)',
    css: "'Bebas Neue Rounded', 'Bebas Neue', sans-serif",
    className: 'font-bebas-neue',
  },
  {
    id: 'david-libre',
    label: 'David Libre',
    css: "'David Libre', Georgia, serif",
    className: 'font-david-libre',
  },
  {
    id: 'abraham',
    label: 'Abraham',
    css: "'Abraham', Georgia, serif",
    className: 'font-cert-abraham',
  },
  {
    id: 'anisha',
    label: 'Anisha Free',
    css: "'Anisha Free', Georgia, serif",
    className: 'font-cert-anisha',
  },
  {
    id: 'antro-vectra',
    label: 'Antro Vectra',
    css: "'Antro Vectra', Georgia, serif",
    className: 'font-cert-antro-vectra',
  },
  {
    id: 'antro-vectra-bolder',
    label: 'Antro Vectra Bolder',
    css: "'Antro Vectra Bolder', Georgia, serif",
    className: 'font-cert-antro-vectra-bolder',
  },
  {
    id: 'ants-valley',
    label: 'Ants Valley',
    css: "'Ants Valley', Georgia, serif",
    className: 'font-cert-ants-valley',
  },
  {
    id: 'aunt-bertha',
    label: 'Aunt Bertha NF',
    css: "'Aunt Bertha NF', Georgia, serif",
    className: 'font-cert-aunt-bertha',
  },
  {
    id: 'aurona',
    label: 'Aurona',
    css: "'Aurona', Georgia, serif",
    className: 'font-cert-aurona',
  },
  {
    id: 'dosis',
    label: 'Dosis (Regular)',
    css: "'Dosis', 'Segoe UI', Arial, sans-serif",
    className: 'font-cert-dosis',
  },
  {
    id: 'kreon',
    label: 'Kreon (Regular)',
    css: "'Kreon', Georgia, serif",
    className: 'font-cert-kreon',
  },
  {
    id: 'playfair',
    label: 'Playfair Display',
    css: "'Playfair Display', Georgia, serif",
    className: 'font-cert-playfair',
  },
  {
    id: 'inter',
    label: 'Inter (Moderna)',
    css: "'Inter', 'Segoe UI', Arial, sans-serif",
    className: 'font-cert-inter',
  },
  {
    id: 'great-vibes',
    label: 'Great Vibes (Caligráfica)',
    css: "'Great Vibes', 'Brush Script MT', Georgia, serif",
    className: 'font-cert-vibes',
  },
];

export function gerarFontFacesPrintCss(origin) {
  return `
    @font-face { font-family: 'Bebas Neue Rounded'; src: url('${origin}/fontes/BebasNeueRounded-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; }
    @font-face { font-family: 'Abraham'; src: url('${origin}/fontes/Abraham.otf') format('opentype'); font-weight: 400; font-style: normal; }
    @font-face { font-family: 'Anisha Free'; src: url('${origin}/fontes/Anisha%20Free.otf') format('opentype'); font-weight: 400; font-style: normal; }
    @font-face { font-family: 'Antro Vectra'; src: url('${origin}/fontes/Antro_Vectra.otf') format('opentype'); font-weight: 400; font-style: normal; }
    @font-face { font-family: 'Antro Vectra Bolder'; src: url('${origin}/fontes/Antro_Vectra_Bolder.otf') format('opentype'); font-weight: 400; font-style: normal; }
    @font-face { font-family: 'Ants Valley'; src: url('${origin}/fontes/Ants%20Valley%20-%20Personal%20Use.otf') format('opentype'); font-weight: 400; font-style: normal; }
    @font-face { font-family: 'Aunt Bertha NF'; src: url('${origin}/fontes/Aunt%20Bertha%20NF.ttf') format('truetype'); font-weight: 400; font-style: normal; }
    @font-face { font-family: 'Aurona'; src: url('${origin}/fontes/Aurona.ttf') format('truetype'); font-weight: 400; font-style: normal; }
    @font-face { font-family: 'Dosis'; src: url('${origin}/fontes/Dosis-Regular.otf') format('opentype'); font-weight: 400; font-style: normal; }
    @font-face { font-family: 'Kreon'; src: url('${origin}/fontes/kreon-regular.ttf') format('truetype'); font-weight: 400; font-style: normal; }
  `;
}

export function getFonteInfo(fontId) {
  return FONTES_CERTIFICADO.find((f) => f.id === fontId) || FONTES_CERTIFICADO.find((f) => f.id === 'inter') || FONTES_CERTIFICADO[0];
}

export function getDefaultLayout(modeloId, modeloCustom = null) {
  if (modeloId === 'edb-ouro') {
    return {
      subtitulo: {
        id: 'subtitulo',
        label: 'De Conclusão',
        x: 21.5,
        y: 22.8,
        w: 22.6,
        fontSize: 13,
        font: 'david-libre',
        color: '#ffffff',
        tracking: 180,
        align: 'center',
        uppercase: true,
        versalete: false,
        bold: true,
        hidden: false,
      },
      kicker: {
        id: 'kicker',
        label: 'Certificamos Que',
        x: 7,
        y: 31.7,
        w: 54.5,
        fontSize: 12.5,
        font: 'david-libre',
        color: '#4a236b',
        tracking: 180,
        align: 'center',
        uppercase: true,
        versalete: false,
        bold: false,
        hidden: false,
      },
      nome: {
        id: 'nome',
        label: 'Nome do Formando',
        x: 6,
        y: 36.2,
        w: 56.5,
        fontSize: 54,
        font: 'bebas-neue',
        color: '#5b2d8e',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: true,
        bold: false,
        hidden: false,
      },
      descricao: {
        id: 'descricao',
        label: 'Descrição do Curso',
        x: 7,
        y: 50.2,
        w: 54.5,
        fontSize: 11,
        font: 'inter',
        color: '#334155',
        tracking: 0,
        align: 'left',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
      seloAprovado: {
        id: 'seloAprovado',
        label: 'Selo: Aprovado',
        x: 74.3,
        y: 36.3,
        w: 16.8,
        fontSize: 11.5,
        font: 'david-libre',
        color: '#ffffff',
        tracking: 150,
        align: 'center',
        uppercase: true,
        versalete: false,
        bold: true,
        hidden: false,
      },
      seloAno: {
        id: 'seloAno',
        label: 'Selo: Ano',
        x: 74.3,
        y: 39.2,
        w: 16.8,
        fontSize: 30,
        font: 'david-libre',
        color: '#ffffff',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: true,
        hidden: false,
      },
      assinaturaImg: {
        id: 'assinaturaImg',
        label: 'Assinatura (Imagem)',
        x: 7.4,
        y: 64,
        w: 18.2,
        h: 9.5,
        isImage: true,
        hidden: false,
      },
      diretor: {
        id: 'diretor',
        label: 'Diretor(a)',
        x: 7.4,
        y: 74,
        w: 18.2,
        fontSize: 10.5,
        font: 'inter',
        color: '#4a236b',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: true,
        hidden: false,
      },
      coordenador: {
        id: 'coordenador',
        label: 'Coordenador(a)',
        x: 43.8,
        y: 74,
        w: 22.8,
        fontSize: 10.5,
        font: 'inter',
        color: '#4a236b',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: true,
        hidden: false,
      },
      logo: {
        id: 'logo',
        label: 'Logo Betesda',
        x: 13.1,
        y: 86.2,
        w: 20,
        h: 6.7,
        isImage: true,
        hidden: false,
      },
      data: {
        id: 'data',
        label: 'Cidade e Data',
        x: 37.7,
        y: 86.5,
        w: 32,
        fontSize: 10.5,
        font: 'inter',
        color: '#4a236b',
        tracking: 0,
        align: 'left',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
    };
  }

  if (modeloId === 'batismo') {
    return {
      kicker: {
        id: 'kicker',
        label: 'Certificamos que',
        x: 10,
        y: 41,
        w: 80,
        fontSize: 16,
        font: 'playfair',
        color: '#334155',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
      nome: {
        id: 'nome',
        label: 'Nome do Batizando',
        x: 10,
        y: 47,
        w: 80,
        fontSize: 28,
        font: 'playfair',
        color: '#0b2d5c',
        tracking: 40,
        align: 'center',
        uppercase: true,
        versalete: false,
        bold: true,
        hidden: false,
      },
      descricao: {
        id: 'descricao',
        label: 'Texto do Batismo',
        x: 12,
        y: 59,
        w: 76,
        fontSize: 13.5,
        font: 'inter',
        color: '#1e293b',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
      logo: {
        id: 'logo',
        label: 'Logo Betesda',
        x: 8,
        y: 82,
        w: 25,
        h: 9,
        isImage: true,
        hidden: false,
      },
      assinaturaImg: {
        id: 'assinaturaImg',
        label: 'Assinatura (Imagem)',
        x: 63,
        y: 72,
        w: 24,
        h: 11,
        isImage: true,
        hidden: false,
      },
      pastor: {
        id: 'pastor',
        label: 'Pastor / Assinante',
        x: 59,
        y: 82.5,
        w: 32,
        fontSize: 11.5,
        font: 'inter',
        color: '#0f172a',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: true,
        hidden: false,
      },
      data: {
        id: 'data',
        label: 'Cidade e Data',
        x: 59,
        y: 91,
        w: 32,
        fontSize: 9.5,
        font: 'inter',
        color: '#475569',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
    };
  }

  if (modeloId === 'apresentacao') {
    return {
      nome: {
        id: 'nome',
        label: 'Nome da Criança',
        x: 20,
        y: 44,
        w: 60,
        fontSize: 24,
        font: 'playfair',
        color: '#6b3428',
        tracking: 30,
        align: 'center',
        uppercase: true,
        versalete: false,
        bold: true,
        hidden: false,
      },
      descricao: {
        id: 'descricao',
        label: 'Texto da Apresentação',
        x: 15,
        y: 56,
        w: 70,
        fontSize: 13,
        font: 'inter',
        color: '#3f2b22',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
      data: {
        id: 'data',
        label: 'Cidade e Data',
        x: 54,
        y: 72.5,
        w: 36,
        fontSize: 10,
        font: 'inter',
        color: '#5c4338',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
      assinaturaImg: {
        id: 'assinaturaImg',
        label: 'Assinatura (Imagem)',
        x: 59,
        y: 75.5,
        w: 26,
        h: 10,
        isImage: true,
        hidden: false,
      },
      pastor: {
        id: 'pastor',
        label: 'Pastor / Assinante',
        x: 54,
        y: 84.5,
        w: 36,
        fontSize: 11,
        font: 'inter',
        color: '#3f2b22',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: true,
        hidden: false,
      },
    };
  }

  // Modelo personalizado (custom-cert-*)
  return {
    nome: {
      id: 'nome',
      label: 'Nome do Participante',
      x: 12,
      y: Number(modeloCustom?.posNomeY) || 44,
      w: 76,
      fontSize: 27,
      font: 'playfair',
      color: modeloCustom?.corNome || '#1e3a8a',
      tracking: 20,
      align: 'center',
      uppercase: true,
      versalete: false,
      bold: true,
      hidden: false,
    },
    descricao: {
      id: 'descricao',
      label: 'Texto do Certificado',
      x: 14,
      y: Number(modeloCustom?.posTextoY) || 57,
      w: 72,
      fontSize: 13,
      font: 'inter',
      color: modeloCustom?.corTexto || '#1e293b',
      tracking: 0,
      align: 'center',
      uppercase: false,
      versalete: false,
      bold: false,
      hidden: false,
    },
    data: {
      id: 'data',
      label: 'Cidade e Data',
      x: 57,
      y: 73.5,
      w: 34,
      fontSize: 10,
      font: 'inter',
      color: modeloCustom?.corTexto || '#334155',
      tracking: 0,
      align: 'center',
      uppercase: false,
      versalete: false,
      bold: false,
      hidden: false,
    },
    assinaturaImg: {
      id: 'assinaturaImg',
      label: 'Assinatura (Imagem)',
      x: 61,
      y: 76,
      w: 26,
      h: 10,
      isImage: true,
      hidden: false,
    },
    pastor: {
      id: 'pastor',
      label: 'Pastor / Assinante',
      x: 57,
      y: 85,
      w: 34,
      fontSize: 11,
      font: 'inter',
      color: modeloCustom?.corTexto || '#1e293b',
      tracking: 0,
      align: 'center',
      uppercase: false,
      versalete: false,
      bold: true,
      hidden: false,
    },
  };
}

export function mesclarLayout(padrao, salvo) {
  if (!salvo || typeof salvo !== 'object') return padrao;
  const out = {};
  for (const key of Object.keys(padrao)) {
    out[key] = salvo[key] ? { ...padrao[key], ...salvo[key] } : { ...padrao[key] };
  }
  return out;
}

export function estiloTextoPreview(el, overrideFontSize = null) {
  const fontSize = overrideFontSize ?? el.fontSize ?? 12;
  const trackingEm = (Number(el.tracking) || 0) / 1000;
  return {
    left: `${el.x}%`,
    top: `${el.y}%`,
    width: `${el.w}%`,
    textAlign: el.align || 'center',
    color: el.color || '#1e293b',
    fontSize: `${(fontSize * PT_TO_CQW).toFixed(3)}cqw`,
    letterSpacing: trackingEm ? `${trackingEm}em` : '0',
    paddingLeft: el.align === 'center' && trackingEm ? `${trackingEm}em` : undefined,
    fontWeight: el.font === 'bebas-neue' || el.font === 'great-vibes' ? 400 : el.bold ? 700 : 500,
    textTransform: el.uppercase && !el.versalete ? 'uppercase' : 'none',
    fontVariant: el.versalete ? 'small-caps' : 'normal',
    lineHeight: el.font === 'bebas-neue' ? 0.98 : 1.35,
  };
}

export function estiloTextoPrint(el, overrideFontSize = null) {
  const fontSize = overrideFontSize ?? el.fontSize ?? 12;
  const fonte = getFonteInfo(el.font);
  const trackingEm = (Number(el.tracking) || 0) / 1000;
  const weight = el.font === 'bebas-neue' || el.font === 'great-vibes' ? 400 : el.bold ? 700 : 500;
  const textTransform = el.uppercase && !el.versalete ? 'uppercase' : 'none';
  const fontVariant = el.versalete ? 'small-caps' : 'normal';
  const lineHeight = el.font === 'bebas-neue' ? 0.98 : 1.35;
  const padLeft = el.align === 'center' && trackingEm ? `padding-left:${trackingEm}em;` : '';
  return `position:absolute;left:${el.x}%;top:${el.y}%;width:${el.w}%;text-align:${el.align || 'center'};color:${el.color || '#1e293b'};font-family:${fonte.css};font-size:${fontSize}pt;letter-spacing:${trackingEm ? `${trackingEm}em` : '0'};${padLeft}font-weight:${weight};text-transform:${textTransform};font-variant:${fontVariant};line-height:${lineHeight};`;
}
