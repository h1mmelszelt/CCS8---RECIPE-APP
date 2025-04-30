import express from "express";
import {
  createReview,
  getReviewsByRecipeId,
  updateReview,
  deleteReview,
  getAllReviews,
  getReviewsByUserId,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/user/:userId", getReviewsByUserId);
router.get("/", getAllReviews);
router.post("/:recipeId", createReview); // Create a review for a recipe
router.get("/:recipeId", getReviewsByRecipeId); // Get all reviews for a recipe
router.put("/:reviewId", updateReview); // Update a specific review
router.delete("/:reviewId", deleteReview); // Delete a specific review

export default router;
