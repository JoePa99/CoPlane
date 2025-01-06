import { useAuth } from '../contexts/AuthContext';
import { Plane } from 'lucide-react';

export function Header() {
  const { signOut } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Plane className="h-8 w-8 text-primary-600" />
          <h1 className="ml-2 text-2xl font-bold text-gray-900">COPLANE</h1>
        </div>
        <button
          onClick={() => signOut()}
          className="text-gray-600 hover:text-gray-900"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}