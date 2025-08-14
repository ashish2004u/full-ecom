// models/Product.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
     date: {
      type: Date, // <-- String se Date me change
      required: true,
      default: Date.now, // <-- automatically current date set karega
    },
  },

);

const productSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },
    inventory: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date, // <-- String se Date me change
      required: true,
      default: Date.now, // <-- automatically current date set karega
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
