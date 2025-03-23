import React, { useState } from "react";
import "./login.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css' it still worked for me without importing this css file for popup message from toastify
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Login = ({ setLoginModal }) => {
  const [loginField, setloginField] = useState({ userName: "", password: "" });
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("")

  const emailHandler = (e)=>{
    setEmail(e.target.value);
  }

  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setloginField({
      ...loginField,
      [name]: event.target.value,
    });
  };

  const handleLoginFun = async () => {
    setLoader(true);
    axios
      .post("http://localhost:4000/auth/login", loginField, {
        withCredentials: true,
      })
      .then((resp) => {
        setLoader(false);
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("userId", resp.data.user._id);
        localStorage.setItem("userProfilePic", resp.data.user.profilePic);
        navigate("/");
        window.alert("Logged In Successfully!");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Invalid Credentials!!!");
        setLoader(false);
      });
  };

  return (
    <>
      <div className="login">
        <div className="login_card">
          <div className="titleCard_login">
            <YouTubeIcon
              sx={{ fontSize: "54px", color: "red" }}
              className="login_youtubeImage"
            />
            LogIn
          </div>
          <div className="loginCredentials">
            <div className="userNameLogin">
              <input
                type="text"
                className="userNameLoginUserName"
                value={loginField.userName}
                onChange={(e) => handleOnChangeInput(e, "userName")}
                placeholder="Username"
              />
            </div>
            <div className="userNameLogin">
              <input
                type="email"
                className="userNameLoginUserName"
                value={email}
                onChange={(e) => emailHandler(e)}
                placeholder="Email Id"
              />
            </div>
            <div className="userNameLogin">
              <input
                type="password"
                className="userNameLoginUserName"
                value={loginField.password}
                onChange={(e) => handleOnChangeInput(e, "password")}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="login_buttons">
            <div className="login-btn" onClick={handleLoginFun}>
              Login
            </div>
            <Link to={"/signup"} className="login-btn">
              Sign Up
            </Link>
            <Link to={"/"} className="login-btn">
              Cancel
            </Link>
          </div>

          {loader && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
