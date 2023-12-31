import React from "react";
import "./HeroSection.css";
import Button from "../ReusableComponents/Button/Button";
import HeroImage from "./../../Assets/heroImage.png";
import { useActiveSearchContext } from "../../HelperFunctions/ActiveSearchContext";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { updateActiveSearch } = useActiveSearchContext();

  const showProducts = () => {
    updateActiveSearch(false);
  };
  return (
    <div className="HeroSectionWrapper">
      <div className="HeroSectionHeadingWrapper">
        <h1 className="HeroSectionHeading">
          Comfortable furniture for your home
        </h1>
        <p className="HeroSectionParagraph">
          Discover timeless elegance and unparalleled craftsmanship at our
          furniture shop. Transform your living spaces with our curated
          collection of exquisite furniture pieces and create your dream home
          today.
        </p>
        <Link to="/shop">
          <Button text="Shop Now" onClick={showProducts}></Button>
        </Link>
      </div>
      <div className="HeroSectionImageWrapper">
        <img src={HeroImage} alt="armchair" className="HeroSectionImage" />
      </div>
    </div>
  );
};

export default HeroSection;
