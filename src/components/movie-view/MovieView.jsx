import React from "react";

function MovieView({ movie, onBackClick }) {
  return (
    <div className="main-view">
      <h1>{movie.title}</h1>
      <div className="img">
        <img src={movie.image} alt={movie.title} />
      </div>
      <p>{movie.description}</p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Actors:</strong>
      </p>
      <ul>
        {movie.actors.map((actor, index) => (
          <li key={index}>{actor}</li>
        ))}
      </ul>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
}

export default MovieView;
