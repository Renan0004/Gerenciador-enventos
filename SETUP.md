# 📋 Guia de Setup Detalhado

Este guia fornece instruções passo a passo para configurar e executar o projeto Gerenciador de Eventos.

## 📋 Pré-requisitos

### 1. Instalar Node.js
- Baixe e instale Node.js v18+ em [nodejs.org](https://nodejs.org/)
- Verifique a instalação: `node --version`

### 2. Instalar PostgreSQL
- Baixe e instale PostgreSQL v13+ em [postgresql.org](https://www.postgresql.org/)
- Crie um banco de dados chamado `eventos_db`
- Anote as credenciais (usuário, senha, porta)

## 🔧 Configuração do Ambiente

### 1. Clone e Configure o Projeto
```bash
git clone <url-do-repositorio>
cd Gerenciador-enventos
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/`:
```env
# Configuração do Banco de Dados
DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/eventos_db"

# Porta do servidor
PORT=3001

# Ambiente de execução
NODE_ENV=development
```

⚠️ **Importante**: Substitua `suasenha` pela senha real do seu PostgreSQL.

### 4. Configurar Banco de Dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrations
npx prisma migrate dev --name init

# (Opcional) Visualizar banco de dados
npx prisma studio
```

### 5. Iniciar Backend

```bash
npm run dev
```

✅ O backend deve estar rodando em `http://localhost:3001`

### 6. Frontend Setup

Em um novo terminal:
```bash
cd frontend
npm install
```

### 7. Configurar Frontend (Opcional)

Crie um arquivo `.env.local` na pasta `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 8. Iniciar Frontend

```bash
npm run dev
```

✅ O frontend deve estar rodando em `http://localhost:3000`

## 🧪 Verificar Funcionamento

1. Acesse `http://localhost:3000`
2. Teste criar um participante
3. Teste criar um evento
4. Teste inscrever um participante em um evento

## 🐛 Solução de Problemas

### Erro de Conexão com o Banco
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Teste a conexão: `psql -U postgres -d eventos_db`

### Erro de Porta em Uso
- Backend: Altere a `PORT` no `.env`
- Frontend: Use `npm run dev -- -p 3001`

### Erro do Prisma
```bash
# Resetar banco (cuidado: apaga dados)
npx prisma migrate reset

# Regenerar cliente
npx prisma generate
```

### Erro de CORS
- Verifique se o backend está rodando
- Confirme a URL da API no frontend

## 📚 Comandos Úteis

### Backend
```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm start        # Executar build de produção
```

### Frontend
```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm start        # Executar build de produção
npm run lint     # Verificar código
```

### Prisma
```bash
npx prisma studio              # Interface visual do banco
npx prisma db push             # Aplicar mudanças sem migration
npx prisma migrate dev         # Criar nova migration
npx prisma migrate reset       # Resetar banco
``` 