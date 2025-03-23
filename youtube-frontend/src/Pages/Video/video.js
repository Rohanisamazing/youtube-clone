import React, { useState, useEffect } from "react";
import "./video.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Video = () => {
  const [message, setMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const { id } = useParams();

  const [commentProfile, setCommentProfile] = useState("");
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const fetchVideoById = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
      setData(response.data.video);
      setVideoUrl(response.data?.video?.videoLink);
    } catch (err) {
      console.log(err);
    }
  };

  const getCommentByVideoId = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/commentApi/comment/${id}`);
      setComments(response.data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
  }, []);

  const handleComment = async () => {
    const body = {
      message: message,
      video: id,
    };
    await axios
      .post("http://localhost:4000/commentApi/comment", body, {
        withCredentials: true,
      })
      .then((resp) => {
        const newComment = resp.data.comment;
  
        // Add the new comment to the state and enable edit/delete options
        setComments((prev) => [newComment, ...prev]);
        setMessage("");
      })
      .catch((err) => {
        toast.error("Please login first to comment!!!");
      });
  };
  

  // ✅ Edit Comment
  const handleEditComment = async (commentId) => {
    try {
      const body = {
        message: editMessage,
      };
      const response = await axios.patch(`http://localhost:4000/commentApi/comment/${commentId}`, body, {
        withCredentials: true,
      });

      // Update the edited comment in state
      setComments(comments.map(comment => 
        comment._id === commentId ? { ...comment, message: editMessage } : comment
      ));
      setEditCommentId(null);
      toast.success("Comment updated successfully!");
    } catch (err) {
      toast.error("Failed to update comment!");
    }
  };

  // ✅ Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:4000/commentApi/comment/${commentId}`, {
        withCredentials: true,
      });

      // Remove the comment from state
      setComments(comments.filter(comment => comment._id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete comment!");
    }
  };

  // ✅ Handle profile picture
  useEffect(() => {
    const userProfilePic = localStorage.getItem("userProfilePic") || 
      "https://res.cloudinary.com/dxa1x7saf/image/upload/v1742479569/acqr962rdnzp4wvniuod.jpg";
    setCommentProfile(userProfilePic);
  }, []);

  return (
    <div className="video">
      <div className="videoPostSection">
        {/* Video Section */}
        <div className="video_youtube">
          {data && (
            <video width="400" controls autoPlay className="video_youtube_video">
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Video Details */}
        <div className="video_youtubeAbout">
          <div className="video_uTubeTitle">{data?.title}</div>
          
          <div className="youtube_video_ProfileBlock">
            <div className="youtube_video_ProfileBlock_left">
              <Link
                to={`/user/${data?.user?._id}`}
                className="youtube_video_ProfileBlock_left_img"
              >
                <img
                  className="youtube_video_ProfileBlock_left_image"
                  src={data?.user?.profilePic}
                  alt="Profile"
                />
              </Link>

              <div className="youtubeVideo_subsView">
                <Link
                  to={`/user/${data?.user?._id}`}
                  className="youtubePostProfileName"
                >
                  {data?.user?.channelName}
                </Link>
                <div className="youtubePostProfileSubs">
                  {data?.user?.createdAt.slice(0, 10)}
                </div>
              </div>

              <div className="subscribeBtnYoutube">Subscribe</div>
            </div>

            <div className="youtube_video_likeBlock">
              <div className="youtube_video_likeBlock_Like">
                <ThumbUpAltOutlinedIcon />
                <div className="youtube_video_likeBlock_NoOfLikes">
                  {data?.like}
                </div>
              </div>

              <div className="youtubeVideoDivider"></div>

              <div className="youtube_video_likeBlock_Like">
                <ThumbDownOutlinedIcon />
              </div>
            </div>
          </div>

          <div className="youtube_video_About">
            <div>{data?.user?.createdAt.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>

          {/* Comment Section */}
          <div className="youtubeCommentSection">
            <div className="youtubeCommentSectionTitle">
              {comments.length} Comments
            </div>

            {/* Add Comment */}
            <div className="youtubeSelfComment">
              <img className="video_youtubeSelfCommentProfile" src={commentProfile} alt="" />
              <div className="addAComment">
                <input
                  type="text"
                  className="addAcommentInput"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a comment"
                />
                <div className="cancelSubmitComment">
                  <div className="cancelComment" onClick={()=>{setMessage("")}}>Cancel</div>
                  <div className="cancelComment" onClick={handleComment}>
                    Comment
                  </div>
                </div>
              </div>
            </div>

            {/* Display Comments */}
            <div className="youtubeOthersComments">
              {comments.map((item) => (
                <div key={item._id} className="youtubeSelfComment">
                  <img
                    className="video_youtubeSelfCommentProfile"
                    src={item?.user?.profilePic}
                    alt=""
                  />
                  <div className="others_commentSection">
                    <div className="others_commentSectionHeader">
                      <div className="channelName_comment">
                        {item?.user?.channelName}
                      </div>
                      <div className="commentTimingOthers">
                        {item?.createdAt.slice(0, 10)}
                      </div>
                    </div>

                    {/* Comment Message */}
                    {editCommentId === item._id ? (
                      <div>
                        <input
                          type="text"
                          value={editMessage}
                          onChange={(e) => setEditMessage(e.target.value)}
                        />
                        <button onClick={() => handleEditComment(item._id)}>Save</button>
                        <button onClick={() => setEditCommentId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <div className="otherCommentSectionComment">
                        {item?.message}
                      </div>
                    )}

                    {/* Edit/Delete Buttons */}
                    {item?.user?._id === localStorage.getItem("userId") && (
                      <div className="commentActions">
                        <button onClick={() => {
                          setEditCommentId(item._id);
                          setEditMessage(item.message);
                        }}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteComment(item._id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="videoSuggestions">

        <div className="videoSuggestionsBlock">
          <div className="video_suggetion_thumbnail">
            <img
              className="video_suggetion_thumbnail_img"
              src="https://res.cloudinary.com/dxa1x7saf/image/upload/v1742632416/msmzfayiayyuqt1wako0.jpg"
              alt=""
            />
          </div>

          <div className="video_suggetions_About">
            <div className="video_suggetions_About_title">
              GTA 5 - The Diamond Casino Heist
              <div className="video_suggetions_About_Profile">
                Amazing Uploader
              </div>
              <div className="video_suggetions_About_Profile">
                136k views • 1 day ago
              </div>
            </div>
          </div>
        </div>

        <div className="videoSuggestionsBlock">
          <div className="video_suggetion_thumbnail">
            <img
              className="video_suggetion_thumbnail_img"
              src="https://res.cloudinary.com/dxa1x7saf/image/upload/v1742632416/msmzfayiayyuqt1wako0.jpg"
              alt=""
            />
          </div>

          <div className="video_suggetions_About">
            <div className="video_suggetions_About_title">
              GTA 5 - The Diamond Casino Heist
              <div className="video_suggetions_About_Profile">
                Amazing Uploader
              </div>
              <div className="video_suggetions_About_Profile">
                136k views • 1 day ago
              </div>
            </div>
          </div>
        </div>

        <div className="videoSuggestionsBlock">
          <div className="video_suggetion_thumbnail">
            <img
              className="video_suggetion_thumbnail_img"
              src="https://res.cloudinary.com/dxa1x7saf/image/upload/v1742632416/msmzfayiayyuqt1wako0.jpg"
              alt=""
            />
          </div>

          <div className="video_suggetions_About">
            <div className="video_suggetions_About_title">
              GTA 5 - The Diamond Casino Heist
              <div className="video_suggetions_About_Profile">
                Amazing Uploader
              </div>
              <div className="video_suggetions_About_Profile">
                136k views • 1 day ago
              </div>
            </div>
          </div>
        </div>

        <div className="videoSuggestionsBlock">
          <div className="video_suggetion_thumbnail">
            <img
              className="video_suggetion_thumbnail_img"
              src="https://res.cloudinary.com/dxa1x7saf/image/upload/v1742632416/msmzfayiayyuqt1wako0.jpg"
              alt=""
            />
          </div>

          <div className="video_suggetions_About">
            <div className="video_suggetions_About_title">
              GTA 5 - The Diamond Casino Heist
              <div className="video_suggetions_About_Profile">
                Amazing Uploader
              </div>
              <div className="video_suggetions_About_Profile">
                136k views • 1 day ago
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Video;

