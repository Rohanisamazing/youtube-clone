import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = ({ sideNavbar, searchTerm}) => {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/allVideo")
      .then((res) => {
        setData(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const options = [
  //   "All",
  //   "Web Development",
  //   "Mobile App Development",
  //   "Data Science",
  // ];

  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:4000/api/categories")
      .then((res) => {
        setCategories(["All",...res.data.categories]);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter videos based on selected category and search
  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || (item.videoType || "") === selectedCategory;
    const matchesSearch = (item.title || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase());
  
    return matchesCategory && matchesSearch;
  });

  

  return (
    <div className={sideNavbar ? "homePage" : "fullHomePage"}>
      <div className="homePage_options">
        {categories.map((item, index) => {
          return (
            <div
              key={index}
              className={`homePage_option ${
                selectedCategory === item ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(item)}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div
        className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink" }
      >
        {filteredData?.map((item, ind) => {
          return (
            <Link to={`/watch/${item._id}`} className="youtube_Video">
              <div className="youtube_thumbnailBox">
                <img
                  className="youtube_thumbnailPic"
                  src={item.thumbnail}
                  alt="Thumbnail"
                />
                <div className="youtube_timingThumbnail">28:05</div>
              </div>

              <div className="youtubeTitleBox">
                <div className="youtubeTitleBoxProfile">
                  <img
                    className="youtube_thumbnail_Profile"
                    src={item?.user?.profilePic}
                    alt="Profilepic"
                  />
                </div>

                <div className="youtubeTitleBox_Title">
                  <div className="youtube_videoTitle">{item?.title}</div>
                  <div className="youtube_channelName">
                    {item?.user?.channelName}
                  </div>
                  <div className="youtubeVideo_views">{item?.like} views</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
