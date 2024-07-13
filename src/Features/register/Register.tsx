import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useRegisterUserMutation } from '../register/RegisterAPI'; // Adjust the import path as needed

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
    role: 'user', // Setting the role to 'user' by default
    password: '',
    confirmPassword: ''
  });

  const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();

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
      await registerUser(formData).unwrap();
      alert("Registration successful!");
      setFormData({
        full_name: '',
        email: '',
        contact_phone: '',
        address: '',
        role: 'user',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
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
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
            {isError && (
              <div className="mt-4 text-red-500 text-center">
                {error?.data || "An error occurred during registration"}
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
    </div>
  );
};

export default RegisterForm;
