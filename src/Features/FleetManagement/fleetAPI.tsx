import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FleetManagement {
  vehicleId: number;
  updated_at: any;
  created_at: any;
  vehicle_id: number;
  id: number;
  status: string;
  acquisition_date: string;
  depreciation_rate:number;
  current_value: number;
  maintenance_cost: number;


}


export const FleetManagementAPI = createApi({
  reducerPath: 'fleetManagementAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/'}),
  endpoints: (builder) => ({
    getFleetItems: builder.query<FleetManagement[], void>({
      query: () => 'FleetManagement',
      //providesTags: ['FleetManagement'],
    }),
    createFleetItem: builder.mutation<FleetManagement, Partial<FleetManagement>>({
      query: (newItem) => ({
        url: 'FleetManagement',
        method: 'POST',
        body: newItem,
        providesTags: ['FleetManagement'],
      }),
      //invalidatesTags: ['FleetManagement'],
    }),
    deleteFleetItem: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `FleetManagement/${id}`,
        method: 'DELETE',
        providesTags: ['FleetManagement'],
      }),
      //invalidatesTags: ['FleetManagement'],
    }),
    updateFleetItem: builder.mutation<FleetManagement, Partial<FleetManagement> & { id: number }>({
      query: ({ id, ...rest }) => ({
        url: `FleetManagement/${id}`,
        method: 'PUT',
        body: rest,
        providesTags: ['FleetManagement'],
      }),
      //invalidatesTags: ['FleetManagement'],
    }),
  }),
});

export const { 
  useGetFleetItemsQuery, 
  useCreateFleetItemMutation, 
  useDeleteFleetItemMutation, 
  useUpdateFleetItemMutation 
} = FleetManagementAPI;
