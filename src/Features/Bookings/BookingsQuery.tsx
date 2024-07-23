import React from 'react';
import { useGetBookingQuery } from './bookingAPI'; // Adjust the import path according to your setup
import { Booking } from './bookingAPI'; // Adjust the import path according to your setup

const BookingsList: React.FC = () => {
  const { data: bookings, isLoading, isError, error } = useGetBookingQuery();

  if (isLoading) return <p>Loading bookings...</p>;

  // Properly handle error type
  if (isError) {
    let errorMessage = 'An error occurred while loading bookings.';
    if ('data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
      errorMessage = (error.data as { message?: string }).message || errorMessage;
    }
    return <p>Error loading bookings: {errorMessage}</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">Bookings List</h2>
      {bookings && bookings.length > 0 ? (
        <table className="w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 border-r">ID</th>
              <th className="py-2 px-4 border-r">User ID</th>
              <th className="py-2 px-4 border-r">Vehicle ID</th>
              <th className="py-2 px-4 border-r">Location ID</th>
              <th className="py-2 px-4 border-r">Booking Date</th>
              <th className="py-2 px-4 border-r">Return Date</th>
              <th className="py-2 px-4 border-r">Total Amount</th>
              <th className="py-2 px-4 border-r">Booking Status</th>
              <th className="py-2 px-4">Created At</th>
              <th className="py-2 px-4">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking: Booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border-r">{booking.id}</td>
                <td className="py-2 px-4 border-r">{booking.user_id}</td>
                <td className="py-2 px-4 border-r">{booking.vehicle_id}</td>
                <td className="py-2 px-4 border-r">{booking.location_id}</td>
                <td className="py-2 px-4 border-r">{booking.booking_date}</td>
                <td className="py-2 px-4 border-r">{booking.return_date}</td>
                <td className="py-2 px-4 border-r">{booking.total_amount}</td>
                <td className="py-2 px-4 border-r">{booking.booking_status}</td>
                <td className="py-2 px-4">{booking.created_at?.toLocaleString() || 'N/A'}</td>
                <td className="py-2 px-4">{booking.updated_at?.toLocaleString() || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default BookingsList;
