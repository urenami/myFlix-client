import PropTypes from "prop-types";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";
import { Link } from 'react-router-dom';
import "./profile-view.scss";

function ProfileView({ user, movies, token, removeMovie }) {

  const handleRemoveMovie = (movieId) => {
    
    removeMovie(movieId);
  };
 
return (
<Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h4>User Information</h4>
                <p>Username: {user.Username}</p>
                <p>Birthday: {user.Birthday.slice(0, 10)}</p>
                <p>e-mail: {user.Email}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <UpdateUser user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <FavoriteMovies user={user} movies={movies} />
      </Row>
      <Row>
        <div>
          <Button
            className="back-button"
            as={Link}
            to={"/"}
          >
            Back
          </Button>
        </div>
      </Row>
    </Container>
  )
};

ProfileView.propTypes= {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape ({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
      }).isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeMovie: PropTypes.func.isRequired, 
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array,
  }).isRequired,
};

export { ProfileView };
