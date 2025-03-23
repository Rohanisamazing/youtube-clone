import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import MicSharpIcon from "@mui/icons-material/MicSharp";
import VideoCallSharpIcon from "@mui/icons-material/VideoCallSharp";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/login";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import zIndex from "@mui/material/styles/zIndex";

const Navbar = ({
  setSideNavbarFunc,
  sideNavbar,
  setSearchTerm,
  setIsMobileFunc,
  isMobile,
}) => {
  const [userPic, setUserPic] = useState("");
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleprofile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModal(false);
  };

  const handleClickModal = () => {
    setNavbarModal((prev) => !prev);
  };

  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
    if (window.innerWidth <= 480) {
      setIsMobileFunc(!isMobile);
    }
  };

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setSearchTerm(e.target.value);
  };

  const onclickOfPopUpOption = (button) => {
    if (button === "login") {
      navigate("/login");
      setNavbarModal(false);
    } else {
      localStorage.clear();
      getLogoutFun();
      toast.success("Logged out successfully! Please wait...");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    }
  };

  const getLogoutFun = async () => {
    axios
      .post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setLoginModal = () => {
    setLogin(false);
  };

  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLoggedIn(localStorage.getItem("userId") !== null ? true : false);
    if (userProfilePic !== null) {
      setUserPic(userProfilePic);
    }
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <div onClick={sideNavbarFunc} className="navbarHamberger">
            <MenuIcon sx={{ color: "white" }} />
          </div>
          <Link to={"/"} className="navbar_youtubeimg">
            <YouTubeIcon
              sx={{ fontSize: "34px" }}
              className="navbar_youtubeImage"
            />
          </Link>
          <Link to={"/"} className="navbar_utubeTitle">
            YouTube
          </Link>
        </div>
        <div className="navbar-middle">
          <input
            type="text"
            placeholder="Search"
            className="navbar_searchBoxInput"
            value={searchValue}
            onChange={handleSearch}
          />
          <div className="navbar_searchIconBox">
            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
          </div>
          <div className="navbar_mike">
            <MicSharpIcon sx={{ color: "white", fontSize: "28px" }} />
          </div>
        </div>

        <div className="navbar-right">
          <Link to={"/763/upload"}>
            <VideoCallSharpIcon
              sx={{ fontSize: "30px", cursor: "pointer", color: "white" }}
            />
          </Link>

          <NotificationsSharpIcon
            sx={{
              color: "white",
              fontSize: "30px",
              cursor: "pointer",
              display: { xs: "none", sm: "block" },
            }}
          />
          {!userPic || typeof userPic === "undefined" ? (
            <button onClick={handleClickModal} className="signin-button">
              <PersonSharpIcon
                sx={{ color: "white", fontSize: "25px", cursor: "pointer" }}
              />
              Sign In
            </button>
          ) : (
            <img
              onClick={handleClickModal}
              src={userPic}
              className="navbar-right-logo"
              alt="User Picture"
            />
          )}

          {navbarModal && (
            <div className="navbar-modal">
              {isLoggedIn && (
                <div className="navbar-modal-option" onClick={handleprofile}>
                  Profile
                </div>
              )}

              {isLoggedIn && (
                <div
                  onClick={() => onclickOfPopUpOption("logout")}
                  className="navbar-modal-option"
                >
                  Logout
                </div>
              )}
              {!isLoggedIn && (
                <div
                  onClick={() => onclickOfPopUpOption("login")}
                  className="navbar-modal-option"
                >
                  Login
                </div>
              )}
            </div>
          )}
        </div>
        {login && <Login setLoginModal={setLoginModal} />}
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
