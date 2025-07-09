import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { Event } from '@/types';

async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/events`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Falha ao carregar eventos');
  }
  
  return res.json();
}

export default async function EventsPage() {
  let events: Event[] = [];
  let error = null;
  
  try {
    events = await getEvents();
  } catch (e) {
    error = 'Não foi possível carregar os eventos. Tente novamente mais tarde.';
    console.error('Erro ao buscar eventos:', e);
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Eventos</h1>
        <Link 
          href="/events/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Criar Evento
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {events.length === 0 && !error ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Nenhum evento encontrado.</p>
          <p className="text-gray-500">Crie um novo evento para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
} 