import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Header } from './Header';
import { Menu } from 'lucide-react';

export default function Layout() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex relative">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="lg:hidden fixed bottom-4 right-4 z-50 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Navigation sidebar */}
        <div 
          className={`
            fixed inset-y-0 left-0 w-64 transform lg:relative lg:translate-x-0 
            transition-transform duration-200 ease-in-out z-40
            ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:block
          `}
        >
          <Navigation onNavClick={() => setIsNavOpen(false)} />
        </div>

        {/* Backdrop */}
        {isNavOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsNavOpen(false)}
          />
        )}

        {/* Main content area */}
        <main className="flex-1 p-6 lg:ml-0 min-w-0 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}