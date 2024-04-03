import mongoose from "mongoose";

const mailSchema = mongoose.Schema(
  {
    recipients: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Mail", mailSchema);
