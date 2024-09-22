import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Payment {
  url: any;
  id: number;
  user_id: number;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
  booking_id: number;
  total_amount: number;
}

export const PaymentsAPI = createApi({
  reducerPath: 'paymentsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono-z02i.onrender.com/' }), // Update with your actual API base URL
  endpoints: (builder) => ({
    getPayments: builder.query<Payment[], void>({
      query: () => 'payments',
      // providesTags: ['getPaymentsTag'],
    }),
    createPayment: builder.mutation<Payment, Partial<Payment>>({
      query: (newPayment) => ({
        url: 'checkout-session',
        method: 'POST',
        body: newPayment,
        // providesTags: ['createPaymentTags'],
      }),
      // invalidatesTags: ['getPaymentsTag'],
    }),
    deletePayment: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `payments/${id}`,
        method: 'DELETE',
        // providesTags: ['deletePaymentTags'],
      }),
      // invalidatesTags: ['getPaymentsTag'],
    }),
    updatePayment: builder.mutation<Payment, Partial<Payment>>({
      query: ({ id, ...rest }) => ({
        url: `payments/${id}`,
        method: 'PUT',
        body: rest,
        // providesTags: ['updatePaymentTags'],
      }),
      // invalidatesTags: ['getPaymentsTag'],
    }),
  }),
});

export const { 
  useGetPaymentsQuery, 
  useCreatePaymentMutation, 
  useDeletePaymentMutation, 
  useUpdatePaymentMutation 
} = PaymentsAPI;
