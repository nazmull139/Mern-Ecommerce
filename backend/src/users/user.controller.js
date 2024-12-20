const express = require('express');
const router = express.Router();
const User = require("./user.model");
const generateToken = require('../middleware/generateToken');
const verifyToken = require('../middleware/verifyToken');
const { successResponse, errorResponse } = require('../utils/reponseHandler');
const { sendVerificationEamil, sendWelcomeEmail } = require('../middleware/email');


const userRegistration = async (req , res ) => {

    try {
        const {username , email , password  } = req.body;

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new User({email , username , password, verificationCode});
        await user.save();
       // console.log("registration",user)
        sendVerificationEamil(user.email,verificationCode)

        res.status(201).send({message: "User Registered Successfully!",user});
    } catch (error) {
            console.error("Error registering user",error);
            res.status(500).send({message:"Registration Failed"})
    }


}

//////////////// verify registration 
const userRegisVerify = async (req,res)=>{

  try {
    const {code} = req.body;
    const user =await User.findOne({verificationCode:code});
    if(!user){
      res.status(400).send({success: false, message:"invalid verification code",})
    }
   // console.log(user)
    user.isVerified=true;
    user.verificationCode = undefined;
    await user.save();
    await sendWelcomeEmail(user.email,user.name)
    res.status(201).send({message: "User verified Successfully!",user});
  } catch (error) {
    console.error("Error verification code",error);
            res.status(500).send({message:"Verify Failed"}) 
  }


} 


const userLoggedIn = async (req , res ) => {

    try {
        const { email , password} = req.body;
     //  console.log(email , password); 
       const user =await User.findOne({email});
       // const user = req.user;
        if(!user){
            return res.status(404).send({message: "user not found"})
        }
      //  if(!user.isVerified){
          //  return res.status(400).send({message: "Verify Email",user:{
            //  isVerified:user.isVerified
           // }})
       // }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).send({message: "password not matched"})
        }
        //const isVerified = user.isVerified
        const token = await generateToken(user._id);
       console.log("token: ",token);
       res.cookie('token', token , {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
       });


        res.status(200).send({message: "Logged in successfully",token, user:{
          _id:user._id,
          email: user.email,
          username:user.username,
          role:user.role,
          profileImage:user.profileImage,
          bio:user.bio,
          profession:user.profession,
          isVerified:user.isVerified

        }});


      } catch (error) {
        console.error("Error logged in user",error);
        res.status(500).send({message:"Error logged in user"});
      }


}



const userLogOut = async(req,res)=>{
 try {
    res.clearCookie('token');
    //res.status(200).send({message: "Loggedout successfully"})

    successResponse(res , 200 , "Logged out successfully!")

 } catch (error) {
    //console.error("Error logged out as a user",error);
   // res.status(500).send({message:"Logged out failed!"});
   errorResponse(res , 500 , "Logged out failed!", error);
 }


}


const getAllUsers = async (req, res) => {
  try {
    const users =  await User.find({}, 'email role').sort({createdAt: -1});
    successResponse(res, 200, "All users fetched successfully!", data= users)
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch all users!", error);
  }
}






const deleteUser = async (req,res)=>{

    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
  
        if(!user){
          return res.status(404).send({message:"user not found"});
        }
  
        res.status(200).send({message:"user deleted successfully" });
  
    } catch (error) {
      errorResponse(res , 500 , "Failed to delete user!",error);
    }

 
}


const updateUserRole = async (req,res)=>{

    try {
    
        const {id} = req.params;
        const {role} = req.body;
        const user = await User.findByIdAndUpdate(id , {role}, {new:true});
        if(!user){
          res.status(404).send({message:"user not found"});
    
        }
        res.status(200).send({message:"user role updated successfully" , user});
    
       } catch (error) {
        console.log("Error updating user role",error);
          res.status(500).send({message:"Error updating user role"});
       }

}

const editUserProfile = async (req,res)=>{

  const {id} = req.params ;
  const { username , profileImage , bio , profession} = req.body;

try {

  const updateFields = {

    username,
    profileImage,
    bio,
    profession


  }

  const updateUser = await User.findByIdAndUpdate(id , updateFields , {new: true});

  if(!updateUser) {
    return errorResponse(res, 404 , "User not found!");
  }

  return successResponse(res, 200 , "User profile updated successfully!", updateUser);



} catch (error) {
    errorResponse(res, 500 , "Failed to update user profile", error);
}

}

{/* 



const editUserProfile = async (req, res) => {
  const {id} = req.params;
  const {username, profileImage, bio, profession} = req.body;

  try {
    const updateFields =  {
      username,
      profileImage,
      bio,
      profession
    }
    const updatedUser =  await User.findByIdAndUpdate(id, updateFields, {new: true, runValidators: true });
    // console.log(updatedUser)
    if(!updatedUser) {
      return errorResponse(res, 404, "User not found!");
    }

    return successResponse(res, 200, "User profile updated successfully!", data = {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
      bio: updatedUser.bio,
      profession: updatedUser.profession,
    });
    
  } catch (error) {
    errorResponse(res, 500, "Failed to update user profile!", error);
  }
}


  ///



*/}



module.exports = {
    userRegistration , userLoggedIn , userLogOut , getAllUsers , deleteUser , updateUserRole , editUserProfile , userRegisVerify
}

