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
    baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono-z02i.onrender.com/' }),
    endpoints: (builder) => ({
        getCustomerSupportTicket: builder.query<CustomerSupportTickets[], void>({
            query: () => 'customersupport',
            // providesTags: ['getTicketsTag'],
        }),
        createTicket: builder.mutation<CustomerSupportTickets, Partial<CustomerSupportTickets>>({
            query: (newTicket) => ({
                url: 'customersupport',
                method: 'POST',
                body: newTicket,
                // providesTags: ['createTicketTags'],
            }),
            // invalidatesTags: ['getTicketsTag'],
        }),
        deleteTicket: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `customersupport/${id}`,
                method: 'DELETE',
                // providesTags: ['deleteTicketTags'],
            }),
            // invalidatesTags: ['getTicketsTag'],
        }),
        updateTicket: builder.mutation<CustomerSupportTickets, Partial<CustomerSupportTickets>>({
            query: ({ id, ...rest }) => ({
                url: `customersupport/${id}`,
                method: 'PUT',
                body: rest,
                // providesTags: ['updateTicketTags'],
            }),
            // invalidatesTags: ['getTicketsTag'],
        }),
    }),
});

export const { useGetCustomerSupportTicketQuery, useCreateTicketMutation, useDeleteTicketMutation, useUpdateTicketMutation } = CustomerSupportTicketsAPI;
