import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// database connection code
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log(`Mongo db connected`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
