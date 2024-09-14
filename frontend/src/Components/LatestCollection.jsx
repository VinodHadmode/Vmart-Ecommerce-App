import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const [latestProducts, setLatestProducts] = useState([])
    const { products } = useContext(ShopContext)

    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [])

    // console.log(latestProducts);

    return (
        <div className="my-10">
            <div className="text-center py-7 text-3xl">
                <Title text1={"LATEST"} text2={"COLLECTION"} />
                <p className="text-gray-600 w-3/4 m-auto text-xs sm:text-sm md:text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, veritatis officia ipsum quasi dignissimos totam mollitia nesciunt quae aperiam ad.</p>
            </div>

            {/* Rendering latest products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
                {latestProducts && latestProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))}
            </div>

        </div>
    )
}

export default LatestCollection
