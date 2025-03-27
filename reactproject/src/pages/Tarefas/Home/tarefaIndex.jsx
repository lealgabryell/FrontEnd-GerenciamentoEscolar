import './styles.css';
import { useState, useEffect } from 'react';
import Trash from '../../../assets/trash.svg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const TarefasHome = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/tarefa')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("Erro: A API não retornou um array.", data);
          setTasks([]);
        }
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tarefa/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar tarefa");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="container">
      <div>
        <h1>Lobby de atividades</h1>
        <button type='button' className='cadastrar-button' onClick={() => { navigate("/tarefas/cadastro") }}>
          Cadastrar
        </button>

      </div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <div className="card" key={index}>
            <div className='card-container'>
              <h1>{task.titulo}</h1>
              <p>
                Situação:
              </p>
              {task.concluida ?
                <ul><li><h5>Finalizada</h5></li></ul> :
                <ul><li><h5>Pendente</h5></li></ul>}

              <p>
                Turmas:
              </p>
              {task.turmas.map((turma, index) =>
                <ul key={index}>
                  <li >
                    <h5>{turma.nome} - {turma.turno}</h5>
                  </li>
                </ul>
              )}

              <p>Disciplinas:</p> {task.disciplinas.length == 0 ? <ul><li><h5>Nenhuma disciplina associada</h5></li></ul> : (task.disciplinas.map((disciplina, index) =>
                <ul key={index}>
                  <li >
                    <h5>{disciplina.nome}</h5>
                  </li>
                </ul>
              ))}
              <button className='edit-button-style' onClick={() => navigate(`/tarefas/editar/${task._id}`)}>
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
};
export default TarefasHome
