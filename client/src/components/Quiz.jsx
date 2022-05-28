import React, { useEffect } from "react";
import { useGetVotesQuery, useVoteMutation } from "../services/voteAPI";
import SpinnerComp from "./Spinner";
import { useAppDispatch } from "../app/hooks";
import { setVotes } from "../features/voteSlice";
import toast from "react-hot-toast";

const Quiz = ({ data }) => {
  const dispatch = useAppDispatch();
  const { data: votes, isLoading: isVoteLoading } = useGetVotesQuery();
  console.log(data);

  if (votes) {
    dispatch(setVotes(votes));
  }
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

  const handleVote = (e) => {
    vote(e);
    console.log(e);
  };
  return (
    <div>
      {data.map((q) => (
        <div key={q.poll_id}>
          <h1>{q.description}</h1>
          {q.options.map((op, index) => (
            <button
              key={index}
              onClick={() => handleVote({ poll_id: q.poll_id, option: op })}
            >
              {op}
            </button>
          ))}
          <h3>Voting</h3>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
