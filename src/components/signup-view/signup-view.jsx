import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://my-flixdb-56034.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Form className='border border-3 rounded px-5 py-4' onSubmit={handleSubmit}>
      <h2 className='text-center'>Sign up</h2>
      <Form.Group controlId='username'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}required
          minLength={3}
        />
        </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}required
        />
        </Form.Group>

      <Form.Group controlId='email'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}required
        />
        </Form.Group>
      <Form.Group controlId='birthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}required
        />
        </Form.Group>

      <Button className='mt-3 w-100' variant='primary' type='submit'>Sign Up</Button>
    </Form>
  );
};