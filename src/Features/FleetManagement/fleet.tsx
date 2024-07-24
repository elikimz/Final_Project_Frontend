import React, { useState, useEffect } from 'react';
import { useGetFleetItemsQuery, useCreateFleetItemMutation, useDeleteFleetItemMutation, useUpdateFleetItemMutation } from './fleetAPI'; // Adjust the path if needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for Toastify
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const FleetManagementPage: React.FC = () => {
  const { data: fleetItems, isLoading, isError, refetch } = useGetFleetItemsQuery();
  const [createFleetItem] = useCreateFleetItemMutation();
  const [deleteFleetItem] = useDeleteFleetItemMutation();
  const [updateFleetItem] = useUpdateFleetItemMutation();
  const navigate = useNavigate(); // Initialize useNavigate hook

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
      if (!isNaN(vehicleId)) {
        setFormData((prevData) => ({
          ...prevData,
          vehicleId: vehicleId.toString(), // Ensure vehicleId is a string here
        }));
      } else {
        console.error('Invalid vehicleId in local storage:', storedVehicleId);
      }
    } else {
      console.error('Vehicle ID not found in local storage');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { vehicleId, status, acquisition_date, depreciation_rate, current_value, maintenance_cost } = formData;

    if (!vehicleId || !status || !acquisition_date || !depreciation_rate || !current_value || !maintenance_cost) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const numericFormData = {
      vehicleId: parseInt(vehicleId, 10),
      status,
      acquisition_date,
      depreciation_rate: parseFloat(depreciation_rate),
      current_value: parseFloat(current_value),
      maintenance_cost: parseFloat(maintenance_cost),
    };

    if (isNaN(numericFormData.vehicleId)) {
      toast.error('Invalid Vehicle ID.');
      return;
    }

    try {
      if (isEditing && currentId !== null) {
        await updateFleetItem({ id: currentId, ...numericFormData }).unwrap();
        toast.success('Fleet item updated successfully!');
      } else {
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
      setIsEditing(false);
      setCurrentId(null);
      setShowForm(false); // Hide the form after submission
    } catch (err: any) {
      console.error('Error handling fleet item:', err);
      toast.error(`Failed to handle fleet item: ${err.message}`);
    }
  };

  const handleEditClick = (item: any) => {
    console.log('Editing item:', item);

    if (item && typeof item === 'object') {
      const {
        vehicle_id,
        status,
        acquisition_date,
        depreciation_rate,
        current_value,
        maintenance_cost,
      } = item;

      if (
        vehicle_id !== undefined &&
        status !== undefined &&
        acquisition_date !== undefined &&
        depreciation_rate !== undefined &&
        current_value !== undefined &&
        maintenance_cost !== undefined
      ) {
        setFormData({
          vehicleId: vehicle_id.toString(), // Ensure vehicle_id is a string
          status: status || '',
          acquisition_date: acquisition_date || '',
          depreciation_rate: depreciation_rate.toString(), // Ensure depreciation_rate is a string
          current_value: current_value.toString(), // Ensure current_value is a string
          maintenance_cost: maintenance_cost.toString(), // Ensure maintenance_cost is a string
        });

        setIsEditing(true);
        setCurrentId(item.id || null);
        setShowForm(true); // Show the form when editing
      } else {
        console.error('Missing fields in item:', item);
        toast.error('Some fields are missing in the item data.');
      }
    } else {
      console.error('Invalid item object:', item);
      toast.error('Invalid item data.');
    }
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
    try {
      await deleteFleetItem(id).unwrap();
      toast.success('Fleet item deleted successfully!');
      await refetch();
    } catch (err: any) {
      console.error('Error deleting fleet item:', err);
      toast.error(`Failed to delete fleet item: ${err.message}`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate('/adminDashboard')} // Navigate to Admin Dashboard
          className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-700"
        >
          Admin Dashboard
        </button>
        <button
          onClick={handleCreateClick}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Create Fleet Item
        </button>
      </div>
      <ToastContainer />

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">{isEditing ? 'Update Fleet Item' : 'Create New Fleet Item'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle ID</label>
                <input
                  type="text"
                  name="vehicleId"
                  value={formData.vehicleId}
                  readOnly // Make this field read-only
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Acquisition Date</label>
                <input
                  type="date"
                  name="acquisition_date"
                  value={formData.acquisition_date}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Depreciation Rate (%)</label>
                <input
                  type="number"
                  name="depreciation_rate"
                  value={formData.depreciation_rate}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Value</label>
                <input
                  type="number"
                  name="current_value"
                  value={formData.current_value}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maintenance Cost</label>
                <input
                  type="number"
                  name="maintenance_cost"
                  value={formData.maintenance_cost}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className={`py-2 px-4 rounded-lg text-white ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isEditing ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fleet Items List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading fleet items</p>
      ) : (
        <div className="space-y-4">
          {fleetItems && fleetItems.map((item: any) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold">{item.vehicle_id}</h3>
              <p>Status: {item.status}</p>
              <p>Acquisition Date: {item.acquisition_date}</p>
              <p>Depreciation Rate: {item.depreciation_rate}</p>
              <p>Current Value: {item.current_value}</p>
              <p>Maintenance Cost: {item.maintenance_cost}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-yellow-600 text-white py-1 px-2 rounded-lg shadow-md hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFleetItem(item.id)}
                  className="bg-red-600 text-white py-1 px-2 rounded-lg shadow-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FleetManagementPage;
