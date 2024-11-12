const Products = require("../products/products.model");
const { errorResponse, successResponse } = require("../utils/reponseHandler");
const Reviews = require("./reviews.model");


const postAReview = async(req,res)=>{

    try {
        const{comment ,rating , productId , userId} = req.body;

        if(!comment || !rating ){

            return res.status(400).send({message:"All fields are required"});
        }
      //  if(!productId || !userId){

           // return res.status(400).send({message:"LogIn first or create a account"});
       // }

        const existingReview = await Reviews.findOne({productId , userId});

        if(existingReview){
            //update reviews 

            existingReview.comment = comment;
            existingReview.rating = rating;
            await existingReview.save();

        }else{
            // create new review
            const newReview = new Reviews({
                comment ,rating , productId , userId
            })
            await newReview.save();
        }

        //calculate 

        const reviews = await Reviews.find({productId});
        if(reviews.length>0){
            const totalRating = reviews.reduce((acc, review)=> acc+review.rating, 0);
            const averageRating = totalRating / reviews.length;
            const product = await Products.findById(productId);
            if(product){
                product.rating = averageRating;
                await product.save({validateBeforeSave: false});
            } else{
                return res.status(404).send({message:"Product not found"})
            }


        }

        res.status(200).send({message:"Review processed successfully",
            reviews:reviews
        })

    } catch (error) {
        console.error("Error posting review", error);
        res.status(500).send({message:"Failed to post review"});
    }




}




const getUsersReview = async (req, res) => {
    const {userId} = req.params;

    try {
        if (!userId) {
            return errorResponse(res, 400, "Missing user ID")
        }

        const reviews = await Reviews.find({userId: userId}).sort({createdAt: -1})

        if(reviews.length === 0) {
            return errorResponse(res, 404, "No reviews found for this user")
        }

        return successResponse(res, 200, "Reviews fetched successfully", reviews)

    } catch (error) {
        return errorResponse(res, 500, "Failed to get users review", error)
    }
}


const getTotalReviewsCount = async (req, res)=>{

    try {
        const totalReviews = await Reviews.countDocuments({});
        res.status(200).send({totalReviews});
    } catch (error) {
        console.log("Error getting total review",error);
        res.status(500).send({message:"failed to get total review"})
    }


}

module.exports = {
    postAReview , getUsersReview , getTotalReviewsCount

}