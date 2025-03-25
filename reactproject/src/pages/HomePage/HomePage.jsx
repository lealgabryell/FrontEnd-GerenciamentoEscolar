import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
function HomePage() {
  return (
    <div className='link-container'>
      <Link to="/tarefas" className='navLink'>
        Gerenciar Tarefas</Link>
      <Link to="/disciplinas" className='navLink'>
        Gerenciar Disciplinas</Link>
      <Link to="/professores" className='navLink'>
        Gerenciar Professores</Link>
    </div>
  )
}

export default HomePage