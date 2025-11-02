const mongoose = require("mongoose");

const forgotPasswodSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 180
    }
  },
  {
    timestamps: true,
  }
);

const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswodSchema,
  "forgot-password"
);

module.exports = ForgotPassword;
