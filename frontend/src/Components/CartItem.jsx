import { RiDeleteBin6Line } from "react-icons/ri";


const CartItem = ({ item, productData, currency, updateCartQuantity,handleQuantityChange }) => {
    return (
      <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
        <div className="flex items-start gap-6">
          <img src={productData.image[0]} alt="" className="w-16 sm:w-20" />
          <div>
            <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
            <div className="flex items-center gap-5 mt-2">
              <p>{currency}{productData.price}</p>
              <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
            </div>
          </div>
        </div>
        <input
          onChange={(e) => handleQuantityChange(e, item._id, item.size)}
          className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
          type="number"
          min={1}
          defaultValue={item.quantity}
        />
        <RiDeleteBin6Line
          onClick={() => updateCartQuantity(item._id, item.size, 0)}
          className="w-5 h-5 cursor-pointer hover:text-black"
        />
      </div>
    );
  };

  
  export default CartItem