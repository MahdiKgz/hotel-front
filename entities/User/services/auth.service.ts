import { customBaseQuery } from "@/shared/configs/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authAPI;
