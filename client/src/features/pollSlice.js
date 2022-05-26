import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  polls: [],
};

export const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    setPolls: (state, action) => {
      state.polls = action.payload;
    },
  },
});

export const selectPolls = (state) => state.poll;

export const { setPolls } = pollSlice.actions;

export default pollSlice.reducer;
