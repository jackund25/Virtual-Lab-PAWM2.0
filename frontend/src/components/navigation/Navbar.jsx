import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout } = useAuth();
  
  // Definisi semua state
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Handler functions
  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setShowProfileMenu(false);
  };

  const confirmLogout = () => {
    handleLogout();
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Click outside handler
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  return (
    <>
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
              <span className="text-xl font-bold text-[#5D1A16]">Let's Physics</span>
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
                onClick={() => navigate('/comingsoon')}
                className="nav-link"
              >
                About us
              </button>

              {isAuthenticated ? (
                <div className="relative profile-menu-container">
                  <button
                    onClick={handleProfileClick}
                    className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
                  >
                    <User className="h-6 w-6 text-gray-700" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                      <button 
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => {
                          navigate('/settings');
                          setShowProfileMenu(false);
                        }}
                      >
                        Settings
                      </button>
                      <button 
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 transition-colors duration-200"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-secondary"
                >
                  Sign In
                </button>
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
              
              {isAuthenticated ? (
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
                    className="block w-full text-left px-4 py-2 text-lg font-medium text-red-600 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-lg font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg text-center transition-colors duration-200"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;