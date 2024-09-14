import React from 'react'
import { assets } from '../assets/assets'

const Policy = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
            <div className="hover:scale-105 transition-transform duration-200">
                <img src={assets.exchange_icon} alt="exchange-icon" className="w-12 m-auto mb-5" />
                <p className='font-semibold'>Easy exchange Policy</p>
                <p className='text-gray-400'>We offer hassle free exchange Policy</p>
            </div>

            <div className="hover:scale-105 transition-transform duration-200">
                <img src={assets.quality_icon} alt="exchange-icon" className="w-12 m-auto mb-5" />
                <p className='font-semibold'>7 Days return Policy</p>
                <p className='text-gray-400'>We provide 7 days return Policy</p>
            </div>

            <div className="hover:scale-105 transition-transform duration-200">
                <img src={assets.support_img} alt="exchange-icon" className="w-12 m-auto mb-5" />
                <p className='font-semibold'>Best Customer Support</p>
                <p className='text-gray-400'>We provide 24x7 customre support</p>
            </div>

        </div>
    )
}

export default Policy
