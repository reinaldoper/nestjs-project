# 🧠 NestJS API - Users & Posts

Este projeto é uma API RESTful desenvolvida com [NestJS](https://nestjs.com/), utilizando [Prisma ORM](https://www.prisma.io/) para acesso ao banco de dados, e validações com [Zod](https://zod.dev/).

## 🛠️ Tecnologias

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Zod](https://zod.dev/) – para validação de entrada
- [TypeScript](https://www.typescriptlang.org/)
- Banco de dados: SQLite

---

## 📁 Estrutura do Projeto

```bash
├── package.json
├── package-lock.json
├── prisma
│   ├── dev.db
│   ├── dev.db-journal
│   ├── migrations
│   │   ├── 20250601182947_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── README.md
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── posts
│   │   ├── posts.controller.ts
│   │   ├── posts.module.ts
│   │   ├── posts.service.ts
│   │   └── schema.validate.ts
│   └── users
│       ├── schema.validate.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       └── users.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```
🔐 AuthController
🔹 POST /auth/login
🔹 Cria e retorna um token de autenticação JWT para o usuário.

Body:

```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

🚀 Endpoints
🔹 Users

| Método | Rota         | Descrição                |
| ------ | ------------ | ------------------------ |
| POST   | `/users`     | Criar um novo usuário    |
| GET    | `/users`     | Listar todos os usuários |
| GET    | `/users/:id` | Buscar um usuário por ID |
| PUT    | `/users/:id` | Atualizar usuário por ID |
| DELETE | `/users/:id` | Remover usuário por ID   |

🔹 Posts

| Método | Rota                    | Descrição                   |
| ------ | ----------------------- | --------------------------- |
| POST   | `/posts`                | Criar um novo post          |
| GET   | `/posts/user/:authorId` | Buscar posts por autor (ID) |
| GET   | `/posts/all`            | Listar todos os posts       |
| GET   | `/posts/:id`            | Buscar um post por ID       |
| PUT   | `/posts/:id/update`     | Atualizar um post           |
| DELETE   | `/posts/:id/delete`     | Deletar um post             |


🧪 Validação com Zod
- As entradas dos endpoints são validadas usando Zod via safeParse, com schemas definidos em schema.validate.ts.

⚙️ Configuração
1. Clonar o repositório

```bash
git clone https://github.com/reinaldoper/nestjs-project.git
cd nestjs-project
```
2. Instalar dependências

```bash
npm install
```

3. Configurar o banco de dados
Edite o arquivo .env com a URL do seu banco de dados: DATABASE_URL="file:./dev.db"

4. Rodar as migrations:

```bash
npx prisma migrate dev --name init
```

5. Iniciar a aplicação:

```bash
npm run start:dev

```

📦 Scripts úteis:

| Comando                  | Descrição                          |
| ------------------------ | ---------------------------------- |
| `npm run start:dev`      | Inicia o servidor em modo dev      |
| `npx prisma studio`      | Abre a interface gráfica do Prisma |
| `npx prisma migrate dev` | Executa as migrations              |
| `npx prisma generate`    | Gera o client do Prisma            |


📌 Requisitos:
- Node.js 20+

- SQLite ou outro banco compatível com Prisma

- Yarn ou npm


🙋‍♂️ Autor
Desenvolvido por Reinaldo Pereira dos Santos
📍 Dourados - MS
📧 reinaldoper83@gmail.com