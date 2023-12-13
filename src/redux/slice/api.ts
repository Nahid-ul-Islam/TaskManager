import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksAPI: any = createApi({
    reducerPath: "tasksAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://easy-note-1ros.onrender.com",
    }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasksByEmail: builder.query({
            query: (email) => ({
                url: `my-notes/?email=${email}`,
                method: "GET",
            }),
            providesTags: ["Task"]
        }),
        createTask: builder.mutation({
            query: (data) => ({
                url: `my-notes`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Task"],
        }),
        updateTask: builder.mutation({
            query: ({ id, updateDoc }) => ({
                url: `my-notes/${id}`,
                method: "PATCH",
                body: updateDoc,
            }),
            invalidatesTags: ["Task"],
        }),
        deleteTask: builder.mutation({
            query: ({ id, updateDoc }) => ({
                url: `my-notes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"],
        }),
    }),
});

export const { useGetTasksByEmailQuery } = tasksAPI;