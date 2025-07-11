import { Router } from 'express';
import { eventController } from '../controllers/eventController';

const router = Router();

// Criar um evento
router.post('/', eventController.createEvent);

// Obter todos os eventos
router.get('/', eventController.getAllEvents);

// Obter um evento específico
router.get('/:id', eventController.getEventById);

// Atualizar um evento
router.put('/:id', eventController.updateEvent);

// Excluir um evento
router.delete('/:id', eventController.deleteEvent);

// Obter participantes de um evento
router.get('/:eventId/participants', eventController.getEventParticipants);

// Adicionar um participante a um evento
router.post('/:eventId/participants', eventController.addParticipantToEvent);

// Remover um participante de um evento
router.delete('/:eventId/participants/:participantId', eventController.removeParticipantFromEvent);

export default router; 