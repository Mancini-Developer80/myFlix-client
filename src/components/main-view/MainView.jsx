import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import { LoginView } from "../loginView/LoginView";
import { SignupView } from "../signupView/SignupView";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import "./mainView.scss";

export function MainView() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
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
  }, [user]);

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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Row>
                <div>
                  <Button onClick={handleLogout} className="mb-3">
                    Logout
                  </Button>
                  <div className="d-flex flex-wrap">
                    {movies.map((movie) => (
                      <MovieCard key={movie._id} movie={movie} />
                    ))}
                  </div>
                </div>
              </Row>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
              <div className="w-75 shadow-sm rounded bg-light p-4">
                <LoginView onLoggedIn={handleLogin} />
                <Link to="/signup" className="btn btn-primary mt-3 w-100">
                  Signup
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
              <div className="w-75 shadow-sm rounded bg-light p-4">
                <SignupView />
                <Link to="/login" className="btn btn-primary mt-3 w-100">
                  Login
                </Link>
              </div>
            </div>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <Col>
              <MovieView />
            </Col>
          }
        />
      </Routes>
    </Router>
  );
}

MainView.propTypes = {
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
  setMovies: PropTypes.func,
};
