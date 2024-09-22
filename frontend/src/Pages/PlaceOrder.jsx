import { useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] border-t py-10 bg-gray-50">
      <div className="container mx-auto flex flex-col sm:flex-row gap-8">

        {/* Left Side - Delivery Information */}
        <div className="flex flex-col w-full sm:max-w-[480px] space-y-6">
          <div className="text-2xl">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />

          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="First name"
            />
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="Last name"
            />
          </div>

          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            type="email"
            placeholder="Email Address"
          />
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            type="text"
            placeholder="Street Name"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="City"
            />
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="State"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="number"
              placeholder="Zip Code"
            />
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="Country"
            />
          </div>

          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            type="number"
            placeholder="Phone"
          />
        </div>

        {/* Right Side - Cart Total & Payment Method */}
        <div className="flex-1">
          <CartTotal />

          <div className="mt-10">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

            {/* Payment Method Selection */}
            <div className="flex flex-col gap-4 mt-6">
              <div
                onClick={() => setPaymentMethod("stripe")}
                className={`flex items-center gap-4 border rounded-md p-3 cursor-pointer ${paymentMethod === "stripe" ? "border-green-400" : ""
                  }`}
              >
                <span
                  className={`w-4 h-4 border rounded-full ${paymentMethod === "stripe" ? "bg-green-400" : ""
                    }`}
                ></span>
                <img
                  className="h-5"
                  src={assets.stripe_logo}
                  alt="Stripe Logo"
                />
              </div>

              <div
                onClick={() => setPaymentMethod("razorpay")}
                className={`flex items-center gap-4 border rounded-md p-3 cursor-pointer ${paymentMethod === "razorpay" ? "border-green-400" : ""
                  }`}
              >
                <span
                  className={`w-4 h-4 border rounded-full ${paymentMethod === "razorpay" ? "bg-green-400" : ""
                    }`}
                ></span>
                <img
                  className="h-5"
                  src={assets.razorpay_logo}
                  alt="Razorpay Logo"
                />
              </div>

              <div
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-4 border rounded-md p-3 cursor-pointer ${paymentMethod === "cod" ? "border-green-400" : ""
                  }`}
              >
                <span
                  className={`w-4 h-4 border rounded-full ${paymentMethod === "cod" ? "bg-green-400" : ""
                    }`}
                ></span>
                <p className="text-sm font-medium text-gray-600">
                  Cash on Delivery
                </p>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="text-right mt-10">
              <button
                onClick={() => navigate("/orders")}
                className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
