import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useParams,
} from "react-router-dom";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import { LoginView } from "../login-view/LoginView";
import { SignupView } from "../signup-view/SignupView";
import { ProfileView } from "../profile-view/ProfileView";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
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
    // Ensure FavoriteMovies is an array
    if (!Array.isArray(user.FavoriteMovies)) {
      user.FavoriteMovies = [];
    }
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleUserUpdated = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleFavoriteToggle = (movieId) => {
    // Instead of directly iterating over it, check if it exists and it is an array
    if (user && Array.isArray(user.FavoriteMovies)) {
      const isFavorite = user.FavoriteMovies.includes(movieId);
      const updatedFavorites = isFavorite
        ? user.FavoriteMovies.filter((id) => id !== movieId)
        : [...user.FavoriteMovies, movieId];

      const updatedUser = { ...user, FavoriteMovies: updatedFavorites };

      fetch(
        `https://murmuring-brook-46457-0204485674b0.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          method: isFavorite ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then(() => {
          handleUserUpdated(updatedUser);
        })
        .catch((error) => {
          console.error("Error updating favorite movies:", error);
        });
    } else {
      // Handle the case where user or user.FavoriteMovies are invalid
      console.warn("user or user.FavoriteMovies is invalid");
    }
  };

  const MovieViewWrapper = () => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);
    if (!movie) return <Navigate to="/" />;
    return (
      <Col>
        <MovieView
          movie={movie}
          isFavorite={user?.FavoriteMovies?.includes(movie._id)}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </Col>
    );
  };

  return (
    <Router>
      <Navbar expand="lg" className="p-3">
        <Navbar.Brand as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Row>
                <div>
                  <div className="d-flex flex-wrap">
                    {movies.map((movie) => (
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        isFavorite={user?.FavoriteMovies?.includes(movie._id)}
                        onFavoriteToggle={handleFavoriteToggle}
                      />
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
              </div>
            </div>
          }
        />
        <Route path="/movies/:movieId" element={<MovieViewWrapper />} />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileView
                user={user}
                movies={movies}
                onLoggedOut={handleLogout}
                onUserUpdated={handleUserUpdated}
              />
            ) : (
              <Navigate to="/login" />
            )
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
