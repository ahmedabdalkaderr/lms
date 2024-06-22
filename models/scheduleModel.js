const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    date: {
      type: String,
      //required: [true, ""]
    },
    startTime: {
      type: String,
      //required: [true, ""]
    },
    endTime: {
      type: String,
      //required: [true, ""]
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
