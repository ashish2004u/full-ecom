import React from "react";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../redux/slice/productSlice";

const RelatedProduct = ({ currentProduct }) => {
  const products = useSelector(selectAllProducts);

  // Filter only related products (same category, excluding the current one)
  const relatedProducts = products.filter(
    (item) =>
      item.category === currentProduct.category && item.id !== currentProduct.id
  ).slice(0, 5); // Sirf 5 dikhana ho to

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mx-6 mt-10">
      <Title text1="Related" text2="Products" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {relatedProducts.map((item, index) => (
          <ProductCard
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.images[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
