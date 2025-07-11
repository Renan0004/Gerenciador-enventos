import { FormEvent, useState } from 'react';
import { Event } from '@/types';
import api from '@/lib/api';
import Modal from './Modal';

interface EventModalFormProps {
  event?: Event;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (event?: Event) => void;
}

export default function EventModalForm({ event, isOpen, onClose, onSuccess }: EventModalFormProps) {
  const [name, setName] = useState(event?.name || '');
  const [description, setDescription] = useState(event?.description || '');
  const [date, setDate] = useState(event?.date ? new Date(event.date).toISOString().slice(0, 16) : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateError, setDateError] = useState('');

  // Definir a data mínima como agora
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const validateDate = (dateString: string) => {
    const selectedDate = new Date(dateString);
    const now = new Date();

    if (selectedDate.getTime() <= now.getTime()) {
      setDateError('A data e hora do evento deve ser no futuro');
      return false;
    }
    setDateError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateDate(date)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formattedDate = new Date(date).toISOString();
      const data = { name, description, date: formattedDate };

      let updatedEvent;
      if (event?.id) {
        const response = await api.put(`/events/${event.id}`, data);
        updatedEvent = response.data;
      } else {
        const response = await api.post('/events', data);
        updatedEvent = response.data;
      }

      onSuccess(updatedEvent);
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      setError('Erro ao salvar evento. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event ? 'Editar Evento' : 'Criar Novo Evento'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
            Nome do Evento
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            placeholder="Digite o nome do evento"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-300 font-medium mb-2">
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            placeholder="Digite a descrição do evento"
            rows={4}
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-300 font-medium mb-2">
            Data do Evento
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            min={getMinDateTime()}
            onChange={(e) => {
              setDate(e.target.value);
              validateDate(e.target.value);
            }}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            required
          />
          {dateError && (
            <p className="text-red-400 text-sm mt-2">{dateError}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || !!dateError}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </>
            ) : (
              'Salvar'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
} 