import React from "react";
// @ts-ignore
import LogoLetter from "../../Assets/logo-letter.svg";
import "./AdminPageSideBar.css";
import { useAddProductVisibility } from "../../HelperFunctions/AddProductVisibilityContext";
import { useOrderFilterContext } from "../../HelperFunctions/OrderFilterContext";
import { useAdminVisibleContentContex } from "../../HelperFunctions/AdminVisibleContentContext";
import { Navigate, useNavigate } from "react-router-dom";

const AdminPageSideBar = () => {
  const { toggleAddProductVisible } = useAddProductVisibility();
  const { setOrderFilterStatus } = useOrderFilterContext();
  const { setAdminVisibleContent } = useAdminVisibleContentContex();
  const navigate = useNavigate()

  const openAddProductForm = () => {
    toggleAddProductVisible(true);
  };

  const showOrders = () => {
    setAdminVisibleContent("orders");
    setOrderFilterStatus("All");
  };

  const showActiveOrders = () => {
    setAdminVisibleContent("orders");
    setOrderFilterStatus("Active");
  };

  const showCompletedOrders = () => {
    setAdminVisibleContent("orders");
    setOrderFilterStatus("Fulfilled");
  };

  const showInventory = () => {
    setAdminVisibleContent("inventory");
  };

  const logOut = () => {
    navigate("/admin-login")
  }

  return (
    <div className="AdminPageSideBarWrapper">
      <div className="AdminPageSideBarUpperPart">
        <div className="AdminPageSideBarLogoWrapper">
          <img src={LogoLetter} alt="logo" className="AdminPageSideBarLogo" />
        </div>
        <div className="AdminPageSideBarLinksWrapper">
          <button className="AdminPageSideBarLink" onClick={showInventory}>
            INVENTORY
          </button>
          <button
            className="AdminPageSideBarLinkSecondLevel"
            onClick={openAddProductForm}
          >
            ADD NEW PRODUCT
          </button>
          <button className="AdminPageSideBarLink" onClick={showOrders}>
            ORDERS
          </button>
          <button
            className="AdminPageSideBarLinkSecondLevel"
            onClick={showActiveOrders}
          >
            ACTIVE ORDERS
          </button>
          <button
            className="AdminPageSideBarLinkSecondLevel"
            onClick={showCompletedOrders}
          >
            COMPLETED ORDERS
          </button>
        </div>
      </div>
      <div className="AdminPageSideBarLowerPart">
      <button
            className="AdminPageSideBarLogOutButton"
            onClick={logOut}
          >
            LOG OUT
            </button>
      </div>
    </div>
  );
};

export default AdminPageSideBar;