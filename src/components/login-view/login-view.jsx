import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export const LoginView = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://my-flixdb-56034.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("something went wrong");
      });
  };

  return (
    <Form className="border border-3 rounded px-5 py-4" onSubmit={handleSubmit}>
      <h2 className="text-center">Sign in</h2>
      <Form.Group controlId="Username">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={6}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label className="mt-2">Password:</Form.Label>
        <Form.Control
          type="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={7}
        />
      </Form.Group>
      <Button className="mt-3 w-100" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
