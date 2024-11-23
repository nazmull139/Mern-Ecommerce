const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/reponseHandler');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

{/*
const verifyToken = (req , res , next) =>{
    try {
        const token = req.cookies.token;
        console.log("token:" ,token)
    } catch (error) {
        
    }
}
///////////////////////////////////////

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure this line is reached
        if (!token) {
            return successResponse(res, 401 , "No token provided")
        }
        const decoded = jwt.verify(token , JWT_SECRET);
        //console.log("decoded",decoded);

        if(!decoded.userId){
            return res.status(401).send({ message: "invalid token" });
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
       

        console.log("Token from cookies",token); // Check if token is logged
        // Proceed with token verification logic
        next();
    } catch (error) {
        errorResponse(res, 500 , "Invalid Token", error);
    } 
};
*/}



const verifyToken = (req, res, next) => {
    try {
        const token =  req.cookies.token; //TODO: uncomment this when done
        // const token = req.headers.authorization?.split(' ')[1]
        // console.log("Token from cookies:", token);
        if(!token) {
            return successResponse(res, 401, "Unauthorized Accesss!")
        }
        const decoded = jwt.verify(token,  JWT_SECRET);

        if(!decoded.userId) {
            return res.status(403).send({message: "Access denied!"})
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        errorResponse(res, 500, "Invalid Token!", error);
    }

}



module.exports = verifyToken;