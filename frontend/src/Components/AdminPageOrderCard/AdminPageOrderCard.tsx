import React from "react";
import "./AdminPageOrderCard.css";
import axios from "axios";
//@ts-ignore
import Dots from "../../Assets/dots.png";
import { useState } from "react";

const AdminPageOrderCard = ({ order, updateOrderList }) => {
  const [actionsMenu, setActionsMenu] = useState(false);

  const calculateOrderTotal = (orderedProducts) => {
    let total = 0;

    for (const product of orderedProducts) {
      const productTotal = product.product.price * product.product.quantity;
      total += productTotal;
    }

    return total;
  };

  const completeOrder = async () => {
    try {
      await axios.put(`http://localhost:3009/order/update-order/${order.id}`, {
        orderStatus: "Fulfilled",
      });
      updateOrderList();
    } catch (err) {
      console.log(err);
    }
  };

  const cancelOrder = async () => {
    try {
      await axios.put(`http://localhost:3009/order/update-order/${order.id}`, {
        orderStatus: "Canceled",
      });
      updateOrderList();
    } catch (err) {
      console.log(err);
    }
  };

  const reactivateOrder = async () => {
    try {
      await axios.put(`http://localhost:3009/order/update-order/${order.id}`, {
        orderStatus: "Active",
      });
      updateOrderList();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleClass = () => {
    let className = "";
    if (order.orderStatus === "Active") {
      className = "AdminPageOrderCardOrderNumber";
    } else if (order.orderStatus === "Fulfilled") {
      className = "AdminPageOrderCardOrderNumberFulfilled";
    } else {
      className = "AdminPageOrderCardOrderNumberCanceled";
    }
    return className
  };

  return (
    <div className="AdminPageOrderCardWrapper">
      <div className="AdminPageOrderCardOrderNumberWrapper">
        <h5 className={toggleClass()}>
          Order no. {order.id} | {order.orderStatus}
        </h5>
        <div className="AdminPageOrderCardActionWrapper">
          {order.orderStatus === "Active" ? (<button
            className="AdminPageOrderCardCompleteButton"
            onClick={completeOrder}
          >
            MARK AS COMPLETE
          </button>) : <div></div>}
          <button
            className="AdminPageOrderCardMoreButton"
            onClick={() => setActionsMenu(!actionsMenu)}
          >
            <img
              src={Dots}
              alt=""
              className="AdminPageOrderCardMoreButtonImage"
            />
          </button>
        </div>
      </div>
      {actionsMenu && (
        <div className="AdminPageOrderCardActionsMenu">
          <button
            className="AdminPageOrderCardActionsMenuCancelButton"
            onClick={cancelOrder}
          >
            CANCEL ORDER
          </button>
          <button
            className="AdminPageOrderCardActionsMenuReactivateButton"
            onClick={reactivateOrder}
          >
            REACTIVATE ORDER
          </button>
        </div>
      )}

      <div className="AdminPageOrderCardMainSectionWrapper">
        <div className="AdminPageOrderCardCustomerDetailWrapper">
          <h6 className="AdminPageOrderCardCustomerName">
            {order.customer.name}
          </h6>
          <p className="AdminPageOrderCardCustomerEmail">
            {order.customer.email}
          </p>
          <p className="AdminPageOrderCardCustomerAddress">
            {order.customer.address}
          </p>
          <p className="AdminPageOrderCardCustomerSum">
            Order total: EUR
            {calculateOrderTotal(order.orderedProducts).toFixed(2)}
          </p>
        </div>
        <div className="AdminPageOrderCardPurchasedProductsSectionWrapper">
          {order.orderedProducts.map((product) => (
            <div
              className="AdminPageOrderCardPurchasedProductWrapper"
              key={product._id}
            >
              <div className="AdminPageOrderCardPurchasedProductsImageWrapper">
                <img
                  src={product.product.image}
                  alt=""
                  className="AdminPageOrderCardPurchasedProductsImage"
                />
              </div>
              <div className="AdminPageOrderCardPurchasedProductsInfoWrapper">
                <p>{product.product.name}</p>
                <p>Quantity: {product.product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPageOrderCard;
