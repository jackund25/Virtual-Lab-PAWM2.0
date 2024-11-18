import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { BASE_URL } from '../../config/config';

const AuthPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
  // Validasi input dasar
  if (!formData.username || !formData.password) {
    setError('Please fill in all required fields');
    setIsLoading(false);
    return;
  }

  const endpoint = isLogin 
    ? `${BASE_URL}/api/auth/login/`
    : `${BASE_URL}/api/auth/register/`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(isLogin ? {
        username: formData.username,
        password: formData.password
      } : formData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      await handleLogin(data.user, data.token);
      navigate("/");
    } else {
      // Handle berbagai jenis error input
      if (response.status === 401) {
        setError('Invalid username or password');
        } else if (data.username) {
        setError(data.username[0]); // Error username
        } else if (data.password) {
        setError(data.password[0]); // Error password
        } else if (data.error) {
        setError(data.error);
        } else {
        setError('An error occurred. Please try again.');
        }
      }
    } catch (error) {
    console.error('Auth error:', error);
    setError('Network error. Please check your connection.');
    } finally {
    setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#87CEEB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <div>
          <img 
            src="/assets/images/growth.png"
            alt="Let's Physics Logo" 
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-center text-4xl font-bold text-[#5D1A16]">
            {isLogin ? 'Virtual Lab' : 'Join Virtual Lab'}
          </h2>
          <p className="mt-4 text-center text-lg text-[#5D1A16] italic">
            "Science is beautiful when it makes simple explanations of phenomena"
          </p>
        </div>
        
        {/* Tampilkan pesan error (jika ada)*/}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5D1A16] focus:border-[#5D1A16] sm:text-sm" // Styling input disesuaikan
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
            <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          {!isLogin && (
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5D1A16] focus:border-[#5D1A16] sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5D1A16] focus:border-[#5D1A16] sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#E86F64] hover:bg-[#5D1A16]'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5D1A16] transition-colors duration-200`}
              >
                {isLoading ? 'Processing...' : (isLogin ? "Let's Start" : 'Sign up')}
              </button>
            </div>
        </form>

        <div className="text-sm text-center mt-6">
          <p className="text-[#5D1A16]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="ml-1 font-medium text-[#E86F64] hover:text-[#5D1A16]"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;