import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCategory } from "../redux/slice/categorySlice";
import slugify from "../utils/slugify";

const CategoryLinks = ({ onClick = () => {} }) => {
  const category = useSelector(selectAllCategory);

  // const uniqueCategories = [...new Set(products.map((item) => item.category))];

  return (
    <>
      <li>  
        <NavLink to="/">Home</NavLink>
      </li>
      {category.map((category, index) => (
        <li key={index} onClick={onClick}>
          <NavLink to={`/products?category=${slugify(category.name)}`}>
            {category.name}
          </NavLink>
        </li>
      ))}
      <li onClick={onClick}>
        <NavLink to="/about">About</NavLink>
      </li>
      <li onClick={onClick}>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );
};

export default CategoryLinks;
