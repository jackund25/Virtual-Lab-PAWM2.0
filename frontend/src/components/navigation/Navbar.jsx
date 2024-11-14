import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      setShowProfileMenu(!showProfileMenu);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-navbar-blue shadow-md">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar with Logo and Hamburger */}
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src="/assets/images/growth.png"
              alt="Let's Physics Logo" 
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-gray-800">Let's Physics</span>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-800 hover:text-gray-600"
          >
            <svg 
              className={`h-6 w-6 transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'transform rotate-180' : ''
              }`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate('/')}
              className="nav-link"
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="nav-link"
            >
              About us
            </button>
            <button 
              onClick={handleGetStartedClick}
              className="btn-secondary"
            >
              Get Started
            </button>

            {showProfileMenu && (
              <div className="absolute top-16 right-4 bg-white rounded-lg shadow-xl py-2 w-48">
                <button 
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </button>
                <button 
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => {
                    // Add logout logic here
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`
            absolute left-0 right-0 bg-navbar-blue shadow-lg mt-3 transition-all duration-300 ease-in-out md:hidden
            ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}
          style={{ 
            backgroundColor: 'rgb(135, 206, 235)',
            zIndex: 40
          }}
        >
          {/* Mobile Menu Content */}
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button 
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-lg font-medium text-gray-800 hover:bg-blue-200 rounded-lg transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => {
                navigate('/about');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-lg font-medium text-gray-800 hover:bg-blue-200 rounded-lg transition-colors duration-200"
            >
              About us
            </button>
            <button 
              onClick={() => {
                handleGetStartedClick();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-lg font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg text-center transition-colors duration-200"
            >
              Get Started
            </button>
            
            {isAuthenticated && (
              <div className="border-t border-blue-300 pt-4 mt-4 space-y-4">
                <button 
                  className="block w-full text-left px-4 py-2 text-lg font-medium text-gray-800 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                  onClick={() => {
                    navigate('/settings');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Settings
                </button>
                <button 
                  className="block w-full text-left px-4 py-2 text-lg font-medium text-gray-800 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                  onClick={() => {
                    // Add logout logic here
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;