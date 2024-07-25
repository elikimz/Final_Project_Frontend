import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-700 mb-6">Thank you for your booking. Your payment was processed successfully.</p>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
