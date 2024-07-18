import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export interface Vehicle {
    id: number;
    vehicleSpec_id: number;
    rental_rate: string ;
    availability: boolean;
    address: string;
}

export const VehicleAPI = createApi({
    reducerPath: 'VehicleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    endpoints: (builder) => ({
        getVehicles : builder.query<Vehicle [], void>({
            query: () => 'Vehicles',
             //providesTags: [getVehiclesTag],
        }),
  
        }),
    })


export const { useGetVehiclesQuery } = VehicleAPI;
