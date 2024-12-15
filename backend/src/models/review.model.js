import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  reviewFrom: {
    type: String,
    required: true,
  },
  reviewTo: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export { Review };
