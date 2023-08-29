import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";
import axios from "axios";
import Button from "../ReusableComponents/Button/Button";
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

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SUCCESS":
      return { ...state, data: action.payload, isLoading: false };
    case "ERROR":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

const ProductList = ({ searchQuery }) => {
  const [productList, dispatch] = useReducer(reducer, initialState);
  const FurnitureData = productList?.data?.data || [];
  const { cartState, cartDispatch } = useCart();
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const modalTimeoutRef = useRef(null);
  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();

  //if loading is true, show loading

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

  useEffect(() => {
    const handleFetch = async () => {
      dispatch({ type: "LOADING" });
      try {
        const data = await axios.get("http://localhost:3009/get-all");
        console.log("🚀 ~ data:", data);
        dispatch({ type: "SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "ERROR", payload: err });
      }
    };
    handleFetch();
  }, [productList?.loading]);

  // START Filter
  const { selectedFilter } = useFilterContext();
  console.log("🚀 ~ selectedFilter:", selectedFilter);
  // END Filter
  const [products, setProducts] = useState(FurnitureData);
  //   console.log(productList?.data?.data); // <-- this is the data from MongoDB data base
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [productsFound, setProductsFound] = useState(true);

  //---FOR SEARCH BY SEARCH QUERY------
  useEffect(() => {
    setProducts(FurnitureData);
  }, [searchQuery]);

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

  const foundProducts = useMemo(
    () => filterBySearchQuery(FurnitureData, searchQuery),
    [FurnitureData, searchQuery]
  );

  useEffect(() => {
    if (foundProducts.length === 0) {
      setProductsFound(false);
    } else {
      setProductsFound(true);
      setProducts(foundProducts);
    }
  }, [foundProducts]);

  //--------END OF SEARCH BY SEARCH QUERY----------

  //--------START OF FILTER------------------------
  const filterByCategory = (data, category) => {
    if (!category) {
      const category2 = query.get("category");
      if (category2) {
        console.log("🚀 ~ item.category:", data);
        return data.filter((item) => item.category.toLowerCase() === category2);
      }
    }
    return data.filter((item) => item.category.toLowerCase() === category);
  };

  useEffect(() => {
    const filteredProductsByCategory = filterByCategory(
      FurnitureData,
      selectedFilter
    );
    console.log("🚀 ~ FurnitureData:", FurnitureData);
    const filteredProducts = filterBySearchQuery(
      filteredProductsByCategory,
      searchQuery
    );
    if (filteredProducts.length === 0) {
      setProductsFound(false);
    } else {
      setProductsFound(true);
      setProducts(filteredProducts);
    }
  }, [selectedFilter]);
  //--------END OF FILTER--------------------------

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  const productsToShow = products.slice(0, visibleProducts);

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
      {visibleProducts < products.length && (
        <Button onClick={handleLoadMore} text="Load More"></Button>
      )}
      {showAddToCartModal && <AddToCartModal></AddToCartModal>}
    </div>
  );
};

export default ProductList;
