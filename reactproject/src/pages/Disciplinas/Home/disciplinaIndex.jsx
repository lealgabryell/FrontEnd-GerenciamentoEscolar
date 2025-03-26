import './styles.css'
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Trash from '../../../assets/trash.svg'

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
          <h1>Lobby de disciplinas</h1>
          <button className="cadastrar-button" type='button'>Cadastrar</button>
        </form>
      </div>
      <div className="disciplinas">
        {disciplinas.map((disciplina, index) => (
          <div className="card" key={index}>
            <div className="card-container">
              <p>Disciplina: {disciplina.nome}</p>
              <p>Descrição: {disciplina.descricao}</p>
              <p>Encerramento: {disciplina.dataFim}</p>
              <p>Tarefas: </p>
                {disciplina.tarefas.length == 0 ? "Disciplina sem tarefas" :
                  <div className="div">
                    <ul>
                      {
                        disciplina.tarefas.map((tarefa, index) => (
                          <div className="tarefas-container" key={index}>
                            <li><h5>Nome da tarefa:</h5> {tarefa.titulo}</li>
                            <li><h5>Situação da tarefa:</h5> {tarefa.concluida ? 'Finalizada' : 'Pendente'}</li>
                            <li><h5>Turma: </h5>{tarefa.turmas.map((turma, index) => {
                              <h5 key={index}>{turma.nome}</h5>
                            })}</li>
                          </div>
                        ))
                      }
                    </ul>
                  </div>
                }
             
              <button className="edit-button-style">
                <a>Editar</a>
              </button>
            </div>
            <button className='delete-button-style' onClick={() => handleDelete(task._id)}>
              {" "}
              <img src={Trash} width={18} height={18} />
            </button>
          </div>
        ))}
      </div>
    </div >
  )
}

export default DisciplinasHome