'use client';

import Link from 'next/link';
import ParticipantForm from '@/components/ParticipantForm';

export default function NewParticipantPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/participants" 
          className="text-green-600 hover:text-green-800"
        >
          &larr; Voltar para Participantes
        </Link>
      </div>
      
      <ParticipantForm />
    </div>
  );
} 