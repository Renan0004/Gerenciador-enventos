'use client';

import { useState } from 'react';
import { Participant } from '@/types';
import ParticipantDetailModal from './ParticipantDetailModal';
import ParticipantModalForm from './ParticipantModalForm';
import ConfirmationModal from './ConfirmationModal';
import Toast from './Toast';
import { useRouter } from 'next/navigation';

interface ParticipantCardProps {
  participant: Participant;
  onUpdate: () => void;
}

export default function ParticipantCard({ participant, onUpdate }: ParticipantCardProps) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning'; isVisible: boolean } | null>(null);
  const router = useRouter();
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/participants/${participant.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir participante');
      }

      onUpdate(); // Chamar a função de atualização após excluir
      
      setToast({
        message: `Participante "${participant.name}" excluído com sucesso!`,
        type: 'success',
        isVisible: true
      });
    } catch (error) {
      console.error('Erro ao excluir participante:', error);
      setToast({
        message: 'Erro ao excluir participante. Tente novamente.',
        type: 'error',
        isVisible: true
      });
      throw error; // Propagar o erro para o ConfirmationModal
    }
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setToast({
      message: `Participante "${participant.name}" atualizado com sucesso!`,
      type: 'success',
      isVisible: true
    });
    onUpdate(); // Chamar a função de atualização após editar
  };
  
  return (
    <>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-gray-500/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
              title="Editar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Excluir"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
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
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-gray-600 hover:from-blue-700 hover:to-gray-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
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

      {/* Modal de edição do participante */}
      <ParticipantModalForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        participant={participant}
      />

      {/* Modal de confirmação de exclusão */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Excluir Participante"
        message={`Tem certeza que deseja excluir o participante "${participant.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
      />

      {/* Toast de notificação */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
} 