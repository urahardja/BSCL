import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '@heroicons/react/outline';

const SearchForm = (props) => {
  const { placeholder } = props;

  return (
    <form className="flex flex-row items-center space-x-1 text-gray-400 focus-within:text-gray-500">
      <label htmlFor="search-form">
        <SearchIcon height={24} />
      </label>
      <input
        id="search-form"
        type="search"
        placeholder={placeholder}
        className="placeholder-gray-500 focus:placeholder-gray-400 focus:outline-none rounded-md w-48 md:w-56 lg:w-64 p-2"
      />
    </form>
  );
};

SearchForm.propTypes = {
  placeholder: PropTypes.string
};

SearchForm.defaultProps = {
  placeholder: 'Search..'
};

export default SearchForm;
