const express = require('express')
const { adminAuth } = require('../middlewares/adminAuth')
const { allOrders, updateOrderStatus, placeOrderCOD, placeOrderStripe, placeOrderRazorPay, userOrders, placeOrderPaypal, generateClientToken, processBraintreePayment } = require('../controllers/orderController')
const { userAuth } = require('../middlewares/userAuth')

const orderRouter = express.Router()

//admin routes
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateOrderStatus)

//payment routes
orderRouter.post('/place-cod', userAuth, placeOrderCOD)
orderRouter.get('/braintree/token', userAuth, generateClientToken); 
orderRouter.post('/place-braintree', userAuth, processBraintreePayment); 

//order routes
orderRouter.post('/userorders', userAuth, userOrders)

module.exports = {
    orderRouter
}