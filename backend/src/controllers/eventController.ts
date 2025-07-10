import { Request, Response } from 'express';
import { eventService } from '../services/eventService';
import { participantService } from '../services/participantService';
import { validateUUID } from '../utils/validation';

export const eventController = {
  // Criar um novo evento
  createEvent: async (req: Request, res: Response) => {
    try {
      const { name, description, date } = req.body;

      if (!name || !description || !date) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const eventDate = new Date(date);
      
      if (isNaN(eventDate.getTime())) {
        return res.status(400).json({ error: 'Data inválida' });
      }

      const event = await eventService.createEvent({
        name,
        description,
        date: eventDate
      });

      return res.status(201).json(event);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Obter todos os eventos
  getAllEvents: async (req: Request, res: Response) => {
    try {
      const events = await eventService.getAllEvents();
      return res.json(events);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Obter um evento pelo ID
  getEventById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!validateUUID(id)) {
        return res.status(400).json({ error: 'ID do evento inválido' });
      }
      
      const event = await eventService.getEventById(id);

      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      return res.json(event);
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Obter participantes de um evento
  getEventParticipants: async (req: Request, res: Response) => {
    try {
      const { eventId } = req.params;
      
      // Verificar se o evento existe
      const event = await eventService.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      const enrollments = await eventService.getEventParticipants(eventId);
      
      // Extrair apenas os dados dos participantes
      const participants = enrollments.map(enrollment => enrollment.participant);
      
      return res.json(participants);
    } catch (error) {
      console.error('Erro ao buscar participantes do evento:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Adicionar um participante a um evento
  addParticipantToEvent: async (req: Request, res: Response) => {
    try {
      const { eventId } = req.params;
      const { participantId } = req.body;

      if (!participantId) {
        return res.status(400).json({ error: 'ID do participante é obrigatório' });
      }

      // Verificar se o evento existe
      const event = await eventService.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      // Verificar se o participante existe
      const participant = await participantService.getParticipantById(participantId);
      if (!participant) {
        return res.status(404).json({ error: 'Participante não encontrado' });
      }

      try {
        const enrollment = await eventService.addParticipantToEvent(eventId, participantId);
        return res.status(201).json(enrollment);
      } catch (error) {
        // Verificar se é um erro de duplicação
        if (error instanceof Error && error.message.includes('Unique constraint')) {
          return res.status(409).json({ error: 'Participante já está inscrito neste evento' });
        }
        throw error;
      }
    } catch (error) {
      console.error('Erro ao adicionar participante ao evento:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}; 