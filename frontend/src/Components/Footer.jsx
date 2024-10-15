import React from 'react';
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <div className="bg-gray-900 text-white px-4 sm:px-6 md:px-8 lg:px-12 py-6">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">

                <div>
                    <img className="w-40 max-h-16 object-contain border-2 border-gray-900 box-border ml-[-24px]" src={assets.vmart_logo} alt="logo" />
                    <p className="mt-10 w-full md:w-2/3 text-gray-400">Vmart was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can explore and purchase a wide range of products from the comfort of their home.</p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-400">
                        <li className="hover:text-yellow-400 cursor-pointer">Home</li>
                        <li className="hover:text-yellow-400 cursor-pointer">About</li>
                        <li className="hover:text-yellow-400 cursor-pointer">Delivery</li>
                        <li className="hover:text-yellow-400 cursor-pointer">Privacy-Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-400">
                        <li className="hover:text-yellow-400 cursor-pointer">+1-212-456-7890</li>
                        <li className="hover:text-yellow-400 cursor-pointer">contact@forever.gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr className="border-gray-700" />
                <p className="py-5 text-center text-gray-500 text-sm">© 2025 Forever.com - All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
