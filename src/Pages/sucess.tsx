import { useNavigate, useLocation } from 'react-router-dom';

function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    navigate('/'); // Redirect to home if no booking details are available
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">Payment Successful!</h2>
      <p className="text-gray-700 mb-4">Thank you for your booking. Here are your booking details:</p>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-teal-600">Booking Details</h3>
        <p className="text-gray-700"><strong>Booking ID:</strong> {bookingDetails.id}</p>
        <p className="text-gray-700"><strong>User ID:</strong> {bookingDetails.user_id}</p>
        <p className="text-gray-700"><strong>Vehicle ID:</strong> {bookingDetails.vehicle_id}</p>
        <p className="text-gray-700"><strong>Location ID:</strong> {bookingDetails.location_id}</p>
        <p className="text-gray-700"><strong>Booking Date:</strong> {new Date(bookingDetails.booking_date).toLocaleDateString()}</p>
        <p className="text-gray-700"><strong>Return Date:</strong> {new Date(bookingDetails.return_date).toLocaleDateString()}</p>
        <p className="text-gray-700"><strong>Total Amount:</strong> ${bookingDetails.total_amount.toFixed(2)}</p>
        <p className="text-gray-700"><strong>Booking Status:</strong> {bookingDetails.booking_status}</p>
      </div>
      <button
        onClick={() => navigate('/vehicles')}
        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
      >
        Go to Vehicles
      </button>
    </div>
  );
}

export default SuccessPage;
