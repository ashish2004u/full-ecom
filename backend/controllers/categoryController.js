import Category from "../models/categoryModel.js";
import cloudinary from "../config/cloudinary.js";

// Add Category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res
        .status(400)
        .json({ message: "All fields are required including image" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Category with this name already exists" }); // message updated
    }

    // Cloudinary image upload
    const imageDataUri = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(imageDataUri, {
      folder: "style_squad/categories",
    });

    const newCategory = new Category({
      name,
      image: result.secure_url, // cloudinary URL
      // date: Date.now(),  <-- agar mongoose schema mein default set kiya hai to yeh hata do
    });

    await newCategory.save();
    res.status(201).json({ message: "Category added", category: newCategory });
  } catch (error) {
    console.error("Error in addCategory:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // MongoDB _id
    const { name } = req.body || {};

    let updatedFields = {};
    if (name) updatedFields.name = name;

    if (req.file) {
      const imageDataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(imageDataUri, {
        folder: "style_squad/categories",
      });
      updatedFields.image = result.secure_url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated", category: updatedCategory });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // MongoDB _id

    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
