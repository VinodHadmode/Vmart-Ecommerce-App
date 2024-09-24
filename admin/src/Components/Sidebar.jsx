import React from 'react'
import { NavLink } from 'react-router-dom'
import { GoPlusCircle } from "react-icons/go";
import { BsCartCheck ,BsCartCheckFill} from "react-icons/bs";

const Sidebar = () => {
    return (
        <div className="w-[18%] min-h-screen bg-gray-100 text-gray-900 border-r border-gray-300">
            <div className="flex flex-col gap-6 pt-6 pl-6 text-[15px] sm:pl-6 md:pl-10">
                
                {/* Add Items */}
                <NavLink to={'/add'} className="flex flex-col items-center md:flex-row gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 transition">
                    <GoPlusCircle className='w-7 h-7 md:w-6 md:h-6 text-gray-600' />
                    <p className="hidden sm:block">Add Items</p>
                </NavLink>

                {/* List Items */}
                <NavLink to={'/list'} className="flex flex-col items-center md:flex-row gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 transition">
                    <BsCartCheck className='w-7 h-7 md:w-6 md:h-6 text-gray-600' />
                    <p className="hidden sm:block">List Items</p>
                </NavLink>

                {/* Orders */}
                <NavLink to={'/orders'} className="flex flex-col items-center md:flex-row gap-3 px-4 py-3 rounded-lg hover:bg-gray-200 transition">
                    <BsCartCheckFill className='w-7 h-7 md:w-6 md:h-6 text-gray-600' />
                    <p className="hidden sm:block">Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar
