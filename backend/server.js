const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
require('dotenv').config()


//App Config
const app = express()
const port = process.env.PORT || 4000

//Middlwares
app.use(express.json())
app.use(cors())

//API endpoints
app.get('/', (req, res) => {
    res.send('API Working perfectly!!')
})

//Server
app.listen(port, async () => {
    try {
        await connection
        console.log(`Connected to DB!!`);
    } catch (error) {
        console.log(error);
        console.log(`Something went wrong while connceting to DB!!`);
    }
    console.log(`Server running at http://localhost:${port}`);
})