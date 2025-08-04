// components/Breadcrumb.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  // Break path: "/products/black-oversized-tshirt" => ["products", "black-oversized-tshirt"]
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 mb-4 px-4">
      <ul className="flex space-x-2 items-center flex-wrap">
        <li>
          <Link to="/" className="hover:underline text-blue-600">Home</Link>
        </li>

        {pathnames.map((segment, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          
          // Capitalize and convert slug to normal text
          const displayName = decodeURIComponent(segment)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <li key={routeTo} className="flex items-center space-x-2">
              <span>/</span>
              <Link to={routeTo} className="hover:underline text-blue-600">
                {displayName}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
