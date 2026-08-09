import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ApiResponse,
  HotelSearchParams,
  HotelSearchResult,
  LandingFilters,
} from "../types/landing.types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export const landingAPI = createApi({
  reducerPath: "landingAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getLandingFilters: builder.query<ApiResponse<LandingFilters>, void>({
      query: () => "/landing/filters",
    }),
    searchLandingHotels: builder.query<
      ApiResponse<HotelSearchResult>,
      HotelSearchParams
    >({
      query: ({ stars, amenityIds, ...filters }) => ({
        url: "/landing/hotels",
        params: {
          ...filters,
          stars: stars?.join(","),
          amenityIds: amenityIds?.join(","),
        },
      }),
    }),
  }),
});

export const {
  useGetLandingFiltersQuery,
  useLazySearchLandingHotelsQuery,
} = landingAPI;
