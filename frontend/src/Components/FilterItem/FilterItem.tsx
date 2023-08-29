import "../FilterItem/FilterItem.css";
import { useNavigate } from "react-router-dom";

const FilterItem = ({ filterName, filterBackgroundImage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop?category=${filterName.toLowerCase()}`);
  };

  return (
    <div
      className={`FilterItemWrapper ${
        filterName.toLowerCase() ? "selected" : ""
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
