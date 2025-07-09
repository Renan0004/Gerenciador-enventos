# Gerenciador de Eventos

Sistema de gerenciamento de eventos e participantes desenvolvido com Node.js, TypeScript, Express, Prisma e PostgreSQL no backend, e React, TypeScript, Next.js e Tailwind CSS no frontend.

## Estrutura do Projeto

O projeto está dividido em duas partes:

- `backend`: API REST desenvolvida com Node.js, TypeScript, Express e Prisma
- `frontend`: Interface de usuário desenvolvida com React, TypeScript, Next.js e Tailwind CSS

## Requisitos

- Node.js v18 ou superior
- PostgreSQL
- NPM ou Yarn

## Configuração do Backend

1. Navegue até a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com suas variáveis de ambiente:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eventos_db"
PORT=3001
```

4. Execute as migrations do Prisma para criar o banco de dados:

```bash
npx prisma migrate dev --name init
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## API Endpoints

### Eventos

- `POST /events` - Criar um evento
- `GET /events` - Listar todos os eventos
- `GET /events/:id` - Obter detalhes de um evento
- `GET /events/:eventId/participants` - Listar participantes de um evento
- `POST /events/:eventId/participants` - Inscrever um participante em um evento

### Participantes

- `POST /participants` - Criar um participante
- `GET /participants` - Listar todos os participantes
- `GET /participants/:id` - Obter detalhes de um participante
- `GET /participants/:id/events` - Listar eventos de um participante

## Configuração do Frontend

1. Navegue até a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:3000`

## Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL

### Frontend
- React
- TypeScript
- Next.js
- Tailwind CSS 