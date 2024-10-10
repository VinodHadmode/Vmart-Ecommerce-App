import React, { useEffect, useState } from 'react';
import axios from "axios";
import { backendUrl, currency } from '../App';
import { toast } from "react-toastify";
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.allOrders.reverse());
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOrderStatus = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-2xl font-semibold text-gray-800 mb-8">Orders</h3>

        {/* Orders List */}
        <div className="space-y-6">
          {orders?.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-5 items-start bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-5 rounded-lg border border-gray-200"
            >
              {/* Order Icon */}
              <img className="w-12 h-auto" src={assets.parcel_icon} alt="Parcel Icon" />

              {/* Order Details */}
              <div>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-gray-700 text-sm">
                      {item.name} x {item.quantity} <span className="text-gray-500">({item.size})</span>
                      {idx !== order.items.length - 1 && <span className="text-gray-400">,</span>}
                    </p>
                  ))}
                </div>
                <div className="mt-4 text-gray-800">
                  <p className="font-medium text-md">{`${order?.address?.firstName} ${order?.address?.lastName}`}</p>
                  <p className="text-sm text-gray-600">{`${order?.address?.street}, ${order?.address?.city}, ${order?.address?.state}, ${order?.address?.country}, ${order?.address?.zipcode}`}</p>
                  <p className="text-sm text-gray-600">{`${order?.address?.phone}`}</p>
                </div>
              </div>

              {/* Payment and Date Info */}
              <div className="space-y-2">
                <p className="text-gray-600">Items: {order?.items.length}</p>
                <p className="text-gray-600">Payment Method: <span className="font-medium">{order.paymentMethod}</span></p>
                <p className="text-gray-600">
                  Payment: <span className={order.payment ? 'text-green-600' : 'text-red-600'}>{order.payment ? 'Done' : 'Pending'}</span>
                </p>
                <p className="text-gray-500 text-sm">Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Order Amount */}
              <p className="text-lg font-semibold text-gray-800">
                {currency}{order.amount.toFixed(2)}
              </p>

              {/* Order Status Dropdown */}
              <select
                onChange={(e) => handleOrderStatus(e, order._id)}
                value={order.status}
                className="px-3 py-2 border border-gray-300 bg-white rounded-md text-gray-600 text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
