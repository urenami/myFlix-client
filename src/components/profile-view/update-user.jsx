import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const UpdateUser = ({ user }) => {
  const storedToken = localStorage.getItem("token");

  const [token] = useState(storedToken ? storedToken : null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    console.log(data);

    const updateUser = await fetch(`https://my-flixdb-56034.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const response = await updateUser.json();
    console.log(response);
    if (response) {
      alert("Your account has been successfully updated! Please log in again.");
      localStorage.clear();
      window.location.reload();
    } else {
      alert("Something didn't work as expected. Please try again.");
    }
  };

  const handleDeregister = () => {
    fetch(`https://my-flixdb-56034.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("The account has been successfully deleted.");
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something didn't work as expected. Please try again.");
      }
    });
  };

  return (
    <>
      <h4>Update Profile Information</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday: </Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="button-primary mt-3">
          Save changes
        </Button>
      </Form>
      <Button
        onClick={handleDeregister}
        className="button-delete mt-3"
        variant="danger"
      >
        Delete account
      </Button>
    </>
  );
};
