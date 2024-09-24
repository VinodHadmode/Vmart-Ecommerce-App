import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
    return (
        <div className="flex items-center py-3 px-[4%] justify-between bg-gray-900 text-white shadow-md">
            <img className="w-[max(10%,80px)] bg-white" src={assets.logo} alt="Admin Logo" />
            <button className="bg-red-600 hover:bg-red-500 transition px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
                Logout
            </button>
        </div>
    )
}

export default Navbar
