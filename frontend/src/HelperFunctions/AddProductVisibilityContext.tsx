import { createContext, useContext, useState } from "react";

const AddProductVisibilityContext = createContext({
    isAddProductVisible: false,
    toggleAddProductVisible: (value: boolean) => {},
    productAdded:false,
    toggleProductAdded: (value: boolean) => {}
});

export function useAddProductVisibility() {
  return useContext(AddProductVisibilityContext);
}

export function AddProductVisibilityProvider({ children }) {
  const [isAddProductVisible, setAddProductVisible] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

  const toggleAddProductVisible = () => {
    setAddProductVisible(!isAddProductVisible);
  };

  const toggleProductAdded = (value) => {
    setProductAdded(value)
    console.log(value)
  }

  return (
    <AddProductVisibilityContext.Provider
      value={{ isAddProductVisible, toggleAddProductVisible, productAdded, toggleProductAdded }}
    >
      {children}
    </AddProductVisibilityContext.Provider>
  );
}