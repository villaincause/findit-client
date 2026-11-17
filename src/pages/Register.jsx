import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      return setError('Password must be at least 8 characters long.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (!agreed) {
      return setError('Please agree to the Terms of Service and Privacy Policy.');
    }

    setSubmitting(true);
    try {
      await register(fullName, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleAuth = () => {
    setError('Google OAuth is not configured yet. Please register with your campus email.');
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F9FAFB] flex flex-col items-center justify-center px-4 py-12">
      {/* Heading outside card */}
      <div className="text-center mb-7">
        <h1 className="text-2xl sm:text-[26px] font-bold text-gray-900 tracking-tight">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 mt-1.5">
          Join ELIF to help reconnect lost items
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[420px] bg-white rounded-xl border border-gray-200/90 shadow-xs p-7 sm:p-8">
        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-200 pl-3.5 pr-10 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-1.5">
              Must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-gray-200 pl-3.5 pr-10 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#2B7FFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 cursor-pointer"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="terms"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#2B7FFF] focus:ring-[#2B7FFF] cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
              I agree to the{' '}
              <Link to="/terms" className="text-[#2B7FFF] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-[#2B7FFF] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 rounded-lg bg-[#2B7FFF] hover:bg-[#1E6CEB] py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-60 cursor-pointer"
          >
            {submitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <p className="text-center text-xs text-gray-500 my-5">
          Or sign up with
        </p>

        {/* Social Row matching Figma */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 px-3 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.3 0 6.08-1.09 8.1-2.96l-3.88-3.05c-1.1.74-2.51 1.18-4.22 1.18-3.24 0-5.99-2.19-6.97-5.13H1.02v3.14C3.05 21.2 7.24 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.03 14.04c-.25-.74-.39-1.54-.39-2.36 0-.82.14-1.62.39-2.36V6.18H1.02C.37 7.47 0 8.91 0 10.44s.37 2.97 1.02 4.26l4.01-3.14Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.79 0 3.41.62 4.68 1.82l3.51-3.51C18.07 1.19 15.3 0 12 0 7.24 0 3.05 2.8 1.02 6.82l4.01 3.14c.98-2.94 3.73-5.21 6.97-5.21Z"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* Secondary slot placeholder from Figma */}
          <div className="rounded-lg border border-gray-200 bg-white py-2.5 px-3" />
        </div>
      </div>

      {/* Footer Link outside card */}
      <p className="mt-6 text-xs text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-[#2B7FFF] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}