import { FormEvent, useState, useEffect } from 'react';
import api from '@/lib/api';
import { Participant } from '@/types';
import Modal from './Modal';

interface ParticipantModalFormProps {
  onSuccess: () => void;
  onClose: () => void;
  isOpen: boolean;
  participant?: Participant;
}

export default function ParticipantModalForm({ onSuccess, onClose, isOpen, participant }: ParticipantModalFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Carregar dados do participante quando estiver editando
  useEffect(() => {
    if (participant) {
      setName(participant.name);
      setEmail(participant.email);
      setPhone(participant.phone);
    }
  }, [participant]);

  // Função para formatar telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  // Função para validar email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar telefone
  const validatePhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
  };

  // Função para lidar com alterações no campo de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    
    if (formatted && !validatePhone(formatted)) {
      setPhoneError('Telefone deve ter 10 ou 11 dígitos');
    } else {
      setPhoneError('');
    }
  };

  // Função para lidar com alterações no campo de email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validações finais
    if (!validateEmail(email)) {
      setEmailError('Email inválido');
      setLoading(false);
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Telefone deve ter 10 ou 11 dígitos');
      setLoading(false);
      return;
    }

    try {
      if (participant) {
        // Editar participante existente
        await api.put(`/participants/${participant.id}`, {
          name,
          email,
          phone
        });
      } else {
        // Criar novo participante
        await api.post('/participants', {
          name,
          email,
          phone
        });
      }

      // Limpar o formulário
      setName('');
      setEmail('');
      setPhone('');

      // Chamar callback de sucesso
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar participante:', error);
      setError(`Erro ao ${participant ? 'editar' : 'criar'} participante. Verifique os dados e tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={participant ? "Editar Participante" : "Criar Novo Participante"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label htmlFor="modal-participant-name" className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">
              Nome Completo
            </label>
            <input
              type="text"
              id="modal-participant-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 text-sm sm:text-base"
              placeholder="Digite o nome completo"
              required
            />
          </div>

          <div>
            <label htmlFor="modal-participant-email" className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="modal-participant-email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base pr-10 ${
                  emailError 
                    ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                    : email && validateEmail(email)
                      ? 'border-green-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                      : 'border-white/10 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                }`}
                placeholder="Digite o email"
                required
              />
              {email && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validateEmail(email) ? (
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : emailError ? (
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null}
                </div>
              )}
            </div>
            {emailError && (
              <p className="text-red-400 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label htmlFor="modal-participant-phone" className="block text-gray-300 font-medium mb-2 text-sm sm:text-base">
              Telefone
            </label>
            <div className="relative">
              <input
                type="tel"
                id="modal-participant-phone"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm sm:text-base pr-10 ${
                  phoneError 
                    ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                    : phone && validatePhone(phone)
                      ? 'border-green-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                      : 'border-white/10 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                }`}
                placeholder="(XX) XXXXX-XXXX"
                required
              />
              {phone && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validatePhone(phone) ? (
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : phoneError ? (
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : null}
                </div>
              )}
            </div>
            {phoneError && (
              <p className="text-red-400 text-xs mt-1">{phoneError}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-all duration-300 text-sm sm:text-base"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || !!emailError || !!phoneError}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                {participant ? 'Salvar Alterações' : 'Criar Participante'}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}