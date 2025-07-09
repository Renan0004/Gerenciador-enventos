import Link from 'next/link';
import ParticipantCard from '@/components/ParticipantCard';
import { Participant } from '@/types';

async function getParticipants(): Promise<Participant[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/participants`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Falha ao carregar participantes');
  }
  
  return res.json();
}

export default async function ParticipantsPage() {
  let participants: Participant[] = [];
  let error = null;
  
  try {
    participants = await getParticipants();
  } catch (e) {
    error = 'Não foi possível carregar os participantes. Tente novamente mais tarde.';
    console.error('Erro ao buscar participantes:', e);
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Participantes</h1>
        <Link 
          href="/participants/new" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Cadastrar Participante
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {participants.length === 0 && !error ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Nenhum participante encontrado.</p>
          <p className="text-gray-500">Cadastre um novo participante para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map((participant) => (
            <ParticipantCard key={participant.id} participant={participant} />
          ))}
        </div>
      )}
    </div>
  );
} 