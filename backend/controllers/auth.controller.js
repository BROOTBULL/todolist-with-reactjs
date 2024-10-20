import { User } from "../modeules/user.module.js";
import bcrypt from "bcrypt";
import generateTokenAndSetcookie from "../utils/generateTokenAndSetcookies.js";


export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      console.log("no user found");

      return res.status(400).json({ success: true, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user._doc, //change user data from json to object ..can user .toObject or can use .findById(req.userId).select(-password)... "-" indicate remove password
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (await User.findOne({ email: email })) {
    res.json({ success: false, message: "User Already Exists" });
  } else {

    bcrypt.hash(password, 10, (err, hash) => {
      const NewUser = new User({ username, email, password: hash });
      NewUser.save();

      generateTokenAndSetcookie(res, NewUser._id); //give id of new user to generate token

      res.status(200).json({
        success: true,
        message: "User created successfully",
        user: { ...NewUser._doc, password: undefined },
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
      generateTokenAndSetcookie(res, user._id);//generate new token everytime user login

      user.lastLogin = new Date();
      user.save();

      res.status(200).json({
        success: true,
        message: `${user.username} loggedin successfully`,
        user: { ...user._doc, password: undefined },
      });
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
