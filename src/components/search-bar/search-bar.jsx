import { useState } from 'react';
import { PropTypes } from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    onSearch(searchInput);
  };

  return (
    <Form className="d-flex mb-4" onSubmit={handleSubmit}>
      <Form.Control
        className="ellipsis me-2"
        aria-label="Search"
        onChange={(event) => {
          setSearchInput(event.target.value);
          if (!event.target.value) {
            onSearch('');
          }
        }}
        placeholder="Discover your next favourite movie! Search by title, director, or genre"
        type="search"
        value={searchInput}
      />
      <Button
        className="btn-secondary"
        onClick={() => onSearch(searchInput)}
        variant="secondary"
      >
        Search
      </Button>
    </Form>
  );
}

export { SearchBar };

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
