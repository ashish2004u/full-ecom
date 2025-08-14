import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import categoryReducer from "./slice/categorySlice";
import subCategoryReducer from './slice/subCategorySlice'
import reviewReducer from './slice/reviewSlice'
import cartSlice from './slice/cartSlice'
import adminUserReducer  from './slice/adminUserSlice'
const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    subCategory:subCategoryReducer,
    review: reviewReducer,
    cart:cartSlice,
    adminUsers: adminUserReducer,


  },
});

export default store;
