import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ShopContext } from "../Context/ShopContext"
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import RelatedProduct from "../Components/RelatedProduct";

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [productImage, setProductImage] = useState("")
  const [size, setSize] = useState("")

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setProductImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity opacity-100 ease-in duration-500">

      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* ..........product image........ */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData?.image?.map((item, index) => {
                return <img onClick={() => setProductImage(item)} key={index} src={item} alt="" className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" />
              })
            }

          </div>

          <div className="w-full sm:w-[80%]">
            <img src={productImage} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* ........product info....... */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <IoIosStar className="text-yellow-600" />
            <IoIosStar className="text-yellow-600" />
            <IoIosStar className="text-yellow-600" />
            <IoIosStar className="text-yellow-600" />
            <IoIosStarHalf className="text-yellow-600" />
            <p>(120)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency} {productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Sizes</p>
            <div className="flex gap-2">
              {
                productData && productData.sizes.map((item, index) => {
                  return <button key={index} onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-200 ${size === item ? "bg-pink-300" : ""}`} >{item}</button>
                })
              }
            </div>
          </div>

          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 mt-3 sm:mt-0 rounded-lg hover:bg-gray-800 transition-all duration-300">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ..............Description & Review Section.............. */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          <p className="border px-5 py-3 text-sm">Review (120)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-600">
          <p>An ecommerce website is online platform that facilitates buying & selling of products or service over the internet. It servers as virtual market where people can shocase thier buisness or product. People can interact with customers & can also conduct transaction without need of physical presence while buying/selling of product. Ecommerce websites have gained immense popularity because of thier conveniance,accesibility and global reach.</p>
          <p>Ecommerce websites display thier products with images,price,sizes,variation & detailed description of product.Each product have thier own dedicated product page with the relevant information.</p>
        </div>
      </div>

      {/* related products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className="opacity-0"></div>
}

export default Product
