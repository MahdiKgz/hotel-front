import { authAPI } from "@/entities/User/services/auth.service";
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/entities/User/slices/Profile.slice";
import { domainAPI } from "@/entities/Domain/services/domain.service";
import { hotelAPI } from "@/entities/Hotel/services/hotel.service";
import { reportAPI } from "@/entities/Report/services/report.service";
import { landingAPI } from "@/entities/Landing/services/landing.service";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [domainAPI.reducerPath]: domainAPI.reducer,
    [hotelAPI.reducerPath]: hotelAPI.reducer,
    [reportAPI.reducerPath]: reportAPI.reducer,
    [landingAPI.reducerPath]: landingAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(domainAPI.middleware)
      .concat(hotelAPI.middleware)
      .concat(reportAPI.middleware)
      .concat(landingAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
