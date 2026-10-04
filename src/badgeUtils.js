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
 * Remove o badge do ícone do aplicativo.
 */
export async function clearAppBadge() {
  if (!isBadgingSupported()) return false;

  try {
    await navigator.clearAppBadge();
    return true;
  } catch (error) {
    console.debug('Badge API não pôde ser limpo:', error?.message || error);
    return false;
  }
}

