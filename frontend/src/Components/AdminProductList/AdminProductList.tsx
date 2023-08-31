import "./AdminProductList.css";
import { useState, useEffect, useReducer } from "react";
import AdminProductCard from "../AdminProductCard/AdminProductCard";
import axios from "axios";
import { useEditProduct } from "../../HelperFunctions/EditProductContext";
import { useAdminVisibleContentContex } from "../../HelperFunctions/AdminVisibleContentContext";
import { useAddProductVisibility } from "../../HelperFunctions/AddProductVisibilityContext";

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

const AdminProductList = () => {
  const [products, dispatch] = useReducer(reducer, initialState);
  const {productUpdated} = useEditProduct()
  const {adminVisibleContent} = useAdminVisibleContentContex()
  const {productAdded} = useAddProductVisibility()

  const handleFetch = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await axios.get("http://localhost:3009/get-all");
      dispatch({ type: "SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err });
    }
  };

  const handleProductDelete = async (deletedProductId) => {
    try {
      await axios.delete(`http://localhost:3009/delete/${deletedProductId}`);
      handleFetch();
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    handleFetch();
    console.log(productAdded)
  }, []);

  useEffect(()=> {
    handleFetch()
  }, [productUpdated, productAdded])

  return (
    adminVisibleContent==="inventory" &&
    <div className="AdminProductListWrapper">
      <div className="AdminProductCardHeaderWrapper">
        <div className="AdminProductCardHeader">
          <div className="AdminProductCardImageWrapper"></div>
          <div className="AdminProductCardTitle">TITLE</div>
          <div className="AdminProductCardCategory">CATEGORY</div>
          <div className="AdminProductCardPrice">PRICE</div>
          <div className="AdminProductCardQuantity">REMAINING</div>
          <div className="AdminProductCardQuantity"></div>
        </div>
      </div>

      {products?.data?.data?.map((product) => (
        <AdminProductCard
          key={product.id}
          product={product}
          onDelete={handleProductDelete}
        />
      ))}
    </div>
  );
};

export default AdminProductList;
