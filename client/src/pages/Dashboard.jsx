import { useEffect } from "react";
import toast from "react-hot-toast";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import SpinnerComp from "../components/Spinner";
import Quiz from "../components/Quiz";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectAuth, logout } from "../features/authSlice";
import { selectPolls, setPolls } from "../features/pollSlice";
import { selectVotes } from "../features/voteSlice";
import { useGetPollsQuery } from "../services/pollAPI";
import { useGetVotesQuery } from "../services/voteAPI";
import { setVotes } from "../features/voteSlice";

const notify = () => {
  toast.success("Logout", {
    style: {
      border: "1px solid #713200",
      padding: "16px",
      color: "#251a11",
    },
    iconTheme: {
      primary: "#713200",
      secondary: "#FFFAEE",
    },
  });
};

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const polls = useAppSelector(selectPolls);
  const storeVotes = useAppSelector(selectVotes);
  // console.log("storeVotes", storeVotes);
  if (!user) navigate("/login");

  const handleLogout = () => {
    dispatch(logout());
    notify();
  };

  const { data, isLoading } = useGetPollsQuery();
  const { data: databaseVotes, isLoading: isVoteLoading } = useGetVotesQuery();
  // console.log("polls", polls);
  // console.log("Data", data);
  useEffect(() => {
    if (data) dispatch(setPolls(data));
  }, [data]);

  // console.log(databaseVotes);
  useEffect(() => {
    if (databaseVotes) dispatch(setVotes(databaseVotes));
  }, [databaseVotes]);
  if (isLoading || isVoteLoading) return <SpinnerComp />;
  // console.log("polls.polls", polls.polls);
  return (
    <Container>
      {user}
      <Quiz data={polls.polls} storeVotes={storeVotes.storeVotes} />
      <Link to="/createPoll">Create Poll</Link>
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
