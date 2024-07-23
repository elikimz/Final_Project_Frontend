//import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';

function Users() {
  const navigate = useNavigate();

  const handleNavigateToCurrentBookings = () => {
    navigate('/CustomerSupportTicketsPage'); // Navigate to the current bookings page
  };

  const handleNavigateToBookingHistory = () => {
    navigate('/profilemanagement'); // Navigate to the booking history page
  };

  const handleNavigateToAccountSettings = () => {
    navigate('/profilemanagement'); // Navigate to the account settings page
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        {/* Sidebar Navigation */}
        <aside className="w-1/4 bg-green-900 shadow-md text-white p-4">
          <div className="text-2xl font-bold mb-8">Dashboard</div>
          <nav>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={handleNavigateToCurrentBookings}
                  className="text-white hover:text-gray-400"
                >
                Create Ticket
                </button>
              </li>
              <li>
                <button
                  onClick={handleNavigateToBookingHistory}
                  className="text-white hover:text-gray-400"
                >
                  Booking History
                </button>
              </li>
              <li>
                <button
                  onClick={handleNavigateToAccountSettings}
                  className="text-white hover:text-gray-400"
                >
                  Account Settings
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="w-3/4 p-4">
          {/* Overview Section */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-100 shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold">Current Bookings</h3>
              <p>Summary of current bookings...</p>
            </div>
            <div className="bg-blue-100 shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold">Booking History</h3>
              <p>Summary of past bookings...</p>
            </div>
            <div className="bg-purple-100 shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold">Account Settings</h3>
              <p>Summary of account settings...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
