import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes';
import participantRoutes from './routes/participantRoutes';
import { errorHandler } from './middlewares/errorHandler';

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API de Gerenciamento de Eventos' });
});

// Rotas da API
app.use('/events', eventRoutes);
app.use('/participants', participantRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 