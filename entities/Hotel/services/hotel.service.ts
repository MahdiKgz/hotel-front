import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const hotelAPI = createApi({
  reducerPath: "hotelAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["hotels", "rooms", "hotel", "room"],

  endpoints: (builder) => ({
    addHotel: builder.mutation({
      query: (paylaod) => ({
        url: "/hotel",
        method: "POST",
        body: paylaod,
      }),
      invalidatesTags: ["hotels"],
    }),
    getAllHotels: builder.query({
      query: () => "/hotel",
      providesTags: ["hotels"],
    }),
    removeHotel: builder.mutation({
      query: (slug) => ({
        url: `/hotel/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hotels"],
    }),
    updateHotel: builder.mutation({
      query: ({ slug, payload }) => ({
        url: `/hotel/${slug}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["hotels", "hotel"],
    }),
    getOneHotel: builder.query({
      query: (slug) => `/hotel/${slug}`,
      providesTags: ["hotel"],
    }),
    getRooms: builder.query({
      query: (id) => `/hotel/${id}/rooms`,
      providesTags: ["rooms"],
    }),
    createRoom: builder.mutation({
      query: (payload) => ({
        url: "/room",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["rooms"],
    }),
    deleteRoom: builder.mutation({
      query: (slug) => ({
        url: `/room/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rooms"],
    }),
    getOneRoom: builder.query({
      query: (slug) => `/room/${slug}`,
      providesTags: ["room"],
    }),
    updateRoom: builder.mutation({
      query: ({ slug, payload }) => ({
        url: `/room/${slug}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["room", "rooms"],
    }),
  }),
});

export const {
  useAddHotelMutation,
  useGetAllHotelsQuery,
  useGetOneHotelQuery,
  useGetRoomsQuery,
  useCreateRoomMutation,
  useRemoveHotelMutation,
  useUpdateHotelMutation,
  useDeleteRoomMutation,
  useGetOneRoomQuery,
  useUpdateRoomMutation,
} = hotelAPI;
