import express from "express"
import { SignUp ,LogIn ,LogOut ,checkAuth} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyToken.middleware.js";

const authRouter =express.Router();

authRouter.get("/check-auth",verifyToken,checkAuth)


authRouter.post("/signUp",SignUp);
authRouter.post("/logIn",LogIn);
authRouter.post("/logOut",LogOut);


export default authRouter;