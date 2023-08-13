const mongoose = require('mongoose')

const DBconnect = async () => {
    try {
        mongoose.connect("mongodb+srv://aa:aa@cluster0.mcaq9tw.mongodb.net/");
        console.log("Database connected successfully");
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = DBconnect