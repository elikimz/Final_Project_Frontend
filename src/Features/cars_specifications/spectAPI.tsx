import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export interface VehicleSpecification {
    rental_rate: number;
    availability: any;
    image_url: string | undefined;
    id: number;
    manufacturer: string ;
    model: string ;
    year: number ;
    fuel_type: string ;
    engine_capacity: string ;
    transmission: string ;
    seating_capacity: number ;
    color: string ;
    features: string ;
}

export const SpecsAPI = createApi({
    reducerPath: 'SpecsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono-z02i.onrender.com/' }),
    endpoints: (builder) => ({
        getVehicleSpecification: builder.query<VehicleSpecification[], void>({
            query: () => 'vehiclespecifications',
            //  providesTags: ['getVehicleSpecificationsTag'],
        }),
        createSpecification: builder.mutation<VehicleSpecification, Partial<VehicleSpecification>>({
            query: (newSpecifications) => ({
                url: 'vehiclespecifications',
                method: 'POST',
                body: newSpecifications,
                providesTags: ['createSpecificationsTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        deleteSpecification: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `vehiclespecifications/${id}`,
                method: 'DELETE',
                providesTags: ['deleteSpecificationsTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        updateSpecification: builder.mutation<VehicleSpecification, Partial<VehicleSpecification>>({
            query: ({ id, ...rest }) => ({
                url: `vehiclespecifications/${id}`,
                method: 'PUT',
                body: rest,
                providesTags: ['updateSpecificationsTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
   }),
});

 export const { useGetVehicleSpecificationQuery, useCreateSpecificationMutation, useDeleteSpecificationMutation, useUpdateSpecificationMutation } = SpecsAPI;
