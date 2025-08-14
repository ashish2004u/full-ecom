import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById } from "../redux/slice/productSlice";
import toast from "react-hot-toast";

const ListProduct = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductById(id))
        .unwrap()
        .then(() => {
          toast.success("✅ Product deleted successfully!");
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          toast.error("❌ Failed to delete product");
        });
    }
  };

  return (
    <div className="w-full p-4">
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Subcategory</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">MRP</th>
              <th className="px-4 py-3">Sizes</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((prod) => (
                <tr key={prod._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{prod._id || "—"}</td>
                  <td className="px-4 py-3">
                    {prod.images?.[0] ? (
                      <img
                        src={prod.images[0]}
                        alt={prod.name || "Product"}
                        className="w-14 h-14 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{prod.name || "—"}</td>
                  <td className="px-4 py-3">{prod.category?.name || "—"}</td>
                  <td className="px-4 py-3">{prod.subcategory?.name || "—"}</td>
                  <td className="px-4 py-3">₹{prod.price ?? "—"}</td>
                  <td className="px-4 py-3">
                    ₹{prod.price ? prod.price + 600 : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {Array.isArray(prod.sizes) ? prod.sizes.join(", ") : "—"}
                  </td>
                  <td className="px-4 py-3">{prod.sku || "—"}</td>
                  <td className="px-4 py-3">{prod.inventory ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/edit-product/${prod._id}`)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(prod._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                        disabled={loading}
                      >
                        {loading ? "..." : <FaTrash />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
