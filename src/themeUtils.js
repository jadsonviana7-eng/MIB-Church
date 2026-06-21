export const acentos = {
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
};

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
    '--surface-muted': '#0f172a',
    '--surface-header': '#0f172a',
    '--text-primary': '#94a3b8',
    '--text-heading': '#f8fafc',
    '--text-muted': '#64748b',
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
  
  // Aplicar acento
  const varsAcento = acentos[acento] || acentos.azul;
  Object.keys(varsAcento).forEach(key => {
    root.style.setProperty(key, varsAcento[key]);
  });

  // Também ajustar a classe do Tailwind
  if (modo === 'escuro') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function obterTemaCarregado() {
  const modo = localStorage.getItem('mib-theme-modo') || 'claro';
  const acento = localStorage.getItem('mib-theme-acento') || 'azul';
  return { modo, acento };
}

export function inicializarTema() {
  const { modo, acento } = obterTemaCarregado();
  aplicarTema(modo, acento);
}
