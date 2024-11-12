const Reviews = require("../reviews/reviews.model");
const Products = require("./products.model");

const createNewProduct = async(req,res)=>{

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


}


const getAllProducts = async (req, res)=>{

    try {
        const {category , color , minPrice , maxPrice , page = 1 , limit = 10 } = req.query;

        let filter = {};
        if(category && category !=="all") {
            filter.category = category ;
        }
        if(color && color !=="all") {
            filter.color = color ;
        }


      {/*

        if(minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if(!isNaN(min) && !isNaN(max)){
                filter.price = { $gte: min, $lte:max};
            }
        }
        
        */}  

        
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
        .populate("author","email username")
        .sort({createdAt: -1});
            
        res.status(200).send({products , totalPages , totalProducts});
        
    } catch (error) {
        console.error("Failed to fetch products",error);
        res.status(500).send({message: "Failed to fetch products"}); 
    }


}


const getSingleProduct = async (req , res)=> {

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



}



const updateProductById = async (req,res) => {

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


}


const deleteProductById = async (req , res )=>{

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



}


module.exports = {createNewProduct , getAllProducts , getSingleProduct , updateProductById , deleteProductById }