import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootRouter from './RootRouter.jsx'
import { ErrorBoundary } from './ErrorBoundary.jsx'
import { registerServiceWorker } from './serviceWorkerRegistration.js'

import { inicializarTema } from './themeUtils';

console.log('Iniciando aplicação...');
inicializarTema();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <RootRouter />
    </ErrorBoundary>
  </StrictMode>,
)

registerServiceWorker()
