import React, { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

function ProfessoresEditar() {
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const navigate = useNavigate();

  const { id } = useParams();
  const [professor, setProfessor] = useState({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [turmas, setTurmas] = useState([]);
  const [turmasIds, setTurmasIds] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinasIds, setDisciplinasIds] = useState([]);
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfessor = async () => {
      const response = await fetch(`http://localhost:3000/api/professor/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setTurmas(data.turmas?.map(turma => turma._id) || []);
          setDisciplinas(data.disciplinas?.map(disciplina => disciplina._id) || []);
          setEmail(data.email);
          setNome(data.nome);
          setProfessor(data)
        })
        .catch((err) => console.error('Erro ao carregar professor:', err));
    }
    fetchProfessor();
  }, [token, id]);

  useEffect(() => {
    fetch('http://localhost:3000/api/disciplina', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setDisciplinas(data);
      })
      .catch((err) => console.error('Erro ao carregar disciplinas:', err));
  }, []);
  useEffect(() => {
    fetch('http://localhost:3000/api/turma', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) =>
        setTurmas(data))
      .catch((err) => console.error('Erro ao carregar disciplinas:', err));
  }, []);

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

  const handleSubmit = async () => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/api/professor/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          email,
          disciplinas,
          turmas
        }),
      });
      if (!response.ok) {
        throw new Error("Não foi possível cadastrar essa disciplina");
      } else {
        navigate("/professores");
      }
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="container">
      <div>
        <h1>Editar Professor</h1>
        <h4>Preencha os campos abaixo</h4>
      </div>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={() => handleSubmit} className="form-container">
        <label className='label'><h5>Nome:</h5></label>
        <input type="text"
          value={nome}
          className="input-field"
          onChange={(e) => setNome(e.target.value)}
          placeholder={professor.nome || ""}
          required />
        <label className='label'><h5>Email:</h5></label>
        <input type="email"
          value={email}
          className="input-field"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={professor.email || ""}
        />
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
          Salvar professor
        </button>
      </form>
    </div>
  )
}

export default ProfessoresEditar