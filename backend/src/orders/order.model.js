const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userId : String ,
    orderId: String,
    products: [
        {
            productId: {type: String , required:true},
            quantity : {type: String , required:true},
            name : {type: String , required:true}
        }

    ],
    phone: Number ,
    address : 
        {
           city : {type: String , required:true},
           country : {type: String , required:true},
           line1 : {type: String , required:true},
           line2 : {type: String , required:true},
           postalcode : {type: String , required:true}

        },
     
    
   
    buyer : {type: String , required:true},
    email : {type:String , required:true},
    amount : Number,
    status : {
        type: String,
        enum: ["pending" , "processing" , "shipped", "completed"],
        default:"pending"
    }


}, {timestamps: true})


const Order = mongoose.model('order',orderSchema);
module.exports = Order ;