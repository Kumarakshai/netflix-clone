import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/genearteToken.js";

//Sign Up
export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All feilds are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      password: hashedpassword,
      username,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    return res.status(201).json({
      success: true,
      user: { ...newUser._doc, password: "" },
    });
  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

//Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const ispasswordcorrect = await bcryptjs.compare(password, user.password);
    if (!ispasswordcorrect) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(201).json({
      success: true,
      user: { ...user._doc, password: "" },
    });
  } catch (error) {
    console.log("Error in Login Controller", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

//Logout
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in Logout Controller", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

//authCheck
export async function authCheck(req, res) {
  try {
    console.log("req.user:", req.user);
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log("Error in authCheck Controller", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
