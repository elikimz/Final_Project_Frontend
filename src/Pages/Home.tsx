import { Link } from "react-router-dom";
import bmw from '../assets/car2.jpg'; // Make sure you have a background image in your assets

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundImage: `url(${bmw})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Add a semi-transparent black overlay for better visibility
      }}
    >
      <header className="w-full py-4 bg-transparent">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Kim Express Car Hire</div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
              <li><Link to="/about" className="text-white hover:text-gray-300">About</Link></li>
              <li><Link to="/contact" className="text-white hover:text-gray-300">Contact</Link></li>
              <li><Link to="/register" className="text-white hover:text-gray-300">Register</Link></li>
              <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
              {/* <li><Link to="/admin/login" className="text-white hover:text-gray-300">Admin</Link></li> */}
            </ul>
          </nav>
        </div>
      </header>

      <section className="flex-grow flex items-center justify-center">
        <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Kim Express Car Hire</h1>
          <p className="text-gray-600 mb-8">Your trusted vehicle rental service for all occasions. Book your ride today and experience seamless, stress-free travel.</p>
          <Link to="/Register" className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105">Book Now</Link>
        </div>
      </section>

      <footer className="w-full py-4 bg-transparent text-center text-white">
        <div className="container mx-auto">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-gray-700 hover:text-gray-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.22 8.1 7.45 8.84v-6.28H5.88V12h3.57V9.61c0-3.53 2.1-5.48 5.32-5.48 1.54 0 3.09.28 3.09.28v3.41h-1.74c-1.71 0-2.24 1.06-2.24 2.15V12h3.81l-.61 3.56h-3.2v8.6C18.78 20.1 22 16.42 22 12c0-5.52-4.48-10-10-10z"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.22 8.1 7.45 8.84v-6.28H5.88V12h3.57V9.61c0-3.53 2.1-5.48 5.32-5.48 1.54 0 3.09.28 3.09.28v3.41h-1.74c-1.71 0-2.24 1.06-2.24 2.15V12h3.81l-.61 3.56h-3.2v8.6C18.78 20.1 22 16.42 22 12c0-5.52-4.48-10-10-10z"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.22 8.1 7.45 8.84v-6.28H5.88V12h3.57V9.61c0-3.53 2.1-5.48 5.32-5.48 1.54 0 3.09.28 3.09.28v3.41h-1.74c-1.71 0-2.24 1.06-2.24 2.15V12h3.81l-.61 3.56h-3.2v8.6C18.78 20.1 22 16.42 22 12c0-5.52-4.48-10-10-10z"
                />
              </svg>
            </a>
          </div>
          <div className="text-sm">Follow us on social media</div>
          <div className="text-sm">Contact us: info@kimscarhire.com | +254791337188</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
