import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2.5">
          <span className="text-lg font-extrabold tracking-tight text-[#2B7FFF]">
            ELIF
          </span>
          <span className="text-xs text-gray-500 font-normal">
            Even Lost, I Found
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600 hidden sm:inline">
              {user.full_name}
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 font-medium transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}