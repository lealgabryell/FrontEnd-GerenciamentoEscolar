# FrontEnd-GerenciamentoEscolar


[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## ✍🏻 Autor

<a><img src="https://github.com/user-attachments/assets/fa60aba8-3200-402d-8b9e-a004ed3de6cf" width="200px"></a><br><br>

Olá, Sou **Gabryell Leal** <br>

📍 **Localidade:** Campina Grande, Paraíba<br>
🎓 **Formação:** Sistemas de informação - UniFacisa, 4° Semestre<br>

Me encontre no **LinkedIn:**<br>
<a href="https://www.linkedin.com/in/gabryell-leal-rocha-1762392a0"><img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin" width="100"></a>


> Projeto de cunho acadêmico para o componenteÇ Integrar Interfaces e Serviços Web. Consta de uma aplicaçãoo web em React.
> Esse projeto faz a gerencia de um sistema escolar com: Professores, Alunos, Perfis, Tarefas, Disciplinas e Turmas.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas para as seguintes tarefas:

- [ ] Finalizar a implementação do CRUD completo para gerência de Disciplinas e Tarefas
- [ ] Implementar o componente de gerencia de Professores
- [ ] Implementar o componente de gerencia de Alunos
- [ ] Implementar o componente de gerencia de Perfis

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente de `<node.JS / React / Vite>`
- Você tem uma máquina `Windows`.
- Clone também o backend do projeto, siga as instruções do guia e coloque o projeto no ar: <a href="https://github.com/lealgabryell/API-GerenciamentoEscolar-Node">Clique Aqui</a>
## 🚀 Instalando o GerenciamentoEscolar

Para instalar o GerenciamentoEscolar, siga estas etapas:

Windows:
Abre seu terminal e digite o comando:
```
git clone https://github.com/lealgabryell/FrontEnd-GerenciamentoEscolar.git
```
Entre na pasta correta usando o comando:
```
cd FrontEnd-GerenciamentoEscolar/reactproject
```
Abra sua IDE favorita mas dê preferência ao VS Code (digite o seguinte comando):
```
code .
```
O ESPAÇO ANTES DO PONTO FINAL É IMPORTANTE

## ☕ Usando GerenciamentoEscolar

Para usar GerenciamentoEscolar, siga estas etapas:

Faça o login:
```
Se for a sua primeira vez, provavelmente você não terá um login personalizado, então deixei um login global onde você pode entrar e criar sua própria conta, ou utilizar o projeto a partir desse login global:
email: adm
senha: adm
```
Explore as rotas:
```
Existem 6 rotas de gerenciamentoÇ
  - Gerenciamento de Disciplinas
  - Gerenciamento de Alunos
  - Gerenciamento de Professores
  - Gerenciamento de Turmas
  - Gerenciamento de Perfis
  - Gerenciamento de Tarefas
```
Lógica de negócios:
```
Algumas rotas estão à mercer de um token de autorização que é passado pelos cookies do cabeçalho da aplicação.
Não se preocupe, ao fazer login, sue token é gerado automaticamente e ele já passado para os cabeçalhos sempre que você entrar em uma nova página ou renderizar um componente na sua tela.
Aqui está uma demonstração dos relacionamentos entre as entidades dessa aplicação:
```
| Entidade 1      | Entidade 2                          |Relacionamento                          |
|-----------------|-------------------------------------|-------------------------------------|
| Aluno         | Perfil                                | 1:1
| Tarefa        | Disciplina                            | n:n
| Professor     | Disciplina                            | 1:n
| Turma         | Tarefa                                | 1:n
| Turma         | Professor                             | n:1

## 📫 Contribuindo para <GerenciamentoEscolar>

Para contribuir com <nome_do_projeto>, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <FrontEnd-GerenciamentoEscolar> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 😄 Seja um dos contribuidores

Quer fazer parte desse projeto? Clique [AQUI](CONTRIBUTING.md) e leia como contribuir.
