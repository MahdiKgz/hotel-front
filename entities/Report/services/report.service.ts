import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportAPI = createApi({
  reducerPath: "reportAPI",
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
