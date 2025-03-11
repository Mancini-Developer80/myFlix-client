import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React from "react";

export function LoginView({ onLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required");
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    fetch("https://murmuring-brook-46457-0204485674b0.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          onLoggedIn(data.user, data.token);
        } else {
          setError("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError("Login failed");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="w-100 bg-light p-4">
        <h1 className="text-center mb-4">Login</h1>
        {error && (
          <Alert variant="danger" className="text-center mb-3">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
