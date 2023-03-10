// dendencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const passport = require("./authentication/passport");

// setup the port and the express app
const PORT = process.env.PORT || 4000;
const app = express();

// setup the mongodb database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/passportJwtExample",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// middlewares for accepting post requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// routes
app.use("/", routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// start the server
app.listen(PORT, () => {
  console.log(`You're being served on port ${PORT}!!!`);
});
