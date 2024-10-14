import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-4 bg-gray-900 text-white shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <img 
          src={assets.vmart_logo} 
          alt="admin panel logo" 
          className="w-36 max-h-16 object-contain border-2 border-gray-900 box-border ml-[-24px]" 
        />
      </Link>
      </div>

      {/* Middle: Admin Panel Text */}
      <div className="text-center">
        <h1 className="text-xl font-bold sm:text-2xl">Admin Panel</h1>
      </div>

      {/* Right: Logout Button */}
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
