import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { useGetVotesQuery, useVoteMutation } from "../services/voteAPI";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVotes } from "../features/voteSlice";

import SpinnerComp from "./Spinner";
import { logout } from "../features/authSlice";

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
      if (voteError.data.error.message === "jwt expired") dispatch(logout());
      toast(voteError.data.error.message);
    }
  }, [isVoteError]);
  const handleVote = (e) => {
    vote(e);
    // console.log(e);
  };

  console.log(data);

  if (data.length === 0)
    return <h3 className="text-center">No polls available right now</h3>;

  // console.log("storeVotes", storeVotes);
  return (
    <div className="py-5">
      {data.map((p) => {
        let res;
        if (storeVotes && storeVotes.length > 0) {
          res = storeVotes.filter((vote) => vote.poll_id == p.poll_id);
          console.log("p.poll_id", p.poll_id);
          console.log("res", res);
        }
        return (
          <div
            key={p.poll_id}
            className="rounded mb-5 shadow p-3 bg-info bg-gradient"
          >
            <h1>Q. {p.description}</h1>
            <div className="d-flex flex-sm-row flex-column overflow-auto">
              {p.options.map((op, index) => {
                let num = 0;
                if (res) {
                  num = res.filter((vote) => vote.option === op);
                }

                return (
                  <button
                    className="border-0 m-sm-2 mb-3 rounded p-2 px-4 bg-light shadow "
                    key={index}
                    onClick={() =>
                      handleVote({ poll_id: p.poll_id, option: op })
                    }
                  >
                    {op}-{num.length}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Quiz;
