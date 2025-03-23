import React, { useState, useEffect } from "react";
import "./videoUpload.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast, ToastContainer } from "react-toastify";

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
  });

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e, type) => {
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //This is my preset name in cloudinary "youtube-clone"
    data.append("upload_preset", "youtube-clone");
    try {
      // This is my cloudName="dxa1x7saf"

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dxa1x7saf/${type}/upload`,
        data
      );

      const url = response.data.url;
      setLoader(false);
      let val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({
        ...inputField,
        [val]: url,
      });
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isLogin = localStorage.getItem("userId");
    if (isLogin == null) {
      setTimeout(() => {
        navigate("/");
      }, 700);
      toast.error("Please Login First");
    }
  }, []);

  const handleSubmitFunc = async () => {
    setLoader(true)
    await axios
      .post("http://localhost:4000/api/video", inputField, {
        withCredentials: true,
      })
      .then((resp) => {
        console.log(resp);
        setLoader(false);
        setTimeout(() => {
          navigate("/");
        }, 1400);
        toast.success("Video Uploaded Successfully!");
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <>
      <div className="videoUpload">
        <div className="uploadBox">
          <div className="uploadVideoTitle">
            <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
            Upload Video
          </div>

          <div className="uploadForm">
            <input
              type="text"
              value={inputField.title}
              onChange={(e) => {
                handleOnChangeInput(e, "title");
              }}
              placeholder="Title of the Video"
              className="uploadFormInputs"
            />
            <input
              type="text"
              value={inputField.description}
              onChange={(e) => {
                handleOnChangeInput(e, "description");
              }}
              placeholder="Description of the Video"
              className="uploadFormInputs"
            />
            <input
              type="text"
              value={inputField.videoType}
              onChange={(e) => {
                handleOnChangeInput(e, "videoType");
              }}
              placeholder="Category"
              className="uploadFormInputs"
            />
            <div className="centerKaro">
              Thumbnail{" "}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  uploadImage(e, "image");
                }}
              />
            </div>
            <div className="centerKaro">
              Video{" "}
              <input
                type="file"
                accept="video/mp4, video/webm, video/*"
                onChange={(e) => {
                  uploadImage(e, "video");
                }}
              />
            </div>
            {loader && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </div>

          <div className="uploadBtns">
            <div className="uploadBtn-form" onClick={handleSubmitFunc}>
              Upload
            </div>
            <Link to={"/"} className="uploadBtn-form">
              Home
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default VideoUpload;
