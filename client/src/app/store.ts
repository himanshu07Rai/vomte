import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query/react";

import { authApi } from "../services/authAPI";
import { pollApi } from "../services/pollAPI";
import authReducer from "../features/authSlice";
import pollReducer from "../features/pollSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    poll: pollReducer,
    [authApi.reducerPath]: authApi.reducer,
    [pollApi.reducerPath]: pollApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(pollApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
