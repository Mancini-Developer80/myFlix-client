import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import { LoginView } from "../loginView/LoginView";
import { SignupView } from "../signupView/SignupView";
import PropTypes from "prop-types";

export function MainView() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://murmuring-brook-46457-0204485674b0.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleLogin = (user, token) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  if (!user) {
    return (
      <div>
        {showSignup ? <SignupView /> : <LoginView onLoggedIn={handleLogin} />}
        <button onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? "Login" : "Signup"}
        </button>
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div className="container">
      <button onClick={handleLogout}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onClick={() => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
}

MainView.propTypes = {
  selectedMovie: PropTypes.shape({
    Title: PropTypes.string,
    image: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Actors: PropTypes.arrayOf(PropTypes.string),
  }),
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Actors: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  setSelectedMovie: PropTypes.func,
  setMovies: PropTypes.func,
};
