import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Vehicle {
    vehicleSpecifications: any;
    id: number;
    vehicleSpec_id: number;
    rental_rate:string;
    availability: boolean;
    address: string;
}

export const VehicleAPI = createApi({
    reducerPath: 'VehicleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono-z02i.onrender.com/' }),
    endpoints: (builder) => ({
        getVehicles: builder.query<Vehicle[], void>({
            query: () => 'vehicles', // Make sure this matches your API endpoint
            //providesTags: ['Vehicle']
        }),
        createVehicles: builder.mutation<Vehicle, Partial<Vehicle>>({
            query: (newVehicle) => ({
                url: 'vehicles',
                method: 'POST',
                body: newVehicle
            }),
           // invalidatesTags: ['Vehicle']
        }),
        updateVehicles: builder.mutation<Vehicle, Partial<Vehicle> & { id: number }>({
            query: ({ id, ...updatedVehicles }) => ({
                url: `vehicles/${id}`,
                method: 'PUT',
                body: updatedVehicles
            }),
            //invalidatesTags: ['Vehicle']
        }),
        deleteVehicles: builder.mutation<void, number>({
            query: (id) => ({
                url: `vehicles/${id}`,
                method: 'DELETE'
            }),
            //invalidatesTags: ['Vehicle']
        }),
    }),
});

export const {
    useGetVehiclesQuery,
    useCreateVehiclesMutation,
    useUpdateVehiclesMutation,
    useDeleteVehiclesMutation,
} = VehicleAPI;