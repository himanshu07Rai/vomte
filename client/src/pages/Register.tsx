import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useRegisterMutation } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;

  const onChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [registerUser, { data, isSuccess, isError, error }] =
    useRegisterMutation();

  const handleSubmit = async () => {
    if (name && email && password) {
      await registerUser(inputs);
    } else {
      toast.error("Enter all fields");
    }
  };
  const navigate = useNavigate();

  const notify = (data: any) =>
    toast(data, {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

  useEffect(() => {
    if (isError) {
      notify(error);
    }
    if (isSuccess) {
      notify(data);
      navigate("/");
    }
  }, [isSuccess]);
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
