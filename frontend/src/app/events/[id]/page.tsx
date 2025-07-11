'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';
import EnrollmentModalForm from '@/components/EnrollmentModalForm';
import { Event, Participant } from '@/types';

// Função para buscar evento
async function getEvent(id: string): Promise<Event> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/events/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Falha ao carregar evento');
  }
  
  return res.json();
}

// Função para buscar participantes de um evento
async function getEventParticipants(id: string): Promise<Participant[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/events/${id}/participants`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Falha ao carregar participantes');
  }
  
  return res.json();
}
// Página de detalhes do evento
export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>('');
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      const eventId = resolvedParams.id;
      setId(eventId);
      
      await loadEventData(eventId);
    };

    initializePage();
  }, [params]);

  // Função para carregar dados do evento e participantes
  const loadEventData = async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const [eventData, participantsData] = await Promise.all([
        getEvent(eventId),
        getEventParticipants(eventId)
      ]);
      
      setEvent(eventData);
      setParticipants(participantsData);
    } catch (e) {
      setError('Não foi possível carregar os dados do evento. Tente novamente mais tarde.');
      console.error('Erro ao buscar dados do evento:', e);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o sucesso da inscrição
  const handleEnrollmentSuccess = () => {
    setIsModalOpen(false);
    loadEventData(id);
  };
  
  // Função para formatar a data do evento
  const formattedDate = event 
    ? new Date(event.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/events" 
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Eventos
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-12 sm:py-20">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-300">Carregando evento...</h3>
            <p className="text-gray-500 text-sm sm:text-base px-4">Aguarde um momento</p>
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
        ) : null}
        
        {!loading && !error && event && (
          <>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-8 shadow-2xl">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-gray-500/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-gray-300 bg-clip-text text-transparent">
                  {event.name}
                </h1>
                
                <div className="flex items-center text-gray-400 mb-6">
                  <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Data:</span> 
                  <span className="ml-2">{formattedDate}</span>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h2 className="text-xl font-semibold mb-4 text-gray-300 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Descrição
                  </h2>
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent flex items-center">
                  <svg className="w-8 h-8 mr-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2h5m10 0h-5v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2h5" />
                    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  Participantes
                </h2>
                
                {participants.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2h5m10 0h-5v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2h5" />
                        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-300">Nenhum participante inscrito</h3>
                    <p className="text-gray-400">Use o formulário ao lado para inscrever participantes</p>
                  </div>
                ) : (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                    <div className="space-y-0">
                      {participants.map((participant, index) => (
                        <div key={participant.id} className={`p-6 hover:bg-white/10 transition-all duration-300 group ${index !== participants.length - 1 ? 'border-b border-white/10' : ''}`}>
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                                {participant.name}
                              </div>
                              <div className="text-sm text-gray-400 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                {participant.email}
                              </div>
                            </div>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-gray-300 bg-clip-text text-transparent flex items-center">
                  <svg className="w-8 h-8 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Inscrever Participante
                </h2>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-300">Adicionar Participante</h3>
                    <p className="text-gray-400 mb-6">Selecione um participante para inscrever neste evento</p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      disabled={loading}
                      className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mx-auto"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      {loading ? 'Carregando...' : 'Inscrever Participante'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal para inscrever participante */}
        <Modal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Inscrever Participante no Evento"
          size="md"
        >
          <EnrollmentModalForm 
            eventId={id}
            onSuccess={handleEnrollmentSuccess}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
} 