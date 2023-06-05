import { useState, useEffect } from "react";

import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token && !(storedUser && storedToken)) {
      return;
    }

    fetch("https://my-flixdb-56034.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Director: movie.Director.Name,
            Description: movie.Description,
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <div>
        <div>
          Login:
          <br />
          <br />
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
        </div>
        <br />
        or
        <div>
          Register:
          <br />
          <br />
          
          <SignupView />
        </div>
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movieData={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
          }}
        >
          Logout
        </button>
      </div>
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    </div>
  );
};
