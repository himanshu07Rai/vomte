import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query/react";

import { authApi } from "../services/authAPI";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
