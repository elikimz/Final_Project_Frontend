import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export interface User {
    [x: string]: string ;
    full_name: string;
    email: string;
    id: string;
    name: string ;
    contact_phone: string ;
    address: string ;
 }

export const UserAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => 'users',
            //  providesTags: ['getUsersTag'],
        }),
        createUser: builder.mutation<User, Partial<User>>({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
                providesTags: ['createUserTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        deleteUser: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
                providesTags: ['deleteUserTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
        updateUser: builder.mutation<User, Partial<User>>({
            query: ({ id, ...rest }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: rest,
                providesTags: ['updateUserTags'],
            }),
           // invalidatesTags: ['getUsersTag'],
        }),
    }),
});

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation } = UserAPI;
