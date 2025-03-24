import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/login";
import TarefasHome from "./pages/Tarefas/Home/tarefaIndex";
import DisciplinasHome from "./pages/Disciplinas/Home/disciplinaIndex";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={LoginPage} exact />
        <Route path="/login/home" Component={HomePage} />
        <Route path="/login/tarefas" Component={TarefasHome} />
        <Route path="/login/disciplinas" Component={DisciplinasHome} />
      </Routes>
    </BrowserRouter>
  )
}

export default App