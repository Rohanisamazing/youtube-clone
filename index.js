var express = require("express");
var app = express();
var port = 4000;
var cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"], // This is the frontend's react app url
    credentials: true,
  })
);

require("./Connection/conn");

const AuthRoutes = require("./Routes/user");
const VideoRoutes = require("./Routes/video");
const CommentRoutes = require("./Routes/comment");

app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/commentApi", CommentRoutes);

app.listen(port, () => {
  console.log("server is running on port", port);
});
