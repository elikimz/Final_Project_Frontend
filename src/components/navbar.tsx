import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../Features/login/login.API';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({});
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-xl">Select Booking</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/Users" className="text-black hover:text-gray-500">Dashboard</Link>
          <Link to="/UserProfile" className="text-black hover:text-gray-500">Profile</Link>
          <button
            onClick={handleLogout}
            className="btn btn-ghost text-black"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" 
              className="rounded-full w-10 h-10"
            />
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="space-y-4 p-4">
            <li>
              <Link to="/Users" className="text-black hover:text-gray-500 block">Dashboard</Link>
            </li>
            <li>
              <Link to="/UserProfile" className="text-black hover:text-gray-500 block">Profile</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-ghost text-black block"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <header className="relative h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://your-image-url.com')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Gaia's Domain</h1>
          <p className="text-xl mb-8">Luxury carpets for stylish living.</p>
          <Link to="/Shop" className="btn bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full">
            Shop Now
          </Link>
        </div>
      </header>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Discover Our Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example cards */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <img src="https://your-image-url.com" alt="Carpet" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold mb-2">Luxurious Carpet</h3>
              <p className="text-gray-600">Enhance your home with comfort and style.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <img src="https://your-image-url.com" alt="Carpet" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold mb-2">Elegant Design</h3>
              <p className="text-gray-600">Make a statement with our designer carpets.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <img src="https://your-image-url.com" alt="Carpet" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-2xl font-bold mb-2">Modern Comfort</h3>
              <p className="text-gray-600">Perfect for modern homes with a touch of luxury.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-base-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Powered by KimTech Limited</p>
          <p className="text-gray-500">Contact: elijahkimani1293@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
