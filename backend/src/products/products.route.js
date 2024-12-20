const express = require('express');
const router = express.Router();
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const { parse } = require('dotenv');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const { createNewProduct, getAllProducts, getSingleProduct, updateProductById, deleteProductById } = require('./product.controller');

// create a product 

router.post("/create-product",verifyToken,verifyAdmin, createNewProduct);
{/* 
router.post('/create-product', async(req , res)=> {


    try {
        const newProduct = new Products({

            ...req.body
        })
        const savedProduct = await newProduct.save();
        ///CALCULATE REVIEWS

        const reviews = await Reviews.find({productId: savedProduct._id});
        if(reviews.length > 0){
            const totalRating = reviews.reduce((acc , review)=> acc + review.rating, 0);
            const averageRating = totalRating/reviews.length ;
            savedProduct.rating = averageRating;
            await savedProduct.save();
        }

        res.status(200).send(savedProduct);

    } catch (error) {
        console.error("Failed to creating new product",error);
        res.status(500).send({message: "Failed to create new product"}); 
    }
});
*/}

//////////////////// GET ALL PRODUCTS ///////////////////////////

router.get("/",getAllProducts);
{/*  
router.get('/', async (req, res)=> {

    try {
        const {category , color , minPrice , maxPrice , page = 1 , limit = 10 } = req.query;

        let filter = {};
        if(category && category !=="all") {
            filter.category = category ;
        }
        if(color && color !=="all") {
            filter.color = color ;
        }


      {/* not fro use

        if(minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if(!isNaN(min) && !isNaN(max)){
                filter.price = { $gte: min, $lte:max};
            }
        }
        
        /}  

        
        if (minPrice || maxPrice) {
            const min = minPrice ? parseFloat(minPrice) : 0; // Default to 0 if not provided
            const max = maxPrice ? parseFloat(maxPrice) : Infinity; // Default to Infinity if not provided
    
            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max };
            }
        }

        
        const skip =(parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Products.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));
        const products = await Products.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .populate("author","email")
        .sort({createdAt: -1});
            
        res.status(200).send({products , totalPages , totalProducts});
        
    } catch (error) {
        console.error("Failed to fetch products",error);
        res.status(500).send({message: "Failed to fetch products"}); 
    }
})

*/}



////////////// GET SINGLE PRODUCTS ///////////

router.get("/:id", getSingleProduct);
{/*  

router.get("/:id", async (req,res)=>{

    try {

        const productId = req.params.id;
        const product = await Products.findById(productId).populate("author","email username");
        if(!product){
            return res.status(404).send({message:"Product not found"});
        }
        const reviews = await Reviews.find({productId}).populate("userId","username email");
        res.status(200).send({product,reviews});
        

    } catch (error) {
        console.error("Error fetching product",error);
        res.status(500).send({message: "Error while fetching product"}); 
    }

})
*/}




///////// UPDATE PRODUCTS /////////

router.patch("/update-product/:id",verifyToken,verifyAdmin, updateProductById);
{/* 
router.patch("/update-product/:id",verifyToken, verifyAdmin ,async (req , res)=>{

    try {
        const productId = req.params.id;
        const updatedProduct = await Products.findByIdAndUpdate(productId, {...req.body},{new: true});
        if(!updatedProduct) {
            return res.status(404).send({message: "Product not found"});
        }
        res.status(200).send({
            message: "Product Updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        console.error("Error updating product",error);
        res.status(500).send({message: "Error while updating product"}); 
    }

})
*/}

////////// DELETE A PRODUCT /////////

router.delete("/:id", deleteProductById)
{/*  
router.delete("/:id",verifyToken,verifyAdmin, async(req , res)=>{

    try {
        const productId = req.params.id;
        const deletedProduct = await Products.findByIdAndDelete(productId);

        if(!deletedProduct) {
            return res.status(404).send({message: "Product not found"});
        }

        // delete reviews related to the product 
        await Reviews.deleteMany({productId: productId});

        res.status(200).send({
            message: "Product Delted Successfully"
        })
        
    } catch (error) {
        console.error("Error deleting product",error);
        res.status(500).send({message: "Error while deleting product"}); 
    }

})
*/}





/// GET RELATED PRODUCTS


router.get("/related/:id", async (req , res)=> {

    try {
        const {id} = req.params ;

        if(!id){
            return res.status(400).send({message: "Product id is required"})
        }
        const product = await Products.findById(id);

        if(!product){
            return res.status(404).send({message:"Product not found"})
        }

        const titleRegex = new RegExp(
            product.name
            .split(" ")
            .filter((word) => word.length>1)
            .join("|"),
            "i"

        );
        const relatedProducts = await Products.find({
            _id: {$ne: id},
            $or: [
                {name:{$regex: titleRegex}},  //match similar names
                {category:product.category},  // match similar categories
            ],
        }) ;
        res.status(200).send(relatedProducts);
    } catch (error) {
        console.error("Error fetching the related product",error);
        res.status(500).send({message: "Failed to the related product"}); 
    }



})



module.exports = router ;