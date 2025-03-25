import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./styles.css";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/professor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login. Verifique suas credenciais.");
      } else {
        const data = await response.json();
        document.cookie = `authToken=${data.token}; path=/; max-age=604800; Secure`;
        console.log(data, "Login realizado com sucesso!");
        navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Senha</label>
            <input
              type="password"
              className="input-field"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
