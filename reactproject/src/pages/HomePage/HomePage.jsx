import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
function HomePage() {
  return (
    <div className='link-container'>
      <Link to="/tarefas" className='navLink'>
        Gerenciar Tarefas</Link>
    </div>
  )
}

export default HomePage