<<<<<<< Updated upstream
//import the PropTypes library
import PropTypes from "prop-types";
=======
//importing
import PropTypes from "prop-types";

//export and logic
>>>>>>> Stashed changes
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

<<<<<<< Updated upstream
MovieCard.PropTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
=======
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Director: PropTypes.object.isRequired,
    Actors: PropTypes.array,
    imageURL: PropTypes.string.isRequired,
  }),
>>>>>>> Stashed changes
};
