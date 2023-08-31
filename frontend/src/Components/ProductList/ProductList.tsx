import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";
import axios from "axios";
import Button from "../ReusableComponents/Button/Button";
import { FurnitureData } from "../../data/data";
import { useState, useEffect, useMemo, useReducer, useRef } from "react";
import { useFilterContext } from "../../HelperFunctions/FilterContext";
import AddToCartModal from "../AddToCartModal/AddToCartModal";
import { useCart } from "../../HelperFunctions/CartContext";
import { useLocation } from "react-router-dom";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

const reducer = (state, action ) => {
    switch (action.type) {
        case "LOADING": return {...state, isLoading: true};
        case "SUCCESS": return {...state, data: action.payload, isLoading: false};
        case "ERROR": return {...state, error: action.payload, isLoading: false};
        default: return state;
    }
};

const ProductList = ({ searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [productList, dispatch] = useReducer(reducer, initialState);
  const { cartState, cartDispatch } = useCart();
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const modalTimeoutRef = useRef(null);
  // START Filter
  const { selectedFilter } = useFilterContext();
  // END Filter
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [productsFound, setProductsFound] = useState(true);
  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();

  useEffect(() => {
    if (cartState.addedToTheCart) {
      setShowAddToCartModal(true);

      // Clear any previous timeout
      if (modalTimeoutRef.current) {
        clearTimeout(modalTimeoutRef.current);
      }

      // Set a timeout to close the modal after 2 seconds
      modalTimeoutRef.current = setTimeout(() => {
        setShowAddToCartModal(false);
        cartDispatch({ type: "RESET_ADDED_TO_CART" });
      }, 2000);
    }

    // Cleanup function
    return () => {
      if (modalTimeoutRef.current) {
        clearTimeout(modalTimeoutRef.current);
      }
    };
  }, [cartState.addedToTheCart, cartDispatch]);

  const handleFetch = async () => {
    dispatch({ type: "LOADING" });
    setProductsFound(true);
    try {
      const data = await axios.get("http://localhost:3009/get-all");
      dispatch({ type: "SUCCESS", payload: data });
      setFetchedData(data.data);
    } catch (err) {
      dispatch({ type: "ERROR", payload: err });
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  //---FOR SEARCH BY SEARCH QUERY------
  const filterBySearchQuery = (data, query) => {
    const regex = new RegExp(`\\b${query}\\b`, "i");
    return data.filter((item) => {
      for (const key in item) {
        const value = item[key];
        if (typeof value === "string" && regex.test(value)) {
          return true;
        } else if (typeof value === "object" && value !== null) {
          if (Array.isArray(value)) {
            if (
              value.some(
                (element) => filterBySearchQuery([element], query).length > 0
              )
            ) {
              return true;
            }
          } else {
            if (filterBySearchQuery([value], query).length > 0) {
              return true;
            }
          }
        }
      }
      return false;
    });
  };

  //--------END OF SEARCH BY SEARCH QUERY----------

  //--------START OF FILTER------------------------
  const filterByCategory = (data, category) => {
    if (!category) {
      return data;
    }
    return data.filter((item) => item.category.toLowerCase() === category);
  };
  //--------END OF FILTER--------------------------
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      
      const filteredProductsByCategory = filterByCategory(
        fetchedData,
        selectedFilter
      );

      const filteredProducts = filterBySearchQuery(
        filteredProductsByCategory,
        searchQuery
      );

      if (filteredProducts.length === 0) {
        setProductsFound(false);
      } else {
        setProductsFound(true);
        setFilteredData(filteredProducts);
      }
      setLoading(false);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedFilter, fetchedData, searchQuery]);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  const productsToShow = filteredData.slice(0, visibleProducts);

  const closeModal = () => {
    setShowAddToCartModal(false);
  }

  return (
    <div className="ProductListWrapper">
      {productsFound ? (
        <div className="ProductListContent">
          {productsToShow.map((product) => (
            <ProductCard key={product.id} productList={product} />
          ))}
        </div>
      ) : (
        <div className="ProductsNotFoundWrapper">
          <p>Sorry, nothing was found</p>
        </div>
      )}
      {visibleProducts < filteredData.length && (
        <Button onClick={handleLoadMore} text="Load More"></Button>
      )}
      {showAddToCartModal && <AddToCartModal onClose={closeModal}/>}
      {loading && <div className="ProductsNotFoundWrapper"><p>Loading...</p></div>}
    </div>
  );
};

export default ProductList;