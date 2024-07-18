import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export interface Specification {
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
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        getVehicleSpecification: builder.query<Specification[], void>({
            query: () => 'vehicalspecification',
            //  providesTags: ['getVehicleSpecificationsTag'],
        }),
        createSpecification: builder.mutation<Specification, Partial<Specification>>({
            query: (newSpecifications) => ({
                url: 'vehicalspecification',
                method: 'POST',
                body: newSpecifications,
                providesTags: ['createSpecificationsTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        deleteSpecification: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `vehicalspecifications/${id}`,
                method: 'DELETE',
                providesTags: ['deleteSpecificationsTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        updateSpecification: builder.mutation<Specification, Partial<Specification>>({
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

 export const { useGetVehicleSpecificationQuery, useCreateSpecificationMutation, useDeleteSpecificationMutation, useUpdateSpecificationMutation } = SpecsAPI;
