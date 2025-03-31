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

  useEffect(() => {
    const fetchDisciplina = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/disciplina/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar disciplina");
        }
        const data = await response.json();
        setNome(data.nome);
        setDescricao(data.descricao);

        // Convertendo dataFim para o formato adequado para input date
        const dataFormatada = data.dataFim ? new Date(data.dataFim).toISOString().split("T")[0] : "";
        setDataFim(dataFormatada);
        setDisciplina(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDisciplina();
  }, [id, token]); // Agora o useEffect só roda quando o id ou token mudar

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
        throw new Error("Não foi possível cadastrar essa disciplina");
      } else {
        navigate("/disciplinas");
      }
    } catch (err) {
      setError(err.message);
    }
  };
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
          placeholder={disciplina.nome || ""}
          required />
        <input type="text"
          value={descricao}
          className="input-field"
          onChange={(e) => setDescricao(e.target.value)}
          placeholder={disciplina.descricao || ""}
        />
        <label className="date-label">
          Data de encerramento da disciplina (atual: {disciplina.dataFim ? new Date(disciplina.dataFim).toLocaleDateString() : "Não definida"})
        </label>
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