import { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./signup-view.scss";

const API_URL = process.env.API_URL || "http://localhost:8080";

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    try {
      const response = await fetch("${API_URL}/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errText = await response.text();
        alert("Signup failed: " + errText);
        return;
      }

      alert("Signup successful, please login!");

      if (onSignedUp) {
        onSignedUp();
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Error signing up:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="signup-form">
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday" className="mb-3">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="text"
          placeholder="YYYY-MM-DD"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

SignupView.propTypes = {
  onSignedUp: PropTypes.func,
};
