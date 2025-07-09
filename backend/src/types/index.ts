export interface EventInput {
  name: string;
  description: string;
  date: Date;
}

export interface ParticipantInput {
  name: string;
  email: string;
  phone: string;
}

export interface EnrollmentInput {
  eventId: string;
  participantId: string;
} 