import { useState, useEffect, useCallback } from 'react';
import { Participant, Event } from '@/types';
import Modal from './Modal';

interface ParticipantDetailModalProps {
  participantId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ParticipantDetailModal({ participantId, isOpen, onClose }: ParticipantDetailModalProps) {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadParticipantData = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const [participantData, eventsData] = await Promise.all([
        getParticipant(id),
        getParticipantEvents(id)
      ]);
      
      setParticipant(participantData);
      setEvents(eventsData);
    } catch (e) {
      setError('Não foi possível carregar os dados do participante.');
      console.error('Erro ao buscar dados do participante:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && participantId) {
      loadParticipantData(participantId);
    }
  }, [isOpen, participantId, loadParticipantData]);

  async function getParticipant(id: string): Promise<Participant> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/participants/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Falha ao carregar participante');
    }
    
    return res.json();
  }

  async function getParticipantEvents(id: string): Promise<Event[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/participants/${id}/events`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Falha ao carregar eventos');
    }
    
    return res.json();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={participant?.name || "Detalhes do Participante"}
      size="lg"
    >
      {loading ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-300">Carregando participante...</h3>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-8 backdrop-blur-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      ) : participant ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-gray-500/20 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{participant.name}</h2>
              <div className="flex items-center text-gray-400 mt-1">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                {participant.email}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-300 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Eventos Inscritos
            </h2>
            
            {events.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <p className="text-gray-400">Não está inscrito em nenhum evento</p>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <div className="space-y-0">
                  {events.map((event, index) => (
                    <div key={event.id} className={`p-4 hover:bg-white/10 transition-all duration-300 group ${index !== events.length - 1 ? 'border-b border-white/10' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {event.name}
                          </div>
                          <div className="text-sm text-gray-400 flex items-center mt-1">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(event.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
} 