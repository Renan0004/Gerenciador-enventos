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

  // Verificar se email já existe
  checkEmail: async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      
      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      const participant = await participantService.getParticipantByEmail(email);
      return res.json({ exists: !!participant });
    } catch (error) {
      console.error('Erro ao verificar email:', error);
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
  },

  // Atualizar um participante
  updateParticipant: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
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

      // Verificar se o participante existe
      const existingParticipant = await participantService.getParticipantById(id);
      if (!existingParticipant) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }

      // Verificar se o novo email já está em uso por outro participante
      if (email !== existingParticipant.email) {
        const participantWithEmail = await participantService.getParticipantByEmail(email);
        if (participantWithEmail && participantWithEmail.id !== id) {
          return res.status(409).json({ error: 'Email já está em uso por outro participante' });
        }
      }

      const participant = await participantService.updateParticipant(id, {
        name,
        email,
        phone
      });

      return res.json(participant);
    } catch (error) {
      console.error('Erro ao atualizar participante:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Excluir um participante
  deleteParticipant: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Verificar se o participante existe
      const participant = await participantService.getParticipantById(id);
      if (!participant) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }

      await participantService.deleteParticipant(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir participante:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}; 