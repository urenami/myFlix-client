import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const MovieCard = ({ movies, onMovieClick }) => {
  return (
    <Card
    ClassName='h-100'
    border='primary'
      onClick={() => onMovieClick(movies)}
      style={{ cursor: 'pointer' }}
      >
       <Card.Img 
       variant="top" 
       src={movies.imageUrl} 
       ClassName='border'
       />
      <Card.Body>
        <Card.Title>{movies.Title}</Card.Title>
        <Card.Text>{movies.Director}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movies: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.object.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onMovieClick: PropTypes.func.isRequired,
  }).isRequired,
  OnMovieClick: PropTypes.func.isRequired,
};
