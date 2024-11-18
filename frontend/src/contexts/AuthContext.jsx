import React, { createContext, useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../config/config';  // Pastikan path sesuai

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Validasi token setiap kali component di-mount atau token berubah
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/auth/validate-token/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);
          setToken(storedToken);
        } else {
          // Token tidak valid, hapus dari localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error('Token validation error:', error);
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token]); // Dependency array dengan token

  const handleLogin = async (userData, authToken) => {
    setIsLoading(true);
    try {
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      if (token) {
        const response = await fetch(`${BASE_URL}/api/auth/logout/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Logout failed:', await response.text());
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  // Menambahkan interceptor untuk request
  const authFetch = async (url, options = {}) => {
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Token ${token}`,
      };
    }
    
    const response = await fetch(url, options);
    if (response.status === 401) {
      // Token expired atau tidak valid
      await handleLogout();
      throw new Error('Unauthorized');
    }
    return response;
  };

  const value = {
    isAuthenticated,
    user,
    token,
    isLoading,
    handleLogin,
    handleLogout,
    authFetch, // Tambahkan authFetch ke context
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};