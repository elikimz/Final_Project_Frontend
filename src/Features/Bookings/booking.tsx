import React, { useState, useEffect } from 'react';
import { useGetBookingQuery, useCreateBookingsMutation, useUpdateBookingMutation } from './bookingAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
import { useCreatePaymentMutation } from "../../Features/payment/paymentAPI";
import { useNavigate } from 'react-router-dom';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51PfIZ9DBJdkd6Rdp6kRmvy0HsnibAHYubXaKT89f7w0CywtmoqKinMfjlmwQS0fVq85tfEAMOxdZmM84go2WtYDE00xJYbVAId');

export interface Booking {
  id?: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date?: string;
  return_date?: string;
  total_amount: number;
  booking_status: string;
}

function BookingForm() {
  const navigate = useNavigate();
  const { data: bookings, isLoading, isError, refetch } = useGetBookingQuery();
  const [createBooking] = useCreateBookingsMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [createPayment] = useCreatePaymentMutation();

  const [currentBooking, setCurrentBooking] = useState<Booking>({
    user_id: 0,
    vehicle_id: 0,
    location_id: 0,
    booking_date: undefined,
    return_date: undefined,
    total_amount: 0,
    booking_status: ''
  });

  const [userId, setUserId] = useState<number>(0);
  const [vehicleId, setVehicleId] = useState<number>(0);
  const [locationId, setLocationId] = useState<number>(0);
  const [rentalRate, setRentalRate] = useState<number>(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedVehicleId = localStorage.getItem('vehicleId');
    const storedLocationId = localStorage.getItem('locationId');
    const storedRentalRate = localStorage.getItem('rentalRate');

    if (storedUserId) setUserId(parseInt(storedUserId));
    if (storedVehicleId) setVehicleId(parseInt(storedVehicleId));
    if (storedLocationId) setLocationId(parseInt(storedLocationId));
    if (storedRentalRate) setRentalRate(parseFloat(storedRentalRate));

    setCurrentBooking((prevBooking) => ({
      ...prevBooking,
      user_id: storedUserId ? parseInt(storedUserId) : 0,
      vehicle_id: storedVehicleId ? parseInt(storedVehicleId) : 0,
      location_id: storedLocationId ? parseInt(storedLocationId) : 0
    }));
  }, []);

  useEffect(() => {
    // Calculate the total amount based on rental rate and booking dates
    if (rentalRate && currentBooking.booking_date && currentBooking.return_date) {
      const bookingDate = new Date(currentBooking.booking_date);
      const returnDate = new Date(currentBooking.return_date);
      const days = Math.ceil((returnDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalAmount = days * rentalRate;
      setCurrentBooking((prevBooking) => ({
        ...prevBooking,
        total_amount: totalAmount
      }));
    }
  }, [currentBooking.booking_date, currentBooking.return_date, rentalRate]);

  const resetForm = () => {
    setCurrentBooking({
      user_id: userId,
      vehicle_id: vehicleId,
      location_id: locationId,
      booking_date: undefined,
      return_date: undefined,
      total_amount: 0,
      booking_status: ''
    });
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentBooking.return_date && currentBooking.booking_date) {
      if (new Date(currentBooking.return_date) < new Date(currentBooking.booking_date)) {
        toast.error('Return date cannot be earlier than booking date');
        return;
      }
    }

    try {
      const bookingData: Partial<Booking> = {
        ...currentBooking,
        user_id: userId,
        vehicle_id: vehicleId,
        location_id: locationId,
        total_amount: parseFloat(currentBooking.total_amount.toString())
      };

      console.log('Booking Data to Send:', bookingData);

      let bookingResponse;
      if (currentBooking.id) {
        // Update existing booking
        bookingResponse = await updateBooking(bookingData).unwrap();
        console.log('Updated Booking Response:', bookingResponse);
        toast.success('Booking updated successfully');
      } else {
        // Create new booking
        bookingResponse = await createBooking(bookingData).unwrap();
        console.log('New Booking Response:', bookingResponse);
        toast.success('Booking created successfully');
      }

      // Persist booking ID to local storage
      if (bookingResponse.id) {
        localStorage.setItem('bookingId', bookingResponse.id.toString());
      } else {
        console.warn('No booking ID returned from response');
      }

      // Create payment session
      const paymentResponse = await createPayment({
        booking_id: bookingResponse.id,
        user_id: userId,
        total_amount: currentBooking.total_amount
      }).unwrap();

      if (paymentResponse.url) {
        // Redirect to Stripe Checkout
        window.location.href = paymentResponse.url;
        // Navigate to Vehicles after successful payment
        navigate('/vehicles');
      } else {
        console.error('No redirect URL returned from payment response');
      }

      refetch();
      resetForm();
    } catch (error) {
      console.error('Failed to update/create booking:', error);
      toast.error('Failed to update/create booking');
      if ((error as { data?: unknown })?.data) {
        console.error('Error data:', (error as { data?: unknown }).data);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">
        {currentBooking?.id ? 'Update Booking' : 'Create New Booking'}
      </h2>
      <form onSubmit={handleCreateOrUpdate}>
        <label className="block mb-4">
          <span className="text-gray-700">Booking Date:</span>
          <input
            type="date"
            value={currentBooking?.booking_date || ''}
            onChange={(e) =>
              setCurrentBooking({
                ...currentBooking!,
                booking_date: e.target.value || undefined,
              })
            }
            className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Return Date:</span>
          <input
            type="date"
            value={currentBooking?.return_date || ''}
            onChange={(e) =>
              setCurrentBooking({
                ...currentBooking!,
                return_date: e.target.value || undefined,
              })
            }
            className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Total Amount:</span>
          <input
            type="number"
            value={currentBooking?.total_amount || ''}
            readOnly
            className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Booking Status:</span>
          <input
            type="text"
            value={currentBooking?.booking_status || ''}
            onChange={(e) =>
              setCurrentBooking({
                ...currentBooking!,
                booking_status: e.target.value,
              })
            }
            className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {currentBooking?.id ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
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
}

export default BookingForm;
