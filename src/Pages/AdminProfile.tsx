import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AdminDetails {
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
    role: string;
}

const AdminProfile: React.FC = () => {
    const [adminDetails, setAdminDetails] = useState<AdminDetails>({
        full_name: '',
        email: '',
        contact_phone: '',
        address: '',
        role: '', // Admin role
    });
    const [loading, setLoading] = useState(false);
    //const navigate = useNavigate();

    useEffect(() => {
        // Retrieve admin details from local storage
        const full_name = localStorage.getItem('full_name') || '';
        const email = localStorage.getItem('email') || '';
        const contact_phone = localStorage.getItem('contact_phone') || '';
        const address = localStorage.getItem('address') || '';
        const role = localStorage.getItem('role') || 'admin'; // Default to 'admin' if not set

        setAdminDetails({
            full_name,
            email,
            contact_phone,
            address,
            role,
        });
    }, []);

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdminDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        setLoading(true);
        setTimeout(() => {
            // Update local storage with the new details
            localStorage.setItem('full_name', adminDetails.full_name);
            localStorage.setItem('email', adminDetails.email);
            localStorage.setItem('contact_phone', adminDetails.contact_phone);
            localStorage.setItem('address', adminDetails.address);
            localStorage.setItem('role', adminDetails.role);
            setLoading(false);
            toast.success('Profile updated successfully!');
        }, 2000); // Simulate a network request
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Admin Profile</h2>
            <div className="flex items-center justify-center mb-6">
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-blue-500 text-white text-3xl font-bold shadow-md">
                    {getInitials(adminDetails.full_name)}
                </div>
            </div>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={adminDetails.full_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={adminDetails.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                    <input
                        type="text"
                        name="contact_phone"
                        value={adminDetails.contact_phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={adminDetails.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={adminDetails.role}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                    />
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            </form>
            {/* <div className="mt-6">
                <button
                    onClick={() => navigate('/Vehicles')} // Adjust navigation as needed
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-700 transition-colors duration-300"
                >
                    Back to Booking
                </button>
            </div> */}
            <ToastContainer />
        </div>
    );
};

export default AdminProfile;
