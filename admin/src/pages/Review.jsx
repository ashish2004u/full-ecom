import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../redux/slice/productSlice";
import ReviewDropdown from "../components/ListReview";

const Review = () => {
  const products = useSelector(selectAllProducts);

  return (
    <div>
      <ReviewDropdown products={products} />
    </div>
  );
};

export default Review;
