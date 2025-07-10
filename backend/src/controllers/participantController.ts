import { Request, Response } from 'express';
import { participantService } from '../services/participantService';
import { validateEmail, validatePhone, validateUUID } from '../utils/validation';

export const participantController = {
  // Criar um novo participante
  createParticipant: async (req: Request, res: Response) => {
    try {
      const { name, email, phone } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Verificar se o email é válido
      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      // Verificar se o telefone é válido
      if (!validatePhone(phone)) {
        return res.status(400).json({ error: 'Telefone inválido. O telefone deve conter 10 ou 11 dígitos.' });
      }

      // Verificar se já existe um participante com este email
      const existingParticipant = await participantService.getParticipantByEmail(email);
      if (existingParticipant) {
        return res.status(409).json({ error: 'Email já cadastrado' });
      }

      const participant = await participantService.createParticipant({
        name,
        email,
        phone
      });

      return res.status(201).json(participant);
    } catch (error) {
      console.error('Erro ao criar participante:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Obter todos os participantes
  getAllParticipants: async (req: Request, res: Response) => {
    try {
      const participants = await participantService.getAllParticipants();
      return res.json(participants);
    } catch (error) {
      console.error('Erro ao buscar participantes:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Obter um participante pelo ID
  getParticipantById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const participant = await participantService.getParticipantById(id);

      if (!participant) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }

      return res.json(participant);
    } catch (error) {
      console.error('Erro ao buscar participante:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Obter eventos de um participante
  getParticipantEvents: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Verificar se o participante existe
      const participant = await participantService.getParticipantById(id);
      if (!participant) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }

      const enrollments = await participantService.getParticipantEvents(id);
      
      // Extrair apenas os dados dos eventos
      const events = enrollments.map(enrollment => enrollment.event);
      
      return res.json(events);
    } catch (error) {
      console.error('Erro ao buscar eventos do participante:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}; 