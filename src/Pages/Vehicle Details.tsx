import { Link } from "react-router-dom";

const VehicleDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="w-full py-4 bg-white shadow-md mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">KimExpress Car Hire</div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link></li>
              <li><Link to="/about" className="text-gray-800 hover:text-gray-600">About</Link></li>
              <li><Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link></li>
              <li><Link to="/register" className="text-gray-800 hover:text-gray-600">Register</Link></li>
              <li><Link to="/login" className="text-gray-800 hover:text-gray-600">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Vehicle Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src="/path/to/vehicle-image.jpg" alt="Vehicle" className="rounded-lg mb-6" />
          <h3 className="text-2xl font-semibold mb-4">Vehicle Name</h3>
          <p className="text-gray-700 mb-4">Specifications: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p className="text-gray-700 mb-4">Rental Rate: $50/day</p>
          <p className="text-gray-700 mb-4">Availability: Available</p>
          <Link to="/Booking_form" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
