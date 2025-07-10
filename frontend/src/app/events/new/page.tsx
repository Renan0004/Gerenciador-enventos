'use client';

import Link from 'next/link';
import EventForm from '@/components/EventForm';

export default function NewEventPage() {
  return (
    <div className="relative">
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/events" 
          className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Eventos
        </Link>
      </div>
      
      <EventForm />
    </div>
  );
} 