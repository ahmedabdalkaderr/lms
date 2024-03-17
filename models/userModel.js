const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      // required: [true, "User name required"],
    },
    email: {
      type: String,
      // required: [true, "User email required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      // required: [true, "password must be included"],
    },
    year: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
