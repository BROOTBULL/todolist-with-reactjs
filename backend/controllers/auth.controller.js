import { User } from "../modeules/user.module.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import generateTokenAndSetcookie from "../utils/generateTokenAndSetcookies.js";

export const verifyToken = async (req,res,next)=>{
const token =req.cookies.token;
console.log(token);

try{
  console.log("verify");
  
if(!token)
{
  console.log("no token");

   res.status(400).json({seccess:false,message:"Unauthorised - no token provided"})
}
else{
  console.log("token");

   const tokenVerify=jwt.verify(token,process.env.JWT_SECRET);
   if(!tokenVerify)
   return res.status(401).json({success:false,message:"Unauthorised - token is not valid"})
   req.userId=tokenVerify.userId;
  console.log("going to check auth");

   next()

}}
catch(err){
console.log("error in verifytoken",err)
return res.status(500).json({success:false,message:"Something went wrong"})
}
}

export const checkAuth=async (req,res)=>{
   try {
  console.log("in check auth");

      const user= await User.findById(req.userId);
      console.log("user:",user);
      
      if (!user)
      {
        console.log("no user found");
        
         return res.status(400).json({success:true,message:"User not found"})
      }
console.log("user found");

      res.status(200).json({
         success:true,
         user:{...user._doc,//change user data from json to object ..can user .toObject or can use .findById(req.userId).select(-password)... "-" indicate remove password
             password:undefined}
      })

      
   } catch (error) {
     console.log("Error in checkAuth",error);
     res.status(400).json({success:false,message:error.message})
      
   }
}


export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (await User.findOne({ email: email })) {
    res.json({ success: false, message: "User Already Exists" });
  } else {
    console.log(req.session);

    bcrypt.hash(password, 10, (err, hash) => {
      const NewUser = new User({ username, email, password: hash });
      NewUser.save();

      generateTokenAndSetcookie(res, NewUser._id);

      res.status(200).json({
        success: true,
        message: "User created successfully",
        user: {...NewUser._doc,password:undefined},
      });
    });
  }
};

export const LogIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const isvalidPassword = await bcrypt.compare(password, user.password);

    if (isvalidPassword) {
      generateTokenAndSetcookie(res,user._id);

      user.lastLogin=new Date();
      user.save();

      res.json({ success: true, message: `Welcome ${user.username}` });
    } else res.json({ success: false, message: `password is incorrect` });
  } else res.status(400).json({ success: false, message: "User not found" });
};

export const LogOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: false,
    message: "User successfully logged Out",
  });
};
