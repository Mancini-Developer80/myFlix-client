import React from "react";
import PropTypes from "prop-types";

export function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <h2>{movie.Title}</h2>
      <img src={movie.image} alt={movie.Title} />
      <p>{movie.Description}</p>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
