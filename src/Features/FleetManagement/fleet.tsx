import React, { useState, useEffect } from 'react';
import { useGetFleetItemsQuery, useCreateFleetItemMutation, useDeleteFleetItemMutation, useUpdateFleetItemMutation } from './fleetAPI'; // Adjust the path if needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for Toastify

const FleetManagementPage: React.FC = () => {
  const { data: fleetItems, isLoading, isError, refetch } = useGetFleetItemsQuery();
  const [createFleetItem, { isLoading: isCreating }] = useCreateFleetItemMutation();
  const [deleteFleetItem] = useDeleteFleetItemMutation();
  const [updateFleetItem, { isLoading: isUpdating }] = useUpdateFleetItemMutation();

  const [formData, setFormData] = useState({
    vehicleId: '', 
    status: '',
    acquisition_date: '',
    depreciation_rate: '',
    current_value: '',
    maintenance_cost: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  useEffect(() => {
    const storedVehicleId = localStorage.getItem('vehicleId');
    if (storedVehicleId) {
      const vehicleId = parseInt(storedVehicleId, 10);
      console.log('Retrieved vehicleId from localStorage:', vehicleId);
      if (!isNaN(vehicleId)) {
        setFormData((prevData) => {
          console.log('Form data with vehicleId from localStorage:', { ...prevData, vehicleId: vehicleId.toString() });
          return { ...prevData, vehicleId: vehicleId.toString() };
        });
      } else {
        console.error('Invalid vehicleId in local storage:', storedVehicleId);
      }
    } else {
      console.error('Vehicle ID not found in local storage');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      console.log('Form data updated:', { ...prevData, [name]: value });
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.status || !formData.acquisition_date) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const numericFormData = {
      ...formData,
      vehicleId: parseInt(formData.vehicleId, 10),
      depreciation_rate: parseFloat(formData.depreciation_rate),
      current_value: parseFloat(formData.current_value),
      maintenance_cost: parseFloat(formData.maintenance_cost),
    };

    console.log('Form data being submitted:', numericFormData);

    try {
      if (isEditing && currentId !== null) {
        console.log('Updating fleet item with ID:', currentId);
        await updateFleetItem({ id: currentId, ...numericFormData }).unwrap();
        toast.success('Fleet item updated successfully!');
      } else {
        console.log('Creating new fleet item with data:', numericFormData);
        await createFleetItem(numericFormData).unwrap();
        toast.success('Fleet item created successfully!');
      }
      await refetch();
      setFormData({
        vehicleId: '',
        status: '',
        acquisition_date: '',
        depreciation_rate: '',
        current_value: '',
        maintenance_cost: '',
      });
      console.log('Form data reset after submission');
      setIsEditing(false);
      setCurrentId(null);
      setShowForm(false); // Hide the form after submission
    } catch (err) {
      console.error('Error handling fleet item:', err);
      toast.error('Failed to handle fleet item.');
    }
  };

  const handleEditClick = (item: any) => {
    console.log('Editing fleet item:', item);
    setFormData({
      vehicleId: item.vehicleId.toString(),
      status: item.status,
      acquisition_date: item.acquisition_date,
      depreciation_rate: item.depreciation_rate.toString(),
      current_value: item.current_value.toString(),
      maintenance_cost: item.maintenance_cost.toString(),
    });
    setIsEditing(true);
    setCurrentId(item.id);
    setShowForm(true); // Show the form when editing
  };

  const handleCreateClick = () => {
    setFormData({
      vehicleId: '',
      status: '',
      acquisition_date: '',
      depreciation_rate: '',
      current_value: '',
      maintenance_cost: '',
    });
    setIsEditing(false);
    setCurrentId(null);
    setShowForm(true); // Show the form when creating
  };

  const handleDeleteFleetItem = async (id: number) => {
    console.log('Deleting fleet item with ID:', id);
    try {
      await deleteFleetItem(id).unwrap();
      toast.success('Fleet item deleted successfully!');
      await refetch();
    } catch (err) {
      console.error('Error deleting fleet item:', err);
      toast.error('Failed to delete fleet item.');
    }
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Fleet Management</h1>

      <ToastContainer />

      {/* Loading and Error Handling */}
      {isLoading && <p className="text-blue-700">Loading fleet items...</p>}
      {isError && <p className="text-red-700">Failed to load fleet items.</p>}

      {/* Button to Create New Fleet Item */}
      <button
        onClick={handleCreateClick}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-6"
      >
        Create New Fleet Item
      </button>

      {/* Form */}
      {showForm && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">{isEditing ? 'Update Fleet Item' : 'Create New Fleet Item'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle ID</label>
              <input
                type="text"
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Acquisition Date</label>
              <input
                type="date"
                name="acquisition_date"
                value={formData.acquisition_date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Depreciation Rate</label>
              <input
                type="text"
                name="depreciation_rate"
                value={formData.depreciation_rate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Value</label>
              <input
                type="text"
                name="current_value"
                value={formData.current_value}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Maintenance Cost</label>
              <input
                type="text"
                name="maintenance_cost"
                value={formData.maintenance_cost}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={isCreating || isUpdating}
            >
              {isEditing ? (isUpdating ? 'Updating...' : 'Update Fleet Item') : (isCreating ? 'Creating...' : 'Create Fleet Item')}
            </button>
          </form>
        </div>
      )}

      {/* Fleet Items Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">Fleet Items List</h2>
        {fleetItems && fleetItems.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Vehicle ID</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Acquisition Date</th>
                <th className="border border-gray-300 px-4 py-2">Depreciation Rate</th>
                <th className="border border-gray-300 px-4 py-2">Current Value</th>
                <th className="border border-gray-300 px-4 py-2">Maintenance Cost</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fleetItems.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.vehicleId}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.acquisition_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.depreciation_rate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.current_value}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.maintenance_cost}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFleetItem(item.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700">No fleet items found.</p>
        )}
      </div>
    </div>
  );
};

export default FleetManagementPage;
