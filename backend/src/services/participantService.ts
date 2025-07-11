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
  },

  // Atualizar um participante
  updateParticipant: async (id: string, data: ParticipantInput) => {
    return prisma.participant.update({
      where: { id },
      data
    });
  },

  // Excluir um participante
  deleteParticipant: async (id: string) => {
    // Primeiro excluir todas as inscrições relacionadas
    await prisma.enrollment.deleteMany({
      where: { participantId: id }
    });

    // Depois excluir o participante
    return prisma.participant.delete({
      where: { id }
    });
  }
}; 