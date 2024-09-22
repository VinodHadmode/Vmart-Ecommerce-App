import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <div className="text-center px-4 py-10">
            <p className="text-2xl font-semibold text-gray-800">Subscribe Now & get 20% Off</p>
            <p className="text-gray-500 mt-2">Stay updated with our latest news and offers. Sign up for our newsletter.</p>

            <form onSubmit={onSubmitHandler} className="w-full sm:w-2/3 lg:w-1/2 flex flex-col sm:flex-row items-center gap-3 mx-auto my-6 border rounded-lg p-2 shadow-md">
                <input 
                    className="w-full sm:flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400" 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                />
                <button 
                    type="submit" 
                    className="bg-black text-white px-8 py-3 mt-3 sm:mt-0 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    )
}

export default NewsLetterBox;
