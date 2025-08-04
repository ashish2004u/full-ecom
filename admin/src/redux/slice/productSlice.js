import {createSlice} from '@reduxjs/toolkit';
import Products from '../../data/productData';

const productSlice = createSlice({
    name:'product',
    initialState:{
        products:Products ,// yahan ek jagah import ho gaya
    },
    reducers:{
        deleteReview: (state, action) => {
      // action.payload = { productId, reviewId }
      const { productId, reviewId } = action.payload;

      // Find product index by id
      const productIndex = state.products.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        // Filter out the review with reviewId
        state.products[productIndex].reviews = state.products[productIndex].reviews.filter(
          review => review.id !== reviewId
        );
      }
    },

    }
})

export const selectAllProducts = (state) => state.product.products;
export const { deleteReview } = productSlice.actions;

export default productSlice.reducer;