import { createContext, useState } from "react";
import { products } from "../assets/assets"

export const ShopContext = createContext(null)

const ShopContextProvider = ({ children }) => {

    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const currency = "$"
    const delivery_fee = 10

    const contextValue = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider