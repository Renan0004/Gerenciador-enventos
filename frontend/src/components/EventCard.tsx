import Link from 'next/link';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  // Formatar a data para exibição
  const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-blue-700">{event.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            <span className="font-medium">Data:</span> {formattedDate}
          </span>
          <Link 
            href={`/events/${event.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
} 