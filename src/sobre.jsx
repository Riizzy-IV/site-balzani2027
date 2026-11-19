import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import Sobre from './pages/Sobre.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sobre />
  </StrictMode>,
)
