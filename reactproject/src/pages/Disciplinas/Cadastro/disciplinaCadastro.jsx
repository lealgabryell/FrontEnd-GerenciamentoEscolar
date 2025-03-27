import Cookies from 'universal-cookie';
import './styles.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function DisciplinaCadastro() {
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
      const response = await fetch('http://localhost:3000/api/disciplina', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          descricao,
          dataFim
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
          placeholder='Nome da disciplina'
          required />
        <input type="text"
          value={descricao}
          className="input-field"
          onChange={(e) => setDescricao(e.target.value)}
          placeholder='Ementa'
          required />
        <label className='date-label'>Data de encerramento da disciplina</label>
        <input type="date"
          value={dataFim}
          className="input-field"
          onChange={(e) => setDataFim(e.target.value)}
          required />
        <button type="submit" className="submit-button">
          Cadastrar Disciplina
        </button>
      </form>
    </div>
  )
}

export default DisciplinaCadastro