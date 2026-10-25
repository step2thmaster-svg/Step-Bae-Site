import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CraftsmanshipPage from './CraftsmanshipPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CraftsmanshipPage />
  </StrictMode>,
)
