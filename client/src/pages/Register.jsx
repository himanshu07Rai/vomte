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
import { Link } from "react-router-dom";
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
    <Container className="mt-5">
      <Form>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            name="name"
            type="text"
            className="form-control mt-2"
            placeholder="John Doe"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            name="email"
            type="text"
            placeholder="name@example.com"
            className="form-control mt-2"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="*******"
            value={password}
            className="form-control mt-2"
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="d-grid">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
        <p className="forgot-password text-right mt-2">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
