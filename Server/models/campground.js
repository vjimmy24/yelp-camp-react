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
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  author: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  //Store the object ID's in the campground, rather than the actual review.
  reviews: {
    type: [{ type: Schema.Types.ObjectId, ref: "Review" }],
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
});

campgroundSchema.post("findOneAndDelete", async function (res) {
  if (res) {
    await Review.deleteMany({
      _id: {
        $in: res.reviews,
      },
    });
  }
});

module.exports.Campground = mongoose.model("Campground", campgroundSchema);
