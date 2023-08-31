import React from "react";
import "./UserPageOrderCard.css";

const UserPageOrderCard = ({ order }) => {

  const productTotal = (product) => {
    return product.product.quantity * product.product.price
  }

  const calculateOrderTotal = (orderedProducts) => {
    let total = 0;

    for (const product of orderedProducts) {
      const productTotal = product.product.price * product.product.quantity;
      total += productTotal;
    }

    return total;
  };

  return (
    <div className="UserPageOrderCardWrapper">
      <div className="UserPageOrderCardOrderNumberWrapper">
        <h5 className="UserPageOrderCardOrderNumber">
          Order no. {order.id} | {order.orderStatus}
        </h5>
        <h5 className="UserPageOrderCardOrderSum">Order total: EUR {calculateOrderTotal(order.orderedProducts).toFixed(2)}</h5>
      </div>
      <div className="UserPageOrderCardMainSectionWrapper">
        {order.orderedProducts.map((product) => (
          <div className="UserPageOrderCardPurchasedProductWrapper" key={product._id}>
            <div className="UserPageOrderCardPurchasedProductInfoWrapper">
              <div className="UserPageOrderCardPurchasedProductImageWrapper">
                <img
                  src={product.product.image}
                  alt="order"
                  className="UserPageOrderCardPurchasedProductImage"
                />
              </div>
              <div className="UserPageOrderCardPurchasedProductInfoTextWrapper">
                <p className="UserPageOrderCardPurchasedProductTitle">
                  {product.product.name}
                </p>
                <p className="UserPageOrderCardPurchasedProductQuantity">
                  Quantity: {product.product.quantity}
                </p>
              </div>
            </div>
            <p className="UserPageOrderCardPurchasedProductPrice">EUR {productTotal(product).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPageOrderCard;
