import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Location {
    [x: string]: any;
    id: number;
    name: string;
    contact_phone: string;
    address: string;
    created_at: Date;
    updated_at: Date;
}

export const LocationAPI = createApi({
    reducerPath: 'LocationsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono.onrender.com/' }),
    endpoints: (builder) => ({
        getLocations: builder.query<Location[], void>({
            query: () => 'Locations',
        }),
        createLocation: builder.mutation<Location, Partial<Location>>({
            query: (newLocation) => ({
                url: 'Locations',
                method: 'POST',
                body: newLocation,
            }),
        }),
    }),
});

export const { useGetLocationsQuery, useCreateLocationMutation } = LocationAPI;
