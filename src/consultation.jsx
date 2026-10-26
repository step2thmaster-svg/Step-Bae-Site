import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ConsultationPage from './ConsultationPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConsultationPage />
  </StrictMode>,
)
