import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const token = localStorage.getItem("token");

  const isFavorite = user.FavoriteMovies.includes(movie._id);

  // Unified function for adding/removing favorites
  const updateFavorites = (method) => {
    fetch(`http://localhost:8080/users/${user.Username}/movies/${movie._id}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((error) =>
        console.error("Error updating favorite movies:", error)
      );
  };

  return (
    <Card className="movie-view">
      <Card.Img
        className="h-50"
        src={movie.imageUrl}
        alt={`Poster of ${movie.Title}`}
      />
      <Card.Body>
        <Card.Title className="mb-3">{movie.Title}</Card.Title>
        <Card.Text>
          <strong>Description:</strong> {movie.Description}
        </Card.Text>
        <Card.Text>
          <strong>Genre:</strong> {movie.Genre.Name}
        </Card.Text>
        <Card.Text>
          <strong>Director:</strong> {movie.Director.Name}
        </Card.Text>

        <div className="d-flex flex-wrap mt-3">
          <Button as={Link} to={`/`} className="back-button">
            Back
          </Button>

          {!isFavorite ? (
            <Button
              onClick={() => updateFavorites("POST")}
              variant="success"
              className="ms-2"
            >
              Add to favorites
            </Button>
          ) : (
            <Button
              onClick={() => updateFavorites("DELETE")}
              variant="danger"
              className="ms-2"
            >
              Remove from favorites
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
