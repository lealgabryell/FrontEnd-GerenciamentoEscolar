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
              <p>Situação: {task.concluida ? "Finalizada" : "Pendente"}</p>
              <p>Turmas: {turmas.map((turma, index) => {
                <div className="turmas" key={index}>
                  <ul>
                    <li>{turma.nome}</li>
                  </ul>
                </div>
              })}</p>
              <button className='edit-button-style'>
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

    </div>
  )
};
export default TarefasHome
