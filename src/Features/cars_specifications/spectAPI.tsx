import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export interface Specifications {
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
    baseQuery: fetchBaseQuery({ baseUrl: ' http://localhost:8000' }),
    endpoints: (builder) => ({
        getVehicleSpecifications: builder.query<Specifications[], void>({
            query: () => 'vehicalspecification',
            //  providesTags: ['getVehicleSpecificationsTag'],
        }),
        createSpecifications: builder.mutation<Specifications, Partial<Specifications>>({
            query: (newSpecifications) => ({
                url: 'vehicalspecification',
                method: 'POST',
                body: newSpecifications,
                providesTags: ['createSpecificationsTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        deleteSpecifications: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `vehicalspecification/${id}`,
                method: 'DELETE',
                providesTags: ['deleteSpecificationsTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        updateSpecifications: builder.mutation<Specifications, Partial<Specifications>>({
            query: ({ id, ...rest }) => ({
                url: `vehicalspecification/${id}`,
                method: 'PUT',
                body: rest,
                providesTags: ['updateSpecificationsTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
    }),
});

export const { useGetVehicleSpecificationsQuery, useCreateSpecificationsMutation, useDeleteSpecificationsMutation, useUpdateSpecificationsMutation } = SpecsAPI;
