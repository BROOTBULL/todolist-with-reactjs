import { User } from "../modeules/user.module.js";

export const SignUp = async (req,res)=>{
const email=req.body.email;
console.log(req.body);


if(await User.findOne({email:email}))
{
     res.send("User Already Exists");
}
else
 {
 
    const newuser = new User(req.body);

    {
     //hashing password
     }
     
    newuser.save();
    res.status(200).send(newuser._id);
}
}

export const LogIn=(req,res)=>{
    
}

export const LogOut=(req,res)=>{
    
}