import express from "express"
import { SignUp ,LogIn ,LogOut } from "../controllers/auth.controller.js";

const authRouter =express.Router();

authRouter.post("/signUp",SignUp);
authRouter.post("/logIn",LogIn);
authRouter.post("/logOut",LogOut);

export default authRouter;