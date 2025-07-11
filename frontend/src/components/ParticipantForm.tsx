import { FormEvent, useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

export default function ParticipantForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const debouncedEmail = useDebounce(email, 500);

  // Formatar telefone enquanto digita
  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limitar a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplicar formatação
    if (limitedNumbers.length <= 2) {
      return `(${limitedNumbers}`;
    }
    if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    }
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhone(input);
    const numbers = formatted.replace(/\D/g, '');
    
    // Só atualiza se estiver dentro do limite
    if (numbers.length <= 11) {
      setPhone(formatted);
      validatePhone(formatted);
    }
  };

  // Validar formato do telefone
  const validatePhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length < 10) {
      setPhoneError('Telefone deve ter no mínimo 10 dígitos');
      return false;
    }
    if (numbers.length > 11) {
      setPhoneError('Telefone deve ter no máximo 11 dígitos');
      return false;
    }
    setPhoneError('');
    return true;
  };

  // Validar formato do email
  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Verificar email duplicado
  useEffect(() => {
    const checkEmail = async () => {
      if (!debouncedEmail || !validateEmailFormat(debouncedEmail)) {
        setEmailError('');
        return;
      }

      setIsCheckingEmail(true);
      try {
        const response = await api.get(`/participants/check-email/${encodeURIComponent(debouncedEmail)}`);
        if (response.data.exists) {
          setEmailError('Este email já está cadastrado');
        } else {
          setEmailError('');
        }
      } catch (error) {
        console.error('Erro ao verificar email:', error);
      } finally {
        setIsCheckingEmail(false);
      }
    };

    checkEmail();
  }, [debouncedEmail]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validatePhone(phone)) {
      setLoading(false);
      return;
    }

    if (!validateEmailFormat(email)) {
      setEmailError('Email inválido');
      setLoading(false);
      return;
    }

    if (emailError) {
      setLoading(false);
      return;
    }

    try {
      await api.post('/participants', {
        name,
        email,
        phone: phone.replace(/\D/g, '') // Enviar apenas números
      });

      router.push('/participants');
      router.refresh();
    } catch (error) {
      console.error('Erro ao criar participante:', error);
      setError('Erro ao criar participante. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-gray-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-gray-300 bg-clip-text text-transparent">
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
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                placeholder="Digite o nome completo"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    emailError 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : email && !isCheckingEmail && !emailError
                        ? 'border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                        : 'border-white/10 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                  }`}
                  placeholder="Digite o email"
                  required
                />
                {email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {isCheckingEmail ? (
                      <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : emailError ? (
                      <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : email && validateEmailFormat(email) ? (
                      <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : null}
                  </div>
                )}
              </div>
              {emailError && (
                <p className="text-red-400 text-sm mt-2">{emailError}</p>
              )}
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
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    phoneError 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : phone && validatePhone(phone)
                        ? 'border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                        : 'border-white/10 focus:ring-emerald-500/50 focus:border-emerald-500/50'
                  }`}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  required
                />
                {phone && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {validatePhone(phone) ? (
                      <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              {phoneError && (
                <p className="text-red-400 text-sm mt-2">{phoneError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !!emailError || !!phoneError || isCheckingEmail}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-gray-600 hover:from-blue-700 hover:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
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
                'Criar Participante'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 