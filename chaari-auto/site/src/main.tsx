import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from './App'
import { langFromPath } from './i18n'
import './index.css'

inject()

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App lang={langFromPath(location.pathname)} />
    <SpeedInsights />
  </StrictMode>
)

// Production HTML is prerendered (scripts/prerender.mjs), so hydrate it; the dev server starts empty.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
