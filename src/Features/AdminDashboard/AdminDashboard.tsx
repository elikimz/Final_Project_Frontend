import { useState } from 'react';
import { useLogoutMutation } from '../login/login.API'; // Adjust the import path as necessary
import SpecsForm from '../../Features/cars_specifications/specForm';
import VehiclesAdmin from '../../Features/Vehicles/VehiclesAdmin';
import ManageUsers from'../../Features/users/ManageUsers';
import BookingsList from '../../Features/Bookings/BookingsQuery';
import CustomerSupportTicketsPage from '../../Features/customer_support_ticket/customersupport';
import FleetManagementPage from '../../Features/FleetManagement/fleet';
import AdminProfile from '../../Pages/AdminProfile';

// Define components for each section
const CreateSpecificationContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Create New Specification</h2>
    <SpecsForm/>
  </div>
);

const ManageVehiclesContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Manage Vehicles</h2>
    <VehiclesAdmin/>
  </div>
);

const ManageUsersContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
    <ManageUsers/> {/* Include ManageUsers component here */}
  </div>
);

const BookingListContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Booking List</h2>
    <BookingsList />
  </div>
);

const LocationsBranchesContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Locations and Branches</h2>
    <p>locations and branches loading...</p>
  </div>
);

const CustomerSupportTicketsContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Customer Support Tickets</h2>
    <CustomerSupportTicketsPage />
  </div>
);

const FleetManagementContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Fleet Management</h2>
    <FleetManagementPage />
  </div>
);

const SettingsContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Settings</h2>
    <AdminProfile />
  </div>
);

const Sidebar = ({ onSelect }: { onSelect: (section: string) => void }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full shadow-md flex-shrink-0 overflow-y-auto">
      <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
      <nav className="mt-6">
        <ul>
          <li>
            <button
              onClick={() => onSelect('createSpecification')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Create new specification
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('manageVehicles')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Manage Vehicles
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('manageUsers')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Manage Users
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('bookingList')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Booking List
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('locationsBranches')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Locations and Branches
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('customerSupportTickets')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Customer Support Tickets
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('fleetManagement')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Fleet Management
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('settings')}
              className="block p-4 hover:bg-gray-700 w-full text-left"
            >
              Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('logout')}
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

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<string>('createSpecification');
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({});
      // Optionally, redirect to the login page or handle logout UI update
      window.location.href = '/login'; // Adjust the path as needed
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'createSpecification':
        return <CreateSpecificationContent />;
      case 'manageVehicles':
        return <ManageVehiclesContent />;
      case 'manageUsers':
        return <ManageUsersContent />;
      case 'bookingList':
        return <BookingListContent />;
      case 'locationsBranches':
        return <LocationsBranchesContent />;
      case 'customerSupportTickets':
        return <CustomerSupportTicketsContent />;
      case 'fleetManagement':
        return <FleetManagementContent />;
      case 'settings':
        return <SettingsContent />;
      case 'logout':
        handleLogout();
        return <div className="bg-white p-4 shadow-md rounded-lg">Logging out...</div>;
      default:
        return <div className="bg-white p-4 shadow-md rounded-lg">Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSelect={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
