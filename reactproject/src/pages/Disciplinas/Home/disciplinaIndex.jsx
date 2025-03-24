import './styles.css'

import { useEffect, useState } from 'react'

const DisciplinasHome = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/disciplina')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        setDisciplinas(data)
      })
  }, [])

  return (
    <div>

      <div className="container">
        <form>
          <h1>Cadastro de disciplinas</h1>
          <button type='button'>Cadastrar</button>
        </form>
      </div>

      {disciplinas.map((disciplina) => {
        <div className="card">
          <p>Disciplina: {disciplina.nome}</p>
          <p>Descrição: {disciplina.descricao}</p>
          <p>Encerramento: {disciplina.dataFim}</p>
          <p>Tarefas:</p>
          <ul>
            {disciplina.tarefas.map((tarefa, index) => (
              <li key={index}>
                <p>Nome: {tarefa.nome}</p>
                <p>Situação: {tarefa.concluida ? 'Finalizada' : 'Pendente'}</p>
                <p>Aluno: {tarefa.aluno.nome}</p>
              </li>
            ))}
          </ul>
        </div>
      })}

    </div>
  )
}

export default DisciplinasHome