const { OrderModel } = require("../models/orderModel")
require('dotenv').config()
const braintree = require('braintree')


//braintree configuration
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Generate client token for the frontend
const generateClientToken = async (req, res) => {
    try {
        const response = await gateway.clientToken.generate({});
        res.status(200).json({ success: true, clientToken: response.clientToken });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to generate client token", error });
    }
};

// Process Braintree payment
const processBraintreePayment = async (req, res) => {
    try {
        const { nonce, amount, userId, items, address } = req.body;

        const saleRequest = {
            amount: amount,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true,
            },
        };

        const result = await gateway.transaction.sale(saleRequest);

        if (result.success) {
            
            const orderData = {
                userId,
                items,
                amount,
                address,
                paymentMethod: "Braintree",
                payment: true,
                date: Date.now(),
            };

            const newOrder = new OrderModel(orderData);
            await newOrder.save();

            res.status(200).json({ success: true, message: "Payment successful, order placed", transactionId: result.transaction.id });

        } else {
            res.status(500).json({ success: false, message: "Payment failed", error: result.message });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Payment processing error", error });
    }
}


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
    generateClientToken,
    processBraintreePayment,
    allOrders,
    userOrders,
    updateOrderStatus
}