import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Gerenciador de Eventos</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Um sistema simples para gerenciar eventos e participantes, permitindo
        inscrições e acompanhamento de presença.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/events" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Ver Eventos
        </Link>
        <Link 
          href="/participants" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Ver Participantes
        </Link>
      </div>
    </div>
  );
}
