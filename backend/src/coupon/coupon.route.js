const express = require('express');
const { createACoupon, validateACoupon, useACoupon } = require('./coupon.controller');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();


router.post("/create-coupon",verifyToken,verifyAdmin, createACoupon);

router.post("/validate",verifyToken, validateACoupon);

router.patch("/use",verifyToken, useACoupon)

module.exports = router 