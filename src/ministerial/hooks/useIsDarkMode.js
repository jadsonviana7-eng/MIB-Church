import { useState, useEffect } from 'react';

/**
 * Hook reativo para detectar se a aplicação está em modo escuro (html.dark).
 * Monitora mutações no elemento <html> para reagir imediatamente à troca de tema.
 */
export function useIsDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const checkDark = () => {
      const active = document.documentElement.classList.contains('dark');
      setIsDark(prev => (prev !== active ? active : prev));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}
