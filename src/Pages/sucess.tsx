import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Importing a check icon
import { motion } from 'framer-motion'; // For animations

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-200 to-blue-200">
      <motion.div
        className="bg-white p-10 rounded-lg shadow-xl text-center max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaCheckCircle className="text-green-600 text-6xl mb-4 mx-auto" />
        <h2 className="text-4xl font-bold text-green-700 mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-800 mb-6">Thank you for your booking. Your payment was processed successfully. We appreciate your business!</p>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
