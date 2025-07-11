import { Router } from 'express';
import { participantController } from '../controllers/participantController';

const router = Router();

// Criar um participante
router.post('/', participantController.createParticipant);

// Obter todos os participantes
router.get('/', participantController.getAllParticipants);

// Verificar se email já existe
router.get('/check-email/:email', participantController.checkEmail);

// Obter um participante específico
router.get('/:id', participantController.getParticipantById);

// Atualizar um participante
router.put('/:id', participantController.updateParticipant);

// Excluir um participante
router.delete('/:id', participantController.deleteParticipant);

// Obter eventos de um participante
router.get('/:id/events', participantController.getParticipantEvents);

export default router; 