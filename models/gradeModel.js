const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gradeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    
    points: {
      type: String,
      // required: [true, "User name required"],
    },

    target: {
      type: String,
    },

    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grade", gradeSchema);
