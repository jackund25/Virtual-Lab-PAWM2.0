// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AuthPage from './pages/Auth/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Route untuk auth */}
        <Route 
          path="*" 
          element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} 
        />
        
        {/* Route yang diproteksi */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage isAuthenticated={isAuthenticated} />
            </ProtectedRoute>
          } 
        />
        
        {/* Tambahkan route lain saat komponennya sudah dibuat
        <Route 
          path="/about" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AboutPage isAuthenticated={isAuthenticated} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/content" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ContentPage isAuthenticated={isAuthenticated} />
            </ProtectedRoute>
          } 
        /> 
        */}        
        {/* <Route 
          path="*" 
          element={<div>404 - Page Not Found</div>} 
        />*/}
      </Routes>
    </Router>
  );
}

export default App;