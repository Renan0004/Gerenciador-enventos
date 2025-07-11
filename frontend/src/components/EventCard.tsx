import { useState } from 'react';
import { Event } from '@/types';
import EventDetailModal from './EventDetailModal';
import EventModalForm from './EventModalForm';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event: initialEvent }: EventCardProps) {
  const router = useRouter();
  const [event, setEvent] = useState(initialEvent);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Formatar a data do evento
  const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleEventUpdated = (updatedEvent: Event | undefined) => {
    if (!updatedEvent) return;
    setEvent(updatedEvent);
    setIsEditModalOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!window.confirm(`Tem certeza que deseja excluir o evento "${event.name}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete(`/events/${event.id}`);
      alert(`Evento "${event.name}" excluído com sucesso!`);
      router.refresh();
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      alert('Erro ao excluir evento. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-all duration-200"
              title="Editar evento"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50"
              title="Excluir evento"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
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
        
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => setIsDetailsModalOpen(true)}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300"
          >
            Ver Detalhes
          </button>
          <button
            onClick={() => setIsDetailsModalOpen(true)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300"
          >
            Inscrever-se
          </button>
        </div>
      </div>

      {/* Modal de detalhes */}
      <EventDetailModal
        eventId={event.id}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* Modal de edição */}
      <EventModalForm
        event={event}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEventUpdated}
      />
    </>
  );
} 