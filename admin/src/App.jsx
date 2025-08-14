// src/App.jsx
import { useNavigate } from "react-router-dom";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

// Hot Toast
import { Toaster } from "react-hot-toast";
import EditSubcategory from "./pages/EditSubcategory";
import AddSubcategory from "./pages/AddSubcategory";
import SubcategoryPage from "./pages/subcategory";
import AddAdmin from "./pages/AdminUser/AddAdmin";
import EditAdmin from "./pages/AdminUser/EditAdmin";
import AdminUser from "./pages/adminUser/AdminUser";
import AdminLogin from "./pages/AdminLogin";

// NoAccess page
const NoAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <h1 className="text-4xl font-extrabold text-red-700 mb-4">
        🚫 एक्सेस मना है
      </h1>
      <p className="text-lg text-red-600 mb-8">
        आपको इस पेज तक पहुँचने की अनुमति नहीं है।
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        होम पेज पर जाएं
      </button>
    </div>
  );
};

// ProtectedRoute component with role check
const ProtectedRoute = ({ element, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
console.log("Role from localStorage:", role);


  if (!token) {
    return <Navigate to="/admin-login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/no-access" />;
  }

  return element;
};
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "15px",
          },
          duration: 3000,
        }}
      />

      <Routes>
        {/* Public Route */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/no-access" element={<NoAccess />} />

        {/* Protected Routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="products" element={<ProtectedRoute element={<Products />} />} />
          <Route path="/add-product" element={<ProtectedRoute element={<AddProducts />} />} />
          <Route path="/categories" element={<ProtectedRoute element={<CategoryPage />} />} />
          <Route path="/subcategories" element={<ProtectedRoute element={<SubcategoryPage />} />} />
          <Route path="/add-category" element={<ProtectedRoute element={<AddCategory />} />} />
          <Route path="/add-subcategory" element={<ProtectedRoute element={<AddSubcategory />} />} />
          <Route path="/edit-product/:id" element={<ProtectedRoute element={<EditProduct />} />} />
          <Route path="/edit-category/:id" element={<ProtectedRoute element={<EditCategory />} />} />
          <Route path="/edit-subcategory/:id" element={<ProtectedRoute element={<EditSubcategory />} />} />
          <Route path="/newsletter" element={<ProtectedRoute element={<Newsletter />} />} />
          <Route path="/ongoing-orders" element={<ProtectedRoute element={<OngoingOrder />} />} />
          <Route path="/completed-orders" element={<ProtectedRoute element={<CompletedOrder />} />} />
          <Route path="return-orders" element={<ProtectedRoute element={<ReturnOrdersPage />} />} />
          <Route path="/cancel-orders" element={<ProtectedRoute element={<CancelOrdersPage />} />} />
          <Route path="/review" element={<ProtectedRoute element={<Review />} />} />

          {/* Admin only routes */}
          <Route
            path="/add-admin"
            element={<ProtectedRoute requiredRole="admin" element={<AddAdmin />} />}
          />
          <Route
            path="/edit-admin/:id"
            element={<ProtectedRoute requiredRole="admin" element={<EditAdmin />} />}
          />
          <Route
            path="/admin-user"
            element={<ProtectedRoute requiredRole="admin" element={<AdminUser />} />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
