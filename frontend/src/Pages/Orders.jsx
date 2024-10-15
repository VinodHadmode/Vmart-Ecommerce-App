import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const { backendUrl, token, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        let allOrderItems = [];

        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItems.push(item);
          });
        });
        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      console.error("Error loading order data:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="border-t pt-10">
          {/* Title Section */}
          <div className="text-center text-3xl font-semibold text-gray-800 mb-6">
            <Title text1={"MY"} text2={"ORDERS"} />
          </div>

          {/* Orders List */}
          <div className="space-y-8">
            {orderData.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                
                <p className="text-lg mb-2">You have no orders yet.</p>
                <p className="text-lg mb-6">Start shopping and place your first order!</p>
                <button
                  onClick={() => navigate('/collection')}
                  className="bg-black text-white px-8 py-3 mt-3 sm:mt-0 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              orderData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg md:flex md:justify-between md:items-center"
                  >
                    {/* Product Details */}
                    <div className="flex gap-4 items-start">
                      <img
                        className="w-20 h-auto object-cover"
                        src={item.image[0]}
                        alt=""
                      />
                      <div>
                        <p className="text-lg font-medium text-gray-800">
                          {item.name}
                        </p>
                        <div className="flex gap-4 text-sm text-gray-600 mt-1">
                          <p>{currency}{item.price}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Size: {item.size}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Date:{" "}
                          <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Payment Method:{" "}
                          <span className="text-gray-400">{item.paymentMethod}</span>
                        </p>
                      </div>
                    </div>

                    {/* Order Status & Track Button */}
                    <div className="mt-4 md:mt-0 md:flex md:items-center md:gap-4">
                      <div className="m-3 flex items-center gap-2 text-sm text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <p>{item.status}</p>
                      </div>
                      <button
                        onClick={loadOrderData}
                        className="ml-auto border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold transition-colors"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
