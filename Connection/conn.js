const mongoose = require("mongoose");
// youtubeBackend is the name of the database

mongoose
  .connect("mongodb://localhost:27017/youtubeBackend")
  .then(() => console.log("db connection successful"))
  .catch((err) => console.log(err));
