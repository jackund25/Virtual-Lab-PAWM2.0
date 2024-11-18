import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleStartClick = () => {
    if (isAuthenticated) {
      navigate('/content');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} /> {/* Pass isAuthenticated dari context */}
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-[#5D1A16] leading-tight">
              Virtual Lab<br />Interaction
            </h1>
            <p className="text-[#5D1A16] italic">
              "Science is beautiful when it makes simple explanations of phenomena
              or connections between different observations. Examples include the
              double helix in biology and the fundamental equations of physics."
              <br />-Stephen Hawking
            </p>
            <button
              onClick={handleStartClick}
              className="bg-[#E86F64] hover:bg-[#5D1A16] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200" // Sesuaikan style dengan tema
            >
              {isAuthenticated ? "Let's Start" : "Get Started"}
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img 
              src="assets/images/pic1.svg" 
              alt="Virtual Lab Illustration" 
              className="max-w-md w-full object-contain"
            />
          </div>
        </div>

        {/* Welcome message jika user sudah login */}
        {isAuthenticated && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#5D1A16]">
              Welcome back, {user?.username}!
            </h2>
            <p className="text-gray-600 mt-2">
              Continue your learning journey in our virtual lab.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;