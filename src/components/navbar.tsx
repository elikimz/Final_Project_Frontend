import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu state
  };

  return (
    <nav className="bg-primary p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          Car Management System
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-white hover:text-secondary">Home</a>
          <a href="/about" className="text-white hover:text-secondary">About</a>
          <a href="/contact" className="text-white hover:text-secondary">Contact</a>
          <a href="/register" className="text-white hover:text-accent">Register</a>
          <a href="/login" className="text-white hover:text-accent">Login</a>
        </div>
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-primary bg-opacity-90 p-4 z-50">
          <a href="/" className="block text-white hover:text-secondary py-2">Home</a>
          <a href="/about" className="block text-white hover:text-secondary py-2">About</a>
          <a href="/contact" className="block text-white hover:text-secondary py-2">Contact</a>
          <a href="/register" className="block text-white hover:text-accent py-2">Register</a>
          <a href="/login" className="block text-white hover:text-accent py-2">Login</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
