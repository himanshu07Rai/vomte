import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeVotes: [],
};

export const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    setVotes: (state, action) => {
      state.storeVotes = action.payload;
    },
    addVote: (state, action) => {
      state.storeVotes.push(action.payload);
    },
  },
});

export const selectVotes = (state) => state.vote;

export const { setVotes, addVote } = voteSlice.actions;

export default voteSlice.reducer;
