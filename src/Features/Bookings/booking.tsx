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

  const [isModalOpen, setIsModalOpen] = useState(false); // Start with modal closed
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

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm(); // Ensure the form resets when closing the modal
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
      const bookingData = {
        ...currentBooking,
        user_id: userId,
        vehicle_id: vehicleId,
        location_id: locationId,
        total_amount: parseInt(currentBooking.total_amount.toString())
      };

      if (currentBooking.id) {
        await updateBooking(bookingData).unwrap();
        toast.success('Booking updated successfully', { containerId: 'modal' });
      } else {
        await createBooking(bookingData).unwrap();
        toast.success('Booking created successfully', { containerId: 'modal' });
      }
      refetch();
      resetForm();
      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error('Failed to update/create booking:', error);
      toast.error('Failed to update/create booking', { containerId: 'modal' });
      if (error?.data) {
        console.error('Error data:', error.data);
      }
    }
  };

  return (
    <div>
      <button onClick={openModal} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg">
        {currentBooking?.id ? 'Update Booking' : 'Create Booking'}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <ToastContainer
              containerId="modal"
              position="bottom-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
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
                      booking_date: e.target.value || null,
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
                      return_date: e.target.value || null,
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
                  onChange={(e) =>
                    setCurrentBooking({
                      ...currentBooking!,
                      total_amount: parseInt(e.target.value),
                    })
                  }
                  className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
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
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
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
