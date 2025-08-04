import React from "react";
import { useSelector } from "react-redux";
import { selectAllCategory } from "../redux/slice/categorySlice";
import Title from "./Title";
import { Link } from "react-router-dom";
import slugify from "../utils/slugify";

const CategoriesShow = () => {
  const category = useSelector(selectAllCategory);

 
 

  return (
    <div className="py-8 my-8">
      <div className="text-center mb-4">
        <Title text1={"Categories"} text2={"Section"} />
        <p className="outfit text-gray-400 w-3/4 m-auto text-center">
          Stylish oversized t-shirts crafted from soft cotton blend fabric —
          perfect for a bold, relaxed, and comfortable everyday look.
        </p>
      </div>

      <ul className="flex justify-center gap-4 overflow-x-scroll  overflow-y-hidden scrollbar-hide">
        {category.map((item, index) => (
          <li key={index} className="min-w-[100px] text-center">
            <Link to={`/products?category=${slugify(item.name)}`}>
              <div className="rounded-xl p-3 transition cursor-pointer hover:scale-105">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-60 w-60 mx-auto object-cover rounded-full"
                />
                <p className="mt-2 text-sm font-medium capitalize">
                  {item.name}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesShow;
