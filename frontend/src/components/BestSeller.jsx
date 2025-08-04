import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { selectAllProducts } from "../redux/slice/productSlice";
import { useSelector } from "react-redux";

const BestSeller = () => {
  const products = useSelector(selectAllProducts);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  return (
    <div className="mx-6 my-10 mb-20">
      <div className="text-center ">
        <Title text1={"Best"} text2={"Seller"} />
        <p className="outfit text-gray-400 w-3/4 m-auto text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum eos
          repellat facilis pariatur commodi amet in voluptates, ea architecto
          quis doloremque obcaecati dignissimos dolor, incidunt magni, officiis
          voluptatem? Eveniet, ducimus?
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductCard
            key={index}
            id={item.id}
            name={item.name}
            image={item.images[0]}
            price={item.price}
            sizes={item.sizes}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
