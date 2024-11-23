const express = require("express");
const Coupon = require("./coupon.model");
const User = require("../users/user.model");
 // Path to the Coupon model
const router = express.Router();

// Create a coupon

const createACoupon = async (req, res) => {
    const { code, discount, expiryDate } = req.body;
    try {
        const newCoupon = new Coupon({
            code,
            discount,
            expiryDate,
            usedBy: [], // Initially empty
        });
        await newCoupon.save();
        res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
    } catch (error) {
        console.error("Error creating coupon:", error.message);
        res.status(400).json({ error: error.message });
    }
};


{/*
const createACoupon = async (req,res)=> {
           
    try {
        const newCoupon = new Coupon({ 
            ...req.body
         });
        await newCoupon.save();


        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


////////////////

    const createACoupon = async (req,res)=> {
    const { code, discount, expiryDate } = req.body;
    try {
        const newCoupon = new Coupon({ code, discount, expiryDate });
        await newCoupon.save();
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

    /////////////////////////
router.post("/coupon", async (req, res) => {
    const { code, discount, expiryDate } = req.body;
    try {
        const newCoupon = new Coupon({ code, discount, expiryDate });
        await newCoupon.save();
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
*/}





// Validate a coupon

const validateACoupon = async (req, res) => {
    const { code } = req.body;
    const userId= req.userId; // Assuming `req.user` contains the authenticated user's data

    try {
        const coupon = await Coupon.findOne({ code });
        if (!coupon) return res.status(404).json({ error: "Coupon not found" });
        if (new Date() > coupon.expiryDate)
            return res.status(400).json({ error: "Coupon expired" });
        if (coupon.usedBy.includes(userId))
            return res.status(400).json({ error: "Coupon already used by this user",userId });

        res.status(200).json({ valid: true, discount: coupon.discount , userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



{/* 
const validateACoupon = async (req, res) => {
    const { code } = req.body;
    try {
        const coupon = await Coupon.findById({ code });
        if (!coupon) return res.status(404).json({ error: "Coupon not found" });
        if (coupon.used) return res.status(400).json({ error: "Coupon already used" });
        if (new Date() > coupon.expiryDate)
            return res.status(400).json({ error: "Coupon expired" });

        res.status(200).json({ valid: true, discount: coupon.discount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/}



// Use a coupon
const useACoupon = async (req, res) => {
    const { code } = req.body;
    const userId = req.userId;

    try {
        const coupon = await Coupon.findOne({
            code,
            expiryDate: { $gte: new Date() },
        });

        if (!coupon) {
            return res.status(404).json({ error: "Coupon not found or expired" });
        }

        if (coupon.usedBy.includes(userId)) {
            return res.status(400).json({ error: "Coupon already used by this user" });
        }

        // Return coupon details without updating `usedBy`
        res.status(200).json({
            success: true,
            code: coupon.code,
            message: "Coupon is valid",
            discount: coupon.discount,
        });
    } catch (error) {
        console.error("Error in useACoupon:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

{/* newest one 
const useACoupon = async (req, res) => {
    const { code } = req.body;
    const userId= req.userId;

    try {
        
        // Log the input data
       // console.log("User ID:", userId);
       // console.log("Coupon Code:", code);

        // Fetch the coupon
        const coupon = await Coupon.findOne({
            code,
            expiryDate: { $gte: new Date() },
        });
        const user = await User.findById(userId);
        //console.log("user",user)

        if (!coupon) {
            return res.status(404).json({ error: "Coupon not found or expired" });
        }
       // console.log("Updated usedBy before save:", userId);
      //console.log("Fetched Coupon:", coupon);

        // Check if user already used this coupon
        if (coupon.usedBy.includes(userId) ) {
            return res.status(400).json({ error: "Coupon already used by this user" });
        }

        // Update the `usedBy` field
         coupon.usedBy.push(userId);

        await coupon.save();

        // Send a success response
        res.status(200).json({
            success: true,
            code:coupon.code,
            message: "Coupon used successfully",
            discount: coupon.discount,
        });
    } catch (error) {
        console.error("Error in useACoupon:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
 */}
{/*  
const useACoupon = async (req, res) => {
    const { code } = req.body;
    const userId = req.params._id; 

    try {
        const coupon = await Coupon.findOne({
            code,
            expiryDate: { $gte: new Date() }
        });

        if (!coupon) return res.status(404).json({ error: "Coupon not found or expired" });
        if (coupon.usedBy.includes(userId))
            return res.status(400).json({ error: "Coupon already used by this user" });

        coupon.usedBy.push(userId);
        await coupon.save();

        res.status(200).json({ success: true, coupon });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/}

{/*  
const useACoupon = async (req, res) => {
    const { code } = req.body;
    try {
        const coupon = await Coupon.findOneAndUpdate(
            { code, used: false, expiryDate: { $gte: new Date() } },
            { used: true },
            { new: true }
        );
        if (!coupon) return res.status(404).json({ error: "Coupon invalid or already used" });
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/}
module.exports = router;

module.exports={createACoupon , validateACoupon , useACoupon}
