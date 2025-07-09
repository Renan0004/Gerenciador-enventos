'use client';

import Link from 'next/link';
import EventForm from '@/components/EventForm';

export default function NewEventPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/events" 
          className="text-blue-600 hover:text-blue-800"
        >
          &larr; Voltar para Eventos
        </Link>
      </div>
      
      <EventForm />
    </div>
  );
} 