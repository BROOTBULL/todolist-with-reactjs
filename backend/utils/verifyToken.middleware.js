import jwt from "jsonwebtoken";


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
  
    try {
  
      if (!token) {
        console.log("no token recieved!!");
        res
          .status(401)
          .json({ seccess: false, message: "Unauthorised - no token provided" });
      } else {
  
        const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
        if (!tokenVerify)
          return res
            .status(401)
            .json({
              success: false,
              message: "Unauthorised - token is not valid",
            });
        req.userId = tokenVerify.userId;
  
        next();
      }
    } catch (err) {
      console.log("error in verifytoken", err);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  }