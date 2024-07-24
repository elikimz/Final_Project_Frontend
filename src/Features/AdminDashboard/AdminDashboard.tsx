// import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen shadow-md">
      <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
      <nav className="mt-6">
        <ul>
          <li>
            <button
              onClick={() => handleNavigation('/AdminDashboard')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/SpecsForm')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
             Create new specification
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/VehiclesAdmin')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Manage Vehicles
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/ManageUsers')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Manage Users
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/BookingsList')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Booking List
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/locations-branches')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Locations and Branches
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/CustomerSupportTicketsPage')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Customer Support Tickets
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/FleetManagementPage')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Fleet Management
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/AddUserForm')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('/CurrentBookingsPage')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const DashboardContent = () => {
  return (
    <main className="flex-1 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
          <p>Summary of total bookings...</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p>Summary of revenue...</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Vehicle Utilization</h2>
          <p>Statistics on vehicle utilization...</p>
        </div>
      </div>
    </main>
  );
};

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default AdminDashboard;
