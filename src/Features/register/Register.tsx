import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../register/RegisterAPI';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
    role: 'user',
    password: '',
    confirmPassword: '',
  });

  const [registerUser, { isLoading, isSuccess, isError }] = useRegisterUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(formData).unwrap();
      alert("Registration successful!");
      localStorage.setItem('userId', response.userId);
      setFormData({
        full_name: '',
        email: '',
        contact_phone: '',
        address: '',
        role: 'user',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.error("Failed to register: ", err);
      if (err instanceof Error) {
        if (err.message === 'User already exists') {
          alert("User with this email already exists. Please use a different email.");
        } else {
          alert("Registration failed!");
        }
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (

    <>
    <Navbar />
    <div className="flex-grow min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-gray-100 p-4">
      <div className="w-96 h-96 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="px-6 py-4 bg-blue-500 flex-grow">
          <h2 className="text-3xl font-bold text-white text-center">Register</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-4 flex-grow overflow-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullName">
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
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="contactPhone">
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
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">
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
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
          {isError && (
            <div className="mt-4 text-red-500 text-center">
              Registration failed!
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
    <Footer />
    </>
  );
};

export default RegisterForm;
