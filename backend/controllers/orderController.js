const { OrderModel } = require("../models/orderModel")

//Placing orders using COD Method
const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save()

        await OrderModel.findByIdAndUpdate(userId, { cartData: {} })
        res.status(200).json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: true, message: error.message })
    }
}

//Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {

}

//Placing orders using Razorpay Method
const placeOrderRazorPay = async (req, res) => {

}

//All orders data for admin panel
const allOrders = async () => {

}

//user orders data for frontend
const userOrders = async () => {

}

//Update order status from admin panel
const updateOrderStatus = async () => {

}

module.exports = {
    placeOrderCOD,
    placeOrderStripe,
    placeOrderRazorPay,
    allOrders,
    userOrders,
    updateOrderStatus
}