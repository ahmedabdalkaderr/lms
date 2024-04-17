const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema(
  {
    type: {
      type: String,
      // required: [true, "Enter file type"],
    },
    materials: {
      type: [mongoose.Schema.ObjectId],
      ref: "Material",
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Type", typeSchema);
