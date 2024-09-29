const express = require('express')
const { getUserCart, addToCart, updateUserCart } = require('../controllers/cartController')
const { userAuth } = require('../middlewares/userAuth')

const cartRouter = express.Router()

cartRouter.post('/get',userAuth, getUserCart)
cartRouter.post('/add',userAuth, addToCart)
cartRouter.post('/update',userAuth, updateUserCart)

module.exports = {
    cartRouter
}