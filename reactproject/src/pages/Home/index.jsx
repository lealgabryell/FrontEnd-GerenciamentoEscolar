import './styles.css'
import { useState, useEffect } from 'react'
const Fetch = () => {
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
    <div>
      <div className="container">
        <form>
          <h1>Cadastro de atividades</h1>
          <input placeholder="Titulo"></input>
          <button type='button'>Cadastrar</button>
        </form>
      </div>

      {tasks.map((task) => (

        <div className="card">
          <div>
            <p>Titulo: {task.titulo}</p>
            <p>Situação: {task.concluida ? "Finalizada" : "Pendente"}</p>
            <p>Aluno: {task.aluno.nome}</p>
            <button>Editar</button>
          </div>

        </div>
      ))}
    </div>
  )
};
export default Fetch
