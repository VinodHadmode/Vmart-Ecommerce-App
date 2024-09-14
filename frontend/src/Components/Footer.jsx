import React from 'react'
import { assets } from "../assets/assets"

const Footer = () => {
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

                <div>
                    <img className="mb-5 w-32" src={assets.logo} alt="logo" />
                    <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo iusto atque ipsum! Atque, architecto sint? Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore velit error, asperiores mollitia maiores voluptates.</p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy-Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+1-212-456-7890</li>
                        <li>contact@forever.gmail.com</li>
                       
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Footer
