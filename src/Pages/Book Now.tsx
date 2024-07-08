import { useState } from "react";
import { Link } from "react-router-dom";

const Book = () => {
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    duration: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

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
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Browse Vehicles</h2>
        
        {/* Filters Section */}
        <div className="flex space-x-4 mb-6">
          <select name="category" className="p-2 border rounded" onChange={handleFilterChange}>
            <option value="">Category</option>
            <option value="compact">Compact</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
          </select>
          <input type="date" name="date" className="p-2 border rounded" onChange={handleFilterChange} />
          <select name="duration" className="p-2 border rounded" onChange={handleFilterChange}>
            <option value="">Duration</option>
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
            <option value="7">1 Week</option>
          </select>
        </div>
        
        {/* Vehicle List/Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example Vehicle Card */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="/path/to/vehicle-image.jpg" alt="Vehicle" className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vehicle Name</h3>
            <p className="text-gray-700 mb-2">Short Description</p>
            <p className="text-gray-700 mb-2">Rental Rate: $50/day</p>
            <Link to="/vehicle-details" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
              Book Now
            </Link><br></br>

            <img src="/path/to/vehicle-image.jpg" alt="Vehicle" className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vehicle Name</h3>
            <p className="text-gray-700 mb-2">Short Description</p>
            <p className="text-gray-700 mb-2">Rental Rate: $50/day</p>
            <Link to="/vehicle-details" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
              Book Now
            </Link>
            <img src="/path/to/vehicle-image.jpg" alt="Vehicle" className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vehicle Name</h3>
            <p className="text-gray-700 mb-2">Short Description</p>
            <p className="text-gray-700 mb-2">Rental Rate: $50/day</p>
            <Link to="/vehicle-details" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
              Book Now
            </Link>
            <img src="/path/to/vehicle-image.jpg" alt="Vehicle" className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vehicle Name</h3>
            <p className="text-gray-700 mb-2">Short Description</p>
            <p className="text-gray-700 mb-2">Rental Rate: $50/day</p>
            <Link to="/vehicle-details" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
              Book Now
            </Link>
            <img src="/path/to/vehicle-image.jpg" alt="Vehicle" className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vehicle Name</h3>
            <p className="text-gray-700 mb-2">Short Description</p>
            <p className="text-gray-700 mb-2">Rental Rate: $50/day</p>
            <Link to="/vehicle-details" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
              Book Now
            </Link>
            <img src="/path/to/vehicle-image.jpg" alt="Vehicle" className="rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">Vehicle Name</h3>
            <p className="text-gray-700 mb-2">Short Description</p>
            <p className="text-gray-700 mb-2">Rental Rate: $50/day</p>
            <Link to="/vehicle-details" className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
              Book Now
            </Link>
          </div>
          
          {/* Add more vehicle cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default Book;
