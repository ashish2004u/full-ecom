import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditProductForm from "../components/EditProductForm";

import {
  fetchProductById,
  updateProduct,
  clearUpdateStatus,
  selectSingleProduct,
  selectSingleProductLoading,
  selectSingleProductError,
  selectUpdateStatus,
  selectUpdateError,
} from "../redux/slice/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const productData = useSelector(selectSingleProduct);
  const loading = useSelector(selectSingleProductLoading);
  const error = useSelector(selectSingleProductError);
  const updateStatus = useSelector(selectUpdateStatus);
  const updateError = useSelector(selectUpdateError);

  // Fetch product on mount
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // Handle update status changes
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("✅ Product updated successfully!");
      dispatch(clearUpdateStatus());
      navigate("/products");
    } else if (updateStatus === "failed") {
      toast.error(updateError || "❌ Failed to update product.");
    }
  }, [updateStatus, updateError, dispatch, navigate]);

  const handleUpdate = (updatedData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(updatedData)) {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => formData.append("images", file));
      } else if (key === "sizes" || key === "oldImages") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }

    dispatch(updateProduct({ id, formData }));
  };

  if (loading && !productData) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      {productData && (
        <EditProductForm
          initialData={productData}
          onSubmit={handleUpdate}
          loading={updateStatus === "loading"}
        />
      )}
    </div>
  );
};

export default EditProduct;
