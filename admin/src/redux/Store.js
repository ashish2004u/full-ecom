import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import categoryReducer from "./slice/categorySlice";
import subCategoryReducer from './slice/subCategorySlice'
import reviewReducer from './slice/reviewSlice'
import cartSlice from './slice/cartSlice'
const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    subCategory:subCategoryReducer,
    review: reviewReducer,
    cart:cartSlice,
    


  },
});

export default store;
