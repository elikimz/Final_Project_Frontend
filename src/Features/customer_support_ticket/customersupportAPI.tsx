import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CustomerSupportTickets{
    created_at: any;
    updated_at: any;
    id: number;
    user_id: number;
    subject: string ;
    description: string ;
    status: string ;
}

export const CustomerSupportTicketsAPI = createApi({
    reducerPath: 'customerSupportTicketsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    endpoints: (builder) => ({
        getCustomerSupportTicket: builder.query<CustomerSupportTickets[], void>({
            query: () => 'CustomerSupportTickets',
            // providesTags: ['getTicketsTag'],
        }),
        createTicket: builder.mutation<CustomerSupportTickets, Partial<CustomerSupportTickets>>({
            query: (newTicket) => ({
                url: 'CustomerSupportTickets',
                method: 'POST',
                body: newTicket,
                // providesTags: ['createTicketTags'],
            }),
            // invalidatesTags: ['getTicketsTag'],
        }),
        deleteTicket: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `CustomerSupportTickets/${id}`,
                method: 'DELETE',
                // providesTags: ['deleteTicketTags'],
            }),
            // invalidatesTags: ['getTicketsTag'],
        }),
        updateTicket: builder.mutation<CustomerSupportTickets, Partial<CustomerSupportTickets>>({
            query: ({ id, ...rest }) => ({
                url: `CustomerSupportTickets/${id}`,
                method: 'PUT',
                body: rest,
                // providesTags: ['updateTicketTags'],
            }),
            // invalidatesTags: ['getTicketsTag'],
        }),
    }),
});

export const { useGetCustomerSupportTicketQuery, useCreateTicketMutation, useDeleteTicketMutation, useUpdateTicketMutation } = CustomerSupportTicketsAPI;
