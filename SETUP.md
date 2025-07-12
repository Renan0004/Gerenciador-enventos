# 🛠️ Guia de Configuração - Gerenciador de Eventos

## 📋 Pré-requisitos

- Node.js v18+
- npm ou yarn
- Git

## ⚙️ Configuração Inicial

### 1. Clone e Instalação
```bash
git clone https://github.com/seu-usuario/Gerenciador-enventos.git
cd Gerenciador-enventos
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configuração do Banco de Dados

**Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:**

#### Opção A: SQLite (Recomendado para desenvolvimento)
```env
DATABASE_URL="sqlite:./dev.db"
PORT=3001
NODE_ENV=development
```

#### Opção B: PostgreSQL
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/eventos"
PORT=3001
NODE_ENV=development
```

### 4. Executar Migrações
```bash
npx prisma migrate dev
```

### 5. Frontend Setup

```bash
cd ../frontend
npm install
```

**Crie um arquivo `.env.local` na pasta `frontend` (opcional):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Executando o Projeto

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:3001

## 📊 Estrutura do Banco de Dados

### Tabelas Criadas:
- **Evento**: id, name, description, date, createdAt, updatedAt
- **Participante**: id, name, email, phone, createdAt, updatedAt  
- **Inscricao**: id, eventId, participantId, createdAt

### Relacionamentos:
- Um Evento pode ter múltiplas Inscrições
- Um Participante pode ter múltiplas Inscrições
- Inscrição conecta Evento e Participante (N:N)

## 🔧 Scripts Úteis

### Backend
```bash
npm run dev          # Desenvolvimento
npm run build        # Build
npm run start        # Produção
npx prisma studio    # Interface visual do banco
npx prisma generate  # Gerar cliente Prisma
```

### Frontend
```bash
npm run dev          # Desenvolvimento
npm run build        # Build
npm run start        # Produção
```

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
- Verifique se o arquivo `.env` existe na pasta `backend`
- Confirme se a `DATABASE_URL` está correta
- Para SQLite, certifique-se de que a pasta tem permissões de escrita

### Erro de Porta em Uso
- Altere a porta no arquivo `.env` (ex: PORT=3002)
- Verifique se não há outros serviços rodando na porta

### Erro de Migração
```bash
# Reset completo do banco
npx prisma migrate reset
npx prisma migrate dev
```

## 📝 Notas Importantes

- O projeto usa SQLite por padrão para facilitar o desenvolvimento
- Para produção, recomenda-se PostgreSQL
- Todas as validações são feitas no backend
- O frontend usa Context API para gerenciamento de estado
- Interface responsiva com Tailwind CSS 