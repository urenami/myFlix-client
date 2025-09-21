import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./search-bar.scss";

function SearchBar({ onSearch, fullWidth = false }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchInput.trim() === "") {
      // Reset: show all movies
      onSearch("");
    } else {
      onSearch(searchInput);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      // Auto reset instantly when cleared
      onSearch("");
    }
  };

  return (
    <Form
      className={`d-flex mb-4 search-bar ${fullWidth ? "full-width" : ""}`}
      onSubmit={handleSubmit}
    >
      <Form.Control
        className="me-2"
        aria-label="Search"
        onChange={handleChange}
        placeholder="Discover your next favorite movie! Search by title, director, or genre"
        type="search"
        value={searchInput}
      />
      <Button type="submit" variant="secondary">
        Search
      </Button>
    </Form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool, 
};

export { SearchBar };
