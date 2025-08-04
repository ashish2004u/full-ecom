import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProduct";
import CategoryPage from "./pages/Category";
import AddCategory from "./pages/AddCategory";
import EditProduct from "./pages/EditProduct";
import Newsletter from "./pages/Newsletter";
import OngoingOrder from "./pages/OngoingOrder";
import CompletedOrder from "./pages/CompleteOrder";
import ReturnOrdersPage from "./pages/ReturnOrder";
import CancelOrdersPage from "./pages/CancelOrder";
import EditCategory from "./pages/EditCategory";
import Review from "./pages/Review";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="/add-product" element={<AddProducts />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/ongoing-orders" element={<OngoingOrder />} />
          <Route path="/completed-orders" element={<CompletedOrder />} />
          <Route path="return-orders" element={<ReturnOrdersPage />} />
          <Route path="/cancel-orders" element={<CancelOrdersPage />} />
          <Route path="/review" element={<Review />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
