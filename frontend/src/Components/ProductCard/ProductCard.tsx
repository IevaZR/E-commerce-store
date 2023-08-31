import "./ProductCard.css";
import Button from "../ReusableComponents/Button/Button";
import ProductPreviewModal from "../ProductPreviewModal/ProductPreviewModal";
import { useEffect, useState } from "react";
import { ProductCardProps } from "../../types/types";
import HeartIcon from "./../../Assets/heart-icon.png";
import RedHeartIcon from "./../../Assets/red-heart-icon.png";
import { useActiveSearchContext } from "../../HelperFunctions/ActiveSearchContext";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductCard = ({ productList }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, updateUser } = useActiveSearchContext();
  const [favourite, setFavourite] = useState(false);
  const [showPleaseLogIn, setShowPleaseLogIn] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user && user.favourites.some((item) => item.id === productList.id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.favourites.some((item) => item.id === productList.id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }, [user, productList.id]);

  const toggleFavourites = async () => {
    if (user) {
      if (favourite === false) {
        const updatedFavourites = [...user.favourites, { id: productList.id }];
        const updatedUser = { ...user, favourites: updatedFavourites };
        updateUser(updatedUser);
        try {
          await axios.put(
            `http://localhost:3009/user/update-user/${user.id}`,
            updatedUser
          );
          setFavourite(true);
        } catch (err) {
          console.log(err);
        }
      } else if (favourite === true) {
        const updatedFavourites = user.favourites.filter(
          (item) => item.id !== productList.id
        );
        const updatedUser = { ...user, favourites: updatedFavourites };

        updateUser(updatedUser);

        try {
          await axios.put(
            `http://localhost:3009/user/update-user/${user.id}`,
            updatedUser
          );
          setFavourite(false);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      setShowPleaseLogIn(true);
    }
  };

  return (
    <>
      <div className="ProductCardWrapper">
        <div className="ProductImageContainer">
          <img src={productList.image} alt="product img" />
        </div>
        <div className="ProductDataContainer">
          <div className="ProductName">{productList.title}</div>
          <div className="ProductPrice">&euro; {productList.price}</div>
        </div>
        <Button text="Quickview" onClick={openModal}></Button>
        <button
          className="ProductCardAddToFavouritesButton"
          onClick={toggleFavourites}
        >
          <img
            src={!favourite ? HeartIcon : RedHeartIcon}
            alt="favourite"
            className="ProductCardAddToFavouritesButtonImage"
          />
        </button>
      </div>
      {isModalOpen && (
        <ProductPreviewModal onClose={closeModal} productList={productList} />
      )}
      {showPleaseLogIn && (
        <div className="ProductCardPleaseLogIn">
          <p className="ProductCardPleaseLogInText">
            Please{" "}
            <Link className="ProductCardPleaseLogInLink" to="/user-login">
              {" "}
              log in here
            </Link>{" "}
            to add to favourites
          </p>
          <button
            className="ProductCardPleaseLogInButton"
            onClick={() => setShowPleaseLogIn(false)}
          >
            x
          </button>
        </div>
      )}
    </>
  );
};

export default ProductCard;
