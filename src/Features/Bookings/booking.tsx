import React, { useState } from 'react';
import { useGetBookingQuery, useCreateBookingMutation, useDeleteBookingMutation, useUpdateBookingMutation } from './bookingAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Booking {
  id: number;
  booking_date: string;
  return_date: string;
  total_amount: string;
  booking_status: string;
}

function BookingForm() {
  const { data: bookings, isLoading, isError, refetch } = useGetBookingQuery();
  const [createBooking] = useCreateBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  const openModalForUpdate = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsModalOpen(true);
  };

  const openModalForCreate = () => {
    setCurrentBooking(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentBooking(null);
    setIsModalOpen(false);
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentBooking?.id) {
        await updateBooking(currentBooking).unwrap();
        toast.success('Booking updated successfully');
      } else {
        await createBooking(currentBooking).unwrap();
        toast.success('Booking created successfully');
      }
      refetch();
      closeModal();
    } catch (error) {
      console.error('Failed to update/create booking:', error);
      toast.error('Failed to update/create booking');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBooking(id).unwrap();
      toast.success('Booking deleted successfully');
      refetch();
    } catch (error) {
      console.error('Failed to delete booking:', error);
      toast.error('Failed to delete booking');
    }
  };

  return (
    <div className="overflow-x-auto">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={openModalForCreate}
      >
        Create New Booking
      </button>
      <ToastContainer />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data.</p>
      ) : (
        bookings && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-lg shadow-md overflow-hidden hover:shadow-xl bg-gradient-to-br from-purple-400 to-indigo-500 p-4"
              >
                <h3 className="text-lg font-bold text-white">
                  {booking.booking_date} to {booking.return_date}
                </h3>
                <p className="text-sm text-white">Total Amount: ${booking.total_amount}</p>
                <p className="text-sm text-white">Status: {booking.booking_status}</p>
                <div className="flex justify-between mt-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => openModalForUpdate(booking)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
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
