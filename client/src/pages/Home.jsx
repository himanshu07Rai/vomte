import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/authSlice";

const Home = () => {
  const navigate = useNavigate();

  const { user, name } = useAppSelector(selectAuth);
  if (user) navigate("/dashboard");
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Create Polls!</h1>
          <p className="lead">Hope you like our service</p>
          <div className="buttons">
            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
