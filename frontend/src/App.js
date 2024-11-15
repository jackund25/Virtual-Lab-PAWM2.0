import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AuthPage from './pages/Auth/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Content from './pages/Content';
import LabPage from './pages/Lab';
import ComingSoonPage from './pages/ComingSoon';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />

          {/* Protected routes */}
          <Route
            path="/content"
            element={
              <ProtectedRoute>
                <Content/>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/lab" 
            element={
            <ProtectedRoute>
              <LabPage />
            </ProtectedRoute>
            } 
          />
          <Route 
            path="/comingsoon" 
            element={
            <ProtectedRoute>
              <ComingSoonPage />
            </ProtectedRoute>
            } 
          />

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