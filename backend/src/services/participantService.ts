import prisma from '../utils/prismaClient';
import { ParticipantInput } from '../types';

export const participantService = {
  // Criar um novo participante
  createParticipant: async (data: ParticipantInput) => {
    return prisma.participant.create({
      data
    });
  },

  // Obter todos os participantes
  getAllParticipants: async () => {
    return prisma.participant.findMany();
  },

  // Obter um participante pelo ID
  getParticipantById: async (id: string) => {
    return prisma.participant.findUnique({
      where: { id }
    });
  },

  // Obter um participante pelo email
  getParticipantByEmail: async (email: string) => {
    return prisma.participant.findUnique({
      where: { email }
    });
  },

  // Obter eventos de um participante
  getParticipantEvents: async (participantId: string) => {
    return prisma.enrollment.findMany({
      where: { participantId },
      include: {
        event: true
      }
    });
  }
}; 