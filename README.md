# 🎉 Gerenciador de Eventos - Teste Fullstack

Aplicação fullstack para gerenciamento de eventos e participantes, desenvolvida como teste técnico com foco em boas práticas de código e familiaridade com a stack.

## 🧭 Objetivo

Desenvolver uma aplicação fullstack simples para gerenciar eventos e participantes, avaliando familiaridade com a stack e boas práticas de código.

## ✨ Funcionalidades Implementadas

### 📌 Backend (Node.js + TypeScript + SQLite/PostgreSQL)

**API REST com as seguintes rotas:**

#### Eventos
- `POST /events` - Cadastrar um evento (nome, descrição, data)
- `GET /events` - Listar todos os eventos
- `GET /events/:id` - Obter detalhes de um evento
- `PUT /events/:id` - Atualizar um evento
- `DELETE /events/:id` - Excluir um evento

#### Participantes
- `POST /participants` - Cadastrar um participante (nome, email, telefone)
- `GET /participants` - Listar todos os participantes
- `GET /participants/:id` - Obter detalhes de um participante
- `PUT /participants/:id` - Atualizar um participante
- `DELETE /participants/:id` - Excluir um participante

#### Inscrições
- `POST /events/:eventId/participants` - Inscrever um participante em um evento
- `GET /events/:eventId/participants` - Listar participantes de um evento
- `DELETE /events/:eventId/participants/:participantId` - Remover participante de um evento

### 📌 Frontend (React + TypeScript + Next.js)

- **Página de listagem de eventos** - Visualizar todos os eventos cadastrados
- **Página de detalhes de evento** - Ver informações completas e participantes inscritos
- **Formulários para criação** - Criar eventos e cadastrar participantes
- **Sistema de inscrições** - Inscrever participantes em eventos
- **Interface responsiva** - Design moderno com Tailwind CSS

## 🚀 Stack Tecnológica

### Backend
- **Node.js** com **TypeScript**
- **Express.js** para API REST
- **Prisma** como ORM
- **SQLite** para desenvolvimento (configurável para PostgreSQL)
- **Validações** com middlewares customizados
- **Tratamento de erros** centralizado

### Frontend
- **React** com **TypeScript**
- **Next.js** como framework
- **Tailwind CSS** para estilização
- **Context API** para gerenciamento de estado
- **Hooks customizados** para requisições API
- **Componentes reutilizáveis**

## 🏗️ Estrutura do Projeto

```
Gerenciador-enventos/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── middlewares/     # Middlewares de validação e erro
│   │   ├── routes/          # Definição das rotas
│   │   ├── services/        # Lógica de negócio
│   │   ├── types/           # Tipos TypeScript
│   │   ├── utils/           # Utilitários e configurações
│   │   └── server.ts        # Servidor Express
│   ├── prisma/
│   │   ├── schema.prisma    # Schema do banco de dados
│   │   └── migrations/      # Migrações do banco
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/             # Páginas Next.js
│   │   ├── components/      # Componentes React
│   │   ├── contexts/        # Context API
│   │   ├── hooks/           # Hooks customizados
│   │   ├── lib/             # Configurações e utilitários
│   │   └── types/           # Tipos TypeScript
│   └── package.json
└── README.md
```

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js v18+
- npm ou yarn
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/Gerenciador-enventos.git
cd Gerenciador-enventos
```

### 2. Configure o Backend
```bash
cd backend
npm install
```

### 3. Configure o banco de dados

**Opção A: SQLite (Recomendado para desenvolvimento)**
```bash
# O banco SQLite será criado automaticamente
npx prisma migrate dev
```

**Opção B: PostgreSQL**
```bash
# Crie um arquivo .env na pasta backend
DATABASE_URL="postgresql://usuario:senha@localhost:5432/eventos"
PORT=3001

# Execute as migrações
npx prisma migrate dev
```

### 4. Inicie o servidor backend
```bash
npm run dev
```

### 5. Configure o Frontend
```bash
# Em outro terminal
cd ../frontend
npm install
npm run dev
```

## 🌐 Acesso à Aplicação

- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:3001

## 📋 Exemplos de Uso da API

### Criar um evento
```bash
curl -X POST http://localhost:3001/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Workshop de React",
    "description": "Aprenda React do zero",
    "date": "2024-01-15T14:00:00Z"
  }'
```

### Cadastrar um participante
```bash
curl -X POST http://localhost:3001/participants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999"
  }'
```

### Inscrever participante em evento
```bash
curl -X POST http://localhost:3001/events/event-id/participants \
  -H "Content-Type: application/json" \
  -d '{
    "participantId": "participant-id"
  }'
```

## 🎯 Características de Qualidade

### ✅ Organização e Estrutura
- Separação clara de responsabilidades (MVC)
- Estrutura de pastas organizada e intuitiva
- Nomenclatura consistente e descritiva

### ✅ TypeScript
- Tipagem completa em todo o projeto
- Interfaces bem definidas
- Uso correto de tipos genéricos

### ✅ Boas Práticas
- Middlewares para validação e tratamento de erros
- Validação de dados de entrada
- Tratamento centralizado de exceções
- Código limpo e legível

### ✅ Frontend
- Componentes reutilizáveis
- Context API para gerenciamento de estado
- Hooks customizados para lógica de negócio
- Interface responsiva e moderna

## 🚫 Restrições Respeitadas

- ✅ Não utilizou geradores de código prontos
- ✅ Não usou bibliotecas de UI como Material UI ou Bootstrap
- ✅ Utilizou apenas Tailwind CSS para estilização
- ✅ Implementação manual de todas as funcionalidades

## 📦 Scripts Disponíveis

### Backend
```bash
npm run dev          # Inicia servidor em modo desenvolvimento
npm run build        # Compila TypeScript
npm run start        # Inicia servidor em produção
```

### Frontend
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
```

## 🔧 Configurações Adicionais

### Variáveis de Ambiente (Backend)
```env
DATABASE_URL="sqlite:./dev.db"    # Para SQLite
# ou
DATABASE_URL="postgresql://..."   # Para PostgreSQL
PORT=3001
NODE_ENV=development
```

### Variáveis de Ambiente (Frontend)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📝 Licença

Este projeto foi desenvolvido como teste técnico.

---

**Desenvolvido com ❤️ usando TypeScript, React, Next.js e Express** 