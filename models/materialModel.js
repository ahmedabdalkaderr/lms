const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema(
  {
    file: {
      type: String,
      required: [true, "upload your file"],
    },
    type: {
      type: String,
      required: [true, "Enter file type"],
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

const setFile = (doc) => {
  const file = doc.file;
  if (file && !file.startsWith("h")) {
    const fileUrl = `${process.env.BASE_URL}/materials/${file}`;
    doc.file = fileUrl;
  }
};

materialSchema.post(["init", "save"], setFile);

module.exports = mongoose.model("Material", materialSchema);
