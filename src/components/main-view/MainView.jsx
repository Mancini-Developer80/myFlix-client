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
import Form from "react-bootstrap/Form";

export function MainView() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

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
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [user]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(query)
    );
    setFilteredMovies(filtered);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleLogin = (user, token) => {
    if (!Array.isArray(user.favoriteMovies)) {
      user.favoriteMovies = [];
    }
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleUserUpdated = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Updated: expects the whole movie object
  const handleFavoriteToggle = (movie) => {
    if (user && Array.isArray(user.favoriteMovies)) {
      const isFavorite = user.favoriteMovies.includes(movie._id);
      const updatedFavorites = isFavorite
        ? user.favoriteMovies.filter((id) => id !== movie._id)
        : [...user.favoriteMovies, movie._id];

      const updatedUser = { ...user, favoriteMovies: updatedFavorites };

      fetch(
        `https://murmuring-brook-46457-0204485674b0.herokuapp.com/users/${
          user._id
        }/movies/${encodeURIComponent(movie.Title)}`,
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
      console.warn("user or user.favoriteMovies is invalid");
    }
  };

  // Note: This will only work if your backend supports DELETE /movies/:id for admins
  const handleDeleteMovie = (movieId) => {
    fetch(
      `https://murmuring-brook-46457-0204485674b0.herokuapp.com/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setMovies((prevMovies) =>
            prevMovies.filter((movie) => movie._id !== movieId)
          );
          setFilteredMovies((prevFilteredMovies) =>
            prevFilteredMovies.filter((movie) => movie._id !== movieId)
          );
        } else {
          response.text().then((error) => {
            console.error(
              "Error deleting movie:",
              response.status,
              response.statusText,
              error
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  const MovieViewWrapper = () => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);
    if (!movie) return <Navigate to="/" />;
    return (
      <Col>
        <MovieView
          movie={movie}
          isFavorite={user?.favoriteMovies?.includes(movie._id)}
          onFavoriteToggle={() => handleFavoriteToggle(movie)}
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
              <div>
                <Form className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Search movies by title..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </Form>
                <Row>
                  <div className="d-flex flex-wrap">
                    {filteredMovies.map((movie) => (
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        isFavorite={user?.favoriteMovies?.includes(movie._id)}
                        onFavoriteToggle={() => handleFavoriteToggle(movie)}
                        onDelete={handleDeleteMovie}
                      />
                    ))}
                  </div>
                </Row>
              </div>
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
      ImageURL: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Actors: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  setMovies: PropTypes.func,
};
