import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/login";
import TarefasHome from "./pages/Tarefas/Home/tarefaIndex";
import DisciplinasHome from "./pages/Disciplinas/Home/disciplinaIndex";
import HomePage from "./pages/HomePage/HomePage";
import TarefasCadastro from "./pages/Tarefas/Cadastro/tarefasCadastro";
import DisciplinaCadastro from "./pages/Disciplinas/Cadastro/disciplinaCadastro";
import TarefasEditar from "./pages/Tarefas/Editar/tarefasEditar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginPage} exact />
        <Route path="/home" Component={HomePage} />
        <Route path="/tarefas" Component={TarefasHome} />
        <Route path="/tarefas/editar/:id" Component={TarefasEditar} />
        <Route path="/tarefas/cadastro" Component={TarefasCadastro} />
        <Route path="/disciplinas" Component={DisciplinasHome} />
        <Route path="/disciplinas/cadastro" Component={DisciplinaCadastro} />
      </Routes>
    </BrowserRouter>
  )
}

export default App