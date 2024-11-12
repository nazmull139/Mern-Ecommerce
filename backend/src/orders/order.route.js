const express = require('express');
const { makePaymentRequest, confirmPayment, getOrdersByEmail, getOrdersByOrderId, getAllOrders, updateOrderStatus, deleteORdersById } = require('./order.controller');

const router = express.Router();

// create cheackout session
router.post('/create-checkout-session', makePaymentRequest);

// confirm payment 
router.post("/confirm-payment", confirmPayment);

//get orders by email address
router.get("/:email" , getOrdersByEmail);


// get orders by order id

router.get('/order/:id', getOrdersByOrderId);

// get All orders 
router.get("/",getAllOrders);


// update order status
router.patch("/update-order-status/:id",updateOrderStatus);


// delete orders


router.delete("/delete-order/:id", deleteORdersById)


module.exports = router 