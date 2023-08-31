
import "./UserPageMainSection.css";
import UserPageOrderList from "../UserPageOrderList/UserPageOrderList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useActiveSearchContext } from "../../HelperFunctions/ActiveSearchContext";
import UserPageFavouritesList from "../UserPageFavouritesList/UserPageFavouritesList";
import { useState } from "react";
import UserPageAccountInfo from "../UserPageAccountInfo/UserPageAccountInfo";

const UserPageMainSection = () => {

  const navigate = useNavigate();
  const {updateUser} = useActiveSearchContext()
  const [showFavouriteItems, setShowFavouriteItems] = useState(false)
  const [showOrderedItems, setShowOrderedItems] = useState(true)
  const [showAccountInfo, setShowAccountInfo] = useState(false)

  const logOutUser = async () => {
    try {
      await axios.post("http://localhost:3009/user/logout");
      localStorage.removeItem("username");
      updateUser(null)
      navigate("/user-login");
    } catch (error) {
      console.log(error);
    }
  };

  const showFavourites = () => {
    setShowFavouriteItems(true)
    setShowOrderedItems(false)
    setShowAccountInfo(false)
  }
  const showOrders = () => {
    setShowOrderedItems(true)
    setShowFavouriteItems(false)
    setShowAccountInfo(false)
  }
  const showAccount = () => {
    setShowAccountInfo(true)
    setShowOrderedItems(false)
    setShowFavouriteItems(false)
  }

  return (
    <div className="UserPageMainSectionWrapper">
      <div className="UserPageSideBar">
        <h3 className="UserPageSideBarHeading">MY ACCOUNT</h3>
        <button className="UserPageSideBarLink" onClick={showOrders}>My Orders</button>
        <button className="UserPageSideBarLink" onClick={showFavourites}>Favourites</button>
        <button className="UserPageSideBarLink" onClick={showAccount}>Account information</button>
        <button className="UserPageSideBarLink LogOut" onClick={logOutUser}>
          LOG OUT
        </button>
      </div>
      <div className="UserPageInfoSection">
        {showOrderedItems && <UserPageOrderList />}
        {showFavouriteItems && <UserPageFavouritesList fetchFavourites={showFavourites}/>}
        {showAccountInfo && <UserPageAccountInfo/>}
      </div>
    </div>
  );
};

export default UserPageMainSection;
