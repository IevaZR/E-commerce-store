import "./ShoppingCart.css";
import Button from "../ReusableComponents/Button/Button";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import { useCart } from "../../HelperFunctions/CartContext";
import { cartItemData } from "../../types/types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./../../Assets/empty-cart-img.png";

const ShoppingCart = () => {
  const { cartState, cartDispatch } = useCart();
  const [cartIsEmpty, setCartIsEmpty] = useState(
    cartState.cartItems.length === 0
  );
  const navigate = useNavigate();
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);

  // useEffect( ()=> {
  //   const calculatedTotalPrice = cartState.cartItems.reduce(
  //     (total: number, item: cartItemData) => total + (item.price * item.quantity), 0
  //   );
  //   console.log(calculatedTotalPrice);
  //   setTotalCartPrice(calculatedTotalPrice);
  //   setCartIsEmpty(cartState.cartItems.length === 0);
  //   if (cartIsEmpty) {
  //     setTotalCartPrice(0);
  //   }
  // }, [cartIsEmpty, cartState.cartItems])

  const handleDeleteItem = (itemIndex: number) => {
    const deletedItem = cartState.cartItems[itemIndex];
    const updatedDeletedItem = { ...deletedItem, quantity: 0 };

    const updatedCartItems = cartState.cartItems.map(
      (item: cartItemData, index: number) => {
        if (index === itemIndex) {
          return updatedDeletedItem;
        }
        return item;
      }
    );

    setCartIsEmpty(cartState.cartItems.length === 0);
    cartDispatch({ type: "DELETE_FROM_CART", payload: itemIndex });

    const calculatedTotalPrice = calculateTotalPrice(updatedCartItems);
    setTotalCartPrice(calculatedTotalPrice);

    // setCartItemQuantity(0);
    // handleQuantityChange(itemIndex, 0);
  };

  const handleQuantityChange = (itemIndex: number, newQuantity: number) => {
    const updatedCartItems = cartState.cartItems.map(
      (item: cartItemData, index: number) => {
        if (index === itemIndex) {
          console.log({ ...item, quantity: newQuantity });
          return { ...item, cartQuantity: newQuantity };
        }
        console.log(item);
        return item;
      }
    );
    console.log(newQuantity);
    setCartIsEmpty(updatedCartItems.length === 0);
    setCartItemQuantity(newQuantity);
    cartDispatch({ type: "UPDATE_CART", payload: updatedCartItems });
  };

  const calculateTotalPrice = (items: cartItemData[]) => {
    let total = 0;

    for (const item of items) {
      total += item.price * item.cartQuantity;
      console.log(item.price);
      console.log(item.cartQuantity);
      console.log(total);
    }
    return total;
  };

  const handleClearCart = () => {
    // Create an array of updated cart items with quantity set to 0 for all items
    const updatedCartItems = cartState.cartItems.map((item: cartItemData) => ({
      ...item,
      quantity: 0,
    }));
    console.log(cartState.cartItems);
    // Update cart and total price
    setCartIsEmpty(true);
    cartDispatch({ type: "UPDATE_CART", payload: updatedCartItems });

    const calculatedTotalPrice = calculateTotalPrice(updatedCartItems);
    setTotalCartPrice(calculatedTotalPrice);
  };

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice(cartState.cartItems);
    setTotalCartPrice(calculatedTotalPrice);
  }, [cartState.cartItems]);

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  console.log(totalCartPrice);

  return (
    <div className="ShoppingCartWrapper">
      <h2 className="ShoppingCartHeading">Your cart</h2>
      <div className="ShoppingCartBody">
        {cartIsEmpty ? (
          <div className="EmptyShoppingCartCard">
            <p className="EmptyShoppingCartTitle">
              Your shopping cart is empty
            </p>
            <div className="EmptyShoppingCartImg">
              <img src={EmptyCart} alt="empty-cart" />
            </div>
          </div>
        ) : (
          <>
            <table className="ShoppingCartContent">
              <tbody>
                {cartState.cartItems?.map(
                  (item: cartItemData, index: number) => (
                    <ShoppingCartItem
                      key={index}
                      cartItemData={item}
                      onDelete={() => handleDeleteItem(index)}
                      onQuantityChange={(newQuantity: number) =>
                        handleQuantityChange(index, newQuantity)
                      }
                    />
                  )
                )}
              </tbody>
            </table>
            <div className="ShoppingCartSummaryContainer">
              <div className="ShoppingCartSummaryContainerTitle">Total:</div>
              <div className="ShoppingCartSummaryContainerValue">
                &euro; {parseFloat(totalCartPrice.toFixed(2))}
              </div>
            </div>
          </>
        )}

        <div className="ShoppingCartButtonsContainer">
          <Button
            text="Continue Shopping"
            onClick={handleContinueShopping}
          ></Button>
          {!cartIsEmpty && (
            <Button text="Clear Cart" onClick={handleClearCart}></Button>
          )}
          {!cartIsEmpty && (
            <Button
              text="Checkout"
              backgroundColor="rgb(209 203 203 / 75%)"
              // onClick={}
            ></Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
