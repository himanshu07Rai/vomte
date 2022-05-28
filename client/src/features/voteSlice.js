import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  votes: [],
};

export const voteSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    setVotes: (state, action) => {
      state.votes = action.payload;
    },
    addVote: (state, action) => {
      state.polls.push(action.payload);
    },
  },
});

export const selectPolls = (state) => state.poll;

export const { setVotes, addVote } = voteSlice.actions;

export default voteSlice.reducer;
