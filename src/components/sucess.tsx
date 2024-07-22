import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const success = query.get('success') === 'true';
    const bookingIdParam = query.get('booking_id');
    const status = query.get('status');

    if (success && bookingIdParam && status) {
      setBookingId(parseInt(bookingIdParam));
      setPaymentStatus(status);
    } else {
      toast.error('Payment was not successful.');
      navigate('/'); // Redirect to homepage or another appropriate page
    }
  }, [location.search, navigate]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h1>
      <p className="text-lg mb-4">Thank you for your payment. Your booking is confirmed.</p>
      <p className="text-md mb-4">Booking ID: <span className="font-semibold">{bookingId}</span></p>
      <p className="text-md mb-4">Payment Status: <span className="font-semibold">{paymentStatus}</span></p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Go to Homepage
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SuccessPage;
