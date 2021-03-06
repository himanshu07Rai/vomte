import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface AuthState {
  user: string | null;
  name: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  name: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: string; name: string; token: string }>
    ) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload.user,
          name: action.payload.name,
          token: action.payload.token,
        })
      );
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },

    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
