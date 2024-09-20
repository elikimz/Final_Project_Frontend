import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation, User } from '../../Features/users/usersAPI';
import { FaPen } from 'react-icons/fa';

Modal.setAppElement('#root');

function Users() {
  const { data: userData, isLoading, isError, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
    photo: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const storedUser = {
      full_name: localStorage.getItem('full_name') ?? '',
      email: localStorage.getItem('email') ?? '',
      contact_phone: localStorage.getItem('contact_phone') ?? '',
      address: localStorage.getItem('address') ?? '',
      photo: localStorage.getItem('photo') ?? 'default-avatar.png', // Ensure photo URL is fetched from localStorage
    };
    setFormData(storedUser);
    refetch();
  }, [refetch]);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      full_name: user.full_name ?? '',
      email: user.email ?? '',
      contact_phone: user.contact_phone ?? '',
      address: user.address ?? '',
      photo: user.photo ?? 'default-avatar.png', // Ensure photo URL is set from user data
    });
    setModalIsOpen(true);
    setUpdateSuccess(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
    setUpdateSuccess(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    if (selectedUser) {
      try {
        await updateUser({ id: selectedUser.id, ...formData }).unwrap();
        setUpdateSuccess(true);

        // Save updated data to localStorage
        localStorage.setItem('full_name', formData.full_name);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('contact_phone', formData.contact_phone);
        localStorage.setItem('address', formData.address);
        localStorage.setItem('photo', formData.photo);

        refetch();

        setTimeout(() => {
          setUpdateSuccess(false);
          closeModal();
        }, 1000);
      } catch (error) {
        console.error('Update failed:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    refetch();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Welcome, {formData.full_name || ''}</h1>
          <div className="relative">
            <img
              src={formData.photo || 'default-avatar.png'}
              alt="User Photo"
              className="w-24 h-24 rounded-full object-cover"
            />
            <input
              type="file"
              id="photoInput"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <label htmlFor="photoInput" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
              <FaPen className="text-xl" />
            </label>
          </div>
        </div>
        <div className="p-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-600">Error loading data</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
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
              <tbody className="bg-gray-50 divide-y divide-gray-200">
                {userData?.map((user, index) => (
                  <tr key={user.id} className={`bg-${index % 2 === 0 ? 'white' : 'gray-100'} hover:bg-yellow-100`}>
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.full_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.contact_phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.address}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 flex space-x-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => openModal(user)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => handleDelete(Number(user.id))}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update User Profile"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Update Your Profile</h2>

          {updateSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
              <p>Profile updated successfully!</p>
            </div>
          )}

          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="full_name">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                id="full_name"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                id="email"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="contact_phone">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                id="contact_phone"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                id="address"
              />
            </div>
            <div className="relative">
              <img
                src={formData.photo || 'default-avatar.png'}
                alt="User Photo"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
              <input
                type="file"
                id="photoInput"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <label
                htmlFor="photoInput"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
              >
                <FaPen className="text-xl" />
              </label>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Users;
