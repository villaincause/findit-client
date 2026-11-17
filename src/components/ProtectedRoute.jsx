import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] bg-[#F9FAFB] flex items-center justify-center text-sm text-gray-500">
        Loading session...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}