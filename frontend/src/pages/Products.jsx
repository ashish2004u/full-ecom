  import React, { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import { useLocation, useNavigate } from "react-router-dom";
  import { selectAllProducts } from "../redux/slice/productSlice";
  import { selectAllCategory } from "../redux/slice/categorySlice";
  import { selectAllSubCategory } from "../redux/slice/subCategorySlice";
  import ProductCard from "../components/ProductCard";
  import { FaFilter } from "react-icons/fa";
  import slugify from "../utils/slugify";
import Breadcrumb from "../components/BreadCrumb";
import {ClimbingBoxLoader} from 'react-spinners'

  const Products = () => {
    const products = useSelector(selectAllProducts);
    const categories = useSelector(selectAllCategory);
    const subCategories = useSelector(selectAllSubCategory);

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const categorySlug = searchParams.get("category");
    const subCategorySlug = searchParams.get("subcategory");

    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    

    // Set category & subcategory from slug on mount
    useEffect(() => {
      if (categories.length > 0) {
        const foundCategory = categories.find(
          (cat) => slugify(cat.name) === categorySlug
        );
        if (foundCategory) {
          setCategory(foundCategory.id);
        }
      }
    }, [categorySlug, categories]);

    useEffect(() => {
      if (subCategories.length > 0) {
        const foundSubCategory = subCategories.find(
          (sub) => slugify(sub.name) === subCategorySlug
        );
        if (foundSubCategory) {
          setSubCategory(foundSubCategory.id);
        }
      }
    }, [subCategorySlug, subCategories]);




    // Update URL when category or subcategory changes
    useEffect(() => {
      const params = new URLSearchParams();
      if (category) {
        const catName = categories.find((c) => c.id === category)?.name;
        if (catName) {
          params.set("category", slugify(catName));
        }
      }

      if (subCategory) {
        const subName = subCategories.find((s) => s.id === subCategory)?.name;
        if (subName) {
          params.set("subcategory", slugify(subName));
        }
      }

      navigate({ pathname: "/products", search: `?${params.toString()}` });
    }, [ subCategory,category]);

    // Filter subcategories based on selected category
    const filteredSubCategories = subCategories.filter(
      (sub) => !category || sub.categoryId === category
    );

    // Filter and sort products
    const filteredProducts = products
      .filter((product) => !category || product.category === category)
      .filter((product) => !subCategory || product.subcategory === subCategory)
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        return 0;
      });


        // 👇 Show loader if data is not yet loaded
  if (!products.length || !categories.length || !subCategories.length) {
    return <ClimbingBoxLoader />
;
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

          {/* Category Filter */}
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
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
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
              {filteredSubCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
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

          {/* Clear Filters */}
          <button
            onClick={() => {
              setCategory("");
              setSubCategory("");
              setSortBy("");
              navigate("/products");
            }}
            className="w-full text-center bg-gray-100 hover:bg-gray-200 text-sm rounded-lg py-2 font-medium transition"
          >
            Clear Filters
          </button>
        </div>

        {/* Product List */}
        <div className="w-full lg:w-3/4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images[0]}
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
