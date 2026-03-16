import { authAPI } from "@/entities/User/services/auth.service";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
