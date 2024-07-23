import  { useState } from 'react';
import { useCreateUserMutation } from './usersAPI';

function AddUserForm({ onUserAdded }: { onUserAdded: () => void }) {
  const [addUser] = useCreateUserMutation();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_phone: '',
    address: '',
  });

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async () => {
    await addUser(formData);
    setFormData({
      full_name: '',
      email: '',
      contact_phone: '',
      address: '',
    });
    onUserAdded();
  };

  return (
    <div className="container mx-auto px-4 py-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Add New User</h2>
      <form className="mb-4">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="full_name">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="contact_phone">
            Contact Phone
          </label>
          <input
            type="text"
            id="contact_phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white text-gray-700"
          />
        </div>
        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
