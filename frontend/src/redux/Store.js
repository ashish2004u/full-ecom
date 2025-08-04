import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import categoryReducer from "./slice/categorySlice";
import subCategoryReducer from "./slice/subCategorySlice";
import reviewReducer from "./slice/reviewSlice";
import cartSlice from "./slice/cartSlice";
import authReducer from "./slice/authSlice"
const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    review: reviewReducer,
    cart: cartSlice,
    auth: authReducer,
  },
});

export default store;
