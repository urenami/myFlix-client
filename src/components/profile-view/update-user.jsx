import { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const UpdateUser = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username || user.Username,
      Password: password || user.Password, // ⚠️ some APIs require password to be non-empty
      Email: email || user.Email,
      Birthday: birthday || user.Birthday,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Update failed:", errText);
        alert("Update failed: " + errText);
        return;
      }

      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);

      // ✅ Save updated user in localStorage and state
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      alert("Your account has been successfully updated!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder={user.Username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder={user.Email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBirthday" className="mb-3">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          placeholder={user.Birthday.slice(0, 10)}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save changes
      </Button>
    </Form>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};
