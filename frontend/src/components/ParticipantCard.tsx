import Link from 'next/link';
import { Participant } from '@/types';

interface ParticipantCardProps {
  participant: Participant;
}

export default function ParticipantCard({ participant }: ParticipantCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-green-700">{participant.name}</h3>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Email:</span> {participant.email}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Telefone:</span> {participant.phone}
        </p>
        <div className="flex justify-end">
          <Link 
            href={`/participants/${participant.id}`}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
} 