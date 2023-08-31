import React, { useEffect } from "react";
import "./UserPageOrderList.css";
import UserPageOrderCard from "../UserPageOrderCard/UserPageOrderCard";
import { useState } from "react";
import axios from "axios";
import { useActiveSearchContext } from "../../HelperFunctions/ActiveSearchContext";

const UserPageOrderList = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useActiveSearchContext();

  useEffect(() => {
    getUserOrders();
    console.log(user);
  }, []);

  const getUserOrders = async () => {
    try {
      console.log(user);
      const response = await axios.get(
        `http://localhost:3009/order/get-user-orders/${user.id}`
      );
      setOrders(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="UserPageOrderListWrapper">
      <h2 className="UserPageOrderListHeading">My Orders</h2>

      {orders.length > 0 ? (
        orders?.map((order) => (
          <UserPageOrderCard key={order.id} order={order} />
        ))
      ) : (
        <div className="UserPageOrderListNoOrders">
          <p>You have no orders yet</p>
        </div>
      )}
    </div>
  );
};

export default UserPageOrderList;
