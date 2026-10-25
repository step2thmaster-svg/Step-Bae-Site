import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PartnershipPage from './PartnershipPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PartnershipPage />
  </StrictMode>,
)
