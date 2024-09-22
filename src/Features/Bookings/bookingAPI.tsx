import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export interface Booking {
    location_id: number;
    created_at: any;
    updated_at: any;
    vehicle_id: number;
    user_id: number;
    id: number;
    booking_date: string ;
    return_date: string ;
    total_amount: number ;
    booking_status: string ;
}

export const BookingAPI = createApi({
    reducerPath: 'bookingAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono-z02i.onrender.com' }),
    endpoints: (builder) => ({
        getBooking: builder.query<Booking[], void>({
            query: () => 'c',
            //  providesTags: ['getUsersTag'],
        }),
        createBookings: builder.mutation<Booking, Partial<Booking>>({
            query: (newBooking) => ({
                url: 'bookings',
                method: 'POST',
                body: newBooking,
                providesTags: ['createBookingTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        deleteBooking: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `bookings/${id}`,
                method: 'DELETE',
                providesTags: ['deleteBookingTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        updateBooking: builder.mutation<Booking, Partial<Booking>>({
            query: ({ id, ...rest }) => ({
                url: `bookings/${id}`,
                method: 'PUT',
                body: rest,
                providesTags: ['updateBookingTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
    }),
});

export const { useGetBookingQuery, useCreateBookingsMutation, useDeleteBookingMutation, useUpdateBookingMutation } = BookingAPI;
