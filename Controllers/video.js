const Video = require("../Modals/video");

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    const videoUpload = new Video({
      user: req.user._id,
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
    });
    await videoUpload.save();

    res.status(201).json({ sucess: "true", videoUpload });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    res.status(201).json({ sucess: "true", videos: videos });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    let { id } = req.params;

    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    res.status(201).json({ success: "true", video: video });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllVideoByUserID = async (req, res) => {
  try {
    let { userId } = req.params;
    const video = await Video.find({ user: userId }).populate(
      "user",
      "channelName profilePic userName createdAt about"
    );
    res.status(201).json({ sucess: "true", video: video });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Video.distinct("videoType");
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// ✅ Edit Video
// ✅ Edit Video
exports.editVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, videoType, thumbnail } = req.body;

    // Only allow the video owner to edit
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    if (video.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to edit this video" });
    }

    // ✅ Only update allowed fields
    video.title = title || video.title;
    video.description = description || video.description;
    video.videoType = videoType || video.videoType;
    video.thumbnail = thumbnail || video.thumbnail;

    await video.save({ validateModifiedOnly: true });

    res.status(200).json({ success: true, message: "Video updated successfully", video });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// ✅ Delete Video
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow the video owner to delete
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    if (video.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this video" });
    }

    await video.deleteOne();

    res.status(200).json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
