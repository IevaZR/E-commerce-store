import React, { useState } from 'react'
import "./FilterItem2.css"
import { useFilterContext } from '../../HelperFunctions/FilterContext';

const FilterItem2 = ({ filterName, filterCategory }) => {
  const { selectedFilter, setSelectedFilter } = useFilterContext();

  const isSelected = selectedFilter === filterCategory.toLowerCase();

  const handleClick = () => {
    setSelectedFilter((prevSelectedFilter) =>
      prevSelectedFilter === filterCategory.toLowerCase() ? '' : filterCategory.toLowerCase()
    );
  };

  return (
    <div
      className={`Filter2ItemWrapper ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <h2 className={`Filter2ItemName ${isSelected ? 'clicked' : ''}`}
      >{filterName}</h2>
    </div>
  );
};

export default FilterItem2;


