import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export function MovieCard({ movie, isFavorite, onFavoriteToggle, onDelete }) {
  return (
    <Card className="mb-3 mx-auto w-75 mt-4">
      <Card.Img variant="top" src={movie.ImageURL} className="movie-image" />
      <Card.Body>
        <Card.Title className="display-5 text-center">{movie.Title}</Card.Title>
        <Card.Text className="lead text-center">{movie.Description}</Card.Text>
        <div className="d-flex justify-content-between">
          <Link to={`/movies/${movie._id}`} className="btn btn-primary me-4">
            Open
          </Link>
          <Button
            variant={isFavorite ? "danger" : "success"}
            className="ml-2"
            onClick={() => onFavoriteToggle(movie._id)}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button
            variant="danger"
            className="ml-2"
            onClick={() => onDelete(movie._id, movie.Title)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
