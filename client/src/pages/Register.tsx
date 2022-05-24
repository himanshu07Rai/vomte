import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

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
      </Form>
    </Container>
  );
};

export default Register;
