import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useGetCustomerSupportTicketQuery, useCreateTicketMutation, useDeleteTicketMutation, useUpdateTicketMutation } from './customersupportAPI';
import { CustomerSupportTickets } from '../../Features/customer_support_ticket/customersupportAPI'; // Adjust the path to where your type is defined
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for Toastify

const CustomerSupportTicketsPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { data: tickets, isLoading, isError, refetch } = useGetCustomerSupportTicketQuery();
  const [createTicket, { isLoading: isCreating }] = useCreateTicketMutation();
  const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation();
  const [deleteTicket] = useDeleteTicketMutation();

  const [newTicket, setNewTicket] = useState<Partial<CustomerSupportTickets>>({
    subject: '',
    description: '',
    status: ''
  });
  const [selectedTicket, setSelectedTicket] = useState<Partial<CustomerSupportTickets> | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectedTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (selectedTicket) {
      setSelectedTicket({ ...selectedTicket, [name]: value });
    }
  };

  const handleCreateTicket = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    const ticketData: Partial<CustomerSupportTickets> = {
      ...newTicket,
      user_id: Number(userId),
    };

    console.log('Creating ticket with data:', ticketData);

    try {
      await createTicket(ticketData).unwrap();
      await refetch();
      setNewTicket({ subject: '', description: '', status: '' });
      toast.success('Ticket created successfully!');
    } catch (err) {
      console.error('Error creating ticket:', err);
      toast.error('Failed to create ticket.');
    }
  };

  const handleUpdateTicket = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || !selectedTicket?.id) {
      console.error('User ID or ticket ID not found');
      return;
    }

    const updatedTicketData: Partial<CustomerSupportTickets> = {
      ...selectedTicket,
      user_id: Number(userId), // Ensure user_id is taken from local storage
    };

    console.log('Updating ticket with data:', updatedTicketData);

    try {
      const response = await updateTicket(updatedTicketData).unwrap();
      console.log('Update response:', response);
      await refetch();
      setSelectedTicket(null);
      toast.success('Ticket updated successfully!');
    } catch (err) {
      console.error('Error updating ticket:', err);
      toast.error('Failed to update ticket.');
    }
  };

  const handleDeleteTicket = async (id: number) => {
    try {
      await deleteTicket(id).unwrap();
      await refetch();
      toast.success('Ticket deleted successfully!');
    } catch (err) {
      console.error('Error deleting ticket:', err);
      toast.error('Failed to delete ticket.');
    }
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Customer Support Tickets</h1>

      <ToastContainer />

      {/* Navigation Button */}
      <button
        onClick={() => navigate('/adminDashboard')} // Navigate to AdminDashboard
        className="bg-gray-500 text-white py-2 px-4 rounded mb-4"
      >
        Back Dashboard
      </button>

      {/* Loading and Error Handling */}
      {isLoading && <p className="text-blue-700">Loading tickets...</p>}
      {isError && <p className="text-red-700">Failed to load tickets.</p>}

      {/* Ticket Creation Form */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newTicket.subject || ''}
          onChange={handleInputChange}
          className="border rounded p-2 mb-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newTicket.description || ''}
          onChange={handleInputChange}
          className="border rounded p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={newTicket.status || ''}
          onChange={handleInputChange}
          className="border rounded p-2 mb-2 w-full"
        />
        <button
          onClick={handleCreateTicket}
          disabled={isCreating}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {isCreating ? 'Creating...' : 'Create Ticket'}
        </button>
      </div>

      {/* Ticket Update Form */}
      {selectedTicket && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Update Ticket</h2>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={selectedTicket.subject || ''}
            onChange={handleSelectedTicketChange}
            className="border rounded p-2 mb-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={selectedTicket.description || ''}
            onChange={handleSelectedTicketChange}
            className="border rounded p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={selectedTicket.status || ''}
            onChange={handleSelectedTicketChange}
            className="border rounded p-2 mb-2 w-full"
          />
          <button
            onClick={handleUpdateTicket}
            disabled={isUpdating}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {isUpdating ? 'Updating...' : 'Update Ticket'}
          </button>
        </div>
      )}

      {/* Tickets Table */}
      {!isLoading && !isError && tickets && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created At</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Updated At</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.created_at?.toString() || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.updated_at?.toString() || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.user_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Delete
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

export default CustomerSupportTicketsPage;
