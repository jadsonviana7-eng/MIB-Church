export const acentosModo = {
  claro: {
    azul: {
      '--brand': '#202046',
      '--brand-light': '#f0f2fa',
      '--brand-dark': '#2f2f80',
      '--brand-strong': '#383874',
      '--accent': '#292991'
    },
    esmeralda: {
      '--brand': '#0f766e',
      '--brand-light': '#f0fdfa',
      '--brand-dark': '#115e59',
      '--brand-strong': '#134e4a',
      '--accent': '#0d9488'
    },
    roxo: {
      '--brand': '#6b21a8',
      '--brand-light': '#faf5ff',
      '--brand-dark': '#581c87',
      '--brand-strong': '#4c1d95',
      '--accent': '#7c3aed'
    },
    slate: {
      '--brand': '#334155',
      '--brand-light': '#f8fafc',
      '--brand-dark': '#1e293b',
      '--brand-strong': '#0f172a',
      '--accent': '#475569'
    }
  },
  escuro: {
    azul: {
      '--brand': '#3b82f6',
      '--brand-light': '#1e293b',
      '--brand-dark': '#2563eb',
      '--brand-strong': '#60a5fa',
      '--accent': '#60a5fa'
    },
    esmeralda: {
      '--brand': '#10b981',
      '--brand-light': '#064e3b',
      '--brand-dark': '#059669',
      '--brand-strong': '#34d399',
      '--accent': '#34d399'
    },
    roxo: {
      '--brand': '#a855f7',
      '--brand-light': '#3b0764',
      '--brand-dark': '#9333ea',
      '--brand-strong': '#c084fc',
      '--accent': '#c084fc'
    },
    slate: {
      '--brand': '#94a3b8',
      '--brand-light': '#1e293b',
      '--brand-dark': '#64748b',
      '--brand-strong': '#cbd5e1',
      '--accent': '#cbd5e1'
    }
  }
};

export const acentos = acentosModo.claro;

export const esquemas = {
  claro: {
    '--surface': '#ffffff',
    '--surface-muted': '#f4f7fa',
    '--surface-header': '#e9eef3',
    '--text-primary': '#4a5d73',
    '--text-heading': '#001657',
    '--text-muted': '#7b8da3',
    '--border': '#dde4ec'
  },
  escuro: {
    '--surface': '#1e293b',
    '--surface-muted': '#0b1329',
    '--surface-header': '#17223b',
    '--text-primary': '#cbd5e1',
    '--text-heading': '#f8fafc',
    '--text-muted': '#94a3b8',
    '--border': '#334155'
  }
};

export function aplicarTema(modo, acento) {
  const root = document.documentElement;
  
  // Salvar no localStorage
  localStorage.setItem('mib-theme-modo', modo);
  localStorage.setItem('mib-theme-acento', acento);
  
  // Aplicar esquema
  const varsEsquema = esquemas[modo] || esquemas.claro;
  Object.keys(varsEsquema).forEach(key => {
    root.style.setProperty(key, varsEsquema[key]);
  });
  
  // Aplicar acento adaptado ao modo
  const acentosDoModo = acentosModo[modo] || acentosModo.claro;
  const varsAcento = acentosDoModo[acento] || acentosDoModo.azul;
  Object.keys(varsAcento).forEach(key => {
    root.style.setProperty(key, varsAcento[key]);
  });

  // Também ajustar a classe do Tailwind
  if (modo === 'escuro') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Notificar outros componentes da aplicação
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('mib-theme-changed', { detail: { modo, acento } }));
  }
}

export function obterTemaCarregado() {
  const modo = localStorage.getItem('mib-theme-modo') || 'claro';
  const acento = localStorage.getItem('mib-theme-acento') || 'azul';
  return { modo, acento };
}

export function alternarTemaModo() {
  const { modo, acento } = obterTemaCarregado();
  const novoModo = modo === 'escuro' ? 'claro' : 'escuro';
  aplicarTema(novoModo, acento);
  return novoModo;
}

export function inicializarTema() {
  const { modo, acento } = obterTemaCarregado();
  aplicarTema(modo, acento);
}

