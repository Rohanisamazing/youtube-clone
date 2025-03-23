import "./App.css";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Pages/Home/home";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Video from "./Pages/Video/video";
import Profile from "./Pages/Profile/profile";
import VideoUpload from "./Pages/VideoUpload/videoUpload";
import SignUp from "./Pages/SignUp/signUp";
import axios from "axios";
import EditVideo from "./Pages/EditVideo/editVideo";
import Login from "./Components/Login/login";


function App() {
  const [sideNavbar, setSideNavbar] = useState(window.innerWidth > 480);

  const [searchTerm, setSearchTerm] = useState("");


  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/api/allVideo")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  const setIsMobileFunc = (value)=>{
    setIsMobile(value);
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 480;
      setIsMobile(isMobileView);
  
      // Hide sideNavbar when in mobile view
      if (isMobileView) {
        setSideNavbar(false);
      }
    };
  
    window.addEventListener('resize', handleResize);
    
    // Initial check when component mounts
    handleResize();
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} setSearchTerm={setSearchTerm} setIsMobileFunc={setIsMobileFunc} isMobile={isMobile} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} searchTerm={searchTerm} isMobile={isMobile} />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route
          path="/user/:id"
          element={
            <Profile
              setSideNavbarFunc={setSideNavbarFunc}
              sideNavbar={sideNavbar}
            />
          }
        />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/edit-video/:videoId" element={<EditVideo />} />

        <Route path="/login" element={<Login />} /> 
      </Routes>
    </div>
  );
}

export default App;
