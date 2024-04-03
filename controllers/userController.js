import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/sendMail.js";
import dotenv from "dotenv";
import { capitalize } from "../utils/capitalize.js";
import { generateToken } from "../utils/generateToken.js";

dotenv.config();

// register user controller
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: `User with ${existingUser.email} mail id already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "User Registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Register failed Internal server error",
      error: error.message,
    });
  }
};

// login user controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    generateToken(res, findUser._id);

    res
      .status(200)
      .json({ message: "User logged in successfully", data: findUser });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// logout user controller
export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "User Logged Out" });
  } catch (error) {
    res.status(500).json({
      message: "Logout Failed Internal server error",
      error: error.message,
    });
  }
};

// forgot password controller
export const forgotPassword = async (req, res) => {
  try {
    //Check if user exists in DB
    let userExists = await User.findOne({ email: req.body.email });
    if (userExists && req.body.email !== "") {
      const mailId = req.body.email;
      //Reset Link
      const resetLink = `${process.env.RESET_LINK}?email=${mailId}`;

      const message = `<p>Hello ${capitalize(userExists.username)},</p>
          <p>
            You have requested to reset your password. Click the button below to
            reset it:
          </p>
          <a href="${resetLink}">
            <button style="padding: 10px; background-color: #000; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Reset Your Password
            </button>
          </a>`;
      await sendMail(req.body.email, message);

      //Status send
      res.status(201).send({
        message: "Reset Link send to your email",
      });
    } else {
      res
        .status(400)
        .send({ message: `User ${req.body.email} does not exists` });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// reset password controller
export const resetPassword = async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email });
    if (user) {
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
      const equalPassword = password === confirmPassword;
      const hashedPassword = await bcrypt.hash(password, 10);
      if (equalPassword && password !== "" && confirmPassword !== "") {
        await User.updateOne(
          { email: req.body.email },
          { password: hashedPassword }
        );

        res.status(200).json({ message: "Updated successfully" });
      } else {
        res
          .status(400)
          .json({ message: "Password and confirm password doesn't match" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
