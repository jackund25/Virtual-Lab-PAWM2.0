import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';


const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar/>  
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl mx-auto text-center relative">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Coming Soon
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
          
          {/* Quote */}
          <blockquote className="my-8 p-6 bg-white bg-opacity-50 border-l-4 border-rose-400 text-gray-600 italic">
            "Science is beautiful when it makes simple explanations of phenomena or connections between different observations."
            <footer className="mt-2 text-gray-500">- Stephen Hawking</footer>
          </blockquote>
        </div>

        {/* Floating Shapes */}
        <div className="absolute right-24 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="relative">
            {/* Circle */}
            <div className="w-12 h-12 bg-rose-400 rounded-full opacity-80 animate-bounce" 
                 style={{ animationDelay: '0s', animationDuration: '3s' }} />
            
            {/* Square */}
            <div className="w-12 h-12 bg-rose-400 opacity-80 mt-8 animate-bounce" 
                 style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
            
            {/* Triangle */}
            <div className="w-0 h-0 mt-8 animate-bounce"
                 style={{ 
                   animationDelay: '1s',
                   animationDuration: '3s',
                   borderLeft: '24px solid transparent',
                   borderRight: '24px solid transparent',
                   borderBottom: '42px solid rgba(251, 113, 133, 0.8)'
                 }} />
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default ComingSoonPage;