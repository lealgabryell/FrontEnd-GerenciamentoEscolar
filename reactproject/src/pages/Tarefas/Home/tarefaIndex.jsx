import './styles.css'
import { useState, useEffect } from 'react'
import Trash from '../../../assets/trash.svg'

const TarefasHome = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/tarefa')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Lobby de atividades</h1>
        <button type='button' className='cadastrar-button'>Cadastrar</button>

      </div>
      <div className="tasks">
        {tasks.map((task) => (

          <div className="card" key={task._id}>
            <div className='card-container'>
              <p>Titulo: {task.titulo}</p>
              <p>Situação: {task.concluida ? "Finalizada" : "Pendente"}</p>
              <p>Aluno: {task.aluno.nome}</p>
              <button className='edit-button-style'>
                <a>Editar</a></button>
            </div>
            <button className='delete-button-style'>
              {" "}
              <img src={Trash} width={18} height={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
};
export default TarefasHome
