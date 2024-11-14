import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const HomePage = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (isAuthenticated) {
      navigate('/content');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
              Virtual Lab<br />Interaction
            </h1>
            <p className="text-gray-700 italic">
              "Science is beautiful when it makes simple explanations of phenomena
              or connections between different observations. Examples include the
              double helix in biology and the fundamental equations of physics."
              <br />-Stephen Hawking
            </p>
            <button
              onClick={handleStartClick}
              className="btn-primary"
            >
              Let's Start
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
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;