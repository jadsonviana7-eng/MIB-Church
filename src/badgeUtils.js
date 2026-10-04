/**
 * Utilitário para controle do App Badging API em PWAs instalados.
 * Permite exibir a contagem de pendências/notificações no ícone do aplicativo na tela inicial do celular/desktop.
 */

export function isBadgingSupported() {
  return typeof navigator !== 'undefined' && 'setAppBadge' in navigator && 'clearAppBadge' in navigator;
}

export function isStandalone() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://')
  );
}

export function getBadgePermissionStatus() {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

/**
 * Solicita permissão de notificação (necessário no iOS 16.4+ para o badge funcionar no PWA instalado).
 */
export async function requestBadgePermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  try {
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  } catch (err) {
    console.warn('Erro ao solicitar permissão de notificações para badge:', err);
    return false;
  }
}

/**
 * Define a contagem numérica no ícone do PWA instalado.
 * Se count <= 0, limpa o badge automaticamente.
 * @param {number} count 
 */
export async function setAppBadge(count) {
  if (!isBadgingSupported()) return false;

  try {
    const num = Number(count);
    if (num > 0) {
      await navigator.setAppBadge(num);
    } else {
      await navigator.clearAppBadge();
    }
    return true;
  } catch (error) {
    console.debug('Badge API não pôde ser atualizado:', error?.message || error);
    return false;
  }
}

/**
 * Emite uma notificação nativa no sistema através do Service Worker para forçar o launcher do Android a exibir o badge/ponto no ícone da tela inicial.
 */
export async function syncAndroidNotificationBadge(count, options = {}) {
  // 1. Atualiza o Badging API nativo (Windows / Mac / iOS / Chrome)
  await setAppBadge(count);

  // 2. No Android, o launcher exige uma notificação ativa na bandeja para acender o selo no ícone
  if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.ready;
    if (!registration) return;

    const num = Number(count);
    if (num > 0) {
      const title = options.title || 'MIB Church';
      const body = options.body || `Você tem ${num} pendência(s) / notificação(ões) no sistema.`;

      await registration.showNotification(title, {
        body,
        icon: '/logo-betesda-inicio.png',
        badge: '/favicon.svg',
        tag: 'mib-church-badge-alert', // Substitui a notificação anterior em vez de duplicar
        renotify: options.renotify || false,
        silent: options.silent !== undefined ? options.silent : true,
        data: { url: '/' }
      });
    } else {
      // Limpa as notificações de alerta para remover o ponto do ícone no Android
      const notifs = await registration.getNotifications({ tag: 'mib-church-badge-alert' });
      notifs.forEach(n => n.close());
    }
  } catch (err) {
    console.debug('Erro ao sincronizar notificação do Android:', err);
  }
}

/**
 * Remove o badge e fecha notificações ativas associadas.
 */
export async function clearAppBadge() {
  if (isBadgingSupported()) {
    try {
      await navigator.clearAppBadge();
    } catch (error) {
      console.debug('Badge API não pôde ser limpo:', error?.message || error);
    }
  }

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration) {
        const notifs = await registration.getNotifications({ tag: 'mib-church-badge-alert' });
        notifs.forEach(n => n.close());
      }
    } catch (e) {}
  }
  return true;
}


