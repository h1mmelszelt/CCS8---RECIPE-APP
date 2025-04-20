import Review from "../models/review.model.js";

export const createReview = async (req, res) => {
  const { recipeId } = req.params;
  const { user_id, rating, text } = req.body;

  try {
    if (!user_id || !rating) {
      return res.status(400).json({ error: "user_id and rating are required" });
    }

    const newReview = await Review.create({
      recipe_id: recipeId,
      user_id,
      rating,
      text,
    });

    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ error: "Failed to create review" });
  }
};

// GET /api/reviews/:recipeId
export const getReviewsByRecipeId = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const reviews = await Review.find({ recipe_id: recipeId })
      .populate("user_id", "username name")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to get reviews" });
  }
};

//
export const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, text } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, text },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ error: "Failed to update review" });
  }
};

// DELETE /api/reviews/delete/:reviewId
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};
