import { Router } from 'express';
import { participantController } from '../controllers/participantController';

const router = Router();

// Criar um participante
router.post('/', participantController.createParticipant);

// Obter todos os participantes
router.get('/', participantController.getAllParticipants);

// Obter um participante específico
router.get('/:id', participantController.getParticipantById);

// Obter eventos de um participante
router.get('/:id/events', participantController.getParticipantEvents);

export default router; 