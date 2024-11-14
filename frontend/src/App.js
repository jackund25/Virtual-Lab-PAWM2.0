import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AuthPage from './pages/Auth/AuthPage';
// import ContentPage from './pages/Content'; // Import ContentPage jika sudah ada
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />

          {/* Protected routes */}
          {/* <Route
            path="/content"
            element={
              <ProtectedRoute>
                <ContentPage />
              </ProtectedRoute>
            }
          /> */}

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex items-center justify-center bg-[#87CEEB]">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-[#5D1A16]">404</h1>
                  <p className="text-[#5D1A16] mt-2">Page Not Found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;