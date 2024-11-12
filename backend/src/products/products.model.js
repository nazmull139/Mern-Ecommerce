const  mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name : {type: String , required:true},

    category : String ,

    decription : String,

    price : {type: Number , required: true},

    oldPrice : Number ,

    image : {type:String , required:true} ,

    color : String ,

    rating : {type: Number , default:0},

    author : {type : mongoose.Types.ObjectId, ref: 'User', required: true}


},

{timestamps: true}
)

const Products = mongoose.model("Product",ProductSchema);
module.exports = Products ;