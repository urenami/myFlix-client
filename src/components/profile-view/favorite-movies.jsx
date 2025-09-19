import React from "react";
import PropTypes from "prop-types";
import { Col, Button, Card } from "react-bootstrap";

function FavoriteMovies({ movies, user, onRemove }) {
  // filter only the user's favorite movies
  const favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  if (favoriteMovies.length === 0) {
    return <Col className="mt-4">You have not added any movies yet</Col>;
  }

  return (
    <>
      <h4 className="mt-4">Favorite Movies</h4>
      {favoriteMovies.map((movie) => (
        <Col key={movie._id} xs={6} sm={4} md={3} lg={3} className="mb-4">
          <Card>
            <Card.Img variant="top" src={movie.imageUrl} alt={movie.Title} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Button
                variant="danger"
                onClick={() => onRemove(movie._id)} 
              >
                Remove
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
}

FavoriteMovies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
      }).isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export { FavoriteMovies };
