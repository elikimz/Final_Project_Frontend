//import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../Features/login/login.API';
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate hook
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({});
      navigate('/login'); // Navigate to the login page after logging out
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Select Booking</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              {/* Add any indicator content here */}
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
            {/* Add any card content here */}
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" />
                {/* src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0" alt="Beautiful Landscape" /> */}

            </div>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
              <Link to="/Users" className="text-black hover:text-gray-300">Dashboard</Link>
            </li>
            <li>
              <Link to="/UserProfile" className="text-black hover:text-gray-300">Profile</Link>
            </li>
           
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-ghost text-black"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
