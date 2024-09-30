import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import CartItem from "../Components/CartItem";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateCartQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);  // Initialize as an empty array
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
    return [];  // Always return an empty array if no products are found
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
           
            <div className="text-center my-10 text-lg font-semibold">
              Your cart is empty.
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

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button 
              onClick={() => navigate('/place-order')}
              className={`bg-black text-white text-sm my-8 px-5 py-3 ${cartData.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
