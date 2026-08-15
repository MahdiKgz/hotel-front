import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ApiResponse,
  HotelDetailParams,
  HotelDetailResult,
  HotelSearchParams,
  HotelSearchResult,
  LandingFilters,
} from "../types/landing.types";
import { API_BASE_URL } from "@/shared/configs/api";

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
    getLandingHotel: builder.query<ApiResponse<HotelDetailResult>, HotelDetailParams>({
      query: ({ slug, ...params }) => ({
        url: `/landing/hotels/${encodeURIComponent(slug)}`,
        params,
      }),
    }),
  }),
});

export const {
  useGetLandingFiltersQuery,
  useGetLandingHotelQuery,
  useLazySearchLandingHotelsQuery,
} = landingAPI;
