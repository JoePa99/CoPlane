import { NavLink } from 'react-router-dom';
import { Plane, Calendar, DollarSign, Wrench, AlertTriangle, BookOpen } from 'lucide-react';

const navigation = [
  { name: 'Home', to: '/', icon: Plane },
  { name: 'Schedule', to: '/schedule', icon: Calendar },
  { name: 'Flight Logs', to: '/logs', icon: BookOpen },
  { name: 'Expenses', to: '/expenses', icon: DollarSign },
  { name: 'Maintenance', to: '/maintenance', icon: Wrench },
  { name: 'Squawks', to: '/squawks', icon: AlertTriangle },
];

interface NavigationProps {
  onNavClick?: () => void;
}

export function Navigation({ onNavClick }: NavigationProps) {
  return (
    <nav className="w-64 bg-white shadow-sm p-4 h-[calc(100vh-4rem)] overflow-y-auto">
      <ul className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <NavLink
                to={item.to}
                onClick={onNavClick}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-5 w-5 mr-2" />
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}