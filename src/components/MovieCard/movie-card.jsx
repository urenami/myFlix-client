//importing
import PropTypes from "prop-types";

//export and logic
export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movieData);
      }}
    >
      {movieData.Title}
    </div>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Director: PropTypes.object.isRequired,
    Actors: PropTypes.array,
    imageURL: PropTypes.string.isRequired,
  }),
};
