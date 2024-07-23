import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation, User } from './usersAPI';
import { useLogoutMutation } from '../login/login.API';

Modal.setAppElement('#root');

function ManageUsers() {
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
    refetch();
  };

  const handleLogout = async () => {
    await logout({});
    navigate('/login'); // Navigate to the login page after logging out
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="w-full p-4">
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
                <tr><td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-red-700">Error loading users.</td></tr>
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
                        onClick={() => handleDelete(Number(user.id))}
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
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}

export default ManageUsers;
