import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-blue-400">Sistema Online</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Gerenciador de{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Eventos
            </span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto">
            Sistema completo para gerenciar eventos e participantes, com inscrições automáticas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/events"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Ver Eventos
            </Link>

            <Link
              href="/participants"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2h5m10 0h-5v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2h5" />
              </svg>
              Ver Participantes
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 backdrop-blur-sm border border-blue-500/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gestão Completa</h3>
              <p className="text-gray-400">
                Crie e gerencie eventos com facilidade, definindo datas e descrições.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 backdrop-blur-sm border border-gray-500/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-500/20 to-slate-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2h5m10 0h-5v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2h5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cadastro Rápido</h3>
              <p className="text-gray-400">
                Registre participantes de forma simples e eficiente, com validações automáticas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
