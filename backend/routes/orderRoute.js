const express = require('express')
const { adminAuth } = require('../middlewares/adminAuth')
const { allOrders, updateOrderStatus, placeOrderCOD,  userOrders } = require('../controllers/orderController')
const { userAuth } = require('../middlewares/userAuth')

const orderRouter = express.Router()

//admin routes
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateOrderStatus)

//payment routes
orderRouter.post('/place-cod', userAuth, placeOrderCOD)

//order routes
orderRouter.post('/userorders', userAuth, userOrders)

module.exports = {
    orderRouter
}