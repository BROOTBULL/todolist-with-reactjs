import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { TodoProjects } from "./modeules/todo.module.js";
import authRouter from "./Routes/auth.routes.js";
import todoRouter from "./Routes/todo.routes.js";
import passport from "passport";
import session from "express-session"
import { Strategy } from "passport-local";
import cookieParser from "cookie-parser"


dotenv.config();
const app = express();
const url =process.env.MONGO_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));//  Allows cookies and other credentials to be sent with requests

app.use(session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:1000*60*60
  }
}))

app.use(passport.initialize());
app.use(passport.session());


app.use("/api/auth",authRouter);
app.use("/api",todoRouter);

passport.use(new Strategy(async function verify(username,password,cb)
{
  
}))


async function connectToMongo() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB server");
  
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToMongo();


app.listen(3000, () => {
  console.log("Server started on port 3000");
});