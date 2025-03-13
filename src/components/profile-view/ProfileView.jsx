import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/MovieCard";

export function ProfileView({ user, movies, onLoggedOut, onUserUpdated }) {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    setFavoriteMovies(
      movies.filter((m) => user.FavoriteMovies?.includes(m._id))
    );
  }, [movies, user.FavoriteMovies]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch(
      `https://murmuring-brook-46457-0204485674b0.herokuapp.com/users/${user.Username}`,
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
      `https://murmuring-brook-46457-0204485674b0.herokuapp.com/users/${user.Username}`,
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
    const updatedFavorites = user.FavoriteMovies.filter((id) => id !== movieId);
    const updatedUser = { ...user, FavoriteMovies: updatedFavorites };

    fetch(
      `https://murmuring-brook-46457-0204485674b0.herokuapp.com/users/${user.Username}/movies/${movieId}`,
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
    <div className="profile-view">
      <h1>Profile</h1>
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
      <h2 className="mt-4">Favorite Movies</h2>
      <div className="d-flex flex-wrap">
        {favoriteMovies.map((movie) => (
          <div key={movie._id} className="position-relative">
            <MovieCard
              movie={movie}
              isFavorite={true} // Ensure isFavorite is true for favorite movies
              onFavoriteToggle={handleRemoveFavorite}
            />
            <Button
              variant="danger"
              className="position-absolute top-0 end-0"
              onClick={() => handleRemoveFavorite(movie._id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
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
