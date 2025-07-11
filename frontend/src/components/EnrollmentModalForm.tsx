'use client';

import { useState, useEffect } from 'react';
import { Participant } from '@/types';

interface EnrollmentModalFormProps {
  eventId: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function EnrollmentModalForm({ eventId, onSuccess, onClose }: EnrollmentModalFormProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/participants`);
        
        if (!res.ok) {
          throw new Error('Falha ao carregar participantes');
        }
        
        const data = await res.json();
        setParticipants(data);
      } catch (e) {
        setError('Erro ao carregar participantes. Tente novamente.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedParticipant) {
      setError('Selecione um participante');
      return;
    }
    
    try {
      setError(null);
      setSuccess(null);
      setSubmitting(true);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/events/${eventId}/participants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participantId: selectedParticipant }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Erro ao inscrever participante');
      }
      
      setSuccess('Participante inscrito com sucesso!');
      
      // Limpa o formulário
      setSelectedParticipant('');
      
      // Espera um pouco para mostrar a mensagem de sucesso antes de fechar o modal
      setTimeout(() => {
        onSuccess();
      }, 1500);
      
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Erro ao inscrever participante';
      setError(errorMessage);
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg className="w-full h-full text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-400">Carregando participantes...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}
          
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {success}
              </div>
            </div>
          )}
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Selecione um participante</label>
            {participants.length === 0 ? (
              <div className="text-center py-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-400">Nenhum participante disponível</p>
              </div>
            ) : (
              <select
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all [&>option]:bg-slate-800 [&>option]:text-white"
                value={selectedParticipant}
                onChange={(e) => setSelectedParticipant(e.target.value)}
                disabled={submitting}
                style={{ color: 'white' }}
              >
                <option value="" style={{ backgroundColor: '#1e293b', color: 'white' }}>Selecione...</option>
                {participants.map((participant) => (
                  <option 
                    key={participant.id} 
                    value={participant.id} 
                    style={{ backgroundColor: '#1e293b', color: 'white' }}
                  >
                    {participant.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300"
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center"
              disabled={submitting || participants.length === 0}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Inscrevendo...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Inscrever
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 