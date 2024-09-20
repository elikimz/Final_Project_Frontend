import { useState } from 'react';
import Navbar from '../../components/navbar';
import CurrentBookings from '../../Pages/Booking history';
import BookingHistory from '../../Pages/booking page';
import Vehicles from '../../Features/Vehicles/vehicle';
import UserProfile from '../../Pages/userprofile';

// Define components for each section
const CurrentBookingsContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Booking History</h2>
    <CurrentBookings />
  </div>
);

const BookingHistoryContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Current Bookings</h2>
    <BookingHistory />
  </div>
);

const VehiclesContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">Vehicles</h2>
    <Vehicles />
  </div>
);

const UserProfileContent = () => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-2">My Profile</h2>
    <UserProfile />
  </div>
);

const Sidebar = ({ onSelect }: { onSelect: (section: string) => void }) => {
  return (
    <aside className="w-64 bg-green-900 text-white h-full shadow-md flex-shrink-0 overflow-y-auto">
      <div className="p-4 text-2xl font-bold">Dashboard</div>
      <nav className="mt-6">
        <ul>
          <li>
            <button
              onClick={() => onSelect('bookingHistory')}
              className="block p-4 hover:bg-green-700 w-full text-left"
            >
              Current Bookings 
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('currentBookings')}
              className="block p-4 hover:bg-green-700 w-full text-left"
            >
              Booking History
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('vehicles')}
              className="block p-4 hover:bg-green-700 w-full text-left"
            >
              Vehicles
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('profile')}
              className="block p-4 hover:bg-green-700 w-full text-left"
            >
              My Profile
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const Users = () => {
  const [activeSection, setActiveSection] = useState<string>('currentBookings');

  const renderContent = () => {
    switch (activeSection) {
      case 'currentBookings':
        return <CurrentBookingsContent />;
      case 'bookingHistory':
        return <BookingHistoryContent />;
      case 'vehicles':
        return <VehiclesContent />;
      case 'profile':
        return <UserProfileContent />;
      default:
        return <div className="bg-white p-4 shadow-md rounded-lg">Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSelect={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Users;
