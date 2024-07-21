import React from 'react';
import { Link } from 'react-router-dom';
import { useGetVehiclesQuery } from './vehicleAPI';
import Navbar from "../../components/navbar";

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
    const { data: vehicles, isLoading, isError } = useGetVehiclesQuery();

    const handleBookNow = (vehicleId: number) => {
        localStorage.setItem("vehicleId", vehicleId.toString());
    };

    if (isLoading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Error loading vehicles.</p>;
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {vehicles && vehicles.map((vehicle: Vehicles) => (
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
                                                onClick={() => handleBookNow(vehicle.id)}
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-lg font-semibold text-green-600">
                                                <span className="text-gray-800">Rental Rate:</span> {vehicle.rental_rate}
                                            </p>
                                            <p className={`text-lg font-semibold ${vehicle.availability ? 'text-green-600' : 'text-red-600'}`}>
                                                <span className="text-gray-800">Availability:</span> {vehicle.availability ? 'Available' : 'Unavailable'}
                                            </p>
                                        </div>
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
