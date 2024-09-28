import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoPlusCircle } from 'react-icons/go';
import { BsCartCheck, BsCartCheckFill } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-gray-200 text-gray-800 border-r border-gray-300 shadow-lg">
      <div className="flex flex-col gap-6 pt-6 pl-4 md:pl-8 text-[15px]">
        {/* Add Items */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center md:flex-row gap-3 px-4 py-3 rounded-lg bg-yellow-300 text-gray-900'
              : 'flex flex-col items-center md:flex-row gap-3 px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition'
          }
        >
          <GoPlusCircle className="w-8 h-8 md:w-6 md:h-6" />
          <p className="hidden sm:block">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center md:flex-row gap-3 px-4 py-3 rounded-lg bg-yellow-300 text-gray-900'
              : 'flex flex-col items-center md:flex-row gap-3 px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition'
          }
        >
          <BsCartCheck className="w-8 h-8 md:w-6 md:h-6" />
          <p className="hidden sm:block">List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center md:flex-row gap-3 px-4 py-3 rounded-lg bg-yellow-300 text-gray-900'
              : 'flex flex-col items-center md:flex-row gap-3 px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition'
          }
        >
          <BsCartCheckFill className="w-8 h-8 md:w-6 md:h-6" />
          <p className="hidden sm:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
