import './styles.css'
function Home() {

  const tasks = [
    {
      id: "1",
      title: "Atividade 1",
      finished: true
    },
    {
      id: "2",
      title: "Atividade 2",
      finished: false
    }
  ];
  return (
    <div>
      <div className="container">
        <form>
          <h1>Cadastro de atividades</h1>
          <input placeholder="Titulo"></input>
          <button type='button'>Cadastrar</button>
        </form>
      </div>

      {tasks.map((task) => (

        <div className="card">
          <div>
            <p>Titulo: {task.title}</p>
            <p>Situação: {task.finished ? "Finalizada" : "Pendente"}</p>
            <button>Editar</button>
          </div>

        </div>
      ))}
    </div>
  )
}

export default Home
