import "./AdminLogin.css";
import Logo from "./../../Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  const handleLoginInput = (event) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3009/user/login-admin",
        loginData
      );

      if (data === "Authorized") {
        navigate("/admin-page");
        console.log(loginData);
      } 
    } catch (err) {
      console.log(err);
      setErrorMessage(true);
    }
  };

  return (
    <div className="AdminLoginWrapper">
      <div className="AdminLoginFormWrapper">
        <img src={Logo} alt="logo" className="AdminLoginFormLogo"></img>
        <h1 className="AdminLoginFormHeading">ADMIN LOGIN</h1>
        <form action="" className="AdminLoginForm">
          <label
            htmlFor="AdminLoginUserNameInput"
            className="AdminLoginUserNameInputLabel"
          >
            Username
          </label>
          <input
            type="text"
            className="AdminLoginUserNameInput"
            id="AdminLoginUserNameInput"
            name="userName"
            onChange={handleLoginInput}
          />
          <label
            htmlFor="AdminLoginPasswordInput"
            className="AdminLoginPasswordInputLabel"
          >
            Password
          </label>
          <input
            type="password"
            className="AdminLoginPasswordInput"
            id="AdminLoginPasswordInput"
            name="password"
            onChange={handleLoginInput}
          />
        </form>
        {errorMessage && (
          <p className="AdminLoginErrorMessage">Invalid username or password</p>
        )}
        <button className="AdminLoginButton" onClick={handleSubmit}>
          Login
        </button>
        <p className="AdminLoginForgotPasswordLink">Forgot password?</p>
      </div>
    </div>
  );
};

export default AdminLogin;
