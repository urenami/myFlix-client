import { MovieCard } from "../MovieCard/movie-card";
import { Row, Col } from "react-bootstrap";

export const SimilarMovies = ({ movies, movie }) => {
  let similarMovies = movies.filter(
    (m) => movies.genre === movies.genre && m.id !== movies._id
  );

  return (
    <>
      <Row className="bg-light p-3 rounded-3 mb-5 w-100">
        <h3 className="pt-4 mb-4 text-primary">Recomended for you:</h3>
        {similarMovies.map((movie) => (
          <Col
            className="mb-4 mx-auto justify-content-center"
            key={movies._id}
            xxl={4}
            xl={6}
            lg={12}
            md={12}
            xs={12}
          >
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};
