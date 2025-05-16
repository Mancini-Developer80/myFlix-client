import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export function MovieCard({
  movie,
  isFavorite,
  onFavoriteToggle,
  onDelete,
  showDelete = true,
}) {
  return (
    <Card
      className="mb-4 mx-auto shadow"
      style={{ maxWidth: "400px", borderRadius: "18px" }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          background: "#f8f9fa",
          borderTopLeftRadius: "18px",
          borderTopRightRadius: "18px",
        }}
      >
        <Card.Img
          variant="top"
          src={movie.ImageURL}
          className="movie-image"
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
          }}
        />
      </div>
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className="h4 text-center mb-2" style={{ fontWeight: 700 }}>
          {movie.Title}
        </Card.Title>
        <Card.Text
          className="text-muted text-center mb-3"
          style={{ minHeight: "60px" }}
        >
          {movie.Description}
        </Card.Text>
        <div className="d-flex gap-2 w-100 justify-content-center">
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">Open</Button>
          </Link>
          <Button
            variant={isFavorite ? "danger" : "success"}
            onClick={() => onFavoriteToggle(movie._id)}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          {showDelete && onDelete && (
            <Button
              variant="outline-danger"
              onClick={() => onDelete(movie._id, movie.Title)}
            >
              Delete
            </Button>
          )}
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
  onDelete: PropTypes.func,
  showDelete: PropTypes.bool,
};
