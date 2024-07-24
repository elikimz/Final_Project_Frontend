import React, { useState, useEffect } from 'react';
import { useGetBookingQuery, useCreateBookingsMutation, useUpdateBookingMutation } from './bookingAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreatePaymentMutation } from "../../Features/payment/paymentAPI";
import { useNavigate } from 'react-router-dom';

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
  const { refetch } = useGetBookingQuery();
  const [createBooking] = useCreateBookingsMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [createPayment] = useCreatePaymentMutation();

  const [currentBooking, setCurrentBooking] = useState<Booking>({
    user_id: 0,
    vehicle_id: 0,
    location_id: 0,
    booking_date: '',
    return_date: '',
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

    if (storedUserId) setUserId(parseInt(storedUserId, 10));
    if (storedVehicleId) setVehicleId(parseInt(storedVehicleId, 10));
    if (storedLocationId) setLocationId(parseInt(storedLocationId, 10));
    if (storedRentalRate) setRentalRate(parseFloat(storedRentalRate));

    setCurrentBooking((prevBooking) => ({
      ...prevBooking,
      user_id: storedUserId ? parseInt(storedUserId, 10) : 0,
      vehicle_id: storedVehicleId ? parseInt(storedVehicleId, 10) : 0,
      location_id: storedLocationId ? parseInt(storedLocationId, 10) : 0
    }));
  }, []);

  useEffect(() => {
    if (rentalRate && currentBooking.booking_date && currentBooking.return_date) {
      const bookingDate = new Date(currentBooking.booking_date);
      const returnDate = new Date(currentBooking.return_date);
      const days = Math.ceil((returnDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24));
      if (days < 0) {
        toast.error('Return date cannot be earlier than booking date');
        return;
      }
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
      booking_date: '',
      return_date: '',
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

      // Persist booking details to local storage
      if (bookingResponse && bookingResponse.id) {
        localStorage.setItem('bookingId', bookingResponse.id.toString());
        localStorage.setItem('userId', bookingResponse.user_id.toString());
        localStorage.setItem('vehicleId', bookingResponse.vehicle_id.toString());
        localStorage.setItem('locationId', bookingResponse.location_id.toString());
        localStorage.setItem('bookingDate', bookingResponse.booking_date || '');
        localStorage.setItem('returnDate', bookingResponse.return_date || '');
        localStorage.setItem('totalAmount', bookingResponse.total_amount.toString());
        localStorage.setItem('bookingStatus', bookingResponse.booking_status || '');
      } else {
        console.warn('No booking ID returned from response');
      }

      // Create payment session
      const paymentResponse = await createPayment({
        booking_id: bookingResponse.id || 0,
        user_id: userId,
        total_amount: currentBooking.total_amount
      }).unwrap();

      if (paymentResponse.url) {
        // Redirect to Stripe Checkout
        window.location.href = paymentResponse.url;
      } else {
        console.error('No redirect URL returned from payment response');
        // Navigate to Vehicles in case of no URL
        navigate('/vehicles');
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

  useEffect(() => {
    // Listen for the Stripe redirect
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment_status');

    if (paymentStatus === 'succeeded') {
      navigate('/SuccessPage');
    }
  }, [navigate]);

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
                booking_date: e.target.value || '',
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
                return_date: e.target.value || '',
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
          <select
            value={currentBooking?.booking_status || ''}
            onChange={(e) =>
              setCurrentBooking({
                ...currentBooking!,
                booking_status: e.target.value || '',
              })
            }
            className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="" disabled>Select Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {currentBooking?.id ? 'Update Booking' : 'Create Booking'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default BookingForm;
