import { useEffect, useState } from "react";
import "./Header.css";
import Logo2 from "./../../Assets/logo.svg";
import MobileMenuIcon from "./../../Assets/hamburger-menu.png";
import ShopIcon from "./../../Assets/shop-icon.png";
import UserIcon from './../../Assets/user-icon.png'
import Search from "../Search/Search";
import { useActiveSearchContext } from "../../HelperFunctions/ActiveSearchContext";
import { useCart } from "../../HelperFunctions/CartContext";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { cartItemData } from "../../types/types";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const {cartState} = useCart();
  const [totalCartItems, setTotalCartItems] = useState(cartState.cartItems.length);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  const { updateActiveSearch, updateShowAllProducts, user } =
    useActiveSearchContext();

  const showMobileNavbar = () => {
    setActiveMenu(!activeMenu);
  };

  const showMainPage = () => {
    updateActiveSearch(false);
    updateShowAllProducts(false);
  };

  const showAllProducts = () => {
    updateShowAllProducts(true);
    updateActiveSearch(false);
  };

  const updateTotalItemQuantity = (items: cartItemData[]) => {
    return items.reduce((total: number, item: cartItemData) => total + item.cartQuantity, 0);
  };

  const updatedCartItemQuantity = updateTotalItemQuantity(cartState.cartItems);
  console.log(updatedCartItemQuantity);

  useEffect(() => {
    setTotalCartItems(updateTotalItemQuantity(cartState.cartItems));
  }, [cartState.cartItems]);

  console.log(cartState.cartItems);
  console.log(cartState.cartItems.length);
  const totalItems = cartState.cartItems.length;
  const cartIsEmpty = totalItems === 0;

  return (
    <div className="HeaderWrapper">
      <div className="HeaderLogoWrapper">
        <Link to="/" onClick={showMainPage}>
          <img src={Logo2} alt="Accent logo" className="HeaderLogo" />
        </Link>
      </div>
      <ul className={`HeaderNavbar ${mobileMenuActive ? 'active' : ''}`}>
        <li className="HeaderNavbarListItem" onClick={showMainPage}>
          <Link to="/" className="HeaderNavbarAnchor">
            Home
          </Link>
        </li>
        <li className="HeaderNavbarListItem" onClick={showAllProducts}>
          <Link to="/shop" className="HeaderNavbarAnchor">
            Shop
          </Link>
        </li>
        <li className="HeaderNavbarListItem">
          <Link to="/about-us" className="HeaderNavbarAnchor">
            About
          </Link>
        </li>
        <li className="HeaderNavbarListItem">
          <HashLink smooth to="#footer" className="HeaderNavbarAnchor">
            Contact
          </HashLink>
        </li>
      </ul>
      <div className="HeaderNavbarMobileWrapper">
      <button className="HeaderNavbarMobileButton" onClick={toggleMobileMenu}>
          <img
            src={MobileMenuIcon}
            alt="menu"
            className="HeaderNavbarMobileButtonImage"
          />
        </button>
        
      </div>
      <button className="HeaderSecretButton">
        <Link to="/admin-login" className="HeaderNavbarAnchor">
          ADMIN LOGIN
        </Link>
      </button>
      <div className="HeaderUtilityContainer">
        <div className="HeaderSearchWrapper">
          <Search />
        </div>
        <Link to="/cart" className="HeaderNavbarAnchor cart">
            <img src={ShopIcon} alt="icon-shop" />
            {!cartIsEmpty && (
              <div className="CartProductsCount">
                {totalCartItems}
              </div>
            )}
        </Link>      
          <Link to={user?"/user-page":"/user-login"} className="HeaderNavbarLoginAnchor">
            <img
              src={UserIcon}
              alt="user-icon"
              className="HeaderNavbarUserIcon"
            />
            {user && <p className="HeaderNavbarLoginName">{user.firstName}</p>}
          </Link>
        
      </div>
    </div>
  );
};

//TODO Pamainīt header izkārtojumu

export default Header;
