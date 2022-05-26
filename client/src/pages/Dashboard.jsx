import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { useAppDispatch } from "../app/hooks";
import { selectAuth } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { logout } from "../features/authSlice";
import toast from "react-hot-toast";
import { selectPolls, setPolls } from "../features/pollSlice";
import { useCreatePollMutation, useGetPollsQuery } from "../services/pollAPI";
import SpinnerComp from "../components/Spinner";
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

  const [description, setDescription] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const [createPoll, { isSuccess, isError, error }] = useCreatePollMutation();
  const handleSubmit = async () => {
    let options = [option1, option2, option3, option4];
    await createPoll({ description, options });
  };

  const { data, isLoading } = useGetPollsQuery();
  dispatch(setPolls(data));

  if (isLoading) return <SpinnerComp />;
  return (
    <Container>
      {user}
      polls
      {JSON.stringify(data)}
      <Form>
        <Form.Group>
          <Form.Label>dscription</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Option 1</Form.Label>
          <Form.Control
            name="op1"
            type="text"
            placeholder="Option 1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Option 2</Form.Label>
          <Form.Control
            name="op2"
            type="text"
            placeholder="Option 2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Option 3</Form.Label>
          <Form.Control
            name="op3"
            type="text"
            placeholder="Option 3"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Option 4</Form.Label>
          <Form.Control
            name="op4"
            type="text"
            placeholder="Option 4"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
