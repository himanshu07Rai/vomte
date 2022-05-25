import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  if (!user) navigate("/login");
  return <Container>{user}</Container>;
};

export default Dashboard;
