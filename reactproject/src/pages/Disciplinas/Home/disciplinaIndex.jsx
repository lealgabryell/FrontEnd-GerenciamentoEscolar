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
        setDisciplinas(data);
      })
  }, [token]);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/disciplina/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar disciplina");
      }
      setDisciplinas((prevDisciplinas) => prevDisciplinas.filter((disciplina) => disciplina._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">

      <div>
        <form>
          <h1>Lobby de disciplinas</h1>
          <button className="cadastrar-button" type='button'>Cadastrar</button>
        </form>
      </div>
      {disciplinas.length == 0 ? <p>Não há disciplinas registradas no sistema!</p> :
        <div className="disciplinas">
          {disciplinas.map((disciplina, index) => (
            <div className="card" key={index}>
              <div className="card-container">
                <h5>Disciplina:</h5> <p>{disciplina.nome}</p>
                <h5>Descrição:</h5> <p>{disciplina.descricao}</p>
                <h5>Encerramento:</h5> <p>{new Date(disciplina.dataFim).toLocaleDateString('pt-BR')}</p>
                <p>Tarefas: </p>
                {disciplina.tarefas.length == 0 ? "Disciplina sem tarefas" :
                  <div className="div">
                    <ul>
                      {
                        disciplina.tarefas.map((tarefa, index) => (
                          <div className="tarefas-container" key={index}>
                            <li><h5>Nome da tarefa:</h5> {tarefa.titulo}</li>
                            <li><h5>Situação da tarefa:</h5> {tarefa.concluida ? 'Finalizada' : 'Pendente'}</li>
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
              <button className='delete-button-style' onClick={() => handleDelete(disciplina._id)}>
                {" "}
                <img src={Trash} width={18} height={18} />
              </button>
            </div>
          ))}
        </div>
      }
    </div >
  )
}

export default DisciplinasHome