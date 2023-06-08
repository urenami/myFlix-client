import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export const MovieView = ({ movies, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movies.imageUrl}  className="w-50 border" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movies.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movies.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movies.Director}</span>
      </div>
      <Button
        onClick={onBackClick}
        className="back-button"
        style={{ cursoe: "pointer" }}
      >back</Button>
    </div>
  );
};
