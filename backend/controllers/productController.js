import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import Category from "../models/categoryModel.js";
import SubCategory from "../models/subcategoryModel.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      desc,
      sizes,
      price,
      category,
      subcategory,
      sku,
      inventory,
      bestseller,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !desc ||
      !sizes ||
      !price ||
      !category ||
      !subcategory ||
      !sku ||
      !inventory
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Parse sizes JSON string
    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes);
      if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
        return res.status(400).json({ message: "Sizes must be a non-empty array." });
      }
    } catch {
      return res.status(400).json({ message: "Sizes must be a valid JSON array." });
    }

    // Check images
    if (!req.files || req.files.length < 2 || req.files.length > 5) {
      return res.status(400).json({ message: "Please upload 2 to 5 images." });
    }

    // SKU unique check
    const existingSKU = await Product.findOne({ sku });
    if (existingSKU) {
      return res.status(409).json({ message: "Product with this SKU already exists." });
    }

    // Validate category and subcategory
    const categoryExists = await Category.findById(category);
    const subcategoryExists = await SubCategory.findById(subcategory);
    if (!categoryExists || !subcategoryExists) {
      return res.status(404).json({ message: "Category or Subcategory not found." });
    }

    // Upload images
    const uploadPromises = req.files.map((file) => {
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      return cloudinary.uploader.upload(dataUri, { folder: "style_squad/products" });
    });
    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map((r) => r.secure_url);

    // Save product
    const newProduct = new Product({
      name,
      desc,
      sizes: parsedSizes,
      images: imageUrls,
      price,
      category,
      subcategory,
      sku,
      inventory,
      bestseller: bestseller || false,
      date: Date.now(),
    });
    await newProduct.save();

    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      desc,
      sizes,
      price,
      category,
      subcategory,
      sku,
      inventory,
      bestseller,
      oldImages,
    } = req.body;

    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (desc) updatedFields.desc = desc;

    // Parse sizes array safely
    if (sizes) {
      try {
        const parsedSizes = JSON.parse(sizes);
        if (!Array.isArray(parsedSizes)) {
          return res.status(400).json({ message: "Sizes must be an array." });
        }
        updatedFields.sizes = parsedSizes;
      } catch {
        return res.status(400).json({ message: "Invalid sizes format." });
      }
    }

    // Convert price and inventory to numbers if provided
    if (typeof price !== "undefined") {
      const parsedPrice = Number(price);
      if (isNaN(parsedPrice)) {
        return res.status(400).json({ message: "Invalid price value." });
      }
      updatedFields.price = parsedPrice;
    }

    if (category) {
      const catExists = await Category.findById(category);
      if (!catExists) {
        return res.status(404).json({ message: "Category not found" });
      }
      updatedFields.category = category;
    }

    if (subcategory) {
      const subCatExists = await SubCategory.findById(subcategory);
      if (!subCatExists) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      updatedFields.subcategory = subcategory;
    }

    if (sku) {
      // Check SKU uniqueness except this product
      const existingSKU = await Product.findOne({ sku, _id: { $ne: id } });
      if (existingSKU) {
        return res.status(409).json({ message: "SKU already exists." });
      }
      updatedFields.sku = sku;
    }

    // Convert inventory to number if provided
    if (typeof inventory !== "undefined") {
      const parsedInventory = Number(inventory);
      if (isNaN(parsedInventory)) {
        return res.status(400).json({ message: "Invalid inventory value." });
      }
      updatedFields.inventory = parsedInventory;
    }

    // Bestseller might come as boolean or string
    if (typeof bestseller !== "undefined") {
      updatedFields.bestseller =
        bestseller === true || bestseller === "true" || bestseller === 1 || bestseller === "1"
          ? true
          : false;
    }

    // Parse oldImages safely
    let existingImages = [];
    if (oldImages) {
      try {
        existingImages = JSON.parse(oldImages);
        if (!Array.isArray(existingImages)) {
          return res.status(400).json({ message: "oldImages must be an array." });
        }
      } catch {
        return res.status(400).json({ message: "Invalid oldImages format." });
      }
    }

    // Handle images upload
    if (req.files && req.files.length > 0) {
      if (req.files.length < 1 || req.files.length > 5) {
        return res.status(400).json({ message: "Upload 1 to 5 images." });
      }

      // Upload each file to Cloudinary
      const uploadPromises = req.files.map((file) => {
        const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        return cloudinary.uploader.upload(dataUri, { folder: "style_squad/products" });
      });
      const results = await Promise.all(uploadPromises);

      // Combine old + new images URLs
      updatedFields.images = [...existingImages, ...results.map((r) => r.secure_url)];
    } else {
      // No new images, keep old ones
      updatedFields.images = existingImages;
    }

    // Update the product in DB
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ success: true, message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET ALL PRODUCTS (with optional filtering by category or bestseller)
export const getAllProducts = async (req, res) => {
  try {
    const { category, bestseller } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (bestseller) filter.bestseller = bestseller === "true";

    const products = await Product.find(filter)
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// GET SINGLE PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      product: product // yeh important hai
    });
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

