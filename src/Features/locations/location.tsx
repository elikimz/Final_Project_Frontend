import React, { useState, useEffect } from 'react';
import { useGetLocationsQuery, useCreateLocationMutation } from './locationAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LocationPage = () => {
    const [createLocation, { isSuccess: isCreateSuccess }] = useCreateLocationMutation();
    const { data: locations, refetch } = useGetLocationsQuery();
    const [name, setName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isCreateSuccess) {
            // Refetch locations after creation
            refetch();
        }
    }, [isCreateSuccess, refetch]);

    useEffect(() => {
        // Log the locations to check if they are fetched correctly
        console.log("Fetched locations:", locations);
    }, [locations]);

    const handleCreateLocation = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Create location
            const response = await createLocation({
                name,
                contact_phone: contactPhone,
                address
            }).unwrap();
            console.log("Creation response:", response);

            // Wait for refetch to complete
            await refetch();

            // Find the newly created location from the fetched list
            const createdLocation = locations?.find(location => location.name === name && location.contact_phone === contactPhone && location.address === address);

            if (createdLocation) {
                localStorage.setItem('locationId', createdLocation.id.toString()); // Store location ID in local storage
                console.log("Persisted location ID:", createdLocation.id);
            } else {
                console.error("Created location not found in fetched locations.");
            }

            toast.success('Location created successfully');
            setName('');
            setContactPhone('');
            setAddress('');
            navigate('/Booking_form'); // Navigate to the desired page
        } catch (error) {
            console.error('Failed to create location:', error);
            toast.error('Failed to create location');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 text-teal-600">Create New Location</h2>
            <form onSubmit={handleCreateLocation}>
                <label className="block mb-4">
                    <span className="text-gray-700">Name:</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Contact Phone:</span>
                    <input
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    />
                </label>
                <label className="block mb-6">
                    <span className="text-gray-700">Address:</span>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="block w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Create Location
                </button>
            </form>
        </div>
    );
};

export default LocationPage;
