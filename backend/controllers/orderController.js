const { OrderModel } = require("../models/orderModel")
require('dotenv').config()


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


//Placing orders using PayPal Method
const placeOrderPayPal = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentID, payerID } = req.body;

        // Store the order data
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "PayPal",
            payment: true,  // Payment is confirmed
            paymentID, // PayPal Payment ID
            payerID,  // PayPal Payer ID
            date: Date.now(),
        };

        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        await OrderModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(200).json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
};


//All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const allOrders = await OrderModel.find({})
        res.status(200).json({ success: true, allOrders })

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: true, message: error.message })
    }
}

//user orders data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await OrderModel.find({ userId })
        res.status(200).json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: true, message: error.message })
    }
}

//Update order status from admin panel
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await OrderModel.findByIdAndUpdate(orderId, { status })
        res.status(200).json({ success: true, message: "Status Updated" })

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: true, message: error.message })
    }
}


module.exports = {
    placeOrderCOD,
    placeOrderPayPal,
    allOrders,
    userOrders,
    updateOrderStatus
}