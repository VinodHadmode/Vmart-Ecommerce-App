const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { connectCloudinary } = require("./config/cloudinary")
const { userRouter } = require("./routes/userRoute")
const { productRouter } = require("./routes/productRoute")
const { cartRouter } = require("./routes/cartRoute")
const { orderRouter } = require("./routes/orderRoute")
require('dotenv').config()


//App Config
const app = express()
const port = process.env.PORT || 4000

//Middlwares
app.use(express.json())
app.use(cors())

//API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('API Working perfectly!!')
})

//Server
app.listen(port, async () => {
    try {
        await connection
        console.log(`Connected to DB!!`);

        // Cloudinary configuration
        connectCloudinary();

    } catch (error) {
        console.log(error);
        console.log(`Something went wrong while connceting to DB!!`);
    }
    console.log(`Server running at http://localhost:${port}`);
})