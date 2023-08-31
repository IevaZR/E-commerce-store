import "./UserLogin.css";
import Logo from "./../../Assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useActiveSearchContext } from "../../HelperFunctions/ActiveSearchContext";

const UserLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);
  const { updateUser } = useActiveSearchContext();

  const handleLoginInput = (event) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3009/user/login-user",
        loginData
      );

      if (data === "Authorized") {
        document.cookie = `session_token=${data}`;
        localStorage.setItem('email', loginData.email)
        fetchUserData();
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(true);
    }
  };

  const fetchUserData = async () => {
    try {
      const user = await axios.get(
        `http://localhost:3009/user/get-user/${loginData.email}`
      );
      updateUser(user.data[0]);
      navigate("/user-page");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="UserLoginWrapper">
      <div className="UserLoginFormWrapper">
        <img src={Logo} alt="logo" className="UserLoginFormLogo"></img>
        <h1 className="UserLoginFormHeading">USER LOGIN</h1>
        <form action="" className="UserLoginForm">
          <label
            htmlFor="UserLoginUserNameInput"
            className="UserLoginUserNameInputLabel"
          >
            Email
          </label>
          <input
            type="text"
            className="UserLoginUserNameInput"
            id="UserLoginUserNameInput"
            name="email"
            onChange={handleLoginInput}
          />
          <label
            htmlFor="UserLoginPasswordInput"
            className="UserLoginPasswordInputLabel"
          >
            Password
          </label>
          <input
            type="password"
            className="UserLoginPasswordInput"
            id="UserLoginPasswordInput"
            name="password"
            onChange={handleLoginInput}
          />
        </form>
        {errorMessage && (
          <p className="UserLoginErrorMessage">Invalid username or password</p>
        )}
        <button className="UserLoginButton" onClick={handleSubmit}>
          Login
        </button>
        <p className="UserLoginForgotPasswordLink">Forgot password?</p>
        <p className="UserLoginNoAccount">
          Don't have an account? Please{" "}
          <Link to="/user-register">register here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
