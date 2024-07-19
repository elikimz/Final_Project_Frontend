import React, { useState, useEffect } from 'react';
import { useGetBookingQuery, useCreateBookingsMutation, useUpdateBookingMutation } from './bookingAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Booking {
  id?: number;
  userId: string;
  vehicleId: string;
  locationId: string;
  booking_date: string;
  return_date: string;
  total_amount: string;
  booking_status: string;
}

function BookingForm() {
  const { data: bookings, isLoading, isError, refetch } = useGetBookingQuery();
  const [createBooking] = useCreateBookingsMutation();
  const [updateBooking] = useUpdateBookingMutation();

  const [isModalOpen, setIsModalOpen] = useState(true); // Default to true to show the form automatically
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [vehicleId, setVehicleId] = useState<string>('');
  const [locationId, setLocationId] = useState<string>('');

  useEffect(() => {
    // Retrieve IDs from local storage
    setUserId(localStorage.getItem('userId') || '');
    setVehicleId(localStorage.getItem('vehicleId') || '');
    setLocationId(localStorage.getItem('locationId') || '');
  }, []);

  const closeModal = () => {
    setCurrentBooking(null);
    setIsModalOpen(false);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentBooking) {
        const bookingData = {
          ...currentBooking,
          userId,
          vehicleId,
          locationId
        };

        if (currentBooking.id) {
          await updateBooking(bookingData).unwrap();
          toast.success('Booking updated successfully');
        } else {
          await createBooking(bookingData).unwrap();
          toast.success('Booking created successfully');
        }
        refetch();
        closeModal();
      }
    } catch (error) {
      console.error('Failed to update/create booking:', error);
      toast.error('Failed to update/create booking');
    }
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-2">
              {currentBooking ? 'Update Booking' : 'Create New Booking'}
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
                      booking_date: e.target.value,
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
                      return_date: e.target.value,
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
                      total_amount: e.target.value,
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
                  {currentBooking ? 'Update' : 'Create'}
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
