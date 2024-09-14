import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const ProductItem = ({ id, name, image, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link
            to={`/products/${id}`}
            className="group text-gray-700 cursor-pointer border rounded-lg shadow-lg overflow-hidden"
        >
            {/* Image Section */}
            <div className="w-full h-64 bg-gray-200 flex justify-center items-center overflow-hidden">
                <img
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                    src={image[0]}
                    alt={name}
                />
            </div>

            {/* Product Details */}
            <div className="p-4">
                <p className="pt-3 pb-1 text-sm font-semibold text-gray-800 group-hover:text-yellow-700 transition-colors duration-300">
                    {name}
                </p>
                <p className="text-sm font-medium text-gray-600 group-hover:text-yellow-700 transition-colors duration-300">
                    {currency}{price}
                </p>
            </div>
        </Link>
    );
};

export default ProductItem;
