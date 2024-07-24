import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetVehiclesQuery, Vehicle } from './vehicleAPI';
import Navbar from "../../components/navbar";

const Vehicles: React.FC = () => {
    const { data: vehicles, isLoading, isError } = useGetVehiclesQuery();
    const [expandedVehicleId, setExpandedVehicleId] = useState<number | null>(null);

    const formatCurrency = (value: string) => {
        const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numberValue);
    };

    const handleBookNow = (vehicleId: number, rentalRate: string) => {
        localStorage.setItem("vehicleId", vehicleId.toString());
        localStorage.setItem("rentalRate", rentalRate);
    };

    const handleToggleDetails = (vehicleId: number) => {
        setExpandedVehicleId(expandedVehicleId === vehicleId ? null : vehicleId);
    };

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Error loading vehicles.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {vehicles && vehicles.map((vehicle: Vehicle) => (
                        <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            {vehicle.vehicleSpecifications && (
                                <>
                                    <img src={vehicle.vehicleSpecifications.image_url} alt={`${vehicle.vehicleSpecifications.manufacturer} ${vehicle.vehicleSpecifications.model}`} className="w-full h-48 object-cover mb-4" />
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold text-teal-600">{vehicle.vehicleSpecifications.manufacturer} {vehicle.vehicleSpecifications.model}</h3>
                                            <Link
                                                to="/CreateLocationForm"
                                                className="bg-teal-500 text-white px-4 py-2 rounded-md inline-block font-bold hover:bg-teal-600"
                                                onClick={() => handleBookNow(vehicle.id, vehicle.rental_rate)}
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-lg font-semibold text-green-600">
                                                <span className="text-gray-800">Rental Rate:</span> {formatCurrency(vehicle.rental_rate)}
                                            </p>
                                            <p className={`text-lg font-semibold ${vehicle.availability ? 'text-green-600' : 'text-red-600'}`}>
                                                <span className="text-gray-800">Availability:</span> {vehicle.availability ? 'Available' : 'Unavailable'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleToggleDetails(vehicle.id)}
                                            className="text-teal-500 hover:underline mb-4"
                                        >
                                            {expandedVehicleId === vehicle.id ? 'See Less' : 'See Details'}
                                        </button>
                                        {expandedVehicleId === vehicle.id && (
                                            <div className="space-y-2 text-gray-700">
                                                <p><strong>Year:</strong> {vehicle.vehicleSpecifications.year}</p>
                                                <p><strong>Fuel Type:</strong> {vehicle.vehicleSpecifications.fuel_type}</p>
                                                <p><strong>Engine Capacity:</strong> {vehicle.vehicleSpecifications.engine_capacity}</p>
                                                <p><strong>Transmission:</strong> {vehicle.vehicleSpecifications.transmission}</p>
                                                <p><strong>Seating Capacity:</strong> {vehicle.vehicleSpecifications.seating_capacity}</p>
                                                <p><strong>Color:</strong> {vehicle.vehicleSpecifications.color}</p>
                                                <p><strong>Features:</strong> {vehicle.vehicleSpecifications.features}</p>
                                            </div>
                                        )}
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

export default Vehicles;
