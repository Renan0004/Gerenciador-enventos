'use client';

import { useState } from 'react';
import { Participant } from '@/types';
import ParticipantDetailModal from './ParticipantDetailModal';

interface ParticipantCardProps {
  participant: Participant;
}

export default function ParticipantCard({ participant }: ParticipantCardProps) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  return (
    <>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-emerald-500/10">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
        </div>
        
        <h3 className="text-xl font-bold text-white mt-4 line-clamp-1">{participant.name}</h3>
        
        <div className="flex items-center mt-3 text-gray-400 text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          {participant.email}
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => setIsDetailsModalOpen(true)}
            className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Ver Detalhes
          </button>
        </div>
      </div>

      {/* Modal de detalhes do participante */}
      <ParticipantDetailModal
        participantId={participant.id}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </>
  );
} 