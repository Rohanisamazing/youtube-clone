import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editVideo.css";

const EditVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  // Fetch video data for editing
  useEffect(() => {
    const fetchVideo = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/getVideoById/${videoId}`);
          console.log('Fetched video data:', response.data);
          
          const video = response.data.video; // Extract video object
      
          setFormData({
            title: video.title || "",
            description: video.description || "",
            thumbnail: video.thumbnail || "",
            userId: video.user?._id || "" // Add userId if needed for redirection
          });
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      };
      

    fetchVideo();
  }, [videoId]);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:4000/api/video/${videoId}`,
        formData,
        {
            withCredentials: true, // This will send cookies automatically
          }
      );
      alert("Video updated successfully!");
      navigate(`/user/${formData.userId}`); // Redirect to profile page after update
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  return (
    <div className="edit-video-container">
      <div className="edit-video-card">
        <h2 className="edit-video-title">Edit Video</h2>
        <form className="edit-video-form" onSubmit={handleSubmit} key={videoId}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="edit-video-input"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="edit-video-input"
            required
          />
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL"
            className="edit-video-input"
            required
          />
          
          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" className="edit-video-btn">
              Update
            </button>
            <button
              type="button"
              className="edit-video-btn cancel"
              onClick={() => navigate(-1)} // Go back to the previous page
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;
