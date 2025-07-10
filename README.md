# 🎉 Gerenciador de Eventos

Sistema fullstack para gerenciamento de eventos e participantes desenvolvido como parte de um teste técnico.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** com **TypeScript**
- **Express.js** para API REST
- **Prisma** como ORM
- **PostgreSQL** como banco de dados

### Frontend
- **React** com **TypeScript**
- **Next.js** para framework
- **Tailwind CSS** para estilização
- **Context API** para gerenciamento de estado

## 📁 Estrutura do Projeto

## 🛠️ Tecnologias Utilizadas

## 🔧 Pré-requisitos

- **Node.js** v18 ou superior
- **PostgreSQL** v13 ou superior
- **npm** ou **yarn**

## 🚀 Configuração e Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd Gerenciador-enventos
```

### 2. Configuração do Backend

```bash
# Navegue para a pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env baseado no .env.example
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/eventos_db"
PORT=3001
NODE_ENV=development
```

```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrations
npx prisma migrate dev --name init

# Inicie o servidor
npm run dev
```

O backend estará rodando em `http://localhost:3001`

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

### 3. Configuração do Frontend

```bash
# Em um novo terminal, navegue para a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente (opcional)
# Crie um arquivo .env.local baseado no .env.example
cp .env.example .env.local
```

Edite o arquivo `.env.local` se necessário:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## 🧪 Testando a Aplicação

1. Acesse `http://localhost:3000`
2. Navegue para "Participantes" e crie alguns participantes
3. Navegue para "Eventos" e crie alguns eventos
4. Acesse os detalhes de um evento e inscreva participantes

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