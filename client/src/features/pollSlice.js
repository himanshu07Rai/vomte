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
    addPoll: (state, { payload }) => {
      state.polls.push(payload);
    },
  },
});

export const selectPolls = (state) => state.poll;

export const { setPolls, addPoll } = pollSlice.actions;

export default pollSlice.reducer;
