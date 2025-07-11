import { FormEvent, useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function EventForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateError, setDateError] = useState('');
  const [capacityError, setCapacityError] = useState('');

  // Definir a data mínima como agora
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const validateDate = (dateString: string) => {
    const selectedDate = new Date(dateString);
    const now = new Date();
    
    // Comparar com a data/hora atual
    if (selectedDate.getTime() <= now.getTime()) {
      setDateError('A data e hora do evento deve ser no futuro');
      return false;
    }
    setDateError('');
    return true;
  };

  const validateCapacity = (value: string) => {
    const num = parseInt(value);
    if (isNaN(num) || num <= 0) {
      setCapacityError('A capacidade deve ser um número maior que zero');
      return false;
    }
    if (num > 1000) {
      setCapacityError('A capacidade máxima é de 1000 participantes');
      return false;
    }
    setCapacityError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validar novamente no momento do submit
    if (!validateDate(date)) {
      setError('A data e hora do evento deve ser no futuro');
      return;
    }

    setLoading(true);
    setError('');

    // Validações
    if (!validateDate(date)) {
      setLoading(false);
      return;
    }

    if (!validateCapacity(capacity)) {
      setLoading(false);
      return;
    }

    try {
      const formattedDate = new Date(date).toISOString();

      await api.post('/events', {
        name,
        description,
        date: formattedDate,
        capacity: parseInt(capacity)
      });

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-gray-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-gray-300 bg-clip-text text-transparent">
              Criar Novo Evento
            </h2>
            <p className="text-gray-400 mt-2">Preencha os dados do evento</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="space-y-6">
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

            <div>
              <label htmlFor="capacity" className="block text-gray-300 font-medium mb-2">
                Capacidade Máxima
              </label>
              <input
                type="number"
                id="capacity"
                value={capacity}
                onChange={(e) => {
                  setCapacity(e.target.value);
                  validateCapacity(e.target.value);
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                placeholder="Número máximo de participantes"
                min="1"
                max="1000"
                required
              />
              {capacityError && (
                <p className="text-red-400 text-sm mt-2">{capacityError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !!dateError || !!capacityError}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-gray-600 hover:from-blue-700 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Criando...
                </>
              ) : (
                'Criar Evento'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 