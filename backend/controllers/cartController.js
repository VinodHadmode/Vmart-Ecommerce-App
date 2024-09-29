const { UserModel } = require("../models/userModel")

//add products to user cart
const addToCart = async (req, res) => {
    const { userId, itemId, size } = req.body
    try {
        const userData = await UserModel.findById(userId)
        let cartData = userData.cartData

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

        await UserModel.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: 'Added to cart.' })

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false, message: error.message })
    }
}

//update user cart
const updateUserCart = async (req, res) => {
    const { userId, itemId, size, quantity } = req.body
    try {
        const userData = await UserModel.findById(userId)
        let cartData = userData.cartData

        cartData[itemId][size] = quantity
        await UserModel.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: 'Updated cart.' })

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false, message: error.message })
    }
}

//get user cart data
const getUserCart = async (req, res) => {
    const { userId } = req.body
    try {
        const userData = await UserModel.findById(userId)
        let cartData = userData.cartData

        res.status(200).json({ success: true, cartData })

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false, message: error.message })
    }
}

module.exports = {
    addToCart,
    updateUserCart,
    getUserCart
}