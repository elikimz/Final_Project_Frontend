import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed and imported
import Modal from 'react-modal';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation, User } from './usersAPI';

Modal.setAppElement('#root'); // Set the app root element for accessibility

function Users() {
  const { data: userData, isLoading, isError, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false); // State for update success message
  const [deleteSuccess, setDeleteSuccess] = useState(false); // State for delete success message

  useEffect(() => {
    refetch(); // Force refetch on component mount
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
    setUpdateSuccess(false); // Reset update success message on modal open
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
    setUpdateSuccess(false); // Reset update success message on modal close
    setFormData({  // Reset form data to empty values on modal close
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
      setUpdateSuccess(true); // Set update success message
      setTimeout(() => {
        setUpdateSuccess(false);
        closeModal(); // Close modal upon successful update
      }, 3000); // Clear update success message after 3 seconds
      refetch();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setDeleteSuccess(true); // Set delete success message
    setTimeout(() => setDeleteSuccess(false), 3000); // Clear delete success message after 3 seconds
    refetch();
  };

  console.log('Fetched User Data:', userData);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">KimExpress Car Hire</div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link></li>
              <li><Link to="/about" className="text-gray-800 hover:text-gray-600">About</Link></li>
              <li><Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link></li>
              <li><Link to="/register" className="text-gray-800 hover:text-gray-600">Register</Link></li>
              <li><Link to="/login" className="text-gray-800 hover:text-gray-600">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Users Table */}
      <div className="container mx-auto px-4 py-4">
        <div className="overflow-x-auto shadow-lg rounded-lg">
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

          {/* Update Success Message */}
          {updateSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p className="font-bold">User Updated Successfully</p>
            </div>
          )}

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">
                Contact Phone
              </label>
              <input
                type="text"
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
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
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Success Message */}
      {deleteSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 fixed top-0 left-0 right-0" role="alert">
          <p className="font-bold">User Deleted Successfully</p>
        </div>
      )}
    </div>
  );
}

export default Users;
