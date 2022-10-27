if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const dbUrl = "mongodb://localhost:27017/yelp-camp-react";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const { Campground } = require("./models/campground");
const { User } = require("./models/user");
const { Review } = require("./models/review");
const bodyParser = require("body-parser");
const multer = require("multer");
const MongoStore = require("connect-mongo");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const cors = require("cors");
const upload = multer({ storage: fileStorageEngine });

const secret = process.env.SECRET || "mangocat";
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

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.options("*", cors);
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret,
  },
  touchAfter: 24 * 60 * 60,
});
app.use(
  session({
    name: "shellcat",
    // store,
    secret,
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   httpOnly: true,
    //   //SECURE WHEN DEPLOYED
    //   secure: false,
    //   expires: Date.now() + 6.048e8,
    //   maxAge: 6.048e8,
    // },
  })
);
app.use(cookieParser(secret));
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   res.locals.user = req.user;
//   next();
// });

//Routes

//Authentication
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user exists.");
    else {
      req.login(user, (err) => {
        if (err) throw err;
        res.send(req.user);
        console.log(`Logged in, user info: ${req.user}`);
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

app.post("/logout", (req, res) => {
  if (!req.user) {
    console.log("not logged in.");
    return;
  }
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    if (!req.user) {
      console.log("successfully logged out");
      // console.log(req.user);
    }
  });
});

app.get("/getUser", (req, res) => {
  console.log(req.session);
});

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3", "user4"] });
});

//Campground CRUD API
app.post("/campground", upload.single("campImage"), async (req, res) => {
  // console.log("creation request has been received!");
  // res.status(200).send(req.file);
  console.log(req.user);
  // const newCampground = new Campground(req.body);
  // newCampground.author = req.user._id;
  // await newCampground.save();
  // console.log(`Created new camp: ${newCampground}`);
});

app.get("/campground", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.send({ campgrounds: campgrounds });
});

app.get("/campgrounddetails/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(`camp id: ${id}`);
  const foundCamp = await Campground.find({ _id: id })
    .populate("reviews")
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
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
  console.log(`here is your edited campground: ${editedCampground}`);
});

//Campground Review API

app.post("/campground/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById({ _id: id });
  const review = new Review(req.body);
  review.author = req.user._id;
  campground.reviews.push(review);
  console.log(review);

  await review.save();
  await campground.save();
  console.log("success!");
});

//Server Start
app.listen(5000, () => console.log("Server listening on Port 5000.."));
