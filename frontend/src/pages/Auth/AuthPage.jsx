import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'http://127.0.0.1:8000/api/auth/login/' : 'http://127.0.0.1:8000/api/auth/register/';
    
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
      console.log(response.ok)
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate("/home")
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#87CEEB] py-12 px-4 sm:px-6 lg:px-8"> {/* Warna background diubah ke biru muda */}
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl"> {/* Tambah background putih dan shadow */}
        <div>
        <img 
              src="/assets/images/growth.png"
              alt="Let's Physics Logo" 
              className="h-10 w-10 justify-self-center"
            />
          <h2 className="mt-6 text-center text-4xl font-bold text-[#5D1A16]"> {/* Warna dan ukuran teks disesuaikan */}
            {isLogin ? 'Virtual Lab' : 'Join Virtual Lab'}
          </h2>
          <p className="mt-4 text-center text-lg text-[#5D1A16] italic"> {/* Styling teks kutipan */}
            "Science is beautiful when it makes simple explanations of phenomena"
          </p>
        </div>
        
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#E86F64] hover:bg-[#5D1A16] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5D1A16] transition-colors duration-200" // Warna button disesuaikan
            >
              {isLogin ? "Let's Start" : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-6">
          <p className="text-[#5D1A16]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="ml-1 font-medium text-[#E86F64] hover:text-[#5D1A16]"
              onClick={() => setIsLogin(!isLogin)}
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