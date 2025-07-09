import Link from 'next/link';
import { Participant, Event } from '@/types';

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

export default async function ParticipantDetailPage({ params }: { params: { id: string } }) {
  let participant: Participant | null = null;
  let events: Event[] = [];
  let error = null;
  
  try {
    const [participantData, eventsData] = await Promise.all([
      getParticipant(params.id),
      getParticipantEvents(params.id)
    ]);
    
    participant = participantData;
    events = eventsData;
  } catch (e) {
    error = 'Não foi possível carregar os dados do participante. Tente novamente mais tarde.';
    console.error('Erro ao buscar dados do participante:', e);
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/participants" 
          className="text-green-600 hover:text-green-800"
        >
          &larr; Voltar para Participantes
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {participant && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-green-700">{participant.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {participant.email}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Telefone:</span> {participant.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Eventos Inscritos</h2>
        
        {events.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-500">Este participante não está inscrito em nenhum evento.</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {events.map((event) => {
                const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
                
                return (
                  <li key={event.id} className="p-4 hover:bg-gray-50">
                    <Link href={`/events/${event.id}`} className="block">
                      <div className="font-medium text-blue-600">{event.name}</div>
                      <div className="text-sm text-gray-500">{formattedDate}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 