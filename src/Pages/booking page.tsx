import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BookingDetails {
  bookingId: number;
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: string;
}

const CurrentBookingsPage: React.FC = () => {
  const navigate = useNavigate();

  const getBookingDetails = () => {
    const bookingId = localStorage.getItem('bookingId');
    const userId = localStorage.getItem('userId');
    const vehicleId = localStorage.getItem('vehicleId');
    const locationId = localStorage.getItem('locationId');
    const bookingDate = localStorage.getItem('bookingDate');
    const returnDate = localStorage.getItem('returnDate');
    const totalAmount = localStorage.getItem('totalAmount');
    const bookingStatus = localStorage.getItem('bookingStatus');

    if (bookingId && userId && vehicleId && locationId && bookingDate && returnDate && totalAmount && bookingStatus) {
      return {
        bookingId: parseInt(bookingId, 10),
        userId: parseInt(userId, 10),
        vehicleId: parseInt(vehicleId, 10),
        locationId: parseInt(locationId, 10),
        bookingDate,
        returnDate,
        totalAmount: parseFloat(totalAmount),
        bookingStatus
      } as BookingDetails;
    }

    toast.error('No booking details found in local storage');
    return null;
  };

  const bookingDetails = getBookingDetails();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-teal-600">Current Booking Details</h2>
        {bookingDetails ? (
          <div className="space-y-4">
            <div className="bg-teal-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal-700">Booking Information</h3>
              <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
              <p><strong>User ID:</strong> {bookingDetails.userId}</p>
              <p><strong>Vehicle ID:</strong> {bookingDetails.vehicleId}</p>
              <p><strong>Location ID:</strong> {bookingDetails.locationId}</p>
              <p><strong>Booking Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleDateString()}</p>
              <p><strong>Return Date:</strong> {new Date(bookingDetails.returnDate).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> ${bookingDetails.totalAmount.toFixed(2)}</p>
              <p><strong>Booking Status:</strong> {bookingDetails.bookingStatus}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No booking details available.</p>
        )}
        <button
          onClick={() => navigate('/Users')}
          className="mt-6 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Go Back
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CurrentBookingsPage;
