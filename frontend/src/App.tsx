import "./App.css";
import MainPage from "./Pages/MainPage/MainPage";
import { ActiveSearchProvider } from "./HelperFunctions/ActiveSearchContext";
import { CartProvider } from "./HelperFunctions/CartContext";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ShopPage from "./Pages/ShopPage/ShopPage";
import CartPage from "./Pages/CartPage/CartPage";
import AdminLoginPage from "./Pages/AdminLoginPage/AdminLoginPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import ScrollToTopOnNavigate from "./Components/ScrollToTopOnNavigate/ScrollToTopOnNavigate";
import useLoginAuth from "./Components/UseLoginAuth/useLoginAuth";
import UserLoginPage from "./Pages/UserLoginPage/UserLoginPage";
import UserRegisterPage from "./Pages/UserRegisterPage/UserRegisterPage";
import UserPage from "./Pages/UserPage/UserPage";


function App() {
  const { isLoggedIn, loading } = useLoginAuth(document.cookie);
  return (
    <div>
      <ActiveSearchProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/user-login" element={<UserLoginPage/>}/>
            <Route path="/user-register" element={<UserRegisterPage/>}/>
            <Route path="/user-page" element={<UserPage/>}/>
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route
            path="/admin-page"
            element={isLoggedIn ? <AdminPage /> : <Navigate to="/admin-login" />}
            />
          </Routes>
        </CartProvider>
        <ScrollToTopOnNavigate />
      </ActiveSearchProvider>
    </div>
  );
}

export default App;
