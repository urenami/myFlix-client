import { MovieCard } from "../MovieCard/Movie-card";
import { Row, Col } from "react-bootstrap";

export const FavoriteMovies = ({ movies, user }) => {
  let favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie.id)
  );

  return (
    <>
      <h3 className="mt-4 pt-4 mb-3 text-primary">Your favorite movies:</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col
            className="mb-4 "
            key={movie.id}
            md={6}
          >
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};