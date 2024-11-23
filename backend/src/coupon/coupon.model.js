const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }], // Tracks users who used this coupon
});

module.exports = mongoose.model("Coupon", couponSchema);



//const Coupon = mongoose.model("Coupon", couponSchema);
//module.exports = Coupon ;