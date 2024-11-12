const express = require('express');
const { errorResponse, successResponse } = require('../utils/reponseHandler');
const User = require('../users/user.model');
const Order = require('../orders/order.model');
const Reviews = require('../reviews/reviews.model');
const Products = require('../products/products.model');

const router = express.Router();

    router.get("/user-stats/:email",async(req,res) => {
        const {email} = req.params;
        if(!email){
            return errorResponse(res, 400 , "Email is required");
        }
        try {
            const user = await User.findOne({email:email});
            if(!user){
                return errorResponse(res,404 , "User not found" );

            }

            //total payments
            const totalPaymentsResult = await Order.aggregate([
                {$match: {email:email}},
                {$group : {_id: null , totalAmount : {$sum: "$amount"}}}
            ])
            const totalPaymentsAmount = totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount:0

            // total reviews 
            const totalReviews =await Reviews.countDocuments({userId: user._id});
            //console.log(totalReviews)

            const purchasedProducts = await Order.distinct("products.productId",{email:email})
           // console.log(purchasedProducts)

            const totalPurchasedProducts = purchasedProducts.length;

            return successResponse(res, 200 , "fetched user stats successfully",{
                totalPayments:Number(totalPaymentsAmount.toFixed(0))  ,
                totalReviews,
                totalPurchasedProducts
            })


        } catch (error) {
                return errorResponse(res, 500 , "Couldn't get user stats", error)
        }


    })



router.get('/admin-stats', async (req,res)=>{

    try {
        // Count total orders
        const totalOrders = await Order.countDocuments();
    
        // Count total products
        const totalProducts = await Products.countDocuments();
    
        // Count total reviews
        const totalReviews = await Reviews.countDocuments();
    
        // Count total users
        const totalUsers = await User.countDocuments();
    
        // Calculate total earnings by summing the 'amount' of all orders
        const totalEarningsResult = await Order.aggregate([
          {
            $group: {
              _id: null,
              totalEarnings: { $sum: "$amount" },
            },
          },
        ]);
    
        const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;
    
        // Calculate monthly earnings by summing the 'amount' of all orders grouped by month
        const monthlyEarningsResult = await Order.aggregate([
          {
            $group: {
              _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
              monthlyEarnings: { $sum: "$amount" },
            },
          },
          {
            $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
          }
        ]);
    
        // Format the monthly earnings data for easier consumption on the frontend
        const monthlyEarnings = monthlyEarningsResult.map(entry => ({
          month: entry._id.month,
          year: entry._id.year,
          earnings: entry.monthlyEarnings,
        }));
    
        // Send the aggregated data
        res.status(200).json({
          totalOrders,
          totalProducts,
          totalReviews,
          totalUsers,
          totalEarnings, 
          monthlyEarnings, 
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
      }
    });




module.exports = router
