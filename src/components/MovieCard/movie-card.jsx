import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movies }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movies._id)}`}>

      <Card className="h-100" border="primary">
        <Card.Img variant="top" src={movies.imageUrl} className="border" />
        <Card.Body className="text-center">
          <Card.Title>{movies.Title}</Card.Title>
          <Card.Text>{movies.Genre}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
MovieCard.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
