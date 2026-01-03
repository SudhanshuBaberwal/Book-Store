import User from "../model/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }
    const hashedPasswrod = await bcrypt.hash(password, 10);
    const createdUser = new User({
      fullname,
      email,
      password: hashedPasswrod,
    });
    await createdUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("Error in Signup function : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username or Password" });
    } else {
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("Error in login function : ", error.message);
    return res.status(500).json({ success: false, message: error });
  }
};
