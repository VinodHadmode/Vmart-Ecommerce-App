import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="border-t pt-10">
          {/* Title Section */}
          <div className="text-center text-3xl font-semibold text-gray-800 mb-6">
            <Title text1={'MY'} text2={'ORDERS'} />
          </div>

          {/* Orders List */}
          <div className="space-y-8">
            {products &&
              products.slice(1, 4).map((item, index) => {
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
                        <div className="flex gap-4 text-sm text-gray-600 mt-2">
                          <p className="font-semibold">
                            {currency}
                            {item.price}
                          </p>
                          <p>Quantity: 1</p>
                          <p>Size: M</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Date:{" "}
                          <span className="text-gray-400">25, Jul, 2024</span>
                        </p>
                      </div>
                    </div>

                    {/* Order Status & Track Button */}
                    <div className="mt-4 md:mt-0 md:flex md:items-center md:gap-4">
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <p>Ready to Ship</p>
                      </div>
                      <button className="ml-auto border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-semibold transition-colors">
                        Track Order
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
