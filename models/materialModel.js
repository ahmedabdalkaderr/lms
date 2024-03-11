const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema(
  {
    specification: {
      type: String,
      default: '',
    },
    books: [String],
    lectures: [String],
    assignments: [String],
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [
        true,
        "Each materials should be belonging to a specific course",
      ],
    },
  },
  { timestamps: true }
);

const setFile = (doc) => {
  if (doc.specification) {
    const fileUrl = `${process.env.BASE_URL}/materials/${doc.specification}`;
    doc.specification = fileUrl;
  }
};

materialSchema.post(["init", "save"], setFile);

module.exports = mongoose.model("Material", materialSchema);
