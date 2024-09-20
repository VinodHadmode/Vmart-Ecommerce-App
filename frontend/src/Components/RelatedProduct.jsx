import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from "../Components/Title"
import ProductItem from "../Components/ProductItem"

const RelatedProduct = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext)
    const [relatedProduct, setRelatedProducts] = useState()

    useEffect(() => {
        if (products.length > 0) {

            let productCopy = products;
            
            productCopy = products.filter(
                (item) => category === item.category && subCategory === item.subCategory
            );

            setRelatedProducts(productCopy.slice(0, 5))
        }

    }, [category, subCategory, products])

    // console.log("relatedProduct", relatedProduct);

    return relatedProduct && relatedProduct.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                relatedProduct.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }
        </div>
    ) : (
        <div className="text-center">No related products found.</div>
    );

}

export default RelatedProduct
