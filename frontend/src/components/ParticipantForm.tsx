import { FormEvent, useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

// Componente para criar um novo participante
export default function ParticipantForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Função para formatar o telefone enquanto o usuário digita
  const formatPhone = (value: string) => {
    // Remove todos os caracteres que não são dígitos
    const digits = value.replace(/\D/g, '');
    
    // Aplica a máscara baseada no número de dígitos
    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 11) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    
    // Limita a 11 dígitos
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  // Função para extrair apenas os dígitos
  const getDigitsOnly = (value: string) => {
    return value.replace(/\D/g, '');
  };

  // Validação se o telefone está no formato correto
  const isPhoneValid = (value: string) => {
    const digits = getDigitsOnly(value);
    return digits.length === 10 || digits.length === 11;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validação final antes de enviar
    if (!isPhoneValid(phone)) {
      setError('Por favor, digite um telefone válido com 10 ou 11 dígitos.');
      setLoading(false);
      return;
    }

    try {
      // Envia apenas os dígitos do telefone para o backend
      const phoneDigits = getDigitsOnly(phone);
      
      await api.post('/participants', {
        name,
        email,
        phone: phoneDigits
      });

      // Limpar o formulário
      setName('');
      setEmail('');
      setPhone('');

      // Redirecionar para a página de participantes
      router.push('/participants');
      router.refresh();
    } catch (error: unknown) {
      console.error('Erro ao criar participante:', error);
      
      // Verificar se é erro de validação do backend
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { error?: string } } };
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError('Erro ao criar participante. Verifique os dados e tente novamente.');
        }
      } else {
        setError('Erro ao criar participante. Verifique os dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Renderização do formulário
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
              Criar Novo Participante
            </h2>
            <p className="text-gray-400 mt-2">Preencha os dados do participante</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                placeholder="Digite o nome completo"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                placeholder="Digite o email"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-300 font-medium mb-2">
                Telefone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    phone && !isPhoneValid(phone) 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : phone && isPhoneValid(phone)
                      ? 'border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                      : 'border-white/10 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                  }`}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  autoComplete="tel"
                />
                {phone && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {isPhoneValid(phone) ? (
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              {phone && !isPhoneValid(phone) && (
                <p className="text-sm text-red-400 mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Telefone deve ter 10 ou 11 dígitos
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !name || !email || !phone || !isPhoneValid(phone)}
            className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Criando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Criar Participante
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 