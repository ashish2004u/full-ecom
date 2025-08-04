import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCategory } from "../redux/slice/categorySlice";
import {selectAllSubCategory} from '../redux/slice/subCategorySlice'

const ProductList = ({ products = [] }) => {
  const navigate = useNavigate();
  const categories = useSelector(selectAllCategory); // get category list
  const subCategories = useSelector(selectAllSubCategory); // get category list

  // helper function to get category name by id
  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : id; // fallback to id if not found
  };

   const getSubCategoryName = (id) => {
    const subCat = subCategories.find((c) => c.id === id);
    return subCat ? subCat.name : id; // fallback to id if not found
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Subcategory</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">MRP</th>
              <th className="px-4 py-3 text-left">Sizes</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Actions</th>
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
                <tr key={prod.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{prod.id}</td>
                  <td className="px-4 py-3">
                    <img
                      src={prod.image || prod.images?.[0]}
                      alt={prod.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{prod.name}</td>
                  <td className="px-4 py-3">{getCategoryName(prod.category)}</td>
                  <td className="px-4 py-3">{getSubCategoryName(prod.subcategory)}</td>
                  <td className="px-4 py-3">${prod.price}</td>
                  <td className="px-4 py-3">${prod.mrp}</td>
                  <td className="px-4 py-3">
                    {prod.sizes?.length ? prod.sizes.join(", ") : "—"}
                  </td>
                  <td className="px-4 py-3">{prod.sku}</td>
                  <td className="px-4 py-3">{prod.inventory}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-product/${prod.id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
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

export default ProductList;
