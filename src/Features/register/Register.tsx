import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../register/RegisterAPI';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
    role: 'user',
    password: '',
    confirmPassword: ''
  });

  const [registerUser, { isLoading, isSuccess, isError,}] = useRegisterUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      // Extract user ID from response
      const userId = localStorage.getItem('userId'); // Replace this with actual extraction from response if necessary
      if (userId) {
        localStorage.setItem('userId', userId);
      }
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(formData).unwrap();
      alert("Registration successful!");
      // Save user ID to local storage
      localStorage.setItem('userId', response.userId); // Adjust based on actual response structure
      setFormData({
        full_name: '',
        email: '',
        contact_phone: '',
        address: '',
        role: 'user',
        password: '',
        confirmPassword: ''
      });
    } catch (err: any) {
      console.error("Failed to register: ", err);
      if (err.status === 'PARSING_ERROR') {
        alert(err.data);
      } else if (err.status === 400 && err.data === 'User already exists') {
        alert("User with this email already exists. Please use a different email.");
      } else {
        alert("Registration failed!");
      }
    }
  };

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
      <div className="flex-grow min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                placeholder="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPhone">
                Contact Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contactPhone"
                type="tel"
                placeholder="Contact Phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
            {isError && (
              <div className="mt-4 text-red-500 text-center">
                {/* {error?.data || "An error occurred during registration"} */}
              </div>
            )}
          </form>
          {isSuccess && (
            <div className="mt-4 text-green-500 text-center">
              Registration successful!
            </div>
          )}
        </div>
      </div>
      <footer className="w-full py-4 bg-white shadow-md mt-auto">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-gray-800">
            &copy; 2024 KimExpress Car Hire. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-800 hover:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 2h3v4h-3V2zM12 2h3v4h-3V2zM6 2h3v4H6V2zM2 8h20v12H2V8zM16 12h2v2h-2v-2zM10 12h2v2h-2v-2zM6 12h2v2H6v-2z"
                />
              </svg>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-800 hover:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M22.46 6c-.77.35-1.5.59-2.28.7.83-.5 1.47-1.28 1.76-2.2-.77.47-1.63.8-2.54.98a4.45 4.45 0 0 0-7.55 4.05 12.59 12.59 0 0 1-9.1-4.6 4.45 4.45 0 0 0 1.38 5.95c-.67-.03-1.3-.21-1.85-.52v.05a4.45 4.45 0 0 0 3.57 4.35c-.58.16-1.2.19-1.83.07a4.45 4.45 0 0 0 4.16 3.1 8.95 8.95 0 0 1-5.56 1.92c-.36 0-.72-.02-1.08-.06A12.64 12.64 0 0 0 7.44 21c8.3 0 12.83-6.88 12.83-12.84 0-.2 0-.41-.02-.61A9.1 9.1 0 0 0 22.46 6z"
                />
              </svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-800 hover:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0zM12 2.3a9.7 9.7 0 0 1 9.7 9.7 9.7 9.7 0 0 1-9.7 9.7A9.7 9.7 0 0 1 2.3 12 9.7 9.7 0 0 1 12 2.3zm0 1.4a8.3 8.3 0 1 0 8.3 8.3 8.3 8.3 0 0 0-8.3-8.3z"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterForm;
