const Comment = require("../Modals/comment");



exports.addComment = async (req, res) => {
  try {
    let { video, message } = req.body;
    let comment = new Comment({ user: req.user._id, video, message });
    await comment.save();

    // Populate the user object before sending response
    comment = await comment.populate('user', 'channelName profilePic userName createdAt about');

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.getCommentByVideoId = async (req, res) => {
  try {
    let { videoId } = req.params;
    const comments = await Comment.find({ video: videoId }).populate(
      "user",
      "channelName profilePic userName createdAt about"
    );
    res
      .status(200)
      .json({ message: "Comments fetched successfully", comments });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    // Check if comment exists
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the logged-in user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not authorized to edit this comment" });
    }

    comment.message = message;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if comment exists
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the logged-in user is the owner of the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not authorized to delete this comment" });
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
