import express from "express"
import { SignUp ,LogIn ,LogOut ,verifyToken,checkAuth} from "../controllers/auth.controller.js";

const authRouter =express.Router();

authRouter.get("/chech-auth",verifyToken,checkAuth)


authRouter.post("/signUp",SignUp);
authRouter.post("/logIn",LogIn);
authRouter.post("/logOut",LogOut);


export default authRouter;