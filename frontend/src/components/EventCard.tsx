import { useState } from 'react';
import { Event } from '@/types';
import EventDetailModal from './EventDetailModal';
import EnrollmentModalForm from './EnrollmentModalForm';
import Modal from './Modal';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
  
  // Formatar a data do evento
  const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
        </div>
        
        <h3 className="text-xl font-bold text-white mt-4 line-clamp-1">{event.name}</h3>
        
        <div className="flex items-center mt-3 text-gray-400 text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedDate}
        </div>
        
        <p className="mt-4 text-gray-300 line-clamp-2">
          {event.description}
        </p>
        
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setIsDetailsModalOpen(true)}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300"
          >
            Ver Detalhes
          </button>
          <button
            onClick={() => setIsEnrollmentModalOpen(true)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Inscrever-se
          </button>
        </div>
      </div>

      {/* Modal de detalhes do evento */}
      <EventDetailModal
        eventId={event.id}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* Modal para inscrever participante */}
      <Modal 
        isOpen={isEnrollmentModalOpen}
        onClose={() => setIsEnrollmentModalOpen(false)}
        title="Inscrever Participante no Evento"
        size="md"
      >
        <EnrollmentModalForm 
          eventId={event.id}
          onSuccess={() => setIsEnrollmentModalOpen(false)}
          onClose={() => setIsEnrollmentModalOpen(false)}
        />
      </Modal>
    </>
  );
} 