import { authAPI } from "@/entities/User/services/auth.service";
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/entities/User/slices/Profile.slice";
import { domainAPI } from "@/entities/Domain/services/domain.service";
import { hotelAPI } from "@/entities/Hotel/services/hotel.service";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [domainAPI.reducerPath]: domainAPI.reducer,
    [hotelAPI.reducerPath]: hotelAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(domainAPI.middleware)
      .concat(hotelAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
