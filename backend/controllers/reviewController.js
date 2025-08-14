import Product from "../models/productModel.js";

// ADD Review
export const addReview = async (req, res) => {
  try {
    const { id } = req.params; // product id
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "All review fields are required." });
    }

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found." });

    const newReview = {
      name,
      rating,
      comment,
      date: new Date(),
    };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json({ message: "Review added.", review: newReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET All Reviews for a Product
export const getReviews = async (req, res) => {
  try {
    const { id } = req.params; // product id

    const product = await Product.findById(id).select("reviews");
    if (!product) return res.status(404).json({ message: "Product not found." });

    res.status(200).json({ reviews: product.reviews });
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE Review by reviewId
export const updateReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { name, rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found." });

    const review = product.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });

    if (name) review.name = name;
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    review.date = new Date();

    await product.save();

    res.status(200).json({ message: "Review updated.", review });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE Review by reviewId
export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found." });

    const review = product.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });

    // Remove review using pull
    product.reviews.pull(reviewId);
    await product.save();

    res.status(200).json({ message: "Review deleted." });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

