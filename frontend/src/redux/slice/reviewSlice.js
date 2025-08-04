// redux/slice/reviewSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [], // har ek object: { productId, name, rating, comment, date }
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload); // payload = { productId, name, rating, comment, date }
    },
  },
});

export const { addReview } = reviewSlice.actions;
export const selectReviewsByProduct = (state, productId) =>
  state.review.reviews.filter((r) => r.productId === productId);

export default reviewSlice.reducer;
