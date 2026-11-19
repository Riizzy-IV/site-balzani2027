import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import CaseLemanView from './pages/CaseLemanView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaseLemanView />
  </StrictMode>,
)
