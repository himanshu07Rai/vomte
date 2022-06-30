import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import toast from "react-hot-toast";

import { useAppSelector } from "../app/hooks";
import { useAppDispatch } from "../app/hooks";
import { selectAuth } from "../features/authSlice";
import { useCreatePollMutation } from "../services/pollAPI";
import { addPoll } from "../features/pollSlice";

const CreatePoll = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, name } = useAppSelector(selectAuth);
  if (!user) navigate("/login");
  const notify = (msg) => {
    toast.success(msg, {
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

  const [description, setDescription] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  let poll;
  const [createPoll, { isSuccess, isError, error }] = useCreatePollMutation();

  const handleSubmit = async () => {
    let options = [option1, option2, option3, option4];
    if (!description || !option1 || !option2 || !option3 || !option4) {
      notify("Fill all fields");
      return;
    }

    poll = await createPoll({ description, options });
    dispatch(addPoll(poll.data));
    notify("Created");
    // console.log(isSuccess);
    navigate("/dashboard");
  };

  useEffect(() => {
    if (isError) {
      notify("Error");
    }
  }, [isError]);

  return (
    <Container>
      <h2>Hi {name} !!</h2>
      <Form>
        <Form.Group>
          <h3 className="mt-2">
            <Form.Label>Description</Form.Label>
          </h3>
          <Form.Control
            name="description"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <h4 className="mt-2">
            <Form.Label>Option 1</Form.Label>
          </h4>
          <Form.Control
            name="op1"
            type="text"
            placeholder="Option 1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <h4 className="mt-2">
            <Form.Label>Option 2</Form.Label>
          </h4>
          <Form.Control
            name="op2"
            type="text"
            placeholder="Option 2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <h4 className="mt-2">
            <Form.Label>Option 3</Form.Label>
          </h4>
          <Form.Control
            name="op3"
            type="text"
            placeholder="Option 3"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <h4 className="mt-2">
            <Form.Label>Option 4</Form.Label>
          </h4>
          <Form.Control
            name="op4"
            type="text"
            placeholder="Option 4"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePoll;
