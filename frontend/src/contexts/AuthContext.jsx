import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);
const BASE_URL = 'http://127.0.0.1:8000';

// Konfigurasi API untuk eksperimen momentum
const momentumApi = {
  saveState: async (sessionId, state, token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/momentum/experiments/${sessionId}/save_state/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ state })
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving state:', error);
      throw error;
    }
  },

  initializeSession: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/momentum/experiments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error initializing session:', error);
      throw error;
    }
  },

  submitResults: async (sessionId, type, results, token) => {
    try {
      const response = await fetch(`${BASE_URL}/api/momentum/experiments/${sessionId}/submit_result/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          experiment_type: type,
          ...results
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Error submitting results:', error);
      throw error;
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [experimentSession, setExperimentSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan loading state
  const [labState, setLabState] = useState({
    activeTab: 'elastic',
    elasticState: {
      params: {
        mass1: 0.5,
        velocity1: 1.0,
        mass2: 1.5,
        velocity2: -0.5
      },
      measurements: {
        momentum1: 0,
        momentum2: 0,
        energy: 0
      }
    },
    inelasticState: {
      params: {
        mass1: 0.5,
        velocity1: 1.0,
        mass2: 1.5,
        velocity2: -0.5
      },
      measurements: {
        momentum1: 0,
        momentum2: 0,
        energy: 0,
        energyLoss: 0
      }
    }
  });

  const validateToken = async (tokenToValidate) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/validate-token/`, {
        headers: {
          'Authorization': `Token ${tokenToValidate}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        
        // Initialize experiment session after validating token
        await initializeExperimentSession(tokenToValidate);
        return true;
      } else {
        await handleLogout();
        return false;
      }
    } catch (error) {
      console.error('Token validation error:', error);
      await handleLogout();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check token saat aplikasi dimuat
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        await validateToken(storedToken);
      } else {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Auto-save tetap sama
  useEffect(() => {
    if (experimentSession && token) {
      const saveInterval = setInterval(() => {
        momentumApi.saveState(experimentSession.id, labState, token)
          .catch(console.error);
      }, 30000);

      return () => clearInterval(saveInterval);
    }
  }, [experimentSession, labState, token]);

  const initializeExperimentSession = async (authToken) => {
    try {
      const session = await momentumApi.initializeSession(authToken);
      setExperimentSession(session);
      
      // Load saved state if exists
      if (session.states?.length > 0) {
        const lastState = session.states[0];
        setLabState({
          activeTab: lastState.active_tab,
          elasticState: lastState.elastic_state,
          inelasticState: lastState.inelastic_state
        });
      }
    } catch (error) {
      console.error('Error initializing experiment session:', error);
    }
  };

  const handleLogin = async (userData, authToken) => {
    setIsLoading(true);
    try {
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Initialize experiment session after login
      await initializeExperimentSession(authToken);
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

        if (response.ok) {
          console.log('Logout successful');
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
      setExperimentSession(null);
      setLabState(null);
      setIsLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Fungsi untuk momentum lab
  const saveExperimentState = async (state) => {
    if (!experimentSession || !token) return;
    try {
      await momentumApi.saveState(experimentSession.id, state, token);
    } catch (error) {
      console.error('Error saving experiment state:', error);
    }
  };

  const submitExperimentResults = async (type, results) => {
    if (!experimentSession || !token) return;
    try {
      await momentumApi.submitResults(experimentSession.id, type, results, token);
    } catch (error) {
      console.error('Error submitting experiment results:', error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    token,
    isLoading,
    handleLogin,
    handleLogout,
    updateUser,
    setUser,
    setIsAuthenticated,
    validateToken,
    // Momentum lab state dan functions
    labState,
    setLabState,
    saveExperimentState,
    submitExperimentResults,
    experimentSession
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