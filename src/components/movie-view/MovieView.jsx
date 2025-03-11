import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export function MovieView({ movie, onBackClick }) {
  return (
    <div className="main-view">
      <h1>{movie.Title}</h1>
      <div className="img">
        <img src={movie.image} alt={movie.Title} />
      </div>
      <p>{movie.Description}</p>
      <p>
        <strong>Genre:</strong> {movie.Genre.Description}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director.Name}
      </p>
      <p>
        <strong>Actors: </strong>
      </p>
      <ul>
        {movie.Actors &&
          movie.Actors.map((actor, index) => <li key={index}>{actor}</li>)}
      </ul>
      <Link to="/" className="btn btn-primary">
        Back
      </Link>
    </div>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Actors: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
