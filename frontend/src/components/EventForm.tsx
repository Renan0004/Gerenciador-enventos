import { FormEvent, useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function EventForm() {
  const router = useRouter();
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

      // Redirecionar para a página de eventos
      router.push('/events');
      router.refresh();
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      setError('Erro ao criar evento. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Criar Novo Evento</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Nome do Evento
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Descrição
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
          Data e Hora
        </label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-blue-300"
      >
        {loading ? 'Criando...' : 'Criar Evento'}
      </button>
    </form>
  );
} 