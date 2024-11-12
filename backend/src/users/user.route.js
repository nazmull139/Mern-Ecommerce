const express = require('express');

const User = require('./user.model');
const generateToken = require('../middleware/generateToken');

const verifyToken = require('../middleware/verifyToken');
const { userRegistration, userLoggedIn, userLogOut, deleteUser, updateUserRole, editUserProfile, getAllUsers } = require('./user.controller');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

//// REGISTRATION


router.post("/register", userRegistration)

{/*         
  
  router.post("/register", async (req , res) => {


    try {
        const {username , email , password  } = req.body;
        const user = new User({email , username , password});
        await user.save();
        res.status(201).send({message: "User Registered Successfully!"});
    } catch (error) {
            console.error("Error registering user",error);
            res.status(500).send({message:"Error registering user"})
    }
})
   */}



/// LOGIN 

router.post("/login", userLoggedIn)


{/*   
    router.post("/login", async (req , res)=> {

      try {
        const { email , password} = req.body;
        //console.log(email , password);
        const user =await User.findOne({email});
        if(!user){
            return res.status(404).send({message: "user not found"})
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).send({message: "password not matched"})
        }

        const token = await generateToken(user._id);
       console.log("token: ",token);
       res.cookie('token', token , {
        httpOnly: true,
        secure: false,
        sameSite: 'None'
       });


        res.status(200).send({message: "Logged in successfully",token, user:{
          _id:user._id,
          email: user.email,
          username:user.username,
          role:user.role,
          profileImage:user.profileImage,
          bio:user.bio,
          profession:user.profession


        }});


      } catch (error) {
        console.error("Error logged in user",error);
        res.status(500).send({message:"Error logged in user"});
      }
    })
*/}


//// ALL USERS 

//router.get("/users", verifyToken, async(req,res) => {
  //res.send({message:"protected users"})
//})

/////// LOGOUT

router.post("/logout",userLogOut)

{/*  
router.post('/logout', async(req,res)=>{

  res.clearCookie('token');
  res.status(200).send({message: "Loggedout successfully"})
  
})
*/}


////// DELETEE (only admin)

router.delete("/users/:id",verifyToken, verifyAdmin , deleteUser)

{/*
  
  router.delete("/users/:id", async(req , res) => {

  try {
      const {id} = req.params;
      const user = await User.findByIdAndDelete(id);

      if(!user){
        return res.status(404).send({message:"user not found"});
      }

      res.status(200).send({message:"user deleted successfully" });

  } catch (error) {
    c
  }

}
);
  
  
  */}



  //// GET ALL USER endpoints (token verify and admin)

  router.get('/users',verifyToken,verifyAdmin, getAllUsers)

  {/*
 router.get("/users",verifyToken, async(req,res)=> {

    try {
        const users = await User.find({} ,'id email role').sort({createdAt: -1});
      res.status(200).send(users);
      
    } catch (error) {
      console.log("Error fetching user",error);
      res.status(500).send({message:"Error fetching user"});
    }

  })
 

     */}



  /// UPdATE USER ROLE ( only admin )

  router.put("/users/:id",verifyToken,verifyAdmin, updateUserRole);


  {/*
    
    router.put("/users/:id", async (req, res)=>{

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
  })

    
    */}

  
 ////// // UPDATE USER PROFILE /////////////////

 router.patch("/edit-profile/:id", editUserProfile)


 {/*   
  router.patch("/edit-profile/:id", async(req,res)=>{

    try {
        const {userId , username , profileImage , bio , profession} = req.body;
        if(!userId){
          res.status(400).send({message:"userId is required"});
    
        }
          const user =await User.findById(userId);

        if(!user){
          res.status(400).send({message:"userId not found"});
    
        }
     
       // console.log(user);


       if(username !== undefined) user.username = username;
       if(profileImage !== undefined) user.profileImage = profileImage;
       if(bio !== undefined) user.bio = bio;
       if(profession !== undefined) user.profession = profession;

       await user.save();
       res.status(200).send({message:"profile updated successfully",
        user:{
          _id:user._id,
          email: user.email,
          username:user.username,
          role:user.role,
          profileImage:user.profileImage,
          bio:user.bio,
          profession:user.profession


        }
       
       })

    } catch (error) {
      console.log("Error updating user profile",error);
      res.status(500).send({message:"Error updating user profile"});
    }


  })
*/}











module.exports = router ; 