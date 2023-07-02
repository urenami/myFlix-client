import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {Button, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { SimilarMovies } from "./similar-movies";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const movies = useSelector((state) => state.movies.list);
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const [isFavoriteMovie, setAsFavorite] = useState(
    user.FavoriteMovies.includes(movies._id)
  );

  useEffect(() => {
    setAsFavorite(user.FavoriteMovies.includes(movies._id));
    window.scrollTo(0, 0);
  }, [movieId]);

  const addFavorite = () => {
    fetch(
      `https://my-flixdb-56034.herokuapp.com//users/${user._id}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully added to favorites");
          setAsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  const removeFavorite = () => {
    fetch(
      `https://my-flixdb-56034.herokuapp.com/users/${user._id}/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert(`"${movies.Title}"successfully deleted from favorites`);
          setAsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <>
      <Col className="mb-4">
        <div>
          <img src={movies.imageUrl} className="w-50 border" />
        </div>
        <div>
          <span>Title: </span>
          <span>{movies.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movies.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movies.Director}</span>
        </div>
        <Link to={`/`}>
          <Button variant="primary">Back</Button>
        </Link>
        {isFavoriteMovie ? (
          <Button variant="danger" className="ms-2" onClick={removeFavorite}>
            Remove from favorites
          </Button>
        ) : (
          <Button variant="success" className="ms-2" onClick={addFavorite}>
            Add to favorites
          </Button>
        )}
      </Col>
      <Container>
        <SimilarMovies movies={movies} movie={movie} />
      </Container>
    </>
  );
};