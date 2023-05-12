import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "The Dark Knight ",
      Description:
        "The Batman, police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City",
      image:
        "https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i",
      Director: "Christopher Nolan",
    },
    {
      id: 2,
      Title: "Avengers: Infinity War",
      Description:
        "The Avengers and the Guardians of the Galaxy attempt to prevent Thanos from collecting the six all-powerful Infinity Stones as part of his quest to kill half of all life in the universe.",
      image:
        "https://www.imdb.com/title/tt4154756/mediaviewer/rm4044245504/?ref_=tt_ov_i",
      Director: "Anthony Russo, Joe Russo",
    },
    {
      id: 3,
      Title: "Avengers: End Game ",
      Description:
        "The surviving members of the Avengers and their allies attempt to reverse Thanos actions in Infinity War.",
      image:
        "https://www.imdb.com/title/tt4154796/mediaviewer/rm2775147008/?ref_=tt_ov_i",
      Director: "Anthony Russo, Joe Russo",
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
