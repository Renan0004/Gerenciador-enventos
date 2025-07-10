import { Request, Response, NextFunction } from 'express';
import { validateUUID } from '../utils/validation';

export const validateEventId = (req: Request, res: Response, next: NextFunction) => {
  const { id, eventId } = req.params;
  const targetId = id || eventId;
  
  if (!validateUUID(targetId)) {
    return res.status(400).json({ error: 'ID do evento inválido' });
  }
  
  next();
};

export const validateParticipantId = (req: Request, res: Response, next: NextFunction) => {
  const { id, participantId } = req.params;
  const targetId = id || participantId;
  
  if (!validateUUID(targetId)) {
    return res.status(400).json({ error: 'ID do participante inválido' });
  }
  
  next();
};

export const validateIds = (req: Request, res: Response, next: NextFunction) => {
  const { id, eventId, participantId } = req.params;
  
  if (id && !validateUUID(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  
  if (eventId && !validateUUID(eventId)) {
    return res.status(400).json({ error: 'ID do evento inválido' });
  }
  
  if (participantId && !validateUUID(participantId)) {
    return res.status(400).json({ error: 'ID do participante inválido' });
  }
  
  next();
}; 