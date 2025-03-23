import React, { useState, useEffect } from "react";
import "./profile.css";
import SideNavbar from "../../Components/SideNavbar/sideNavbar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ sideNavbar }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const navigate = useNavigate();

  // ✅ Get logged-in user ID from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setLoggedInUserId(decodedToken.userId);
    }
  }, []);

  // ✅ Fetch profile data
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/${id}/channel`);
      setData(response.data.video);
      setUser(response.data.video[0]?.user);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // ✅ Handle video delete
  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/video/${videoId}`, {
        withCredentials: true,
      });
      setData((prev) => prev.filter((item) => item._id !== videoId));
      toast.success("Video deleted successfully!"); // ✅ Success message
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete the video."); // ✅ Error message
    }
  };

  // ✅ Handle video edit
  const handleEdit = (videoId) => {
    navigate(`/edit-video/${videoId}`);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="profile">
      <SideNavbar sideNavbar={sideNavbar} />
      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
        {/* Profile top section */}
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              className="profile_top_section_img"
              src={user?.profilePic}
              alt="Profile"
            />
          </div>
          <div className="profile_top_section_About">
            <div className="profile_top_section_About_Name">
              {user?.channelName}
            </div>
            <div className="profile_top_section_info">
              {user?.userName} · {data.length} videos
            </div>
            <div className="profile_top_section_info">{user?.about}</div>
          </div>
        </div>

        {/* Videos section */}
        <div className="profile_videos">
          <div className="profile_videos_title">
            Videos &nbsp; <ArrowRightIcon />
          </div>

          <div className="profileVideos">
            {data.map((item) => (
              <div key={item._id} className="profileVideo_container">
                <Link to={`/watch/${item._id}`} className="profileVideo_block">
                  <div className="profileVideo_block_thumbnail">
                    <img
                      className="profileVideo_block_thumbnail_img"
                      src={item.thumbnail}
                      alt="Thumbnail"
                    />
                  </div>
                  <div className="profileVideo_block_detail">
                    <div className="profileVideo_block_detail_name">
                      {item?.title}
                    </div>
                    <div className="profileVideo_block_detail_about">
                      Created at {item.createdAt.slice(0, 10)}
                    </div>
                  </div>
                </Link>

                {/* ✅ Conditionally render Edit/Delete buttons */}
                {loggedInUserId === item.user?._id && (
                  <div className="profileVideo_actions">
                    <button
                      className="edit_btn"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete_btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Add ToastContainer */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Profile;
