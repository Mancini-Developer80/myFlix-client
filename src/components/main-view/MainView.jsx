import React, { useState } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";

export function MainView() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Jurassic Park",
      year: 1993,
      image: "https://m.media-amazon.com/images/I/711ewSpPgUL._SL1200_.jpg",
      rating: 8.1,
      actors: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
      genre: "Adventure, Sci-Fi",
      description:
        "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
      director: "Steven Spielberg",
    },
    {
      id: 2,
      title: "The Matrix",
      year: 1999,
      image: "https://m.media-amazon.com/images/I/71D8+NFLZmL._SL1500_.jpg",
      rating: 8.7,
      actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      genre: "Action, Sci-Fi",
      description:
        "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      director: "Lana Wachowski, Lilly Wachowski",
    },
    {
      id: 3,
      title: "Inception",
      year: 2010,
      image: "https://m.media-amazon.com/images/I/912AErFSBHL._SL1500_.jpg",
      rating: 8.8,
      actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
      genre: "Action, Adventure, Sci-Fi",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      director: "Christopher Nolan",
    },
  ]);

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
          key={movie.id}
          movie={movie}
          onClick={() => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
}
