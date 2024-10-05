import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";


const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      let orderItems = []

      for (const items in cartItems) {

        for (const item in cartItems[items]) {

          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items))

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      if (paymentMethod == 'cod') {
        const response = await axios.post(`${backendUrl}/api/order/place-cod`, orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        console.log("response", response);

        if (response.data.success) {
          setCartItems({})
          toast.success(response.data.message)
          navigate('/orders')
        } else {
          toast.error(response.data.message)
        }

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-[80vh] border-t px-5 py-10 bg-gray-50">
      <form onSubmit={handleSubmit} className="container mx-auto flex flex-col sm:flex-row gap-8">

        {/* Left Side - Delivery Information */}
        <div className="flex flex-col w-full sm:max-w-[480px] space-y-6 border p-10">
          <div className="text-2xl">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />

          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="First name"
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              required
            />
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="Last name"
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              required
            />
          </div>

          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            type="email"
            placeholder="Email Address"
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            required
          />
          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            type="text"
            placeholder="Street Name"
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="City"
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              required
            />
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="State"
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="number"
              placeholder="Zip Code"
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              required
            />
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              type="text"
              placeholder="Country"
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              required
            />
          </div>

          <input
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
            type="number"
            placeholder="Phone"
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            required
          />
        </div>

        {/* Right Side - Cart Total & Payment Method */}
        <div className="flex-1 border p-10">
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
                type="submit"
                className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
