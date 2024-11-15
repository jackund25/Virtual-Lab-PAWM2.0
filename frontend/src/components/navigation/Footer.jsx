import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#87CEEB] py-10">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Footer Links */}
        <div className="flex justify-center w-full max-w-[1000px] mx-auto">
          <div className="flex justify-around w-full md:flex-row flex-col">
            {/* About Us Section */}
            <div className="flex flex-col items-center md:items-start my-4 md:my-0">
              <h2 className="text-white text-2xl font-bold mb-4">About us</h2>
              <div className="flex flex-col items-center md:items-start space-y-2">
                <Link 
                  to="/comingsoon" 
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  How it works
                </Link>
                <Link 
                  to="/comingsoon" 
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  Testimonials
                </Link>
                <a 
                  href="https://termify.io/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="flex flex-col items-center md:items-start my-4 md:my-0">
              <h2 className="text-white text-2xl font-bold mb-4">Contact Us</h2>
              <div className="flex flex-col items-center md:items-start space-y-2">
                <a 
                  href="https://mail.google.com/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  email
                </a>
                <Link 
                  to="/support" 
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="max-w-[1000px] w-full mx-auto mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center w-[90%] mx-auto">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center text-2xl font-bold text-white hover:text-gray-200 transition-colors duration-300 mb-8 md:mb-0"
            >
              <img 
                src="assets/images/growth.png" 
                alt="Let's Physics Logo" 
                className="h-10 w-10 mr-2"
              />
              Let's Physics
            </Link>

            {/* Copyright */}
            <p className="text-white text-sm my-8 md:my-0">
              © Let's Physics 2024. All rights reserved
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-5">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors duration-300"
                aria-label="Youtube"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;