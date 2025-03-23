import React, { useState } from "react";
import "./signUp.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const SignUp = () => {
  const [uploadedImageUrl, setuploadedImageUrl] = useState(
    "data:image/jpeg;base64,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"
  );

  const [email, setEmail] = useState("")

  const emailHandler = (e)=>{
    setEmail(e.target.value);
  }

  const [signUpField, setsignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uploadedImageUrl,
  });

  const [progressBar, setProgressBar] = useState(false);

  const navigate = useNavigate();

  const handelInputField = (event, name) => {
    setsignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //This is my preset name in cloudinary "youtube-clone"
    data.append("upload_preset", "youtube-clone");
    try {
      // This is my cloudName="dxa1x7saf"
      setProgressBar(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxa1x7saf/image/upload",
        data
      );
      setProgressBar(false);

      const imageUrl = response.data.url;
      setuploadedImageUrl(imageUrl);
      setsignUpField({ ...signUpField, profilePic: imageUrl });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async () => {
    setProgressBar(true);
    axios
      .post("http://localhost:4000/auth/signUp", signUpField)
      .then((res) => {
        toast.success(res.data.message);
        setProgressBar(false);
        navigate('/')
      })
      .catch((err) => {
        setProgressBar(false);
        toast.error(err);
      });
  };

  return (
    <div className="signUp">
      <div className="signup_card">
        <div className="signUp_title">
          <YouTubeIcon
            sx={{ fontSize: "54px", color: "red" }}
            className="login_youtubeImage"
          />
          Sign Up
        </div>

        <div className="signUp_Inputs">
          <input
            type="text"
            className="signUp_Inputs_inp"
            value={signUpField.channelName}
            onChange={(e) => {
              handelInputField(e, "channelName");
            }}
            placeholder="Channel Name"
          />
          <input
            type="text"
            className="signUp_Inputs_inp"
            value={signUpField.userName}
            onChange={(e) => {
              handelInputField(e, "userName");
            }}
            placeholder="User Name"
          />
          <input
            type="email"
            className="signUp_Inputs_inp"
            value={email}
            onChange={(e) => {
              emailHandler(e);
            }}
            placeholder="Email Id"
          />
          <input
            type="password"
            className="signUp_Inputs_inp"
            value={signUpField.password}
            onChange={(e) => {
              handelInputField(e, "password");
            }}
            placeholder="Password"
          />
          <input
            type="text"
            className="signUp_Inputs_inp"
            value={signUpField.about}
            onChange={(e) => {
              handelInputField(e, "about");
            }}
            placeholder="About your channel"
          />
          <div className="image_upload_signup">
            <input
              type="file"
              onChange={(e) => {
                uploadImage(e);
              }}
            />
            <div className="image_upload_signup_div">
              <img
                className="image_default_signUp"
                src={uploadedImageUrl}
                alt=""
              />
            </div>
          </div>

          <div className="signUpBtns">
            <div className="signUpBtn" onClick={handleSignup}>
              Sign Up
            </div>
            <Link to={"/"} className="signUpBtn">
              Home Page
            </Link>
          </div>

          {progressBar && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
