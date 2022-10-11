const express = require("express");
const app = express();
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp-react";
const mongoose = require("mongoose");
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "There was an error connecting to the database.")
);
db.once("open", () => {
  console.log("Successfully Connected to Database!");
});
const { Campground } = require("./models/campground");

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3", "user4"] });
});

app.get("/campground", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.send({ campgrounds: campgrounds });
});

app.post("/campground", (req, res) => {
  const madeCamp = res.body;
});

app.listen(5000, () => console.log("Server listening on Port 5000.."));
