import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `text-base font-medium transition-colors ${
      isActive ? 'text-[#2B7FFF]' : 'text-gray-700 hover:text-[#2B7FFF]'
    }`;

  return (
    <header className="w-full bg-white border-b border-gray-200/80 sticky top-0 z-40">
      <div className="w-full px-8 sm:px-14 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-baseline gap-2.5">
          <span className="text-xl font-extrabold tracking-tight text-[#2B7FFF]">
            FINDIT
          </span>
          <span className="text-sm text-gray-500 font-normal">
            You can find it here
          </span>
        </Link>

        {/* Navigation Links & User Actions */}
        <div className="flex items-center gap-7">
          <nav className="hidden md:flex items-center gap-7">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/lost" className={navLinkClass}>
              Lost Items
            </NavLink>
            <NavLink to="/found" className={navLinkClass}>
              Found Items
            </NavLink>
            <NavLink to="/post" className={navLinkClass}>
              Report Item
            </NavLink>
          </nav>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                title={`${user.full_name} — Dashboard`}
                className="text-gray-800 hover:text-[#2B7FFF] transition-colors"
              >
                <CircleUserRound className="w-6 h-6 stroke-[1.75]" />
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg border border-[#2B7FFF] px-5 py-1.5 text-base font-medium text-[#2B7FFF] hover:bg-blue-50 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-[#2B7FFF] px-5 py-1.5 text-base font-medium text-white hover:bg-[#1E6CEB] transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}