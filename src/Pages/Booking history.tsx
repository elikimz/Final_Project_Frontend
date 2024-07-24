import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Booking {
  bookingId: number;
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: string;
}

const BookingHistoryPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this mock data with an API call to fetch real booking history
    const fetchBookingHistory = async () => {
      try {
        // Example API call
        // const response = await fetch('/api/booking-history');
        // const data = await response.json();
        
        // Mock data
        const data: Booking[] = [
          {
            bookingId: 1,
            userId: 101,
            vehicleId: 202,
            locationId: 303,
            bookingDate: '2024-07-01',
            returnDate: '2024-07-05',
            totalAmount: 150.00,
            bookingStatus: 'Completed'
          },
          {
            bookingId: 2,
            userId: 102,
            vehicleId: 203,
            locationId: 304,
            bookingDate: '2024-07-10',
            returnDate: '2024-07-15',
            totalAmount: 200.00,
            bookingStatus: 'Completed'
          }
        ];

        setBookings(data);
      } catch (error) {
        toast.error('Failed to fetch booking history');
      }
    };

    fetchBookingHistory();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-teal-600">Booking History</h2>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.bookingId} className="bg-teal-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-teal-700">Booking ID: {booking.bookingId}</h3>
                <p><strong>User ID:</strong> {booking.userId}</p>
                <p><strong>Vehicle ID:</strong> {booking.vehicleId}</p>
                <p><strong>Location ID:</strong> {booking.locationId}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><strong>Return Date:</strong> {new Date(booking.returnDate).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> ${booking.totalAmount.toFixed(2)}</p>
                <p><strong>Status:</strong> {booking.bookingStatus}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500">No booking history available.</p>
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

export default BookingHistoryPage;
