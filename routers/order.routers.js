const { placeOrder, modifyOrder, cancelOrder, orderStatus } = require('../controllers/order.controllers');

const router = require('express').Router();

router.post('/order-service', placeOrder)
router.put('/order-service', modifyOrder)
router.delete('/order-service', cancelOrder)
router.post('/order-service/status', orderStatus)

module.exports = router;