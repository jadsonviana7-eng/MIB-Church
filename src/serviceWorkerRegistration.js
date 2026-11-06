export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  // Em modo de desenvolvimento, desregistra Service Workers zumbis de outros projetos rodando no mesmo localhost
  if (import.meta.env.DEV) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    }).catch(() => {});
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        registration.update();
      })
      .catch((error) => {
        console.warn('Service worker nao registrado:', error);
      });
  });
}
