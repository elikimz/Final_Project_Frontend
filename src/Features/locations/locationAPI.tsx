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
    baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono-z02i.onrender.com/' }),
    endpoints: (builder) => ({
        getLocations: builder.query<Location[], void>({
            query: () => 'locations',
        }),
        createLocation: builder.mutation<Location, Partial<Location>>({
            query: (newLocation) => ({
                url: 'locations',
                method: 'POST',
                body: newLocation,
            }),
            // Add an `onQueryStarted` lifecycle event to handle side-effects
            async onQueryStarted(_newLocation, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Save the new location ID to local storage
                    localStorage.setItem('locationId', data.id.toString());
                } catch (error) {
                    console.error('Failed to save location ID to local storage', error);
                }
            },
        }),
    }),
});

export const { useGetLocationsQuery, useCreateLocationMutation } = LocationAPI;
