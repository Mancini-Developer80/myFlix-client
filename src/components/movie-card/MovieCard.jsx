import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

export function MovieCard({ movie, onClick }) {
  return (
    <Card onClick={onClick}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
      </Card.Body>
    </Card>
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
