import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    recipe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe", // Reference to the Recipe collection
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to your User collection
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Assuming a 1-5 star rating, adjust as needed
      max: 5,
    },
    text: {
      type: String, // The actual review text
      required: false, // Review text can be optional if just rating
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt for the review
    versionKey: false,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
