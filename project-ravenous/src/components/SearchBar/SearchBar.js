import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar(props) {
  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  const [sortBy, setSortBy] = useState('best_match');
  const handleSortByChange = (sortByOption) => {
    setSortBy(sortByOption);
  };

  const getSortByClass = (sortByOption) => {
    if (sortBy === sortByOption) {
      return 'active';
    }
    return '';
  };

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={getSortByClass(sortByOptionValue)}
          onClick={handleSortByChange.bind(sortBy, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  const [term, setTerm] = useState('');
  const handleTermChange = ({ target }) => {
    setTerm(target.value);
  };

  const [location, setLocation] = useState('');
  const handleLocationChange = ({ target }) => {
    setLocation(target.value);
  };

  const handleSearch = (event) => {
    props.searchYelp(term, location, sortBy);
    event.preventDefault();
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>{renderSortByOptions()}</ul>
      </div>
      <div className="SearchBar-fields">
        <input placeholder="Search Businesses" onChange={handleTermChange} />
        <input placeholder="Where?" onChange={handleLocationChange} />
      </div>
      <div className="SearchBar-submit">
        {/* eslint-disable-next-line */}
        <a onClick={handleSearch}>Let's Go</a>
      </div>
    </div>
  );
}
