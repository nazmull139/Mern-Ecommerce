const couponModel = require("../coupon/coupon.model");
const { BASE_URL } = require("../utils/baseURL");
const{ errorResponse, successResponse } =require("../utils/reponseHandler") ;
const Order = require("./order.model");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)



const makePaymentRequest = async (req, res) => {
    const { products, userId, grandTotal, selectedItems,  couponCode } = req.body;

    //console.log("coupon back:",couponCode)

    try {
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: Math.round(grandTotal * 100 / selectedItems),
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,

                /// Shipping Address
            shipping_address_collection: {
                allowed_countries: ['BD'],
              },

              /// Shipping Charge
              shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 60,
                      currency: 'usd',
                    },
                    display_name: 'Inside Dhaka',
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 2,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 3,
                      },
                    },
                  },
                },
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 150,
                      currency: 'usd',
                    },
                    display_name: 'Outside Dhaka',
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 5,
                      },
                      maximum: {
                        unit: 'business_day',
                        value:7,
                      },
                    },
                  },
                },
              ],

              // Phone Number
            phone_number_collection: {
                enabled: true,
              },
              ////////////////
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${BASE_URL}/cancel`,
            metadata: {
                userId: userId,
                grandTotal: Math.round(grandTotal * 100),
                couponCode: couponCode || "", // Include couponCode if provided
            },
        }); 
       // console.log("payment session ---- :" ,session)

        res.json({ id: session.id });
    } catch (error) {
        return errorResponse(res, 500, "Failed to create payment session", error);
    }
};


{/* newest one 
const makePaymentRequest = async (req, res) => {
    const { products, userId, grandTotal,selectedItems, message } = req.body;

    try {
        // Create lineItems, but don't calculate total in the backend
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.image],
                
                },
              
                unit_amount: Math.round(grandTotal * 100 / selectedItems), // Product price in cents divided by selecteditems for coupon applied
            }, 
            
            quantity: product.quantity,
        }));

        // Create the Stripe session using grandTotal
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${BASE_URL}/cancel`,
            metadata: {
                userId: userId,
                grandTotal: Math.round(grandTotal * 100), // Include the grandTotal in metadata
            },
        });

        res.json({ id: session.id });
    } catch (error) {
        return errorResponse(res, 500, "Failed to create payment session", error);
    }
};
*/}

{/*  
 const makePaymentRequest = async (req,res)=>{

    const {products, userId ,  grandTotal} = req.body ;

  

    try {
        const lineItems = products.map((product)=>({
            price_data:{
                currency:"usd",
    
                product_data:{
                    name : product.name,
                    images: [product.image]
    
                },
                unit_amount:Math.round(product.price * 100)
            },
            quantity: product.quantity
        }))


            const session = await stripe.checkout.sessions.create({
                line_items : lineItems,
                payment_method_types : ["card"],
                mode:"payment", 
                success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${BASE_URL}/cancel`,
            }) ;

            res.json({id: session.id})



    } catch (error) {
            return errorResponse(res, 500 ,"Failed to create payment session", error);
    }  


}
*/}





const confirmPayment = async (req, res) => {
    const { session_id } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items", "payment_intent"],
        });

        const paymentIntentId = session.payment_intent.id;
        let order = await Order.findOne({ orderId: paymentIntentId });

        if (!order) {
            const lineItems = session.line_items.data.map((item) => ({
                productId: item.price.product,
                quantity: item.quantity,
                name:item.description
            }));
          // console.log("confirm session ---- :" ,session)

            const amount = session.amount_total / 100;
            const addres = {

                city:session.customer_details.address.city,
                country: session.customer_details.address.country,
                line1:session.customer_details.address.line1,
                line2:session.customer_details.address.line2,
               postalcode:session.customer_details.address.postal_code,
            }
            
          //  session.customer_details.address;
           // console.log(addres)

            order = new Order({
                orderId: paymentIntentId,
                products: lineItems,
                amount: amount,
                address:addres,
                email: session.customer_details.email,
                phone:session.customer_details.phone,
                buyer:session.customer_details.name,
                status: session.payment_intent.status === "succeeded" ? "pending" : "failed",
            });
        } else {
            order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed";
        }

        await order.save();

        // Mark the coupon as used only if the payment succeeded
        if (session.metadata.couponCode && session.metadata.couponCode !== "") {
            const coupon = await couponModel.findOne({ code: session.metadata.couponCode });

            if (coupon) {
                if (!coupon.usedBy.includes(session.metadata.userId)) {
                    coupon.usedBy.push(session.metadata.userId);
                    await coupon.save();
                }
            }
        }

        return successResponse(res, 200, "Order confirmed successfully", order);
    } catch (error) {
        console.error("Error confirming payment:", error);
        res.status(500).json({ error: "Failed to confirm payment" });
    }
};



