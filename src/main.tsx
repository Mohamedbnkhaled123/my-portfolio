import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// ═══════════════════════════════════════════════════
// DEVTOOLS KILLER — Framework Masking
// ═══════════════════════════════════════════════════
if (typeof window !== 'undefined' && typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
  const devtools = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (devtools) {
    for (let key in devtools) {
      if (typeof devtools[key] === 'function') devtools[key] = () => {};
      else devtools[key] = null;
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
