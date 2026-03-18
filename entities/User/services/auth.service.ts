import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { clearUserProfile, setUserProfile } from "../slices/Profile.slice";
import { toast } from "react-toastify";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as any).auth?.token || sessionStorage.getItem("authToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["me"],

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    sendOTP: builder.mutation({
      query: (payload) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: payload,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (payload) => ({
        url: "/auth/verify",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    getMe: builder.query({
      query: () => "/auth/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserProfile(data.data.user));
        } catch {
          toast.error("در دریافت اطلاعات پروفایل مشکلی وجود دارد.");
          sessionStorage.removeItem("authToken");
          dispatch(clearUserProfile());
          window.location.href = "/login";
        }
      },
      providesTags: ["me"],
    }),
    uploadAvatar: builder.mutation({
      query: (file: File) => {
        const formData = new FormData();
        formData.append("avatar", file);
        return {
          url: "/auth/avatar",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["me"],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/auth/update-profile",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["me"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useLoginMutation,
  useGetMeQuery,
  useUploadAvatarMutation,
  useUpdateProfileMutation,
} = authAPI;
