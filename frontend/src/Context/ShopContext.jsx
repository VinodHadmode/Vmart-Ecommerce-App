import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axios from 'axios'

export const ShopContext = createContext(null)

const ShopContextProvider = ({ children }) => {

    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const currency = "$"
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select product size!')
            return
        }

        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        setCartItems(cartData)

        if (token) {
            try {
                const response = await axios.post(`${backendUrl}/api/cart/add`, { itemId, size },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                )

                if (response.data.success) {
                    toast.success('Item added into cart!!')
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        return totalCount
    }

    const updateCartQuantity = async (itemId, size, quantity) => {
        const updatedCartItems = structuredClone(cartItems);

        if (updatedCartItems[itemId]) {
            updatedCartItems[itemId][size] = quantity;
            setCartItems(updatedCartItems);
        }

        if (token) {
            try {
                const response = await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                )

                if (response.data.success) {
                    toast.success('updated cart!!')
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    };


    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);

            if (itemInfo) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
            }
        }

        return totalAmount;
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )

            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const contextValue = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateCartQuantity, getCartAmount,
        backendUrl,
        navigate,
        token, setToken
    }

    const getProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)

            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('userToken')) {
            setToken(localStorage.getItem('userToken'))
            getUserCart(localStorage.getItem('userToken'))
        }
    }, [])

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider