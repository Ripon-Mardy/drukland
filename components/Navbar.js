"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Search, BaggageClaim, UserRound, ShoppingBasket } from "lucide-react";

const Navbar = () => {
  const [menuData, setMenuData] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Simulated API fetch
    const fetchMenu = async () => {
      const apiData = [
        {
          id: 1,
          name: "Business",
          submenu: [
            { id: 1.1, name: "Sub Business 1" },
            { id: 1.2, name: "Sub Business 2" },
          ],
        },
        {
          id: 2,
          name: "Products",
          submenu: [
            { id: 2.1, name: "Sub Products 1" },
            { id: 2.2, name: "Sub Products 2" },
          ],
        },
        {
          id: 3,
          name: "About Us",
        },
      ];
      setMenuData(apiData);
    };
    fetchMenu();
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close dropdown and menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        closeMobileMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white  w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between w-full">
        {/* Logo */}
        <div className="text-3xl font-bold">Drukland.de</div>

        {/* Desktop Menu */}
        <nav
          className="hidden md:flex space-x-6 items-center justify-between"
          ref={dropdownRef}
        >
          {menuData.map((item) => (
            <div key={item.id} className="relative">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="flex items-center space-x-1 text-gray-700 font-medium hover:text-blue-800"
                  >
                    <span>{item.name}</span>
                    <FaChevronDown
                      className={`text-sm transform transition-transform ${
                        activeDropdown === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 bg-white shadow-md rounded-md p-2"
                    >
                      {item.submenu.map((sub) => (
                        <a
                          key={sub.id}
                          href="#"
                          className="block px-4 py-2 w-40 text-gray-600 hover:bg-gray-100"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </>
              ) : (
                <a
                  href="#"
                  className="text-gray-700 font-medium hover:text-blue-800"
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
          <div className="flex items-center gap-1 px-2 p-1 border border-gray-200 rounded-md w-80">
            <Search size={16} />
            <input
              type="text"
              placeholder="search"
              className="outline-none w-full"
            />
          </div>
          <BaggageClaim size={18} />
          <UserRound size={18} />
          <ShoppingBasket size={18} />
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-blue-800 focus:outline-none"
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu with Dark Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <div
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            ></div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg p-4 z-50 md:hidden"
              ref={dropdownRef}
            >
              <nav>
                {menuData.map((item) => (
                  <div key={item.id} className="mb-4">
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.id)}
                          className="flex justify-between items-center w-full text-gray-700 font-medium hover:text-blue-800"
                        >
                          <span>{item.name}</span>
                          <FaChevronDown
                            className={`text-sm transform transition-transform ${
                              activeDropdown === item.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {activeDropdown === item.id && (
                          <div className="mt-2 pl-4">
                            {item.submenu.map((sub) => (
                              <a
                                key={sub.id}
                                href="#"
                                className="block py-1 text-gray-600 hover:text-blue-800"
                              >
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <a
                        href="#"
                        className="block py-2 text-gray-700 font-medium hover:text-blue-800"
                      >
                        {item.name}
                      </a>
                    )}
                  </div>
                ))}

                <div className="flex items-center gap-1 px-2 p-1 border border-gray-200 rounded-md w-80">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="search"
                    className="outline-none w-full"
                  />
                </div>
                <div className="flex items-center mt-4 gap-4">
                <BaggageClaim size={18} />
                <UserRound size={18} />
                <ShoppingBasket size={18} />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
