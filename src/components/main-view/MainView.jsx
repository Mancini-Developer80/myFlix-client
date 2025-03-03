import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import PropTypes from "prop-types";

export function MainView() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://murmuring-brook-46457-0204485674b0.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

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
