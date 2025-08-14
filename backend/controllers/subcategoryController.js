import SubCategory from "../models/subcategoryModel.js";
import Category from "../models/categoryModel.js"; // Category model for validation

// Add Subcategory
export const addSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ message: "Name and categoryId are required" });
    }

    // Check if category exists (optional but recommended)
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if subcategory with same name exists for this category
    const existing = await SubCategory.findOne({ name, categoryId });
    if (existing) {
      return res.status(409).json({ message: "Subcategory with this name already exists in this category" });
    }

    const newSubCategory = new SubCategory({ name, categoryId });
    await newSubCategory.save();

    res.status(201).json({ message: "Subcategory added", subCategory: newSubCategory });
  } catch (error) {
    console.error("Error in addSubCategory:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all subcategories, optional filter by categoryId
export const getAllSubCategories = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const query = {};
    if (categoryId) {
      query.categoryId = categoryId; // Note: match field name in DB schema
    }

const subCategories = await SubCategory.find(query).populate('categoryId', 'name');

    res.status(200).json({ subCategories });
  } catch (error) {
    console.error("Error in getAllSubCategories:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




// Update subcategory
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (categoryId) {
      // Check if category exists before updating
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found" });
      }
      updatedFields.categoryId = categoryId;
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedSubCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({ message: "Subcategory updated", subCategory: updatedSubCategory });
  } catch (error) {
    console.error("Error in updateSubCategory:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete subcategory
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SubCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({ message: "Subcategory deleted" });
  } catch (error) {
    console.error("Error in deleteSubCategory:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
