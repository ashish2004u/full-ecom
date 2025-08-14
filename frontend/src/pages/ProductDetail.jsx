import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectAllProducts,
  fetchProductById,
  selectSelectedProduct
} from "../redux/slice/productSlice";
import MainProductCard from "../components/MainProductCard";
import slugify from "../utils/slugify";
import Breadcrumb from "../components/BreadCrumb";
import Review from "../components/Review";
import RelatedProduct from "../components/RelatedProduct";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const selectedProduct = useSelector(selectSelectedProduct);

  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    const found = products.find(
      (item) => slugify(item.name) === slug
    );

    if (found) {
      dispatch(fetchProductById(found._id));
    }
  }, [slug, products, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!selectedProduct) {
    return (
      <div className="text-center text-red-500 font-semibold py-10">
        Loading product...
      </div>
    );
  }

  return (
    <>
      <div className="mx-6">
        <Breadcrumb />
      </div>

      <MainProductCard
        key={selectedProduct._id}
        id={selectedProduct._id}
        name={selectedProduct.name}
        desc={selectedProduct.desc}
        images={selectedProduct.images}
        price={selectedProduct.price}
        sizes={selectedProduct.sizes}
      />

      <Review productId={selectedProduct._id} />
      <RelatedProduct currentProduct={selectedProduct} />
    </>
  );
};

export default ProductDetail;
