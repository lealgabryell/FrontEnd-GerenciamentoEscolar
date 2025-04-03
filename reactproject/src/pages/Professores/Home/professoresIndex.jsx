import React, { useEffect, useState } from 'react'
import './styles.css'

import Trash from '../../../assets/trash.svg'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

function ProfessoresHome() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const [professores, setProfessores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/professor", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setProfessores(data);
        })
    } catch (err) {
      setError(err.message)
    }
  }, [token]);

  useEffect(() => {
    fetch("http://localhost:3000/api/turma", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setTurmas(data);
    })
    .catch((err) => console.error('Erro ao carregar turmas:', err));
  }, [token]);
  
  return (
    <div className='container'>
      <div>
        <h1>Lobby de Professores</h1>
        <button className="cadastrar-button">Cadastrar</button>
      </div>

      {professores.length == 0 ? <>{error && <p className="error-message">{error}</p>}</> :
        <div className="professores">
          {professores.map((professor, index) => (
            <div className="card" key={index}>
              <div className="card-container">
                <p>Nome:</p> <h5>{professor.nome}</h5>
                <p>idade:</p> <h5>{professor.idade}</h5>
                <p>Email:</p> <h5>{professor.email}</h5>
                <p>Disciplinas: </p> {professor.disciplinas.length == 0 ? <h5>Professor sem disciplinas</h5> :
                  <ul>
                    {professor.disciplinas.map((disciplina, index) => (
                      <li key={index}><h5>{disciplina.nome}</h5></li>
                    ))}
                  </ul>}
                <p>Turmas: </p> {turmas.map((turma, index) => {
                  
                  {turma.professor._id == professor._id  ? 
                  <h5 key={index}>{turma.nome}</h5> : 
                  <h5>Sem turmas</h5>}
                })}
                <button className='edit-button-style' onClick={() => navigate(`/professores/editar/${professor._id}`)}>
                  <a>Editar</a>
                </button>
              </div>
              <button className='delete-button-style'>
                {" "}
                <img src={Trash} width={18} height={18} />
              </button>
            </div>
          ))}
        </div>}
    </div>
  )
}

export default ProfessoresHome