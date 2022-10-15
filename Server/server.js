const express = require("express");
const app = express();
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp-react";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const { Campground } = require("./models/campground");
const { User } = require("./models/user");
const bodyParser = require("body-parser");
require("./passportConfig")(passport);

//<---------------------------------END OF IMPORTS--------------------------------->

//Connect to MongoDB

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

//Middleware

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "mangocat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("mangocat"));
app.use(passport.initialize());
app.use(passport.session());

//Routes

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user exists.");
    else {
      req.login(user, (err) => {
        if (err) throw err;
        res.json("Successfully authenticated!");
        console.log(`User info: ${req.user}`);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  console.log("creating new user..");
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) console.log("User already exists..");
    if (!doc) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPass,
      });
      await newUser.save();
      console.log(newUser);
    }
  });
});

app.get("/getUser", (req, res) => {
  res.send(req.user._id);
});

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3", "user4"] });
});

app.get("/campground", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.send({ campgrounds: campgrounds });
});

app.post("/campground", async (req, res) => {
  console.log("creation request has been received!");
  const newCampground = new Campground(req.body);
  newCampground.author = req.user._id;
  await newCampground.save();
  console.log(`Created new camp: ${newCampground}`);
});

app.get("/campgrounddetails/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(`camp id: ${id}`);
  const foundCamp = await Campground.find({ _id: id });
  // console.log(`Camp data: ${foundCamp}`);
  res.send({ foundCamp: foundCamp });
});

app.delete("/campground/:id/delete", async (req, res) => {
  console.log("deleting campground..");
  const { id } = req.params;
  await Campground.findOneAndDelete({ _id: id });
  console.log("successfully deleted campground.");
});

app.post("/campground/:id", async (req, res) => {
  console.log("edit request has been received!");
  const { id } = req.params;
  const editedCampground = await Campground.findOneAndUpdate({
    id,
    ...req.body,
  });
  console.log(`here is your new campground: ${editedCampground}`);
});

//Server Start
app.listen(5000, () => console.log("Server listening on Port 5000.."));
