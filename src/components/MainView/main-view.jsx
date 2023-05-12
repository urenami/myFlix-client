import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "The Dark Knight ",
      Director: "Christopher Nolan",
      image:
        "https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i",
    },
    {
      id: 2,
      Title: "Avengers: Infinity War",
      Director: "Anthony Russo, Joe Russo",
      image:
        "https://www.imdb.com/title/tt4154756/mediaviewer/rm4044245504/?ref_=tt_ov_i",
    },
    {
      id: 3,
      Title: "Avengers: End Game ",
      Director: "Anthony Russo, Joe Russo",

      image:
        "https://www.imdb.com/title/tt4154796/mediaviewer/rm2775147008/?ref_=tt_ov_i",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div> The list is empty! </div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
