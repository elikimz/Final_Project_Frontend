import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserDetails {
    userId: string;
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
}

const UserProfile: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>({
        userId: '',
        full_name: '',
        email: '',
        contact_phone: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Retrieve user details from local storage
        const userId = localStorage.getItem('userId') || '';
        const full_name = localStorage.getItem('full_name') || '';
        const email = localStorage.getItem('email') || '';
        const contact_phone = localStorage.getItem('contact_phone') || '';
        const address = localStorage.getItem('address') || '';

        setUserDetails({
            userId,
            full_name,
            email,
            contact_phone,
            address,
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        setLoading(true);
        setTimeout(() => {
            // Update local storage with the new details
            localStorage.setItem('full_name', userDetails.full_name);
            localStorage.setItem('email', userDetails.email);
            localStorage.setItem('contact_phone', userDetails.contact_phone);
            localStorage.setItem('address', userDetails.address);
            setLoading(false);
            toast.success('Profile updated successfully!');
        }, 2000); // Simulate a network request
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={userDetails.full_name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Contact Phone</label>
                    <input
                        type="text"
                        name="contact_phone"
                        value={userDetails.contact_phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={userDetails.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UserProfile;
