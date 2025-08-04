// pages/EditProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditProductForm from "../components/EditProductForm";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../redux/slice/productSlice";

const EditProduct = () => {
  const { id } = useParams();

  // Redux se saare products la rahe hain
  const allProducts = useSelector(selectAllProducts);

  // Find the product based on ID
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return <div className="p-6 text-red-500">Product not found</div>;
  }

  return <EditProductForm product={product} />;
};

export default EditProduct;
