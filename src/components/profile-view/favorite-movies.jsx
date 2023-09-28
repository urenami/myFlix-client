import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import { MovieCard } from "../MovieCard/movie-card";


function FavoriteMovies ({movies, removeMovie, user}) {
let favoriteMovies = movies.filter (function(movie) {
return user.FavoriteMovies.includes(movie._id);
});
let printFavoriteMovies;


if (favoriteMovies.length === 0) {
printFavoriteMovies = (
<Col className="mt-4">You have not added any movies yet</Col>
);
} else {
printFavoriteMovies = favoriteMovies.map(function(movie) {
return (
<Col key={movie._id} xs={6} sm={4} md={3} lg={3}>
<MovieCard
isfavMovieCard = {true}
movie={movie}
removeMovie={removeMovie}
className="movie-image"
/>
</Col>
);
});
}
return <>
<h4>Favorite movies</h4>
{printFavoriteMovies}
</>
}


FavoriteMovies.propTypes = {
movies: PropTypes.arrayOf(
PropTypes.shape({
_id: PropTypes.string.isRequired,
Title: PropTypes.string.isRequired,
Description: PropTypes.string.isRequired,
Genre: PropTypes.shape({
Name: PropTypes.string.isRequired,
}).isRequired,
Director: PropTypes.shape({
Name: PropTypes.string.isRequired,
Bio: PropTypes.string.isRequired,
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


export { FavoriteMovies };
