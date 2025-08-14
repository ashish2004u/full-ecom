import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategory, fetchCategories } from "../redux/slice/categorySlice";
import slugify from "../utils/slugify";

const CategoryLinks = ({ onClick = () => {} }) => {
  const dispatch = useDispatch();
  const category = useSelector(selectAllCategory);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <li>
        <NavLink to="/" onClick={onClick}>Home</NavLink>
      </li>

      {category.map((cat, index) => (
        <li key={index} onClick={onClick}>
          <NavLink to={`/products?category=${slugify(cat.name)}`}>
            {cat.name}
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
