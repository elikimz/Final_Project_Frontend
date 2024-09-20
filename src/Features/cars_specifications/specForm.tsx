import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetVehicleSpecificationQuery,
  useCreateSpecificationMutation,
  useUpdateSpecificationMutation,
  useDeleteSpecificationMutation,
} from './spectAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface VehicleSpecification {
  id?: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
  image_url?: string;  // Include image_url
}

const SpecsForm: React.FC = () => {
  const navigate = useNavigate();
  const { data: vehicleSpecifications, isLoading, isError, refetch } = useGetVehicleSpecificationQuery();
  const [createSpecification] = useCreateSpecificationMutation();
  const [updateSpecification] = useUpdateSpecificationMutation();
  const [deleteSpecification] = useDeleteSpecificationMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpec, setCurrentSpec] = useState<VehicleSpecification | null>(null);

  const openModal = (spec?: VehicleSpecification) => {
    setCurrentSpec(spec || {
      manufacturer: '',
      model: '',
      year: new Date().getFullYear(),
      fuel_type: '',
      engine_capacity: '',
      transmission: '',
      seating_capacity: 0,
      color: '',
      features: '',
      image_url: '', // Include image_url in the default state
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentSpec(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSpec) return;

    try {
      if (currentSpec.id) {
        // Update existing specification
        await updateSpecification(currentSpec).unwrap();
        toast.success('Specification updated successfully');
      } else {
        // Create new specification
        const createdSpec = await createSpecification(currentSpec).unwrap();
        toast.success('Specification created successfully');
        localStorage.setItem('vehicleSpecificationId', createdSpec.id.toString());
      }
      await refetch(); // Refresh data
      closeModal();
    } catch (error) {
      console.error('Error occurred while saving specification:', error);
      toast.error('Failed to save specification');
      closeModal();
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSpecification(id).unwrap();
      toast.success('Specification deleted successfully');
      await refetch(); // Refresh data
    } catch (error) {
      console.error('Error occurred while deleting specification:', error);
      toast.error('Failed to delete specification');
    }
  };

  return (
    <div className="overflow-x-auto">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => openModal()}
      >
        Create New Specification
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => navigate('/adminDashboard')}
      >
        Go Back
      </button>
      <ToastContainer />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data.</p>
      ) : (
        vehicleSpecifications && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {vehicleSpecifications.map((spec) => (
              <div key={spec.id} className="rounded-lg shadow-md overflow-hidden hover:shadow-xl">
                <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-4">
                  <h3 className="text-lg font-bold text-white">
                    {spec.manufacturer} {spec.model}
                  </h3>
                  <p className="text-sm text-white">ID: {spec.id}</p>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-white">{spec.year}</p>
                    <div>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                        onClick={() => openModal(spec)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDelete(spec.id!)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  {spec.image_url && (
                    <img
                      src={spec.image_url}
                      alt={`${spec.manufacturer} ${spec.model}`}
                      className="w-full h-40 object-cover mb-4"
                    />
                  )}
                  <p><strong>Fuel Type:</strong> {spec.fuel_type}</p>
                  <p><strong>Engine Capacity:</strong> {spec.engine_capacity}</p>
                  <p><strong>Transmission:</strong> {spec.transmission}</p>
                  <p><strong>Seating Capacity:</strong> {spec.seating_capacity}</p>
                  <p><strong>Color:</strong> {spec.color}</p>
                  <p><strong>Features:</strong> {spec.features}</p>
                </div>
              </div>
            ))}
          </div>
        )
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-2">
              {currentSpec?.id ? 'Update Vehicle Specification' : 'Create New Vehicle Specification'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-2">
                  Manufacturer:
                  <input
                    type="text"
                    value={currentSpec?.manufacturer || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, manufacturer: e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-2">
                  Model:
                  <input
                    type="text"
                    value={currentSpec?.model || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, model: e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-2">
                  Year:
                  <input
                    type="number"
                    value={currentSpec?.year || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, year: +e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-2">
                  Fuel Type:
                  <input
                    type="text"
                    value={currentSpec?.fuel_type || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, fuel_type: e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-2">
                  Engine Capacity:
                  <input
                    type="text"
                    value={currentSpec?.engine_capacity || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, engine_capacity: e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-2">
                  Transmission:
                  <input
                    type="text"
                    value={currentSpec?.transmission || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, transmission: e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-2">
                  Seating Capacity:
                  <input
                    type="number"
                    value={currentSpec?.seating_capacity || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, seating_capacity: +e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-2">
                  Color:
                  <input
                    type="text"
                    value={currentSpec?.color || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, color: e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="w-full px-2">
                <label className="block mb-2">
                  Features:
                  <textarea
                    value={currentSpec?.features || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, features: e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                    required
                  />
                </label>
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-2">
                  Image URL:
                  <input
                    type="text"
                    value={currentSpec?.image_url || ''}
                    onChange={(e) => setCurrentSpec({ ...currentSpec!, image_url: e.target.value })}
                    className="block w-full mt-1 border rounded px-2 py-1"
                  />
                </label>
              </div>
              <div className="w-full px-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {currentSpec?.id ? 'Update Specification' : 'Create Specification'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecsForm;
