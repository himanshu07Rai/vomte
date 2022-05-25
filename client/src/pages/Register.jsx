import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useRegisterMutation } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "../app/hooks";
import { useAppSelector } from "../app/hooks";
import { setUser } from "../features/authSlice";
import { selectAuth } from "../features/authSlice";
import Spinner from "../components/Spinner";
const notifyError = (a) => {
  toast.error(a, {
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

const notifySuccess = (a) => {
  toast.success(a, {
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

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [registerUser, { data, isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const handleSubmit = async () => {
    if (name && email && password) {
      await registerUser(inputs);
    } else {
      toast.error("Enter all fields");
    }
  };

  useEffect(() => {
    if (isError) {
      notifyError(error.data.error.message);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("User Registered successfully");
      dispatch(setUser({ user: data.user, token: data.token }));
      navigate("/dashboard");
    }
  }, [isSuccess]);

  if (isLoading) return <Spinner />;
  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
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
        <Button onClick={handleSubmit}>Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
