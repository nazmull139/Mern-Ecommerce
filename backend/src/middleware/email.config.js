const express = require('express');
const nodemailer = require('nodemailer')
const router = express.Router();
 const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "fahimmh23@gmail.com",
    pass: "wtra acom kjdo lemg",
  },
})



module.exports = {
transporter
};