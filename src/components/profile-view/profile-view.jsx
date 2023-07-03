import { UserInfo } from "./user-info";
import { Col, Container } from "react-bootstrap";
import { UserEdit } from "./user-edit";
import { MovieCard } from "../MovieCard/movie-card";
import { Link } from "react-router-dom";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ updateUser }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const deleteAccount = () => {
    fetch(`https://my-flixdb-56034.herokuapp.com//users/${user._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Your account has been deleted.");
          onLoggedOut();
        } else {
          alert("Could not delete account");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Col>
        <UserInfo />
        <UserEdit updateUser={updateUser}  />
        <Link
          className="mt-5"
          variant="danger"
          type="submit"
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to remove your account from our site?"
              )
            ) {
              deleteAccount();
            }
          }}
        >
          Delete your Account
        </Link>
      </Col>
      <Container className='bg-light mb-4 px-4 rounded-4'>
        <FavoriteMovies />
      </Container>
    </>
  );
};