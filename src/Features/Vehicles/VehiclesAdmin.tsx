import React, { useState } from 'react';
import { useGetVehiclesQuery, useCreateVehiclesMutation, useUpdateVehiclesMutation, useDeleteVehiclesMutation } from './vehicleAPI';
import { useNavigate } from 'react-router-dom';

interface VehicleSpecifications {
    id: number;
    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    engine_capacity: string;
    transmission: string;
    seating_capacity: number;
    color: string;
    features: string;
    image_url: string;
}

interface Vehicle {
    id: number;
    vehicleSpec_id: number;
    rental_rate: string;
    availability: boolean;
    vehicleSpecifications: VehicleSpecifications | null; // Allow vehicleSpecifications to be null
}

const VehiclesAdmin: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const { data: vehicles, isLoading, isError, refetch } = useGetVehiclesQuery();
    const [createVehicle] = useCreateVehiclesMutation();
    const [updateVehicle] = useUpdateVehiclesMutation();
    const [deleteVehicle] = useDeleteVehiclesMutation();
    const [vehicleSpecId, setVehicleSpecId] = useState('');
    const [rentalRate, setRentalRate] = useState('');
    const [availability, setAvailability] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

    const formatCurrency = (value: string) => {
        const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numberValue);
    };

    const handleCreateOrUpdateVehicle = async (e: React.FormEvent) => {
        e.preventDefault();

        const vehicleData = {
            vehicleSpec_id: Number(vehicleSpecId),
            rental_rate: rentalRate.replace(/[^0-9.-]+/g, ''), // Remove any non-numeric characters
            availability: availability,
        };

        if (editingVehicle) {
            await updateVehicle({ id: editingVehicle.id, ...vehicleData });
            setPopupMessage('Vehicle updated successfully!');
            setEditingVehicle(null);
        } else {
            await createVehicle(vehicleData);
            setPopupMessage('Vehicle created successfully!');
        }

        // Refetch vehicles data
        refetch();

        // Reset form fields
        setVehicleSpecId('');
        setRentalRate('');
        setAvailability(false);

        // Hide popup message after 3 seconds
        setTimeout(() => setPopupMessage(null), 3000);
    };

    const handleEdit = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        setVehicleSpecId(vehicle.vehicleSpec_id.toString());
        setRentalRate(vehicle.rental_rate);
        setAvailability(vehicle.availability);
    };

    const handleDelete = async (id: number) => {
        await deleteVehicle(id);
        setPopupMessage('Vehicle deleted successfully!');
        // Refetch vehicles data
        refetch();
        // Hide popup message after 3 seconds
        setTimeout(() => setPopupMessage(null), 3000);
    };

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Error loading vehicles.</p>;
    }

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                {/* Navigation Button */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/adminDashboard')}
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                    >
                        Back to Admin Dashboard
                    </button>
                </div>

                {popupMessage && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
                        {popupMessage}
                    </div>
                )}

                <form onSubmit={handleCreateOrUpdateVehicle} className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700">Vehicle Spec ID:</label>
                            <input
                                type="number"
                                value={vehicleSpecId}
                                onChange={(e) => setVehicleSpecId(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Rental Rate:</label>
                            <input
                                type="text"
                                value={rentalRate}
                                onChange={(e) => setRentalRate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Availability:</label>
                            <select
                                value={availability ? 'true' : 'false'}
                                onChange={(e) => setAvailability(e.target.value === 'true')}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            >
                                <option value="true">Available</option>
                                <option value="false">Unavailable</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                        {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                    </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {vehicles && vehicles.map((vehicle: Vehicle) => (
                        <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            {vehicle.vehicleSpecifications && (
                                <>
                                    <img src={vehicle.vehicleSpecifications.image_url} alt={`${vehicle.vehicleSpecifications.manufacturer} ${vehicle.vehicleSpecifications.model}`} className="w-full h-48 object-cover mb-4" />
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold text-teal-600">{vehicle.vehicleSpecifications.manufacturer} {vehicle.vehicleSpecifications.model}</h3>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-lg font-semibold text-green-600">
                                                <span className="text-gray-800">Rental Rate:</span> {formatCurrency(vehicle.rental_rate)}
                                            </p>
                                            <p className={`text-lg font-semibold ${vehicle.availability ? 'text-green-600' : 'text-red-600'}`}>
                                                <span className="text-gray-800">Availability:</span> {vehicle.availability ? 'Available' : 'Unavailable'}
                                            </p>
                                        </div>
                                        <button onClick={() => handleEdit(vehicle)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(vehicle.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default VehiclesAdmin;
