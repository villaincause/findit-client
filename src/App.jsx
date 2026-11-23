import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#F9FAFB] text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/lost"
              element={
                <div className="max-w-6xl mx-auto px-6 py-12 text-center text-base text-gray-600">
                  Lost Items Feed — share Figma design next
                </div>
              }
            />
            <Route
              path="/found"
              element={
                <div className="max-w-6xl mx-auto px-6 py-12 text-center text-base text-gray-600">
                  Found Items Feed — share Figma design next
                </div>
              }
            />
            <Route
              path="/post"
              element={
                <ProtectedRoute>
                  <div className="max-w-6xl mx-auto px-6 py-12 text-center text-base text-gray-600">
                    Report Item Form — share Figma design next
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="max-w-6xl mx-auto px-6 py-12 text-center text-base text-gray-600">
                    Dashboard — share Figma design next
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}