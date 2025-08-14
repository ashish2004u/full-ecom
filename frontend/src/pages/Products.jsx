import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectAllProducts,
  selectProductLoading,
  fetchProducts,
} from "../redux/slice/productSlice";
import {
  selectAllCategory,
  fetchCategories,
} from "../redux/slice/categorySlice";
import {
  selectAllSubCategories,
  fetchSubCategories,
} from "../redux/slice/subCategorySlice";
import ProductCard from "../components/ProductCard";
import { FaFilter } from "react-icons/fa";
import slugify from "../utils/slugify";
import Breadcrumb from "../components/BreadCrumb";
import { BeatLoader } from "react-spinners";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategory);
  const subCategories = useSelector(selectAllSubCategories);
  const loading = useSelector(selectProductLoading);

  const searchParams = new URLSearchParams(location.search);
  const categorySlug = searchParams.get("category");
  const subCategorySlug = searchParams.get("subcategory");

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Set category from URL slug
  useEffect(() => {
    if (categories.length > 0 && categorySlug) {
      const foundCategory = categories.find(
        (cat) => slugify(cat.name) === categorySlug
      );
      if (foundCategory) {
        setCategory(foundCategory._id.toString());
      }
    }
  }, [categorySlug, categories]);

  // Fetch subcategories when category changes
  useEffect(() => {
    dispatch(fetchSubCategories(category || null));
  }, [category, dispatch]);

  // Set subcategory from URL slug
  useEffect(() => {
    if (subCategories.length > 0 && subCategorySlug) {
      const foundSubCategory = subCategories.find(
        (sub) => slugify(sub.name) === subCategorySlug
      );
      if (foundSubCategory) {
        setSubCategory(foundSubCategory._id.toString());
      }
    }
  }, [subCategorySlug, subCategories]);

  // Fetch products and update URL when category/subcategory changes
  useEffect(() => {
    const query = {};
    if (category) query.category = category;
    if (subCategory) query.subcategory = subCategory;

    dispatch(fetchProducts(query));

    const params = new URLSearchParams();
    if (category) {
      const catName = categories.find((c) => c._id.toString() === category)?.name;
      if (catName) params.set("category", slugify(catName));
    }
    if (subCategory) {
      const subName = subCategories.find((s) => s._id.toString() === subCategory)?.name;
      if (subName) params.set("subcategory", slugify(subName));
    }

    navigate({ pathname: "/products", search: `?${params.toString()}` }, { replace: true });
  }, [category, subCategory, dispatch, navigate, categories, subCategories]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low") return a.price - b.price;
    if (sortBy === "high") return b.price - a.price;
    return 0;
  });

  if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <BeatLoader
        color="#6B46C1"  // apna brand color
        size={15}         // loader size
        margin={5}        // spacing between dots
      />
    </div>
  );
}


  return (
    <>
      <div className="mx-6">
        <Breadcrumb />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        {/* Filters */}
        <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-lg p-5 space-y-6 border border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaFilter className="text-gray-600" /> Filters
          </h2>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory("");
              }}
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Subcategory
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              disabled={!category}
            >
              <option value="">All</option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Sort By
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Clear */}
          <button
            onClick={() => {
              setCategory("");
              setSubCategory("");
              setSortBy("");
              navigate("/products", { replace: true });
              dispatch(fetchProducts());
              dispatch(fetchSubCategories(null));
            }}
            className="w-full text-center bg-gray-100 hover:bg-gray-200 text-sm rounded-lg py-2 font-medium transition"
          >
            Clear Filters
          </button>
        </div>

        {/* Product List */}
        <div className="w-full lg:w-3/4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                images={product.images}
                sizes={product.sizes}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 mt-10 text-lg">
              No products found with selected filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
