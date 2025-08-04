import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectAllProducts } from "../redux/slice/productSlice";
import MainProductCard from "../components/MainProductCard";
import slugify from "../utils/slugify";
import Breadcrumb from "../components/BreadCrumb";
import Review from "../components/Review";
import RelatedProduct from "../components/RelatedProduct";

const ProductDetail = () => {
  const products = useSelector(selectAllProducts);
  const [searchParams] = useSearchParams();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const productNameSlug = searchParams.get("name");


  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional: makes it smooth
    });
  }, [productNameSlug]); // Triggered whenever name changes


  useEffect(() => {
    const found = products.find(
      (item) => slugify(item.name) === productNameSlug
    );
    setSelectedProduct(found);
  }, [productNameSlug, products]); // IMPORTANT: react to param changes

  if (!selectedProduct) {
    return (
      <div className="text-center text-red-500 font-semibold py-10">
        Product not found!
      </div>
    );
  }

  return (
    <>
      <div className="mx-6">
        <Breadcrumb />
      </div>

      <MainProductCard
        key={selectedProduct.id} // ✅ force full re-render of component
        id={selectedProduct.id}
        name={selectedProduct.name}
        desc={selectedProduct.desc}
        images={selectedProduct.images}
        price={selectedProduct.price}
        sizes={selectedProduct.sizes}
      />

      <Review />
      <RelatedProduct currentProduct={selectedProduct} />
    </>
  );
};

export default ProductDetail;
