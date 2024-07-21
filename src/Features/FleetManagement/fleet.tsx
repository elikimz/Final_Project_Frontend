import React, { useState, useEffect } from 'react';
import { useGetFleetItemsQuery, useCreateFleetItemMutation, useDeleteFleetItemMutation, useUpdateFleetItemMutation } from './fleetAPI'; // Adjust the path if needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for Toastify

const FleetManagementPage: React.FC = () => {
  const { data: fleetItems, isLoading, isError, refetch } = useGetFleetItemsQuery();
  const [createFleetItem, { isLoading: isCreating }] = useCreateFleetItemMutation();
  const [deleteFleetItem, { isLoading: isDeleting }] = useDeleteFleetItemMutation();
  const [updateFleetItem, { isLoading: isUpdating }] = useUpdateFleetItemMutation();

  const [formData, setFormData] = useState({
    vehicle_id: '', // Changed to match API interface
    status: '',
    acquisition_date: '',
    depreciation_rate: '',
    current_value: '',
    maintenance_cost: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    const storedVehicleId = localStorage.getItem('vehicleId');
    if (storedVehicleId) {
      const vehicleId = parseInt(storedVehicleId, 10);
      console.log('Retrieved vehicleId from localStorage:', vehicleId);
      if (!isNaN(vehicleId)) {
        setFormData((prevData) => {
          console.log('Form data with vehicleId from localStorage:', { ...prevData, vehicle_id: vehicleId }); // Updated key
          return { ...prevData, vehicle_id: vehicleId };
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
    try {
      console.log('Form data being submitted:', formData);
      if (isEditing && currentId !== null) {
        console.log('Updating fleet item with ID:', currentId);
        await updateFleetItem({ id: currentId, ...formData }).unwrap();
        toast.success('Fleet item updated successfully!');
      } else {
        console.log('Creating new fleet item with data:', formData);
        await createFleetItem(formData).unwrap();
        toast.success('Fleet item created successfully!');
      }
      await refetch();
      setFormData({
        vehicle_id: '',
        status: '',
        acquisition_date: '',
        depreciation_rate: '',
        current_value: '',
        maintenance_cost: '',
      });
      console.log('Form data reset after submission');
      setIsEditing(false);
      setCurrentId(null);
    } catch (err) {
      console.error('Error handling fleet item:', err);
      toast.error('Failed to handle fleet item.');
    }
  };

  const handleEditClick = (item: any) => {
    console.log('Editing fleet item:', item);
    setFormData({
      vehicle_id: item.vehicle_id, // Updated key
      status: item.status,
      acquisition_date: item.acquisition_date,
      depreciation_rate: item.depreciation_rate,
      current_value: item.current_value,
      maintenance_cost: item.maintenance_cost,
    });
    setIsEditing(true);
    setCurrentId(item.id);
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

      {/* Form */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Update Fleet Item' : 'Create New Fleet Item'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle ID</label>
            <input
              type="text"
              name="vehicle_id" // Updated name attribute
              value={formData.vehicle_id}
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

      {/* Fleet Items Table */}
      {!isLoading && !isError && fleetItems && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Vehicle ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Updated At</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acquisition Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Depreciation Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Current Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Maintenance Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fleetItems.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.vehicle_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.acquisition_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.depreciation_rate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.current_value}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.maintenance_cost}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFleetItem(item.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FleetManagementPage;
