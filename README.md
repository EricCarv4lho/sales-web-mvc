# 🧾 SaleOps

Aplicação web para gestão de departamentos, usuários e vendas. Permite:

- Consultar vendedores, departamentos e vendas
- Adicionar novos registros
- Atualizar dados existentes
- Excluir registros

O projeto foi desenvolvido usando ASP.NET Core MVC com Entity Framework Core e PostgreSQL no back-end, e React (com Vite.js) no front-end.



---

## 🚀 Tecnologias Utilizadas
Back-end:
- ASP.NET Core MVC
- Entity Framework Core
- PostgreSQL
  
Front-End:
- Next.js 15+ 
- Tailwind CSS / Shadcn UI

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
    "DefaultConnection": "Host=localhost;Port=5432;Database=seu_database;Username=seu_usuario;Password=sua_senha"
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
