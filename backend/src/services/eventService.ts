import prisma from '../utils/prismaClient';
import { EventInput } from '../types';

export const eventService = {
  // Criar um novo evento
  createEvent: async (data: EventInput) => {
    return prisma.event.create({
      data
    });
  },

  // Obter todos os eventos
  getAllEvents: async () => {
    return prisma.event.findMany({
      orderBy: {
        date: 'asc'
      }
    });
  },

  // Obter um evento pelo ID
  getEventById: async (id: string) => {
    return prisma.event.findUnique({
      where: { id }
    });
  },

  // Obter participantes de um evento
  getEventParticipants: async (eventId: string) => {
    return prisma.enrollment.findMany({
      where: { eventId },
      include: {
        participant: true
      }
    });
  },

  // Adicionar um participante a um evento
  addParticipantToEvent: async (eventId: string, participantId: string) => {
    return prisma.enrollment.create({
      data: {
        eventId,
        participantId
      },
      include: {
        event: true,
        participant: true
      }
    });
  }
}; 