import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginMutation } from "../services/authAPI";
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

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  if (user) navigate("/dashboard");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [loginUser, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  // console.log("error", error);
  const handleLogin = async () => {
    if (email && password) {
      // console.log(data);
      await loginUser(inputs);
    } else {
      toast.error("Please fill all the fields !!");
    }
  };

  useEffect(() => {
    if (isError) {
      notifyError(error.data.error.message);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Logged in successfully");
      console.log("data", data);
      dispatch(
        setUser({ user: data.user, name: data.name, token: data.token })
      );
      navigate("/dashboard");
    }
  }, [isSuccess]);

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <form className="pt-3">
        <h3>Sign In</h3>
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
            onClick={handleLogin}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
        <p className="forgot-password text-right mt-2">
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </form>
    </Container>
  );
};

export default Login;
