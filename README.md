# 🧾 Sales Web MVC

Aplicação web para simular um sistema de listagem de vendedores e seus departamentos. Permite:

- Consultar vendedores e departamentos
- Adicionar novos registros
- Atualizar dados existentes
- Excluir registros

O projeto foi desenvolvido usando ASP.NET Core MVC com Entity Framework Core e PostgreSQL no back-end, e React (com Vite.js) no front-end, baseado no curso:

🎓 *C# COMPLETO 2020: Programação Orientada a Objetos + Projetos*  
Instrutor: Nelio Alves

---

## 🚀 Tecnologias Utilizadas

- ASP.NET Core MVC
- Entity Framework Core
- PostgreSQL
- React
- Vite.js

---

## 🛠️ Como executar o projeto

### 1. Pré-requisitos


.NET SDK, Node.js, PostgreSQL



### 2. Clonar o repositório

```bash
git clone https://github.com/EricCarv4lho/sales-web-mvc.git

```
### 3. Configure sua string de conexão PostgreSQL no arquivo appsettings.Development.json


```bash
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=salesdb;Username=seu_usuario;Password=sua_senha"
  }
}

```
No backend:
```bash
dotnet ef database update
dotnet run
```

No frontend:

```bash
npm install
npm run dev
