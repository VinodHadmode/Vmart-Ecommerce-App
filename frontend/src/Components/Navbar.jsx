import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const dropdownRef = useRef(null);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate('/login')
        setIsDropdownOpen(false)
        localStorage.removeItem('userToken')
        setToken('')
        setCartItems({})
    }

    const handleUserIconClick = () => {
        if (token) {
            setIsDropdownOpen(!isDropdownOpen);
        } else {
            navigate('/login');
        }
    };

    // Close dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    return (
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-4 bg-gray-900 text-white shadow-md relative">

            <div>
                <Link to={"/"}>
                    <img src={assets.vmart_logo} alt="forever" className="w-36 max-h-16 object-contain border-2 border-gray-900 box-border ml-[-24px]" />
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:flex space-x-6">
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition-colors"}
                >
                    HOME
                </NavLink>
                <NavLink
                    to="/collection"
                    className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition-colors"}
                >
                    COLLECTION
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition-colors"}
                >
                    ABOUT
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition-colors"}
                >
                    CONTACT
                </NavLink>
            </div>

            <div className="flex items-center space-x-4">
                <GoSearch onClick={() => setShowSearch(true)} className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition-colors" />

                {/* User Icon with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <FaRegUser
                        className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition-colors"
                        onClick={handleUserIconClick}
                    />

                    {isDropdownOpen && token && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800 z-50">
                            <NavLink
                                to={"/profile"}
                                className="block px-4 py-2 hover:bg-gray-200 rounded-lg"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                My Profile
                            </NavLink>
                            <NavLink
                                to={"/orders"}
                                className="block px-4 py-2 hover:bg-gray-200 rounded-lg"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Orders
                            </NavLink>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Cart Icon with Item Count */}
                <NavLink to="/cart" className="relative flex items-center">
                    <BsCart2 className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition-colors" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
                        {getCartCount()}
                    </span>
                </NavLink>

                {/* Hamburger Menu */}
                <FiMenu onClick={() => setVisibleMenu(true)} className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition-colors sm:hidden" />
            </div>

            {/* Sidebar Menu for Smaller Screens */}
            {visibleMenu && (
                <div className="fixed inset-0 z-50">
                    {/* Overlay to close the menu */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setVisibleMenu(false)}
                    ></div>

                    {/* Sidebar */}
                    <div className="absolute top-0 right-0 h-full w-64 bg-white transition-transform transform translate-x-0">
                        <div className="flex items-center gap-4 p-3 cursor-pointer border-b" onClick={() => setVisibleMenu(false)}>
                            <IoIosArrowBack className="text-black w-6 h-6" />
                            <p className="text-gray-600">BACK</p>
                        </div>

                        <div className="flex flex-col">
                            <NavLink onClick={() => setVisibleMenu(false)} className="block py-3 pl-6 border-b hover:bg-gray-500 text-gray-700" to="/">HOME</NavLink>
                            <NavLink onClick={() => setVisibleMenu(false)} className="block py-3 pl-6 border-b hover:bg-gray-500 text-gray-700" to="/collection">COLLECTION</NavLink>
                            <NavLink onClick={() => setVisibleMenu(false)} className="block py-3 pl-6 border-b hover:bg-gray-500 text-gray-700" to="/about">ABOUT</NavLink>
                            <NavLink onClick={() => setVisibleMenu(false)} className="block py-3 pl-6 border-b hover:bg-gray-500 text-gray-700" to="/contact">CONTACT</NavLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
