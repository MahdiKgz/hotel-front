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

  tagTypes: ["hotels"],

  endpoints: (builder) => ({
    addHotel: builder.mutation({
      query: (paylaod) => ({
        url: "/hotel",
        method: "POST",
        body: paylaod,
      }),
      invalidatesTags: ["hotels"],
    }),
  }),
});

export const { useAddHotelMutation } = hotelAPI;
