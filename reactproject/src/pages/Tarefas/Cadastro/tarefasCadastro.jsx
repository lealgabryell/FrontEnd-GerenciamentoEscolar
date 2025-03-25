import React from 'react'

export default function TarefasCadastro() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [tarefasIds, setTarefasIds] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch()
    } catch (e) { }
  }


  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className="form-container"></form>
    </div>
  )
}