import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ onLogout }) => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-4 bg-gray-900 text-white shadow-md">
      <div>
        <img src={assets.logo} alt="admin panel logo" className="w-32 h-auto bg-white" />
      </div>
      
      <button
        onClick={onLogout}
        className="bg-yellow-400 text-gray-900 px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-yellow-500 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
