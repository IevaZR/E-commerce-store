import Header from "../../Components/Header/Header";
import "./ShopPage.css";
import ProductsView from "../../Components/ProductsView/ProductsView";
import Footer from "../../Components/Footer/Footer";
import ScrollToTopButton from "../../Components/ScrollToTopButton/ScrollToTopButton";

const ShopPage = () => {
  return (
    <div id="ShopPage" className="ShopPageWrapper">
      <Header />
      {/* <Filter/> */}
      <ProductsView />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ShopPage;
