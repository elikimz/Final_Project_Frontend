import React from 'react';
import { Link } from "react-router-dom";
import { useGetVehiclesQuery } from './vehicleAPI';

interface Vehicles {
    id: number;
    vehicleSpec_id: number;
    rental_rate: string;
    availability: boolean;
    vehicleSpecifications: VehicleSpecifications;
}

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

const Vehicles = () => {
    const { data: vehicles, isLoading, isError } = useGetVehiclesQuery();
    console.log(vehicles);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading vehicles.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {vehicles && vehicles.map((vehicle: Vehicle) => (
                <div key={vehicle.id} className="rounded-lg shadow-md overflow-hidden hover:shadow-xl p-4 bg-white">
                    <h3 className="text-lg font-bold mb-2">{vehicle.vehicleSpecifications.manufacturer} {vehicle.vehicleSpecifications.model}</h3>
                    <img src={vehicle.vehicleSpecifications.image_url} alt={`${vehicle.vehicleSpecifications.manufacturer} ${vehicle.vehicleSpecifications.model}`} className="w-full h-40 object-cover mb-4" />
                    <p><strong>Rental Rate:</strong> {vehicle.rental_rate}</p>
                    <p><strong>Availability:</strong> {vehicle.availability ? 'Available' : 'Unavailable'}</p>
                    <p><strong>Year:</strong> {vehicle.vehicleSpecifications.year}</p>
                    <p><strong>Fuel Type:</strong> {vehicle.vehicleSpecifications.fuel_type}</p>
                    <p><strong>Engine Capacity:</strong> {vehicle.vehicleSpecifications.engine_capacity}</p>
                    <p><strong>Transmission:</strong> {vehicle.vehicleSpecifications.transmission}</p>
                    <p><strong>Seating Capacity:</strong> {vehicle.vehicleSpecifications.seating_capacity}</p>
                    <p><strong>Color:</strong> {vehicle.vehicleSpecifications.color}</p>
                    <p><strong>Features:</strong> {vehicle.vehicleSpecifications.features}</p>
                    <Link to={`/vehicle/${vehicle.id}`} className="text-blue-500 hover:underline mt-2 block">
                        View Details
                    </Link>
                    <Link to={`/vehicle/${vehicle.id}/book`} className="text-blue-500 hover:underline mt-2 block">
                        Book Now
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Vehicles;
