import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import FormulaVertice from './pages/FormulaVertice.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormulaVertice />
  </StrictMode>,
)
