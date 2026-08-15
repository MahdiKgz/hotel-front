import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/shared/configs/api";

export const reportAPI = createApi({
  reducerPath: "reportAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["report.admin"],
  endpoints: (builder) => ({
    getAdminReport: builder.query({
      query: () => "/stats",
      providesTags: ["report.admin"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAdminReportQuery } = reportAPI;
