const express = require('express')
const { adminAuth } = require('../middlewares/adminAuth')
const { allOrders, updateOrderStatus, placeOrderCOD, placeOrderStripe, placeOrderRazorPay, userOrders } = require('../controllers/orderController')
const { userAuth } = require('../middlewares/userAuth')

const orderRouter = express.Router()

//admin routes
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateOrderStatus)

//payment routes
orderRouter.post('/place-cod', userAuth, placeOrderCOD)
orderRouter.post('/place-stripe', userAuth, placeOrderStripe)
orderRouter.post('/place-razorpay', userAuth, placeOrderRazorPay)

//order routes
orderRouter.post('/userorders', userAuth, userOrders)

module.exports = {
    orderRouter
}