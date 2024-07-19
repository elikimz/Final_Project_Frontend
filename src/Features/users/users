import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation, User } from './usersAPI';
import { useLogoutMutation } from '../login/login.API';

Modal.setAppElement('#root');

function Users() {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      full_name: user.full_name,
      email: user.email,
      contact_phone: user.contact_phone,
      address: user.address,
    });
    setModalIsOpen(true);
    setUpdateSuccess(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
    setUpdateSuccess(false);
    setFormData({
      full_name: '',
      email: '',
      contact_phone: '',
      address: '',
    });
  };

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    if (selectedUser) {
      await updateUser({ id: selectedUser.id, ...formData });
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
        closeModal();
      }, 1000);
      refetch();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setDeleteSuccess(true);
    setTimeout(() => setDeleteSuccess(false), 3000);
    refetch();
  };

  const handleLogout = async () => {
    await logout({});
    navigate('/login'); // Navigate to the login page after logging out
  };

  const handleNavigateToCurrentBookings = () => {
    navigate('/profilemanagement'); // Navigate to the current bookings page
  };

  const handleNavigateToBookingHistory = () => {
    navigate('/profilemanagement'); // Navigate to the booking history page
  };

  const handleNavigateToAccountSettings = () => {
    navigate('/profilemanagement'); // Navigate to the account settings page
  };

  return (
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
                Current Bookings
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
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
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

        {/* Users Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg mb-8">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Full Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Phone</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 divide-y divide-blue-200">
              {isLoading ? (
                <tr><td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">Loading...</td></tr>
              ) : isError ? (
                <tr><td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-red-700"></td></tr>
              ) : (
                userData?.map((user, index) => (
                  <tr key={user.id} className={`bg-${index % 2 === 0 ? 'white' : 'blue-100'} hover:bg-yellow-100`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{user.full_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{user.contact_phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">{user.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900 flex space-x-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => openModal(user)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => handleDelete(user.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Update User"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        >
          <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Update User</h2>

            {updateSuccess && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                <p>Update successful!</p>
              </div>
            )}

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="full_name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">
                  Contact Phone
                </label>
                <input
                  type="text"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="contact_phone"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Users;
