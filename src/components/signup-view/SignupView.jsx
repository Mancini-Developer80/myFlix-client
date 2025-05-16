import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import React from "react";

export function SignupView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }

    const data = {
      username: username,
      password: password,
      email: email,
    };

    fetch("https://murmuring-brook-46457-0204485674b0.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          // Try to parse error JSON from the server, fallback to text
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Signup failed");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess("Signup successful");
        setError("");
      })
      .catch((error) => {
        console.error("Error during signup:", error.message);
        setError(error.message || "Signup failed");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="w-100 bg-light p-4">
        <h1 className="text-center mb-4">Signup</h1>
        {error && (
          <Alert variant="danger" className="text-center mb-3">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="text-center mb-3">
            {success}
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
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
