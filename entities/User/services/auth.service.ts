import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { clearUserProfile, setUserProfile } from "../slices/Profile.slice";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/shared/configs/api";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as any).auth?.token || sessionStorage.getItem("authToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["me", "users"],

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
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
    }),
    recoverPassword: builder.mutation<{ message: string }, { token: string; password: string; confirmPassword: string }>({
      query: (body) => ({ url: "/auth/recover-password", method: "POST", body }),
    }),
    verifyEmail: builder.mutation<{ message: string }, { token: string }>({
      query: (body) => ({ url: "/auth/verify-email", method: "POST", body }),
      invalidatesTags: (_result, error) => error ? [] : ["me"],
    }),
    requestEmailVerification: builder.mutation<{ message: string }, { password: string }>({
      query: (body) => ({ url: "/auth/request-email-verification", method: "POST", body }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["me"],
    }),
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),
    getOneUser: builder.query({
      query: (id) => `/users/${id}`,
    }),
    banUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/ban`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
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
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useRecoverPasswordMutation,
  useVerifyEmailMutation,
  useRequestEmailVerificationMutation,
  useGetAllUsersQuery,
  useGetOneUserQuery,
  useBanUserMutation,
} = authAPI;
