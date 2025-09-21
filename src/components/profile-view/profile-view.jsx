import PropTypes from "prop-types";
import { Row, Col, Container, Card } from "react-bootstrap";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";
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
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch((err) => console.error("Error removing favorite:", err));
  };

  return (
    <Container className="profile-view">
      {/* Top row: User Info + Update Profile */}
      <Row className="mb-4 justify-content-center">
        <Col md={5}>
          <Card className="profile-card">
            <Card.Body>
              <h4 className="section-title">User Information</h4>
              <p>Username: {user.Username}</p>
              <p>Birthday: {user.Birthday.slice(0, 10)}</p>
              <p>Email: {user.Email}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="profile-card">
            <Card.Body>
              <h4 className="section-title">Update Profile</h4>
              <UpdateUser user={user} setUser={setUser} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bottom row: Favorite Movies */}
      <Row className="mb-4">
        <Col>
          <Card className="profile-card">
            <Card.Body>
              <h4 className="section-title">Favorite Movies</h4>
              <div className="favorite-movies">
                <FavoriteMovies
                  user={user}
                  movies={movies}
                  onRemove={handleRemoveMovie}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
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
