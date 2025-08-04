import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllCategory } from "../redux/slice/categorySlice";
import { selectAllSubCategory } from "../redux/slice/subCategorySlice";

const EditProductForm = ({ product }) => {
  const categories = useSelector(selectAllCategory);
  const subCategories = useSelector(selectAllSubCategory);

  const [form, setForm] = useState({
    name: "",
    price: "",
    mrp: "",
    discount: "",
    category: "",
    subcategory: "",
    bestseller: "No",
    sizes: [],
    sku: "",
    
    inventory: "",
    description: "",
    images: [],
  });

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (product) {
      const {
        name,
        price,
        mrp,
        discount,
        category,
        subcategory,
        bestseller,
        sizes,
        sku,
       
        inventory,
        desc,
        images,
        image,
      } = product;

      setForm({
        name: name || "",
        price: price || "",
        mrp: mrp || "",
        discount: discount || "",
        category: category || "",
        subcategory: subcategory || "",
        bestseller: bestseller || "No",
        sizes: sizes || [],
        sku: sku || "",
        inventory: inventory || "",
        description: desc || "",
        images: [], // new uploaded files
      });

      setPreviews(images?.length ? images : image ? [image] : []);

      // Filter subcategories based on existing category
      if (category) {
        const subs = subCategories.filter((sc) => sc.categoryId === category);
        setFilteredSubCategories(subs);
      }
    }
  }, [product, subCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "category") {
      const relatedSubs = subCategories.filter((sub) => sub.categoryId === value);
      setFilteredSubCategories(relatedSubs);

      setForm((prev) => ({
        ...prev,
        category: value,
        subcategory: relatedSubs[0]?.id || "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 2 || files.length > 6) {
      alert("Please select between 2 and 6 images.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      images: files,
    }));

    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => setPreviews(results));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.images.length < 2 || form.images.length > 6) {
      alert("Product must have between 2 and 6 images.");
      return;
    }

    console.log("Updated Product Data: ", form);
    // TODO: Send to backend
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Product Images (2-6)</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className="mt-1"
          />
          <div className="flex flex-wrap gap-3 mt-2">
            {previews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx + 1}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Selling Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">MRP</label>
          <input
            type="number"
            name="mrp"
            value={form.mrp}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Subcategory</label>
          <select
            name="subcategory"
            value={form.subcategory}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          >
            <option value="">Select Subcategory</option>
            {filteredSubCategories.map((subCat) => (
              <option key={subCat.id} value={subCat.id}>
                {subCat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Bestseller</label>
          <select
            name="bestseller"
            value={form.bestseller}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium">Available Sizes</label>
          <div className="flex gap-4 mt-2 flex-wrap">
            {form.sizes.map((size, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 border rounded text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">SKU</label>
          <input
            type="text"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        

        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            name="inventory"
            value={form.inventory}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
            rows={4}
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
