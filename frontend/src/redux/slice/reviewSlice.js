import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../App"; // apna backend URL yahan set karein

// ✅ Fetch all reviews for a product
export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendUrl}/api/products/${productId}/get-review`);
      return { productId, reviews: res.data.reviews };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

// ✅ Add review
export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ productId, name, rating, comment }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendUrl}/api/products/${productId}/add-review`, {
        name,
        rating,
        comment,
      });
      return { productId, review: res.data.review };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add review");
    }
  }
);

// ✅ Update review
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ productId, reviewId, name, rating, comment }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${backendUrl}/api/products/${productId}/update-review/${reviewId}`, {
        name,
        rating,
        comment,
      });
      return { productId, review: res.data.review };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update review");
    }
  }
);

// ✅ Delete review
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${backendUrl}/api/products/${productId}/delete-review/${reviewId}`);
      return { productId, reviewId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete review");
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewsByProduct: {}, // { [productId]: [reviewObj, ...] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsByProduct[action.payload.productId] = action.payload.reviews;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addReview.fulfilled, (state, action) => {
        const { productId, review } = action.payload;
        if (!state.reviewsByProduct[productId]) state.reviewsByProduct[productId] = [];
        state.reviewsByProduct[productId].push(review);
      })

      // Update
      .addCase(updateReview.fulfilled, (state, action) => {
        const { productId, review } = action.payload;
        const reviews = state.reviewsByProduct[productId] || [];
        const index = reviews.findIndex((r) => r._id === review._id);
        if (index !== -1) reviews[index] = review;
      })

      // Delete
      .addCase(deleteReview.fulfilled, (state, action) => {
        const { productId, reviewId } = action.payload;
        state.reviewsByProduct[productId] = (state.reviewsByProduct[productId] || []).filter(
          (r) => r._id !== reviewId
        );
      });
  },
});

// Selector
export const selectReviewsByProduct = (state, productId) =>
  state.review.reviewsByProduct[productId] || [];

export default reviewSlice.reducer;
