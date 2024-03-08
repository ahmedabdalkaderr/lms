const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "User name required"],
    },
    year: {
      type: String,
      trim: true,
    },
    instructor: String,
    specification: String,
  },
  { timestamps: true }
);


module.exports = mongoose.model("Course", courseSchema);
