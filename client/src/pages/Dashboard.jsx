import { useAppSelector, useAppDispatch } from "../app/hooks";

import { selectAuth } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { logout } from "../features/authSlice";
import toast from "react-hot-toast";
import { selectPolls, setPolls } from "../features/pollSlice";
import { useGetPollsQuery } from "../services/pollAPI";
import SpinnerComp from "../components/Spinner";
import Quiz from "../components/Quiz";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const polls = useAppSelector(selectPolls);
  if (!user) navigate("/login");
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
  const handleLogout = () => {
    dispatch(logout());
    notify();
  };

  const { data, isLoading } = useGetPollsQuery();
  console.log("polls", polls);
  console.log(data);
  // useEffect(() => {
  dispatch(setPolls(data));
  // }, []);
  if (isLoading) return <SpinnerComp />;
  return (
    <Container>
      {user}
      <Quiz data={data} />
      <Link to="/createPoll">Create Poll</Link>
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
