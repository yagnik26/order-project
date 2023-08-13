const order = require("../model/order.schema");

const placeOrder = async (req, res) => {
  try {
    const { symbol, quantity, order_tag } = req.body;
    if (!(symbol, quantity, order_tag)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const userAuth = req.headers.x_auth_token;
    if (userAuth !== "hududkahjcnkbsdbhajkhgxgeajgwxeknd") {
      return res.status(403).json({
        success: false,
        message: "Only Auther can be placed order",
      });
    }
    const orderDetail = await order.create({
      symbol,
      quantity,
      filled_quantity: 0,
      order_status: "open",
      order_tag,
    });
    // const orderDetail = await order.find();
    return res.status(200).json({
      success: true,
      payload: { order: orderDetail, message: "order create success" },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err_msg: err.message,
    });
  }
};

const modifyOrder = async (req, res) => {
  try {
    const { id, new_quantity } = req.body;
    if (!(id, new_quantity)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const userAuth = req.headers.x_auth_token;
    if (userAuth !== "hududkahjcnkbsdbhajkhgxgeajgwxeknd") {
      return res.status(403).send({
        success: false,
        message: "Only Auther can modify order",
      });
    }
    await order.findByIdAndUpdate(id, {
      quantity: new_quantity,
    });
    const modifyOrderDetail = await order.findById(id);
    return res.status(200).json({
      success: true,
      payload: { order: modifyOrderDetail, message: "order update success"},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err_msg: err.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const userAuth = req.headers.x_auth_token;
    if (userAuth !== "hududkahjcnkbsdbhajkhgxgeajgwxeknd") {
      return res.status(403).send({
        success: false,
        message: "Only Auther can modify order",
      });
    }
    const cancelOrderDetail = await order.findById(id);
    cancelOrderDetail.order_status = "cancel";
    cancelOrderDetail.save();
    return res.status(200).json({
      success: true,
      payload: { order: cancelOrderDetail, message: "order cancel success"},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err_msg: err.message,
    });
  }
};

const orderStatus = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const userAuth = req.headers.x_auth_token;
    if (userAuth !== "hududkahjcnkbsdbhajkhgxgeajgwxeknd") {
      return res.status(403).send({
        success: false,
        message: "Only Auther can modify order",
      });
    }
    const orderDetails = await order.findById(id);
    return res.status(200).send({
      success: true,
      payload: orderDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err_msg: err.message,
    });
  }
};

module.exports = {
  placeOrder,
  modifyOrder,
  cancelOrder,
  orderStatus,
};
