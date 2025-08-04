import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [editingIndex, setEditingIndex] = useState(null); // for editing mode

  useEffect(() => {
    const saved = localStorage.getItem("reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      user: "John Doe",
      rating,
      comment,
    };

    let updatedReviews;

    if (editingIndex !== null) {
      // Editing existing review
      updatedReviews = [...reviews];
      updatedReviews[editingIndex] = newReview;
      setEditingIndex(null);
    } else {
      // New review
      updatedReviews = [newReview, ...reviews];
    }

    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));

    setRating(0);
    setComment("");
  };

  const handleDelete = (index) => {
    const updated = reviews.filter((_, i) => i !== index);
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    const review = reviews[index];
    setComment(review.comment);
    setRating(review.rating);
    setEditingIndex(index);
  };

  return (
    <div className="w-full bg-white px-4 py-6 md:px-10 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingIndex !== null ? "Edit Review" : "Write a Review"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div>
          <label className="text-sm font-medium text-gray-700">Your Rating</label>
          <div className="flex space-x-1 mt-1">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="hidden"
                  />
                  <FaStar
                    size={28}
                    className={`cursor-pointer transition-colors ${
                      ratingValue <= (hover || rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Comment Box */}
        <div>
          <label className="text-sm font-medium text-gray-700">Your Comment</label>
          <textarea
            rows="4"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your experience with the product..."
            className="mt-1 w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
        >
          {editingIndex !== null ? "Update Review" : "Submit Review"}
        </button>
      </form>

      {/* Display Reviews */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {reviews.slice(0, visibleCount).map((rev, index) => (
                <li
                  key={index}
                  className="border border-gray-200 p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={20}
                          className={i < rev.rating ? "text-yellow-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {rev.user}
                    </span>
                  </div>
                  <p className="text-gray-700">{rev.comment}</p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Load More Button */}
            {visibleCount < reviews.length && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 5)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
