import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchReviews,
  addReview as addReviewAction,
  updateReview as updateReviewAction,
  deleteReview as deleteReviewAction,
  selectReviewsByProduct,
} from "../redux/slice/reviewSlice";

const Review = ({ productId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) =>
    selectReviewsByProduct(state, productId)
  );
  const user = useSelector((state) => state.auth.user);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    dispatch(fetchReviews(productId)).unwrap().catch((err) => toast.error(err));
  }, [dispatch, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to submit a review!");
      return;
    }

    const userNameOrEmail = user.name || user.email || "Anonymous";

    try {
      if (editingReviewId) {
        await dispatch(
          updateReviewAction({
            productId,
            reviewId: editingReviewId,
            name: userNameOrEmail,
            rating,
            comment,
          })
        ).unwrap();
        toast.success("Review updated successfully");
        setEditingReviewId(null);
      } else {
        await dispatch(
          addReviewAction({
            productId,
            name: userNameOrEmail,
            rating,
            comment,
          })
        ).unwrap();
        toast.success("Review added successfully");
      }
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };

  const handleEdit = (review) => {
    if (!user) {
      toast.error("Please login to edit your review!");
      return;
    }
    setComment(review.comment);
    setRating(review.rating);
    setEditingReviewId(review._id);
  };

  const handleDelete = async (reviewId) => {
    if (!user) {
      toast.error("Please login to delete your review!");
      return;
    }
    try {
      await dispatch(deleteReviewAction({ productId, reviewId })).unwrap();
      toast.success("Review deleted successfully");
    } catch (err) {
      toast.error(err || "Error deleting review");
    }
  };

  return (
    <div className="w-full bg-white px-4 py-6 md:px-10 mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Write a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
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

        {/* Comment */}
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
          {editingReviewId ? "Update Review" : "Submit Review"}
        </button>
      </form>

      {/* Reviews List */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Customer Reviews
        </h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((rev) => (
              <li
                key={rev._id}
                className="border border-gray-200 p-4 rounded-md shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={20}
                        className={
                          i < rev.rating ? "text-yellow-500" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {rev.name}
                  </span>
                </div>
                <p className="text-gray-700">{rev.comment}</p>
                {user && (
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => handleEdit(rev)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(rev._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Review;
