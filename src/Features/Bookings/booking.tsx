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
  useGetBookingQuery();
  const [createBooking] = useCreateBookingsMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [] = useCreatePaymentMutation();

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

      // Persist booking ID to local storage
      if (bookingResponse && bookingResponse.id) {
        localStorage.setItem('bookingId', bookingResponse.id.toString());
      } else {
        console.error('Booking ID missing in response');
      }

      // Navigate to another page or perform additional actions
      navigate('/BookingConfirmationPage');

      // Optionally reset the form
      resetForm();
    } catch (error) {
      console.error('Error creating or updating booking:', error);
      toast.error('Failed to create/update booking');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-teal-600">Booking Form</h2>
      <form onSubmit={handleCreateOrUpdate}>
        {/* Other form fields for booking details */}
        <label className="block mb-4">
          <span className="text-gray-700">Booking Date:</span>
          <input
            type="date"
            value={currentBooking.booking_date || ''}
            onChange={(e) => setCurrentBooking(prev => ({ ...prev, booking_date: e.target.value }))}
            className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Return Date:</span>
          <input
            type="date"
            value={currentBooking.return_date || ''}
            onChange={(e) => setCurrentBooking(prev => ({ ...prev, return_date: e.target.value }))}
            className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Total Amount:</span>
          <input
            type="number"
            value={currentBooking.total_amount || 0}
            onChange={(e) => setCurrentBooking(prev => ({ ...prev, total_amount: parseFloat(e.target.value) }))}
            className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            readOnly
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {currentBooking.id ? 'Update Booking' : 'Create Booking'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
