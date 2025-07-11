# 🎉 Gerenciador de Eventos

Sistema fullstack para gerenciamento de eventos e participantes, permitindo criar eventos, cadastrar participantes e gerenciar inscrições.

## 🚀 Tecnologias

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

## ⚙️ Como Iniciar

### 1. Pré-requisitos
- Node.js v18+
- PostgreSQL v13+
- npm ou yarn

### 2. Instalação

```bash
# Clone o repositório
git clone https://github.com/Renan0004/Gerenciador-enventos.git
cd Gerenciador-enventos

# Configure o Backend
cd backend
npm install

# Configure o banco de dados (.env)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eventos"
PORT=3001

# Prepare o banco de dados
npx prisma generate
npx prisma migrate dev

# Inicie o servidor
npm run dev

# Em outro terminal, configure o Frontend
cd ../frontend
npm install
npm run dev
```

## 🌐 Acesso
- Interface: http://localhost:3000
- API: http://localhost:3001

## 🔄 Principais Rotas

### Eventos
- Criar eventos (nome, descrição, data)
- Listar todos os eventos
- Ver detalhes e participantes
- Gerenciar inscrições

### Participantes
- Cadastrar participantes (nome, email, telefone)
- Visualizar lista completa
- Inscrever em eventos 