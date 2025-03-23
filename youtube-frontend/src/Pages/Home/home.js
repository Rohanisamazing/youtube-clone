import React from "react";
import "./home.css";
import SideNavbar from "../../Components/SideNavbar/sideNavbar";
import HomePage from "../../Components/HomePage/homePage";


const Home = ({sideNavbar, searchTerm, isMobile}) => {
  return (
    <div className="home">
      <SideNavbar sideNavbar={sideNavbar} isMobile={isMobile} />
      <HomePage sideNavbar={sideNavbar} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
