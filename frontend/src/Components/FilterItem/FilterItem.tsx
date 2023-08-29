<<<<<<< Updated upstream
import "../FilterItem/FilterItem.css";
import { useNavigate } from "react-router-dom";
=======
import React from "react";
import "../FilterItem/FilterItem.css";
import { useFilterContext } from "../../HelperFunctions/FilterContext";
>>>>>>> Stashed changes

const FilterItem = ({ filterName, filterBackgroundImage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
<<<<<<< Updated upstream
    navigate(`/shop?category=${filterName.toLowerCase()}`);
=======
    setSelectedFilter((prevSelectedFilter) =>
      prevSelectedFilter === filterName.toLowerCase()
        ? ""
        : filterName.toLowerCase()
    );
>>>>>>> Stashed changes
  };

  return (
    <div
      className={`FilterItemWrapper ${
<<<<<<< Updated upstream
        filterName.toLowerCase() ? "selected" : ""
=======
        selectedFilter === filterName.toLowerCase() ? "selected" : ""
>>>>>>> Stashed changes
      }`}
      onClick={handleClick}
    >
      <img
        className="FilterItemImage"
        src={filterBackgroundImage}
        alt={filterName}
      />
      <h2 className="FilterItemName">{filterName}</h2>
    </div>
  );
};

export default FilterItem;
