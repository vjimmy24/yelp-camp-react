const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    //  [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  // images: [imageSchema],
  // geometry: {
  //   type: {
  //     type: String,
  //     enum: ["Point"],
  //     required: true,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //   },
  // },
  // reviews: {
  //   type: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  // },
});

module.exports.Campground = mongoose.model("Campground", campgroundSchema);
