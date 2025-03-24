import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TarefasHome from './pages/Tarefas/Home/tarefaIndex'
import "../src/index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TarefasHome />
  </StrictMode>,
)
