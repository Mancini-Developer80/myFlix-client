import React from "react";

export function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <h2>{movie.title}</h2>
      <p>{movie.year}</p>
    </div>
  );
}
