import Link from 'next/link';
import { Event, Participant } from '@/types';
import EnrollmentFormWrapper from './EnrollmentFormWrapper';

async function getEvent(id: string): Promise<Event> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/events/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Falha ao carregar evento');
  }
  
  return res.json();
}

async function getEventParticipants(id: string): Promise<Participant[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/events/${id}/participants`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Falha ao carregar participantes');
  }
  
  return res.json();
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  let event: Event | null = null;
  let participants: Participant[] = [];
  let error = null;
  
  try {
    const [eventData, participantsData] = await Promise.all([
      getEvent(params.id),
      getEventParticipants(params.id)
    ]);
    
    event = eventData;
    participants = participantsData;
  } catch (e) {
    error = 'Não foi possível carregar os dados do evento. Tente novamente mais tarde.';
    console.error('Erro ao buscar dados do evento:', e);
  }
  
  // Formatar a data para exibição
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/events" 
          className="text-blue-600 hover:text-blue-800"
        >
          &larr; Voltar para Eventos
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {event && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-blue-700">{event.name}</h1>
            <p className="text-gray-500 mb-4">
              <span className="font-medium">Data:</span> {formattedDate}
            </p>
            <div className="prose max-w-none mb-6">
              <h2 className="text-xl font-semibold mb-2">Descrição</h2>
              <p className="whitespace-pre-line">{event.description}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Participantes</h2>
          
          {participants.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-500">Nenhum participante inscrito neste evento.</p>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {participants.map((participant) => (
                  <li key={participant.id} className="p-4 hover:bg-gray-50">
                    <div className="font-medium">{participant.name}</div>
                    <div className="text-sm text-gray-500">{participant.email}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Inscrever Participante</h2>
          <EnrollmentFormWrapper eventId={params.id} />
        </div>
      </div>
    </div>
  );
} 