import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">KimExpress Car Hire</div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link></li>
              <li><Link to="/about" className="text-gray-800 hover:text-gray-600">About</Link></li>
              <li><Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link></li>
              <li><Link to="/register" className="text-gray-800 hover:text-gray-600">Register</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Our Car Hire Service</h2>
        <p className="text-gray-700 mb-6">
          We are dedicated to providing you with the best car rental experience. Our fleet offers a diverse selection of vehicles, from compact cars to luxurious SUVs, ensuring we meet your transportation needs for any occasion.
        </p>
        <p className="text-gray-700 mb-6">
          At our core, we prioritize customer satisfaction and convenience. Whether you're traveling for business or pleasure, our user-friendly booking system and flexible rental options make it easy to find and reserve the perfect vehicle.
        </p>
        <p className="text-gray-700 mb-6">
          Our commitment to quality extends beyond our vehicles. We offer competitive pricing, transparent terms, and exceptional customer support to ensure your rental experience is seamless from start to finish.
        </p>
        <p className="text-gray-700 mb-6">
          Discover why thousands of customers choose us for their car rental needs. Contact us today to learn more about our services and let us help you make your journey memorable.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
