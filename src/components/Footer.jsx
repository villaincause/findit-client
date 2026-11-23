import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200/80">
      <div className="w-full px-8 sm:px-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} FINDIT. All rights reserved.
        </p>

        <div className="flex items-center gap-7 text-sm text-gray-500">
          <Link to="/privacy" className="hover:text-gray-800 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-gray-800 transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-gray-800 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}