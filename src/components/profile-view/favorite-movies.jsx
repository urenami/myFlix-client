import { MovieCard } from "../MovieCard/movie-card";
import { Row, Col } from "react-bootstrap";

export const FavoriteMovies = ({ movies, user }) => {
<<<<<<< Updated upstream
  let FavoriteMovies = movies.filter((movies) =>
    user.FavoriteMovies.includes(movies.id)
=======
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);
  let FavoriteMovies = movies.filter((movies) =>
    user.FavoriteMovies.includes(movies._id)
>>>>>>> Stashed changes
  );

  return (
    <>
      <h3 className="mt-4 pt-4 mb-3 text-primary">Your favorite movies:</h3>
      <Row>
        {FavoriteMovies.map((movie) => (
          <Col className="mb-4 " key={movies._id} md={6}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};
