import React, { useEffect, useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

export default function TarefasCadastro() {
  const [titulo, setTitulo] = useState("");
  const [turmasIds, setTurmasIds] = useState([]);
  const [turmas, setTurmas] = useState(""); //Turmas que já existem no bd
  const [disciplinasIds, setDisciplinasIds] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]); //Disciplinas que ja existem no bd
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  useEffect(() => {
    fetch('http://localhost:3000/api/disciplina', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setDisciplinas(data))
      .catch((err) => console.error('Erro ao carregar disciplinas:', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/turma', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setTurmas(data))
      .catch((err) => console.error('Erro ao carregar disciplinas:', err));
  }, []);

  // Função para atualizar os IDs das disciplinas selecionadas
  const handleDisciplinaChange = (id) => {
    setDisciplinasIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };
  // Função para atualizar os IDs das turmas selecionadas
  const handleTurmaChange = (id) => {
    setTurmasIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/tarefa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ titulo, turmasIds, disciplinasIds })
        }
      );
      if (!response.ok) {
        throw new Error("Não foi possível cadastrar essa atividade")
      } else {
        navigate("/tarefas");
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='cadastro-container'>
      <h1>Cadastro de Tarefas</h1>
      <h4>Preencha os campos abaixo:</h4>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type='text'
          className="input-field"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder='Título'
          required />

        <div className="disciplinas-container">
          <h4>Selecione as turmas:</h4>
          {turmas.length > 0 ? (
            turmas.map((turma) => (
              <label key={turma._id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={turma._id}
                  onChange={() => handleTurmaChange(turma._id)}
                  checked={turmasIds.includes(turma._id)}
                />
                {turma.nome} - <a>{turma._id}</a>
              </label>
            ))
          ) : (
            <p>Carregando turmas...</p>
          )}
        </div>
        <div className="disciplinas-container">
          <h4>Selecione as disciplinas:</h4>
          {disciplinas.length > 0 ? (
            disciplinas.map((disciplina) => (
              <label key={disciplina._id} className="checkbox-label">
                <input
                  type="checkbox"
                  value={disciplina._id}
                  onChange={() => handleDisciplinaChange(disciplina._id)}
                  checked={disciplinasIds.includes(disciplina._id)}
                />
                {disciplina.nome} - <a>{disciplina._id}</a>
              </label>
            ))
          ) : (
            <p>Carregando disciplinas...</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Cadastrar Tarefa
        </button>
      </form>
    </div>
  )
}