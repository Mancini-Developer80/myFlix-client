import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/MovieCard";

export function ProfileView({ user, movies, onLoggedOut, onUserUpdated }) {
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [birthday, setBirthday] = useState(user.birthday || "");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Sync form fields with user prop when it changes
  useEffect(() => {
    setUsername(user.username || "");
    setEmail(user.email || "");
    setBirthday(user.birthday || "");
    setPassword("");
  }, [user]);

  useEffect(() => {
    setFavoriteMovies(
      movies.filter((m) => user.favoriteMovies?.includes(m._id))
    );
  }, [movies, user.favoriteMovies]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      username,
      password,
      email,
      birthday,
    };

    fetch(
      `https://murmuring-brook-46457-0204485674b0.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        onUserUpdated(data);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleDeregister = () => {
    fetch(
      `https://murmuring-brook-46457-0204485674b0.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then(() => {
        onLoggedOut();
      })
      .catch((error) => {
        console.error("Error deregistering user:", error);
      });
  };

  const handleRemoveFavorite = (movieId) => {
    const movie = movies.find((m) => m._id === movieId);
    if (!movie) return;

    const updatedFavorites = user.favoriteMovies.filter((id) => id !== movieId);
    const updatedUser = { ...user, favoriteMovies: updatedFavorites };

    fetch(
      `https://murmuring-brook-46457-0204485674b0.herokuapp.com/users/${
        user.username
      }/movies/${encodeURIComponent(movie.Title)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then(() => {
        onUserUpdated(updatedUser);
      })
      .catch((error) => {
        console.error("Error removing favorite movie:", error);
      });
  };

  return (
    <div className="profile-view container my-5">
      <h1 className="text-center mb-4">Profile</h1>
      <div className="mx-auto" style={{ maxWidth: "500px" }}>
        <Form onSubmit={handleUpdate}>
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
          <Form.Group controlId="formBirthday" className="mb-3">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Update
          </Button>
        </Form>
        <Button
          variant="danger"
          className="mt-3 w-100"
          onClick={handleDeregister}
        >
          Deregister
        </Button>
      </div>
      <h2 className="mt-5 mb-4 text-center">Favorite Movies</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {favoriteMovies.map((movie) => (
          <div key={movie._id} className="col d-flex">
            <MovieCard
              movie={movie}
              isFavorite={true}
              onFavoriteToggle={() => handleRemoveFavorite(movie._id)}
              showDelete={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onLoggedOut: PropTypes.func.isRequired,
  onUserUpdated: PropTypes.func.isRequired,
};
