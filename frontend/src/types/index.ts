export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  eventId: string;
  participantId: string;
  createdAt: string;
  event?: Event;
  participant?: Participant;
} 