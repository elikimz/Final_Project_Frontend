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
  baseQuery: fetchBaseQuery({ baseUrl: 'https://final-project-hono-z02i.onrender.com/'}),
  endpoints: (builder) => ({
    getFleetItems: builder.query<FleetManagement[], void>({
      query: () => 'fleetmanagement',
      //providesTags: ['FleetManagement'],
    }),
    createFleetItem: builder.mutation<FleetManagement, Partial<FleetManagement>>({
      query: (newItem) => ({
        url: 'fleetmanagement',
        method: 'POST',
        body: newItem,
        providesTags: ['FleetManagement'],
      }),
      //invalidatesTags: ['FleetManagement'],
    }),
    deleteFleetItem: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `fleetmanagement/${id}`,
        method: 'DELETE',
        providesTags: ['FleetManagement'],
      }),
      //invalidatesTags: ['FleetManagement'],
    }),
    updateFleetItem: builder.mutation<FleetManagement, Partial<FleetManagement> & { id: number }>({
      query: ({ id, ...rest }) => ({
        url: `fleetmanagement/${id}`,
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
