import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExpensesPage from './pages/ExpensesPage';
import SquawksPage from './pages/SquawksPage';
import MaintenancePage from './pages/MaintenancePage';
import SchedulePage from './pages/SchedulePage';
import FlightLogsPage from './pages/FlightLogsPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  return session ? <>{children}</> : <Navigate to="/login" />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="logs" element={<FlightLogsPage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="squawks" element={<SquawksPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
      </Route>
    </Routes>
  );
}