import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { LiaOpencart } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { selectAllProducts } from "../redux/slice/productSlice";
import { selectCartItems } from "../redux/slice/cartSlice";
import CategoryLinks from "./CategoryLinks";
import logo from "../assets/logo.png";
import menu from "../assets/menu.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector(selectAllProducts);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector((state) => state.auth.user); // ✅ Redux user

  const totalQty = cartItems.reduce((totalQty, item) => totalQty + item.qty, 0);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (searchVisible) {
      document.body.classList.add("search-active");
    } else {
      document.body.classList.remove("search-active");
    }
  }, [searchVisible]);

  return (
    <nav className="capitalize">
      {/* Top nav */}
      <div className="border-b border-gray-300">
        <div className="flex justify-between py-3 font-medium items-center mx-6">
          <div>
            <ul className="flex items-center gap-3">
              <li><NavLink to=""><FaFacebook className="text-xl" /></NavLink></li>
              <li><NavLink to=""><FaInstagram className="text-xl" /></NavLink></li>
              <li><NavLink to=""><FaWhatsapp className="text-xl" /></NavLink></li>
            </ul>
          </div>
          <div>
            <p className="font-light text-sm hidden md:block text-center">
              style squad is the best clothing brand
            </p>
          </div>
          <div>
            <ul className="flex items-center gap-3">
              <li className="text-sm font-semibold"><NavLink>Contact</NavLink></li>
              <li className="text-sm font-semibold">
                {user ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <NavLink to="/login">Login</NavLink>
                )}
              </li>
              <li className="text-sm font-semibold"><NavLink to="/cart">Cart</NavLink></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-6 py-3 flex justify-between items-center">
        <div><img src={logo} alt="Logo" className="w-15" /></div>

        <div>
          <ul className="flex gap-6 hidden md:flex">
            <CategoryLinks />
          </ul>
        </div>

        <div>
          <ul className="flex gap-4 items-center">
            {/* Search */}
            <li className="relative">
              <button
                onClick={() => setSearchVisible((prev) => !prev)}
                className="text-2xl"
              >
                <CiSearch />
              </button>

              {searchVisible && (
                <div
                  className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.08)] backdrop-blur-sm flex flex-col items-center justify-center"
                  onClick={() => setSearchVisible(false)}
                >
                  <div
                    className="relative w-[90%] max-w-xl border border-gray-200 rounded-md shadow-md bg-white px-4 py-3 flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      placeholder="Type and press enter"
                      className="w-full outline-none text-base text-gray-700"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setSearchVisible(false);
                      }}
                    />
                    <button className="text-xl text-gray-500 hover:text-black ml-2">🔍</button>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="uppercase text-[10px] tracking-widest text-gray-500 mb-2">
                      Browse categories
                    </p>
                    <div className="text-lg md:text-xl font-light space-x-2 text-gray-700 flex flex-wrap justify-center gap-1">
                      <span>Jackets</span> / <span>T-shirts</span> / <span>Handbags</span> /
                      <span>Accessories</span> / <span>Cosmetics</span> / <span>Dresses</span> /
                      <span>Jumpsuits</span>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Account */}
            <li className="relative group text-2xl">
              {user ? (
                <div className="relative group">
                  <MdAccountCircle className="cursor-pointer text-2xl" />
                  <div className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-500 ease-in-out z-50">
                    <NavLink to="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      My Account
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <NavLink to="/login"><MdAccountCircle /></NavLink>
              )}
            </li>

            {/* Cart */}
            <li className="text-2xl relative">
              <NavLink to="/cart">
                <LiaOpencart />
              </NavLink>
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalQty}
              </span>
            </li>

            {/* Mobile menu */}
            <li className="text-2xl block md:hidden">
              <img
                onClick={() => setSidebarVisible(true)}
                src={menu}
                alt="menu"
                className="w-8"
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setSidebarVisible(false)} className="text-xl">&times;</button>
        </div>
        <ul className="flex flex-col gap-4 p-4 font-semibold">
          <CategoryLinks onClick={() => setSidebarVisible(false)} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
