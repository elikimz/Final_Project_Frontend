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
    baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono.onrender.com/' }),
    endpoints: (builder) => ({
        getVehicles: builder.query<Vehicle[], void>({
            query: () => 'Vehicles', // Make sure this matches your API endpoint
            //providesTags: ['Vehicle']
        }),
        createVehicles: builder.mutation<Vehicle, Partial<Vehicle>>({
            query: (newVehicle) => ({
                url: 'Vehicles',
                method: 'POST',
                body: newVehicle
            }),
           // invalidatesTags: ['Vehicle']
        }),
        updateVehicles: builder.mutation<Vehicle, Partial<Vehicle> & { id: number }>({
            query: ({ id, ...updatedVehicles }) => ({
                url: `Vehicles/${id}`,
                method: 'PUT',
                body: updatedVehicles
            }),
            //invalidatesTags: ['Vehicle']
        }),
        deleteVehicles: builder.mutation<void, number>({
            query: (id) => ({
                url: `Vehicles/${id}`,
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