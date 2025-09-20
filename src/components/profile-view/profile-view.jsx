import PropTypes from "prop-types";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";
import { Link } from "react-router-dom";
import "./profile-view.scss";

function ProfileView({ user, setUser, movies, token }) {
  const handleRemoveMovie = (movieId) => {
    fetch(`http://localhost:8080/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        // Update local storage and React state
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((err) => console.error("Error removing favorite:", err));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4>User Information</h4>
              <p>Username: {user.Username}</p>
              <p>Birthday: {user.Birthday.slice(0, 10)}</p>
              <p>Email: {user.Email}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              {/* Pass setUser so Profile updates correctly */}
              <UpdateUser user={user} setUser={setUser} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <FavoriteMovies
          user={user}
          movies={movies}
          onRemove={handleRemoveMovie} // remove favorite handler
        />
      </Row>
      <Row>
        <div>
          <Button className="back-button" as={Link} to={"/"}>
            Back
          </Button>
        </div>
      </Row>
    </Container>
  );
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

export { ProfileView };
