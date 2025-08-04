import { createSlice } from '@reduxjs/toolkit';
import { categoryData } from '../../data/categoryData';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryData: categoryData, // This key should match your selector
  },
  reducers: {}
});

// Selector
export const selectAllCategory = (state) => state.category.categoryData;

// Export the reducer
export default categorySlice.reducer;
