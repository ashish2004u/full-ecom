import express from "express";
import {
  addReview,
  getReviews,
  updateReview,
  deleteReview
} from "../controllers/reviewController.js";

const reviewRouter = express.Router({ mergeParams: true }); // important for nested params

// Add review to product
reviewRouter.post("/:id/add-review", addReview);

// Get all reviews of a product
reviewRouter.get("/:id/get-review", getReviews);

// Update a specific review of a product
reviewRouter.put("/:productId/update-review/:reviewId", updateReview);

// Delete a specific review of a product
reviewRouter.delete("/:productId/delete-review/:reviewId", deleteReview);

export default reviewRouter;
