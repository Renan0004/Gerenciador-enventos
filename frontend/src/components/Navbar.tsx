import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">
            <Link href="/" className="hover:text-blue-200">
              Gerenciador de Eventos
            </Link>
          </div>
          <div className="space-x-4">
            <Link href="/events" className="hover:text-blue-200">
              Eventos
            </Link>
            <Link href="/participants" className="hover:text-blue-200">
              Participantes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 