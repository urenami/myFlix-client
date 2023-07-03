import { MovieCard } from "../MovieCard/movie-card";
import { Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux';

export const FavoriteMovies = ({ movies, user }) => {
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);

  let FavoriteMovies = movies.filter((movies) =>
    user.FavoriteMovies.includes(movies.id)
  );

  return (
    <>
      <h3 className="mt-4 pt-4 mb-3 text-primary">Your favorite movies:</h3>
      <Row>
        {FavoriteMovies.map((movie) => (
          <Col className="mb-4 " key={movie.id} md={6}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};
