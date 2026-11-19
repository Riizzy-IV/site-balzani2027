import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import Servicos from './pages/Servicos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Servicos />
  </StrictMode>,
)
