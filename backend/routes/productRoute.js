const express = require("express")
const { listProduct, addProduct, removeProduct, singleProduct } = require("../controllers/productController")
const { upload } = require("../middlewares/multer")

const productRouter = express.Router()

productRouter.get('/list', listProduct)
productRouter.post('/add', upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 }]), addProduct)
productRouter.post('/remove', removeProduct)
productRouter.post('/single', singleProduct)


module.exports = {
    productRouter
}