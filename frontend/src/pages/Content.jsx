import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { Link } from 'react-router-dom';

const contentData = [
  {
    id: 1,
    image: "assets/images/collision.png",
    title: "Momentum",
    description: "Momentum adalah...",
    link: "/lab"
  },
  {
    id: 2,
    image: "assets/images/growth.png",
    title: "Materi Baru",
    description: "Segera!",
    link: "/comingsoon"
  },
  {
    id: 3,
    image: "assets/images/growth.png",
    title: "Materi Baru",
    description: "Segera!",
    link: "/comingsoon"
  },
  {
    id: 4,
    image: "assets/images/growth.png",
    title: "Materi Baru",
    description: "Segera!",
    link: "/comingsoon"
  },
  {
    id: 5,
    image: "assets/images/growth.png",
    title: "Materi Baru",
    description: "Segera!",
    link: "/comingsoon"
  },
  {
    id: 6,
    image: "assets/images/growth.png",
    title: "Materi Baru",
    description: "Segera!",
    link: "/comingsoon"
  }
];

const Content = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 4;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= contentData.length - cardsToShow ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? contentData.length - cardsToShow : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      {/* Content Carousel */}
      <div className="container mx-auto px-4 py-12">
        <div className="relative">
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {contentData.map((item) => (
                <div 
                  key={item.id}
                  className="w-full md:w-1/4 flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <Link
                        to={item.link}
                        className="block text-center bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500 transition-colors"
                      >
                        Klik Disini!
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Content;