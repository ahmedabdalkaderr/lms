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
    photo: String,
  },
  { timestamps: true }
);

const setImage = (doc) => {
  const img = doc.photo;
  if (img && !img.startsWith("h")) {
    const photoUrl = `${process.env.BASE_URL}/users/${img}`;
    doc.photo = photoUrl;
  }
};

userSchema.post(["init", "save"], setImage);

module.exports = mongoose.model("User", userSchema);
