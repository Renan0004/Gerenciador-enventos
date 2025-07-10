import { FormEvent, useState } from 'react';
import api from '@/lib/api';

interface EventModalFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function EventModalForm({ onSuccess, onClose }: EventModalFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Formatar a data para o formato ISO
      const formattedDate = new Date(date).toISOString();

      await api.post('/events', {
        name,
        description,
        date: formattedDate
      });

      // Limpar o formulário
      setName('');
      setDescription('');
      setDate('');

      // Chamar callback de sucesso
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      setError('Erro ao criar evento. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label htmlFor="modal-name" className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">
            Nome do Evento
          </label>
          <input
            type="text"
            id="modal-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-sm sm:text-base"
            placeholder="Digite o nome do evento"
            required
          />
        </div>

        <div>
          <label htmlFor="modal-description" className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">
            Descrição
          </label>
          <textarea
            id="modal-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none text-sm sm:text-base"
            rows={4}
            placeholder="Descreva o evento"
            required
          />
        </div>

        <div>
          <label htmlFor="modal-date" className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">
            Data e Hora
          </label>
          <input
            type="datetime-local"
            id="modal-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-all duration-300 text-sm sm:text-base"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Criando...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Criar Evento
            </>
          )}
        </button>
      </div>
    </form>
  );
} 