const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: Number,
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports.Review = mongoose.model("Review", reviewSchema);
