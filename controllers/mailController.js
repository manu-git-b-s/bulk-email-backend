import User from "../models/userModel.js";
import Mail from "../models/mailModels.js";
import dotenv from "dotenv";
import { SendMultipleMail } from "../utils/sendMail.js";

dotenv.config();

// to send mail controller
export const sendMailHandler = async (req, res) => {
  try {
    const { email, subject, message, recipients } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "User Not Found",
      });
    }

    const newMail = new Mail({ email, subject, recipients, message });

    await newMail.save();
    await SendMultipleMail(recipients, message, subject);

    //Status send
    res.status(201).send({
      message: "Mails sent to all the recipients",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal server error" });
  }
};

// to get all mails sent by a user controller
export const getAllMails = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: "User Not Found",
      });
    }

    const allMails = await Mail.find({ email });
    if (allMails.length === 0) {
      return res.status(404).json({ message: "No data Found" });
    }

    res.status(200).send({
      message: "Fetched all mails of the user",
      data: allMails,
    });
  } catch (error) {
    console.log(error);
  }
};

// to get mails sent today of a user controller
export const todayCreatedMails = async (req, res) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email: email });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const mailList = await Mail.find({
      email,
      createdAt: { $gte: today, $lt: endOfDay },
    });
    if (!mailList) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({
      message: "Successfully fetched All mails sent today",
      data: mailList,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// to get monthly mails of a user controller
export const getMonthlyMails = async (req, res) => {
  const { email } = req.body;
  const currentDate = new Date();

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  try {
    const mailList = await Mail.find({
      email,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    if (!mailList) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({
      message: "Successfully fetched this month's All Mails",
      data: mailList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
