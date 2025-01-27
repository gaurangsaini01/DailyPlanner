import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function signup(req, res) {
  try {
    //data fetch from req body
    const { username, email, password, confirmPassword } = req.body;

    //validate data
    if (!username || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Field Missing",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const passwordRegex1 = /^.{6,}$/
    if(!passwordRegex1.test(password)){
      return res.status(400).json({
        success:false,
        message:'Password must be 6 char long'
      })
    }

    //dono password ko match kerlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords Don't Match",
      });
    }

    //check user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists , Please Login",
      });
    }

    //if all good hash password and create entry in db and send success response
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      profile: `https://api.dicebear.com/8.x/initials/svg?seed=${username}`,
    });
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User Cannot Be Registered , try Again",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    //check for empty Fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Fields",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    //Check User Exists Or Not
    const user = await User.findOne({ email }).populate("todos");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Doesn't Exist Go SignUp",
      });
    }
    //If passwords are matching
    if (await bcrypt.compare(password, user.password)) {
      //create a token using jwt
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      user.token = token;
      res.status(200).json({
        success: true,
        message: "Logged In Successfully",
        user,
        token,
      });
    }
    //If passwords are not matching
    else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
}

export { login, signup };
