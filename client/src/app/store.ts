import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query/react";

import { authApi } from "../services/authAPI";
import { pollApi } from "../services/pollAPI";
import { voteApi } from "../services/voteAPI";
import authReducer from "../features/authSlice";
import pollReducer from "../features/pollSlice";
import voteReducer from "../features/voteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    poll: pollReducer,
    vote: voteReducer,
    [authApi.reducerPath]: authApi.reducer,
    [pollApi.reducerPath]: pollApi.reducer,
    [voteApi.reducerPath]: voteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(pollApi.middleware)
      .concat(voteApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
