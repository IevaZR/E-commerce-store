import "./UserPageFavouritesList.css";
import ProductCard from "../ProductCard/ProductCard";
import { useActiveSearchContext } from "../../HelperFunctions/ActiveSearchContext";
import { useState, useEffect } from "react";
import axios from "axios";

const UserPageFavouritesList = ({ fetchFavourites }) => {
  const { user } = useActiveSearchContext();
  const [favouritedProducts, setFavouritedProducts] = useState([]);

  useEffect(() => {
    if (fetchFavourites) {
      getUserFavourites();
    }
  }, [fetchFavourites]);

  const getUserFavouritesIds = () => {
    const favouritesArray = [];
    user.favourites.map((favourite) => favouritesArray.push(favourite.id));
    return favouritesArray;
  };

  const getUserFavourites = async () => {
    try {
      const array = JSON.stringify(getUserFavouritesIds());
      const response = await axios.get(
        `http://localhost:3009/get-multiple-products/${array}`
      );
      setFavouritedProducts(response.data);
      console.log(array);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="UserPageFavouritesListWrapper">
      <h2 className="UserPageFavouritesListHeading">Favourited Products</h2>
      {favouritedProducts.length > 0 ? (
        <div className="UserPageFavouritesList">
          {favouritedProducts?.map((product) => (
            <ProductCard key={product.id} productList={product} />
          ))}
        </div>
      ) : (
        <div className="UserPageFavouritesListNoFavourites">
          <p>You have no favourites yet</p>
        </div>
      )}
    </div>
  );
};

export default UserPageFavouritesList;
