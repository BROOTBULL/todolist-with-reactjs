import jwt from "jsonwebtoken";

export default function generateTokenAndSetcookie(res,userId)
{
const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"7d",
})

res.cookie("token",token,{
    httpOnly:true,//xss attak cyber security
    secure:process.env.NODE_ENV==="prodection",
    sameSite:"strict",
    maxAge:60*60*1000,
});

return token;
}