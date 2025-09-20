import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchInput);
  };

  return (
    <Form className="d-flex mb-4" onSubmit={handleSubmit}>
      <Form.Control
        className="me-2"
        aria-label="Search"
        onChange={(event) => setSearchInput(event.target.value)}
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
};

export { SearchBar };
