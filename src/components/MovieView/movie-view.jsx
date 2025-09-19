import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const token = localStorage.getItem("token");

  // ✅ Check if current movie is already in favorites
  const isFavorite = user.FavoriteMovies.includes(movie._id);

  // ✅ Add movie to favorites
  const addFavoriteMovie = () => {
    fetch(`http://localhost:8080/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser); // instantly updates UI
      })
      .catch((error) => console.error("Error adding favorite:", error));
  };

  // ✅ Remove movie from favorites
  const deleteFavoriteMovie = () => {
    fetch(`http://localhost:8080/users/${user.Username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser); // instantly updates UI
      })
      .catch((error) => console.error("Error removing favorite:", error));
  };

  return (
    <Card>
      <Card.Img
        className="h-50"
        src={movie.imageUrl}
        alt={`Poster of ${movie.Title}`}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>

        <Link to={`/`}>
          <Button className="back-button">Back</Button>
        </Link>

        {!isFavorite ? (
          <Button
            onClick={addFavoriteMovie}
            variant="success"
            className="ms-2"
          >
            Add to favorite
          </Button>
        ) : (
          <Button
            onClick={deleteFavoriteMovie}
            variant="danger"
            className="ms-2"
          >
            Remove from favorite
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
