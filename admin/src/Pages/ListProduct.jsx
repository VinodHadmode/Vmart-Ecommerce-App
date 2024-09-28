import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";

const ListProduct = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-2">
      <p className="mb-4 text-lg font-semibold">All Products</p>
      <div>
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border-b bg-gray-100 text-sm font-medium">
          <span className="">Image</span>
          <span className="">Name</span>
          <span className="">Category</span>
          <span className="">Price</span>
          <span className="">Action</span>
        </div>

        {/* Product List */}
        {list && list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 border-b text-sm hover:bg-gray-50 transition-all duration-150"
          >
            <img className="w-16 h-16 object-cover rounded" src={item.image[0]} alt={item.name} />
            <p className="truncate">{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>

            {/* Action (Delete) */}
            <div className="text-right md:text-center">
              <RiDeleteBin6Line
                onClick={() => removeProduct(item._id)}
                className="cursor-pointer text-red-600 hover:text-red-800 text-xl transition-colors duration-150"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
