import React, { useState, useEffect } from 'react';
import App from './App.jsx';
import PublicConfirmarEscala from './PublicConfirmarEscala.jsx';
import PublicRegistrationForm from './PublicRegistrationForm.jsx';
import PublicEventRegistration from './PublicEventRegistration.jsx';

/**
 * Identifica o tipo de rota pública com base na URL (pathname, search ou hash).
 */
export function getRouteType(loc = (typeof window !== 'undefined' ? window.location : {})) {
  const pathname = loc.pathname || '';
  const search = loc.search || '';
  const hash = loc.hash || '';

  // 1. Confirmação de Escala Pública
  if (
    pathname === '/confirmar-escala' ||
    pathname.startsWith('/confirmar-escala/') ||
    search.includes('confirmar-escala') ||
    search.includes('escala=') ||
    search.includes('escala_id=') ||
    (hash && (hash.includes('confirmar-escala') || hash.includes('escala=')))
  ) {
    return 'confirmar-escala';
  }

  // 2. Formulário Público de Cadastro de Membro
  if (
    pathname === '/cadastro-publico' ||
    pathname.startsWith('/cadastro-publico/') ||
    search.includes('cadastro-publico') ||
    (hash && hash.includes('cadastro-publico'))
  ) {
    return 'cadastro-publico';
  }

  // 3. Inscrição Pública em Eventos
  if (
    pathname === '/inscricao-evento' ||
    pathname.startsWith('/inscricao-evento/') ||
    search.includes('inscricao-evento') ||
    (hash && hash.includes('inscricao-evento'))
  ) {
    return 'inscricao-evento';
  }

  return 'app';
}

function getUrlKey(loc = (typeof window !== 'undefined' ? window.location : {})) {
  return `${loc.pathname || ''}${loc.search || ''}${loc.hash || ''}`;
}

/**
 * Roteador Raiz:
 * Garante que rotas públicas (como confirmação de escalas enviadas pelo WhatsApp)
 * sejam renderizadas imediatamente, sem passar pela inicialização de autenticação
 * ou painel interno do App, tanto no navegador comum quanto no aplicativo PWA instalado no celular.
 */
export default function RootRouter() {
  const [routeInfo, setRouteInfo] = useState(() => ({
    type: getRouteType(window.location),
    key: getUrlKey(window.location)
  }));

  useEffect(() => {
    const handleUrlChange = (forcedUrl = null) => {
      let loc = window.location;
      if (forcedUrl) {
        try {
          loc = new URL(forcedUrl, window.location.origin);
        } catch (_) {}
      }

      const type = getRouteType(loc);
      const key = getUrlKey(loc);

      setRouteInfo(prev => {
        if (prev.type === type && prev.key === key) return prev;
        return { type, key };
      });
    };

    // 1. PWA Launch Handler API (quando o WebAPK / PWA é aberto ou focado com uma nova URL no Android/Desktop)
    if (typeof window !== 'undefined' && 'launchQueue' in window) {
      window.launchQueue.setConsumer((launchParams) => {
        if (launchParams && launchParams.targetURL) {
          try {
            const urlObj = new URL(launchParams.targetURL);
            const targetType = getRouteType(urlObj);

            // Atualiza histórico do navegador e força a troca de rota
            if (window.history && window.history.pushState) {
              window.history.pushState({}, '', launchParams.targetURL);
            }
            handleUrlChange(launchParams.targetURL);
          } catch (err) {
            console.warn('Erro ao processar launchQueue:', err);
          }
        }
      });
    }

    // 2. Eventos de navegação padrão
    window.addEventListener('popstate', () => handleUrlChange());
    window.addEventListener('hashchange', () => handleUrlChange());

    // 3. Retorno ao primeiro plano no celular (ex: usuário estava com o app aberto em segundo plano e clicou no link do WhatsApp)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleUrlChange();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', () => handleUrlChange());
    window.addEventListener('focus', () => handleUrlChange());

    // 4. Evento customizado para navegação programática
    const handleCustomNavigate = (e) => {
      if (e.detail?.url) {
        if (window.history && window.history.pushState) {
          window.history.pushState({}, '', e.detail.url);
        }
        handleUrlChange(e.detail.url);
      }
    };
    window.addEventListener('mib-navigate-route', handleCustomNavigate);

    return () => {
      window.removeEventListener('popstate', () => handleUrlChange());
      window.removeEventListener('hashchange', () => handleUrlChange());
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', () => handleUrlChange());
      window.removeEventListener('focus', () => handleUrlChange());
      window.removeEventListener('mib-navigate-route', handleCustomNavigate);
    };
  }, []);

  if (routeInfo.type === 'confirmar-escala') {
    return <PublicConfirmarEscala key={routeInfo.key} />;
  }

  if (routeInfo.type === 'cadastro-publico') {
    return <PublicRegistrationForm key={routeInfo.key} />;
  }

  if (routeInfo.type === 'inscricao-evento') {
    return <PublicEventRegistration key={routeInfo.key} />;
  }

  return <App />;
}
