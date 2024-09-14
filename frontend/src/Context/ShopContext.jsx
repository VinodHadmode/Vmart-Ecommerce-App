import { createContext } from "react";
import { products } from "../assets/assets"

export const ShopContext = createContext(null)

const ShopContextProvider = ({ children }) => {

    const currency = "$"
    const delivery_fee = 10

    const contextValue = {
        products, currency, delivery_fee
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider