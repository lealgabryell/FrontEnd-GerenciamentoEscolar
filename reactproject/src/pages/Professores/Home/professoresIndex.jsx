import React, { useEffect, useState } from 'react'
import './styles.css'

import Trash from '../../../assets/trash.svg'
import Cookies from 'universal-cookie'

function ProfessoresHome() {
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const [professores, setProfessores] = useState([]);
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
  }, [token])
  return (
    <div className='container'>
      <h1>Lobby de Professores</h1>
      <button className="cadastra-button">Cadastrar</button>
      {professores.length == 0 ? <p>Não há professores registrados no sistema!</p> :
        <div className="professores">
          {professores.map((professor, index) => (
            <div className="card" key={index}>
              <div className="card-container">
                <h5>Nome:</h5> <p>{professor.nome}</p>
                <h5>Email:</h5> <p>{professor.email}</p>
                <h5>Disciplinas: </h5> {professor.disciplinas.length == 0 ? "Professor sem disciplinas" :
                  <ul>
                    {professor.disciplinas.map((disciplina, index) => (
                      <li key={index}>{disciplina.nome}</li>
                    ))}
                  </ul>}
                <button className="edit-button-style">Editar</button>
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