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

  tagTypes: ["hotels", "rooms"],

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
    getOneHotel: builder.query({
      query: (slug) => `/hotel/${slug}`,
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
  }),
});

export const {
  useAddHotelMutation,
  useGetAllHotelsQuery,
  useGetOneHotelQuery,
  useGetRoomsQuery,
  useCreateRoomMutation,
} = hotelAPI;
