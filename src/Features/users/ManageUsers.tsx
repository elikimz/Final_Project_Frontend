import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation, User } from './usersAPI';
import { useRegisterUserMutation } from '../register/RegisterAPI'; // Import the correct hook
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set the app element to avoid screen readers reading background content
Modal.setAppElement('#root');

const ManageUsers: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [registerUser] = useRegisterUserMutation(); // Use the correct hook for creating a user

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
    role: '',
    password: '', // Added password field
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const openModal = (user: User | null) => {
    setSelectedUser(user);
    setIsEditMode(user !== null);
    if (user) {
      setFormData({
        full_name: user.full_name,
        email: user.email,
        contact_phone: user.contact_phone,
        address: user.address,
        role: user.role || '',
        password: '', // Password should be empty on edit to avoid showing the current password
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        contact_phone: '',
        address: '',
        role: '',
        password: '', // Clear password on new user creation
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode && selectedUser) {
        await updateUser({ id: selectedUser.id, ...formData }).unwrap();
        toast.success('User updated successfully!');
      } else {
        await registerUser(formData).unwrap(); // Use the correct hook for creating a user
        toast.success('User created successfully!');
      }
      refetch();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      toast.success('User deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while deleting the user.');
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <button
        onClick={() => navigate('/AdminDashboard')} // Navigate back to dashboard
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back to Dashboard
      </button>
      <button
        onClick={() => openModal(null)}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create New User
      </button>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr><td colSpan={7} className="text-center py-4">Loading...</td></tr>
            ) : isError ? (
              <tr><td colSpan={7} className="text-center py-4 text-red-500">Error loading users</td></tr>
            ) : users?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.full_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.contact_phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openModal(user)} className="text-blue-600 hover:text-blue-900">Edit</button>
                  <button onClick={() => handleDelete(Number(user.id))} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={isEditMode ? 'Edit User' : 'Add New User'}
        className="fixed inset-0 flex items-center justify-center p-4 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit User' : 'Add New User'}</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="full_name">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="contact_phone">
                Contact Phone
              </label>
              <input
                type="text"
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isEditMode ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUsers;
