import { useAppSelector } from "../app/hooks";
import { useAppDispatch } from "../app/hooks";
import { selectAuth } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { logout } from "../features/authSlice";
import toast from "react-hot-toast";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  if (!user) navigate("/login");
  const notify = () => {
    toast.success("Logout", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
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
  return (
    <Container>
      {user}
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
