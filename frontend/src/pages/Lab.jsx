import React, { useState } from 'react';
import ElasticCollision from '../components/navigation/ElasticCollision';
import InelasticCollision from '../components/navigation/InelasticCollision';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const LabPage = () => {
  const [activeTab, setActiveTab] = useState('elastic');

  return (
    <>
      <Navbar />
      <div className="w-full bg-gradient-to-b from-sky-200 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-[#4A2B2B] mb-4">
              Virtual Lab Interaction
            </h1>
            <p className="text-lg italic text-[#4A2B2B] max-w-3xl mx-auto">
              "Science is beautiful when it makes simple explanations of phenomena.
              Let's explore the physics of momentum and collisions through this interactive simulation."
            </p>
          </div>

          {/* Custom Tabs */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Tab Buttons */}
            <div className="flex mb-8 bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveTab('elastic')}
                className={`flex-1 py-3 px-4 rounded-lg text-lg transition-colors ${
                  activeTab === 'elastic'
                    ? 'bg-sky-100 text-sky-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Elastic Collision
              </button>
              <button
                onClick={() => setActiveTab('inelastic')}
                className={`flex-1 py-3 px-4 rounded-lg text-lg transition-colors ${
                  activeTab === 'inelastic'
                    ? 'bg-sky-100 text-sky-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Inelastic Collision
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="transition-opacity duration-300">
              {activeTab === 'elastic' && <ElasticCollision />}
              {activeTab === 'inelastic' && <InelasticCollision />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LabPage;