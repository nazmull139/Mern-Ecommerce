const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

{/*
const verifyToken = (req , res , next) =>{
    try {
        const token = req.cookies.token;
        console.log("token:" ,token)
    } catch (error) {
        
    }
}

*/}
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure this line is reached
        if (!token) {
            return res.status(401).send({ message: "No token provided" });
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded){
            return res.status(401).send({ message: "invalid token" });
        }
        req.userId = decoded.userId;
        req.role = decoded.role;
       

        console.log(token); // Check if token is logged
        // Proceed with token verification logic
        next();
    } catch (error) {
        console.error("Error in verifyToken", error);
        res.status(500).send({ message: "Internal server error" });
    }
};


module.exports = verifyToken;