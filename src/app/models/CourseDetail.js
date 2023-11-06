const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseDetail = new Schema(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "Course" },
    lesson_name: { type: String, required: true },
    video: { type: String, required: false, default: "" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("CourseDetail", CourseDetail);
