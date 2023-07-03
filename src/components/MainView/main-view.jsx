import { useEffect } from "react";
import { MoviesList } from '../movies-list/movies-list';
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';

export const MainView = () => {
  const dispatch = useDispatch();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => stateuser.token);
  const movies = useSelector((state) => state.movies.list);

  const updateUser = (user) => {
    dispatch(setUser(user));
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (!token) return;

    fetch("https://my-flixdb-56034.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movies) => {
          return {
            _id: movies._id,
            Title: movies.Title,
            Director: movies.Director.Name,
            Description: movies.Description,
            imageUrl: movies.imageUrl,
          };
        });
        dispatch(setMovies(moviesFromApi));
      });
  }, [token]);

  return (
    <BrowserRouter>
      <Row sm={12}>
        <Col className="mb-4">
          <NavigationBar />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={5}
                    xxl={5}
                    className="m-2"
                  >
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col
                    xs={12}
                    sm={12}
                    md={10}
                    lg={6}
                    xl={5}
                    xxl={5}
                    className="m-3"
                  >
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8}>
                  <MovieView updateUser={updateUser} />
                </Col>
              )
            }
          />
          <Route path="/" element={<MoviesList />} />
          <Route
            path="/profile"
            element={
              <>
                <Col>
                  <ProfileView updateUser={updateUser} />
                </Col>
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};