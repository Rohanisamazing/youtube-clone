const express = require("express");
const router = express.Router();
const CommentController = require("../Controllers/comment");
const auth = require("../middleware/authentication");

router.post("/comment", auth, CommentController.addComment);
router.get("/comment/:videoId", CommentController.getCommentByVideoId);

// New routes for edit and delete
router.patch("/comment/:id", auth, CommentController.editComment);
router.delete("/comment/:id", auth, CommentController.deleteComment);

module.exports = router;