{/*
const confirmPayment = async (req, res) => {
    const { session_id } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items", "payment_intent"],
        });

        const paymentIntentId = session.payment_intent.id;
        const amount = session.metadata.grandTotal / 100; // Retrieve grandTotal from metadata
        let order = await Order.findOne({ orderId: paymentIntentId });

        if (!order) {
            const lineItems = session.line_items.data.map((item) => ({
                productId: item.price.product,
                quantity: item.quantity,
            }));

            order = new Order({
                orderId: paymentIntentId,
                products: lineItems,
                amount: amount,
                email: session.customer_details.email,
                status: session.payment_intent.status === "succeeded" ? "pending" : "failed",
            });
        } else {
            order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed";
        }

        await order.save();
        return successResponse(res, 200, "Order confirmed successfully", order);
    } catch (error) {
        return errorResponse(res, 500, "Failed to confirm payment", error);
    }
};

*/}
{/*  
  this is the newest one 

const confirmPayment = async (req , res)=>{

    const {session_id} = req.body ;
   // console.log(session_id)
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items", "payment_intent"]
        });

        const paymentIntentId = session.payment_intent.id;
        let order = await Order.findOne({orderId : paymentIntentId});
        

        if(!order){

            const lineItems = session.line_items.data.map((item) => ({
                productId : item.price.product,
                quantity: item.quantity,
                
            }))

            const amount = session.amount_total / 100;

            order = new Order({
                orderId: paymentIntentId,
                products: lineItems,
                amount: amount,
                email: session.customer_details.email,
                // Update status based on the payment intent status
                status: session.payment_intent.status === "succeeded" ? "pending" : "failed",  // changed from "pending" to "completed"
            });


        }else {
//order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed"
            order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed";  // changed from "pending" to "completed"
        }
        await order.save();
        return successResponse(res , 200 , "Order confirm successfully",order)

    } catch (error) {
        
    }

}
*/}

{/*  
const confirmPayment = async (req, res) => {
    const { session_id } = req.body;
    console.log("Session ID: ", session_id);

    try {
        // Retrieve the Stripe session
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items", "payment_intent"]
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        const paymentIntentId = session.payment_intent.id;
        
        // Check if the order already exists in the database
        let order = await Order.findOne({ orderId: paymentIntentId });

        // If order does not exist, create a new one
        if (!order) {
            const lineItems = session.line_items.data.map((item) => ({
                productId: item.price.product,
                quantity: item.quantity
            }));

            const amount = session.amount_total / 100;  // Convert amount to dollars

            order = new Order({
                orderId: paymentIntentId,
                products: lineItems,
                amount: amount,
                email: session.customer_details.email,
                // Update status based on the payment intent status
                status: session.payment_intent.status === "succeeded" ? "completed" : "failed",  // changed from "pending" to "completed"
            });
        } else {
            // Update the order status if it already exists
            order.status = session.payment_intent.status === "succeeded" ? "completed" : "failed";  // changed from "pending" to "completed"
        }

        // Save the order to the database
        await order.save();

        // Send success response to client
        return res.status(200).json({ message: "Order confirmed successfully", order });

    } catch (error) {
        console.error("Error confirming payment: ", error);

        // Send error response if any error occurs
        return res.status(500).json({ message: "Failed to confirm payment", error: error.message });
    }
};

*/}



const getOrdersByEmail = async (req, res)=>{

    const email = req.params.email;

    try {
         if(!email){
            return  errorResponse(res, 400 , "email is required")
         }
         const orders = await Order.find({email}).sort({createdAt: -1});
         if(orders.length === 0 || !orders){
            return errorResponse(res ,404 , "No orders found for this email");
         }
         return successResponse(res, 200 ,"Orders fetched successfully", orders)

    } catch (error) {
        return errorResponse(res, 500 ,"Failed to get orders" , error)    
    }   

}




const getOrdersByOrderId = async (req,res)=> {

    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return errorResponse(res,404 , "Order not found")
        }
        return successResponse(res, 200 , "Order fetched successfully", order);



    } catch (error) {
            return errorResponse(res, 500 , "Failed to get order", error)
    }

}


const getAllOrders = async(req,res)=>{


try {
        const orders = await Order.find().sort({createdAt: -1});
        if(orders.length === 0 || !orders){
            return errorResponse(res, 404 , "No orders found")
        }
        return successResponse(res , 200 , "Orders fetched successfully", orders);


} catch (error) {
        return errorResponse(res, 500 ,"Failed to get all orders", error)
}


}


const updateOrderStatus = async(req,res)=>{
    const {id} = req.params;
    const {status} = req.body;
    if(!status){
        return errorResponse(res, 400 , "Status is required");
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id,{status , updatedAt: Date.now()}, {
            new: true,
            runValidators:true
        })
        if(!updatedOrder){
            return errorResponse(res, 404 ,"Order not found")
        }

        return  successResponse(res, 200 , "Order status updated successfully",updatedOrder);


    } catch (error) {
        return errorResponse(res, 500 ,"Failed to update order status",error)
    }


}



const deleteORdersById = async (req, res )=>{

const {id} = req.params;
try {
    const deleteOrder = await Order.findByIdAndDelete(id);
    if(!deleteOrder){
        return errorResponse(res,404, "Order not found")
    }
    return successResponse(res, 200 ,"ORder Deleted Successfully",deleteOrder)


} catch (error) {
    return errorResponse(res, 500 , "Failed to delete order", error)
}

}







module.exports={
    makePaymentRequest , confirmPayment , getOrdersByEmail , getOrdersByOrderId , getAllOrders , updateOrderStatus , deleteORdersById
}