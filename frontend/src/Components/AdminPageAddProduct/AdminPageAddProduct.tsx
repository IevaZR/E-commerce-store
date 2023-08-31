import React from "react";
import "./AdminPageAddProduct.css";
import Button from "../ReusableComponents/Button/Button";
import { useAddProductVisibility } from "../../HelperFunctions/AddProductVisibilityContext";
import axios from "axios";
import { useState, useEffect } from "react";
import AdminPageProductAddedMessage from "../AdminPageProductAddedMessage/AdminPageProductAddedMessage";
import { useEditProduct } from "../../HelperFunctions/EditProductContext";

const AdminPageAddProduct = () => {
  const { isAddProductVisible, toggleAddProductVisible, productAdded, toggleProductAdded } =
    useAddProductVisibility();
  const { editingProduct, setEditingProduct } = useEditProduct();
  const [emptyFields, setEmptyFields] = useState(false);

  const closeAddProductForm = () => {
    toggleAddProductVisible(false);
    setEmptyFields(false);
    setInputFields(inputFieldInitialState);
  };

  const resetProductAddedValue = () => {
    toggleProductAdded(false);
    setEmptyFields(false);
    setInputFields(inputFieldInitialState);
  };

  let inputFieldInitialState = {
    id: Math.floor(Math.random() * 100000),
    title: "",
    category: "",
    price: "",
    discount: "",
    description: "",
    color: "",
    quantity: "",
    dimensionsCm: {
      width: "",
      height: "",
      depth: "",
    },
    features: [
      {
        featureTitle: "",
        featureParagraph: "",
      },
      {
        featureTitle: "",
        featureParagraph: "",
      },
      {
        featureTitle: "",
        featureParagraph: "",
      },
    ],
    keywords: [],
    image: "",
  };

  const [inputFields, setInputFields] = useState(inputFieldInitialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "width" || name === "height" || name === "depth") {
      setInputFields((previousFields) => ({
        ...previousFields,
        dimensionsCm: {
          ...previousFields.dimensionsCm,
          [name]: value,
        },
      }));
    } else if (
      name === "featureTitle1" ||
      name === "featureDescription1" ||
      name === "featureTitle2" ||
      name === "featureDescription2" ||
      name === "featureTitle3" ||
      name === "featureDescription3"
    ) {
      const featureIndex = parseInt(name.charAt(name.length - 1)) - 1;
      const featureProperty = name.includes("Title")
        ? "featureTitle"
        : "featureParagraph";

      setInputFields((previousFields) => {
        const updatedFeatures = [...previousFields.features];
        updatedFeatures[featureIndex] = {
          ...updatedFeatures[featureIndex],
          [featureProperty]: value,
        };

        return {
          ...previousFields,
          features: updatedFeatures,
        };
      });
    } else {
      setInputFields((previousFields) => ({
        ...previousFields,
        [name]: value,
      }));
    }
  };

  const addProductToDatabase = async () => {
    try {
      await axios.post(
        "http://localhost:3009/create",
        inputFields
      );
      toggleProductAdded(true);
      setEmptyFields(false);
    } catch (err) {
      console.log(err);
      setEmptyFields(true);
    }
  };

  return (
    <>
      {isAddProductVisible && (
        <div className="AdminPageAddProductWrapper">
          <div className="AdminPageAddProductFormWrapper">
            <div className="AdminPageAddProductHeadingWrapper">
              <h3 className="AdminPageAddProductHeading">
                Please fill out the form below to add a new product
              </h3>
            </div>

            <form className="AdminPageAddProductsForm">
              <label className="AdminPageAddProductsLabel">TITLE</label>
              <input
                className="AdminPageAddProductsInput"
                placeholder="TITLE"
                name="title"
                value={inputFields.title}
                onChange={handleInputChange}
              />
              <label className="AdminPageAddProductsLabel">CATEGORY</label>
              <select
                name="category"
                value={inputFields.category}
                id=""
                className="AdminPageAddProductsInput AdminPageAddProductsSelect"
                onChange={handleInputChange}
              >
                <option value="---">---</option>
                <option value="sofas">Sofas</option>
                <option value="chairs">Chairs</option>
                <option value="tables">Tables</option>
                <option value="beds">Beds</option>
              </select>
              <label className="AdminPageAddProductsLabel">PRICE</label>
              <input
                className="AdminPageAddProductsInput"
                placeholder="PRICE"
                name="price"
                value={inputFields.price}
                onChange={handleInputChange}
              />
              <label className="AdminPageAddProductsLabel">DISCOUNT</label>
              <p className="AdminPageAddProductsNotRequiredText">
                NOT REQUIRED
              </p>
              <input
                className="AdminPageAddProductsInput"
                placeholder="DISCOUNT"
                name="discount"
                value={inputFields.discount}
                onChange={handleInputChange}
              />
              <label className="AdminPageAddProductsLabel">DESCRIPTION</label>
              <input
                className="AdminPageAddProductsInput"
                placeholder="DESCRIPTION"
                name="description"
                value={inputFields.description}
                onChange={handleInputChange}
              />
              <label className="AdminPageAddProductsLabel">COLOR</label>
              <input
                className="AdminPageAddProductsInput"
                placeholder="COLOR"
                name="color"
                value={inputFields.color}
                onChange={handleInputChange}
              />
              <label className="AdminPageAddProductsLabel">QUANTITY</label>
              <input
                className="AdminPageAddProductsInput"
                placeholder="QUANTITY"
                name="quantity"
                value={inputFields.quantity}
                onChange={handleInputChange}
              />
              <label className="AdminPageAddProductsLabel">DIMENSIONS CM</label>
              <div className="AdminPageAddProductsDimensionsWrapper">
                <label className="AdminPageAddProductsLabel">WIDTH</label>
                <input
                  className="AdminPageAddProductsInput AdminPageAddProductsInputDimensions"
                  name="width"
                  value={inputFields.dimensionsCm.width}
                  onChange={handleInputChange}
                />
                <label className="AdminPageAddProductsLabel">HEIGHT</label>
                <input
                  className="AdminPageAddProductsInput AdminPageAddProductsInputDimensions"
                  name="height"
                  value={inputFields.dimensionsCm.height}
                  onChange={handleInputChange}
                />
                <label className="AdminPageAddProductsLabel">DEPTH</label>
                <input
                  className="AdminPageAddProductsInput AdminPageAddProductsInputDimensions"
                  name="depth"
                  value={inputFields.dimensionsCm.depth}
                  onChange={handleInputChange}
                />
              </div>
              <label className="AdminPageAddProductsLabel">FEATURES</label>
              <div className="AdminPageAddProductsFeaturesWrapper">
                <label className="AdminPageAddProductsLabel">
                  FEATURE TITLE 1
                </label>
                <input
                  className="AdminPageAddProductsInput"
                  placeholder="FEATURE TITLE"
                  name="featureTitle1"
                  value={inputFields.features[0].featureTitle}
                  onChange={handleInputChange}
                />
                <label className="AdminPageAddProductsLabel">
                  DESCRIPTION 1
                </label>
                <input
                  className="AdminPageAddProductsInput"
                  placeholder="FEATURES"
                  name="featureDescription1"
                  value={inputFields.features[0].featureParagraph}
                  onChange={handleInputChange}
                />
                <label className="AdminPageAddProductsLabel">
                  FEATURE TITLE 2
                </label>
                <input
                  className="AdminPageAddProductsInput"
                  placeholder="FEATURE TITLE"
                  name="featureTitle2"
                  value={inputFields.features[1].featureTitle}
                  onChange={handleInputChange}
                />
                <label className="AdminPageAddProductsLabel">
                  DESCRIPTION 2
                </label>
                <input
                  className="AdminPageAddProductsInput"
                  placeholder="FEATURES"
                  name="featureDescription2"
                  value={inputFields.features[1].featureParagraph}
                  onChange={handleInputChange}
                />
                <label className="AdminPageAddProductsLabel">
                  FEATURE TITLE 3
                </label>
                <input
                  className="AdminPageAddProductsInput"
                  placeholder="FEATURE TITLE"
                  name="featureTitle3"
                  value={inputFields.features[2].featureTitle}
                  onChange={handleInputChange}
                />
                <label className="AdminPageAddProductsLabel">
                  DESCRIPTION 3
                </label>
                <input
                  className="AdminPageAddProductsInput"
                  placeholder="FEATURES"
                  name="featureDescription3"
                  value={inputFields.features[2].featureParagraph}
                  onChange={handleInputChange}
                />
              </div>
              <label className="AdminPageAddProductsLabel">KEYWORDS</label>
              <input
                className="AdminPageAddProductsInput"
                placeholder="KEYWORDS"
                name="keywords"
                value={inputFields.keywords}
                onChange={handleInputChange}
              />
              <label className="AdminPageAddProductsLabel">IMAGE URL</label>
              <input
                className="AdminPageAddProductsInput"
                placeholder="IMAGE"
                name="image"
                value={inputFields.image}
                onChange={handleInputChange}
              />
              {emptyFields && (
                <p className="AdminPageAddProductsEmptyFieldsMessage">
                  PLEASE FILL ALL REQUIRED FIELDS
                </p>
              )}

              <div className="AdminPageAddProductsButtonWrapper">
                <div className="AdminPageAddProductButtonWrapper">
                  <Button
                    text="ADD PRODUCT TO DATABASE"
                    onClick={addProductToDatabase}
                  />
                </div>
                <div className="AdminPageAddProductButtonWrapper">
                  <Button text="CLOSE FORM" onClick={closeAddProductForm} />
                </div>
              </div>
            </form>
          </div>
          {productAdded && (
            <AdminPageProductAddedMessage
              message={`${inputFields.title} successfully added!`}
              closeMessage={resetProductAddedValue}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdminPageAddProduct;

//TODO: style select field
//TODO: clean up code
