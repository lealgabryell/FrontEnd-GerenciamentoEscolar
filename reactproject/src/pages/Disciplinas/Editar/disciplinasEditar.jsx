import Cookies from 'universal-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function DisciplinaEditar() {
  const { id } = useParams();

  const [disciplina, setDisciplina] = useState({});
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`http://localhost:3000/api/disciplina/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          descricao,
          dataFim,
        }),
      });
      if (!response.ok) {
        throw new Error("Não foi possível cadastrar essa disciplina")
      } else {
        const data = await response.json();
        console.log(data);
        navigate("/disciplinas");
      }
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/disciplina/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setDisciplina(data);
      })
  })
  return (
    <div className="cadastro-container">
      <h1>Cadastro de Disciplina</h1>
      <h4>Preencha os campos abaixo</h4>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text"
          value={nome}
          className="input-field"
          onChange={(e) => setNome(e.target.value)}
          placeholder={`${disciplina.nome}`}
          required />
        <input type="text"
          value={descricao}
          className="input-field"
          onChange={(e) => setDescricao(e.target.value)}
          placeholder={`${disciplina.descricao}`}
        />
        <label className='date-label'>Data de encerramento da disciplina (atual: {new Date(disciplina.dataFim).toLocaleDateString()})</label>
        <input type="date"
          value={dataFim}
          className="input-field"
          onChange={(e) => setDataFim(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Cadastrar Disciplina
        </button>
      </form>
    </div>
  )
}

export default DisciplinaEditar