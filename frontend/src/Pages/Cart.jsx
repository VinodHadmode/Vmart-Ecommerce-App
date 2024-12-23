import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import CartItem from "../Components/CartItem";
import CartTotal from "../Components/CartTotal";
import { BsCartX } from "react-icons/bs";

const Cart = () => {
  const { products, currency, cartItems, updateCartQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const handleQuantityChange = (e, itemId, size) => {
    const newQuantity = Number(e.target.value);

    if (newQuantity > 0) {
      updateCartQuantity(itemId, size, newQuantity);
    }
  };

  const buildCartData = (cartItems) => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            tempData.push({
              _id: items,
              size: size,
              quantity: cartItems[items][size],
            });
          }
        }
      }
      return tempData;
    }
    return [];
  };

  useEffect(() => {
    setCartData(buildCartData(cartItems));
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData && cartData.length === 0 ? (

            <div className="flex flex-col items-center justify-center my-20">
              <BsCartX className="text-7xl text-gray-500 mb-4" /> {/* Empty cart icon */}
              <p className="text-xl font-semibold text-gray-600 mb-4">
                Your cart is empty.
              </p>
              <button
                onClick={() => navigate('/collection')}
                className="bg-black text-white px-8 py-3 mt-3 sm:mt-0 rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>

          ) : (

            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <CartItem
                  key={index}
                  item={item}
                  productData={productData}
                  currency={currency}
                  updateCartQuantity={updateCartQuantity}
                  handleQuantityChange={handleQuantityChange}
                />
              );
            })
          )
        }
      </div>

      <div className="flex justify-end my-20 mt-30">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate('/place-order')}
              className={`bg-black text-white text-sm my-8 px-5 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 ${cartData.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={cartData.length === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
