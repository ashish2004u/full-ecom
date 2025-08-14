import React, { useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import ListProduct from "../components/ListProduct";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProducts, fetchProducts } from "../redux/slice/productSlice";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 outline-none focus:ring-2 focus:ring-purple-500"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>

        <button
          onClick={() => navigate("/add-product")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Pass Redux products to ListProduct */}
      <ListProduct products={products} />
    </div>
  );
};

export default Products;
