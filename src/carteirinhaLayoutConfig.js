// Configuração, defaults e utilitários do editor visual da Carteirinha de Membro (CR80: 85.6 x 54 mm)
import { getFonteInfo } from './certificadoLayoutConfig';

export const STORAGE_CARTEIRINHA_CONFIG_KEY = 'mib_carteirinha_editor_v1';

// Fator exato CR80: 85.6mm = 242.65pt -> 1pt = 0.4121% da largura (cqw)
export const PT_TO_CQW_CR80 = 0.4121;

export function getDefaultCarteirinhaLayout(lado = 'frente', perfil = 'pastor') {
  if (lado === 'verso') {
    return {
      igrejaHeader: {
        id: 'igrejaHeader',
        label: 'Nome da Igreja',
        x: 4,
        y: 4,
        w: 62,
        fontSize: 6.5,
        font: 'inter',
        color: '#ffffff',
        tracking: 80,
        align: 'left',
        uppercase: true,
        versalete: false,
        bold: true,
        hidden: false,
      },
      regVerso: {
        id: 'regVerso',
        label: 'Registro (Verso)',
        x: 68,
        y: 4.2,
        w: 28,
        fontSize: 6,
        font: 'inter',
        color: '#bae6fd',
        tracking: 40,
        align: 'right',
        uppercase: true,
        versalete: false,
        bold: true,
        hidden: false,
      },
      textoLegal: {
        id: 'textoLegal',
        label: 'Texto Legal / Capelania',
        x: 4,
        y: 22,
        w: 92,
        fontSize: 5.2,
        font: 'inter',
        color: '#1e293b',
        tracking: 0,
        align: 'justify',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
      dadosIgreja: {
        id: 'dadosIgreja',
        label: 'CNPJ / Contato / Endereço',
        x: 4,
        y: 66,
        w: 72,
        fontSize: 4.8,
        font: 'inter',
        color: '#475569',
        tracking: 0,
        align: 'left',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
      assinatura: {
        id: 'assinatura',
        label: 'Pastor Responsável',
        x: 4,
        y: 83,
        w: 44,
        fontSize: 5,
        font: 'inter',
        color: '#0f172a',
        tracking: 0,
        align: 'center',
        uppercase: false,
        versalete: false,
        bold: true,
        hidden: false,
      },
      emissao: {
        id: 'emissao',
        label: 'Emissão / Status',
        x: 50,
        y: 82,
        w: 25,
        fontSize: 4.7,
        font: 'inter',
        color: '#475569',
        tracking: 0,
        align: 'right',
        uppercase: false,
        versalete: false,
        bold: false,
        hidden: false,
      },
      qrCode: {
        id: 'qrCode',
        label: 'QR Code Autenticação',
        x: 79,
        y: 65,
        w: 17,
        h: 31,
        isImage: true,
        hidden: false,
      },
    };
  }

  // Frente padrão CR80 (espelhando exatamente a Carteirinha apresentada no sistema)
  return {
    logo: {
      id: 'logo',
      label: 'Logo Betesda',
      x: 3.8,
      y: 3.5,
      w: 58,
      h: 20,
      isImage: true,
      hidden: false,
    },
    foto: {
      id: 'foto',
      label: 'Foto 3×4 do Membro',
      x: 70.5,
      y: 15.5,
      w: 25.8,
      h: 49.5,
      isImage: true,
      hidden: false,
    },
    titulo: {
      id: 'titulo',
      label: 'Título Credencial',
      x: 3.8,
      y: 32.2,
      w: 64,
      fontSize: 6.2,
      font: 'inter',
      color: perfil === 'pastor' ? '#fcd34d' : '#93c5fd',
      tracking: 150,
      align: 'left',
      uppercase: true,
      versalete: false,
      bold: true,
      hidden: false,
    },
    registro: {
      id: 'registro',
      label: 'Nº Registro',
      x: 3.8,
      y: 39.2,
      w: 18.5,
      fontSize: 7.4,
      font: 'inter',
      color: '#ffffff',
      tracking: 20,
      align: 'left',
      uppercase: false,
      versalete: false,
      bold: true,
      hidden: false,
    },
    cargoBanner: {
      id: 'cargoBanner',
      label: 'Cargo Destaque',
      x: 23.8,
      y: 39.2,
      w: 44,
      fontSize: 8.4,
      font: 'inter',
      color: '#ffffff',
      tracking: 80,
      align: 'right',
      uppercase: true,
      versalete: false,
      bold: true,
      hidden: false,
    },
    nome: {
      id: 'nome',
      label: 'Nome do Membro',
      x: 3.8,
      y: 52.5,
      w: 64,
      fontSize: 6.4,
      font: 'inter',
      color: '#0f172a',
      tracking: 0,
      align: 'left',
      uppercase: true,
      versalete: false,
      bold: true,
      hidden: false,
    },
    localidade: {
      id: 'localidade',
      label: 'Cidade / UF / País',
      x: 3.8,
      y: 65.8,
      w: 64,
      fontSize: 6,
      font: 'inter',
      color: '#0f172a',
      tracking: 0,
      align: 'left',
      uppercase: true,
      versalete: false,
      bold: true,
      hidden: false,
    },
    cpf: {
      id: 'cpf',
      label: 'CPF',
      x: 3.8,
      y: 80.5,
      w: 23.8,
      fontSize: 5.4,
      font: 'inter',
      color: '#f8fafc',
      tracking: 0,
      align: 'left',
      uppercase: false,
      versalete: false,
      bold: true,
      hidden: false,
    },
    rg: {
      id: 'rg',
      label: 'RG',
      x: 28.8,
      y: 80.5,
      w: 21.8,
      fontSize: 5.4,
      font: 'inter',
      color: '#f8fafc',
      tracking: 0,
      align: 'left',
      uppercase: false,
      versalete: false,
      bold: true,
      hidden: false,
    },
    cargo: {
      id: 'cargo',
      label: 'Cargo Ministerial',
      x: 51.8,
      y: 80.5,
      w: 22.8,
      fontSize: 5.4,
      font: 'inter',
      color: '#f8fafc',
      tracking: 0,
      align: 'left',
      uppercase: false,
      versalete: false,
      bold: true,
      hidden: false,
    },
    filiado: {
      id: 'filiado',
      label: 'Batizado em',
      x: 75.8,
      y: 80.5,
      w: 20.4,
      fontSize: 5.4,
      font: 'inter',
      color: '#f8fafc',
      tracking: 0,
      align: 'left',
      uppercase: false,
      versalete: false,
      bold: true,
      hidden: false,
    },
  };
}

export function criarConfigPerfilPadrao(perfil = 'pastor') {
  return {
    frente: {
      fundoImg: '',
      layout: getDefaultCarteirinhaLayout('frente', perfil),
      imagensExtras: [],
    },
    verso: {
      fundoImg: '',
      layout: getDefaultCarteirinhaLayout('verso', perfil),
      imagensExtras: [],
    },
  };
}

export function criarConfigCarteirinhaPadrao() {
  return {
    ativo: false,
    pastor: criarConfigPerfilPadrao('pastor'),
    membro: criarConfigPerfilPadrao('membro'),
  };
}

export function carregarConfigCarteirinha() {
  const padrao = criarConfigCarteirinhaPadrao();
  try {
    const raw = localStorage.getItem(STORAGE_CARTEIRINHA_CONFIG_KEY);
    if (!raw) return padrao;
    const parsed = JSON.parse(raw);

    const mesclarLado = (origemLado, lado, perfil) => {
      const defLay = getDefaultCarteirinhaLayout(lado, perfil);
      const savedLay = origemLado?.layout || {};
      const merged = {};
      for (const k of Object.keys(defLay)) {
        merged[k] = savedLay[k] ? { ...defLay[k], ...savedLay[k] } : { ...defLay[k] };
      }
      return {
        fundoImg: origemLado?.fundoImg || '',
        layout: merged,
        imagensExtras: Array.isArray(origemLado?.imagensExtras) ? origemLado.imagensExtras : [],
      };
    };

    const mesclarPerfil = (perfil) => {
      // Compatibilidade com formato antigo (frente/verso na raiz)
      const origemPerfil = parsed?.[perfil] || (parsed?.frente || parsed?.verso ? parsed : null);
      return {
        frente: mesclarLado(origemPerfil?.frente, 'frente', perfil),
        verso: mesclarLado(origemPerfil?.verso, 'verso', perfil),
      };
    };

    return {
      ativo: Boolean(parsed?.ativo),
      pastor: mesclarPerfil('pastor'),
      membro: mesclarPerfil('membro'),
    };
  } catch {
    return padrao;
  }
}

export function salvarConfigCarteirinha(config) {
  localStorage.setItem(STORAGE_CARTEIRINHA_CONFIG_KEY, JSON.stringify(config));
}

export function estiloTextoCardPreview(el) {
  const fontSize = Number(el.fontSize) || 6;
  const trackingEm = (Number(el.tracking) || 0) / 1000;
  return {
    left: `${el.x}%`,
    top: `${el.y}%`,
    width: `${el.w}%`,
    textAlign: el.align || 'left',
    color: el.color || '#0f172a',
    fontSize: `${(fontSize * PT_TO_CQW_CR80).toFixed(3)}cqw`,
    letterSpacing: trackingEm ? `${trackingEm}em` : '0',
    paddingLeft: el.align === 'center' && trackingEm ? `${trackingEm}em` : undefined,
    fontWeight: el.font === 'bebas-neue' || el.font === 'great-vibes' ? 400 : el.bold ? 700 : 500,
    textTransform: el.uppercase && !el.versalete ? 'uppercase' : 'none',
    fontVariant: el.versalete ? 'small-caps' : 'normal',
    lineHeight: el.font === 'bebas-neue' ? 1.0 : 1.25,
  };
}

export function estiloTextoCardPrint(el) {
  const fontSize = Number(el.fontSize) || 6;
  const fonte = getFonteInfo(el.font);
  const trackingEm = (Number(el.tracking) || 0) / 1000;
  const weight = el.font === 'bebas-neue' || el.font === 'great-vibes' ? 400 : el.bold ? 700 : 500;
  const textTransform = el.uppercase && !el.versalete ? 'uppercase' : 'none';
  const fontVariant = el.versalete ? 'small-caps' : 'normal';
  const lineHeight = el.font === 'bebas-neue' ? 1.0 : 1.25;
  const padLeft = el.align === 'center' && trackingEm ? `padding-left:${trackingEm}em;` : '';
  return `position:absolute;left:${el.x}%;top:${el.y}%;width:${el.w}%;text-align:${el.align || 'left'};color:${el.color || '#0f172a'};font-family:${fonte.css};font-size:${fontSize}pt;letter-spacing:${trackingEm ? `${trackingEm}em` : '0'};${padLeft}font-weight:${weight};text-transform:${textTransform};font-variant:${fontVariant};line-height:${lineHeight};`;
}
