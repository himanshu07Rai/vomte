import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginMutation } from "../services/authAPI";
import { useAppDispatch } from "../app/hooks";
import { useAppSelector } from "../app/hooks";
import { setUser } from "../features/authSlice";
import { selectAuth } from "../features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  if (user) navigate("/dashboard");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [loginUser, { data, isSuccess, isError, error }] = useLoginMutation();

  const handleLogin = async () => {
    if (email && password) {
      await loginUser(inputs);
    } else {
      toast.error("df");
    }
  };

  const dispatch = useAppDispatch();

  const notify = () =>
    toast.success("user logged in", {
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

  useEffect(() => {
    if (isSuccess) {
      notify();
      dispatch(setUser({ user: data.user, token: data.token }));
      navigate("/dashboard");
    }
  }, [isSuccess]);

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="name@example.com"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Button onClick={handleLogin}>Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
