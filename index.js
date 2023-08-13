const express = require('express');
const DBconnect = require('./config/database');
require('dotenv').config()
const orderRouter = require('./routers/order.routers.js')

const app = express();

app.use(express.json());

app.use('/api', orderRouter)

app.listen(process.env.PORT,() => {
    console.log("Server listening on port " + process.env.PORT);
    DBconnect();
})