import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const domainAPI = createApi({
  reducerPath: "domainAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),

  tagTypes: ["amenities", "managers"],
  endpoints: (builder) => ({
    getAmenities: builder.query({
      query: () => "/domain/amenity",
      providesTags: ["amenities"],
    }),
    createNewAmenity: builder.mutation({
      query: (payload) => ({
        url: "/domain/amenity",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["amenities"],
    }),
    removeAmenity: builder.mutation({
      query: (id) => ({
        url: `/domain/amenity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["amenities"],
    }),
    updateAmenity: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/domain/amenity/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["amenities"],
    }),

    getManagers: builder.query({
      query: () => "/domain/managers",
      providesTags: ["managers"],
    }),
  }),
});

export const {
  useGetAmenitiesQuery,
  useCreateNewAmenityMutation,
  useRemoveAmenityMutation,
  useUpdateAmenityMutation,
  useGetManagersQuery,
} = domainAPI;
