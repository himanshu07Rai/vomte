import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { useGetVotesQuery, useVoteMutation } from "../services/voteAPI";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVotes } from "../features/voteSlice";

import SpinnerComp from "./Spinner";

const Quiz = ({ data, storeVotes }) => {
  const dispatch = useAppDispatch();
  const {
    data: votes,
    isLoading: isVoteLoading,
    isError: isVoteError,
    error: voteError,
  } = useGetVotesQuery();
  // console.log(data);

  const [vote, { data: newVote, isLoading, isError, error }] =
    useVoteMutation();
  useEffect(() => {
    if (isVoteLoading) {
      <SpinnerComp />;
    }
  }, [isVoteLoading]);

  useEffect(() => {
    if (isError) {
      toast(error.data.error.message);
    }
  }, [isError]);
  useEffect(() => {
    if (isVoteError) {
      toast(voteError.data.error.message);
    }
  }, [isVoteError]);
  const handleVote = (e) => {
    vote(e);
    // console.log(e);
  };

  // console.log("storeVotes", storeVotes);
  return (
    <div>
      {data.map((p) => {
        let res;
        if (storeVotes && storeVotes.length > 0) {
          res = storeVotes.filter((vote) => vote.poll_id == p.poll_id);
          console.log("p.poll_id", p.poll_id);
          console.log("res", res);
        }
        return (
          <div key={p.poll_id}>
            <h1>{p.description}</h1>
            {p.options.map((op, index) => {
              let num = 0;
              if (res) {
                num = res.filter((vote) => vote.option === op);
              }

              return (
                <button
                  key={index}
                  onClick={() => handleVote({ poll_id: p.poll_id, option: op })}
                >
                  {op}-{num.length}
                </button>
              );
            })}
            <h3>Voting</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Quiz;
