const mongoose = require("mongoose");

const orderDetail = new mongoose.Schema({
  symbol: String,
  quantity: Number,
  filled_quantity: Number,
  order_status: String,
  order_tag: String,
});

const order = new mongoose.model("order_detail", orderDetail);

module.exports = order;
