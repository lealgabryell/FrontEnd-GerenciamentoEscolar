import './styles.css'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const DisciplinasHome = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const token = cookies.get("authToken");
  useEffect(() => {
    fetch('http://localhost:3000/api/disciplina', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Disciplinas recebidas: ", data);
        setDisciplinas(data)
      })
  }, [token])

  return (
    <div className="container">

      <div>
        <form>
          <h1>Cadastro de disciplinas</h1>
          <button type='button'>Cadastrar</button>
        </form>
      </div>

      {disciplinas.map((disciplina) => (
        <div className="card" key={disciplina._id}>
          <p>Disciplina: {disciplina.nome}</p>
          <p>Descrição: {disciplina.descricao}</p>
          <p>Encerramento: {disciplina.dataFim}</p>
          <p>Tarefas:  
          {disciplina.tarefas.length == 0 ? "Disciplina sem tarefas" :
            <ul>
              {
                disciplina.tarefas.map((tarefa, index) => (
                  <li key={index}>
                    <p>Nome: {tarefa.nome}</p>
                    <p>Situação: {tarefa.concluida ? 'Finalizada' : 'Pendente'}</p>
                    <p>Aluno: {tarefa.aluno.nome}</p>
                  </li>
                ))
              }
            </ul>
          }
          </p>
        </div>
      ))}

    </div >
  )
}

export default DisciplinasHome