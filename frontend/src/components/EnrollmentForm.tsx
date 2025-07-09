import { FormEvent, useState, useEffect } from 'react';
import api from '@/lib/api';
import { Participant } from '@/types';

interface EnrollmentFormProps {
  eventId: string;
  onSuccess?: () => void;
}

export default function EnrollmentForm({ eventId, onSuccess }: EnrollmentFormProps) {
  const [participantId, setParticipantId] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await api.get('/participants');
        setParticipants(response.data);
      } catch (error) {
        console.error('Erro ao buscar participantes:', error);
        setError('Não foi possível carregar a lista de participantes.');
      }
    };

    fetchParticipants();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post(`/events/${eventId}/participants`, { participantId });
      
      setSuccess('Participante inscrito com sucesso!');
      setParticipantId('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Erro ao inscrever participante:', error);
      if (error.response?.status === 409) {
        setError('Este participante já está inscrito neste evento.');
      } else {
        setError('Erro ao inscrever participante. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Inscrever Participante</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="participantId" className="block text-gray-700 font-medium mb-2">
          Selecione o Participante
        </label>
        <select
          id="participantId"
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Selecione um participante</option>
          {participants.map((participant) => (
            <option key={participant.id} value={participant.id}>
              {participant.name} ({participant.email})
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || !participantId}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-purple-300"
      >
        {loading ? 'Inscrevendo...' : 'Inscrever no Evento'}
      </button>
    </form>
  );
} 