import { Link } from "react-router-dom";
import car3 from './assets/images/car3.jpg'; 

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">CarHire</div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link></li>
              <li><Link to="/about" className="text-gray-800 hover:text-gray-600">About</Link></li>
              <li><Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link></li>
              <li><Link to="/login" className="text-gray-800 hover:text-gray-600">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="flex-grow flex items-center justify-center relative">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${images})` }}></div>
        <div className="bg-white bg-opacity-75 p-10 rounded-lg shadow-lg max-w-xl mx-auto relative z-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to CarHire</h1>
          <p className="text-gray-600 mb-8">Your trusted vehicle rental service for all occasions. Book your ride today and experience seamless, stress-free travel.</p>
          <Link to="/book" className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105">Book Now</Link>
        </div>
      </section>

      <footer className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto text-gray-800">
          &copy; {new Date().getFullYear()} CarHire. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
