import { useState } from "react";
import PropTypes from "prop-types";

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
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
