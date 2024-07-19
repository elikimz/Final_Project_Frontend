import React, { useState, useEffect } from 'react';
import { useGetBookingQuery, useCreateBookingsMutation, useUpdateBookingMutation } from './bookingAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Booking {
  id?: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string | null;
  return_date: string | null;
  total_amount: number;
  booking_status: string;
}

function BookingForm() {
  const { data: bookings, isLoading, isError, refetch } = useGetBookingQuery();
  const [createBooking] = useCreateBookingsMutation();
  const [updateBooking] = useUpdateBookingMutation();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentBooking, setCurrentBooking] = useState<Booking>({
    user_id: 0,
    vehicle_id: 0,
    location_id: 0,
    booking_date: null,
    return_date: null,
    total_amount: 0,
    booking_status: ''
  });
  const [userId, setUserId] = useState<number>(0);
  const [vehicleId, setVehicleId] = useState<number>(0);
  const [locationId, setLocationId] = useState<number>(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedVehicleId = localStorage.getItem('vehicleId');
    const storedLocationId = localStorage.getItem('locationId');

    console.log('Retrieved userId:', storedUserId);
    console.log('Retrieved vehicleId:', storedVehicleId);
    console.log('Retrieved locationId:', storedLocationId);

    if (storedUserId) setUserId(parseInt(storedUserId));
    if (storedVehicleId) setVehicleId(parseInt(storedVehicleId));
    if (storedLocationId) setLocationId(parseInt(storedLocationId));

    setCurrentBooking((prevBooking) => ({
      ...prevBooking,
      user_id: storedUserId ? parseInt(storedUserId) : 0,
      vehicle_id: storedVehicleId ? parseInt(storedVehicleId) : 0,
      location_id: storedLocationId ? parseInt(storedLocationId) : 0
    }));
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setCurrentBooking({
      user_id: userId,
      vehicle_id: vehicleId,
      location_id: locationId,
      booking_date: null,
      return_date: null,
      total_amount: 0,
      booking_status: ''
    });
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentBooking) {
        const bookingData = {
          ...currentBooking,
          user_id: userId,
          vehicle_id: vehicleId,
          location_id: locationId,
          total_amount: parseInt(currentBooking.total_amount.toString())
        };

        console.log('Booking data:', bookingData);

        if (currentBooking.id) {
          await updateBooking(bookingData).unwrap();
          toast.success('Booking updated successfully');
        } else {
          await createBooking(bookingData).unwrap();
          toast.success('Booking created successfully');
        }
        refetch();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to update/create booking:', error);
      toast.error('Failed to update/create booking');
      if (error?.data) {
        console.error('Error data:', error.data);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-2">
              {currentBooking?.id ? 'Update Booking' : 'Create New Booking'}
            </h2>
            <form onSubmit={handleCreateOrUpdate}>
              <label className="block mb-2">
                Booking Date:
                <input
                  type="date"
                  value={currentBooking?.booking_date || ''}
                  onChange={(e) =>
                    setCurrentBooking({
                      ...currentBooking!,
                      booking_date: e.target.value || null,
                    })
                  }
                  className="block w-full mt-1 border rounded px-2 py-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Return Date:
                <input
                  type="date"
                  value={currentBooking?.return_date || ''}
                  onChange={(e) =>
                    setCurrentBooking({
                      ...currentBooking!,
                      return_date: e.target.value || null,
                    })
                  }
                  className="block w-full mt-1 border rounded px-2 py-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Total Amount:
                <input
                  type="number"
                  value={currentBooking?.total_amount || ''}
                  onChange={(e) =>
                    setCurrentBooking({
                      ...currentBooking!,
                      total_amount: parseInt(e.target.value),
                    })
                  }
                  className="block w-full mt-1 border rounded px-2 py-1"
                  required
                />
              </label>
              <label className="block mb-2">
                Booking Status:
                <input
                  type="text"
                  value={currentBooking?.booking_status || ''}
                  onChange={(e) =>
                    setCurrentBooking({
                      ...currentBooking!,
                      booking_status: e.target.value,
                    })
                  }
                  className="block w-full mt-1 border rounded px-2 py-1"
                  required
                />
              </label>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                >
                  {currentBooking?.id ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
